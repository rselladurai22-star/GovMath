"use client";

import { AVERAGE_PRIZE, PREMIUM_BONDS, premiumBondsYear } from "@/lib/investing/growth";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  holding: num(10_000, 0, PREMIUM_BONDS.max),
  rate: num(PREMIUM_BONDS.rate * 100, 0, 10),
  savingsRate: num(4, 0, 15),
  band: oneOf<"basic" | "higher" | "additional" | "none">("basic", ["none", "basic", "higher", "additional"]),
  psaUsed: num(0, 0, 1_000),
};
const ADVANCED = ["rate", "savingsRate", "band", "psaUsed"] as const;
const BAND = {
  none: { rate: 0, psa: Infinity, label: "Non-taxpayer or starting rate" },
  basic: { rate: 0.2, psa: 1_000, label: "Basic rate (20%)" },
  higher: { rate: 0.4, psa: 500, label: "Higher rate (40%)" },
  additional: { rate: 0.45, psa: 0, label: "Additional rate (45%)" },
} as const;

export default function PremiumBondsStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const holding = Math.floor(v.holding);
  const r = premiumBondsYear(holding, v.rate / 100);
  const band = BAND[v.band];
  const interest = holding * (v.savingsRate / 100);
  const allowance = Math.max(0, (band.psa === Infinity ? Infinity : band.psa) - v.psaUsed);
  const taxable = Math.max(0, interest - allowance);
  const savingsAfterTax = interest - taxable * band.rate;
  const grossEquivalent = band.rate > 0 ? (v.rate / 100) / (1 - band.rate) : v.rate / 100;
  const better = r.expected >= savingsAfterTax ? "bonds" : "savings";
  const maxBar = Math.max(1, r.p90, savingsAfterTax, r.expected);

  return (
    <Studio
      title="Your Premium Bonds"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See my likely prizes"
      onReset={st.reset}
      dock={{ label: "Typical year", value: gbp(r.median) }}
      inputs={
        <>
          <InputGroup title="Your holding">
            <MoneyField label="Amount in Premium Bonds" value={v.holding} onChange={st.bind("holding")} hint={`From ${gbp(PREMIUM_BONDS.min)} to ${gbp(PREMIUM_BONDS.max)}.`} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Prize fund rate" value={v.rate} onChange={st.bind("rate")} step={0.05} min={0} max={10} unit="%" dp={2} optional hint={`${percent(PREMIUM_BONDS.rate, 2)} from the September 2026 draw. NS&I can change it.`} />
            <StepperField label="Savings account rate to compare" value={v.savingsRate} onChange={st.bind("savingsRate")} step={0.1} min={0} max={15} unit="%" dp={2} optional />
            <SelectField label="Your income tax band" value={v.band} onChange={st.bind("band")} optional options={(Object.keys(BAND) as (keyof typeof BAND)[]).map((k) => ({ value: k, label: BAND[k].label }))} />
            <MoneyField label="Personal Savings Allowance already used" value={v.psaUsed} onChange={st.bind("psaUsed")} optional hint="Interest from other accounts this tax year." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="In a typical year"
        value={gbp(r.median)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          holding < PREMIUM_BONDS.min ? (
            <>The minimum holding is {gbp(PREMIUM_BONDS.min)}.</>
          ) : (
            <>
              With <b>{gbp(holding)}</b> in Premium Bonds, the average return is {gbp(r.expected)} a year, but most people win less than that. A typical (median) year brings{" "}
              <b>{gbp(r.median)}</b>, an effective rate of <b>{percent(r.medianRate, 2)}</b>. Prizes are tax-free.
            </>
          )
        }
        badges={[`${r.winsPerYear.toFixed(1)} prizes a year on average`, r.chanceAnyWin > 0.995 ? "Almost certain to win something" : `${percent(r.chanceAnyWin, 0)} chance of any prize`]}
      />

      <Facts
        items={[
          { label: "Typical year (median)", value: gbp(r.median) },
          { label: "Unlucky year (1 in 10)", value: gbp(r.p10) },
          { label: "Lucky year (1 in 10)", value: gbp(r.p90) },
          { label: "Average over many years", value: gbp(r.expected) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Odds", value: `${PREMIUM_BONDS.odds.toLocaleString("en-GB")} to 1 for each £1 Bond, each month` },
          { label: "Prize fund rate", value: `${v.rate}%` },
          { label: "Method", value: "4,000 simulated years using the September 2026 prize table" },
          { label: "Bonds held", value: "All eligible for every draw (new Bonds wait one full month)" },
        ]}
      />

      <ResultCard title="Premium Bonds or a savings account" sub={`Compared with ${v.savingsRate}% interest, after tax at your band.`}>
        <Compare
          head={["Option", "A year"]}
          rows={[
            { label: "Premium Bonds, typical year", value: gbp(r.median), bar: r.median / maxBar, current: true },
            { label: "Premium Bonds, average", value: gbp(r.expected), bar: r.expected / maxBar },
            { label: `Savings at ${v.savingsRate}%, after tax`, value: gbp(savingsAfterTax), bar: savingsAfterTax / maxBar },
          ]}
        />
        <Callout tone={better === "bonds" ? "good" : "info"} title={better === "bonds" ? "Premium Bonds could pay more on average" : "The savings account pays more"}>
          {better === "bonds" ? (
            <>
              On average, Premium Bonds return more than {gbp(savingsAfterTax)} after tax. But in a typical year you would get {gbp(r.median)}, and the chance of beating the
              average in a given year is {percent(r.chanceBeatRate, 0)}.
            </>
          ) : (
            <>
              A {v.savingsRate}% account pays {gbp(savingsAfterTax)} after tax, more than the Premium Bonds average of {gbp(r.expected)}. To match the Bonds&apos; prize rate, a
              {band.rate > 0 ? ` ${band.label.toLowerCase()} taxpayer with no allowance left` : "n account"} would need {percent(grossEquivalent, 2)}.
            </>
          )}
        </Callout>
      </ResultCard>

      <ResultCard title="The prize table" sub="Estimated prizes in each monthly draw.">
        <Statement
          columns={["Prizes a month"]}
          rows={PREMIUM_BONDS.prizes.map(([value, count]) => ({ label: gbp(value), values: [count.toLocaleString("en-GB")] }))}
        />
        <p className={s.hint}>The average prize is about {gbp(AVERAGE_PRIZE)}, but almost all prizes are £25, £50 or £100.</p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you buy.">
        <Callout title="Your money is safe">Premium Bonds are backed by HM Treasury, so the full amount is protected, not just the first £120,000 like a bank account.</Callout>
        <Callout tone="warn" title="Inflation">If prizes come in below inflation, your money loses buying power, even though you never lose the amount you put in.</Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Results are simulated and illustrate likely outcomes. Prizes are random. Not financial advice.
      </p>
    </Studio>
  );
}

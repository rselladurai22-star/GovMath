"use client";

import { fire } from "@/lib/investing/growth";
import { STATE_PENSION } from "@/lib/investing/retirement";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const FULL_SP = Math.round(STATE_PENSION.newWeekly * 52);

const SCHEMA = {
  age: num(35, 16, 80),
  spend: num(30_000, 0, 1_000_000),
  pot: num(50_000, 0, 100_000_000),
  monthly: num(1_000, 0, 1_000_000),
  realReturn: num(4, -5, 15),
  swr: num(4, 1, 10),
  sp: bool(true),
  spAmount: num(FULL_SP, 0, 50_000),
  spa: num(67, 60, 75),
};
const ADVANCED = ["realReturn", "swr", "sp", "spAmount", "spa"] as const;

export default function FireStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { age: Math.round(v.age), spend: v.spend, pot: v.pot, monthly: v.monthly, realReturn: v.realReturn / 100, swr: v.swr / 100, statePension: v.sp ? v.spAmount : 0, spa: v.spa };
  const r = fire(base);
  const years = r.reached ? r.years : 0;
  const pathAges = r.path.map((_, i) => base.age + i);
  const targets = r.path.map(() => r.target);
  const step = Math.max(1, Math.ceil(r.path.length / 10));
  const rows = r.path.map((p, i) => ({ i, p })).filter((x) => x.i > 0 && (x.i % step === 0 || x.i === r.path.length - 1));

  const alt = [
    { label: "As entered", r },
    { label: `Save ${gbp(v.monthly + 250)} a month`, r: fire({ ...base, monthly: v.monthly + 250 }) },
    { label: `Spend ${gbp(Math.max(0, v.spend - 3_000))} a year`, r: fire({ ...base, spend: Math.max(0, v.spend - 3_000) }) },
    { label: "Withdraw 3.5% a year", r: fire({ ...base, swr: 0.035 }) },
  ];
  const maxYears = Math.max(1, ...alt.map((a) => (a.r.reached ? a.r.years : 0)));

  return (
    <Studio
      title="Your plan"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my FI age"
      onReset={st.reset}
      dock={{ label: "Financially independent at", value: r.reached ? `Age ${r.fiAge}` : "Not within 70 years" }}
      inputs={
        <>
          <InputGroup title="You">
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={16} max={80} unit="years" dp={0} />
            <MoneyField label="Spending a year in retirement" value={v.spend} onChange={st.bind("spend")} hint="In today's money, after tax." />
          </InputGroup>
          <InputGroup title="Savings">
            <MoneyField label="Invested so far" value={v.pot} onChange={st.bind("pot")} hint="Pensions, ISAs and other investments." />
            <MoneyField label="Saving a month" value={v.monthly} onChange={st.bind("monthly")} hint="Including employer pension contributions." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Real return a year" value={v.realReturn} onChange={st.bind("realReturn")} step={0.25} min={-5} max={15} unit="%" dp={2} optional hint="After inflation and charges." />
            <StepperField label="Safe withdrawal rate" value={v.swr} onChange={st.bind("swr")} step={0.25} min={1} max={10} unit="%" dp={2} optional hint="4% is the classic rule. 3% to 3.5% is more cautious." />
            <Switch label="Include the State Pension" checked={v.sp} onChange={st.bind("sp")} optional />
            {v.sp && (
              <>
                <MoneyField label="State Pension a year" value={v.spAmount} onChange={st.bind("spAmount")} optional hint={`The full new State Pension is ${gbp(FULL_SP)} a year in 2026/27.`} />
                <StepperField label="State Pension age" value={v.spa} onChange={(n) => st.set("spa", Math.round(n))} step={1} min={60} max={75} unit="years" dp={0} optional />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Financially independent"
        value={r.reached ? `Age ${r.fiAge}` : "Not yet in sight"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.reached ? (
            years === 0 ? (
              <>
                Your <b>{gbp(v.pot)}</b> already covers your target of <b>{gbp(r.target)}</b>. You could stop working now, if the assumptions hold.
              </>
            ) : (
              <>
                You need about <b>{gbp(r.target)}</b> in today&apos;s money. Saving {gbp(v.monthly)} a month, you get there in <b>{years} years</b>, at age <b>{r.fiAge}</b>.
              </>
            )
          ) : (
            <>Your saving does not reach the target of {gbp(r.target)} within 70 years. Try saving more, spending less, or a different return.</>
          )
        }
        badges={[`${percent(v.swr / 100, 2)} withdrawal`, `${percent(v.realReturn / 100, 2)} real return`, v.sp ? "State Pension included" : "No State Pension"]}
      />

      <Facts
        items={[
          { label: "Target pot", value: gbp(r.target) },
          { label: "Without the State Pension", value: gbp(r.targetNoSp) },
          { label: "Years to go", value: r.reached ? `${years}` : "70+" },
          { label: "Coast FI number today", value: gbp(r.coastAt), tone: v.pot >= r.coastAt ? "good" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Money", value: "Everything in today's money" },
          { label: "Return", value: `${v.realReturn}% a year above inflation, after charges` },
          { label: "Withdrawals", value: `${v.swr}% of the pot in the first year, rising with inflation` },
          { label: "State Pension", value: v.sp ? `${gbp(v.spAmount)} a year from ${v.spa}, with the gap before then bridged from the pot` : "Not included" },
          { label: "Tax", value: "Not modelled. Spending is after tax" },
        ]}
      />

      <ResultCard title="Your pot over time" sub="Compared with the target, in today's money.">
        <AreaChart
          ariaLabel="Pot over time"
          series={[
            { key: "pot", label: "Pot", color: "#5b1e6e", values: r.path, fill: true },
            { key: "target", label: "Target", color: "#94a3b8", values: targets, dashed: true },
          ]}
          xLabel={(i) => `Age ${pathAges[i]}`}
          yFormat={gbpShort}
          initial={r.path.length - 1}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) => (
            <>
              Age <b>{pathAges[i]}</b>: pot <b>{gbp(r.path[i] ?? 0)}</b>
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="What would change it" sub="Years until financial independence.">
        <Compare
          head={["Change", "Years"]}
          rows={alt.map((a, i) => ({
            label: a.label,
            value: a.r.reached ? `${a.r.years} (age ${a.r.fiAge})` : "70+",
            bar: a.r.reached ? a.r.years / maxYears : 1,
            current: i === 0,
            delta: i > 0 && a.r.reached && r.reached ? `${a.r.years - r.years >= 0 ? "+" : ""}${a.r.years - r.years}` : undefined,
            deltaTone: i > 0 && a.r.reached && r.reached ? (a.r.years <= r.years ? "down" : "up") : undefined,
          }))}
        />
      </ResultCard>

      <ResultCard title="Year by year" sub="Selected years.">
        <Statement columns={["Pot"]} rows={rows.map((x) => ({ label: `Age ${base.age + x.i}`, values: [gbp(x.p)] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Retiring early in the UK.">
        <Callout title="Mind the pension access age">
          Private pensions can usually be taken from 55, rising to 57 from April 2028. If you plan to stop before then, you need enough in ISAs or other savings to bridge the gap.
        </Callout>
        <Callout tone="warn" title="The 4% rule is a rule of thumb">
          It comes from US studies of past markets over 30 years. Early retirements last longer, and a fall in markets in the first few years can do lasting damage, so many people plan on 3% to 3.5%.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Illustration only. Returns are not guaranteed. Not financial advice.
      </p>
    </Studio>
  );
}

"use client";

import { cd, type Compounding } from "@/lib/us/savings";
import { rateFromApy, valueByMonth } from "@/lib/us/cd-extra";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { duration, percent, usd, usdShort } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

/** FDIC national average savings rate, September 21, 2026. */
const AVG_SAVINGS = 0.37;

const SCHEMA = {
  deposit: num(10_000, 0, 100_000_000),
  rate: num(4, 0, 20),
  rateType: oneOf<"apy" | "apr">("apy", ["apy", "apr"]),
  term: num(12, 1, 120),
  comp: oneOf<Compounding>("daily", ["daily", "monthly", "quarterly", "annually"]),
  early: bool(false),
  penalty: num(3, 0, 24),
  withdraw: num(6, 0, 120),
  tax: num(22, 0, 60),
  hysa: num(3.5, 0, 20),
};
const ADVANCED = ["comp", "early", "penalty", "withdraw", "tax", "hysa"] as const;
const COMP_LABEL: Record<Compounding, string> = { daily: "daily", monthly: "monthly", quarterly: "quarterly", annually: "once a year" };

export default function CdStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const nominal = v.rateType === "apy" ? rateFromApy(v.rate, v.comp) : v.rate;
  const withdrawAt = Math.min(v.withdraw, v.term);
  const c = cd(v.deposit, nominal, v.term, v.comp, v.penalty, withdrawAt, v.tax / 100);
  const afterTax = c.interest - c.tax;
  const cdPath = valueByMonth(v.deposit, c.apy, v.term);
  const hyPath = valueByMonth(v.deposit, v.hysa / 100, v.term);
  const avgPath = valueByMonth(v.deposit, AVG_SAVINGS / 100, v.term);
  const hyInterest = hyPath[hyPath.length - 1] - v.deposit;
  const avgInterest = avgPath[avgPath.length - 1] - v.deposit;
  const earlyGain = c.earlyValue - v.deposit;
  const maxInt = Math.max(1, c.interest, hyInterest, avgInterest);
  const rows = cdPath
    .map((val, m) => ({ m, val }))
    .filter(({ m }) => m > 0 && (m % (v.term > 24 ? 12 : v.term > 6 ? 3 : 1) === 0 || m === v.term))
    .map(({ m, val }) => [`Month ${m}`, usd(val, true), usd(val - v.deposit, true), usd(hyPath[m] - v.deposit, true)]);

  return (
    <Studio
      title="Your CD"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my CD"
      onReset={st.reset}
      dock={{ label: "At maturity", value: usd(c.maturity, true) }}
      inputs={
        <>
          <InputGroup title="Your deposit">
            <MoneyField symbol="$" label="Deposit" value={v.deposit} onChange={st.bind("deposit")} slider={{ min: 500, max: 250_000, step: 500, ends: ["$500", "$250k"] }} />
            <StepperField label="Interest rate" value={v.rate} onChange={st.bind("rate")} step={0.05} min={0} max={10} unit="%" dp={2} />
            <Segmented
              label="The rate is"
              value={v.rateType}
              onChange={st.bind("rateType")}
              options={[
                { value: "apy", label: "APY (annual percentage yield)", note: "The yield including compounding. Banks must quote it, so use it to compare CDs." },
                { value: "apr", label: "Interest rate before compounding", note: "The nominal rate; the APY is a little higher." },
              ]}
            />
            <StepperField label="Term" value={v.term} onChange={(n) => st.set("term", Math.round(n))} step={1} min={1} max={120} unit="months" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Interest compounded"
              value={v.comp}
              onChange={st.bind("comp")}
              optional
              options={[
                { value: "daily", label: "Daily" },
                { value: "monthly", label: "Monthly" },
                { value: "quarterly", label: "Quarterly" },
                { value: "annually", label: "Once a year" },
              ]}
            />
            <StepperField label="Your tax rate on interest" value={v.tax} onChange={st.bind("tax")} step={1} min={0} max={50} unit="%" dp={0} optional info="CD interest is taxed as ordinary income in the year it is credited. Use your federal bracket plus any state rate." />
            <StepperField label="High-yield savings rate to compare (APY)" value={v.hysa} onChange={st.bind("hysa")} step={0.05} min={0} max={10} unit="%" dp={2} optional info="Savings rates are variable and can fall during the term. The comparison holds the rate you enter." />
            <Switch label="Cash in the CD early" checked={v.early} onChange={st.bind("early")} optional />
            {v.early && (
              <>
                <StepperField label="Early withdrawal penalty" value={v.penalty} onChange={st.bind("penalty")} step={1} min={0} max={24} unit="months of interest" dp={0} optional info="Often about 3 months of interest for terms of a year or less, 6 months for 1 to 2 years and 12 months for longer terms. Your CD agreement gives the rule." />
                <StepperField label="Cash in after" value={withdrawAt} onChange={(n) => st.set("withdraw", Math.round(n))} step={1} min={0} max={v.term} unit="months" dp={0} optional />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`After ${duration(v.term)}`}
        value={usd(c.maturity, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {usd(v.deposit)} in a {duration(v.term)} CD at {percent(c.apy, 2)} APY earns <b>{usd(c.interest, true)}</b>{" "}of interest. After {v.tax}% tax you keep{" "}
            <b>{usd(afterTax, true)}</b>.
            {v.early ? (
              <>
                {" "}
                Cashing in after {duration(withdrawAt)} costs a <b>{usd(c.penalty, true)}</b>{" "}penalty, leaving <b>{usd(c.earlyValue, true)}</b>
                {earlyGain < 0 ? <>: {usd(-earlyGain, true)} less than you put in</> : null}.
              </>
            ) : null}
          </>
        }
        badges={[`APY ${percent(c.apy, 3)}`, `Rate ${nominal.toFixed(3)}% compounded ${COMP_LABEL[v.comp]}`, c.interest >= hyInterest ? `${usd(c.interest - hyInterest, true)} more than ${v.hysa}% savings` : `${usd(hyInterest - c.interest, true)} less than ${v.hysa}% savings`]}
      />

      <Facts
        items={[
          { label: "Interest earned", value: usd(c.interest, true), tone: "good" },
          { label: "Value at maturity", value: usd(c.maturity, true) },
          { label: "Tax on interest", value: usd(c.tax, true) },
          { label: "Interest after tax", value: usd(afterTax, true) },
          ...(v.early ? [{ label: "Early withdrawal penalty", value: usd(c.penalty, true), tone: "bad" as const }] : []),
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${percent(c.apy, 3)} APY, fixed for the term, interest left in the CD` },
          { label: "Compounding", value: COMP_LABEL[v.comp] },
          { label: "Tax", value: `${v.tax}% of the interest; your bank sends a 1099-INT each year interest is credited` },
          { label: "Penalty", value: v.early ? `${v.penalty} months of simple interest on the deposit, which can eat into principal` : "None: held to maturity" },
          { label: "Comparison", value: `High-yield savings at ${v.hysa}% APY and the national average of ${AVG_SAVINGS}%, both held steady` },
        ]}
      />

      <ResultCard title="What you get back" sub="Deposit, interest and tax at maturity.">
        <SplitBar
          segments={[
            { label: "Deposit", value: v.deposit, display: usd(v.deposit), color: "#94a3b8" },
            { label: "Interest after tax", value: Math.max(0, afterTax), display: usd(afterTax, true), color: "#0f9f6e" },
            { label: "Tax", value: c.tax, display: usd(c.tax, true), color: "#f59e0b" },
          ]}
        />
      </ResultCard>

      <ResultCard title="CD vs savings" sub={`Interest on ${usd(v.deposit)} over ${duration(v.term)}.`}>
        <Compare
          head={["Account", "Interest"]}
          rows={[
            { label: `This CD (${percent(c.apy, 2)} APY, fixed)`, value: usd(c.interest, true), bar: c.interest / maxInt, current: true },
            { label: `High-yield savings (${v.hysa}% APY, variable)`, value: usd(hyInterest, true), delta: `${c.interest >= hyInterest ? "−" : "+"}${usd(Math.abs(c.interest - hyInterest), true)}`, bar: hyInterest / maxInt },
            { label: `Average savings account (${AVG_SAVINGS}% APY)`, value: usd(avgInterest, true), delta: `−${usd(Math.max(0, c.interest - avgInterest), true)}`, deltaTone: "down", bar: avgInterest / maxInt },
          ]}
        />
      </ResultCard>

      <ResultCard title="Growth over the term" sub="This CD against high-yield savings.">
        <AreaChart
          ariaLabel="CD value by month"
          series={[
            { key: "cd", label: "CD", color: "#0f9f6e", values: cdPath, fill: true },
            { key: "hy", label: "High-yield savings", color: "#f59e0b", values: hyPath, dashed: true },
          ]}
          xLabel={(i) => `M${i}`}
          yFormat={usdShort}
          initial={v.term}
          hint="Drag across the chart, or use the arrow keys, to read any month."
          readout={(i) => (
            <>
              Month <b>{i}</b>: CD <b>{usd(cdPath[i] ?? 0, true)}</b>, savings <b>{usd(hyPath[i] ?? 0, true)}</b>.
            </>
          )}
        />
        <DataTable summary="Month-by-month value" columns={["Month", "CD value", "CD interest", "Savings interest"]} rows={rows} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you lock your money away.">
        {v.early && earlyGain < 0 && (
          <Callout tone="warn" title="The penalty eats into your deposit">
            Cashing in after {duration(withdrawAt)} costs more than the interest earned so far, so you get back less than you put in.
          </Callout>
        )}
        {v.deposit > 250_000 && (
          <Callout tone="warn" title="Over the insurance limit">
            FDIC and NCUA insurance covers $250,000 per depositor, per insured bank or credit union, for each ownership category. Spread larger sums across banks or ownership categories.
          </Callout>
        )}
        <Callout title="Check the insurance">
          Make sure the bank is FDIC-insured or the credit union is NCUA-insured. Deposits are covered up to $250,000 per depositor, per institution, per ownership category.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Your CD agreement sets the rate, compounding and penalty.
      </p>
    </Studio>
  );
}

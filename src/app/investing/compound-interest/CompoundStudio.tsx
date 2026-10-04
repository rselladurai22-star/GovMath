"use client";

import { compound, doublingYears } from "@/lib/investing/growth";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  principal: num(10_000, 0, 100_000_000),
  monthly: num(200, 0, 1_000_000),
  rate: num(5, -20, 50),
  years: num(20, 1, 100),
  periods: oneOf<"1" | "4" | "12" | "365">("12", ["1", "4", "12", "365"]),
  escalation: num(0, 0, 20),
  inflation: num(2, 0, 20),
};
const ADVANCED = ["periods", "escalation", "inflation"] as const;

export default function CompoundStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = compound({ principal: v.principal, monthly: v.monthly, rate: v.rate / 100, years: v.years, periods: Number(v.periods), escalation: v.escalation / 100, inflation: v.inflation / 100 });
  const d = doublingYears(r.effectiveRate);
  const bal = r.schedule.map((x) => x.balance);
  const paid = r.schedule.map((x) => x.contributed);
  const rows = r.schedule.filter((x) => x.year > 0 && (x.year % Math.max(1, Math.ceil(v.years / 10)) === 0 || x.year === v.years));

  return (
    <Studio
      title="Your savings"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate growth"
      onReset={st.reset}
      dock={{ label: `After ${v.years} years`, value: gbp(r.balance) }}
      inputs={
        <>
          <InputGroup title="Money in">
            <MoneyField label="Starting amount" value={v.principal} onChange={st.bind("principal")} />
            <MoneyField label="Monthly addition" value={v.monthly} onChange={st.bind("monthly")} />
          </InputGroup>
          <InputGroup title="Growth">
            <StepperField label="Interest or growth rate a year" value={v.rate} onChange={st.bind("rate")} step={0.25} min={-20} max={50} unit="%" dp={2} />
            <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={100} unit="years" dp={0} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Interest added"
              value={v.periods}
              onChange={st.bind("periods")}
              optional
              options={[
                { value: "1", label: "Once a year" },
                { value: "4", label: "Quarterly" },
                { value: "12", label: "Monthly" },
                { value: "365", label: "Daily" },
              ]}
            />
            <StepperField label="Increase monthly additions each year" value={v.escalation} onChange={st.bind("escalation")} step={0.5} min={0} max={20} unit="%" dp={1} optional hint="To keep pace with pay rises." />
            <StepperField label="Inflation" value={v.inflation} onChange={st.bind("inflation")} step={0.25} min={0} max={20} unit="%" dp={2} optional hint="Shows the result in today's money. The Bank of England target is 2%." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`After ${v.years} years`}
        value={gbp(r.balance)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You put in <b>{gbp(r.contributed)}</b> and earn <b>{gbp(r.interest)}</b> of interest, so your money grows to <b>{gbp(r.balance)}</b>. In today&apos;s money, after {v.inflation}% inflation, that is
            worth about <b>{gbp(r.real)}</b>.
          </>
        }
        badges={[`AER ${percent(r.effectiveRate, 2)}`, d.exact === Infinity ? "Never doubles" : `Doubles in ${d.exact.toFixed(1)} years`, `${percent(r.balance > 0 ? r.interest / r.balance : 0, 0)} from interest`]}
      />

      <Facts
        items={[
          { label: "Paid in", value: gbp(r.contributed) },
          { label: "Interest", value: gbp(r.interest), tone: "good" },
          { label: "Final balance", value: gbp(r.balance) },
          { label: "In today's money", value: gbp(r.real) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rate", value: `${v.rate}% a year, added ${v.periods === "1" ? "yearly" : v.periods === "4" ? "quarterly" : v.periods === "12" ? "monthly" : "daily"}` },
          { label: "Additions", value: `At the end of each month${v.escalation ? `, rising ${v.escalation}% a year` : ""}` },
          { label: "Tax", value: "None (as in an ISA or pension)" },
          { label: "Inflation", value: `${v.inflation}% a year` },
        ]}
      />

      <ResultCard title="Growth over time" sub="Balance compared with what you paid in.">
        <AreaChart
          ariaLabel="Balance over time"
          series={[
            { key: "bal", label: "Balance", color: "#4353ff", values: bal, fill: true },
            { key: "paid", label: "Paid in", color: "#94a3b8", values: paid, dashed: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={gbpShort}
          initial={v.years}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) => (
            <>
              Year <b>{i}</b>: balance <b>{gbp(bal[i] ?? 0)}</b>, of which <b>{gbp((bal[i] ?? 0) - (paid[i] ?? 0))}</b> is interest.
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Paid in", value: r.contributed, display: gbp(r.contributed), color: "#94a3b8" },
            { label: "Interest", value: Math.max(0, r.interest), display: gbp(r.interest), color: "#4353ff" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Year by year" sub="Selected years.">
        <Statement columns={["Paid in", "Balance"]} rows={rows.map((x) => ({ label: `Year ${x.year}`, values: [gbp(x.contributed), gbp(x.balance)] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Making compounding work.">
        <Callout title="Start early">
          Time does most of the work. The same monthly saving started ten years earlier can end up worth far more, because the interest earns interest for longer.
        </Callout>
        <Callout title="Tax and charges slow it down">
          Outside an ISA or pension, tax on interest and dividends reduces growth. Fund and platform charges do too: 1% a year can cost a fifth of the final pot over 25 years.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Illustration only. Investment returns are not guaranteed. Not financial advice.
      </p>
    </Studio>
  );
}

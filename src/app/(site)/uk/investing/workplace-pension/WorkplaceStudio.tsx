"use client";

import { AUTO_ENROL, workplacePension } from "@/lib/investing/retirement";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, gbpShort, percent, per } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  salary: num(35_000, 0, 10_000_000),
  employeePct: num(5, 0, 100),
  employerPct: num(3, 0, 100),
  basis: oneOf<"qualifying" | "full">("qualifying", ["qualifying", "full"]),
  age: num(30, 16, 75),
  retireAge: num(68, 55, 80),
  pot: num(0, 0, 100_000_000),
  salaryGrowth: num(1, -5, 10),
  realReturn: num(4, -5, 15),
};
const ADVANCED = ["basis", "age", "retireAge", "pot", "salaryGrowth", "realReturn"] as const;

export default function WorkplaceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = {
    salary: v.salary,
    employeePct: v.employeePct,
    employerPct: v.employerPct,
    basis: v.basis,
    age: Math.round(v.age),
    retireAge: Math.max(Math.round(v.age), Math.round(v.retireAge)),
    pot: v.pot,
    salaryGrowth: v.salaryGrowth / 100,
    realReturn: v.realReturn / 100,
  };
  const r = workplacePension(base);
  const years = base.retireAge - base.age;
  const pots = r.path.map((p) => p.pot);
  const paid = r.path.reduce<number[]>((acc, p, i) => [...acc, (acc[i - 1] ?? v.pot) + (i === 0 ? 0 : p.contributions)], []);

  const alts = [
    { label: "As entered", pct: v.employeePct },
    { label: `You pay ${v.employeePct + 1}%`, pct: v.employeePct + 1 },
    { label: `You pay ${v.employeePct + 3}%`, pct: v.employeePct + 3 },
  ].map((a) => ({ ...a, r: workplacePension({ ...base, employeePct: a.pct }) }));
  const optOut = workplacePension({ ...base, employeePct: 0, employerPct: 0 });
  const maxPot = Math.max(1, ...alts.map((a) => a.r.pot));

  return (
    <Studio
      title="Your workplace pension"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my pension"
      onReset={st.reset}
      dock={{ label: "Going in each month", value: gbp(r.total / 12) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField label="Salary a year" value={v.salary} onChange={st.bind("salary")} hint="Before tax." />
          </InputGroup>
          <InputGroup title="Contributions">
            <StepperField label="You pay" value={v.employeePct} onChange={st.bind("employeePct")} step={0.5} min={0} max={100} unit="%" dp={1} hint="The legal minimum is 5%, including tax relief." />
            <StepperField label="Your employer pays" value={v.employerPct} onChange={st.bind("employerPct")} step={0.5} min={0} max={100} unit="%" dp={1} hint="At least 3%." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Contributions are a percentage of"
              value={v.basis}
              onChange={st.bind("basis")}
              optional
              options={[
                { value: "qualifying", label: "Qualifying earnings", note: `Pay between ${gbp(AUTO_ENROL.lower)} and ${gbp(AUTO_ENROL.upper)}. The usual default.` },
                { value: "full", label: "Full salary", note: "Many employers use your whole basic pay." },
              ]}
            />
            <StepperField label="Your age" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={16} max={75} unit="years" dp={0} optional />
            <StepperField label="Age you stop paying in" value={v.retireAge} onChange={(n) => st.set("retireAge", Math.round(n))} step={1} min={55} max={80} unit="years" dp={0} optional />
            <MoneyField label="Pension you have already" value={v.pot} onChange={st.bind("pot")} optional />
            <StepperField label="Pay rises above inflation" value={v.salaryGrowth} onChange={st.bind("salaryGrowth")} step={0.5} min={-5} max={10} unit="%" dp={1} optional />
            <StepperField label="Investment growth above inflation" value={v.realReturn} onChange={st.bind("realReturn")} step={0.25} min={-5} max={15} unit="%" dp={2} optional hint="After charges." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your pot at ${base.retireAge}, in today's money`}
        value={gbp(r.pot)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !r.enrolled && v.salary > 0 ? (
            <>
              You earn under {gbp(AUTO_ENROL.trigger)}, so you are not automatically enrolled, but you can ask to join. If you do, your pension could grow to <b>{gbp(r.pot)}</b> by {base.retireAge}.
            </>
          ) : (
            <>
              Each year <b>{gbp(r.total)}</b> goes into your pension: {gbp(r.employee)} from you and {gbp(r.employer)} from your employer. It costs you about <b>{gbp(r.employeeNet)}</b> after basic-rate
              tax relief. Over {years} {per(years, "years")} it could grow to <b>{gbp(r.pot)}</b>{" "}in today&apos;s money.
            </>
          )
        }
        badges={[r.meetsMinimum ? "Meets the legal minimum" : "Below the legal minimum", r.enrolled ? "Auto-enrolled" : "Can opt in", `${percent(r.pensionable > 0 ? r.total / Math.max(1, v.salary) : 0, 1)} of salary`]}
      />

      <Facts
        items={[
          { label: "You pay a month", value: gbp(r.employee / 12) },
          { label: "Employer pays a month", value: gbp(r.employer / 12), tone: "good" },
          { label: "Cost to you after relief", value: `${gbp(r.employeeNet / 12)} a month` },
          { label: "Pensionable pay", value: gbp(r.pensionable) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Basis", value: v.basis === "qualifying" ? `Qualifying earnings, ${gbp(AUTO_ENROL.lower)} to ${gbp(AUTO_ENROL.upper)}` : "Full salary" },
          { label: "Growth", value: `${v.realReturn}% a year above inflation, after charges` },
          { label: "Pay", value: `Rising ${v.salaryGrowth}% a year above inflation; thresholds kept level in today's money` },
          { label: "Tax relief", value: "Basic rate (20%). Higher-rate taxpayers can get more" },
        ]}
      />

      <ResultCard title="Your pot over time" sub="In today's money.">
        <AreaChart
          ariaLabel="Pension pot over time"
          series={[
            { key: "pot", label: "Pot", color: "#5b1e6e", values: pots, fill: true },
            { key: "paid", label: "Paid in", color: "#94a3b8", values: paid, dashed: true },
          ]}
          xLabel={(i) => `Age ${base.age + i}`}
          yFormat={gbpShort}
          initial={years}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) => (
            <>
              Age <b>{base.age + i}</b>: pot <b>{gbp(pots[i] ?? 0)}</b>
            </>
          )}
        />
        <SplitBar
          segments={[
            { label: "Your contributions", value: r.employee, display: `${gbp(r.employee)} a year`, color: "#5b1e6e" },
            { label: "Employer", value: r.employer, display: `${gbp(r.employer)} a year`, color: "#16a34a" },
          ]}
        />
      </ResultCard>

      <ResultCard title="At retirement" sub="Rough guide, in today's money.">
        <Facts
          items={[
            { label: "Pot", value: gbp(r.pot) },
            { label: "Tax-free lump sum (25%)", value: gbp(r.taxFree) },
            { label: "Income at 4% a year", value: gbp(r.income) },
            { label: "If you opted out", value: gbp(optOut.pot), tone: "bad" },
          ]}
        />
      </ResultCard>

      <ResultCard title="If you paid a little more" sub={`Pot at ${base.retireAge}, in today's money.`}>
        <Compare
          head={["You pay", "Pot"]}
          rows={alts.map((a, i) => ({
            label: a.label,
            value: gbp(a.r.pot),
            bar: a.r.pot / maxPot,
            current: i === 0,
            delta: i > 0 ? `+${gbp(a.r.pot - r.pot)}` : undefined,
            deltaTone: "down",
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Getting the most from it.">
        {!r.meetsMinimum && r.enrolled && (
          <Callout tone="warn" title="Below the auto-enrolment minimum">
            The legal minimum is 8% of qualifying earnings in total, with at least 3% from your employer. Check your payslip or ask your employer.
          </Callout>
        )}
        <Callout title="Ask about a higher match">
          Many employers pay more if you do, up to a limit. Paying in enough to get the full match is usually one of the best returns available.
        </Callout>
        <Callout title="Salary sacrifice">If your employer offers salary sacrifice, you also save National Insurance on your contributions.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Investment returns are not guaranteed. Not financial advice.
      </p>
    </Studio>
  );
}

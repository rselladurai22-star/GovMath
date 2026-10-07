"use client";

import { fromHourly, fromSalary } from "@/lib/us/pay";
import { US_2026 } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { per, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Dir = "salary" | "hourly";

const SCHEMA = {
  dir: oneOf<Dir>("salary", ["salary", "hourly"]),
  salary: num(50_000, 0, 10_000_000),
  hourly: num(25, 0, 10_000),
  hours: num(40, 1, 100),
  weeks: num(52, 1, 52),
  unpaid: num(0, 0, 260),
  days: num(5, 1, 7),
};
const ADVANCED = ["weeks", "unpaid", "days"] as const;

/** The FLSA salary level for the white-collar overtime exemption: $684 a week. */
const EXEMPT_WEEKLY = 684;

export default function SalaryHourlyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const days = Math.round(v.days);
  // Unpaid days off come out of the paid weeks (hourly pay only).
  const unpaidWeeks = v.dir === "hourly" ? Math.min(v.weeks, v.unpaid / days) : 0;
  const weeks = Math.max(0, v.weeks - unpaidWeeks);
  const p = v.dir === "salary" ? fromSalary(v.salary, v.hours, v.weeks, days) : fromHourly(v.hourly, v.hours, weeks, days);
  const minWage = US_2026.minimumWage;
  const minYear = fromHourly(minWage, v.hours, weeks, days).annual;
  const times = minWage > 0 ? p.hourly / minWage : 0;
  const belowMin = p.hourly > 0 && p.hourly < minWage;
  const weeklyPaid = p.weekly;
  const belowExempt = v.dir === "salary" && v.salary > 0 && weeklyPaid < EXEMPT_WEEKLY;
  const yearHours = v.hours * (v.dir === "salary" ? v.weeks : weeks);
  const fmt = (n: number) => usd(n, true);

  const rows = [
    { label: "Hourly", value: p.hourly },
    { label: `Daily (${days} ${per(days, "days")} a week)`, value: p.daily },
    { label: "Weekly", value: p.weekly },
    { label: "Every two weeks (26)", value: p.biweekly },
    { label: "Twice a month (24)", value: p.semimonthly },
    { label: "Monthly (12)", value: p.monthly },
    { label: "Yearly", value: p.annual },
  ];

  return (
    <Studio
      title="Your pay"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={v.dir === "salary" ? "Work out my hourly rate" : "Work out my salary"}
      onReset={st.reset}
      dock={{ label: v.dir === "salary" ? "Hourly" : "Yearly", value: v.dir === "salary" ? fmt(p.hourly) : usd(p.annual) }}
      inputs={
        <>
          <InputGroup title="What you are paid">
            <Segmented
              label="I know my"
              value={v.dir}
              onChange={st.bind("dir")}
              options={[
                { value: "salary", label: "Yearly salary" },
                { value: "hourly", label: "Hourly rate" },
              ]}
            />
            {v.dir === "salary" ? (
              <MoneyField label="Yearly salary" value={v.salary} onChange={st.bind("salary")} symbol="$" max={10_000_000} slider={{ min: 0, max: 250_000, step: 1_000, ends: ["$0", "$250k"] }} />
            ) : (
              <MoneyField label="Hourly rate" value={v.hourly} onChange={st.bind("hourly")} symbol="$" pence max={10_000} slider={{ min: 0, max: 150, step: 0.25, ends: ["$0", "$150"] }} />
            )}
            <StepperField label="Hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} min={1} max={100} unit="hours" dp={1} info="Count the hours you actually work. A salaried job that runs to 45 hours a week pays less per hour than its 40-hour figure suggests." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label={v.dir === "salary" ? "Weeks worked a year" : "Paid weeks a year"}
              value={v.weeks}
              onChange={(n) => st.set("weeks", Math.round(n))}
              step={1}
              min={1}
              max={52}
              unit="weeks"
              dp={0}
              optional
              info="52 counts paid vacation and holidays as paid time. For a salary, fewer weeks raises the hourly rate for the weeks you actually work."
            />
            {v.dir === "hourly" && (
              <StepperField label="Unpaid days off a year" value={v.unpaid} onChange={(n) => st.set("unpaid", Math.round(n))} step={1} min={0} max={260} unit="days" dp={0} optional info="Days you take off without pay, such as unpaid vacation. They reduce the yearly figure." />
            )}
            <StepperField label="Working days a week" value={v.days} onChange={(n) => st.set("days", Math.round(n))} step={1} min={1} max={7} unit="days" dp={0} optional info="Used only for the daily figure." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.dir === "salary" ? `${usd(v.salary)} a year is` : `${fmt(v.hourly)} an hour is`}
        value={v.dir === "salary" ? fmt(p.hourly) : usd(p.annual)}
        unit={v.dir === "salary" ? "an hour" : "a year"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            At <b>{v.hours} hours a week</b> for <b>{Math.round((v.dir === "salary" ? v.weeks : weeks) * 10) / 10} weeks</b> a year ({Math.round(yearHours).toLocaleString("en-US")} hours), that is <b>{usd(p.weekly)}</b> a week and{" "}
            <b>{usd(p.monthly)}</b> a month before tax.
          </>
        }
        badges={[`${usd(p.biweekly)} every two weeks`, `${times.toFixed(1)}× the federal minimum wage`]}
      />

      <Facts
        items={[
          { label: "Hourly", value: fmt(p.hourly) },
          { label: "Weekly", value: usd(p.weekly) },
          { label: "Monthly", value: usd(p.monthly) },
          { label: "Yearly", value: usd(p.annual) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Hours", value: `${v.hours} a week, ${Math.round(yearHours).toLocaleString("en-US")} a year` },
          { label: "Weeks", value: v.dir === "salary" ? `${v.weeks} worked a year` : `${Math.round(weeks * 10) / 10} paid a year${v.unpaid > 0 ? ` after ${v.unpaid} unpaid ${per(v.unpaid, "days")}` : ""}` },
          { label: "Overtime", value: "Not included: every hour at the same rate" },
          { label: "Tax", value: "Before federal, state and payroll taxes" },
        ]}
      />

      <ResultCard title="Your pay in every period" sub="Before tax. Biweekly is 26 paychecks a year; twice a month is 24.">
        <Statement columns={["Pay"]} rows={rows.map((r, i) => ({ label: r.label, values: [i < 2 ? fmt(r.value) : usd(r.value, r.value < 1_000)], kind: i === rows.length - 1 ? ("total" as const) : undefined }))} />
      </ResultCard>

      <ResultCard title="Against the federal minimum wage" sub={`The federal minimum is ${fmt(minWage)} an hour. Many states and cities set a higher one.`}>
        <BarChart
          rows={[
            { label: "Your hourly rate", value: p.hourly, display: fmt(p.hourly), current: true },
            { label: "Federal minimum wage", value: minWage, display: fmt(minWage) },
          ]}
        />
        <Statement
          columns={["You", "Minimum wage"]}
          rows={[
            { label: "Hourly", values: [fmt(p.hourly), fmt(minWage)] },
            { label: "Yearly at your hours", values: [usd(p.annual), usd(minYear)] },
            { label: "Difference a year", values: [usd(p.annual - minYear), ""], kind: "total" },
          ]}
        />
      </ResultCard>

      {(belowMin || belowExempt) && (
        <ResultCard title="Check your pay" sub="Federal rules that may apply.">
          {belowMin && (
            <Callout tone="warn" title="Below the federal minimum wage">
              {fmt(p.hourly)} an hour is less than {fmt(minWage)}. Most employees covered by the Fair Labor Standards Act must be paid at least the federal minimum, or the state minimum where it is higher. Tipped workers can be paid a lower cash wage if tips make up the difference.
            </Callout>
          )}
          {belowExempt && (
            <Callout tone="warn" title="You may be owed overtime">
              {usd(p.weekly)} a week is below the $684 a week ($35,568 a year) salary level for the federal overtime exemption, so hours over 40 in a week should be paid at time and a half. Use the{" "}
              <a href="/us/taxes/overtime-calculator">overtime calculator</a> to see what that adds up to.
            </Callout>
          )}
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>
        Before tax. See your take-home pay with the <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>.
      </p>
    </Studio>
  );
}

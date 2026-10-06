"use client";

import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { MAINTENANCE_2026, type Living } from "@/lib/students/loans";
import { degreeCost } from "@/lib/students/nations";

const LIVING: Living[] = ["away", "home", "london", "abroad"];

const SCHEMA = {
  years: num(3, 1, 7),
  living: oneOf<Living>("away", LIVING),
  income: num(40_000, 0, 1_000_000),
  maint: bool(true),
  salary: num(28_000, 0, 500_000),
  tuition: num(9_790, 0, 20_000),
  feeGrowth: num(3, 0, 10),
  salaryGrowth: num(4.5, 0, 15),
  rpi: num(3, 0, 10),
};
const ADVANCED = ["tuition", "feeGrowth", "salaryGrowth", "rpi"] as const;

export default function DegreeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = degreeCost({
    years: v.years,
    tuition: v.tuition,
    feeGrowth: v.feeGrowth / 100,
    living: v.living,
    income: v.income,
    maintenance: v.maint,
    rpi: v.rpi / 100,
    salary: v.salary,
    salaryGrowth: v.salaryGrowth / 100,
  });
  const p = r.repayment;
  const first = p.path[0];

  return (
    <Studio
      title="Your course and your plans"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out the cost of my degree"
      onReset={st.reset}
      dock={{ label: "Borrowed", value: gbp(r.borrowed) }}
      inputs={
        <>
          <InputGroup title="Your course">
            <StepperField label="Length of course" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={7} unit="years" dp={0} hint="Include a placement or year abroad if you will take one." />
            <SelectField label="Where you will live" value={v.living} onChange={st.bind("living")} options={LIVING.map((l) => ({ value: l, label: MAINTENANCE_2026[l].label }))} />
            <Switch label="Take the maintenance loan" checked={v.maint} onChange={st.bind("maint")} />
            {v.maint && <MoneyField label="Household income" value={v.income} onChange={st.bind("income")} hint="Your parents' (or your own, if independent) income before tax. Above £25,000 the maintenance loan goes down." />}
          </InputGroup>
          <InputGroup title="After you graduate">
            <MoneyField label="Starting salary" value={v.salary} onChange={st.bind("salary")} slider={{ min: 0, max: 80_000, step: 500, ends: ["£0", "£80k"] }} hint="Plan 5 repayments are 9% of income over £25,000." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Tuition fee in the first year" value={v.tuition} onChange={st.bind("tuition")} optional hint="£9,790 is the 2026/27 cap for most courses." />
            <StepperField label="Yearly rise in fees and loans" value={v.feeGrowth} onChange={st.bind("feeGrowth")} step={0.5} min={0} max={10} unit="%" dp={1} optional hint="The government plans to raise the fee cap and maintenance loans with inflation." />
            <StepperField label="Yearly pay rise after graduating" value={v.salaryGrowth} onChange={st.bind("salaryGrowth")} step={0.5} min={0} max={15} unit="%" dp={1} optional />
            <StepperField label="RPI inflation" value={v.rpi} onChange={st.bind("rpi")} step={0.5} min={0} max={10} unit="%" dp={1} optional hint="Plan 5 interest is RPI only, during and after the course. 4.1% applies from September 2026." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You borrow"
        value={gbp(r.borrowed)}
        unit={`over ${v.years} ${v.years === 1 ? "year" : "years"}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Tuition of <b>{gbp(r.tuitionTotal)}</b>
            {v.maint ? <> and maintenance loans of <b>{gbp(r.maintenanceTotal)}</b></> : null} grow to about <b>{gbp(r.balanceAtGraduation)}</b> by graduation. On a starting salary of {gbp(v.salary)}, you would repay about{" "}
            <b>{gbp(p.totalRepaid)}</b> in total{p.clearedIn ? <>, clearing the loan in {p.clearedIn} years</> : <>, and {gbp(p.writtenOff)} would be written off after 40 years</>}.
          </>
        }
        badges={["Plan 5 loan", MAINTENANCE_2026[v.living].label, `${percent(v.rpi / 100, 1)} RPI assumed`]}
      />

      <Facts
        items={[
          { label: "Balance at graduation", value: gbp(r.balanceAtGraduation) },
          { label: "First year's repayments", value: gbp(first?.repaid ?? 0), note: `${gbp((first?.repaid ?? 0) / 12)} a month` },
          { label: "Total repaid", value: gbp(p.totalRepaid) },
          { label: p.clearedIn ? "Cleared in" : "Written off", value: p.clearedIn ? `${p.clearedIn} years` : gbp(p.writtenOff), tone: p.clearedIn ? undefined : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Loan plan", value: "Plan 5: courses in England starting from August 2023" },
          { label: "Fees", value: `${gbp(v.tuition)} in year 1, rising ${percent(v.feeGrowth / 100, 1)} a year` },
          { label: "Repayment", value: "9% over £25,000, threshold rising with RPI from 2027; written off after 40 years" },
          { label: "Salary", value: `${gbp(v.salary)}, rising ${percent(v.salaryGrowth / 100, 1)} a year` },
        ]}
      />

      <ResultCard title="What you borrow" sub="Over the whole course.">
        <SplitBar
          segments={[
            { label: "Tuition fee loans", value: r.tuitionTotal, display: gbp(r.tuitionTotal), color: "#0f9f6e" },
            ...(v.maint ? [{ label: "Maintenance loans", value: r.maintenanceTotal, display: gbp(r.maintenanceTotal), color: "#5b1e6e" }] : []),
            { label: "Interest while studying", value: r.interestWhileStudying, display: gbp(r.interestWhileStudying), color: "#f59e0b" },
          ]}
        />
        <Statement
          columns={["Tuition", "Maintenance", "Balance at year end"]}
          rows={r.years.map((y) => ({ label: `Year ${y.year}`, values: [gbp(y.tuition), gbp(y.maintenance), gbp(y.balance)] }))}
        />
      </ResultCard>

      {p.path.length > 1 && (
        <ResultCard title="Your loan after graduating" sub="Balance and repayments each year.">
          <AreaChart
            ariaLabel="Loan balance over the repayment period"
            series={[
              { key: "bal", label: "Balance", color: "#5b1e6e", values: p.path.map((y) => y.balance), fill: true },
              { key: "rep", label: "Repaid that year", color: "#0f9f6e", values: p.path.map((y) => y.repaid) },
            ]}
            xLabel={(i) => `Year ${i + 1}`}
            yFormat={gbpShort}
            initial={0}
            readout={(i) => {
              const y = p.path[i];
              if (!y) return null;
              return (
                <>
                  Year <b>{y.year}</b>: salary {gbp(y.salary)}, repay <b>{gbp(y.repaid)}</b>, balance <b>{gbp(y.balance)}</b>.
                </>
              );
            }}
          />
        </ResultCard>
      )}

      <ResultCard title="What it means">
        <Callout title="What you repay matters more than what you borrow">
          Plan 5 works like a graduate tax: you pay 9% of income over £25,000 for up to 40 years, whatever the balance. Most graduates on average earnings repay for most of that time; only higher earners clear the loan.
        </Callout>
        {v.maint && v.income > 25_000 && (
          <Callout title="Parents are expected to help">
            With household income over £25,000 the maintenance loan is reduced. Student Finance England expects parents to make up the difference, though nobody can make them.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Student Finance England 2026/27 figures. Future fees, interest, thresholds and pay are assumptions; actual figures will differ.
      </p>
    </Studio>
  );
}

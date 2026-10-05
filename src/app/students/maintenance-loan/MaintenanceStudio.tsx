"use client";

import { MAINTENANCE_2026, maintenanceLoan2026, STUDENT_SUPPORT_2026, type Living } from "@/lib/students/loans";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  income: num(40_000, 0, 1_000_000),
  living: oneOf<Living>("away", ["home", "away", "london", "abroad"]),
  years: num(3, 1, 7),
  fee: num(STUDENT_SUPPORT_2026.tuitionFee, 0, 20_000),
  rent: num(160, 0, 1_000),
  over60: bool(false),
};
const ADVANCED = ["years", "fee", "rent", "over60"] as const;

export default function MaintenanceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = maintenanceLoan2026(v.income, v.living);
  const loan = v.over60 ? STUDENT_SUPPORT_2026.over60 : r.loan;
  const years = Math.round(v.years);
  const totalBorrowed = (loan + v.fee) * years;
  const weeklyRent = v.rent;
  const rentYear = weeklyRent * 40;
  const left = loan - rentYear;
  const incomes = [25_000, 35_000, 45_000, 55_000, 65_000, 75_000].map((x) => ({ x, loan: maintenanceLoan2026(x, v.living).loan }));
  const maxL = Math.max(1, ...incomes.map((i) => i.loan));
  const kinds = (Object.keys(MAINTENANCE_2026) as Living[]).map((k) => ({ k, loan: maintenanceLoan2026(v.income, k).loan }));

  return (
    <Studio
      title="Your student finance"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my maintenance loan"
      onReset={st.reset}
      dock={{ label: "Loan a year", value: gbp(loan) }}
      inputs={
        <>
          <InputGroup title="Your household">
            <MoneyField label="Household income" value={v.income} onChange={st.bind("income")} hint="Usually your parents' taxable income for the 2024/25 tax year, less pension contributions and £1,130 for each other child." />
          </InputGroup>
          <InputGroup title="Where you will live">
            <SelectField label="Living" value={v.living} onChange={st.bind("living")} options={(Object.keys(MAINTENANCE_2026) as Living[]).map((k) => ({ value: k, label: MAINTENANCE_2026[k].label }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Years of the course" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={7} unit="years" dp={0} optional />
            <MoneyField label="Tuition fee a year" value={v.fee} onChange={st.bind("fee")} optional hint="£9,790 at most for 2026/27 in England." />
            <MoneyField label="Rent a week" value={v.rent} onChange={st.bind("rent")} optional hint="Most halls charge for about 40 weeks." />
            <Switch label="Aged 60 or over when the course starts" checked={v.over60} onChange={st.bind("over60")} optional hint={`Students aged 60 or over can get up to ${gbp(STUDENT_SUPPORT_2026.over60)}, not means-tested.`} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Maintenance loan for 2026/27"
        value={gbp(loan)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {v.over60 ? (
              <>Students aged 60 or over can get up to {gbp(loan)} a year towards living costs.</>
            ) : (
              <>
                With a household income of {gbp(v.income)}, {MAINTENANCE_2026[v.living].label.toLowerCase()}, you can borrow <b>{gbp(loan)}</b> a year for living costs, paid in three instalments of
                about <b>{gbp(r.perTerm)}</b>. The most anyone in your situation can get is {gbp(r.max)}; the least is {gbp(r.min)}.
              </>
            )}{" "}
            Over a {years}-year course with tuition fees of {gbp(v.fee)}, you would borrow about <b>{gbp(totalBorrowed)}</b> before interest.
          </>
        }
        badges={[`${gbp(r.perTerm)} a term`, v.income <= 25_000 ? "Full loan" : r.loan <= r.min ? "Minimum loan" : "Means-tested", `Fees ${gbp(v.fee)}`]}
      />

      <Facts
        items={[
          { label: "Loan a year", value: gbp(loan) },
          { label: "Each term", value: gbp(Math.round(loan / 3)) },
          { label: "After 40 weeks' rent", value: gbp(left), tone: left < 0 ? "bad" : undefined },
          { label: `Borrowed over ${years} years`, value: gbp(totalBorrowed) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Year", value: "2026/27, Student Finance England, full-time" },
          { label: "Household income", value: "Above £25,000 the loan falls in a straight line to the minimum" },
          { label: "Not included", value: "Final-year rates, Long Courses Loan, grants and bursaries" },
        ]}
      />

      <ResultCard title="Loan by household income" sub={MAINTENANCE_2026[v.living].label}>
        <Compare head={["Household income", "Loan"]} rows={incomes.map((i) => ({ label: gbp(i.x), value: gbp(i.loan), bar: i.loan / maxL }))} />
      </ResultCard>

      <ResultCard title="Where you live" sub={`At ${gbp(v.income)} household income.`}>
        <Statement columns={["Loan"]} rows={kinds.map((k) => ({ label: MAINTENANCE_2026[k.k].label, values: [gbp(k.loan)] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Making it stretch.">
        {left < 0 && (
          <Callout tone="warn" title="Rent is more than the loan">
            At {gbp(weeklyRent)} a week for 40 weeks, rent costs {gbp(rentYear)}, more than your loan. Parents are expected to help make up the gap at higher incomes.
          </Callout>
        )}
        <Callout title="Extra help">Ask your university about bursaries and hardship funds. Students with children or a disability can get grants that do not need to be repaid.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Student Finance England confirms your exact amount.
      </p>
    </Studio>
  );
}

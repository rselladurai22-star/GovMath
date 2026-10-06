"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { studentBudget } from "@/lib/students/nations";

const SCHEMA = {
  loan: num(10_830, 0, 50_000),
  grants: num(0, 0, 50_000),
  parents: num(0, 0, 50_000),
  jobHours: num(0, 0, 40),
  jobRate: num(12.71, 0, 100),
  jobWeeks: num(30, 0, 52),
  rent: num(170, 0, 1_000),
  rentWeeks: num(44, 0, 52),
  food: num(50, 0, 500),
  travel: num(15, 0, 500),
  phone: num(10, 0, 500),
  social: num(30, 0, 500),
  other: num(10, 0, 500),
  livingWeeks: num(39, 1, 52),
  course: num(300, 0, 10_000),
};
const ADVANCED = ["jobWeeks", "livingWeeks", "course", "other"] as const;

export default function BudgetStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const livingWeekly = v.food + v.travel + v.phone + v.social + v.other;
  const r = studentBudget({
    loan: v.loan,
    grants: v.grants,
    parents: v.parents,
    jobHours: v.jobHours,
    jobRate: v.jobRate,
    jobWeeks: v.jobWeeks,
    rentWeekly: v.rent,
    rentWeeks: v.rentWeeks,
    livingWeekly,
    livingWeeks: v.livingWeeks,
    course: v.course,
  });
  const short = r.balance < 0;
  const cats = [
    { label: "Rent", value: r.rent },
    { label: "Food", value: v.food * v.livingWeeks },
    { label: "Travel", value: v.travel * v.livingWeeks },
    { label: "Phone and subscriptions", value: v.phone * v.livingWeeks },
    { label: "Going out", value: v.social * v.livingWeeks },
    { label: "Other", value: v.other * v.livingWeeks },
    { label: "Course costs", value: v.course },
  ];
  const maxC = Math.max(1, ...cats.map((c) => c.value));
  // Extra job hours a week (over the job weeks) that would close a shortfall.
  const hoursToClose = short && v.jobRate > 0 && v.jobWeeks > 0 ? -r.balance / v.jobRate / v.jobWeeks : 0;

  return (
    <Studio
      title="Your money in and out for the year"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my student budget"
      onReset={st.reset}
      dock={{ label: short ? "Short a week" : "Left a week", value: gbp(Math.abs(r.weekly)) }}
      inputs={
        <>
          <InputGroup title="Money in, for the year">
            <MoneyField label="Maintenance loan" value={v.loan} onChange={st.bind("loan")} hint="Your loan for living costs. Use our maintenance loan, SAAS or Welsh student finance calculators to find it." />
            <MoneyField label="Grants and bursaries" value={v.grants} onChange={st.bind("grants")} hint="University bursaries, the Welsh Learning Grant or a SAAS bursary." />
            <MoneyField label="From parents or family" value={v.parents} onChange={st.bind("parents")} />
            <StepperField label="Part-time job: hours a week" value={v.jobHours} onChange={st.bind("jobHours")} step={1} min={0} max={40} unit="hours" dp={0} />
            {v.jobHours > 0 && <MoneyField label="Hourly pay" value={v.jobRate} onChange={st.bind("jobRate")} pence hint="The National Living Wage is £12.71 at 21 or over, £10.85 at 18 to 20, from April 2026." />}
          </InputGroup>
          <InputGroup title="Money out">
            <MoneyField label="Rent a week" value={v.rent} onChange={st.bind("rent")} hint="Including bills if your rent covers them." />
            <StepperField label="Weeks of rent" value={v.rentWeeks} onChange={st.bind("rentWeeks")} step={1} min={0} max={52} unit="weeks" dp={0} hint="Halls contracts are often 40 to 44 weeks; private houses often 50 to 52." />
            <MoneyField label="Food a week" value={v.food} onChange={st.bind("food")} />
            <MoneyField label="Travel a week" value={v.travel} onChange={st.bind("travel")} />
            <MoneyField label="Phone and subscriptions a week" value={v.phone} onChange={st.bind("phone")} />
            <MoneyField label="Going out a week" value={v.social} onChange={st.bind("social")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks you work" value={v.jobWeeks} onChange={st.bind("jobWeeks")} step={1} min={0} max={52} unit="weeks" dp={0} optional />
            <StepperField label="Weeks of living costs to cover" value={v.livingWeeks} onChange={st.bind("livingWeeks")} step={1} min={1} max={52} unit="weeks" dp={0} optional hint="39 for term time; 52 if you stay all year." />
            <MoneyField label="Other costs a week" value={v.other} onChange={st.bind("other")} optional hint="Toiletries, laundry, clothes, gifts." />
            <MoneyField label="Course costs for the year" value={v.course} onChange={st.bind("course")} optional hint="Books, equipment, printing, field trips." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={short ? "Short a week" : "Left a week"}
        value={gbp(Math.abs(r.weekly))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          short ? (
            <>
              Your costs of <b>{gbp(r.costs)}</b> are <b>{gbp(-r.balance)}</b> more than your income of <b>{gbp(r.income)}</b> for the year: about {gbp(-r.weekly)} a week over {v.livingWeeks} weeks.
            </>
          ) : (
            <>
              After rent and your weekly costs, you would have <b>{gbp(r.balance)}</b> left over the year, about <b>{gbp(r.weekly)}</b> a week over {v.livingWeeks} weeks.
            </>
          )
        }
        badges={[`Income ${gbp(r.income)}`, `Costs ${gbp(r.costs)}`, `Rent takes ${percent(r.rentShare)}`]}
      />

      <Facts
        items={[
          { label: "Income for the year", value: gbp(r.income) },
          { label: "Costs for the year", value: gbp(r.costs) },
          { label: short ? "Shortfall" : "Left over", value: gbp(Math.abs(r.balance)), tone: short ? "bad" : "good" },
          { label: "Rent share of income", value: percent(r.rentShare), tone: r.rentShare > 0.6 ? "warn" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Job", value: v.jobHours > 0 ? `${v.jobHours} hours a week at ${gbp(v.jobRate, true)} for ${v.jobWeeks} weeks, before any tax` : "No part-time job" },
          { label: "Living costs", value: `${gbp(livingWeekly)} a week for ${v.livingWeeks} weeks` },
          { label: "Rent", value: `${gbp(v.rent)} a week for ${v.rentWeeks} weeks` },
          { label: "Year", value: "One academic year" },
        ]}
      />

      <ResultCard title="Where your money comes from">
        <SplitBar
          segments={[
            { label: "Loan", value: v.loan, display: gbp(v.loan), color: "#5b1e6e" },
            { label: "Grants", value: v.grants, display: gbp(v.grants), color: "#0f9f6e" },
            { label: "Family", value: v.parents, display: gbp(v.parents), color: "#0ea5e9" },
            { label: "Job", value: r.job, display: gbp(r.job), color: "#f59e0b" },
          ].filter((s) => s.value > 0)}
        />
      </ResultCard>

      <ResultCard title="Where it goes" sub="For the year.">
        <Compare head={["Cost", "A year"]} rows={cats.filter((c) => c.value > 0).map((c) => ({ label: c.label, value: gbp(c.value), bar: c.value / maxC }))} />
      </ResultCard>

      <ResultCard title="What it means">
        {short ? (
          <Callout tone="warn" title={`Closing a ${gbp(-r.balance)} gap`}>
            {v.jobRate > 0 && v.jobWeeks > 0 ? <>About {Math.ceil(hoursToClose)} more hours of work a week for {v.jobWeeks} weeks would cover it. </> : null}
            Check you are getting the full loan and any bursary, ask your university about hardship funds, and look at the biggest costs first: rent is usually the one to plan around.
          </Callout>
        ) : (
          <Callout tone="good" title="Your budget balances">
            Keep a buffer for the first weeks of term, when costs such as kitchen kit, freshers&rsquo; events and books all come at once, and remember loan payments arrive termly.
          </Callout>
        )}
        <Callout title="Loan payments arrive in three instalments">
          Each term&rsquo;s payment has to last until the next. The longest gap is usually from the spring payment to the start of the next academic year.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        A planning tool. Earnings from a part-time job are usually below the tax and National Insurance thresholds, so we show them before tax.
      </p>
    </Studio>
  );
}

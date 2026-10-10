"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL } from "@/components/flagship/taxOptions";
import { STUDENT_PLAN_ORDER, STUDENT_PLANS, type StudentPlan, type TaxRegion } from "@/lib/tax/take-home-engine";
import { SACRIFICE_2026, salarySacrifice, type SacrificeKind } from "@/lib/tax/pay-and-perks";

const KIND_LABEL: Record<SacrificeKind, string> = {
  pension: "Pension",
  cycle: "Cycle to Work bike",
  other: "Other benefit (tech, gym, health)",
};

const SCHEMA = {
  salary: num(40_000, 0, 10_000_000),
  amount: num(2_000, 0, 1_000_000),
  kind: oneOf<SacrificeKind>("pension", ["pension", "cycle", "other"]),
  region: oneOf<TaxRegion>("ruk", ["ruk", "scotland"]),
  plan: oneOf<StudentPlan>("none", STUDENT_PLAN_ORDER),
  share: num(0, 0, 100),
  hours: num(37.5, 1, 80),
};
const ADVANCED = ["region", "plan", "share", "hours"] as const;

export default function SacrificeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { salary: v.salary, kind: v.kind, region: v.region, plan: v.plan, employerShare: v.share / 100, hours: v.hours };
  const r = salarySacrifice({ ...base, amount: v.amount });
  const costPerPound = v.amount > 0 ? r.cost / v.amount : 0;
  const amounts = [1_000, 2_000, 3_000, 5_000, 10_000].filter((a) => a < v.salary);
  const ladder = amounts.map((a) => ({ a, x: salarySacrifice({ ...base, amount: a }) }));
  const maxL = Math.max(1, ...ladder.map((l) => l.x.saving));
  const newSalary = v.salary - Math.min(v.amount, v.salary);
  const crossesTrap = v.salary > 100_000 && newSalary < 125_140;

  return (
    <Studio
      title="Your salary and the sacrifice"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my salary sacrifice"
      onReset={st.reset}
      dock={{ label: "You save", value: gbp(r.saving) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField label="Salary a year, before tax" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} />
            <MoneyField label="Salary given up a year" value={v.amount} onChange={st.bind("amount")} hint="For a bike, the total hire cost spread over the year; for a pension, your yearly contribution." />
            <RadioGroup
              label="What it pays for"
              value={v.kind}
              onChange={st.bind("kind")}
              options={(Object.keys(KIND_LABEL) as SacrificeKind[]).map((k) => ({ value: k, label: KIND_LABEL[k] }))}
              info="Pensions and Cycle to Work are exempt: you save Income Tax and NI. Most other benefits come under the optional remuneration rules, so you only save NI."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Where you live"
              value={v.region}
              onChange={st.bind("region")}
              optional
              options={[
                { value: "ruk", label: "England, Wales & NI" },
                { value: "scotland", label: "Scotland" },
              ]}
            />
            <SelectField label="Student loan" value={v.plan} onChange={st.bind("plan")} optional options={STUDENT_PLAN_ORDER.map((id) => ({ value: id, label: STUDENT_PLANS[id].label }))} />
            {v.kind === "pension" && (
              <StepperField label="Employer NI saving added to your pension" value={v.share} onChange={st.bind("share")} step={10} min={0} max={100} unit="%" dp={0} optional hint="Some employers pass on part or all of the 15% NI they save." />
            )}
            <StepperField label="Paid hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} min={1} max={80} unit="hours" dp={1} optional hint="Salary sacrifice cannot take your pay below the minimum wage." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You save"
        value={gbp(r.saving)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Giving up <b>{gbp(Math.min(v.amount, v.salary))}</b> of salary for a {KIND_LABEL[v.kind].toLowerCase()} reduces your take-home by only <b>{gbp(r.cost)}</b>: each £1 costs you{" "}
            <b>{Math.round(costPerPound * 100)}p</b>.
            {r.intoPension > Math.min(v.amount, v.salary) ? <> With your employer&rsquo;s NI saving, <b>{gbp(r.intoPension)}</b> goes into your pension.</> : null}
          </>
        }
        badges={[KIND_LABEL[v.kind], `${Math.round(costPerPound * 100)}p per £1`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "Income Tax saved", value: gbp(r.taxSaved) },
          { label: "NI saved", value: gbp(r.niSaved) },
          { label: "Student loan saved", value: gbp(r.loanSaved) },
          { label: "Employer NI saved", value: gbp(r.employerNiSaved), note: "15% above £5,000" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27 rates and thresholds" },
          { label: "Benefit", value: v.kind === "other" ? "Optional remuneration rules: Income Tax on the salary given up" : "Exempt benefit: no tax or NI on it" },
          { label: "Tax code", value: "1257L, no other income" },
          { label: "Pay", value: "The same every month" },
        ]}
      />

      <ResultCard title="Who pays for it" sub={`Salary given up: ${gbp(Math.min(v.amount, v.salary))}.`}>
        <SplitBar
          segments={[
            { label: "Your take-home falls", value: r.cost, display: gbp(r.cost), color: "#f59e0b" },
            { label: "Income Tax saved", value: r.taxSaved, display: gbp(r.taxSaved), color: "#0f9f6e" },
            { label: "NI and loan saved", value: r.niSaved + r.loanSaved, display: gbp(r.niSaved + r.loanSaved), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      {ladder.length > 0 && (
        <ResultCard title="Different amounts" sub="Saving a year.">
          <Compare head={["Salary given up", "You save"]} rows={ladder.map((l) => ({ label: gbp(l.a), value: gbp(l.x.saving), delta: `${Math.round((l.x.cost / l.a) * 100)}p per £1`, bar: l.x.saving / maxL, current: l.a === v.amount }))} />
        </ResultCard>
      )}

      <ResultCard title="Things to check">
        {r.belowMinimumWage && (
          <Callout tone="warn" title="Below the minimum wage">
            After the sacrifice your pay works out at {gbp(r.hourly, true)} an hour, below the £{SACRIFICE_2026.nlwHourly} National Living Wage. Employers cannot agree a sacrifice that does this.
          </Callout>
        )}
        {crossesTrap && v.kind === "pension" && (
          <Callout tone="good" title="Out of the £100,000 trap">
            Sacrifice in the £100,000 to £125,140 band wins back your Personal Allowance, so each £1 into your pension costs as little as 38p.
          </Callout>
        )}
        {v.kind === "other" && (
          <Callout title="Little tax saving on other benefits">
            For technology, gym and health schemes, Income Tax is charged on the salary you give up, so you only save National Insurance. They mainly help spread the cost.
          </Callout>
        )}
        <Callout title="It can affect other things">
          A lower salary can reduce statutory maternity or sick pay, mortgage borrowing and life cover linked to salary. Check before you sign, and see{" "}
          <a href="/uk/vehicles/ev-salary-sacrifice">EV salary sacrifice</a> for company cars.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 tax rules. The National Insurance cap on pension salary sacrifice, due from April 2029, is not included.
      </p>
    </Studio>
  );
}

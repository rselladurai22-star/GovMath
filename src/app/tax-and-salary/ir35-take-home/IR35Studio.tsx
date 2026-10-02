"use client";

import { insideIR35, outsideIR35 } from "@/lib/tax/ir35";
import { computeTakeHome, STUDENT_PLANS } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  rate: num(500, 0, 10_000),
  days: num(220, 1, 365),
  margin: num(25, 0, 500),
  expenses: num(2_000),
  salary: num(12_570),
  companyPension: num(0),
  ...taxParams,
};
const ADVANCED = ["margin", "expenses", "salary", "companyPension", ...TAX_KEYS] as const;

/** Salary an employee would need to take home `target`. */
function equivalentSalary(target: number, plan: Parameters<typeof computeTakeHome>[0]["plan"], region: "ruk" | "scotland"): number {
  let lo = 0;
  let hi = 1_000_000;
  for (let i = 0; i < 50; i++) {
    const mid = (lo + hi) / 2;
    if (computeTakeHome({ gross: mid, bonus: 0, pensionPct: 0, plan, region }).takeHome < target) lo = mid;
    else hi = mid;
  }
  return Math.round(hi);
}

export default function IR35Studio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const common = { dayRate: v.rate, days: v.days, plan: v.plan, region: v.region };
  const inside = insideIR35({ ...common, umbrellaWeekly: v.margin, pensionPct: v.pension });
  const outside = outsideIR35({ ...common, expenses: v.expenses, salary: v.salary, companyPension: v.companyPension });
  const diff = outside.takeHome - inside.takeHome;
  const income = inside.income;
  const equiv = equivalentSalary(outside.takeHome, v.plan, v.region);
  const maxTake = Math.max(inside.takeHome, outside.takeHome, 1);

  return (
    <Studio
      title="Your contract"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare inside and outside IR35"
      onReset={st.reset}
      dock={{ label: "Outside IR35 keeps", value: `${diff >= 0 ? "+" : "−"}${gbp(Math.abs(diff))}` }}
      inputs={
        <>
          <InputGroup title="Your contract">
            <MoneyField label="Day rate" value={v.rate} onChange={st.bind("rate")} big max={10_000} slider={{ min: 100, max: 1_500, step: 25, ends: ["£100", "£1,500"] }} />
            <StepperField label="Days billed a year" value={v.days} onChange={st.bind("days")} step={5} min={1} max={365} unit="days" hint="Allow for holidays, bank holidays and gaps between contracts. 220 is common." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Umbrella company fee, a week (inside)" value={v.margin} onChange={st.bind("margin")} optional hint="Typically £15 to £30 a week." />
            <MoneyField label="Business costs a year (outside)" value={v.expenses} onChange={st.bind("expenses")} optional hint="Accountant, insurance, software, equipment and other allowable costs." />
            <MoneyField label="Director's salary (outside)" value={v.salary} onChange={st.bind("salary")} optional hint="£12,570 uses your tax-free allowance. Some directors take £5,000 to avoid employer NI." />
            <MoneyField label="Company pension contribution a year (outside)" value={v.companyPension} onChange={st.bind("companyPension")} optional hint="Paid by your company before Corporation Tax." />
            <TaxSituationFields
              region={v.region}
              plan={v.plan}
              pension={v.pension}
              onRegion={st.bind("region")}
              onPlan={st.bind("plan")}
              onPension={st.bind("pension")}
              pensionHint="Salary sacrifice through the umbrella company (inside IR35)."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={diff >= 0 ? "Outside IR35 you keep more" : "Inside IR35 you keep more"}
        value={gbp(Math.abs(diff))}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Billing <b>{gbp(income)}</b> a year ({gbp(v.rate)} × {v.days} days), you take home about <b>{gbp(inside.takeHome)}</b> inside IR35 through an umbrella company and{" "}
            <b>{gbp(outside.takeHome)}</b> outside IR35 through your own limited company. A permanent employee would need a salary of about <b>{gbp(equiv)}</b> to take home
            the outside figure.
          </>
        }
        badges={[`${gbp(v.rate)} a day`, `${v.days} days`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "Inside IR35", value: gbp(inside.takeHome), note: `${gbp(inside.takeHome / 12)} a month` },
          { label: "Outside IR35", value: gbp(outside.takeHome), note: `${gbp(outside.takeHome / 12)} a month` },
          { label: "Kept per day billed", value: `${gbp(inside.takeHome / v.days)} / ${gbp(outside.takeHome / v.days)}`, note: "Inside / outside" },
          { label: "Equivalent salary", value: gbp(equiv), note: "Same take-home as outside" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Outside", value: `${gbp(outside.salary)} salary, rest as dividends` },
          { label: "Inside", value: "Umbrella company, PAYE" },
          { label: "Student loan", value: STUDENT_PLANS[v.plan].label },
        ]}
      />

      <ResultCard title="Take-home side by side" sub="Where the money goes in each case.">
        <Compare
          head={["Route", "Take-home a year"]}
          rows={[
            { label: "Inside IR35 (umbrella)", value: gbp(inside.takeHome), bar: inside.takeHome / maxTake, current: inside.takeHome >= outside.takeHome },
            { label: "Outside IR35 (limited company)", value: gbp(outside.takeHome), bar: outside.takeHome / maxTake, current: outside.takeHome > inside.takeHome },
          ]}
        />
        <Statement
          columns={["Inside", "Outside"]}
          rows={[
            { label: "Contract income", values: [gbp(income), gbp(income)] },
            { label: "Umbrella fee / business costs", values: [gbp(-inside.margin), gbp(-outside.expenses)], kind: "deduction" },
            { label: "Employer NI and levy", values: [gbp(-inside.employerCosts), gbp(-outside.employerNI)], kind: "deduction" },
            { label: "Corporation Tax", values: ["–", gbp(-outside.corporationTax)], kind: "deduction" },
            { label: "Pension", values: [gbp(-inside.pension), gbp(-outside.pension)], kind: "deduction" },
            { label: "Income Tax and NI", values: [gbp(-(inside.incomeTax + inside.ni)), gbp(-(outside.salaryTax + outside.salaryNI))], kind: "deduction" },
            { label: "Dividend tax and student loan", values: [gbp(-inside.studentLoan), gbp(-outside.dividendTax)], kind: "deduction" },
            { label: "Take-home", values: [gbp(inside.takeHome), gbp(outside.takeHome)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Things the numbers do not show.">
        <Callout title="Who decides your IR35 status">
          For medium and large clients, the client decides and must give you a Status Determination Statement. For small clients, your own company decides. You can
          challenge a determination you disagree with.
        </Callout>
        <Callout title="Outside IR35 carries more risk and admin">
          You run a company: accounts, Corporation Tax returns, VAT if you are registered, and no sick pay, holiday pay or redundancy pay. Keep a buffer for gaps between
          contracts.
        </Callout>
        {outside.salary + outside.dividends > 100_000 && (
          <Callout tone="warn" title="Over £100,000 of personal income">
            Your Personal Allowance starts to disappear. Leaving profit in the company, or paying more into a pension, can be more tax-efficient than drawing it all.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. Illustrative: outside IR35 assumes all profit after Corporation Tax is paid out as dividends in the same year.
      </p>
    </Studio>
  );
}

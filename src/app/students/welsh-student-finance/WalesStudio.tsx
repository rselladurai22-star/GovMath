"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { WALES_2026, WALES_GRANT, wales2026, type WalesLiving } from "@/lib/students/nations";
import { repayments2026 } from "@/lib/students/loans";

const SCHEMA = {
  income: num(35_000, 0, 1_000_000),
  living: oneOf<WalesLiving>("away", ["home", "away", "london"]),
  years: num(3, 1, 6),
  salary: num(32_000, 0, 500_000),
};
const ADVANCED = ["years", "salary"] as const;

export default function WalesStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = wales2026(v.income, v.living);
  const points = [18_370, 30_000, 40_000, 50_000, 59_200].map((x) => ({ x, g: wales2026(x, v.living).grant }));
  const maxG = WALES_2026[v.living].maxGrant;
  const fee = WALES_GRANT.feeLoan;
  const borrowed = (r.loan + fee) * v.years;
  const repay = repayments2026({ salary: v.salary, plans: ["plan2"] });

  return (
    <Studio
      title="Your household and where you will live"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my Welsh student finance"
      onReset={st.reset}
      dock={{ label: "Support a year", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="Your situation">
            <MoneyField label="Household income" value={v.income} onChange={st.bind("income")} big slider={{ min: 0, max: 80_000, step: 250, ends: ["£0", "£80k"] }} hint="Your parents' taxable income for the 2024/25 tax year, or yours and your partner's if you are independent." />
            <Segmented
              label="Where you will live"
              value={v.living}
              onChange={st.bind("living")}
              options={[
                { value: "home", label: "With parents" },
                { value: "away", label: "Away from home" },
                { value: "london", label: "Away, in London" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Length of course" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={6} unit="years" dp={0} optional />
            <MoneyField label="Salary after graduating" value={v.salary} onChange={st.bind("salary")} optional hint="To see Plan 2 repayments: 9% of income over £29,385." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Living-cost support a year"
        value={gbp(r.total)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Every Welsh student {WALES_2026[v.living].label.toLowerCase()} gets <b>{gbp(r.total)}</b> a year. On your household income <b>{gbp(r.grant)}</b> is a Welsh Government Learning Grant you never repay, and{" "}
            <b>{gbp(r.loan)}</b> is a Maintenance Loan. Tuition fees are covered by a Tuition Fee Loan of up to {gbp(fee)} a year.
          </>
        }
        badges={["Student Finance Wales", WALES_2026[v.living].label, `${gbp(r.grant)} grant`]}
      />

      <Facts
        items={[
          { label: "Learning Grant", value: gbp(r.grant), tone: "good", note: "Not repaid" },
          { label: "Maintenance Loan", value: gbp(r.loan) },
          { label: "A month over 12 months", value: gbp(r.monthly) },
          { label: `Loans over ${v.years} years`, value: gbp(borrowed), note: "Fees and maintenance" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Year", value: "2026/27 Student Finance Wales figures" },
          { label: "Student", value: "Full-time undergraduate living in Wales, first degree" },
          { label: "Same each year", value: "Income and amounts unchanged for every year of the course" },
          { label: "Fees", value: `Tuition Fee Loan of ${gbp(fee)} a year` },
        ]}
      />

      <ResultCard title="Grant and loan" sub="A year.">
        <SplitBar
          segments={[
            { label: "Learning Grant", value: r.grant, display: gbp(r.grant), color: "#0f9f6e" },
            { label: "Maintenance Loan", value: r.loan, display: gbp(r.loan), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Grant by household income" sub={WALES_2026[v.living].label}>
        <Compare head={["Household income", "Grant a year"]} rows={points.map((p) => ({ label: `${p.x === 18_370 ? "Up to " : p.x === 59_200 ? "From " : ""}${gbp(p.x)}`, value: gbp(p.g), delta: `${gbp(r.total - p.g)} loan`, bar: p.g / maxG }))} />
      </ResultCard>

      <ResultCard title="Paying it back">
        <Callout title={`Plan 2: ${gbp(repay.monthly)} a month on ${gbp(v.salary)}`}>
          Welsh students&rsquo; loans are Plan 2. You repay 9% of income over £29,385 a year, from the April after you leave your course, and anything left is written off after 30 years. Only the loans are repaid, never the grant.
        </Callout>
        <Callout title={`Up to ${gbp(WALES_GRANT.cancellation)} written off`}>
          Welsh students can have up to £1,500 of their Maintenance Loan cancelled once they make their first repayment.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Student Finance Wales 2026/27 tables. Between the published income points the grant is estimated in a straight line.
      </p>
    </Studio>
  );
}

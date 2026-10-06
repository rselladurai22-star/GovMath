"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { SAAS_2026, saas2026 } from "@/lib/students/nations";
import { repayments2026 } from "@/lib/students/loans";

const SCHEMA = {
  who: oneOf<"young" | "independent">("young", ["young", "independent"]),
  income: num(30_000, 0, 1_000_000),
  where: oneOf<"scotland" | "ruk">("scotland", ["scotland", "ruk"]),
  years: num(4, 1, 6),
  salary: num(35_000, 0, 500_000),
};
const ADVANCED = ["years", "salary"] as const;

const BAND_LABEL = ["£20,999 or less", "£21,000 to £23,999", "£24,000 to £33,999", "£34,000 or more"];

export default function SaasStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const independent = v.who === "independent";
  const r = saas2026(v.income, independent);
  const bands = (independent ? SAAS_2026.independent : SAAS_2026.young).map((b, i) => ({ i, total: b.bursary + b.loan, b }));
  const maxT = Math.max(...bands.map((b) => b.total));
  const fee = v.where === "scotland" ? SAAS_2026.scottishFee : SAAS_2026.rukFeeLoan;
  const loanTotal = r.loan * v.years + (v.where === "ruk" ? fee * v.years : 0);
  const repay = repayments2026({ salary: v.salary, plans: ["plan4"] });

  return (
    <Studio
      title="You and your household"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my SAAS funding"
      onReset={st.reset}
      dock={{ label: "Support a year", value: gbp(r.total) }}
      inputs={
        <>
          <InputGroup title="About you">
            <Segmented
              label="Type of student"
              value={v.who}
              onChange={st.bind("who")}
              options={[
                { value: "young", label: "Young student", note: "Under 25 when the course starts, not married, with no children, and not self-supporting for 3 years." },
                { value: "independent", label: "Independent student", note: "25 or over, married, a parent, or self-supporting for at least 3 years." },
              ]}
            />
            <MoneyField
              label={independent ? "Your (and your partner's) income" : "Household income"}
              value={v.income}
              onChange={st.bind("income")}
              big
              slider={{ min: 0, max: 60_000, step: 250, ends: ["£0", "£60k"] }}
              hint="Gross income before tax for the last tax year. Over £34,000 you get the minimum loan and do not need to send income details."
            />
            <Segmented
              label="Where you will study"
              value={v.where}
              onChange={st.bind("where")}
              options={[
                { value: "scotland", label: "In Scotland" },
                { value: "ruk", label: "Elsewhere in the UK" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Length of course" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={6} unit="years" dp={0} optional hint="Most Scottish honours degrees take 4 years." />
            <MoneyField label="Salary after graduating" value={v.salary} onChange={st.bind("salary")} optional hint="To see Plan 4 repayments: 9% of income over £33,795." />
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
            You could get <b>{gbp(r.bursary)}</b> {independent ? "Independent" : "Young"} Students&rsquo; Bursary, which you never repay, and a <b>{gbp(r.loan)}</b> student loan: <b>{gbp(r.monthly)}</b> a month if spread
            over 12 months. {v.where === "scotland" ? <>Your tuition fees in Scotland are paid by SAAS and are free.</> : <>To study elsewhere in the UK you can also borrow up to {gbp(fee)} a year for tuition fees.</>}
          </>
        }
        badges={[independent ? "Independent student" : "Young student", BAND_LABEL[r.band], v.where === "scotland" ? "Free tuition" : "Tuition Fee Loan"]}
      />

      <Facts
        items={[
          { label: "Bursary (not repaid)", value: gbp(r.bursary), tone: r.bursary > 0 ? "good" : undefined },
          { label: "Student loan", value: gbp(r.loan) },
          { label: "Tuition fees", value: v.where === "scotland" ? "Free" : `${gbp(fee)} loan` },
          { label: `Loans over ${v.years} years`, value: gbp(loanTotal) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Year", value: "2026/27 SAAS funding" },
          { label: "Residence", value: "Living in Scotland on the first day of the course, a first degree" },
          { label: "Same each year", value: "Income and amounts unchanged for every year of the course" },
          { label: "Extras", value: "No disability, care-experienced or dependants' support included" },
        ]}
      />

      <ResultCard title="Your support" sub="A year.">
        <SplitBar
          segments={[
            { label: "Bursary", value: r.bursary, display: gbp(r.bursary), color: "#0f9f6e" },
            { label: "Student loan", value: r.loan, display: gbp(r.loan), color: "#5b1e6e" },
          ]}
        />
      </ResultCard>

      <ResultCard title="By household income" sub="Bursary plus loan, 2026/27.">
        <Compare head={["Household income", "A year"]} rows={bands.map((b) => ({ label: BAND_LABEL[b.i], value: gbp(b.total), delta: b.b.bursary ? `${gbp(b.b.bursary)} bursary` : "Loan only", bar: b.total / maxT, current: b.i === r.band }))} />
      </ResultCard>

      <ResultCard title="Paying it back">
        <Callout title={`Plan 4: ${gbp(repay.monthly)} a month on ${gbp(v.salary)}`}>
          Scottish student loans are Plan 4. You repay 9% of income over £33,795 a year, from the April after you leave your course, and anything left is written off after 30 years. Interest is the lower of RPI
          or the Bank of England base rate plus 1%. See the <a href="/students/plan-4-student-loan">Plan 4 calculator</a>.
        </Callout>
        {r.loan > 0 && (
          <Callout title="You do not have to take it all">
            You can ask SAAS for less than the full loan, and change it during the year. The bursary is paid whatever loan you take.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        SAAS 2026/27 figures for full-time undergraduates. SAAS decides your award from your application and evidence.
      </p>
    </Studio>
  );
}

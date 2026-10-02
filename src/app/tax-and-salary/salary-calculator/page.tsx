import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { STUDENT_PLANS, type StudentPlan } from "@/lib/tax/take-home-engine";
import SalaryStudio from "./SalaryStudio";
import TakeHomeGuide from "./TakeHomeGuide";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Salary & Take-Home Pay Calculator (UK, 2026/27)",
  description:
    "Work out your UK take-home pay after Income Tax, National Insurance, pension and student loan. Includes Scottish rates, a payslip view and what a pay rise is really worth. 2026/27.",
  alternates: { canonical: "/tax-and-salary/salary-calculator" },
};

type SearchParams = Promise<{ salary?: string; bonus?: string; pension?: string; loan?: string; region?: string }>;

function parseNumber(raw: string | undefined, fallback: number, max: number): number {
  if (!raw) return fallback;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return fallback;
  return Math.min(n, max);
}

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/salary-calculator", label: "Take-Home Pay" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this the same figure as my payslip?",
    a: "Very close for a standard employee on the 1257L code. Real payslips vary with your exact tax code, month-to-month PAYE adjustments, benefits-in-kind and how bonuses land in a single pay period. Use this for planning, not as a substitute for HMRC's figures.",
  },
  {
    q: "How does salary sacrifice change my take-home?",
    a: "A salary-sacrifice pension lowers your contractual pay before Income Tax and National Insurance are worked out. That means every £1 you sacrifice costs you less than £1 in take-home — the difference is the tax and NI you no longer pay. It also lowers the income used to assess student-loan repayments.",
  },
  {
    q: "What is the 60% tax trap?",
    a: "Between £100,000 and £125,140, your £12,570 Personal Allowance is withdrawn by £1 for every £2 you earn. That withdrawal, stacked on the 40% higher rate, means each extra pound in this band is effectively taxed at 60%. Pension contributions are the usual way to avoid it.",
  },
  {
    q: "Does this include Scotland?",
    a: "Yes. Choose Scotland under 'Where you live' to use the six Scottish Income Tax bands (starter 19% up to top 48%). National Insurance and student loans are the same UK-wide.",
  },
  {
    q: "Which student loan plan am I on?",
    a: "Broadly: Plan 1 for pre-2012 English/Welsh loans, Plan 2 for 2012–2023, Plan 5 for courses starting from 2023, Plan 4 for Scottish borrowers, and the Postgraduate Loan for master's/doctoral funding. You repay 9% (6% for postgrad) of income above the plan's threshold.",
  },
];

export default async function SalaryCalculatorPage({ searchParams }: { searchParams: SearchParams }) {
  const { salary, bonus, pension, loan, region } = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/tax-and-salary/tax-bracket-checker",
      "/investing/pension-tax-relief",
      "/students/plan-2-student-loan",
      "/tax-and-salary/bonus-tax",
      "/tax-and-salary/scottish-tax",
      "/tax-and-salary/national-insurance",
    ].includes(c.href)
  );

  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Salary & Take-Home Pay Calculator"
      lead="See exactly what reaches your bank after Income Tax, National Insurance, pension and student loan."
      points={["2026/27 HMRC rates", "Scotland included", "Pension and student loans", "Free and private"]}
      guide={<TakeHomeGuide />}
      faqs={FAQS}
      related={related}
      note="Figures are estimates for the 2026/27 tax year on a standard tax code. GovMath is not affiliated with HMRC. Always check your tax code and personal circumstances before making financial decisions."
    >
      <SalaryStudio
        salary={parseNumber(salary, 35_000, 10_000_000)}
        bonus={parseNumber(bonus, 0, 10_000_000)}
        pension={Math.round(parseNumber(pension, 5, 60))}
        plan={loan && loan in STUDENT_PLANS ? (loan as StudentPlan) : "none"}
        region={region === "scotland" ? "scotland" : "ruk"}
        showResults={[salary, bonus, pension, loan, region].some(Boolean)}
      />
    </FlagshipPage>
  );
}

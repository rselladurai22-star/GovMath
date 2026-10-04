import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import Plan4Guide from "./Plan4Guide";

export const metadata: Metadata = {
  title: "Plan 4 Student Loan Calculator (Scotland) 2026/27",
  description:
    "Work out your Scottish Plan 4 student loan repayments: 9% of income above \u00a333,795, interest at 4.1%, and when your loan will be paid off or written off.",
  alternates: { canonical: "/students/plan-4-student-loan" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students & Graduates" },
  { href: "/students/plan-4-student-loan", label: "Plan 4 Student Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Plan 4 threshold for 2026/27?", a: "\u00a333,795 a year, the highest of any plan. It rises with RPI each April." },
  { q: "How much will I repay on \u00a345,000?", a: "9% of \u00a311,205: \u00a31,008.45 a year or \u00a384.04 a month." },
  { q: "What is the Plan 4 interest rate?", a: "4.1% from September 2026." },
  { q: "When is Plan 4 written off?", a: "30 years after you were first due to repay, for loans from 2007/08." },
];

export default async function Plan4Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-1-student-loan", "/students/plan-2-student-loan", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student loans"
      title="Plan 4 Student Loan Calculator"
      lead="See your Scottish Plan 4 repayments for 2026/27 and when your loan will be cleared."
      points={["2026/27 threshold", "4.1% interest", "30-year projection", "Free and private"]}
      guide={<Plan4Guide />}
      faqs={FAQS}
      related={related}
      note="Projection only. Your SLC account has your exact balance."
    >
      <LoanStudio query={query} plan="plan4" defaults={{ salary: 45_000, balance: 20_000 }} />
    </FlagshipPage>
  );
}

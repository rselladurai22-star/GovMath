import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import Plan2Guide from "./Plan2Guide";

export const metadata: Metadata = {
  title: "Plan 2 Student Loan Calculator 2026/27",
  description:
    "Work out your Plan 2 student loan repayments: 9% above £29,385, interest from 4.1% to the 6% cap, the freeze to 2030, and whether you will repay before the 30-year write-off.",
  alternates: { canonical: "/students/plan-2-student-loan" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students & Graduates" },
  { href: "/students/plan-2-student-loan", label: "Plan 2 Student Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Plan 2 threshold for 2026/27?", a: "£29,385 a year, or £2,448.75 a month. It is frozen at this level from April 2027 until April 2030." },
  { q: "How much will I repay on £35,000?", a: "9% of £5,615, which is £505.35 a year or £42.11 a month." },
  { q: "What is the Plan 2 interest rate?", a: "From September 2026, 4.1% if you earn £29,385 or less, rising to a capped 6% for higher earners." },
  { q: "When is Plan 2 written off?", a: "30 years after the April you were first due to repay." },
];

export default async function Plan2Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-5-student-loan", "/students/postgrad-loan", "/students/plan-1-student-loan", "/tax-and-salary/salary-calculator", "/students/maintenance-loan", "/students/student-council-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student loans"
      title="Plan 2 Student Loan Calculator"
      lead="See your Plan 2 repayments for 2026/27 and whether you are likely to repay before the write-off."
      points={["2026/27 threshold", "Interest with 6% cap", "30-year projection", "Free and private"]}
      guide={<Plan2Guide />}
      faqs={FAQS}
      related={related}
      note="Projection only. Your SLC account has your exact balance."
    >
      <LoanStudio query={query} plan="plan2" defaults={{ salary: 35_000, balance: 45_000 }} />
    </FlagshipPage>
  );
}

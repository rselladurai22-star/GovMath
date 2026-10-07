import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import Plan2Guide from "./Plan2Guide";

export const metadata: Metadata = {
  title: "Plan 2 Student Loan Calculator 2026/27",
  description:
    "Free Plan 2 student loan calculator for 2026/27. See monthly repayments, the sliding interest rate, total repaid and whether your loan will be written off.",
  alternates: { canonical: "/students/plan-2-student-loan" },
  openGraph: ogFor("/students/plan-2-student-loan"),
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
  { q: "Does salary sacrifice reduce my repayments?", a: "Yes. Pension contributions through salary sacrifice reduce the pay used to work out repayments." },
  { q: "Can I get a refund?", a: "Yes, if you repaid when your income for the year was below the threshold, or you repaid after the balance was cleared." },
  { q: "When will the cap end?", a: "The 6% cap is set for September 2026 to August 2027. Rates for later years depend on RPI and any new decisions." },
  { q: "Do I need to tell HMRC about my loan?", a: "Not if you are employed: tell your employer your plan type when you start, often using a starter checklist, and they deduct repayments. If you file Self Assessment, tick the student loan box on your return." },
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

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import Plan5Guide from "./Plan5Guide";

export const metadata: Metadata = {
  title: "Plan 5 Student Loan Calculator 2026/27",
  description:
    "Work out your Plan 5 student loan repayments: 9% of income above \u00a325,000, interest at RPI (4.1%), and what you are likely to repay before the 40-year write-off.",
  alternates: { canonical: "/students/plan-5-student-loan" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students & Graduates" },
  { href: "/students/plan-5-student-loan", label: "Plan 5 Student Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Plan 5 threshold?", a: "\u00a325,000 a year in 2026/27, rising with RPI from April 2027." },
  { q: "How much will I repay on \u00a330,000?", a: "9% of \u00a35,000: \u00a3450 a year or \u00a337.50 a month." },
  { q: "What is the Plan 5 interest rate?", a: "RPI only: 4.1% from September 2026." },
  { q: "When is Plan 5 written off?", a: "40 years after the April you were first due to repay." },
  { q: "Will the threshold go up?", a: "It is £25,000 until April 2027 and is then due to rise each year with RPI." },
  { q: "Do part-time jobs while studying count?", a: "No. Repayments only start from the April after you leave your course." },
  { q: "What if I leave my course early?", a: "Repayments can start from the April after you leave, if you earn over the threshold." },
  { q: "Do I need to tell HMRC about my loan?", a: "Not if you are employed: tell your employer your plan type when you start, often using a starter checklist, and they deduct repayments. If you file Self Assessment, tick the student loan box on your return." },
  { q: "Is Plan 5 interest higher than Plan 2?", a: "No. Plan 5 charges RPI only, 4.1% from September 2026, while Plan 2 charges up to 6% this year. But Plan 5 is repaid from a lower threshold for longer." },
];

export default async function Plan5Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-2-student-loan", "/students/maintenance-loan", "/students/postgrad-loan", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student loans"
      title="Plan 5 Student Loan Calculator"
      lead="See your Plan 5 repayments and what you are likely to repay over 40 years."
      points={["2026/27 threshold", "RPI interest", "40-year projection", "Free and private"]}
      guide={<Plan5Guide />}
      faqs={FAQS}
      related={related}
      note="Projection only. Your SLC account has your exact balance."
    >
      <LoanStudio query={query} plan="plan5" defaults={{ salary: 30_000, balance: 50_000 }} />
    </FlagshipPage>
  );
}

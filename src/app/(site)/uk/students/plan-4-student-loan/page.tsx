import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import Plan4Guide from "./Plan4Guide";

export const metadata: Metadata = {
  title: "Plan 4 Student Loan Calculator 2026/27",
  description:
    "Free Plan 4 calculator for Scottish student loans in 2026/27. See monthly repayments above the threshold, interest and when your loan will be cleared.",
  alternates: { canonical: "/uk/students/plan-4-student-loan" },
  openGraph: ogFor("/uk/students/plan-4-student-loan"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students & Graduates" },
  { href: "/uk/students/plan-4-student-loan", label: "Plan 4 Student Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Plan 4 threshold for 2026/27?", a: "\u00a333,795 a year, the highest of any plan. It rises with RPI each April." },
  { q: "How much will I repay on \u00a345,000?", a: "9% of \u00a311,205: \u00a31,008.45 a year or \u00a384.04 a month." },
  { q: "What is the Plan 4 interest rate?", a: "4.1% from September 2026." },
  { q: "When is Plan 4 written off?", a: "30 years after you were first due to repay, for loans from 2007/08." },
  { q: "I was on Plan 1 in Scotland. What changed?", a: "In April 2021 Scottish Plan 1 loans moved to Plan 4, with a higher threshold. Your balance and interest did not change." },
  { q: "Do I need to do anything to switch?", a: "No. The change was automatic." },
  { q: "Do postgraduate loans from SAAS work the same way?", a: "Yes. SAAS postgraduate tuition fee and living cost loans are repaid under Plan 4, not the English Postgraduate Loan." },
  { q: "Do I need to tell HMRC about my loan?", a: "Not if you are employed: tell your employer your plan type when you start, often using a starter checklist, and they deduct repayments. If you file Self Assessment, tick the student loan box on your return." },
  { q: "What if I move to England to work?", a: "You stay on Plan 4 and repay through PAYE as normal. Your employer just needs to know your plan type. Your income tax changes to English rates, but the loan rules do not." },
  { q: "Can my loan be written off early?", a: "Only if you die or become permanently unable to work because of illness or disability. Otherwise it runs until the write-off date or until you clear it." },
];

export default async function Plan4Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/plan-1-student-loan", "/uk/students/plan-2-student-loan", "/uk/tax-and-salary/salary-calculator"].includes(c.href));
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

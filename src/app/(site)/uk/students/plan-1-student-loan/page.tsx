import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import Plan1Guide from "./Plan1Guide";

export const metadata: Metadata = {
  title: "Plan 1 Student Loan Calculator 2026/27",
  description:
    "Free Plan 1 student loan calculator for 2026/27. See monthly repayments above the threshold, interest, and when your loan is paid off or written off.",
  alternates: { canonical: "/uk/students/plan-1-student-loan" },
  openGraph: ogFor("/uk/students/plan-1-student-loan"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students & Graduates" },
  { href: "/uk/students/plan-1-student-loan", label: "Plan 1 Student Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Plan 1 threshold for 2026/27?", a: "\u00a326,900 a year. It rises with RPI each April." },
  { q: "How much will I repay on \u00a335,000?", a: "9% of \u00a38,100: \u00a3729 a year or \u00a360.75 a month." },
  { q: "What is the Plan 1 interest rate?", a: "4.1% from September 2026, the lower of RPI and the Bank of England base rate plus 1%." },
  { q: "When is Plan 1 written off?", a: "25 years after you were first due to repay for loans from September 2006, or at 65 for older loans." },
  { q: "Will the Plan 1 threshold go up?", a: "Yes. It rises each April in line with RPI." },
  { q: "Does Plan 1 affect my credit score?", a: "No, but mortgage lenders count the repayments as an outgoing." },
  { q: "I studied in Northern Ireland. Is anything different?", a: "Plan 1 rules apply, with loans administered by Student Finance NI and written off after 25 years for loans from 2007/08." },
  { q: "Do I need to tell HMRC about my loan?", a: "Not if you are employed: tell your employer your plan type when you start, often using a starter checklist, and they deduct repayments. If you file Self Assessment, tick the student loan box on your return." },
  { q: "Is interest on Plan 1 likely to change?", a: "It changes each September, based on March RPI and the Bank of England base rate. When base rate plus 1% is lower than RPI, that lower figure applies." },
];

export default async function Plan1Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/students/plan-2-student-loan", "/uk/students/postgrad-loan", "/uk/students/plan-4-student-loan", "/uk/tax-and-salary/salary-calculator", "/uk/students/maintenance-loan", "/uk/students/plan-5-student-loan"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student loans"
      title="Plan 1 Student Loan Calculator"
      lead="See your Plan 1 repayments for 2026/27 and when your loan will be cleared."
      points={["2026/27 threshold", "4.1% interest", "Payoff projection", "Free and private"]}
      guide={<Plan1Guide />}
      faqs={FAQS}
      related={related}
      note="Projection only. Your SLC account has your exact balance."
    >
      <LoanStudio query={query} plan="plan1" defaults={{ salary: 35_000, balance: 15_000 }} />
    </FlagshipPage>
  );
}

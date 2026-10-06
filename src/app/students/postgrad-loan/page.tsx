import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import PostgradGuide from "./PostgradGuide";

export const metadata: Metadata = {
  title: "Postgraduate Loan Repayment Calculator 2026/27",
  description:
    "Work out your Master's or Doctoral Loan repayments: 6% of income above \u00a321,000, alongside any undergraduate loan, with interest capped at 6% from September 2026.",
  alternates: { canonical: "/students/postgrad-loan" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students & Graduates" },
  { href: "/students/postgrad-loan", label: "Postgraduate Loan" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Postgraduate Loan threshold?", a: "\u00a321,000 a year, unchanged for 2026/27." },
  { q: "How much will I repay on \u00a335,000?", a: "6% of \u00a314,000: \u00a3840 a year or \u00a370 a month." },
  { q: "Do I repay it with my undergraduate loan?", a: "Yes. You repay both at the same time: 9% above your undergraduate threshold and 6% above \u00a321,000." },
  { q: "What is the interest rate?", a: "RPI plus 3%, which would be 7.1%, capped at 6% from September 2026 to August 2027." },
];

export default async function PostgradPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/plan-2-student-loan", "/students/plan-5-student-loan", "/students/plan-1-student-loan", "/tax-and-salary/salary-calculator", "/students/maintenance-loan", "/students/plan-4-student-loan"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student loans"
      title="Postgraduate Loan Calculator"
      lead="See your Master's or Doctoral Loan repayments and when the loan will be cleared."
      points={["\u00a321,000 threshold", "6% interest cap", "Payoff projection", "Free and private"]}
      guide={<PostgradGuide />}
      faqs={FAQS}
      related={related}
      note="Projection only. Your SLC account has your exact balance."
    >
      <LoanStudio query={query} plan="postgrad" defaults={{ salary: 35_000, balance: 12_500 }} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PostgradGuide from "./PostgradGuide";

export const metadata: Metadata = {
  title: "Postgraduate Loan Calculator 2026/27",
  description:
    "Free Postgraduate Loan repayment calculator for 2026/27. See the 6% repayments above £21,000, how they stack with Plan 2 or 5, and the total you repay.",
  alternates: { canonical: "/students/postgrad-loan" },
  openGraph: ogFor("/students/postgrad-loan"),
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
  { q: "Do I repay while studying?", a: "No. Repayments start from the April after you finish or leave the course." },
  { q: "Does a PGCE count as a Postgraduate Loan?", a: "No. PGCE students get undergraduate-style funding, repaid under their undergraduate plan." },
  { q: "Are Master's and Doctoral Loans added together?", a: "Yes. They form one balance, repaid at 6% above £21,000." },
  { q: "Do I need to tell HMRC about my loan?", a: "Not if you are employed: tell your employer your plan type when you start, often using a starter checklist, and they deduct repayments. If you file Self Assessment, tick the student loan box on your return." },
  { q: "Can I get a Master's Loan if I already have a Master's degree?", a: "Usually not. The loan is for students without an equivalent or higher qualification, with some exceptions." },
  { q: "Is the loan means-tested?", a: "No. Your household income does not affect how much you can borrow." },
  { q: "Does it matter how much I borrow?", a: "Your monthly repayment depends only on income. But a larger balance takes longer to clear and adds more interest, so borrow what you need." },
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

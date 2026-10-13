import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LoanStudio from "@/components/students/LoanStudio";
import { CALCULATORS } from "@/lib/calculators";
import type { Plan } from "@/lib/students/loans";
import { ogFor } from "@/gm/og";
import StudentLoanGuide from "./StudentLoanGuide";

const PATH = "/uk/students/student-loan-repayment";

export const metadata: Metadata = {
  title: "Student Loan Repayment Calculator 2026/27",
  description:
    "Free student loan repayment calculator for 2026/27. Repayments, interest and write-off for Plans 1, 2, 4, 5 and the Postgraduate Loan.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/students", label: "Students & Graduates" },
  { href: PATH, label: "Student Loan Repayment" },
];

/** Each plan's starting figures (salary, balance), as on the plan pages this one replaced. */
const DEFAULTS: Record<Plan, { salary: number; balance: number }> = {
  plan1: { salary: 35_000, balance: 15_000 },
  plan2: { salary: 35_000, balance: 45_000 },
  plan4: { salary: 45_000, balance: 20_000 },
  plan5: { salary: 30_000, balance: 50_000 },
  postgrad: { salary: 35_000, balance: 12_500 },
};

const FAQS: { q: string; a: string }[] = [
  { q: "What are the student loan thresholds for 2026/27?", a: "Plan 1 £26,900, Plan 2 £29,385, Plan 4 £33,795, Plan 5 £25,000 and the Postgraduate Loan £21,000 a year." },
  { q: "How much do I repay on £35,000?", a: "A month: £60.75 on Plan 1, £42.11 on Plan 2, £9.04 on Plan 4, £75 on Plan 5 and £70 on a Postgraduate Loan, each on its own." },
  { q: "How do I find out which plan I am on?", a: "Sign in to your Student Loans Company account, where each loan shows its plan. It depends on the nation you applied from and the year your course started." },
  { q: "What is the Plan 1 interest rate?", a: "4.1% from September 2026: the lower of RPI and the Bank of England base rate plus 1%." },
  { q: "When is Plan 1 written off?", a: "25 years after the April you were first due to repay, for loans from September 2006 in England and Wales and from 2007/08 in Northern Ireland. Older loans are written off at 65." },
  { q: "What is the Plan 4 threshold?", a: "£33,795 a year in 2026/27, the highest of the UK plans. It rises with RPI each April." },
  { q: "When is Plan 4 written off?", a: "30 years after the April you were first due to repay for loans from 2007/08. Older loans go at 65 or after 30 years, whichever comes first." },
  { q: "How much is the Postgraduate Loan repayment?", a: "6% of income above £21,000. On £35,000 that is £840 a year, or £70 a month, on top of any undergraduate repayment." },
  { q: "What interest is charged on a Postgraduate Loan?", a: "RPI plus 3%, capped at 6% from September 2026 to August 2027, so 6%." },
  { q: "I have Plan 1 and Plan 2. Do I pay twice?", a: "No. You pay 9% once, above the lower of the two thresholds, and the Student Loans Company shares it between the loans." },
  { q: "I have an undergraduate loan and a Postgraduate Loan. What do I pay?", a: "Both: 9% above your undergraduate threshold and 6% above £21,000. On £50,000 with Plan 1 that is £3,819 a year." },
  { q: "Does a student loan affect my credit score?", a: "No. It is not on your credit file, but mortgage lenders see the deduction on your payslip and count it as an outgoing." },
  { q: "Can I get money back?", a: "Yes, if your yearly income was below the threshold but a high month triggered a deduction, or deductions continued after you finished repaying." },
  { q: "Do I need to tell HMRC about my loan?", a: "Not as an employee: give your employer your plan type when you start. If you file Self Assessment, tick the student loan box and list your plans." },
];

export default async function StudentLoanRepaymentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const asked = typeof query.plan === "string" ? query.plan : "";
  const plan: Plan = Object.hasOwn(DEFAULTS, asked) ? (asked as Plan) : "plan2";
  const related = CALCULATORS.filter((c) =>
    ["/uk/students/plan-2-student-loan", "/uk/students/plan-5-student-loan", "/uk/students/maintenance-loan", "/uk/students/degree-cost", "/uk/tax-and-salary/salary-calculator", "/uk/students/saas-funding"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student loans"
      title="Student Loan Repayment Calculator"
      lead="Pick your plan to see your 2026/27 repayments, the interest you are charged and whether you are likely to clear the loan."
      points={["All five plans", "2026/27 thresholds", "Payoff projection", "Free and private"]}
      guide={<StudentLoanGuide />}
      faqs={FAQS}
      related={related}
      note="Projection only. Your SLC account has your exact balance."
    >
      <LoanStudio query={query} plan={plan} defaults={DEFAULTS.plan2} choosePlan />
    </FlagshipPage>
  );
}

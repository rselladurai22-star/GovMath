import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import StudentLoanStudio from "./StudentLoanStudio";
import StudentLoanGuide from "./StudentLoanGuide";

const PATH = "/us/loans/student-loan-calculator";

export const metadata: Metadata = {
  title: "Student Loan Calculator with RAP Payments",
  description:
    "Free student loan calculator for 2026. Compare federal standard, graduated, extended and RAP payments, or a private loan, and see what extra payments save.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Student Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is the payment on a $30,000 student loan?", a: "At 6.52% on the 10-year standard plan, $340.95 a month, with $10,914 of interest. Over 25 years on the extended plan it is $202.94 a month, but the interest rises to $30,881." },
  { q: "What are federal student loan interest rates for 2026–27?", a: "For loans first disbursed from July 1, 2026 to June 30, 2027: 6.52% for undergraduates, 8.07% for graduate students and 9.07% for PLUS loans. They are fixed for the life of the loan." },
  { q: "What is the Repayment Assistance Plan (RAP)?", a: "A federal income-driven plan that opened on July 1, 2026. You pay 1% to 10% of your AGI ÷ 12, less $50 a month for each dependent, with a $10 minimum. Unpaid interest is not charged, and any balance left after 30 years of payments is forgiven." },
  { q: "How is the RAP payment calculated?", a: "Find your AGI's band: 1% for $10,001 to $20,000, 2% for $20,001 to $30,000, and so on up to 10% above $100,000. Multiply your whole AGI by that share, divide by 12, and take off $50 per dependent. The payment is at least $10." },
  { q: "Is the SAVE plan still available?", a: "No. A federal court ended SAVE in March 2026, and borrowers who were in it must choose another plan. PAYE and ICR end by July 1, 2028." },
  { q: "What plans can new federal loans use?", a: "Loans first made on or after July 1, 2026 can use the new standard plan, with a 10- to 25-year term set by the amount owed, or RAP." },
  { q: "Can Parent PLUS loans use RAP?", a: "No. Parent PLUS loans, and consolidation loans that repaid a Parent PLUS loan, are not eligible for RAP." },
  { q: "Should I pay extra on my student loans?", a: "On a fixed plan, yes if you can: $100 extra a month on $30,000 at 6.52% saves $3,359 and 34 months. If you expect forgiveness under PSLF or RAP, extra payments may only reduce the amount forgiven." },
  { q: "Is student loan forgiveness taxable?", a: "Public Service Loan Forgiveness is not taxed by the federal government. Balances forgiven under an income-driven plan such as RAP may be counted as taxable income." },
  { q: "Should I refinance my federal student loans?", a: "Only if you are sure you will not need federal protections. A private loan has no RAP, no PSLF and fewer hardship options, and you cannot move back." },
  { q: "Can I deduct student loan interest?", a: "Yes, up to $2,500 a year, whether or not you itemize. The deduction phases out at higher incomes." },
  { q: "How do I know which plan I am on?", a: "Log in to studentaid.gov or your servicer's website. Your servicer can also tell you which plans your loans qualify for." },
  { q: "How long does it take to pay off student loans?", a: "Ten years on the standard plan for older loans, 10 to 25 years on the new standard plan depending on the balance, and up to 30 years on RAP, after which any balance is forgiven. Extra payments shorten any fixed plan." },
];

export default async function StudentLoanPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/loan-calculator", "/us/loans/debt-payoff-calculator", "/us/loans/debt-to-income-ratio", "/us/taxes/federal-income-tax", "/us/taxes/paycheck-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Loans and debt"
      title="Student Loan Calculator"
      lead="Work out your federal or private student loan payment, compare the standard, graduated, extended and RAP plans, and see what extra payments save."
      points={["Federal and private", "RAP estimate", "Plans compared", "Extra payments"]}
      guide={<StudentLoanGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates only. Your servicer sets your actual payment, and federal repayment rules are still being put into practice. Check studentaid.gov."
    >
      <StudentLoanStudio query={query} />
    </FlagshipPage>
  );
}

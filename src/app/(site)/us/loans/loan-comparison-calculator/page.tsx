import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import LoanCompareStudio from "./LoanCompareStudio";
import LoanCompareGuide from "./LoanCompareGuide";

export const metadata: Metadata = {
  title: "Loan Comparison Calculator: Compare 2 or 3 Offers",
  description:
    "Free loan comparison calculator for 2026. Compare two or three loan offers by payment, total interest, fees and APR, and see when a higher-fee loan breaks even.",
  alternates: { canonical: "/us/loans/loan-comparison-calculator" },
  openGraph: ogFor("/us/loans/loan-comparison-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: "/us/loans/loan-comparison-calculator", label: "Loan Comparison Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I compare two loan offers?",
    a: "Put both on the same footing: the same amount, then compare the total cost (all interest plus all fees) over the time you expect to keep the loan, the APR, and whether the payment fits your budget.",
  },
  {
    q: "Which is better: a lower rate with a fee or a higher rate with no fee?",
    a: "It depends on how long you keep the loan. On $20,000 over 60 months, 8% with an $800 fee costs $5,132 in total against $5,496 for 10% with no fee, but only if you keep it at least 29 months.",
  },
  {
    q: "What is a break-even point on a loan?",
    a: "The month at which the interest you have saved with the lower rate has paid back the extra fees. Repay or refinance before then and the no-fee loan would have been cheaper.",
  },
  {
    q: "Is the APR enough to compare loans?",
    a: "It is a good start for loans with the same term, because it folds fees into the rate. But it assumes you keep the loan for the full term, and it does not show the total dollars, which depend on the term.",
  },
  {
    q: "Should I pick the loan with the lowest monthly payment?",
    a: "Not on payment alone. A longer term lowers the payment but raises the total interest: $20,000 at 7% costs $617.54 a month and $2,232 of interest over 36 months, or $396.02 and $3,761 over 60 months.",
  },
  {
    q: "Does the calculator include fees added to the loan?",
    a: "Yes. Under More options you can add each offer's fees to the loan instead of paying them upfront. You then pay interest on the fees, which raises the total cost.",
  },
  {
    q: "Can I compare mortgages with different points?",
    a: "Yes. Enter the points and lender fees as upfront fees. On $300,000 over 30 years, 6% with $6,000 of points costs about $29,000 less over the full term than 6.5% with none, and pulls ahead after 48 months.",
  },
  {
    q: "Does shopping for loans hurt my credit score?",
    a: "Credit scoring models treat several inquiries for the same kind of loan within a short window (often 14 to 45 days) as one. Many lenders also show rates with a soft check that does not affect your score.",
  },
  {
    q: "What else should I compare besides cost?",
    a: "Prepayment penalties, late fees, whether the rate is fixed, the lender's hardship options, autopay discounts, and how quickly you get the money.",
  },
  {
    q: "Can I compare three offers?",
    a: "Yes. Turn on \"Add a third offer\" under More options.",
  },
  {
    q: "Why does a 4-year loan at a higher APR cost less than a 5-year loan at a lower APR?",
    a: "Because you pay interest for a shorter time. APR is a yearly rate; total cost also depends on how many years you pay it.",
  },
  {
    q: "Do lenders have to give me comparable figures?",
    a: "For consumer loans, the Truth in Lending Act requires the APR, finance charge, amount financed and total of payments, worked out the same way by every lender. Mortgages come with a standard Loan Estimate.",
  },
];

export default async function LoanComparePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/loans/apr-calculator",
      "/us/loans/loan-calculator",
      "/us/loans/personal-loan-calculator",
      "/us/housing/refinance-calculator",
      "/us/housing/mortgage-points-calculator",
      "/us/loans/debt-consolidation-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Payment, total cost, APR and break-even"
      title="Loan Comparison Calculator"
      lead="Put two or three loan offers side by side: the monthly payment, total interest, fees, APR and total cost of each, which one is cheaper, and how long you must keep a higher-fee loan before it pays off."
      points={["Two or three offers", "Total cost and APR", "Break-even month", "Cost if repaid early"]}
      guide={<LoanCompareGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <LoanCompareStudio query={query} />
    </FlagshipPage>
  );
}

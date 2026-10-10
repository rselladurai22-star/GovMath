import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import LoanStudio from "./LoanStudio";
import LoanGuide from "./LoanGuide";

export const metadata: Metadata = {
  title: "Loan Calculator: Payment, Interest and APR",
  description:
    "Free loan calculator for 2026. See the payment and total interest on any fixed loan, the true APR with an origination fee, and what extra payments save.",
  alternates: { canonical: "/us/loans/loan-calculator" },
  openGraph: ogFor("/us/loans/loan-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: "/us/loans/loan-calculator", label: "Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the monthly payment on a $15,000 loan?",
    a: "At 12% over 36 months, $498.21 a month, with $2,936 of interest in total. Over 60 months, $333.67 a month and $5,020 of interest.",
  },
  {
    q: "How is a loan payment calculated?",
    a: "Payment = P × r ÷ (1 − (1 + r)^−n), where P is the amount, r the monthly rate (yearly rate ÷ 12) and n the number of payments.",
  },
  {
    q: "What is the difference between the interest rate and the APR?",
    a: "The rate sets your payment. The APR also counts required fees, such as an origination fee, so it shows the full yearly cost and is the better way to compare offers.",
  },
  {
    q: "How does an origination fee change the APR?",
    a: "On $15,000 at 12% for 36 months, a 5% fee taken from the loan means you receive $14,250 but repay as if you had $15,000. The true APR rises to about 15.6%.",
  },
  {
    q: "Is a longer loan term better?",
    a: "It lowers the payment but raises the total interest. $15,000 at 12% costs $2,936 in interest over 3 years and $7,242 over 7 years.",
  },
  {
    q: "How much do extra payments save?",
    a: "Adding $100 a month to a $15,000, 36-month loan at 12% pays it off in 30 months and saves $580 of interest.",
  },
  {
    q: "What is a good personal loan rate in 2026?",
    a: "The Federal Reserve's survey put the average 24-month personal loan rate at banks at about 11.9% in August 2026. Borrowers with excellent credit can get less; poor credit can mean 30% or more.",
  },
  {
    q: "Can I pay off a loan early?",
    a: "Usually, yes. Most personal and auto loans have no prepayment penalty, but check your agreement before paying extra.",
  },
  {
    q: "Does the calculator work for car loans and mortgages?",
    a: "Yes, for any fixed-rate loan with equal monthly payments. For sales tax and trade-ins use the auto loan calculator, and for taxes, insurance and PMI the mortgage calculator.",
  },
  {
    q: "Why is so much of my early payment interest?",
    a: "Interest is charged on the balance, which is largest at the start. As the balance falls, more of each payment goes to principal.",
  },
  {
    q: "What if my rate is 0%?",
    a: "Then there is no interest and each payment is the amount divided by the number of payments: $5,000 over 12 months is $416.67.",
  },
  {
    q: "Is a secured loan cheaper than an unsecured one?",
    a: "Usually, because the lender can take the car, home or savings that back it if you stop paying. The lower rate comes with that risk.",
  },
  {
    q: "What happens if I miss a loan payment?",
    a: "You are usually charged a late fee, and a payment 30 days late can be reported to the credit bureaus. Call your lender before the due date to ask about a hardship plan.",
  },
];

export default async function LoanPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/auto-loan-calculator", "/us/loans/credit-card-payoff", "/us/loans/debt-payoff-calculator", "/us/loans/student-loan-calculator", "/us/housing/mortgage-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Payment, interest, fees and APR"
      title="Loan Calculator"
      lead="Work out the monthly payment and total interest on any fixed-rate loan, see how an origination fee raises the true APR, and how much extra payments save."
      points={["Any fixed-rate loan", "True APR with fees", "Full payment schedule", "Extra payment savings"]}
      guide={<LoanGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <LoanStudio query={query} />
    </FlagshipPage>
  );
}

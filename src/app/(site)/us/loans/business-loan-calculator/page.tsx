import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BusinessLoanStudio from "./BusinessLoanStudio";
import BusinessLoanGuide from "./BusinessLoanGuide";

export const metadata: Metadata = {
  title: "Business Loan Calculator: SBA 7(a) and Term",
  description:
    "Free business loan calculator for 2026. Payments on term and SBA 7(a) loans with guaranty fees and rate caps, cash advance factor rates as APR, and DSCR.",
  alternates: { canonical: "/us/loans/business-loan-calculator" },
  openGraph: ogFor("/us/loans/business-loan-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: "/us/loans/business-loan-calculator", label: "Business Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the payment on a $250,000 business loan?",
    a: "At 9.5% over 10 years, $3,234.94 a month, with $138,193 of interest. A 2% origination fee taken from the loan raises the APR to about 9.98%.",
  },
  {
    q: "What is the maximum interest rate on an SBA 7(a) loan?",
    a: "Prime plus a spread set by loan size. With prime at 6.75%, variable-rate caps are 13.25% up to $50,000, 12.75% to $250,000, 11.25% to $350,000 and 9.75% above. Fixed-rate caps run from 14.75% down to 11.75%.",
  },
  {
    q: "How much is the SBA guaranty fee?",
    a: "For 7(a) loans over 12 months approved from October 1, 2026: 2% of the guaranteed part up to $150,000, 3% from $150,001 to $700,000, and 3.5% (3.75% on the guaranteed part over $1 million) above that. On $500,000 it is $11,250.",
  },
  {
    q: "How much of a 7(a) loan does the SBA guarantee?",
    a: "85% of loans of $150,000 or less and 75% of larger loans. SBA Express loans carry a 50% guarantee. The guarantee protects the lender, not you: you still owe the full amount.",
  },
  {
    q: "Is there a fee waiver for manufacturers?",
    a: "Yes. For fiscal year 2027, 7(a) loans of $700,000 or less to manufacturers (NAICS 31 to 33), food supply chain businesses and businesses in rural areas have no upfront guaranty fee.",
  },
  {
    q: "What is an SBA 504 loan?",
    a: "A long-term fixed-rate loan for real estate and major equipment. A bank usually lends about 50% of the project, a Certified Development Company about 40% backed by the SBA, and you put in about 10%. Terms are 10, 20 or 25 years.",
  },
  {
    q: "How do I convert a factor rate to an APR?",
    a: "Find the per-payment rate at which the daily or weekly payments repay the cash you received, then multiply by the number of payments a year. A $50,000 advance at a 1.3 factor repaid each business day over 6 months is about 109% APR.",
  },
  {
    q: "What is a good DSCR for a business loan?",
    a: "Most lenders want a debt service coverage ratio of at least 1.25: yearly cash flow at least 1.25 times your yearly debt payments. Below 1.0 the business does not earn enough to pay its debts.",
  },
  {
    q: "Do business loans have to show an APR?",
    a: "Not under federal law: the Truth in Lending Act covers consumer credit. Some states, including California and New York, now require commercial financing providers to disclose an estimated APR on many offers.",
  },
  {
    q: "What is the longest term on an SBA 7(a) loan?",
    a: "Generally up to 10 years for working capital and equipment, and up to 25 years when the loan finances real estate.",
  },
  {
    q: "Will I need a personal guarantee?",
    a: "For SBA 7(a) loans, anyone owning 20% or more of the business must give an unlimited personal guarantee. Most banks and online lenders ask owners for one too.",
  },
  {
    q: "Is interest on a business loan tax-deductible?",
    a: "Generally yes, as a business expense, subject to the business interest limit for larger businesses. Repayments of principal are not deductible. Ask a tax professional about your case.",
  },
];

export default async function BusinessLoanPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/loans/loan-calculator",
      "/us/loans/apr-calculator",
      "/us/loans/loan-comparison-calculator",
      "/us/loans/simple-interest-calculator",
      "/us/taxes/self-employment-tax",
      "/us/taxes/estimated-tax-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Term loans, SBA 7(a) and cash advances"
      title="Business Loan Calculator"
      lead="Work out the payment and full cost of a bank term loan or an SBA 7(a) loan with its guaranty fee and rate cap, turn a merchant cash advance factor rate into an APR, and check your debt service coverage."
      points={["SBA 7(a) fees and rate caps", "Term loan payment and APR", "Factor rate to APR", "DSCR check"]}
      guide={<BusinessLoanGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial or tax advice."
    >
      <BusinessLoanStudio query={query} />
    </FlagshipPage>
  );
}

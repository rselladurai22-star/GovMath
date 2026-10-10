import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HomeEquityStudio from "./HomeEquityStudio";
import HomeEquityGuide from "./HomeEquityGuide";

export const metadata: Metadata = {
  title: "Home Equity Loan Calculator",
  description:
    "Free home equity loan calculator for 2026. See how much you can borrow, your fixed payment and APR, and compare with a HELOC and a cash-out refinance.",
  alternates: { canonical: "/us/housing/home-equity-loan-calculator" },
  openGraph: ogFor("/us/housing/home-equity-loan-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/home-equity-loan-calculator", label: "Home Equity Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much can I borrow with a home equity loan?",
    a: "Usually enough to bring all loans on the home to 80% to 85% of its value. On a $500,000 home with $300,000 owed, that is $100,000 at 80% or $125,000 at 85%.",
  },
  {
    q: "What is the payment on a $50,000 home equity loan?",
    a: "At 8.66% fixed, $1,029.69 a month over 5 years, $624.22 over 10 years, $497.07 over 15 years or $390.14 over 30 years.",
  },
  {
    q: "What are home equity loan rates now?",
    a: "Bankrate's survey put the average 10-year home equity loan at about 8.66% on October 7, 2026, against about 7.33% for HELOCs. Your rate depends on your credit, the loan-to-value and the amount.",
  },
  {
    q: "Is a home equity loan better than a cash-out refinance?",
    a: "If your first mortgage has a lower rate than today's, usually yes: a cash-out refinance reprices your whole mortgage. With $300,000 at 4%, raising $50,000 by cash-out refinance at 7.3% costs about $349,000 more over its life, against about $40,000 for a home equity loan.",
  },
  {
    q: "Is a home equity loan or a HELOC better?",
    a: "A home equity loan gives a lump sum at a fixed rate with a fixed payment. A HELOC lets you draw as needed at a variable rate, with interest-only payments at first. Pick the loan for one known cost, the HELOC for costs that come in stages.",
  },
  {
    q: "Is home equity loan interest tax deductible?",
    a: "Only if you itemize and the money is used to buy, build or substantially improve the home that secures the loan, within the $750,000 cap on total mortgage debt. The One Big Beautiful Bill Act made these rules permanent.",
  },
  {
    q: "Can I deduct the interest if I use the loan to pay off credit cards?",
    a: "No. Interest on home equity borrowing used for debts, cars, tuition or anything other than the home is not deductible.",
  },
  {
    q: "What are the closing costs on a home equity loan?",
    a: "Often about 2% to 5% of the loan, for the appraisal, origination, title and recording. Some lenders waive them. Costs taken from the loan raise the APR: $1,000 on $50,000 at 8.66% over 15 years makes it 9.00%.",
  },
  {
    q: "What credit score do I need?",
    a: "Many lenders want at least 620 to 680, with the best rates for scores above about 740, along with enough equity and a manageable debt-to-income ratio.",
  },
  {
    q: "How long does it take to get the money?",
    a: "Often two to six weeks, including the appraisal. On your main home, you have three business days after closing to cancel, so the money is released after that.",
  },
  {
    q: "What happens to a home equity loan when I sell?",
    a: "It is paid off from the sale proceeds at closing, after the first mortgage. Check for an early payoff fee if you might sell within a few years.",
  },
  {
    q: "What is CLTV?",
    a: "Combined loan-to-value: all loans secured on the home divided by its value. $300,000 owed plus a $50,000 home equity loan on a $500,000 home is a 70% CLTV.",
  },
];

export default async function HomeEquityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/heloc-calculator",
      "/us/housing/refinance-calculator",
      "/us/housing/mortgage-calculator",
      "/us/loans/debt-to-income-ratio",
      "/us/loans/debt-payoff-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Borrowing power, payment and the alternatives"
      title="Home Equity Loan Calculator"
      lead="See how much you can borrow against your home, the fixed monthly payment and true cost, and how it compares with a HELOC and a cash-out refinance."
      points={["Borrowing limit by CLTV", "Fixed payment and APR", "HELOC and cash-out refinance compared", "Interest deduction check"]}
      guide={<HomeEquityGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer, tax or financial advice."
    >
      <HomeEquityStudio query={query} />
    </FlagshipPage>
  );
}

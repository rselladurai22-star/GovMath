import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PersonalLoanStudio from "./PersonalLoanStudio";
import PersonalLoanGuide from "./PersonalLoanGuide";

const PATH = "/us/loans/personal-loan-calculator";

export const metadata: Metadata = {
  title: "Personal Loan Calculator by Credit Score",
  description:
    "Free personal loan calculator for 2026. Payment, true APR and total cost by credit score, with the origination fee taken out or added, and 24 to 60 month terms.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Personal Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the monthly payment on a $10,000 personal loan?",
    a: "At 19.47%, the average offer for good credit in October 2026, it is $368.94 a month over 36 months, with $3,282 of interest. Over 60 months it is $262.00 a month, with $5,720 of interest.",
  },
  {
    q: "What APR can I get with my credit score?",
    a: "NerdWallet's October 2026 figures for pre-qualified offers averaged about 15.2% for scores of 720 to 850, 19.5% for 690 to 719, 24.2% for 630 to 689 and 29.7% below 630. Your income, debts and the lender also matter.",
  },
  {
    q: "How does an origination fee work?",
    a: "It is a one-time charge, usually a percentage of the loan. Most lenders take it out of the money they send you: on a $10,000 loan with a 5% fee you receive $9,500 but repay $10,000 plus interest.",
  },
  {
    q: "How much should I borrow if the fee is taken out?",
    a: "Divide what you need by one minus the fee. To receive $10,000 after a 5% fee, borrow about $10,526. The calculator does this when you switch on \"Borrow enough to receive the full amount\".",
  },
  {
    q: "Does the fee change the APR?",
    a: "Yes. The APR counts the fee as a cost of borrowing. A 19.47% loan for 36 months with a 5% fee taken out has an APR of about 23.24%.",
  },
  {
    q: "Is a longer personal loan term better?",
    a: "Only for the payment. On $10,000 at 19.47% with a 5% fee, interest and fee come to $2,653 over 24 months and $6,220 over 60 months.",
  },
  {
    q: "How much does good credit save on a personal loan?",
    a: "On $10,000 over 36 months, the average excellent-credit rate costs $2,510 in interest and the average bad-credit rate $5,227: a gap of about $2,718.",
  },
  {
    q: "Does checking my rate hurt my credit score?",
    a: "Pre-qualifying usually uses a soft credit check that does not affect your score. A full application uses a hard inquiry, which can lower it slightly for a while.",
  },
  {
    q: "Can I pay a personal loan off early?",
    a: "Most lenders allow it with no penalty, but check the agreement. An extra $100 a month on $10,000 at 19.47% over 36 months clears it 9 months early and saves about $909 of interest.",
  },
  {
    q: "What is the highest APR a personal loan should have?",
    a: "Many mainstream lenders keep their rates at or below 36%, and the Military Lending Act caps most loans to service members at 36%. Loans above that, such as payday loans, are very expensive.",
  },
  {
    q: "Is a personal loan cheaper than a credit card?",
    a: "Often. The Federal Reserve put the average rate on cards charged interest at about 22% in August 2026. A personal loan also has a fixed end date, while a card balance can drag on for years.",
  },
  {
    q: "What do lenders need from me?",
    a: "Usually proof of identity and address, your income (pay stubs, W-2s or tax returns), your Social Security number for the credit check and your bank details for the deposit.",
  },
];

export default async function PersonalLoanPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/loan-calculator", "/us/loans/debt-consolidation-calculator", "/us/loans/credit-card-payoff", "/us/loans/debt-to-income-ratio", "/us/loans/balance-transfer-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Rates by credit score, fees and terms"
      title="Personal Loan Calculator"
      lead="See the payment and total cost of a personal loan at the rate your credit score is likely to get, how much the origination fee leaves you with, and how 24 to 60 month terms compare."
      points={["Rates by credit score", "Fee taken out or added", "Cash you actually receive", "24 to 60 months compared"]}
      guide={<PersonalLoanGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <PersonalLoanStudio query={query} />
    </FlagshipPage>
  );
}

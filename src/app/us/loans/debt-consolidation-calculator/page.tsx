import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DebtConsolidationStudio from "./DebtConsolidationStudio";
import DebtConsolidationGuide from "./DebtConsolidationGuide";

const PATH = "/us/loans/debt-consolidation-calculator";

export const metadata: Metadata = {
  title: "Debt Consolidation Calculator",
  description:
    "Free debt consolidation calculator for 2026. Compare your cards and loans with one consolidation loan: monthly payment, months to debt-free, interest and fees.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Debt Consolidation Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Does debt consolidation save money?",
    a: "Only if the new loan's interest and fees are less than the interest you would pay on your debts. In our example, $13,000 of card debt at about 25% costs $8,431 in interest at today's payments; a 36-month loan at 14% with a 4% fee costs $3,662.",
  },
  {
    q: "Why can a lower rate cost more?",
    a: "Because a longer term means paying interest for more months. A 60-month loan at 19.47% with a 5% fee costs about $80 more than paying the same cards off in 56 months at today's payments.",
  },
  {
    q: "What rate do I need for consolidation to be worth it?",
    a: "Clearly below the balance-weighted average rate on your debts, once the fee is included. Compare the loan's APR, which counts the fee, with your average card APR, and keep the term no longer than your current payoff time.",
  },
  {
    q: "Should I borrow extra to cover the origination fee?",
    a: "If the fee is taken out of the loan, yes, or you will not have enough to pay off every balance. To clear $13,000 with a 4% fee, borrow about $13,542.",
  },
  {
    q: "Will a consolidation loan hurt my credit score?",
    a: "The application causes a small, temporary dip from the hard inquiry. Paying cards down usually lowers your credit use, which can help your score, as long as you keep making every payment on time.",
  },
  {
    q: "Should I close my credit cards after consolidating?",
    a: "Not necessarily. Closing cards can lower your available credit and raise your credit use ratio. Keep them open with a zero balance if you can resist using them; close them if you cannot.",
  },
  {
    q: "Is a balance transfer better than a consolidation loan?",
    a: "For a balance you can repay within the 0% period, usually yes, even after a 3% to 5% fee. For larger debts that will take years, a fixed-rate loan gives a steady payment and an end date.",
  },
  {
    q: "Can I consolidate with a home equity loan?",
    a: "You can, and the rate is often lower, but it turns unsecured card debt into debt secured on your home. If you cannot pay, you could lose the house.",
  },
  {
    q: "What is a debt management plan?",
    a: "A plan set up by a nonprofit credit counseling agency: you make one payment to the agency, which pays your creditors, often at reduced interest rates. It is not a loan, and the cards are usually closed.",
  },
  {
    q: "Is debt consolidation the same as debt settlement?",
    a: "No. Consolidation repays your debts in full with a new loan. Settlement companies try to get creditors to accept less, often charging fees, and it can badly damage your credit.",
  },
  {
    q: "What if I keep paying the same amount on the new loan?",
    a: "You finish much sooner. Paying the old $420 a month on a 60-month loan at 14% clears it in 41 months, for about $4,086 of interest and fees.",
  },
];

export default async function DebtConsolidationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/personal-loan-calculator", "/us/loans/balance-transfer-calculator", "/us/loans/debt-payoff-calculator", "/us/loans/credit-card-payoff", "/us/loans/debt-to-income-ratio"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Your debts vs one loan"
      title="Debt Consolidation Calculator"
      lead="List your cards and loans, enter a consolidation loan's rate, term and fee, and see whether one loan really saves money, how the monthly payment changes and when you would be debt-free."
      points={["Up to five debts", "Fee taken out or added", "Every term compared", "Warns when it costs more"]}
      guide={<DebtConsolidationGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <DebtConsolidationStudio query={query} />
    </FlagshipPage>
  );
}

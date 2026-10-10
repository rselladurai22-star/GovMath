import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CardPayoffStudio from "./CardPayoffStudio";
import CardPayoffGuide from "./CardPayoffGuide";

const PATH = "/us/loans/credit-card-payoff";

export const metadata: Metadata = {
  title: "Credit Card Payoff Calculator",
  description:
    "Free credit card payoff calculator for 2026. See how long to clear your card, the interest it costs, minimum payments compared, and a 0% balance transfer.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Credit Card Payoff Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How long will it take to pay off my credit card?", a: "It depends on the balance, the APR and what you pay. $6,000 at 22% takes 26 months at $300 a month, 44 months at $200, and over 20 years paying only a typical minimum." },
  { q: "How is credit card interest calculated?", a: "Most cards apply a daily rate (APR ÷ 365) to your balance each day and add the interest once a month. $6,000 at 22% costs about $110 in interest a month." },
  { q: "How is the minimum payment worked out?", a: "Each card sets its own formula. A common one is 1% of the balance plus the month's interest and fees, or a floor such as $25 or $35, whichever is higher. Your card agreement gives the exact rule." },
  { q: "Why does paying the minimum take so long?", a: "Because the minimum is a share of the balance, it falls as you pay, and most of each payment goes to interest. Keep paying your first minimum amount, or more, to finish years sooner." },
  { q: "What is the average credit card interest rate?", a: "The Federal Reserve's G.19 survey put it at about 22% for cards charged interest and about 21% across all accounts in August 2026." },
  { q: "Is a balance transfer worth it?", a: "Often, if you can clear most of the balance during the 0% period. On $6,000 with a 3% fee and 18 months at 0%, paying $300 a month costs about $207 in fee and interest, against $1,543 staying on a 22% card." },
  { q: "What payment clears my card in 3 years?", a: "Choose 'Clear it by a set time' and enter 36 months. For $6,000 at 22%, it is $229.14 a month. Your statement also shows this figure, as the CARD Act requires." },
  { q: "Should I pay off my credit card or save?", a: "Most people should keep a small emergency fund and then put extra money toward card debt, since a 22% APR is far more than savings accounts pay." },
  { q: "Does paying off a credit card raise my credit score?", a: "Usually. Lower balances cut your credit utilization, a big part of credit scores. Keeping old no-fee cards open after paying them off also helps utilization." },
  { q: "Should I close my card after paying it off?", a: "Not always. Closing it removes its credit limit, which can raise your utilization. If it has no annual fee, keeping it open and unused is often better for your score." },
  { q: "Which card should I pay off first?", a: "Pay the minimum on all of them, then put extra on the highest APR (the avalanche method, which saves the most) or the smallest balance (the snowball method, for quick wins)." },
  { q: "What if I can't afford the minimum payment?", a: "Call your card issuer before you miss a payment and ask about a hardship program, or contact a nonprofit credit counseling agency about a debt management plan." },
  { q: "Is it better to pay off a credit card in full or carry a balance?", a: "Pay in full whenever you can. Carrying a balance does not improve your credit score, and you lose the grace period, so new purchases start charging interest at once." },
];

export default async function CardPayoffPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/debt-payoff-calculator", "/us/loans/loan-calculator", "/us/loans/debt-to-income-ratio", "/us/savings/savings-goal-calculator", "/us/taxes/paycheck-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Loans and debt"
      title="Credit Card Payoff Calculator"
      lead="See how long it takes to clear your card, what it costs in interest, how much you save over the minimum payment, and whether a balance transfer helps."
      points={["Fixed payment or deadline", "Minimum payment compared", "Balance transfer", "Month-by-month chart"]}
      guide={<CardPayoffGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates only. Your card agreement sets how interest and minimum payments are worked out. Not financial advice."
    >
      <CardPayoffStudio query={query} />
    </FlagshipPage>
  );
}

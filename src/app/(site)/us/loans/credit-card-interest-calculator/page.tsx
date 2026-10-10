import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CardInterestStudio from "./CardInterestStudio";
import CardInterestGuide from "./CardInterestGuide";

export const metadata: Metadata = {
  title: "Credit Card Interest Calculator: Monthly Cost",
  description:
    "Free credit card interest calculator for 2026. See this month's interest from your average daily balance and APR, how the grace period works and a year's cost.",
  alternates: { canonical: "/us/loans/credit-card-interest-calculator" },
  openGraph: ogFor("/us/loans/credit-card-interest-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: "/us/loans/credit-card-interest-calculator", label: "Credit Card Interest Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is credit card interest calculated?",
    a: "Most cards divide the APR by 365 to get a daily periodic rate, apply it to your balance each day, and add up the interest at the end of the billing cycle. Many add each day's interest to the balance, so interest compounds daily.",
  },
  {
    q: "How much interest will I pay on $5,000 at 22% APR?",
    a: "About $91 for a 30-day cycle if the balance stays at $5,000 and interest compounds daily ($90.41 without compounding). Over a year, paying $200 a month and spending nothing more, about $938.",
  },
  {
    q: "What is the average credit card interest rate?",
    a: "The Federal Reserve's G.19 release put it at about 22.4% for accounts charged interest and about 21.2% across all accounts in August 2026.",
  },
  {
    q: "What is the average daily balance?",
    a: "The sum of your balance at the end of each day in the billing cycle, divided by the number of days. Purchases raise it from the day they post and payments lower it from the day they are credited.",
  },
  {
    q: "How does the grace period work?",
    a: "If you paid the previous statement in full by the due date, most cards charge no interest on new purchases. The CARD Act requires statements to be sent at least 21 days before the payment is due, so a card that offers a grace period gives you at least that long.",
  },
  {
    q: "Why was I charged interest after paying my balance in full?",
    a: "This is often residual or trailing interest: interest that built up between the statement date and the day your payment arrived, after a month when you carried a balance. It usually stops the next month if you pay in full again.",
  },
  {
    q: "Does paying earlier in the month reduce interest?",
    a: "Yes, a little. On a $5,000 balance at 22% with $500 of purchases, a $200 payment on day 1 of the cycle saves about $2.32 compared with paying on day 20, because the balance is lower for more days.",
  },
  {
    q: "Is it APR ÷ 365 or APR ÷ 360?",
    a: "Most issuers use 365. A few use 360, which raises the daily rate slightly: on $5,000 at 22% over 30 days, $91.67 instead of $90.41 before compounding.",
  },
  {
    q: "Do cash advances have a grace period?",
    a: "Usually not. Interest on a cash advance starts the day you take the cash, often at a higher APR, and there is usually a cash advance fee as well.",
  },
  {
    q: "What happens if I only pay the minimum?",
    a: "Most of the payment goes to interest and the balance falls very slowly. Your statement must show how long paying only the minimum would take; our credit card payoff calculator shows the same.",
  },
  {
    q: "Can my card raise my APR?",
    a: "Under the CARD Act, an issuer must give 45 days' notice before raising the APR on new purchases, and can only apply a penalty rate to your existing balance if you are more than 60 days late.",
  },
  {
    q: "How can I pay less interest?",
    a: "Pay the statement in full to keep the grace period, pay as early in the cycle as you can, ask your issuer for a lower APR, or move the balance to a 0% balance transfer card and clear it during the promotion.",
  },
];

export default async function CardInterestPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/loans/credit-card-payoff",
      "/us/loans/balance-transfer-calculator",
      "/us/loans/debt-payoff-calculator",
      "/us/loans/debt-consolidation-calculator",
      "/us/loans/apr-calculator",
      "/us/loans/simple-interest-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Average daily balance and the grace period"
      title="Credit Card Interest Calculator"
      lead="See how much interest your card charges this billing cycle from your balance, purchases, payment and APR, when the grace period saves you all of it, and what the same pattern costs over a year."
      points={["Average daily balance", "Daily periodic rate", "Grace period check", "12-month cost"]}
      guide={<CardInterestGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not financial advice. Your card agreement sets how interest is charged."
    >
      <CardInterestStudio query={query} />
    </FlagshipPage>
  );
}

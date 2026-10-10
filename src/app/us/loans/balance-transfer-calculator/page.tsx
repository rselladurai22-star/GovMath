import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BalanceTransferStudio from "./BalanceTransferStudio";
import BalanceTransferGuide from "./BalanceTransferGuide";

const PATH = "/us/loans/balance-transfer-calculator";

export const metadata: Metadata = {
  title: "Balance Transfer Calculator: 0% Card Savings",
  description:
    "Free balance transfer calculator for 2026. See what a 0% card saves after the fee, the payment that clears it before the intro period ends, and what is left.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Balance Transfer Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is a balance transfer worth it?",
    a: "Usually, if your card charges a high rate. Moving $6,000 from a 24% card to an 18-month 0% card with a 3% fee, and paying $300 a month, saves about $1,530 compared with staying put.",
  },
  {
    q: "How much is a balance transfer fee?",
    a: "Usually 3% to 5% of the amount you move, with a small minimum such as $5. On $6,000, that is $180 to $300. The fee is added to the new card's balance on day one.",
  },
  {
    q: "How much do I need to pay to clear the balance before the 0% ends?",
    a: "Add the fee to the balance and divide by the number of 0% months. $6,000 plus a 3% fee over 18 months is $343.33 a month.",
  },
  {
    q: "What happens when the 0% period ends?",
    a: "Whatever is left starts charging the card's normal APR. If you pay $300 a month on the example, $780 is left after 18 months and is cleared three months later with about $30 of interest.",
  },
  {
    q: "How long do 0% balance transfer offers last?",
    a: "Usually 12 to 21 months in 2026. By federal rule a promotional rate must last at least six months.",
  },
  {
    q: "Is a longer intro period worth a higher fee?",
    a: "Often. On $6,000 at $300 a month, a 5% fee with 21 months at 0% saves about $1,439, close to the $1,530 from a 3% fee with 18 months, and it clears the balance with no interest at all.",
  },
  {
    q: "Can I lose the 0% rate?",
    a: "Yes. A late payment can end the promotional rate under many card agreements, and once a payment is 60 days late the issuer can raise the rate on the existing balance.",
  },
  {
    q: "Do new purchases get 0% too?",
    a: "Not always. Many transfer cards charge the normal rate on purchases, and while you carry a balance you lose the grace period, so purchases can be charged interest from the day you make them.",
  },
  {
    q: "Can I transfer a balance between cards from the same bank?",
    a: "Usually not. Issuers generally only accept transfers from other banks' cards.",
  },
  {
    q: "Does a balance transfer hurt my credit score?",
    a: "Opening the new card causes a hard inquiry and a new account, which can dip your score briefly. The extra credit limit lowers your credit use, which can help, if you do not run the old card back up.",
  },
  {
    q: "When is a balance transfer not worth it?",
    a: "When the balance is small or you would clear it within a few months anyway. Moving $1,000 to a 6-month 0% card with a 5% fee and paying $200 a month saves only about $15.",
  },
  {
    q: "Is a low-rate offer with no fee better than 0% with a fee?",
    a: "Sometimes about the same. On $6,000 at $300 a month, 3.99% for 18 months with no fee saves about $1,493, against about $1,530 for 0% with a 3% fee. Enter the intro rate under More options to compare.",
  },
];

export default async function BalanceTransferPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/credit-card-payoff", "/us/loans/credit-card-interest-calculator", "/us/loans/debt-consolidation-calculator", "/us/loans/personal-loan-calculator", "/us/loans/debt-payoff-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Fee, intro period and payoff"
      title="Balance Transfer Calculator"
      lead="See how much a 0% balance transfer saves once the 3% to 5% fee is paid, the monthly payment that clears the balance before the intro rate ends, and what is left if it does not."
      points={["Savings after the fee", "Payment to clear in time", "Balance left after the intro", "Fees and intro lengths compared"]}
      guide={<BalanceTransferGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a card offer or financial advice."
    >
      <BalanceTransferStudio query={query} />
    </FlagshipPage>
  );
}

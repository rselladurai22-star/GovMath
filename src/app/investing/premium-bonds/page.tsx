import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PremiumBondsStudio from "./PremiumBondsStudio";
import PremiumBondsGuide from "./PremiumBondsGuide";

export const metadata: Metadata = {
  title: "Premium Bonds Calculator UK: How Much Could I Win?",
  description:
    "See what you are likely to win with Premium Bonds at the 4.35% prize fund rate, in a typical, unlucky and lucky year, and compare with a savings account after tax.",
  alternates: { canonical: "/investing/premium-bonds" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/premium-bonds", label: "Premium Bonds" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Premium Bonds prize rate?", a: "4.35% from the September 2026 draw, with odds of 21,000 to 1 per £1 Bond each month." },
  { q: "How much will I win with £10,000?", a: "On average £435 a year, but a typical year brings about £350, because most prizes are small." },
  { q: "Are Premium Bond prizes taxed?", a: "No. Prizes are free of income tax and capital gains tax." },
  { q: "Are Premium Bonds safe?", a: "Yes. They are backed by HM Treasury, so the full amount is protected." },
];

export default async function PremiumBondsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/compound-interest", "/investing/inflation-impact", "/investing/isa-vs-gia", "/tax-and-salary/savings-interest-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Savings"
      title="Premium Bonds Calculator"
      lead="See what you are likely to win in a typical year, not just the average, and compare with a savings account."
      points={["September 2026 prizes", "Typical, lucky and unlucky years", "Tax comparison", "Free and private"]}
      guide={<PremiumBondsGuide />}
      faqs={FAQS}
      related={related}
      note="Prizes are random. Results are simulated. Not financial advice."
    >
      <PremiumBondsStudio query={query} />
    </FlagshipPage>
  );
}

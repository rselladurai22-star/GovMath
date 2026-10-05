import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RatesStudio from "./RatesStudio";
import RatesGuide from "./RatesGuide";

export const metadata: Metadata = {
  title: "Small Business Rates Relief Calculator (England 2026/27)",
  description:
    "Work out your 2026/27 business rates bill in England with the new multipliers, small business rate relief, retail and hospitality rates, charity relief and part-year occupation.",
  alternates: { canonical: "/business/small-business-rates" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/small-business-rates", label: "Small Business Rates" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How are business rates calculated?", a: "Rateable value times the multiplier for the year, less any reliefs. For 2026/27 the small business multiplier is 43.2p, or 38.2p for retail, hospitality and leisure." },
  { q: "Who gets small business rate relief?", a: "Businesses using one property in England with a rateable value under £15,000. Up to £12,000 the relief is 100%; between £12,000 and £15,000 it tapers." },
  { q: "What changed for shops and pubs in April 2026?", a: "The 40% retail, hospitality and leisure relief was replaced by permanently lower multipliers: 38.2p for properties under £51,000 and 43p up to £500,000." },
  { q: "Can I keep relief with a second property?", a: "Yes, if each other property has a rateable value under £2,900 and the total is under £20,000, or £28,000 in London." },
  { q: "My bill went up a lot after the revaluation. Is there help?", a: "Transitional relief and Supporting Small Business relief limit increases for many businesses. Councils usually apply them automatically." },
];

export default async function RatesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/break-even", "/business/gross-profit-margin", "/business/allowable-expenses", "/business/corporation-tax", "/business/sole-trader-tax", "/property/council-tax-bands"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="England 2026/27"
      title="Small Business Rates Relief Calculator"
      lead="Work out your business rates bill with the new 2026/27 multipliers and see how much small business rate relief takes off."
      points={["2026 multipliers", "Small business relief", "Retail and hospitality", "Free and private"]}
      guide={<RatesGuide />}
      faqs={FAQS}
      related={related}
      note="England, rates year 2026/27. Not financial advice."
    >
      <RatesStudio query={query} />
    </FlagshipPage>
  );
}

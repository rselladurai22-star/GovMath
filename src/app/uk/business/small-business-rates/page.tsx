import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RatesStudio from "./RatesStudio";
import { ogFor } from "@/gm/og";
import RatesGuide from "./RatesGuide";

export const metadata: Metadata = {
  title: "Small Business Rates Relief Calculator 2026/27",
  description:
    "Free business rates calculator for England in 2026/27. Check small business rates relief, the multipliers and what you pay on your rateable value.",
  alternates: { canonical: "/uk/business/small-business-rates" },
  openGraph: ogFor("/uk/business/small-business-rates"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/business", label: "Business" },
  { href: "/uk/business/small-business-rates", label: "Small Business Rates" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How are business rates calculated?", a: "Rateable value times the multiplier for the year, less any reliefs. For 2026/27 the small business multiplier is 43.2p, or 38.2p for retail, hospitality and leisure." },
  { q: "Who gets small business rate relief?", a: "Businesses using one property in England with a rateable value under £15,000. Up to £12,000 the relief is 100%; between £12,000 and £15,000 it tapers." },
  { q: "What changed for shops and pubs in April 2026?", a: "The 40% retail, hospitality and leisure relief was replaced by permanently lower multipliers: 38.2p for properties under £51,000 and 43p up to £500,000." },
  { q: "Can I keep relief with a second property?", a: "Yes, if each other property has a rateable value under £2,900 and the total is under £20,000, or £28,000 in London." },
  { q: "My bill went up a lot after the revaluation. Is there help?", a: "Transitional relief and Supporting Small Business relief limit increases for many businesses. Councils usually apply them automatically." },
  { q: "Who pays business rates, the landlord or the tenant?", a: "The occupier, so usually the tenant. The owner pays when the property is empty." },
  { q: "Do I pay business rates on a market stall?", a: "Usually not on the stall itself, though the market operator may pay rates on the site." },
  { q: "Can I pay monthly?", a: "Yes. Bills are normally in 10 monthly instalments, or 12 if you ask your council." },
  { q: "Are business rates an allowable expense?", a: "Yes. They are deductible for Income Tax and Corporation Tax." },
  { q: "What if my business shares a building?", a: "Each separately occupied part usually has its own rateable value and bill. Shared offices may include rates in the rent." },
  { q: "Does small business rate relief apply to a pub or shop?", a: "Yes, if it is your only business property and its rateable value is under £15,000. It is worked out after the lower retail, hospitality and leisure multiplier." },
  { q: "Is my rateable value the same as my rent?", a: "Not exactly. It is an estimate of the open-market rent at the valuation date, 1 April 2024 for the 2026 list, on standard assumptions. Your actual rent may be higher or lower." },
  { q: "Do I pay rates while I fit out a new shop?", a: "Usually yes, from the date you become responsible for the property, even if you are not yet trading. Ask the council if the property was empty before." },
];

export default async function RatesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/business/break-even", "/uk/business/gross-profit-margin", "/uk/business/allowable-expenses", "/uk/business/corporation-tax", "/uk/business/sole-trader-tax", "/uk/property/council-tax-bands"].includes(c.href));
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

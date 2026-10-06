import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MovingStudio from "./MovingStudio";
import MovingGuide from "./MovingGuide";

export const metadata: Metadata = {
  title: "Moving House Costs Calculator (UK, 2026)",
  description:
    "Add up the cost of moving home: Stamp Duty, LBTT or LTT worked out for you, legal fees, surveys, mortgage fees, estate agent fees, removals and the cash your sale releases.",
  alternates: { canonical: "/property/moving-house-budget" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/moving-house-budget", label: "Moving House Costs" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does it cost to move house?", a: "Apart from the deposit, most buyers pay property tax plus £3,000 to £5,000 in legal, survey, mortgage and removal costs. Sellers also pay the estate agent, often 1% to 1.5% plus VAT." },
  { q: "Who pays the estate agent?", a: "The seller, in England, Wales and Northern Ireland." },
  { q: "When are moving costs paid?", a: "Surveys and valuation fees early, the deposit at exchange, and the tax, legal fees and estate agent at completion." },
  { q: "How much are conveyancing fees?", a: "Often £1,200 to £2,000 including searches and VAT, more for leasehold or new-build homes." },
  { q: "Which survey do I need?", a: "A Level 2 survey suits most conventional homes. Choose Level 3 for older, larger or altered homes." },
];

export default async function MovingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/stamp-duty-england", "/property/first-time-buyer", "/property/mortgage-affordability", "/property/single-person-discount", "/property/lbtt-scotland", "/property/ltt-wales"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026"
      title="Moving House Costs Calculator"
      lead="Every one-off cost of buying, selling and moving, with property tax worked out from the price."
      points={["Tax worked out for you", "Buying and selling", "Cash needed on the day", "Free and private"]}
      guide={<MovingGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates. Property tax uses 2026/27 rates; other costs are typical figures you can change. Get quotes for your own move."
    >
      <MovingStudio query={query} />
    </FlagshipPage>
  );
}

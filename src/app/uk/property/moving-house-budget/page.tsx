import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MovingStudio from "./MovingStudio";
import { ogFor } from "@/gm/og";
import MovingGuide from "./MovingGuide";

export const metadata: Metadata = {
  title: "Moving House Costs Calculator UK 2026",
  description:
    "Free moving costs calculator. Add up Stamp Duty, conveyancing, surveys, mortgage fees, estate agent and removals to see the full cost of moving home.",
  alternates: { canonical: "/uk/property/moving-house-budget" },
  openGraph: ogFor("/uk/property/moving-house-budget"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/moving-house-budget", label: "Moving House Costs" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does it cost to move house?", a: "Apart from the deposit, most buyers pay property tax plus £3,000 to £5,000 in legal, survey, mortgage and removal costs. Sellers also pay the estate agent, often 1% to 1.5% plus VAT." },
  { q: "Who pays the estate agent?", a: "The seller, in England, Wales and Northern Ireland." },
  { q: "When are moving costs paid?", a: "Surveys and valuation fees early, the deposit at exchange, and the tax, legal fees and estate agent at completion." },
  { q: "How much are conveyancing fees?", a: "Often £1,200 to £2,000 including searches and VAT, more for leasehold or new-build homes." },
  { q: "Which survey do I need?", a: "A Level 2 survey suits most conventional homes. Choose Level 3 for older, larger or altered homes." },
  { q: "How much should I budget on top of my deposit?", a: "It depends mostly on property tax. Without it, many buyers spend £3,000 to £5,000 on fees and removals; sellers add the estate agent's fee." },
  { q: "Can I add moving costs to my mortgage?", a: "You can usually add the arrangement fee. Other costs need to be paid in cash, though some buyers borrow more to keep cash back." },
  { q: "Do I pay the estate agent if I am only buying?", a: "No. In England, Wales and Northern Ireland the seller pays the estate agent." },
  { q: "Do I get the survey money back if the purchase falls through?", a: "No. Surveys and valuations are paid for even if you pull out. Some insurance products cover abortive costs." },
  { q: "Should I use the estate agent's recommended conveyancer?", a: "You do not have to. Agents often receive a referral fee, so compare quotes and check the firm's reviews." },
  { q: "How long does moving take?", a: "In England, often three to four months from offer to completion, longer in a chain or with leasehold property." },
];

export default async function MovingPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/stamp-duty-england", "/uk/property/first-time-buyer", "/uk/property/mortgage-affordability", "/uk/property/single-person-discount", "/uk/property/lbtt-scotland", "/uk/property/ltt-wales"].includes(c.href));
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

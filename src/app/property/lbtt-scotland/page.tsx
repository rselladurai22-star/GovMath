import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LandTaxStudio from "@/components/property/LandTaxStudio";
import { CALCULATORS } from "@/lib/calculators";
import LBTTGuide from "./LBTTGuide";

export const metadata: Metadata = {
  title: "LBTT Calculator (Scotland, 2026/27)",
  description:
    "Work out Land and Buildings Transaction Tax on a home in Scotland: band by band, first-time buyer relief, the 8% Additional Dwelling Supplement and how to reclaim it.",
  alternates: { canonical: "/property/lbtt-scotland" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/lbtt-scotland", label: "LBTT (Scotland)" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the LBTT rates for 2026/27?", a: "0% up to £145,000, 2% from £145,001 to £250,000, 5% to £325,000, 10% to £750,000 and 12% above. Each rate applies only to the part of the price in that band." },
  { q: "How much is first-time buyer relief in Scotland?", a: "The 0% band rises to £175,000, saving up to £600. Every buyer must be a first-time buyer, and there is no upper price limit." },
  { q: "How much is the Additional Dwelling Supplement?", a: "8% of the whole price for purchases of £40,000 or more, on top of normal LBTT, if you will own more than one home." },
  { q: "Can I get ADS back?", a: "Yes, if the new home replaces your main home and you sell the previous one within 36 months. Claim the refund from Revenue Scotland after the sale." },
  { q: "When do I pay LBTT?", a: "Your solicitor files the return and pays Revenue Scotland within 30 days of the date of entry, usually on settlement day." },
];

export default async function LBTTPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/stamp-duty-england", "/property/ltt-wales", "/property/mortgage-repayment", "/property/mortgage-affordability", "/property/moving-house-budget", "/tax-and-salary/scottish-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="LBTT Calculator (Scotland)"
      lead="Land and Buildings Transaction Tax on a home in Scotland, band by band, with first-time buyer relief and the 8% supplement."
      points={["2026/27 rates", "First-time buyer relief", "8% ADS and refunds", "Free and private"]}
      guide={<LBTTGuide />}
      faqs={FAQS}
      related={related}
      note="Residential purchases in Scotland. An estimate: your solicitor will confirm the figure on your LBTT return to Revenue Scotland."
    >
      <LandTaxStudio nation="scotland" query={query} />
    </FlagshipPage>
  );
}

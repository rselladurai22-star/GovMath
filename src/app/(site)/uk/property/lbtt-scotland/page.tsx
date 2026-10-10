import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LandTaxStudio from "@/components/property/LandTaxStudio";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import LBTTGuide from "./LBTTGuide";

export const metadata: Metadata = {
  title: "LBTT Calculator Scotland 2026/27",
  description:
    "Free LBTT calculator for Scotland in 2026/27. See Land and Buildings Transaction Tax band by band, first-time buyer relief and the 8% ADS on second homes.",
  alternates: { canonical: "/uk/property/lbtt-scotland" },
  openGraph: ogFor("/uk/property/lbtt-scotland"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/lbtt-scotland", label: "LBTT (Scotland)" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the LBTT rates for 2026/27?", a: "0% up to £145,000, 2% from £145,001 to £250,000, 5% to £325,000, 10% to £750,000 and 12% above. Each rate applies only to the part of the price in that band." },
  { q: "How much is first-time buyer relief in Scotland?", a: "The 0% band rises to £175,000, saving up to £600. Every buyer must be a first-time buyer, and there is no upper price limit." },
  { q: "How much is the Additional Dwelling Supplement?", a: "8% of the whole price for purchases of £40,000 or more, on top of normal LBTT, if you will own more than one home." },
  { q: "Can I get ADS back?", a: "Yes, if the new home replaces your main home and you sell the previous one within 36 months. Claim the refund from Revenue Scotland after the sale." },
  { q: "When do I pay LBTT?", a: "Your solicitor files the return and pays Revenue Scotland within 30 days of the date of entry, usually on settlement day." },
  { q: "Do I pay LBTT on a house under £145,000?", a: "No, unless it is an additional home. A home mover or first-time buyer pays nothing below £145,000, and a first-time buyer pays nothing up to £175,000." },
  { q: "Do I pay LBTT if I am buying in Scotland but live in England?", a: "Yes. LBTT depends on where the property is, not where you live. If you keep your English home, ADS applies as well." },
  { q: "Is there a surcharge for overseas buyers?", a: "No. Scotland has no equivalent of England's 2% surcharge for non-UK residents. ADS still applies if you own a home anywhere else." },
  { q: "Can I add LBTT to my mortgage?", a: "Not directly. You could borrow more and put down a smaller deposit, but lenders lend against the property value, so you still need the cash for the tax at settlement." },
  { q: "What happens if I buy before selling and the sale falls through?", a: "Nothing changes straight away, but you only get the ADS back if you sell the old home within 36 months of buying the new one. After that, the supplement is not refundable." },
  { q: "Do I pay LBTT if I am given a home?", a: "Not if no money changes hands. If you take over a mortgage on the home, the amount of debt you take on counts as the price." },
];

export default async function LBTTPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/stamp-duty-england", "/uk/property/ltt-wales", "/uk/property/mortgage-repayment", "/uk/property/mortgage-affordability", "/uk/property/moving-house-budget", "/uk/tax-and-salary/scottish-tax"].includes(c.href),
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

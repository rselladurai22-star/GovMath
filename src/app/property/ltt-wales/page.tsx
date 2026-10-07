import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import LandTaxStudio from "@/components/property/LandTaxStudio";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import LTTGuide from "./LTTGuide";

export const metadata: Metadata = {
  title: "LTT Calculator Wales 2026/27",
  description:
    "Free Land Transaction Tax calculator for Wales in 2026/27. See LTT band by band, the higher rates for second homes and how Wales compares with England.",
  alternates: { canonical: "/property/ltt-wales" },
  openGraph: ogFor("/property/ltt-wales"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/ltt-wales", label: "LTT (Wales)" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the LTT rates for 2026/27?", a: "Main rates: 0% up to £225,000, 6% to £400,000, 7.5% to £750,000, 10% to £1.5 million and 12% above. Each rate applies only to the part of the price in that band." },
  { q: "Is there first-time buyer relief in Wales?", a: "No. Everyone buying an only or main home gets the £225,000 0% band instead." },
  { q: "What are the higher rates for second homes?", a: "5% up to £180,000, 8.5% to £250,000, 10% to £400,000, 12.5% to £750,000, 15% to £1.5 million and 17% above. They do not apply to homes bought for under £40,000." },
  { q: "Can I get the higher rates back?", a: "Yes, if the new home replaces your main home and you sell your previous main home within 3 years. Claim the difference from the Welsh Revenue Authority." },
  { q: "When do I pay LTT?", a: "Your solicitor files the return and pays the Welsh Revenue Authority within 30 days of completion." },
  { q: "Do I pay LTT on a home under £225,000?", a: "No, unless the higher rates apply because you will own another home." },
  { q: "I live in England and am buying a holiday cottage in Wales. What do I pay?", a: "LTT at the higher rates, because you will own two homes. LTT depends on where the property is, not where you live." },
  { q: "Does Wales charge non-UK residents more?", a: "No. Wales has no non-resident surcharge, though the higher rates still apply if you own a home anywhere else." },
  { q: "Can I pay LTT in instalments?", a: "Not normally. It is due in full within 30 days of completion." },
  { q: "Do I pay LTT on a home I inherit?", a: "No. Inheriting is not a purchase. But owning an inherited home can make a later purchase subject to the higher rates." },
];

export default async function LTTPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/stamp-duty-england", "/property/lbtt-scotland", "/property/mortgage-repayment", "/property/mortgage-affordability", "/property/buy-to-let-yield", "/property/moving-house-budget"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="LTT Calculator (Wales)"
      lead="Land Transaction Tax on a home in Wales, band by band, including the higher rates for second homes and how to claim them back."
      points={["2026/27 rates", "£225,000 0% band", "Higher rates and refunds", "Free and private"]}
      guide={<LTTGuide />}
      faqs={FAQS}
      related={related}
      note="Residential purchases in Wales. An estimate: your solicitor will confirm the figure on your LTT return to the Welsh Revenue Authority."
    >
      <LandTaxStudio nation="wales" query={query} />
    </FlagshipPage>
  );
}

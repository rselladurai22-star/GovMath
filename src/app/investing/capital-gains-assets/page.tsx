import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CgtStudio from "./CgtStudio";
import { ogFor } from "@/gm/og";
import CgtGuide from "./CgtGuide";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator UK 2026/27",
  description:
    "Free Capital Gains Tax calculator for 2026/27. Work out CGT on shares, funds, crypto or a business with the £3,000 allowance, 18% and 24% rates and losses.",
  alternates: { canonical: "/investing/capital-gains-assets" },
  openGraph: ogFor("/investing/capital-gains-assets"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/capital-gains-assets", label: "Capital Gains Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Capital Gains Tax allowance for 2026/27?", a: "£3,000. Gains above that are taxed at 18% within your basic-rate band and 24% above it." },
  { q: "What is the Capital Gains Tax rate on shares?", a: "18% for gains within your unused basic-rate band and 24% above it, the same as for property." },
  { q: "What is the Business Asset Disposal Relief rate?", a: "18% from 6 April 2026, on up to £1 million of qualifying gains in a lifetime." },
  { q: "When do I pay Capital Gains Tax?", a: "Within 60 days for UK residential property. Otherwise by 31 January after the end of the tax year." },
  { q: "Do I pay Capital Gains Tax on my home?", a: "Not usually, if it has been your main home throughout and the garden is under half a hectare." },
  { q: "Do I pay Capital Gains Tax on gifts to my children?", a: "Yes. A gift is treated as a sale at market value, so tax may be due even though you receive nothing." },
  { q: "Can I carry forward the £3,000 allowance?", a: "No. It is lost if not used in the tax year." },
  { q: "Is Capital Gains Tax charged on death?", a: "No. Heirs inherit at the market value on the date of death, though Inheritance Tax may apply." },
  { q: "Do I pay Capital Gains Tax on investment funds in an ISA?", a: "No. Gains inside an ISA are tax-free and do not need to be reported." },
  { q: "Is there Capital Gains Tax on selling a car?", a: "No. Private cars are exempt, even classic cars that rise in value." },
  { q: "What if I sell at a loss?", a: "Report the loss to HMRC within four years. It can then be set against future gains, so it is worth claiming even if you have no gains this year." },
  { q: "Does Capital Gains Tax push me into a higher income tax band?", a: "No. Gains do not change your income tax, although your income decides whether a gain is taxed at 18% or 24%." },
];

export default async function CgtPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/isa-vs-gia", "/investing/dividend-tax", "/property/property-capital-gains", "/life/inheritance-tax", "/investing/pension-tax-relief"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Capital Gains Tax Calculator"
      lead="Work out the Capital Gains Tax on selling shares, funds, property, crypto or a business, and see how to pay less."
      points={["18% and 24% rates", "Losses and reliefs", "Ways to pay less", "Free and private"]}
      guide={<CgtGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rules. Not tax advice."
    >
      <CgtStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CgtStudio from "./CgtStudio";
import CgtGuide from "./CgtGuide";

export const metadata: Metadata = {
  title: "Capital Gains Tax Calculator UK (2026/27)",
  description:
    "Work out Capital Gains Tax on shares, funds, property, crypto or a business in 2026/27: the £3,000 exempt amount, 18% and 24% rates, losses, Business Asset Disposal Relief, and ways to pay less.",
  alternates: { canonical: "/investing/capital-gains-assets" },
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

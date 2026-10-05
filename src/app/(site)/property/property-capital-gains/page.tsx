import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PropertyCGTStudio from "./PropertyCGTStudio";
import PropertyCGTGuide from "./PropertyCGTGuide";

export const metadata: Metadata = {
  title: "Capital Gains Tax on Property Calculator (2026/27)",
  description:
    "Work out Capital Gains Tax on selling a buy-to-let, second home or former home: 18% and 24% rates, the £3,000 allowance, Private Residence Relief, joint owners and the 60-day deadline.",
  alternates: { canonical: "/property/property-capital-gains" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/property-capital-gains", label: "Property Capital Gains Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the CGT rate on property?", a: "18% on the part of the gain within your unused basic-rate band and 24% above it, after the £3,000 annual exempt amount." },
  { q: "Do I pay CGT on my home?", a: "Not if it was your only or main home throughout. Private Residence Relief covers the time you lived there plus the last 9 months." },
  { q: "When do I have to pay CGT on property?", a: "Report and pay within 60 days of completion using HMRC's UK property account." },
  { q: "What costs can I deduct?", a: "Buying and selling costs such as Stamp Duty, legal and estate agent fees, and the cost of improvements. Not repairs or mortgage interest." },
  { q: "Do joint owners each get an allowance?", a: "Yes. Each pays CGT on their share of the gain, with their own £3,000 exempt amount and basic-rate band." },
];

export default async function PropertyCGTPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/capital-gains-assets", "/property/buy-to-let-yield", "/property/rent-a-room", "/life/inheritance-tax", "/tax-and-salary/tax-bracket-checker", "/investing/pension-tax-relief"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Property Capital Gains Tax Calculator"
      lead="The CGT on selling a property, with Private Residence Relief, joint ownership and your 60-day deadline."
      points={["18% and 24% rates", "Private Residence Relief", "60-day deadline", "Free and private"]}
      guide={<PropertyCGTGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rules for UK residents. Assumes you lived in the property before letting it. Not tax advice: an accountant can check complex cases."
    >
      <PropertyCGTStudio query={query} />
    </FlagshipPage>
  );
}

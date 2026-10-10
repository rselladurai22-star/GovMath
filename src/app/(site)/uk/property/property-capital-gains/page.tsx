import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PropertyCGTStudio from "./PropertyCGTStudio";
import { ogFor } from "@/gm/og";
import PropertyCGTGuide from "./PropertyCGTGuide";

export const metadata: Metadata = {
  title: "Capital Gains Tax on Property Calculator",
  description:
    "Free CGT on property calculator for 2026/27. Work out the tax on selling a second home or buy-to-let at 18% or 24%, with reliefs and the 60-day deadline.",
  alternates: { canonical: "/uk/property/property-capital-gains" },
  openGraph: ogFor("/uk/property/property-capital-gains"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/property-capital-gains", label: "Property Capital Gains Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the CGT rate on property?", a: "18% on the part of the gain within your unused basic-rate band and 24% above it, after the £3,000 annual exempt amount." },
  { q: "Do I pay CGT on my home?", a: "Not if it was your only or main home throughout. Private Residence Relief covers the time you lived there plus the last 9 months." },
  { q: "When do I have to pay CGT on property?", a: "Report and pay within 60 days of completion using HMRC's UK property account." },
  { q: "What costs can I deduct?", a: "Buying and selling costs such as Stamp Duty, legal and estate agent fees, and the cost of improvements. Not repairs or mortgage interest." },
  { q: "Do joint owners each get an allowance?", a: "Yes. Each pays CGT on their share of the gain, with their own £3,000 exempt amount and basic-rate band." },
  { q: "Do I pay CGT when I sell my home?", a: "Not if it was your only or main home throughout and the garden is under half a hectare. Private Residence Relief covers it." },
  { q: "Is CGT due at exchange or completion?", a: "For tax, the disposal happens at exchange, which sets the tax year. The 60-day reporting deadline runs from completion." },
  { q: "Can I deduct mortgage interest from the gain?", a: "No. Interest is a cost of financing, not of buying or improving the property." },
  { q: "I own two homes. Which one gets relief?", a: "The one that is your main residence in practice. You can nominate which one counts by telling HMRC within two years of having a second home." },
  { q: "Does the 60-day rule apply to shares or other assets?", a: "No, only to UK residential property. Other gains are reported through Self Assessment." },
  { q: "Can I pay CGT in instalments?", a: "Not usually. It is due within 60 days, though you can ask HMRC for time to pay if you cannot afford it." },
  { q: "What exchange rate do I use for property abroad?", a: "UK residents pay UK CGT on property abroad too. Convert the purchase and sale prices into pounds at the rates on those dates." },
  { q: "Do I pay CGT if I sell at a loss?", a: "No. Report the loss to HMRC so you can set it against future gains." },
];

export default async function PropertyCGTPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/investing/capital-gains-assets", "/uk/property/buy-to-let-yield", "/uk/property/rent-a-room", "/uk/life/inheritance-tax", "/uk/tax-and-salary/tax-bracket-checker", "/uk/investing/pension-tax-relief"].includes(c.href));
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

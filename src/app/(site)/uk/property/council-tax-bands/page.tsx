import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CouncilTaxStudio from "./CouncilTaxStudio";
import { ogFor } from "@/gm/og";
import CouncilTaxGuide from "./CouncilTaxGuide";

export const metadata: Metadata = {
  title: "Council Tax Calculator 2026/27: Bill by Band",
  description:
    "Free council tax calculator for 2026/27. See the yearly and monthly bill for every band in England, Wales and Scotland, with discounts and premiums.",
  alternates: { canonical: "/uk/property/council-tax-bands" },
  openGraph: ogFor("/uk/property/council-tax-bands"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/council-tax-bands", label: "Council Tax Bands" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is council tax worked out?", a: "Each home is in a band based on its value on a fixed date (1991 in England and Scotland, 2003 in Wales). Your council sets a Band D charge and each band pays a fixed fraction of it, from 6/9 for Band A to 18/9 for Band H in England." },
  { q: "What is the average council tax for 2026/27?", a: "The average Band D charge is about £2,392 in England, £2,283 in Wales and £1,662 in Scotland. Your council's charge may be higher or lower." },
  { q: "Who gets a council tax discount?", a: "If only one adult counts you get 25% off; if no adults count, 50% off. Students, apprentices, carers and some others are not counted." },
  { q: "Can I pay council tax over 12 months?", a: "Yes. Bills are normally split into 10 monthly instalments, but you can ask your council for 12." },
  { q: "How do I challenge my council tax band?", a: "Ask the Valuation Office Agency (England and Wales) or your local assessor (Scotland) to review it. A review can move the band up as well as down." },
  { q: "Do tenants pay council tax?", a: "Usually, yes. In a house in multiple occupation, the landlord is usually responsible instead." },
  { q: "Will my band change if I extend my home?", a: "Not straight away. The band is only reviewed when the home is sold. If the extension would have put it in a higher band, the new owner may be rebanded." },
  { q: "Do students pay council tax?", a: "A home where everyone is a full-time student is exempt. A student living with others is disregarded." },
  { q: "Can I pay council tax weekly?", a: "Some councils allow it. Ask yours." },
  { q: "Why is my bill different from my neighbour's in the same band?", a: "Discounts, reductions and premiums all change the amount. The starting charge for the same band in the same area is the same." },
  { q: "Is council tax charged for the whole year if I move in March?", a: "No. It is charged by the day, so you only pay for the days you live there." },
  { q: "Do I pay council tax on a home I am renovating and not living in?", a: "Usually yes, though some councils give a discount for homes needing major repair work. Ask yours." },
];

export default async function CouncilTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/single-person-discount", "/uk/property/moving-house-budget", "/uk/property/rent-vs-buy", "/uk/benefits/universal-credit", "/uk/students/student-council-tax", "/uk/benefits/council-tax-reduction"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Council Tax Band Calculator"
      lead="Your yearly and monthly council tax for any band, with discounts, reductions and premiums."
      points={["England, Wales and Scotland", "Discounts and reductions", "Monthly instalments", "Free and private"]}
      guide={<CouncilTaxGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27. National average Band D charges are a guide: enter your council's own charge for an exact figure."
    >
      <CouncilTaxStudio query={query} />
    </FlagshipPage>
  );
}

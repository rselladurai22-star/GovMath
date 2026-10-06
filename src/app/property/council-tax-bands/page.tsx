import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CouncilTaxStudio from "./CouncilTaxStudio";
import CouncilTaxGuide from "./CouncilTaxGuide";

export const metadata: Metadata = {
  title: "Council Tax Calculator by Band (2026/27)",
  description:
    "Work out council tax for any band in England, Wales or Scotland: national averages or your council's Band D charge, the single person discount, disability reduction, second home premiums and monthly instalments.",
  alternates: { canonical: "/property/council-tax-bands" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/council-tax-bands", label: "Council Tax Bands" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is council tax worked out?", a: "Each home is in a band based on its value on a fixed date (1991 in England and Scotland, 2003 in Wales). Your council sets a Band D charge and each band pays a fixed fraction of it, from 6/9 for Band A to 18/9 for Band H in England." },
  { q: "What is the average council tax for 2026/27?", a: "The average Band D charge is about £2,392 in England, £2,283 in Wales and £1,662 in Scotland. Your council's charge may be higher or lower." },
  { q: "Who gets a council tax discount?", a: "If only one adult counts you get 25% off; if no adults count, 50% off. Students, apprentices, carers and some others are not counted." },
  { q: "Can I pay council tax over 12 months?", a: "Yes. Bills are normally split into 10 monthly instalments, but you can ask your council for 12." },
  { q: "How do I challenge my council tax band?", a: "Ask the Valuation Office Agency (England and Wales) or your local assessor (Scotland) to review it. A review can move the band up as well as down." },
];

export default async function CouncilTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/single-person-discount", "/property/moving-house-budget", "/property/rent-vs-buy", "/benefits/universal-credit", "/students/student-council-tax", "/benefits/council-tax-reduction"].includes(c.href));
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

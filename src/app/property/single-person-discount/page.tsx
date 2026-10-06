import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SPDStudio from "./SPDStudio";
import SPDGuide from "./SPDGuide";

export const metadata: Metadata = {
  title: "Single Person Council Tax Discount Calculator: 25% Off (2026/27)",
  description:
    "Check if you qualify for the 25% single person discount on council tax, how much you save a year and a month, and how it works if you live alone for only part of the year.",
  alternates: { canonical: "/property/single-person-discount" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/single-person-discount", label: "Single Person Discount" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Who gets the single person discount?", a: "Anyone 18 or over who lives alone, or whose other adult household members are all disregarded, such as full-time students or children." },
  { q: "How much is the single person discount?", a: "25% off your council tax bill. On a £2,392 bill that is £598 a year." },
  { q: "Is the single person discount the same as Council Tax Reduction?", a: "No. The single person discount is 25% off for anyone who lives alone, whatever their income. Council Tax Reduction (also called Council Tax Support) is a separate, means-tested scheme run by each council for people on a low income or benefits. You can get both: the reduction is worked out on the bill after the discount." },
  { q: "Can the discount be backdated?", a: "Most councils backdate it to when you became eligible, if you can show the date." },
  { q: "What if someone moves in?", a: "Tell your council. In England you should do so within 21 days, and a penalty can apply if you do not." },
  { q: "Does a lodger stop the discount?", a: "Yes, if your home is their main home." },
];

export default async function SPDPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/council-tax-bands", "/benefits/council-tax-reduction", "/benefits/universal-credit", "/students/student-council-tax", "/property/moving-house-budget", "/benefits/pension-credit"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Single Person Discount Calculator"
      lead="See whether you qualify for 25% off your council tax and how much it saves you."
      points={["25% off your bill", "Who isn't counted", "Part-year discounts", "Free and private"]}
      guide={<SPDGuide />}
      faqs={FAQS}
      related={related}
      note="The 25% discount applies in England, Scotland and Wales. Your council confirms eligibility and the amount."
    >
      <SPDStudio query={query} />
    </FlagshipPage>
  );
}

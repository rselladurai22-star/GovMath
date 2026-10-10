import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import SPDStudio from "./SPDStudio";
import { ogFor } from "@/gm/og";
import SPDGuide from "./SPDGuide";

export const metadata: Metadata = {
  title: "Single Person Council Tax Discount: 25% Off",
  description:
    "Free single person council tax calculator. Living alone takes 25% off your bill: see what you save a year and a month, including for part of a year.",
  alternates: { canonical: "/uk/property/single-person-discount" },
  openGraph: ogFor("/uk/property/single-person-discount"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/single-person-discount", label: "Single Person Discount" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Who gets the single person discount?", a: "Anyone 18 or over who lives alone, or whose other adult household members are all disregarded, such as full-time students or children." },
  { q: "How much is the single person discount?", a: "25% off your council tax bill. On a £2,392 bill that is £598 a year." },
  { q: "Is the single person discount the same as Council Tax Reduction?", a: "No. The single person discount is 25% off for anyone who lives alone, whatever their income. Council Tax Reduction (also called Council Tax Support) is a separate, means-tested scheme run by each council for people on a low income or benefits. You can get both: the reduction is worked out on the bill after the discount." },
  { q: "Can the discount be backdated?", a: "Most councils backdate it to when you became eligible, if you can show the date." },
  { q: "What if someone moves in?", a: "Tell your council. In England you should do so within 21 days, and a penalty can apply if you do not." },
  { q: "Does a lodger stop the discount?", a: "Yes, if your home is their main home." },
  { q: "Can I get the discount if my partner works away?", a: "Usually not. If your home is still their main home, they still count." },
  { q: "My adult child lives with me. Do I lose the discount?", a: "Yes, if they are 18 or over and not disregarded, for example once Child Benefit stops or they leave full-time education." },
  { q: "Can I get it on a second home?", a: "No. Discounts depend on who lives in a home as their main residence. A second home has no one counted there and may pay a premium instead." },
  { q: "Is the discount the same in Scotland and Wales?", a: "Yes, it is 25% in all three nations. Northern Ireland has domestic rates instead of council tax, with its own reliefs." },
  { q: "Is the discount taken into account for Council Tax Reduction?", a: "Yes. Council Tax Reduction is worked out on your bill after the discount, so you can receive both." },
  { q: "Do I need to reapply each year?", a: "Usually not. The discount continues until your circumstances change, though councils may ask you to confirm periodically." },
];

export default async function SPDPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/council-tax-bands", "/uk/benefits/council-tax-reduction", "/uk/benefits/universal-credit", "/uk/students/student-council-tax", "/uk/property/moving-house-budget", "/uk/benefits/pension-credit"].includes(c.href));
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

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CtrStudio from "./CtrStudio";
import { ogFor } from "@/gm/og";
import CtrGuide from "./CtrGuide";

export const metadata: Metadata = {
  title: "Council Tax Reduction Calculator 2026/27",
  description:
    "Free Council Tax Reduction (Council Tax Support) calculator for 2026/27. Estimate your discount from income, savings, household and non-dependants.",
  alternates: { canonical: "/benefits/council-tax-reduction" },
  openGraph: ogFor("/benefits/council-tax-reduction"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/council-tax-reduction", label: "Council Tax Reduction" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is Council Tax Reduction?", a: "Help from your council with your council tax bill if you are on a low income or benefits. Some councils call it Council Tax Support. It can pay up to all of your bill." },
  { q: "Is Council Tax Reduction the same as the single person discount?", a: "No. The single person discount is 25% off for anyone who lives alone, whatever their income. Council Tax Reduction is means-tested. You can get both: the reduction is worked out on the bill after the discount." },
  { q: "How much Council Tax Reduction will I get as a pensioner?", a: "Up to 100% of your bill. If your income is above your applicable amount (£238 a week for a single pensioner in 2026/27), the reduction falls by 20p for each extra £1." },
  { q: "Can I get Council Tax Reduction if I work?", a: "Yes. Your earnings are counted after tax and NI, with a small amount ignored. Many working people on low pay or Universal Credit get some help." },
  { q: "How much savings can I have?", a: "Up to £16,000 in most schemes, unless you get Pension Credit Guarantee Credit. Some English councils set a lower limit for working-age people." },
  { q: "Can I get Council Tax Reduction on Universal Credit?", a: "Yes, but you must claim it from your council separately. It is not part of Universal Credit." },
  { q: "Does Council Tax Reduction affect other benefits?", a: "No. It is not counted as income for Universal Credit, Pension Credit or Housing Benefit." },
  { q: "I own my home. Can I still claim?", a: "Yes. Unlike Housing Benefit, Council Tax Reduction is for owners as well as tenants." },
  { q: "Can a couple claim if only one of us is a pensioner?", a: "Mixed-age couples usually count as working age if they claim Universal Credit, so the council's working-age scheme applies." },
  { q: "Why is my reduction less than my neighbour's?", a: "Income, savings, other adults at home and your council tax band all change the amount, as do the rules of each council." },
];

export default async function CouncilTaxReductionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/single-person-discount", "/property/council-tax-bands", "/benefits/housing-benefit", "/benefits/pension-credit", "/benefits/universal-credit", "/students/student-council-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Council Tax Reduction Calculator"
      lead="See how much help with your council tax bill you could get, whether you are a pensioner or working age, in England, Wales or Scotland."
      points={["Pensioner and working-age rules", "England, Wales and Scotland", "Other adults at home", "Free and private"]}
      guide={<CtrGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate. Working-age schemes in England are set by each council."
    >
      <CtrStudio query={query} />
    </FlagshipPage>
  );
}

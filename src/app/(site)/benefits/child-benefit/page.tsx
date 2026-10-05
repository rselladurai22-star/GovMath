import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ChildBenefitStudio from "./ChildBenefitStudio";
import ChildBenefitGuide from "./ChildBenefitGuide";

export const metadata: Metadata = {
  title: "Child Benefit Calculator (2026/27 Rates)",
  description:
    "Work out your Child Benefit for 2026/27: £27.05 a week for the eldest child and £17.90 for each other child, with part-year claims and the High Income Child Benefit Charge.",
  alternates: { canonical: "/benefits/child-benefit" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/child-benefit", label: "Child Benefit" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Child Benefit in 2026/27?", a: "£27.05 a week for the eldest or only child and £17.90 a week for each other child, paid every four weeks." },
  { q: "Is there a limit on how many children I can claim for?", a: "No. Every child after the eldest gets £17.90 a week." },
  { q: "Who can claim Child Benefit?", a: "Anyone responsible for a child under 16, or under 20 in approved education or training, who meets the residence rules. Only one person can claim for each child." },
  { q: "How far back can Child Benefit be backdated?", a: "Three months from the date of the claim, so claim soon after a birth." },
  { q: "Does high income affect Child Benefit?", a: "If either parent's adjusted net income is over £60,000, the higher earner repays 1% for every £200 above it, and all of it at £80,000." },
];

export default async function ChildBenefitPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/high-income-child-benefit", "/benefits/free-childcare-hours", "/benefits/tax-free-childcare", "/benefits/universal-credit", "/benefits/maternity-pay", "/benefits/benefit-cap"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Child Benefit Calculator"
      lead="See how much Child Benefit you get for your family, when it is paid, and whether the high income charge takes any back."
      points={["Every child counts", "Part-year claims", "High income check", "Free and private"]}
      guide={<ChildBenefitGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 Child Benefit rates. Not financial advice."
    >
      <ChildBenefitStudio query={query} />
    </FlagshipPage>
  );
}

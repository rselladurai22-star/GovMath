import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PensionReliefStudio from "./PensionReliefStudio";
import PensionReliefGuide from "./PensionReliefGuide";

export const metadata: Metadata = {
  title: "Pension Tax Relief Calculator (2026/27)",
  description:
    "Work out what a pension contribution really costs after tax relief in 2026/27, by relief at source, net pay or salary sacrifice, including the £100,000 trap, Child Benefit and the annual allowance.",
  alternates: { canonical: "/investing/pension-tax-relief" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/pension-tax-relief", label: "Pension Tax Relief" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much tax relief do I get on pension contributions?", a: "At your highest rate of Income Tax: 20%, 40% or 45% (19% to 48% in Scotland). £1,000 costs a basic-rate taxpayer £800 and a higher-rate taxpayer £600." },
  { q: "How do I claim higher-rate pension tax relief?", a: "If your scheme uses relief at source, claim the extra through Self Assessment or by asking HMRC to change your tax code. Net pay and salary sacrifice give it automatically." },
  { q: "What is the pension annual allowance for 2026/27?", a: "£60,000, tapering to £10,000 for the highest earners." },
  { q: "Why is pension relief 60% at £100,000?", a: "Between £100,000 and £125,140 you lose Personal Allowance, so pension contributions that bring income down restore it, giving effective relief of 60%." },
];

export default async function PensionReliefPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/workplace-pension", "/investing/isa-vs-gia", "/benefits/high-income-child-benefit", "/tax-and-salary/salary-calculator", "/investing/fire-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Pension Tax Relief Calculator"
      lead="Find out what a pension contribution really costs you after tax relief, National Insurance savings and the effect on Child Benefit."
      points={["All three methods", "60% relief trap", "Annual allowance", "Free and private"]}
      guide={<PensionReliefGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rules. Not financial advice."
    >
      <PensionReliefStudio query={query} />
    </FlagshipPage>
  );
}

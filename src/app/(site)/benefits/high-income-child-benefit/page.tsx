import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HicbcStudio from "./HicbcStudio";
import HicbcGuide from "./HicbcGuide";

export const metadata: Metadata = {
  title: "High Income Child Benefit Charge Calculator (2026/27)",
  description:
    "Work out the High Income Child Benefit Charge between £60,000 and £80,000, including pension contributions, Gift Aid, your partner's income and the hidden marginal tax rate.",
  alternates: { canonical: "/benefits/high-income-child-benefit" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/high-income-child-benefit", label: "High Income Child Benefit Charge" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When does the High Income Child Benefit Charge start?", a: "When either partner's adjusted net income is over £60,000. It takes back 1% of the Child Benefit for every £200 above that, and all of it at £80,000." },
  { q: "Who pays the charge?", a: "The partner with the higher adjusted net income, whoever receives the Child Benefit." },
  { q: "How can I reduce the charge?", a: "Pension contributions, Gift Aid and salary sacrifice all reduce adjusted net income, which reduces or removes the charge." },
  { q: "Is it based on household income?", a: "No. Only the higher individual income counts, so two earners on £55,000 each pay nothing." },
  { q: "Should I stop claiming Child Benefit?", a: "If you would repay it all, stop the payments but keep the claim, so the parent at home keeps National Insurance credits." },
];

export default async function HicbcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/child-benefit", "/investing/pension-tax-relief", "/tax-and-salary/salary-calculator", "/tax-and-salary/bonus-tax", "/benefits/tax-free-childcare", "/benefits/free-childcare-hours"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="High Income Child Benefit Charge Calculator"
      lead="See how much Child Benefit is taken back if you earn over £60,000, and how a pension contribution could reduce it."
      points={["£60,000 to £80,000", "Pension and Gift Aid", "Partner's income", "Free and private"]}
      guide={<HicbcGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rules. Not tax advice."
    >
      <HicbcStudio query={query} />
    </FlagshipPage>
  );
}

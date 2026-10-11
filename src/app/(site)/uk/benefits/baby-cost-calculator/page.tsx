import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BabyCostStudio from "./BabyCostStudio";
import BabyCostGuide from "./BabyCostGuide";

export const metadata: Metadata = {
  title: "Cost of a Baby Calculator UK 2026/27",
  description:
    "Free cost of a baby calculator for 2026/27. Add up first-year and to-age-5 costs, childcare and lost pay on leave, less Child Benefit, grants and other help.",
  alternates: { canonical: "/uk/benefits/baby-cost-calculator" },
  openGraph: ogFor("/uk/benefits/baby-cost-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Family & Benefits" },
  { href: "/uk/benefits/baby-cost-calculator", label: "Cost of a Baby Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does a baby cost in the first year?", a: "It depends on your choices. With the calculator's mid-range example prices, formula and disposable nappies, spending is about £3,050 in year one before help, and about £1,643 after Child Benefit. The drop in pay during leave is often bigger." },
  { q: "Are the prices in the calculator averages?", a: "No. They are example prices to start from. Change them to the prices you see. Benefit and statutory pay figures use official 2026/27 rates." },
  { q: "What is the biggest cost of having a baby?", a: "Usually childcare once a parent goes back to work, and the drop in pay while on leave. In the example, 30 hours a week of childcare costs £10,800 a year before funded hours." },
  { q: "How much is Child Benefit for a new baby?", a: "£27.05 a week for an eldest child, or £17.90 a week for each other child, in 2026/27. That is £1,407 or £931 a year." },
  { q: "How much maternity pay will I get?", a: "Statutory Maternity Pay is 90% of your average weekly earnings for 6 weeks, then £194.32 a week (or 90% if lower) for 33 weeks. Your employer may pay more." },
  { q: "What help is there for low-income families?", a: "The £500 Sure Start Maternity Grant (Best Start Grant in Scotland), Healthy Start, Child Benefit, and more Universal Credit. On Universal Credit you can also get back up to 85% of childcare costs." },
  { q: "When do funded childcare hours start?", a: "In England, working parents can get 30 funded hours a week from when their child is 9 months old, for 38 weeks a year. You can apply from when the baby is 23 weeks old." },
  { q: "Does the calculator include Universal Credit?", a: "No. It includes the maternity grants and Healthy Start, but not the Universal Credit child element. Use the Universal Credit estimator for that." },
  { q: "Is breastfeeding really cheaper?", a: "It saves the formula cost: £600 in year one at the example £50 a month. You may still buy a pump, pads or nursing bras." },
  { q: "Are reusable nappies cheaper than disposables?", a: "With the example prices, yes: £600 to age two and a half including a £300 kit, against £1,050 for disposables. Your own prices and washing costs decide it." },
  { q: "Should I claim Child Benefit if I earn over £60,000?", a: "Usually yes. You can choose not to be paid to avoid the charge, but claiming protects National Insurance credits for a parent at home." },
  { q: "Does it work for Scotland, Wales and Northern Ireland?", a: "Yes for Child Benefit, statutory pay, Tax-Free Childcare and the grants (Scotland's Best Start Grant included). Funded childcare hours follow England's scheme only." },
];

export default async function BabyCostPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/benefits/maternity-pay", "/uk/benefits/childcare-costs", "/uk/benefits/child-benefit", "/uk/benefits/sure-start-maternity-grant", "/uk/benefits/free-childcare-hours", "/everyday/pregnancy-due-date"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="Cost of a Baby Calculator"
      lead="Add up what a baby costs in the first year and to age 5, including childcare and the drop in pay during leave, and the help you can get back."
      points={["Year one and to age 5", "Childcare and funded hours", "Maternity and paternity pay", "Free and private"]}
      guide={<BabyCostGuide />}
      faqs={FAQS}
      related={related}
      note="Benefit and statutory pay use 2026/27 rates; spending figures are examples you can change. An estimate, not financial advice."
    >
      <BabyCostStudio query={query} />
    </FlagshipPage>
  );
}

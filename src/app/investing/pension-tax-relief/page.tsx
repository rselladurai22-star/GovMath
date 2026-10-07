import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PensionReliefStudio from "./PensionReliefStudio";
import { ogFor } from "@/gm/og";
import PensionReliefGuide from "./PensionReliefGuide";

export const metadata: Metadata = {
  title: "Pension Tax Relief Calculator UK 2026/27",
  description:
    "Free pension tax relief calculator for 2026/27. See relief at 20%, 40% or 45% by relief at source, net pay or salary sacrifice, and the annual allowance.",
  alternates: { canonical: "/investing/pension-tax-relief" },
  openGraph: ogFor("/investing/pension-tax-relief"),
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
  { q: "Do I get tax relief on employer contributions?", a: "Employer contributions are not taxed as your income, which has the same effect. They count towards your annual allowance." },
  { q: "How do I know which method my scheme uses?", a: "Check your payslip: net pay contributions reduce taxable pay; relief at source contributions are taken after tax." },
  { q: "Can I get relief on contributions above my salary?", a: "Not on personal contributions. Relief is limited to 100% of earnings, or £3,600 gross if higher." },
  { q: "Is it better to pay off my mortgage or pay into a pension?", a: "For higher-rate taxpayers, the 40% relief usually beats the mortgage interest saved, but pensions are locked until at least 55." },
  { q: "Does pension tax relief affect my tax code?", a: "It can. HMRC may raise your tax code to give higher-rate relief through your pay, rather than waiting for a tax return." },
  { q: "Can I get relief if I am over 75?", a: "No. Contributions after 75 do not get tax relief." },
  { q: "Is salary sacrifice always better?", a: "It saves the most, but it lowers your contractual salary, which can affect borrowing, some benefits and pay-linked perks. For most people the saving is worth it." },
  { q: "What if I pay too much in?", a: "Contributions over the annual allowance are taxed back at your marginal rate unless carry forward covers them. If the charge is over £2,000, you can usually ask your scheme to pay it from your pension." },
  { q: "Do pension contributions reduce student loan repayments?", a: "Net pay and salary sacrifice contributions reduce the earnings used for student loan repayments. Relief at source contributions do not." },
  { q: "Can I backdate a claim for higher-rate relief?", a: "Yes. You can claim for the current tax year and the four before it, by tax return or by writing to HMRC." },
  { q: "Do I get tax relief on a pension for my child?", a: "Yes. Up to £3,600 gross a year gets 20% relief added, even though the child has no earnings." },
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

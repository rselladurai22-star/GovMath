import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BonusStudio from "./BonusStudio";
import { ogFor } from "@/gm/og";
import BonusGuide from "./BonusGuide";

export const metadata: Metadata = {
  title: "Bonus Tax Calculator UK 2026/27",
  description:
    "Free bonus tax calculator for 2026/27. See exactly how much of your bonus you keep after Income Tax, NI, student loan and pension, and the 60% trap.",
  alternates: { canonical: "/uk/tax-and-salary/bonus-tax" },
  openGraph: ogFor("/uk/tax-and-salary/bonus-tax"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: "/uk/tax-and-salary/bonus-tax", label: "Bonus Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much tax will I pay on my bonus?", a: "A bonus is taxed as earnings at your top rate: 20% for most people, 40% above £50,270 (or £43,663 in Scotland) and an effective 60% between £100,000 and £125,140. National Insurance is worked out on the month it is paid, so much of a bonus is often charged at 2% rather than 8%." },
  { q: "Why was so much tax taken from my bonus?", a: "PAYE collects all the extra tax your bonus causes in the month it is paid, so the bonus payslip looks heavy. Over the year you pay the right amount. If you are on an emergency tax code, you may genuinely overpay, and HMRC refunds it." },
  { q: "Is it better to put my bonus in my pension?", a: "Paying a bonus into your pension by salary sacrifice avoids Income Tax, National Insurance and student loan on it. It is especially valuable above £50,270 and in the £100,000 to £125,140 band. The trade-off is that the money is locked away until at least 55 (57 from 2028)." },
  { q: "Does a bonus affect my student loan?", a: "Yes. Student loan repayments are worked out on each payment, so a bonus month usually includes a repayment of 9% of the pay above the monthly threshold (6% for Postgraduate Loans), even if you do not normally repay." },
  { q: "Will a bonus affect my Child Benefit?", a: "It can. If the bonus takes your adjusted net income above £60,000, the High Income Child Benefit Charge starts to claw back Child Benefit, all of it by £80,000. Paying part of the bonus into a pension can avoid this." },
];

export default async function BonusPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/tax-and-salary/salary-calculator", "/uk/tax-and-salary/tax-bracket-checker", "/uk/tax-and-salary/emergency-tax", "/uk/investing/pension-tax-relief", "/uk/benefits/high-income-child-benefit", "/uk/tax-and-salary/overtime"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Bonus Tax Calculator"
      lead="See what your bonus is really worth after tax, with your bonus-month payslip and the pension option."
      points={["2026/27 HMRC rates", "Real payslip rules", "Scotland and student loans", "Free and private"]}
      guide={<BonusGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for the 2026/27 tax year, assuming a cumulative tax code and evenly paid salary. SumAtlas is not affiliated with HMRC. Check your payslip and personal circumstances."
    >
      <BonusStudio query={query} />
    </FlagshipPage>
  );
}

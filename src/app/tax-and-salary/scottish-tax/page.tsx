import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ScottishStudio from "./ScottishStudio";
import ScottishGuide from "./ScottishGuide";

export const metadata: Metadata = {
  title: "Scottish Income Tax Calculator (2026/27)",
  description:
    "Work out your Scottish Income Tax and take-home pay for 2026/27 across all six bands, and compare it with the rest of the UK. Includes Plan 4 student loans and pensions.",
  alternates: { canonical: "/tax-and-salary/scottish-tax" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/scottish-tax", label: "Scottish Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What are the Scottish tax bands for 2026/27?", a: "After the £12,570 Personal Allowance: 19% starter rate to £16,537, 20% basic to £29,526, 21% intermediate to £43,662, 42% higher to £75,000, 45% advanced to £125,140 and 48% top rate above that." },
  { q: "Do I pay Scottish tax if I work in Scotland but live in England?", a: "No. Scottish Income Tax depends on where you live, not where you work. If your main home is in England you pay the rest-of-UK rates." },
  { q: "Do people in Scotland pay more tax?", a: "Above about £33,500 a year, yes. Below that the 19% starter rate means slightly less Income Tax than elsewhere in the UK. On £55,000 a Scottish taxpayer pays about £1,650 more a year." },
  { q: "Is National Insurance different in Scotland?", a: "No. National Insurance is the same across the UK, which is why Scottish taxpayers pay a combined 50% between £43,663 and £50,270: 42% Income Tax and 8% NI." },
  { q: "Are savings and dividends taxed at Scottish rates?", a: "No. Savings interest, dividends and capital gains are taxed at UK rates using UK bands, even for Scottish taxpayers." },
  { q: "How do I know if I am a Scottish taxpayer?", a: "Check your tax code on your payslip or in your HMRC online account. A code starting with S, such as S1257L, means you are taxed at Scottish rates." },
  { q: "I have moved to Scotland but my code has no S. What should I do?", a: "Update your address with HMRC online. Your employer will be sent a new code, and any tax difference for the year is corrected through later payslips or after the year ends." },
  { q: "Are students in Scotland taxed differently?", a: "Students are taxed like anyone else on their earnings, at Scottish rates if they live in Scotland for most of the tax year. Most part-time student earnings fall within the £12,570 Personal Allowance." },
  { q: "Do Scottish rates apply to my bonus?", a: "Yes. Bonuses, overtime and benefits in kind are employment income, so they are taxed at Scottish rates. A bonus that takes your pay above £43,662 is taxed at 42% on the part above it, with NI on top at 8% until £50,270 and 2% after." },
  { q: "Is the Personal Allowance taper the same in Scotland?", a: "Yes. The Personal Allowance is reduced by £1 for every £2 of adjusted net income above £100,000, and is gone at £125,140. Because the advanced rate in Scotland is 45%, the effective rate in this band is 67.5% before NI." },
  { q: "Will Scottish rates change again?", a: "The Scottish Government sets rates and bands each year in its budget. The figures in this guide and the calculator are for 2026/27 and will be updated when the 2027/28 rates are confirmed." },
];

export default async function ScottishTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/tax-bracket-checker", "/students/plan-4-student-loan", "/property/lbtt-scotland", "/tax-and-salary/national-insurance", "/investing/pension-tax-relief"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Scottish Income Tax Calculator"
      lead="Your Scottish Income Tax and take-home pay across all six bands, side by side with the rest of the UK."
      points={["2026/27 Scottish rates", "Compared with rest of UK", "Plan 4 student loans", "Free and private"]}
      guide={<ScottishGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for the 2026/27 tax year with an S1257L tax code. GovMath is not affiliated with HMRC or the Scottish Government."
    >
      <ScottishStudio query={query} />
    </FlagshipPage>
  );
}

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

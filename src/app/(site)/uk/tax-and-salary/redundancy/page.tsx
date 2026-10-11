import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RedundancyPayStudio from "./RedundancyPayStudio";
import RedundancyPayGuide from "./RedundancyPayGuide";

const PATH = "/uk/tax-and-salary/redundancy";

export const metadata: Metadata = {
  title: "Redundancy Pay and Tax Calculator 2026/27",
  description:
    "Free redundancy pay calculator for 2026/27. Statutory pay by age and service with the £751 cap, enhanced pay, notice, holiday pay and the tax over £30,000.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: PATH, label: "Redundancy Pay and Tax" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much statutory redundancy pay will I get?",
    a: "Half a week’s pay for each full year of service while you were under 22, one week’s pay for each full year from 22 to 40, and one and a half weeks’ pay for each full year from 41. Up to 20 years count, and weekly pay is capped at £751 (£783 in Northern Ireland) for redundancies on or after 6 April 2026.",
  },
  {
    q: "What is the maximum statutory redundancy pay in 2026?",
    a: "£22,530 in England, Scotland and Wales: 20 years at one and a half weeks, times the £751 cap. In Northern Ireland it is £23,490, because the cap there is £783.",
  },
  {
    q: "Is redundancy pay taxed?",
    a: "The first £30,000 of redundancy pay and other compensation for losing your job is free of Income Tax and National Insurance. Anything above £30,000 is taxed at your normal rates but has no employee National Insurance. Notice pay, holiday pay and wages are always taxed as normal pay, with National Insurance.",
  },
  {
    q: "Do I qualify for redundancy pay?",
    a: "You need to be an employee with at least 2 full years of continuous service with the employer on the date your job ends. Workers who are not employees, such as most agency and zero-hours workers without employee status, do not get statutory redundancy pay.",
  },
  {
    q: "What counts as a week’s pay?",
    a: "Your normal gross weekly pay on the date notice is given. If your hours and pay vary, it is the average of the last 12 weeks you were paid. For statutory pay it is capped at £751 (£783 in Northern Ireland), even if you earn more.",
  },
  {
    q: "Is notice pay part of redundancy pay?",
    a: "No. Notice pay is separate and comes on top. You are owed your contractual notice or the statutory minimum, whichever is longer. The statutory minimum is one week for each full year of service, from 2 to 12 years.",
  },
  {
    q: "What is pay in lieu of notice (PILON)?",
    a: "Instead of asking you to work your notice, your employer ends your job straight away and pays the notice as a lump sum. Since April 2018 all of the basic pay for unworked notice is taxed as earnings, with National Insurance, whether or not your contract mentions PILON.",
  },
  {
    q: "Do I get paid for holiday I have not taken?",
    a: "Yes. When you leave, your employer must pay you for statutory holiday you have built up but not taken. It is taxed as normal pay. Your contract may also allow extra contractual holiday to be paid.",
  },
  {
    q: "Can I pay my redundancy money into a pension?",
    a: "Yes, and it can save tax on any amount above £30,000. Some employers let you sacrifice part of the payout into your pension before it is paid. You can also pay in yourself afterwards and get tax relief, within your annual allowance.",
  },
  {
    q: "Does redundancy pay affect Universal Credit?",
    a: "Redundancy pay is treated as capital once you have received it, not as earnings. Savings and capital between £6,000 and £16,000 reduce Universal Credit, and above £16,000 you cannot get it. Final wages, notice pay and holiday pay count as earnings.",
  },
  {
    q: "When should my redundancy pay be paid?",
    a: "Usually on or soon after your last day, often with your final pay. If your employer does not pay, write to them first, then contact Acas about early conciliation. If your employer is insolvent, you can claim from the Redundancy Payments Service.",
  },
  {
    q: "What if my employer is insolvent?",
    a: "You can apply to the government’s Redundancy Payments Service for statutory redundancy pay, notice pay up to the statutory minimum, up to 8 weeks of unpaid wages and up to 6 weeks of holiday pay, each capped at the weekly limit.",
  },
];

export default async function RedundancyPayPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/uk/tax-and-salary/notice-period-final-pay",
      "/uk/tax-and-salary/holiday-entitlement",
      "/uk/tax-and-salary/p45-p60-explainer",
      "/uk/tax-and-salary/emergency-tax",
      "/uk/benefits/new-style-jsa",
      "/uk/investing/pension-tax-relief",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Redundancy Pay and Tax Calculator"
      lead="Work out your statutory or enhanced redundancy pay, with notice pay, holiday pay and the tax on your whole payout."
      points={["£751 cap from 6 April 2026", "Year-by-year breakdown", "Tax over £30,000", "Free and private"]}
      guide={<RedundancyPayGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for redundancies on or after 6 April 2026 and the 2026/27 tax year. SumAtlas is not affiliated with GOV.UK, HMRC or Acas. Check your contract and get advice if you are unsure."
    >
      <RedundancyPayStudio query={query} />
    </FlagshipPage>
  );
}

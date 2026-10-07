import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ReverseStudio from "./ReverseStudio";
import { ogFor } from "@/gm/og";
import ReverseGuide from "./ReverseGuide";

export const metadata: Metadata = {
  title: "Reverse Salary Calculator UK 2026/27",
  description:
    "Free reverse salary calculator. Enter the take-home pay you want each month and see the gross salary you need after tax, NI, pension and student loan.",
  alternates: { canonical: "/tax-and-salary/reverse-take-home" },
  openGraph: ogFor("/tax-and-salary/reverse-take-home"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/reverse-take-home", label: "Reverse Take-Home Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What salary do I need to take home £2,000 a month?", a: "About £28,445 a year in England, Wales or Northern Ireland in 2026/27, with a standard tax code and no student loan or pension. In Scotland it is about £28,390." },
  { q: "What salary gives £3,000 a month after tax?", a: "About £45,112 a year in England, Wales or Northern Ireland, or £45,953 in Scotland. With a Plan 2 student loan it rises to about £47,358." },
  { q: "What salary do I need for £4,000 a month take-home?", a: "About £64,556 a year in England, Wales or Northern Ireland. Above £50,270 you pay 40% Income Tax, so each extra pound of take-home needs more salary." },
  { q: "How do I work out gross pay from net pay?", a: "There is no single formula, because tax and National Insurance change rate at several thresholds. The calculator searches for the lowest salary whose take-home reaches your target." },
  { q: "Does it include my student loan?", a: "Yes, if you choose your plan under More options. Repayments are 9% of income over your plan's threshold, or 6% for a postgraduate loan." },
  { q: "Does it include my pension?", a: "Yes. Enter your contribution as a percentage under More options. It is treated as salary sacrifice, which comes off before tax and National Insurance." },
  { q: "Why does the salary needed jump above £100,000?", a: "Between £100,000 and £125,140 your Personal Allowance is withdrawn, so you keep only 38p of each extra pound. You need a lot more salary for a little more take-home." },
  { q: "Is the result the same for weekly pay?", a: "Yes. Choose week as the period. The calculation is yearly, so weekly and monthly pay give the same salary for the same yearly take-home." },
  { q: "What hourly rate do I need?", a: "The calculator divides the salary by 52 weeks and your paid hours a week. At 37.5 hours, £2,000 a month take-home needs about £14.59 an hour." },
  { q: "Does the calculator include benefits like Universal Credit?", a: "No. It works out pay only. If you get Universal Credit, extra take-home pay also reduces your award by 55p in the pound." },
  { q: "Is take-home pay the same as net pay?", a: "Yes. Both mean pay after Income Tax, National Insurance, student loan and pension contributions." },
];

export default async function ReverseTakeHomePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/pay-rise", "/tax-and-salary/tax-bracket-checker", "/tax-and-salary/hourly-to-salary", "/tax-and-salary/salary-sacrifice", "/benefits/universal-credit-taper"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 tax year"
      title="Reverse Take-Home Calculator"
      lead="Enter the take-home pay you want each month and see the salary you need, after tax, National Insurance, student loan and pension."
      points={["Gross from net", "Scotland included", "Student loans and pension", "Free and private"]}
      guide={<ReverseGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026/27 with a standard tax code. Your payslip may differ if your tax code or pay changes during the year."
    >
      <ReverseStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HourlyStudio from "./HourlyStudio";
import HourlyGuide from "./HourlyGuide";

export const metadata: Metadata = {
  title: "Hourly Rate to Salary Calculator (UK, 2026/27)",
  description:
    "Convert an hourly rate to a yearly salary, or a salary to an hourly rate, with take-home pay, overtime, unpaid holiday and a minimum wage check. 2026/27 rates.",
  alternates: { canonical: "/tax-and-salary/hourly-to-salary" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/hourly-to-salary", label: "Hourly to Salary" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I convert an hourly rate to a salary?", a: "Multiply your hourly rate by your hours a week and then by 52. For example, £15 an hour for 37.5 hours a week is £15 × 37.5 × 52 = £29,250 a year." },
  { q: "Should I use 52 weeks or fewer?", a: "Use 52 if your holiday is paid, which it is for most employees. Use fewer weeks if you are not paid for time off, for example 47 weeks for a contractor who takes five weeks unpaid." },
  { q: "What is £15 an hour as a salary after tax?", a: "At 37.5 hours a week, £15 an hour is £29,250 a year. After Income Tax and National Insurance in 2026/27 that is about £2,048 a month in England, Wales or Northern Ireland, with no pension or student loan." },
  { q: "What is the minimum wage in 2026?", a: "From 1 April 2026 the National Living Wage for people aged 21 and over is £12.71 an hour. It is £10.85 for 18 to 20 year olds, and £8.00 for under-18s and apprentices." },
  { q: "Do I get paid more for overtime?", a: "Not by law. Overtime rates such as time and a half depend on your contract. Your average pay across all hours must still be at least the minimum wage." },
  { q: "How many working hours are there in a year?", a: "At 37.5 hours a week there are 1,950 paid hours in a 52-week year. At 40 hours it is 2,080, and at 35 hours 1,820. These figures include paid holiday, because a salary pays you for those weeks too." },
  { q: "How many working days are there in the 2026/27 tax year?", a: "Between 6 April 2026 and 5 April 2027 there are 261 weekdays. Take away the 9 bank holidays in England and Wales and 252 working days remain, before any personal holiday." },
  { q: "Is an hourly rate better than a salary?", a: "Neither is better in itself. A salary gives predictable pay and usually paid holiday and sick pay. Hourly pay rewards extra hours directly, but your income can fall when hours are cut. Compare the hourly rate, the benefits and how stable your hours are likely to be." },
  { q: "Does the tax differ for hourly and salaried workers?", a: "No. Income Tax and National Insurance are the same whether your pay is quoted by the hour or by the year. What can differ is timing: if your hours vary, each payslip is taxed on what you earned that period." },
];

export default async function HourlyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/pro-rata", "/tax-and-salary/overtime", "/tax-and-salary/minimum-wage", "/tax-and-salary/holiday-entitlement", "/tax-and-salary/ir35-take-home"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Hourly Rate to Salary Calculator"
      lead="Convert hourly pay to a yearly salary, or a salary to an hourly rate, and see what you take home."
      points={["Both directions", "Overtime and unpaid holiday", "Minimum wage check", "Free and private"]}
      guide={<HourlyGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for the 2026/27 tax year, assuming a standard tax code and evenly spread pay. GovMath is not affiliated with HMRC."
    >
      <HourlyStudio query={query} />
    </FlagshipPage>
  );
}

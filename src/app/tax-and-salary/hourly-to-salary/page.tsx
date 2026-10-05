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

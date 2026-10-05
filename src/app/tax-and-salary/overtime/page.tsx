import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import OvertimeStudio from "./OvertimeStudio";
import OvertimeGuide from "./OvertimeGuide";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator (UK, 2026/27)",
  description:
    "Work out your overtime pay and what you keep after Income Tax, National Insurance and student loan, at time and a half, double time or your own rate. 2026/27 rates.",
  alternates: { canonical: "/tax-and-salary/overtime" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/overtime", label: "Overtime" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is overtime calculated?", a: "Work out your basic hourly rate (salary ÷ (weekly hours × 52)), multiply it by your overtime rate, such as 1.5 for time and a half, then by the overtime hours. £32,000 for 37.5 hours a week is £16.41 an hour, so 10 hours at time and a half is £246.15." },
  { q: "Is overtime taxed more?", a: "No. Overtime is taxed like the rest of your pay, but at your highest rate because it sits on top of your normal pay. A basic-rate taxpayer keeps about 72p of each extra pound, a higher-rate taxpayer about 58p." },
  { q: "Do I have to be paid extra for overtime?", a: "Not by law. Overtime rates depend on your contract. Your average pay across all hours worked must still be at least the minimum wage." },
  { q: "Does overtime count towards holiday pay?", a: "Regular overtime usually has to be included in holiday pay for the first four weeks of statutory leave, based on your average pay over the previous 52 weeks." },
  { q: "How many hours of overtime can I be asked to work?", a: "Most workers cannot be made to work more than 48 hours a week on average, usually over 17 weeks, unless they have opted out in writing." },
];

export default async function OvertimePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/hourly-to-salary", "/tax-and-salary/bonus-tax", "/tax-and-salary/minimum-wage", "/tax-and-salary/holiday-entitlement", "/tax-and-salary/tax-bracket-checker"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Overtime Pay Calculator"
      lead="See what your overtime pays before and after tax, and what you keep for each extra hour."
      points={["Any overtime rate", "Regular or one-off", "Real payslip rules", "Free and private"]}
      guide={<OvertimeGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for the 2026/27 tax year, assuming a standard cumulative tax code. GovMath is not affiliated with HMRC. Your contract sets your overtime rate."
    >
      <OvertimeStudio query={query} />
    </FlagshipPage>
  );
}

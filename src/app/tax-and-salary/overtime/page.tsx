import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import OvertimeStudio from "./OvertimeStudio";
import { ogFor } from "@/gm/og";
import OvertimeGuide from "./OvertimeGuide";

export const metadata: Metadata = {
  title: "Overtime Calculator UK 2026/27",
  description:
    "Free overtime pay calculator. Work out time and a half or double time, and see what your extra hours are worth after Income Tax and NI in 2026/27.",
  alternates: { canonical: "/tax-and-salary/overtime" },
  openGraph: ogFor("/tax-and-salary/overtime"),
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
  { q: "Why does my overtime seem to be taxed so heavily?", a: "Overtime is taxed at your highest rate because it sits on top of your normal pay. In a month with a lot of overtime, the payslip can look heavy, but over a year you pay the same tax as if the pay had been spread out." },
  { q: "Can I be forced to work overtime?", a: "Only if your contract says overtime is compulsory. Even then, your average working week must normally stay within 48 hours unless you have opted out in writing." },
  { q: "Is overtime included in my pension?", a: "It depends on the scheme. Auto-enrolment schemes based on qualifying earnings include overtime; others only count basic salary. Your payslip will show whether a pension deduction is taken from the overtime." },
  { q: "Does overtime affect my tax code?", a: "No. Your tax code sets your tax-free pay, not your rate. Overtime simply adds to your pay, and the cumulative PAYE system taxes it at whatever band your total income reaches. If you also have a second job, overtime in your main job can mean the second job's BR code is no longer enough, and HMRC may change it to D0." },
  { q: "Should I take overtime or time off in lieu?", a: "Paid overtime increases your income and is taxed; time off in lieu is not taxed at all because no money changes hands. If you are close to £50,270 or £100,000, time off can be worth more than the pay you would keep. Check how long you have to use the time and whether it can be carried over." },
  { q: "Do I get overtime if I work part-time?", a: "Usually only once you work more than the full-time hours for your job. Extra hours below that are normally paid at your basic rate." },
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

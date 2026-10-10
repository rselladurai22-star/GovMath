import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HourlyPaycheckStudio from "./HourlyPaycheckStudio";
import HourlyPaycheckGuide from "./HourlyPaycheckGuide";

const PATH = "/us/taxes/hourly-paycheck-calculator";

export const metadata: Metadata = {
  title: "Hourly Paycheck Calculator 2026: Take-Home",
  description:
    "Free hourly paycheck calculator for 2026. Turn your hourly rate, hours and overtime into take-home pay per paycheck after federal, FICA and state tax.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Hourly Paycheck Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is $20 an hour after taxes?", a: "For a single person working 40 hours a week in Texas, paid every two weeks, about $1,369 a paycheck or $35,606 a year in 2026. That is about $17.12 for every hour worked. In California it is about $1,324 a paycheck." },
  { q: "How do I work out my paycheck from my hourly rate?", a: "Multiply your rate by your hours for the week, add overtime hours at 1.5 times the rate, then multiply by the weeks in your pay period. Take off federal income tax, 7.65% for Social Security and Medicare, and any state tax." },
  { q: "How much tax comes out of an hourly paycheck?", a: "For most hourly workers, 10% to 20% of gross pay. At $20 an hour and 40 hours in Texas it is about 14%: 7.65% for Social Security and Medicare and the rest federal income tax." },
  { q: "Is overtime taxed more?", a: "No. Overtime is taxed at the same rates as other pay. A paycheck with lots of overtime can have more withheld, because payroll treats it as if you earned that much every period, but the difference comes back when you file. For 2025 to 2028 you can also deduct the overtime premium." },
  { q: "How much is time and a half?", a: "Your hourly rate times 1.5. At $20 an hour, overtime pays $30 an hour, so 5 hours of overtime adds $150 to the week before tax." },
  { q: "Do part-time workers pay less tax?", a: "They pay less in dollars and usually a smaller share, because more of their pay falls under the standard deduction. At $20 an hour, 20 hours a week loses about 10% to tax, against about 14% at 40 hours." },
  { q: "What is my after-tax hourly wage?", a: "Your yearly take-home pay divided by the hours you work in a year. At $20 an hour full time in Texas it is about $17.12." },
  { q: "How many hours a year is full time?", a: "40 hours a week for 52 weeks is 2,080 hours, which is why $20 an hour is $41,600 a year. If you take unpaid weeks off, use fewer paid weeks." },
  { q: "Why is my biweekly paycheck different each time?", a: "Your hours change, overtime comes and goes, and Social Security stops once you pass $184,500 in the year. Months with three biweekly paydays also feel different, though each check is the same size." },
  { q: "What is the federal minimum wage in 2026?", a: "Still $7.25 an hour. Most states and many cities set a higher minimum, and employers must pay whichever is highest." },
  { q: "Do hourly workers get the overtime tax deduction?", a: "Yes, if they are owed overtime under the Fair Labor Standards Act. You can deduct the extra half of time and a half, up to $12,500 a year ($25,000 joint), from 2025 to 2028." },
  { q: "Should I change my W-4 if I work overtime?", a: "If you work steady overtime, you can use the IRS Tax Withholding Estimator to lower withholding for the overtime deduction. If your hours vary a lot, leaving it alone and getting a refund is the safer choice." },
];

export default async function HourlyPaycheckPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/overtime-calculator", "/us/taxes/salary-to-hourly", "/us/taxes/raise-calculator", "/everyday/timesheet-decimal"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 hourly take-home pay"
      title="Hourly Paycheck Calculator"
      lead="Enter your hourly rate, your hours and any overtime to see what each paycheck pays after federal tax, Social Security, Medicare and state tax, and what you keep for every hour you work."
      points={["Hourly rate and overtime", "All 50 states and DC", "Part-time vs full-time", "After-tax hourly wage"]}
      guide={<HourlyPaycheckGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026 based on IRS and state rates. Your employer's payroll may differ slightly. Not tax advice."
    >
      <HourlyPaycheckStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SalaryHourlyStudio from "./SalaryHourlyStudio";
import SalaryHourlyGuide from "./SalaryHourlyGuide";

const PATH = "/us/taxes/salary-to-hourly";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator: Pay Converter 2026",
  description:
    "Free salary to hourly calculator for 2026. Convert an annual salary to an hourly wage, or hourly pay to weekly, biweekly, monthly and yearly pay.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Salary to Hourly Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I convert a salary to an hourly wage?",
    a: "Divide the yearly salary by the hours you work in a year. A full-time year is 40 hours × 52 weeks = 2,080 hours, so a $50,000 salary works out at about $24.04 an hour.",
  },
  {
    q: "How do I convert an hourly wage to a yearly salary?",
    a: "Multiply the hourly rate by your hours a week, then by the weeks you are paid in a year. $25 an hour for 40 hours a week over 52 weeks is $52,000 a year.",
  },
  {
    q: "How many working hours are there in a year?",
    a: "A standard full-time year is 2,080 hours (40 hours a week for 52 weeks). Paid holidays and vacation are counted in that figure if you are paid for them.",
  },
  {
    q: "Is there a quick way to estimate it in my head?",
    a: "Double the hourly rate and add three zeros to get a rough yearly salary: $20 an hour is about $40,000. The exact figure for 2,080 hours is $41,600, so the shortcut runs about 4% low.",
  },
  {
    q: "What is $7.25 an hour as a yearly salary?",
    a: "At the federal minimum wage of $7.25 an hour, 40 hours a week for 52 weeks comes to $15,080 a year, or about $1,257 a month before tax.",
  },
  {
    q: "Should I count paid vacation and holidays?",
    a: "If you are paid for them, yes: leave the year at 52 weeks. If you take unpaid time off, enter it under More options so the yearly figure only counts the days you are paid.",
  },
  {
    q: "Why is my real hourly rate lower than the calculator shows?",
    a: "If you are salaried and regularly work more than your contracted hours, your pay is spread over more hours. A $60,000 salary is $28.85 an hour at 40 hours a week but $25.64 at 45.",
  },
  {
    q: "What is the difference between biweekly and semimonthly pay?",
    a: "Biweekly means every two weeks, 26 paychecks a year. Semimonthly means twice a month, usually on fixed dates, 24 paychecks a year. Each semimonthly check is a little larger.",
  },
  {
    q: "Is the hourly figure before or after tax?",
    a: "Before tax. Federal income tax, Social Security, Medicare and any state tax come out of these figures. The paycheck calculator shows your take-home pay.",
  },
  {
    q: "Do salaried workers get overtime?",
    a: "Some do. Under federal law, a salaried worker must usually earn at least $684 a week ($35,568 a year) and do executive, administrative or professional work to be exempt from overtime. Below that, overtime is due after 40 hours.",
  },
  {
    q: "How do I compare a salaried job with an hourly one?",
    a: "Convert both to the same period and the same hours. Then add the value of benefits such as health insurance, a 401(k) match and paid time off, which hourly jobs often offer less of.",
  },
];

export default async function SalaryHourlyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/overtime-calculator", "/us/taxes/federal-income-tax", "/us/taxes/tax-bracket-calculator", "/everyday/timesheet-decimal"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Pay converter"
      title="Salary to Hourly Calculator"
      lead="Turn a yearly salary into an hourly wage, or an hourly rate into weekly, biweekly, monthly and yearly pay, with your own hours and weeks."
      points={["Both directions", "Every pay period", "Unpaid time off", "Minimum wage check"]}
      guide={<SalaryHourlyGuide />}
      faqs={FAQS}
      related={related}
      note="Figures are before tax and rounded for display. Not legal or tax advice."
    >
      <SalaryHourlyStudio query={query} />
    </FlagshipPage>
  );
}

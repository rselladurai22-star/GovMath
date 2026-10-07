import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TimesheetStudio from "./TimesheetStudio";
import { ogFor } from "@/gm/og";
import TimesheetGuide from "./TimesheetGuide";

export const metadata: Metadata = {
  title: "Timesheet Calculator: Hours to Decimal",
  description:
    "Free timesheet calculator. Turn hours and minutes into decimal hours, take off breaks, add up a week and work out your pay, including overtime.",
  alternates: { canonical: "/uk/life/timesheet-decimal" },
  openGraph: ogFor("/uk/life/timesheet-decimal"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/timesheet-decimal", label: "Timesheet Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I convert minutes to decimal hours?", a: "Divide the minutes by 60. 15 minutes is 0.25, 30 minutes is 0.5 and 45 minutes is 0.75." },
  { q: "What is 7 hours 40 minutes in decimal?", a: "7.67 hours, because 40 ÷ 60 = 0.67." },
  { q: "How do I work out a night shift?", a: "If the finish time is before the start time, add 24 hours to the finish time before subtracting." },
  { q: "Do I get paid for breaks?", a: "Only if your contract says so. Adults are entitled to a 20-minute break when working more than 6 hours." },
  { q: "How do I convert 7 hours 20 minutes to decimal?", a: "20 ÷ 60 = 0.33, so it is 7.33 hours." },
  { q: "How do I convert decimal hours back to minutes?", a: "Multiply the decimal part by 60. 0.6 hours is 36 minutes." },
  { q: "Is a 30-minute lunch break paid?", a: "Only if your contract says so. The legal minimum break does not have to be paid." },
  { q: "How many hours is 9 to 5 with a lunch break?", a: "8 hours less a 30-minute unpaid lunch is 7.5 hours, or 37.5 hours over five days." },
  { q: "What is 37.5 hours in hours and minutes?", a: "37 hours 30 minutes, written 37:30." },
  { q: "Does travel time count as working hours?", a: "Normal travel between home and a fixed workplace does not. Travel between jobs during the day, or to customers for workers without a fixed workplace, usually does." },
  { q: "Can my employer deduct time for being late?", a: "They can avoid paying for time not worked, but deductions from wages must be allowed by your contract and cannot take your pay below the minimum wage." },
];

export default async function TimesheetPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/tax-and-salary/overtime", "/uk/tax-and-salary/minimum-wage", "/uk/tax-and-salary/salary-calculator", "/uk/life/days-between-dates", "/uk/life/bank-holidays"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Decimal hours"
      title="Timesheet Calculator"
      lead="Add up your week from start and finish times, convert to decimal hours, and work out your pay with overtime."
      points={["Seven days", "Night shifts", "Overtime", "Free and private"]}
      guide={<TimesheetGuide />}
      faqs={FAQS}
      related={related}
      note="Gross pay before tax and National Insurance."
    >
      <TimesheetStudio query={query} />
    </FlagshipPage>
  );
}

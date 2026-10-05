import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TimesheetStudio from "./TimesheetStudio";
import TimesheetGuide from "./TimesheetGuide";

export const metadata: Metadata = {
  title: "Timesheet Calculator: Hours to Decimal and Weekly Pay",
  description:
    "Add up a week of start and finish times with breaks, convert hours and minutes to decimal hours, handle night shifts and overtime, and work out gross pay at your hourly rate.",
  alternates: { canonical: "/life/timesheet-decimal" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/timesheet-decimal", label: "Timesheet Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I convert minutes to decimal hours?", a: "Divide the minutes by 60. 15 minutes is 0.25, 30 minutes is 0.5 and 45 minutes is 0.75." },
  { q: "What is 7 hours 40 minutes in decimal?", a: "7.67 hours, because 40 ÷ 60 = 0.67." },
  { q: "How do I work out a night shift?", a: "If the finish time is before the start time, add 24 hours to the finish time before subtracting." },
  { q: "Do I get paid for breaks?", a: "Only if your contract says so. Adults are entitled to a 20-minute break when working more than 6 hours." },
];

export default async function TimesheetPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/tax-and-salary/overtime", "/tax-and-salary/minimum-wage", "/tax-and-salary/salary-calculator", "/life/days-between-dates", "/life/bank-holidays"].includes(c.href));
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

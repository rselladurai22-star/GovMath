import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import TimeStudio from "./TimeStudio";
import TimeGuide from "./TimeGuide";

export const metadata: Metadata = {
  title: "Hours Calculator: Time Between Two Times",
  description:
    "Free hours and time calculator. Work out hours and minutes between two times, past midnight and less breaks, add up times and convert to decimal hours.",
  alternates: { canonical: "/everyday/time-calculator" },
  openGraph: ogFor("/everyday/time-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/time-calculator", label: "Hours and Time Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out the hours between two times?", a: "Take the start time from the finish time. If the minutes go below zero, borrow 60 minutes from the hours. From 09:00 to 17:30 is 8 hours 30 minutes." },
  { q: "How do I calculate hours worked past midnight?", a: "Add 24 hours to the finish time before you subtract. From 22:00 to 06:00 is 8 hours. The calculator does this whenever the finish is at or before the start." },
  { q: "How do I take off a break?", a: "Enter the unpaid break in minutes. A 9:00 to 17:30 day with a 30-minute break is 8 hours worked." },
  { q: "How do I convert minutes to decimal hours?", a: "Divide the minutes by 60. 15 minutes is 0.25 hours, 30 minutes 0.5, 45 minutes 0.75, and 20 minutes about 0.33. So 7 hours 45 minutes is 7.75 hours." },
  { q: "Why do 7.30 hours and 7:30 differ?", a: "7:30 is 7 hours 30 minutes, which is 7.5 decimal hours. Typing 7.30 into a pay sheet that expects decimals would pay for only 7 hours 18 minutes." },
  { q: "How do I add up hours and minutes?", a: "Add the hours and the minutes separately, then turn every 60 minutes into an hour. 7:30 + 8:15 = 15:45. Choose \"Add up hours and minutes\" to do this for up to eight times." },
  { q: "Can I subtract time?", a: "Yes. Start a line with a minus, such as −0:45, to take that time away from the total." },
  { q: "What formats can I type?", a: "Times as 09:00, 9.30, 1730 or 5:30pm. Durations as 7:30, 7h 30m, 45m, 90 min or decimal hours such as 7.5." },
  { q: "How many hours is 9 to 5?", a: "8 hours, or 7 hours 30 minutes after a 30-minute unpaid lunch break. Five days of that is 37 hours 30 minutes a week." },
  { q: "Am I entitled to a break at work?", a: "In the UK, adult workers usually have the right to one uninterrupted 20-minute rest break if they work more than 6 hours a day. It does not have to be paid. Other countries have their own rules." },
  { q: "How do I work out pay for my hours?", a: "Multiply the decimal hours by the hourly rate. Add your rate under More options to see pay for a day and a week, before tax." },
];

export default async function TimePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/timesheet-decimal", "/uk/tax-and-salary/holiday-entitlement", "/uk/tax-and-salary/holiday-pay-irregular-hours", "/everyday/date-calculator", "/everyday/countdown", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Hours, minutes and decimals"
      title="Hours and Time Calculator"
      lead="Work out the hours and minutes between two times, including shifts past midnight and breaks, add up a list of times and convert to decimal hours."
      points={["Shifts past midnight", "Breaks taken off", "Decimal hours", "Free and private"]}
      guide={<TimeGuide />}
      faqs={FAQS}
      related={related}
      note="Results are rounded to the nearest minute, and decimal hours to 2 places. Pay is shown before tax."
    >
      <TimeStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DateCalcStudio from "./DateCalcStudio";
import DateCalcGuide from "./DateCalcGuide";

export const metadata: Metadata = {
  title: "Date Calculator: Add or Subtract Days",
  description:
    "Free date calculator. Add or subtract days, weeks, months or years from any date, or count working days skipping weekends and UK bank holidays.",
  alternates: { canonical: "/everyday/date-calculator" },
  openGraph: ogFor("/everyday/date-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/date-calculator", label: "Date Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What date is 90 days from today?", a: "Enter today as the start date (it is the default), choose Add and enter 90 days. For example, 90 days after 11 October 2026 is Saturday 9 January 2027." },
  { q: "Does the start date count as day 1?", a: "No. The start date is day 0, so 1 day after Monday is Tuesday. This is how deadlines such as \"within 14 days\" are usually counted, but check the wording of your own deadline." },
  { q: "How do I add working days to a date?", a: "Choose Working days. The calculator skips Saturdays and Sundays and, if you pick a UK nation under More options, that nation's bank holidays. 10 working days after Thursday 17 December 2026 is Tuesday 5 January 2027 in England and Wales." },
  { q: "Why do working days differ between England and Scotland?", a: "Each UK nation has its own bank holidays. Scotland has 2 January and St Andrew's Day but not Easter Monday, and Northern Ireland adds St Patrick's Day and 12 July. So the same number of working days can end on a different date." },
  { q: "What happens when I add a month to 31 January?", a: "There is no 31 February, so the calculator uses the last day of February: 28 February, or 29 in a leap year. The same rule applies to any month end." },
  { q: "Is 3 months the same as 13 weeks?", a: "Not quite. 3 months after 11 October 2026 is 11 January 2027, but 13 weeks after it is 10 January 2027. Months follow the calendar; weeks are always 7 days." },
  { q: "How do I count back from a date?", a: "Choose Subtract. For example, 100 days before 11 October 2026 is 3 July 2026. This helps with notice periods and \"must be sent by\" dates." },
  { q: "Can I add years, months, weeks and days together?", a: "Yes. Years and months are added first, then weeks and days. The step-by-step card shows the date after each part." },
  { q: "How do I count the days between two dates?", a: "Use the days between dates calculator, which counts calendar days, weeks and working days between any two dates." },
  { q: "Does the calculator know about bank holidays in other countries?", a: "No. For working days outside the UK, choose \"None (weekends only)\" and add a day for each public holiday in your country that falls in the period." },
  { q: "Can I repeat a period, like every 28 days?", a: "Yes. The \"Repeating the period\" table lists the next 8 dates, which helps with medication cycles, billing dates and rotas." },
  { q: "Which week number is a date in?", a: "The calculator shows the ISO week number, where weeks start on Monday and week 1 contains the year's first Thursday. 11 October 2026 is in week 41." },
];

export default async function DateCalcPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/life/days-between-dates", "/uk/life/bank-holidays", "/everyday/age-calculator", "/uk/tax-and-salary/notice-period-final-pay"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Calendar or working days"
      title="Date Calculator"
      lead="Add or subtract days, weeks, months or years from any date, or count working days that skip weekends and UK bank holidays."
      points={["Add or subtract", "Working days with bank holidays", "Weekday and week number", "Free and private"]}
      guide={<DateCalcGuide />}
      faqs={FAQS}
      related={related}
      note="Dates follow the Gregorian calendar. UK bank holidays are worked out from the official rules; check one-off changes on GOV.UK."
    >
      <DateCalcStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AgeStudio from "./AgeStudio";
import AgeGuide from "./AgeGuide";

export const metadata: Metadata = {
  title: "Age Calculator: Exact Age in Years, Months, Days",
  description:
    "Free age calculator. See your exact age in years, months and days, total weeks, days and hours, your next birthday, the day you were born and age milestones.",
  alternates: { canonical: "/everyday/age-calculator" },
  openGraph: ogFor("/everyday/age-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/age-calculator", label: "Age Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out my exact age?", a: "Count the whole years since your last birthday, then the whole months since the last monthly anniversary, then the days left over. Someone born on 15 June 1990 is 36 years, 3 months and 26 days old on 11 October 2026." },
  { q: "How many days old am I?", a: "Count every day from your date of birth to today. Someone born on 15 June 1990 is 13,267 days old on 11 October 2026. The calculator does the count for any date, leap years included." },
  { q: "How old will I be on a certain date?", a: "Change the \"Age on\" date to the date you want, such as an exam, a trip or a deadline. The calculator shows your age on that day and the birthday before it." },
  { q: "What day of the week was I born?", a: "The calculator shows it under your age. For example, 15 June 1990 was a Friday, and 1 January 2000 was a Saturday." },
  { q: "When is someone born on 29 February a year older?", a: "In leap years, on 29 February. In other years people choose 28 February or 1 March, and rules differ between countries and organisations. The calculator uses 1 March unless you change it under More options." },
  { q: "Why does my age in months not match years × 12?", a: "It does: total months are whole years × 12 plus the months since your last birthday. The extra days are left over and not counted as a month." },
  { q: "How are months counted when they have different lengths?", a: "By date, not by a fixed number of days. A month after 15 March is 15 April. If the later month is shorter, the last day of that month is used, so a month after 31 January is 28 February (or 29 in a leap year)." },
  { q: "What is a half birthday?", a: "The day six months after your birthday. For a 15 June birthday it is 15 December. For 31 August it is the last day of February." },
  { q: "When will I be 10,000 days old?", a: "About 27 years and 4 months after you were born. For someone born on 15 June 1990 it was 31 October 2017. The milestone table shows yours." },
  { q: "When will I be a billion seconds old?", a: "About 31 years and 8 months after birth: one billion seconds is 11,574 days and a few hours. For a 15 June 1990 birthday it was 21 February 2022." },
  { q: "Does the time of birth matter?", a: "Only for hours and minutes. The calculator counts whole days from midnight to midnight, which is how ages are normally given." },
  { q: "Can I work out the age gap between two people?", a: "Yes. Add a second date of birth under More options to see the gap in years, months and days, and in total days and weeks." },
  { q: "Does the calculator store my date of birth?", a: "No. The sums run in your browser. Your dates only appear in the address bar if you copy a link to share." },
];

export default async function AgePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/date-calculator", "/uk/life/days-between-dates", "/uk/investing/state-pension-age", "/uk/life/bank-holidays"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Years, months and days"
      title="Age Calculator"
      lead="Work out an exact age in years, months and days on any date, with totals in weeks, days and hours, the next birthday, the day of birth and fun milestones."
      points={["Exact years, months, days", "Age on any date", "Next birthday and weekday", "29 February handled"]}
      guide={<AgeGuide />}
      faqs={FAQS}
      related={related}
      note="Ages are counted in whole calendar days from the date of birth. For legal age checks, the organisation's own rules apply."
    >
      <AgeStudio query={query} />
    </FlagshipPage>
  );
}

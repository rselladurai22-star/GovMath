import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DaysStudio from "./DaysStudio";
import { ogFor } from "@/gm/og";
import DaysGuide from "./DaysGuide";

export const metadata: Metadata = {
  title: "Days Between Dates Calculator (UK)",
  description:
    "Free days between dates calculator. Count calendar days, weeks and UK working days between two dates, with bank holidays for each nation taken out.",
  alternates: { canonical: "/life/days-between-dates" },
  openGraph: ogFor("/life/days-between-dates"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/days-between-dates", label: "Days Between Dates" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I count the days between two dates?", a: "Subtract the start date from the end date. By convention the end date is not counted, so Monday to Wednesday is 2 days." },
  { q: "How many working days are there in 2027?", a: "253 in England and Wales, 252 in Scotland and 251 in Northern Ireland." },
  { q: "Does the calculator include bank holidays?", a: "Yes. Working days leave out weekends and the bank holidays for the nation you choose." },
  { q: "Can I add working days to a date?", a: "Yes. Use the option under More options to add or subtract calendar or working days." },
  { q: "How many days until Christmas?", a: "Enter today and 25 December. From 4 October 2026 it is 82 days." },
  { q: "How many working days are in a year?", a: "253 in England and Wales in 2026 and 2027, 252 in Scotland and 251 in Northern Ireland." },
  { q: "Does the calculator count bank holidays as working days?", a: "No. Bank holidays that fall on weekdays are left out of the working-day count." },
  { q: "Can I count backwards?", a: "Yes. Use a minus number of days to find an earlier date." },
  { q: "How many weeks are there between two dates?", a: "Divide the days by 7. The calculator shows whole weeks and the days left over." },
  { q: "Why does my answer differ from another calculator by one day?", a: "Usually because one counts the end date and the other does not. Switch “Include the end date” to compare." },
  { q: "Does the calculator know about past bank holidays?", a: "Yes, including one-off days such as the 2022 Platinum Jubilee and the 2023 coronation." },
];

export default async function DaysPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/bank-holidays", "/life/timesheet-decimal", "/life/pro-rata-rent", "/tax-and-salary/holiday-entitlement"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="UK working days"
      title="Days Between Dates Calculator"
      lead="Count the days, weeks, months and working days between two dates, and add days to a date for deadlines."
      points={["Working days", "UK bank holidays", "Add or subtract days", "Free and private"]}
      guide={<DaysGuide />}
      faqs={FAQS}
      related={related}
      note="Bank holidays follow GOV.UK."
    >
      <DaysStudio query={query} />
    </FlagshipPage>
  );
}

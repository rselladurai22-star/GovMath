import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import DaysStudio from "./DaysStudio";
import DaysGuide from "./DaysGuide";

export const metadata: Metadata = {
  title: "Days Between Dates Calculator (with UK Working Days)",
  description:
    "Count the days, weeks, months and working days between two dates, allowing for UK bank holidays in England and Wales, Scotland or Northern Ireland, and add days or working days to a date.",
  alternates: { canonical: "/life/days-between-dates" },
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

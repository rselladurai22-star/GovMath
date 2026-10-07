import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BankHolidaysStudio from "./BankHolidaysStudio";
import { ogFor } from "@/gm/og";
import BankHolidaysGuide from "./BankHolidaysGuide";

export const metadata: Metadata = {
  title: "UK Bank Holidays 2026, 2027 and 2028",
  description:
    "Every UK bank holiday for 2026, 2027 and 2028 in England, Wales, Scotland and Northern Ireland, with a planner to make the most of your annual leave.",
  alternates: { canonical: "/uk/life/bank-holidays" },
  openGraph: ogFor("/uk/life/bank-holidays"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/bank-holidays", label: "Bank Holidays" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How many bank holidays are there in the UK?", a: "8 a year in England and Wales, 9 in Scotland and 10 in Northern Ireland." },
  { q: "When is Easter 2027?", a: "Good Friday is 26 March 2027 and Easter Monday is 29 March 2027." },
  { q: "What happens if a bank holiday falls on a weekend?", a: "A substitute bank holiday is given on the next weekday." },
  { q: "Do I have a right to bank holidays off?", a: "No. Bank holidays can count towards your 5.6 weeks of statutory paid holiday, and your contract decides whether you work them." },
  { q: "Is Easter Monday a bank holiday in Scotland?", a: "No. Scotland has 2 January and St Andrew's Day instead, though some employers give Easter Monday off." },
  { q: "Is St Patrick's Day a bank holiday in England?", a: "No, only in Northern Ireland." },
  { q: "Do shops close on bank holidays?", a: "Most open, with shorter hours on some days. Large shops in England and Wales must close on Christmas Day and Easter Sunday." },
  { q: "Will there be extra bank holidays?", a: "Only if the government announces one, usually for a national event." },
  { q: "Is Christmas Eve a bank holiday?", a: "No. Christmas Eve and New Year's Eve are normal working days, though many employers close early." },
  { q: "When is the next bank holiday?", a: "The calculator shows the next one for your nation, counting from today." },
  { q: "Does a bank holiday count as a working day for notice periods?", a: "It depends on the contract or law involved. Many legal time limits count calendar days, not working days, so check the specific rule." },
  { q: "Can my employer make me take annual leave on a bank holiday?", a: "Yes, if your contract says bank holidays come out of your annual leave, or if they give you the right notice." },
];

export default async function BankHolidaysPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/life/days-between-dates", "/uk/tax-and-salary/holiday-entitlement", "/everyday/timesheet-decimal", "/uk/life/pro-rata-rent"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2025 to 2030"
      title="UK Bank Holidays"
      lead="See every bank holiday in England and Wales, Scotland and Northern Ireland, count the working days in a year, and plan your leave."
      points={["All three nations", "Next bank holiday", "Leave planner", "Free and private"]}
      guide={<BankHolidaysGuide />}
      faqs={FAQS}
      related={related}
      note="Dates follow GOV.UK. Future years can change."
    >
      <BankHolidaysStudio query={query} />
    </FlagshipPage>
  );
}

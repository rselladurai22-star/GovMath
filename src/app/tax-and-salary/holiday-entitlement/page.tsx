import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HolidayStudio from "./HolidayStudio";
import HolidayGuide from "./HolidayGuide";

export const metadata: Metadata = {
  title: "Holiday Entitlement Calculator (UK)",
  description:
    "Work out your statutory holiday in days or hours, for full-time, part-time, irregular-hours and part-year workers, plus holiday built up so far and what it is worth.",
  alternates: { canonical: "/tax-and-salary/holiday-entitlement" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/holiday-entitlement", label: "Holiday Entitlement" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much holiday am I entitled to?", a: "Almost all workers get 5.6 weeks of paid holiday a year. For a five-day week that is 28 days, which can include bank holidays. It is capped at 28 days however many days you work." },
  { q: "How much holiday do part-time workers get?", a: "The same 5.6 weeks, made up of your own working days. Three days a week gives 16.8 days a year." },
  { q: "How is holiday worked out for zero-hours workers?", a: "Workers with irregular hours build up holiday at 12.07% of the hours they work in each pay period, or receive rolled-up holiday pay of an extra 12.07% on each hour." },
  { q: "Do I get paid for holiday I have not taken when I leave?", a: "Yes. Your employer must pay you for statutory holiday you have built up but not taken by the time you leave." },
  { q: "Should holiday pay include overtime?", a: "For the first four weeks of statutory holiday, holiday pay should include regular overtime, commission and similar payments, averaged over the previous 52 paid weeks." },
];

export default async function HolidayPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/pro-rata", "/tax-and-salary/hourly-to-salary", "/tax-and-salary/overtime", "/life/bank-holidays", "/tax-and-salary/statutory-sick-pay", "/tax-and-salary/minimum-wage"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Current rules"
      title="Holiday Entitlement Calculator"
      lead="Your statutory holiday in days or hours, including part-time, irregular hours and part-year work."
      points={["Days, hours or irregular", "Part-year pro-rata", "What your holiday is worth", "Free and private"]}
      guide={<HolidayGuide />}
      faqs={FAQS}
      related={related}
      note="Based on the Working Time Regulations for England, Scotland and Wales; Northern Ireland has equivalent rules. Your contract may give more. Not legal advice."
    >
      <HolidayStudio query={query} />
    </FlagshipPage>
  );
}

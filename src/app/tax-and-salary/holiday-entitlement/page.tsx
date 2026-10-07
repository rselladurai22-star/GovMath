import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import HolidayStudio from "./HolidayStudio";
import { ogFor } from "@/gm/og";
import HolidayGuide from "./HolidayGuide";

export const metadata: Metadata = {
  title: "Holiday Entitlement Calculator UK",
  description:
    "Free holiday entitlement calculator. Work out statutory leave in days or hours for full-time, part-time, irregular-hours and part-year workers, and its value.",
  alternates: { canonical: "/tax-and-salary/holiday-entitlement" },
  openGraph: ogFor("/tax-and-salary/holiday-entitlement"),
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
  { q: "Do I get holiday on a zero-hours contract?", a: "Yes. You build up holiday at 12.07% of the hours you work, or receive rolled-up holiday pay if your employer uses that method." },
  { q: "Can my employer make me take holiday?", a: "Yes, if they give you notice of at least twice the length of the holiday. Many employers use this for a Christmas shutdown." },
  { q: "Are bank holidays on top of 28 days?", a: "Not by law. They can be part of the 28 days. Many employers give them on top, but that is a contract benefit." },
  { q: "What if I work more than five days a week?", a: "The legal minimum is capped at 28 days, so a six-day week still gives 28 days. Your contract may give more." },
  { q: "Can I take holiday during my notice period?", a: "Yes, if your employer agrees, and your employer can also require you to take holiday during notice if they give you enough notice. Any holiday left untaken at the end must be paid." },
  { q: "Do I build up holiday while on maternity leave?", a: "Yes. Statutory and contractual holiday continue to build up throughout maternity, paternity, adoption and shared parental leave, and you can take it before or after your leave." },
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

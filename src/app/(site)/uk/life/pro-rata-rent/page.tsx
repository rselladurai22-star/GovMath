import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { monthlyToWeeklyRent, proRataRent, weeklyToMonthlyRent } from "@/lib/life/everyday";
import { gbp } from "@/components/flagship/format";
import ProRataStudio from "./ProRataStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Rent Calculator: Daily, Weekly & Monthly Rent",
  description:
    "Free UK rent calculator. Work out daily rent, convert weekly rent to monthly, and pro rata rent for part of a month when you move in or out.",
  alternates: { canonical: "/uk/life/pro-rata-rent" },
  openGraph: ogFor("/uk/life/pro-rata-rent"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Renting & council tax" },
  { href: "/uk/life/pro-rata-rent", label: "Pro-Rata Rent" },
];

// Every figure in the text below comes from the engine: £1,200 a month throughout.
const RENT = 1200;
const YEARLY = proRataRent(RENT, "2026-10-20", "2026-10-31", "annual");
const OCT = proRataRent(RENT, "2026-10-20", "2026-10-31", "month");
const FEB = proRataRent(RENT, "2027-02-01", "2027-02-01", "month");
const LEAP = proRataRent(RENT, "2028-03-01", "2028-03-01", "annual");
const TEN_DAYS = proRataRent(1000, "2026-11-01", "2026-11-10", "annual");
const WEEKLY = 300;

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I work out daily rent?",
    a: `Multiply the monthly rent by 12 and divide by 365 (366 in a leap year). £1,000 a month is ${gbp(TEN_DAYS.dailyRate, true)} a day, so ten days cost ${gbp(TEN_DAYS.amount, true)}. For weekly rent, divide by 7.`,
  },
  {
    q: "How do I convert weekly rent to monthly?",
    a: `Multiply by 52 and divide by 12. ${gbp(WEEKLY)} a week is ${gbp(weeklyToMonthlyRent(WEEKLY))} a calendar month, not ${gbp(WEEKLY * 4)}. To go the other way, multiply the monthly rent by 12 and divide by 52: ${gbp(RENT)} a month is ${gbp(monthlyToWeeklyRent(RENT), true)} a week.`,
  },
  {
    q: "Is pro rata rent worked out on a 30-day month?",
    a: "Rarely. Most agreements use 365 days a year, and a few use the real number of days in the month. A flat 30 days overcharges in a 31-day month and undercharges in February, so ask for the calculation if you see it.",
  },
  {
    q: "Can a landlord ask for a full month up front if I move in mid-month?",
    a: "They can ask for up to one month's rent before you move in, and in England no more than that since 1 May 2026. It has to be used as your first month's rent. Many tenancies simply run from the day you move in, say the 15th of each month to the 14th, so there is no part month at all. A part-month charge only arises when the rent day is moved, usually to the 1st.",
  },
  {
    q: "How much is five weeks' rent for a deposit?",
    a: `Multiply the monthly rent by 12, divide by 52 and multiply by 5. On ${gbp(RENT)} a month that is ${gbp(monthlyToWeeklyRent(RENT) * 5, true)}. In England that is the most a landlord can take as a deposit when the yearly rent is under £50,000.`,
  },
];

const SOURCES = [
  { label: "GOV.UK: Tenant Fees Act 2019, guidance for tenants", href: "https://www.gov.uk/guidance/tenant-fees-act-2019-guidance-for-tenants" },
  { label: "Tenant Fees Act 2019, Schedule 1: how a week's rent is worked out", href: "https://www.legislation.gov.uk/ukpga/2019/4/schedule/1" },
  { label: "Shelter England: rent in advance", href: "https://england.shelter.org.uk/housing_advice/private_renting/rent_in_advance" },
  { label: "GOV.UK: assured periodic tenancies, information for tenants", href: "https://www.gov.uk/assured-periodic-tenancies-tenants" },
];

function Notes() {
  return (
    <>
      <h2>Two ways to get a daily rate</h2>
      <p>
        <strong>The 365-day method</strong>{" "}turns the rent into a yearly figure and divides by the days in the year. {gbp(RENT)} a month is {gbp(YEARLY.dailyRate, true)} a day, every day (
        {gbp(LEAP.dailyRate, true)} in a leap year).
      </p>
      <p>
        <strong>The calendar-month method</strong>{" "}divides the rent by the days in that particular month. The same {gbp(RENT)} is {gbp(OCT.dailyRate, true)} a day in October and{" "}
        {gbp(FEB.dailyRate, true)} in February.
      </p>
      <p>
        Over a few days the gap is small: 20 to 31 October comes to {gbp(YEARLY.amount, true)} one way and {gbp(OCT.amount, true)} the other.
      </p>

      <h2>Which one applies to you</h2>
      <p>
        No law sets the method. Look in your tenancy agreement for a clause on rent being &ldquo;apportioned&rdquo; or charged &ldquo;on a daily basis&rdquo;. If it is silent, the 365-day method
        is the one most letting agents use, and it is the safer one to quote in a dispute.
      </p>
      <p>
        Either way, only the odd days are pro-rated. Whole rent periods in between are charged at the normal rent.
      </p>

      <h2>Is the last day charged?</h2>
      <p>
        Yes. Rent covers every day of the tenancy, including the first and the last, which is why the calculator counts both dates. A tenancy that ends on the 14th is charged for the 14th.
      </p>
      <p>
        What matters is the day the tenancy ends, not the day you hand back the keys. If you leave early, rent normally runs to the end of your notice. Once you are out, the{" "}
        <Link href="/uk/property/deposit-return">deposit return calculator</Link>{" "}covers what can be taken from the deposit.
      </p>

      <h2>Weekly rent and five-week months</h2>
      <p>
        A month is longer than four weeks, so weekly rent × 4 understates a month&rsquo;s rent. Use × 52 ÷ 12. If you pay weekly, four months of most years have five rent days; nothing extra is
        owed, it is the same 52 payments.
      </p>
      <p>
        Benefits do the same conversion. Universal Credit turns a weekly rent into a monthly housing amount with × 52 ÷ 12, and{" "}
        <Link href="/uk/benefits/local-housing-allowance">Local Housing Allowance</Link>{" "}rates are set weekly. If your rent is about to change, the{" "}
        <Link href="/uk/property/rent-increase">rent increase checker</Link>{" "}shows whether the notice is valid.
      </p>
    </>
  );
}

export default async function ProRataPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/benefits/local-housing-allowance", "/uk/property/rent-increase", "/uk/property/deposit-return", "/uk/property/council-tax-bands", "/uk/property/single-person-discount"].includes(c.href));
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Rent Calculator"
      lead="Rent for part of a month when you move in or out, the daily rate behind it, and weekly rent as a monthly figure."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <ProRataStudio query={query} />
    </CalcPage>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import CalcPage from "@/components/calc/CalcPage";
import { CALCULATORS } from "@/lib/calculators";
import { proRata, statutoryHolidayDays, termTime } from "@/lib/tax/pro-rata";
import { computeTakeHome } from "@/lib/tax/take-home-engine";
import { gbp, percent } from "@/components/flagship/format";
import ProRataStudio from "./ProRataStudio";
import { ogFor } from "@/gm/og";

export const metadata: Metadata = {
  title: "Pro Rata Calculator: Salary, Hours & Holiday",
  description:
    "Free pro rata calculator for the UK. Convert a full-time salary to part-time hours or days, and see your pro rata take-home pay and holiday for 2026/27.",
  alternates: { canonical: "/uk/tax-and-salary/pro-rata" },
  openGraph: ogFor("/uk/tax-and-salary/pro-rata"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/benefits", label: "Benefits & family" },
  { href: "/uk/tax-and-salary/pro-rata", label: "Pro Rata" },
];

// Every figure below is worked out from the engines: a £40,000 full-time job of 37.5 hours over 5 days.
const SALARY = 40_000;
const TAX = { pensionPct: 0, plan: "none" as const, region: "ruk" as const, bonus: 0 };
const HOURS = proRata({ fullTimeSalary: SALARY, hours: 30, fullTimeHours: 37.5 });
const DAYS3 = proRata({ fullTimeSalary: SALARY, basis: "days", days: 3, fullTimeHolidayDays: 33 });
const HOURS_225 = proRata({ fullTimeSalary: SALARY, hours: 22.5, fullTimeHours: 37.5 });
const FULL_TH = computeTakeHome({ ...TAX, gross: SALARY }).takeHome;
const PART_TH = computeTakeHome({ ...TAX, gross: HOURS.salary }).takeHome;
const TERM = termTime(proRata({ fullTimeSalary: 30_000, hours: 37.5, fullTimeHours: 37.5 }).salary, 39);
const MIN3 = statutoryHolidayDays(3);
const FORTY = proRata({ fullTimeSalary: SALARY, hours: 30, fullTimeHours: 40 });
const EIGHT_HOUR_DAYS = proRata({ fullTimeSalary: SALARY, hours: 24, fullTimeHours: 37.5 });
const MIN6 = statutoryHolidayDays(6);
const HALF_YEAR = proRata({ fullTimeSalary: SALARY, hours: 37.5, fullTimeHours: 37.5, months: 6 });
const HALF_TH = computeTakeHome({ ...TAX, gross: HALF_YEAR.earnedThisYear });
const HALF_PAYROLL = computeTakeHome({ ...TAX, gross: SALARY }).takeHome / 2;

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is a pro rata salary the same as the salary I will be paid?",
    a: `Yes, before tax. A job advertised at "${gbp(SALARY)} pro rata" for 30 hours pays ${gbp(HOURS.salary)} a year, spread over 12 months as ${gbp(HOURS.salary / 12)}. The advertised figure is only the full-time rate used to work it out.`,
  },
  {
    q: "Do part-time workers get paid overtime at a higher rate?",
    a: "Not automatically. Extra hours up to the full-time week are usually paid at your normal hourly rate. The law only says you must not be treated less favourably than a full-timer, so premium overtime normally starts once you work beyond the full-time hours, the same point it would for them.",
  },
  {
    q: "Can I ask my employer to reduce my hours?",
    a: "Yes. Since April 2024 you can make a flexible working request from your first day, and up to two in any 12 months. Your employer must deal with it within 2 months and can only refuse for one of eight business reasons set in law, such as extra costs or a detrimental effect on meeting customer demand.",
  },
  {
    q: "Will going part-time affect my maternity pay or benefits?",
    a: "It can. Statutory Maternity Pay is 90% of your average earnings for the first 6 weeks, so a pay cut in the 8 weeks before the qualifying week lowers it. On Universal Credit, earning less raises your award by 55p for each £1 you lose, which softens a drop in hours.",
  },
  {
    q: "How is pro rata pay worked out when the full-time week is 40 hours rather than 37.5?",
    a: `Use the employer's own full-time hours, not a standard 37.5. Thirty hours is ${percent(HOURS.fte)} of a 37.5-hour week but ${percent(FORTY.fte)} of a 40-hour week, so on ${gbp(SALARY)} it is the difference between ${gbp(HOURS.salary)} and ${gbp(FORTY.salary)}. The contract or job advert says which applies.`,
  },
];

const SOURCES = [
  { label: "GOV.UK: part-time workers’ rights", href: "https://www.gov.uk/part-time-worker-rights" },
  { label: "GOV.UK: holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK: flexible working", href: "https://www.gov.uk/flexible-working" },
  { label: "Acas: checking holiday entitlement", href: "https://www.acas.org.uk/checking-holiday-entitlement" },
  { label: "GOV.UK: Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
];

function Notes() {
  return (
    <>
      <h2>Hours or days: use the one in your contract</h2>
      <p>
        Pro rata just means &ldquo;in proportion&rdquo;. Divide your hours by the full-time hours and multiply the salary: 30 of 37.5 hours is {percent(HOURS.fte)}, so a {gbp(SALARY)} job pays{" "}
        {gbp(HOURS.salary)}. 22.5 hours is {percent(HOURS_225.fte)}, or {gbp(HOURS_225.salary)}. If your contract is set in days, count days instead: 3 days of 5 is {percent(DAYS3.fte)}, or{" "}
        {gbp(DAYS3.salary)}.
      </p>
      <p>
        The two only differ when your days are shorter or longer than a full-timer&rsquo;s. Three days of 8 hours on a 37.5-hour week is 24 hours, {percent(EIGHT_HOUR_DAYS.fte)} of full time by hours but{" "}
        {percent(DAYS3.fte)} by days. Pay should follow the hours you actually work, so check which your employer uses.
      </p>

      <h2>You keep a bigger share than you give up</h2>
      <p>
        Income Tax and National Insurance take a smaller bite of a smaller salary, because your £12,570 Personal Allowance is the same whatever you earn. Working {percent(HOURS.fte)} of full time on{" "}
        {gbp(SALARY)} leaves you {gbp(PART_TH / 12)} a month after tax, against {gbp(FULL_TH / 12)} full time: {percent(PART_TH / FULL_TH)} of the take-home for {percent(HOURS.fte)} of the hours. If
        you claim <Link href="/uk/benefits/universal-credit">Universal Credit</Link>, the <Link href="/uk/benefits/universal-credit-taper">taper calculator</Link>{" "}shows how fewer hours change your
        award, and the <Link href="/uk/benefits/tax-free-childcare">Tax-Free Childcare calculator</Link>{" "}shows whether you still earn enough to qualify.
      </p>

      <h2>Holiday and bank holidays for part-timers</h2>
      <p>
        Everyone gets at least 5.6 weeks&rsquo; paid holiday, counted in your own working weeks. On 3 days a week that is {MIN3.toLocaleString("en-GB")} days; on 6 days it stops at {MIN6} days, the legal
        cap. Bank holidays can count towards it. Most employers pro-rate the full-time allowance, bank holidays included: 33 days full time becomes {DAYS3.holidayDays.toLocaleString("en-GB")} days on 3
        days a week.
      </p>
      <p>
        If you never work Mondays, you miss most bank holidays, and an employer that gives only the bank holidays that land on your days would treat you less favourably than a full-timer. Ask
        for your total allowance, bank holidays included, in days or hours, and book the bank holidays out of it when they fall on your days.
      </p>

      <h2>Term-time only and part-year jobs</h2>
      <p>
        School and college jobs often pay only for the weeks worked plus the holiday those weeks earn. Holiday for part-year workers builds up at 12.07% of the hours worked, so 39 weeks of work
        bring about {TERM.paidWeeks.toLocaleString("en-GB", { maximumFractionDigits: 1 })} weeks of pay. A {gbp(30_000)} full-time job worked full weeks in term pays about {gbp(TERM.salary)}, spread
        across 12 months. Many councils and schools pay more holiday than the minimum, so their own figure can be a little higher.
      </p>
      <p>
        Working only part of the tax year is different: you earn less, but keep a full year&rsquo;s Personal Allowance. If you work a {gbp(SALARY)} job from April to September and then stop, the six months should leave you{" "}
        {gbp(HALF_TH.takeHome)} after tax, but payroll taxes each month as if you earned all year and pays you about {gbp(HALF_PAYROLL)}; HMRC normally refunds the difference after 5 April. If you start part-way through instead, a cumulative tax code usually gives you the unused allowance in your first pay.
      </p>
    </>
  );
}

export default async function ProRataPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/benefits/universal-credit", "/uk/benefits/universal-credit-taper", "/uk/benefits/maternity-pay", "/uk/benefits/carers-earnings", "/uk/benefits/tax-free-childcare"].includes(c.href),
  );
  return (
    <CalcPage
      breadcrumbs={BREADCRUMBS}
      title="Pro Rata Salary Calculator"
      lead="A full-time salary turned into your part-time pay for the hours or days you work, with your pro rata holiday, a year and a month."
      notes={<Notes />}
      faqs={FAQS}
      sources={SOURCES}
      related={related}
    >
      <ProRataStudio query={query} />
    </CalcPage>
  );
}

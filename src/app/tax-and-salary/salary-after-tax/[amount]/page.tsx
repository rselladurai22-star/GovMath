import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AmountPage from "@/components/AmountPage";
import { Callout, DataTable, Guide, GuideSection, KeyStats, type Source, type TocItem } from "@/components/guide/Guide";
import { gbp, percent } from "@/components/flagship/format";
import { SALARY_AMOUNTS, neighbours, parseAmount, salaryFacts } from "@/lib/seo/amounts";
import { TAX_YEAR_2026_27 } from "@/lib/tax/2026-27";
import { ogFor } from "@/gm/og";

type Params = Promise<{ amount: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return SALARY_AMOUNTS.map((n) => ({ amount: String(n) }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const salary = parseAmount((await params).amount, SALARY_AMOUNTS);
  if (!salary) return {};
  const f = salaryFacts(salary);
  const path = `/tax-and-salary/salary-after-tax/${salary}`;
  return {
    title: `${gbp(salary)} After Tax UK 2026/27`,
    description: `${gbp(salary)} a year is ${gbp(f.monthly)} a month after tax in 2026/27: ${gbp(f.takeHome)} a year after ${gbp(f.tax)} Income Tax and ${gbp(f.ni)} NI. See Scotland, pension and student loan figures.`,
    alternates: { canonical: path },
    openGraph: ogFor("/tax-and-salary/salary-calculator"),
  };
}

const SOURCES: Source[] = [
  { label: "GOV.UK: Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK: National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
  { label: "GOV.UK: Scottish Income Tax rates", href: "https://www.gov.uk/scottish-income-tax" },
  { label: "GOV.UK: Repaying your student loan", href: "https://www.gov.uk/repaying-your-student-loan" },
];

const TOC: TocItem[] = [
  { id: "breakdown", title: "Where the money goes" },
  { id: "income-tax", title: "Income Tax band by band" },
  { id: "national-insurance", title: "National Insurance" },
  { id: "scotland", title: "In Scotland" },
  { id: "deductions", title: "With a pension or student loan" },
  { id: "rates", title: "Your tax rates" },
  { id: "hourly", title: "Per hour, day and week" },
  { id: "nearby", title: "Nearby salaries" },
];

const T = TAX_YEAR_2026_27;

/** What the marginal rate means at this salary. */
function rateNote(salary: number, marginal: number): string {
  const m = percent(marginal);
  if (salary <= T.ni.upperEarningsLimit)
    return `You are a basic rate taxpayer. Each extra £100 of salary costs you ${m} in Income Tax and National Insurance (20% tax and 8% NI), so you keep about £${Math.round(100 * (1 - marginal))}.`;
  if (salary < T.paTaperStart)
    return `Part of your salary is above ${gbp(T.ni.upperEarningsLimit)}, so it is taxed at the 40% higher rate, but National Insurance drops to 2% there. Each extra £100 costs ${m}, leaving about £${Math.round(100 * (1 - marginal))}. Paying more into a pension saves 40% tax on that slice.`;
  if (salary < T.paTaperEnd)
    return `Between ${gbp(T.paTaperStart)} and ${gbp(T.paTaperEnd)} you lose £1 of Personal Allowance for every £2 you earn, so each extra £100 costs ${m}: 40% tax, another 20% from the lost allowance and 2% NI. Pension contributions or Gift Aid that bring your income back to ${gbp(T.paTaperStart)} win the allowance back.`;
  return `Above ${gbp(T.paTaperEnd)} you have no Personal Allowance and pay the 45% additional rate. Each extra £100 costs ${m}, leaving about £${Math.round(100 * (1 - marginal))}.`;
}

export default async function SalaryAfterTaxPage({ params }: { params: Params }) {
  const salary = parseAmount((await params).amount, SALARY_AMOUNTS);
  if (!salary) notFound();
  const f = salaryFacts(salary);
  const s = gbp(salary);
  const scotDiff = f.takeHome - f.scotland.takeHome;
  const near = neighbours(salary, SALARY_AMOUNTS, 3);
  const calc = `/tax-and-salary/salary-calculator?salary=${salary}`;

  const faqs = [
    { q: `How much is ${s} after tax a month?`, a: `${gbp(f.monthly)} a month in England, Wales or Northern Ireland in 2026/27, with no pension or student loan. That is ${gbp(f.takeHome)} a year and ${gbp(f.weekly)} a week.` },
    { q: `How much tax do I pay on ${s}?`, a: `${gbp(f.tax)} Income Tax and ${gbp(f.ni)} National Insurance a year, ${gbp(f.tax + f.ni)} in total, or ${percent(f.effectiveRate, 1)} of your salary.` },
    { q: `What is ${s} after tax in Scotland?`, a: `${gbp(f.scotland.takeHome)} a year, or ${gbp(f.scotland.takeHome / 12)} a month. Scottish Income Tax is ${gbp(f.scotland.tax)}, ${scotDiff >= 0 ? `${gbp(scotDiff)} more` : `${gbp(-scotDiff)} less`} than in the rest of the UK; National Insurance is the same.` },
    { q: `What is ${s} an hour?`, a: `About ${gbp(f.hourlyGross, true)} an hour before tax, or ${gbp(f.hourlyNet, true)} after tax, based on 37.5 hours a week for 52 weeks.` },
    { q: `How much is ${s} after tax with a Plan 2 student loan?`, a: `${gbp(f.variants[2].takeHome)} a year (${gbp(f.variants[2].takeHome / 12)} a month), after ${gbp(f.variants[2].loan)} of student loan repayments.` },
  ];

  return (
    <AmountPage
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & salary" },
        { href: "/tax-and-salary/salary-after-tax", label: "Salary after tax" },
        { href: `/tax-and-salary/salary-after-tax/${salary}`, label: s },
      ]}
      title={`${s} after tax in 2026/27`}
      lead={`On a salary of ${s} you take home ${gbp(f.takeHome)} a year, or ${gbp(f.monthly)} a month, after ${gbp(f.tax)} Income Tax and ${gbp(f.ni)} National Insurance. Figures are for England, Wales and Northern Ireland, with Scotland below.`}
      summary={
        <KeyStats
          items={[
            { value: gbp(f.takeHome), label: "Take-home a year" },
            { value: gbp(f.monthly), label: "Take-home a month" },
            { value: gbp(f.weekly), label: "Take-home a week" },
            { value: percent(f.effectiveRate, 1), label: "Of your salary goes in tax and NI" },
          ]}
        />
      }
      cta={{ href: calc, label: `Add a pension, bonus or student loan to ${s}` }}
      faqs={faqs}
    >
      <Guide
        kicker="Explained"
        title={`${s} after tax: the breakdown`}
        intro={`How the ${gbp(f.takeHome)} is worked out, using the 2026/27 rates for an employee with the standard 1257L tax code.`}
        toc={TOC}
        sources={SOURCES}
      >
        <GuideSection id="breakdown" n={1} kicker="Your pay" title="Where the money goes">
          <DataTable
            head={["", "Year", "Month", "Week"]}
            numeric={[1, 2, 3]}
            rows={[
              ["Salary", gbp(salary), gbp(salary / 12), gbp(salary / 52)],
              ["Income Tax", gbp(f.tax), gbp(f.tax / 12), gbp(f.tax / 52)],
              ["National Insurance", gbp(f.ni), gbp(f.ni / 12), gbp(f.ni / 52)],
              [<strong key="t">Take-home pay</strong>, <strong key="y">{gbp(f.takeHome)}</strong>, <strong key="m">{gbp(f.monthly)}</strong>, <strong key="w">{gbp(f.weekly)}</strong>],
            ]}
          />
          <p>
            Out of every £100 you earn, you keep about £{Math.round(100 * (1 - f.effectiveRate))}. Your payslip may differ by a few pounds because payroll
            works each pay period separately.
          </p>
        </GuideSection>

        <GuideSection id="income-tax" n={2} kicker="Income Tax" title="Income Tax band by band">
          <p>
            {f.personalAllowance === T.personalAllowance
              ? `The first ${gbp(T.personalAllowance)} is your tax-free Personal Allowance. Income Tax is charged on the remaining ${gbp(Math.max(0, salary - f.personalAllowance))}.`
              : f.personalAllowance > 0
                ? `Because your income is over ${gbp(T.paTaperStart)}, your Personal Allowance shrinks from ${gbp(T.personalAllowance)} to ${gbp(f.personalAllowance)}.`
                : `Above ${gbp(T.paTaperEnd)} the Personal Allowance is lost completely, so all of your salary is taxed.`}
          </p>
          <DataTable
            head={["Band", "Rate", "Income in band", "Tax"]}
            numeric={[1, 2, 3]}
            rows={f.bands.map((b) => [b.label, percent(b.rate), gbp(b.income), gbp(b.tax)])}
          />
        </GuideSection>

        <GuideSection id="national-insurance" n={3} kicker="National Insurance" title="National Insurance">
          <p>
            Employees pay Class 1 National Insurance of 8% on earnings between {gbp(T.ni.primaryThreshold)} and {gbp(T.ni.upperEarningsLimit)} a year, and 2% above
            that. On {s} that comes to {gbp(f.ni)} a year, or {gbp(f.ni / 12)} a month. National Insurance is the same in every part of the UK, and you stop
            paying it once you reach State Pension age.
          </p>
        </GuideSection>

        <GuideSection id="scotland" n={4} kicker="Scotland" title={`${s} after tax in Scotland`}>
          <p>
            Scotland sets its own Income Tax bands. On {s} a Scottish taxpayer pays {gbp(f.scotland.tax)} Income Tax and takes home {gbp(f.scotland.takeHome)} a year
            ({gbp(f.scotland.takeHome / 12)} a month), {scotDiff >= 0 ? `${gbp(scotDiff)} less` : `${gbp(-scotDiff)} more`} than in the rest of the UK.
          </p>
          <DataTable
            head={["Band", "Rate", "Income in band", "Tax"]}
            numeric={[1, 2, 3]}
            rows={f.scotland.bands.map((b) => [b.label, percent(b.rate), gbp(b.income), gbp(b.tax)])}
          />
        </GuideSection>

        <GuideSection id="deductions" n={5} kicker="Deductions" title="With a pension or student loan">
          <p>
            Most employees pay into a workplace pension, and many repay a student loan. This is how they change take-home pay on {s}. A salary sacrifice
            pension is taken before tax and National Insurance, so it costs you less than its face value.
          </p>
          <DataTable
            head={["", "Pension", "Student loan", "Take-home a year", "A month"]}
            numeric={[1, 2, 3, 4]}
            rows={f.variants.map((v) => [v.label, gbp(v.pension), gbp(v.loan), gbp(v.takeHome), gbp(v.takeHome / 12)])}
          />
        </GuideSection>

        <GuideSection id="rates" n={6} kicker="Tax rates" title="Your tax rates">
          <KeyStats
            items={[
              { value: percent(f.effectiveRate, 1), label: "Average (effective) rate of tax and NI" },
              { value: percent(f.marginalRate), label: "Tax and NI on your next £1" },
            ]}
          />
          <p>{rateNote(salary, f.marginalRate)}</p>
          {salary > T.paTaperStart && salary < T.paTaperEnd && (
            <Callout tone="warn" title="The £100,000 tax trap">
              Earning over {gbp(T.paTaperStart)} can also end your family&rsquo;s Tax-Free Childcare and the extra funded childcare hours in England.
            </Callout>
          )}
        </GuideSection>

        <GuideSection id="hourly" n={7} kicker="Equivalents" title="Per hour, day and week">
          <DataTable
            head={["", "Before tax", "After tax"]}
            numeric={[1, 2]}
            rows={[
              ["Per hour (37.5 hours a week)", gbp(f.hourlyGross, true), gbp(f.hourlyNet, true)],
              ["Per day (5 days a week)", gbp(salary / 260, true), gbp(f.takeHome / 260, true)],
              ["Per week", gbp(salary / 52), gbp(f.weekly)],
              ["Per month", gbp(salary / 12), gbp(f.monthly)],
            ]}
          />
        </GuideSection>

        <GuideSection id="nearby" n={8} kicker="Compare" title="Nearby salaries">
          <DataTable
            head={["Salary", "Take-home a year", "A month"]}
            numeric={[1, 2]}
            rows={near.map((n) => {
              const g = salaryFacts(n);
              return [
                n === salary ? <strong key={n}>{gbp(n)}</strong> : <a key={n} href={`/tax-and-salary/salary-after-tax/${n}`}>{gbp(n)} after tax</a>,
                gbp(g.takeHome),
                gbp(g.monthly),
              ];
            })}
          />
          <p>
            See <Link href="/tax-and-salary/salary-after-tax">every salary from £15,000 to £250,000</Link>, or work out any figure with the{" "}
            <a href={calc}>salary calculator</a>.
          </p>
        </GuideSection>
      </Guide>
    </AmountPage>
  );
}

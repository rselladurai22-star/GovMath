import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AmountPage from "@/components/AmountPage";
import { Bars, Callout, DataTable, Guide, GuideSection, KeyStats, SERIES, type Source, type TocItem } from "@/components/guide/Guide";
import { gbp, percent } from "@/components/flagship/format";
import { AMOUNT_PAGES_LIVE, LENDING, PRICE_AMOUNTS, SALARY_AMOUNTS, nearestAtOrBelow, neighbours, parseAmount, salaryExtras, salaryFacts } from "@/lib/seo/amounts";
import { TAX_YEAR_2026_27 } from "@/lib/tax/2026-27";
import { ogFor } from "@/gm/og";

type Params = Promise<{ amount: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return AMOUNT_PAGES_LIVE ? SALARY_AMOUNTS.map((n) => ({ amount: String(n) })) : [];
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
  { label: "GOV.UK: High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "GOV.UK: Marriage Allowance", href: "https://www.gov.uk/marriage-allowance" },
  { label: "GOV.UK: National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "GOV.UK: Workplace pensions, what you and your employer pay", href: "https://www.gov.uk/workplace-pensions/what-you-your-employer-and-the-government-pay" },
];

const TOC: TocItem[] = [
  { id: "breakdown", title: "Where the money goes" },
  { id: "income-tax", title: "Income Tax band by band" },
  { id: "national-insurance", title: "National Insurance" },
  { id: "scotland", title: "In Scotland" },
  { id: "deductions", title: "With a pension or student loan" },
  { id: "student-loans", title: "Student loan by plan" },
  { id: "rates", title: "Your tax rates" },
  { id: "pay-rise", title: "A pay rise from here" },
  { id: "pension", title: "Paying more into a pension" },
  { id: "family", title: "Child Benefit and Marriage Allowance" },
  { id: "mortgage", title: "Buying a home" },
  { id: "employer", title: "What you cost your employer" },
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

/** What is special about this salary's tax position, in plain words. */
function positionNote(salary: number, x: ReturnType<typeof salaryExtras>): string {
  const s = gbp(salary);
  if (salary < x.nlwFullTime)
    return `${s} is less than a full-time job pays at the National Living Wage (${gbp(x.nlwFullTime)} for 37.5 hours a week in 2026/27), so it is most often a part-time salary: at the minimum rate it is about ${Math.round(x.nlwHoursPerWeek)} hours a week. Almost all of it is taxed at the 20% basic rate after the tax-free allowance, and on a low income you may be able to get Universal Credit on top.`;
  if (salary < 30_000)
    return `${s} is above full-time National Living Wage pay (${gbp(x.nlwFullTime)}) but below £30,000. Everything above the ${gbp(T.personalAllowance)} allowance is taxed at the basic rate, so the 28% combined rate of tax and NI applies to every extra pound. Student loan repayments start around here: Plan 5 from £25,000, Plan 1 from £26,900 and Plan 2 from £29,385.`;
  if (salary <= T.ni.upperEarningsLimit)
    return `${s} is in the basic rate band, which runs to ${gbp(T.ni.upperEarningsLimit)}. You keep 72p of each extra pound (less if you are repaying a student loan), and you qualify to receive Marriage Allowance if your partner earns under ${gbp(T.personalAllowance)}.`;
  if (salary <= 60_000)
    return `${s} takes you into the 40% higher rate on the ${gbp(salary - T.ni.upperEarningsLimit)} above ${gbp(T.ni.upperEarningsLimit)}, but National Insurance falls to 2% on that slice, so each extra pound costs 42p. Pension contributions now save 40% tax on the top slice.`;
  if (salary <= 80_000)
    return `${s} is in the band where the High Income Child Benefit Charge takes back 1% of Child Benefit for every £200 of income above £60,000. If you get Child Benefit, the effective rate on your next pound is higher than the 42% of tax and NI. A pension contribution of ${gbp(salary - 60_000)} would bring you back to £60,000.`;
  if (salary <= T.paTaperStart)
    return `${s} is a higher rate salary above the Child Benefit charge band: anyone claiming Child Benefit on this income repays all of it through the charge. Each extra pound costs 42p in tax and NI until ${gbp(T.paTaperStart)}, where the Personal Allowance starts to go.`;
  if (salary < T.paTaperEnd)
    return `${s} is inside the £100,000 to ${gbp(T.paTaperEnd)} band where the Personal Allowance is withdrawn, the steepest band in the UK system. Your income is also too high for Tax-Free Childcare and the working-parent funded childcare hours in England.`;
  return `${s} is above ${gbp(T.paTaperEnd)}, so you have no Personal Allowance and the 45% additional rate applies above that point. Your pension annual allowance may also be tapered if your adjusted income, which includes employer pension contributions, is over £260,000.`;
}

export default async function SalaryAfterTaxPage({ params }: { params: Params }) {
  const salary = parseAmount((await params).amount, SALARY_AMOUNTS);
  if (!AMOUNT_PAGES_LIVE || !salary) notFound();
  const f = salaryFacts(salary);
  const s = gbp(salary);
  const scotDiff = f.takeHome - f.scotland.takeHome;
  const near = neighbours(salary, SALARY_AMOUNTS, 3);
  const calc = `/tax-and-salary/salary-calculator?salary=${salary}`;
  const x = salaryExtras(salary);
  const homePrice = nearestAtOrBelow(x.mortgage.priceWith10, PRICE_AMOUNTS);
  const cb1 = x.childBenefit[0];
  const cb2 = x.childBenefit[1];

  const faqs = [
    { q: `How much is ${s} after tax a month?`, a: `${gbp(f.monthly)} a month in England, Wales or Northern Ireland in 2026/27, with no pension or student loan. That is ${gbp(f.takeHome)} a year and ${gbp(f.weekly)} a week.` },
    { q: `How much tax do I pay on ${s}?`, a: `${gbp(f.tax)} Income Tax and ${gbp(f.ni)} National Insurance a year, ${gbp(f.tax + f.ni)} in total, or ${percent(f.effectiveRate, 1)} of your salary.` },
    { q: `What is ${s} after tax in Scotland?`, a: `${gbp(f.scotland.takeHome)} a year, or ${gbp(f.scotland.takeHome / 12)} a month. Scottish Income Tax is ${gbp(f.scotland.tax)}, ${scotDiff >= 0 ? `${gbp(scotDiff)} more` : `${gbp(-scotDiff)} less`} than in the rest of the UK; National Insurance is the same.` },
    { q: `What is ${s} an hour?`, a: `About ${gbp(f.hourlyGross, true)} an hour before tax, or ${gbp(f.hourlyNet, true)} after tax, based on 37.5 hours a week for 52 weeks.` },
    { q: `How much does a ${s} employee cost the employer?`, a: `About ${gbp(x.employer.total)} a year: ${gbp(x.employer.ni)} employer National Insurance (15% above £5,000) and at least ${gbp(x.employer.pension)} of workplace pension (3% of qualifying earnings), before the Employment Allowance.` },
    { q: `How much mortgage can I get on ${s}?`, a: `Most lenders lend about ${LENDING.multiple} times income, so roughly ${gbp(x.mortgage.loan)} on ${s} alone. At ${LENDING.ratePct}% over ${LENDING.termYears} years that costs ${gbp(x.mortgage.monthly)} a month. Lenders also check your spending and credit record.` },
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
          <Bars
            items={[
              { label: "Take-home pay", value: f.takeHome, color: SERIES[0] },
              { label: "Income Tax", value: f.tax, color: SERIES[1] },
              { label: "National Insurance", value: f.ni, color: SERIES[2] },
            ]}
            format={(n) => gbp(n)}
          />
          <p>{positionNote(salary, x)}</p>
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

        <GuideSection id="student-loans" n={6} kicker="Student loans" title="Student loan repayments by plan">
          <p>
            Student loan repayments are 9% of your income above your plan&rsquo;s threshold (6% above £21,000 for a Postgraduate Loan), taken through
            payroll. The plan depends on where and when you started your course.
          </p>
          <DataTable
            head={["Plan", "Threshold", "A year", "A month"]}
            numeric={[1, 2, 3]}
            rows={x.loans.map((l) => [l.label, gbp(l.threshold), gbp(l.yearly), gbp(l.monthly)])}
          />
          <p>
            {x.loans.every((l) => l.yearly === 0)
              ? `On ${s} you are below every repayment threshold, so nothing is taken for a student loan this year.`
              : `On ${s} a Plan 2 graduate repays ${gbp(x.loans[1].yearly)} a year and a Plan 5 graduate ${gbp(x.loans[3].yearly)}.`}{" "}
            See how long your balance lasts with the <a href="/students/plan-2-student-loan">Plan 2 loan calculator</a>.
          </p>
        </GuideSection>
        <GuideSection id="rates" n={7} kicker="Tax rates" title="Your tax rates">
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

        <GuideSection id="pay-rise" n={8} kicker="Pay rise" title="A pay rise from here">
          <p>
            A £1,000 rise on {s} adds {gbp(x.rise1000)} to your take-home pay a year ({gbp(x.rise1000 / 12)} a month). A 5% rise, worth{" "}
            {gbp(x.rise5pct.rise)}, adds {gbp(x.rise5pct.extra)} a year after tax and NI, or {gbp(x.rise5pct.extra / 12)} a month.
          </p>
          <KeyStats
            items={[
              { value: gbp(x.rise1000), label: "Kept from a £1,000 rise" },
              { value: gbp(x.rise5pct.extra), label: `Kept from a 5% rise (${gbp(x.rise5pct.rise)})` },
            ]}
          />
          <p>
            The <a href="/tax-and-salary/pay-rise">pay rise calculator</a> also checks the rise against inflation and the Child Benefit charge.
          </p>
        </GuideSection>

        <GuideSection id="pension" n={9} kicker="Pension" title="Paying more into a pension">
          <p>
            Paying an extra £100 a month into a workplace pension by salary sacrifice reduces your take-home pay by only {gbp(x.pension100)} a month on {s},
            because the money is taken before Income Tax and National Insurance. The rest is tax and NI you no longer pay.
          </p>
          {salary > T.ni.upperEarningsLimit ? (
            <Callout tone="good" title="Higher rate relief">
              Contributions that come off income above {gbp(T.ni.upperEarningsLimit)} save 40% Income Tax{salary > T.paTaperStart ? ", and above £100,000 they also win back Personal Allowance" : ""}. The{" "}
              <a href="/investing/pension-tax-relief">pension tax relief calculator</a> compares salary sacrifice, net pay and relief at source.
            </Callout>
          ) : (
            <p>
              Compare salary sacrifice with the other ways of paying in using the <a href="/investing/pension-tax-relief">pension tax relief calculator</a>.
            </p>
          )}
        </GuideSection>

        <GuideSection id="family" n={10} kicker="Family" title="Child Benefit and Marriage Allowance">
          <DataTable
            head={["Children", "Child Benefit a year", "Charge on " + s, "You keep"]}
            numeric={[1, 2, 3]}
            rows={x.childBenefit.map((c) => [String(c.children), gbp(c.benefit), gbp(c.charge), gbp(c.keep)])}
          />
          <p>
            {cb1.charge === 0
              ? `Your income is under £60,000, so the High Income Child Benefit Charge does not apply: a family with two children keeps all ${gbp(cb2.benefit)}.`
              : cb1.keep === 0
                ? `Your income is over £80,000, so the charge takes back all the Child Benefit. It can still be worth claiming (or claiming and opting out of payments) to protect a non-working partner's State Pension record.`
                : `The charge takes back ${gbp(cb1.charge)} of ${gbp(cb1.benefit)} for one child. Paying ${gbp(x.pensionToAvoidCharge)} more into a pension would bring your adjusted net income down to £60,000 and remove the charge.`}{" "}
            Check your own family with the <a href="/benefits/child-benefit">Child Benefit calculator</a>.
          </p>
          <p>
            {x.marriageGain > 0
              ? `If you are married or in a civil partnership and your partner earns under ${gbp(T.personalAllowance)}, they can transfer £1,260 of their Personal Allowance to you through Marriage Allowance, cutting your tax by ${gbp(x.marriageGain)} a year.`
              : salary > T.ni.upperEarningsLimit
                ? `Marriage Allowance is not available on ${s}, because the person receiving it must be a basic rate taxpayer.`
                : `Marriage Allowance would save nothing on ${s}, because your income is within your own allowance.`}{" "}
            The <a href="/tax-and-salary/marriage-allowance">Marriage Allowance calculator</a> includes up to four backdated years.
          </p>
        </GuideSection>

        <GuideSection id="mortgage" n={11} kicker="Mortgage" title={`Buying a home on ${s}`}>
          <p>
            Most lenders offer around {LENDING.multiple} times income. On {s} alone that is about {gbp(x.mortgage.loan)}, which with a 10% deposit buys a home
            of about {gbp(x.mortgage.priceWith10)}. At {LENDING.ratePct}% over {LENDING.termYears} years the repayments are {gbp(x.mortgage.monthly)} a month,{" "}
            {percent(x.mortgage.shareOfTakeHome)} of your take-home pay.
          </p>
          <KeyStats
            items={[
              { value: gbp(x.mortgage.loan), label: `Borrowing at ${LENDING.multiple} times salary` },
              { value: gbp(x.mortgage.monthly), label: `A month at ${LENDING.ratePct}% over ${LENDING.termYears} years` },
            ]}
          />
          <p>
            Lenders also look at your spending, debts and credit record, and some lend more to higher earners. See the{" "}
            <a href={`/property/stamp-duty-on/${homePrice}`}>Stamp Duty on a {gbp(homePrice)} home</a>, or test your own figures with the{" "}
            <a href="/property/mortgage-affordability">mortgage affordability calculator</a>.
          </p>
        </GuideSection>

        <GuideSection id="employer" n={12} kicker="Employer" title="What you cost your employer">
          <DataTable
            head={["", "A year"]}
            numeric={[1]}
            rows={[
              ["Salary", gbp(salary)],
              ["Employer National Insurance (15% above £5,000)", gbp(x.employer.ni)],
              ["Minimum employer pension (3% of qualifying earnings)", gbp(x.employer.pension)],
              [<strong key="t">Total cost</strong>, <strong key="v">{gbp(x.employer.total)}</strong>],
            ]}
          />
          <p>
            So a {s} job costs the employer about {gbp(x.employer.total)}, while you take home {gbp(f.takeHome)}. Small employers can set the £10,500 Employment
            Allowance against their NI bill. The <a href="/business/employer-ni-costs">employer cost calculator</a> works out a whole team.
          </p>
        </GuideSection>

        <GuideSection id="hourly" n={13} kicker="Equivalents" title="Per hour, day and week">
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
          <p>
            At the National Living Wage of £12.71 an hour (age 21 and over), {s} is the pay for about {Math.round(x.nlwHoursPerWeek)} hours a week all year.
            {f.hourlyGross < 12.71 ? " At 37.5 hours a week it works out below the minimum wage, so it must be a part-time salary for anyone 21 or over." : ""}
          </p>
        </GuideSection>

        <GuideSection id="nearby" n={14} kicker="Compare" title="Nearby salaries">
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

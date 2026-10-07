import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Hourly rate ↔ salary — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "formula", title: "The conversion in one line" },
  { id: "rates-table", title: "Common hourly rates as salaries" },
  { id: "weeks", title: "52 weeks or fewer?" },
  { id: "salary-to-hourly", title: "Turning a salary into an hourly rate" },
  { id: "take-home", title: "What you take home" },
  { id: "overtime", title: "Overtime and extra hours" },
  { id: "minimum-wage", title: "Minimum wage rates" },
  { id: "day-rates", title: "Daily rates and contractors" },
  { id: "working-time", title: "What counts as working time" },
  { id: "variable-hours", title: "Variable and zero-hours work" },
  { id: "job-offers", title: "Comparing two job offers" },
  { id: "full-table", title: "Hourly rates to salaries: full table" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "GOV.UK — Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK — Overtime: your rights", href: "https://www.gov.uk/overtime-your-rights" },
  { label: "GOV.UK — Maximum weekly working hours", href: "https://www.gov.uk/maximum-weekly-working-hours" },
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
];

export default function HourlyGuide() {
  return (
    <Guide
      kicker="The hourly pay guide"
      title="Hourly rates and salaries, explained"
      intro={
        <>
          Job adverts mix hourly rates, day rates and annual salaries, which makes offers hard to compare. This guide
          shows how to convert between them properly, what you actually take home, and the details that change the
          answer: paid holiday, <a href="/tax-and-salary/overtime">overtime</a>{" "}and the minimum wage. All figures are for 2026/27.
        </>
      }
      meta={["2026/27 tax year", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="formula" n={1} kicker="The basics" title="The conversion in one line">
        <p>To turn an hourly rate into a yearly salary, multiply three numbers together:</p>
        <p>
          <strong>Hourly rate × hours a week × paid weeks a year = yearly pay</strong>
        </p>
        <p>
          For most employees the number of paid weeks is 52, because paid holiday and bank holidays are part of the
          salaried year. So £15 an hour for a 37.5-hour week is £15 × 37.5 × 52 = £29,250 a year.
        </p>
        <WorkedExample
          title="Worked example: £15 an hour, 37.5 hours a week"
          steps={[
            { label: "Hours in a week", value: "37.5" },
            { label: "Pay for a week", note: "£15 × 37.5", value: "£562.50" },
            { label: "Paid weeks in a year", value: "52" },
            { label: "Pay for a month", note: "£29,250 ÷ 12", value: "£2,437.50" },
          ]}
          total={{ label: "Pay for a year", value: "£29,250" }}
        />
        <p>
          Monthly pay is the yearly figure divided by 12, not four weeks of pay. Four weeks is only 48 weeks a year, so
          multiplying weekly pay by four understates a month by about 8%.
        </p>
      </GuideSection>

      <GuideSection id="rates-table" n={2} kicker="Quick reference" title="Common hourly rates as salaries">
        <p>
          Here are common hourly rates converted for a full-time 37.5-hour week, with take-home pay for someone in
          England, Wales or Northern Ireland with no pension or student loan deductions.
        </p>
        <DataTable
          caption="Hourly rate to salary, 37.5 hours a week, 52 paid weeks, 2026/27"
          head={["Hourly rate", "Yearly pay", "Monthly pay", "Take-home a month"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£12.71 (National Living Wage)", "£24,784.50", "£2,065.38", "£1,780.37"],
            ["£15.00", "£29,250.00", "£2,437.50", "£2,048.30"],
            ["£20.00", "£39,000.00", "£3,250.00", "£2,633.30"],
            ["£25.00", "£48,750.00", "£4,062.50", "£3,218.30"],
            ["£30.00", "£58,500.00", "£4,875.00", "£3,707.28"],
          ]}
        />
        <Figure label="Yearly pay at 37.5 hours a week">
          <Bars
            items={[
              { label: "£12.71 an hour", value: 24784.5 },
              { label: "£15 an hour", value: 29250 },
              { label: "£20 an hour", value: 39000 },
              { label: "£25 an hour", value: 48750 },
              { label: "£30 an hour", value: 58500 },
            ]}
          />
        </Figure>
        <p>
          A quick mental shortcut for a 37.5-hour week: double the hourly rate and add three noughts, then subtract
          about 2.5%. £20 an hour becomes £40,000, less 2.5%, which is £39,000.
        </p>
      </GuideSection>

      <GuideSection id="weeks" n={3} kicker="Holiday" title="52 weeks or fewer?">
        <p>
          Almost every worker in the UK is entitled to <strong>5.6 weeks of paid holiday</strong> a year. That is 28
          days for someone working five days a week, and employers can include bank holidays in it. Because that time
          off is paid, a salaried employee is paid for all 52 weeks, and 52 is the right number to use.
        </p>
        <p>
          Use fewer weeks when time off is <strong>not</strong> paid. That applies mainly to <a href="/tax-and-salary/ir35-take-home">contractors</a>, freelancers
          and some agency workers paid only for the hours they work.
        </p>
        <CompareCards
          columns={[
            {
              name: "Employee, £25 an hour",
              rows: [
                { label: "Hours a week", value: "37.5" },
                { label: "Paid weeks", value: "52" },
                { label: "Holiday", value: "Paid" },
                { label: "Yearly pay", value: "£48,750" },
              ],
            },
            {
              name: "Contractor, £25 an hour",
              rows: [
                { label: "Hours a week", value: "37.5" },
                { label: "Paid weeks", value: "47" },
                { label: "Holiday", value: "Unpaid" },
                { label: "Yearly pay", value: "£44,062.50" },
              ],
            },
          ]}
        />
        <p>
          The same hourly rate is worth almost £4,700 less a year to the contractor, before thinking about sick pay,
          pension contributions or the employer&rsquo;s National Insurance an employee never sees. This is why
          contractor rates are usually higher than the equivalent employee rate.
        </p>
        <Callout title="Rolled-up holiday pay for irregular hours">
          Since April 2024, employers can pay workers with irregular hours or part-year contracts an extra 12.07% on
          each hour instead of paying them during their holiday. If your rate includes this, use the full rate and 52
          weeks, or the basic rate and fewer weeks; not both.
        </Callout>
      </GuideSection>

      <GuideSection id="salary-to-hourly" n={4} kicker="The reverse" title="Turning a salary into an hourly rate">
        <p>Going the other way, divide the salary by the hours you are paid for in a year:</p>
        <p>
          <strong>Yearly salary ÷ (hours a week × 52) = hourly rate</strong>
        </p>
        <DataTable
          caption="Salary to hourly rate, 37.5 hours a week"
          head={["Salary", "Hours a year", "Hourly rate"]}
          numeric={[1, 2]}
          rows={[
            ["£25,000", "1,950", "£12.82"],
            ["£30,000", "1,950", "£15.38"],
            ["£40,000", "1,950", "£20.51"],
            ["£50,000", "1,950", "£25.64"],
            ["£75,000", "1,950", "£38.46"],
          ]}
        />
        <p>
          Comparing jobs with different hours can change the picture. A £32,000 job with a 40-hour week pays £15.38 an
          hour, exactly the same as a £30,000 job with a 37.5-hour week. If you value your time, compare hourly rates as
          well as salaries.
        </p>
        <p>
          Unpaid lunch breaks are not counted in your contracted hours. If you are at work from 9am to 5.30pm with an
          unpaid hour for lunch, you are paid for 7.5 hours a day and 37.5 a week.
        </p>
      </GuideSection>

      <GuideSection id="take-home" n={5} kicker="After tax" title="What you take home">
        <p>
          Hourly workers pay Income Tax and National Insurance exactly as salaried workers do. Your employer works out
          tax on each payment, based on how much you have earned so far in the tax year.
        </p>
        <WorkedExample
          title="Worked example: take-home on £15 an hour, 37.5 hours a week"
          steps={[
            { label: "Yearly pay", value: "£29,250.00" },
            { label: "Income Tax", note: "(£29,250 − £12,570) × 20%", value: "−£3,336.00" },
            { label: "National Insurance", note: "(£29,250 − £12,570) × 8%", value: "−£1,334.40" },
            { label: "Take-home a month", note: "£24,579.60 ÷ 12", value: "£2,048.30" },
          ]}
          total={{ label: "Take-home for each hour worked", value: "£12.60" }}
        />
        <p>
          On a basic-rate salary, 28p of each extra pound goes in Income Tax and NI, so you keep 72p. That rises to 42p
          above £50,270, and the calculator shows your own rate when you add a pension or student loan.
        </p>
        <p>
          If your hours vary a lot from week to week, your tax and NI will vary too. NI in particular is worked out on
          each payment, so a week with lots of overtime can attract more NI than an even spread of the same hours.
        </p>
      </GuideSection>

      <GuideSection id="overtime" n={6} kicker="Extra hours" title="Overtime and extra hours">
        <p>
          There is no legal right to a higher overtime rate. Time and a half (1.5 times) and double time (2 times) are
          common, but your contract decides. The legal requirements are narrower:
        </p>
        <ul>
          <li>Your average pay for all hours worked must not fall below the minimum wage.</li>
          <li>
            Most adults cannot be made to work more than 48 hours a week on average, usually measured over 17 weeks,
            unless they opt out in writing.
          </li>
          <li>
            Regular overtime usually has to be included in holiday pay for the first four weeks of <a href="/tax-and-salary/holiday-entitlement">statutory holiday</a>.
          </li>
        </ul>
        <p>
          In the calculator, add your overtime hours and rate under More options. The result includes it in your yearly
          pay and your take-home. Our overtime calculator goes further, showing what each extra hour is worth after tax.
        </p>
      </GuideSection>

      <GuideSection id="minimum-wage" n={7} kicker="The legal floor" title="Minimum wage rates from April 2026">
        <DataTable
          caption="National Minimum Wage and National Living Wage, from 1 April 2026"
          head={["Age or status", "Hourly rate", "37.5 hours, 52 weeks"]}
          numeric={[1, 2]}
          rows={[
            ["21 and over (National Living Wage)", "£12.71", "£24,784.50"],
            ["18 to 20", "£10.85", "£21,157.50"],
            ["16 to 17", "£8.00", "£15,600.00"],
            ["Apprentice (under 19 or first year)", "£8.00", "£15,600.00"],
          ]}
        />
        <p>
          The calculator checks your rate against the minimum for your age. If you are paid less, money your employer
          deducts for things like uniforms can make it worse, so check our minimum wage checker and speak to Acas if
          something looks wrong.
        </p>
      </GuideSection>

      <GuideSection id="day-rates" n={8} kicker="Day rates" title="Daily rates and contractors">
        <p>
          A <a href="/business/day-rate">day rate</a>{" "}converts the same way. Divide the yearly figure by paid weeks and by the days you work each week.
          On £29,250 for a five-day week, that is £29,250 ÷ 52 ÷ 5 = £112.50 a day.
        </p>
        <p>
          Contractors working through their own limited company are paid differently: no employer pays NI or holiday on
          their behalf, and how they are taxed depends on IR35. A contractor charging £400 a day for 46 weeks of 5
          days bills £92,000 a year, but that is not comparable to a £92,000 salary. Our IR35 calculator compares the
          two properly.
        </p>
      </GuideSection>

      <GuideSection id="working-time" n={9} kicker="Hours" title="What counts as working time">
        <p>
          An hourly rate is only meaningful if the hours are counted properly. For the minimum wage and for your own
          comparisons, working time generally includes:
        </p>
        <ul>
          <li>Time you spend doing your job, including training your employer requires.</li>
          <li>
            Travel between jobs or appointments during the day, for example care workers going from one client to the
            next. Travel from home to your normal workplace does not count.
          </li>
          <li>Time on call when you must be at or near the workplace and ready to work.</li>
          <li>Paid breaks, if your contract pays them.</li>
        </ul>
        <p>
          It does not usually include unpaid lunch breaks, your <a href="/vehicles/commuter-comparison">commute</a>, or time asleep on a sleep-in shift when you are
          only required to be available. If unpaid tasks such as opening up, cashing up or changing into a uniform are
          required, that time can count, and it can take your real hourly rate below the minimum wage.
        </p>
        <WorkedExample
          title="Worked example: unpaid extra time on £13 an hour"
          steps={[
            { label: "Paid hours a week", value: "37.5" },
            { label: "Weekly pay", note: "£13 × 37.5", value: "£487.50" },
            { label: "Unpaid but required time", note: "15 minutes before and after each shift, 5 days", value: "2.5 hours" },
            { label: "Real hourly rate", note: "£487.50 ÷ 40", value: "£12.19" },
          ]}
          total={{ label: "Below the £12.71 National Living Wage by", value: "£0.52 an hour" }}
        />
      </GuideSection>

      <GuideSection id="variable-hours" n={10} kicker="Irregular work" title="Variable and zero-hours work">
        <p>
          If your hours change from week to week, a single conversion can mislead. Work out an average over a longer
          period, ideally 12 weeks or more, and use that as your hours a week in the calculator.
        </p>
        <p>Some rules are worth knowing if your hours vary:</p>
        <ul>
          <li>
            <strong>Holiday</strong> for irregular-hours workers builds up at 12.07% of the hours you work. Your employer
            can either give you paid time off or add 12.07% to every hour as rolled-up holiday pay.
          </li>
          <li>
            <strong><a href="/tax-and-salary/statutory-sick-pay">Statutory Sick Pay</a></strong> is paid from the first day of sickness from April 2026, and the minimum
            earnings test has gone. It is 80% of your average weekly earnings or £123.25, whichever is lower.
          </li>
          <li>
            <strong>Tax</strong> on uneven pay evens out over the year for Income Tax, but National Insurance is worked
            out on each payment. A run of very busy weeks can mean slightly more NI than steady hours would.
          </li>
          <li>
            <strong>Universal Credit</strong> adjusts each month to what you were actually paid, so it can smooth out
            some of the ups and downs.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="job-offers" n={11} kicker="Decisions" title="Comparing two job offers">
        <p>
          Salaries are easier to compare once you turn them into hourly rates. Here are two offers that look different
          at first glance:
        </p>
        <CompareCards
          columns={[
            {
              name: "Job A",
              rows: [
                { label: "Salary", value: "£31,000" },
                { label: "Hours a week", value: "40" },
                { label: "Hours a year", value: "2,080" },
                { label: "Hourly rate", value: "£14.90" },
              ],
            },
            {
              name: "Job B",
              rows: [
                { label: "Salary", value: "£29,500" },
                { label: "Hours a week", value: "35" },
                { label: "Hours a year", value: "1,820" },
                { label: "Hourly rate", value: "£16.21" },
              ],
            },
          ]}
        />
        <p>
          Job A pays £1,500 more a year, but Job B pays £1.31 more for every hour, and gives you 260 hours of your life
          back. Before deciding, also compare holiday, employer pension contributions, commuting time and costs, and
          whether overtime is paid. A job with a 10% employer pension contribution is worth several thousand pounds a
          year more than one paying the 3% minimum.
        </p>
      </GuideSection>

      <GuideSection id="full-table" n={12} kicker="Reference" title="Hourly rates to salaries: full table">
        <p>
          The table below converts more hourly rates for a 37.5-hour week with 52 paid weeks. Take-home pay assumes
          England, Wales or Northern Ireland, a standard tax code, and no pension or student loan deductions.
        </p>
        <DataTable
          caption="Hourly rate to yearly, monthly and take-home pay, 2026/27"
          head={["Hourly rate", "Yearly pay", "Monthly pay", "Take-home a month"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£13.00", "£25,350.00", "£2,112.50", "£1,814.30"],
            ["£14.00", "£27,300.00", "£2,275.00", "£1,931.30"],
            ["£16.00", "£31,200.00", "£2,600.00", "£2,165.30"],
            ["£17.00", "£33,150.00", "£2,762.50", "£2,282.30"],
            ["£18.00", "£35,100.00", "£2,925.00", "£2,399.30"],
            ["£19.00", "£37,050.00", "£3,087.50", "£2,516.30"],
            ["£21.00", "£40,950.00", "£3,412.50", "£2,750.30"],
            ["£22.00", "£42,900.00", "£3,575.00", "£2,867.30"],
            ["£24.00", "£46,800.00", "£3,900.00", "£3,101.30"],
            ["£26.00", "£50,700.00", "£4,225.00", "£3,330.28"],
            ["£28.00", "£54,600.00", "£4,550.00", "£3,518.78"],
            ["£35.00", "£68,250.00", "£5,687.50", "£4,178.53"],
            ["£40.00", "£78,000.00", "£6,500.00", "£4,649.78"],
          ]}
        />
        <p>
          Notice how take-home grows more slowly from £26 an hour upwards. That is where yearly pay passes £50,270 and
          the extra pay is taxed at 40% instead of 20%.
        </p>
      <p>
          If you work part-time, the <a href="/tax-and-salary/pro-rata">pro rata salary calculator</a> scales a full-time salary to your hours, and the <a href="/life/timesheet-decimal">timesheet calculator</a> adds up a week of start and finish times.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12.71", label: "National Living Wage, 21 and over" },
            { value: "£10.85", label: "Minimum wage, 18 to 20" },
            { value: "5.6 weeks", label: "Statutory paid holiday a year" },
            { value: "1,950", label: "Hours a year at 37.5 hours a week" },
            { value: "48 hours", label: "Average weekly limit unless you opt out" },
            { value: "12.07%", label: "Rolled-up holiday pay for irregular hours" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

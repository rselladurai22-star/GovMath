import {
  Bars,
  Callout,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Overtime pay — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "rates", title: "How overtime is paid" },
  { id: "hourly-rate", title: "Finding your basic hourly rate" },
  { id: "tax", title: "How overtime is taxed" },
  { id: "kept", title: "What you keep at each salary" },
  { id: "one-off", title: "Regular or one-off overtime" },
  { id: "rights", title: "Your rights" },
  { id: "pensions", title: "Overtime, pensions and benefits" },
  { id: "is-it-worth-it", title: "Is the extra hour worth it?" },
  { id: "unpaid", title: "Unpaid overtime" },
  { id: "premiums", title: "Shift, night and weekend premiums" },
  { id: "payslip", title: "Checking overtime on your payslip" },
  { id: "rate-table", title: "Overtime rates at common hourly rates" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Overtime: your rights", href: "https://www.gov.uk/overtime-your-rights" },
  { label: "GOV.UK — Maximum weekly working hours", href: "https://www.gov.uk/maximum-weekly-working-hours" },
  { label: "GOV.UK — Holiday pay: the basics", href: "https://www.gov.uk/holiday-entitlement-rights/holiday-pay-the-basics" },
  { label: "GOV.UK — National Minimum Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "GOV.UK — Rates and thresholds for employers 2026 to 2027", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
];

export default function OvertimeGuide() {
  return (
    <Guide
      kicker="The overtime guide"
      title="Overtime pay and tax, explained"
      intro={
        <>
          Overtime looks simple: more hours, more pay. But the rate you are paid, the tax band you are in and whether the
          overtime is regular all change what an extra hour is really worth. This guide works through each of them with
          2026/27 figures, so you can decide whether that extra shift is worth taking.
        </>
      }
      meta={["2026/27 tax year", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="rates" n={1} kicker="Overtime rates" title="How overtime is paid">
        <p>
          Overtime is any work beyond your contracted hours. How it is paid depends entirely on your contract. There is
          no legal right to a higher rate, but these patterns are common:
        </p>
        <DataTable
          caption="Common overtime rates"
          head={["Name", "Multiplier", "On a £16 basic rate"]}
          numeric={[1, 2]}
          rows={[
            ["Plain time", "1×", "£16.00 an hour"],
            ["Time and a quarter", "1.25×", "£20.00 an hour"],
            ["Time and a half", "1.5×", "£24.00 an hour"],
            ["Double time", "2×", "£32.00 an hour"],
          ]}
        />
        <p>
          Many employers use different rates for different times, for example time and a half on weekdays and double
          time on Sundays and bank holidays. The calculator lets you add a second rate under More options.
        </p>
        <p>
          Some contracts offer <strong>time off in lieu</strong> (TOIL) instead of pay, and salaried roles often say
          that reasonable extra hours are included in the salary. Check your contract or staff handbook.
        </p>
      </GuideSection>

      <GuideSection id="hourly-rate" n={2} kicker="The base" title="Finding your basic hourly rate">
        <p>If you are salaried, overtime is usually based on an hourly rate worked out from your salary:</p>
        <p>
          <strong>Hourly rate = yearly salary ÷ (contracted hours a week × 52)</strong>
        </p>
        <WorkedExample
          title="Worked example: £32,000 salary, 37.5 hours, 10 hours a month at time and a half"
          steps={[
            { label: "Hours paid a year", note: "37.5 × 52", value: "1,950" },
            { label: "Basic hourly rate", note: "£32,000 ÷ 1,950", value: "£16.41" },
            { label: "Overtime rate", note: "£16.41 × 1.5", value: "£24.62" },
          ]}
          total={{ label: "Overtime pay a month, before tax", value: "£246.15" }}
        />
        <p>
          Some employers divide by a different number of hours, such as 52.14 weeks, or use a figure set out in a
          collective agreement. The differences are small, but your payslip will follow your employer&rsquo;s method.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={3} kicker="Tax" title="How overtime is taxed">
        <p>
          Overtime is taxed like the rest of your pay. There is no separate overtime tax, but because overtime sits on
          top of your normal pay, it is taxed at your <strong>highest</strong> rate.
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> is cumulative across the year. Regular overtime raises your income for the whole
            year, so the extra tax is spread evenly.
          </li>
          <li>
            <strong>National Insurance</strong> is worked out on each payment. For monthly pay you pay 8% between £1,048
            and £4,189 in the month, then 2%. Overtime that takes a month above £4,189 is charged mostly at 2%.
          </li>
          <li>
            <strong>Student loan</strong> repayments are also worked out on each payment, at 9% of pay above the monthly
            threshold (£2,448.75 for Plan 2).
          </li>
        </ul>
        <WorkedExample
          title="Worked example: tax on £246.15 of overtime, £32,000 salary"
          steps={[
            { label: "Overtime pay", value: "£246.15" },
            { label: "Income Tax at 20%", value: "−£49.23" },
            { label: "National Insurance at 8%", value: "−£19.69" },
            { label: "Student loan (Plan 2, if you have one)", note: "9% of the overtime", value: "−£22.15" },
          ]}
          total={{ label: "Kept without a student loan", value: "£177.23" }}
        />
      </GuideSection>

      <GuideSection id="kept" n={4} kicker="By salary" title="What you keep at each salary">
        <p>
          Here is the same 10 hours a month at time and a half, paid every month, at different salaries in England,
          Wales or Northern Ireland:
        </p>
        <DataTable
          caption="10 hours a month at time and a half, paid every month, 2026/27"
          head={["Salary", "Overtime pay", "You keep", "Kept an hour"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£32,000", "£246.15", "£177.23", "£17.72"],
            ["£60,000", "£461.54", "£267.69", "£26.77"],
            ["£95,000", "£730.77", "£361.03", "£36.10"],
          ]}
        />
        <Figure label="Share of overtime pay you keep">
          <Bars
            items={[
              { label: "£32,000 salary", value: 72 },
              { label: "£60,000 salary", value: 58 },
              { label: "£95,000 salary", value: 49.4 },
            ]}
            format={(n) => `${n}%`}
          />
        </Figure>
        <p>
          At £95,000, regular overtime takes the year&rsquo;s income above £100,000, where the tax-free allowance is
          withdrawn. Part of the overtime is then taxed at an effective 60%, so less than half reaches your bank
          account.
        </p>
        <Callout title="Scotland">
          Scottish taxpayers move into the 42% band at £43,663 rather than £50,270, so overtime is taxed more heavily
          between those two figures. Set where you live under More options.
        </Callout>
      </GuideSection>

      <GuideSection id="one-off" n={5} kicker="Timing" title="Regular or one-off overtime">
        <p>
          If you work overtime only occasionally, it behaves like a small bonus: the month it is paid shows the extra
          Income Tax all at once, and the NI and student loan for that month only. Over a full year the Income Tax comes
          out the same as if the overtime had been spread evenly.
        </p>
        <p>
          For most basic-rate taxpayers there is little difference. It matters more when a single month&rsquo;s
          overtime pushes that month&rsquo;s pay above the NI upper limit of £4,189, or above the student loan threshold
          when your normal pay is below it. Switch between regular and one-off in the calculator to see your figures.
        </p>
        <Callout tone="warn" title="Emergency tax codes">
          If you are on an emergency code (with W1, M1 or X), payroll taxes each payment on its own, and overtime can be
          over-taxed. Any overpayment is refunded through your tax code or after the tax year ends.
        </Callout>
      </GuideSection>

      <GuideSection id="rights" n={6} kicker="The law" title="Your rights">
        <ul>
          <li>
            <strong>Minimum wage.</strong> Your total pay divided by all the hours you work, overtime included, must not
            fall below the minimum wage. From April 2026 that is £12.71 an hour if you are 21 or over.
          </li>
          <li>
            <strong>Working time.</strong> Most workers cannot be required to work more than 48 hours a week on
            average, normally measured over 17 weeks, unless they have opted out in writing. Under-18s cannot work more
            than 8 hours a day or 40 hours a week.
          </li>
          <li>
            <strong>Compulsory or voluntary.</strong> You only have to work overtime if your contract says so. Refusing
            voluntary overtime should not lead to unfair treatment.
          </li>
          <li>
            <strong>Holiday pay.</strong> Regular overtime usually has to be included when your holiday pay is worked
            out for the first four weeks of statutory leave, based on the previous 52 weeks.
          </li>
          <li>
            <strong>Part-time workers</strong> are usually paid their normal rate until they have worked more than
            full-time hours, and the overtime rate after that.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="pensions" n={7} kicker="Knock-on effects" title="Overtime, pensions and benefits">
        <p>
          Whether your pension contribution is taken from overtime depends on the scheme. Many auto-enrolment schemes
          use &ldquo;qualifying earnings&rdquo;, which include overtime, so the same percentage comes off. Others only
          use basic salary. If a contribution is taken by salary sacrifice it also reduces the tax and NI on the
          overtime.
        </p>
        <p>
          Regular overtime can affect means-tested benefits. Universal Credit is assessed on what you are paid each
          month, so a month with lots of overtime usually means a lower award, and very high earnings can carry into
          later months. Overtime can also take your income past £60,000, where Child Benefit starts to be clawed back.
        </p>
      </GuideSection>

      <GuideSection id="is-it-worth-it" n={8} kicker="Decisions" title="Is the extra hour worth it?">
        <p>
          The figure that matters is what you keep for each hour. A basic-rate taxpayer on £32,000 working time and a
          half keeps about £17.72 an hour. That is more than their basic hourly rate before tax, so overtime is
          genuinely well paid. Above £100,000 it can fall below half of the gross rate.
        </p>
        <p>Before committing to regular overtime, it is worth thinking about:</p>
        <ul>
          <li>Travel, childcare or meal costs that only arise because of the extra hours.</li>
          <li>Whether paying more into your pension would keep you below a threshold.</li>
          <li>How the hours affect sleep, health and the rest of your week.</li>
        </ul>
      </GuideSection>

      <GuideSection id="unpaid" n={9} kicker="Unpaid hours" title="Unpaid overtime">
        <p>
          Many salaried people work beyond their contracted hours without extra pay. That is legal if your contract
          allows it, but it quietly lowers your real hourly rate.
        </p>
        <WorkedExample
          title="Worked example: £40,000 salary, 37.5 hours, 5 unpaid extra hours a week"
          steps={[
            { label: "Contracted hourly rate", note: "£40,000 ÷ (37.5 × 52)", value: "£20.51" },
            { label: "Hours actually worked a year", note: "42.5 × 52", value: "2,210" },
            { label: "Real hourly rate", note: "£40,000 ÷ 2,210", value: "£18.10" },
          ]}
          total={{ label: "Effective pay cut", value: "11.8%" }}
        />
        <p>
          For lower earners, unpaid overtime can be unlawful. On a £26,000 salary for 37.5 hours, the hourly rate is
          £13.33. Add five unpaid hours a week and it falls to £11.76, below the £12.71 National Living Wage. The
          minimum wage is checked against all the hours you work, so your employer would owe you the difference.
        </p>
        <Callout title="Keep a record">
          If you regularly work unpaid hours, note your start and finish times. It helps if you ever need to raise a
          minimum wage or working time concern, or ask for a pay review.
        </Callout>
      </GuideSection>

      <GuideSection id="premiums" n={10} kicker="Premiums" title="Shift, night and weekend premiums">
        <p>
          Premiums for working unsocial hours are different from overtime. They are paid on contracted hours that fall at
          particular times, such as nights, weekends or bank holidays, whether or not you go over your normal hours.
        </p>
        <ul>
          <li>Common premiums range from an extra 10% to double time, depending on the sector and agreement.</li>
          <li>There is no legal right to a premium for nights or weekends, or for working on a bank holiday.</li>
          <li>
            Night workers have extra protections: on average no more than 8 hours in each 24, and a free health
            assessment before starting night work.
          </li>
          <li>Regular premiums usually count towards holiday pay, in the same way as regular overtime.</li>
        </ul>
        <p>
          To model a premium in the calculator, enter the premium hours as a second overtime rate under More options.
        </p>
      </GuideSection>

      <GuideSection id="payslip" n={11} kicker="Payslips" title="Checking overtime on your payslip">
        <p>Overtime is often paid a month in arrears, so hours worked in March may appear on April&rsquo;s payslip. To check it:</p>
        <ul>
          <li>Find the overtime hours and the rate shown, and check the rate is your basic hourly rate times the multiplier.</li>
          <li>Make sure the hours match your own record, including any second rate for Sundays or bank holidays.</li>
          <li>
            Check the tax for the month has risen by roughly your top rate times the overtime pay: 20%, 40% or more.
          </li>
          <li>
            Expect National Insurance to rise by 8% of the overtime, or less if the month&rsquo;s pay goes above £4,189.
          </li>
          <li>If you have a student loan, expect 9% of the overtime to go in repayments if the month is above the threshold.</li>
        </ul>
        <p>
          If something is missing, raise it with payroll quickly. Most employers correct underpaid overtime on the next
          payslip. You can claim unpaid wages through an employment tribunal, normally within three months less one day
          of the deduction.
        </p>
      </GuideSection>

      <GuideSection id="rate-table" n={12} kicker="Reference" title="Overtime rates at common hourly rates">
        <DataTable
          caption="Overtime rates before tax"
          head={["Basic rate", "Time and a half", "Double time"]}
          numeric={[1, 2]}
          rows={[
            ["£12.71 (National Living Wage)", "£19.07", "£25.42"],
            ["£15.00", "£22.50", "£30.00"],
            ["£18.00", "£27.00", "£36.00"],
            ["£20.00", "£30.00", "£40.00"],
            ["£25.00", "£37.50", "£50.00"],
            ["£30.00", "£45.00", "£60.00"],
          ]}
        />
        <p>
          After Income Tax and National Insurance, a basic-rate taxpayer keeps 72% of these figures and a higher-rate
          taxpayer 58%. So time and a half on £20 an hour is worth £21.60 after tax at the basic rate, and £17.40 at the
          higher rate.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "1.5×", label: "Time and a half: the most common overtime rate" },
            { value: "£1,048 / £4,189", label: "Monthly NI thresholds: 8% between, 2% above" },
            { value: "£50,270", label: "40% band starts (England, Wales and NI)" },
            { value: "£100,000", label: "Tax-free allowance starts to shrink" },
            { value: "48 hours", label: "Average weekly limit unless you opt out" },
            { value: "£12.71", label: "National Living Wage, 21 and over" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

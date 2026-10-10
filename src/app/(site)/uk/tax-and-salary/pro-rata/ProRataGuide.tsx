import {
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Bars,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Pro-rata pay — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "meaning", title: "What pro-rata means" },
  { id: "worked-example", title: "A worked example" },
  { id: "hours-or-days", title: "Hours, days and compressed weeks" },
  { id: "take-home", title: "Why part-time keeps more" },
  { id: "holiday", title: "Pro-rata holiday" },
  { id: "part-year", title: "Starting or leaving mid-year" },
  { id: "rights", title: "Your rights as a part-time worker" },
  { id: "checks", title: "Before you accept a part-time offer" },
  { id: "term-time", title: "Term-time and annualised contracts" },
  { id: "pension-pay", title: "Pensions, sick pay and parental pay" },
  { id: "rises", title: "Pay rises, bonuses and extra hours" },
  { id: "salary-table", title: "Three and four days at common salaries" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Part-time workers’ rights", href: "https://www.gov.uk/part-time-worker-rights" },
  { label: "GOV.UK — Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK — Flexible working", href: "https://www.gov.uk/flexible-working" },
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — Claim a tax refund", href: "https://www.gov.uk/claim-tax-refund" },
];

export default function ProRataGuide() {
  return (
    <Guide
      kicker="The pro-rata pay guide"
      title="Pro-rata pay, explained clearly"
      intro={
        <>
          Part-time jobs are often advertised with a full-time salary followed by &ldquo;pro rata&rdquo;. That figure is
          not what you will be paid. This guide shows how pro-rata pay and holiday are worked out, why your take-home
          falls by less than your hours, and what changes if you start or leave part-way through the tax year.
        </>
      }
      meta={["2026/27 tax year", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="meaning" n={1} kicker="The basics" title="What pro-rata means">
        <p>
          <em>Pro rata</em>{" "}is Latin for &ldquo;in proportion&rdquo;. A salary quoted as &ldquo;£40,000 pro rata&rdquo;
          is the full-time equivalent (FTE): what you would earn working the full-time hours. Your actual pay is that
          figure scaled down to the hours or days you work.
        </p>
        <p>
          <strong>Pro-rata salary = full-time salary × (your hours ÷ full-time hours)</strong>
        </p>
        <p>
          The fraction in brackets is your <strong>FTE</strong>. Working 30 hours where full time is 37.5 is 0.8 FTE, or
          80%. Your hourly rate stays exactly the same as a full-time colleague&rsquo;s: you are simply paid for fewer
          hours.
        </p>
      </GuideSection>

      <GuideSection id="worked-example" n={2} kicker="Example" title="A worked example">
        <WorkedExample
          title="£40,000 pro rata, 30 hours a week, full time is 37.5"
          steps={[
            { label: "Your share of full time", note: "30 ÷ 37.5", value: "80%" },
            { label: "Pro-rata salary", note: "£40,000 × 80%", value: "£32,000" },
            { label: "Monthly before tax", note: "£32,000 ÷ 12", value: "£2,666.67" },
            { label: "Income Tax for the year", note: "(£32,000 − £12,570) × 20%", value: "£3,886.00" },
            { label: "National Insurance for the year", note: "(£32,000 − £12,570) × 8%", value: "£1,554.40" },
          ]}
          total={{ label: "Take-home a month", value: "£2,213.30" }}
        />
        <p>
          The full-time salary of £40,000 would take home £2,693.30 a month. So by working 80% of the hours, you keep
          about 82% of the full-time take-home pay. Section 4 explains why.
        </p>
      </GuideSection>

      <GuideSection id="hours-or-days" n={3} kicker="Patterns" title="Hours, days and compressed weeks">
        <p>
          Some employers express part-time work in days rather than hours. Three days of a five-day week is 0.6 FTE, so
          £40,000 pro rata becomes £24,000. The calculator lets you switch between hours and days.
        </p>
        <p>
          Watch out for <strong>compressed hours</strong>. Working 37.5 hours over four longer days is still full time,
          not 0.8 FTE, and you should be paid the full salary. What matters is the hours you work, not the number of
          days you spread them over.
        </p>
        <DataTable
          caption="£40,000 pro rata at common part-time patterns, 37.5-hour full-time week"
          head={["Pattern", "FTE", "Yearly pay", "Monthly before tax"]}
          numeric={[1, 2, 3]}
          rows={[
            ["16 hours a week", "43%", "£17,066.67", "£1,422.22"],
            ["22.5 hours (3 days)", "60%", "£24,000.00", "£2,000.00"],
            ["25 hours", "67%", "£26,666.67", "£2,222.22"],
            ["30 hours (4 days)", "80%", "£32,000.00", "£2,666.67"],
            ["37.5 hours over 4 days", "100%", "£40,000.00", "£3,333.33"],
          ]}
        />
      </GuideSection>

      <GuideSection id="take-home" n={4} kicker="After tax" title="Why part-time workers keep more of their pay">
        <p>
          Income Tax and National Insurance both start with a tax-free amount: the first £12,570 a year. That allowance
          does not shrink when you go part-time. On a smaller salary, it covers a bigger share of your pay, so your
          overall tax rate is lower.
        </p>
        <Figure label="Share of gross pay kept after Income Tax and NI, 2026/27">
          <Bars
            items={[
              { label: "£17,067 (16 hours)", value: 92.6 },
              { label: "£24,000 (3 days)", value: 86.7 },
              { label: "£32,000 (30 hours)", value: 83.0 },
              { label: "£40,000 (full time)", value: 80.8 },
            ]}
            format={(n) => `${n.toFixed(1)}%`}
          />
        </Figure>
        <p>
          At higher salaries the effect can be much larger. Someone earning £110,000 full time who drops to 0.9 FTE
          (£99,000) gets their full Personal Allowance back and steps out of the 60% band. Their gross pay falls by
          £11,000 but their take-home falls by only about £4,380.
        </p>
        <Callout title="Very low hours">
          If your pay is under £12,570 a year you pay no Income Tax, and under £242 a week no National Insurance. Above
          £129 a week (£6,708 a year) the year still counts towards your State Pension even though you pay no NI.
        </Callout>
      </GuideSection>

      <GuideSection id="holiday" n={5} kicker="Holiday" title="Pro-rata holiday">
        <p>
          Everyone who works is entitled to 5.6 weeks of paid holiday a year. A week of holiday means the hours or days
          you normally work in a week, so part-time workers get the same number of weeks off, made up of their own
          working days.
        </p>
        <CompareCards
          columns={[
            {
              name: "Full time, 5 days",
              rows: [
                { label: "Statutory minimum", value: "28 days" },
                { label: "Typical contract", value: "25 days + 8 bank holidays" },
                { label: "Total", value: "33 days" },
              ],
            },
            {
              name: "Part time, 3 days",
              rows: [
                { label: "Statutory minimum", value: "16.8 days" },
                { label: "Pro-rata of 33 days", value: "19.8 days" },
                { label: "Weeks off", value: "6.6 weeks either way" },
              ],
            },
          ]}
        />
        <p>
          Bank holidays catch people out. If your days off happen to include Mondays, you will benefit from most bank
          holidays; if you never work Mondays, you will not. Fair employers pro-rate bank holidays into your total
          entitlement and let you book them like any other day. Part-time staff must not be treated less favourably,
          so a scheme that gives full-timers bank holidays and part-timers nothing is unlawful.
        </p>
        <p>
          Many employers record part-time holiday in hours, which avoids confusion when your days are different
          lengths. The calculator shows both.
        </p>
      </GuideSection>

      <GuideSection id="part-year" n={6} kicker="Part years" title="Starting or leaving part-way through the tax year">
        <p>
          The tax year runs from 6 April to 5 April. If you start a job in October, you will only earn about half a
          year&rsquo;s salary before 5 April, but your full £12,570 tax-free allowance is still available for the year.
        </p>
        <p>
          Payroll uses your tax code to give you a share of the allowance each month. If you had no income earlier in
          the year and your new employer has your <a href="/uk/tax-and-salary/p45-p60-explainer">P45</a>, the tax should already be close to right. If you are on an
          emergency code, or you took time off between jobs, you may overpay. HMRC normally sorts this out
          automatically after the tax year ends, or you can claim a refund sooner.
        </p>
        <WorkedExample
          title="Starting a £32,000 pro-rata job in October (6 months this tax year)"
          steps={[
            { label: "Earnings before 5 April", note: "£32,000 × 6 ÷ 12", value: "£16,000" },
            { label: "Income Tax for the year", note: "(£16,000 − £12,570) × 20%", value: "£686" },
            { label: "Income Tax if the full year were taxed", note: "Half of £3,886", value: "£1,943" },
          ]}
          total={{ label: "Possible refund if overtaxed", value: "up to £1,257" }}
        />
        <p>
          The refund only applies if you had no other taxable income earlier in the year, such as a previous job, so the
          real amount varies. Holiday is pro-rated by the months you work too: start halfway through the holiday year
          and you are entitled to roughly half the year&rsquo;s holiday.
        </p>
      </GuideSection>

      <GuideSection id="rights" n={7} kicker="The law" title="Your rights as a part-time worker">
        <p>
          The Part-time Workers Regulations protect you from being treated less favourably than a comparable full-time
          colleague, unless the employer can justify it. In practice that means:
        </p>
        <ul>
          <li>The same hourly rate of pay, including <a href="/uk/tax-and-salary/overtime">overtime</a>{" "}once you work more than full-time hours.</li>
          <li>Pro-rata holiday, sick pay, maternity and <a href="/uk/benefits/paternity-pay">paternity pay</a>{" "}and pension contributions.</li>
          <li>The same access to training, promotion and career breaks.</li>
          <li>Fair treatment in <a href="/uk/tax-and-salary/redundancy">redundancy</a>{" "}selection.</li>
        </ul>
        <p>
          Since April 2024 you can ask for flexible working, including part-time hours, from your first day in a job,
          and make two requests a year. Your employer must consider the request and give a decision within two months.
        </p>
      </GuideSection>

      <GuideSection id="checks" n={8} kicker="Checklist" title="Before you accept a part-time offer">
        <ul>
          <li>
            <strong>Confirm the full-time hours</strong> the pro-rata figure is based on. A £40,000 job based on 35 hours
            pays more per hour than one based on 40.
          </li>
          <li>
            <strong>Ask for the actual salary in writing</strong>, not just the pro-rata figure.
          </li>
          <li>
            <strong>Check how holiday is recorded</strong>, especially bank holidays.
          </li>
          <li>
            <strong>Check pension contributions</strong>: employer contributions are usually a percentage of your actual
            pay, so they fall too. Auto-enrolment only applies above £10,000 a year, though you can still ask to join.
          </li>
          <li>
            <strong>Think about benefits</strong>: a lower salary may increase Universal Credit or let you keep more
            Child Benefit.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="term-time" n={9} kicker="Term time" title="Term-time and annualised contracts">
        <p>
          Many school and college staff work only during term time but are paid in twelve equal monthly instalments.
          Their pay is pro-rated twice: once for hours, and again for the weeks of the year they are paid for.
        </p>
        <p>
          The usual method counts the weeks you work plus your paid holiday, then divides by the number of weeks in a
          year, typically 52.14. The exact figures depend on your employer, and local authorities often publish their own.
        </p>
        <WorkedExample
          title="Worked example: term-time role, 39 working weeks, 30 hours a week"
          steps={[
            { label: "Full-time salary", value: "£30,000" },
            { label: "Hours fraction", note: "30 ÷ 37", value: "81.1%" },
            { label: "Paid weeks", note: "39 working weeks + 5.6 weeks holiday", value: "44.6" },
            { label: "Weeks fraction", note: "44.6 ÷ 52.14", value: "85.5%" },
          ]}
          total={{ label: "Actual yearly pay (paid over 12 months)", value: "£20,807" }}
        />
        <p>
          Annualised-hours contracts work in a similar way: you agree to work a set number of hours over the year, perhaps
          more in busy months and fewer in quiet ones, and are paid the same each month. Your FTE is your yearly hours
          divided by the full-time yearly hours.
        </p>
      </GuideSection>

      <GuideSection id="pension-pay" n={10} kicker="Benefits at work" title="Pensions, sick pay and parental pay">
        <p>
          <strong>Workplace pensions.</strong> You are automatically enrolled if you earn over £10,000 a year and are
          aged between 22 and State Pension age. If you earn between £6,240 and £10,000 you can ask to join and your
          employer must still contribute. Below £6,240 you can ask to join, but the employer does not have to pay in.
          Contributions are usually a percentage of your actual pay, so they are pro-rated automatically.
        </p>
        <p>
          <strong><a href="/uk/tax-and-salary/statutory-sick-pay">Statutory Sick Pay</a>.</strong> From April 2026 SSP is paid from your first day off sick and there is no
          minimum earnings level. It is the lower of 80% of your average weekly earnings or £123.25 a week, which helps
          many part-timers who previously earned too little to qualify.
        </p>
        <p>
          <strong>Maternity, paternity and shared parental pay.</strong> Statutory pay needs average earnings of at least
          £129 a week. It is 90% of your average weekly earnings for the first six weeks of maternity pay, then the lower
          of £194.32 or 90%. Part-timers on lower pay often receive 90% of earnings throughout.
        </p>
        <Callout title="Enhanced company schemes">
          If your employer offers better-than-statutory sick, maternity or paternity pay to full-time staff, part-timers
          should get the same scheme, pro-rated to their pay.
        </Callout>
      </GuideSection>

      <GuideSection id="rises" n={11} kicker="Changes" title="Pay rises, bonuses and extra hours">
        <p>
          A percentage pay rise applies to your pro-rata salary in the same way as to a full-time salary, so a 4% rise on
          £32,000 is £1,280. Bonuses based on a percentage of salary are normally calculated on your actual pay, not the
          full-time equivalent.
        </p>
        <p>
          If you work extra hours, you are usually paid at your normal hourly rate until you reach full-time hours. These
          are sometimes called additional hours rather than overtime. Overtime rates, such as time and a half, normally
          only start once you work more than a full-time week.
        </p>
        <p>
          If you regularly work more than your contract says, ask your employer to update it. A higher contracted FTE
          raises your <a href="/uk/tax-and-salary/holiday-entitlement">holiday entitlement</a>, your pension contributions and any statutory pay based on your earnings.
        </p>
      </GuideSection>

      <GuideSection id="salary-table" n={12} kicker="Reference" title="Three and four days at common salaries">
        <p>
          Three days a week is 60% of a five-day job, and four days is 80%. Here is what that means for common full-time
          salaries, with monthly take-home for someone in England, Wales or Northern Ireland and no pension or student
          loan.
        </p>
        <DataTable
          caption="Pro-rata pay at 3 and 4 days a week, 2026/27"
          head={["Full-time salary", "3 days", "4 days", "Take-home a month, 3 days", "Take-home a month, 4 days"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£25,000", "£15,000", "£20,000", "£1,193", "£1,493"],
            ["£30,000", "£18,000", "£24,000", "£1,373", "£1,733"],
            ["£35,000", "£21,000", "£28,000", "£1,553", "£1,973"],
            ["£45,000", "£27,000", "£36,000", "£1,913", "£2,453"],
            ["£60,000", "£36,000", "£48,000", "£2,453", "£3,173"],
          ]}
        />
        <p>
          On £45,000, dropping from four days to three cuts gross pay by £9,000 a year but monthly take-home by only £540,
          about £6,480 a year.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Tax-free Personal Allowance for the year" },
            { value: "£242 a week", label: "National Insurance starts" },
            { value: "£129 a week", label: "Earnings that still count for State Pension" },
            { value: "5.6 weeks", label: "Statutory paid holiday, pro-rated for part-timers" },
            { value: "£10,000", label: "Auto-enrolment pension earnings trigger" },
            { value: "Day one", label: "Right to request flexible working" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

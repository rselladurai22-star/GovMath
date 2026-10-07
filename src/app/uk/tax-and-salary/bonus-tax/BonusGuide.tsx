import {
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  StepChart,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Bonus tax — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "income-tax", title: "Income Tax on a bonus" },
  { id: "national-insurance", title: "National Insurance on a bonus" },
  { id: "student-loan", title: "Student loan on a bonus" },
  { id: "thresholds", title: "Bonuses that cross a threshold" },
  { id: "pension", title: "Paying a bonus into your pension" },
  { id: "timing", title: "Does timing matter?" },
  { id: "benefits", title: "Bonuses, benefits and Child Benefit" },
  { id: "checks", title: "Checking your bonus payslip" },
  { id: "bonus-or-rise", title: "A bonus or a pay rise?" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK — Rates and thresholds for employers 2026 to 2027", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK — Salary sacrifice for employers", href: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
  { label: "GOV.UK — Repaying your student loan", href: "https://www.gov.uk/repaying-your-student-loan" },
  { label: "GOV.UK — High Income Child Benefit Charge", href: "https://www.gov.uk/child-benefit-tax-charge" },
  { label: "GOV.UK — Claim a tax refund", href: "https://www.gov.uk/claim-tax-refund" },
];

const money = (n: number) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function BonusGuide() {
  return (
    <Guide
      kicker="The bonus tax guide"
      title="How bonuses are taxed in the UK"
      intro={
        <>
          A bonus is taxed as pay, but it rarely behaves like the rest of your pay. It can push you into a higher band,
          trigger student loan repayments in one month, and make your payslip look badly over-taxed. This guide explains
          what really happens to a bonus in 2026/27, with worked examples you can check against the calculator.
        </>
      }
      meta={["2026/27 tax year", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          There is no special bonus tax. A bonus is added to your earnings and taxed like the rest of your pay, at the
          rates that apply to the top slice of your income. What makes bonuses confusing is <strong>when</strong> each
          deduction is worked out:
        </p>
        <ul>
          <li>
            <strong>Income Tax</strong> is worked out across the whole tax year, so over twelve months you pay the right
            amount for your total income.
          </li>
          <li>
            <strong>National Insurance</strong> and <strong>student loan</strong> repayments are worked out on each
            payment on its own. The bonus month is treated as if you earned that much every month.
          </li>
        </ul>
        <p>So how much of a bonus you keep depends on your salary, where you live and how you are paid:</p>
        <DataTable
          caption="What you keep from a bonus, paid monthly, England, Wales or NI, 2026/27"
          head={["Salary", "Bonus", "Income Tax", "NI", "You keep"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["£30,000", "£2,000", "£400.00", "£141.34", "£1,458.66"],
            ["£45,000", "£5,000", "£1,000.00", "£126.34", "£3,873.66"],
            ["£60,000", "£5,000", "£2,000.00", "£100.00", "£2,900.00"],
            ["£100,000", "£10,000", "£6,000.00", "£200.00", "£3,800.00"],
            ["£150,000", "£20,000", "£9,000.00", "£400.00", "£10,600.00"],
          ]}
        />
        <p>
          The £100,000 row stands out: someone on £100,000 keeps less of a £10,000 bonus than someone on £150,000 keeps
          of each £10,000 of theirs. That is the 60% trap, explained in section 5.
        </p>
      </GuideSection>

      <GuideSection id="income-tax" n={2} kicker="Income Tax" title="Income Tax on a bonus">
        <p>
          Your employer runs PAYE on a <strong>cumulative</strong> basis. Each payday, payroll looks at everything you
          have earned so far this tax year, the tax-free allowance you have built up so far, and the tax already
          taken. It then deducts whatever is needed to bring the total up to date.
        </p>
        <p>
          In the month a bonus is paid, that catch-up all lands at once. The bonus is taxed at your top rate, so a
          higher-rate taxpayer sees 40% of it go in Income Tax that month. Nothing is wrong: it is the tax the bonus
          adds to your year, collected in one go. Your other months are not affected.
        </p>
        <WorkedExample
          title="Worked example: £45,000 salary, £5,000 bonus, paid monthly"
          steps={[
            { label: "Normal month’s Income Tax", note: "Salary of £3,750", value: "£540.50" },
            { label: "Extra tax caused by the bonus", note: "All £5,000 falls in the 20% band", value: "£1,000.00" },
            { label: "Income Tax in the bonus month", value: "£1,540.50" },
          ]}
          total={{ label: "Income Tax on the bonus itself", value: "£1,000.00" }}
        />
        <Callout tone="warn" title="When the bonus month really is over-taxed">
          If you are on an <a href="/uk/tax-and-salary/emergency-tax">emergency tax</a>{" "}code such as 1257L W1 or M1, payroll ignores the rest of the year and taxes each
          payment on its own. A bonus on an emergency code can then be taxed as if you earned it every month. You
          get the overpayment back, either through a corrected code later in the year or a refund after the tax year
          ends.
        </Callout>
      </GuideSection>

      <GuideSection id="national-insurance" n={3} kicker="National Insurance" title="National Insurance on a bonus">
        <p>
          National Insurance works differently. It is charged on each payment using that pay period&rsquo;s thresholds,
          and there is no end-of-year top-up or refund. For monthly pay in 2026/27 you pay 8% on earnings between £1,048
          and £4,189 in the month, and 2% on anything above £4,189.
        </p>
        <p>
          A bonus usually pushes the month well above £4,189, so much of it is charged at only 2%. This is why the
          National Insurance on a bonus is often far lower than people expect.
        </p>
        <WorkedExample
          title="Worked example: National Insurance on a £5,000 bonus, £45,000 salary"
          steps={[
            { label: "Normal month: £3,750", note: "(£3,750 − £1,048) × 8%", value: "£216.16" },
            { label: "Bonus month: £8,750", note: "(£4,189 − £1,048) × 8% + (£8,750 − £4,189) × 2%", value: "£342.50" },
          ]}
          total={{ label: "National Insurance on the bonus", value: "£126.34" }}
        />
        <p>
          That is about 2.5% of the bonus, rather than the 8% you might assume. The effect is strongest for people paid
          monthly whose salary is close to £50,270, because almost the whole bonus sits above the monthly upper limit.
        </p>
        <p>
          If you are paid weekly the same logic applies with weekly thresholds of £242 and £967, so a bonus in a weekly
          pay packet is even more likely to be mostly charged at 2%. Company directors are the exception: their NI is
          worked out on an annual basis, so a director&rsquo;s bonus is charged as if it were spread across the year.
        </p>
      </GuideSection>

      <GuideSection id="student-loan" n={4} kicker="Student loan" title="Student loan repayments on a bonus">
        <p>
          Student loan repayments also use the pay period&rsquo;s threshold. For <a href="/uk/students/plan-2-student-loan">Plan 2</a>{" "}in 2026/27 that is £29,385 a
          year, or £2,448.75 a month. In the bonus month you repay 9% of everything above £2,448.75, even if your yearly
          income would normally sit below the threshold.
        </p>
        <WorkedExample
          title="Worked example: £30,000 salary, £2,000 bonus, Plan 2"
          steps={[
            { label: "Income Tax on the bonus", value: money(400) },
            { label: "National Insurance on the bonus", value: money(141.34) },
            { label: "Student loan on the bonus", note: "£2,000 × 9%", value: money(180) },
          ]}
          total={{ label: "You keep", value: money(1278.66) }}
        />
        <p>
          If your total income for the year ends up below your plan&rsquo;s threshold, you can ask the Student Loans
          Company to refund repayments taken in a bonus month. If it is above the threshold, the repayment is simply part
          of what you owe, and it reduces your balance.
        </p>
      </GuideSection>

      <GuideSection id="thresholds" n={5} kicker="Thresholds" title="Bonuses that cross a threshold">
        <p>
          Tax bands work in slices, so a bonus that takes you over a threshold only pays the higher rate on the part
          above it. Even so, some thresholds have a much bigger effect than others. The chart shows how much of each
          extra pound goes in Income Tax and NI at each level of income, using the annual figures.
        </p>
        <Figure
          label="Income Tax plus NI on the next £1 of income, 2026/27"
          caption="England, Wales and Northern Ireland, standard tax code. Hover or tap a step for its range."
        >
          <StepChart
            ariaLabel="Combined marginal rate: 0% to £12,570, 28% to £50,270, 42% to £100,000, 62% to £125,140, then 47%."
            max={150000}
            yMax={70}
            yTicks={[0, 20, 40, 60]}
            steps={[
              { from: 0, to: 12570, value: 0 },
              { from: 12570, to: 50270, value: 28 },
              { from: 50270, to: 100000, value: 42 },
              { from: 100000, to: 125140, value: 62 },
              { from: 125140, to: 150000, value: 47 },
            ]}
          />
        </Figure>
        <h3>£50,270: the higher-rate threshold</h3>
        <p>
          Above £50,270 Income Tax rises from 20% to 40%. If your salary is £48,000 and you get a £5,000 bonus, £2,270
          of the bonus is taxed at 20% and £2,730 at 40%. The bonus does not drag the rest of your pay into the higher
          band.
        </p>
        <h3>£100,000: the 60% trap</h3>
        <p>
          Between £100,000 and £125,140 your £12,570 tax-free allowance is withdrawn at £1 for every £2 of income. Each
          extra £1 costs 40p in tax plus 20p in lost allowance: 60% Income Tax, and 62% with NI. On a £100,000 salary, a
          £10,000 bonus loses £6,000 in Income Tax alone.
        </p>
        <h3>Scotland</h3>
        <p>
          In Scotland the 42% higher rate starts at £43,663, so a bonus reaches it sooner. On a £45,000 salary in
          Scotland the whole of a £5,000 bonus is taxed at 42%, which is £2,100 rather than £1,000 elsewhere in the UK.
          NI is the same everywhere.
        </p>
      </GuideSection>

      <GuideSection id="pension" n={6} kicker="Bonus sacrifice" title="Paying a bonus into your pension">
        <p>
          Many employers let you <strong>sacrifice</strong> some or all of a bonus into your pension. You give up the
          cash, and your employer pays the same amount into your pension instead. Because the money never becomes pay,
          it escapes Income Tax, NI and student loan.
        </p>
        <CompareCards
          columns={[
            {
              name: "£10,000 bonus as cash",
              rows: [
                { label: "Salary", value: "£100,000" },
                { label: "Income Tax", value: "£6,000" },
                { label: "National Insurance", value: "£200" },
                { label: "You keep", value: "£3,800" },
              ],
            },
            {
              name: "£10,000 bonus into pension",
              rows: [
                { label: "Salary", value: "£100,000" },
                { label: "Income Tax", value: "£0" },
                { label: "National Insurance", value: "£0" },
                { label: "Into your pension", value: "£10,000" },
              ],
            },
          ]}
        />
        <p>
          For someone in the 60% trap, sacrifice turns £3,800 of cash into £10,000 of pension. Your employer also saves
          15% <a href="/uk/business/employer-ni-costs">employer NI</a>{" "}on the sacrificed amount, and some employers pass part or all of that saving into your pension.
        </p>
        <p>A few limits apply:</p>
        <ul>
          <li>
            Total pension contributions are normally limited to £60,000 a year (the annual allowance), or less for some
            very high earners.
          </li>
          <li>Salary sacrifice cannot take your pay below the National Minimum Wage.</li>
          <li>
            Pension money is locked away until at least 55 (57 from 2028) and is taxed when you draw it, though
            usually 25% can be taken tax-free.
          </li>
          <li>
            The government plans to charge NI on salary-sacrificed pension contributions above £2,000 a year from
            April 2029. Income Tax relief is not affected, and nothing changes for 2026/27.
          </li>
        </ul>
        <Callout tone="good" title="Ask before the bonus is paid">
          Bonus sacrifice has to be agreed before you become entitled to the money. Once the bonus has been paid, you
          can still pay it into a pension yourself and claim tax relief, but you lose the NI saving.
        </Callout>
      </GuideSection>

      <GuideSection id="timing" n={7} kicker="Timing" title="Does timing matter?">
        <p>
          A bonus counts in the tax year it is <strong>paid</strong>, not the year it was earned. The tax year runs from
          6 April to 5 April, so a bonus paid on 1 April and one paid on 10 April fall in different years.
        </p>
        <p>That matters when your income changes between years, for example:</p>
        <ul>
          <li>You start a career break, parental leave or part-time work next year.</li>
          <li>This year&rsquo;s income is already above £100,000 or £50,270 and next year&rsquo;s may not be.</li>
          <li>You plan to retire, so next year&rsquo;s income will be lower.</li>
        </ul>
        <p>
          Employers rarely move bonus dates for one person, but if there is a choice it is worth checking which tax year
          gives the better result. For NI, it can help slightly to have a bonus paid in one month rather than split,
          because more of it then sits above the monthly upper limit.
        </p>
        <Timeline
          items={[
            { when: "Before it is paid", what: "Decide on bonus sacrifice", detail: "Ask HR or payroll whether bonus sacrifice is available and the deadline to opt in." },
            { when: "Bonus month", what: "Check your payslip", detail: "Expect a big tax figure, a modest NI figure and, if you have one, a student loan deduction." },
            { when: "After 5 April", what: "Check your P60", detail: "Your P60 shows the year’s total pay and tax. If tax looks too high, HMRC can refund it." },
          ]}
        />
      </GuideSection>

      <GuideSection id="benefits" n={8} kicker="Knock-on effects" title="Bonuses, benefits and Child Benefit">
        <p>
          A bonus can affect more than your payslip. Two cases catch people out most often.
        </p>
        <h3>Child Benefit</h3>
        <p>
          If your adjusted net income goes over £60,000, the <a href="/uk/benefits/high-income-child-benefit">High Income Child Benefit Charge</a>{" "}claws back 1% of your
          Child Benefit for every £200 above it, and all of it at £80,000. A bonus that takes you from £58,000 to £63,000
          can cost a family with two children several hundred pounds in <a href="/uk/benefits/child-benefit">Child Benefit</a>{" "}on top of the tax. Paying part of
          the bonus into a pension lowers adjusted net income and can avoid this.
        </p>
        <h3>Universal Credit</h3>
        <p>
          Universal Credit is assessed monthly on what you are actually paid. A bonus usually reduces your award for the
          month it arrives, and a large one can affect the following months as well. Tell the DWP straight away if your
          bonus is paid outside your normal payroll.
        </p>
      </GuideSection>

      <GuideSection id="checks" n={9} kicker="Payslip checks" title="Checking your bonus payslip">
        <ul>
          <li>
            <strong>Tax code.</strong> Make sure it is not an emergency code (with W1, M1 or X). If it is, ask payroll or
            HMRC to update it.
          </li>
          <li>
            <strong>Income Tax.</strong> The extra tax should be roughly the bonus multiplied by your top rate: 20%, 40%,
            45%, or 60% in the trap.
          </li>
          <li>
            <strong>National Insurance.</strong> Expect it to be well below 8% of the bonus if your bonus month is above
            £4,189.
          </li>
          <li>
            <strong>Student loan.</strong> A deduction in the bonus month is normal, even if you do not usually repay.
          </li>
          <li>
            <strong>Pension.</strong> If your scheme takes a percentage of all pay, part of the bonus goes to your pension
            automatically.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="bonus-or-rise" n={10} kicker="Choices" title="A bonus or a pay rise?">
        <p>
          Sometimes an employer offers a choice between a one-off bonus and a permanent <a href="/uk/tax-and-salary/pay-rise">pay rise</a>{" "}of the same amount. For
          the first year the tax looks similar, but the two behave differently.
        </p>
        <CompareCards
          columns={[
            {
              name: "£3,000 pay rise",
              rows: [
                { label: "Salary", value: "£45,000 → £48,000" },
                { label: "Income Tax", value: "£600" },
                { label: "National Insurance", value: "£240" },
                { label: "Kept in year one", value: "£2,160" },
              ],
            },
            {
              name: "£3,000 bonus",
              rows: [
                { label: "Salary", value: "£45,000" },
                { label: "Income Tax", value: "£600" },
                { label: "National Insurance", value: "£86.34" },
                { label: "Kept in year one", value: "£2,313.66" },
              ],
            },
          ]}
        />
        <p>
          The bonus wins in year one because most of it lands above the monthly NI upper limit and is charged at 2%. But
          a pay rise is usually worth more over time:
        </p>
        <ul>
          <li>It is paid every year, not once, and future percentage rises are calculated on the higher figure.</li>
          <li>Employer pension contributions are normally a percentage of salary, so they rise too.</li>
          <li>Mortgage lenders give more weight to basic salary than to bonuses.</li>
        </ul>
        <p>
          A bonus suits you better if it would otherwise push you over £100,000 or £60,000 permanently, or if you plan to
          pay it straight into your pension.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={11} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Personal Allowance: no Income Tax below this" },
            { value: "£50,270", label: "40% band starts (England, Wales and NI)" },
            { value: "£43,663", label: "42% band starts in Scotland" },
            { value: "£100,000", label: "Personal Allowance starts to shrink: the 60% trap" },
            { value: "£1,048 / £4,189", label: "Monthly NI thresholds: 8% between, 2% above" },
            { value: "£2,448.75", label: "Monthly Plan 2 student loan threshold" },
            { value: "£60,000", label: "Child Benefit charge starts" },
            { value: "£60,000", label: "Pension annual allowance for most people" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

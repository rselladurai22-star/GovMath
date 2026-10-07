import {
  Bars,
  BandBar,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  NEUTRAL,
  SERIES,
  StepChart,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** National Insurance — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "what-is-ni", title: "What National Insurance is" },
  { id: "employee-bands", title: "How employees pay, band by band" },
  { id: "payslip", title: "How it works on your payslip" },
  { id: "marginal", title: "NI and Income Tax together" },
  { id: "self-employed", title: "If you are self-employed" },
  { id: "employer", title: "What your employer pays" },
  { id: "salary-sacrifice", title: "Pensions and salary sacrifice" },
  { id: "state-pension", title: "Your NI record and State Pension" },
  { id: "who-pays", title: "Who pays less, or nothing" },
  { id: "changes", title: "Recent changes" },
  { id: "checks", title: "Common mistakes to check" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
  { label: "GOV.UK — Rates and thresholds for employers 2026 to 2027", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK — Self-employed National Insurance rates", href: "https://www.gov.uk/self-employed-national-insurance-rates" },
  { label: "GOV.UK — Voluntary National Insurance", href: "https://www.gov.uk/voluntary-national-insurance-contributions" },
  { label: "GOV.UK — National Insurance credits", href: "https://www.gov.uk/national-insurance-credits" },
  { label: "GOV.UK — The new State Pension", href: "https://www.gov.uk/new-state-pension" },
  { label: "GOV.UK — Check your State Pension forecast", href: "https://www.gov.uk/check-state-pension" },
  { label: "GOV.UK — Employment Allowance", href: "https://www.gov.uk/claim-employment-allowance" },
];

export default function NIGuide() {
  return (
    <Guide
      kicker="The National Insurance guide"
      title="National Insurance, explained clearly"
      intro={
        <>
          National Insurance is the second deduction on most payslips, next to Income Tax. It has its own thresholds, its
          own rates and its own rules, and it decides how much State Pension you will get. This guide walks through every
          part of it for the 2026/27 tax year, with worked examples you can check against the calculator above.
        </>
      }
      meta={["2026/27 tax year", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
      sourcesNote="Every rate and threshold in this guide was checked against these GOV.UK pages for 2026/27."
    >
      <GuideSection id="what-is-ni" n={1} kicker="The basics" title="What National Insurance is, and what it is not">
        <p>
          National Insurance (NI) is a tax on earnings. Employees pay it on their wages, the self-employed pay it on
          their profits, and employers pay their own share on top of the wages they pay out. It is collected by HMRC
          alongside Income Tax, but it is a separate charge with separate rules.
        </p>
        <p>
          The money goes into the National Insurance Fund, which pays for the State Pension and some benefits, with
          part of it going to the NHS. It is not a savings account in your name: today&rsquo;s contributions pay for
          today&rsquo;s pensions. What you do build up is a <strong>record</strong>. Each year in which you pay enough
          NI, or receive NI credits, counts as a qualifying year, and the number of qualifying years you have decides
          your State Pension.
        </p>
        <p>
          Three things make NI different from Income Tax, and they explain most of the surprises people meet:
        </p>
        <ul>
          <li>
            <strong>It only applies to earnings.</strong> Pensions, rent from property, savings interest and dividends
            are not charged NI, even though they can be taxed.
          </li>
          <li>
            <strong>It is worked out per pay period</strong> for employees, not over the whole year. There is no
            end-of-year rebalancing like there is for Income Tax.
          </li>
          <li>
            <strong>The rate falls for higher earners.</strong> Above the upper limit, employees pay 2% rather than 8%.
          </li>
        </ul>
        <p>
          NI rates and thresholds are the same in England, Wales, Scotland and Northern Ireland. Scotland sets its own
          Income Tax bands, but not its own NI.
        </p>
      </GuideSection>

      <GuideSection id="employee-bands" n={2} kicker="Employees" title="How employees pay, band by band">
        <p>
          As an employee you pay <strong>Class 1</strong> NI. For 2026/27 the first £12,570 a year is free of NI. This
          is the <strong>Primary Threshold</strong>, and it matches the Personal Allowance for Income Tax. Between
          £12,570 and £50,270, the <strong>Upper Earnings Limit</strong>, you pay 8%. On everything above £50,270 you
          pay 2%.
        </p>
        <Figure
          label="Class 1 employee NI rates, 2026/27"
          caption="Each band is charged only on the slice of earnings inside it. Bands are drawn to scale up to £80,000."
        >
          <BandBar
            max={80000}
            bands={[
              { from: 0, to: 12570, label: "0%", legend: "Up to £12,570: no NI", color: NEUTRAL, light: true },
              { from: 12570, to: 50270, label: "8%", legend: "£12,570 to £50,270: 8%", color: SERIES[0] },
              { from: 50270, to: 1e9, label: "2%", legend: "Above £50,270: 2%", color: SERIES[1] },
            ]}
          />
        </Figure>
        <p>
          Like Income Tax, the bands work in slices. Getting a pay rise that takes you over £50,270 does not change the
          rate on the money you already earned. Only the pounds above the line are charged at 2%.
        </p>
        <WorkedExample
          title="Worked example: £45,000 salary"
          steps={[
            { label: "First £12,570", note: "Below the Primary Threshold", value: "£0.00" },
            { label: "£12,570 to £45,000", note: "£32,430 at 8%", value: "£2,594.40" },
            { label: "Above £50,270", note: "Nothing earned in this band", value: "£0.00" },
          ]}
          total={{ label: "NI for the year (£216.20 a month)", value: "£2,594.40" }}
        />
        <p>Here is what the same rules give across a range of salaries:</p>
        <Figure label="Employee NI for the year, 2026/27">
          <Bars
            items={[
              { label: "£25,000 salary", value: 994.4 },
              { label: "£45,000 salary", value: 2594.4 },
              { label: "£80,000 salary", value: 3610.6 },
              { label: "£150,000 salary", value: 5010.6 },
            ]}
            format={(n) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          />
        </Figure>
        <p>
          The person on £150,000 earns six times as much as the person on £25,000 but pays about five times as much
          NI. That is the 2% upper rate at work: above £50,270, each extra £1,000 of salary adds only £20 of NI.
        </p>
      </GuideSection>

      <GuideSection id="payslip" n={3} kicker="On your payslip" title="How NI works on your payslip">
        <p>
          Your employer does not work out NI on your annual salary. They work it out on each payment, using thresholds
          for that pay period. For 2026/27 these are:
        </p>
        <DataTable
          caption="Class 1 thresholds by pay period, 2026/27"
          head={["Pay period", "Lower Earnings Limit", "Primary Threshold", "Upper Earnings Limit"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Weekly", "£129", "£242", "£967"],
            ["Monthly", "£559", "£1,048", "£4,189"],
            ["Yearly", "£6,708", "£12,570", "£50,270"],
          ]}
        />
        <p>
          Because each pay period stands alone, a month with a <a href="/tax-and-salary/bonus-tax">bonus</a>{" "}or overtime is charged on that month&rsquo;s pay
          only. Nothing is evened out at the end of the year. With Income Tax, HMRC can refund you if you overpaid
          across the year. With NI, what was deducted in the month stays deducted, unless your employer made a mistake.
        </p>
        <p>
          This can work in your favour. If a bonus takes one month&rsquo;s pay above the monthly upper limit of
          £4,189, the part above it is charged at 2% rather than 8%.
        </p>
        <WorkedExample
          title="Worked example: £36,000 salary plus a £5,000 bonus in one month"
          steps={[
            { label: "Normal month: £3,000", note: "(£3,000 − £1,048) × 8%", value: "£156.16" },
            { label: "Bonus month: £8,000", note: "(£4,189 − £1,048) × 8% + (£8,000 − £4,189) × 2%", value: "£327.50" },
            { label: "Year: 11 normal months + 1 bonus month", note: "11 × £156.16 + £327.50", value: "£2,045.26" },
            { label: "If the same £41,000 were paid evenly", note: "(£41,000 − £12,570) × 8%", value: "£2,274.40" },
          ]}
          total={{ label: "Less NI because the bonus came in one month", value: "£229.14" }}
        />
        <Callout title="Company directors are different">
          Directors normally have NI worked out on an annual earnings period, adding up pay across the year. This stops
          directors cutting NI by paying themselves in one large lump. The yearly thresholds in the table above apply.
        </Callout>
      </GuideSection>

      <GuideSection id="marginal" n={4} kicker="The full picture" title="NI and Income Tax together">
        <p>
          On its own, NI looks simple. The interesting part is how it combines with Income Tax. The chart shows how
          much of each extra pound of salary goes in Income Tax plus employee NI, for someone in England, Wales or
          Northern Ireland on a standard tax code.
        </p>
        <Figure
          label="Income Tax plus employee NI on the next £1 of salary, 2026/27"
          caption="Hover or tap a step to see its range. Scottish taxpayers have different Income Tax bands, so their steps differ."
        >
          <StepChart
            ariaLabel="Combined marginal rate: 0% up to £12,570, 28% to £50,270, 42% to £100,000, 62% to £125,140, then 47%."
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
        <p>
          At £50,270 two things happen at once. Income Tax rises from 20% to 40%, and NI falls from 8% to 2%. The NI
          drop softens the jump, so the combined rate goes from 28% to 42%, not 48%.
        </p>
        <p>
          Between £100,000 and £125,140 the Personal Allowance is withdrawn, £1 for every £2 you earn. That creates an
          effective Income Tax rate of 60% in this band, and 62% once NI is added. NI does not cause this trap, but
          it is why pension contributions through salary sacrifice are so valuable here (see section 7).
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={5} kicker="Self-employed" title="If you are self-employed">
        <p>
          Sole traders and partners pay <strong>Class 4</strong> NI on their taxable profits through their Self
          Assessment tax return. It uses the same £12,570 and £50,270 thresholds as employees, but lower rates: 6% on
          profits between the two, and 2% above. It is paid with your Income Tax, in your balancing payment by 31
          January and through <a href="/business/payment-on-account">payments on account</a>.
        </p>
        <CompareCards
          columns={[
            {
              name: "Employee on £30,000",
              rows: [
                { label: "Class", value: "Class 1" },
                { label: "Main rate", value: "8%" },
                { label: "How it is paid", value: "Each payday (PAYE)" },
                { label: "NI for the year", value: "£1,394.40" },
              ],
            },
            {
              name: "Self-employed, £30,000 profit",
              rows: [
                { label: "Class", value: "Class 4" },
                { label: "Main rate", value: "6%" },
                { label: "How it is paid", value: "Self Assessment" },
                { label: "NI for the year", value: "£1,045.80" },
              ],
            },
          ]}
        />
        <p>
          <strong>Class 2</strong> NI used to be a flat weekly charge for the self-employed. Since April 2024 nobody has
          to pay it. If your profits are at or above the <strong>Small Profits Threshold</strong> (£7,105 for
          2026/27), you get a qualifying year for your State Pension automatically, without paying anything.
        </p>
        <p>
          If your profits are below £7,105, you can choose to pay voluntary Class 2 at £3.65 a week, which is £189.80
          for a full year. That buys a full qualifying year, which is one of the cheapest ways to protect your State
          Pension (see section 8). Some people abroad, or in certain jobs, cannot use Class 2 and pay Class 3 instead.
        </p>
        <Callout tone="warn" title="Employed and self-employed at the same time?">
          You pay Class 1 on your wages and Class 4 on your profits, each with its own thresholds. If the total looks
          too high, HMRC applies an annual maximum and refunds any excess after the year ends.
        </Callout>
      </GuideSection>

      <GuideSection id="employer" n={6} kicker="Employers" title="What your employer pays on top">
        <p>
          Your payslip shows your NI, but your employer pays a second, larger charge: <strong>secondary Class 1</strong>
          {" "}NI. For 2026/27 it is 15% of your earnings above £5,000 a year (the Secondary Threshold), with no upper
          limit. It does not come out of your pay, but it is a real cost of employing you, and it is one reason
          employers like salary sacrifice.
        </p>
        <WorkedExample
          title="Worked example: total NI on a £30,000 job"
          steps={[
            { label: "Employee NI", note: "(£30,000 − £12,570) × 8%", value: "£1,394.40" },
            { label: "Employer NI", note: "(£30,000 − £5,000) × 15%", value: "£3,750.00" },
          ]}
          total={{ label: "Total NI on the job", value: "£5,144.40" }}
        />
        <p>Some employees cost their employer less:</p>
        <ul>
          <li>
            <strong>Under 21s and apprentices under 25:</strong> employers pay 0% on their earnings up to £50,270.
          </li>
          <li>
            <strong>Veterans:</strong> in the first year of their first civilian job after leaving the armed forces,
            employers pay 0% up to £50,270.
          </li>
          <li>
            <strong>Employees past State Pension age</strong> stop paying their own NI, but their employer still pays.
          </li>
        </ul>
        <p>
          Most employers can also claim the <strong>Employment Allowance</strong>, which takes up to £10,500 a year off
          their <a href="/business/employer-ni-costs">employer NI</a>{" "}bill. A limited company whose only employee is a director cannot claim it.
        </p>
      </GuideSection>

      <GuideSection id="salary-sacrifice" n={7} kicker="Pensions" title="Pensions and salary sacrifice">
        <p>
          With <strong>salary sacrifice</strong>, you agree to a lower salary and your employer pays the difference
          into your pension. Because NI is charged on salary, the sacrificed amount escapes NI for both of you. Pension
          contributions taken from your pay in the ordinary way get Income Tax relief but no NI saving.
        </p>
        <WorkedExample
          title="Worked example: sacrificing £3,000 a year, basic-rate taxpayer"
          steps={[
            { label: "Your Income Tax saved", note: "£3,000 × 20%", value: "£600" },
            { label: "Your NI saved", note: "£3,000 × 8%", value: "£240" },
            { label: "Your employer’s NI saved", note: "£3,000 × 15%, which some employers add to your pension", value: "£450" },
          ]}
          total={{ label: "Cost to your take-home pay for £3,000 in your pension", value: "£2,160" }}
        />
        <p>
          For a higher-rate taxpayer the NI saving is smaller (2% instead of 8%), but the Income Tax saving is larger
          (40%). In the £100,000 to £125,140 band, sacrifice can restore your Personal Allowance, which makes it one of
          the most valuable things you can do with your pay.
        </p>
        <Callout tone="warn" title="A change is planned for April 2029">
          The government has announced that, from April 2029, salary-sacrificed pension contributions above £2,000 a
          year will be charged NI. Sacrifice below that limit, and ordinary <a href="/investing/pension-tax-relief">tax relief on pension</a>{" "}contributions, are not
          affected. Nothing changes for 2026/27.
        </Callout>
      </GuideSection>

      <GuideSection id="state-pension" n={8} kicker="Your record" title="Your NI record and your State Pension">
        <p>
          The full new State Pension is £241.30 a week for 2026/27, about £12,548 a year. You normally need
          <strong> 35 qualifying years</strong> on your NI record to get the full amount, and at least 10 to get any of
          it. Between 10 and 35 years, you get a proportion: each year is worth about 1/35 of the full amount, roughly
          £6.89 a week or £358 a year, for life.
        </p>
        <p>You get a qualifying year in any of these ways:</p>
        <ul>
          <li>
            <strong>Earning enough as an employee.</strong> If you earn at least the Lower Earnings Limit (£129 a week,
            about £6,708 a year) in a job, the year counts, even though you pay no NI until £12,570.
          </li>
          <li>
            <strong>Self-employed profits</strong> at or above £7,105, or paying voluntary Class 2.
          </li>
          <li>
            <strong>NI credits</strong>, which are given free in many situations: claiming Child Benefit for a child
            under 12, receiving Universal Credit, <a href="/benefits/carers-earnings">Carer&rsquo;s Allowance</a>{" "}or Carer&rsquo;s Credit, being on statutory
            sick, maternity or <a href="/benefits/paternity-pay">paternity pay</a>, or looking after a grandchild under 12 for a working parent.
          </li>
          <li>
            <strong>Voluntary Class 3 contributions</strong>, at £18.40 a week, or £956.80 for a full year.
          </li>
        </ul>
        <Figure label="What it costs to fill one missing year, 2026/27">
          <Bars
            items={[
              { label: "Voluntary Class 2", value: 189.8 },
              { label: "Voluntary Class 3", value: 956.8 },
              { label: "Extra State Pension each year", value: 358.5 },
            ]}
            format={(n) => "£" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          />
        </Figure>
        <p>
          A full year of Class 3 costs about £957 and adds roughly £358 a year to your State Pension, so it pays for
          itself in under three years of retirement. That is why topping up gaps is often worth it. It is not always
          worth it, though: if you will reach 35 years anyway before State Pension age, an extra year adds nothing.
          Check your forecast on GOV.UK before paying.
        </p>
        <Timeline
          items={[
            { when: "Any time", what: "Check your NI record and forecast", detail: "Use the Check your State Pension service on GOV.UK. It shows every year, and which ones have gaps." },
            { when: "Within 6 years", what: "Fill gaps from recent tax years", detail: "You can normally pay voluntary contributions for the last six tax years." },
            { when: "5 April 2027", what: "Last day to fill gaps in 2020/21", detail: "After that date, the 2020/21 year normally can no longer be topped up." },
          ]}
        />
      </GuideSection>

      <GuideSection id="who-pays" n={9} kicker="Exceptions" title="Who pays less, or nothing at all">
        <ul>
          <li>
            <strong>Under 16s</strong> do not pay NI.
          </li>
          <li>
            <strong>People over State Pension age</strong> stop paying employee NI from the date they reach it. Class 4
            stops from the tax year after you reach State Pension age.
          </li>
          <li>
            <strong>People earning under £12,570</strong> from a job pay no NI, but still get a qualifying year if they
            earn above £6,708.
          </li>
          <li>
            <strong>People with two or more jobs</strong> get the thresholds in each job separately. Two jobs paying
            £10,000 a year each mean no NI at all, because neither reaches £12,570.
          </li>
        </ul>
        <p>
          Your employer uses a <strong>category letter</strong> to tell the payroll system which rules apply. You can
          see it on your payslip. The common ones are:
        </p>
        <DataTable
          caption="Common NI category letters"
          head={["Letter", "Who it is for", "Employee pays"]}
          rows={[
            ["A", "Most employees", "8% / 2%"],
            ["M", "Employees under 21", "8% / 2% (employer pays 0% up to £50,270)"],
            ["H", "Apprentices under 25", "8% / 2% (employer pays 0% up to £50,270)"],
            ["C", "Employees over State Pension age", "Nothing (employer still pays)"],
            ["J", "People who can defer NI because they pay it in another job", "2% on all earnings above the threshold"],
            ["V", "Veterans in their first civilian job", "8% / 2% (employer pays 0% up to £50,270 for a year)"],
            ["X", "People who do not pay NI, such as under 16s", "Nothing"],
          ]}
        />
      </GuideSection>

      <GuideSection id="changes" n={10} kicker="History" title="Recent changes to National Insurance">
        <p>
          NI has changed more in the last few years than in the previous decade. If an article or old payslip shows
          different numbers, this is probably why.
        </p>
        <Timeline
          items={[
            { when: "6 January 2024", what: "Employee main rate cut from 12% to 10%" },
            { when: "6 April 2024", what: "Employee rate cut to 8%; Class 4 to 6%", detail: "Compulsory Class 2 for the self-employed ended at the same time." },
            { when: "6 April 2025", what: "Employer NI rose to 15%", detail: "The Secondary Threshold fell from £9,100 to £5,000 and the Employment Allowance rose to £10,500." },
            { when: "6 April 2026", what: "Rates and main thresholds unchanged", detail: "The Lower Earnings Limit rose to £6,708, the Small Profits Threshold to £7,105, voluntary Class 2 to £3.65 a week and Class 3 to £18.40 a week." },
            { when: "April 2029 (planned)", what: "NI on salary sacrifice above £2,000 a year" },
          ]}
        />
      </GuideSection>

      <GuideSection id="checks" n={11} kicker="Check your payslip" title="Common mistakes worth checking">
        <ul>
          <li>
            <strong>Wrong category letter.</strong> If you are over State Pension age and still see NI deducted, your
            letter should be C. Ask your employer to correct it; overpaid NI can be refunded.
          </li>
          <li>
            <strong>Comparing NI with an annual calculation.</strong> Monthly NI on irregular pay will not match a
            yearly estimate. That is how NI works, not an error.
          </li>
          <li>
            <strong>Assuming a pay rise costs you 40%.</strong> Below £50,270 the combined rate is 28%. The higher rate
            only touches pounds above the line.
          </li>
          <li>
            <strong>Gaps in your record.</strong> Years abroad, low-paid years and years caring without claiming a
            benefit can leave gaps. Check before the six-year deadline passes.
          </li>
          <li>
            <strong>Missing Child Benefit credits.</strong> If you stopped Child Benefit because of the High Income
            Child Benefit Charge, the lower-earning parent can still register for it to get NI credits, with no money
            paid out.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={12} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Primary Threshold: employees and the self-employed pay nothing below this" },
            { value: "£50,270", label: "Upper Earnings Limit: the rate drops to 2% above this" },
            { value: "8% / 2%", label: "Employee Class 1 rates" },
            { value: "6% / 2%", label: "Self-employed Class 4 rates" },
            { value: "15%", label: "Employer NI above £5,000 a year" },
            { value: "£6,708", label: "Lower Earnings Limit for a qualifying year (£129 a week)" },
            { value: "£7,105", label: "Small Profits Threshold for the self-employed" },
            { value: "£3.65 / £18.40", label: "Voluntary Class 2 and Class 3, per week" },
            { value: "35 years", label: "Qualifying years for the full State Pension of £241.30 a week" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

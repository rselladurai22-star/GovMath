import {
  BandBar,
  Callout,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  SERIES,
  NEUTRAL,
  StepChart,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Scottish Income Tax — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "who-pays", title: "Who pays Scottish Income Tax" },
  { id: "bands", title: "The six bands for 2026/27" },
  { id: "example", title: "A worked example" },
  { id: "compared", title: "Scotland against the rest of the UK" },
  { id: "marginal", title: "The 50% zone and other marginal rates" },
  { id: "what-it-covers", title: "What the Scottish rates apply to" },
  { id: "pensions", title: "Pensions, Gift Aid and Marriage Allowance" },
  { id: "student-loans", title: "Plan 4 student loans" },
  { id: "moving", title: "Moving to or from Scotland" },
  { id: "pensioners", title: "Pensioners in Scotland" },
  { id: "self-employed", title: "Self-employed and landlords" },
  { id: "why-different", title: "Why Scotland’s tax is different" },
  { id: "beyond-tax", title: "Looking beyond Income Tax" },
  { id: "take-home-table", title: "Scottish take-home pay at common salaries" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Scottish Income Tax", href: "https://www.gov.uk/scottish-income-tax" },
  { label: "gov.scot — Scottish Income Tax 2026 to 2027", href: "https://www.gov.scot/publications/scottish-income-tax-technical-factsheet/" },
  { label: "GOV.UK — Scottish taxpayer: who counts", href: "https://www.gov.uk/hmrc-internal-manuals/scottish-taxpayer-technical-guidance" },
  { label: "GOV.UK — Tax relief on pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
  { label: "GOV.UK — Repaying your student loan", href: "https://www.gov.uk/repaying-your-student-loan" },
];

export default function ScottishGuide() {
  return (
    <Guide
      kicker="The Scottish tax guide"
      title="Scottish Income Tax, explained clearly"
      intro={
        <>
          Scotland sets its own Income Tax on earnings, with six bands instead of three. Lower earners pay slightly less
          than elsewhere in the UK and everyone above about £33,500 pays more. This guide explains who pays Scottish
          rates, how the 2026/27 bands work, and where the system creates surprises.
        </>
      }
      meta={["2026/27 tax year", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="who-pays" n={1} kicker="Residency" title="Who pays Scottish Income Tax">
        <p>
          You pay Scottish Income Tax if you live in Scotland. Where you work, and where your employer is based, do not
          matter. Someone who lives in Edinburgh and works for a London company pays Scottish rates; someone who lives in
          Carlisle and works in Glasgow does not.
        </p>
        <p>
          If you have more than one home, what counts is your main home: usually the one where you spend most of your
          time. HMRC knows you are a Scottish taxpayer from your address, and your tax code starts with an{" "}
          <strong>S</strong>, such as S1257L. If you move to or from Scotland, update your address with HMRC so your code
          changes.
        </p>
      </GuideSection>

      <GuideSection id="bands" n={2} kicker="Bands" title="The six bands for 2026/27">
        <DataTable
          caption="Scottish Income Tax bands, 2026/27"
          head={["Band", "Income", "Rate"]}
          numeric={[2]}
          rows={[
            ["Personal Allowance", "Up to £12,570", "0%"],
            ["Starter", "£12,571 to £16,537", "19%"],
            ["Basic", "£16,538 to £29,526", "20%"],
            ["Intermediate", "£29,527 to £43,662", "21%"],
            ["Higher", "£43,663 to £75,000", "42%"],
            ["Advanced", "£75,001 to £125,140", "45%"],
            ["Top", "Over £125,140", "48%"],
          ]}
        />
        <Figure label="Scottish bands to scale, up to £80,000">
          <BandBar
            max={80000}
            bands={[
              { from: 0, to: 12570, label: "0%", legend: "Personal Allowance", color: NEUTRAL, light: true },
              { from: 12570, to: 16537, label: "19", legend: "Starter 19%", color: SERIES[2] },
              { from: 16537, to: 29526, label: "20%", legend: "Basic 20%", color: SERIES[0] },
              { from: 29526, to: 43662, label: "21%", legend: "Intermediate 21%", color: SERIES[3] },
              { from: 43662, to: 75000, label: "42%", legend: "Higher 42%", color: SERIES[1] },
              { from: 75000, to: 1e9, label: "45", legend: "Advanced 45%", color: SERIES[0] },
            ]}
          />
        </Figure>
        <p>
          For 2026/27 the Scottish Government raised the starter and basic thresholds, so more income is taxed at 19%
          and 20%. The higher, advanced and top thresholds stayed the same. The Personal Allowance is set by the UK
          Government and is £12,570 everywhere. It is withdrawn above £100,000 in Scotland just as in the rest of the UK.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Example" title="A worked example">
        <WorkedExample
          title="Scottish Income Tax on a £45,000 salary"
          steps={[
            { label: "First £12,570", note: "Personal Allowance", value: "£0.00" },
            { label: "Starter: £3,967 at 19%", value: "£753.73" },
            { label: "Basic: £12,989 at 20%", value: "£2,597.80" },
            { label: "Intermediate: £14,136 at 21%", value: "£2,968.56" },
            { label: "Higher: £1,338 at 42%", note: "£45,000 − £43,662", value: "£561.96" },
          ]}
          total={{ label: "Scottish Income Tax for the year", value: "£6,882.05" }}
        />
        <p>
          Elsewhere in the UK the same salary pays £6,486 in Income Tax, so this person pays £396.05 a year more in
          Scotland. National Insurance is £2,594.40 either way.
        </p>
      </GuideSection>

      <GuideSection id="compared" n={4} kicker="Comparison" title="Scotland against the rest of the UK">
        <DataTable
          caption="Income Tax in Scotland and in England, Wales or NI, 2026/27"
          head={["Salary", "Scotland", "Rest of UK", "Difference"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£20,000", "£1,446", "£1,486", "−£40"],
            ["£30,000", "£3,451", "£3,486", "−£35"],
            ["£45,000", "£6,882", "£6,486", "+£396"],
            ["£55,000", "£11,082", "£9,432", "+£1,650"],
            ["£80,000", "£21,732", "£19,432", "+£2,300"],
            ["£100,000", "£30,732", "£27,432", "+£3,300"],
            ["£150,000", "£59,634", "£53,703", "+£5,931"],
          ]}
        />
        <p>
          Below about £33,500 the 19% starter rate saves a little, up to about £40 a year. Above that, the 21%
          intermediate rate and the earlier start of the 42% band mean Scottish taxpayers pay more, and the gap widens
          as income rises.
        </p>
      </GuideSection>

      <GuideSection id="marginal" n={5} kicker="Marginal rates" title="The 50% zone and other marginal rates">
        <p>
          Because National Insurance is set UK-wide, its thresholds do not line up with the Scottish bands. Between
          £43,663 and £50,270 you pay 42% Income Tax and also the 8% main rate of NI: 50% of every extra pound.
        </p>
        <Figure label="Scottish Income Tax plus employee NI on the next £1, 2026/27">
          <StepChart
            ariaLabel="Scottish marginal rate including NI: 27% from £12,570, 28% from £16,537, 29% from £29,526, 50% from £43,662, 44% from £50,270, 47% from £75,000, 69.5% from £100,000, 50% from £125,140."
            max={150000}
            yMax={75}
            yTicks={[0, 25, 50, 75]}
            steps={[
              { from: 0, to: 12570, value: 0 },
              { from: 12570, to: 16537, value: 27 },
              { from: 16537, to: 29526, value: 28 },
              { from: 29526, to: 43662, value: 29 },
              { from: 43662, to: 50270, value: 50 },
              { from: 50270, to: 75000, value: 44 },
              { from: 75000, to: 100000, value: 47 },
              { from: 100000, to: 125140, value: 69.5 },
              { from: 125140, to: 150000, value: 50 },
            ]}
          />
        </Figure>
        <p>
          The starter band is narrow: 19% tax plus 8% NI makes 27%, then 28% in the basic band. The steepest part is between
          £100,000 and £125,140: the allowance is withdrawn while you pay the 45% advanced rate, giving an effective
          67.5% Income Tax rate, or 69.5% with NI.
        </p>
        <Callout tone="good" title="Pension contributions in the 50% zone">
          A £1 <a href="/tax-and-salary/salary-sacrifice">salary sacrifice</a>{" "}pension contribution between £43,663 and £50,270 costs only 50p of take-home pay. Taking a
          £50,000 salary back to £43,662 puts £6,338 in a pension for about £3,169 of take-home pay.
        </Callout>
      </GuideSection>

      <GuideSection id="what-it-covers" n={6} kicker="Scope" title="What the Scottish rates apply to">
        <p>Scottish rates and bands apply to non-savings, non-dividend income:</p>
        <ul>
          <li>Wages, bonuses and benefits in kind from employment.</li>
          <li>Self-employed profits.</li>
          <li>Pensions, including the State Pension.</li>
          <li>Rental income from property.</li>
        </ul>
        <p>
          <strong>Savings interest and dividends</strong> are taxed using the UK bands and rates, wherever you live. So
          are <strong>capital gains</strong>. Scottish taxpayers get the same £1,000 or £500 Personal Savings Allowance,
          based on the UK higher-rate threshold of £50,270, and the same £500 <a href="/investing/dividend-tax">dividend allowance</a>.
        </p>
        <p>
          National Insurance, the Personal Allowance and the <a href="/benefits/high-income-child-benefit">High Income Child Benefit Charge</a>{" "}are also UK-wide.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={7} kicker="Reliefs" title="Pensions, Gift Aid and Marriage Allowance">
        <p>
          With <strong>salary sacrifice</strong>, contributions come off your pay before tax, so you automatically get
          relief at your Scottish rate.
        </p>
        <p>
          With a <strong>relief-at-source</strong> pension, the provider adds 20% to what you pay, even if you are a 19%
          starter-rate taxpayer; HMRC does not take back the extra 1%. Intermediate, higher, advanced and top rate
          taxpayers can claim the rest of their relief (1%, 22%, 25% or 28%) through Self Assessment or by contacting
          HMRC. Many intermediate-rate taxpayers get the extra 1% through their tax code without asking.
        </p>
        <p>
          <strong><a href="/tax-and-salary/marriage-allowance">Marriage Allowance</a></strong> works in Scotland if the person receiving it pays tax at the starter, basic
          or intermediate rate. It cuts their tax by up to £252 a year.
        </p>
      </GuideSection>

      <GuideSection id="student-loans" n={8} kicker="Student loans" title="Plan 4 student loans">
        <p>
          Students who were living in Scotland when they started a course funded by the Student Awards Agency Scotland
          are usually on <strong><a href="/students/plan-4-student-loan">Plan 4</a></strong>. Repayments are 9% of income above £33,795 a year in 2026/27, the
          highest threshold of any plan. Postgraduate loans for Scottish students are also usually on Plan 4.
        </p>
        <p>
          Plan 4 repayments are collected through payroll like other plans, and are worked out on each payment, using a
          monthly threshold of £2,816.25.
        </p>
      </GuideSection>

      <GuideSection id="moving" n={9} kicker="Moving home" title="Moving to or from Scotland">
        <p>
          You are either a Scottish taxpayer or not for the <strong>whole</strong>{" "}tax year. If you move part-way
          through, what counts is where you lived for longer between 6 April and 5 April. Someone who moves from Leeds to
          Glasgow in August has lived in Scotland for most of that year, so the whole year&rsquo;s income is taxed at
          Scottish rates.
        </p>
        <p>
          Tell HMRC about your new address as soon as you move. Your employer will then switch your code to or from an S
          code. If the change comes late in the year, the next payslips may include a catch-up of tax under the right
          rates, and any remaining difference is settled after the year ends.
        </p>
        <Callout tone="warn" title="Two homes">
          If you have homes on both sides of the border, the test is which one is your main home, generally the one you
          have the closest connection to and spend most time at. HMRC can ask for evidence, so keep records.
        </Callout>
      </GuideSection>

      <GuideSection id="pensioners" n={10} kicker="Retirement" title="Pensioners in Scotland">
        <p>
          The State Pension and private pensions are taxed at Scottish rates if you live in Scotland. The full new State
          Pension is £12,547.60 for 2026/27, just under the Personal Allowance, so most other pension income is taxed from
          the first pound, starting at the 19% starter rate.
        </p>
        <WorkedExample
          title="Worked example: full State Pension plus a £10,000 private pension"
          steps={[
            { label: "Total income", value: "£22,547.60" },
            { label: "Starter rate: £3,967 at 19%", value: "£753.73" },
            { label: "Basic rate: £6,010.60 at 20%", value: "£1,202.12" },
            { label: "Same income elsewhere in the UK", value: "£1,995.52" },
          ]}
          total={{ label: "Scottish Income Tax", value: "£1,955.85" }}
        />
        <p>
          Lump sums from pensions follow the same rules: the tax-free 25% is tax-free everywhere, and the rest is added to
          your income for the year, which can push you into the 42% band in Scotland much sooner than in England.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={11} kicker="Business income" title="Self-employed and landlords">
        <p>
          Self-employed profits and rental profits are taxed at Scottish rates through Self Assessment. Your tax return
          asks whether you are a Scottish taxpayer, and HMRC uses your address to check.
        </p>
        <p>
          Class 4 National Insurance is UK-wide: 6% on profits between £12,570 and £50,270 and 2% above. So a self-employed
          person in Scotland with profits between £43,663 and £50,270 pays 42% Income Tax plus 6% NI, a 48% <a href="/tax-and-salary/tax-bracket-checker">marginal rate</a>.
        </p>
        <p>
          Payments on account are based on last year&rsquo;s bill, so if Scottish rates make your bill higher, the first
          year&rsquo;s balancing payment can be larger than expected. Set money aside as you go.
        </p>
      </GuideSection>

      <GuideSection id="why-different" n={12} kicker="Background" title="Why Scotland’s tax is different">
        <p>
          Since April 2017, under the Scotland Act 2016, the Scottish Parliament has set the rates and bands of Income
          Tax on earnings, pensions and rental income for Scottish taxpayers. HMRC still collects the tax, and the money
          goes to the Scottish Government&rsquo;s budget.
        </p>
        <p>
          The UK Government keeps control of the Personal Allowance, National Insurance, and tax on savings and
          dividends, which is why those parts of your tax bill are the same as anywhere else in the UK. The Scottish
          Government sets its rates each year in the Scottish Budget, usually published in December or January for the
          following April.
        </p>
      </GuideSection>

      <GuideSection id="beyond-tax" n={13} kicker="The bigger picture" title="Looking beyond Income Tax">
        <p>
          Higher Income Tax is only part of the picture when comparing living in Scotland with elsewhere in the UK. Some
          costs are lower or do not exist:
        </p>
        <ul>
          <li>NHS prescriptions are free in Scotland, compared with £9.90 an item in England.</li>
          <li>Eligible Scottish students pay no tuition fees at Scottish universities.</li>
          <li>Average Band D council tax for 2026/27 is £1,662 in Scotland, against £2,392 in England, before water charges.</li>
          <li>Personal care for adults who need it is free, whatever their age.</li>
        </ul>
        <p>
          Whether you are better or worse off overall depends on your income, family and circumstances, but for many
          households on middle incomes the difference is smaller than the Income Tax figures alone suggest. Families with children at university, or people who need regular prescriptions, can come out ahead even on salaries where Scottish Income Tax is higher.
        </p>
      </GuideSection>

      <GuideSection id="take-home-table" n={14} kicker="Reference" title="Scottish take-home pay at common salaries">
        <DataTable
          caption="Monthly take-home pay in Scotland and the rest of the UK, 2026/27"
          head={["Salary", "Scotland", "Rest of UK", "Scotland better or worse off a year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£20,000", "£1,497", "£1,493", "+£40"],
            ["£25,000", "£1,797", "£1,793", "+£40"],
            ["£30,000", "£2,096", "£2,093", "+£35"],
            ["£35,000", "£2,392", "£2,393", "−£15"],
            ["£40,000", "£2,688", "£2,693", "−£65"],
            ["£50,000", "£3,169", "£3,293", "−£1,496"],
            ["£60,000", "£3,634", "£3,780", "−£1,750"],
            ["£75,000", "£4,334", "£4,505", "−£2,050"],
            ["£100,000", "£5,438", "£5,713", "−£3,300"],
          ]}
        />
        <p>
          Figures assume a standard tax code, no pension and no student loan. National Insurance is included and is the
          same on both sides of the border.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£12,570", label: "Personal Allowance, same as the rest of the UK" },
            { value: "£16,537", label: "Top of the 19% starter band" },
            { value: "£29,526", label: "Top of the 20% basic band" },
            { value: "£43,662", label: "42% higher rate starts above this" },
            { value: "£75,000", label: "45% advanced rate starts above this" },
            { value: "£125,140", label: "48% top rate starts above this" },
            { value: "50%", label: "Combined rate between £43,663 and £50,270" },
            { value: "£33,795", label: "Plan 4 student loan threshold" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

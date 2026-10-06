import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Pension tax relief — the guide. Figures from src/lib/investing/wrappers.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How pension tax relief works" },
  { id: "methods", title: "Three ways relief is given" },
  { id: "rates", title: "What a contribution really costs" },
  { id: "claiming", title: "Claiming higher-rate relief" },
  { id: "sacrifice", title: "Salary sacrifice" },
  { id: "100k", title: "The £100,000 trap: 60% relief" },
  { id: "child-benefit", title: "Pensions and Child Benefit" },
  { id: "scotland", title: "Scottish taxpayers" },
  { id: "non-earners", title: "Non-earners and low earners" },
  { id: "limits", title: "The annual allowance" },
  { id: "taper", title: "The tapered allowance and MPAA" },
  { id: "carry-forward", title: "Carry forward" },
  { id: "taking", title: "Taking money out" },
  { id: "changes", title: "Changes on the way" },
  { id: "matching", title: "Employer matching" },
  { id: "self-employed", title: "Self-employed pensions" },
  { id: "db", title: "Defined benefit schemes" },
  { id: "family", title: "Pensions for partners and children" },
  { id: "bonus", title: "Sacrificing a bonus" },
  { id: "year-end", title: "Year-end planning" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "retirement-tax", title: "Tax relief going in, tax coming out" },
  { id: "workplace", title: "Auto-enrolment minimums" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tax on your private pension contributions", href: "https://www.gov.uk/tax-on-your-private-pension" },
  { label: "GOV.UK — Pension tax relief", href: "https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief" },
  { label: "GOV.UK — Annual allowance", href: "https://www.gov.uk/tax-on-your-private-pension/annual-allowance" },
  { label: "GOV.UK — Salary sacrifice", href: "https://www.gov.uk/guidance/salary-sacrifice-and-the-effects-on-paye" },
  { label: "MoneyHelper — Tax relief and your pension", href: "https://www.moneyhelper.org.uk/en/pensions-and-retirement/tax-and-pensions/tax-relief-and-your-pension" },
];

export default function PensionReliefGuide() {
  return (
    <Guide
      kicker="The pension tax relief guide"
      title="Pension tax relief in 2026/27"
      intro={
        <>
          Pension contributions get tax relief at your highest rate of Income Tax, which makes them one of the most generous ways to save. A
          higher-rate taxpayer can put £1,000 into a pension for £600, and in some income ranges the real cost is even lower. This guide explains how
          relief is given, how to claim all of it, and the limits that apply.
        </>
      }
      meta={["2026/27 rules", "15 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            You get tax relief at your top rate: <strong>20%</strong>, <strong>40%</strong> or <strong>45%</strong> (19% to 48% in Scotland).
          </li>
          <li>Salary sacrifice also saves 8% National Insurance for basic-rate taxpayers and 2% above that.</li>
          <li>
            Between £100,000 and £125,140, relief is effectively <strong>60%</strong> because contributions restore your Personal Allowance.
          </li>
          <li>
            You can pay in up to <strong>£60,000</strong> a year, or your earnings if lower, including your employer&rsquo;s contributions.
          </li>
        </ul>
        <KeyStats
          items={[
            { value: "£800", label: "Cost of £1,000, basic rate" },
            { value: "£600", label: "Cost of £1,000, higher rate" },
            { value: "£400", label: "Cost of £1,000 at £110,000" },
            { value: "£60,000", label: "Annual allowance" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How pension tax relief works">
        <p>
          Money paid into a pension is treated as if it had never been taxed. If you pay Income Tax at 40%, £1,000 in your pension costs you only
          £600 of take-home pay. The relief applies to personal contributions up to 100% of your earnings, within the annual allowance.
        </p>
        <p>
          When you take money out later, 25% is usually tax-free and the rest is taxed as income. Many people pay a lower rate in retirement than
          while working, which adds to the benefit.
        </p>
      </GuideSection>

      <GuideSection id="methods" n={3} kicker="Mechanics" title="Three ways relief is given">
        <CompareCards
          columns={[
            {
              name: "Relief at source",
              rows: [
                { label: "How", value: "You pay 80%; the provider claims 20% from HMRC" },
                { label: "Higher rates", value: "Claim the rest through Self Assessment" },
                { label: "Used by", value: "SIPPs, personal pensions, many workplace schemes" },
              ],
            },
            {
              name: "Net pay",
              rows: [
                { label: "How", value: "Taken from pay before Income Tax" },
                { label: "Higher rates", value: "Automatic" },
                { label: "Used by", value: "Many occupational schemes" },
              ],
            },
            {
              name: "Salary sacrifice",
              rows: [
                { label: "How", value: "Your salary is cut; your employer pays in instead" },
                { label: "Extra", value: "Saves National Insurance for you and your employer" },
                { label: "Used by", value: "Employers who offer it" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={4} kicker="Real numbers" title="What a contribution really costs">
        <DataTable
          caption="Real cost of £1,000 into a pension, 2026/27 (England, Wales and Northern Ireland)"
          head={["Salary", "Relief at source or net pay", "Salary sacrifice"]}
          numeric={[1, 2]}
          rows={[
            ["£30,000", "£800", "£720"],
            ["£50,000", "£800", "£720"],
            ["£60,000", "£600", "£580"],
            ["£110,000", "£400", "£380"],
            ["£150,000", "£550", "£530"],
          ]}
        />
        <Figure label="Real cost of £1,000 into a pension" caption="Relief at source, by salary.">
          <Bars
            items={[
              { label: "£30,000", value: 800 },
              { label: "£60,000", value: 600 },
              { label: "£110,000", value: 400 },
              { label: "£150,000", value: 550 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="claiming" n={5} kicker="Don't miss out" title="Claiming higher-rate relief">
        <WorkedExample
          title="Salary £60,000, £6,000 gross into a SIPP"
          steps={[
            { label: "You pay in", value: "£4,800" },
            { label: "Provider adds basic-rate relief", value: "£1,200" },
            { label: "You claim through Self Assessment", value: "£1,200" },
          ]}
          total={{ label: "Real cost", value: "£3,600" }}
        />
        <Callout tone="warn" title="Thousands go unclaimed">
          Relief at source only adds 20%. Higher and additional-rate taxpayers must claim the rest, usually through a tax return or by asking HMRC to
          adjust their tax code. You can claim for the last four tax years.
        </Callout>
      </GuideSection>

      <GuideSection id="sacrifice" n={6} kicker="Extra saving" title="Salary sacrifice">
        <p>
          With salary sacrifice, you agree to a lower salary and your employer pays the difference into your pension. You save Income Tax and
          employee National Insurance, and your employer saves 15% employer National Insurance. Some employers add their saving to your pension.
        </p>
        <WorkedExample
          title="Salary £35,000, £2,000 sacrificed, employer adds its NI saving"
          steps={[
            { label: "Income Tax saved", value: "£400" },
            { label: "Your NI saved", value: "£160" },
            { label: "Employer NI added to your pension", value: "£300" },
          ]}
          total={{ label: "£2,300 in your pension for a real cost of", value: "£1,440" }}
        />
        <p>
          Salary sacrifice can affect things linked to salary, such as mortgage applications, life cover and Statutory Maternity Pay, and it cannot
          take pay below the National Minimum Wage.
        </p>
      </GuideSection>

      <GuideSection id="100k" n={7} kicker="High earners" title="The £100,000 trap: 60% relief">
        <p>
          Between £100,000 and £125,140, you lose £1 of Personal Allowance for every £2 you earn, so the effective tax rate is 60%. Pension
          contributions reduce your adjusted net income and give the allowance back.
        </p>
        <WorkedExample
          title="Salary £110,000, £10,000 by net pay"
          steps={[
            { label: "Income Tax saved", value: "£6,000" },
            { label: "Personal Allowance restored", value: "In full" },
          ]}
          total={{ label: "Real cost of £10,000", value: "£4,000" }}
        />
        <p>
          Paying in enough to bring income down to £100,000 can also restore tax-free childcare and the 30 hours of funded childcare, which stop at
          £100,000.
        </p>
      </GuideSection>

      <GuideSection id="child-benefit" n={8} kicker="Families" title="Pensions and Child Benefit">
        <p>
          The High Income Child Benefit Charge is based on adjusted net income, which pension contributions reduce. A parent earning £65,000 with two
          children repays £584 of Child Benefit. Paying £5,000 gross into a pension removes the charge.
        </p>
        <WorkedExample
          title="Salary £65,000, two children, £5,000 gross by relief at source"
          steps={[
            { label: "Cost after tax relief", value: "£3,000" },
            { label: "Child Benefit charge removed", value: "−£584" },
          ]}
          total={{ label: "Real cost of £5,000", value: "£2,416" }}
        />
      </GuideSection>

      <GuideSection id="scotland" n={9} kicker="Scotland" title="Scottish taxpayers">
        <p>
          Scottish taxpayers get relief at their Scottish rate. Relief at source schemes add 20% even for starter-rate taxpayers paying 19%. Those
          paying the intermediate, higher, advanced or top rates claim the extra through Self Assessment. A Scottish taxpayer earning £50,000 pays
          42% at the margin, so £1,000 costs £580.
        </p>
      </GuideSection>

      <GuideSection id="non-earners" n={10} kicker="Low incomes" title="Non-earners and low earners">
        <p>
          Anyone under 75 can pay up to £3,600 gross a year into a relief at source pension, even with no earnings. You pay £2,880 and the government
          adds £720. This works well for non-working spouses, carers and children. In a net pay scheme, people earning less than the Personal Allowance
          get no relief at source; HMRC can make a top-up payment to eligible low earners after the tax year ends.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={11} kicker="Limits" title="The annual allowance">
        <p>
          The annual allowance is £60,000, covering your contributions, your employer&rsquo;s and tax relief. Your own contributions only get relief
          up to 100% of your earnings. Contributions above the allowance face a tax charge at your marginal rate, which claws back the relief.
        </p>
      </GuideSection>

      <GuideSection id="taper" n={12} kicker="Restrictions" title="The tapered allowance and MPAA">
        <DataTable
          caption="Annual allowance taper, 2026/27"
          head={["Threshold income", "Adjusted income", "Annual allowance"]}
          numeric={[2]}
          rows={[
            ["£200,000 or less", "Any", "£60,000"],
            ["Over £200,000", "£280,000", "£50,000"],
            ["Over £200,000", "£300,000", "£40,000"],
            ["Over £200,000", "£360,000 or more", "£10,000"],
          ]}
        />
        <p>
          Once you take taxable money flexibly from a defined contribution pension, the money purchase annual allowance cuts the limit on further
          contributions to £10,000 a year.
        </p>
      </GuideSection>

      <GuideSection id="carry-forward" n={13} kicker="Catching up" title="Carry forward">
        <p>
          You can use unused annual allowance from the previous three tax years, as long as you were a member of a registered pension scheme in those
          years and use this year&rsquo;s allowance first. Your own contributions still only get relief up to your earnings this year.
        </p>
      </GuideSection>

      <GuideSection id="taking" n={14} kicker="Later life" title="Taking money out">
        <Timeline
          items={[
            { when: "Age 55", what: "Earliest access today", detail: "Rising to 57 from April 2028." },
            { when: "Any time after", what: "25% tax-free", detail: "Up to £268,275 in total, the lump sum allowance." },
            { when: "Rest", what: "Taxed as income", detail: "Through drawdown, an annuity or lump sums." },
          ]}
        />
      </GuideSection>

      <GuideSection id="changes" n={15} kicker="Ahead" title="Changes on the way">
        <ul>
          <li>From 6 April 2027, most unused pension funds will count towards your estate for Inheritance Tax.</li>
          <li>From April 2028, the normal minimum pension age rises from 55 to 57.</li>
          <li>From April 2029, salary sacrifice will only save National Insurance on the first £2,000 a year.</li>
        </ul>
      </GuideSection>

      <GuideSection id="matching" n={16} kicker="Free money" title="Employer matching">
        <p>
          Many employers pay more into your pension if you do, for example matching your contributions up to 6% of salary. Taking the full match is
          usually the best return available anywhere: on a £40,000 salary, an extra 3% from you costs about £960 a year after basic-rate relief, and
          brings another £1,200 from your employer. Check your scheme&rsquo;s matching rules before reducing contributions.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={17} kicker="Working for yourself" title="Self-employed pensions">
        <p>
          Self-employed people have no employer contributions and usually pay into a personal pension or SIPP using relief at source. Relief is based
          on your taxable profits, and higher-rate relief is claimed on your tax return. Contributions do not reduce your Class 4 National Insurance,
          but they can reduce payments on account for the next year. Company directors can have their company pay in instead, which saves Corporation
          Tax and National Insurance.
        </p>
      </GuideSection>

      <GuideSection id="db" n={18} kicker="Final salary" title="Defined benefit schemes">
        <p>
          In defined benefit schemes, such as many public sector pensions, contributions are usually taken from pay under net pay, so relief is
          automatic. For the annual allowance, the growth in your promised pension is valued at 16 times the increase in your yearly pension, plus any
          increase in a separate lump sum. A big pay rise or promotion can create an unexpected annual allowance charge, so check your annual
          pension savings statement.
        </p>
      </GuideSection>

      <GuideSection id="family" n={19} kicker="Family" title="Pensions for partners and children">
        <p>
          You can pay into a pension for a spouse, partner or child. Up to £2,880 a year net, or £3,600 gross, gets basic-rate relief even if they
          have no earnings. For a child, the money is locked away until at least 57, so it suits long-term gifts, for example from grandparents.
          Regular contributions from surplus income can also be exempt from Inheritance Tax.
        </p>
      </GuideSection>

      <GuideSection id="bonus" n={20} kicker="Bonuses" title="Sacrificing a bonus">
        <p>
          Some employers let you sacrifice a bonus into your pension before it is paid. You avoid Income Tax and employee National Insurance on the
          bonus, and your employer may add its National Insurance saving. For someone whose bonus would take them over £100,000, sacrificing it can
          save 62% or more of its value in tax and NI. The decision must be made before the bonus is awarded.
        </p>
      </GuideSection>

      <GuideSection id="year-end" n={21} kicker="Before 5 April" title="Year-end planning">
        <ol>
          <li>Check your income against £50,270, £60,000 (Child Benefit), £100,000 and £125,140.</li>
          <li>Work out how much you would need to contribute to fall below the next threshold.</li>
          <li>Check your remaining annual allowance and any carry forward from the last three years.</li>
          <li>Make relief at source contributions before 5 April so they count for this tax year.</li>
          <li>Claim higher-rate relief on your tax return.</li>
        </ol>
      </GuideSection>

      <GuideSection id="mistakes" n={22} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Not claiming higher-rate relief on relief at source contributions.</li>
          <li>Opting out of a workplace pension and losing the employer&rsquo;s contribution.</li>
          <li>Triggering the money purchase annual allowance by taking a small taxable withdrawal.</li>
          <li>Going over the annual allowance after a large employer contribution or a final salary increase.</li>
          <li>Forgetting that personal contributions cannot exceed your earnings.</li>
        </ul>
      </GuideSection>

      <GuideSection id="retirement-tax" n={23} kicker="The full picture" title="Tax relief going in, tax coming out">
        <p>
          Pension relief is not a gift: most of the money will be taxed when you take it out. The benefit comes from three things. First, 25% of the
          pot is normally tax-free. Second, many people pay a lower rate in retirement than while working, getting 40% relief going in and paying 20%
          coming out. Third, investments grow free of tax inside the pension. A basic-rate taxpayer who also pays basic rate in retirement still gains,
          because of the tax-free quarter.
        </p>
      </GuideSection>

      <GuideSection id="workplace" n={24} kicker="Workplace pensions" title="Auto-enrolment minimums">
        <p>
          Employers must automatically enrol most workers aged 22 to State Pension age who earn over £10,000 a year. The minimum total contribution is
          8% of qualifying earnings between £6,240 and £50,270, with at least 3% from the employer. The{" "}
          <a href="/investing/workplace-pension">workplace pension calculator</a> shows what that adds up to.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£60,000", label: "Annual allowance" },
            { value: "£10,000", label: "Minimum tapered and MPAA" },
            { value: "£3,600", label: "Gross for non-earners" },
            { value: "£268,275", label: "Lump sum allowance" },
            { value: "20%", label: "Relief at source" },
            { value: "60%", label: "Effective relief, £100k to £125k" },
            { value: "3 years", label: "Carry forward" },
            { value: "57", label: "Minimum pension age from 2028" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

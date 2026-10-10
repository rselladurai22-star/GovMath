import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** RMDs — the guide. Figures from src/lib/us/retirement-income.ts (uniformDivisor, jointDivisor, rmdSchedule). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an RMD is" },
  { id: "age", title: "When RMDs start" },
  { id: "formula", title: "How the RMD is worked out" },
  { id: "uniform", title: "The Uniform Lifetime Table" },
  { id: "joint", title: "A spouse more than 10 years younger" },
  { id: "projection", title: "How RMDs change over time" },
  { id: "deadlines", title: "Deadlines and the first-year option" },
  { id: "accounts", title: "Which accounts, and from where" },
  { id: "working", title: "The still-working exception" },
  { id: "penalty", title: "If you miss an RMD" },
  { id: "tax", title: "How RMDs are taxed" },
  { id: "knock-on", title: "Knock-on effects on Social Security and Medicare" },
  { id: "qcd", title: "Giving your RMD to charity" },
  { id: "lowering", title: "Ways to lower future RMDs" },
  { id: "timing", title: "When in the year to take it" },
  { id: "inherited", title: "Inherited accounts" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — Retirement plan and IRA required minimum distributions FAQs", href: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs" },
  { label: "IRS — Publication 590-B, Distributions from IRAs (Appendix B life expectancy tables)", href: "https://www.irs.gov/publications/p590b" },
  { label: "IRS — Required minimum distribution worksheets", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/required-minimum-distribution-worksheets" },
  { label: "IRS — Notice 2025-67, 2026 limits including qualified charitable distributions", href: "https://www.irs.gov/pub/irs-drop/n-25-67.pdf" },
  { label: "IRS — Instructions for Form 5329", href: "https://www.irs.gov/instructions/i5329" },
];

export default function RmdGuide() {
  return (
    <Guide
      kicker="The RMD guide"
      title="Required minimum distributions, explained"
      intro={
        <>
          Once you reach your RMD age, the IRS requires you to take money out of traditional IRAs and workplace plans every year. This guide covers when
          RMDs start, the IRS tables and how the calculation works, how RMDs grow over time, the deadlines and penalties, and the main ways to lower the tax.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>RMDs start at 73 if you were born from 1951 to 1959, and at 75 if you were born in 1960 or later.</li>
          <li>Your RMD is last December 31&rsquo;s balance divided by the factor for your age: 26.5 at 73, so about 3.8% of the balance.</li>
          <li>A {usd(500_000)} IRA at 73 has a first RMD of about {usd(18_868)}.</li>
          <li>Miss it and the excise tax is 25% of the shortfall, cut to 10% if you correct it quickly.</li>
        </ul>
        <KeyStats
          items={[
            { value: "73", label: "RMD age, born 1951–1959" },
            { value: "75", label: "RMD age, born 1960+" },
            { value: "25%", label: "Penalty on a missed RMD" },
            { value: "$111,000", label: "2026 QCD limit" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an RMD is">
        <p>
          Traditional IRAs and 401(k)s let money grow without tax for decades, with tax paid only when it comes out. A required minimum distribution (RMD)
          is the IRS making sure it eventually does come out and gets taxed. Each year from your RMD age you must withdraw at least a set share of each
          account. You can always take more; the RMD is only the floor.
        </p>
        <p>
          Roth IRAs have no RMDs for the original owner, and since 2024 neither do Roth 401(k)s. That is one reason people move money into Roth accounts
          before RMDs begin, which our <a href="/us/savings/roth-conversion-calculator">Roth conversion calculator</a>{" "}can price.
        </p>
      </GuideSection>

      <GuideSection id="age" n={3} kicker="Start date" title="When RMDs start">
        <p>The SECURE Act of 2019 and SECURE 2.0 of 2022 raised the starting age twice:</p>
        <DataTable
          caption="RMD starting age by birth date"
          head={["Born", "RMDs start at"]}
          rows={[
            ["Before July 1, 1949", "70½"],
            ["July 1, 1949 to 1950", "72"],
            ["1951 to 1959", "73"],
            ["1960 or later", "75"],
          ]}
        />
        <p>
          The year you reach that age is your first RMD year. Someone born in 1953 turned 73 in 2026, so 2026 is their first RMD year. Someone born in 1960
          won&rsquo;t take one until 2035.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={4} kicker="The calculation" title="How the RMD is worked out">
        <p>Two numbers decide your RMD for 2026:</p>
        <ol>
          <li>The account balance at the close of business on December 31, 2025.</li>
          <li>The factor (the &quot;distribution period&quot;) for the age you reach on your birthday in 2026, from the IRS table that applies to you.</li>
        </ol>
        <WorkedExample
          title="Age 75 in 2026, $500,000 balance at the end of 2025"
          steps={[
            { label: "December 31, 2025 balance", value: "$500,000" },
            { label: "Uniform Lifetime factor at 75", value: "24.6" },
          ]}
          total={{ label: "2026 RMD: $500,000 ÷ 24.6", value: usd(20_325) }}
        />
        <p>
          Your age for the table is the age you reach in the calendar year, even if your birthday is on December 31. If you rolled money between accounts
          late in the year, the receiving account&rsquo;s balance may need adjusting; your provider usually handles this.
        </p>
      </GuideSection>

      <GuideSection id="uniform" n={5} kicker="IRS Table III" title="The Uniform Lifetime Table">
        <p>
          Most people use Table III, the Uniform Lifetime Table, from Publication 590-B. It was updated for 2022 to reflect longer lives, which made RMDs
          slightly smaller.
        </p>
        <DataTable
          caption="Uniform Lifetime Table (selected ages)"
          head={["Age", "Factor", "RMD as a share of the balance"]}
          numeric={[1, 2]}
          rows={[
            ["73", "26.5", "3.8%"],
            ["75", "24.6", "4.1%"],
            ["80", "20.2", "5.0%"],
            ["85", "16.0", "6.3%"],
            ["90", "12.2", "8.2%"],
            ["95", "8.9", "11.2%"],
            ["100", "6.4", "15.6%"],
          ]}
        />
        <p>
          The share rises every year. By your 90s, the RMD is often more than the account earns, so the balance starts to fall even with good returns.
        </p>
      </GuideSection>

      <GuideSection id="joint" n={6} kicker="IRS Table II" title="A spouse more than 10 years younger">
        <p>
          If your spouse is the sole beneficiary of the account for the whole year and is more than 10 years younger, you use Table II, the Joint and Last
          Survivor table, instead. It is based on both your life expectancies, so the factor is larger and the RMD smaller.
        </p>
        <DataTable
          caption="Factors for an owner aged 75 or 80, by spouse's age"
          head={["Spouse's age", "Owner 75", "Owner 80"]}
          numeric={[1, 2]}
          rows={[
            ["60", "28.3", "27.8"],
            ["62", "26.8", "26.1"],
            ["64", "25.3", "24.6"],
            ["66 (Uniform table)", "24.6", "—"],
            ["69", "—", "20.9"],
          ]}
        />
        <p>
          At 75 with a 60-year-old spouse, a {usd(500_000)} IRA has an RMD of about {usd(17_668)} rather than {usd(20_325)}. Where the spouse is 10 years
          younger or less, the Uniform table applies because it already assumes a beneficiary 10 years younger. The calculator picks the right table for you.
        </p>
      </GuideSection>

      <GuideSection id="projection" n={7} kicker="The long view" title="How RMDs change over time">
        <Figure label="RMDs from a $500,000 IRA at 73 growing 5% a year" caption="Balance on December 31 of the year before and the RMD each year; figures from the calculator's engine.">
          <Bars
            format={usd}
            items={[
              { label: "Age 73", value: 18_868 },
              { label: "Age 80", value: 26_111 },
              { label: "Age 85", value: 32_274 },
              { label: "Age 90", value: 38_326 },
              { label: "Age 95", value: 42_129 },
            ]}
          />
        </Figure>
        <p>
          At 5% a year the balance holds near {usd(500_000)} into the mid-80s while the RMD climbs, then falls as RMDs outpace growth: about {usd(467_574)}{" "}
          at 90 and {usd(374_947)} at 95. From 73 to 95 the RMDs add up to about {usd(712_376)}, all taxed as income. With no growth at all, the RMD is
          largest in the first years and falls slowly: from {usd(18_868)} at 73 to {usd(13_420)} at 95.
        </p>
        <p>
          Someone born in 1960 with {usd(500_000)} at 66 who lets it grow 5% a year until RMDs start would have about {usd(775_664)} at 75, and a first RMD of
          about {usd(31_531)}.
        </p>
      </GuideSection>

      <GuideSection id="deadlines" n={8} kicker="Dates" title="Deadlines and the first-year option">
        <Timeline
          items={[
            { when: "Year you reach RMD age", what: "First RMD year", detail: "Can be taken in that year or delayed to April 1 of the next year." },
            { when: "April 1 of the next year", what: "Last day for the first RMD", detail: "If you wait, the second RMD is also due by December 31 of that year." },
            { when: "December 31 every year after", what: "Deadline for each later RMD", detail: "Based on the previous December 31 balance." },
          ]}
        />
        <Callout tone="warn" title="Two RMDs in one year">
          Delaying the first RMD means two taxable withdrawals in the same year. That can push you into a higher bracket, raise the tax on your Social
          Security and trigger Medicare surcharges. It only helps if your income will be unusually low in the second year.
        </Callout>
      </GuideSection>

      <GuideSection id="accounts" n={9} kicker="Where from" title="Which accounts, and from where">
        <CompareCards
          columns={[
            {
              name: "IRAs",
              rows: [
                { label: "Includes", value: "Traditional, SEP and SIMPLE IRAs" },
                { label: "Work out", value: "Each IRA separately" },
                { label: "Take from", value: "Any one or more of your IRAs" },
              ],
            },
            {
              name: "Workplace plans",
              rows: [
                { label: "Includes", value: "401(k), 403(b), 457(b), TSP" },
                { label: "Work out", value: "Each plan separately" },
                { label: "Take from", value: "Each 401(k) itself (403(b)s can be combined)" },
              ],
            },
          ]}
        />
        <p>
          Consolidating old 401(k)s into one IRA makes RMDs simpler, since you then have one calculation and one withdrawal. A{" "}
          <a href="/us/savings/ira-calculator">traditional IRA</a>{" "}is also where most rollovers end up.
        </p>
      </GuideSection>

      <GuideSection id="working" n={10} kicker="Exception" title="The still-working exception">
        <p>
          If you are still employed at your RMD age and don&rsquo;t own 5% or more of the company, most plans let you delay RMDs from your current
          employer&rsquo;s 401(k) until April 1 after the year you retire. The exception doesn&rsquo;t cover IRAs or plans from earlier jobs. Some people roll
          old 401(k)s and even IRAs into their current plan, if it accepts them, to use the exception.
        </p>
      </GuideSection>

      <GuideSection id="penalty" n={11} kicker="Mistakes" title="If you miss an RMD">
        <p>
          SECURE 2.0 cut the penalty from 50% to 25% of the amount not taken, and to 10% if you correct it within the correction window, generally by the end
          of the second year after the year it was due. Report it on Form 5329.
        </p>
        <WorkedExample
          title="A $20,000 RMD missed entirely"
          steps={[
            { label: "Excise tax at 25%", value: "$5,000" },
            { label: "Excise tax if corrected in time (10%)", value: "$2,000" },
          ]}
          total={{ label: "Possible with a waiver", value: "$0" }}
        />
        <p>
          The IRS can waive the tax if the shortfall was due to a reasonable error and you are fixing it: take the missed amount, then file Form 5329 with a
          short explanation asking for the waiver.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={12} kicker="The IRS" title="How RMDs are taxed">
        <p>
          RMDs from pre-tax money are ordinary income, taxed at your federal bracket rate and usually your state&rsquo;s. If you made nondeductible IRA
          contributions, part of each withdrawal is a tax-free return of that basis (tracked on Form 8606). You can have federal tax withheld from the
          distribution, which is treated as paid evenly through the year, a useful way to cover tax on other income too.
        </p>
        <p>
          With a {usd(20_325)} RMD and a 22% rate, the tax is about {usd(4_472)}. Our <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}
          shows how the RMD fits into your full return.
        </p>
      </GuideSection>

      <GuideSection id="knock-on" n={13} kicker="Side effects" title="Knock-on effects on Social Security and Medicare">
        <p>
          Because RMDs raise your income, they can make more of your Social Security taxable (up to 85% once provisional income is above $34,000 single or
          $44,000 joint) and push you over the Medicare IRMAA thresholds, which raise Part B and Part D premiums two years later. In 2026 the surcharges start
          above $109,000 of modified AGI ($218,000 joint). Our <a href="/us/savings/social-security-calculator">Social Security calculator</a>{" "}shows the
          tax on your benefits.
        </p>
      </GuideSection>

      <GuideSection id="qcd" n={14} kicker="Charity" title="Giving your RMD to charity">
        <p>
          From age 70½, you can send money straight from an IRA to a qualified charity as a <strong>qualified charitable distribution</strong>{" "}(QCD). In
          2026 the limit is $111,000 per person. A QCD counts toward your RMD but is left out of your income completely.
        </p>
        <p>
          That is usually better than taking the RMD and deducting the gift: most retirees take the standard deduction, so the gift would give no tax
          benefit, and a lower income can also reduce tax on Social Security and Medicare premiums. The money must go directly from the IRA to the charity,
          not to a donor-advised fund.
        </p>
      </GuideSection>

      <GuideSection id="lowering" n={15} kicker="Planning" title="Ways to lower future RMDs">
        <ul>
          <li>
            <strong>Roth conversions</strong>{" "}in the years between retiring and RMD age, filling up a low tax bracket each year.
          </li>
          <li>
            <strong>Spending traditional money first</strong>{" "}in your 60s while delaying Social Security, which also raises your guaranteed income.
          </li>
          <li>
            <strong>A QLAC</strong>{" "}(qualifying longevity annuity contract): money used to buy one is left out of the RMD balance until payments start, by
            85 at the latest.
          </li>
          <li>
            <strong>QCDs</strong>{" "}if you give to charity anyway.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="timing" n={16} kicker="Practical" title="When in the year to take it">
        <p>
          You can take the RMD in one amount or in pieces, at any time in the year. Taking it in December leaves the money invested longer, which the
          calculator assumes. Monthly withdrawals work like a paycheck. Either way, don&rsquo;t leave it to the last week of December, when providers are
          busy. If you don&rsquo;t need the money, you can reinvest it in a taxable account, or in a Roth IRA if you have earned income.
        </p>
      </GuideSection>

      <GuideSection id="inherited" n={17} kicker="Beneficiaries" title="Inherited accounts">
        <p>
          Inherited IRAs follow different rules. A surviving spouse can usually treat the IRA as their own. Most other beneficiaries must empty the account
          by the end of the 10th year after the death, and if the owner had already started RMDs, they must also take yearly RMDs during those years.
          Minor children, disabled or chronically ill beneficiaries and those not more than 10 years younger can stretch withdrawals over their life
          expectancy. The calculator covers your own accounts only.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Using the current balance instead of last December 31&rsquo;s.</li>
          <li>Taking the total for several 401(k)s from just one of them.</li>
          <li>Forgetting a small old IRA or 403(b).</li>
          <li>Delaying the first RMD without planning for two in one year.</li>
          <li>Rolling an RMD over into another IRA; RMDs can&rsquo;t be rolled over.</li>
          <li>Using the Joint Life table when the spouse isn&rsquo;t the sole beneficiary.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["RMD age, born 1951 to 1959", "73"],
            ["RMD age, born 1960 or later", "75"],
            ["Uniform factor at 73", "26.5"],
            ["Uniform factor at 80", "20.2"],
            ["Excise tax on a missed RMD", "25% (10% if corrected)"],
            ["Qualified charitable distribution limit", "$111,000"],
            ["Deadline", "December 31 (first RMD: April 1 next year)"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

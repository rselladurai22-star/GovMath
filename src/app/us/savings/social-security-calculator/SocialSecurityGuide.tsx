import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Social Security — the guide. Figures from src/lib/us/retirement-income.ts (pia, aimeFromSalary, claimTable, breakEvenMonths, benefitTax). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How your benefit is worked out" },
  { id: "aime", title: "Step 1: your average indexed earnings" },
  { id: "pia", title: "Step 2: the 2026 benefit formula" },
  { id: "fra", title: "Your full retirement age" },
  { id: "early", title: "Claiming early: the reduction" },
  { id: "late", title: "Waiting: delayed retirement credits" },
  { id: "every-age", title: "Your benefit at every age" },
  { id: "break-even", title: "The break-even age" },
  { id: "lifetime", title: "Lifetime totals" },
  { id: "cola", title: "The 2026 cost-of-living adjustment" },
  { id: "earnings-test", title: "Working while you claim" },
  { id: "tax", title: "Tax on Social Security" },
  { id: "senior", title: "The senior deduction" },
  { id: "spouses", title: "Spouses, survivors and ex-spouses" },
  { id: "missing-years", title: "Fewer than 35 years of work" },
  { id: "high-earners", title: "High earners and the wage cap" },
  { id: "deciding", title: "How to decide when to claim" },
  { id: "bridge", title: "Bridging the gap with savings" },
  { id: "statement", title: "Check your own record" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Social Security Administration — Primary insurance amount formula and bend points", href: "https://www.ssa.gov/oact/cola/piaformula.html" },
  { label: "Social Security Administration — 2026 cost-of-living adjustment fact sheet", href: "https://www.ssa.gov/cola/factsheets/2026.html" },
  { label: "Social Security Administration — Retirement age and benefit reduction", href: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html" },
  { label: "Social Security Administration — Delayed retirement credits", href: "https://www.ssa.gov/benefits/retirement/planner/delayret.html" },
  { label: "Social Security Administration — Exempt amounts under the earnings test", href: "https://www.ssa.gov/oact/cola/rtea.html" },
  { label: "Social Security Administration — my Social Security account", href: "https://www.ssa.gov/myaccount/" },
  { label: "IRS — Publication 915, Social Security and Equivalent Railroad Retirement Benefits", href: "https://www.irs.gov/publications/p915" },
];

export default function SocialSecurityGuide() {
  return (
    <Guide
      kicker="The Social Security guide"
      title="How Social Security is worked out, and when to claim"
      intro={
        <>
          Social Security is the base of most Americans&rsquo; retirement income, and the age you claim it changes your check for life. This guide walks
          through the 2026 formula step by step, the cut for claiming early and the credits for waiting, the break-even age, the earnings test and how
          benefits are taxed.
        </>
      }
      meta={["Worked examples", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Your benefit comes from your top 35 years of earnings, run through a formula that replaces a bigger share of lower earnings.</li>
          <li>Full retirement age is 67 for anyone born in 1960 or later. Claiming at 62 pays 70% of the full benefit; waiting to 70 pays 124%.</li>
          <li>
            Someone earning {usd(70_000)} a year for 35 years gets about {usd(2_612)} a month at 67, {usd(1_828)} at 62 or {usd(3_239)} at 70, in today&rsquo;s
            dollars.
          </li>
          <li>Waiting from 67 to 70 breaks even at about 82 and a half. Live longer and waiting pays more in total.</li>
        </ul>
        <KeyStats
          items={[
            { value: "2.8%", label: "2026 COLA" },
            { value: "67", label: "Full retirement age, born 1960+" },
            { value: "70%", label: "Paid if you claim at 62" },
            { value: "124%", label: "Paid if you wait to 70" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How your benefit is worked out">
        <p>Social Security turns your working life into a monthly check in three steps:</p>
        <ol>
          <li>
            <strong>Average indexed monthly earnings (AIME).</strong>{" "}Each year&rsquo;s earnings, up to that year&rsquo;s taxable maximum, are raised in
            line with national wage growth. The highest 35 years are added up and divided by 420 months.
          </li>
          <li>
            <strong>Primary insurance amount (PIA).</strong>{" "}A three-step formula turns your AIME into the monthly benefit you get at full retirement age.
          </li>
          <li>
            <strong>The claiming adjustment.</strong>{" "}Claim before full retirement age and the PIA is cut; claim after and it is increased, up to age 70.
          </li>
        </ol>
        <p>
          After that, a cost-of-living adjustment raises the check every January. The calculator follows these steps and shows the answer in today&rsquo;s
          dollars, which is the clearest way to compare claiming ages.
        </p>
      </GuideSection>

      <GuideSection id="aime" n={3} kicker="Step 1" title="Step 1: your average indexed earnings">
        <p>
          Earnings from years before you turn 60 are indexed: multiplied by the ratio of the national average wage index in the year you turn 60 to the
          index in the year you earned them. That puts a salary from the 1990s on the same footing as one from today. Earnings at 60 and later count at
          face value.
        </p>
        <p>
          The calculator&rsquo;s salary option uses a simple version of this: it assumes every year you work earns the same as your salary now, after
          indexing, and divides by 35 years. A {usd(70_000)} salary for 35 years gives an AIME of about {usd(5_833)}. With 25 years it falls to about{" "}
          {usd(4_166)}, because the 10 missing years count as zero.
        </p>
        <Callout title="Already know your AIME?">
          Choose &quot;My AIME&quot; in the calculator and enter it, or better, choose &quot;My statement&quot; and enter the full retirement age benefit
          from your Social Security statement.
        </Callout>
      </GuideSection>

      <GuideSection id="pia" n={4} kicker="Step 2" title="Step 2: the 2026 benefit formula">
        <p>
          For people who turn 62 in 2026, the PIA is 90% of the first $1,286 of AIME, plus 32% of AIME between $1,286 and $7,749, plus 15% of anything above
          $7,749. These two cut-off points, the <strong>bend points</strong>, rise each year with average wages.
        </p>
        <WorkedExample
          title="AIME of $5,833 (a $70,000 salary for 35 years)"
          steps={[
            { label: "90% of the first $1,286", value: "$1,157.40" },
            { label: "32% of $5,833 − $1,286 = $4,547", value: "$1,455.04" },
            { label: "15% of anything above $7,749", value: "$0" },
          ]}
          total={{ label: "Benefit at full retirement age (rounded down to the dime)", value: "$2,612.40" }}
        />
        <p>
          The formula is deliberately progressive. The first $1,286 of average earnings is replaced at 90%, the top slice at only 15%. A low earner might get
          back more than half their pre-retirement pay; a high earner far less. That is why Social Security alone rarely covers retirement for middle and
          higher earners, and why a <a href="/us/savings/401k-calculator">401(k)</a>{" "}or IRA matters.
        </p>
      </GuideSection>

      <GuideSection id="fra" n={5} kicker="The anchor" title="Your full retirement age">
        <p>
          Full retirement age (FRA) is when you get 100% of your PIA. It was raised by the 1983 Social Security amendments and has now reached its final step.
        </p>
        <DataTable
          caption="Full retirement age by year of birth"
          head={["Born", "Full retirement age"]}
          rows={[
            ["1943 to 1954", "66"],
            ["1955", "66 and 2 months"],
            ["1956", "66 and 4 months"],
            ["1957", "66 and 6 months"],
            ["1958", "66 and 8 months"],
            ["1959", "66 and 10 months"],
            ["1960 or later", "67"],
          ]}
        />
        <p>
          Anyone born on January 1 is treated as born the year before, and Social Security considers you to reach an age the day before your birthday. Anyone
          turning 62 in 2026 was born in 1964 and has a full retirement age of 67.
        </p>
      </GuideSection>

      <GuideSection id="early" n={6} kicker="Claiming at 62 to 66" title="Claiming early: the reduction">
        <p>
          You can claim from 62, but the benefit is reduced by 5/9 of 1% for each of the first 36 months before full retirement age, and 5/12 of 1% for each
          month beyond that. With an FRA of 67, claiming at 62 is 60 months early: 20% for the first 36 months plus 10% for the next 24, a 30% cut.
        </p>
        <DataTable
          caption="Share of the full benefit paid, full retirement age 67"
          head={["Claim at", "Share paid"]}
          numeric={[1]}
          rows={[
            ["62", "70.0%"],
            ["63", "75.0%"],
            ["64", "80.0%"],
            ["65", "86.7%"],
            ["66", "93.3%"],
            ["67", "100.0%"],
          ]}
        />
        <Callout tone="warn" title="The cut is for life">
          The reduction never goes away, even after you pass full retirement age. It also lowers the survivor benefit your spouse could get if you die first.
        </Callout>
      </GuideSection>

      <GuideSection id="late" n={7} kicker="Claiming at 68 to 70" title="Waiting: delayed retirement credits">
        <p>
          For each month you wait past full retirement age, your benefit rises by 2/3 of 1%, or 8% a year, until 70. With an FRA of 67, claiming at 70 pays
          124% of your PIA. The credits stop at 70, so there is no reason to wait any longer; if you haven&rsquo;t applied by then, apply.
        </p>
        <p>
          Unlike the cut for claiming early, the delayed credits are permanent increases, and COLAs are then applied to the larger amount. If you are the
          higher earner in a marriage, the larger check also becomes your spouse&rsquo;s survivor benefit.
        </p>
      </GuideSection>

      <GuideSection id="every-age" n={8} kicker="Real numbers" title="Your benefit at every age">
        <Figure label="Monthly benefit by claiming age, $70,000 salary for 35 years (born 1966)" caption="Today's dollars, from the calculator's engine.">
          <Bars
            format={usd}
            items={[
              { label: "62", value: 1_828 },
              { label: "64", value: 2_089 },
              { label: "66", value: 2_438 },
              { label: "67", value: 2_612 },
              { label: "68", value: 2_821 },
              { label: "70", value: 3_239 },
            ]}
          />
        </Figure>
        <p>
          The difference between the earliest and latest claim is large: {usd(3_239 - 1_828)} a month, or about {usd((3_239 - 1_828) * 12)} a year, for the
          rest of your life. Social Security rounds each monthly benefit down to the dollar, which the calculator does too.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={9} kicker="The trade-off" title="The break-even age">
        <p>
          Waiting means giving up checks now for bigger checks later. The break-even age is when the running total from the later claim catches up. Because
          the percentages are the same for everyone with the same FRA, the break-even ages barely change with income.
        </p>
        <DataTable
          caption="Break-even ages, full retirement age 67 (today's dollars)"
          head={["Choice", "Break-even age"]}
          rows={[
            ["Claim at 62 or wait until 67", "78 and 8 months"],
            ["Claim at 67 or wait until 70", "82 and 6 months"],
            ["Claim at 62 or wait until 70", "80 and 5 months"],
          ]}
        />
        <p>
          These figures ignore taxes and what you might earn by investing early checks. If you would invest them and earn a real return, the break-even
          moves a little later. If you would otherwise draw down savings to wait, the comparison depends on what those savings earn.
        </p>
      </GuideSection>

      <GuideSection id="lifetime" n={10} kicker="Totals" title="Lifetime totals">
        <p>The same {usd(70_000)} earner&rsquo;s total benefits, in today&rsquo;s dollars, depend on how long they live:</p>
        <DataTable
          caption="Total benefits received, by claiming age"
          head={["Claim at", "Total to 85", "Total to 90"]}
          numeric={[1, 2]}
          rows={[
            ["62", usd(504_528), usd(614_208)],
            ["67", usd(564_192), usd(720_912)],
            ["70", usd(583_020), usd(777_360)],
          ]}
        />
        <p>
          To 90, waiting until 70 brings in about {usd(777_360 - 614_208)} more than claiming at 62. Many people underestimate how long they will live: a
          65-year-old today has a good chance of reaching 90, especially as part of a couple where either partner may live that long.
        </p>
      </GuideSection>

      <GuideSection id="cola" n={11} kicker="Inflation" title="The 2026 cost-of-living adjustment">
        <p>
          Benefits rose by 2.8% from January 2026, based on the rise in the CPI-W measure of inflation from the third quarter of 2024 to the third quarter of 2025.
          SSA estimates the average retired worker now gets about $2,071 a month. The maximum benefit for someone claiming at full retirement age in 2026 is
          $4,152 a month.
        </p>
        <p>
          COLAs apply from age 62 whether or not you have claimed, so waiting doesn&rsquo;t mean missing out on them. That is why the calculator works in
          today&rsquo;s dollars: the future checks will be larger in dollars, but buy about the same.
        </p>
      </GuideSection>

      <GuideSection id="earnings-test" n={12} kicker="Still working?" title="Working while you claim">
        <p>
          If you claim before full retirement age and keep working, the <strong>retirement earnings test</strong>{" "}may hold back some of your benefits.
        </p>
        <DataTable
          caption="2026 earnings test"
          head={["Situation", "Limit", "Withheld"]}
          rows={[
            ["Under full retirement age all year", "$24,480", "$1 for every $2 above"],
            ["The year you reach full retirement age", "$65,160", "$1 for every $3 above (months before FRA only)"],
            ["From full retirement age", "No limit", "Nothing"],
          ]}
        />
        <WorkedExample
          title="Claiming $18,000 a year at 63 while earning $34,480"
          steps={[
            { label: "Earnings above $24,480", value: "$10,000" },
            { label: "$1 withheld for every $2", value: "$5,000" },
          ]}
          total={{ label: "Benefits held back this year", value: "$5,000" }}
        />
        <p>
          The money isn&rsquo;t lost for good. At full retirement age SSA recalculates your benefit as if you had claimed later by the months withheld. Only
          wages and self-employment income count; pensions, investment income and IRA withdrawals don&rsquo;t.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={13} kicker="The IRS" title="Tax on Social Security">
        <p>
          Whether your benefits are taxed depends on your <strong>provisional income</strong>: your other income plus tax-exempt interest plus half your
          benefits.
        </p>
        <DataTable
          caption="How much of your benefit can be taxable (not indexed)"
          head={["Provisional income", "Single", "Married filing jointly"]}
          rows={[
            ["Up to 0%", "Below $25,000", "Below $32,000"],
            ["Up to 50%", "$25,000 to $34,000", "$32,000 to $44,000"],
            ["Up to 85%", "Above $34,000", "Above $44,000"],
          ]}
        />
        <WorkedExample
          title="Single, 65+, $24,000 of benefits and $30,000 of IRA withdrawals"
          steps={[
            { label: "Provisional income: $30,000 + half of $24,000", value: "$42,000" },
            { label: "Taxable part of benefits", value: "$11,300" },
            { label: "Federal tax without benefits", value: "$585" },
            { label: "Federal tax with benefits", value: "$1,810" },
          ]}
          total={{ label: "Extra tax caused by the benefits", value: "$1,225" }}
        />
        <p>
          The thresholds were set in 1983 and 1993 and have never been raised, so more retirees pay tax on benefits each year. Most states don&rsquo;t tax
          Social Security; a handful do, often with their own exemptions. Our <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}
          shows your full return.
        </p>
      </GuideSection>

      <GuideSection id="senior" n={14} kicker="2025 to 2028" title="The senior deduction">
        <p>
          The One Big Beautiful Bill Act added a deduction of $6,000 for each person aged 65 or over, for 2025 to 2028. It is reduced by 6% of modified AGI
          above $75,000 ($150,000 for married couples filing jointly), and it comes on top of the standard deduction and its extra amount for people 65 and
          over.
        </p>
        <p>
          It doesn&rsquo;t change how much of your benefit is taxable, but it lowers the taxable income the benefits sit in. The calculator includes it. In
          the example above, it is part of why the extra tax is only {usd(1_225)} on {usd(11_300)} of taxable benefits.
        </p>
      </GuideSection>

      <GuideSection id="spouses" n={15} kicker="Couples" title="Spouses, survivors and ex-spouses">
        <CompareCards
          columns={[
            {
              name: "Spousal benefit",
              rows: [
                { label: "Up to", value: "50% of the worker's PIA" },
                { label: "When", value: "At the spouse's own full retirement age" },
                { label: "Delayed credits", value: "No, no gain past FRA" },
              ],
            },
            {
              name: "Survivor benefit",
              rows: [
                { label: "Up to", value: "100% of what the worker was getting" },
                { label: "From", value: "Age 60 (reduced)" },
                { label: "Delayed credits", value: "Yes, included if the worker waited" },
              ],
            },
          ]}
        />
        <p>
          A spouse gets the larger of their own benefit and the spousal benefit, not both. A divorced spouse can claim on an ex&rsquo;s record if the
          marriage lasted 10 years and they haven&rsquo;t remarried. Because the survivor keeps the larger check, the higher earner waiting to 70 is often the
          best move for a couple, even if the lower earner claims earlier.
        </p>
      </GuideSection>

      <GuideSection id="missing-years" n={16} kicker="Career breaks" title="Fewer than 35 years of work">
        <p>
          The formula always divides by 35 years. Years at home raising children, studying or out of work count as zero. With 25 years of {usd(70_000)}{" "}
          earnings instead of 35, the full retirement age benefit drops from about {usd(2_612)} to {usd(2_079)} a month.
        </p>
        <p>
          Each extra year of work replaces a zero, which is why working a few more years, even part-time, can raise your benefit noticeably. Once you have
          35 years, a new year only helps if it beats your lowest indexed year.
        </p>
      </GuideSection>

      <GuideSection id="high-earners" n={17} kicker="The cap" title="High earners and the wage cap">
        <p>
          Social Security tax and benefits stop at the taxable maximum, {usd(184_500)} in 2026. Earnings above it don&rsquo;t raise your benefit. Earning at
          the cap for 35 years in today&rsquo;s terms gives an AIME of about {usd(15_375)} and a full retirement age benefit near {usd(4_369)} in our simple
          estimate.
        </p>
        <p>
          SSA&rsquo;s official maximum for someone reaching full retirement age in 2026 is lower, $4,152, because the caps and bend points used are from earlier
          years. For high earners, Social Security replaces a small share of pay, and the rest must come from savings.
        </p>
      </GuideSection>

      <GuideSection id="deciding" n={18} kicker="Your choice" title="How to decide when to claim">
        <ul>
          <li>
            <strong>Health and family history.</strong>{" "}If you expect to live past your early 80s, waiting usually pays more.
          </li>
          <li>
            <strong>Marriage.</strong>{" "}The higher earner&rsquo;s claiming age sets the survivor benefit, often the most important number for a couple.
          </li>
          <li>
            <strong>Other income.</strong>{" "}If you need the money and have no savings to draw on, claiming early may be the only option.
          </li>
          <li>
            <strong>Work.</strong>{" "}If you are still earning well above $24,480, claiming before full retirement age mostly gets withheld anyway.
          </li>
          <li>
            <strong>Taxes.</strong>{" "}Waiting and drawing on IRAs first can lower lifetime taxes and leave room for{" "}
            <a href="/us/savings/roth-conversion-calculator">Roth conversions</a>{" "}before benefits start.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="bridge" n={19} kicker="Planning" title="Bridging the gap with savings">
        <p>
          If you retire at 62 but want to claim at 70, your savings must cover eight years on their own. That is a large draw, but it buys a bigger,
          inflation-protected income for life, which works like longevity insurance. Our <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}
          checks whether your savings can cover the bridge, and the <a href="/us/savings/rmd-calculator">RMD calculator</a>{" "}shows the withdrawals the IRS
          will require from 73 or 75.
        </p>
        <Timeline
          items={[
            { when: "Age 62", what: "Earliest claim", detail: "70% of the full benefit with an FRA of 67." },
            { when: "Age 65", what: "Medicare", detail: "Enroll even if you delay Social Security; premiums are then paid directly." },
            { when: "Age 67", what: "Full retirement age", detail: "100% of your PIA; the earnings test stops." },
            { when: "Age 70", what: "Maximum benefit", detail: "124% of your PIA. Apply by now." },
          ]}
        />
      </GuideSection>

      <GuideSection id="statement" n={20} kicker="Do this" title="Check your own record">
        <p>
          Sign in at ssa.gov/myaccount to see your full earnings history and SSA&rsquo;s estimates at 62, full retirement age and 70. Check every year&rsquo;s
          earnings: a missing year from an employer error lowers your benefit, and it is easier to fix while you still have W-2s. Then enter the full
          retirement age figure into the calculator under &quot;My statement&quot; to compare ages, break-even and tax with your real numbers.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["Cost-of-living adjustment", "2.8%"],
            ["Bend points", "$1,286 and $7,749"],
            ["Taxable maximum", "$184,500"],
            ["Earnings test, under FRA", "$24,480"],
            ["Earnings test, year of FRA", "$65,160"],
            ["Maximum benefit at FRA", "$4,152 a month"],
            ["Average retired worker", "About $2,071 a month"],
            ["Full retirement age, born 1960+", "67"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

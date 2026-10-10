import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Traditional IRA — the guide. Figures from src/lib/us/retirement-income.ts (iraDeduction, deductionSaving, iraCompare) and savings.ts (grow). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a traditional IRA is" },
  { id: "limits", title: "The 2026 contribution limit" },
  { id: "deduction", title: "Who can deduct a contribution" },
  { id: "phase-out", title: "Working out a partial deduction" },
  { id: "tax-saved", title: "How much tax the deduction saves" },
  { id: "growth", title: "How much a traditional IRA can grow" },
  { id: "withdrawal-tax", title: "Tax when you take money out" },
  { id: "vs-roth", title: "Traditional or Roth: the tax-rate test" },
  { id: "vs-taxable", title: "Traditional IRA vs a taxable account" },
  { id: "nondeductible", title: "Nondeductible contributions" },
  { id: "with-401k", title: "Using an IRA with a 401(k)" },
  { id: "early", title: "Early withdrawals and exceptions" },
  { id: "rmds", title: "Required minimum distributions" },
  { id: "rollovers", title: "Rollovers from old 401(k)s" },
  { id: "spousal", title: "Spousal IRAs" },
  { id: "deadlines", title: "Deadlines and timing" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500", href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
  { label: "IRS — Notice 2025-67, 2026 cost-of-living adjustments", href: "https://www.irs.gov/pub/irs-drop/n-25-67.pdf" },
  { label: "IRS — IRA deduction limits", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits" },
  { label: "IRS — Publication 590-A, Contributions to IRAs", href: "https://www.irs.gov/publications/p590a" },
  { label: "IRS — Publication 590-B, Distributions from IRAs", href: "https://www.irs.gov/publications/p590b" },
  { label: "IRS — Retirement topics: exceptions to tax on early distributions", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions" },
];

export default function IraGuide() {
  return (
    <Guide
      kicker="The traditional IRA guide"
      title="How a traditional IRA works, and what it saves you"
      intro={
        <>
          A traditional IRA can cut your tax bill now and let your savings grow untaxed until retirement. This guide covers the 2026 limit, who can deduct a
          contribution and how a partial deduction is worked out, how much tax you really save, and when a traditional IRA beats a Roth or a taxable
          account.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You can put up to $7,500 in IRAs in 2026, or $8,600 at 50 and over.</li>
          <li>Without a workplace plan, the whole contribution is deductible at any income.</li>
          <li>With one, the deduction phases out from $81,000 to $91,000 of modified AGI (single) or $129,000 to $149,000 (joint).</li>
          <li>A single filer earning {usd(85_000)} saves about {usd(1_650)} of federal tax on a {usd(7_500)} deduction.</li>
          <li>It beats a Roth when your tax rate in retirement is lower than today; with equal rates they tie.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$7,500", label: "2026 limit under 50" },
            { value: "$8,600", label: "2026 limit at 50+" },
            { value: "$81k–$91k", label: "Single phase-out (covered)" },
            { value: "$129k–$149k", label: "Joint phase-out (covered)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a traditional IRA is">
        <p>
          An individual retirement arrangement (IRA) is an account you open yourself at a brokerage, bank or robo-adviser. With a <strong>traditional</strong>{" "}
          IRA, contributions may be deductible, investments grow without yearly tax, and withdrawals in retirement are taxed as ordinary income. It is the
          mirror image of a <a href="/us/savings/roth-ira-calculator">Roth IRA</a>, where you pay tax now and withdraw tax-free later.
        </p>
        <p>
          The deduction is &quot;above the line&quot;: it lowers your adjusted gross income whether or not you itemize, which can also help you qualify for
          other credits and deductions.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={3} kicker="2026 rules" title="The 2026 contribution limit">
        <DataTable
          caption="2026 IRA contribution limits (traditional and Roth combined)"
          head={["Your age at the end of 2026", "Limit"]}
          numeric={[1]}
          rows={[
            ["Under 50", "$7,500"],
            ["50 and over", "$8,600"],
          ]}
        />
        <p>
          You can&rsquo;t contribute more than your earned income for the year: wages, tips and net self-employment income. Pensions, interest, dividends and
          rental income don&rsquo;t count. There is no upper age limit to contribute and no income limit; income only affects the deduction.
        </p>
      </GuideSection>

      <GuideSection id="deduction" n={4} kicker="The key rule" title="Who can deduct a contribution">
        <p>
          It depends on whether you, or your spouse, are an &quot;active participant&quot; in a retirement plan at work for the year, such as a 401(k), 403(b),
          SIMPLE IRA or pension. Box 13 of your W-2 shows it.
        </p>
        <DataTable
          caption="2026 deduction phase-out ranges (modified AGI)"
          head={["Situation", "Full deduction up to", "No deduction from"]}
          numeric={[1, 2]}
          rows={[
            ["No workplace plan for you or your spouse", "Any income", "—"],
            ["Single or head of household, covered", "$81,000", "$91,000"],
            ["Married filing jointly, you are covered", "$129,000", "$149,000"],
            ["Married filing jointly, only your spouse is covered", "$242,000", "$252,000"],
            ["Married filing separately, either covered", "$0", "$10,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="phase-out" n={5} kicker="The worksheet" title="Working out a partial deduction">
        <p>
          Inside the range, the deductible amount falls in proportion to how far through it your income is. It is rounded up to the next $10, and if it is
          above zero but below $200, you can still deduct $200.
        </p>
        <WorkedExample
          title="Single, age 40, covered at work, modified AGI $86,000"
          steps={[
            { label: "Distance from the top: $91,000 − $86,000", value: "$5,000" },
            { label: "Share of the $10,000 range", value: "50%" },
          ]}
          total={{ label: "Deductible: $7,500 × 50%", value: "$3,750" }}
        />
        <DataTable
          caption="Deductible amount, single filer under 50 covered at work"
          head={["Modified AGI", "Deductible"]}
          numeric={[1]}
          rows={[
            ["$80,000", "$7,500"],
            ["$82,000", "$6,750"],
            ["$84,000", "$5,250"],
            ["$86,000", "$3,750"],
            ["$88,000", "$2,250"],
            ["$90,000", "$750"],
            ["$91,000", "$0"],
          ]}
        />
        <p>
          At 50 and over the same income gives a larger deduction, because the $8,600 limit is the starting point: {usd(4_300)} at {usd(86_000)}. For a
          couple filing jointly where you are covered, the range is twice as wide: {usd(3_750)} at {usd(139_000)}.
        </p>
      </GuideSection>

      <GuideSection id="tax-saved" n={6} kicker="Real money" title="How much tax the deduction saves">
        <p>
          The saving is the tax on the income the deduction removes, at the rates that income would have paid. The calculator runs the 2026 federal tax
          engine with and without the deduction.
        </p>
        <DataTable
          caption="Federal tax saved by a $7,500 deduction, 2026"
          head={["Income and status", "Tax saved", "Rate"]}
          numeric={[1, 2]}
          rows={[
            ["$40,000, single", usd(900), "12%"],
            ["$60,000, single", usd(900), "12%"],
            ["$85,000, single", usd(1_650), "22%"],
            ["$140,000, married filing jointly", usd(1_600), "21.3%"],
          ]}
        />
        <p>
          At {usd(140_000)} joint, the deduction straddles the 12% and 22% brackets, so the saving is a blend. State tax adds more: in California, the same
          single filer on {usd(85_000)} saves about {usd(685)} of state tax on top, {usd(2_335)} in all. Our{" "}
          <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows which bracket your last dollars fall in.
        </p>
      </GuideSection>

      <GuideSection id="growth" n={7} kicker="Compounding" title="How much a traditional IRA can grow">
        <Figure label="$7,500 a year at 7%, by years of saving" caption="Contributions spread monthly; balance at the end; figures from the calculator's growth engine.">
          <Bars
            format={usd}
            items={[
              { label: "10 years", value: 108_178 },
              { label: "20 years", value: 325_579 },
              { label: "25 years", value: 506_295 },
              { label: "30 years", value: 762_482 },
            ]}
          />
        </Figure>
        <p>
          Inside the IRA, dividends and gains aren&rsquo;t taxed each year, so all of the return compounds. Someone who starts at 50 and contributes the{" "}
          {usd(8_600)} catch-up limit for 15 years at 7% builds about {usd(227_156)}. Our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows the effect of different rates.
        </p>
      </GuideSection>

      <GuideSection id="withdrawal-tax" n={8} kicker="The catch" title="Tax when you take money out">
        <p>
          Every dollar of deductible contributions and all the growth is taxed as ordinary income when it comes out. The calculator applies one rate to the
          whole balance, the rate you expect on your marginal dollar in retirement. Many retirees fall in the 10% or 12% federal brackets; those with large
          pensions or IRAs may stay at 22% or more.
        </p>
        <WorkedExample
          title="$7,500 a year for 25 years at 7%, then 15% tax on withdrawals"
          steps={[
            { label: "Traditional IRA balance", value: usd(506_295) },
            { label: "Tax at 15%", value: usd(75_944) },
          ]}
          total={{ label: "You keep", value: usd(430_351) }}
        />
      </GuideSection>

      <GuideSection id="vs-roth" n={9} kicker="Choosing" title="Traditional or Roth: the tax-rate test">
        <p>
          Compare the two fairly: same cost to you each year. A {usd(7_500)} deductible contribution at 22% costs you {usd(5_850)} after the tax saving; the
          same {usd(5_850)} can go in a Roth.
        </p>
        <DataTable
          caption="What you keep after 25 years at 7%, same yearly cost"
          head={["Tax rate now → in retirement", "Traditional", "Roth", "Taxable account"]}
          numeric={[1, 2, 3]}
          rows={[
            ["22% → 15%", usd(430_351), usd(394_910), usd(352_888)],
            ["22% → 22%", usd(394_910), usd(394_910), usd(352_888)],
            ["12% → 22%", usd(394_910), usd(445_539), usd(398_130)],
          ]}
        />
        <p>
          When the rates match, the two tie exactly; the difference is only the rate you deduct at versus the rate you pay later. If you are unsure, having
          some money in each gives you flexibility to manage your bracket in retirement.
        </p>
      </GuideSection>

      <GuideSection id="vs-taxable" n={10} kicker="Why bother" title="Traditional IRA vs a taxable account">
        <p>
          In an ordinary brokerage account, dividends are taxed each year and gains when you sell. In the example above (1.5% dividend yield, 15% tax on
          dividends and gains), the taxable account leaves about {usd(352_888)} against {usd(430_351)} in the traditional IRA when the retirement rate is 15%.
          The taxable account wins only on flexibility: no penalty for early access and no RMDs.
        </p>
      </GuideSection>

      <GuideSection id="nondeductible" n={11} kicker="High earners" title="Nondeductible contributions">
        <p>
          Above the phase-out you can still contribute, without a deduction. The after-tax amount (your basis) comes back tax-free; only the growth is taxed
          on withdrawal. File Form 8606 every year, or you risk paying tax on the same money twice.
        </p>
        <WorkedExample
          title="$7,500 nondeductible a year for 25 years at 7%, 15% tax on withdrawal"
          steps={[
            { label: "Balance", value: usd(506_295) },
            { label: "Basis (tax-free)", value: usd(187_500) },
            { label: "Tax on the growth at 15%", value: usd(506_295 - 458_476) },
          ]}
          total={{ label: "You keep", value: usd(458_476) }}
        />
        <p>
          That is only a little more than the {usd(452_420)} a taxable account would leave, and growth is taxed at income rates rather than capital gains
          rates. Most people in this position instead convert the contribution to a Roth straight away, the backdoor Roth; our{" "}
          <a href="/us/savings/roth-conversion-calculator">Roth conversion calculator</a>{" "}shows the tax on a conversion.
        </p>
      </GuideSection>

      <GuideSection id="with-401k" n={12} kicker="Order of saving" title="Using an IRA with a 401(k)">
        <p>
          A workplace plan doesn&rsquo;t stop you having an IRA; it only limits the deduction. A common order is: 401(k) up to the full employer match, then an
          IRA (deductible traditional if you qualify, otherwise Roth), then back to the 401(k) toward its $24,500 limit. Our{" "}
          <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows what the workplace part could reach.
        </p>
      </GuideSection>

      <GuideSection id="early" n={13} kicker="Access" title="Early withdrawals and exceptions">
        <p>
          Withdrawals before 59½ are taxed and usually also cost a 10% additional tax. IRAs have more exceptions than 401(k)s:
        </p>
        <ul>
          <li>Up to $10,000 (lifetime) toward a first home.</li>
          <li>Qualified higher education expenses.</li>
          <li>Health insurance premiums while unemployed, and medical bills above 7.5% of AGI.</li>
          <li>Disability, terminal illness, and a series of substantially equal periodic payments.</li>
          <li>Up to $1,000 a year for a personal emergency, and birth or adoption costs up to $5,000.</li>
        </ul>
      </GuideSection>

      <GuideSection id="rmds" n={14} kicker="Later life" title="Required minimum distributions">
        <p>
          From 73, or 75 if you were born in 1960 or later, you must take a minimum amount out each year, starting at about 3.8% of the balance and rising.
          Large traditional balances can produce RMDs big enough to push you into a higher bracket and make more of your Social Security taxable. Our{" "}
          <a href="/us/savings/rmd-calculator">RMD calculator</a>{" "}projects them.
        </p>
      </GuideSection>

      <GuideSection id="rollovers" n={15} kicker="Changing jobs" title="Rollovers from old 401(k)s">
        <p>
          When you leave a job you can roll your 401(k) into a traditional IRA without tax. Use a direct rollover (trustee to trustee); if the plan pays
          you, it must withhold 20% and you have 60 days to deposit the full amount. Rollovers don&rsquo;t count toward the $7,500 limit. Watch out if you
          plan backdoor Roth contributions: pre-tax IRA money makes part of each conversion taxable under the pro-rata rule.
        </p>
      </GuideSection>

      <GuideSection id="spousal" n={16} kicker="Couples" title="Spousal IRAs">
        <p>
          A spouse with little or no income can contribute to their own IRA if you file jointly and your joint earned income covers both contributions. If
          the non-working spouse isn&rsquo;t covered by a plan but the other is, their deduction phases out only between $242,000 and $252,000.
        </p>
        <CompareCards
          columns={[
            { name: "Working spouse (covered)", rows: [{ label: "Limit", value: "$7,500" }, { label: "Deduction phase-out", value: "$129,000 to $149,000" }] },
            { name: "Non-working spouse", rows: [{ label: "Limit", value: "$7,500" }, { label: "Deduction phase-out", value: "$242,000 to $252,000" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="deadlines" n={17} kicker="Dates" title="Deadlines and timing">
        <p>
          You can contribute for 2026 from January 1, 2026 to April 15, 2027. Because the deduction depends on your final modified AGI, waiting until you
          file can make sense if you are near a phase-out. Tell your provider which year each contribution is for.
        </p>
        <Callout title="The Saver's Credit">
          Low and moderate earners can also get a credit of 10% to 50% of up to $2,000 of contributions. In 2026 it ends at $40,250 of AGI for single
          filers, $60,375 for heads of household and $80,500 for married couples filing jointly.
        </Callout>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Leaving the money in cash inside the IRA.</li>
          <li>Claiming a deduction you aren&rsquo;t entitled to because of a workplace plan.</li>
          <li>Not filing Form 8606 for nondeductible contributions.</li>
          <li>Contributing more than your earned income or the limit (a 6% excise tax each year it stays).</li>
          <li>Taking an indirect rollover and missing the 60-day window.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["IRA contribution limit", "$7,500"],
            ["Catch-up at 50+", "$1,100"],
            ["Covered, single / head of household", "$81,000 to $91,000"],
            ["Covered, married filing jointly", "$129,000 to $149,000"],
            ["Spouse covered, filing jointly", "$242,000 to $252,000"],
            ["Married filing separately", "$0 to $10,000"],
            ["Deadline for 2026 contributions", "April 15, 2027"],
            ["Early withdrawal tax before 59½", "10%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** 401(k) — the guide. Figures from src/lib/us/savings.ts (k401Projection, k401Limit). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a 401(k) is" },
  { id: "limits", title: "The 2026 contribution limits" },
  { id: "catch-up", title: "Catch-up contributions at 50 and 60 to 63" },
  { id: "roth-catch-up", title: "The new Roth catch-up rule" },
  { id: "match", title: "How an employer match works" },
  { id: "missed", title: "The cost of missing the match" },
  { id: "example", title: "A worked example" },
  { id: "how-much", title: "How much to contribute" },
  { id: "start", title: "Why starting early matters" },
  { id: "fees", title: "Fees: the quiet drag" },
  { id: "roth-traditional", title: "Roth or traditional contributions" },
  { id: "vesting", title: "Vesting and changing jobs" },
  { id: "inflation", title: "Today's dollars and inflation" },
  { id: "investments", title: "Choosing investments" },
  { id: "withdrawals", title: "Taking money out" },
  { id: "loans", title: "401(k) loans and hardship withdrawals" },
  { id: "beyond", title: "When you hit the limit" },
  { id: "using", title: "Using the calculator well" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — 401(k) limit increases to $24,500 for 2026", href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
  { label: "IRS — Retirement topics: catch-up contributions", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions" },
  { label: "IRS — 401(k) plan overview", href: "https://www.irs.gov/retirement-plans/plan-sponsor/401k-plan-overview" },
  { label: "IRS — Retirement topics: exceptions to tax on early distributions", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions" },
  { label: "U.S. Department of Labor — A look at 401(k) plan fees", href: "https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/a-look-at-401k-plan-fees" },
  { label: "Investor.gov — Compound interest calculator", href: "https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator" },
];

export default function K401Guide() {
  return (
    <Guide
      kicker="The 401(k) guide"
      title="How your 401(k) grows, and how to get the most from it"
      intro={
        <>
          A 401(k) is the main way most Americans save for retirement. This guide explains the 2026 limits, catch-up contributions, the new Roth
          rule for higher earners, how employer matches work, and why fees, time and inflation matter so much over a career.
        </>
      }
      meta={["Worked examples", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>In 2026 you can put up to $24,500 of your pay into a 401(k), plus $8,000 from age 50 or $11,250 from 60 to 63.</li>
          <li>Always contribute at least enough to get your employer&rsquo;s full match. It is the best return you will find.</li>
          <li>
            A 30-year-old earning $75,000 who saves 6% with a 50% match, starting from $20,000, could reach about {usd(1_644_822)} by 67 at 7% a
            year before 0.5% fees. That is about {usd(659_684)} in today&rsquo;s dollars.
          </li>
          <li>Fees, time in the market and your contribution rate change the result far more than most people expect.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$24,500", label: "2026 employee limit" },
            { value: "$32,500", label: "Limit at 50 to 59 and 64+" },
            { value: "$35,750", label: "Limit at 60 to 63" },
            { value: "$72,000", label: "Total limit incl. employer" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a 401(k) is">
        <p>
          A 401(k) is a retirement savings plan run by an employer. You choose a share of each paycheck to put in, and it goes into investments
          you pick from the plan&rsquo;s menu, usually mutual funds or target-date funds. Many employers add money of their own, either as a
          match on what you put in or as a flat contribution.
        </p>
        <p>
          The account has tax advantages. With <strong>traditional</strong> contributions, the money comes out of your pay before federal income
          tax, so your taxable income falls; you pay tax when you withdraw it in retirement. With <strong>Roth</strong> contributions, you pay
          tax now, but qualified withdrawals, including all the growth, are tax-free. In both cases the investments grow without yearly tax on
          dividends or gains, which helps compounding. Social Security and Medicare taxes still apply to your contributions either way. To see how
          a contribution changes your take-home pay, try our <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>.
        </p>
        <p>
          Similar plans exist for other employers: 403(b) plans for schools and nonprofits, governmental 457(b) plans and the federal Thrift
          Savings Plan. They share the same $24,500 limit in 2026, and this calculator works for them too.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={3} kicker="2026 rules" title="The 2026 contribution limits">
        <p>
          The IRS raises the limits most years for inflation. For 2026 the employee deferral limit is $24,500, up from $23,500 in 2025. That cap
          covers your own contributions across every 401(k), 403(b) and similar plan you have in the year, whether traditional or Roth. If you
          change jobs mid-year, you must keep the total across both employers under the limit yourself.
        </p>
        <DataTable
          caption="2026 limits on your own 401(k) contributions"
          head={["Your age at the end of 2026", "Base limit", "Catch-up", "Total"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Under 50", "$24,500", "None", usd(24_500)],
            ["50 to 59", "$24,500", "$8,000", usd(32_500)],
            ["60 to 63", "$24,500", "$11,250", usd(35_750)],
            ["64 and over", "$24,500", "$8,000", usd(32_500)],
          ]}
        />
        <p>
          A separate limit covers everything that goes into your account in a year from you and your employer together: $72,000 for 2026, not
          counting catch-ups. Few people reach it unless their employer is very generous or they make after-tax contributions.
        </p>
      </GuideSection>

      <GuideSection id="catch-up" n={4} kicker="Age 50 and over" title="Catch-up contributions at 50 and 60 to 63">
        <p>
          Once you reach 50 (you only need to turn 50 by December 31), you can put an extra $8,000 into your 401(k) in 2026. The SECURE 2.0 Act
          added a larger &quot;super catch-up&quot; for people who are 60, 61, 62 or 63 at the end of the year: $11,250 instead of $8,000. At 64
          the catch-up drops back to the regular amount.
        </p>
        <p>
          Catch-ups are useful if you started late, took time out of work, or your income has risen. Your plan must allow them, which nearly all
          large plans do. The calculator applies the right limit for your age in each year of the projection, so catch-ups start at 50, rise from 60
          to 63 and fall back at 64. It keeps the dollar limits at their 2026 levels, so for a long projection it slightly understates what a
          maximum saver could put in.
        </p>
      </GuideSection>

      <GuideSection id="roth-catch-up" n={5} kicker="New for 2026" title="The new Roth catch-up rule">
        <p>
          From January 1, 2026, higher earners must make their catch-up contributions as Roth. The rule applies if your FICA wages (Social
          Security wages, box 3 of your W-2) from the employer sponsoring the plan were more than $150,000 in the previous year. For 2026, that
          means 2025 wages over $150,000. The threshold started at $145,000 in the law and is adjusted for inflation in $5,000 steps.
        </p>
        <Callout title="What changes, and what doesn't">
          Only the catch-up part has to be Roth. Your first $24,500 can still be traditional. If your plan doesn&rsquo;t offer Roth contributions, it
          cannot let affected employees make catch-ups at all. Wages from a different employer don&rsquo;t count, and the rule does not apply to
          self-employed people with no FICA wages.
        </Callout>
        <p>
          In practice it means less of an immediate tax cut for affected savers. A 55-year-old in the 32% bracket who puts in the full $8,000 catch-up
          as Roth pays tax on that $8,000 now instead of saving $2,560 of federal tax this year, but the money and its growth come out tax-free later.
        </p>
      </GuideSection>

      <GuideSection id="match" n={6} kicker="Free money" title="How an employer match works">
        <p>
          A match is money your employer adds when you contribute. Plans describe it as a rate and a cap. &quot;50% up to 6%&quot; means 50 cents
          for every dollar you put in, on contributions up to 6% of your pay. &quot;100% up to 4%&quot; means dollar for dollar on the first 4%.
        </p>
        <CompareCards
          columns={[
            {
              name: "50% up to 6% on $75,000",
              rows: [
                { label: "You contribute to get it all", value: "6% = $4,500" },
                { label: "Employer adds", value: "$2,250" },
                { label: "Instant return on your money", value: "50%" },
              ],
            },
            {
              name: "100% up to 4% on $75,000",
              rows: [
                { label: "You contribute to get it all", value: "4% = $3,000" },
                { label: "Employer adds", value: "$3,000" },
                { label: "Instant return on your money", value: "100%" },
              ],
            },
          ]}
        />
        <p>
          Some employers also make a <strong>non-elective</strong> contribution, such as a 3% safe harbor contribution, which you get whether or
          not you save anything yourself. Enter it under More options. Matches are often paid each pay period, so if you hit the yearly limit
          early by contributing a high percentage, check whether your plan has a &quot;true-up&quot; or you may lose part of the match.
        </p>
      </GuideSection>

      <GuideSection id="missed" n={7} kicker="Don't leave it behind" title="The cost of missing the match">
        <p>
          Contributing 3% when your employer matches 50% up to 6% leaves $1,125 a year of free money unclaimed on a $75,000 salary. Over a career
          the effect is large, because the missed match would also have grown.
        </p>
        <WorkedExample
          title="Age 30 to 67, $75,000 rising 3% a year, $20,000 to start, 7% return, 0.5% fees"
          steps={[
            { label: "Contribute 6%: employer adds", value: usd(148_892) },
            { label: "Contribute 3%: employer adds", value: usd(74_446) },
            { label: "Balance at 67 contributing 6%", value: usd(1_644_822) },
            { label: "Balance at 67 contributing 3%", value: usd(923_955) },
          ]}
          total={{ label: "Difference at retirement", value: usd(1_644_822 - 923_955) }}
        />
        <p>
          Your own extra 3% accounts for part of that gap and the lost match for the rest. If money is tight, getting to the full match is still
          usually the first saving goal, ahead of extra payments on low-rate debt.
        </p>
      </GuideSection>

      <GuideSection id="example" n={8} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Age 30, $75,000 salary, 6% contribution, 50% match up to 6%, retire at 67"
          steps={[
            { label: "First year: you contribute 6%", value: "$4,500" },
            { label: "First year: employer match", value: "$2,250" },
            { label: "Your contributions over 37 years", value: usd(297_784) },
            { label: "Employer contributions over 37 years", value: usd(148_892) },
            { label: "Investment growth", value: usd(1_178_146) },
          ]}
          total={{ label: "Balance at 67", value: usd(1_644_822) }}
        />
        <p>
          The example assumes pay rises 3% a year, a 7% yearly return before 0.5% fees, and a $20,000 starting balance. Growth makes up more than
          two-thirds of the final balance: that is compounding at work. In today&rsquo;s dollars, with 2.5% inflation, the balance is worth about{" "}
          {usd(659_684)}. Our <a href="/us/savings/compound-interest-calculator">compound interest calculator</a> shows the same effect for any
          savings.
        </p>
      </GuideSection>

      <GuideSection id="how-much" n={9} kicker="Saving rate" title="How much to contribute">
        <Figure label="Balance at 67 by contribution rate" caption="Same example: age 30, $75,000, 50% match up to 6%, 7% return, 0.5% fees.">
          <Bars
            format={usd}
            items={[
              { label: "3% of pay", value: 923_955 },
              { label: "6% of pay", value: 1_644_822 },
              { label: "10% of pay", value: 2_285_593 },
              { label: "15% of pay", value: 3_086_448 },
            ]}
          />
        </Figure>
        <p>
          A common rule of thumb is to save about 15% of your pay for retirement, counting your employer&rsquo;s share. If you can&rsquo;t start
          there, many plans offer automatic increases of 1% a year, which you barely notice when they line up with a raise. Our{" "}
          <a href="/us/savings/retirement-calculator">retirement calculator</a> works backward from the income you want to the saving you need.
        </p>
      </GuideSection>

      <GuideSection id="start" n={10} kicker="Time" title="Why starting early matters">
        <Figure label="Balance at 67, starting from zero" caption="$75,000 salary at the start, 6% contribution, 50% match up to 6%, 3% raises, 7% return, 0.5% fees.">
          <Bars
            format={usd}
            items={[
              { label: "Start at 25", value: 2_097_265 },
              { label: "Start at 35", value: 975_065 },
              { label: "Start at 45", value: 412_603 },
            ]}
          />
        </Figure>
        <p>
          Each decade of delay roughly halves the result, because the money that goes in early has the longest time to compound. Starting at 25
          instead of 35 more than doubles the balance at 67 even though only ten extra years of contributions go in.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={11} kicker="Costs" title="Fees: the quiet drag">
        <p>
          Every fund charges an expense ratio, and some plans add administration fees. They are taken from your balance every year, so they
          compound against you. The Department of Labor&rsquo;s guide to 401(k) fees gives an example in which fees just one percentage point
          higher cut the balance after 35 years by 28%.
        </p>
        <DataTable
          caption="Balance at 67 in the main example by yearly fees"
          head={["Fees a year", "Balance at 67", "Compared with 0.5%"]}
          numeric={[1, 2]}
          rows={[
            ["0.1%", usd(1_812_944), "+" + usd(1_812_944 - 1_644_822)],
            ["0.5%", usd(1_644_822), "—"],
            ["1.0%", usd(1_459_506), "−" + usd(1_644_822 - 1_459_506)],
          ]}
        />
        <p>
          Look up the expense ratios on your plan&rsquo;s fee disclosure. Broad index funds often charge well under 0.1%; actively managed funds
          often charge 0.5% to 1% or more.
        </p>
      </GuideSection>

      <GuideSection id="roth-traditional" n={12} kicker="Tax" title="Roth or traditional contributions">
        <CompareCards
          columns={[
            {
              name: "Traditional",
              rows: [
                { label: "Tax now", value: "Lower: contributions are pre-tax" },
                { label: "Tax later", value: "Withdrawals taxed as income" },
                { label: "Required withdrawals", value: "From 73 for most people today" },
                { label: "Suits", value: "High bracket now, lower later" },
              ],
            },
            {
              name: "Roth",
              rows: [
                { label: "Tax now", value: "No cut: contributions are after tax" },
                { label: "Tax later", value: "Qualified withdrawals tax-free" },
                { label: "Required withdrawals", value: "None from a Roth 401(k) since 2024" },
                { label: "Suits", value: "Low bracket now, or higher later" },
              ],
            },
          ]}
        />
        <p>
          The deciding question is whether your tax rate is higher now or in retirement, which nobody knows for sure. Many people split their
          contributions to keep options open. Employer matches have traditionally gone in as pre-tax money, though plans may now let you take them
          as Roth. Use our <a href="/us/taxes/federal-income-tax">federal income tax calculator</a> to see your bracket, and the{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a> to compare tax-free growth outside work.
        </p>
      </GuideSection>

      <GuideSection id="vesting" n={13} kicker="Ownership" title="Vesting and changing jobs">
        <p>
          Your own contributions are always 100% yours. Employer contributions may vest over time. A &quot;cliff&quot; schedule gives you nothing
          until a set date (no more than three years), then everything; a &quot;graded&quot; schedule vests a share each year, reaching 100% by
          six years at most. Safe harbor contributions usually vest at once.
        </p>
        <p>When you leave a job you have four choices:</p>
        <ul>
          <li>Leave the money in the old plan, if the balance is large enough for the plan to allow it.</li>
          <li>Roll it into your new employer&rsquo;s 401(k).</li>
          <li>Roll it into an IRA, which often gives a wider choice of cheaper funds.</li>
          <li>Cash it out. This is almost always a mistake: it is taxed as income, usually with a 10% penalty if you are under 59½, and the money stops growing.</li>
        </ul>
      </GuideSection>

      <GuideSection id="inflation" n={14} kicker="Real value" title="Today's dollars and inflation">
        <p>
          A balance decades away is in future dollars. At 2.5% inflation, prices more than double in 37 years, so {usd(1_644_822)} then would buy
          about what {usd(659_684)} buys today. The calculator shows both. Plan with the today&rsquo;s-dollars figure: it tells you what kind of
          lifestyle the money would support.
        </p>
        <Callout tone="warn" title="Limits don't stay still">
          The calculator holds the contribution limit at its 2026 level. In reality the IRS raises it with inflation, so someone saving the maximum
          could put in more each year than shown here.
        </Callout>
      </GuideSection>

      <GuideSection id="investments" n={15} kicker="Choices" title="Choosing investments">
        <p>
          Most plans offer a target-date fund, which holds a mix of stocks and bonds that becomes more cautious as your retirement year nears. It
          is a reasonable default if you don&rsquo;t want to manage the mix yourself. Others offer index funds for US stocks, international stocks
          and bonds that you can combine.
        </p>
        <p>
          The 7% default return reflects a long-run, mostly stock portfolio before inflation. Stock-heavy portfolios have fallen by a third or more
          in bad years. A portfolio with more bonds is steadier but should be expected to earn less; try 5% or 6% to see the difference.
        </p>
      </GuideSection>

      <GuideSection id="withdrawals" n={16} kicker="Getting it out" title="Taking money out">
        <Timeline
          items={[
            { when: "Before 59½", what: "Income tax plus a 10% penalty", detail: "Unless an exception applies, such as disability or certain medical costs." },
            { when: "Age 55", what: "Rule of 55", detail: "If you leave your job in or after the year you turn 55, you can take money from that employer's plan without the 10% penalty." },
            { when: "59½", what: "Penalty-free withdrawals", detail: "Traditional money is taxed as income; qualified Roth money is tax-free." },
            { when: "73", what: "Required minimum distributions", detail: "Traditional balances must start paying out each year; the age rises to 75 for people born in 1960 or later." },
          ]}
        />
      </GuideSection>

      <GuideSection id="loans" n={17} kicker="Borrowing" title="401(k) loans and hardship withdrawals">
        <p>
          Many plans let you borrow from your own balance, usually up to half of your vested balance or $50,000, whichever is less, repaid
          through payroll within five years. The interest goes back into your account, but the borrowed money is out of the market while it is
          lent, and if you leave your job the loan may have to be repaid quickly or be treated as a withdrawal.
        </p>
        <p>
          Hardship withdrawals are for immediate and heavy financial needs. They can&rsquo;t be paid back, are taxed, and are usually subject to the
          10% penalty. Both are best kept for real emergencies; an emergency fund in a savings account is a better first line of defense.
        </p>
      </GuideSection>

      <GuideSection id="beyond" n={18} kicker="Saving more" title="When you hit the limit">
        <p>
          If you max out your 401(k), the usual next steps are an IRA (a Roth IRA if your income allows, $7,500 in 2026 plus $1,100 from age 50),
          a health savings account if you have a qualifying high-deductible health plan, and then a taxable brokerage account. Some plans also allow
          after-tax contributions up to the $72,000 total limit, which can be converted to Roth.
        </p>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="Tips" title="Using the calculator well">
        <ul>
          <li>Enter your contribution rate and match exactly as your plan documents describe them.</li>
          <li>Add any flat employer contribution, such as a safe harbor 3%, under More options.</li>
          <li>Try a lower return (5%) to see a cautious case, and compare fee levels.</li>
          <li>Read the today&rsquo;s-dollars figure for planning; the headline figure is in future dollars.</li>
          <li>Copy the link to save your figures and come back after your next raise.</li>
        </ul>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Contributing less than the match.</li>
          <li>Leaving old 401(k)s scattered across past employers and forgetting them.</li>
          <li>Cashing out when changing jobs.</li>
          <li>Paying high fees without checking for cheaper index funds in the plan.</li>
          <li>Selling in a panic after a market fall, which locks in the loss.</li>
          <li>Forgetting the limit when you have two employers in one year.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["Employee contribution limit", "$24,500"],
            ["Catch-up, age 50+", "$8,000"],
            ["Catch-up, ages 60 to 63", "$11,250"],
            ["Total limit incl. employer (before catch-ups)", "$72,000"],
            ["Roth catch-up wage threshold (2025 FICA wages)", "$150,000"],
            ["IRA limit / catch-up", "$7,500 / $1,100"],
            ["Penalty-free withdrawals from", "Age 59½ (55 if you leave your job)"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

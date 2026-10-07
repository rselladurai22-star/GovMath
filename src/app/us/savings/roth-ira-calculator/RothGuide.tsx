import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Roth IRA — the guide. Figures from src/lib/us/savings.ts (rothLimit, grow) and savings-extra.ts (rothVsTaxable). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a Roth IRA is" },
  { id: "limits", title: "The 2026 contribution limit" },
  { id: "income", title: "Income limits and the phase-out" },
  { id: "reduced", title: "Working out a reduced contribution" },
  { id: "earned", title: "You need earned income" },
  { id: "growth", title: "How much a Roth IRA can grow" },
  { id: "taxable", title: "Roth IRA vs a taxable account" },
  { id: "traditional", title: "Roth or traditional IRA" },
  { id: "withdrawals", title: "Taking money out" },
  { id: "five-year", title: "The five-year rules" },
  { id: "backdoor", title: "The backdoor Roth IRA" },
  { id: "pro-rata", title: "The pro-rata trap" },
  { id: "with-401k", title: "Using a Roth IRA with a 401(k)" },
  { id: "deadlines", title: "Deadlines and timing" },
  { id: "excess", title: "If you put in too much" },
  { id: "spousal", title: "Spousal Roth IRAs" },
  { id: "investing", title: "What to invest in" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "conversions", title: "Converting to a Roth IRA" },
  { id: "young", title: "Why a Roth suits young savers" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — Retirement topics: IRA contribution limits", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits" },
  { label: "IRS — 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500", href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500" },
  { label: "IRS — Roth IRAs", href: "https://www.irs.gov/retirement-plans/roth-iras" },
  { label: "IRS — Publication 590-A, Contributions to IRAs", href: "https://www.irs.gov/publications/p590a" },
  { label: "IRS — Publication 590-B, Distributions from IRAs", href: "https://www.irs.gov/publications/p590b" },
  { label: "IRS — Roth comparison chart", href: "https://www.irs.gov/retirement-plans/roth-comparison-chart" },
];

export default function RothGuide() {
  return (
    <Guide
      kicker="The Roth IRA guide"
      title="How a Roth IRA works, and what it could be worth"
      intro={
        <>
          A Roth IRA lets your savings grow and come out tax-free in retirement. This guide covers the 2026 limits, the income phase-out and how
          a reduced contribution is worked out, how much tax-free growth is worth compared with a taxable account, the five-year rules and the
          backdoor Roth.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>In 2026 you can put up to $7,500 in a Roth IRA, or $8,600 if you are 50 or older.</li>
          <li>The limit phases out between $153,000 and $168,000 of modified AGI for single filers, and $242,000 to $252,000 for married couples filing jointly.</li>
          <li>
            $7,500 a year for 35 years at 7% grows to about {usd(1_125_659)}, of which {usd(1_125_659 - 262_500)} is growth you never pay tax on.
          </li>
          <li>Your contributions can come out at any time; earnings are tax-free from 59½ once the account is five years old.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$7,500", label: "2026 limit under 50" },
            { value: "$8,600", label: "2026 limit at 50+" },
            { value: "$153k–$168k", label: "Single phase-out" },
            { value: "$242k–$252k", label: "Joint phase-out" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a Roth IRA is">
        <p>
          An individual retirement account (IRA) is a tax-advantaged account you open yourself at a bank, brokerage or robo-adviser, separate from
          any workplace plan. A <strong>Roth</strong>{" "}IRA is funded with money you have already paid tax on. In return, the investments grow
          without yearly tax, and qualified withdrawals in retirement, including all the growth, are completely tax-free.
        </p>
        <p>
          That makes it very different from a regular brokerage account, where you pay tax on dividends each year and on gains when you sell, and
          from a traditional IRA, where you may get a deduction now but pay income tax on every dollar you take out.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={3} kicker="2026 rules" title="The 2026 contribution limit">
        <p>
          The IRA limit rose to $7,500 for 2026, up from $7,000. If you are 50 or older by December 31, 2026, you can add a catch-up of $1,100,
          which is now indexed for inflation, for $8,600 in total. The limit is shared across all your IRAs: if you put $3,000 in a traditional IRA,
          you can put at most $4,500 in a Roth for the same year.
        </p>
        <DataTable
          caption="2026 IRA contribution limits"
          head={["Your age at the end of 2026", "Limit"]}
          numeric={[1]}
          rows={[
            ["Under 50", "$7,500"],
            ["50 and over", "$8,600"],
          ]}
        />
      </GuideSection>

      <GuideSection id="income" n={4} kicker="Who can contribute" title="Income limits and the phase-out">
        <p>
          Unlike a traditional IRA, a Roth IRA has income limits. They are based on your <strong>modified adjusted gross income</strong>{" "}(MAGI),
          which for most people is close to the adjusted gross income on line 11 of Form 1040. Below the start of the range you can contribute the
          full amount; above the end, nothing directly.
        </p>
        <DataTable
          caption="2026 Roth IRA phase-out ranges (modified AGI)"
          head={["Filing status", "Full amount below", "Nothing above"]}
          numeric={[1, 2]}
          rows={[
            ["Single or head of household", "$153,000", "$168,000"],
            ["Married filing jointly", "$242,000", "$252,000"],
            ["Married filing separately (lived together)", "$0", "$10,000"],
          ]}
        />
        <p>
          Not sure of your AGI? Our <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}works it out from your income and
          deductions.
        </p>
      </GuideSection>

      <GuideSection id="reduced" n={5} kicker="The worksheet" title="Working out a reduced contribution">
        <p>
          Inside the range, the IRS reduces your limit in proportion to how far through it you are. It then rounds up to the next $10, and if the
          result is above $0 but below $200, you may still contribute $200.
        </p>
        <WorkedExample
          title="Single filer, age 35, modified AGI $160,000"
          steps={[
            { label: "Distance into the range: $160,000 − $153,000", value: "$7,000" },
            { label: "Share of the $15,000 range", value: "46.7%" },
            { label: "Reduction: $7,500 × 7,000 ÷ 15,000", value: "$3,500" },
          ]}
          total={{ label: "Roth IRA limit", value: "$4,000" }}
        />
        <DataTable
          caption="2026 Roth IRA limit for a single filer under 50"
          head={["Modified AGI", "Limit"]}
          numeric={[1]}
          rows={[
            ["$150,000", "$7,500"],
            ["$155,000", "$6,500"],
            ["$160,000", "$4,000"],
            ["$165,000", "$1,500"],
            ["$170,000", "$0"],
          ]}
        />
        <p>
          For a married couple filing jointly with MAGI of $245,000, each spouse under 50 can put in $5,250. Lowering your MAGI, for example by
          putting more into a traditional 401(k), can lift you back under the range.
        </p>
      </GuideSection>

      <GuideSection id="earned" n={6} kicker="Eligibility" title="You need earned income">
        <p>
          You can only contribute up to your <strong>earned income</strong>{" "}for the year: wages, salaries, tips and net self-employment income.
          Interest, dividends, rental income, pensions and Social Security don&rsquo;t count. A student who earns $4,000 from a summer job can
          contribute $4,000, not $7,500. There is no lower age limit, so teenagers with a job can have a custodial Roth IRA.
        </p>
      </GuideSection>

      <GuideSection id="growth" n={7} kicker="Real numbers" title="How much a Roth IRA can grow">
        <Figure label="$7,500 a year at 7%, by years of saving" caption="Contributions spread monthly; balance at the end; figures from the calculator's growth engine.">
          <Bars
            format={usd}
            items={[
              { label: "20 years", value: 325_579 },
              { label: "35 years", value: 1_125_659 },
              { label: "40 years", value: 1_640_508 },
            ]}
          />
        </Figure>
        <p>
          Over 35 years you put in $262,500 and growth adds about {usd(1_125_659 - 262_500)}. In a Roth, none of that growth is taxed when it comes
          out after 59½. The longer the time, the bigger the share that is growth, which is why a Roth is especially valuable for younger savers.
          See how compounding builds with our <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="taxable" n={8} kicker="Why it matters" title="Roth IRA vs a taxable account">
        <p>
          The calculator compares the same saving in a Roth IRA and in an ordinary brokerage account with the same return. In the taxable account,
          dividends are taxed every year and the gain is taxed when you sell. The tax you pay along the way also stops that money compounding.
        </p>
        <WorkedExample
          title="$7,500 a year for 35 years at 7%, 1.5% dividend yield, 15% tax on dividends and gains"
          steps={[
            { label: "Roth IRA balance (all tax-free)", value: usd(1_125_659) },
            { label: "Taxable account before selling", value: usd(1_068_823) },
            { label: "Tax on dividends along the way", value: usd(26_778) },
            { label: "Capital gains tax on selling", value: usd(98_187) },
            { label: "Taxable account after tax", value: usd(970_636) },
          ]}
          total={{ label: "Roth advantage", value: usd(155_023) }}
        />
        <p>
          At the 20% long-term gains rate the advantage grows to about {usd(187_752)}. If you would pay 0% on dividends and gains, the two come out
          the same, which is why a Roth matters most to people who expect to pay tax on investment income. Our{" "}
          <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}shows which rate applies to you.
        </p>
      </GuideSection>

      <GuideSection id="traditional" n={9} kicker="Choosing" title="Roth or traditional IRA">
        <CompareCards
          columns={[
            {
              name: "Roth IRA",
              rows: [
                { label: "Deduction now", value: "No" },
                { label: "Withdrawals in retirement", value: "Tax-free if qualified" },
                { label: "Income limit to contribute", value: "Yes" },
                { label: "Required minimum distributions", value: "None for the owner" },
              ],
            },
            {
              name: "Traditional IRA",
              rows: [
                { label: "Deduction now", value: "Maybe, depends on income and workplace plan" },
                { label: "Withdrawals in retirement", value: "Taxed as income" },
                { label: "Income limit to contribute", value: "No (only for the deduction)" },
                { label: "Required minimum distributions", value: "Yes, from 73 for most people today" },
              ],
            },
          ]}
        />
        <p>
          If your tax rate in retirement is likely to be the same as or higher than today, the Roth usually leaves you better off. If you are in a
          high bracket now and expect a much lower one later, a deductible traditional IRA may win. Many people hedge by having both kinds of money.
        </p>
      </GuideSection>

      <GuideSection id="withdrawals" n={10} kicker="Getting it out" title="Taking money out">
        <p>Withdrawals come out in a set order, which works in your favor:</p>
        <ol>
          <li><strong>Contributions first.</strong>{" "}Always tax- and penalty-free, at any age.</li>
          <li><strong>Conversions next</strong>, oldest first. The converted amount isn&rsquo;t taxed again, but a 10% penalty can apply if you are under 59½ and the conversion is under five years old.</li>
          <li><strong>Earnings last.</strong>{" "}Tax-free once you are 59½ and the five-year rule is met. Otherwise taxed, usually with a 10% penalty.</li>
        </ol>
        <p>
          Exceptions allow penalty-free (and sometimes tax-free) access to earnings for disability, death and up to $10,000 for a first home. Because
          contributions can always come out, some people treat part of a Roth as a backup emergency fund, though money taken out can&rsquo;t be
          put back except within the yearly limit.
        </p>
      </GuideSection>

      <GuideSection id="five-year" n={11} kicker="Timing" title="The five-year rules">
        <Timeline
          items={[
            { when: "April 15, 2027", what: "First contribution, for tax year 2026", detail: "The clock starts on January 1, 2026, the start of the tax year it counts for." },
            { when: "January 1, 2031", what: "Five tax years complete", detail: "From now, earnings are tax-free if you are also 59½ (or another exception applies)." },
          ]}
        />
        <p>
          The five-year clock for earnings starts with your first contribution to any Roth IRA and never restarts, so opening one early, even with a
          small amount, is worthwhile. Each conversion has its own separate five-year clock, but it only matters for the 10% penalty if you are under
          59½.
        </p>
      </GuideSection>

      <GuideSection id="backdoor" n={12} kicker="High earners" title="The backdoor Roth IRA">
        <p>
          If your income is above the limit, there is a well-known route in. Anyone with earned income can contribute to a traditional IRA, and
          anyone can convert a traditional IRA to a Roth. So you:
        </p>
        <ol>
          <li>Contribute $7,500 (or $8,600 at 50+) to a traditional IRA, without taking a deduction. Report it on Form 8606.</li>
          <li>Convert it to your Roth IRA, usually soon after so there is little growth to tax.</li>
          <li>Pay tax only on any growth between the two steps.</li>
        </ol>
        <Callout title="It's allowed">
          Congress removed the income limit on conversions in 2010, and the IRS treats the two steps as allowed. Keep records and file Form 8606 for
          every year you do it.
        </Callout>
      </GuideSection>

      <GuideSection id="pro-rata" n={13} kicker="Watch out" title="The pro-rata trap">
        <p>
          When you convert, the IRS looks at all your traditional, SEP and SIMPLE IRA balances together on December 31. If you have $67,500 of
          pre-tax IRA money and add a $7,500 after-tax contribution, only 10% of any conversion is tax-free; the rest is taxed as income. Rolling
          old pre-tax IRA money into a current 401(k), if your plan allows it, is a common way to clear the way for a clean backdoor Roth.
        </p>
      </GuideSection>

      <GuideSection id="with-401k" n={14} kicker="Order of saving" title="Using a Roth IRA with a 401(k)">
        <p>A common order for retirement saving is:</p>
        <ol>
          <li>Contribute to your 401(k) up to the full employer match.</li>
          <li>Fund a Roth IRA up to your limit.</li>
          <li>Go back to the 401(k) toward its $24,500 limit.</li>
          <li>Then a health savings account if eligible, and a taxable account.</li>
        </ol>
        <p>
          Our <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows what the workplace part could reach, and the{" "}
          <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}checks whether the total is enough.
        </p>
      </GuideSection>

      <GuideSection id="deadlines" n={15} kicker="Dates" title="Deadlines and timing">
        <p>
          You can contribute for 2026 from January 1, 2026 to the filing deadline, April 15, 2027 (extensions don&rsquo;t extend it). Contributing
          early in the year gives the money more time to grow; spreading it monthly is fine too and matches what the calculator assumes. If you
          don&rsquo;t yet know your final income for the year, waiting until you do avoids putting in too much.
        </p>
      </GuideSection>

      <GuideSection id="excess" n={16} kicker="Fixing errors" title="If you put in too much">
        <p>
          An excess contribution, for example because your income turned out higher than expected, is charged a 6% excise tax for every year it
          stays in the account. Fix it before your filing deadline by withdrawing the excess and the earnings on it (the earnings are taxable), or by
          recharacterizing the contribution as a traditional IRA contribution, which can then be converted.
        </p>
      </GuideSection>

      <GuideSection id="spousal" n={17} kicker="Couples" title="Spousal Roth IRAs">
        <p>
          A spouse with little or no income can still have a Roth IRA if you file jointly. Together you can contribute up to $15,000 (more with
          catch-ups) as long as your joint earned income covers it and your MAGI is under $242,000 for full contributions. Each IRA is owned by one
          person; there are no joint IRAs.
        </p>
      </GuideSection>

      <GuideSection id="investing" n={18} kicker="Choices" title="What to invest in">
        <p>
          A Roth IRA is an account, not an investment. Money sitting in its cash option earns very little. Because growth is tax-free, many people
          hold their highest-growth investments, such as broad stock index funds or a target-date fund, in their Roth. The calculator&rsquo;s 7% is a
          long-run assumption for a mostly stock portfolio; markets can fall sharply in any year.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Opening the account but never investing the cash.</li>
          <li>Contributing when your income is over the limit, then paying the 6% tax.</li>
          <li>Ignoring the pro-rata rule on a backdoor Roth.</li>
          <li>Taking out earnings before 59½ and five years.</li>
          <li>Waiting for the perfect time; the five-year clock starts only when you contribute.</li>
        </ul>
      </GuideSection>

      <GuideSection id="conversions" n={20} kicker="Moving money" title="Converting to a Roth IRA">
        <p>
          You can convert money from a traditional IRA or an old 401(k) to a Roth IRA at any income. The amount converted is added to your taxable
          income for the year, so a big conversion can push you into a higher bracket. Many people convert in years when their income is low, for
          example after retiring and before Social Security and required minimum distributions start, spreading conversions over several years
          to stay in a lower bracket. Converted money can&rsquo;t be switched back to a traditional IRA.
        </p>
      </GuideSection>

      <GuideSection id="young" n={21} kicker="Starting early" title="Why a Roth suits young savers">
        <p>
          Early in a career, income and tax brackets are usually lower, so the tax you give up by choosing Roth is small. And the earlier you start,
          the more of the final balance is growth. $7,500 a year for 40 years at 7% grows to about $1,640,508, of which $300,000 is your own
          money. Starting 20 years later, with 20 years of saving, gives about $325,579. Even small contributions in your twenties also start the
          five-year clock.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026"]}
          numeric={[1]}
          rows={[
            ["IRA contribution limit", "$7,500"],
            ["Catch-up at 50+", "$1,100"],
            ["Single / head of household phase-out", "$153,000 to $168,000"],
            ["Married filing jointly phase-out", "$242,000 to $252,000"],
            ["Married filing separately phase-out", "$0 to $10,000"],
            ["Deadline for 2026 contributions", "April 15, 2027"],
            ["Excess contribution tax", "6% a year"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

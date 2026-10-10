import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Retirement withdrawals (US) — the guide. Figures from src/lib/us/investing.ts (withdrawals, sustainableWithdrawal). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the calculator works" },
  { id: "example", title: "A worked example" },
  { id: "year-by-year", title: "What happens year by year" },
  { id: "rates", title: "How the withdrawal rate changes things" },
  { id: "four-percent", title: "The 4% rule" },
  { id: "updates", title: "The 4% rule since 1994" },
  { id: "maximum", title: "The most you can take" },
  { id: "returns", title: "How returns change the answer" },
  { id: "sequence", title: "Sequence-of-returns risk" },
  { id: "inflation", title: "Raising withdrawals with inflation" },
  { id: "percent", title: "Withdrawing a percentage instead" },
  { id: "flexible", title: "Flexible spending rules" },
  { id: "income", title: "Social Security and other income" },
  { id: "tax", title: "Taxes on withdrawals" },
  { id: "order", title: "Which accounts to draw from first" },
  { id: "rmd", title: "Required minimum distributions" },
  { id: "cash", title: "Keeping a cash buffer" },
  { id: "annuity", title: "Adding guaranteed income" },
  { id: "review", title: "Review your plan each year" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "William P. Bengen — Determining withdrawal rates using historical data, Journal of Financial Planning (October 1994, reprinted 2004)", href: "https://www.financialplanningassociation.org/sites/default/files/2021-04/MAR04%20Determining%20Withdrawal%20Rates%20Using%20Historical%20Data.pdf" },
  { label: "AAII — Is 4.7% the new safe retirement withdrawal rate? (Bengen, 2025)", href: "https://www.aaii.com/journal/article/321922-is-47-the-new-safe-retirement-withdrawal-rate" },
  { label: "IRS — Retirement topics: required minimum distributions", href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-required-minimum-distributions-rmds" },
  { label: "IRS — Topic no. 410, Pensions and annuities", href: "https://www.irs.gov/taxtopics/tc410" },
  { label: "Social Security Administration — Delayed retirement credits", href: "https://www.ssa.gov/benefits/retirement/planner/delayret.html" },
  { label: "Investor.gov (SEC) — Asset allocation", href: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation" },
];

export default function WithdrawalGuide() {
  return (
    <Guide
      kicker="The retirement withdrawal guide"
      title="How long your savings will last"
      intro={
        <>
          Saving for retirement is half the job; spending it wisely is the other half. This guide shows how the withdrawal rate, returns,
          inflation and a bad first year change how long your money lasts, and where the famous 4% rule comes from.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>$1 million earning 5% a year, with $40,000 a year withdrawn and raised 2.5% a year for inflation, lasts about 38.9 years.</li>
          <li>Withdraw $50,000 instead and it lasts about 27.7 years; $60,000, about 21.6 years.</li>
          <li>To last exactly 30 years, the most you can take in year 1 is about {usd(47_303)}.</li>
          <li>A 20% fall in the first year cuts the $40,000 plan from 38.9 to about 26.1 years.</li>
        </ul>
        <KeyStats
          items={[
            { value: "38.9 years", label: "$1m, $40k a year rising, 5% return" },
            { value: usd(47_303), label: "Most for 30 years from $1m" },
            { value: "4%", label: "Bengen's 1994 safe starting rate" },
            { value: "26.1 years", label: "Same plan after a 20% first-year fall" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How the calculator works">
        <p>
          Each month it takes a twelfth of the year&rsquo;s withdrawal from your balance, then adds a month&rsquo;s growth on what is left. Each year
          the withdrawal rises with inflation if you choose. It stops when the balance reaches zero and reports how long that took, to the month,
          or that the money lasts more than 60 years.
        </p>
        <p>
          To find the most you can take, it searches for the first-year withdrawal that leaves exactly nothing at the end of the period you plan
          for. Returns are the same every year unless you add a fall in the first year.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$1,000,000, $40,000 in year 1 rising 2.5% a year, 5% return"
          steps={[
            { label: "Withdrawal rate in year 1", value: "4%" },
            { label: "Withdrawal in year 10", value: usd(49_955) },
            { label: "Withdrawal in year 30", value: usd(81_856) },
            { label: "Balance after 30 years", value: usd(667_272) },
            { label: "Withdrawn over the life of the money", value: usd(2_584_112) },
          ]}
          total={{ label: "The money lasts", value: "38.9 years" }}
        />
        <p>
          Growth pays for much of the spending: you take out about $2.6 million from a $1 million start. The balance even rises for the first
          decade, because 5% growth is more than the early withdrawals.
        </p>
      </GuideSection>

      <GuideSection id="year-by-year" n={4} kicker="Over time" title="What happens year by year">
        <DataTable
          caption="$1,000,000, $40,000 rising 2.5% a year, 5% return"
          head={["Year", "Start of year", "Withdrawn", "End of year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1", usd(1_000_000), usd(40_000), usd(1_008_925)],
            ["5", usd(1_031_993), usd(44_153), usd(1_038_253)],
            ["10", usd(1_054_375), usd(49_955), usd(1_055_796)],
            ["15", usd(1_048_414), usd(56_519), usd(1_042_797)],
            ["20", usd(1_001_744), usd(63_946), usd(986_166)],
            ["25", usd(897_983), usd(72_349), usd(868_588)],
            ["30", usd(715_551), usd(81_856), usd(667_272)],
          ]}
        />
        <p>
          The turning point comes when the rising withdrawal overtakes the year&rsquo;s growth. After that the balance falls faster each year,
          which is why the last years of a plan disappear quickly.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={5} kicker="Withdrawal rate" title="How the withdrawal rate changes things">
        <Figure label="How long $1 million lasts, 5% return, withdrawals rising 2.5% a year" caption="By first-year withdrawal rate. At 3% the money lasts more than 60 years.">
          <Bars
            format={(n) => `${n.toFixed(1)} years`}
            items={[
              { label: "4% ($40,000)", value: 38.9 },
              { label: "5% ($50,000)", value: 27.7 },
              { label: "6% ($60,000)", value: 21.6 },
              { label: "7% ($70,000)", value: 17.7 },
            ]}
          />
        </Figure>
        <p>
          Each extra percentage point takes years off the plan. Going from 4% to 5% cuts more than 11 years here. That is why a small trim to
          spending early in retirement is so powerful.
        </p>
      </GuideSection>

      <GuideSection id="four-percent" n={6} kicker="History" title="The 4% rule">
        <p>
          In October 1994, financial planner William Bengen published a study in the Journal of Financial Planning. He tested every 30-year
          retirement starting from 1926 using actual US stock and bond returns and inflation. Withdrawing 4% of the starting balance, then raising
          the dollar amount with inflation each year, lasted at least 30 years in every period, even for someone who retired just before the
          Great Depression or the high inflation of the 1970s. Higher rates failed in some periods.
        </p>
        <p>
          In 1998 three professors at Trinity University in Texas ran similar tests across different mixes of stocks and bonds and different
          lengths of retirement. Their work, known as the Trinity study, found that a 4% inflation-adjusted withdrawal from a portfolio with at
          least half in stocks very rarely ran out over 30 years in the historical data.
        </p>
      </GuideSection>

      <GuideSection id="updates" n={7} kicker="Today" title="The 4% rule since 1994">
        <p>
          In 2025 Bengen published a book updating his research with a broader mix of seven asset classes. His new &quot;safe&quot; starting
          rate for a 30-year retirement is about 4.7%. Other researchers argue for less, especially for early retirees with 40 or 50 years to
          fund, or when stock prices look expensive and bond yields are low.
        </p>
        <Callout tone="warn" title="A rule of thumb, not a promise">
          The 4% rule is based on one country&rsquo;s past, assumes a fixed spending path, and ignores fees and taxes. Use it to sense-check a plan,
          then adjust as you go.
        </Callout>
      </GuideSection>

      <GuideSection id="maximum" n={8} kicker="Planning" title="The most you can take">
        <DataTable
          caption="Largest first-year withdrawal from $1,000,000, 5% return, rising 2.5% a year"
          head={["Must last", "First-year withdrawal", "Withdrawal rate"]}
          numeric={[1, 2]}
          rows={[
            ["20 years", usd(63_661), "6.37%"],
            ["25 years", usd(53_799), "5.38%"],
            ["30 years", usd(47_303), "4.73%"],
            ["35 years", usd(42_729), "4.27%"],
            ["40 years", usd(39_356), "3.94%"],
          ]}
        />
        <p>
          These figures use all the money, leaving nothing at the end. With a steady 5% return the 30-year figure is close to Bengen&rsquo;s new
          4.7%; with a 20% fall in the first year it drops to {usd(36_268)}. If you take flat withdrawals that don&rsquo;t rise with inflation, the
          30-year maximum is higher, {usd(63_349)}, but its buying power shrinks every year.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={9} kicker="Returns" title="How returns change the answer">
        <DataTable
          caption="$1,000,000 at $40,000 a year rising 2.5% a year"
          head={["Return a year", "Money lasts"]}
          numeric={[1]}
          rows={[
            ["3%", "27.0 years"],
            ["4%", "31.5 years"],
            ["5%", "38.9 years"],
            ["6%", "56.0 years"],
            ["7%", "More than 60 years"],
          ]}
        />
        <p>
          The gap between return and inflation is what matters. At 7% returns and 3% inflation, a 4% withdrawal lasts more than 60 years and 5%
          lasts about 38.7 years. Choose a return you would be comfortable relying on, after fees.
        </p>
      </GuideSection>

      <GuideSection id="sequence" n={10} kicker="Risk" title="Sequence-of-returns risk">
        <CompareCards
          columns={[
            {
              name: "Steady 5% from the start",
              rows: [
                { label: "$40,000 a year rising", value: "Lasts 38.9 years" },
                { label: "$50,000 a year rising", value: "Lasts 27.7 years" },
              ],
            },
            {
              name: "20% fall in year 1, then 5%",
              rows: [
                { label: "$40,000 a year rising", value: "Lasts 26.1 years" },
                { label: "$50,000 a year rising", value: "Lasts 19.4 years" },
              ],
            },
          ]}
        />
        <p>
          The order of returns matters once you are withdrawing. A fall at the start forces you to sell more shares at low prices to fund the
          same spending, and those shares are not there to recover. The same fall twenty years in would do much less harm. This is the main
          reason retirement plans need a margin of safety.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={11} kicker="Spending power" title="Raising withdrawals with inflation">
        <p>
          Raising withdrawals with inflation keeps your spending power steady, but it costs money. Taking a flat $40,000 a year from $1 million at
          5%, the money never runs out in our test, and after 60 years the balance would be over $4 million, but $40,000 in 30 years buys only
          about what $19,000 buys today. Most people need their income to keep up, at least for essentials. The{" "}
          <a href="/us/savings/inflation-calculator">inflation calculator</a>{" "}shows how fast prices have risen in the past.
        </p>
      </GuideSection>

      <GuideSection id="percent" n={12} kicker="Alternative" title="Withdrawing a percentage instead">
        <DataTable
          caption="4% of each year's balance, $1,000,000 start, 5% return, 2.5% inflation"
          head={["Year", "Withdrawn", "In today's dollars", "Balance at the end"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1", usd(40_000), usd(40_000), usd(1_008_925)],
            ["10", usd(43_330), usd(34_696), usd(1_092_918)],
            ["20", usd(47_356), usd(29_623), usd(1_194_471)],
            ["30", usd(51_756), usd(25_291), usd(1_305_459)],
          ]}
        />
        <p>
          A percentage withdrawal can&rsquo;t run out, because you always take a share of what is left. The cost is that income follows the
          markets: after a 20% fall, your income falls 20% too. And unless returns beat inflation by more than the withdrawal rate, your real
          income shrinks over time, as here.
        </p>
      </GuideSection>

      <GuideSection id="flexible" n={13} kicker="Middle ground" title="Flexible spending rules">
        <ul>
          <li><strong>Skip the raise after a loss:</strong>{" "}don&rsquo;t increase withdrawals for inflation in a year when your investments fell.</li>
          <li><strong>Guardrails:</strong>{" "}cut spending by, say, 10% if your withdrawal rate rises well above where it started, and raise it if the rate falls well below.</li>
          <li><strong>Floor and upside:</strong>{" "}cover essentials with guaranteed income and spend from investments only on extras.</li>
        </ul>
        <p>Being willing to trim spending in bad years lets most people start with a higher withdrawal safely.</p>
      </GuideSection>

      <GuideSection id="income" n={14} kicker="Other income" title="Social Security and other income">
        <p>
          Your savings only need to fill the gap between what you spend and your guaranteed income. If you spend $70,000 a year and Social
          Security and a pension pay $30,000, you withdraw about $40,000. Our <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}
          works out that gap and whether you are saving enough to fill it. Each year you delay Social Security past full retirement age, up to 70,
          raises your benefit by 8%, which reduces what your savings must provide later.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={15} kicker="Tax" title="Taxes on withdrawals">
        <p>
          Withdrawals from a traditional 401(k) or IRA are taxed as ordinary income, so $40,000 withdrawn might leave $35,000 to $36,000 to
          spend, depending on your bracket and state. Qualified Roth withdrawals are tax-free. In a taxable brokerage account, only the gain in
          what you sell is taxed, often at 0% or 15%. Enter an average tax rate under More options to see income after tax.
        </p>
      </GuideSection>

      <GuideSection id="order" n={16} kicker="Strategy" title="Which accounts to draw from first">
        <p>
          A common order is taxable accounts first, then traditional accounts, then Roth, letting tax-free money grow longest. In practice, many
          retirees blend them to fill low tax brackets each year, for example taking traditional IRA money up to the top of the 12% bracket or
          converting some to Roth in the years between retiring and claiming Social Security.
        </p>
      </GuideSection>

      <GuideSection id="rmd" n={17} kicker="Rules" title="Required minimum distributions">
        <p>
          From age 73 (75 for people born in 1960 or later), you must take a minimum amount from traditional IRAs and most 401(k)s each year,
          based on your balance and an IRS life expectancy factor. If your planned withdrawals are smaller, the RMD sets a floor; you can reinvest
          what you don&rsquo;t spend in a taxable account. Missing an RMD can cost a 25% excise tax on the shortfall. The{" "}
          <a href="/us/savings/rmd-calculator">RMD calculator</a>{" "}works out your amount.
        </p>
      </GuideSection>

      <GuideSection id="cash" n={18} kicker="Buffers" title="Keeping a cash buffer">
        <p>
          Holding one to two years of withdrawals in cash or short-term bonds lets you avoid selling stocks after a fall. You spend from the
          buffer while markets recover, then refill it in good years. It lowers your average return a little, but it protects against the
          sequence risk that does the most damage.
        </p>
      </GuideSection>

      <GuideSection id="annuity" n={19} kicker="Guarantees" title="Adding guaranteed income">
        <p>
          Using part of your savings to buy an immediate annuity turns it into income for life, so that part can&rsquo;t run out however long you
          live or however markets do. The trade-off is less flexibility and less left for heirs. The{" "}
          <a href="/us/savings/annuity-calculator">annuity calculator</a>{" "}shows what a lump sum could pay.
        </p>
      </GuideSection>

      <GuideSection id="review" n={20} kicker="Habits" title="Review your plan each year">
        <p>
          A withdrawal plan isn&rsquo;t set once. Each year, check your balance, your spending and the withdrawal rate it now implies. If markets
          have done well, you may be able to spend more; if they have done badly, small cuts now protect the years ahead. Run the calculator again
          with your new balance and the years you still need to fund.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Bengen's safe starting rate (1994)", "4%"],
            ["Bengen's updated rate (2025)", "About 4.7%"],
            ["$1m, 30 years, 5% return, 2.5% inflation: maximum", usd(47_303)],
            ["RMD starting age", "73 (75 if born 1960 or later)"],
            ["Penalty for a missed RMD", "25% (10% if corrected in time)"],
            ["Delayed retirement credit after full retirement age", "8% a year, to 70"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

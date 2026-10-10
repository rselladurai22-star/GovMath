import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Investment calculator (US) — the guide. Figures from src/lib/us/investing.ts (invest, investScenarios). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the calculator works" },
  { id: "example", title: "A worked example" },
  { id: "year-by-year", title: "How the balance builds" },
  { id: "returns", title: "What return to expect" },
  { id: "scenarios", title: "Planning with several returns" },
  { id: "fees", title: "How fees eat into growth" },
  { id: "fee-levels", title: "Typical fees in 2025" },
  { id: "lump-sum", title: "A lump sum and fees" },
  { id: "time", title: "Time in the market" },
  { id: "increase", title: "Raising your contributions" },
  { id: "inflation", title: "Real returns after inflation" },
  { id: "taxable", title: "Taxable vs tax-advantaged accounts" },
  { id: "tax-rates", title: "How investment income is taxed" },
  { id: "lump-vs-monthly", title: "Lump sum or monthly investing" },
  { id: "allocation", title: "Stocks, bonds and risk" },
  { id: "volatility", title: "Averages hide the swings" },
  { id: "order", title: "Which account to fill first" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Investment Company Institute — Mutual fund and ETF fees remained near historic lows in 2025", href: "https://www.ici.org/news-release/mutual-fund-and-etf-fees-remained-near-historic-lows-in-2025" },
  { label: "Investor.gov (SEC) — Expense ratio", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/expense-ratio" },
  { label: "Investor.gov (SEC) — Dollar cost averaging", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging" },
  { label: "Investor.gov (SEC) — Asset allocation", href: "https://www.investor.gov/introduction-investing/getting-started/asset-allocation" },
  { label: "IRS — Topic no. 409, Capital gains and losses", href: "https://www.irs.gov/taxtopics/tc409" },
  { label: "IRS — Topic no. 404, Dividends", href: "https://www.irs.gov/taxtopics/tc404" },
];

export default function InvestGuide() {
  return (
    <Guide
      kicker="The investing guide"
      title="How your investments grow, after fees and tax"
      intro={
        <>
          Investing turns regular saving into long-term wealth, but what you keep depends on three things you control (how much, how long and
          how cheaply you invest) and one you don&rsquo;t (the market&rsquo;s return). This guide shows how each one moves the result, with figures
          from the calculator.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>$10,000 plus $500 a month for 30 years at 7% a year, with 0.5% fees, grows to about {usd(595_755)}.</li>
          <li>You put in {usd(190_000)}; growth adds {usd(405_755)}.</li>
          <li>The 0.5% fee costs about {usd(65_093)} by year 30, counting the growth the fees would have earned.</li>
          <li>At 2.5% inflation, the final balance buys about what {usd(284_022)} buys today.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(595_755), label: "$10k + $500/month, 7%, 0.5% fees, 30 years" },
            { value: usd(65_093), label: "Cost of the 0.5% fee" },
            { value: usd(122_892), label: "Cost of a 1% fee instead" },
            { value: "0.40%", label: "Average equity mutual fund fee, 2025" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How the calculator works">
        <p>
          The calculator works month by month. Each month your balance grows at a twelfth of the yearly return (compounded), the fund&rsquo;s fee
          is taken as a twelfth of the yearly expense ratio, and your monthly investment is added at the end of the month. Once a year your monthly
          amount rises if you asked it to.
        </p>
        <p>
          In a taxable account, the dividend part of the return is taxed each December and the tax comes out of the account, and when you sell
          at the end, tax is due on the gain over what you paid (your cost basis, which includes reinvested dividends). The &quot;with no
          fees&quot; line runs the same plan without the fee, so the gap between the two lines is the full cost of fees.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$10,000 now, $500 a month, 7% a year before 0.5% fees, 30 years"
          steps={[
            { label: "Your money: $10,000 + $500 × 360 months", value: usd(190_000) },
            { label: "Balance with no fees", value: usd(660_849) },
            { label: "Fees charged over 30 years", value: usd(32_477) },
            { label: "Growth those fees would have earned", value: usd(65_093 - 32_477) },
            { label: "Your balance", value: usd(595_755) },
          ]}
          total={{ label: "In today's dollars (2.5% inflation)", value: usd(284_022) }}
        />
        <p>
          The fees you pay directly add up to {usd(32_477)}, but the true cost is about twice that, {usd(65_093)}, because every dollar taken in
          fees would otherwise have compounded until year 30.
        </p>
      </GuideSection>

      <GuideSection id="year-by-year" n={4} kicker="Over time" title="How the balance builds">
        <DataTable
          caption="$10,000 plus $500 a month at 7% before 0.5% fees"
          head={["Year", "Contributions", "Balance", "Fees so far", "Cost of fees"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["1", "$16,000", "$16,822", "$66", "$68"],
            ["5", "$40,000", "$48,818", "$706", "$805"],
            ["10", "$70,000", "$101,918", "$2,555", "$3,279"],
            ["15", "$100,000", "$174,555", "$5,967", "$8,588"],
            ["20", "$130,000", "$273,916", "$11,519", "$18,549"],
            ["25", "$160,000", "$409,833", "$19,997", "$35,963"],
            ["30", "$190,000", "$595,755", "$32,477", "$65,093"],
          ]}
        />
        <p>
          Growth is slow at first and fast later. In the first ten years the balance gains {usd(101_918 - 70_000)} on top of contributions; in
          the last five years alone it gains {usd(595_755 - 409_833 - 30_000)}. The cost of fees grows the same way: it is tiny early on and
          large by the end.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={5} kicker="Assumptions" title="What return to expect">
        <p>
          No calculator knows future returns. Over very long periods, broad US stock indexes have averaged roughly 10% a year before inflation,
          and high-quality bonds much less, but those averages include decades well above and well below them. Because a plan that only works in
          good markets is fragile, many planners use 5% to 7% a year for a portfolio of mostly stocks with some bonds, and lower figures for
          more conservative mixes.
        </p>
        <Callout title="Use the return before fees">
          Enter the return the investments themselves might earn; the calculator takes the fee off separately. A fund tracking an index that
          returns 7% with a 0.5% fee gives you about 6.5%.
        </Callout>
      </GuideSection>

      <GuideSection id="scenarios" n={6} kicker="Ranges" title="Planning with several returns">
        <Figure label="$10,000 + $500 a month for 30 years, 0.5% fees" caption="Balance at the end by yearly return before fees.">
          <Bars
            format={usd}
            items={[
              { label: "4% a year", value: 341_591 },
              { label: "6% a year", value: 492_616 },
              { label: "8% a year", value: 723_444 },
              { label: "10% a year", value: 1_078_042 },
            ]}
          />
        </Figure>
        <p>
          Your contributions are the same {usd(190_000)} each time, yet the results range from {usd(341_591)} to {usd(1_078_042)}. In today&rsquo;s
          dollars that is about {usd(162_851)} to {usd(513_949)}. The calculator shows these scenarios for your own figures, so you can check a
          plan still works if returns disappoint.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={7} kicker="Costs" title="How fees eat into growth">
        <Figure label="$10,000 + $500 a month, 7% before fees, 30 years" caption="Balance at the end by yearly fee.">
          <Bars
            format={usd}
            items={[
              { label: "No fee", value: 660_849 },
              { label: "0.05%", value: 653_984 },
              { label: "0.14%", value: 641_833 },
              { label: "0.40%", value: 608_161 },
              { label: "1.00%", value: 537_957 },
              { label: "1.50%", value: 486_590 },
            ]}
          />
        </Figure>
        <p>
          A 1% fee sounds small, but it is charged on everything you have invested, every year. Here it costs {usd(122_892)} over 30 years,
          nearly two-thirds of what you put in. Moving from a 1% fund to a 0.05% index fund would add {usd(653_984 - 537_957)} to the final balance
          with no extra saving and no extra risk.
        </p>
        <Callout tone="warn" title="Advisory fees count too">
          If an adviser charges 1% of assets on top of fund fees of 0.5%, enter 1.5%. Some 401(k) plans also add administration fees; your plan&rsquo;s
          yearly fee disclosure lists them.
        </Callout>
      </GuideSection>

      <GuideSection id="fee-levels" n={8} kicker="2025 figures" title="Typical fees in 2025">
        <DataTable
          caption="Average expense ratios, 2025 (asset-weighted, ICI)"
          head={["Fund type", "Average yearly fee"]}
          numeric={[1]}
          rows={[
            ["Equity mutual funds", "0.40%"],
            ["Bond mutual funds", "0.36%"],
            ["Index equity ETFs", "0.14%"],
          ]}
        />
        <p>
          Fees have fallen steadily for decades as investors moved to index funds and cheaper share classes. Many broad index funds and ETFs
          now charge 0.10% or less. A fund&rsquo;s expense ratio is listed on the first pages of its prospectus and on any fund research site.
        </p>
      </GuideSection>

      <GuideSection id="lump-sum" n={9} kicker="Example" title="A lump sum and fees">
        <p>
          $100,000 invested once at 7% for 20 years grows to about {usd(350_136)} with a 0.5% fee, but only {usd(286_619)} with a 1.5% fee. The
          difference, {usd(350_136 - 286_619)}, is money you would never see on a statement: it simply isn&rsquo;t there.
        </p>
      </GuideSection>

      <GuideSection id="time" n={10} kicker="Time" title="Time in the market">
        <DataTable
          caption="$10,000 + $500 a month at 7% before 0.5% fees"
          head={["Years", "Contributions", "Balance"]}
          numeric={[1, 2]}
          rows={[
            ["10", "$70,000", usd(101_918)],
            ["20", "$130,000", usd(273_916)],
            ["30", "$190,000", usd(595_755)],
            ["40", "$250,000", usd(1_197_980)],
          ]}
        />
        <p>
          Going from 30 to 40 years adds {usd(60_000)} of contributions but about {usd(1_197_980 - 595_755)} of balance: the balance roughly
          doubles. Starting early is the most powerful lever you have. The <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}
          shows the same effect for a single rate.
        </p>
      </GuideSection>

      <GuideSection id="increase" n={11} kicker="Saving more" title="Raising your contributions">
        <p>
          Under More options you can raise your monthly amount each year. Raising $500 a month by 3% a year lifts the 30-year example from{" "}
          {usd(595_755)} to about {usd(800_377)}, for {usd(295_452)} of contributions. Linking increases to pay raises means your take-home pay
          still rises, just a little less. Many 401(k) plans offer automatic yearly increases.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={12} kicker="Real value" title="Real returns after inflation">
        <p>
          A balance decades from now buys less than the same number of dollars today. At 2.5% inflation, prices roughly double in 28 years, so
          the {usd(595_755)} in the example is worth about {usd(284_022)} in today&rsquo;s money. Use the today&rsquo;s-dollars figure when you compare
          the result with a goal such as retirement spending. Our <a href="/us/savings/inflation-calculator">inflation calculator</a>{" "}shows how
          prices have changed since 1913.
        </p>
      </GuideSection>

      <GuideSection id="taxable" n={13} kicker="Tax" title="Taxable vs tax-advantaged accounts">
        <CompareCards
          columns={[
            {
              name: "401(k) or IRA",
              rows: [
                { label: "Balance after 30 years", value: usd(595_755) },
                { label: "Tax while invested", value: "$0" },
                { label: "On withdrawal", value: "Traditional: income tax. Roth: none" },
              ],
            },
            {
              name: "Taxable brokerage account",
              rows: [
                { label: "Balance after 30 years", value: usd(569_747) },
                { label: "Tax on dividends along the way", value: usd(14_106) },
                { label: "Tax on selling everything", value: usd(44_972) },
                { label: "Left after tax", value: usd(524_775) },
              ],
            },
          ]}
        />
        <p>
          Same example, with a 1.5% dividend yield taxed at 15% each year and gains taxed at 15% on selling. The taxable account ends about{" "}
          {usd(595_755 - 524_775)} behind a Roth IRA, where qualified withdrawals are tax-free. In a traditional 401(k) or IRA, withdrawals are
          taxed as income instead, so the comparison depends on your tax rate in retirement. The{" "}
          <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a>{" "}covers that choice.
        </p>
      </GuideSection>

      <GuideSection id="tax-rates" n={14} kicker="Tax rules" title="How investment income is taxed">
        <ul>
          <li><strong>Qualified dividends and long-term gains</strong>{" "}(investments held more than a year): 0%, 15% or 20% federally in 2026, depending on taxable income.</li>
          <li><strong>Short-term gains and interest:</strong>{" "}taxed as ordinary income at your bracket rate.</li>
          <li><strong>Net investment income tax:</strong>{" "}an extra 3.8% above $200,000 of modified AGI for single filers ($250,000 married filing jointly).</li>
          <li><strong>State tax:</strong>{" "}most states tax investment income as ordinary income.</li>
        </ul>
        <p>
          The <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}works out the rate that applies to your own gains.
        </p>
      </GuideSection>

      <GuideSection id="lump-vs-monthly" n={15} kicker="Timing" title="Lump sum or monthly investing">
        <p>
          If you have a lump sum, investing it all at once has usually beaten spreading it over months, because markets rise more often than they
          fall. Investing gradually, called dollar-cost averaging, buys more shares when prices are low and fewer when they are high, and protects
          you from investing everything just before a fall. For most people the question doesn&rsquo;t arise: they invest a fixed amount from each
          paycheck, which is dollar-cost averaging by default.
        </p>
      </GuideSection>

      <GuideSection id="allocation" n={16} kicker="Risk" title="Stocks, bonds and risk">
        <p>
          Stocks have offered the highest long-run returns but the biggest swings. Bonds pay less but fall less. Cash is stable but often barely
          keeps up with inflation. Your mix, called asset allocation, should fit how long you will invest and how much of a fall you could live
          with without selling. A common approach is to hold more stocks when the goal is decades away and shift toward bonds as it nears.
        </p>
      </GuideSection>

      <GuideSection id="volatility" n={17} kicker="Reality check" title="Averages hide the swings">
        <p>
          The calculator uses the same return every year. Real returns arrive unevenly: a portfolio might gain 20% one year and lose 15% the next.
          With regular contributions, early falls can even help, because your monthly amount buys more shares. Falls close to the date you need
          the money hurt most, which is why people reduce risk as a goal approaches.
        </p>
        <Callout title="Stay invested">
          Selling after a fall locks in the loss and often means missing the recovery. Keeping an emergency fund in cash makes it easier to leave
          investments alone in a bad year.
        </Callout>
      </GuideSection>

      <GuideSection id="order" n={18} kicker="Priorities" title="Which account to fill first">
        <ol>
          <li>Your <a href="/us/savings/401k-calculator">401(k)</a>{" "}up to the full employer match.</li>
          <li>A health savings account if you have a high-deductible health plan.</li>
          <li>A Roth or traditional IRA.</li>
          <li>More 401(k), up to the {usd(24_500)} limit for 2026.</li>
          <li>A taxable brokerage account for anything beyond, or for goals before retirement.</li>
        </ol>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Ignoring fees because they look small as a percentage.</li>
          <li>Planning on a single optimistic return.</li>
          <li>Comparing a future balance with today&rsquo;s prices without adjusting for inflation.</li>
          <li>Investing in a taxable account while leaving an employer match unclaimed.</li>
          <li>Selling in a panic after a market fall.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="Tips" title="Using the calculator well">
        <ul>
          <li>Check your funds&rsquo; expense ratios and enter the weighted average.</li>
          <li>Look at the scenarios table: make sure the lower returns still meet your goal.</li>
          <li>Use the today&rsquo;s-dollars figure when comparing with spending goals.</li>
          <li>Copy the link to save your figures and come back each year.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Average equity mutual fund fee, 2025", "0.40%"],
            ["Average bond mutual fund fee, 2025", "0.36%"],
            ["Average index equity ETF fee, 2025", "0.14%"],
            ["Long-term capital gains rates, 2026", "0%, 15%, 20%"],
            ["Net investment income tax", "3.8%"],
            ["401(k) employee limit, 2026", usd(24_500)],
            ["IRA limit, 2026", usd(7_500)],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

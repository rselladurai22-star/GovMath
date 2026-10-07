import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The capital gains tax guide. Figures from src/lib/us/tax-2026.ts and taxes-extra.ts (tax year 2026). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a capital gain is" },
  { id: "basis", title: "Cost basis" },
  { id: "short-long", title: "Short-term and long-term" },
  { id: "rates", title: "The 2026 long-term rates" },
  { id: "stacking", title: "How gains stack on your income" },
  { id: "example", title: "Example: a $20,000 gain" },
  { id: "zero", title: "The 0% rate" },
  { id: "niit", title: "The 3.8% net investment income tax" },
  { id: "table", title: "Tax on a $50,000 gain at different incomes" },
  { id: "losses", title: "Capital losses" },
  { id: "home", title: "Selling your home" },
  { id: "property", title: "Rental and investment property" },
  { id: "crypto", title: "Crypto, collectibles and special cases" },
  { id: "state", title: "State tax on gains" },
  { id: "lower", title: "Ways to lower the tax" },
  { id: "reporting", title: "Reporting and paying" },
  { id: "dividends", title: "Dividends and interest" },
  { id: "funds", title: "Funds and ETFs in a taxable account" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "gifts", title: "Gifts and inheritances" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS — Topic 409, Capital gains and losses", href: "https://www.irs.gov/taxtopics/tc409" },
  { label: "IRS — Topic 701, Sale of your home", href: "https://www.irs.gov/taxtopics/tc701" },
  { label: "IRS — Topic 559, Net investment income tax", href: "https://www.irs.gov/taxtopics/tc559" },
  { label: "IRS — Publication 550, Investment Income and Expenses", href: "https://www.irs.gov/publications/p550" },
  { label: "IRS — Digital assets", href: "https://www.irs.gov/filing/digital-assets" },
  { label: "IRS — 2026 inflation adjustments (Rev. Proc. 2025-32)", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
  { label: "Washington Department of Revenue — Capital gains tax", href: "https://dor.wa.gov/about/news-releases/2025/tax-year-2024-initial-capital-gains-collections-exceed-5606-million" },
];

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function CapitalGainsGuide() {
  return (
    <Guide
      kicker="The capital gains tax guide"
      title="How capital gains are taxed in 2026"
      intro={
        <>
          When you sell stocks, funds, crypto, a home or other property for more than you paid, the profit is a capital gain. How much federal tax you pay
          depends on how long you held it and on the rest of your income. This guide explains the 2026 rules with worked examples.
        </>
      }
      meta={["Tax year 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Gain = sale price − cost basis − selling costs.</li>
          <li>Held a year or less: taxed like wages, at 10% to 37%.</li>
          <li>Held more than a year: taxed at 0%, 15% or 20%, depending on your total taxable income.</li>
          <li>High earners may add the 3.8% net investment income tax, and most states tax gains too.</li>
        </ul>
        <KeyStats
          items={[
            { value: "0%", label: "Long-term rate up to $49,450 taxable income, single" },
            { value: "$98,900", label: "Top of the 0% band, joint" },
            { value: "$250,000", label: "Home sale exclusion ($500,000 joint)" },
            { value: "$3,000", label: "Net loss you can deduct each year" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a capital gain is">
        <p>
          A capital asset is almost anything you own for personal use or investment: shares, ETFs and mutual funds, bonds, crypto, your home, land, a
          rental property, art and collectibles. You have a gain only when you sell or swap the asset. A rise in value while you keep holding it is an
          unrealized gain and is not taxed.
        </p>
        <p>Mutual funds also pay out capital gain distributions each year, which are taxed as long-term gains even if you never sold a share.</p>
      </GuideSection>

      <GuideSection id="basis" n={3} kicker="Basis" title="Cost basis">
        <p>
          Your cost basis is what you paid, plus buying costs such as commissions. For a home it also includes the cost of improvements (a new roof or a
          kitchen, not repairs). Reinvested dividends add to the basis of a fund. Inherited assets get a &quot;stepped-up&quot; basis equal to the value
          on the date of death, so gains before then are never taxed. Gifts usually keep the giver&rsquo;s basis.
        </p>
        <Callout tone="warn" title="Keep your records">
          Brokers report basis on Form 1099-B for shares bought since 2011. For older holdings, crypto and property, it is up to you to prove it.
        </Callout>
      </GuideSection>

      <GuideSection id="short-long" n={4} kicker="Holding period" title="Short-term and long-term">
        <p>
          The holding period starts the day after you buy and includes the day you sell. More than one year is long-term. Selling one day too soon can
          cost real money:
        </p>
        <CompareCards
          columns={[
            {
              name: "Short-term: $20,000 gain, single, $60,000 wages",
              rows: [
                { label: "Federal tax", value: "$3,750" },
                { label: "Share of the gain", value: "18.8%" },
              ],
            },
            {
              name: "Long-term: $20,000 gain, single, $60,000 wages",
              rows: [
                { label: "Federal tax", value: "$2,167.50" },
                { label: "Share of the gain", value: "10.8%" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={5} kicker="Rates" title="The 2026 long-term rates">
        <DataTable
          caption="2026 long-term capital gains and qualified dividends, by total taxable income"
          head={["Filing status", "0% up to", "15% up to", "20% above"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Single", "$49,450", "$545,500", "$545,500"],
            ["Married filing jointly", "$98,900", "$613,700", "$613,700"],
            ["Married filing separately", "$49,450", "$306,850", "$306,850"],
            ["Head of household", "$66,200", "$579,600", "$579,600"],
          ]}
        />
        <p>Qualified dividends from most US shares and many foreign ones use the same rates.</p>
      </GuideSection>

      <GuideSection id="stacking" n={6} kicker="Method" title="How gains stack on your income">
        <p>
          Long-term gains are counted last, on top of your ordinary taxable income (wages, interest and short-term gains after deductions). The part of
          the gain that fits under the 0% line is tax-free, the next part is taxed at 15%, and anything above the 15% line at 20%. Your gain never pushes
          your wages into a higher bracket.
        </p>
      </GuideSection>

      <GuideSection id="example" n={7} kicker="Example" title="Example: a $20,000 gain">
        <WorkedExample
          title="Single, $60,000 of wages, $20,000 long-term gain"
          steps={[
            { label: "Taxable wages ($60,000 − $16,100)", value: "$43,900" },
            { label: "Room left under $49,450", value: "$5,550" },
            { label: "$5,550 of the gain at 0%", value: "$0" },
            { label: "$14,450 of the gain at 15%", value: "$2,167.50" },
          ]}
          total={{ label: "Federal tax on the gain", value: "$2,167.50" }}
        />
        <p>That is 10.8% of the gain. The tax on the wages themselves is unchanged.</p>
      </GuideSection>

      <GuideSection id="zero" n={8} kicker="0% rate" title="The 0% rate">
        <p>
          Many people pay no federal tax on long-term gains at all. A married couple filing jointly with $100,000 of wages has $67,800 of taxable income,
          so a $20,000 gain fits under the $98,900 line and is taxed at 0%. With the standard deduction, a couple can have up to $131,100 of total income,
          gains included, and still pay 0% on the gains.
        </p>
        <p>
          Retirees and people between jobs often use low-income years to &quot;harvest&quot; gains at 0%: sell, then buy back straight away to reset the
          cost basis higher. The wash-sale rule only applies to losses, not gains.
        </p>
      </GuideSection>

      <GuideSection id="niit" n={9} kicker="Surtax" title="The 3.8% net investment income tax">
        <p>
          The net investment income tax (NIIT) adds 3.8% on the smaller of your investment income and your modified AGI above $200,000 (single or head of
          household), $250,000 (married filing jointly) or $125,000 (married filing separately). These lines are not raised for inflation.
        </p>
        <WorkedExample
          title="Single, $250,000 of wages, $50,000 long-term gain"
          steps={[
            { label: "15% of $50,000", value: "$7,500" },
            { label: "NIIT: 3.8% of $50,000", value: "$1,900" },
          ]}
          total={{ label: "Federal tax on the gain", value: "$9,400" }}
        />
      </GuideSection>

      <GuideSection id="table" n={10} kicker="Table" title="Tax on a $50,000 gain at different incomes">
        <DataTable
          caption="Single, standard deduction, 2026: federal tax caused by a $50,000 gain"
          head={["Other income (wages)", "Long-term", "Share", "Short-term"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["$20,000", money(667.5), "1.3%", money(6180)],
            ["$40,000", money(3667.5), "7.3%", money(8350)],
            ["$60,000", money(6667.5), "13.3%", money(10350)],
            ["$100,000", money(7500), "15.0%", money(11564)],
            ["$200,000", money(9400), "18.8%", money(16470)],
            ["$400,000", money(9400), "18.8%", money(19400)],
          ]}
        />
        <Bars
          items={[
            { label: "$20,000 wages", value: 667.5 },
            { label: "$60,000 wages", value: 6667.5 },
            { label: "$100,000 wages", value: 7500 },
            { label: "$200,000 wages", value: 9400 },
          ]}
          format={money}
        />
        <p>Long-term tax on a $50,000 gain. The $200,000 and $400,000 rows include the 3.8% NIIT.</p>
      </GuideSection>

      <GuideSection id="losses" n={11} kicker="Losses" title="Capital losses">
        <p>
          Losses offset gains first: short-term losses against short-term gains, long-term against long-term, then across. If losses are bigger, up to
          $3,000 of the net loss ($1,500 married filing separately) comes off your other income each year, and the rest carries forward with no time limit.
        </p>
        <p>
          A single person with $60,000 of wages, a $4,000 gain and $10,000 of losses has a $6,000 net loss. They deduct $3,000 this year, saving $360 of
          federal tax at 12%, and carry $3,000 forward to 2027.
        </p>
        <Callout tone="warn" title="The wash-sale rule">
          If you buy the same or a substantially identical security within 30 days before or after selling at a loss, the loss is disallowed for now and
          added to the basis of the new shares.
        </Callout>
      </GuideSection>

      <GuideSection id="home" n={12} kicker="Your home" title="Selling your home">
        <p>
          If you owned your main home and lived in it for at least 2 of the 5 years before the sale, up to $250,000 of gain is tax-free, or $500,000 for a
          married couple filing jointly where both meet the living test. You can use the exclusion once every two years. A loss on your own home is not
          deductible.
        </p>
        <WorkedExample
          title="Married filing jointly, $600,000 gain on a home, $150,000 of wages"
          steps={[
            { label: "Gain", value: "$600,000" },
            { label: "Home sale exclusion", value: "−$500,000" },
            { label: "Taxable long-term gain", value: "$100,000" },
          ]}
          total={{ label: "Federal tax (15%)", value: "$15,000" }}
        />
        <p>
          Improvements over the years raise your basis and shrink the gain, so keep the receipts. A partial exclusion may apply if you move early for a new
          job, health or another unforeseen reason. Planning the next purchase? The <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}
          and <a href="/us/housing/mortgage-affordability">home affordability calculator</a>{" "}help with the numbers.
        </p>
      </GuideSection>

      <GuideSection id="property" n={13} kicker="Property" title="Rental and investment property">
        <p>
          Rental and second homes do not get the exclusion. Depreciation you claimed (or could have claimed) is &quot;recaptured&quot; and taxed at up to
          25%, with the rest of the gain at the normal long-term rates. A 1031 like-kind exchange can defer the tax if you reinvest in other investment
          real estate within strict time limits.
        </p>
      </GuideSection>

      <GuideSection id="crypto" n={14} kicker="Special cases" title="Crypto, collectibles and special cases">
        <ul>
          <li>
            <strong>Crypto</strong>{" "}is property. Selling, swapping one coin for another or spending it is a sale. A single person with $45,000 of wages who
            makes a $5,000 short-term crypto gain pays $600 (12%).
          </li>
          <li><strong>Collectibles</strong>{" "}(art, coins, stamps, gold and silver, including many metal ETFs) are taxed at up to 28% when long-term.</li>
          <li><strong>Small business stock</strong>{" "}(section 1202) can be partly or wholly tax-free if held long enough.</li>
          <li><strong>Very large gains</strong>{" "}run into the 20% rate: a single person with $100,000 of wages and a $1 million gain pays $211,120 of federal tax on it, including $34,200 of NIIT.</li>
        </ul>
      </GuideSection>

      <GuideSection id="state" n={15} kicker="State" title="State tax on gains">
        <p>
          Most states tax capital gains as ordinary income at their normal rates, so a 5% state adds about 5% of the gain. States with no income tax
          (Texas, Florida, Nevada and others) do not tax gains, with one exception: Washington taxes long-term gains on stocks and similar assets above a
          yearly standard deduction ($270,000 for 2024, raised for inflation) at 7%, and at 9.9% on gains over $1 million from 2025. Real estate is exempt
          there. Some states, such as Arkansas and Wisconsin, tax only part of long-term gains.
        </p>
      </GuideSection>

      <GuideSection id="lower" n={16} kicker="Planning" title="Ways to lower the tax">
        <ul>
          <li><strong>Hold for more than a year</strong>{" "}to get the long-term rates.</li>
          <li><strong>Harvest losses</strong>{" "}to offset gains, minding the wash-sale rule.</li>
          <li><strong>Use the 0% band</strong>{" "}in low-income years, such as early retirement.</li>
          <li><strong>Invest through a 401(k) or IRA</strong>, where gains are not taxed each year. The <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a>{" "}shows tax-free growth.</li>
          <li><strong>Give appreciated shares</strong>{" "}to charity instead of cash: no gain is taxed and you may deduct the full value.</li>
          <li><strong>Spread a big sale</strong>{" "}across two tax years, or use an installment sale for property.</li>
        </ul>
      </GuideSection>

      <GuideSection id="reporting" n={17} kicker="Paperwork" title="Reporting and paying">
        <p>
          Sales are reported on Form 8949 and totaled on Schedule D of your Form 1040. Brokers send Form 1099-B; crypto platforms send Form 1099-DA from
          2025 sales. Tax on a big gain is due during the year, so you may need an estimated payment for the quarter of the sale to avoid a penalty; the{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}lists the 2026 due dates. The{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}puts gains together with the rest of your return.
        </p>
      </GuideSection>

      <GuideSection id="dividends" n={18} kicker="Income" title="Dividends and interest">
        <p>
          Qualified dividends, paid by most US companies and many foreign ones on shares you have held for more than 60 days around the dividend date,
          get the same 0%, 15% and 20% rates as long-term gains. Ordinary dividends, such as those from REITs and money market funds, and interest from
          savings accounts, CDs and bonds are taxed as ordinary income. All of them count toward the 3.8% net investment income tax.
        </p>
      </GuideSection>

      <GuideSection id="funds" n={19} kicker="Funds" title="Funds and ETFs in a taxable account">
        <p>
          Mutual funds must pass the gains they make on to shareholders, so you can owe tax in a year you sold nothing. ETFs usually pay out far fewer gains
          because of the way shares are created and redeemed. Index funds with low turnover are generally the most tax-efficient choice outside a
          retirement account. When you sell part of a holding, your broker uses first in, first out unless you choose specific lots, which can let you
          sell the shares with the highest cost first. The <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows
          how much tax drag on returns adds up over the years.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Selling a few days before the one-year mark and paying short-term rates.</li>
          <li>Forgetting reinvested dividends in the cost basis, which leads to paying tax twice on the same money.</li>
          <li>Leaving home improvements out of the basis when you sell a house.</li>
          <li>Buying back the same shares within 30 days of a loss sale (the wash-sale rule).</li>
          <li>Ignoring state tax, which can add 5% or more in many states.</li>
          <li>Not making an estimated payment after a large sale, which can bring an underpayment penalty.</li>
        </ul>
      </GuideSection>

      <GuideSection id="gifts" n={21} kicker="Family" title="Gifts and inheritances">
        <p>
          Giving away an asset does not trigger capital gains tax, but the person who receives it usually takes over your cost basis and pays the tax when
          they sell. Inherited assets are treated differently: the basis steps up to the value on the date of death, so the gain built up during the
          owner&rsquo;s lifetime is never taxed. That is why many people keep their most appreciated shares or property until death and give cash or
          high-basis assets during their lifetime. Inherited assets also count as long-term, however briefly the heir holds them.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "0% / 15% / 20%", label: "Long-term rates" },
            { value: "$49,450", label: "0% band ends, single" },
            { value: "$545,500", label: "20% starts, single" },
            { value: "$613,700", label: "20% starts, joint" },
            { value: "3.8%", label: "NIIT over $200,000 single" },
            { value: "28%", label: "Top rate on collectibles" },
            { value: "$500,000", label: "Home exclusion, joint" },
            { value: "$3,000", label: "Yearly loss deduction" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Dividends (US) — the guide. Figures from src/lib/us/wealth.ts (dividendPlan, dividendTax) and tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What dividends are" },
  { id: "yield", title: "Dividend yield" },
  { id: "example", title: "A worked example" },
  { id: "year-by-year", title: "How the income builds" },
  { id: "drip", title: "Reinvesting with a DRIP" },
  { id: "growth", title: "Dividend growth" },
  { id: "yield-vs-growth", title: "High yield or fast growth?" },
  { id: "yield-on-cost", title: "Yield on cost" },
  { id: "total-return", title: "Total return, not just yield" },
  { id: "qualified", title: "Qualified and ordinary dividends" },
  { id: "tax-rates", title: "2026 tax on dividends" },
  { id: "tax-examples", title: "Tax examples" },
  { id: "niit", title: "The 3.8% net investment income tax" },
  { id: "accounts", title: "Which account to hold them in" },
  { id: "income-goal", title: "How much you need for an income" },
  { id: "risks", title: "Dividend cuts and other risks" },
  { id: "dates", title: "Ex-dividend and payment dates" },
  { id: "funds", title: "Funds or single stocks" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS — Topic no. 404, Dividends", href: "https://www.irs.gov/taxtopics/tc404" },
  { label: "IRS — Publication 550, Investment income and expenses", href: "https://www.irs.gov/publications/p550" },
  { label: "IRS — Net investment income tax", href: "https://www.irs.gov/individuals/net-investment-income-tax" },
  { label: "IRS — Revenue Procedure 2025-32 (2026 inflation adjustments)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "Investor.gov (SEC) — Dividend reinvestment plans (DRIPs)", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/dividend-reinvestment-plans-drips" },
  { label: "Investor.gov (SEC) — Ex-dividend dates: when are you entitled to stock and cash dividends", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/ex-dividend-dates-when-are-you-entitled-stock-and" },
];

export default function DividendGuide() {
  return (
    <Guide
      kicker="The dividend guide"
      title="How dividend income grows, and how it is taxed"
      intro={
        <>
          Dividends are the cash some companies and funds pay their shareholders, usually every quarter. Reinvested, they buy more shares that pay
          more dividends, so a portfolio&rsquo;s income can snowball. This guide explains yield, reinvestment, dividend growth and yield on cost, and
          how qualified and ordinary dividends are taxed in 2026.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Yearly dividend income = amount invested × dividend yield. $100,000 at a 3% yield pays about $3,000 a year.</li>
          <li>Reinvesting dividends and steady dividend growth make the income grow much faster than your contributions.</li>
          <li>Qualified dividends are taxed at 0%, 15% or 20%; ordinary dividends at your income tax rate. A single filer pays 0% on qualified dividends up to $49,450 of taxable income in 2026.</li>
          <li>The yield isn&rsquo;t the return. A high yield can come with a falling share price.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$17,564", label: "Yearly income after 20 years in our example" },
            { value: "10.3%", label: "Yield on cost by then" },
            { value: "0% / 15% / 20%", label: "Tax rates on qualified dividends" },
            { value: "$49,450", label: "Top of the 0% band, single, 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What dividends are">
        <p>
          When a company makes a profit it can keep the money to grow, buy back its own shares or pay some out to shareholders as dividends. Many
          mature US companies pay a dividend every quarter and try to raise it each year. Funds pass on the dividends of the companies they hold, and
          bond funds and REITs pay distributions that work in a similar way.
        </p>
        <p>
          Dividends arrive whether or not the share price is up, which makes them attractive to people who want income, such as retirees. But a
          dividend isn&rsquo;t guaranteed: the company&rsquo;s board decides it, and can cut it.
        </p>
      </GuideSection>

      <GuideSection id="yield" n={3} kicker="Yield" title="Dividend yield">
        <p>
          <strong>Dividend yield = yearly dividends per share ÷ share price.</strong>{" "}A $50 share paying $1.50 a year yields 3%. If the price falls
          to $40 and the dividend stays the same, the yield rises to 3.75%, which is why a rising yield can be a warning rather than good news.
        </p>
        <p>
          Yields vary widely. A broad S&amp;P 500 fund yielded only about 1% in 2026, because many large companies, especially in technology, pay
          small dividends or none. Dividend-focused funds, utilities and consumer staples often yield 2.5% to 4%, and REITs more.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$50,000 to start, $500 a month, 3% yield, dividends growing 5% a year, share price growing 4% a year, 20 years, dividends reinvested"
          steps={[
            { label: "Your money in: $50,000 + $500 × 240 months", value: "$170,000" },
            { label: "Dividends in the first year", value: "$1,665" },
            { label: "Dividends received over 20 years, all reinvested", value: "$146,434" },
            { label: "Portfolio value after 20 years", value: "$483,483" },
            { label: "Yield on cost ($17,564 ÷ $170,000)", value: "10.33%" },
          ]}
          total={{ label: "Yearly dividend income at the end", value: "$17,564" }}
        />
        <p>
          That final income is about $1,464 a month. The same plan taking dividends in cash ends with a $291,477 portfolio paying $10,589 a year,
          plus $105,904 of dividends received along the way.
        </p>
      </GuideSection>

      <GuideSection id="year-by-year" n={5} kicker="Over time" title="How the income builds">
        <DataTable
          caption="The worked example with dividends reinvested"
          head={["Year", "Contributed", "Dividends that year", "Value", "Yearly income at year end"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["1", "$56,000", "$1,665", "$59,798", "$1,811"],
            ["5", "$80,000", "$3,154", "$106,824", "$3,362"],
            ["10", "$110,000", "$5,906", "$188,691", "$6,229"],
            ["15", "$140,000", "$10,159", "$307,938", "$10,664"],
            ["20", "$170,000", "$16,769", "$483,483", "$17,564"],
          ]}
        />
        <p>
          Income roughly doubles every six to seven years here. Three things push it up together: new contributions, reinvested dividends buying
          more shares, and each share&rsquo;s dividend rising 5% a year.
        </p>
      </GuideSection>

      <GuideSection id="drip" n={6} kicker="Reinvesting" title="Reinvesting with a DRIP">
        <p>
          A dividend reinvestment plan (DRIP) uses each dividend to buy more shares automatically, usually with no commission and in fractional
          shares. Most brokers offer it with a single setting. It is the simplest way to put compounding to work.
        </p>
        <CompareCards
          columns={[
            {
              name: "Reinvested (DRIP)",
              rows: [
                { label: "Value after 20 years", value: "$483,483" },
                { label: "Cash received", value: "$0" },
                { label: "Yearly income at the end", value: "$17,564" },
              ],
            },
            {
              name: "Taken in cash",
              rows: [
                { label: "Value after 20 years", value: "$291,477" },
                { label: "Cash received", value: "$105,904" },
                { label: "Yearly income at the end", value: "$10,589" },
              ],
            },
          ]}
        />
        <p>
          Reinvesting leaves you about $86,102 better off in total and with two-thirds more income at the end. Taking cash makes sense once you need
          the income to live on.
        </p>
        <Callout tone="warn" title="Reinvested dividends are still taxed">
          In a taxable account you owe tax on dividends in the year they are paid, even if the DRIP reinvests every cent. Keep a record of each
          reinvestment: it adds to your cost basis and lowers the capital gains tax when you sell.
        </Callout>
      </GuideSection>

      <GuideSection id="growth" n={7} kicker="Growth" title="Dividend growth">
        <p>
          Many companies raise their dividend every year as profits grow. A company that has raised its dividend for 25 years or more is often called
          a &quot;dividend aristocrat&quot;. Even without new money or reinvestment, a growing dividend lifts your income: at 5% a year, a dividend
          doubles in about 14 years.
        </p>
        <p>
          In the calculator, dividend growth and share price growth are separate settings. Over long periods they tend to move together, because both
          follow company profits; setting them equal is a sensible default.
        </p>
      </GuideSection>

      <GuideSection id="yield-vs-growth" n={8} kicker="Trade-off" title="High yield or fast growth?">
        <p>
          A high yield pays more now; a lower yield with faster growth usually pays more later. This compares three $100,000 portfolios over 20 years,
          with dividends taken in cash and the share price growing at the same rate as the dividend.
        </p>
        <DataTable
          caption="$100,000, no contributions, dividends paid out, 20 years"
          head={["Yield and growth", "Year 1", "Year 10", "Year 20", "Total cash", "Value at 20"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["6% yield, 1% growth", "$6,037", "$6,603", "$7,294", "$132,939", "$122,019"],
            ["3% yield, 5% growth", "$3,093", "$4,799", "$7,816", "$102,279", "$265,330"],
            ["2% yield, 8% growth", "$2,099", "$4,196", "$9,059", "$96,056", "$466,096"],
          ]}
        />
        <p>
          The high yielder pays the most cash over 20 years, but the slower grower and the fast grower overtake its yearly income, and their
          portfolios are worth far more at the end. Which suits you depends on when you need the money.
        </p>
      </GuideSection>

      <GuideSection id="yield-on-cost" n={9} kicker="Measure" title="Yield on cost">
        <p>
          Yield on cost divides today&rsquo;s yearly dividends by what you paid in. A $100,000 lump sum at a 3% yield, reinvested with 5% dividend
          growth, pays $3,129 in its first year and $6,689 a year after 10 years: a yield on cost of 6.69%, while the current yield is still about 3%.
        </p>
        <p>
          It is a satisfying number, but don&rsquo;t let it guide decisions. What matters for a decision is what the money could earn elsewhere today,
          which is the current yield and expected growth, not what you paid years ago.
        </p>
      </GuideSection>

      <GuideSection id="total-return" n={10} kicker="Return" title="Total return, not just yield">
        <p>
          When a stock goes ex-dividend, its price drops by about the amount of the dividend. A dividend moves value from the company to your pocket;
          it doesn&rsquo;t create it. Your real return is the total return: dividends plus the change in price. A 3% yield with 4% price growth is a
          total return of about 7%, the same as a 1% yield with 6% price growth. Our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows how a given total return compounds.
        </p>
      </GuideSection>

      <GuideSection id="qualified" n={11} kicker="Tax" title="Qualified and ordinary dividends">
        <p>
          The IRS splits dividends into two kinds. <strong>Qualified dividends</strong>{" "}get the lower long-term capital gains rates. They must be paid
          by a US company or a qualifying foreign one, and you must have held the shares for more than 60 days during the 121-day period that starts
          60 days before the ex-dividend date. <strong>Ordinary (non-qualified) dividends</strong>{" "}are taxed like wages. They include most REIT
          dividends, money market and bond fund distributions, and dividends on shares held only briefly.
        </p>
        <p>
          Your Form 1099-DIV shows total ordinary dividends in box 1a and the qualified part in box 1b. Brokers send one if you receive $10 or more.
        </p>
      </GuideSection>

      <GuideSection id="tax-rates" n={12} kicker="2026 rates" title="2026 tax on dividends">
        <DataTable
          caption="Tax rate on qualified dividends by 2026 taxable income"
          head={["Rate", "Single", "Married filing jointly", "Head of household"]}
          rows={[
            ["0%", "Up to $49,450", "Up to $98,900", "Up to $66,200"],
            ["15%", "$49,451 to $545,500", "$98,901 to $613,700", "$66,201 to $579,600"],
            ["20%", "Over $545,500", "Over $613,700", "Over $579,600"],
          ]}
        />
        <p>
          Qualified dividends are stacked on top of your other taxable income, so the rate depends on where they land. Part can be taxed at 0% and
          the rest at 15%. Our <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}uses the same bands for long-term gains, and
          the <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows your ordinary rate.
        </p>
      </GuideSection>

      <GuideSection id="tax-examples" n={13} kicker="Examples" title="Tax examples">
        <DataTable
          caption="Federal tax on $10,000 of dividends in 2026, standard deduction"
          head={["Household", "All qualified", "If all ordinary"]}
          numeric={[1, 2]}
          rows={[
            ["Single, $40,000 of other income", "$0", "$1,200"],
            ["Married jointly, $80,000", "$0", "$1,200"],
            ["Single, $120,000", "$1,500", "$2,364"],
            ["Single, $250,000 (with 3.8% NIIT)", "$1,880", "$3,580"],
            ["Single, $700,000 (with 3.8% NIIT)", "$2,380", "$4,080"],
          ]}
        />
        <p>
          At $120,000 of other income, if only 80% of the dividends were qualified, the tax would be $1,644 instead of $1,500. State income tax can
          apply on top; a few states have no income tax.
        </p>
      </GuideSection>

      <GuideSection id="niit" n={14} kicker="Surtax" title="The 3.8% net investment income tax">
        <p>
          Higher earners pay an extra 3.8% on investment income, including all dividends, when modified adjusted gross income is above $200,000
          (single or head of household), $250,000 (married filing jointly) or $125,000 (married filing separately). These thresholds aren&rsquo;t
          adjusted for inflation. The tax is 3.8% of the smaller of your investment income and the amount above the threshold.
        </p>
      </GuideSection>

      <GuideSection id="accounts" n={15} kicker="Where" title="Which account to hold them in">
        <p>
          Dividends inside an IRA, 401(k) or HSA aren&rsquo;t taxed each year. In a <a href="/us/savings/roth-ira-calculator">Roth IRA</a>{" "}they can be
          tax-free for good. That makes tax-advantaged accounts the natural home for high-yield holdings and anything paying ordinary dividends, such
          as REITs and bond funds. Funds paying mostly qualified dividends lose less to tax in a taxable account. Choose &quot;IRA, 401(k) or HSA&quot;
          under More options to see the plan with no yearly tax.
        </p>
      </GuideSection>

      <GuideSection id="income-goal" n={16} kicker="Planning" title="How much you need for an income">
        <p>To live on dividends without selling shares, divide the income you want by the yield:</p>
        <Figure label="Portfolio needed for $40,000 a year of dividends" caption="Before tax.">
          <Bars
            format={(n) => "$" + n.toLocaleString("en-US")}
            items={[
              { label: "At a 2% yield", value: 2_000_000 },
              { label: "At a 3% yield", value: 1_333_333 },
              { label: "At a 4% yield", value: 1_000_000 },
            ]}
          />
        </Figure>
        <p>
          Many retirees instead take a set percentage of a total-return portfolio, selling some shares when dividends fall short. Our{" "}
          <a href="/us/savings/fire-calculator">FIRE calculator</a>{" "}works from a withdrawal rate rather than a yield.
        </p>
      </GuideSection>

      <GuideSection id="risks" n={17} kicker="Risks" title="Dividend cuts and other risks">
        <ul>
          <li><strong>Cuts:</strong>{" "}in recessions many companies cut or suspend dividends, just when income investors need them.</li>
          <li><strong>Yield traps:</strong>{" "}a yield far above similar companies often means the price has fallen on fears of a cut.</li>
          <li><strong>Concentration:</strong>{" "}chasing yield can pile money into a few sectors such as utilities, banks and energy.</li>
          <li><strong>Payout ratio:</strong>{" "}a company paying out more than it earns can&rsquo;t keep it up for long.</li>
        </ul>
        <Callout title="Test a cut">
          Set dividend growth to a negative figure to see what a period of cuts would do to your income.
        </Callout>
      </GuideSection>

      <GuideSection id="dates" n={18} kicker="Timing" title="Ex-dividend and payment dates">
        <p>
          To receive a dividend you must own the shares before the ex-dividend date. Buy on or after it and the seller gets the dividend. The payment
          date, when cash arrives, is usually a few weeks later. Buying just before the ex-date to &quot;capture&quot; a dividend doesn&rsquo;t work:
          the price drops by the dividend, and a short holding makes the dividend non-qualified.
        </p>
      </GuideSection>

      <GuideSection id="funds" n={19} kicker="Choosing" title="Funds or single stocks">
        <p>
          A low-cost dividend fund spreads your money across dozens or hundreds of companies, so a single cut barely dents your income. Picking single
          stocks can give a higher yield or faster growth, but needs research and carries more risk. Either way, check the fund&rsquo;s expense ratio:
          a 0.5% yearly fee takes a sixth of a 3% yield.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Choosing investments by yield alone and ignoring total return.</li>
          <li>Forgetting that reinvested dividends are taxed in a taxable account.</li>
          <li>Not adding reinvested dividends to your cost basis, and paying tax twice when you sell.</li>
          <li>Holding REITs and bond funds in a taxable account when an IRA is available.</li>
          <li>Counting on today&rsquo;s dividend to last forever.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["0% rate on qualified dividends, 2026", "Taxable income up to $49,450 single, $98,900 joint, $66,200 head of household"],
            ["20% rate starts, 2026", "$545,500 single, $613,700 joint, $579,600 head of household"],
            ["Net investment income tax", "3.8% above $200,000 single, $250,000 joint"],
            ["Holding period for qualified dividends", "More than 60 days in the 121-day period around the ex-date"],
            ["Form 1099-DIV threshold", "$10"],
            ["S&P 500 fund dividend yield, 2026", "About 1%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

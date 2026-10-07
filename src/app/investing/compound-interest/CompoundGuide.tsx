import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Compound interest — the guide. Figures from src/lib/investing/growth.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What compound interest is" },
  { id: "formula", title: "The formula" },
  { id: "example", title: "A worked example" },
  { id: "frequency", title: "How often interest is added" },
  { id: "aer", title: "AER, APR and gross rates" },
  { id: "time", title: "Why starting early matters" },
  { id: "rule72", title: "The rule of 72" },
  { id: "regular", title: "Regular saving and rising contributions" },
  { id: "inflation", title: "Real returns after inflation" },
  { id: "charges", title: "The cost of charges" },
  { id: "tax", title: "Tax on interest and growth" },
  { id: "rates", title: "What rate to use" },
  { id: "debt", title: "Compounding works against you on debt" },
  { id: "snowball", title: "How the snowball builds" },
  { id: "sensitivity", title: "Small rate differences, big results" },
  { id: "cash", title: "Cash savings and inflation" },
  { id: "drag", title: "How tax slows compounding" },
  { id: "wrappers", title: "Using ISAs and pensions" },
  { id: "using", title: "Using the calculator well" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Interest rates explained", href: "https://www.moneyhelper.org.uk/en/savings/how-to-save/interest-rates-explained" },
  { label: "Financial Conduct Authority — Savings calculator", href: "https://www.fca.org.uk/consumers/savings-calculator" },
  { label: "Bank of England — Inflation", href: "https://www.bankofengland.co.uk/monetary-policy/inflation" },
  { label: "GOV.UK — Individual Savings Accounts", href: "https://www.gov.uk/individual-savings-accounts" },
];

export default function CompoundGuide() {
  return (
    <Guide
      kicker="The compound interest guide"
      title="How compound interest grows your money"
      intro={
        <>
          Compound interest means earning interest on your interest. Over years it turns steady saving into a much larger sum, and over decades it
          can do most of the work. This guide explains how it works, how often interest is added, why starting early matters, and how inflation,
          tax and charges change the picture.
        </>
      }
      meta={["Worked examples", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Each year&rsquo;s interest is added to your balance, so next year you earn interest on a bigger sum.</li>
          <li>£10,000 plus £200 a month at 5% grows to £109,333 over 20 years, of which £51,333 is interest.</li>
          <li>The rule of 72 says money doubles in about 72 ÷ the rate years: 12 years at 6%.</li>
          <li>Inflation, tax and charges all reduce what you end up with in real terms.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£109,333", label: "£10k + £200 a month, 5%, 20 years" },
            { value: "£51,333", label: "Of which interest" },
            { value: "12 years", label: "To double at 6%" },
            { value: "5.116%", label: "AER of 5% added monthly" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What compound interest is">
        <CompareCards
          columns={[
            {
              name: "Simple interest",
              rows: [
                { label: "Interest on", value: "The original amount only" },
                { label: "£10,000 at 5% for 10 years", value: "£15,000" },
              ],
            },
            {
              name: "Compound interest",
              rows: [
                { label: "Interest on", value: "The original amount plus past interest" },
                { label: "£10,000 at 5% for 10 years", value: "£16,289 (added yearly)" },
              ],
            },
          ]}
        />
        <p>
          The difference starts small but grows every year. After 30 or 40 years, interest on interest is usually the biggest part of a long-term
          savings pot.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={3} kicker="The maths" title="The formula">
        <p>For a single sum: final amount = starting amount × (1 + rate ÷ n)<sup>n × years</sup>, where n is how many times a year interest is added.</p>
        <p>
          For regular saving, each monthly payment grows for a different length of time, so the calculator works month by month. You can check a
          simple case by hand: £10,000 at 5% added once a year for 10 years is £10,000 × 1.05<sup>10</sup> = £16,289.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="£10,000 now, £200 a month, 5% a year added monthly, 20 years"
          steps={[
            { label: "Paid in: £10,000 + £200 × 240 months", value: "£58,000" },
            { label: "Interest earned", value: "£51,333" },
            { label: "Final balance", value: "£109,333" },
            { label: "In today's money, with 2% inflation", value: "£73,578" },
          ]}
          total={{ label: "Share of the final balance from interest", value: "47%" }}
        />
        <p>If you raise the monthly saving by 3% a year, in line with pay, the pot reaches £132,326 for £74,489 paid in.</p>
      </GuideSection>

      <GuideSection id="frequency" n={5} kicker="Compounding" title="How often interest is added">
        <DataTable
          caption="£10,000 at 5% for 10 years, no additions"
          head={["Interest added", "Final balance"]}
          numeric={[1]}
          rows={[
            ["Yearly", "£16,289"],
            ["Monthly", "£16,470"],
            ["Daily", "£16,487"],
          ]}
        />
        <p>
          More frequent compounding helps, but only a little. The rate itself and the time invested matter far more.
        </p>
      </GuideSection>

      <GuideSection id="aer" n={6} kicker="Comparing accounts" title="AER, APR and gross rates">
        <p>
          The <strong>AER</strong> (annual equivalent rate) shows what you would earn in a year once compounding is included, so you can compare
          accounts that pay interest at different intervals. A 5% rate paid monthly has an AER of 5.116%; paid daily, 5.127%. The{" "}
          <strong>gross</strong> rate is before tax. <strong>APR</strong> is used for borrowing and includes fees.
        </p>
      </GuideSection>

      <GuideSection id="time" n={7} kicker="Time" title="Why starting early matters">
        <Figure label="Saving at 6% a year until 65" caption="Starting at 25 with £200 a month, or 35 with £200 or £400.">
          <Bars
            items={[
              { label: "From 25, £200/m", value: 398298 },
              { label: "From 35, £200/m", value: 200903 },
              { label: "From 35, £400/m", value: 401806 },
            ]}
          />
        </Figure>
        <p>
          Starting at 25 with £200 a month gives £398,298 by 65 at 6%, from £96,000 paid in. Waiting until 35 halves the pot to £200,903. To catch up,
          you would need to save £400 a month, paying in £144,000.
        </p>
      </GuideSection>

      <GuideSection id="rule72" n={8} kicker="Shortcut" title="The rule of 72">
        <DataTable
          caption="Years to double"
          head={["Rate", "Exact", "Rule of 72"]}
          numeric={[1, 2]}
          rows={[
            ["2%", "35.0", "36.0"],
            ["4%", "17.7", "18.0"],
            ["6%", "11.9", "12.0"],
            ["8%", "9.0", "9.0"],
            ["10%", "7.3", "7.2"],
          ]}
        />
        <p>The same rule works for inflation: at 2% inflation, prices double in about 35 years.</p>
      </GuideSection>

      <GuideSection id="regular" n={9} kicker="Habits" title="Regular saving and rising contributions">
        <p>
          Regular monthly saving builds a pot steadily and smooths out the ups and downs of investing, because you buy more when prices are low.
          Increasing your contributions each year, for example by the same percentage as your <a href="/tax-and-salary/pay-rise">pay rise</a>, keeps saving a constant share of your income.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Real value" title="Real returns after inflation">
        <p>
          A balance in the future buys less than the same amount today. With 2% inflation, £109,333 in 20 years is worth about £73,578 in today&rsquo;s
          money. The <a href="/investing/inflation-impact">inflation calculator</a> shows how prices and savings change over time. A savings account
          paying less than inflation is losing value in real terms, even as the balance rises.
        </p>
      </GuideSection>

      <GuideSection id="charges" n={11} kicker="Costs" title="The cost of charges">
        <WorkedExample
          title="£100,000 invested for 25 years at 6% before charges"
          steps={[
            { label: "No charges", value: "£446,497" },
            { label: "With 1% a year in charges (5% net)", value: "£348,129" },
          ]}
          total={{ label: "Lost to charges", value: "£98,368" }}
        />
        <p>Charges compound too. Over 25 years, a 1% annual charge takes about a fifth of the final pot.</p>
      </GuideSection>

      <GuideSection id="tax" n={12} kicker="Tax" title="Tax on interest and growth">
        <p>
          The calculator assumes no tax, as in an ISA or pension. Outside these, interest above your <a href="/investing/personal-savings-allowance">Personal Savings Allowance</a>, dividends above £500,
          and gains above £3,000 a year are taxed, which slows compounding. The <a href="/investing/isa-vs-gia">ISA vs GIA calculator</a> shows the
          difference.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={13} kicker="Assumptions" title="What rate to use">
        <ul>
          <li>For a savings account, use the AER, and remember variable rates change.</li>
          <li>For a <a href="/investing/savings-interest">fixed-rate bond</a>, use the fixed rate for the term.</li>
          <li>For shares, long-term returns have averaged around 4% to 5% a year above inflation in the past, but with large swings and no guarantee.</li>
          <li>Run the calculator with a lower and a higher rate to see a range.</li>
        </ul>
      </GuideSection>

      <GuideSection id="debt" n={14} kicker="Borrowing" title="Compounding works against you on debt">
        <p>
          The same maths makes unpaid debt grow quickly. A credit card balance at 25% APR doubles in about three years if left unpaid. Paying off
          high-interest debt is often the best &ldquo;return&rdquo; available, because it saves interest at that rate with no risk.
        </p>
        <Callout tone="warn" title="Clear expensive debt first">
          Before investing for compound growth, pay off credit cards and overdrafts that charge more than you can reliably earn.
        </Callout>
      </GuideSection>

      <GuideSection id="snowball" n={15} kicker="Over time" title="How the snowball builds">
        <p>
          Compounding feels slow at first. In the default example (£10,000 plus £200 a month at 5%), the interest earned is modest in the early
          years and only takes off later. The table shows how the share of the balance that comes from interest grows over time.
        </p>
        <DataTable
          caption="£10,000 plus £200 a month at 5%, added monthly"
          head={["After", "Balance", "Of which interest"]}
          numeric={[1, 2]}
          rows={[
            ["5 years", "£26,435", "£4,435"],
            ["10 years", "£47,527", "£13,527"],
            ["20 years", "£109,333", "£51,333"],
          ]}
        />
        <p>
          In the first five years, interest makes up about a sixth of the balance. By year 20 it is nearly half. The second decade produced
          £37,806 of interest, almost three times the first decade&rsquo;s £13,527, even though the same £200 a month went in throughout. That
          is why the last few years of a long-term plan often add more than the first ten, and why stopping early costs so much.
        </p>
      </GuideSection>

      <GuideSection id="sensitivity" n={16} kicker="Rates" title="Small rate differences, big results">
        <p>
          Over long periods, a difference of one or two percentage points has a large effect. Here is £250 a month saved for 30 years, with
          £90,000 paid in each time.
        </p>
        <Figure label="£250 a month for 30 years" caption="Final balance at different annual rates, added monthly.">
          <Bars
            items={[
              { label: "2%", value: 123181 },
              { label: "4%", value: 173512 },
              { label: "6%", value: 251129 },
              { label: "8%", value: 372590 },
            ]}
          />
        </Figure>
        <p>
          Moving from 4% to 6% adds £77,617, and from 6% to 8% adds a further £121,461. Higher expected returns usually come with more risk,
          though, so a higher rate is not simply &ldquo;better&rdquo;. It is a trade-off between growth and the chance of losses along the way.
          Try a cautious, a middle and an optimistic rate to see the range of outcomes rather than relying on one number.
        </p>
      </GuideSection>

      <GuideSection id="cash" n={17} kicker="Savings" title="Cash savings and inflation">
        <p>
          Consumer prices rose by 3.1% in the year to August 2026, above the Bank of England&rsquo;s 2% target. When inflation is higher than
          the interest you earn, your balance rises but what it can buy falls.
        </p>
        <CompareCards
          columns={[
            {
              name: "£10,000 at 4% for 10 years",
              rows: [
                { label: "Inflation", value: "3.1% a year" },
                { label: "Worth in today's money", value: "£10,986" },
                { label: "Result", value: "A small real gain" },
              ],
            },
            {
              name: "£10,000 at 2% for 10 years",
              rows: [
                { label: "Inflation", value: "3.1% a year" },
                { label: "Worth in today's money", value: "£8,999" },
                { label: "Result", value: "A real loss of about £1,000" },
              ],
            },
          ]}
        />
        <p>
          Left in an account paying nothing, £10,000 would be worth just £7,369 in today&rsquo;s money after 10 years of 3.1% inflation. Cash is
          still the right home for an emergency fund and for money you need within a few years, but it is worth checking your rate regularly and
          moving if a better one is available.
        </p>
      </GuideSection>

      <GuideSection id="drag" n={18} kicker="Tax" title="How tax slows compounding">
        <p>
          Tax taken from interest each year means less is left to earn interest the next year. Over time, this &ldquo;tax drag&rdquo; adds up.
        </p>
        <WorkedExample
          title="£20,000 at 4% for 10 years, interest added yearly"
          steps={[
            { label: "Tax-free, as in a cash ISA", value: "£29,605" },
            { label: "Taxed at 40% each year (2.4% net)", value: "£25,353" },
          ]}
          total={{ label: "Cost of the tax", value: "£4,252" }}
        />
        <p>
          A higher-rate taxpayer&rsquo;s Personal Savings Allowance is £500 of interest a year (£1,000 for basic-rate taxpayers and nothing for
          additional-rate taxpayers), so balances like this soon go over it. This example assumes the whole amount is taxed, to show the effect
          clearly. The savings tax rates are due to rise by two percentage points from April 2027.
        </p>
      </GuideSection>

      <GuideSection id="wrappers" n={19} kicker="Shelter" title="Using ISAs and pensions">
        <p>
          The simplest way to let compounding work in full is to use a tax-free wrapper.
        </p>
        <ul>
          <li>
            <strong>ISAs:</strong> you can put up to £20,000 a year in. Interest, dividends and gains are tax-free, and withdrawals are too. From
            April 2027, under-65s can only put up to £12,000 of that in cash.
          </li>
          <li>
            <strong>Pensions:</strong> contributions get tax relief, and growth inside the pension is tax-free. You usually cannot take the money
            until 57 (from April 2028), and most withdrawals are taxed as income apart from a 25% tax-free part. See the{" "}
            <a href="/investing/pension-tax-relief">pension tax relief calculator</a>.
          </li>
          <li>
            <strong>Lifetime ISA:</strong> for people aged 18 to 39 saving for a first home or later life, the government adds 25% to up to
            £4,000 a year.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to" title="Using the calculator well">
        <ol>
          <li>Enter what you have now and what you plan to add each month.</li>
          <li>Choose a rate. For cash use the AER; for investments use a cautious long-term figure after charges.</li>
          <li>Set the number of years, for example until you retire or need the money.</li>
          <li>Under &ldquo;More options&rdquo;, set how often interest is added, any yearly rise in your saving, and an inflation rate.</li>
          <li>Read the result in today&rsquo;s money as well as in pounds, and use the chart to see any year along the way.</li>
        </ol>
        <p>
          Share the link to save your figures, or to compare two plans side by side in different tabs.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={21} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Ignoring inflation.</strong>{" "}A big number in 30 years is less impressive in today&rsquo;s money.</li>
          <li><strong>Using a rate before charges.</strong> Take fund and platform charges off the expected return first.</li>
          <li><strong>Assuming a steady return.</strong> Investments rise and fall. The calculator shows a smooth path, which real markets never follow.</li>
          <li><strong>Dipping in.</strong> Withdrawing early stops the money compounding. Keep a separate emergency fund in cash.</li>
          <li><strong>Leaving cash in a low-rate account.</strong> Many easy-access accounts pay far less than the best rates available.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "72 ÷ rate", label: "Years to double" },
            { value: "5.116%", label: "AER of 5% added monthly" },
            { value: "£16,289", label: "£10k at 5% for 10 years" },
            { value: "£398,298", label: "£200/m from 25 to 65 at 6%" },
            { value: "£98,368", label: "Cost of 1% charges on £100k over 25 years" },
            { value: "2%", label: "Bank of England inflation target" },
            { value: "£20,000", label: "ISA allowance" },
            { value: "35 years", label: "Prices double at 2% inflation" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

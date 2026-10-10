import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Rental property guide. Figures from rentalProperty() in src/lib/us/home-buying.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "example", title: "A worked example" },
  { id: "income", title: "Income and vacancy" },
  { id: "expenses", title: "Operating expenses" },
  { id: "noi", title: "Net operating income" },
  { id: "cap-rate", title: "Cap rate" },
  { id: "cash-flow", title: "Cash flow" },
  { id: "coc", title: "Cash-on-cash return" },
  { id: "dscr", title: "Debt service coverage" },
  { id: "rules", title: "The 1% and 50% rules" },
  { id: "leverage", title: "How much to put down" },
  { id: "rates", title: "Interest rates" },
  { id: "depreciation", title: "Depreciation" },
  { id: "taxes", title: "Taxes on rental income" },
  { id: "long-run", title: "The return over 10 years" },
  { id: "sale", title: "Selling: recapture and capital gains" },
  { id: "risks", title: "Risks to plan for" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS Publication 527: Residential rental property", href: "https://www.irs.gov/publications/p527" },
  { label: "IRS Publication 946: How to depreciate property", href: "https://www.irs.gov/publications/p946" },
  { label: "IRS Publication 925: Passive activity and at-risk rules", href: "https://www.irs.gov/publications/p925" },
  { label: "U.S. Census Bureau: American Community Survey 2024, median real estate taxes (B25103) and median home value (B25077)", href: "https://data.census.gov/table/ACSDT1Y2024.B25103" },
  { label: "Freddie Mac: Primary Mortgage Market Survey (weekly rates)", href: "https://www.freddiemac.com/pmms" },
  { label: "CFPB: Buying a house", href: "https://www.consumerfinance.gov/owning-a-home/" },
];

export default function RentalGuide() {
  return (
    <Guide
      kicker="The rental property guide"
      title="How to tell if a rental property pays"
      intro={
        <>
          A rental that looks profitable from the rent alone can lose money once vacancy, repairs, management, taxes and the mortgage are counted. This guide walks through the
          numbers investors use, from net operating income to cash-on-cash return, and shows where a rental&rsquo;s return really comes from over the years you own it.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Net operating income (NOI) is rent after vacancy less operating costs, before the mortgage.</li>
          <li>Cap rate is NOI ÷ price; cash-on-cash return is cash flow ÷ the cash you put in; DSCR is NOI ÷ mortgage payments.</li>
          <li>
            A {usd(300_000)} home renting for {usd(2_500)} a month, bought with 25% down at 7.5%, makes just {usd(171)} a year in cash flow, but about 10.3% a year over 10 years
            once loan paydown and 3% growth are counted.
          </li>
          <li>Depreciation over 27.5 years shelters much of the income from tax, but is partly taxed back when you sell.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(19_050), label: "NOI in the example" },
            { value: "6.35%", label: "Cap rate" },
            { value: "1.01", label: "DSCR" },
            { value: "10.3%", label: "Return a year over 10 years (IRR)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={2} kicker="Worked example" title="A worked example">
        <p>
          A {usd(300_000)} single-family home, 25% down, {usd(9_000)} of closing costs, a {usd(225_000)} loan at 7.5% for 30 years, rent of {usd(2_500)} a month and the
          calculator&rsquo;s default expenses:
        </p>
        <WorkedExample
          title="Year one, $300,000 rental"
          steps={[
            { label: "Gross rent", note: "$2,500 × 12", value: usd(30_000) },
            { label: "Vacancy", note: "5%", value: `−${usd(1_500)}` },
            { label: "Operating expenses", note: "Management, repairs, reserves, tax, insurance", value: `−${usd(9_450)}` },
            { label: "Net operating income", value: usd(19_050) },
            { label: "Mortgage payments", note: "$1,573.23 a month", value: `−${usd(18_879)}` },
          ]}
          total={{ label: "Cash flow", value: `${usd(171)} a year` }}
        />
        <p>
          That is about {usd(14)} a month on {usd(84_000)} of cash. The property is not a bad investment, as later sections show, but it is not an income stream either.
        </p>
      </GuideSection>

      <GuideSection id="income" n={3} kicker="Income" title="Income and vacancy">
        <p>
          Gross rent is the rent if the home is let every day of the year. Real income is lower: tenants move out, units need cleaning and repairs between tenants, and some rent
          goes unpaid. A 5% vacancy allowance is about 18 days a year; areas with high turnover need more.
        </p>
        <p>
          Check rent against listings for the same size of home nearby, and be wary of a seller&rsquo;s rent roll that is above the market. Parking, laundry, storage or pet fees
          can add income; enter them under More options.
        </p>
      </GuideSection>

      <GuideSection id="expenses" n={4} kicker="Costs" title="Operating expenses">
        <p>Operating expenses are everything it costs to run the property, except the mortgage. In year one of the example:</p>
        <Bars
          format={(n) => usd(n)}
          items={[
            { label: "Property tax (0.89% of the price)", value: 2_670 },
            { label: "Management (8% of collected rent)", value: 2_280 },
            { label: "Repairs (5% of rent)", value: 1_500 },
            { label: "Capital reserve (5% of rent)", value: 1_500 },
            { label: "Insurance", value: 1_500 },
          ]}
        />
        <p>
          The capital reserve is money set aside for big replacements: roof, water heater, HVAC, flooring and appliances. It does not leave your account every month, but if you do
          not set it aside, one replacement can wipe out years of cash flow. Some states and counties tax rental homes at higher rates than owner-occupied ones; check with the
          county assessor.
        </p>
      </GuideSection>

      <GuideSection id="noi" n={5} kicker="NOI" title="Net operating income">
        <p>
          NOI is income after vacancy less operating expenses: {usd(28_500)} − {usd(9_450)} = {usd(19_050)} in the example. It leaves out the mortgage on purpose, so you can compare
          properties no matter how they are financed. It also leaves out depreciation and income tax.
        </p>
      </GuideSection>

      <GuideSection id="cap-rate" n={6} kicker="Cap rate" title="Cap rate">
        <p>
          The capitalization rate is NOI ÷ price: {usd(19_050)} ÷ {usd(300_000)} = 6.35%. It is the return you would earn in year one if you paid cash, before income tax. Investors
          use it to compare properties and markets; buyers of apartment buildings often value them by dividing NOI by the local cap rate.
        </p>
        <Callout title="Compare it with your mortgage rate">
          When the cap rate is below your mortgage rate, every borrowed dollar costs more than it earns, so borrowing lowers your cash return. In the example the cap rate (6.35%) is
          below the 7.5% rate, which is why the cash flow is thin.
        </Callout>
      </GuideSection>

      <GuideSection id="cash-flow" n={7} kicker="Cash flow" title="Cash flow">
        <p>
          Cash flow is NOI less the mortgage payments, principal and interest. It is the money you actually keep each year. It usually grows over time because rent rises while a
          fixed-rate payment does not: in the example from {usd(171)} in year one to {usd(5_977)} in year 10, with rent and expenses both rising 3% a year.
        </p>
        <p>
          Break-even occupancy shows how much vacancy the deal can take: the property must be let 94.4% of the year to cover all its costs and the loan. That leaves little room for a
          long vacancy.
        </p>
      </GuideSection>

      <GuideSection id="coc" n={8} kicker="Cash return" title="Cash-on-cash return">
        <p>
          Cash-on-cash return is year-one cash flow ÷ the cash you put in. Cash in the example is the {usd(75_000)} down payment plus {usd(9_000)} closing costs, {usd(84_000)} in
          all, so the return is {usd(171)} ÷ {usd(84_000)} = 0.20%. Managing the property yourself (no 8% fee) would lift cash flow to {usd(2_451)}, or 2.92%, but you would be paid
          in your own time.
        </p>
      </GuideSection>

      <GuideSection id="dscr" n={9} kicker="Coverage" title="Debt service coverage">
        <p>
          The debt service coverage ratio is NOI ÷ the year&rsquo;s mortgage payments: {usd(19_050)} ÷ {usd(18_879)} = 1.01. At 1.00 the rent exactly covers the loan; below it you
          make up the difference. Lenders that underwrite loans on a property&rsquo;s rental income (often called DSCR loans) commonly look for about 1.2 or more.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={10} kicker="Shortcuts" title="The 1% and 50% rules">
        <p>
          Two rules of thumb help screen listings before you run full numbers. The <strong>1% rule</strong>{" "}looks for monthly rent of at least 1% of the price. The example rents for
          0.83%, and it shows: cash flow is close to zero. The <strong>50% rule</strong>{" "}says operating expenses (not the mortgage) eat about half the rent over time. The
          example&rsquo;s 33% is leaner, because it has no HOA or utilities and a new-ish home.
        </p>
        <p>Neither rule replaces real figures. Use them to decide which properties are worth a closer look.</p>
      </GuideSection>

      <GuideSection id="leverage" n={11} kicker="Leverage" title="How much to put down">
        <DataTable
          caption="The example property with different down payments, 7.5% for 30 years"
          head={["Down payment", "Cash flow a year", "Cash-on-cash", "DSCR", "10-year IRR"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["20%", `−${usd(1_087)}`, "−1.58%", "0.95", "10.66%"],
            ["25%", usd(171), "0.20%", "1.01", "10.27%"],
            ["30%", usd(1_430), "1.44%", "1.08", "9.96%"],
            ["40%", usd(3_947), "3.06%", "1.26", "9.52%"],
            ["50%", usd(6_464), "4.07%", "1.51", "9.21%"],
            ["All cash", usd(19_050), "6.17%", "No loan", "8.46%"],
          ]}
        />
        <p>
          More debt means thinner cash flow but a slightly higher long-run return, because a small amount of cash controls the whole property&rsquo;s growth. That only holds if the
          property grows; leverage magnifies losses too. Investment property loans usually need 15% to 25% down and cost more than a loan on your own home.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={12} kicker="Rates" title="Interest rates">
        <DataTable
          caption="25% down, changing only the rate"
          head={["Rate", "Cash flow a year", "Cash-on-cash", "DSCR"]}
          numeric={[1, 2, 3]}
          rows={[
            ["6.0%", usd(2_862), "3.41%", "1.18"],
            ["6.5%", usd(1_984), "2.36%", "1.12"],
            ["7.0%", usd(1_087), "1.29%", "1.06"],
            ["7.5%", usd(171), "0.20%", "1.01"],
            ["8.0%", `−${usd(762)}`, "−0.91%", "0.96"],
          ]}
        />
        <p>
          Each half point moves cash flow by about {usd(900)} a year on this loan. Our <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}shows the payment at
          any rate.
        </p>
      </GuideSection>

      <GuideSection id="depreciation" n={13} kicker="Tax" title="Depreciation">
        <p>
          The IRS lets you deduct the cost of a residential rental building, but not the land, over 27.5 years in equal amounts (Publication 527). The first year uses the
          mid-month rule: a home placed in service in January gets 11.5 months.
        </p>
        <WorkedExample
          title="Depreciation in the example"
          steps={[
            { label: "Price plus closing costs", value: usd(309_000) },
            { label: "Less land", note: "20%", value: `−${usd(61_800)}` },
            { label: "Building basis", value: usd(247_200) },
            { label: "First year", note: "11.5 months", value: usd(8_615) },
          ]}
          total={{ label: "Each full year after", value: usd(8_989) }}
        />
        <p>
          Your county&rsquo;s assessment often splits land and building values, which supports the split you use. Some closing costs belong in the basis and others are deducted
          differently; Publication 527 lists them.
        </p>
      </GuideSection>

      <GuideSection id="taxes" n={14} kicker="Tax" title="Taxes on rental income">
        <p>
          Taxable rental profit is roughly NOI less mortgage interest and depreciation. In the example, year one is a loss of {usd(6_369)} on paper even though cash flow is
          positive, and the property shows a taxable profit only from year 9.
        </p>
        <p>
          Rental losses are passive. If you actively take part in managing the property, you can deduct up to {usd(25_000)} a year of losses against other income; the allowance
          phases out between {usd(100_000)} and {usd(150_000)} of modified AGI (Publication 925). Losses you can&rsquo;t use carry forward to later years or the year you sell. The
          calculator&rsquo;s figures are before income tax.
        </p>
      </GuideSection>

      <GuideSection id="long-run" n={15} kicker="Total return" title="The return over 10 years">
        <p>Hold the example for 10 years with rent, costs and value each rising 3% a year, then sell for 6% in costs:</p>
        <DataTable
          head={["Item", "Amount"]}
          numeric={[1]}
          rows={[
            ["Cash invested", usd(84_000)],
            ["Cash flow over 10 years", usd(29_599)],
            ["Sale price", usd(403_175)],
            ["Selling costs", `−${usd(24_190)}`],
            ["Loan payoff", `−${usd(195_289)}`],
            ["Cash from the sale", usd(183_696)],
            ["Profit before tax", usd(129_295)],
          ]}
        />
        <p>
          You get back {usd(213_295)} for {usd(84_000)}, an equity multiple of 2.54×, or an internal rate of return of about 10.3% a year. Most of it comes from loan paydown and
          growth, not cash flow. With no growth in value, the profit falls to {usd(32_310)} and the return to about 3.6% a year. Our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows what the same {usd(84_000)} could grow to elsewhere.
        </p>
      </GuideSection>

      <GuideSection id="sale" n={16} kicker="Exit" title="Selling: recapture and capital gains">
        <p>
          When you sell, depreciation comes back to bite. The depreciation you took (or were allowed to take) is taxed at up to 25% as unrecaptured section 1250 gain. Over 10
          years the example takes {usd(89_516)} of depreciation, so up to about {usd(22_379)} of tax. Any further gain is taxed at long-term capital gains rates of 0%, 15% or 20%,
          and the 3.8% net investment income tax can apply at higher incomes. Rental homes do not get the home sale exclusion. Our{" "}
          <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}estimates the tax on the gain.
        </p>
        <p>A 1031 exchange into another investment property can defer the tax; it has strict deadlines and needs a qualified intermediary.</p>
      </GuideSection>

      <GuideSection id="risks" n={17} kicker="Risks" title="Risks to plan for">
        <CompareCards
          columns={[
            {
              name: "Money risks",
              rows: [
                { label: "Vacancy", value: "Months without rent" },
                { label: "Big repairs", value: "Roof, HVAC, foundation" },
                { label: "Rising costs", value: "Insurance and tax reassessment" },
              ],
            },
            {
              name: "Other risks",
              rows: [
                { label: "Tenants", value: "Late payment, eviction costs" },
                { label: "Rules", value: "Rent control, licensing, inspections" },
                { label: "Liquidity", value: "Months to sell, 6%+ to exit" },
              ],
            },
          ]}
        />
        <p>Keep a cash reserve of several months of expenses and mortgage payments for each property, on top of the capital reserve.</p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Counting rent for 12 months with no vacancy.</li>
          <li>Leaving out repairs, a capital reserve or management because you plan to do it yourself.</li>
          <li>Using the seller&rsquo;s property tax bill, which may rise after the sale.</li>
          <li>Buying a property with negative cash flow and relying only on price growth.</li>
          <li>Forgetting depreciation recapture when working out what you will keep from a sale.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price, down payment, a real investment-property rate quote and the market rent.</li>
          <li>Pick the state for typical property tax, then check the county&rsquo;s figure and your insurance quote under More options.</li>
          <li>Set vacancy, management, repairs and reserves to fit the property&rsquo;s age and area.</li>
          <li>Set how long you plan to hold it, growth assumptions and selling costs.</li>
          <li>Try a stress test: 10% vacancy, no value growth, a rate 1 point higher. If the deal still works, it is robust.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Residential rental depreciation", "27.5 years, straight line, mid-month"],
            ["Tax on depreciation at sale", "up to 25%"],
            ["Passive loss allowance (active participation)", "up to $25,000, phased out from $100,000 to $150,000 MAGI"],
            ["Long-term capital gains rates", "0%, 15%, 20%"],
            ["Net investment income tax", "3.8% above $200,000 single, $250,000 married"],
            ["Typical property tax (Census Bureau, 2024)", "about 0.89% of value a year"],
            ["1% rule", "monthly rent at least 1% of the price"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

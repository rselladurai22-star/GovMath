import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Rent vs buy guide. Figures from rentVsBuy() in src/lib/us/home-buying.ts and src/lib/us/mortgage.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "fair-test", title: "How to compare fairly" },
  { id: "example", title: "A worked example" },
  { id: "first-month", title: "The first month" },
  { id: "year-by-year", title: "Year by year" },
  { id: "unrecoverable", title: "Costs you never get back" },
  { id: "stay", title: "How long you stay" },
  { id: "rent-level", title: "How the rent changes the answer" },
  { id: "price-to-rent", title: "The price-to-rent ratio" },
  { id: "appreciation", title: "Home price growth" },
  { id: "returns", title: "What the renter earns" },
  { id: "rates", title: "Mortgage rates" },
  { id: "down", title: "A smaller down payment" },
  { id: "maintenance", title: "Maintenance and big repairs" },
  { id: "transaction", title: "Buying and selling costs" },
  { id: "taxes", title: "Taxes for owners and renters" },
  { id: "non-money", title: "What the numbers leave out" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Freddie Mac: Primary Mortgage Market Survey (weekly rates)", href: "https://www.freddiemac.com/pmms" },
  { label: "Freddie Mac: Budgeting for upfront homebuying costs", href: "https://myhome.freddiemac.com/blog/homebuying/budgeting-upfront-homebuying-costs" },
  { label: "Freddie Mac: Breaking down PMI", href: "https://myhome.freddiemac.com/buying/breaking-down-pmi" },
  { label: "IRS Publication 523: Selling your home", href: "https://www.irs.gov/publications/p523" },
  { label: "IRS Publication 936: Home mortgage interest deduction", href: "https://www.irs.gov/publications/p936" },
  { label: "U.S. Census Bureau: American Community Survey 2024, median real estate taxes (B25103) and median home value (B25077)", href: "https://data.census.gov/table/ACSDT1Y2024.B25103" },
  { label: "CFPB: Buying a house", href: "https://www.consumerfinance.gov/owning-a-home/" },
];

export default function RentVsBuyGuide() {
  return (
    <Guide
      kicker="The rent vs buy guide"
      title="Renting or buying: what really decides it"
      intro={
        <>
          Buying a home is often called the way to build wealth, and rent is called money thrown away. The truth is closer: both owners and renters pay costs that never come back,
          and the renter keeps the down payment to invest. This guide works through a full comparison and shows which few numbers tip the answer one way or the other.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Buying wins when you stay long enough for the home&rsquo;s growth and repaid principal to outrun the costs of buying, selling and owning.</li>
          <li>
            On a {usd(400_000)} home with 20% down at 7.25%, against {usd(2_200)} a month in rent, renting and investing the difference is {usd(11_888)} ahead after 10 years.
          </li>
          <li>Stay 15 years and buying is {usd(22_463)} ahead; it pulls ahead in year 13. After 30 years it is {usd(308_504)} ahead.</li>
          <li>The answer swings most with the length of your stay, the rent for a similar home, home price growth and mortgage rates.</li>
        </ul>
        <KeyStats
          items={[
            { value: "Year 13", label: "Break-even in the example" },
            { value: usd(92_000), label: "Cash needed to buy (20% down plus 3% closing)" },
            { value: "15.2", label: "Price-to-rent ratio in the example" },
            { value: "about 9%", label: "Of the price lost to buying and selling costs" },
          ]}
        />
      </GuideSection>

      <GuideSection id="fair-test" n={2} kicker="Method" title="How to compare fairly">
        <p>A fair comparison gives both households the same money and asks who ends up richer. The calculator does it this way:</p>
        <ol>
          <li>
            Both start with the cash the buyer needs: the down payment plus closing costs. The buyer spends it on the house; the renter <strong>invests it</strong>.
          </li>
          <li>Each month, both pay their housing costs. Whoever pays less invests the difference at the same return.</li>
          <li>
            At the end of each year we ask what each would walk away with: the owner sells (less selling costs and the loan balance) and the renter cashes in (less tax on the gains).
          </li>
        </ol>
        <p>
          Comparing the mortgage payment with the rent is not enough. The payment includes principal, which is savings, and leaves out maintenance, the cost of buying and selling
          and what the down payment could have earned.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>Here are the calculator&rsquo;s default figures, close to a typical purchase in 2026:</p>
        <WorkedExample
          title="$400,000 home or $2,200 rent, compared over 10 years"
          steps={[
            { label: "Down payment", note: "20% of the price", value: usd(80_000) },
            { label: "Closing costs", note: "3% of the price", value: usd(12_000) },
            { label: "Mortgage", note: "$320,000 at 7.25% for 30 years", value: "$2,182.96 a month" },
            { label: "Owner's net worth after 10 years", note: "Home worth $537,567, less 6% to sell and $276,193 still owed, plus savings", value: usd(229_119) },
            { label: "Renter's net worth after 10 years", note: "$92,000 plus monthly savings invested at 6%, after 15% tax on gains", value: usd(241_008) },
          ]}
          total={{ label: "Renting ahead by", value: usd(11_888) }}
        />
        <p>
          Property tax is 0.89% of the home&rsquo;s value (the national typical rate from the Census Bureau), insurance {usd(1_800)} a year, maintenance 1% of the value a year,
          home prices and rents both rising 3% a year.
        </p>
      </GuideSection>

      <GuideSection id="first-month" n={4} kicker="Monthly costs" title="The first month">
        <p>
          In month one, owning costs {usd(2_963)}: principal and interest of {usd(2_183)}, property tax, insurance and a maintenance allowance. Renting costs {usd(2_215)}, the rent
          plus renters insurance. The renter invests the {usd(748)} gap.
        </p>
        <p>
          Not all of the owner&rsquo;s {usd(2_963)} is a cost. In the first year, {usd(3_097)} of the mortgage payments repay principal, which comes back when you sell. The other{" "}
          {usd(23_098)} is interest. Over time the balance shifts toward principal, and rent rises while the mortgage payment stays the same, so owning gets relatively cheaper each
          year.
        </p>
      </GuideSection>

      <GuideSection id="year-by-year" n={5} kicker="The race" title="Year by year">
        <p>Buying starts behind, because closing costs are spent and selling costs would be due on day one. Then it catches up a little each year.</p>
        <DataTable
          caption="Default example: net worth if you sold or cashed in at the end of each year"
          head={["Year", "Home value", "Loan balance", "Owner", "Renter"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["1", usd(412_000), usd(316_903), usd(70_377), usd(105_875)],
            ["3", usd(437_091), usd(309_995), usd(100_871), usd(134_297)],
            ["5", usd(463_710), usd(302_012), usd(133_875), usd(163_628)],
            ["7", usd(491_950), usd(292_788), usd(169_645), usd(193_882)],
            ["10", usd(537_567), usd(276_193), usd(229_119), usd(241_008)],
          ]}
        />
        <p>
          The gap shrinks from {usd(35_498)} after one year to {usd(11_888)} after ten. Run the calculator for 15 years and buying moves ahead in year 13. The chart in the
          calculator shows the two lines crossing.
        </p>
      </GuideSection>

      <GuideSection id="unrecoverable" n={6} kicker="Sunk costs" title="Costs you never get back">
        <p>
          A useful way to see the trade-off is to add up the money each household spends that never returns. Over the 10 years in the example:
        </p>
        <Bars
          format={(n) => usd(n)}
          items={[
            { label: "Owner: mortgage interest", value: 218_149 },
            { label: "Owner: maintenance", value: 45_856 },
            { label: "Owner: property tax", value: 40_811 },
            { label: "Owner: selling costs", value: 32_254 },
            { label: "Owner: insurance", value: 20_635 },
            { label: "Owner: closing costs", value: 12_000 },
            { label: "Renter: rent", value: 302_646 },
            { label: "Renter: renters insurance", value: 2_063 },
          ]}
        />
        <p>
          The owner&rsquo;s sunk costs total {usd(369_705)}, against {usd(304_710)} for the renter. The owner makes up the difference through the home&rsquo;s rise in value. The
          renter makes it up through returns on the invested down payment. Whichever gain is bigger, net of costs, decides the winner.
        </p>
      </GuideSection>

      <GuideSection id="stay" n={7} kicker="Time" title="How long you stay">
        <p>Time is the biggest lever. Buying and selling costs are paid once, so the longer you stay, the thinner they are spread.</p>
        <DataTable
          caption="Default example: buying minus renting at the end of each stay"
          head={["Stay", "Result", "Break-even year"]}
          numeric={[1]}
          rows={[
            ["3 years", `Renting ahead by ${usd(33_427)}`, "None"],
            ["5 years", `Renting ahead by ${usd(29_753)}`, "None"],
            ["7 years", `Renting ahead by ${usd(24_237)}`, "None"],
            ["10 years", `Renting ahead by ${usd(11_888)}`, "None"],
            ["15 years", `Buying ahead by ${usd(22_463)}`, "Year 13"],
            ["20 years", `Buying ahead by ${usd(80_174)}`, "Year 13"],
            ["30 years", `Buying ahead by ${usd(308_504)}`, "Year 13"],
          ]}
        />
        <p>
          If a job move, a growing family or a relationship change could make you sell within a few years, renting is usually the safer bet. Selling early can also mean bringing
          cash to the closing table if prices dip.
        </p>
      </GuideSection>

      <GuideSection id="rent-level" n={8} kicker="Rent" title="How the rent changes the answer">
        <p>
          The rent for a <em>similar</em> home is the other key input. Keep the {usd(400_000)} home and 10-year stay, and change only the rent:
        </p>
        <DataTable
          head={["Rent a month", "After 10 years", "Break-even"]}
          numeric={[1]}
          rows={[
            [usd(1_600), `Renting ahead by ${usd(117_924)}`, "None"],
            [usd(1_800), `Renting ahead by ${usd(82_579)}`, "None"],
            [usd(2_000), `Renting ahead by ${usd(47_234)}`, "None"],
            [usd(2_200), `Renting ahead by ${usd(11_888)}`, "None"],
            [usd(2_600), `Buying ahead by ${usd(58_802)}`, "Year 6"],
            [usd(3_000), `Buying ahead by ${usd(129_493)}`, "Year 4"],
          ]}
        />
        <p>
          Every {usd(200)} of monthly rent moves the 10-year result by about {usd(35_000)}. Use listings for homes of the same size, condition and area as the one you would buy,
          not your current apartment. To check what rent your income supports, use our <a href="/us/housing/rent-affordability">rent affordability calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="price-to-rent" n={9} kicker="Rule of thumb" title="The price-to-rent ratio">
        <p>
          The price-to-rent ratio divides the price by a year&rsquo;s rent for a similar home. In the example it is {usd(400_000)} ÷ {usd(26_400)} = 15.2. It is a quick screen,
          not a verdict: low ratios lean toward buying, high ratios toward renting, and the break-even depends on rates and how long you stay.
        </p>
        <p>
          With rent of {usd(3_000)} the ratio is 11.1 and buying wins from year 4. With rent of {usd(1_600)} it is 20.8 and renting stays well ahead for 10 years. Big coastal
          cities often have high ratios; many Midwestern and Southern markets have lower ones.
        </p>
      </GuideSection>

      <GuideSection id="appreciation" n={10} kicker="Prices" title="Home price growth">
        <p>
          Because you borrow most of the price, a small change in home price growth has a big effect on your equity. With 20% down, a 3% rise in value is a 15% gain on your down
          payment, before costs.
        </p>
        <DataTable
          caption="Default example over 10 years, changing only home price growth"
          head={["Growth a year", "After 10 years", "Break-even"]}
          numeric={[1]}
          rows={[
            ["0%", `Renting ahead by ${usd(128_208)}`, "None"],
            ["1%", `Renting ahead by ${usd(92_983)}`, "None"],
            ["2%", `Renting ahead by ${usd(54_306)}`, "None"],
            ["3%", `Renting ahead by ${usd(11_888)}`, "None"],
            ["4%", `Buying ahead by ${usd(34_581)}`, "Year 7"],
            ["5%", `Buying ahead by ${usd(85_435)}`, "Year 4"],
          ]}
        />
        <Callout tone="warn" title="Leverage works both ways">
          The same borrowing that magnifies gains magnifies losses. If prices fall, you can owe more than the home is worth. Use a growth figure you would be happy to plan on, not the
          best few years of the past.
        </Callout>
      </GuideSection>

      <GuideSection id="returns" n={11} kicker="Investing" title="What the renter earns">
        <p>
          The renter&rsquo;s side only works if the money is really invested and left alone. The return you assume matters almost as much as home price growth:
        </p>
        <DataTable
          caption="Default example over 10 years, changing only the renter's return"
          head={["Return a year", "After 10 years", "Break-even"]}
          numeric={[1]}
          rows={[
            ["3%", `Buying ahead by ${usd(35_386)}`, "Year 7"],
            ["4%", `Buying ahead by ${usd(20_861)}`, "Year 8"],
            ["5%", `Buying ahead by ${usd(5_133)}`, "Year 10"],
            ["6%", `Renting ahead by ${usd(11_888)}`, "None"],
            ["7%", `Renting ahead by ${usd(30_299)}`, "None"],
            ["8%", `Renting ahead by ${usd(50_203)}`, "None"],
          ]}
        />
        <p>
          A savings account paying around 4% is safe but makes buying look better. A stock index fund has earned more over long periods, but with years of losses along the way. Our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows how a lump sum grows at different rates. Be honest about your habits: if the
          monthly savings would be spent rather than invested, the renter&rsquo;s figure is too high.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={12} kicker="Rates" title="Mortgage rates">
        <p>
          Freddie Mac&rsquo;s weekly survey put the average 30-year fixed rate at about 7.3% on October 1, 2026. A lower rate cuts both the payment and the interest that never comes
          back:
        </p>
        <CompareCards
          columns={[
            {
              name: "5.5% rate",
              rows: [
                { label: "First month owning", value: usd(2_597) },
                { label: "After 10 years", value: `Buying +${usd(57_313)}` },
                { label: "Break-even", value: "Year 5" },
              ],
            },
            {
              name: "6.5% rate",
              rows: [
                { label: "First month owning", value: usd(2_803) },
                { label: "After 10 years", value: `Buying +${usd(18_052)}` },
                { label: "Break-even", value: "Year 8" },
              ],
            },
            {
              name: "7.25% rate",
              rows: [
                { label: "First month owning", value: usd(2_963) },
                { label: "After 10 years", value: `Renting +${usd(11_888)}` },
                { label: "Break-even", value: "Not within 10 years" },
              ],
            },
          ]}
        />
        <p>
          If you buy now and rates later fall, you can refinance, though it costs money; our <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}works out when a
          new rate pays for itself.
        </p>
      </GuideSection>

      <GuideSection id="down" n={13} kicker="Down payment" title="A smaller down payment">
        <p>
          A smaller down payment means a bigger loan, more interest and, on a conventional loan, PMI until you reach 22% equity on the original schedule. In the example, keeping
          everything else the same over 10 years:
        </p>
        <ul>
          <li>20% down: first month {usd(2_963)}, renting ahead by {usd(11_888)}.</li>
          <li>10% down: first month {usd(3_386)}, renting ahead by {usd(45_234)}.</li>
          <li>5% down: first month {usd(3_531)}, renting ahead by {usd(51_951)}.</li>
        </ul>
        <p>
          Buying with less down is still often sensible, because it gets you into a home years sooner. Our <a href="/us/housing/down-payment-calculator">down payment calculator</a>{" "}
          compares 3% to 20% down and shows how long each takes to save.
        </p>
      </GuideSection>

      <GuideSection id="maintenance" n={14} kicker="Upkeep" title="Maintenance and big repairs">
        <p>
          Renters call the landlord; owners pay. A common rule of thumb is to budget about 1% of the home&rsquo;s value a year, which in the example comes to {usd(45_856)} over 10
          years. The money rarely arrives evenly: a quiet year can be followed by a new roof, water heater or HVAC system. An older home or one with a big lot can need 2% or more.
        </p>
        <p>Keep an emergency fund for repairs on top of the down payment. Stretching every dollar into the purchase leaves no room for the first surprise.</p>
      </GuideSection>

      <GuideSection id="transaction" n={15} kicker="Fees" title="Buying and selling costs">
        <p>
          Freddie Mac puts closing costs at about 2% to 5% of the purchase price: lender fees, appraisal, title insurance, recording fees and prepaid items. Selling costs include
          agent commissions, transfer taxes and title fees; the calculator assumes 6% of the sale price, and commissions are negotiable.
        </p>
        <p>
          In the example these add up to {usd(12_000)} to buy and {usd(32_254)} to sell after 10 years. That is why short stays rarely favor buying. Our{" "}
          <a href="/us/housing/closing-cost-calculator">closing cost calculator</a>{" "}breaks the buying side down line by line.
        </p>
      </GuideSection>

      <GuideSection id="taxes" n={16} kicker="Tax" title="Taxes for owners and renters">
        <p>
          <strong>Mortgage interest and property tax</strong>{" "}are deductible only if you itemize. For 2026 the standard deduction is {usd(16_100)} for single filers and {usd(32_200)}{" "}
          for married couples filing jointly, so many owners, especially couples, get little or nothing extra from these deductions. The calculator leaves them out; if you itemize,
          buying looks a little better.
        </p>
        <p>
          <strong>Home sale gains</strong>{" "}are usually tax-free: IRS Publication 523 lets you exclude up to {usd(250_000)} of gain ({usd(500_000)} married filing jointly) if you
          owned and lived in the home for two of the last five years. <strong>Investment gains</strong>{" "}are taxed when you sell; most people pay 15% on long-term gains, which the
          calculator takes off the renter&rsquo;s balance at the end.
        </p>
      </GuideSection>

      <GuideSection id="non-money" n={17} kicker="Beyond money" title="What the numbers leave out">
        <CompareCards
          columns={[
            {
              name: "Owning gives you",
              rows: [
                { label: "Stability", value: "No lease renewals or rent hikes" },
                { label: "Control", value: "Renovate, keep pets, paint" },
                { label: "Forced saving", value: "Principal builds equity monthly" },
              ],
            },
            {
              name: "Renting gives you",
              rows: [
                { label: "Flexibility", value: "Move with a month or two's notice" },
                { label: "Predictable costs", value: "No surprise repair bills" },
                { label: "Diversification", value: "Savings not tied to one house" },
              ],
            },
          ]}
        />
        <p>None of these show up in a net-worth chart, but they can be worth more to you than a few thousand dollars either way.</p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Comparing the mortgage payment with the rent and stopping there.</li>
          <li>Forgetting maintenance, closing costs and selling costs.</li>
          <li>Comparing a three-bedroom house with a one-bedroom apartment.</li>
          <li>Assuming home prices will keep rising as fast as they did in the last few years.</li>
          <li>Counting the renter&rsquo;s investments but not investing in real life.</li>
          <li>Buying at the top of your budget and leaving no cash for repairs. Our <a href="/us/housing/mortgage-affordability">home affordability calculator</a>{" "}shows a safer price.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price of the home you would buy and the rent for a similar one nearby.</li>
          <li>Set your down payment, a real rate quote and how long you expect to stay.</li>
          <li>Pick your state for its typical property tax rate, then check the county figure under More options.</li>
          <li>Try a pessimistic case (1% price growth, 7% returns) and an optimistic one (4% growth, 4% returns). If buying wins in both, it is a strong case.</li>
          <li>Copy the link to share the exact figures with a partner.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average 30-year fixed rate (Freddie Mac, October 1, 2026)", "about 7.3%"],
            ["Closing costs to buy (Freddie Mac)", "about 2% to 5% of the price"],
            ["Typical property tax (Census Bureau, 2024)", "about 0.89% of value a year"],
            ["Maintenance rule of thumb", "about 1% of value a year"],
            ["Home sale gain exclusion", "$250,000 single, $500,000 married filing jointly"],
            ["2026 standard deduction", "$16,100 single, $32,200 married filing jointly"],
            ["PMI cost (Freddie Mac)", "about 0.35% to 0.85% of the loan a year"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

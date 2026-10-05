import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Rent or buy — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "how", title: "How the comparison works" },
  { id: "buying-costs", title: "The costs of buying" },
  { id: "renting-costs", title: "The costs of renting" },
  { id: "example", title: "A worked example" },
  { id: "time", title: "How long you stay" },
  { id: "prices", title: "House prices" },
  { id: "rent-level", title: "How high the rent is" },
  { id: "rates", title: "Mortgage rates" },
  { id: "returns", title: "Investment returns" },
  { id: "behaviour", title: "Will the renter really invest?" },
  { id: "beyond-money", title: "Beyond the money" },
  { id: "limits", title: "What the model leaves out" },
  { id: "wealth-vs-cash", title: "Wealth, not monthly cost" },
  { id: "other-routes", title: "Other routes into owning" },
  { id: "renter-wealth", title: "Building wealth as a renter" },
  { id: "using", title: "How to use the calculator" },
  { id: "flat-prices", title: "Example: when prices stand still" },
  { id: "which", title: "When each choice tends to win" },
  { id: "tax", title: "Tax differences between owning and renting" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Is it cheaper to rent or buy?", href: "https://www.moneyhelper.org.uk/en/blog/buy-or-rent-a-home/no-place-like-home-is-it-cheaper-to-rent-or-buy" },
  { label: "ONS — House Price Index", href: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/housepriceindex/latest" },
  { label: "ONS — Price Index of Private Rents", href: "https://www.ons.gov.uk/economy/inflationandpriceindices/bulletins/privaterentandhousepricesuk/latest" },
  { label: "GOV.UK — Stamp Duty Land Tax", href: "https://www.gov.uk/stamp-duty-land-tax" },
];

export default function RentVsBuyGuide() {
  return (
    <Guide
      kicker="The rent or buy guide"
      title="Should you rent or buy?"
      intro={
        <>
          Buying builds equity but comes with big upfront and running costs; renting is flexible and lets your savings grow
          elsewhere. This guide explains how to compare them fairly, which assumptions matter most, and why the answer depends so
          much on how long you stay.
        </>
      }
      meta={["Updated for 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="how" n={1} kicker="The method" title="How the comparison works">
        <p>
          A fair comparison starts both people with the same money. The buyer spends it on a deposit, Stamp Duty and fees. The
          renter invests it instead. Each month, whoever has the lower housing cost invests the difference.
        </p>
        <p>At the end of the period the calculator compares:</p>
        <ul>
          <li>
            <strong>the buyer&apos;s wealth:</strong> the home&apos;s value, minus the mortgage still owed and the cost of selling,
            plus any savings; and
          </li>
          <li>
            <strong>the renter&apos;s wealth:</strong> the invested deposit and costs, plus everything saved along the way, with
            growth.
          </li>
        </ul>
        <p>Whichever is larger came out ahead. Comparing monthly payments alone misses most of what matters.</p>
      </GuideSection>

      <GuideSection id="buying-costs" n={2} kicker="Buying" title="The costs of buying">
        <ul>
          <li><strong>Upfront:</strong> deposit, Stamp Duty (or LBTT or LTT), legal fees, survey and mortgage fees.</li>
          <li><strong>Monthly:</strong> mortgage payments, part interest and part capital.</li>
          <li><strong>Upkeep:</strong> repairs, maintenance and buildings insurance, often around 1% of the home&apos;s value a year.</li>
          <li><strong>Leasehold costs:</strong> service charge and ground rent for many flats.</li>
          <li><strong>Selling:</strong> estate agent and legal fees when you move on, often 1% to 2% of the value.</li>
        </ul>
        <p>Only the interest, upkeep and transaction costs are truly spent. The capital part of each payment builds your equity.</p>
      </GuideSection>

      <GuideSection id="renting-costs" n={3} kicker="Renting" title="The costs of renting">
        <ul>
          <li><strong>Rent,</strong> usually rising each year.</li>
          <li><strong>A deposit,</strong> which is returned at the end if there is no damage, so it is not a cost.</li>
          <li><strong>Contents insurance.</strong> The landlord pays for buildings insurance and most repairs.</li>
          <li><strong>Moving costs</strong> if the landlord sells or you are asked to leave.</li>
        </ul>
        <p>Rent buys no equity, but the renter&apos;s savings can be invested and grow.</p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <p>
          A first-time buyer in England looks at a £300,000 home with a £30,000 deposit, or renting a similar home for £1,300 a
          month. The mortgage is 4.5% over 25 years. House prices and rents both rise 3% a year, investments return 5%, upkeep is
          1% a year and selling costs 1.5%.
        </p>
        <WorkedExample
          title="After 10 years"
          steps={[
            { label: "Cash to buy", note: "Deposit plus £2,500 of fees; no Stamp Duty", value: "£32,500" },
            { label: "Mortgage payment", value: "£1,501 a month" },
            { label: "Owning cost in year one", note: "Mortgage plus upkeep", value: "£1,754 a month" },
            { label: "Home value after 10 years", value: "£403,175" },
            { label: "Mortgage still owed", value: "£196,178" },
            { label: "Buyer's wealth", value: "£200,949" },
            { label: "Renter's wealth", value: "£101,577" },
          ]}
          total={{ label: "Buying ahead by", value: "£99,372" }}
        />
        <p>
          Even though owning costs more each month at first, the buyer comes out well ahead, mostly because 3% growth on a £300,000
          home adds far more than 5% growth on the renter&apos;s £32,500.
        </p>
      </GuideSection>

      <GuideSection id="time" n={5} kicker="Time" title="How long you stay">
        <p>
          Buying has large one-off costs at the start and the end. The longer you stay, the more those costs are spread out and the
          more equity you build.
        </p>
        <DataTable
          caption="The example over different periods"
          head={["Years", "Buyer's wealth", "Renter's wealth", "Buying ahead by"]}
          numeric={[1, 2, 3]}
          rows={[
            ["3", "£71,682", "£54,006", "£17,676"],
            ["5", "£105,349", "£68,105", "£37,244"],
            ["10", "£200,949", "£101,577", "£99,372"],
            ["20", "£470,396", "£168,342", "£302,054"],
          ]}
        />
        <p>
          With Stamp Duty to pay as a home mover, or lower price growth, the break-even point moves later. If you might move again
          within two or three years, renting is often the safer choice.
        </p>
      </GuideSection>

      <GuideSection id="prices" n={6} kicker="House prices" title="House prices">
        <p>House price growth is the biggest single driver of the result:</p>
        <Bars
          items={[
            { label: "0% a year", value: 3_464 },
            { label: "3% a year", value: 99_372 },
            { label: "5% a year", value: 179_225 },
          ]}
        />
        <p>
          Those are the amounts by which buying comes out ahead after 10 years. With no house price growth at all, buying only just
          wins in year 10, by £3,464. With prices falling, renting would win. Past growth is no guarantee: prices can stagnate for
          years, especially after rapid rises.
        </p>
      </GuideSection>

      <GuideSection id="rent-level" n={7} kicker="Rents" title="How high the rent is">
        <p>
          The higher the rent compared with the price, the stronger the case for buying. A useful check is the price-to-rent ratio:
          the price divided by a year&apos;s rent.
        </p>
        <DataTable
          caption="£300,000 home after 10 years, at different rents"
          head={["Rent a month", "Price-to-rent ratio", "Buying ahead by"]}
          numeric={[1, 2]}
          rows={[
            ["£1,000", "25", "£46,911"],
            ["£1,300", "19", "£99,372"],
            ["£1,600", "16", "£151,833"],
          ]}
        />
        <p>
          In areas where homes are expensive compared with rents, renting and investing looks relatively better. Where rents are
          high compared with prices, buying usually wins sooner.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={8} kicker="Interest" title="Mortgage rates">
        <p>
          Higher mortgage rates raise the cost of owning. At 6% instead of 4.5%, the payment on the example rises from £1,501 to
          £1,740 a month, and buying&apos;s lead after 10 years shrinks from £99,372 to £52,527. Most mortgages fix for two to five
          years, so the rate you pay later is uncertain.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={9} kicker="Investments" title="Investment returns">
        <p>
          The renter&apos;s side depends on what their money earns. At 7% a year instead of 5%, the renter&apos;s wealth rises to
          £118,749 after 10 years, cutting buying&apos;s lead to £82,201. In a cash savings account earning less, renting looks
          worse. Investments can also fall, especially over short periods.
        </p>
        <Callout title="Use an ISA">
          Investment growth inside an ISA is tax-free. Outside an ISA, tax on interest, dividends and gains would reduce the
          renter&apos;s returns. The calculator does not deduct tax.
        </Callout>
      </GuideSection>

      <GuideSection id="behaviour" n={10} kicker="In practice" title="Will the renter really invest?">
        <p>
          The comparison assumes the renter invests every pound they do not spend on housing. In real life many people do not, and
          the money gets spent. A mortgage acts as forced saving: every payment builds equity whether you feel like saving or not.
        </p>
        <p>
          If you are confident you would invest the difference consistently, renting can compete. If not, buying&apos;s advantage
          is usually larger than the figures suggest.
        </p>
      </GuideSection>

      <GuideSection id="beyond-money" n={11} kicker="Lifestyle" title="Beyond the money">
        <CompareCards
          columns={[
            {
              name: "Buying",
              rows: [
                { label: "Security", value: "You decide when to move" },
                { label: "Freedom", value: "Decorate and improve as you like" },
                { label: "Risk", value: "Prices and rates can move against you" },
                { label: "Effort", value: "Repairs are your job" },
              ],
            },
            {
              name: "Renting",
              rows: [
                { label: "Flexibility", value: "Easy to move for work or family" },
                { label: "Costs", value: "Landlord pays for most repairs" },
                { label: "Risk", value: "Rents can rise and you may have to move" },
                { label: "Control", value: "Limits on pets and changes" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="limits" n={12} kicker="Caveats" title="What the model leaves out">
        <ul>
          <li>Taxes on investment returns, and Capital Gains Tax on any second home. A main home is usually free of CGT.</li>
          <li>Changes in mortgage rate after a fixed deal ends.</li>
          <li>Leasehold costs such as service charges, unless you include them in upkeep.</li>
          <li>Big one-off repairs, such as a new roof.</li>
          <li>Inflation: all figures are in future pounds, not today&apos;s.</li>
        </ul>
        <p>Use the calculator to test a range of assumptions rather than relying on one answer.</p>
      </GuideSection>

      <GuideSection id="wealth-vs-cash" n={13} kicker="The key idea" title="Wealth, not monthly cost">
        <p>
          It is tempting to compare the mortgage payment with the rent. But a mortgage payment is partly saving: the capital part
          reduces your debt and builds equity. On the example, the first year&apos;s mortgage payments of about £18,000 include
          roughly £6,000 of capital. Rent buys no equity, but the renter keeps more cash to invest.
        </p>
        <p>
          That is why the calculator compares wealth at the end of the period rather than costs. A higher monthly cost can still
          leave you better off if more of it is building something you own.
        </p>
      </GuideSection>

      <GuideSection id="other-routes" n={14} kicker="Alternatives" title="Other routes into owning">
        <ul>
          <li>
            <strong>Shared ownership</strong> lets you buy part of a home with a smaller deposit and pay rent on the rest. Our
            shared ownership calculator compares the costs.
          </li>
          <li>
            <strong>A Lifetime ISA</strong> adds a 25% bonus to savings of up to £4,000 a year towards a first home costing
            £450,000 or less.
          </li>
          <li>
            <strong>Family help</strong>, such as a gifted deposit or a joint borrower mortgage, can bring buying forward.
          </li>
          <li>
            <strong>Buying further out</strong> or a smaller home first can make buying worthwhile sooner, at the cost of
            commuting or space.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="renter-wealth" n={15} kicker="Renting well" title="Building wealth as a renter">
        <p>
          If renting suits you, the key is to invest the money you would otherwise have put into a home. A stocks and shares ISA
          lets up to £20,000 a year grow free of tax. Regular monthly investing smooths out market ups and downs, and workplace
          pension contributions get tax relief and often an employer match.
        </p>
        <p>
          Over the long term, a renter who invests consistently can build substantial wealth. The risk is not investing at all,
          which is where buying&apos;s forced saving gives owners an edge.
        </p>
      </GuideSection>

      <GuideSection id="using" n={16} kicker="Getting the most from it" title="How to use the calculator">
        <ol>
          <li>Enter the price and rent of two genuinely similar homes in the same area.</li>
          <li>Set the number of years you realistically expect to stay.</li>
          <li>Under More options, try cautious figures: 0% to 2% house price growth and a mortgage rate a point higher.</li>
          <li>Then try optimistic figures. If buying wins in both, it is a strong case; if the answer flips, it is a close call.</li>
          <li>Use the year-by-year table to see when buying pulls ahead.</li>
        </ol>
        <p>
          Lower rents favour renting: at £1,000 a month on the example, buying still wins after 10 years, but only from year 2 and
          by less than half as much.
        </p>
      </GuideSection>

      <GuideSection id="flat-prices" n={17} kicker="Worked example" title="Example: when prices stand still">
        <p>
          Take the same example but with no house price growth at all over 10 years. Rents still rise 3% a year and investments
          still return 5%.
        </p>
        <WorkedExample
          title="0% house price growth, after 10 years"
          steps={[
            { label: "Home value", value: "£300,000" },
            { label: "Mortgage still owed", value: "£196,178" },
            { label: "Buyer's wealth", note: "After selling costs, plus savings", value: "£99,322" },
            { label: "Renter's wealth", value: "£95,858" },
          ]}
          total={{ label: "Buying ahead by", value: "£3,464" }}
        />
        <p>
          The buyer only draws level in year 10, purely from paying down the mortgage while rents rise. If prices fell, or if the
          buyer had paid Stamp Duty as a home mover, renting would come out ahead.
        </p>
      </GuideSection>

      <GuideSection id="which" n={18} kicker="Rules of thumb" title="When each choice tends to win">
        <CompareCards
          columns={[
            {
              name: "Buying tends to win when",
              rows: [
                { label: "Time", value: "You stay five years or more" },
                { label: "Rent", value: "Rents are high compared with prices" },
                { label: "Rates", value: "Mortgage rates are low" },
                { label: "Habits", value: "You would not invest spare cash" },
              ],
            },
            {
              name: "Renting tends to win when",
              rows: [
                { label: "Time", value: "You may move within a few years" },
                { label: "Prices", value: "Homes are expensive compared with rents" },
                { label: "Rates", value: "Mortgage rates are high" },
                { label: "Habits", value: "You invest the difference every month" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="tax" n={19} kicker="Tax" title="Tax differences between owning and renting">
        <p>
          Your main home is usually free of Capital Gains Tax when you sell it, thanks to Private Residence Relief. So the
          buyer&apos;s gain in the calculator is normally tax-free. The renter&apos;s investment returns are taxed unless they are
          held in an ISA or pension, or fall within the dividend and capital gains allowances.
        </p>
        <p>
          On the other side, buyers pay Stamp Duty and renters do not. First-time buyers in England pay nothing on homes up to
          £300,000, which helps buying come out ahead sooner. A home mover buying the same £300,000 home would pay £5,000, which the
          calculator includes when you switch off first-time buyer under More options.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={20} kicker="FAQs" title="Common questions">
        <h3>Is renting dead money?</h3>
        <p>
          Not entirely. Rent buys a home to live in, just as mortgage interest, upkeep and Stamp Duty do. The fair comparison is rent
          against those costs of owning, not against the whole mortgage payment.
        </p>
        <h3>How long do I need to stay to make buying worthwhile?</h3>
        <p>It depends on prices, rates and rents, but often three to five years or more. The calculator shows the break-even year.</p>
        <h3>What if house prices fall?</h3>
        <p>
          Buyers with small deposits are hit hardest, and could owe more than the home is worth. If you can stay until prices
          recover, the loss is not realised.
        </p>
        <h3>Should I buy now or wait?</h3>
        <p>No one can predict prices reliably. Buy when you can afford it comfortably and expect to stay for several years.</p>
        <h3>Does the calculator include the cost of moving again?</h3>
        <p>Selling costs at the end are included. The cost of buying your next home is not, as it would apply to either choice.</p>
        <h3>What if I cannot afford a deposit yet?</h3>
        <p>
          Then the choice is about saving while you rent. A Lifetime ISA or regular investing can build a deposit faster, and
          shared ownership needs a smaller one.
        </p>
        <h3>Should I include service charges?</h3>
        <p>Yes, for a leasehold flat. Add them to the maintenance figure under More options as a share of the home&apos;s value.</p>
        <h3>Why does the buyer start behind?</h3>
        <p>On day one the buyer has paid fees and Stamp Duty, and would pay selling costs if they sold, so their wealth starts lower.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "1%", label: "Typical yearly upkeep, as a share of value" },
            { value: "1% to 2%", label: "Typical cost of selling" },
            { value: "3 to 5 years", label: "Often needed for buying to pay off" },
            { value: "£0", label: "Stamp Duty for first-time buyers up to £300,000" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";
import { STATES } from "@/lib/us/states";

/** Sales tax: the guide. Rates from src/lib/us/states.ts; examples from addSalesTax and removeSalesTax in src/lib/us/pay.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "add", title: "Adding sales tax to a price" },
  { id: "remove", title: "Taking sales tax out of a total" },
  { id: "layers", title: "State, county and city rates" },
  { id: "highest", title: "Highest and lowest rates" },
  { id: "no-tax", title: "The five states with no sales tax" },
  { id: "all-states", title: "Sales tax rates in every state" },
  { id: "exempt", title: "What is taxed and what is not" },
  { id: "online", title: "Online shopping and use tax" },
  { id: "big", title: "Cars and other big purchases" },
  { id: "deduction", title: "Deducting sales tax" },
  { id: "receipts", title: "Rounding and receipts" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Tax Foundation: State and local sales tax rates, midyear 2026", href: "https://taxfoundation.org/data/all/state/2026-sales-tax-rates/" },
  { label: "IRS: Topic no. 503, deductible taxes", href: "https://www.irs.gov/taxtopics/tc503" },
];

const pct = (r: number) => `${Number((r * 100).toFixed(3))}%`;
const ROWS = [...STATES].sort((a, b) => a.name.localeCompare(b.name));

export default function SalesTaxGuide() {
  return (
    <Guide
      kicker="The sales tax guide"
      title="How sales tax works in the US"
      intro={
        <>
          The United States has no national sales tax. Instead, 45 states and DC charge their own, and thousands of cities, counties and districts add more.
          This guide shows how to add tax to a price or take it out of a total, and lists the state and average local rate everywhere.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Tax = price × rate. Total = price × (1 + rate).</li>
          <li>Price before tax = total ÷ (1 + rate).</li>
          <li>Your rate is the state rate plus any local rates where the sale happens.</li>
        </ul>
        <KeyStats
          items={[
            { value: "7.25%", label: "Highest state rate (California)" },
            { value: "10.13%", label: "Highest state + average local (Louisiana)" },
            { value: "5", label: "States with no statewide sales tax" },
            { value: "$8.25", label: "Tax on $100 at 8.25%" },
          ]}
        />
      </GuideSection>

      <GuideSection id="add" n={2} kicker="Method" title="Adding sales tax to a price">
        <p>Turn the rate into a decimal (9.03% is 0.0903), multiply by the price and add the result.</p>
        <WorkedExample
          title="A $1,000 laptop in California, state + average local rate (9.03%)"
          steps={[
            { label: "Rate: 7.25% state + 1.78% local", value: "9.03%" },
            { label: "Tax: $1,000 × 0.0903", value: "$90.30" },
          ]}
          total={{ label: "Total to pay", value: "$1,090.30" }}
        />
      </GuideSection>

      <GuideSection id="remove" n={3} kicker="Method" title="Taking sales tax out of a total">
        <p>
          To find the price before tax, divide the total by 1 plus the rate. Do not take the rate off the total: that removes tax that was never charged on
          the tax itself, and the answer comes out too low.
        </p>
        <WorkedExample
          title="A $108.25 receipt at 8.25%"
          steps={[
            { label: "1 + 0.0825", value: "1.0825" },
            { label: "$108.25 ÷ 1.0825", value: "$100.00" },
            { label: "Tax included", value: "$8.25" },
          ]}
          total={{ label: "Price before tax", value: "$100.00" }}
        />
      </GuideSection>

      <GuideSection id="layers" n={4} kicker="How rates build up" title="State, county and city rates">
        <p>
          Most states let local governments add their own sales tax. In Texas, for example, the state rate is 6.25% and local taxes average 1.95%, so a $100
          purchase usually carries about $8.20 of tax rather than $6.25. Special districts for transit, stadiums or schools can add more. The combined rate
          depends on the exact address of the sale, which is why two stores a mile apart can charge different amounts.
        </p>
        <p>
          The average local rates on this page are the Tax Foundation&rsquo;s population-weighted averages for July 1, 2026. Use them for estimates, and your
          receipt or your state revenue department&rsquo;s rate lookup for an exact figure.
        </p>
      </GuideSection>

      <GuideSection id="highest" n={5} kicker="Comparing states" title="Highest and lowest rates">
        <p>Counting the state rate and the average local rate together, these states charge the most:</p>
        <Bars
          format={(n) => `${n.toFixed(2)}%`}
          items={[
            { label: "Louisiana", value: 10.13 },
            { label: "Tennessee", value: 9.61 },
            { label: "Washington", value: 9.57 },
            { label: "Arkansas", value: 9.48 },
            { label: "Alabama", value: 9.46 },
          ]}
        />
        <p>
          California has the highest state rate on its own, 7.25%. Among states with a sales tax, the lowest combined rates are Alaska (1.82%, all local),
          Hawaii (4.5%, a general excise tax charged to businesses that is usually passed on), Wyoming (5.39%), Maine (5.5%) and Wisconsin (5.72%).
        </p>
      </GuideSection>

      <GuideSection id="no-tax" n={6} kicker="No sales tax" title="The five states with no sales tax">
        <p>
          Alaska, Delaware, Montana, New Hampshire and Oregon have no statewide sales tax. Alaska allows local sales taxes, and some resort areas in Montana
          charge local resort taxes. These states raise money in other ways: Delaware charges a tax on business receipts, Oregon and Montana rely more on
          income tax, and New Hampshire taxes meals and rooms.
        </p>
      </GuideSection>

      <GuideSection id="all-states" n={7} kicker="Reference" title="Sales tax rates in every state">
        <DataTable
          caption="State rate and average local rate, July 1, 2026"
          head={["State", "State rate", "Average local", "Combined"]}
          numeric={[1, 2, 3]}
          rows={ROWS.map((s) => [s.name, pct(s.sales), pct(s.localAvg), pct(s.sales + s.localAvg)])}
        />
      </GuideSection>

      <GuideSection id="exempt" n={8} kicker="Exemptions" title="What is taxed and what is not">
        <p>Sales tax applies to most goods, but every state has its own exemptions:</p>
        <ul>
          <li>Groceries are exempt or taxed at a lower rate in most states; prepared food and restaurant meals are usually taxed in full.</li>
          <li>Prescription medicine is exempt almost everywhere.</li>
          <li>A few states exempt clothing, fully or up to a price limit, and some hold sales tax holidays before the school year.</li>
          <li>Services such as haircuts or repairs are taxed in some states and not in others.</li>
        </ul>
        <Callout title="Coupons and discounts">
          A store discount usually lowers the taxable price. A manufacturer&rsquo;s coupon, which the store is paid back for, is often taxed on the full
          price. Rules vary by state.
        </Callout>
      </GuideSection>

      <GuideSection id="online" n={9} kicker="Online" title="Online shopping and use tax">
        <p>
          Since the Supreme Court&rsquo;s 2018 decision in <em>South Dakota v. Wayfair</em>, states can make online and out-of-state sellers collect sales
          tax once they sell enough into the state, and every state with a sales tax now does. The tax is charged at the rate where the item is delivered.
          If a seller does not collect it, you may owe the same amount as use tax, usually reported on your state income tax return.
        </p>
      </GuideSection>

      <GuideSection id="big" n={10} kicker="Big purchases" title="Cars and other big purchases">
        <p>
          On a large purchase, the rate matters. A $30,000 car at 7% carries $2,100 of sales tax. Most states charge it where you register the car rather
          than where you buy it, and many tax only the price after a trade-in. The <a href="/us/loans/auto-loan-calculator">auto loan calculator</a> adds
          sales tax and fees to a car payment, and the <a href="/everyday/percentage-calculator">percentage calculator</a> handles any other percentage sum.
        </p>
      </GuideSection>

      <GuideSection id="deduction" n={11} kicker="Federal tax" title="Deducting sales tax">
        <p>
          If you itemize deductions on your federal return, you can deduct either state and local income taxes or state and local sales taxes, not both,
          within the overall limit on state and local taxes. Sales tax is usually the better choice in states with no income tax, such as Texas, Florida and
          Washington. You can use your receipts or the IRS&rsquo;s tables. Most people take the standard deduction instead; the{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a> compares the two.
        </p>
      </GuideSection>

      <GuideSection id="receipts" n={12} kicker="Checking a bill" title="Rounding and receipts">
        <p>
          Stores work out tax to the cent, and most round half a cent up. Some add the tax line by line and others on the whole basket, so a receipt can be
          a cent or two away from a calculator. If the gap is bigger, check whether some items were taxed at a lower rate (groceries, for example) or not
          taxed at all. To find the rate a store charged you, divide the tax on the receipt by the taxable subtotal: $8.25 of tax on $100 is 8.25%.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "× (1 + rate)", label: "Price to total" },
            { value: "÷ (1 + rate)", label: "Total to price" },
            { value: "45 + DC", label: "States with a sales tax" },
            { value: "10.13%", label: "Louisiana, highest combined" },
            { value: "7.25%", label: "California, highest state rate" },
            { value: "1.82%", label: "Alaska, local taxes only" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

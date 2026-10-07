import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Retail markup — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "markup", title: "Pricing with a markup" },
  { id: "margin", title: "Pricing for a target margin" },
  { id: "keystone", title: "Keystone pricing" },
  { id: "vat", title: "Adding VAT to your price" },
  { id: "fees", title: "Marketplace and card fees" },
  { id: "extras", title: "Postage, packaging and other extras" },
  { id: "rounding", title: "Price endings and rounding" },
  { id: "markdowns", title: "Sales, markdowns and lost stock" },
  { id: "beyond", title: "When cost-plus is not enough" },
  { id: "checklist", title: "A pricing checklist" },
  { id: "trade", title: "Trade prices and recommended retail prices" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — VAT rates", href: "https://www.gov.uk/vat-rates" },
  { label: "GOV.UK — VAT registration threshold", href: "https://www.gov.uk/vat-registration/when-to-register" },
  { label: "GOV.UK — Price Marking Order 2004: government guidance", href: "https://www.gov.uk/government/publications/price-marking-order-2004-government-guidance/price-marking-order-2004-government-guidance" },
];

export default function MarkupGuide() {
  return (
    <Guide
      kicker="The retail pricing guide"
      title="How to price with markup and margin"
      intro={
        <>
          Most small retailers set prices by adding something to the cost. That works, as long as you know whether you are
          adding a markup or aiming for a margin, and you remember the fees, postage and VAT that sit between the shelf
          price and your profit. This guide walks through each step with worked examples.
        </>
      }
      meta={["Pricing", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>There are two ways to turn a cost into a price, and they give different answers:</p>
        <ul>
          <li>
            <strong>Markup:</strong> price = cost × (1 + markup). A £25 item with a 50% markup sells for £37.50.
          </li>
          <li>
            <strong>Target margin:</strong> price = cost ÷ (1 − margin). A £25 item priced for a 50% margin sells for £50.
          </li>
        </ul>
        <p>
          The same &ldquo;50%&rdquo; produces prices £12.50 apart. If you are VAT-registered, add VAT after you have worked
          out the price. If you sell through a marketplace or take cards, build the fees in before you add VAT, or they come
          out of your profit.
        </p>
        <KeyStats
          items={[
            { value: "£37.50", label: "£25 cost with a 50% markup" },
            { value: "£50.00", label: "£25 cost priced for a 50% margin" },
            { value: "100%", label: "Markup needed for a 50% margin" },
            { value: "£90,000", label: "Sales at which you must register for VAT" },
          ]}
        />
      </GuideSection>

      <GuideSection id="markup" n={2} kicker="Cost-plus" title="Pricing with a markup">
        <p>
          A markup is the percentage you add to the cost. It is the simplest way to price: take what you paid, multiply, and
          that is your price before VAT.
        </p>
        <WorkedExample
          title="A £25 item with a 50% markup"
          steps={[
            { label: "Cost", value: "£25.00" },
            { label: "Markup", note: "50% of £25", value: "+£12.50" },
            { label: "Selling price before VAT", value: "£37.50" },
          ]}
          total={{ label: "Gross margin", value: "33.3%" }}
        />
        <p>
          Markup is easy to apply across a range: if everything gets a 100% markup, every price is simply double the cost.
          The drawback is that the percentage looks bigger than the profit it gives. A 50% markup leaves you a third of the
          selling price, not half of it.
        </p>
        <DataTable
          caption="Prices for a £25 item at common markups"
          head={["Markup", "Price before VAT", "Profit", "Gross margin"]}
          numeric={[1, 2, 3]}
          rows={[
            ["25%", "£31.25", "£6.25", "20.0%"],
            ["50%", "£37.50", "£12.50", "33.3%"],
            ["75%", "£43.75", "£18.75", "42.9%"],
            ["100%", "£50.00", "£25.00", "50.0%"],
            ["150%", "£62.50", "£37.50", "60.0%"],
            ["200%", "£75.00", "£50.00", "66.7%"],
          ]}
        />
      </GuideSection>

      <GuideSection id="margin" n={3} kicker="Margin-led" title="Pricing for a target margin">
        <p>
          If you know the margin you need, for example because your overheads take 35p of every pound you sell, price from
          the margin instead. Divide the cost by one minus the margin.
        </p>
        <WorkedExample
          title="A £25 item priced for a 40% margin"
          steps={[
            { label: "Cost", value: "£25.00" },
            { label: "Divide by", note: "1 − 0.40", value: "÷ 0.60" },
            { label: "Selling price before VAT", value: "£41.67" },
            { label: "Profit", note: "£41.67 − £25", value: "£16.67" },
          ]}
          total={{ label: "Check: £16.67 ÷ £41.67", value: "40%" }}
        />
        <DataTable
          caption="Prices for a £25 item at common margins"
          head={["Target margin", "Price before VAT", "Same as a markup of"]}
          numeric={[1, 2]}
          rows={[
            ["20%", "£31.25", "25.0%"],
            ["30%", "£35.71", "42.9%"],
            ["40%", "£41.67", "66.7%"],
            ["50%", "£50.00", "100.0%"],
            ["60%", "£62.50", "150.0%"],
          ]}
        />
        <Callout tone="warn" title="Adding the margin to the cost does not work">
          Adding 40% to a £25 cost gives £35, which is only a 28.6% margin. You would be £6.67 short on every sale compared
          with the price you meant to charge.
        </Callout>
        <p>
          Pricing from margin is the better habit, because your accounts, your lender and your break-even sums all work in
          margin. Our <a href="/business/gross-profit-margin">gross profit margin calculator</a> checks the margin on any
          price you already charge.
        </p>
      </GuideSection>

      <GuideSection id="keystone" n={4} kicker="A rule of thumb" title="Keystone pricing">
        <p>
          Many independent shops use <strong>keystone pricing</strong>: double the wholesale cost. That is a 100% markup and
          a 50% margin. It is popular because it is quick, easy to check and leaves room for overheads and the odd sale.
        </p>
        <p>Keystone works best for goods that:</p>
        <ul>
          <li>are not easy to compare online, such as handmade or own-brand items;</li>
          <li>sell slowly enough that each sale has to carry a share of rent and staff time;</li>
          <li>come with a recommended retail price that is close to double the trade price anyway.</li>
        </ul>
        <p>
          It works badly for branded goods sold everywhere at a known price, and for heavy or bulky items whose delivery cost
          is a big part of the total. For those, start from what customers will pay and check the margin that leaves.
        </p>
      </GuideSection>

      <GuideSection id="vat" n={5} kicker="VAT" title="Adding VAT to your price">
        <p>
          Once you are VAT-registered, you charge VAT on top of your own price and pass it to HMRC. Work out your price before
          VAT first, then multiply by 1.2 for the standard 20% rate.
        </p>
        <WorkedExample
          title="A £25 item with a 100% markup, VAT-registered"
          steps={[
            { label: "Cost before VAT", value: "£25.00" },
            { label: "Price before VAT", note: "100% markup", value: "£50.00" },
            { label: "VAT at 20%", value: "+£10.00" },
          ]}
          total={{ label: "Shelf price", value: "£60.00" }}
        />
        <p>
          If you are <strong>not</strong> registered, you cannot reclaim the VAT on your stock. Use the cost including VAT,
          and do not add VAT to your price. You must register once taxable sales pass <strong><a href="/business/vat-threshold">£90,000</a></strong> in any rolling
          12 months. At that point a shop selling to the public either raises shelf prices by up to a fifth or absorbs the VAT
          out of its margin, so it is worth planning for well before you reach it.
        </p>
        <p>
          Some goods carry 5% or 0% VAT, such as children&rsquo;s clothes and most food. Use the{" "}
          <a href="/business/vat-calculator">VAT calculator</a> to add or remove VAT at any rate.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={6} kicker="Selling online" title="Marketplace and card fees">
        <p>
          Marketplaces, payment providers and card machines take a percentage of what the customer pays. If you work out your
          price and then pay the fee out of it, your real margin is lower than you planned.
        </p>
        <CompareCards
          columns={[
            {
              name: "Fee ignored",
              rows: [
                { label: "Price", value: "£50.00" },
                { label: "15% fee", value: "−£7.50" },
                { label: "Cost", value: "−£25.00" },
                { label: "Profit", value: "£17.50 (35% margin)" },
              ],
            },
            {
              name: "Fee priced in",
              rows: [
                { label: "Price", value: "£71.43" },
                { label: "15% fee", value: "−£10.71" },
                { label: "Cost", value: "−£25.00" },
                { label: "Profit", value: "£35.72 (50% margin)" },
              ],
            },
          ]}
        />
        <p>
          To price a fee in, take it off the denominator: price = cost ÷ (1 − margin − fee). For a 50% margin and a 15% fee,
          that is £25 ÷ 0.35 = £71.43. The calculator does this for you, including the extra step when the fee is charged on
          a VAT-inclusive price.
        </p>
        <p>
          A 50% margin with a 15% fee leaves only 35% of each pound for cost, which is why marketplace prices so often sit well
          above the same item in a shop. If the market will not bear that price, you may need to accept a lower margin online
          and make it up through direct sales.
        </p>
      </GuideSection>

      <GuideSection id="extras" n={7} kicker="Hidden costs" title="Postage, packaging and other extras">
        <p>
          Anything you pay every time you sell one item is part of its cost: postage you do not charge for, packaging, a
          printed insert, a gift box. Add them to the cost before you apply a margin.
        </p>
        <WorkedExample
          title="A £25 item with £3.50 postage, priced for a 50% margin"
          steps={[
            { label: "Item cost", value: "£25.00" },
            { label: "Postage and packaging", value: "+£3.50" },
            { label: "Total cost per sale", value: "£28.50" },
          ]}
          total={{ label: "Price for a 50% margin", value: "£57.00" }}
        />
        <p>
          If you priced at £50 and paid the postage out of it, your margin would be 43%, not 50%. Seven points of margin is a
          lot to lose to a parcel.
        </p>
      </GuideSection>

      <GuideSection id="rounding" n={8} kicker="Shelf prices" title="Price endings and rounding">
        <p>
          A calculated price such as £37.50 plus VAT, £45.00, is rarely the price you put on the shelf. Most shops round to a
          familiar ending. Rounding <strong>up</strong> adds a little profit; rounding down takes it away.
        </p>
        <Figure label="Profit on a £25 item, 50% markup, shelf price including VAT" caption="Rounding £45.00 up to £45.99 adds 83p of profit after VAT.">
          <Bars
            format={(n) => `£${n.toFixed(2)}`}
            items={[
              { label: "Exact: £45.00", value: 12.5 },
              { label: "Rounded: £45.99", value: 13.33 },
            ]}
          />
        </Figure>
        <p>
          Prices ending in 99p or 95p are common in UK shops; whole-pound prices suit gifts, premium goods and anything sold by
          hand at a market. Whichever you choose, use it consistently. A shelf of mixed endings looks less considered.
        </p>
        <Callout title="Price marking rules">
          Shops must show the selling price clearly, including VAT, for goods offered to consumers. If you show a &ldquo;was&rdquo;
          price, it must be a genuine earlier price, not one invented to make a discount look bigger.
        </Callout>
      </GuideSection>

      <GuideSection id="markdowns" n={9} kicker="Real-world margin" title="Sales, markdowns and lost stock">
        <p>
          Not everything sells at full price. End-of-season reductions, damaged items and stock that goes missing all pull
          your real margin below the one on the price tag.
        </p>
        <DataTable
          caption="A £25 item priced at £50 (50% margin on the tag)"
          head={["What happens", "Average price received", "Real margin"]}
          numeric={[1, 2]}
          rows={[
            ["Everything sells at full price", "£50.00", "50.0%"],
            ["20% of stock sold at 30% off", "£47.00", "46.8%"],
            ["30% of stock sold at half price", "£42.50", "41.2%"],
          ]}
        />
        <p>
          If you know roughly how much ends up in the sale, price for it from the start. To average £50 when one item in five
          sells at 30% off, the full price needs to be about <strong>£53.19</strong>.
        </p>
        <p>
          Lost and damaged stock works the same way. If 3% of what you buy is never sold, each item you do sell has to carry
          the cost of the missing ones, so the effective cost of a £25 item is about £25.77, and a £50 price gives a 48.5%
          margin rather than 50%.
        </p>
      </GuideSection>

      <GuideSection id="beyond" n={10} kicker="Strategy" title="When cost-plus is not enough">
        <p>
          A markup tells you the lowest sensible price. It does not tell you the best one. Before you settle on a price, look
          at it from two other angles:
        </p>
        <ul>
          <li>
            <strong>Competitors:</strong> if the same item sells for less nearby or online, a high markup will not stick. Either
            find a cheaper supplier or compete on service, range or convenience.
          </li>
          <li>
            <strong>Value to the customer:</strong> if what you sell is rare, handmade or solves a problem quickly, customers
            may happily pay more than cost-plus suggests. Charging less than they would pay leaves money on the table.
          </li>
        </ul>
        <p>
          A good approach is to calculate the cost-plus price, check it against the market, and then choose a price between
          your floor and what the market will bear. Test a higher price on a few lines and see whether sales really fall.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={11} kicker="Step by step" title="A pricing checklist">
        <Timeline
          items={[
            { when: "Step 1", what: "Find the full cost per sale", detail: "Item cost, plus postage, packaging and anything else you pay each time." },
            { when: "Step 2", what: "Choose a margin", detail: "Big enough to cover overheads, a share of markdowns and the profit you want." },
            { when: "Step 3", what: "Price in fees", detail: "Divide by one minus the margin minus the fee, so marketplace and card fees are covered." },
            { when: "Step 4", what: "Add VAT if registered", detail: "Multiply by 1.2 at the standard rate." },
            { when: "Step 5", what: "Round and sense-check", detail: "Round up to your usual ending, then compare with competitors and adjust." },
          ]}
        />
      </GuideSection>

      <GuideSection id="trade" n={12} kicker="Wholesale" title="Trade prices and recommended retail prices">
        <p>
          If you make products and sell them to shops as well as direct to customers, you need two prices: a trade price for
          retailers and a retail price for everyone else. Shops usually expect to make their own margin of around 50% on what
          they sell, so a common starting point is a trade price of about half your recommended retail price, before VAT.
        </p>
        <WorkedExample
          title="A maker selling to shops and direct"
          steps={[
            { label: "Your cost to make", value: "£12.50" },
            { label: "Trade price: 100% markup", value: "£25.00" },
            { label: "Retail price: shop's 100% markup", value: "£50.00" },
          ]}
          total={{ label: "Your margin selling direct at £50", value: "75%" }}
        />
        <p>
          Selling direct at the retail price gives you a much bigger margin, but do not undercut the shops that stock you. If
          your own website sells for less than they can, they will stop ordering. Keep the recommended retail price the same
          everywhere and use your extra margin to pay for delivery, marketing and the time you spend on each order.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={13} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "Cost × (1 + markup)", label: "Price from a markup" },
            { value: "Cost ÷ (1 − margin)", label: "Price from a target margin" },
            { value: "100% = 50%", label: "Keystone: a 100% markup is a 50% margin" },
            { value: "× 1.2", label: "Adds 20% VAT" },
            { value: "£90,000", label: "VAT registration threshold" },
            { value: "÷ (1 − margin − fee)", label: "Price that covers a % fee" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

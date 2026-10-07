import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Gross profit margin — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "formula", title: "How to work out gross margin" },
  { id: "markup", title: "Margin and markup" },
  { id: "vat", title: "Margin and VAT" },
  { id: "net", title: "Gross, operating and net margin" },
  { id: "need", title: "What margin do you need?" },
  { id: "discounts", title: "What a discount really costs" },
  { id: "price-rises", title: "Raising prices" },
  { id: "costs", title: "When your costs go up" },
  { id: "improve", title: "Ways to improve your margin" },
  { id: "accounts", title: "Margin in your accounts and tax return" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Expenses if you're self-employed", href: "https://www.gov.uk/expenses-if-youre-self-employed" },
  { label: "GOV.UK — VAT rates", href: "https://www.gov.uk/vat-rates" },
  { label: "GOV.UK — Self Assessment: self-employment (SA103)", href: "https://www.gov.uk/government/publications/self-assessment-self-employment-short-sa103s" },
  { label: "GOV.UK — Cash basis", href: "https://www.gov.uk/simpler-income-tax-cash-basis" },
];

export default function MarginGuide() {
  return (
    <Guide
      kicker="The profit margin guide"
      title="Gross profit margin, explained"
      intro={
        <>
          Gross margin tells you how much of each sale is left once you have paid for the thing you sold. It is the number
          behind every pricing decision, discount and supplier negotiation. This guide shows how to work it out, how it
          differs from markup, how VAT and overheads fit in, and what a discount or a cost rise does to your profit.
        </>
      }
      meta={["Pricing", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          <strong>Gross profit</strong> is the selling price minus the direct cost of what you sold.{" "}
          <strong>Gross margin</strong> is that profit as a percentage of the selling price. If you sell something for £100
          that cost you £40, your gross profit is £60 and your gross margin is 60%.
        </p>
        <p>Three rules cover most of what goes wrong:</p>
        <ul>
          <li>
            <strong>Margin is a share of the price; markup is a share of the cost.</strong> The same £60 profit is a 60%
            margin but a 150% markup.
          </li>
          <li>
            <strong>Leave VAT out.</strong> If you are VAT-registered, work out margin on the price before VAT, because the
            VAT belongs to HMRC.
          </li>
          <li>
            <strong>Gross margin is not take-home.</strong> Rent, wages, software and tax all come out of gross profit before
            you see any of it.
          </li>
        </ul>
        <KeyStats
          items={[
            { value: "60%", label: "Margin on a £100 sale that cost £40" },
            { value: "150%", label: "The same sale as a markup" },
            { value: "33%", label: "Extra sales a 10% discount needs at a 40% margin" },
            { value: "100%", label: "Highest possible margin (a sale that cost nothing)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="formula" n={2} kicker="The maths" title="How to work out gross margin">
        <p>You need two figures for one sale, or for a whole period: the selling price and the direct cost.</p>
        <ul>
          <li>
            <strong>Gross profit</strong> = selling price − direct cost
          </li>
          <li>
            <strong>Gross margin</strong> = gross profit ÷ selling price × 100
          </li>
          <li>
            <strong>Markup</strong> = gross profit ÷ direct cost × 100
          </li>
        </ul>
        <WorkedExample
          title="A £100 sale that cost £40"
          steps={[
            { label: "Selling price", note: "Before VAT", value: "£100.00" },
            { label: "Direct cost", note: "Stock, materials, packaging", value: "−£40.00" },
            { label: "Gross profit", value: "£60.00" },
            { label: "Gross margin", note: "£60 ÷ £100", value: "60%" },
          ]}
          total={{ label: "Markup on cost", value: "150%" }}
        />
        <p>
          <strong>Direct cost</strong> means the costs that rise and fall with each sale. For a shop that is the wholesale
          price of the stock plus anything spent getting it ready to sell. For a café it is the ingredients and the cup. For a
          service business it might be subcontractor fees or materials used on the job. Accountants call this{" "}
          <strong>cost of sales</strong> or cost of goods sold.
        </p>
        <p>
          Overheads are left out on purpose. Your rent is the same whether you sell ten things this week or a hundred, so it
          does not belong in the cost of any one sale. Keeping them separate is what lets gross margin tell you whether each
          sale is worth making.
        </p>
      </GuideSection>

      <GuideSection id="markup" n={3} kicker="Two different numbers" title="Margin and markup">
        <p>
          Margin and markup describe the same profit from two angles. Margin compares it with the price; markup compares it
          with the cost. Because the price is always bigger than the cost when you make a profit, the margin is always the
          smaller of the two numbers.
        </p>
        <DataTable
          caption="Markup and the margin it gives"
          head={["Markup on cost", "Gross margin", "Price of a £60 item"]}
          numeric={[1, 2]}
          rows={[
            ["25%", "20.0%", "£75.00"],
            ["33.3%", "25.0%", "£80.00"],
            ["50%", "33.3%", "£90.00"],
            ["66.7%", "40.0%", "£100.00"],
            ["100%", "50.0%", "£120.00"],
            ["150%", "60.0%", "£150.00"],
            ["200%", "66.7%", "£180.00"],
            ["300%", "75.0%", "£240.00"],
          ]}
        />
        <p>To convert between them:</p>
        <ul>
          <li>
            <strong>Margin from markup:</strong> markup ÷ (1 + markup). A 100% markup is 1 ÷ 2 = 50% margin.
          </li>
          <li>
            <strong>Markup from margin:</strong> margin ÷ (1 − margin). A 40% margin is 0.4 ÷ 0.6 = 66.7% markup.
          </li>
        </ul>
        <Callout tone="warn" title="The costly mix-up">
          If you want a 40% margin but add 40% to the cost, you charge £84 for a £60 item instead of £100. Your real margin is
          28.6%, and you give away £16 on every sale. When someone quotes a percentage, always ask whether they mean margin or
          markup.
        </Callout>
        <p>
          Retailers and wholesalers often talk in markup because it is easy to apply to a cost price. Accountants, lenders and
          investors almost always talk in margin, because it can be compared across businesses of any size. Our{" "}
          <a href="/uk/business/retail-markup">retail markup calculator</a> works the other way round, from a target to a
          price.
        </p>
      </GuideSection>

      <GuideSection id="vat" n={4} kicker="VAT" title="Margin and VAT">
        <p>
          If you are VAT-registered, the VAT you add to a price is not yours. You collect it for HMRC and pay it over with
          your VAT return. Work out margin on the price before VAT, and use costs before VAT too, because you reclaim the VAT
          on them.
        </p>
        <WorkedExample
          title="A £30 shelf price including 20% VAT, cost £10"
          steps={[
            { label: "Shelf price", value: "£30.00" },
            { label: "VAT inside it", note: "£30 ÷ 6", value: "£5.00" },
            { label: "Price before VAT", note: "£30 ÷ 1.2", value: "£25.00" },
            { label: "Gross profit", note: "£25 − £10", value: "£15.00" },
          ]}
          total={{ label: "Gross margin", value: "60%" }}
        />
        <p>
          Using the shelf price would give a margin of 66.7%, which overstates it by more than six percentage points. That kind
          of error is easy to make when you price from a till receipt or a marketplace listing.
        </p>
        <p>
          If you are <strong>not</strong> VAT-registered, there is no VAT to strip out of your price, but the VAT you pay
          suppliers is a real cost you cannot reclaim. Include it in your cost figure. The{" "}
          <a href="/uk/business/vat-calculator">VAT calculator</a> takes VAT on or off any amount.
        </p>
        <p>
          On the Flat Rate Scheme the picture is different again: you charge 20% VAT but pay HMRC a lower flat percentage, so
          part of the VAT stays with you as extra income. That gain is taxable, and it is usually small. The{" "}
          <a href="/uk/business/flat-rate-vat">flat rate VAT calculator</a> shows how much.
        </p>
      </GuideSection>

      <GuideSection id="net" n={5} kicker="Beyond gross" title="Gross, operating and net margin">
        <p>Gross margin is the first of several margins in a set of accounts. Each takes off another layer of cost:</p>
        <ul>
          <li>
            <strong>Gross margin:</strong> after direct costs only.
          </li>
          <li>
            <strong>Operating margin:</strong> after overheads too, such as rent, wages, software, insurance and marketing.
          </li>
          <li>
            <strong>Net margin:</strong> after interest and tax as well.
          </li>
        </ul>
        <WorkedExample
          title="1,200 sales a year at £100, cost £40, overheads £45,000"
          steps={[
            { label: "Sales before VAT", value: "£120,000" },
            { label: "Direct costs", note: "1,200 × £40", value: "−£48,000" },
            { label: "Gross profit", note: "60% gross margin", value: "£72,000" },
            { label: "Overheads", value: "−£45,000" },
          ]}
          total={{ label: "Profit before tax (22.5% margin)", value: "£27,000" }}
        />
        <p>
          A healthy gross margin can still leave a thin profit if overheads are high. In this example the business needs 750
          sales a year just to cover its overheads (£45,000 ÷ £60). Everything above that is profit before tax. The{" "}
          <a href="/uk/business/break-even">break-even calculator</a> works this out from your own numbers.
        </p>
      </GuideSection>

      <GuideSection id="need" n={6} kicker="Targets" title="What margin do you need?">
        <p>
          There is no single good margin. A business with low overheads and high volume, like a wholesaler, can do well on a
          thin gross margin. A business with expensive premises, skilled staff or few sales, like a boutique or a design
          studio, needs a much higher one. The useful question is not &ldquo;what is normal?&rdquo; but &ldquo;what do my
          numbers need?&rdquo;
        </p>
        <p>Work it backwards from your overheads and the profit you want:</p>
        <ul>
          <li>Add your yearly overheads to the profit you want before tax.</li>
          <li>Divide by the sales you realistically expect, before VAT.</li>
          <li>The answer is the gross margin you need.</li>
        </ul>
        <WorkedExample
          title="The margin you need"
          steps={[
            { label: "Overheads a year", value: "£45,000" },
            { label: "Profit wanted before tax", value: "£30,000" },
            { label: "Expected sales before VAT", value: "£150,000" },
          ]}
          total={{ label: "Gross margin needed", value: "50%" }}
        />
        <p>
          If your current margin is below that, you have three levers: raise prices, cut direct costs, or sell more. The next
          sections show how sensitive profit is to each.
        </p>
      </GuideSection>

      <GuideSection id="discounts" n={7} kicker="Discounts" title="What a discount really costs">
        <p>
          A discount comes straight off your gross profit, not off your sales. A 10% discount on a product with a 40% margin
          does not cost you 10% of the profit; it costs a quarter of it. To make the same gross profit you then need a third
          more sales.
        </p>
        <Figure label="Extra sales needed to keep the same gross profit, at a 40% margin" caption="A £100 item that costs £60. Each discount is off the price before VAT.">
          <Bars
            format={(n) => `${n.toFixed(1)}%`}
            items={[
              { label: "5% off", value: 14.29 },
              { label: "10% off", value: 33.33 },
              { label: "15% off", value: 60 },
              { label: "20% off", value: 100 },
              { label: "25% off", value: 166.67 },
            ]}
          />
        </Figure>
        <DataTable
          caption="The same discounts at three starting margins"
          head={["Discount", "25% margin", "40% margin", "60% margin"]}
          numeric={[1, 2, 3]}
          rows={[
            ["5% off", "+25% sales", "+14% sales", "+9% sales"],
            ["10% off", "+67% sales", "+33% sales", "+20% sales"],
            ["15% off", "+150% sales", "+60% sales", "+33% sales"],
            ["20% off", "+400% sales", "+100% sales", "+50% sales"],
            ["25% off", "No profit left", "+167% sales", "+71% sales"],
          ]}
        />
        <p>
          The lower your margin, the more dangerous discounting becomes. At a 25% margin, a 25% discount means you sell at
          cost: every extra sale adds work and nothing else. Before running a sale, check the extra volume it needs against
          what you think it will bring in.
        </p>
        <Callout title="Better than a straight discount">
          Bundles, free delivery over a threshold, or &ldquo;buy two, get the third half price&rdquo; often protect margin
          better than a flat percentage off, because they raise the amount each customer spends.
        </Callout>
      </GuideSection>

      <GuideSection id="price-rises" n={8} kicker="Pricing up" title="Raising prices">
        <p>
          The same maths works in your favour when you raise prices. Every pound of a price rise is extra gross profit, so you
          can lose some sales and still come out ahead.
        </p>
        <DataTable
          caption="Sales you could lose after a price rise and still make the same gross profit"
          head={["Price rise", "At a 40% margin", "At a 60% margin"]}
          numeric={[1, 2]}
          rows={[
            ["5%", "11.1%", "7.7%"],
            ["10%", "20.0%", "14.3%"],
          ]}
        />
        <p>
          A business on a 40% margin that puts prices up 10% can lose one sale in five and still make the same gross profit,
          with less stock to buy and less work to do. In practice many customers do not leave over a modest rise, especially
          if the price was set some time ago and costs have gone up since.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={9} kicker="Supplier prices" title="When your costs go up">
        <p>
          When a supplier puts its price up, your margin falls unless you pass the rise on. There are two ways to respond, and
          they lead to different prices.
        </p>
        <CompareCards
          columns={[
            {
              name: "Keep the same profit in pounds",
              rows: [
                { label: "Cost", value: "£40 → £44" },
                { label: "New price", value: "£104" },
                { label: "Profit each", value: "£60" },
                { label: "Margin", value: "57.7%" },
              ],
            },
            {
              name: "Keep the same margin",
              rows: [
                { label: "Cost", value: "£40 → £44" },
                { label: "New price", value: "£110" },
                { label: "Profit each", value: "£66" },
                { label: "Margin", value: "60%" },
              ],
            },
          ]}
        />
        <p>
          If you absorb the rise and keep your £100 price, your margin falls from 60% to 56%. Keeping the margin at 60% needs a
          price of £110, a 10% rise to match the 10% cost increase. Keeping the same profit per sale needs only £104. Which is
          right depends on your overheads: if they are rising too, keeping the percentage margin is usually safer.
        </p>
      </GuideSection>

      <GuideSection id="improve" n={10} kicker="Practical steps" title="Ways to improve your margin">
        <ul>
          <li>
            <strong>Review prices at least once a year.</strong> Costs creep up; prices often do not.
          </li>
          <li>
            <strong>Know your margin by product or service.</strong> An average can hide items that lose money. Drop them or
            reprice them.
          </li>
          <li>
            <strong>Negotiate with suppliers.</strong> Ask for volume discounts, longer payment terms or cheaper delivery. Even
            a small cost saving drops straight to gross profit.
          </li>
          <li>
            <strong>Cut waste.</strong> Spoiled stock, returns and rework are direct costs. In food businesses, portion control
            alone can move the margin several points.
          </li>
          <li>
            <strong>Sell more of your best-margin lines.</strong> Put them where customers see them first.
          </li>
          <li>
            <strong>Watch platform and card fees.</strong> Marketplace commission and payment fees are a cost of each sale.
            Treat them as direct costs when you work out margin.
          </li>
          <li>
            <strong>Charge for extras.</strong> Delivery, rush jobs and changes to a brief all take time or money. Pricing them
            separately stops them eating into the main sale.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="accounts" n={11} kicker="Accounts" title="Margin in your accounts and tax return">
        <p>
          On a sole trader&rsquo;s Self Assessment return, your sales go in as <strong>turnover</strong>, and the cost of the
          goods you bought to resell goes in as an allowable expense. Gross margin is not a box on the form, but the figures
          behind it are.
        </p>
        <p>
          Most sole traders now use the <strong>cash basis</strong>, which counts money when it comes in or goes out. Under
          the cash basis, stock you buy this year but sell next year still counts as a cost this year, so your gross margin
          can look low in a year when you build up stock and high when you sell it down. Traditional accounting matches each
          cost to the sale it relates to, which gives a steadier margin.
        </p>
        <p>
          Limited companies show gross profit near the top of their profit and loss account. Corporation Tax is charged on the
          profit after overheads, not on gross profit. See the{" "}
          <a href="/uk/business/corporation-tax">Corporation Tax calculator</a> and the{" "}
          <a href="/uk/business/sole-trader-tax">sole trader tax calculator</a> for the tax on your final profit.
        </p>
      <p>
          For other percentage sums, such as a percentage change between two prices, use the <a href="/everyday/percentage-calculator">percentage calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={12} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "Profit ÷ price", label: "Gross margin" },
            { value: "Profit ÷ cost", label: "Markup" },
            { value: "50% = 100%", label: "A 50% margin is a 100% markup" },
            { value: "÷ 1.2", label: "Takes 20% VAT out of a price" },
            { value: "+33%", label: "Extra sales a 10% discount needs at a 40% margin" },
            { value: "20%", label: "Sales you can lose after a 10% rise at a 40% margin" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

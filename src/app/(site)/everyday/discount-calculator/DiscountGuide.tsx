import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Discounts — the guide. Figures from src/lib/life/maths.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "percent-off", title: "Working out a percentage off" },
  { id: "money-off", title: "Money off as a percentage" },
  { id: "stacked", title: "Stacked discounts" },
  { id: "stacked-table", title: "Stacked discounts at a glance" },
  { id: "order", title: "Does the order matter?" },
  { id: "original", title: "Finding the original price" },
  { id: "multibuy", title: "3 for 2 and buy one get one free" },
  { id: "unit-price", title: "Unit prices" },
  { id: "tax", title: "VAT and sales tax" },
  { id: "was-prices", title: "Was prices and reference prices" },
  { id: "mental", title: "Quick mental shortcuts" },
  { id: "rounding", title: "Rounding at the till" },
  { id: "worth-it", title: "Is the deal worth it?" },
  { id: "key-numbers", title: "Key formulas" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Price Marking Order 2004: government guidance", href: "https://www.gov.uk/government/publications/price-marking-order-2004-government-guidance/price-marking-order-2004-government-guidance" },
  { label: "GOV.UK — VAT rates", href: "https://www.gov.uk/vat-rates" },
  { label: "Business Companion (Chartered Trading Standards Institute) — Prices", href: "https://www.businesscompanion.info/prices" },
];

export default function DiscountGuide() {
  return (
    <Guide
      kicker="The discount guide"
      title="How to work out a discount"
      intro={
        <>
          Sales, vouchers and multi-buy offers all use simple maths, but the way discounts combine catches many people out. This guide shows each
          calculation with a worked example, so you can check a price before you pay.
        </>
      }
      meta={["Worked examples", "6 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Sale price = price × (1 − discount ÷ 100).</li>
          <li>Two discounts in a row multiply; they do not add.</li>
          <li>To find the original price, divide the sale price by what was left.</li>
          <li>Compare packs by unit price, not by the shelf price.</li>
        </ul>
        <KeyStats
          items={[
            { value: "60", label: "80 with 25% off" },
            { value: "28%", label: "20% then 10% off" },
            { value: "75", label: "Original of 45 after 40% off" },
            { value: "33.33%", label: "3 for 2 as a discount" },
          ]}
        />
      </GuideSection>

      <GuideSection id="percent-off" n={2} kicker="Type 1" title="Working out a percentage off">
        <WorkedExample
          title="A jacket priced 80 with 25% off"
          steps={[
            { label: "25% of 80", value: "20" },
            { label: "80 − 20", value: "60" },
          ]}
          total={{ label: "You pay", value: "60" }}
        />
        <p>
          A quicker way is to multiply by what is left. 25% off leaves 75%, so 80 × 0.75 = 60. The <a href="/everyday/percentage-calculator">percentage calculator</a>{" "}
          handles other percentage sums.
        </p>
      </GuideSection>

      <GuideSection id="money-off" n={3} kicker="Type 2" title="Money off as a percentage">
        <p>
          A voucher for 10 off a price of 40 is worth 25%. The same voucher on a price of 200 is worth only 5%. To compare a money-off voucher with a
          percentage offer, divide the money off by the price and multiply by 100. Choose &ldquo;money off&rdquo; in the calculator to see the
          percentage.
        </p>
      </GuideSection>

      <GuideSection id="stacked" n={4} kicker="Type 3" title="Stacked discounts">
        <p>
          &ldquo;20% off, plus an extra 10% at the till&rdquo; sounds like 30% off. It is not. The extra 10% is taken from the price that is already
          reduced.
        </p>
        <WorkedExample
          title="20% then an extra 10% off a price of 100"
          steps={[
            { label: "20% off 100", value: "80" },
            { label: "10% off 80", value: "72" },
          ]}
          total={{ label: "Total discount", value: "28%" }}
        />
        <p>Multiply what is left after each discount: 0.8 × 0.9 = 0.72, so you pay 72% of the price.</p>
      </GuideSection>

      <GuideSection id="stacked-table" n={5} kicker="Table" title="Stacked discounts at a glance">
        <DataTable
          caption="Two discounts taken one after the other"
          head={["First discount", "Then", "Total off", "Not"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["10%", "10%", "19%", "20%"],
            ["20%", "10%", "28%", "30%"],
            ["20%", "20%", "36%", "40%"],
            ["30%", "20%", "44%", "50%"],
            ["50%", "20%", "60%", "70%"],
            ["70%", "10%", "73%", "80%"],
            ["50%", "50%", "75%", "100%"],
          ]}
        />
        <p>The bigger the discounts, the bigger the gap between the real total and the two percentages added together.</p>
      </GuideSection>

      <GuideSection id="order" n={6} kicker="Order" title="Does the order matter?">
        <p>
          With two percentages, no: 0.8 × 0.9 is the same as 0.9 × 0.8. With a money-off voucher and a percentage, yes. On a price of 60:
        </p>
        <CompareCards
          columns={[
            {
              name: "10 off, then 20% off",
              rows: [
                { label: "After 10 off", value: "50" },
                { label: "After 20% off", value: "40" },
              ],
            },
            {
              name: "20% off, then 10 off",
              rows: [
                { label: "After 20% off", value: "48" },
                { label: "After 10 off", value: "38" },
              ],
            },
          ]}
        />
        <p>Taking the percentage first and the fixed amount second gives the lower price, because the percentage applies to a bigger number.</p>
      </GuideSection>

      <GuideSection id="original" n={7} kicker="Type 4" title="Finding the original price">
        <WorkedExample
          title="You paid 45 after 40% off"
          steps={[
            { label: "100% − 40%", value: "60%" },
            { label: "45 ÷ 0.6", value: "75" },
          ]}
          total={{ label: "Original price", value: "75" }}
        />
        <Callout tone="warn" title="Do not add the percentage back">
          Adding 40% to 45 gives 63, not 75. The 40% was a share of the original price, which is larger than the sale price.
        </Callout>
      </GuideSection>

      <GuideSection id="multibuy" n={8} kicker="Type 5" title="3 for 2 and buy one get one free">
        <p>A multi-buy offer is a discount spread across several items. With items at 1.50 each:</p>
        <DataTable
          caption="Multi-buy deals as a discount"
          head={["Deal", "You get", "You pay", "Each", "Same as"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["Buy 1 get 1 free", "2", "1.50", "0.75", "50% off"],
            ["3 for 2", "3", "3.00", "1.00", "33.33% off"],
            ["Buy 4 get 2 free", "6", "6.00", "1.00", "33.33% off"],
            ["Buy 3 get 1 free", "4", "4.50", "1.125", "25% off"],
          ]}
        />
        <p>The saving is real only if you use everything you buy. Food that goes off before you eat it makes the deal more expensive.</p>
      </GuideSection>

      <GuideSection id="unit-price" n={9} kicker="Type 6" title="Unit prices">
        <p>
          A unit price is the price for a set amount, such as per kilogram or per litre. In the UK, the Price Marking Order 2004 requires many shops to show
          unit prices for goods sold by weight or volume. Updated government guidance applies from 6 April 2026, including unit prices on promotions.
        </p>
        <WorkedExample
          title="500 g for 2.40 or 750 g for 3.30?"
          steps={[
            { label: "2.40 ÷ 0.5 kg", value: "4.80 per kg" },
            { label: "3.30 ÷ 0.75 kg", value: "4.40 per kg" },
          ]}
          total={{ label: "Cheaper", value: "The 750 g pack" }}
        />
        <p>Bigger packs are often cheaper per unit, but not always, especially when the smaller pack is on offer.</p>
      </GuideSection>

      <GuideSection id="tax" n={10} kicker="Tax" title="VAT and sales tax">
        <p>
          In the UK and the rest of Europe, prices shown to shoppers include VAT, so the discount comes off the price on the ticket. The UK standard rate
          of VAT is 20%: a price of 72 including VAT is 60 before VAT. Use the <a href="/uk/business/vat-calculator">VAT calculator</a>{" "}to split a price.
        </p>
        <p>
          In most US states, sales tax is added at the till, after any discount. A 72 price with 7.25% sales tax comes to 77.22. Set the rate under More
          options, or use the <a href="/us/taxes/sales-tax-calculator">sales tax calculator</a>{" "}to find your state&rsquo;s rate.
        </p>
      </GuideSection>

      <GuideSection id="was-prices" n={11} kicker="Consumer rights" title="Was prices and reference prices">
        <p>
          A &ldquo;was&rdquo; price should be a price the shop really charged. UK trading standards guidance says comparisons with earlier prices must not
          mislead shoppers. If a discount looks too good, check the price history or compare with other shops.
        </p>
      </GuideSection>

      <GuideSection id="mental" n={12} kicker="Shortcuts" title="Quick mental shortcuts">
        <ul>
          <li>10% off: move the decimal point one place left and take it off. 10% of 45 is 4.50.</li>
          <li>20% off: find 10% and double it.</li>
          <li>25% off: divide by 4 and take that off, or multiply by 0.75.</li>
          <li>50% off: halve it.</li>
          <li>15% off: find 10%, add half of it again.</li>
        </ul>
      </GuideSection>

      <GuideSection id="rounding" n={13} kicker="Pennies" title="Rounding at the till">
        <p>
          Tills round to the penny or cent. Some round each item, others the total, and some round after each discount. That is why a receipt can differ
          from a calculation by a penny or two. This calculator only rounds the figures it shows you.
        </p>
      </GuideSection>

      <GuideSection id="worth-it" n={14} kicker="Judgement" title="Is the deal worth it?">
        <ul>
          <li>Would you have bought it at full price? If not, the saving is not a saving.</li>
          <li>Compare the unit price with the shop&rsquo;s own brand and other pack sizes.</li>
          <li>Check delivery charges and minimum spends online, which can cancel a discount.</li>
          <li>For a tip on a discounted bill, see the <a href="/us/taxes/tip-calculator">tip calculator</a>.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Summary" title="Key formulas">
        <KeyStats
          items={[
            { value: "P × (1 − d/100)", label: "Sale price" },
            { value: "(1 − a)(1 − b)", label: "Two discounts, share left" },
            { value: "S ÷ (1 − d/100)", label: "Original price" },
            { value: "free ÷ total", label: "Multi-buy as % off" },
            { value: "price ÷ amount", label: "Unit price" },
            { value: "÷ 1.2", label: "Remove 20% UK VAT" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

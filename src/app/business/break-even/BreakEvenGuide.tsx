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

/** Break-even — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "costs", title: "Fixed and variable costs" },
  { id: "formula", title: "The break-even formula" },
  { id: "revenue", title: "Break-even in sales value" },
  { id: "target", title: "Adding the profit you want" },
  { id: "safety", title: "Margin of safety" },
  { id: "levers", title: "What moves your break-even point" },
  { id: "examples", title: "Three worked examples" },
  { id: "mix", title: "Selling more than one thing" },
  { id: "limits", title: "The limits of break-even" },
  { id: "using", title: "Using break-even in a business plan" },
  { id: "payback", title: "When will I break even?" },
  { id: "cash", title: "Cash break-even" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Write a business plan", href: "https://www.gov.uk/write-business-plan" },
  { label: "British Business Bank — Start Up Loans", href: "https://www.startuploans.co.uk/" },
  { label: "GOV.UK — Expenses if you're self-employed", href: "https://www.gov.uk/expenses-if-youre-self-employed" },
  { label: "GOV.UK — Set up as a sole trader", href: "https://www.gov.uk/set-up-sole-trader" },
];

export default function BreakEvenGuide() {
  return (
    <Guide
      kicker="The break-even guide"
      title="How to work out your break-even point"
      intro={
        <>
          Your break-even point is the number of sales at which your income exactly covers your costs. Below it you lose
          money; above it every sale adds profit. This guide explains the formula, how to split your costs, what moves the
          answer, and how to use it in a business plan or a loan application.
        </>
      }
      meta={["Planning", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <p>
          Break-even sales = <strong>fixed costs ÷ (price − variable cost per sale)</strong>. The bit in brackets is called
          the <strong>contribution</strong>: what each sale leaves over to pay for fixed costs.
        </p>
        <WorkedExample
          title="£30,000 of fixed costs, £25 price, £10 variable cost"
          steps={[
            { label: "Contribution per sale", note: "£25 − £10", value: "£15" },
            { label: "Fixed costs a year", value: "£30,000" },
            { label: "Break-even sales", note: "£30,000 ÷ £15", value: "2,000" },
          ]}
          total={{ label: "Break-even income", value: "£50,000" }}
        />
        <KeyStats
          items={[
            { value: "2,000", label: "Sales a year to break even" },
            { value: "167", label: "About that many a month" },
            { value: "£50,000", label: "Income needed before any profit" },
            { value: "60%", label: "Contribution margin: £15 of every £25" },
          ]}
        />
      </GuideSection>

      <GuideSection id="costs" n={2} kicker="Getting the inputs right" title="Fixed and variable costs">
        <p>The answer is only as good as the way you split your costs. Ask of each cost: does it change when I sell one more?</p>
        <CompareCards
          columns={[
            {
              name: "Fixed costs",
              rows: [
                { label: "Premises", value: "Rent, business rates, utilities" },
                { label: "People", value: "Salaried staff, your accountant" },
                { label: "Running", value: "Insurance, software, phone" },
                { label: "Finance", value: "Loan repayments, lease payments" },
              ],
            },
            {
              name: "Variable costs",
              rows: [
                { label: "Product", value: "Stock, ingredients, materials" },
                { label: "Selling", value: "Card fees, marketplace commission" },
                { label: "Delivery", value: "Postage, packaging, couriers" },
                { label: "Labour", value: "Piece-rate or per-job subcontractors" },
              ],
            },
          ]}
        />
        <p>
          Some costs are a mix. A phone contract with a fixed monthly fee and a per-call charge, or staff whose hours rise in
          busy months, can be split into a fixed part and a variable part. If you are not sure, treat a cost as fixed: it
          makes the break-even point higher, which is the safer mistake.
        </p>
        <Callout title="Use figures before VAT">
          If you are VAT-registered, use prices and costs before VAT. The VAT you charge goes to HMRC and the VAT you pay is
          reclaimed, so neither belongs in the sum. If you are not registered, include the VAT you pay in your costs.
        </Callout>
      </GuideSection>

      <GuideSection id="formula" n={3} kicker="The maths" title="The break-even formula">
        <p>Every sale does two things: it pays for its own variable cost, and it leaves a contribution towards fixed costs.</p>
        <ul>
          <li>
            <strong>Contribution per sale</strong> = price − variable cost per sale
          </li>
          <li>
            <strong>Break-even sales</strong> = fixed costs ÷ contribution per sale
          </li>
          <li>
            <strong>Profit</strong> = (sales × contribution) − fixed costs
          </li>
        </ul>
        <p>
          Round break-even sales <strong>up</strong> to a whole number. You cannot sell part of an item, and 1,999.6 sales
          still leaves you short.
        </p>
        <p>
          If the price is at or below the variable cost, the contribution is zero or negative and there is no break-even
          point. Selling more only makes the loss bigger. Fix the price or the cost before anything else.
        </p>
      </GuideSection>

      <GuideSection id="revenue" n={4} kicker="In pounds" title="Break-even in sales value">
        <p>
          Sometimes you know your costs as a percentage of sales rather than a cost per item. A café knows food costs are
          about a third of the till, for example. Then use the <strong>contribution margin</strong>: contribution as a share
          of the price.
        </p>
        <WorkedExample
          title="Break-even from the contribution margin"
          steps={[
            { label: "Contribution margin", note: "£15 ÷ £25", value: "60%" },
            { label: "Fixed costs", value: "£30,000" },
          ]}
          total={{ label: "Break-even sales value: £30,000 ÷ 0.6", value: "£50,000" }}
        />
        <p>
          This version works even if you sell hundreds of different things, as long as the average variable cost stays about
          the same share of sales.
        </p>
      </GuideSection>

      <GuideSection id="target" n={5} kicker="Profit targets" title="Adding the profit you want">
        <p>
          Breaking even means the business pays its costs. It does not mean it pays you. To find the sales you need for a
          given profit, add the profit to fixed costs before you divide.
        </p>
        <WorkedExample
          title="£15,000 profit on top of break-even"
          steps={[
            { label: "Fixed costs", value: "£30,000" },
            { label: "Profit wanted before tax", value: "+£15,000" },
            { label: "Divide by contribution", value: "÷ £15" },
          ]}
          total={{ label: "Sales needed", value: "3,000 (£75,000)" }}
        />
        <Callout tone="warn" title="Sole traders: your pay is profit, not a cost">
          A sole trader&rsquo;s drawings are not a business expense, so they are not in fixed costs. Add the income you need
          to live on as the profit target, and remember Income Tax and National Insurance come out of it. The{" "}
          <a href="/business/sole-trader-tax">sole trader tax calculator</a> shows what you keep.
        </Callout>
      </GuideSection>

      <GuideSection id="safety" n={6} kicker="Headroom" title="Margin of safety">
        <p>
          The margin of safety is how far your expected sales are above break-even. It tells you how much room you have if a
          month goes badly.
        </p>
        <WorkedExample
          title="Expecting 2,500 sales against a break-even of 2,000"
          steps={[
            { label: "Sales above break-even", note: "2,500 − 2,000", value: "500" },
            { label: "As a share of expected sales", note: "500 ÷ 2,500", value: "20%" },
          ]}
          total={{ label: "Profit at 2,500 sales", value: "£7,500" }}
        />
        <p>
          A 20% margin of safety means sales could fall by a fifth before the business makes a loss. A new business with a
          thin margin of safety, say under 10%, has little room for a slow start, a lost customer or a cost rise.
        </p>
      </GuideSection>

      <GuideSection id="levers" n={7} kicker="Sensitivity" title="What moves your break-even point">
        <p>
          Break-even is very sensitive to price, because a price rise goes straight into contribution. Here is what a 10%
          change does to the example business.
        </p>
        <Figure label="Break-even sales after a 10% change" caption="£30,000 fixed costs, £25 price and £10 variable cost to start with.">
          <Bars
            format={(n) => n.toLocaleString("en-GB")}
            items={[
              { label: "Price down 10%", value: 2400 },
              { label: "Fixed costs up 10%", value: 2200 },
              { label: "Variable cost up 10%", value: 2143 },
              { label: "As now", value: 2000 },
              { label: "Price up 10%", value: 1715 },
            ]}
          />
        </Figure>
        <DataTable
          caption="The same changes in detail"
          head={["Change", "Contribution", "Break-even sales", "Break-even income"]}
          numeric={[1, 2, 3]}
          rows={[
            ["As now", "£15.00", "2,000", "£50,000"],
            ["Price up 10% to £27.50", "£17.50", "1,715", "£47,143"],
            ["Price down 10% to £22.50", "£12.50", "2,400", "£54,000"],
            ["Variable cost up 10% to £11", "£14.00", "2,143", "£53,571"],
            ["Fixed costs up 10% to £33,000", "£15.00", "2,200", "£55,000"],
          ]}
        />
        <p>
          A 10% price cut pushes break-even up by 20%, because it takes £2.50 out of a £15 contribution. That is why
          discounting is so risky for a business that is only just covering its costs, and why a modest price rise is often
          the fastest way to safety.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={8} kicker="Worked examples" title="Three worked examples">
        <h3>A café</h3>
        <p>
          Fixed costs of £60,000 a year (rent, rates, two part-time staff, insurance, equipment lease). The average customer
          spends £8 before VAT, and food, drink and packaging cost £3.
        </p>
        <WorkedExample
          title="Café break-even"
          steps={[
            { label: "Contribution per customer", note: "£8 − £3", value: "£5" },
            { label: "Break-even customers a year", note: "£60,000 ÷ £5", value: "12,000" },
            { label: "A week", value: "About 231" },
            { label: "For £20,000 profit", note: "£80,000 ÷ £5", value: "16,000 customers" },
          ]}
          total={{ label: "Break-even takings", value: "£96,000" }}
        />
        <h3>A freelance consultant</h3>
        <p>
          Fixed costs of £12,000 (laptop, software, insurance, a co-working desk, accountant). A day rate of £400, with about
          £20 of travel and materials per day worked.
        </p>
        <WorkedExample
          title="Consultant break-even"
          steps={[
            { label: "Contribution per day", note: "£400 − £20", value: "£380" },
            { label: "Days to cover costs", note: "£12,000 ÷ £380", value: "32" },
            { label: "Days for £35,000 before tax", note: "£47,000 ÷ £380", value: "124" },
          ]}
          total={{ label: "Profit at 150 days", value: "£45,000" }}
        />
        <p>
          For service businesses the risk is less about break-even and more about billable days: holidays, illness, admin and
          finding the next client all eat into the year.
        </p>
        <h3>An online shop</h3>
        <p>
          Fixed costs of £30,000. Products sell for £25 before VAT and cost £10 including postage and marketplace fees. That is
          the example used throughout this guide: 2,000 orders a year, or about 39 a week.
        </p>
      </GuideSection>

      <GuideSection id="mix" n={9} kicker="Product mix" title="Selling more than one thing">
        <p>
          Most businesses sell several products at different margins. Use an average price and an average variable cost,
          weighted by how many of each you sell.
        </p>
        <WorkedExample
          title="Two products, £45,000 of fixed costs"
          steps={[
            { label: "Product A: 40% of sales", note: "£30 price, £12 cost", value: "£18 contribution" },
            { label: "Product B: 60% of sales", note: "£10 price, £4 cost", value: "£6 contribution" },
            { label: "Average price", note: "0.4 × £30 + 0.6 × £10", value: "£18.00" },
            { label: "Average variable cost", note: "0.4 × £12 + 0.6 × £4", value: "£7.20" },
            { label: "Break-even sales", note: "£45,000 ÷ £10.80", value: "4,167" },
          ]}
          total={{ label: "Break-even income", value: "£75,000" }}
        />
        <p>
          If the mix shifts towards the lower-contribution product, the break-even point rises even if total sales stay the
          same. Keep an eye on which lines are selling, not just how many.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={10} kicker="Caveats" title="The limits of break-even">
        <ul>
          <li>
            <strong>Costs are not perfectly fixed.</strong> Grow enough and you need bigger premises or another member of
            staff, so fixed costs step up.
          </li>
          <li>
            <strong>Prices are not perfectly fixed.</strong> Bulk discounts, sales and price rises all change the
            contribution.
          </li>
          <li>
            <strong>It ignores timing.</strong> You might break even over a year and still run out of cash in a quiet month,
            or while you wait for customers to pay. A cash-flow forecast covers that.
          </li>
          <li>
            <strong>It is before tax.</strong> Profit above break-even is taxed: Income Tax and National Insurance for a sole
            trader, Corporation Tax for a company.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={11} kicker="Business plans" title="Using break-even in a business plan">
        <p>
          Lenders, including the government-backed Start Up Loans scheme, expect a business plan with a cash-flow forecast,
          and a break-even calculation is one of the clearest ways to show your numbers add up. A strong plan shows:
        </p>
        <ul>
          <li>your fixed costs, listed, with where each figure came from;</li>
          <li>your price and variable cost per sale, with supplier quotes if you have them;</li>
          <li>the break-even point per year, per month and per week, so it can be compared with real trading days;</li>
          <li>your expected sales and the margin of safety above break-even;</li>
          <li>what happens if sales are 20% lower than expected, or costs 10% higher.</li>
        </ul>
        <p>
          Translate the answer into something you can check each week, such as customers through the door or orders shipped.
          &ldquo;39 orders a week&rdquo; is easier to manage than &ldquo;£50,000 a year&rdquo;.
        </p>
      </GuideSection>

      <GuideSection id="payback" n={12} kicker="Timing" title="When will I break even?">
        <p>
          Break-even sales tell you how much you need to sell in a year. A new business also wants to know how long it will take
          to earn back what it spent getting started: equipment, fitting out premises, a website, opening stock. That is the{" "}
          <strong>payback period</strong>.
        </p>
        <WorkedExample
          title="£12,000 of start-up costs, £7,500 profit a year"
          steps={[
            { label: "Expected sales", value: "2,500 a year" },
            { label: "Profit at that level", note: "2,500 × £15 − £30,000", value: "£7,500 a year" },
            { label: "Profit a month", value: "£625" },
            { label: "Start-up costs to earn back", value: "£12,000" },
          ]}
          total={{ label: "Payback period", value: "About 19 months" }}
        />
        <p>
          Sales rarely start at full speed. If the first six months bring in half the expected orders, the business makes a loss
          over that period and the payback stretches further. Build a month-by-month forecast that ramps up gradually, and keep
          enough cash to cover fixed costs while you get there.
        </p>
        <p>
          Many lenders and investors ask for exactly this: when the business will start covering its costs each month, and when
          it will have earned back the money put in. Showing both, with the assumptions behind them, makes a plan much more
          convincing.
        </p>
      </GuideSection>

      <GuideSection id="cash" n={13} kicker="Cash flow" title="Cash break-even">
        <p>
          The usual break-even sum uses costs as they appear in your accounts. Your bank balance can tell a different story.
          Loan repayments, stock bought ahead of a busy season and tax bills all take cash without being day-to-day costs.
        </p>
        <WorkedExample
          title="Adding £400 a month of loan repayments"
          steps={[
            { label: "Fixed costs in the accounts", value: "£30,000" },
            { label: "Loan capital repaid", note: "£400 × 12", value: "+£4,800" },
            { label: "Cash going out each year", value: "£34,800" },
            { label: "Divide by contribution", value: "÷ £15" },
          ]}
          total={{ label: "Cash break-even sales", value: "2,320" }}
        />
        <p>
          A business can be profitable on paper and still run short of cash. If you have borrowing or big seasonal swings, work
          out both figures and plan around the higher one. Remember too that a profitable sole trader will owe Income Tax and
          National Insurance on that profit, usually paid twice a year; see the{" "}
          <a href="/business/payment-on-account">payment on account calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={14} kicker="FAQs" title="Common questions">
        <h3>Is break-even the same as profit?</h3>
        <p>No. At break-even, profit is exactly zero. Profit starts with the next sale.</p>
        <h3>Should I include depreciation?</h3>
        <p>
          For a planning figure, include the yearly cost of equipment you will need to replace, or the lease payments if you
          lease it. Leaving it out understates your real costs.
        </p>
        <h3>Should loan repayments be a fixed cost?</h3>
        <p>
          Interest is a cost. Repaying the loan itself is not a cost in the accounts, but it is cash going out. For a cash
          break-even, include the full repayment.
        </p>
        <h3>How do I lower my break-even point?</h3>
        <p>Raise prices, cut the cost of each sale, or cut fixed costs. Price usually has the biggest effect.</p>
        <h3>What about seasonal businesses?</h3>
        <p>
          Work out break-even for the year, then check each month against a cash-flow forecast. You may need savings or an
          overdraft to get through the quiet months.
        </p>
        <h3>Do I need to include VAT?</h3>
        <p>Not if you are VAT-registered: use prices and costs before VAT. If you are not registered, include the VAT you pay in your costs, because you cannot reclaim it.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "Price − variable cost", label: "Contribution per sale" },
            { value: "Fixed ÷ contribution", label: "Break-even sales" },
            { value: "Fixed ÷ contribution margin", label: "Break-even income" },
            { value: "(Fixed + profit) ÷ contribution", label: "Sales for a profit target" },
            { value: "+20%", label: "Rise in break-even from a 10% price cut in the example" },
            { value: "(Expected − break-even) ÷ expected", label: "Margin of safety" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

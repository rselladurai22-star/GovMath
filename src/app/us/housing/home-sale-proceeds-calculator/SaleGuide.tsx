import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Home sale proceeds guide. Figures from saleProceeds() in src/lib/us/estate-property.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "equity", title: "Equity is not what you walk away with" },
  { id: "example", title: "A worked example" },
  { id: "commission", title: "Agent commissions" },
  { id: "settlement", title: "The 2024 commission settlement" },
  { id: "closing", title: "Seller closing costs" },
  { id: "transfer", title: "Transfer taxes" },
  { id: "concessions", title: "Concessions and repairs" },
  { id: "payoff", title: "Your mortgage payoff" },
  { id: "gain", title: "Working out your gain" },
  { id: "exclusion", title: "The $250,000 and $500,000 exclusion" },
  { id: "over", title: "When the gain is over the limit" },
  { id: "not-main", title: "Second homes and rentals" },
  { id: "state", title: "State tax on the gain" },
  { id: "underwater", title: "When you owe more than it sells for" },
  { id: "timeline", title: "From listing to wire" },
  { id: "next-home", title: "Planning the next purchase" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: Topic 701, Sale of your home", href: "https://www.irs.gov/taxtopics/tc701" },
  { label: "IRS: Publication 523, Selling your home", href: "https://www.irs.gov/publications/p523" },
  { label: "IRS: Topic 559, Net investment income tax", href: "https://www.irs.gov/taxtopics/tc559" },
  { label: "IRS: Revenue Procedure 2025-32 (2026 capital gains thresholds)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "National Association of Realtors: Practice changes from the settlement", href: "https://www.nar.realtor/newsroom/national-association-of-realtors-reminds-members-and-consumers-of-real-estate-practice-change" },
  { label: "CFPB: Closing Disclosure explainer", href: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" },
  { label: "CFPB: Mortgage closing scams", href: "https://www.consumerfinance.gov/about-us/blog/mortgage-closing-scams-how-protect-yourself-and-your-closing-funds/" },
];

export default function SaleGuide() {
  return (
    <Guide
      kicker="The home sale guide"
      title="What you really keep when you sell"
      intro={
        <>
          A home that sells for {usd(450_000)} with {usd(250_000)} left on the mortgage does not put {usd(200_000)} in your bank account. Commissions, closing costs, transfer
          taxes, concessions and sometimes capital gains tax all come first. This guide walks through each one, explains how the home sale exclusion works, and shows how to
          estimate the check you will get at closing.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Selling a {usd(450_000)} home with 5% total commission and 1% other closing costs costs {usd(27_000)}, or 6% of the price.</li>
          <li>With a {usd(250_000)} payoff, you walk away with {usd(173_000)}.</li>
          <li>Most homeowners pay no tax on the gain: up to {usd(250_000)} ({usd(500_000)} for a married couple filing jointly) is excluded on a main home lived in for 2 of the last 5 years.</li>
          <li>Since August 2024, whether you pay the buyer&rsquo;s agent is a separate negotiation. In the example, not paying it would leave you {usd(11_250)} more.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(173_000), label: "Walk-away amount in the example" },
            { value: "6%", label: "Selling costs in the example, as a share of price" },
            { value: usd(250_000), label: "Gain excluded, single (2 of 5 years)" },
            { value: usd(500_000), label: "Gain excluded, married filing jointly" },
          ]}
        />
      </GuideSection>

      <GuideSection id="equity" n={2} kicker="Basics" title="Equity is not what you walk away with">
        <p>
          Equity is the home&rsquo;s value less what you owe. Net proceeds are what is left after you actually sell: the price, less every cost of selling, less the mortgage
          payoff, less any tax. The gap between the two is usually 6% to 10% of the price, which on a typical home is tens of thousands of dollars.
        </p>
        <p>
          That gap matters most when you plan the next purchase. If you are counting on the sale for a down payment, budget from net proceeds, not the Zestimate minus your
          balance.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>
          A married couple sells for {usd(450_000)}. They bought for {usd(300_000)}, spent {usd(20_000)} on improvements and owe {usd(250_000)}. The listing agent charges 2.5%,
          they agree to pay the buyer&rsquo;s agent 2.5%, and other closing costs are 1%.
        </p>
        <WorkedExample
          title="$450,000 sale"
          steps={[
            { label: "Sale price", value: usd(450_000) },
            { label: "Listing agent", note: "2.5%", value: "−" + usd(11_250) },
            { label: "Buyer's agent", note: "2.5%", value: "−" + usd(11_250) },
            { label: "Title, escrow and other costs", note: "1%", value: "−" + usd(4_500) },
            { label: "Mortgage payoff", value: "−" + usd(250_000) },
          ]}
          total={{ label: "Due to you at closing", value: usd(173_000) }}
        />
        <p>
          Their gain is {usd(103_000)}: {usd(423_000)} after selling costs, less a {usd(320_000)} basis. It is well inside their {usd(500_000)} exclusion, so they owe no tax
          and keep the full {usd(173_000)}.
        </p>
      </GuideSection>

      <GuideSection id="commission" n={4} kicker="Agents" title="Agent commissions">
        <p>
          Commission is usually the biggest selling cost. It is a percentage of the sale price, set in your listing agreement, and paid at closing out of the proceeds. Rates
          are negotiable and vary by market, by agent and by the services included. Some brokerages charge a flat fee or a lower rate for less service.
        </p>
        <Bars
          format={usd}
          items={[
            { label: "Listing agent 2.5% only", value: 11_250 },
            { label: "Listing 2.5% + buyer's agent 2.5%", value: 22_500 },
          ]}
        />
        <p>On a {usd(450_000)} sale each percentage point of commission is {usd(4_500)}.</p>
      </GuideSection>

      <GuideSection id="settlement" n={5} kicker="2024 changes" title="The 2024 commission settlement">
        <p>
          A settlement between the National Association of Realtors and home sellers changed how agents are paid, from August 17, 2024:
        </p>
        <ul>
          <li>Offers to pay the buyer&rsquo;s agent can no longer be shown on the multiple listing service (MLS).</li>
          <li>Buyers working with an agent must sign a written agreement, which sets that agent&rsquo;s pay, before touring homes.</li>
          <li>Sellers can still offer to pay the buyer&rsquo;s agent, off the MLS, or agree to it in the purchase contract.</li>
        </ul>
        <p>
          In practice many sellers still pay something toward the buyer&rsquo;s agent to attract offers, and many buyers ask for it in their offer. The calculator keeps the two
          commissions separate so you can see what each decision is worth. In the example, paying nothing to the buyer&rsquo;s agent would raise the proceeds from{" "}
          {usd(173_000)} to {usd(184_250)}.
        </p>
      </GuideSection>

      <GuideSection id="closing" n={6} kicker="Costs" title="Seller closing costs">
        <p>Besides commission, sellers usually pay some of these:</p>
        <ul>
          <li>The owner&rsquo;s title insurance policy, in states where the seller customarily buys it.</li>
          <li>Escrow or settlement fees, or an attorney&rsquo;s fee.</li>
          <li>Transfer taxes, where local custom puts them on the seller.</li>
          <li>HOA transfer and document fees.</li>
          <li>Property tax owed for the part of the year you owned the home, credited to the buyer.</li>
          <li>Recording fees to release your mortgage.</li>
        </ul>
        <p>
          The calculator takes these as a percentage of the price (1% by default) plus separate fields for transfer tax and the property tax proration. A title company can give
          you a seller&rsquo;s net sheet with exact local figures.
        </p>
      </GuideSection>

      <GuideSection id="transfer" n={7} kicker="Taxes" title="Transfer taxes">
        <p>
          Many states charge a tax when real estate changes hands, and some counties and cities add their own. Many others charge none. Who pays is set by law in some places
          and by custom or negotiation in others. Rates range from a small fraction of a percent to well over 1% in some cities. Enter your share as a percentage; your agent or
          title company will know it. Buyers can see the other side in our <a href="/us/housing/closing-cost-calculator">closing cost calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="concessions" n={8} kicker="Negotiation" title="Concessions and repairs">
        <p>
          After an inspection, buyers often ask for repairs or a credit. A <strong>seller concession</strong>{" "}is money you give the buyer at closing, usually toward their
          closing costs. It comes straight off your proceeds, and it also lowers your gain, because it reduces the amount you realize.
        </p>
        <p>
          Repairs, cleaning, staging and moving that you pay for yourself are different: they are paid in cash, and they don&rsquo;t lower the taxable gain unless they are
          improvements. In the example, a {usd(10_000)} concession and {usd(5_000)} of preparation would cut the walk-away amount from {usd(173_000)} to {usd(158_000)}.
        </p>
      </GuideSection>

      <GuideSection id="payoff" n={9} kicker="Mortgage" title="Your mortgage payoff">
        <p>
          The payoff amount is not the balance on your statement. It adds the interest from your last payment to the payoff date and any fees, so ask your servicer for a payoff
          quote dated near closing. A home equity loan or HELOC must be paid off too. Few home loans have a prepayment penalty today, but check yours.
        </p>
        <p>
          Our <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}shows how the balance falls over time, which helps when you are deciding when to sell.
        </p>
      </GuideSection>

      <GuideSection id="gain" n={10} kicker="Tax" title="Working out your gain">
        <p>Your gain is the amount realized less your adjusted basis:</p>
        <ul>
          <li><strong>Amount realized</strong>: the sale price less selling costs, commissions and concessions.</li>
          <li><strong>Basis</strong>: what you paid, plus buying costs such as title insurance and recording fees, plus improvements.</li>
        </ul>
        <p>
          Improvements are additions that last and add value: a new roof, a kitchen remodel, an addition, central air, a fence. Repairs and maintenance (painting a room, fixing a
          leak) don&rsquo;t count. Keep receipts for as long as you own the home.
        </p>
      </GuideSection>

      <GuideSection id="exclusion" n={11} kicker="Exclusion" title="The $250,000 and $500,000 exclusion">
        <p>
          Section 121 of the tax code lets you exclude up to {usd(250_000)} of gain on the sale of your main home, or {usd(500_000)} if you are married filing jointly. To qualify:
        </p>
        <ul>
          <li><strong>Ownership</strong>: you owned the home for at least 2 of the 5 years before the sale.</li>
          <li><strong>Use</strong>: you lived in it as your main home for at least 2 of those 5 years. The two years don&rsquo;t need to be continuous.</li>
          <li><strong>Once every two years</strong>: you didn&rsquo;t exclude the gain on another home in the 2 years before.</li>
        </ul>
        <p>
          For the {usd(500_000)} limit, either spouse can meet the ownership test, but both must meet the use test. A partial exclusion may apply if you move early for a job,
          health or unforeseen circumstances; the calculator doesn&rsquo;t work that out. If the whole gain is excluded and you get no Form 1099-S, you usually don&rsquo;t need
          to report the sale.
        </p>
      </GuideSection>

      <GuideSection id="over" n={12} kicker="Large gains" title="When the gain is over the limit">
        <p>
          A single owner sells for {usd(1_200_000)} a home bought for {usd(400_000)}, with {usd(20_000)} of improvements and {usd(72_000)} of selling costs. The gain is{" "}
          {usd(708_000)}. After the {usd(250_000)} exclusion, {usd(458_000)} is taxable, at 15% and 20% on top of {usd(120_000)} of wages, plus the 3.8% net investment income tax.
        </p>
        <CompareCards
          columns={[
            {
              name: "Single, Texas",
              rows: [
                { label: "Taxable gain", value: usd(458_000) },
                { label: "Federal tax", value: usd(83_884) },
                { label: "You walk away with", value: usd(744_116) },
              ],
            },
            {
              name: "Married filing jointly, Texas",
              rows: [
                { label: "Taxable gain", value: usd(208_000) },
                { label: "Federal tax", value: usd(32_499) },
                { label: "You walk away with", value: usd(795_501) },
              ],
            },
          ]}
        />
        <p>
          Our <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}shows the rates and brackets behind these figures in more detail.
        </p>
      </GuideSection>

      <GuideSection id="not-main" n={13} kicker="Other homes" title="Second homes and rentals">
        <p>
          A vacation home or rental gets no exclusion, so the whole gain is taxable. With the same {usd(450_000)} sale and a married couple&rsquo;s {usd(120_000)} of wages, the
          {" "}{usd(103_000)} gain costs {usd(13_785)} of federal tax if held more than a year, and {usd(21_360)} if held a year or less, when it is taxed as ordinary income.
        </p>
        <Callout tone="warn" title="Depreciation recapture">
          On a rental, or a home office you depreciated, the depreciation you claimed (or could have claimed) is taxed at up to 25% when you sell, even if the rest of the gain
          is excluded. The calculator doesn&rsquo;t include it.
        </Callout>
      </GuideSection>

      <GuideSection id="state" n={14} kicker="States" title="State tax on the gain">
        <p>
          Most states tax capital gains as ordinary income, and the calculator works it out that way. In the {usd(1_200_000)} example, a single seller in California would owe
          about {usd(45_867)} of state tax on top, leaving {usd(698_249)}. Some states tax long-term gains at lower rates, which the calculator doesn&rsquo;t model, and states with
          no income tax charge nothing.
        </p>
      </GuideSection>

      <GuideSection id="underwater" n={15} kicker="Shortfall" title="When you owe more than it sells for">
        <p>
          If the price doesn&rsquo;t cover the selling costs and the payoff, you must bring the difference to closing. Selling a {usd(300_000)} home with a {usd(290_000)} payoff
          and 6% selling costs leaves you {usd(8_000)} short. If you can&rsquo;t cover it, a lender may agree to a short sale, accepting less than it is owed. Talk to your
          servicer early; a short sale takes time and affects your credit.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={16} kicker="Timing" title="From listing to wire">
        <Timeline
          items={[
            { when: "Before listing", what: "Agent and pricing", detail: "Sign a listing agreement that sets the commission; decide on buyer's agent pay." },
            { when: "Under contract", what: "Inspection and appraisal", detail: "Negotiate repairs or credits." },
            { when: "Before closing", what: "Payoff quote and net sheet", detail: "The title company orders the payoff and prepares the figures." },
            { when: "Closing", what: "Settlement statement", detail: "Costs and the payoff come out; the rest is wired to you, often the same or next business day." },
            { when: "Early next year", what: "Form 1099-S", detail: "The closing agent may report the sale to the IRS." },
          ]}
        />
      </GuideSection>

      <GuideSection id="next-home" n={17} kicker="Planning" title="Planning the next purchase">
        <p>
          If the proceeds fund your next down payment, use the walk-away figure, then subtract the buyer&rsquo;s closing costs on the new home. Our{" "}
          <a href="/us/housing/mortgage-affordability">home affordability calculator</a>{" "}shows what price that down payment and your income support.
        </p>
        <p>
          Timing matters too: buying before selling may mean carrying two mortgages, while selling first may mean renting in between. Keep part of the proceeds in a
          high-yield savings account or CD if the next purchase is months away.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Treating equity as cash, without subtracting 6% or more of selling costs.</li>
          <li>Using the statement balance instead of a payoff quote.</li>
          <li>Losing improvement receipts that would have raised the basis.</li>
          <li>Assuming the exclusion applies to a home you moved out of more than three years ago.</li>
          <li>Forgetting state tax, or depreciation recapture on a home office or rental.</li>
          <li>Wiring proceeds to an account given only by email.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the expected price, a payoff quote and the commission rates in your listing agreement.</li>
          <li>Enter what you paid for the home and your filing status.</li>
          <li>Under More options, add improvements, concessions, transfer tax and other costs, and check the main home switch.</li>
          <li>Use the price table to see what a lower or higher offer would mean.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Home sale exclusion, single", usd(250_000)],
            ["Home sale exclusion, married filing jointly", usd(500_000)],
            ["Ownership and use test", "2 of the last 5 years"],
            ["Long-term capital gains rates (2026)", "0%, 15% and 20%"],
            ["Net investment income tax", "3.8% above $200,000 MAGI single, $250,000 joint"],
            ["Unrecaptured depreciation rate", "up to 25%"],
            ["NAR settlement practice changes", "from August 17, 2024"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

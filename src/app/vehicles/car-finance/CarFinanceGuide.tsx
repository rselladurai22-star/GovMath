import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Car finance — the guide. Figures from src/lib/vehicles/car-finance.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "hp", title: "How hire purchase works" },
  { id: "pcp", title: "How PCP works" },
  { id: "examples", title: "Worked examples" },
  { id: "compare", title: "PCP or HP: which costs less?" },
  { id: "apr", title: "Understanding APR" },
  { id: "deposit", title: "How the deposit changes things" },
  { id: "gfv", title: "The balloon payment and mileage" },
  { id: "end", title: "Your options at the end of a PCP" },
  { id: "vt", title: "Handing the car back early" },
  { id: "loan", title: "Personal loans and leasing" },
  { id: "credit", title: "Credit checks and affordability" },
  { id: "commission", title: "The car finance commission scheme" },
  { id: "checklist", title: "Before you sign" },
  { id: "used", title: "Financing a used car" },
  { id: "running-costs", title: "The full cost of running a car" },
  { id: "gap", title: "Gap insurance" },
  { id: "settle", title: "Settling early" },
  { id: "balloon-refinance", title: "Refinancing the balloon" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Car finance explained", href: "https://www.moneyhelper.org.uk/en/everyday-money/buying-and-running-a-car/car-finance-explained" },
  { label: "FCA — Motor finance redress scheme", href: "https://www.fca.org.uk/news/statements/fca-confirms-motor-finance-redress-scheme" },
  { label: "Legislation — Consumer Credit Act 1974, section 99 (termination)", href: "https://www.legislation.gov.uk/ukpga/1974/39/section/99" },
  { label: "FCA — Consumer credit: your rights", href: "https://www.fca.org.uk/consumers/credit-loans" },
];

export default function CarFinanceGuide() {
  return (
    <Guide
      kicker="The car finance guide"
      title="PCP or hire purchase: what will car finance cost?"
      intro={
        <>
          Most new cars and many used ones in the UK are bought on finance. The two main types, personal contract purchase (PCP) and hire purchase (HP),
          can have very different monthly payments for the same car, but the cheapest monthly payment is rarely the cheapest deal overall. This guide
          explains how each works, how to compare them on the total cost, your rights to hand a car back, and the compensation scheme for older agreements.
        </>
      }
      meta={["2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>On a £25,000 car with £2,500 down over 4 years at 9.9% APR, <strong>HP</strong> costs about <strong>£565 a month</strong>.</li>
          <li><strong>PCP</strong> with a £9,000 balloon costs about <strong>£410 a month</strong>, but £1,563 more in total if you keep the car.</li>
          <li>Compare the total amount payable, not just the monthly payment.</li>
          <li>You can hand the car back once you have paid half the total amount payable.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£565", label: "HP a month in the example" },
            { value: "£410", label: "PCP a month in the example" },
            { value: "50%", label: "Paid before you can hand it back" },
            { value: "2007 to 2024", label: "Agreements in the redress scheme" },
          ]}
        />
      </GuideSection>

      <GuideSection id="hp" n={2} kicker="HP" title="How hire purchase works">
        <p>
          With hire purchase you pay a deposit, then equal monthly payments that cover the whole price plus interest. At the end, after a small option to
          purchase fee, the car is yours. Until then the finance company owns it, so you cannot sell it without paying off the loan. HP is simple and
          usually cheaper overall than PCP if you intend to keep the car.
        </p>
      </GuideSection>

      <GuideSection id="pcp" n={3} kicker="PCP" title="How PCP works">
        <p>
          With PCP, the lender sets a guaranteed future value (GFV): what it expects the car to be worth at the end. You only repay the difference between
          the price and the GFV during the agreement, plus interest on the whole amount. At the end you choose: pay the GFV as a final balloon payment and
          keep the car, hand it back, or trade it in for a new one. Monthly payments are lower than HP, which is why PCP is so popular for new cars.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Hire purchase: £25,000 car, £2,500 deposit, 48 months, 9.9% APR"
          steps={[
            { label: "Borrowed", value: "£22,500" },
            { label: "Monthly payment", value: "£565.03" },
            { label: "Total of payments", value: "£27,121.28" },
            { label: "Deposit and £10 fee", value: "£2,510" },
          ]}
          total={{ label: "Total to own the car", value: "£29,631.28" }}
        />
        <WorkedExample
          title="PCP: same car and deal, £9,000 balloon"
          steps={[
            { label: "Monthly payment", value: "£410.10" },
            { label: "Total of payments", value: "£19,684.59" },
            { label: "Balloon and fee to keep the car", value: "£9,010" },
            { label: "If handed back: deposit and payments", value: "£22,184.59" },
          ]}
          total={{ label: "Total to own the car", value: "£31,194.59" }}
        />
      </GuideSection>

      <GuideSection id="compare" n={5} kicker="Choosing" title="PCP or HP: which costs less?">
        <CompareCards
          columns={[
            {
              name: "PCP",
              rows: [
                { label: "Monthly payment", value: "Lower" },
                { label: "Cost if you keep the car", value: "Higher" },
                { label: "Suits", value: "Changing car every few years" },
              ],
            },
            {
              name: "Hire purchase",
              rows: [
                { label: "Monthly payment", value: "Higher" },
                { label: "Cost if you keep the car", value: "Lower" },
                { label: "Suits", value: "Keeping the car long term" },
              ],
            },
          ]}
        />
        <p>
          In the example, PCP costs £1,563 more if you keep the car, because you pay interest on the £9,000 balloon throughout. If you hand it back, PCP
          cost £22,185 for four years of driving, against £29,631 for HP, though with HP you own a car worth about the GFV.
        </p>
      </GuideSection>

      <GuideSection id="apr" n={6} kicker="Rates" title="Understanding APR">
        <p>
          The APR (annual percentage rate) includes the interest and any compulsory fees, so it is the best single figure for comparing deals. Some dealers
          offer 0% APR on new cars; at 0%, HP on the example car would be £468.75 a month with only the £10 fee as extra cost. A low APR is often funded by
          a higher price or a smaller discount, so compare the total amount payable with what you could pay elsewhere. At 6.9% APR, the HP deal would be
          £535.57 a month and the PCP deal £371.52.
        </p>
      </GuideSection>

      <GuideSection id="deposit" n={7} kicker="Deposit" title="How the deposit changes things">
        <p>
          A bigger deposit means borrowing less, so lower payments and less interest. Dealers sometimes add a deposit contribution on new cars, which
          reduces what you borrow. If you part-exchange a car that still has finance on it, any shortfall is often added to the new loan, which increases
          the cost. Check the settlement figure on your old agreement first.
        </p>
      </GuideSection>

      <GuideSection id="gfv" n={8} kicker="Balloon" title="The balloon payment and mileage">
        <p>
          The GFV is based on the car, the length of the agreement and the mileage you agree. A higher mileage lowers the GFV and raises your payments. If you
          go over the agreed mileage, you pay an excess charge per mile when you hand the car back, often 5p to 15p a mile. Be realistic about how far you
          drive: an extra 5,000 miles at 10p a mile is £500.
        </p>
      </GuideSection>

      <GuideSection id="end" n={9} kicker="End of a PCP" title="Your options at the end of a PCP">
        <ul>
          <li><strong>Pay the balloon</strong> and keep the car, from savings or by refinancing it.</li>
          <li><strong>Hand it back</strong> and pay nothing more, apart from excess mileage or damage charges.</li>
          <li><strong>Part-exchange</strong> it: if the car is worth more than the GFV, the difference (positive equity) can go towards your next deposit.</li>
        </ul>
        <Callout title="Check the condition rules">
          Return conditions follow industry fair wear and tear guidelines. Get dents and scuffs repaired beforehand if it is cheaper than the charge.
        </Callout>
      </GuideSection>

      <GuideSection id="vt" n={10} kicker="Your rights" title="Handing the car back early">
        <p>
          Under the Consumer Credit Act, you can end an HP or PCP agreement at any time once you have paid half of the total amount payable, including the
          balloon on a PCP, and hand the car back with nothing more to pay as long as it has been looked after. This is called voluntary termination. Under
          PCP, half of the total is often reached later than you expect, because the balloon is counted. You can also settle the agreement early at any
          time, with a rebate of some interest.
        </p>
      </GuideSection>

      <GuideSection id="loan" n={11} kicker="Alternatives" title="Personal loans and leasing">
        <p>
          A personal loan from a bank lets you buy the car outright, so you own it from day one and can sell it when you like. Rates on loans of £7,500 to
          £25,000 can be lower than dealer finance for people with good credit. Personal contract hire (leasing) is another option: lower payments, but you
          never own the car, and there are mileage and condition charges at the end.
        </p>
      </GuideSection>

      <GuideSection id="credit" n={12} kicker="Approval" title="Credit checks and affordability">
        <p>
          Lenders check your credit record and whether you can afford the payments. A soft search for a quote does not affect your credit score; a full
          application does. Missing finance payments damages your credit record and can lead to the car being repossessed, though once you have paid a third
          of the total the lender needs a court order to take it back.
        </p>
      </GuideSection>

      <GuideSection id="commission" n={13} kicker="Compensation" title="The car finance commission scheme">
        <p>
          The Financial Conduct Authority has set up a redress scheme for motor finance agreements taken out between 6 April 2007 and 1 November 2024 where
          commission paid to the dealer was not properly disclosed. Final rules were published in March 2026. Lenders are contacting customers, and you do not
          need to use a claims firm, which would take a share of any compensation. The scheme has been legally challenged, so check the FCA&rsquo;s website
          for the latest position.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={14} kicker="Practical" title="Before you sign">
        <ul>
          <li>Compare the total amount payable, not just the monthly payment.</li>
          <li>Check the APR, the term, the balloon, the mileage limit and the excess mileage charge.</li>
          <li>Ask whether the dealer earns commission and how it affects your rate.</li>
          <li>Get a quote for a bank loan and compare.</li>
          <li>Make sure you can afford the payments alongside insurance, fuel, tax and servicing; see the <a href="/vehicles/car-tax-ved">car tax calculator</a>.</li>
        </ul>
      </GuideSection>

      <GuideSection id="used" n={15} kicker="Used cars" title="Financing a used car">
        <p>
          PCP and HP are available on used cars too, usually up to a set age and mileage at the end of the agreement. Rates on used cars are often higher
          than the promotional rates on new ones, and the balloon is lower because the car has already lost much of its value. For older or cheaper cars, a
          personal loan or saving up may cost less overall. Always check the car&rsquo;s history, including outstanding finance, before you buy privately:
          a car with finance still owed can be repossessed by the lender.
        </p>
      </GuideSection>

      <GuideSection id="running-costs" n={16} kicker="Running costs" title="The full cost of running a car">
        <p>
          Finance is only part of what a car costs. Insurance, fuel or charging, servicing, tyres, road tax and parking can add several thousand pounds a year.
          An electric car may cost more to finance but less to run. Before choosing a monthly payment, add these costs to your budget. See the{" "}
          <a href="/vehicles/petrol-vs-ev-cost">petrol vs EV running cost calculator</a> and the <a href="/vehicles/car-tax-ved">car tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="gap" n={17} kicker="Insurance" title="Gap insurance">
        <p>
          If a financed car is written off or stolen, your insurer pays its market value, which can be less than you still owe. Gap insurance covers the
          difference. Dealers often sell it at the point of sale, but standalone policies are usually much cheaper, and you can buy one within a few weeks of
          getting the car.
        </p>
      </GuideSection>

      <GuideSection id="settle" n={18} kicker="Early settlement" title="Settling early">
        <p>
          You can pay off car finance early at any time. Ask the lender for a settlement figure: it will include the balance plus a small amount of interest,
          usually up to 58 days, but you get a rebate of the rest. Settling early can save a lot if you have come into money, and is also how you sell a financed
          car, by paying off the loan from the sale proceeds.
        </p>
      </GuideSection>

      <GuideSection id="balloon-refinance" n={19} kicker="End of a PCP" title="Refinancing the balloon">
        <p>
          If you want to keep the car but cannot pay the balloon from savings, some lenders let you refinance it into a new loan or hire purchase agreement. This
          spreads the cost, but adds more interest. Compare the refinance rate with a personal loan. Alternatively, if the car is worth more than the balloon, you
          can sell it privately, pay off the finance and keep the difference.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="£25,000 car, £2,500 deposit, 48 months"
          head={["Deal", "A month", "Total to own"]}
          numeric={[1, 2]}
          rows={[
            ["HP at 0% APR", "£468.75", "£25,010"],
            ["HP at 6.9% APR", "£535.57", "£28,217"],
            ["HP at 9.9% APR", "£565.03", "£29,631"],
            ["PCP at 6.9%, £9,000 balloon", "£371.52", "£29,343"],
            ["PCP at 9.9%, £9,000 balloon", "£410.10", "£31,195"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

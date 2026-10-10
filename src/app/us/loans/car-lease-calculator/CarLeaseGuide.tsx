import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Car lease guide. Figures from src/lib/us/borrowing.ts (carLease, leaseVsBuy) and src/lib/us/loans.ts (autoLoan). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How a lease works" },
  { id: "terms", title: "The words on a lease" },
  { id: "formula", title: "The payment formula" },
  { id: "example", title: "A worked example" },
  { id: "money-factor", title: "The money factor" },
  { id: "residual", title: "The residual value" },
  { id: "price", title: "Negotiating the price" },
  { id: "down", title: "Money down and cap cost reductions" },
  { id: "tax", title: "Sales tax on a lease" },
  { id: "fees", title: "Acquisition and disposition fees" },
  { id: "signing", title: "What is due at signing" },
  { id: "trade", title: "Trade-ins and negative equity" },
  { id: "vs-buy", title: "Leasing vs buying" },
  { id: "miles", title: "Mileage and wear" },
  { id: "end", title: "At the end of the lease" },
  { id: "early", title: "Ending a lease early" },
  { id: "who", title: "Who leasing suits" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Federal Reserve: Keys to Vehicle Leasing", href: "https://www.federalreserve.gov/pubs/leasing/resource/introduction/what.htm" },
  { label: "CFPB: Regulation M (Consumer Leasing Act)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1013/" },
  { label: "CFPB: Auto loans and car buying", href: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" },
  { label: "New York Publication 839: sales tax on long-term motor vehicle leases", href: "https://www.tax.ny.gov/pdf/publications/sales/pub839.pdf" },
  { label: "Texas Comptroller: Motor vehicle tax FAQs (leased vehicles)", href: "https://comptroller.texas.gov/taxes/motor-vehicle/faq.php" },
  { label: "Tax Foundation: State and local sales tax rates, midyear 2026", href: "https://taxfoundation.org/data/all/state/2026-sales-tax-rates/" },
  { label: "Federal Reserve: Consumer Credit (G.19), auto loan rates", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
];

export default function CarLeaseGuide() {
  return (
    <Guide
      kicker="The car lease guide"
      title="How a lease payment is worked out"
      intro={
        <>
          A lease looks like a rental with a long contract, but its payment follows a precise formula. Once you know the four numbers behind it, the price, the residual value,
          the money factor and the term, you can check any quote, spot a marked-up rate and see whether leasing beats buying.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You pay for the car&rsquo;s expected loss in value over the lease, plus a rent charge for the money tied up in it, plus sales tax.</li>
          <li>A {usd(40_000)} car at a negotiated {usd(38_000)}, {usd(2_000)} down, 58% residual and a 0.0025 money factor costs about $571.04 a month over 36 months with 7% tax.</li>
          <li>Over the lease that is {usd(23_592)} in all, including {usd(3_211)} due at signing and the fee to return the car.</li>
          <li>Money factor × 2,400 gives the rough APR: 0.0025 is about 6%.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$571.04", label: "Monthly payment in the example" },
            { value: usd(13_795), label: "Depreciation paid over 36 months" },
            { value: usd(5_418), label: "Rent charge over 36 months" },
            { value: "× 2,400", label: "Money factor to rough APR" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How a lease works">
        <p>
          When you lease, a leasing company (usually the carmaker&rsquo;s finance arm or a bank) buys the car and lets you use it for a set number of months and miles. It
          expects the car to be worth a certain amount when you hand it back: the residual value. Your payments cover the gap between the price and that residual, plus a finance
          charge. You never pay for the part of the car you do not use, which is why lease payments are lower than loan payments on the same car.
        </p>
        <p>
          The federal Consumer Leasing Act, through the CFPB&rsquo;s Regulation M, requires the leasing company to give you a written disclosure before you sign, showing the
          capitalized cost, the residual, the rent charge, the payment and what you owe at signing.
        </p>
      </GuideSection>

      <GuideSection id="terms" n={3} kicker="Vocabulary" title="The words on a lease">
        <ul>
          <li><strong>MSRP</strong>: the maker&rsquo;s sticker price. The residual is a share of it.</li>
          <li><strong>Gross capitalized cost</strong>: the negotiated price plus anything rolled in, such as the acquisition fee or negative equity.</li>
          <li><strong>Cap cost reduction</strong>: cash down, trade-in equity and rebates, which lower the amount you finance.</li>
          <li><strong>Adjusted capitalized cost</strong>: gross cap cost minus the reductions.</li>
          <li><strong>Residual value</strong>: the car&rsquo;s expected value at the end.</li>
          <li><strong>Money factor</strong>: the lease&rsquo;s rate; the disclosure calls the result the rent charge.</li>
        </ul>
      </GuideSection>

      <GuideSection id="formula" n={4} kicker="The maths" title="The payment formula">
        <p>
          <strong>Depreciation each month = (adjusted cap cost − residual) ÷ months</strong>
        </p>
        <p>
          <strong>Rent charge each month = (adjusted cap cost + residual) × money factor</strong>
        </p>
        <p>
          The base payment is the two added together. In most states sales tax is then added to each payment. Adding the cap cost and the residual looks odd, but it is a shortcut:
          multiplied by the money factor, it gives the average monthly interest on the money tied up in the car over the lease.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$40,000 MSRP, 36 months, 7% sales tax on the payment"
          steps={[
            { label: "Negotiated price", value: usd(38_000) },
            { label: "Plus acquisition fee rolled in", value: usd(995) },
            { label: "Less cash down", value: `−${usd(2_000)}` },
            { label: "Adjusted capitalized cost", value: usd(36_995) },
            { label: "Residual", note: "58% of $40,000", value: usd(23_200) },
            { label: "Depreciation", note: "($36,995 − $23,200) ÷ 36", value: "$383.19" },
            { label: "Rent charge", note: "($36,995 + $23,200) × 0.0025", value: "$150.49" },
            { label: "Base payment", value: "$533.68" },
            { label: "Sales tax at 7%", value: "$37.36" },
          ]}
          total={{ label: "Monthly payment", value: "$571.04" }}
        />
      </GuideSection>

      <GuideSection id="money-factor" n={6} kicker="Rate" title="The money factor">
        <p>
          The money factor is the lease&rsquo;s interest rate in disguise. Multiply it by 2,400 for an approximate APR. Like a loan rate, it depends on your credit score, and the
          leasing company publishes a base rate (the &ldquo;buy rate&rdquo;) for each model each month. Dealers are often allowed to add to it and keep the difference, so ask for
          the base money factor and check the figure on the contract.
        </p>
        <DataTable
          caption="The example lease at three money factors"
          head={["Money factor", "Rough APR", "Rent charge a month", "Monthly payment", "Total lease cost"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["0.0015", "3.6%", "$90.29", "$506.63", usd(21_274)],
            ["0.0025", "6.0%", "$150.49", "$571.04", usd(23_592)],
            ["0.0035", "8.4%", "$210.68", "$635.45", usd(25_911)],
          ]}
        />
        <p>Each step of 0.001 in the money factor moves the total by about {usd(2_319)} on this car.</p>
      </GuideSection>

      <GuideSection id="residual" n={7} kicker="Residual" title="The residual value">
        <p>
          The higher the residual, the less depreciation you pay. Cars that hold their value lease well; cars that lose value fast lease badly, even with discounts. The leasing
          company sets the residual for each model, term and yearly mileage, and three-year residuals are often in the 50% to 60% range. You cannot negotiate it, but you can
          choose a car and term with a high one.
        </p>
        <Bars
          format={usd}
          items={[
            { label: "52% residual", value: 25_929 },
            { label: "58% residual", value: 23_592 },
            { label: "64% residual", value: 21_256 },
          ]}
        />
        <p>Total lease cost on the example car: the payment runs from $635.95 at 52% to $506.13 at 64%.</p>
      </GuideSection>

      <GuideSection id="price" n={8} kicker="Negotiating" title="Negotiating the price">
        <p>
          Many people think lease prices are fixed. They are not: the capitalized cost is the selling price, and you can negotiate it exactly as if you were buying. On the example
          lease, paying the full {usd(40_000)} MSRP instead of {usd(38_000)} raises the payment to $635.83 and the total cost by about {usd(2_333)}. Negotiate the price first,
          then talk about leasing, and ask for the cap cost, residual and money factor in writing.
        </p>
      </GuideSection>

      <GuideSection id="down" n={9} kicker="Cash down" title="Money down and cap cost reductions">
        <CompareCards
          columns={[
            { name: "$0 down", rows: [{ label: "Payment", value: "$635.83" }, { label: "Due at signing", value: usd(1_136) }, { label: "Total cost", value: usd(23_785) }] },
            { name: "$2,000 down", rows: [{ label: "Payment", value: "$571.04" }, { label: "Due at signing", value: usd(3_211) }, { label: "Total cost", value: usd(23_592) }] },
            { name: "$5,000 down", rows: [{ label: "Payment", value: "$473.85" }, { label: "Due at signing", value: usd(6_324) }, { label: "Total cost", value: usd(23_304) }] },
          ]}
        />
        <p>
          Putting {usd(5_000)} down instead of nothing cuts the payment by about $162 but saves only about {usd(481)} over three years, because it trims just the rent charge on
          that money. The bigger risk: if the car is stolen or totaled, the insurer and any gap coverage settle with the leasing company, and your down payment is usually gone.
          Many lease experts suggest putting as little down as possible.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={10} kicker="Sales tax" title="Sales tax on a lease">
        <p>States tax leases in different ways, and it changes both the payment and the cash due at signing:</p>
        <DataTable
          caption="The example lease at 7% under each method"
          head={["How the state taxes it", "Monthly payment", "Due at signing", "Total lease cost"]}
          numeric={[1, 2, 3]}
          rows={[
            ["On each payment (most states)", "$571.04", usd(3_211), usd(23_592)],
            ["On the total of payments, at signing (New York)", "$533.68", usd(4_519), usd(23_592)],
            ["On the car's price, at signing (Texas, Maryland, Virginia)", "$533.68", usd(5_694), usd(24_768)],
            ["No sales tax", "$533.68", usd(3_034), usd(22_108)],
          ]}
        />
        <p>
          Taxing each payment means you pay tax only on the part of the car you use. New York charges tax on all the payments, plus the down payment, when the lease starts. In
          Texas the leasing company pays motor vehicle tax on the price and passes it on. Many states also tax a cash down payment. The calculator fills in your state&rsquo;s
          average rate; check the vehicle rate with your state, as some differ from the general sales tax. Our <a href="/us/taxes/sales-tax-calculator">sales tax calculator</a>{" "}
          shows the general rates.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={11} kicker="Fees" title="Acquisition and disposition fees">
        <p>
          The acquisition fee, often about $600 to $1,100, is the leasing company&rsquo;s charge for setting up the lease. Most people roll it into the cap cost, where it adds
          to the payment and attracts rent charge; paying the {usd(995)} upfront in the example lowers the payment to $538.80 and saves about {usd(165)} overall. The disposition
          fee, often about $300 to $600, is charged when you return the car, and is commonly waived if you lease or buy another car from the same brand. Dealers also charge a
          documentation fee, and the state charges title and registration.
        </p>
      </GuideSection>

      <GuideSection id="signing" n={12} kicker="Cash" title="What is due at signing">
        <p>
          Lease ads quote a payment &ldquo;plus amount due at signing&rdquo;. That amount usually includes the first month&rsquo;s payment, any cash down, any upfront tax, the
          acquisition fee if it is not rolled in, and title, registration and doc fees. In the example it is {usd(3_211)}: the $571.04 first payment, {usd(2_000)} down, {usd(140)}
          {" "}of tax on the down payment and {usd(500)} of fees. Some leases also ask for a refundable security deposit.
        </p>
      </GuideSection>

      <GuideSection id="trade" n={13} kicker="Trade-in" title="Trade-ins and negative equity">
        <p>
          Trade-in equity, what your old car is worth minus what you owe on it, counts as a cap cost reduction, just like cash. If you owe more than the car is worth, the
          difference is added to the new lease&rsquo;s cap cost, and you pay it off, with rent charge, in the new payments. Rolling negative equity from car to car makes each
          deal worse; paying it down first is cheaper.
        </p>
      </GuideSection>

      <GuideSection id="vs-buy" n={14} kicker="Compare" title="Leasing vs buying">
        <p>
          The fair comparison looks at the same period. Buy the same car for {usd(38_000)} with {usd(2_000)} down on a 60-month loan at 7.5%, with 7% tax and the fees financed,
          and the payment is $784.69. After 36 months you have paid {usd(30_249)}, still owe {usd(17_438)}, and own a car worth about the {usd(23_200)} residual: a net cost of
          about {usd(24_486)}. The lease cost {usd(23_592)}, so here leasing is about {usd(894)} cheaper over three years, mainly because you pay sales tax only on the payments.
        </p>
        <p>
          The picture changes if you keep the bought car. After the loan ends you drive with no payment at all, and over seven to ten years buying usually costs much less. Use our{" "}
          <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}for the full loan, and our <a href="/us/loans/car-affordability-calculator">car affordability calculator</a>{" "}
          to see what price fits your income.
        </p>
      </GuideSection>

      <GuideSection id="miles" n={15} kicker="Limits" title="Mileage and wear">
        <p>
          Leases include a yearly mileage allowance, commonly 10,000, 12,000 or 15,000 miles. Go over and you pay a charge for every extra mile when you return the car, often 15
          to 30 cents a mile. Buying extra miles at the start is usually cheaper. You also pay for damage beyond normal wear: dents, curb-damaged wheels, worn tires and stains.
          Get the car inspected before the return date so you can fix small things more cheaply yourself.
        </p>
      </GuideSection>

      <GuideSection id="end" n={16} kicker="Lease end" title="At the end of the lease">
        <ul>
          <li><strong>Return the car</strong>, pay any mileage and wear charges and the disposition fee.</li>
          <li><strong>Buy it</strong> for the residual value plus any purchase fee, if it is worth more than that or you love it.</li>
          <li><strong>Sell or trade it</strong>: if the market value is above the payoff, the difference is equity you can use.</li>
          <li><strong>Lease again</strong>, often with the disposition fee waived.</li>
        </ul>
      </GuideSection>

      <GuideSection id="early" n={17} kicker="Exits" title="Ending a lease early">
        <p>
          Leases are hard to leave. Early termination usually means paying the remaining depreciation and fees, which can approach the rest of the payments. Options include a
          lease transfer to another person (if the leasing company allows it), or selling the car to a dealer for its payoff amount. Do not lease for longer than you are sure you
          will want the car.
        </p>
      </GuideSection>

      <GuideSection id="who" n={18} kicker="Fit" title="Who leasing suits">
        <Callout title="Leasing tends to suit people who">
          Want a new car every two or three years, drive a predictable number of miles, keep cars in good condition, and value a lower payment and a car under warranty over the
          long-run saving of owning one outright. Business users may also deduct part of a lease payment; ask a tax professional.
        </Callout>
        <Callout tone="warn" title="Leasing is a poor fit if you">
          Drive a lot, are hard on cars, want to modify the car, or plan to keep a car for many years. Each new lease restarts the most expensive part of a car&rsquo;s life.
        </Callout>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator">
        <p>
          Enter the MSRP, the negotiated price, any cash down, the residual percentage and the money factor from the dealer&rsquo;s quote, and choose the term. Under More
          options, pick your state to fill in its tax rate and method, add a trade-in, rebates and the fees, and set the auto loan rate and term to compare buying. The results
          show how the payment is built, step by step, so you can check it against the contract.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Money factor to rough APR", "× 2,400"],
            ["Typical acquisition fee", "about $600 to $1,100"],
            ["Typical disposition fee", "about $300 to $600"],
            ["Average 72-month new car loan rate at banks (Fed G.19, August 2026)", "about 7.2%"],
            ["States with no state sales tax", "Alaska, Delaware, Montana, New Hampshire, Oregon"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

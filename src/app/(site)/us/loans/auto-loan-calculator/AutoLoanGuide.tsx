import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Auto loans — the guide. Figures from src/lib/us/loans.ts and loans-extra.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How a car payment is worked out" },
  { id: "example", title: "A worked example" },
  { id: "amount", title: "What goes into the amount financed" },
  { id: "sales-tax", title: "Sales tax on a car" },
  { id: "trade-in", title: "Trade-ins and the tax credit" },
  { id: "negative-equity", title: "Negative equity" },
  { id: "rebates", title: "Rebates and 0% offers" },
  { id: "term", title: "Choosing a loan term" },
  { id: "rate", title: "How much the rate matters" },
  { id: "credit", title: "Credit scores and auto loan rates" },
  { id: "preapproval", title: "Preapproval and dealer financing" },
  { id: "fees", title: "Fees and add-ons" },
  { id: "upfront", title: "Paying tax and fees upfront" },
  { id: "deduction", title: "The car loan interest deduction" },
  { id: "affordable", title: "How much car you can afford" },
  { id: "early", title: "Paying off early and refinancing" },
  { id: "used", title: "New or used" },
  { id: "lease", title: "Buying or leasing" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB — Auto loans: key terms and shopping tips", href: "https://www.consumerfinance.gov/consumer-tools/auto-loans/" },
  { label: "Federal Reserve — Consumer Credit G.19 (new car loan rates)", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "IRS — Tax deductions for working Americans and seniors (car loan interest)", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors" },
  { label: "IRS — Schedule 1-A, Additional Deductions", href: "https://www.irs.gov/newsroom/schedule-1-a-additional-deductions-what-to-know-about-the-new-form" },
  { label: "NHTSA — VIN decoder", href: "https://vpic.nhtsa.dot.gov/decoder/" },
  { label: "Tax Foundation — State and local sales tax rates, midyear 2026", href: "https://taxfoundation.org/data/all/state/2026-sales-tax-rates/" },
  { label: "FTC — Financing or leasing a car", href: "https://consumer.ftc.gov/articles/financing-or-leasing-car" },
];

export default function AutoLoanGuide() {
  return (
    <Guide
      kicker="The auto loan guide"
      title="How car loans work, and how to pay less"
      intro={
        <>
          A car payment depends on more than the sticker price. Sales tax, fees, your trade-in, any loan still on it, the interest rate and the
          loan term all change what you pay each month and in total. This guide walks through each one with real numbers, explains the new
          federal deduction for car loan interest, and shows the traps that make a car cost thousands more than it needs to.
        </>
      }
      meta={["Worked examples", "14 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Your payment depends on the amount financed, the APR and the number of months.</li>
          <li>A {usd(35_000)} car with {usd(4_000)} down, a {usd(6_000)} trade-in, 7% sales tax and {usd(800)} of fees, financed at 7.2% for 60 months, costs $553.70 a month.</li>
          <li>Stretching the same loan to 84 months cuts the payment to $422.76 but adds {usd(2_289)} of interest.</li>
          <li>Interest on a loan for a new, US-assembled car can be deducted, up to $10,000 a year, from 2025 to 2028.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$553.70", label: "Monthly payment, 60 months at 7.2%" },
            { value: usd(5_392), label: "Interest over the loan" },
            { value: "about 7.2%", label: "Average 72-month new car rate at banks (August 2026)" },
            { value: "$10,000", label: "Most car loan interest you can deduct a year" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="The maths" title="How a car payment is worked out">
        <p>
          An auto loan is an installment loan: you borrow a fixed amount and repay it in equal monthly payments. Each month the lender charges
          interest at the APR ÷ 12 on what you still owe, and the rest of your payment reduces the balance. Early payments are mostly interest;
          later ones are mostly principal. The payment formula is the same one used for a mortgage or any fixed loan:
        </p>
        <p>
          <strong>Payment = amount × r ÷ (1 − (1 + r)<sup>−n</sup>)</strong>, where r is the APR ÷ 12 and n is the number of months.
        </p>
        <p>
          The calculator does this for you, then builds the full schedule so you can see the balance and the interest paid in any month. Most
          car loans use simple interest, which means interest is charged on the balance each day or month and never on past interest, so paying
          early or paying extra cuts the interest straight away.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="A $35,000 car, 7% sales tax, 7.2% APR over 60 months"
          steps={[
            { label: "Price", value: usd(35_000) },
            { label: "Less trade-in", value: "−" + usd(6_000) },
            { label: "Sales tax: 7% of $29,000", value: "+$2,030" },
            { label: "Fees", value: "+" + usd(800) },
            { label: "Less down payment", value: "−" + usd(4_000) },
            { label: "Amount financed", value: usd(27_830) },
            { label: "Interest over 60 months", value: usd(5_392) },
          ]}
          total={{ label: "Monthly payment", value: "$553.70" }}
        />
        <p>
          Counting the down payment, the trade-in and every payment, the car costs {usd(43_222)}. Of the {usd(1_848)} of interest in the
          first year, almost all is charged on the large starting balance.
        </p>
      </GuideSection>

      <GuideSection id="amount" n={4} kicker="The loan" title="What goes into the amount financed">
        <p>The amount financed is what you actually borrow. It starts with the agreed price and then:</p>
        <ul>
          <li><strong>Down payment</strong>{" "}and <strong>trade-in equity</strong>{" "}reduce it.</li>
          <li><strong>Cash rebates</strong>{" "}reduce it if they are applied to the deal.</li>
          <li><strong>Sales tax</strong>, <strong>title and registration</strong>{" "}and <strong>dealer fees</strong>{" "}increase it if you finance them.</li>
          <li><strong>Negative equity</strong>{" "}on your trade-in, service contracts and GAP insurance increase it.</li>
        </ul>
        <p>
          Read the &quot;amount financed&quot; line on the retail installment contract. The federal Truth in Lending Act requires it, along with
          the APR, the finance charge and the total of payments, so you can check the dealer&rsquo;s figures against this calculator.
        </p>
      </GuideSection>

      <GuideSection id="sales-tax" n={5} kicker="Tax" title="Sales tax on a car">
        <p>
          Almost every state taxes car purchases. Alaska, Delaware, Montana, New Hampshire and Oregon have no general state sales tax, though
          some charge title or registration fees instead. Elsewhere the rate is usually the state rate plus any county or city rate where you
          register the car, not where you buy it.
        </p>
        <p>
          Many states use a separate motor vehicle tax with its own rate, so the general sales tax may not be what you pay. The calculator fills
          in the state rate plus the state&rsquo;s average local rate as a starting point. Check your state&rsquo;s motor vehicle or revenue
          department and type the exact rate if it differs. The <a href="/us/taxes/sales-tax-calculator">sales tax calculator</a>{" "}lists every
          state&rsquo;s general rate.
        </p>
      </GuideSection>

      <GuideSection id="trade-in" n={6} kicker="Trade-ins" title="Trade-ins and the tax credit">
        <p>
          In most states you pay sales tax only on the price minus your trade-in. On the example, that means tax on $29,000 instead of
          $35,000, saving $420 and cutting the payment from $562.05 to $553.70.
        </p>
        <CompareCards
          columns={[
            { name: "Tax after trade-in (most states)", rows: [{ label: "Taxed amount", value: "$29,000" }, { label: "Sales tax at 7%", value: "$2,030" }, { label: "Payment", value: "$553.70" }] },
            { name: "Tax on the full price", rows: [{ label: "Taxed amount", value: "$35,000" }, { label: "Sales tax at 7%", value: "$2,450" }, { label: "Payment", value: "$562.05" }] },
          ]}
        />
        <p>
          A few states give no credit for a trade-in, including California, Hawaii and Virginia, and some others cap it. Choosing one of those
          three states turns the switch off for you. In states with the credit, trading in at the dealer can be worth more than a private sale
          that brings a slightly higher price.
        </p>
      </GuideSection>

      <GuideSection id="negative-equity" n={7} kicker="Trade-ins" title="Negative equity">
        <p>
          You have negative equity, or are &quot;upside down&quot;, when you owe more on your car than it is worth. Dealers often offer to
          &quot;pay off your loan&quot;, but the shortfall is added to the new loan.
        </p>
        <WorkedExample
          title="Trading in a car worth $10,000 with $14,000 still owed"
          steps={[
            { label: "Negative equity rolled in", value: usd(4_000) },
            { label: "Amount financed", value: usd(37_550) },
            { label: "Monthly payment", value: "$747.08" },
          ]}
          total={{ label: "Interest over 60 months", value: usd(7_275) }}
        />
        <p>
          Rolling over negative equity means paying interest on a car you no longer own and starting the new loan upside down. If you can, keep
          the old car until the loan is paid down, or pay the shortfall in cash.
        </p>
      </GuideSection>

      <GuideSection id="rebates" n={8} kicker="Deals" title="Rebates and 0% offers">
        <p>
          A cash rebate from the maker lowers the amount you borrow. In most states, sales tax is still charged on the price before the rebate,
          which is how the calculator treats it. A {usd(2_000)} rebate on the example cuts the amount financed to {usd(25_830)} and the payment
          to $513.91.
        </p>
        <p>
          Makers often offer a choice: a rebate, or a very low APR such as 0% or 1.9%. Work out both. Put the rebate in with your bank&rsquo;s
          rate, then try the low rate with no rebate. On shorter loans the rebate often wins; on longer ones the low rate can.
        </p>
      </GuideSection>

      <GuideSection id="term" n={9} kicker="Term" title="Choosing a loan term">
        <DataTable
          caption="The example loan ($27,830 at 7.2%) over different terms"
          head={["Term", "Monthly payment", "Total interest", "Total cost of the car"]}
          numeric={[1, 2, 3]}
          rows={[
            ["36 months", "$861.86", usd(3_197), usd(41_027)],
            ["48 months", "$669.01", usd(4_282), usd(42_112)],
            ["60 months", "$553.70", usd(5_392), usd(43_222)],
            ["72 months", "$477.15", usd(6_525), usd(44_355)],
            ["84 months", "$422.76", usd(7_681), usd(45_511)],
          ]}
        />
        <p>
          Longer loans make cars look affordable, and 72- and 84-month loans are now common. But each extra year adds interest and keeps you
          upside down for longer, because a new car loses a large part of its value in the first few years. If you need 72 months or more to
          afford the payment, consider a cheaper car or a bigger down payment.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={10} kicker="Rates" title="How much the rate matters">
        <Figure label="Total interest on $27,830 over 60 months" caption="Same loan, different APRs.">
          <Bars
            format={usd}
            items={[
              { label: "4.9% APR", value: 3_605 },
              { label: "7.2% APR", value: 5_392 },
              { label: "10% APR", value: 7_648 },
              { label: "14% APR", value: 11_023 },
            ]}
          />
        </Figure>
        <p>
          The Federal Reserve&rsquo;s G.19 survey put the average bank rate on a 72-month new car loan at about 7.2% in August 2026. Used car
          loans and loans to borrowers with lower credit scores often cost much more. Moving from 14% to 7.2% saves {usd(5_631)} on this loan.
        </p>
      </GuideSection>

      <GuideSection id="credit" n={11} kicker="Rates" title="Credit scores and auto loan rates">
        <p>
          Lenders price auto loans mainly on your credit score, the loan term, the age of the car and how much you put down. The best rates go to
          scores in the mid-700s and above. Before you shop, check your credit reports for free at AnnualCreditReport.com and fix any errors.
        </p>
        <p>
          Rate shopping does not have to hurt your score: credit scoring models count several auto loan inquiries made within a short period,
          typically 14 to 45 days depending on the model, as one. So get several quotes in the same couple of weeks.
        </p>
      </GuideSection>

      <GuideSection id="preapproval" n={12} kicker="Shopping" title="Preapproval and dealer financing">
        <p>
          A preapproval from a bank or credit union tells you the rate you qualify for before you visit the dealer. Dealers arrange financing
          through lenders and may add a markup to the rate the lender offers them. With a preapproval in hand you can ask the dealer to beat it,
          and you will know whether a &quot;special&quot; rate is really special.
        </p>
        <Callout title="Negotiate in this order">
          The price of the car, then your trade-in, then the financing. Discussing only the monthly payment lets a dealer reach any figure by
          stretching the term or trimming the trade-in.
        </Callout>
      </GuideSection>

      <GuideSection id="fees" n={13} kicker="Costs" title="Fees and add-ons">
        <p>
          Expect title and registration fees set by your state and a dealer documentation fee, which some states cap and others do not. Add-ons
          such as extended warranties, GAP insurance, paint protection and service contracts are optional. If they are financed, you pay interest
          on them too.
        </p>
        <p>
          GAP insurance can make sense if you put little down or take a long loan, because it covers the gap between the loan and the
          car&rsquo;s value if it is written off. It is often cheaper from your own auto insurer than from the dealer.
        </p>
      </GuideSection>

      <GuideSection id="upfront" n={14} kicker="Costs" title="Paying tax and fees upfront">
        <p>
          If you pay the sales tax and fees in cash instead of financing them, the example loan falls to {usd(25_000)}, the payment to $497.39
          and the interest to {usd(4_844)}, saving {usd(548)} of interest. You pay {usd(6_830)} at signing instead of {usd(4_000)}. Turn off
          &quot;Add tax and fees to the loan&quot; under More options to compare.
        </p>
      </GuideSection>

      <GuideSection id="deduction" n={15} kicker="Tax" title="The car loan interest deduction">
        <p>
          The One Big Beautiful Bill Act created a deduction for interest on car loans for the tax years 2025 through 2028. You can take it
          whether or not you itemize, on the new Schedule 1-A. The IRS rules:
        </p>
        <ul>
          <li>Up to <strong>$10,000</strong>{" "}of interest a year.</li>
          <li>The loan must be taken out after December 31, 2024, to buy a <strong>new</strong>{" "}vehicle for <strong>personal use</strong>, secured by the vehicle. Leases and used cars do not qualify.</li>
          <li>The vehicle&rsquo;s <strong>final assembly must be in the United States</strong>. The window sticker or the VIN shows the plant; NHTSA&rsquo;s VIN decoder can check it.</li>
          <li>Cars, minivans, vans, SUVs, pickups and motorcycles under 14,000 pounds gross vehicle weight.</li>
          <li>The limit falls by $200 for each $1,000 of modified AGI over $100,000 ($200,000 for joint filers), and is gone at $150,000 ($250,000).</li>
          <li>You must give the VIN on your return. Lenders report the interest on the new Form 1098-VLI.</li>
        </ul>
        <DataTable
          caption="Deduction limit by modified AGI (single filers)"
          head={["Modified AGI", "Most you can deduct"]}
          numeric={[1]}
          rows={[
            ["$100,000 or less", "$10,000"],
            ["$120,000", "$6,000"],
            ["$135,000", "$3,000"],
            ["$150,000 or more", "$0"],
          ]}
        />
        <p>
          On the example loan, first-year interest is {usd(1_848)}. In the 22% bracket, deducting it saves about $407 of federal tax. Turn on the
          switch under More options to see your figure.
        </p>
      </GuideSection>

      <GuideSection id="affordable" n={16} kicker="Budget" title="How much car you can afford">
        <p>
          A common rule of thumb is to keep the car payment under about 10% to 15% of your take-home pay and all car costs, including insurance,
          fuel and maintenance, under about 20%. Lenders also look at your debt-to-income ratio. The{" "}
          <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows how a new payment changes it, and the{" "}
          <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}gives your take-home pay.
        </p>
      </GuideSection>

      <GuideSection id="early" n={17} kicker="After you buy" title="Paying off early and refinancing">
        <p>
          Most auto loans have no prepayment penalty, but check your contract. Extra payments go to principal and cut the interest. If rates fall
          or your credit improves, refinancing can lower the rate; a refinanced loan for a qualifying car can still count for the interest
          deduction. Avoid refinancing into a longer term just to lower the payment. The general{" "}
          <a href="/us/loans/loan-calculator">loan calculator</a>{" "}shows the effect of extra payments on any fixed loan.
        </p>
      </GuideSection>

      <GuideSection id="used" n={18} kicker="Choices" title="New or used">
        <p>
          A used car costs less and has already taken its steepest drop in value, but used car loans usually carry higher rates and shorter terms.
          New cars may come with low promotional rates and qualify for the interest deduction if assembled in the US. Compare the total cost of
          ownership over the years you plan to keep the car, not only the payment.
        </p>
      </GuideSection>

      <GuideSection id="lease" n={19} kicker="Choices" title="Buying or leasing">
        <p>
          A lease is a long rental: payments are lower because you pay for the car&rsquo;s expected loss in value plus a finance charge, then
          hand it back. Leases suit people who want a new car every few years and drive within the mileage limit. Buying costs more each month but
          you own the car once the loan is paid, and lease payments do not qualify for the interest deduction.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Shopping by monthly payment instead of price and total cost.</li>
          <li>Taking an 84-month loan without seeing the extra interest.</li>
          <li>Rolling negative equity into a new loan.</li>
          <li>Accepting the first rate offered without a preapproval.</li>
          <li>Forgetting sales tax, title and registration in the budget.</li>
          <li>Buying add-ons you did not ask for: read every line of the contract before signing.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average 72-month new car rate at banks (Fed G.19, August 2026)", "about 7.2%"],
            ["Car loan interest deduction, 2025 to 2028", "Up to $10,000 a year"],
            ["Deduction phase-out starts (single / joint)", "$100,000 / $200,000 MAGI"],
            ["Deduction gone at (single / joint)", "$150,000 / $250,000 MAGI"],
            ["States with no trade-in tax credit", "Including California, Hawaii and Virginia"],
            ["Example payment: $27,830 at 7.2% for 60 months", "$553.70"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

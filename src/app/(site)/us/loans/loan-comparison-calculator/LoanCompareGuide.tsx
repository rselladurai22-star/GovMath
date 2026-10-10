import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Loan comparison guide. Figures from src/lib/us/loan-math.ts (offer, breakEvenMonth). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "measures", title: "Four ways to measure a loan" },
  { id: "example", title: "Three offers compared" },
  { id: "total-cost", title: "Total cost: the bottom line" },
  { id: "apr", title: "What APR tells you, and what it hides" },
  { id: "break-even", title: "The break-even month" },
  { id: "break-even-how", title: "How the break-even is worked out" },
  { id: "early", title: "If you might repay early" },
  { id: "term", title: "Same rate, different terms" },
  { id: "payment", title: "The payment trap" },
  { id: "financed", title: "Fees paid upfront or added on" },
  { id: "mortgages", title: "Comparing mortgage offers" },
  { id: "other-terms", title: "Terms that do not show in the numbers" },
  { id: "shopping", title: "Shopping without hurting your credit" },
  { id: "disclosures", title: "Using the lenders' disclosures" },
  { id: "consolidation", title: "Comparing a new loan with your current debt" },
  { id: "checklist", title: "A comparison checklist" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: Interest rate vs APR", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" },
  { label: "CFPB: Loan Estimate explainer", href: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/" },
  { label: "CFPB: What exactly happens when a mortgage lender checks my credit?", href: "https://www.consumerfinance.gov/ask-cfpb/what-exactly-happens-when-a-mortgage-lender-checks-my-credit-en-2005/" },
  { label: "CFPB: Regulation Z, 12 CFR 1026.18 (closed-end credit disclosures)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/18/" },
  { label: "AnnualCreditReport.com: free credit reports", href: "https://www.annualcreditreport.com/" },
];

export default function LoanCompareGuide() {
  return (
    <Guide
      kicker="The loan comparison guide"
      title="How to tell which loan is really cheaper"
      intro={
        <>
          Loan offers rarely line up neatly. One has a lower rate but a fee; another has no fee but a higher rate; a third is shorter with a bigger payment. This guide shows how to
          compare them fairly: total cost, APR, payment and the break-even month that tells you whether paying a fee for a lower rate is worth it for you.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Compare total cost (all interest plus all fees) over the time you expect to keep the loan.</li>
          <li>On $20,000, a 5-year loan at 8% with an $800 fee costs $5,132; at 10% with no fee, $5,496.</li>
          <li>But the fee only pays off if you keep the 8% loan at least 29 months.</li>
          <li>A 4-year loan at 9% with a $400 fee costs least of all, $4,290, though its payment is the highest.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$4,290", label: "Cheapest of three $20,000 offers (9%, 48 months, $400 fee)" },
            { value: "29 months", label: "Break-even: 8% + $800 fee vs 10% with no fee" },
            { value: "$1,530", label: "Extra interest from stretching $20,000 at 7% from 3 to 5 years" },
            { value: "48 months", label: "Break-even on 2 mortgage points in our example" },
          ]}
        />
      </GuideSection>

      <GuideSection id="measures" n={2} kicker="Basics" title="Four ways to measure a loan">
        <DataTable
          head={["Measure", "What it tells you", "Watch out for"]}
          rows={[
            ["Monthly payment", "Whether it fits your budget", "Longer terms lower it but cost more"],
            ["Total cost", "Interest plus fees in dollars", "Assumes you keep the loan to the end"],
            ["APR", "Yearly cost including fees", "Only fair between loans of the same term"],
            ["Break-even", "How long a fee takes to pay off", "Only matters when fees differ"],
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="Three offers compared">
        <p>Three lenders offer the $20,000 you need:</p>
        <DataTable
          caption="$20,000, fees paid upfront"
          head={["", "Offer A", "Offer B", "Offer C"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Rate", "8%", "10%", "9%"],
            ["Term", "60 months", "60 months", "48 months"],
            ["Fees", "$800", "$0", "$400"],
            ["Monthly payment", "$405.53", "$424.94", "$497.70"],
            ["Total interest", "$4,332", "$5,496", "$3,890"],
            ["APR with fees", "9.74%", "10.00%", "10.06%"],
            ["Total cost", "$5,132", "$5,496", "$4,290"],
          ]}
        />
        <p>
          Offer C has the highest APR and the highest payment, yet it is the cheapest in dollars because you pay interest for one year less. Offer A has the lowest APR and the
          lowest payment, and costs $365 less than Offer B over five years.
        </p>
      </GuideSection>

      <GuideSection id="total-cost" n={4} kicker="The bottom line" title="Total cost: the bottom line">
        <Bars
          format={(n) => "$" + Math.round(n).toLocaleString("en-US")}
          items={[
            { label: "Offer C: 9%, 48 months, $400", value: 4_290 },
            { label: "Offer A: 8%, 60 months, $800", value: 5_132 },
            { label: "Offer B: 10%, 60 months, no fee", value: 5_496 },
          ]}
        />
        <p>
          Total cost is the clearest single number when you will keep the loan to the end, because it is in dollars and includes everything. It is not the whole story when
          payments differ: a shorter loan takes more of your budget each month, which may push other costs onto a credit card.
        </p>
      </GuideSection>

      <GuideSection id="apr" n={5} kicker="APR" title="What APR tells you, and what it hides">
        <p>
          The APR turns fees into a yearly rate, so it is the fairest single figure for loans with the <em>same term</em>. Between different terms it can point the wrong way, as
          Offer C shows. It also assumes you make every payment to the end; if you repay early, a loan with high fees costs more than its APR suggests. Our{" "}
          <a href="/us/loans/apr-calculator">APR calculator</a>{" "}shows how the APR is worked out and what it becomes if you pay off early.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={6} kicker="Break-even" title="The break-even month">
        <p>
          When one offer charges a fee to get a lower rate, it starts behind: you pay the fee on day one. Each month after that, its lower rate means less interest, so it gradually
          catches up. The break-even month is when the interest saved has paid back the extra fee.
        </p>
        <WorkedExample
          title="Offer A (8%, $800 fee) against Offer B (10%, no fee)"
          steps={[
            { label: "Cost after 6 months", note: "fees + interest so far", value: "A $1,573, B $967" },
            { label: "Cost after 12 months", value: "A $2,278, B $1,854" },
            { label: "Cost after 24 months", value: "A $3,474, B $3,368" },
            { label: "Cost after 36 months", value: "A $4,365, B $4,507" },
          ]}
          total={{ label: "Offer A becomes cheaper from", value: "month 29" }}
        />
        <p>
          Offer C against Offer B breaks even at month 20. Offer A never catches Offer C: C&rsquo;s shorter term means it is always cheaper so far, at every point while both loans
          run.
        </p>
      </GuideSection>

      <GuideSection id="break-even-how" n={7} kicker="The maths" title="How the break-even is worked out">
        <p>
          Some calculators divide the fee by the monthly payment saving. That is quick but ignores the fact that a lower rate also pays the balance down faster. This calculator
          instead tracks the real cost so far, fees plus every month&rsquo;s interest, for each offer, and finds the first month the dearer-upfront offer has cost no more than the
          other. That is exactly what you would have paid if you repaid the loan in full at that point.
        </p>
      </GuideSection>

      <GuideSection id="early" n={8} kicker="Paying off early" title="If you might repay early">
        <p>
          People pay off loans early more often than they expect: a bonus, a sale, a refinance. If there is a real chance you will repay before the break-even month, the no-fee
          offer is safer. The chart and table under &quot;If you pay off early&quot; show each offer&rsquo;s cost at every point, so you can read off the answer for your own plans.
          Check too that neither loan has a prepayment penalty.
        </p>
      </GuideSection>

      <GuideSection id="term" n={9} kicker="Term" title="Same rate, different terms">
        <CompareCards
          columns={[
            {
              name: "36 months at 7%",
              rows: [
                { label: "Payment", value: "$617.54" },
                { label: "Total interest", value: "$2,232" },
              ],
            },
            {
              name: "60 months at 7%",
              rows: [
                { label: "Payment", value: "$396.02" },
                { label: "Total interest", value: "$3,761" },
              ],
            },
          ]}
        />
        <p>
          On $20,000, two extra years cut the payment by $221.52 but add $1,530 of interest. In real offers the longer term usually comes with a higher rate too, which widens the
          gap.
        </p>
      </GuideSection>

      <GuideSection id="payment" n={10} kicker="Pitfalls" title="The payment trap">
        <p>
          Sellers of cars, furniture and home improvements often ask &quot;what payment are you comfortable with?&quot; and then stretch the term to hit it. The payment fits, but
          the total cost balloons. Decide on the amount and the shortest term you can afford first, then compare offers on total cost. Our{" "}
          <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}adds sales tax and a trade-in for car deals.
        </p>
        <Callout tone="warn" title="Watch for add-ons">
          Credit insurance, service contracts and GAP coverage are sometimes added into the loan amount. They raise the payment and you pay interest on them. Ask for each to be
          shown separately and decide on it alone.
        </Callout>
      </GuideSection>

      <GuideSection id="financed" n={11} kicker="Fees" title="Fees paid upfront or added on">
        <p>
          Many lenders let you add the fee to the loan instead of paying it in cash. You then pay interest on the fee for the whole term. Offer A with its $800 fee added to the loan
          has a payment of $421.75 and a total cost of $5,305, against $5,132 with the fee paid upfront, and it takes until month 37 to beat Offer B. Turn on &quot;add the fees to
          the loan&quot; under More options to compare.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={12} kicker="Mortgages" title="Comparing mortgage offers">
        <p>
          Mortgage lenders often give a choice of rates with different points. On a $300,000, 30-year loan, compare 6.5% with no points against 6% with 2 points ($6,000):
        </p>
        <DataTable
          head={["", "6.5%, no points", "6%, 2 points"]}
          numeric={[1, 2]}
          rows={[
            ["Monthly payment", "$1,896.20", "$1,798.65"],
            ["APR", "6.50%", "6.19%"],
            ["Interest and fees over 30 years", "$382,633", "$353,515"],
            ["Points pay off after", "–", "48 months"],
          ]}
        />
        <p>
          Over the full term the points save about $29,000, but only if you keep the loan more than four years. Compare the Loan Estimates&rsquo; page 3 &quot;In 5 Years&quot; figures
          as well, and see our <a href="/us/housing/mortgage-points-calculator">mortgage points calculator</a>{" "}and <a href="/us/housing/refinance-calculator">refinance calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="other-terms" n={13} kicker="Small print" title="Terms that do not show in the numbers">
        <ul>
          <li>
            <strong>Prepayment penalties</strong>: rare on personal and car loans, but check.
          </li>
          <li>
            <strong>Fixed or variable rate</strong>: a variable rate can rise after you sign.
          </li>
          <li>
            <strong>Late fees and grace days</strong> before a payment counts as late.
          </li>
          <li>
            <strong>Hardship options</strong>: some lenders let you defer payments if you lose your job.
          </li>
          <li>
            <strong>Autopay discounts</strong>, often a quarter of a percentage point. Enter the discounted rate if you will use autopay.
          </li>
          <li>
            <strong>Speed and service</strong>: how quickly the money arrives and how easy the lender is to deal with.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="shopping" n={14} kicker="Credit" title="Shopping without hurting your credit">
        <p>
          Many lenders show a rate after a soft credit check, which does not affect your score. When you formally apply, a hard inquiry is recorded. Credit scoring models count
          several inquiries for the same kind of loan (a mortgage, a car loan) within a short window as one, so do your rate shopping within a couple of weeks. Check your free
          credit reports at AnnualCreditReport.com before you start, and dispute any errors.
        </p>
      </GuideSection>

      <GuideSection id="disclosures" n={15} kicker="Paperwork" title="Using the lenders' disclosures">
        <p>
          For consumer loans, the Truth in Lending disclosure shows the APR, the finance charge, the amount financed and the total of payments, worked out the same way by every
          lender. For most mortgages, the three-page Loan Estimate uses a standard layout so you can line up pages side by side. Enter the rate, term and fees from each into the
          calculator to check the figures and see the break-even, which the forms do not show.
        </p>
      </GuideSection>

      <GuideSection id="consolidation" n={16} kicker="Consolidation" title="Comparing a new loan with your current debt">
        <p>
          You can also use the calculator to compare taking a new loan with keeping what you have. Enter your current balance as the amount, your current rate and remaining months
          as one offer with no fees, and the new loan as the other. If the new loan&rsquo;s break-even is longer than you will keep it, staying put is cheaper. For several card
          balances, our <a href="/us/loans/debt-consolidation-calculator">debt consolidation calculator</a>{" "}is built for the job.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={17} kicker="Checklist" title="A comparison checklist">
        <ol>
          <li>Get at least three quotes for the same amount, ideally on the same day.</li>
          <li>Write down each rate, term and every fee.</li>
          <li>Compare total cost over the time you really expect to keep the loan.</li>
          <li>If fees differ, check the break-even month.</li>
          <li>Make sure the payment leaves room in your budget.</li>
          <li>Read the small print on prepayment, late fees and rate changes.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator">
        <p>
          Enter the amount you need, then each offer&rsquo;s rate, term in months and upfront fees. Under More options, add a third offer and choose whether each offer&rsquo;s
          fees are added to the loan. The results name the cheapest offer, set every figure side by side, chart each offer&rsquo;s cost if you repay early, and give the break-even
          month for every pair where one has higher fees.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["$20,000 at 8%, 60 months, $800 fee", "$405.53 a month, $5,132 total cost"],
            ["$20,000 at 10%, 60 months, no fee", "$424.94 a month, $5,496 total cost"],
            ["$20,000 at 9%, 48 months, $400 fee", "$497.70 a month, $4,290 total cost"],
            ["Break-even, 8% + $800 vs 10%", "29 months"],
            ["$300,000 mortgage, 6% + 2 points vs 6.5%", "breaks even at 48 months"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

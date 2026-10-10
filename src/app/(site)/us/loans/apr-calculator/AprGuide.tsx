import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** APR calculator guide. Figures from src/lib/us/loan-math.ts (trueApr, aprFromPayment, aprIfRepaidEarly) and src/lib/us/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What APR measures" },
  { id: "law", title: "The law behind it" },
  { id: "method", title: "How the APR is worked out" },
  { id: "example", title: "A mortgage example" },
  { id: "finance-charges", title: "Which fees count" },
  { id: "left-out", title: "What the APR leaves out" },
  { id: "points", title: "Discount points" },
  { id: "early", title: "If you pay off early" },
  { id: "term", title: "Why short loans show bigger gaps" },
  { id: "financed", title: "Fees paid or added to the loan" },
  { id: "payment", title: "APR from a quoted payment" },
  { id: "personal", title: "Personal loans" },
  { id: "tila-box", title: "Reading the Truth in Lending box" },
  { id: "loan-estimate", title: "APR on a Loan Estimate" },
  { id: "tolerance", title: "How accurate the APR must be" },
  { id: "apy", title: "APR and APY" },
  { id: "cards", title: "Credit card APRs" },
  { id: "variable", title: "Adjustable rates" },
  { id: "compare", title: "Using APR to compare offers" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: Regulation Z, 12 CFR 1026.22 Determination of annual percentage rate", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/22/" },
  { label: "CFPB: Regulation Z, 12 CFR 1026.4 Finance charge", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/4/" },
  { label: "CFPB: Regulation Z, Appendix J (annual percentage rate computations)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/j/" },
  { label: "CFPB: What is the difference between a mortgage interest rate and an APR?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" },
  { label: "CFPB: What are discount points?", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-discount-points-and-lender-credits-and-how-do-they-work-en-136/" },
  { label: "CFPB: Loan Estimate explainer", href: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/" },
];

export default function AprGuide() {
  return (
    <Guide
      kicker="The APR guide"
      title="How APR turns fees into a yearly rate"
      intro={
        <>
          Two loans with the same interest rate can cost very different amounts once points and fees are counted. The annual percentage rate folds those costs into one yearly
          figure. This guide shows exactly how lenders work it out under the Truth in Lending Act, which fees count, how to work back from a quoted payment, and why the APR can
          still mislead you if you pay a loan off early.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The APR is the rate at which your payments would repay only the money you actually get to use, after points and fees.</li>
          <li>A $300,000, 30-year mortgage at 6.25% with 1 point and $3,000 of lender fees has an APR of about 6.442%.</li>
          <li>Sell or refinance after 5 years and the same loan really cost about 6.736% a year.</li>
          <li>A payment of $520 a month for 60 months on $25,000 is an APR of about 9.09%.</li>
        </ul>
        <KeyStats
          items={[
            { value: "6.442%", label: "APR: $300,000 at 6.25%, 1 point + $3,000 fees" },
            { value: "$1,847.15", label: "Its monthly payment (principal and interest)" },
            { value: "6.736%", label: "Real yearly cost if repaid after 5 years" },
            { value: "0.125", label: "Points of APR error a lender is allowed (regular loans)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What APR measures">
        <p>
          The interest rate on a loan, often called the note rate, sets your monthly payment. But lenders also charge to set the loan up: discount points, origination fees,
          underwriting fees and so on. Those fees mean you walk away with less money than the loan amount, while you still repay the full amount with interest.
        </p>
        <p>
          The APR answers a simple question: if there were no fees at all, what interest rate would give you the same payments on the smaller sum you really received? Because
          every lender must use the same method, the APR lets you line up offers that split their charges differently between rate and fees.
        </p>
      </GuideSection>

      <GuideSection id="law" n={3} kicker="The rules" title="The law behind it">
        <p>
          The Truth in Lending Act (TILA) of 1968 and its rule book, Regulation Z, require lenders to disclose the APR for consumer credit before you are committed. Section
          1026.22 says how to work it out, and Appendix J gives the formulas. The Consumer Financial Protection Bureau writes and enforces the rule today. Business loans are
          outside TILA, which is why commercial lenders often quote factor rates or add-on rates instead; see our <a href="/us/loans/business-loan-calculator">business loan calculator</a>{" "}
          for turning those into an APR.
        </p>
      </GuideSection>

      <GuideSection id="method" n={4} kicker="The maths" title="How the APR is worked out">
        <p>Regulation Z uses the actuarial method. For a loan with one advance and equal monthly payments it comes down to three steps:</p>
        <ol>
          <li>
            Work out the <strong>amount financed</strong>: the loan amount minus any prepaid finance charges (points and fees paid at closing or taken from the loan).
          </li>
          <li>Find the monthly rate <em>i</em>{" "}at which the present value of all your payments equals the amount financed: Amount financed = Payment × (1 − (1 + i)<sup>−n</sup>) ÷ i.</li>
          <li>Multiply <em>i</em>{" "}by 12. That is the APR. It is not compounded.</li>
        </ol>
        <p>
          There is no neat formula for step 2, so lenders and this calculator solve it by trial, narrowing the rate until the payments match to a fraction of a cent.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Worked example" title="A mortgage example">
        <WorkedExample
          title="$300,000 over 30 years at 6.25%, 1 point and $3,000 of lender fees"
          steps={[
            { label: "Monthly payment on $300,000", note: "6.25% ÷ 12 a month, 360 payments", value: "$1,847.15" },
            { label: "Discount point", note: "1% of the loan", value: "$3,000" },
            { label: "Lender fees", note: "origination, underwriting, processing", value: "$3,000" },
            { label: "Amount financed", note: "$300,000 − $6,000", value: "$294,000" },
            { label: "Rate at which $1,847.15 × 360 repays $294,000", value: "0.5368% a month" },
          ]}
          total={{ label: "APR (monthly rate × 12)", value: "6.442%" }}
        />
        <p>
          Over the full term you pay $664,974.58: $300,000 of principal, $364,974.58 of interest and, on top, the $6,000 of points and fees. The finance charge, interest plus
          fees, is $370,974.58. Our <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}adds property tax, insurance and PMI to the payment.
        </p>
      </GuideSection>

      <GuideSection id="finance-charges" n={6} kicker="Fees" title="Which fees count">
        <p>
          Regulation Z section 1026.4 defines a finance charge as any charge you pay as a condition of getting the credit, which you would not pay in a cash deal. In practice
          that includes:
        </p>
        <ul>
          <li>discount points and origination points;</li>
          <li>origination, underwriting and processing fees charged by the lender;</li>
          <li>mortgage broker fees;</li>
          <li>prepaid interest from closing to the end of the month;</li>
          <li>mortgage insurance premiums the lender requires, including FHA mortgage insurance.</li>
        </ul>
        <p>Enter all of these in &quot;Lender fees in the APR&quot;, apart from points, which have their own field.</p>
      </GuideSection>

      <GuideSection id="left-out" n={7} kicker="Fees" title="What the APR leaves out">
        <p>
          On a loan secured by real estate, some closing costs are not finance charges even though you must pay them: appraisal and credit report fees, title insurance and
          title examination, inspections, document preparation and notary fees, recording fees and transfer taxes, and money set aside in escrow for taxes and
          insurance. Application fees charged to every applicant, approved or not, are not finance charges on any loan. Late fees and prepayment penalties are also left out because they depend on what you do later.
        </p>
        <Callout title="The APR is not the whole cost">
          A loan with a low APR can still need a lot of cash at closing. Add those other costs under More options to see your total cash at closing, and use our{" "}
          <a href="/us/housing/closing-cost-calculator">closing cost calculator</a>{" "}for the full list.
        </Callout>
      </GuideSection>

      <GuideSection id="points" n={8} kicker="Mortgages" title="Discount points">
        <p>
          A discount point is 1% of the loan amount paid at closing to lower the rate. How much each point buys varies by lender and by day; a quarter of a percentage point per
          point is a common rule of thumb, and it is what this table assumes on a $300,000, 30-year loan with no other fees.
        </p>
        <DataTable
          caption="$300,000 over 30 years, no other fees"
          head={["Points", "Rate", "Payment", "APR", "Saving a month", "Months to earn back"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["None", "6.500%", "$1,896.20", "6.500%", "–", "–"],
            ["0.5 ($1,500)", "6.375%", "$1,871.61", "6.423%", "$24.59", "61"],
            ["1 ($3,000)", "6.250%", "$1,847.15", "6.345%", "$49.05", "61"],
            ["2 ($6,000)", "6.000%", "$1,798.65", "6.189%", "$97.55", "62"],
          ]}
        />
        <p>
          The APR falls as you buy points, because over 30 years the lower rate outweighs the fee. But the saving only arrives month by month: you need to keep the loan for
          about five years just to get the points back. Our <a href="/us/housing/mortgage-points-calculator">mortgage points calculator</a>{" "}looks at that decision in detail.
        </p>
      </GuideSection>

      <GuideSection id="early" n={9} kicker="The catch" title="If you pay off early">
        <p>
          The disclosed APR assumes you make every payment for the full term. Few people do: homes are sold and loans refinanced long before 30 years. When the loan ends early,
          the fees were spread over fewer years, so the real yearly cost is higher.
        </p>
        <Bars
          format={(n) => `${n.toFixed(3)}%`}
          items={[
            { label: "Paid off in 3 years", value: 7.004 },
            { label: "5 years", value: 6.736 },
            { label: "7 years", value: 6.623 },
            { label: "10 years", value: 6.541 },
            { label: "15 years", value: 6.481 },
            { label: "Full 30 years", value: 6.442 },
          ]}
        />
        <p>
          Same $300,000 loan at 6.25% with $6,000 of points and fees. If you expect to move within a few years, a no-point loan at a slightly higher rate is often cheaper even
          though its APR looks worse. Set &quot;Years you expect to keep the loan&quot; to see your own figure.
        </p>
      </GuideSection>

      <GuideSection id="term" n={10} kicker="Term" title="Why short loans show bigger gaps">
        <p>
          The same fees push the APR further above the rate on a shorter loan, because they are spread over fewer payments. With 1 point and $3,000 of fees on $300,000 at
          6.25%, the APR is 6.442% over 30 years but 6.569% over 15 years, where the payment is $2,572.27. That is one reason to compare APRs only between loans of the same
          term.
        </p>
      </GuideSection>

      <GuideSection id="financed" n={11} kicker="Fees" title="Fees paid or added to the loan">
        <CompareCards
          columns={[
            {
              name: "Paid at closing",
              rows: [
                { label: "Loan", value: "$300,000" },
                { label: "Cash for points and fees", value: "$6,000" },
                { label: "Payment", value: "$1,847.15" },
                { label: "APR", value: "6.442%" },
              ],
            },
            {
              name: "Added to the loan",
              rows: [
                { label: "Loan", value: "$306,000" },
                { label: "Cash for points and fees", value: "$0" },
                { label: "Payment", value: "$1,884.09" },
                { label: "APR", value: "6.439%" },
              ],
            },
          ]}
        />
        <p>
          The APR barely moves, because either way you pay $6,000 of fees to get $300,000. What changes is cash: rolling the fees in saves money at closing but adds $36.94 to
          every payment and means paying interest on the fees for years.
        </p>
      </GuideSection>

      <GuideSection id="payment" n={12} kicker="Car dealers and quotes" title="APR from a quoted payment">
        <p>
          Some sellers quote only a monthly payment. Choose &quot;The monthly payment&quot; and the calculator works backwards: first the rate that payment implies on the loan
          amount, then the APR once any fees are taken off.
        </p>
        <DataTable
          caption="$25,000 financed, no extra fees"
          head={["Quote", "Total repaid", "APR"]}
          numeric={[1, 2]}
          rows={[
            ["$520 a month for 60 months", "$31,200", "9.09%"],
            ["$499 a month for 72 months", "$35,928", "12.78%"],
          ]}
        />
        <p>
          The lower payment is the far dearer loan. Always ask for the APR and the term, not just the payment. Our <a href="/us/loans/auto-loan-calculator">auto loan calculator</a>{" "}
          adds sales tax, dealer fees and a trade-in.
        </p>
      </GuideSection>

      <GuideSection id="personal" n={13} kicker="Personal loans" title="Personal loans">
        <p>
          Personal loans often carry an origination fee of a few percent, usually taken out of the money you receive. On $10,000 at 10% over 36 months, a $500 fee taken from the
          loan leaves you $9,500 and the APR is about 13.56%, with a payment of $322.67. Added to the loan instead, you borrow $10,500, pay $338.81 a month, and the APR is
          about 13.39%. Either way the fee adds well over three points.
        </p>
      </GuideSection>

      <GuideSection id="tila-box" n={14} kicker="Disclosures" title="Reading the Truth in Lending box">
        <p>For installment loans, the disclosure shows four boxed figures. The calculator gives the same four:</p>
        <ul>
          <li>
            <strong>Annual percentage rate</strong>: the cost of your credit as a yearly rate.
          </li>
          <li>
            <strong>Finance charge</strong>: the dollar amount the credit will cost you, interest plus points and fees.
          </li>
          <li>
            <strong>Amount financed</strong>: the credit provided to you or on your behalf.
          </li>
          <li>
            <strong>Total of payments</strong>: what you will have paid after making every scheduled payment.
          </li>
        </ul>
        <p>Total of payments minus amount financed equals the finance charge, which is a quick way to check any disclosure.</p>
      </GuideSection>

      <GuideSection id="loan-estimate" n={15} kicker="Mortgages" title="APR on a Loan Estimate">
        <p>
          For most mortgages you get a three-page Loan Estimate within three business days of applying. The APR is on page 3 under &quot;Comparisons&quot;, next to the Total
          Interest Percentage and the &quot;In 5 Years&quot; figure, which shows what you will have paid and how much principal you will have paid off after five years. That
          five-year figure is the best quick check for the early-payoff problem above. At closing, the Closing Disclosure repeats the APR; if it rises by more than the allowed
          tolerance, the lender must give you three more business days before you close.
        </p>
      </GuideSection>

      <GuideSection id="tolerance" n={16} kicker="Accuracy" title="How accurate the APR must be">
        <p>
          A disclosed APR is treated as accurate if it is within one-eighth of a percentage point (0.125) of the true APR on a regular loan, or a quarter of a point on an
          irregular one, such as a construction loan or a loan with uneven payments. Small differences from your paperwork usually come from the exact first payment date and the
          days of prepaid interest, which this calculator does not model.
        </p>
      </GuideSection>

      <GuideSection id="apy" n={17} kicker="Rates" title="APR and APY">
        <p>
          APR is a simple rate: the monthly rate times 12. APY, the annual percentage yield used for savings accounts and CDs, includes compounding. A loan at 12% APR charges 1%
          a month, which compounds to about 12.68% over a year if nothing is paid. Lenders quote APR and banks quote APY, so each side shows the friendlier-looking number.
        </p>
      </GuideSection>

      <GuideSection id="cards" n={18} kicker="Credit cards" title="Credit card APRs">
        <p>
          On a credit card, the APR is the yearly interest rate, and the card charges a daily rate of APR ÷ 365 on your balance. Annual fees, balance transfer fees and cash
          advance fees are not folded into the card&rsquo;s APR, so a card with a high fee can cost more than its APR suggests. Our{" "}
          <a href="/us/loans/credit-card-interest-calculator">credit card interest calculator</a>{" "}shows a month&rsquo;s interest from your statement.
        </p>
      </GuideSection>

      <GuideSection id="variable" n={19} kicker="Rates" title="Adjustable rates">
        <p>
          For an adjustable-rate mortgage, the disclosed APR uses the starting rate for the fixed period and the fully indexed rate (today&rsquo;s index plus the margin) after it.
          If the index rises, your real cost will be higher. This calculator assumes a fixed rate; for an ARM, try the rate you would pay after the first adjustment to see a
          worse case.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={20} kicker="Shopping" title="Using APR to compare offers">
        <ol>
          <li>Compare loans with the same amount and term. A 15-year APR and a 30-year APR are not like for like.</li>
          <li>Get quotes on the same day, since mortgage pricing changes daily.</li>
          <li>Ask what each fee is and whether it is in the APR.</li>
          <li>Think about how long you will keep the loan. If it is less than the break-even on the points, lean toward fewer fees.</li>
          <li>Look at the cash you need at closing as well as the APR.</li>
        </ol>
        <p>
          To set two or three offers side by side with their break-even month, use our <a href="/us/loans/loan-comparison-calculator">loan comparison calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="using" n={21} kicker="How to use it" title="Using the calculator">
        <p>
          Choose whether you know the rate or only the payment. Enter the loan amount, the term, any discount points and the lender fees that count as finance charges. Under More
          options, say whether the fees are paid at closing or rolled into the loan, how long you expect to keep it, and any other closing costs. The results give the APR, the
          four Truth in Lending figures, the APR if you repay early, your cash at closing and a yearly schedule.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["APR accuracy tolerance, regular loan (Reg Z 1026.22)", "0.125 percentage point"],
            ["APR accuracy tolerance, irregular loan", "0.25 percentage point"],
            ["One discount point", "1% of the loan amount"],
            ["$300,000, 30 years, 6.25%, 1 point + $3,000 fees", "APR 6.442%"],
            ["Same loan repaid after 5 years", "6.736% a year"],
            ["$25,000 at $520 a month for 60 months", "APR 9.09%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

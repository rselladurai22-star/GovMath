import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Loan calculator guide. Figures from src/lib/us/loans.ts and src/lib/us/housing-loans-extra.ts (loanWithFee). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How a fixed loan works" },
  { id: "formula", title: "The payment formula" },
  { id: "example", title: "A worked example" },
  { id: "amortization", title: "Where each payment goes" },
  { id: "term", title: "Shorter vs longer terms" },
  { id: "rate", title: "What the rate does" },
  { id: "rates-now", title: "Typical rates in 2026" },
  { id: "fees", title: "Origination fees" },
  { id: "apr", title: "Rate vs APR" },
  { id: "fee-term", title: "Why fees hurt short loans most" },
  { id: "deducted", title: "Fee taken out or added on" },
  { id: "extra", title: "Paying extra" },
  { id: "credit", title: "Your credit score and the rate" },
  { id: "types", title: "Kinds of fixed loans" },
  { id: "compare", title: "Comparing offers" },
  { id: "warning", title: "Loans to be careful with" },
  { id: "using", title: "Using the calculator well" },
  { id: "secured", title: "Secured and unsecured loans" },
  { id: "cosigner", title: "Cosigners" },
  { id: "variable", title: "Fixed and variable rates" },
  { id: "missed", title: "If you miss a payment" },
  { id: "payoff", title: "Paying a loan off in full" },
  { id: "decide", title: "How lenders decide" },
  { id: "budget", title: "Fitting the payment into your budget" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Federal Reserve: Consumer Credit (G.19), interest rates", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "CFPB: Interest rate vs APR", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" },
  { label: "CFPB: What is amortization?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-amortization-and-how-could-it-affect-my-loan-en-1943/" },
  { label: "CFPB: What is a debt-to-income ratio?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" },
  { label: "AnnualCreditReport.com: free credit reports", href: "https://www.annualcreditreport.com/" },
];

export default function LoanGuide() {
  return (
    <Guide
      kicker="The loan guide"
      title="How fixed loans, interest and fees work"
      intro={
        <>
          Personal loans, car loans, student loans and mortgages all use the same maths: a fixed rate, a fixed term and equal monthly payments. This guide shows how the payment is
          worked out, where each dollar goes, how much the term and rate matter, and how an origination fee raises the true cost of borrowing.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>{usd(15_000)} at 12% over 3 years costs $498.21 a month and {usd(2_936)} in interest.</li>
          <li>Stretching it to 5 years cuts the payment to $333.67 but raises the interest to {usd(5_020)}.</li>
          <li>A 5% origination fee taken from the loan lifts the true APR from 12% to about 15.6% over 3 years.</li>
          <li>An extra {usd(100)} a month clears the 3-year loan 6 months early and saves {usd(580)}.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$498.21", label: "Monthly payment, $15,000 at 12% for 3 years" },
            { value: usd(2_936), label: "Total interest" },
            { value: "15.61%", label: "True APR with a 5% fee" },
            { value: "about 11.9%", label: "Average bank personal loan rate (Fed, Aug 2026)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How a fixed loan works">
        <p>
          With an installment loan you borrow a lump sum and repay it in equal monthly payments over a set term. Each month the lender charges interest on the balance at one-twelfth
          of the yearly rate. Your payment covers that interest first; the rest reduces the balance. Because the balance falls, the interest falls too, and more of each payment
          goes to principal over time.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={3} kicker="The maths" title="The payment formula">
        <p>
          With loan amount <em>P</em>, monthly rate <em>r</em> (the yearly rate ÷ 12) and <em>n</em> payments:
        </p>
        <p>
          <strong>Payment = P × r ÷ (1 − (1 + r)<sup>−n</sup>)</strong>
        </p>
        <p>
          At 12% a year, <em>r</em> is 1% a month. For {usd(15_000)} over 36 months, the formula gives $498.21. At a 0% rate the payment is just the amount divided by the number of
          payments: {usd(5_000)} over 12 months is $416.67.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$15,000 personal loan at 12% for 36 months"
          steps={[
            { label: "Monthly rate", note: "12% ÷ 12", value: "1%" },
            { label: "Monthly payment", value: "$498.21" },
            { label: "Total of 36 payments", value: usd(17_936) },
            { label: "Less the amount borrowed", value: `−${usd(15_000)}` },
          ]}
          total={{ label: "Total interest", value: usd(2_936) }}
        />
      </GuideSection>

      <GuideSection id="amortization" n={5} kicker="Amortization" title="Where each payment goes">
        <p>
          In the first month, interest is 1% of {usd(15_000)}, which is {usd(150)}, so $348.21 of the payment reduces the balance. By the last month, the interest is just $4.93
          and $493.28 goes to principal. The calculator&rsquo;s schedule shows every month. This is why paying extra early in a loan saves the most: it removes balance that would
          otherwise be charged interest for years.
        </p>
      </GuideSection>

      <GuideSection id="term" n={6} kicker="Term" title="Shorter vs longer terms">
        <DataTable
          caption="$15,000 at 12%"
          head={["Term", "Monthly payment", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["24 months", "$706.10", usd(1_946)],
            ["36 months", "$498.21", usd(2_936)],
            ["48 months", "$395.01", usd(3_960)],
            ["60 months", "$333.67", usd(5_020)],
            ["84 months", "$264.79", usd(7_242)],
          ]}
        />
        <p>
          Going from 3 years to 7 years cuts the payment almost in half but more than doubles the interest. Lenders also often charge a higher rate for longer terms, which widens the
          gap further. Pick the shortest term whose payment fits comfortably in your budget.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={7} kicker="Rate" title="What the rate does">
        <p>On {usd(15_000)} over 36 months, total interest at different rates:</p>
        <Bars
          format={usd}
          items={[
            { label: "8%", value: 1_922 },
            { label: "12%", value: 2_936 },
            { label: "18%", value: 4_522 },
            { label: "24%", value: 6_186 },
            { label: "30%", value: 7_924 },
          ]}
        />
        <p>The monthly payment ranges from $470.05 at 8% to $636.77 at 30%. Your credit score is the biggest factor in which end of the range you get.</p>
      </GuideSection>

      <GuideSection id="rates-now" n={8} kicker="Context" title="Typical rates in 2026">
        <p>
          The Federal Reserve&rsquo;s consumer credit survey put the average rate on 24-month personal loans at commercial banks at about 11.9%, and on 60-month new car loans at
          about 7.5%, in August 2026. Online lenders and credit unions quote a wide range, from single digits for excellent credit to well above 30% for poor credit. For a car,
          our <a href="/us/loans/auto-loan-calculator">auto loan calculator</a> adds sales tax, fees and a trade-in.
        </p>
      </GuideSection>

      <GuideSection id="fees" n={9} kicker="Fees" title="Origination fees">
        <p>
          Some lenders charge an origination fee for setting up the loan, usually a percentage of the amount. For personal loans it is often between about 1% and 10%, depending on
          the lender and your credit; many lenders charge none. The fee is a real cost of borrowing even though it is not called interest.
        </p>
        <DataTable
          caption="$15,000 at 12% for 36 months, fee taken from the money you receive"
          head={["Fee", "You receive", "True APR", "Interest plus fee"]}
          numeric={[1, 2, 3]}
          rows={[
            ["None", usd(15_000), "12.00%", usd(2_936)],
            ["1%", usd(14_850), "12.70%", usd(3_086)],
            ["3%", usd(14_550), "14.13%", usd(3_386)],
            ["5%", usd(14_250), "15.61%", usd(3_686)],
            ["8%", usd(13_800), "17.90%", usd(4_136)],
          ]}
        />
      </GuideSection>

      <GuideSection id="apr" n={10} kicker="APR" title="Rate vs APR">
        <p>
          The interest rate sets the payment. The annual percentage rate (APR) includes required fees as well, expressed as a yearly rate, so it is the fairer way to compare loans.
          Under the federal Truth in Lending Act, lenders must show the APR before you sign. The calculator works it out as the rate at which your payments would exactly repay the
          cash you actually get.
        </p>
        <Callout title="Comparing two offers">
          On {usd(15_000)} over 36 months, a loan at 11% with a 6% fee has a true APR of about 15.3% and costs {usd(3_579)} in interest and fees. A loan at 13% with no fee costs {usd(3_195)}. Compare APRs over the same term, and the total you will repay.
        </Callout>
      </GuideSection>

      <GuideSection id="fee-term" n={11} kicker="Fees" title="Why fees hurt short loans most">
        <p>
          A fee is paid once, so a short loan spreads it over fewer months. A 5% fee on {usd(15_000)} at 12% lifts the APR to 15.61% over 36 months, but to 14.28% over 60 months.
          If you plan to repay a loan early, a fee costs you even more in APR terms than the disclosure shows, because the disclosure assumes you keep the loan for the full term.
        </p>
      </GuideSection>

      <GuideSection id="deducted" n={12} kicker="Fees" title="Fee taken out or added on">
        <CompareCards
          columns={[
            {
              name: "Taken from the loan",
              rows: [
                { label: "You borrow", value: usd(15_000) },
                { label: "You receive", value: usd(14_250) },
                { label: "Payment", value: "$498.21" },
                { label: "True APR", value: "15.61%" },
              ],
            },
            {
              name: "Added to the loan",
              rows: [
                { label: "You borrow", value: usd(15_750) },
                { label: "You receive", value: usd(15_000) },
                { label: "Payment", value: "$523.13" },
                { label: "True APR", value: "15.43%" },
              ],
            },
          ]}
        />
        <p>
          With a 5% fee over 36 months. If the fee is taken out and you need the full {usd(15_000)}, you would have to borrow more, so check which way your lender handles it
          before choosing the amount.
        </p>
      </GuideSection>

      <GuideSection id="extra" n={13} kicker="Paying extra" title="Paying extra">
        <p>
          Extra payments go straight to principal. Adding {usd(100)} a month to the {usd(15_000)} loan at 12% clears it in 30 months instead of 36 and saves {usd(580)} of
          interest. Most personal and auto loans have no prepayment penalty, but check your agreement, and tell the lender to apply extra money to principal rather than to the next
          payment.
        </p>
      </GuideSection>

      <GuideSection id="credit" n={14} kicker="Credit" title="Your credit score and the rate">
        <p>
          Lenders price loans on your credit score, income and existing debts. Before applying, get your free credit reports from AnnualCreditReport.com and dispute any errors.
          Paying down card balances lowers your credit use, which can lift your score quickly. Many lenders let you check your rate with a soft credit check that does not affect your
          score. Our <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a> shows the ratio lenders will see.
        </p>
      </GuideSection>

      <GuideSection id="types" n={15} kicker="Loan types" title="Kinds of fixed loans">
        <ul>
          <li>
            <strong>Personal loans</strong>: unsecured, usually 2 to 7 years, used for anything from debt consolidation to home repairs.
          </li>
          <li>
            <strong>Auto loans</strong>: secured on the car, so rates are lower.
          </li>
          <li>
            <strong>Student loans</strong>: federal loans have fixed rates set each year; private loans vary. See our <a href="/us/loans/student-loan-calculator">student loan calculator</a>.
          </li>
          <li>
            <strong>Mortgages</strong>: the same formula over 15 to 30 years. Use our <a href="/us/housing/mortgage-calculator">mortgage calculator</a> to add taxes and insurance.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="compare" n={16} kicker="Shopping" title="Comparing offers">
        <ol>
          <li>Get quotes from a bank, a credit union and an online lender.</li>
          <li>Compare the APR and the total repaid for the same amount and term.</li>
          <li>Check for origination fees, late fees and prepayment penalties.</li>
          <li>Make sure the payment fits your budget with room to spare.</li>
        </ol>
      </GuideSection>

      <GuideSection id="warning" n={17} kicker="Pitfalls" title="Loans to be careful with">
        <p>
          Payday loans, car title loans and some installment loans aimed at people with poor credit can carry APRs in the hundreds of percent. A short fee-based loan of a few hundred
          dollars can cost more than a year of credit card interest. Before taking one, ask a credit union about small-dollar loans, ask creditors for a payment plan, or speak to a
          nonprofit credit counselor.
        </p>
        <Callout tone="warn" title="Debt consolidation only works if the debt stops growing">
          Moving card balances to a lower-rate loan saves interest, but if the cards fill up again you end up with both. Our{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a> compares the snowball and avalanche methods.
        </Callout>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator well">
        <p>
          Enter the amount, the interest rate before fees and the term in years or months. Add any origination fee to see the true APR, and choose under More options whether it is
          taken from the loan or added to it. Try an extra monthly payment to see the interest saved. The schedule shows every payment for loans up to 10 years, and yearly totals
          for longer ones.
        </p>
      </GuideSection>

      <GuideSection id="secured" n={19} kicker="Loan types" title="Secured and unsecured loans">
        <p>
          A secured loan is backed by something the lender can take if you stop paying: the car for an auto loan, the home for a mortgage or home equity loan, or a savings
          account for a share-secured loan at a credit union. Because the lender has that security, rates are usually lower. An unsecured personal loan relies only on your
          promise to pay and your credit record, so it costs more.
        </p>
        <p>
          The lower rate on a secured loan comes with a real risk. Using a home equity loan to pay off credit cards, for example, turns debt that could be settled or discharged
          into debt tied to the roof over your head. Weigh the saving against what you would put at risk.
        </p>
      </GuideSection>

      <GuideSection id="cosigner" n={20} kicker="Applying" title="Cosigners">
        <p>
          If your credit is thin or damaged, a lender may approve you, or offer a better rate, with a cosigner. The cosigner is fully responsible for the debt if you do not pay,
          and the loan appears on their credit report too. Late payments hurt both of you. Only ask someone to cosign if you are confident you can pay, and agree in advance what
          happens if your circumstances change.
        </p>
      </GuideSection>

      <GuideSection id="variable" n={21} kicker="Rates" title="Fixed and variable rates">
        <p>
          This calculator is for fixed-rate loans, where the rate and payment stay the same for the whole term. Most personal and auto loans are fixed. Some private student loans,
          lines of credit and adjustable-rate mortgages have variable rates that move with a market index. For those, the payment shown here is only a starting point: try a
          higher rate to see what the payment would be if rates rose.
        </p>
      </GuideSection>

      <GuideSection id="missed" n={22} kicker="Problems" title="If you miss a payment">
        <p>
          A missed payment usually brings a late fee, and once it is 30 days late the lender can report it to the credit bureaus, where it can stay on your report for up to seven
          years. Interest keeps building on the balance in the meantime. If you see trouble coming, call the lender before the due date. Many will agree to move the due date,
          defer a payment or set up a hardship plan, which is far better for your credit than simply falling behind.
        </p>
      </GuideSection>

      <GuideSection id="payoff" n={23} kicker="Payoff" title="Paying a loan off in full">
        <p>
          When you want to clear a loan, ask the lender for a payoff quote. It will be a little different from the balance on your last statement, because interest builds up
          day by day until the payment arrives. The quote is good until a set date. After the final payment, check that the account shows as paid in full, and for a secured
          loan, that the lender releases its claim, for example by sending the car title.
        </p>
      </GuideSection>

      <GuideSection id="decide" n={24} kicker="Applying" title="How lenders decide">
        <p>
          Lenders look at three things: your credit history, your income and your existing debts. Most compare your monthly debt payments, including the new loan, with your gross
          monthly income. The lower that debt-to-income ratio, the safer you look. They also check how long you have been in your job, and for larger loans may ask for pay stubs,
          W-2s or tax returns.
        </p>
        <p>
          If you are turned down, the lender must tell you why, or how to ask for the reasons, and which credit bureau it used. That notice is a useful guide to what to fix before
          you apply again.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={25} kicker="Planning" title="Fitting the payment into your budget">
        <p>
          A payment that fits on paper can still be a strain. Before you sign, write down your take-home pay and your regular bills, then add the new payment and see what is
          left for food, transportation, savings and surprises. If the answer is very little, borrow less, choose a cheaper option or wait while you save.
        </p>
        <p>
          Set up automatic payments from your checking account so you never miss a due date; some lenders take a quarter of a percentage point off the rate for autopay. Put the
          due date a few days after payday, so the money is there when it is needed.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={26} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average 24-month personal loan rate at banks (Fed G.19, August 2026)", "about 11.9%"],
            ["Average 60-month new car loan rate at banks (same)", "about 7.5%"],
            ["Typical personal loan origination fee", "none, or about 1% to 10%"],
            ["$15,000 at 12% for 36 months", "$498.21 a month"],
            ["True APR with a 5% fee (36 months)", "15.61%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

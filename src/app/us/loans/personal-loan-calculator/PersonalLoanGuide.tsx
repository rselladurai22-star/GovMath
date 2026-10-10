import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Personal loan guide. Figures from src/lib/us/borrowing.ts (personalLoan, PERSONAL_LOAN_TIERS) and src/lib/us/loans.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a personal loan is" },
  { id: "score", title: "Rates by credit score" },
  { id: "example", title: "A worked example" },
  { id: "fee", title: "The origination fee" },
  { id: "receive", title: "The money you actually receive" },
  { id: "fee-ways", title: "Fee taken out or added on" },
  { id: "apr", title: "Why the APR is higher than the rate" },
  { id: "terms", title: "24, 36, 48 or 60 months" },
  { id: "fee-term", title: "Fees and short terms" },
  { id: "uses", title: "Good and poor uses" },
  { id: "vs-cards", title: "Personal loan or credit card" },
  { id: "prequalify", title: "Pre-qualifying and soft checks" },
  { id: "improve", title: "Getting a lower rate" },
  { id: "lenders", title: "Banks, credit unions and online lenders" },
  { id: "extra", title: "Paying it off early" },
  { id: "red-flags", title: "Red flags" },
  { id: "afford", title: "Can you afford the payment?" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NerdWallet: Average personal loan interest rates by credit score (October 2026)", href: "https://www.nerdwallet.com/article/loans/personal-loans/average-personal-loan-rates" },
  { label: "Federal Reserve: Consumer Credit (G.19), interest rates", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "CFPB: What is a debt consolidation loan?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-consolidation-loan-en-1859/" },
  { label: "CFPB: Interest rate vs APR", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" },
  { label: "CFPB: Military Lending Act applicability (36% MAPR)", href: "https://files.consumerfinance.gov/f/documents/cfpb_servicemembers_mla-applicability-flow-chart.pdf" },
  { label: "NCUA: Board extends the 18% loan interest rate ceiling (February 2026)", href: "https://ncua.gov/newsroom/press-release/2026/ncua-board-extends-loan-interest-rate-ceiling" },
  { label: "AnnualCreditReport.com: free credit reports", href: "https://www.annualcreditreport.com/" },
];

export default function PersonalLoanGuide() {
  return (
    <Guide
      kicker="The personal loan guide"
      title="What a personal loan really costs"
      intro={
        <>
          A personal loan is quick to get and easy to understand: a lump sum, a fixed rate and equal monthly payments. The cost depends mostly on three things you can see before
          you sign: the rate your credit score gets, the origination fee and the term. This guide shows how each one moves the payment and the total you repay.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>{usd(10_000)} at 19.47%, the average offer for good credit in October 2026, costs $368.94 a month over 36 months and {usd(3_282)} in interest.</li>
          <li>A 5% fee taken from the loan leaves you with {usd(9_500)} and lifts the true APR to 23.24%.</li>
          <li>The same loan costs {usd(2_510)} in interest at the average excellent-credit rate and {usd(5_227)} at the average bad-credit rate.</li>
          <li>Stretching it to 60 months cuts the payment to $262.00 but raises interest and fee to {usd(6_220)}.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$368.94", label: "Payment on $10,000 at 19.47% for 36 months" },
            { value: "23.24%", label: "True APR with a 5% fee taken out" },
            { value: "about 15.2%", label: "Average offer, credit scores of 720 to 850" },
            { value: "about 29.7%", label: "Average offer, credit scores below 630" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a personal loan is">
        <p>
          A personal loan is an installment loan, usually unsecured, for between about {usd(1_000)} and {usd(50_000)}. You get the money in one payment, often within a few days, and
          repay it in equal monthly installments over two to seven years. The rate is normally fixed, so the payment never changes. Because nothing backs the loan, the lender prices
          it on your credit record, income and existing debts, which is why rates vary so widely from one borrower to the next.
        </p>
        <p>
          The maths is the same as any fixed loan; our <a href="/us/loans/loan-calculator">loan calculator</a>{" "}covers that in general. This page adds the parts that matter most
          for personal loans: typical rates by credit score, the fee most lenders take out of the money, and a side-by-side view of common terms.
        </p>
      </GuideSection>

      <GuideSection id="score" n={3} kicker="Rates" title="Rates by credit score">
        <p>
          NerdWallet publishes the average APR offered to people who pre-qualified through its site in the previous 30 days. Its October 1, 2026 figures, which the calculator uses
          when you pick a credit score:
        </p>
        <DataTable
          caption="Average personal loan APR by credit score, October 2026, and the cost of $10,000 over 36 months with no fee"
          head={["Credit score", "Average APR", "Monthly payment", "Total interest"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Excellent (720 to 850)", "15.17%", "$347.49", usd(2_510)],
            ["Good (690 to 719)", "19.47%", "$368.94", usd(3_282)],
            ["Fair (630 to 689)", "24.21%", "$393.43", usd(4_164)],
            ["Bad (300 to 629)", "29.72%", "$422.98", usd(5_227)],
          ]}
        />
        <p>
          These are averages of offers, not promises. Two people with the same score can get very different rates because of income, debts, the loan amount and the lender. Banks
          that lend only to strong borrowers report lower averages: the Federal Reserve&rsquo;s survey of commercial banks put the average 24-month personal loan rate at about 11.9%
          in August 2026.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$10,000 for 36 months at 19.47% with a 5% fee taken out"
          steps={[
            { label: "Origination fee", note: "5% of $10,000", value: usd(500) },
            { label: "Money you receive", value: usd(9_500) },
            { label: "Monthly payment", note: "on the full $10,000", value: "$368.94" },
            { label: "Total of 36 payments", value: usd(13_282) },
            { label: "Interest", value: usd(3_282) },
          ]}
          total={{ label: "Interest plus fee", value: usd(3_782) }}
        />
        <p>
          You repay {usd(13_282)} for {usd(9_500)} in your account. That gap of {usd(3_782)} is the real cost of the loan, and it works out to an APR of 23.24%.
        </p>
      </GuideSection>

      <GuideSection id="fee" n={5} kicker="Fees" title="The origination fee">
        <p>
          An origination fee pays the lender for processing and underwriting the loan. Many lenders charge none; others charge from about 1% to 10% of the amount, and a few go up to
          about 12%. The fee usually rises as your credit score falls, so the borrowers who already pay the highest rates often pay the biggest fees too. Always ask whether a quote
          includes a fee, and compare offers by APR, which counts it.
        </p>
        <DataTable
          caption="$10,000 at 19.47% for 36 months, fee taken from the money"
          head={["Fee", "You receive", "True APR", "Interest plus fee"]}
          numeric={[1, 2, 3]}
          rows={[
            ["None", usd(10_000), "19.47%", usd(3_282)],
            ["1%", usd(9_900), "20.20%", usd(3_382)],
            ["3%", usd(9_700), "21.70%", usd(3_582)],
            ["5%", usd(9_500), "23.24%", usd(3_782)],
            ["8%", usd(9_200), "25.65%", usd(4_082)],
            ["10%", usd(9_000), "27.31%", usd(4_282)],
          ]}
        />
      </GuideSection>

      <GuideSection id="receive" n={6} kicker="Fees" title="The money you actually receive">
        <p>
          The most common surprise with a personal loan is a deposit smaller than the loan. If you need an exact sum, for example to pay off a {usd(10_000)} card balance, a loan of
          {" "}{usd(10_000)} with a 5% fee leaves you {usd(500)} short. To receive the full amount, divide what you need by one minus the fee: {usd(10_000)} ÷ 0.95 is about{" "}
          {usd(10_526)}. The calculator does this for you under More options.
        </p>
        <Callout title="Borrowing the extra costs a little more">
          The bigger {usd(10_526)} loan has a payment of $388.36 and costs {usd(3_981)} in interest and fees over 36 months, against {usd(3_782)} for the {usd(10_000)} loan. Its APR
          is the same 23.24%: the fee is the same share of the loan.
        </Callout>
      </GuideSection>

      <GuideSection id="fee-ways" n={7} kicker="Fees" title="Fee taken out or added on">
        <p>Some lenders add the fee to the balance instead. You then receive the full amount but repay more, and pay interest on the fee.</p>
        <CompareCards
          columns={[
            {
              name: "Taken out",
              rows: [
                { label: "You borrow", value: usd(10_000) },
                { label: "You receive", value: usd(9_500) },
                { label: "Payment", value: "$368.94" },
                { label: "APR", value: "23.24%" },
              ],
            },
            {
              name: "Taken out, borrowing more",
              rows: [
                { label: "You borrow", value: usd(10_526) },
                { label: "You receive", value: usd(10_000) },
                { label: "Payment", value: "$388.36" },
                { label: "APR", value: "23.24%" },
              ],
            },
            {
              name: "Added on",
              rows: [
                { label: "You borrow", value: usd(10_500) },
                { label: "You receive", value: usd(10_000) },
                { label: "Payment", value: "$387.39" },
                { label: "APR", value: "23.06%" },
              ],
            },
          ]}
        />
        <p>All three use a 5% fee, 19.47% and 36 months. The differences are small; what matters is that you know how much will land in your account.</p>
      </GuideSection>

      <GuideSection id="apr" n={8} kicker="APR" title="Why the APR is higher than the rate">
        <p>
          The interest rate sets your payment. The annual percentage rate also counts required fees, spread over the term, so it shows the full yearly cost. The federal Truth in
          Lending Act requires lenders to show the APR before you sign. When a lender advertises &ldquo;rates from&rdquo; a low figure, check whether that is the rate or the APR,
          and whether you would qualify for it.
        </p>
      </GuideSection>

      <GuideSection id="terms" n={9} kicker="Term" title="24, 36, 48 or 60 months">
        <DataTable
          caption="$10,000 at 19.47% with a 5% fee taken out"
          head={["Term", "Monthly payment", "Interest", "Interest plus fee", "True APR"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["24 months", "$506.37", usd(2_153), usd(2_653), "24.86%"],
            ["36 months", "$368.94", usd(3_282), usd(3_782), "23.24%"],
            ["48 months", "$301.49", usd(4_471), usd(4_971), "22.42%"],
            ["60 months", "$262.00", usd(5_720), usd(6_220), "21.93%"],
            ["72 months", "$236.47", usd(7_026), usd(7_526), "21.60%"],
            ["84 months", "$218.88", usd(8_386), usd(8_886), "21.37%"],
          ]}
        />
        <Bars
          format={usd}
          items={[
            { label: "24 months", value: 2_653 },
            { label: "36 months", value: 3_782 },
            { label: "48 months", value: 4_971 },
            { label: "60 months", value: 6_220 },
            { label: "84 months", value: 8_886 },
          ]}
        />
        <p>
          Going from 24 to 60 months roughly halves the payment and more than doubles the cost. Pick the shortest term whose payment you can keep up comfortably, even in a lean
          month.
        </p>
      </GuideSection>

      <GuideSection id="fee-term" n={10} kicker="Fees" title="Fees and short terms">
        <p>
          Look at the APR column above: it falls as the term grows. That is not because longer loans are cheaper, but because the one-time fee is spread over more months. A
          disclosure assumes you keep the loan to the end. If you plan to repay early, a fee costs you more, in APR terms, than the disclosure shows; a no-fee loan at a slightly
          higher rate can then be the better deal.
        </p>
      </GuideSection>

      <GuideSection id="uses" n={11} kicker="Uses" title="Good and poor uses">
        <ul>
          <li>
            <strong>Paying off higher-rate debt.</strong> Moving card balances to a fixed loan at a lower rate saves interest and sets an end date. Our{" "}
            <a href="/us/loans/debt-consolidation-calculator">debt consolidation calculator</a>{" "}compares your cards with one loan.
          </li>
          <li>
            <strong>Needed repairs or medical bills.</strong> Often cheaper than a card, but ask the provider about an interest-free payment plan first.
          </li>
          <li>
            <strong>Things that lose value quickly</strong>, such as vacations or gadgets. You would still be paying for them long after they are gone; saving first costs nothing.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="vs-cards" n={12} kicker="Compare" title="Personal loan or credit card">
        <p>
          The Federal Reserve put the average APR on credit cards that were charged interest at about 22% in August 2026. A personal loan for good credit can be cheaper, and its
          fixed payment clears the debt by a set date. For a small amount you can repay within a year or so, a 0% balance transfer card can beat both; our{" "}
          <a href="/us/loans/balance-transfer-calculator">balance transfer calculator</a>{" "}shows whether the transfer fee is worth it.
        </p>
      </GuideSection>

      <GuideSection id="prequalify" n={13} kicker="Shopping" title="Pre-qualifying and soft checks">
        <p>
          Most online lenders, and many banks and credit unions, let you see a likely rate with a soft credit check, which does not affect your score. Get three or more quotes for
          the same amount and term before you apply. The full application uses a hard inquiry, which can lower your score by a few points for a while. Credit scoring models
          usually treat several inquiries for the same kind of loan within a short window as one.
        </p>
      </GuideSection>

      <GuideSection id="improve" n={14} kicker="Credit" title="Getting a lower rate">
        <ul>
          <li>Check your free credit reports at AnnualCreditReport.com and dispute errors before you apply.</li>
          <li>Pay card balances down: lower credit use can lift your score within a month or two.</li>
          <li>Lower your debt-to-income ratio; our <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows what lenders see.</li>
          <li>Ask about an autopay discount, often about a quarter of a percentage point.</li>
          <li>Consider a cosigner or a secured loan, but understand the risk they carry.</li>
        </ul>
        <p>
          The gap is worth the effort. On {usd(10_000)} over 36 months, moving from the average fair-credit rate to the average good-credit rate saves {usd(4_164 - 3_282)} of
          interest.
        </p>
      </GuideSection>

      <GuideSection id="lenders" n={15} kicker="Shopping" title="Banks, credit unions and online lenders">
        <p>
          Banks tend to offer the lowest rates to existing customers with strong credit. Credit unions are member-owned, often charge no origination fee, and federal credit unions
          are limited to an 18% APR on most loans. Online lenders approve a wider range of borrowers and fund quickly, but their fees and rates vary the most. Compare the APR, the
          fee, the total repaid and any late fees.
        </p>
      </GuideSection>

      <GuideSection id="extra" n={16} kicker="Payoff" title="Paying it off early">
        <p>
          Extra payments go straight to principal. Adding {usd(100)} a month to a {usd(10_000)} loan at 19.47% over 36 months clears it in 27 months and saves about {usd(909)} of
          interest. Most personal loans have no prepayment penalty; check yours, and ask the lender to apply extra money to principal rather than to the next payment. The fee is
          not refunded when you repay early.
        </p>
      </GuideSection>

      <GuideSection id="red-flags" n={17} kicker="Pitfalls" title="Red flags">
        <ul>
          <li>A lender that asks for a fee before the loan is approved. Legitimate lenders take the fee out of the loan.</li>
          <li>&ldquo;Guaranteed approval&rdquo; with no credit check, or pressure to sign today.</li>
          <li>Optional credit insurance or add-ons bundled into the loan without a clear choice.</li>
          <li>An APR well above 36%. The Military Lending Act caps most loans to service members at 36%, and mainstream lenders rarely go above it.</li>
        </ul>
      </GuideSection>

      <GuideSection id="afford" n={18} kicker="Planning" title="Can you afford the payment?">
        <p>
          Add the new payment to your other monthly debts and divide by your gross monthly income. Lenders get nervous above about 36% to 43%. Then look at your actual budget:
          after rent, food, transportation and savings, would the payment still fit in a month with a surprise bill? If not, borrow less or choose a longer term, accepting the
          higher cost.
        </p>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator">
        <p>
          Enter the amount, pick your credit score band to fill in an average rate, or type your own quoted rate. Choose the term and the fee. Under More options, choose whether
          the fee is taken out or added on, borrow enough to receive the full amount, and try an extra monthly payment. The results compare 24, 36, 48 and 60 months, and every
          credit band, at the same amount and fee.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average APR, credit 720 to 850 (NerdWallet, October 2026)", "about 15.2%"],
            ["Average APR, credit 690 to 719", "about 19.5%"],
            ["Average APR, credit 630 to 689", "about 24.2%"],
            ["Average APR, credit 300 to 629", "about 29.7%"],
            ["Average 24-month personal loan rate at banks (Fed G.19, August 2026)", "about 11.9%"],
            ["Typical origination fee", "none, or about 1% to 10%"],
            ["Federal credit union APR ceiling on most loans", "18%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

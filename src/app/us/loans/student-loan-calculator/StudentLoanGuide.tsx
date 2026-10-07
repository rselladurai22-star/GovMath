import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Student loans — the guide. Figures from src/lib/us/loans.ts and student-extra.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How student loan payments work" },
  { id: "rates", title: "Federal interest rates for 2026–27" },
  { id: "changes", title: "What changed on July 1, 2026" },
  { id: "standard", title: "The standard plan" },
  { id: "new-standard", title: "The standard plan for new loans" },
  { id: "extended", title: "Extended and graduated plans" },
  { id: "rap", title: "The Repayment Assistance Plan" },
  { id: "rap-table", title: "RAP payments by income" },
  { id: "rap-example", title: "RAP worked examples" },
  { id: "old-idr", title: "SAVE, PAYE, ICR and IBR" },
  { id: "graduate", title: "Graduate school loans" },
  { id: "private", title: "Private student loans" },
  { id: "refinance", title: "Refinancing" },
  { id: "extra", title: "Paying extra" },
  { id: "pslf", title: "Public Service Loan Forgiveness" },
  { id: "tax", title: "Taxes and student loans" },
  { id: "trouble", title: "If you cannot pay" },
  { id: "choosing", title: "Choosing a plan" },
  { id: "subsidized", title: "Subsidized and unsubsidized loans" },
  { id: "capitalization", title: "The cost of unpaid interest" },
  { id: "autopay", title: "The auto-pay discount" },
  { id: "employer", title: "Help from your employer" },
  { id: "consolidation", title: "Consolidating federal loans" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Federal Student Aid — Interest rates and fees", href: "https://studentaid.gov/understand-aid/types/loans/interest-rates" },
  { label: "Federal Student Aid — Repayment plans", href: "https://studentaid.gov/manage-loans/repayment/plans" },
  { label: "Edfinancial (federal loan servicer) — Repayment Assistance Plan", href: "https://edfinancial.studentaid.gov/lower-payment-options" },
  { label: "Congressional Research Service — The Repayment Assistance Plan in P.L. 119-21", href: "https://www.congress.gov/crs-product/IF13075" },
  { label: "Federal Student Aid — Public Service Loan Forgiveness", href: "https://studentaid.gov/manage-loans/forgiveness-cancellation/public-service" },
  { label: "IRS — Topic 456, Student loan interest deduction", href: "https://www.irs.gov/taxtopics/tc456" },
  { label: "CFPB — Repay student debt", href: "https://www.consumerfinance.gov/paying-for-college/repay-student-debt/" },
];

export default function StudentLoanGuide() {
  return (
    <Guide
      kicker="The student loan guide"
      title="How student loan repayment works in 2026"
      intro={
        <>
          Federal student loans changed on July 1, 2026. New loans now have two repayment plans: a standard plan whose length depends on how much
          you owe, and the income-based Repayment Assistance Plan (RAP). Older plans are being phased out. This guide explains each plan with real
          numbers, the 2026–27 interest rates, how private loans differ, and when paying extra makes sense.
        </>
      }
      meta={["Worked examples", "15 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>{usd(30_000)} at 6.52% on the 10-year standard plan costs $340.95 a month and {usd(10_914)} in interest.</li>
          <li>Paying $100 extra a month clears it 34 months sooner and saves {usd(3_359)}.</li>
          <li>RAP sets the payment at 1% to 10% of your adjusted gross income, less $50 per dependent, with a $10 minimum.</li>
          <li>Federal loans made from July 1, 2026 to June 30, 2027 charge 6.52% (undergraduate), 8.07% (graduate) and 9.07% (PLUS).</li>
        </ul>
        <KeyStats
          items={[
            { value: "$340.95", label: "$30,000 at 6.52% over 10 years" },
            { value: "6.52%", label: "Undergraduate rate, 2026–27" },
            { value: "1% to 10%", label: "Share of AGI paid under RAP" },
            { value: "30 years", label: "Until any RAP balance is forgiven" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How student loan payments work">
        <p>
          Federal and most private student loans charge simple interest on the balance each day. Your monthly payment covers that interest first
          and the rest reduces the principal. On a fixed plan the payment stays the same, so the interest share falls over time. On graduated
          plans the payment rises every two years, and on income-driven plans it follows your income.
        </p>
        <p>
          Interest usually builds up while you are in school and during the grace period (six months for most federal loans) on unsubsidized
          loans. The calculator starts from the balance you owe today, so include any interest already added.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Rates" title="Federal interest rates for 2026–27">
        <DataTable
          caption="Fixed rates for federal Direct Loans first disbursed July 1, 2026 to June 30, 2027"
          head={["Loan", "Rate", "Legal cap"]}
          numeric={[1, 2]}
          rows={[
            ["Undergraduate (subsidized and unsubsidized)", "6.52%", "8.25%"],
            ["Graduate unsubsidized", "8.07%", "9.50%"],
            ["PLUS (graduate and parent)", "9.07%", "10.50%"],
          ]}
        />
        <p>
          Each year&rsquo;s rate is the yield at the May auction of 10-year Treasury notes plus a margin set by law: 2.05 points for
          undergraduates, 3.60 for graduate loans and 4.60 for PLUS loans. The May 2026 auction yielded 4.468%. The rate is fixed for the life of
          each loan, so loans from different years have different rates. Federal loans also charge an origination fee taken from each payout.
        </p>
      </GuideSection>

      <GuideSection id="changes" n={4} kicker="New rules" title="What changed on July 1, 2026">
        <Timeline
          items={[
            { when: "March 2026", what: "SAVE ends", detail: "A federal court vacated the SAVE plan rule; borrowers in SAVE forbearance are being moved to other plans." },
            { when: "July 1, 2026", what: "RAP opens", detail: "The One Big Beautiful Bill Act's Repayment Assistance Plan starts. Loans made from this date can use only the new standard plan or RAP." },
            { when: "By July 1, 2028", what: "PAYE and ICR end", detail: "Borrowers still in them move to IBR or RAP. Payments already made keep counting toward forgiveness." },
          ]}
        />
        <p>
          Loans made before July 1, 2026 keep access to the older standard, graduated and extended plans and to Income-Based Repayment (IBR). If
          you take a new loan after that date, including a new consolidation loan, your options narrow to the two new plans.
        </p>
      </GuideSection>

      <GuideSection id="standard" n={5} kicker="Plans" title="The standard plan">
        <WorkedExample
          title="$30,000 at 6.52% on the 10-year standard plan"
          steps={[
            { label: "Monthly payment", value: "$340.95" },
            { label: "Number of payments", value: "120" },
            { label: "Total interest", value: usd(10_914) },
          ]}
          total={{ label: "Total repaid", value: usd(40_914) }}
        />
        <p>
          The 10-year standard plan has the highest fixed payment among the older plans but the lowest total cost. It is the default for loans made
          before July 1, 2026 if you do not choose another plan.
        </p>
      </GuideSection>

      <GuideSection id="new-standard" n={6} kicker="Plans" title="The standard plan for new loans">
        <p>For loans made on or after July 1, 2026, the standard plan has fixed payments over a term set by the amount you owe:</p>
        <DataTable
          head={["Amount owed", "Term"]}
          rows={[
            ["Less than $25,000", "10 years"],
            ["$25,000 to $49,999", "15 years"],
            ["$50,000 to $99,999", "20 years"],
            ["$100,000 or more", "25 years"],
          ]}
        />
        <p>
          On {usd(30_000)} at 6.52%, that means 15 years at $261.66 a month and {usd(17_099)} of interest: about $79 a month less than the
          10-year plan, but {usd(6_185)} more interest. You can always pay extra to finish sooner.
        </p>
      </GuideSection>

      <GuideSection id="extended" n={7} kicker="Plans" title="Extended and graduated plans">
        <DataTable
          caption="$30,000 at 6.52% on the older plans (graduated payments rising 8% every two years)"
          head={["Plan", "Payment", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["Standard, 10 years", "$340.95", usd(10_914)],
            ["Graduated, 10 years", "$296.44 rising to $403.30", usd(11_738)],
            ["Extended fixed, 25 years", "$202.94", usd(30_881)],
            ["Extended graduated, 25 years", "$142.41 rising to $358.62", usd(39_166)],
          ]}
        />
        <p>
          Graduated plans start lower and rise every two years, which suits people who expect their pay to grow. Extended plans need more than
          $30,000 in federal Direct Loans and stretch repayment to 25 years. Both cost more in total. Your servicer sets the actual graduated steps;
          the calculator lets you change the rise under More options.
        </p>
        <Callout tone="warn" title="Graduated payments can start below the interest">
          At an 8% rise over 25 years, the first payment of $142.41 is less than the $163 of monthly interest, so the balance grows at first. The
          federal graduated plans set payments at least equal to the interest.
        </Callout>
      </GuideSection>

      <GuideSection id="rap" n={8} kicker="RAP" title="The Repayment Assistance Plan">
        <p>RAP is the new income-driven plan created by the One Big Beautiful Bill Act. Under the law and the Department of Education&rsquo;s guidance:</p>
        <ul>
          <li>Your payment is a percentage of your adjusted gross income ÷ 12: 1% for AGI over $10,000 up to $20,000, rising one point for each extra $10,000, up to 10% above $100,000.</li>
          <li>With AGI of $10,000 or less, you pay $10 a month.</li>
          <li>The payment falls by <strong>$50 for each dependent</strong>, but never below <strong>$10</strong>.</li>
          <li>If your payment does not cover the month&rsquo;s interest, the unpaid interest is <strong>not charged</strong>, so your balance does not grow.</li>
          <li>If your payment cuts the principal by less than $50, the government adds a match, up to $50 or your payment if less.</li>
          <li>Any balance left after <strong>360 qualifying payments</strong> (30 years) is forgiven.</li>
          <li>If you are married, your spouse&rsquo;s income counts only if you file jointly.</li>
        </ul>
        <p>Parent PLUS loans, and consolidation loans that repaid a Parent PLUS loan, cannot use RAP.</p>
      </GuideSection>

      <GuideSection id="rap-table" n={9} kicker="RAP" title="RAP payments by income">
        <DataTable
          caption="RAP monthly payment"
          head={["AGI", "Share", "Dependents", "Monthly payment"]}
          numeric={[1, 2, 3]}
          rows={[
            ["$15,000", "1%", "0", "$12.50"],
            ["$25,000", "2%", "0", "$41.67"],
            ["$45,000", "4%", "1", "$100.00"],
            ["$65,000", "6%", "0", "$325.00"],
            ["$95,000", "9%", "2", "$612.50"],
            ["$150,000", "10%", "0", "$1,250.00"],
          ]}
        />
        <p>
          The share applies to your whole AGI, not just the part in each band, so the payment jumps when you cross a $10,000 line. Moving from
          $60,000 to $60,001 of AGI raises the share from 5% to 6%.
        </p>
      </GuideSection>

      <GuideSection id="rap-example" n={10} kicker="RAP" title="RAP worked examples">
        <CompareCards
          columns={[
            {
              name: "AGI $50,000, no dependents",
              rows: [
                { label: "First payment", value: "$166.67" },
                { label: "Paid off in", value: "14 years" },
                { label: "Total paid", value: usd(48_014) },
                { label: "Principal matched", value: usd(538) },
              ],
            },
            {
              name: "AGI $40,000, two dependents",
              rows: [
                { label: "First payment", value: "$10.00" },
                { label: "Paid off in", value: "23 years 7 months" },
                { label: "Interest not charged", value: usd(11_093) },
                { label: "Principal matched", value: usd(7_215) },
              ],
            },
          ]}
        />
        <p>
          Both examples are for {usd(30_000)} at 6.52%, with income rising 3% a year. On a low income, RAP keeps payments tiny while the interest
          waiver and the principal match still bring the balance down. On a higher income, RAP can cost more each month than the standard plan:
          at AGI of {usd(120_000)}, the payment is $1,000 a month.
        </p>
      </GuideSection>

      <GuideSection id="old-idr" n={11} kicker="Older plans" title="SAVE, PAYE, ICR and IBR">
        <p>
          SAVE has ended after a court ruling in March 2026, and borrowers who were in it must choose another plan. PAYE and ICR end by July 1,
          2028, and borrowers still in them then move to IBR or RAP. Income-Based Repayment stays open for loans made before July 1, 2026. It
          sets payments at 10% or 15% of discretionary income, depending on when you first borrowed. Qualifying payments made under any of these
          plans keep counting toward forgiveness after a switch.
        </p>
        <Callout title="Check your own options">
          The rules are still being put into practice. Log in to studentaid.gov or ask your servicer which plans your loans can use before you
          switch.
        </Callout>
      </GuideSection>

      <GuideSection id="graduate" n={12} kicker="Graduate school" title="Graduate school loans">
        <p>
          Graduate loans carry higher rates and bigger balances. {usd(80_000)} at 8.07% costs $973.58 a month over 10 years with{" "}
          {usd(36_830)} of interest. On the new standard plan for that balance (20 years), the payment falls to $672.64 but the interest rises
          to {usd(81_434)}. On RAP with AGI of {usd(70_000)}, the first payment is $350 and the loan is repaid after about 20 years.
        </p>
      </GuideSection>

      <GuideSection id="private" n={13} kicker="Private" title="Private student loans">
        <Figure label="Interest on $30,000 over 10 years" caption="Private loans are priced on your credit and your co-signer's.">
          <Bars
            format={usd}
            items={[
              { label: "5%", value: 8_184 },
              { label: "7%", value: 11_799 },
              { label: "9%", value: 15_603 },
              { label: "12%", value: 21_650 },
            ]}
          />
        </Figure>
        <p>
          Private loans come from banks, credit unions and online lenders. Rates can be fixed or variable and depend on your credit. They have no
          income-driven plans, no RAP and no federal forgiveness. Choose &quot;Private&quot; in the calculator and set the term your lender gives
          you.
        </p>
      </GuideSection>

      <GuideSection id="refinance" n={14} kicker="Private" title="Refinancing">
        <p>
          Refinancing replaces one or more loans with a new private loan, ideally at a lower rate. It can save money on private loans or on federal
          loans for people with high, stable incomes. But refinancing federal loans is permanent: you lose RAP, Public Service Loan Forgiveness,
          deferment options and the interest waiver. Use the general <a href="/us/loans/loan-calculator">loan calculator</a> to compare offers.
        </p>
      </GuideSection>

      <GuideSection id="extra" n={15} kicker="Strategy" title="Paying extra">
        <p>
          On a fixed plan, extra payments cut interest and shorten the loan. {usd(100)} extra a month on {usd(30_000)} at 6.52% clears the
          standard-plan loan in 7 years 2 months instead of 10 years and saves {usd(3_359)}. Ask your servicer to apply extra payments to the
          highest-rate loan. If you expect forgiveness under RAP or PSLF, paying extra may simply reduce the amount forgiven.
        </p>
        <p>
          Before paying extra, make sure you have an emergency fund, any 401(k) match and no higher-rate debt such as credit cards. The{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a> compares paying off several debts at once.
        </p>
      </GuideSection>

      <GuideSection id="pslf" n={16} kicker="Forgiveness" title="Public Service Loan Forgiveness">
        <p>
          If you work full time for a government or a qualifying nonprofit, PSLF forgives the remaining balance of your Direct Loans after 120
          qualifying monthly payments made under a qualifying plan. Payments under RAP and the 10-year standard plan count. Forgiveness under PSLF
          is not taxed by the federal government.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={17} kicker="Tax" title="Taxes and student loans">
        <p>
          You can deduct up to $2,500 a year of student loan interest, whether or not you itemize, though the deduction phases out at higher
          incomes. Balances forgiven under an income-driven plan such as RAP may be counted as taxable income. The{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a> shows your bracket.
        </p>
      </GuideSection>

      <GuideSection id="trouble" n={18} kicker="Help" title="If you cannot pay">
        <p>
          Contact your servicer before you miss a payment. An income-driven plan such as RAP can cut payments to as little as $10 a month.
          Deferment and forbearance can pause payments for a time, but interest may keep building. Federal loans in default can lead to
          garnished wages and seized tax refunds, so it is worth acting early.
        </p>
      </GuideSection>

      <GuideSection id="choosing" n={19} kicker="Decision" title="Choosing a plan">
        <ul>
          <li><strong>Want to pay least overall?</strong> The shortest fixed term you can afford, plus extra payments.</li>
          <li><strong>Low or uncertain income?</strong> RAP keeps payments tied to income and stops the balance growing.</li>
          <li><strong>Working in public service?</strong> RAP or the 10-year standard plan with PSLF.</li>
          <li><strong>High income and private-sector job?</strong> A fixed plan, possibly refinancing if you will not need federal protections.</li>
        </ul>
      </GuideSection>

      <GuideSection id="subsidized" n={20} kicker="Basics" title="Subsidized and unsubsidized loans">
        <p>
          On a <strong>subsidized</strong> loan, available to undergraduates with financial need, the government pays the interest while you are
          in school at least half time, during the grace period and during deferment. On an <strong>unsubsidized</strong> loan, interest builds
          from the day the money is paid out. If you do not pay it, it may be added to the balance when repayment starts, and you then pay
          interest on it.
        </p>
      </GuideSection>

      <GuideSection id="capitalization" n={21} kicker="Basics" title="The cost of unpaid interest">
        <p>
          Suppose {usd(1_500)} of interest built up on a {usd(30_000)} unsubsidized loan while you were in school and is added to the balance.
          Repaying {usd(31_500)} at 6.52% over 10 years costs $358.00 a month and {usd(11_460)} of interest, against $340.95 and{" "}
          {usd(10_914)} if you had paid the interest as it built up. Paying even part of the interest while in school keeps the balance down.
        </p>
      </GuideSection>

      <GuideSection id="autopay" n={22} kicker="Savings" title="The auto-pay discount">
        <p>
          Federal loan servicers take 0.25 percentage points off your rate when you pay by automatic debit, and many private lenders do the same.
          On {usd(30_000)} over 10 years, cutting the rate from 6.52% to 6.27% lowers the payment to $337.14 and saves {usd(457)} of interest.
          It also means you never miss a payment.
        </p>
      </GuideSection>

      <GuideSection id="employer" n={23} kicker="Savings" title="Help from your employer">
        <p>
          Employers can pay up to $5,250 a year toward your student loans tax-free, through an educational assistance program. Some also match
          student loan payments with 401(k) contributions, so you build retirement savings while you repay. Ask your HR department whether
          either is offered.
        </p>
      </GuideSection>

      <GuideSection id="consolidation" n={24} kicker="Options" title="Consolidating federal loans">
        <p>
          A Direct Consolidation Loan combines several federal loans into one, with one servicer and one payment. The new rate is the weighted
          average of the old rates, rounded up to the nearest one-eighth of a percent, so it does not lower your cost. Remember that a
          consolidation loan made on or after July 1, 2026 counts as a new loan, so it can use only the new standard plan or RAP.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Undergraduate rate, 2026–27", "6.52%"],
            ["Graduate unsubsidized rate, 2026–27", "8.07%"],
            ["PLUS rate, 2026–27", "9.07%"],
            ["RAP payment", "1% to 10% of AGI ÷ 12"],
            ["RAP dependent reduction", "$50 a month each"],
            ["RAP minimum payment", "$10 a month"],
            ["RAP forgiveness", "After 360 qualifying payments"],
            ["PSLF", "After 120 qualifying payments"],
            ["Student loan interest deduction", "Up to $2,500 a year"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

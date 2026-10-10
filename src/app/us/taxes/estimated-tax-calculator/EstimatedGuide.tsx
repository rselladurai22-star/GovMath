import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The estimated tax guide. Figures from src/lib/us/withholding.ts (estimatedPlan, estimatedPenalty) and taxes-extra.ts, tax year 2026. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who has to pay estimated tax" },
  { id: "dates", title: "The 2026 due dates" },
  { id: "safe-harbors", title: "The safe harbors" },
  { id: "example-freelancer", title: "Example: a freelancer with no prior-year figure" },
  { id: "prior-year", title: "Using last year's tax" },
  { id: "high-income", title: "The 110% rule for higher incomes" },
  { id: "side-gig", title: "Example: a W-2 job plus a side gig" },
  { id: "withholding-trick", title: "Withholding counts as paid evenly" },
  { id: "penalty", title: "How the penalty is worked out" },
  { id: "penalty-examples", title: "Penalty examples" },
  { id: "catch-up", title: "Catching up after a missed payment" },
  { id: "uneven", title: "Uneven income: the annualized method" },
  { id: "retirees", title: "Retirees and investors" },
  { id: "what-counts", title: "What the payments cover" },
  { id: "how-to-pay", title: "How to pay" },
  { id: "january", title: "Skipping the January payment" },
  { id: "exceptions", title: "Exceptions and waivers" },
  { id: "state", title: "State estimated tax" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS: Form 1040-ES, Estimated Tax for Individuals", href: "https://www.irs.gov/forms-pubs/about-form-1040-es" },
  { label: "IRS: Publication 505, Tax Withholding and Estimated Tax", href: "https://www.irs.gov/publications/p505" },
  { label: "IRS: Estimated taxes", href: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" },
  { label: "IRS: Underpayment of estimated tax by individuals penalty", href: "https://www.irs.gov/payments/underpayment-of-estimated-tax-by-individuals-penalty" },
  { label: "IRS: Form 2210, Underpayment of Estimated Tax", href: "https://www.irs.gov/forms-pubs/about-form-2210" },
  { label: "IRS: Quarterly interest rates", href: "https://www.irs.gov/payments/quarterly-interest-rates" },
  { label: "IRS: Direct Pay", href: "https://www.irs.gov/payments/direct-pay" },
];

export default function EstimatedGuide() {
  return (
    <Guide
      kicker="The estimated tax guide"
      title="Quarterly estimated tax for 2026: how much, when, and how to avoid the penalty"
      intro={
        <>
          The US tax system is pay-as-you-go. If tax isn&rsquo;t withheld from your income, the IRS expects it in four installments during the year. This guide covers the 2026 due dates, the
          safe harbors that protect you from the penalty, how the penalty is actually worked out, and what to do if you are behind.
        </>
      }
      meta={["Tax year 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Pay estimated tax if you expect to owe $1,000 or more for 2026 after withholding and credits.</li>
          <li>Due dates: April 15, June 15 and September 15, 2026, and January 15, 2027.</li>
          <li>No penalty if you pay in the smaller of 90% of your 2026 tax and 100% of your 2025 tax (110% if your 2025 AGI was over $150,000).</li>
          <li>The penalty is interest, charged at 6% to 7% a year in 2026 on each late or short payment.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$1,000", label: "Owed after withholding before payments are needed" },
            { value: "90% / 100% / 110%", label: "The three safe harbors" },
            { value: "4", label: "Installments for 2026" },
            { value: "7%", label: "IRS underpayment rate, fourth quarter 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Rules" title="Who has to pay estimated tax">
        <p>
          Anyone whose withholding won&rsquo;t cover their tax: freelancers and 1099 contractors, gig workers, small business owners, landlords, investors with large dividends or gains, retirees
          whose pensions or IRA withdrawals have little tax taken, and employees with big side income. The test is the $1,000 line: if what you will owe when you file, after withholding and
          refundable credits, is under $1,000, there is no penalty and no need for estimated payments.
        </p>
        <p>
          If self-employment is your main income, the <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}breaks down the 15.3% self-employment tax that makes up a large
          part of the bill. This calculator takes any mix of income and focuses on the schedule.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={3} kicker="Calendar" title="The 2026 due dates">
        <Timeline
          items={[
            { when: "April 15, 2026", what: "Payment 1", detail: "For income from January 1 to March 31." },
            { when: "June 15, 2026", what: "Payment 2", detail: "For April and May: only two months." },
            { when: "September 15, 2026", what: "Payment 3", detail: "For June to August." },
            { when: "January 15, 2027", what: "Payment 4", detail: "For September to December." },
            { when: "April 15, 2027", what: "Return and balance due", detail: "Anything left, with Form 1040." },
          ]}
        />
        <p>The &ldquo;quarters&rdquo; are not equal: the second covers two months and the fourth four. The penalty, though, assumes a quarter of the required amount at each date.</p>
      </GuideSection>

      <GuideSection id="safe-harbors" n={4} kicker="Key rule" title="The safe harbors">
        <p>You avoid the penalty if withholding plus estimated payments, paid on time, reach the smallest of:</p>
        <DataTable
          caption="Safe harbors for 2026"
          head={["Rule", "Pay in", "Best when"]}
          rows={[
            ["Current year", "90% of your 2026 tax", "Income is falling, or you had no 2025 return"],
            ["Prior year", "100% of your 2025 tax", "Income is rising: a fixed, known target"],
            ["Prior year, higher income", "110% of your 2025 tax if 2025 AGI was over $150,000 ($75,000 married filing separately)", "Income is rising and high"],
          ]}
        />
        <p>Each installment needs a quarter of that target by its due date.</p>
      </GuideSection>

      <GuideSection id="example-freelancer" n={5} kicker="Worked example" title="Example: a freelancer with no prior-year figure">
        <WorkedExample
          title="Single, $60,000 of self-employment profit, no withholding, first year freelancing"
          steps={[
            { label: "Self-employment tax", value: "$8,478" },
            { label: "Income tax after the standard and QBI deductions", value: "$3,559" },
            { label: "2026 tax", value: "$12,037" },
            { label: "90% safe harbor", value: "$10,833" },
            { label: "Each quarterly payment", value: "$2,708" },
          ]}
          total={{ label: "Balance with the return", value: "$1,204" }}
        />
        <p>Paying $2,708 on each date keeps the penalty at zero. To cover the whole bill instead, pay $3,009 a quarter and owe nothing in April.</p>
      </GuideSection>

      <GuideSection id="prior-year" n={6} kicker="Easier target" title="Using last year's tax">
        <p>
          The prior-year rule is the one most self-employed people use, because you know the number in advance: line 24 of your 2025 Form 1040, less refundable credits. If the same freelancer
          had a 2025 tax of $8,000 and AGI of $55,000, the target is $8,000, or $2,000 a quarter.
        </p>
        <CompareCards
          columns={[
            {
              name: "90% of 2026",
              rows: [
                { label: "Target", value: "$10,833" },
                { label: "Each payment", value: "$2,708" },
                { label: "Due in April 2027", value: "$1,204" },
              ],
            },
            {
              name: "100% of 2025",
              rows: [
                { label: "Target", value: "$8,000" },
                { label: "Each payment", value: "$2,000" },
                { label: "Due in April 2027", value: "$4,037" },
              ],
            },
          ]}
        />
        <p>
          The smaller safe harbor wins, but it only moves the tax to April. Put the difference aside, or the April bill will be a shock. If you didn&rsquo;t file for 2025, or your 2025 tax year
          was shorter than 12 months, only the 90% rule applies.
        </p>
      </GuideSection>

      <GuideSection id="high-income" n={7} kicker="Higher incomes" title="The 110% rule for higher incomes">
        <p>
          If your 2025 AGI was over $150,000 ($75,000 married filing separately), the prior-year safe harbor rises to 110%. A married couple with $150,000 of self-employment profit, a 2025 tax of
          $30,000 and 2025 AGI of $180,000 would need $33,000 under that rule. Their 2026 tax is $30,990, so 90% of it, $27,891, is lower: $6,973 a quarter.
        </p>
      </GuideSection>

      <GuideSection id="side-gig" n={8} kicker="Worked example" title="Example: a W-2 job plus a side gig">
        <WorkedExample
          title="Single, $70,000 wages with $7,000 withheld, $20,000 side-gig profit"
          steps={[
            { label: "2026 tax (including $2,826 self-employment tax)", value: "$12,667" },
            { label: "Safe harbor: 100% of the 2025 tax", value: "$7,500" },
            { label: "Less withholding", value: "−$7,000" },
            { label: "Still to pay in estimates", value: "$500" },
          ]}
          total={{ label: "Each quarterly payment", value: "$125" }}
        />
        <p>
          Withholding covers almost all of the safe harbor, so $125 a quarter is enough to avoid a penalty, but about $5,167 will still be due in April 2027. Raising withholding with the{" "}
          <a href="/us/taxes/w4-withholding-calculator">W-4 withholding calculator</a>{" "}spreads that over your paychecks instead.
        </p>
      </GuideSection>

      <GuideSection id="withholding-trick" n={9} kicker="Useful rule" title="Withholding counts as paid evenly">
        <p>
          Estimated payments count on the date you make them, but withholding is treated as paid in four equal parts on the due dates, however late in the year it was taken. So if you are behind
          in October, extra withholding from your last paychecks of 2026 is worth more than an estimated payment: it fixes earlier quarters too.
        </p>
        <Callout tone="good" title="Example">
          A target of $8,000 met entirely by withholding in November and December carries no penalty at all. The same $8,000 paid as a single estimated payment on January 15, 2027 costs about
          $229 in penalty.
        </Callout>
      </GuideSection>

      <GuideSection id="penalty" n={10} kicker="Penalty" title="How the penalty is worked out">
        <p>
          The underpayment penalty works like interest. For each installment, the IRS compares a quarter of your required payment with what you had paid by its due date. A shortfall accrues at
          the IRS underpayment rate from the due date until it is paid (later payments go to the oldest shortfall first), or until April 15, 2027.
        </p>
        <DataTable
          caption="IRS underpayment rate, 2026"
          head={["Quarter", "Rate a year"]}
          numeric={[1]}
          rows={[
            ["January to March 2026", "7%"],
            ["April to June 2026", "6%"],
            ["July to September 2026", "7%"],
            ["October to December 2026", "7%"],
          ]}
        />
        <p>The rate is the federal short-term rate plus 3 points, reset each quarter. The calculator assumes 7% continues into 2027.</p>
      </GuideSection>

      <GuideSection id="penalty-examples" n={11} kicker="Examples" title="Penalty examples">
        <DataTable
          caption="Required payments of $2,000 a quarter ($8,000 a year)"
          head={["What happened", "Penalty"]}
          numeric={[1]}
          rows={[
            ["All four paid on time", "$0"],
            ["April payment skipped, $4,000 paid in June", "$20"],
            ["Three paid, January payment skipped", "$35"],
            ["Nothing paid until January 15, 2027, then $8,000", "$229"],
            ["Nothing paid until the April 15, 2027 deadline", "$367"],
          ]}
        />
        <Bars
          format={(n) => "$" + n.toLocaleString("en-US")}
          items={[
            { label: "One late payment", value: 20 },
            { label: "January skipped", value: 35 },
            { label: "Paid in January", value: 229 },
            { label: "Paid in April", value: 367 },
          ]}
        />
        <p>The penalty is modest next to the tax itself, but it grows with every day and every dollar, and it is not deductible.</p>
      </GuideSection>

      <GuideSection id="catch-up" n={12} kicker="Behind?" title="Catching up after a missed payment">
        <p>
          If you missed earlier payments, the calculator spreads what is still needed over the remaining due dates and shows the penalty that has already built up. Paying sooner always helps:
          the penalty stops running on each dollar the day it arrives. You don&rsquo;t need to wait for a due date; you can pay as often as you like.
        </p>
        <p>
          Freelancers whose income has jumped may find the 90% target hard to reach late in the year. In that case, meet the prior-year safe harbor first, which is fixed, and set aside the rest
          for April.
        </p>
      </GuideSection>

      <GuideSection id="uneven" n={13} kicker="Seasonal income" title="Uneven income: the annualized method">
        <p>
          If most of your income arrives late in the year (a December contract, a big capital gain in the fall), equal payments overstate what you owed earlier. Form 2210&rsquo;s Schedule AI,
          the annualized income installment method, works out each installment from the income you had actually received by the end of each period. It can lower or remove the penalty for
          earlier quarters. You claim it when you file; this calculator uses the regular method, so with very uneven income its penalty figure may be too high.
        </p>
      </GuideSection>

      <GuideSection id="retirees" n={14} kicker="Worked example" title="Retirees and investors">
        <WorkedExample
          title="Married, both 65 or over: $60,000 pension, $10,000 interest, $20,000 long-term gains, $3,000 withheld"
          steps={[
            { label: "2026 tax after the senior deduction", value: "$2,250" },
            { label: "Safe harbor: 90% of 2026", value: "$2,025" },
            { label: "Withheld from the pension", value: "$3,000" },
          ]}
          total={{ label: "Estimated payments needed", value: "$0" }}
        />
        <p>
          Withholding already covers the bill, and they get $750 back. Retirees can ask for withholding on pensions (Form W-4P), IRA withdrawals and even Social Security (Form W-4V) instead of
          making quarterly payments, and it counts as paid evenly through the year.
        </p>
      </GuideSection>

      <GuideSection id="what-counts" n={15} kicker="Scope" title="What the payments cover">
        <p>
          Estimated tax covers all federal taxes on your Form 1040: income tax, self-employment tax, the 3.8% net investment income tax, the 0.9% additional Medicare tax and household employment
          taxes for a nanny or housekeeper. Refundable credits, such as the refundable part of the child tax credit, reduce what you need to pay.
        </p>
      </GuideSection>

      <GuideSection id="how-to-pay" n={16} kicker="How to" title="How to pay">
        <ul>
          <li>
            <strong>IRS Direct Pay</strong>: free, from a bank account, no sign-up. Choose &ldquo;Estimated tax&rdquo;, Form 1040-ES and tax year 2026.
          </li>
          <li>
            <strong>Your IRS online account</strong>: lets you see past payments, useful when you file.
          </li>
          <li>
            <strong>EFTPS</strong>: free, schedules payments in advance; needs enrollment.
          </li>
          <li>
            <strong>Card or digital wallet</strong>: through IRS-approved processors, for a fee.
          </li>
          <li>
            <strong>Check</strong>: with a Form 1040-ES voucher, mailed by the due date.
          </li>
        </ul>
        <p>Keep confirmation numbers. Married couples paying jointly should use the same names and order they will file with.</p>
      </GuideSection>

      <GuideSection id="january" n={17} kicker="Shortcut" title="Skipping the January payment">
        <p>
          You don&rsquo;t need to make the January 15, 2027 payment if you file your 2026 return and pay all the tax due by the end of January 2027 (February 1, 2027, since January 31 falls on
          a Sunday). That suits people who have their paperwork early.
        </p>
      </GuideSection>

      <GuideSection id="exceptions" n={18} kicker="Exceptions" title="Exceptions and waivers">
        <ul>
          <li>No penalty if you had no tax liability for 2025, were a US citizen or resident all year, and the 2025 tax year was a full 12 months.</li>
          <li>Farmers and fishers need to pay only 66⅔% of the current year&rsquo;s tax, in one payment by January 15, 2027.</li>
          <li>The IRS can waive the penalty after a casualty, disaster or other unusual circumstance, or if you retired after age 62 or became disabled and had reasonable cause.</li>
          <li>Federally declared disaster areas often get postponed due dates.</li>
        </ul>
      </GuideSection>

      <GuideSection id="state" n={19} kicker="State" title="State estimated tax">
        <p>
          Most states with an income tax have their own estimated payments, usually on the same dates, with their own safe harbors. A freelancer in a high-tax state can owe several thousand
          dollars of state tax on top of the federal figures here. The <a href="/us/taxes/state-income-tax-calculator">state income tax calculator</a>{" "}compares the states.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Forgetting self-employment tax, which is often the larger part of a freelancer&rsquo;s bill.</li>
          <li>Paying the safe harbor and spending the rest, then facing a large April bill.</li>
          <li>Using 100% of last year&rsquo;s tax when 110% applies.</li>
          <li>Paying for the wrong tax year in Direct Pay (a January payment is for the previous year).</li>
          <li>
            Forgetting estimated payments when you file, which turns a <a href="/us/taxes/tax-refund-calculator">refund</a>{" "}into an apparent bill.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "April 15, 2026", label: "Payment 1" },
            { value: "June 15, 2026", label: "Payment 2" },
            { value: "September 15, 2026", label: "Payment 3" },
            { value: "January 15, 2027", label: "Payment 4" },
            { value: "90%", label: "Of 2026 tax" },
            { value: "100% or 110%", label: "Of 2025 tax" },
            { value: "$150,000", label: "2025 AGI where 110% starts" },
            { value: "7%", label: "Underpayment rate, Q4 2026" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

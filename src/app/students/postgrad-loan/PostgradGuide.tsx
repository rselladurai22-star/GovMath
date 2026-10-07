import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Postgraduate Loan — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What the Postgraduate Loan is" },
  { id: "repayments", title: "How repayments work" },
  { id: "by-salary", title: "Repayments by salary" },
  { id: "combined", title: "With an undergraduate loan" },
  { id: "interest", title: "Interest and the 6% cap" },
  { id: "projection", title: "Will you pay it off?" },
  { id: "write-off", title: "The 30-year write-off" },
  { id: "worth-it", title: "Is a Master's worth the loan?" },
  { id: "overpaying", title: "Should you pay it off early?" },
  { id: "how-collected", title: "How HMRC and the Student Loans Company work together" },
  { id: "pensions", title: "Pensions, salary sacrifice and repayments" },
  { id: "mortgages", title: "Postgraduate Loan and mortgages" },
  { id: "refunds", title: "Refunds and overpayments" },
  { id: "life-events", title: "Career breaks, illness and death" },
  { id: "checking", title: "Checking your balance" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "income", title: "What counts as income" },
  { id: "thresholds", title: "Thresholds by pay period" },
  { id: "first-year", title: "Your first year in numbers" },
  { id: "diy", title: "Working it out yourself" },
  { id: "doctoral", title: "Doctoral Loans" },
  { id: "order", title: "Which loan clears first" },
  { id: "employers", title: "Employer and other funding" },
  { id: "end", title: "When the loan is cleared" },
  { id: "budgeting", title: "Budgeting during your course" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Master's Loan", href: "https://www.gov.uk/masters-loan" },
  { label: "GOV.UK — Doctoral Loan", href: "https://www.gov.uk/doctoral-loan" },
  { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
];

export default function PostgradGuide() {
  return (
    <Guide
      kicker="The Postgraduate Loan guide"
      title="How Postgraduate Loan repayments work"
      intro={
        <>
          The Postgraduate Loan covers Master&rsquo;s and Doctoral Loans from Student Finance England and <a href="/students/welsh-student-finance">Student Finance Wales</a>. You repay 6% of
          income above £21,000, on top of any undergraduate loan repayments. This guide explains how it works and what it costs.
        </>
      }
      meta={["2026/27 rules", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You repay 6% of income above £21,000. On £35,000, that is £70 a month.</li>
          <li>You repay it at the same time as any <a href="/students/plan-1-student-loan">Plan 1</a>, 2 or 5 loan.</li>
          <li>Interest is RPI plus 3%, capped at 6% from September 2026.</li>
          <li>Any balance left after 30 years is written off.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£21,000", label: "Repayment threshold" },
            { value: "6%", label: "Of income above it" },
            { value: "6%", label: "Interest cap 2026/27" },
            { value: "30 years", label: "Then written off" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What the Postgraduate Loan is">
        <p>
          Master&rsquo;s Loans and Doctoral Loans are paid to you, not your university, and can be used for fees or <a href="/students/student-budget">living costs</a>. They are not
          means-tested. Scottish and Northern Irish students have different postgraduate funding, repaid under their own plans.
        </p>
      </GuideSection>

      <GuideSection id="repayments" n={3} kicker="Repaying" title="How repayments work">
        <WorkedExample
          title="Salary £35,000"
          steps={[
            { label: "Income above the threshold: £35,000 − £21,000", value: "£14,000" },
            { label: "Repayment at 6%", value: "£840 a year" },
          ]}
          total={{ label: "A month", value: "£70" }}
        />
        <p>
          Repayments start from the April after you finish or leave your course. The £21,000 threshold has stayed the same since the loan
          began and is frozen for 2026/27.
        </p>
      </GuideSection>

      <GuideSection id="by-salary" n={4} kicker="Salaries" title="Repayments by salary">
        <Figure label="Monthly Postgraduate Loan repayments, 2026/27" caption="6% of income above £21,000.">
          <Bars
            items={[
              { label: "£25,000", value: 20 },
              { label: "£35,000", value: 70 },
              { label: "£45,000", value: 120 },
              { label: "£60,000", value: 195 },
              { label: "£80,000", value: 295 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="combined" n={5} kicker="Two loans" title="With an undergraduate loan">
        <p>
          If you also have an undergraduate loan, you repay both at once. On £40,000 with <a href="/students/plan-2-student-loan">Plan 2</a>, that is £79.61 a month on Plan 2 and £95 on
          the Postgraduate Loan: £174.61 in total, or 15% of income above the thresholds.
        </p>
        <CompareCards
          columns={[
            { name: "Plan 2 alone", rows: [{ label: "On £40,000", value: "£79.61 a month" }] },
            { name: "Plan 2 + Postgraduate", rows: [{ label: "On £40,000", value: "£174.61 a month" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="interest" n={6} kicker="Interest" title="Interest and the 6% cap">
        <p>
          Interest is RPI plus 3%, from the day the loan is paid out. With March 2026 RPI at 4.1%, that would be 7.1%, but the government has
          capped it at 6% for September 2026 to August 2027. It does not depend on your income.
        </p>
      </GuideSection>

      <GuideSection id="projection" n={7} kicker="Long term" title="Will you pay it off?">
        <DataTable
          caption="£12,500 balance, pay rising 3% a year, RPI 3% after this year"
          head={["Starting salary", "Total repaid", "Outcome"]}
          numeric={[1]}
          rows={[
            ["£25,000", "£33,563", "£5,596 written off after 30 years"],
            ["£35,000", "£20,776", "Cleared after 16 years"],
            ["£45,000", "£17,122", "Cleared after 10 years"],
            ["£60,000", "£15,311", "Cleared after 6 years"],
          ]}
        />
        <p>
          Because the threshold is low, most borrowers with a graduate job repay in full. Lower earners repay for longer and pay more interest.
        </p>
      </GuideSection>

      <GuideSection id="write-off" n={8} kicker="Write-off" title="The 30-year write-off">
        <p>
          Any balance is written off 30 years after the April you were first due to repay, or if you die or become permanently unable to work.
        </p>
      </GuideSection>

      <GuideSection id="worth-it" n={9} kicker="Decision" title="Is a Master's worth the loan?">
        <p>
          Think about whether the course leads to higher pay or a career that needs it. Repayments of 6% above £21,000 are on top of any
          undergraduate loan, so the combined deduction can feel large. Compare the course cost with the likely difference in earnings, and
          check for scholarships, employer sponsorship or part-time options.
        </p>
      </GuideSection>

      <GuideSection id="overpaying" n={10} kicker="Overpaying" title="Should you pay it off early?">
        <p>
          With interest at 6% and most borrowers clearing the loan, overpaying can save interest. On £35,000, an extra £100 a month clears it in
          8 years instead of 16 and cuts the total from £20,776 to £15,815.
        </p>
        <Callout title="Which loan to overpay">
          If you have Plan 2 as well, overpay the Postgraduate Loan first: Plan 2 is more likely to be written off.
        </Callout>
      </GuideSection>

      <GuideSection id="how-collected" n={11} kicker="Collection" title="How HMRC and the Student Loans Company work together">
        <p>
          Your employer works out repayments each pay day from your pay in that period and sends them to HMRC with your tax. HMRC passes the
          details to the Student Loans Company, which updates your balance. There can be a delay of several weeks before payments show in your
          online account. At the end of the tax year, your P60 shows the total deducted.
        </p>
        <p>
          Because repayments are worked out on each pay period, a one-off bonus can trigger a repayment in that month even if your yearly
          income is below the threshold. If that happens, you can ask for a refund after the tax year ends.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={12} kicker="Pay" title="Pensions, salary sacrifice and repayments">
        <p>
          Repayments are based on your pay after salary sacrifice, but before other pension contributions. Paying into a
          pension through salary sacrifice therefore saves 6% in student loan repayments, as well as income tax and National Insurance.
          Benefits in kind, such as a company car, do not count towards repayments.
        </p>
        <p>
          Above the threshold, a basic-rate taxpayer keeps about 66p of each extra pound earned, after 20% income tax, 8% National Insurance
          and 6% in student loan repayments. A higher-rate taxpayer keeps about 52p.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={13} kicker="Borrowing" title="Postgraduate Loan and mortgages">
        <p>
          Student loans do not appear on credit files and do not affect your credit score. Mortgage lenders do count the monthly repayment as an
          outgoing when working out what you can afford. On £35,000 the Postgraduate Loan repayment is £70 a month, which slightly reduces the amount
          you can borrow. Paying off the loan early just to borrow more is rarely worthwhile, because you lose savings you could have used as a
          deposit.
        </p>
      </GuideSection>

      <GuideSection id="refunds" n={14} kicker="Refunds" title="Refunds and overpayments">
        <ul>
          <li>If your income for the whole tax year was below the threshold but money was taken, you can claim it back.</li>
          <li>If deductions continue after the balance reaches zero, the Student Loans Company refunds the extra automatically or on request.</li>
          <li>Refunds can be claimed for previous tax years, with your P60s as evidence.</li>
        </ul>
      </GuideSection>

      <GuideSection id="life-events" n={15} kicker="Life events" title="Career breaks, illness and death">
        <p>
          If you stop working, for parental leave, study or illness, repayments stop when your income falls below the threshold. Interest
          continues to be added. The loan is cancelled if you become permanently unable to work because of illness or disability, and it is
          cancelled when you die: it is never passed on to your family.
        </p>
      </GuideSection>

      <GuideSection id="checking" n={16} kicker="Records" title="Checking your balance">
        <p>
          Log in to your Student Loans Company online account to see your balance, interest added and payments received. Keep your contact
          details up to date, and check your payslips show the right plan type. If your employer uses the wrong plan, you could repay too much or
          too little; tell them and HMRC so they can correct it.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={17} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Treating the balance like other debt.</strong> What you repay depends on your income.</li>
          <li><strong>Using the wrong plan.</strong> Check your plan type in your SLC account and on your payslip.</li>
          <li><strong>Forgetting to tell SLC you have moved abroad.</strong> This can lead to fixed repayments and higher interest.</li>
          <li><strong>Missing refunds.</strong> Check every year that what you paid matches your income.</li>
        </ul>
      </GuideSection>

      <GuideSection id="income" n={18} kicker="Income" title="What counts as income">
        <ul>
          <li><strong>Counts:</strong> salary, wages, overtime, bonuses and commission, and self-employed profits.</li>
          <li><strong>Counts if over £2,000 a year in total:</strong> unearned income such as savings interest, dividends and rent, reported through Self Assessment.</li>
          <li><strong>Does not count:</strong> benefits in kind such as a company car, pension income in most cases, and salary given up through salary sacrifice.</li>
        </ul>
        <p>If you have two jobs, each employer looks only at its own pay, so you may repay less through PAYE and the rest through Self Assessment.</p>
      </GuideSection>

      <GuideSection id="thresholds" n={19} kicker="Pay periods" title="Thresholds by pay period">
        <DataTable
          caption="Postgraduate Loan threshold, 2026/27"
          head={["Paid", "Threshold"]}
          numeric={[1]}
          rows={[
            ["Yearly", "£21,000"],
            ["Monthly", "£1,750"],
            ["Weekly", "about £403"],
          ]}
        />
        <p>
          Your employer compares the pay in each period with these figures and takes 6% of anything above them. If your pay is uneven, the
          monthly amounts can vary a lot even though the yearly total is what matters.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={20} kicker="Example" title="Your first year in numbers">
        <WorkedExample
          title="Balance £12,500, salary £35,000"
          steps={[
            { label: "Interest added this year at 6%", value: "£750" },
            { label: "Repaid through your pay", value: "£840" },
          ]}
          total={{ label: "Change in the balance", value: "Falls" }}
        />
        <p>
          When interest is more than your repayments, the balance grows even though you are paying. That is normal for income-contingent loans
          and does not change what you pay each month, which depends only on your income.
        </p>
      </GuideSection>

      <GuideSection id="diy" n={21} kicker="How to" title="Working it out yourself">
        <ol>
          <li>Take your yearly income before tax.</li>
          <li>Subtract the Postgraduate Loan threshold of £21,000.</li>
          <li>Multiply what is left by 6%. That is your yearly repayment.</li>
          <li>Divide by 12 for a monthly figure.</li>
        </ol>
        <p>The calculator does this for you, adds any Postgraduate Loan, and projects the balance over the years ahead.</p>
      </GuideSection>

      <GuideSection id="doctoral" n={22} kicker="PhDs" title="Doctoral Loans">
        <p>
          Doctoral Loans support PhD and similar research degrees. They are paid over the length of the course and can be used for fees or
          living costs. They are added to any Master&rsquo;s Loan to form one Postgraduate Loan balance, repaid at 6% above £21,000. Students
          with research council funding cannot usually get a Doctoral Loan as well.
        </p>
      </GuideSection>

      <GuideSection id="order" n={23} kicker="Two loans" title="Which loan clears first">
        <p>
          The Postgraduate Loan has a low threshold and, on most salaries, is cleared well before a Plan 2 or <a href="/students/plan-5-student-loan">Plan 5</a>{" "}loan. On £35,000, the
          example £12,500 Postgraduate Loan clears in 16 years. After that, you only repay your undergraduate loan, and your take-home pay rises
          by £70 a month.
        </p>
      </GuideSection>

      <GuideSection id="employers" n={24} kicker="Funding" title="Employer and other funding">
        <ul>
          <li>Some employers pay for job-related Master&rsquo;s degrees, sometimes through the apprenticeship levy.</li>
          <li>Universities offer scholarships and fee discounts, including for their own graduates.</li>
          <li>Charities and professional bodies fund some courses.</li>
          <li>Part-time study while working can spread the cost.</li>
        </ul>
        <p>Any of these can reduce how much you need to borrow, and therefore how long you repay.</p>
      </GuideSection>

      <GuideSection id="end" n={25} kicker="Finishing" title="When the loan is cleared">
        <p>
          PAYE deductions can continue for a few months after the balance reaches zero, because of the delay in sharing data between HMRC and
          the Student Loans Company. You can switch to Direct Debit near the end to avoid this. Any overpayment is refunded.
        </p>
      </GuideSection>

      <GuideSection id="budgeting" n={26} kicker="Budgeting" title="Budgeting during your course">
        <p>
          Unlike undergraduate funding, the Postgraduate Loan is a single sum paid straight to you, not split into a fee
          loan and a living cost loan. It is up to you to pay your <a href="/students/degree-cost">tuition fees</a>{" "}from it and make the rest last.
        </p>
        <ul>
          <li>
            <strong>Pay your fees first.</strong> Check when your university wants the fees and how much it will take in each
            instalment, and set that money aside as soon as each payment arrives.
          </li>
          <li>
            <strong>Plan for the gaps.</strong> Payments arrive in instalments across the year, so the money has to cover the
            weeks in between, including the summer dissertation period.
          </li>
          <li>
            <strong>Count the whole course.</strong>{" "}On a part-time course the loan is spread over more years, so each
            year&rsquo;s payment is smaller.
          </li>
          <li>
            <strong>Look for other money.</strong> University bursaries, departmental funding and part-time work can fill the
            gap without adding to your loan.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={27} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£21,000", label: "Threshold" },
            { value: "6%", label: "Repayment rate" },
            { value: "6%", label: "Interest cap from Sept 2026" },
            { value: "7.1%", label: "RPI + 3% without the cap" },
            { value: "30 years", label: "Write-off" },
            { value: "£70", label: "A month on £35,000" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

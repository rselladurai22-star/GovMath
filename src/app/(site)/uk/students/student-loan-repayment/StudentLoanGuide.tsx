import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Student loan repayment (all plans) — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "which-plan", title: "Which plan are you on?" },
  { id: "rates", title: "Thresholds and rates for every plan" },
  { id: "collection", title: "How the money is taken" },
  { id: "plan-1", title: "Plan 1 in depth" },
  { id: "plan-4", title: "Plan 4 in depth" },
  { id: "postgrad", title: "The Postgraduate Loan in depth" },
  { id: "plan-2-5", title: "Plan 2 and Plan 5" },
  { id: "several", title: "Holding more than one plan" },
  { id: "examples", title: "Worked examples" },
  { id: "by-salary", title: "Repayments by salary, side by side" },
  { id: "interest", title: "Interest each September" },
  { id: "projections", title: "Who clears the loan and who does not" },
  { id: "early", title: "Paying off early" },
  { id: "pay-periods", title: "Thresholds by pay period" },
  { id: "self-employed", title: "Self-employed and Self Assessment" },
  { id: "abroad", title: "Living or working abroad" },
  { id: "refunds", title: "Refunds" },
  { id: "mortgages", title: "Mortgages and borrowing" },
  { id: "pensions", title: "Pensions and salary sacrifice" },
  { id: "end", title: "Near the end of your loan" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "income", title: "What counts as income" },
  { id: "life-events", title: "Breaks in work, illness and death" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK: Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK: Which repayment plan you are on", href: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
  { label: "GOV.UK: When your student loan gets written off or cancelled", href: "https://www.gov.uk/repaying-your-student-loan/when-your-student-loan-gets-written-off-or-cancelled" },
  { label: "GOV.UK: Master's Loan", href: "https://www.gov.uk/masters-loan" },
  { label: "GOV.UK: Doctoral Loan", href: "https://www.gov.uk/doctoral-loan" },
  { label: "Student Awards Agency Scotland", href: "https://www.saas.gov.uk/" },
];

export default function StudentLoanGuide() {
  return (
    <Guide
      kicker="The student loan guide"
      title="Student loan repayments in 2026/27: every plan explained"
      intro={
        <>
          The UK has five income-contingent student loan plans in repayment, and each one sets its own salary threshold, interest rule and
          write-off date. This guide puts all five side by side, goes deep on Plan 1, Plan 4 and the Postgraduate Loan, and shows what each
          plan takes from a typical pay packet in 2026/27.
        </>
      }
      meta={["2026/27 rules", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Undergraduate plans take 9% of what you earn above the plan&rsquo;s threshold; the Postgraduate Loan takes 6%.</li>
          <li>Thresholds for 2026/27: Plan 1 £26,900, Plan 2 £29,385, Plan 4 £33,795, Plan 5 £25,000, Postgraduate £21,000.</li>
          <li>Interest from September 2026 is 4.1% on Plans 1, 4 and 5, between 4.1% and 6% on Plan 2, and 6% on the Postgraduate Loan.</li>
          <li>Whatever is left is cancelled after 25, 30 or 40 years depending on the plan, so many graduates never clear the full balance.</li>
        </ul>
        <KeyStats
          items={[
            { value: "9%", label: "Undergraduate plans" },
            { value: "6%", label: "Postgraduate Loan" },
            { value: "£25,000", label: "Lowest undergraduate threshold (Plan 5)" },
            { value: "£33,795", label: "Highest threshold (Plan 4)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="which-plan" n={2} kicker="Your plan" title="Which plan are you on?">
        <p>
          Your plan depends on where you lived when you applied for funding and the year your course began, not on where you studied or
          where you work now. A Scottish student at a university in Manchester is still on Plan 4; an English student who moved to Glasgow
          after graduating keeps their English plan.
        </p>
        <DataTable
          caption="Plans by home nation and course start"
          head={["Plan", "Who has it"]}
          rows={[
            ["Plan 1", "England or Wales, undergraduate course started before 1 September 2012; Northern Ireland, any start year"],
            ["Plan 2", "England or Wales, undergraduate course started between 1 September 2012 and 31 July 2023 (Wales: any start from 2012)"],
            ["Plan 4", "Scotland (loans from the Student Awards Agency Scotland)"],
            ["Plan 5", "England, undergraduate course starting on or after 1 August 2023"],
            ["Postgraduate Loan", "Master’s or Doctoral loans from Student Finance England or Student Finance Wales"],
          ]}
        />
        <p>
          If you are unsure, sign in to your Student Loans Company account: the plan type is shown next to each loan. Your payslip may also
          say it, because employers need the plan code to deduct the right amount.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="The rules" title="Thresholds and rates for every plan">
        <p>
          The table gathers the headline rules for the 2026/27 tax year, which runs from 6 April 2026 to 5 April 2027. Interest runs on a
          different calendar, from 1 September 2026 to 31 August 2027.
        </p>
        <DataTable
          caption="Student loan plans, 2026/27"
          head={["Plan", "Threshold a year", "Rate above it", "Interest from Sept 2026", "Cancelled after"]}
          numeric={[1, 2]}
          rows={[
            ["Plan 1", "£26,900", "9%", "4.1%", "25 years (or at 65 for older loans)"],
            ["Plan 2", "£29,385", "9%", "4.1% to 6%", "30 years"],
            ["Plan 4", "£33,795", "9%", "4.1%", "30 years (or at 65 for older loans)"],
            ["Plan 5", "£25,000", "9%", "4.1%", "40 years"],
            ["Postgraduate", "£21,000", "6%", "6%", "30 years"],
          ]}
        />
        <p>
          The thresholds move in different ways. Plan 1 and Plan 4 rise with RPI each April. Plan 5 begins rising with RPI from April 2027.
          Plan 2 is held at £29,385 from April 2027 until April 2030. The Postgraduate threshold has stayed at £21,000 since the loan began.
        </p>
      </GuideSection>

      <GuideSection id="collection" n={4} kicker="Mechanics" title="How the money is taken">
        <p>
          For employees, nothing has to be arranged. HMRC tells your employer which plan codes apply, and payroll software works out the
          deduction every time you are paid, in the same pass that handles Income Tax and National Insurance. The deduction shows on your
          payslip as a separate line, usually labelled SL for the undergraduate plan and PGL for a Postgraduate Loan.
        </p>
        <p>
          Each pay packet is judged on its own. If one month includes overtime or a bonus that lifts that month above the monthly threshold,
          a deduction is taken that month, even if your pay for the whole year ends up below the yearly figure. That is the main reason
          refunds exist (see below).
        </p>
        <p>
          Your employer sends the money to HMRC with your tax. HMRC then passes the details to the Student Loans Company, which updates your
          balance. There is a lag: your online account may take several weeks to reflect a payment, and a full year&rsquo;s figures are
          confirmed only after the tax year closes.
        </p>
        <Callout title="Starting a new job">
          Tell the new employer your plan type on the starter checklist. If you forget, HMRC will usually send them a notice later, but in
          the meantime deductions may be missing and you could face a larger catch-up.
        </Callout>
      </GuideSection>

      <GuideSection id="plan-1" n={5} kicker="Plan 1" title="Plan 1 in depth">
        <p>
          Plan 1 belongs to the earlier fee era, when English tuition fees were £3,000 or so a year, so balances are usually much smaller
          than on later plans. It also covers every Northern Irish borrower, including recent graduates, because Northern Ireland never
          moved to Plan 2.
        </p>
        <ul>
          <li><strong>Threshold:</strong> £26,900 a year in 2026/27, uprated each April with RPI.</li>
          <li><strong>Interest:</strong> whichever is lower of RPI and the Bank of England base rate plus one point. From September 2026 that gives 4.1%.</li>
          <li><strong>Cancellation:</strong> loans taken out from 1 September 2006 in England and Wales, and from the 2007/08 year in Northern Ireland, are cancelled 25 years after the April you first became due to repay. Earlier loans are cancelled when you reach 65.</li>
        </ul>
        <p>
          Because the balances are modest and the interest is low, most Plan 1 borrowers on an average salary pay the loan off well before
          the cancellation date. With a £15,000 balance and £35,000 salary, our projection clears the debt in 22 years.
        </p>
      </GuideSection>

      <GuideSection id="plan-4" n={6} kicker="Plan 4" title="Plan 4 in depth">
        <p>
          Plan 4 covers loans from the Student Awards Agency Scotland. Scottish students do not pay tuition fees at Scottish universities, so
          the loan is mainly for living costs, but anyone who studied elsewhere in the UK may have a larger balance to cover fees. If you
          are still deciding, the <a href="/uk/students/saas-funding">SAAS funding calculator</a>{" "}
          shows what you can borrow.
        </p>
        <ul>
          <li><strong>Threshold:</strong> £33,795 a year, the highest of any plan, rising with RPI.</li>
          <li><strong>Interest:</strong> the same rule as Plan 1, so 4.1% from September 2026.</li>
          <li><strong>Cancellation:</strong> loans from the 2007/08 academic year onward are cancelled 30 years after the April you first became due to repay. Older loans go at 65 or after 30 years, whichever happens first.</li>
        </ul>
        <p>
          The high threshold means a Scottish graduate on £35,000 repays only £108.45 a year, about £9.04 a month. Take-home pay also
          depends on Scottish income tax, which our{" "}
          <a href="/uk/tax-and-salary/scottish-tax">Scottish tax calculator</a>{" "}
          works out alongside the loan.
        </p>
      </GuideSection>

      <GuideSection id="postgrad" n={7} kicker="Postgraduate" title="The Postgraduate Loan in depth">
        <p>
          Master&rsquo;s and Doctoral loans from England and Wales share one repayment plan. It is separate from any undergraduate loan and
          is repaid on top of it, so a graduate with both pays two deductions at once.
        </p>
        <ul>
          <li><strong>Threshold:</strong> £21,000 a year, which has not changed since the loan was introduced.</li>
          <li><strong>Rate:</strong> 6% of income above the threshold, lower than the 9% on undergraduate plans.</li>
          <li><strong>Interest:</strong> RPI plus 3%, capped at 6% for September 2026 to August 2027, so 6%.</li>
          <li><strong>Cancellation:</strong> 30 years after the April you first became due to repay.</li>
        </ul>
        <p>
          The low threshold means repayments start sooner than on any undergraduate plan. On £30,000 you repay £540 a year, or £45 a
          month, even before any undergraduate deduction is added.
        </p>
      </GuideSection>

      <GuideSection id="plan-2-5" n={8} kicker="Other plans" title="Plan 2 and Plan 5">
        <p>
          The two biggest groups of English borrowers have their own pages with fuller guides. Plan 2 covers the £9,000-fee years and has a
          sliding interest rate that climbs with income; the{" "}
          <a href="/uk/students/plan-2-student-loan">Plan 2 calculator</a>{" "}
          explains the sliding scale and the threshold freeze. Plan 5 applies to English students who began in August 2023 or later, with
          a lower threshold, interest at RPI only and a 40-year term; see the{" "}
          <a href="/uk/students/plan-5-student-loan">Plan 5 calculator</a>{" "}
          for its long-range projection. You can also pick either plan in the calculator above.
        </p>
      </GuideSection>

      <GuideSection id="several" n={9} kicker="Combinations" title="Holding more than one plan">
        <p>
          Some graduates hold two undergraduate plans, for example a Plan 1 loan from a first degree and a Plan 2 loan from a later one. You
          do not pay 9% twice. You pay 9% once, measured from the lowest threshold among your plans, and the Student Loans Company splits the
          money between the loans.
        </p>
        <p>
          A Postgraduate Loan is different: its 6% is always added on top. Someone on £35,000 with Plan 2 and a Master&rsquo;s loan pays
          £505.35 on Plan 2 plus £840 on the Postgraduate Loan, £1,345.35 a year or £112.11 a month.
        </p>
        <CompareCards
          columns={[
            { name: "Two undergraduate plans", rows: [{ label: "Rate", value: "9% once" }, { label: "Measured from", value: "The lowest of the thresholds" }] },
            { name: "Undergraduate plus Postgraduate", rows: [{ label: "Rate", value: "9% plus 6%" }, { label: "Measured from", value: "Each plan’s own threshold" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="examples" n={10} kicker="Examples" title="Worked examples">
        <WorkedExample
          title="Plan 1, salary £35,000"
          steps={[
            { label: "Pay above £26,900", value: "£8,100" },
            { label: "9% of that", value: "£729 a year" },
          ]}
          total={{ label: "A month", value: "£60.75" }}
        />
        <WorkedExample
          title="Plan 4, salary £45,000"
          steps={[
            { label: "Pay above £33,795", value: "£11,205" },
            { label: "9% of that", value: "£1,008.45 a year" },
          ]}
          total={{ label: "A month", value: "£84.04" }}
        />
        <WorkedExample
          title="Postgraduate Loan, salary £35,000"
          steps={[
            { label: "Pay above £21,000", value: "£14,000" },
            { label: "6% of that", value: "£840 a year" },
          ]}
          total={{ label: "A month", value: "£70" }}
        />
        <WorkedExample
          title="Plan 1 and Postgraduate, salary £50,000"
          steps={[
            { label: "Plan 1: 9% above £26,900", value: "£2,079" },
            { label: "Postgraduate: 6% above £21,000", value: "£1,740" },
          ]}
          total={{ label: "A year in total", value: "£3,819 (£318.25 a month)" }}
        />
      </GuideSection>

      <GuideSection id="by-salary" n={11} kicker="Comparison" title="Repayments by salary, side by side">
        <p>
          The same salary leads to very different deductions depending on the plan. The table shows the monthly amount for one plan on its
          own in 2026/27.
        </p>
        <DataTable
          caption="Monthly repayment, 2026/27"
          head={["Salary", "Plan 1", "Plan 2", "Plan 4", "Plan 5", "Postgraduate"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["£25,000", "£0", "£0", "£0", "£0", "£20"],
            ["£30,000", "£23.25", "£4.61", "£0", "£37.50", "£45"],
            ["£35,000", "£60.75", "£42.11", "£9.04", "£75", "£70"],
            ["£45,000", "£135.75", "£117.11", "£84.04", "£150", "£120"],
            ["£60,000", "£248.25", "£229.61", "£196.54", "£262.50", "£195"],
            ["£80,000", "£398.25", "£379.61", "£346.54", "£412.50", "£295"],
          ]}
        />
        <Bars
          items={[
            { label: "Plan 5", value: 75 },
            { label: "Postgraduate", value: 70 },
            { label: "Plan 1", value: 60.75 },
            { label: "Plan 2", value: 42.11 },
            { label: "Plan 4", value: 9.04 },
          ]}
        />
        <p>The bars show a month&rsquo;s repayment on a £35,000 salary.</p>
      </GuideSection>

      <GuideSection id="interest" n={12} kicker="Interest" title="Interest each September">
        <p>
          Interest is set once a year from the March RPI figure and applies from 1 September. March 2026 RPI was 4.1%, which drives every
          plan this year:
        </p>
        <ul>
          <li>Plans 1 and 4 take the lower of RPI and base rate plus one point: 4.1%.</li>
          <li>Plan 5 charges RPI alone: 4.1%.</li>
          <li>Plan 2 charges RPI on incomes up to £29,385, rising in a straight line to RPI plus 3% at £52,885, but capped at 6% this year.</li>
          <li>The Postgraduate Loan charges RPI plus 3%, capped at 6%.</li>
        </ul>
        <p>
          Interest is added to the balance daily. On a £15,000 Plan 1 balance, a year at 4.1% adds about £615, so a Plan 1 graduate on
          £35,000 repaying £729 a year is only just ahead of the interest at first.
        </p>
      </GuideSection>

      <GuideSection id="projections" n={13} kicker="The long view" title="Who clears the loan and who does not">
        <p>
          Whether you ever finish depends on balance, salary and how pay grows. These projections assume pay and RPI both rise 3% a year
          after 2026/27, starting from the first year of repayment.
        </p>
        <DataTable
          caption="Projected outcome by starting salary"
          head={["Starting salary", "Plan 1, £15,000", "Plan 4, £20,000", "Postgraduate, £12,500"]}
          rows={[
            ["£25,000", "£31,742 cancelled", "£49,064 cancelled", "£5,596 cancelled"],
            ["£35,000", "Cleared in 22 years", "£41,397 cancelled", "Cleared in 16 years"],
            ["£45,000", "Cleared in 10 years", "Cleared in 21 years", "Cleared in 10 years"],
            ["£60,000", "Cleared in 6 years", "Cleared in 9 years", "Cleared in 6 years"],
          ]}
        />
        <p>
          The Plan 4 pattern stands out: the high threshold keeps repayments small on middle incomes, so the balance can grow for decades
          and much of it is cancelled. On £45,000 the same loan is cleared in 21 years, repaying £28,273 in total.
        </p>
      </GuideSection>

      <GuideSection id="early" n={14} kicker="Overpaying" title="Paying off early">
        <p>
          You can make extra payments at any time through your Student Loans Company account, by card or bank transfer, or set up a regular
          direct debit. There is no penalty. Whether it is worth it depends on whether you would clear the loan anyway.
        </p>
        <ul>
          <li>Plan 1, £15,000 balance, £35,000 salary: an extra £50 a month brings the end forward from 22 years to 13, and total repaid falls from £21,474 to £18,566.</li>
          <li>Postgraduate, £12,500 balance, £35,000 salary: an extra £100 a month clears it in 8 years instead of 16, saving about £4,961 in total payments.</li>
        </ul>
        <Callout tone="warn" title="When overpaying wastes money">
          If the projection says the loan will be cancelled with a balance left, extra payments mostly shrink the cancelled amount rather than
          your total cost. Check the calculator before committing spare cash, and compare with a pension, an emergency fund or a mortgage
          deposit.
        </Callout>
      </GuideSection>

      <GuideSection id="pay-periods" n={15} kicker="Payroll" title="Thresholds by pay period">
        <p>Payroll measures each pay period against its share of the yearly threshold.</p>
        <DataTable
          caption="Thresholds, 2026/27"
          head={["Plan", "Monthly", "Weekly"]}
          numeric={[1, 2]}
          rows={[
            ["Plan 1", "£2,241.67", "£517.31"],
            ["Plan 2", "£2,448.75", "£565.10"],
            ["Plan 4", "£2,816.25", "£649.90"],
            ["Plan 5", "£2,083.33", "£480.77"],
            ["Postgraduate", "£1,750", "£403.85"],
          ]}
        />
      </GuideSection>

      <GuideSection id="self-employed" n={16} kicker="Self Assessment" title="Self-employed and Self Assessment">
        <p>
          If you work for yourself, or have untaxed income such as rent, savings interest over the limits or dividends, repayments are
          collected through your tax return. Tick the student loan box, give your plan types, and HMRC adds the amount to your bill, due on
          31 January after the tax year.
        </p>
        <p>
          The calculation uses total income above the threshold, including anything already deducted by an employer, which is then credited.
          Unearned income counts only if it is over £2,000 in the year. Payments on account are not charged on student loan repayments, but
          the bill can still come as a surprise the first time, so set money aside as you go.
        </p>
      </GuideSection>

      <GuideSection id="abroad" n={17} kicker="Overseas" title="Living or working abroad">
        <p>
          Moving abroad does not end the loan. You must tell the Student Loans Company and send evidence of income; it then sets fixed monthly
          repayments using a threshold for your country, adjusted for local prices. If you do not provide the evidence, it can set repayments
          as though you earn a high salary. UK payroll deductions stop once you leave a UK job.
        </p>
      </GuideSection>

      <GuideSection id="refunds" n={18} kicker="Money back" title="Refunds">
        <p>You can usually reclaim money in three situations:</p>
        <ol>
          <li>Your yearly income ended below the threshold but a single high month triggered a deduction.</li>
          <li>Deductions continued after the balance reached zero, often because the payroll stop notice arrived late.</li>
          <li>Deductions were taken under the wrong plan, or before the April you were due to start repaying.</li>
        </ol>
        <p>
          Claim through your online account or by phone. The Student Loans Company checks HMRC records before paying, which can take several
          weeks after the tax year closes. Refunds for overpayment after clearing are often made automatically.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={19} kicker="Borrowing" title="Mortgages and borrowing">
        <p>
          A student loan does not appear on credit files, so it does not change your credit score. Lenders do see it on payslips, though,
          and most treat the monthly deduction as a regular cost when testing affordability. A Postgraduate Loan stacked on Plan 2 at
          £50,000 takes £299.61 a month, which can trim the amount a lender offers. Overpaying a loan you would otherwise never clear will not
          help a mortgage application much, because the deduction stays the same until the balance is gone.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={20} kicker="Pay" title="Pensions and salary sacrifice">
        <p>
          Repayments are worked out on the same pay as National Insurance, so only a pension arranged through salary sacrifice cuts the loan
          deduction. Contributions under the net pay method or relief at source lower your tax but not your student loan repayment. Our{" "}
          <a href="/uk/tax-and-salary/salary-calculator">salary calculator</a>{" "}
          shows take-home pay with the loan, tax, National Insurance and pension together.
        </p>
      </GuideSection>

      <GuideSection id="end" n={21} kicker="Finishing" title="Near the end of your loan">
        <p>
          Once the balance gets close to zero, switching to direct debit for the last stretch avoids a refund chase. The Student Loans
          Company offers this in the final two years or so. Keep an eye on the online statement and the cancellation date: a Plan 1
          graduate with £8,000 left, earning £40,000 and 15 years into repayment, clears it in 8 years on our assumptions, well before
          cancellation at 25 years.
        </p>
        <Timeline
          items={[
            { when: "April after you leave your course", what: "First date you can be due to repay" },
            { when: "Each April", what: "New thresholds for the tax year" },
            { when: "Each September", what: "New interest rates" },
            { when: "25, 30 or 40 years on", what: "Any balance left is cancelled" },
          ]}
        />
      </GuideSection>

      <GuideSection id="mistakes" n={22} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Picking the wrong plan.</strong> Plan type follows your home nation and start date, not the university you went to.</li>
          <li><strong>Treating the balance like credit card debt.</strong> What you repay is tied to income, so the headline balance matters less than you think.</li>
          <li><strong>Forgetting the Postgraduate Loan.</strong> It adds 6% on top, from £21,000.</li>
          <li><strong>Not reclaiming refunds.</strong> A bonus month in a low year can trigger a deduction you can get back.</li>
          <li><strong>Overpaying a loan that will be cancelled anyway.</strong> Run the projection first; the{" "}
            <a href="/uk/students/degree-cost">degree cost calculator</a>{" "}
            shows the same trade-off before you start a course.</li>
        </ul>
      </GuideSection>

      <GuideSection id="income" n={23} kicker="Income" title="What counts as income">
        <p>
          For employees, the deduction is based on gross pay in each pay period: salary, overtime, commission and bonuses, less anything given
          up through salary sacrifice. Benefits in kind such as a company car are not counted by payroll. In a tax return, HMRC looks at
          earnings from work and self-employment together, and adds unearned income such as interest, dividends and rent only when that
          unearned income is above £2,000 for the year.
        </p>
        <p>
          A partner&rsquo;s income never counts. Repayments depend only on what you personally earn, which is one reason the loan behaves more
          like an extra tax band than a household debt.
        </p>
      </GuideSection>

      <GuideSection id="life-events" n={24} kicker="Life changes" title="Breaks in work, illness and death">
        <p>
          If you stop work, go part time, take parental leave or study again, repayments simply pause whenever your pay falls under the
          threshold; there is nothing to apply for. Interest continues to build up while repayments are paused, so the balance may rise.
        </p>
        <p>
          The loan is cancelled if you become permanently unable to work through illness or disability, with evidence, and it is cancelled
          on death. It never passes to your family or your estate, and nobody else has to pay it.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "2026/27"]}
          rows={[
            ["Plan 1 threshold", "£26,900"],
            ["Plan 2 threshold", "£29,385"],
            ["Plan 4 threshold", "£33,795"],
            ["Plan 5 threshold", "£25,000"],
            ["Postgraduate threshold", "£21,000"],
            ["Repayment rate", "9% (Postgraduate 6%)"],
            ["Interest, Plans 1, 4 and 5", "4.1%"],
            ["Interest, Plan 2", "4.1% to 6%"],
            ["Interest, Postgraduate", "6%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

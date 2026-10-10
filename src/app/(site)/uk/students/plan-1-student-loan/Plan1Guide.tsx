import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Plan 1 student loan — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who has a Plan 1 loan" },
  { id: "repayments", title: "How repayments work" },
  { id: "by-salary", title: "Repayments by salary" },
  { id: "interest", title: "Interest on Plan 1" },
  { id: "projection", title: "When will it be paid off?" },
  { id: "write-off", title: "When Plan 1 is written off" },
  { id: "overpaying", title: "Should you pay it off early?" },
  { id: "two-plans", title: "If you have more than one loan" },
  { id: "marginal", title: "How it feels in your payslip" },
  { id: "self-employed", title: "Self-employed, abroad and other income" },
  { id: "nearly-done", title: "When you are close to finishing" },
  { id: "how-collected", title: "How HMRC and the Student Loans Company work together" },
  { id: "pensions", title: "Pensions, salary sacrifice and repayments" },
  { id: "mortgages", title: "Plan 1 and mortgages" },
  { id: "refunds", title: "Refunds and overpayments" },
  { id: "life-events", title: "Career breaks, illness and death" },
  { id: "checking", title: "Checking your balance" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "income", title: "What counts as income" },
  { id: "thresholds", title: "Thresholds by pay period" },
  { id: "first-year", title: "Your first year in numbers" },
  { id: "diy", title: "Working it out yourself" },
  { id: "history", title: "A short history of Plan 1" },
  { id: "budget", title: "Planning for the end of repayments" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK — When your student loan gets written off or cancelled", href: "https://www.gov.uk/repaying-your-student-loan/when-your-student-loan-gets-written-off-or-cancelled" },
  { label: "GOV.UK — Which repayment plan you are on", href: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
];

export default function Plan1Guide() {
  return (
    <Guide
      kicker="The Plan 1 guide"
      title="How Plan 1 student loan repayments work in 2026/27"
      intro={
        <>
          Plan 1 is the oldest income-contingent student loan still being repaid. It covers students from England and Wales who started before
          September 2012, and students from Northern Ireland. You repay 9% of income above £26,900, interest is low, and many Plan 1 borrowers are
          now close to clearing their loans.
        </>
      }
      meta={["2026/27 rules", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You repay 9% of income above £26,900 a year. On £35,000, that is £60.75 a month.</li>
          <li>Interest from September 2026 is 4.1%, the lower of RPI and the Bank of England base rate plus 1%.</li>
          <li>The threshold rises with RPI each April.</li>
          <li>Loans are written off 25 years after you were first due to repay, or at 65 for older loans.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£26,900", label: "Repayment threshold" },
            { value: "9%", label: "Of income above it" },
            { value: "4.1%", label: "Interest from Sept 2026" },
            { value: "25 years", label: "Write-off for most" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who has a Plan 1 loan">
        <ul>
          <li>English or Welsh students who started an undergraduate course before 1 September 2012.</li>
          <li>Northern Irish students, whenever they started.</li>
        </ul>
        <p>Scottish students are on <a href="/uk/students/plan-4-student-loan">Plan 4</a>. Your Student Loans Company account confirms your plan.</p>
      </GuideSection>

      <GuideSection id="repayments" n={3} kicker="Repaying" title="How repayments work">
        <WorkedExample
          title="Salary £35,000"
          steps={[
            { label: "Income above the threshold: £35,000 − £26,900", value: "£8,100" },
            { label: "Repayment at 9%", value: "£729 a year" },
          ]}
          total={{ label: "A month", value: "£60.75" }}
        />
        <p>
          Employers take repayments through PAYE. The monthly threshold is about £2,241. If your pay varies, you may repay in some months and
          not others; the total for the year is what counts.
        </p>
      </GuideSection>

      <GuideSection id="by-salary" n={4} kicker="Salaries" title="Repayments by salary">
        <Figure label="Monthly Plan 1 repayments, 2026/27" caption="9% of income above £26,900.">
          <Bars
            items={[
              { label: "£30,000", value: 23.25 },
              { label: "£35,000", value: 60.75 },
              { label: "£45,000", value: 135.75 },
              { label: "£60,000", value: 248.25 },
              { label: "£80,000", value: 398.25 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="interest" n={5} kicker="Interest" title="Interest on Plan 1">
        <p>
          Plan 1 interest is the lower of the Retail Prices Index from March and the Bank of England base rate plus 1%. From 1 September 2026 to
          31 August 2027 it is 4.1%, the March 2026 RPI. Unlike <a href="/uk/students/plan-2-student-loan">Plan 2</a>, it does not depend on your income, and there is no extra percentage
          while you study.
        </p>
      </GuideSection>

      <GuideSection id="projection" n={6} kicker="Long term" title="When will it be paid off?">
        <DataTable
          caption="£15,000 balance, pay rising 3% a year, RPI 3% after this year, 25 years left"
          head={["Starting salary", "Total repaid", "Cleared after"]}
          numeric={[1]}
          rows={[
            ["£25,000", "£0", "Not cleared, £31,742 written off"],
            ["£35,000", "£21,474", "22 years"],
            ["£45,000", "£17,794", "10 years"],
            ["£60,000", "£16,651", "6 years"],
          ]}
        />
        <p>
          Plan 1 balances are usually smaller than later plans, because <a href="/uk/students/degree-cost">tuition fees</a>{" "}were lower. Many borrowers on average incomes will clear
          the loan before the write-off. Enter how many years you have already been repaying under &ldquo;More options&rdquo; for a better
          estimate.
        </p>
      </GuideSection>

      <GuideSection id="write-off" n={7} kicker="Write-off" title="When Plan 1 is written off">
        <Timeline
          items={[
            { when: "Loans from 1 September 2006 (England and Wales)", what: "25 years after the April you were first due to repay", detail: "" },
            { when: "Loans before 1 September 2006", what: "When you turn 65", detail: "" },
            { when: "Northern Ireland, from 2007/08", what: "25 years after the April you were first due to repay", detail: "Older loans at 65." },
          ]}
        />
        <p>Loans are also cancelled if you die or become permanently unable to work because of illness or disability.</p>
      </GuideSection>

      <GuideSection id="overpaying" n={8} kicker="Overpaying" title="Should you pay it off early?">
        <p>
          On £35,000 with a £15,000 balance, an extra £100 a month clears the loan in 9 years instead of 22, and cuts the total repaid from
          £21,474 to £17,484. With interest at 4.1%, that is a reasonable return if you would clear the loan anyway. But if your balance is
          large compared with your income, or you are near the write-off date, overpaying may only reduce the amount written off.
        </p>
        <Callout title="Compare with savings">If a savings account pays more than your loan interest after tax, saving may be better than overpaying.</Callout>
      </GuideSection>

      <GuideSection id="two-plans" n={9} kicker="Two loans" title="If you have more than one loan">
        <CompareCards
          columns={[
            { name: "Plan 1 and Plan 2", rows: [{ label: "How", value: "9% above the Plan 1 threshold, shared between the loans" }, { label: "Order", value: "Plan 1 first, then Plan 2 on income above £29,385" }] },
            { name: "Plan 1 and Postgraduate", rows: [{ label: "How", value: "9% above £26,900 plus 6% above £21,000" }, { label: "Order", value: "Both at once" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="marginal" n={10} kicker="Take-home pay" title="How it feels in your payslip">
        <p>
          Above the threshold, a basic-rate taxpayer keeps 63p of each extra pound after income tax, National Insurance and the 9% repayment.
          Pension contributions through <a href="/uk/tax-and-salary/salary-sacrifice">salary sacrifice</a>{" "}reduce the pay used for repayments, so they save 9% as well.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={11} kicker="Other income" title="Self-employed, abroad and other income">
        <p>
          Self-employed people repay through Self Assessment. Other income over £2,000, such as rent or savings interest, also counts. If you
          move abroad, tell the Student Loans Company and repay directly using thresholds for your new country.
        </p>
      </GuideSection>

      <GuideSection id="nearly-done" n={12} kicker="Finishing" title="When you are close to finishing">
        <p>
          PAYE deductions can continue for a few months after the balance reaches zero, because the Student Loans Company and HMRC share data
          with a delay. When you are within about two years of clearing the loan, you can switch to Direct Debit so payments stop at the right
          time. Any overpayment is refunded.
        </p>
      </GuideSection>

      <GuideSection id="how-collected" n={13} kicker="Collection" title="How HMRC and the Student Loans Company work together">
        <p>
          Your employer works out repayments each pay day from your pay in that period and sends them to HMRC with your tax. HMRC passes the
          details to the Student Loans Company, which updates your balance. There can be a delay of several weeks before payments show in your
          online account. At the end of the tax year, your <a href="/uk/tax-and-salary/p45-p60-explainer">P60</a>{" "}shows the total deducted.
        </p>
        <p>
          Because repayments are worked out on each pay period, a one-off bonus can trigger a repayment in that month even if your yearly
          income is below the threshold. If that happens, you can ask for a refund after the tax year ends.
        </p>
      </GuideSection>

      <GuideSection id="pensions" n={14} kicker="Pay" title="Pensions, salary sacrifice and repayments">
        <p>
          Repayments are based on your pay after salary sacrifice, but before other pension contributions. Paying into a
          pension through salary sacrifice therefore saves 9% in student loan repayments, as well as income tax and National Insurance.
          Benefits in kind, such as a company car, do not count towards repayments.
        </p>
        <p>
          Above the threshold, a basic-rate taxpayer keeps about 63p of each extra pound earned, after 20% income tax, 8% National Insurance
          and 9% in student loan repayments. A higher-rate taxpayer keeps about 49p.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={15} kicker="Borrowing" title="Plan 1 and mortgages">
        <p>
          Student loans do not appear on credit files and do not affect your credit score. Mortgage lenders do count the monthly repayment as an
          outgoing when working out what you can afford. On £35,000 the Plan 1 repayment is £60.75 a month, which slightly reduces the amount
          you can borrow. Paying off the loan early just to borrow more is rarely worthwhile, because you lose savings you could have used as a
          deposit.
        </p>
      </GuideSection>

      <GuideSection id="refunds" n={16} kicker="Refunds" title="Refunds and overpayments">
        <ul>
          <li>If your income for the whole tax year was below the threshold but money was taken, you can claim it back.</li>
          <li>If deductions continue after the balance reaches zero, the Student Loans Company refunds the extra automatically or on request.</li>
          <li>Refunds can be claimed for previous tax years, with your P60s as evidence.</li>
        </ul>
      </GuideSection>

      <GuideSection id="life-events" n={17} kicker="Life events" title="Career breaks, illness and death">
        <p>
          If you stop working, for parental leave, study or illness, repayments stop when your income falls below the threshold. Interest
          continues to be added. The loan is cancelled if you become permanently unable to work because of illness or disability, and it is
          cancelled when you die: it is never passed on to your family.
        </p>
      </GuideSection>

      <GuideSection id="checking" n={18} kicker="Records" title="Checking your balance">
        <p>
          Log in to your Student Loans Company online account to see your balance, interest added and payments received. Keep your contact
          details up to date, and check your payslips show the right plan type. If your employer uses the wrong plan, you could repay too much or
          too little; tell them and HMRC so they can correct it.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Treating the balance like other debt.</strong> What you repay depends on your income.</li>
          <li><strong>Using the wrong plan.</strong> Check your plan type in your SLC account and on your payslip.</li>
          <li><strong>Forgetting to tell SLC you have moved abroad.</strong> This can lead to fixed repayments and higher interest.</li>
          <li><strong>Missing refunds.</strong> Check every year that what you paid matches your income.</li>
        </ul>
      </GuideSection>

      <GuideSection id="income" n={20} kicker="Income" title="What counts as income">
        <ul>
          <li><strong>Counts:</strong> salary, wages, overtime, bonuses and commission, and self-employed profits.</li>
          <li><strong>Counts if over £2,000 a year in total:</strong> unearned income such as savings interest, dividends and rent, reported through Self Assessment.</li>
          <li><strong>Does not count:</strong> benefits in kind such as a company car, pension income in most cases, and salary given up through salary sacrifice.</li>
        </ul>
        <p>If you have two jobs, each employer looks only at its own pay, so you may repay less through PAYE and the rest through Self Assessment.</p>
      </GuideSection>

      <GuideSection id="thresholds" n={21} kicker="Pay periods" title="Thresholds by pay period">
        <DataTable
          caption="Plan 1 threshold, 2026/27"
          head={["Paid", "Threshold"]}
          numeric={[1]}
          rows={[
            ["Yearly", "£26,900"],
            ["Monthly", "£2,241.67"],
            ["Weekly", "about £517"],
          ]}
        />
        <p>
          Your employer compares the pay in each period with these figures and takes 9% of anything above them. If your pay is uneven, the
          monthly amounts can vary a lot even though the yearly total is what matters.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={22} kicker="Example" title="Your first year in numbers">
        <WorkedExample
          title="Balance £15,000, salary £35,000"
          steps={[
            { label: "Interest added this year at 4.1%", value: "£615" },
            { label: "Repaid through your pay", value: "£729" },
          ]}
          total={{ label: "Change in the balance", value: "Falls" }}
        />
        <p>
          When interest is more than your repayments, the balance grows even though you are paying. That is normal for income-contingent loans
          and does not change what you pay each month, which depends only on your income.
        </p>
      </GuideSection>

      <GuideSection id="diy" n={23} kicker="How to" title="Working it out yourself">
        <ol>
          <li>Take your yearly income before tax.</li>
          <li>Subtract the Plan 1 threshold of £26,900.</li>
          <li>Multiply what is left by 9%. That is your yearly repayment.</li>
          <li>Divide by 12 for a monthly figure.</li>
        </ol>
        <p>The calculator does this for you, adds any <a href="/uk/students/postgrad-loan">Postgraduate Loan</a>, and projects the balance over the years ahead.</p>
      </GuideSection>

      <GuideSection id="history" n={24} kicker="Background" title="A short history of Plan 1">
        <p>
          Income-contingent student loans began in 1998, replacing the older mortgage-style loans. Tuition fees were £1,000 a year at first,
          rising to £3,000 from 2006 and around £3,375 by 2011. Because fees were much lower than today&rsquo;s, typical Plan 1 balances are
          smaller than those on later plans, and many borrowers have already cleared them or will do so within a few years.
        </p>
        <p>
          The threshold has risen steadily in line with RPI, so the share of income taken has fallen in real terms. A graduate earning the same
          real salary each year repays a similar amount, while the balance is eroded by repayments faster than interest is added.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={25} kicker="Planning" title="Planning for the end of repayments">
        <p>
          When your Plan 1 loan is cleared, your take-home pay rises by the amount of your repayments: £60.75 a month on £35,000. Many people
          redirect this into a pension or savings straight away, so they do not notice the difference. If you are a few years from the end,
          check your balance each year so you can plan for it and switch to Direct Debit at the right time.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={26} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£26,900", label: "Threshold 2026/27" },
            { value: "9%", label: "Repayment rate" },
            { value: "4.1%", label: "Interest from Sept 2026" },
            { value: "25 years", label: "Write-off (most loans)" },
            { value: "65", label: "Write-off age for pre-2006 loans" },
            { value: "£60.75", label: "A month on £35,000" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

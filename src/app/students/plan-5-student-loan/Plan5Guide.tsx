import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Plan 5 student loan — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who is on Plan 5" },
  { id: "when", title: "When repayments start" },
  { id: "repayments", title: "How much you repay" },
  { id: "interest", title: "Interest at inflation only" },
  { id: "projection", title: "What you are likely to repay in total" },
  { id: "forty", title: "The 40-year write-off" },
  { id: "vs-plan2", title: "How Plan 5 differs from Plan 2" },
  { id: "fees", title: "Tuition fees and maintenance loans" },
  { id: "marginal", title: "How it feels in your payslip" },
  { id: "overpaying", title: "Should you overpay?" },
  { id: "self-employed", title: "Self-employed, abroad and other income" },
  { id: "how-collected", title: "How HMRC and the Student Loans Company work together" },
  { id: "pensions", title: "Pensions, salary sacrifice and repayments" },
  { id: "mortgages", title: "Plan 5 and mortgages" },
  { id: "refunds", title: "Refunds and overpayments" },
  { id: "life-events", title: "Career breaks, illness and death" },
  { id: "checking", title: "Checking your balance" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "income", title: "What counts as income" },
  { id: "thresholds", title: "Thresholds by pay period" },
  { id: "first-year", title: "Your first year in numbers" },
  { id: "diy", title: "Working it out yourself" },
  { id: "lifetime", title: "What 40 years of repayments means" },
  { id: "choosing", title: "Thinking about university costs" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK — Which repayment plan you are on", href: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
  { label: "GOV.UK — Student finance for undergraduates", href: "https://www.gov.uk/student-finance/new-fulltime-students" },
  { label: "Department for Education — Higher education and student finance reforms", href: "https://www.gov.uk/government/organisations/department-for-education" },
];

export default function Plan5Guide() {
  return (
    <Guide
      kicker="The Plan 5 guide"
      title="How Plan 5 student loan repayments work"
      intro={
        <>
          Plan 5 is for students from England who started an undergraduate course from August 2023. Repayments began for the first graduates in
          April 2026. You repay 9% of income above £25,000, interest is at inflation, and anything left is written off after 40 years. This guide
          explains how it works and what most graduates can expect to pay.
        </>
      }
      meta={["2026/27 rules", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You repay 9% of income above £25,000. On £30,000 that is £37.50 a month.</li>
          <li>Interest is RPI only: 4.1% from September 2026, whatever you earn.</li>
          <li>The threshold is £25,000 until April 2027, then rises with inflation.</li>
          <li>Any balance left after 40 years is written off.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£25,000", label: "Repayment threshold" },
            { value: "9%", label: "Of income above it" },
            { value: "4.1%", label: "Interest from Sept 2026" },
            { value: "40 years", label: "Then written off" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who is on Plan 5">
        <p>
          Students from England who started an undergraduate course, or a Postgraduate Certificate in Education, on or after 1 August 2023 are
          on Plan 5. Students who started before then stay on Plan 2, even if they begin a new course later. Welsh students remain on Plan 2,
          Scottish students on Plan 4 and Northern Irish students on Plan 1.
        </p>
      </GuideSection>

      <GuideSection id="when" n={3} kicker="Timing" title="When repayments start">
        <Timeline
          items={[
            { when: "During your course", what: "Interest is added", detail: "No repayments while studying." },
            { when: "The April after you leave", what: "Repayments can start", detail: "Only if your income is over £25,000." },
            { when: "April 2026", what: "First Plan 5 repayments", detail: "For graduates of three-year courses that started in 2023." },
          ]}
        />
      </GuideSection>

      <GuideSection id="repayments" n={4} kicker="Repaying" title="How much you repay">
        <WorkedExample
          title="Salary £30,000"
          steps={[
            { label: "Income above the threshold: £30,000 − £25,000", value: "£5,000" },
            { label: "Repayment at 9%", value: "£450 a year" },
          ]}
          total={{ label: "A month", value: "£37.50" }}
        />
        <Figure label="Monthly Plan 5 repayments, 2026/27" caption="9% of income above £25,000.">
          <Bars
            items={[
              { label: "£30,000", value: 37.5 },
              { label: "£35,000", value: 75 },
              { label: "£45,000", value: 150 },
              { label: "£60,000", value: 262.5 },
              { label: "£80,000", value: 412.5 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="interest" n={5} kicker="Interest" title="Interest at inflation only">
        <p>
          Plan 5 interest is set at the Retail Prices Index from the previous March, with no extra percentage. From 1 September 2026 to 31 August
          2027 it is 4.1% for everyone, while studying and after. This means the balance grows in line with inflation rather than faster, which
          is one of the main changes from Plan 2.
        </p>
      </GuideSection>

      <GuideSection id="projection" n={6} kicker="Long term" title="What you are likely to repay in total">
        <DataTable
          caption="£50,000 balance, pay rising 3% a year, RPI 3% after this year"
          head={["Starting salary", "Total repaid", "Written off", "Cleared?"]}
          numeric={[1, 2]}
          rows={[
            ["£25,000", "£0", "£164,844", "No"],
            ["£30,000", "£33,931", "£107,837", "No"],
            ["£45,000", "£81,051", "£0", "Yes, after 29 years"],
            ["£60,000", "£66,142", "£0", "Yes, after 17 years"],
          ]}
        />
        <p>
          Higher earners clear the loan sooner and pay less interest overall, so a middle earner who just clears it in the final years can repay
          the most. Figures are in cash terms over many years and are not adjusted for inflation.
        </p>
      </GuideSection>

      <GuideSection id="forty" n={7} kicker="Write-off" title="The 40-year write-off">
        <p>
          Plan 5 loans are written off 40 years after the April you were first due to repay, ten years longer than Plan 2. Someone who graduates
          at 21 could be repaying until their early sixties. The longer period means far more graduates are expected to repay in full than on
          Plan 2.
        </p>
      </GuideSection>

      <GuideSection id="vs-plan2" n={8} kicker="Comparison" title="How Plan 5 differs from Plan 2">
        <CompareCards
          columns={[
            { name: "Plan 5", rows: [{ label: "Threshold", value: "£25,000" }, { label: "Interest", value: "RPI only" }, { label: "Write-off", value: "40 years" }] },
            { name: "Plan 2", rows: [{ label: "Threshold", value: "£29,385" }, { label: "Interest", value: "RPI to RPI + 3% (6% cap in 2026/27)" }, { label: "Write-off", value: "30 years" }] },
          ]}
        />
        <p>On £35,000, a Plan 5 graduate repays £75 a month, against £42.11 on Plan 2.</p>
      </GuideSection>

      <GuideSection id="fees" n={9} kicker="Borrowing" title="Tuition fees and maintenance loans">
        <p>
          Tuition fees in England are £9,790 a year for 2026/27, and are due to rise with inflation in later years. The maximum maintenance loan for a student
          living away from home outside London is £10,830. A three-year course with full loans can leave a balance of over £60,000 including
          interest. The <a href="/students/maintenance-loan">maintenance loan calculator</a> shows what you can borrow for living costs.
        </p>
      </GuideSection>

      <GuideSection id="marginal" n={10} kicker="Take-home pay" title="How it feels in your payslip">
        <p>
          Above £25,000, a basic-rate taxpayer keeps 63p of each extra pound earned, after 20% income tax, 8% National Insurance and 9% student
          loan. Pension contributions through salary sacrifice reduce the income used for repayments, so they save 9% as well as tax and
          National Insurance.
        </p>
      </GuideSection>

      <GuideSection id="overpaying" n={11} kicker="Overpaying" title="Should you overpay?">
        <p>
          Overpaying can save interest if you are sure to clear the loan, which is more likely on Plan 5 than Plan 2. But it ties up money you
          cannot get back. In the £30,000 example, an extra £100 a month raises the total repaid from £33,931 to £81,931 and still leaves
          £17,356 written off. Build an emergency fund and clear dearer debts first.
        </p>
        <Callout title="Run your own numbers">Use the calculator with your salary and balance. Small changes to assumed pay rises change the answer a lot over 40 years.</Callout>
      </GuideSection>

      <GuideSection id="self-employed" n={12} kicker="Other income" title="Self-employed, abroad and other income">
        <p>
          Self-employed graduates repay through Self Assessment. Unearned income over £2,000, such as savings interest or rent, also counts.
          If you move abroad for more than three months, tell the Student Loans Company; repayments are then based on thresholds for your new
          country.
        </p>
      </GuideSection>

      <GuideSection id="how-collected" n={13} kicker="Collection" title="How HMRC and the Student Loans Company work together">
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

      <GuideSection id="mortgages" n={15} kicker="Borrowing" title="Plan 5 and mortgages">
        <p>
          Student loans do not appear on credit files and do not affect your credit score. Mortgage lenders do count the monthly repayment as an
          outgoing when working out what you can afford. On £35,000 the Plan 5 repayment is £75 a month, which slightly reduces the amount
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
          caption="Plan 5 threshold, 2026/27"
          head={["Paid", "Threshold"]}
          numeric={[1]}
          rows={[
            ["Yearly", "£25,000"],
            ["Monthly", "£2,083.33"],
            ["Weekly", "about £480"],
          ]}
        />
        <p>
          Your employer compares the pay in each period with these figures and takes 9% of anything above them. If your pay is uneven, the
          monthly amounts can vary a lot even though the yearly total is what matters.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={22} kicker="Example" title="Your first year in numbers">
        <WorkedExample
          title="Balance £50,000, salary £30,000"
          steps={[
            { label: "Interest added this year at 4.1%", value: "£2,050" },
            { label: "Repaid through your pay", value: "£450" },
          ]}
          total={{ label: "Change in the balance", value: "Rises" }}
        />
        <p>
          When interest is more than your repayments, the balance grows even though you are paying. That is normal for income-contingent loans
          and does not change what you pay each month, which depends only on your income.
        </p>
      </GuideSection>

      <GuideSection id="diy" n={23} kicker="How to" title="Working it out yourself">
        <ol>
          <li>Take your yearly income before tax.</li>
          <li>Subtract the Plan 5 threshold of £25,000.</li>
          <li>Multiply what is left by 9%. That is your yearly repayment.</li>
          <li>Divide by 12 for a monthly figure.</li>
        </ol>
        <p>The calculator does this for you, adds any Postgraduate Loan, and projects the balance over the years ahead.</p>
      </GuideSection>

      <GuideSection id="lifetime" n={24} kicker="Long term" title="What 40 years of repayments means">
        <p>
          A graduate who starts repaying at 22 could still be repaying at 62. Over that time, salaries usually rise, so repayments grow too.
          On the example assumptions, someone starting on £45,000 repays for 29 years before clearing the loan, while someone starting on
          £30,000 repays for the full 40 years and still has some written off.
        </p>
        <p>
          It helps to think of Plan 5 as a graduate tax of 9% above the threshold for much of your working life, rather than a debt to pay off
          as fast as possible.
        </p>
      </GuideSection>

      <GuideSection id="choosing" n={25} kicker="Decisions" title="Thinking about university costs">
        <p>
          The loan system means you never have to pay fees upfront, and repayments are always linked to what you earn. When choosing a course,
          the cost matters less than whether it leads to work you want. Living at home can cut what you borrow, as the maximum loan for living
          with parents is £9,118 rather than £10,830, though you will repay according to your income either way.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={26} kicker="FAQs" title="Common questions">
        <h3>Will the threshold go up?</h3>
        <p>It is £25,000 until April 2027 and is then due to rise each year with RPI.</p>
        <h3>Do part-time jobs while studying count?</h3>
        <p>No. Repayments only start from the April after you leave your course.</p>
        <h3>What if I leave my course early?</h3>
        <p>Repayments can start from the April after you leave, if you earn over the threshold.</p>
        <h3>Do I need to tell HMRC about my loan?</h3>
        <p>Not if you are employed: tell your employer your plan type when you start, often using a starter checklist, and they deduct repayments. If you file Self Assessment, tick the student loan box on your return.</p>
        <h3>Is Plan 5 interest higher than Plan 2?</h3>
        <p>No. Plan 5 charges RPI only, 4.1% from September 2026, while Plan 2 charges up to 6% this year. But Plan 5 is repaid from a lower threshold for longer.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={27} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£25,000", label: "Threshold 2026/27" },
            { value: "9%", label: "Repayment rate" },
            { value: "4.1%", label: "Interest (RPI)" },
            { value: "40 years", label: "Write-off" },
            { value: "£37.50", label: "A month on £30,000" },
            { value: "£75", label: "A month on £35,000" },
            { value: "£9,790", label: "Tuition fee 2026/27" },
            { value: "April 2026", label: "First repayments" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

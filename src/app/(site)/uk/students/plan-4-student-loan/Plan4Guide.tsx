import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Plan 4 student loan — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who has a Plan 4 loan" },
  { id: "no-fees", title: "Why Scottish balances are smaller" },
  { id: "repayments", title: "How repayments work" },
  { id: "by-salary", title: "Repayments by salary" },
  { id: "interest", title: "Interest on Plan 4" },
  { id: "projection", title: "When will it be paid off?" },
  { id: "write-off", title: "When Plan 4 is written off" },
  { id: "scottish-tax", title: "Plan 4 and Scottish income tax" },
  { id: "england", title: "Working in England or abroad" },
  { id: "overpaying", title: "Should you pay it off early?" },
  { id: "how-collected", title: "How HMRC and the Student Loans Company work together" },
  { id: "pensions", title: "Pensions, salary sacrifice and repayments" },
  { id: "mortgages", title: "Plan 4 and mortgages" },
  { id: "refunds", title: "Refunds and overpayments" },
  { id: "life-events", title: "Career breaks, illness and death" },
  { id: "checking", title: "Checking your balance" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "income", title: "What counts as income" },
  { id: "thresholds", title: "Thresholds by pay period" },
  { id: "first-year", title: "Your first year in numbers" },
  { id: "diy", title: "Working it out yourself" },
  { id: "saas-support", title: "SAAS loans and bursaries" },
  { id: "study-elsewhere", title: "Studying in England or Wales" },
  { id: "end", title: "Planning for the end of repayments" },
  { id: "mistakes2", title: "More things to watch" },
  { id: "records", title: "Keeping good records" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "Student Awards Agency Scotland", href: "https://www.saas.gov.uk/" },
  { label: "GOV.UK — When your student loan gets written off", href: "https://www.gov.uk/repaying-your-student-loan/when-your-student-loan-gets-written-off-or-cancelled" },
];

export default function Plan4Guide() {
  return (
    <Guide
      kicker="The Plan 4 guide"
      title="How Plan 4 student loans work for Scottish graduates"
      intro={
        <>
          Plan 4 covers student loans from the Student Awards Agency Scotland. Scottish students do not pay <a href="/uk/students/degree-cost">tuition fees</a>{" "}at Scottish
          universities, so balances are usually much smaller than in England. You repay 9% of income above £33,795, the highest threshold of any
          plan, and the loan is written off after 30 years.
        </>
      }
      meta={["2026/27 rules", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You repay 9% of income above £33,795. On £45,000, that is £84.04 a month.</li>
          <li>Interest from September 2026 is 4.1%.</li>
          <li>The threshold rises with RPI each April.</li>
          <li>Loans are written off 30 years after you were first due to repay.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£33,795", label: "Repayment threshold" },
            { value: "9%", label: "Of income above it" },
            { value: "4.1%", label: "Interest from Sept 2026" },
            { value: "30 years", label: "Then written off" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who has a Plan 4 loan">
        <p>
          Plan 4 applies to loans from the Student Awards Agency Scotland (SAAS). In April 2021, all existing Scottish <a href="/uk/students/plan-1-student-loan">Plan 1</a>{" "}loans moved to
          Plan 4, so Scottish graduates of any age are on Plan 4. Students who lived in Scotland but took loans from Student Finance England
          are on the English plans instead.
        </p>
      </GuideSection>

      <GuideSection id="no-fees" n={3} kicker="Background" title="Why Scottish balances are smaller">
        <p>
          Scottish students studying in Scotland have their tuition fees paid by <a href="/uk/students/saas-funding">SAAS</a>{" "}and do not borrow for them. Their loans are mainly for
          living costs, so typical balances are a fraction of those in England, often well under £30,000.
        </p>
      </GuideSection>

      <GuideSection id="repayments" n={4} kicker="Repaying" title="How repayments work">
        <WorkedExample
          title="Salary £45,000"
          steps={[
            { label: "Income above the threshold: £45,000 − £33,795", value: "£11,205" },
            { label: "Repayment at 9%", value: "£1,008.45 a year" },
          ]}
          total={{ label: "A month", value: "£84.04" }}
        />
        <p>Repayments come out of your pay through PAYE, like tax. On £35,000 they are just £9.04 a month.</p>
      </GuideSection>

      <GuideSection id="by-salary" n={5} kicker="Salaries" title="Repayments by salary">
        <Figure label="Monthly Plan 4 repayments, 2026/27" caption="9% of income above £33,795.">
          <Bars
            items={[
              { label: "£35,000", value: 9.04 },
              { label: "£45,000", value: 84.04 },
              { label: "£60,000", value: 196.54 },
              { label: "£80,000", value: 346.54 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="interest" n={6} kicker="Interest" title="Interest on Plan 4">
        <p>
          Plan 4 interest is the lower of RPI from March and the Bank of England base rate plus 1%. From 1 September 2026 it is 4.1% for
          everyone, whatever your income.
        </p>
      </GuideSection>

      <GuideSection id="projection" n={7} kicker="Long term" title="When will it be paid off?">
        <DataTable
          caption="£20,000 balance, pay rising 3% a year, RPI 3% after this year"
          head={["Starting salary", "Total repaid", "Outcome"]}
          numeric={[1]}
          rows={[
            ["£25,000", "£0", "£49,064 written off after 30 years"],
            ["£35,000", "£5,160", "£41,397 written off"],
            ["£45,000", "£28,273", "Cleared after 21 years"],
            ["£60,000", "£23,445", "Cleared after 9 years"],
          ]}
        />
        <p>
          Because the threshold is high and rises with inflation, graduates on modest salaries repay little. Higher earners clear the loan
          within a decade or two.
        </p>
      </GuideSection>

      <GuideSection id="write-off" n={8} kicker="Write-off" title="When Plan 4 is written off">
        <ul>
          <li>Loans taken out from the 2007/08 academic year: 30 years after the April you were first due to repay.</li>
          <li>Older loans: when you turn 65, or 30 years after you were first due to repay, whichever comes first.</li>
          <li>Any loan: if you die or become permanently unable to work.</li>
        </ul>
      </GuideSection>

      <GuideSection id="scottish-tax" n={9} kicker="Take-home pay" title="Plan 4 and Scottish income tax">
        <p>
          Scottish taxpayers pay Scottish income tax rates. Between the Plan 4 threshold and about £43,660, the intermediate rate of 21% applies,
          so each extra pound earned loses 21% in income tax, 8% in National Insurance and 9% in student loan repayments. Above the higher rate
          threshold, the combined rate is higher still.
        </p>
      </GuideSection>

      <GuideSection id="england" n={10} kicker="Moving" title="Working in England or abroad">
        <CompareCards
          columns={[
            { name: "Working elsewhere in the UK", rows: [{ label: "Plan", value: "Still Plan 4" }, { label: "Repayments", value: "Through PAYE as normal" }] },
            { name: "Moving abroad", rows: [{ label: "Tell", value: "The Student Loans Company" }, { label: "Repayments", value: "Direct, using overseas thresholds" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="overpaying" n={11} kicker="Overpaying" title="Should you pay it off early?">
        <p>
          On £45,000 with a £20,000 balance, an extra £100 a month cuts the total repaid from £28,273 to £27,388, saving a little interest. On a
          lower salary, where the loan would be partly written off, overpaying only reduces the write-off.
        </p>
        <Callout title="Savings first">With interest at 4.1%, building savings and clearing dearer debts usually come first.</Callout>
      </GuideSection>

      <GuideSection id="how-collected" n={12} kicker="Collection" title="How HMRC and the Student Loans Company work together">
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

      <GuideSection id="pensions" n={13} kicker="Pay" title="Pensions, salary sacrifice and repayments">
        <p>
          Repayments are based on your pay after salary sacrifice, but before other pension contributions. Paying into a
          pension through salary sacrifice therefore saves 9% in student loan repayments, as well as income tax and National Insurance.
          Benefits in kind, such as a company car, do not count towards repayments.
        </p>
        <p>
          For a <a href="/uk/tax-and-salary/scottish-tax">Scottish taxpayer</a>{" "}earning between the Plan 4 threshold and about £43,660, each extra pound loses 21% in income tax, 8% in
          National Insurance and 9% in repayments, leaving about 62p. Above the Scottish higher rate threshold, about 48p is left.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={14} kicker="Borrowing" title="Plan 4 and mortgages">
        <p>
          Student loans do not appear on credit files and do not affect your credit score. Mortgage lenders do count the monthly repayment as an
          outgoing when working out what you can afford. On £35,000 the Plan 4 repayment is £9.04 a month, which slightly reduces the amount
          you can borrow. Paying off the loan early just to borrow more is rarely worthwhile, because you lose savings you could have used as a
          deposit.
        </p>
      </GuideSection>

      <GuideSection id="refunds" n={15} kicker="Refunds" title="Refunds and overpayments">
        <ul>
          <li>If your income for the whole tax year was below the threshold but money was taken, you can claim it back.</li>
          <li>If deductions continue after the balance reaches zero, the Student Loans Company refunds the extra automatically or on request.</li>
          <li>Refunds can be claimed for previous tax years, with your P60s as evidence.</li>
        </ul>
      </GuideSection>

      <GuideSection id="life-events" n={16} kicker="Life events" title="Career breaks, illness and death">
        <p>
          If you stop working, for parental leave, study or illness, repayments stop when your income falls below the threshold. Interest
          continues to be added. The loan is cancelled if you become permanently unable to work because of illness or disability, and it is
          cancelled when you die: it is never passed on to your family.
        </p>
      </GuideSection>

      <GuideSection id="checking" n={17} kicker="Records" title="Checking your balance">
        <p>
          Log in to your Student Loans Company online account to see your balance, interest added and payments received. Keep your contact
          details up to date, and check your payslips show the right plan type. If your employer uses the wrong plan, you could repay too much or
          too little; tell them and HMRC so they can correct it.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Treating the balance like other debt.</strong> What you repay depends on your income.</li>
          <li><strong>Using the wrong plan.</strong> Check your plan type in your SLC account and on your payslip.</li>
          <li><strong>Forgetting to tell SLC you have moved abroad.</strong> This can lead to fixed repayments and higher interest.</li>
          <li><strong>Missing refunds.</strong> Check every year that what you paid matches your income.</li>
        </ul>
      </GuideSection>

      <GuideSection id="income" n={19} kicker="Income" title="What counts as income">
        <ul>
          <li><strong>Counts:</strong> salary, wages, overtime, bonuses and commission, and self-employed profits.</li>
          <li><strong>Counts if over £2,000 a year in total:</strong> unearned income such as savings interest, dividends and rent, reported through Self Assessment.</li>
          <li><strong>Does not count:</strong> benefits in kind such as a company car, pension income in most cases, and salary given up through salary sacrifice.</li>
        </ul>
        <p>If you have two jobs, each employer looks only at its own pay, so you may repay less through PAYE and the rest through Self Assessment.</p>
      </GuideSection>

      <GuideSection id="thresholds" n={20} kicker="Pay periods" title="Thresholds by pay period">
        <DataTable
          caption="Plan 4 threshold, 2026/27"
          head={["Paid", "Threshold"]}
          numeric={[1]}
          rows={[
            ["Yearly", "£33,795"],
            ["Monthly", "£2,816.25"],
            ["Weekly", "about £650"],
          ]}
        />
        <p>
          Your employer compares the pay in each period with these figures and takes 9% of anything above them. If your pay is uneven, the
          monthly amounts can vary a lot even though the yearly total is what matters.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={21} kicker="Example" title="Your first year in numbers">
        <WorkedExample
          title="Balance £20,000, salary £45,000"
          steps={[
            { label: "Interest added this year at 4.1%", value: "£820" },
            { label: "Repaid through your pay", value: "£1,008.45" },
          ]}
          total={{ label: "Change in the balance", value: "Falls" }}
        />
        <p>
          When interest is more than your repayments, the balance grows even though you are paying. That is normal for income-contingent loans
          and does not change what you pay each month, which depends only on your income.
        </p>
      </GuideSection>

      <GuideSection id="diy" n={22} kicker="How to" title="Working it out yourself">
        <ol>
          <li>Take your yearly income before tax.</li>
          <li>Subtract the Plan 4 threshold of £33,795.</li>
          <li>Multiply what is left by 9%. That is your yearly repayment.</li>
          <li>Divide by 12 for a monthly figure.</li>
        </ol>
        <p>The calculator does this for you, adds any <a href="/uk/students/postgrad-loan">Postgraduate Loan</a>, and projects the balance over the years ahead.</p>
      </GuideSection>

      <GuideSection id="saas-support" n={23} kicker="Background" title="SAAS loans and bursaries">
        <p>
          Scottish students get help with living costs from the Student Awards Agency Scotland through a mix of loans and non-repayable
          bursaries, depending on household income. Only the loan part is repaid under Plan 4. Bursaries and grants never have to be repaid,
          which is another reason Scottish balances are lower.
        </p>
      </GuideSection>

      <GuideSection id="study-elsewhere" n={24} kicker="Cross-border" title="Studying in England or Wales">
        <p>
          Scottish students who study at a university in England, Wales or Northern Ireland can borrow from SAAS for tuition fees there, up to
          the fee charged. These larger balances are still repaid under Plan 4, with the same threshold and write-off rules, but they take
          longer to clear.
        </p>
      </GuideSection>

      <GuideSection id="end" n={25} kicker="Planning" title="Planning for the end of repayments">
        <p>
          When the loan is cleared, your take-home pay rises by the amount of your repayments: £84.04 a month on £45,000. Check your balance
          each year as you get close, and think about switching to Direct Debit for the last couple of years, so deductions stop at the right
          time and you avoid waiting for a refund.
        </p>
      </GuideSection>

      <GuideSection id="mistakes2" n={26} kicker="Watch points" title="More things to watch">
        <ul>
          <li><strong>Assuming you are still on Plan 1.</strong> Scottish Plan 1 loans became Plan 4 in 2021; check your payslip shows Plan 4.</li>
          <li><strong>Comparing with English friends.</strong> Their thresholds, interest and write-off rules are different.</li>
          <li><strong>Overpaying on a modest salary.</strong> If you are unlikely to clear the loan, extra payments mostly reduce the write-off.</li>
        </ul>
      </GuideSection>

      <GuideSection id="records" n={27} kicker="Records" title="Keeping good records">
        <p>
          Plan 4 repayments come out through your pay, so it is easy to forget the loan exists. A few minutes each year
          keeps the balance right and makes refunds easy to claim.
        </p>
        <ul>
          <li>Keep every P60 and your final payslip from each job, as they show what was taken for your loan.</li>
          <li>Check your online Student Loans Company account once a year against your P60s.</li>
          <li>Keep your address and email up to date, especially if you move abroad, where you repay the Student Loans Company directly.</li>
          <li>Note your plan type and tell a new employer it is Plan 4, so the right threshold is used from your first pay day.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={28} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£33,795", label: "Threshold 2026/27" },
            { value: "9%", label: "Repayment rate" },
            { value: "4.1%", label: "Interest from Sept 2026" },
            { value: "30 years", label: "Write-off" },
            { value: "£84.04", label: "A month on £45,000" },
            { value: "2021", label: "Scottish Plan 1 moved to Plan 4" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

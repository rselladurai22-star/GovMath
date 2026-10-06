import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Plan 2 student loan — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "who", title: "Who has a Plan 2 loan" },
  { id: "repayments", title: "How repayments work" },
  { id: "by-salary", title: "Repayments by salary" },
  { id: "interest", title: "Interest and the 6% cap" },
  { id: "freeze", title: "The threshold freeze to 2030" },
  { id: "projection", title: "Will you ever pay it off?" },
  { id: "write-off", title: "The 30-year write-off" },
  { id: "overpaying", title: "Should you overpay?" },
  { id: "self-employed", title: "Self-employed and other income" },
  { id: "postgrad", title: "Plan 2 with a Postgraduate Loan" },
  { id: "abroad", title: "Moving abroad" },
  { id: "myths", title: "Myths about student loans" },
  { id: "marginal", title: "How it feels in your payslip" },
  { id: "mortgages", title: "Student loans and mortgages" },
  { id: "checking", title: "Checking your balance and repayments" },
  { id: "vs-plan5", title: "Plan 2 compared with Plan 5" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "income", title: "What counts as income" },
  { id: "thresholds", title: "Thresholds by pay period" },
  { id: "first-year", title: "Your first year in numbers" },
  { id: "diy", title: "Working it out yourself" },
  { id: "why-grows", title: "Why your balance keeps growing" },
  { id: "policy", title: "Changes to Plan 2 over time" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Repaying your student loan: what you pay", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK — Student loan interest rates", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "Student Loans Company — Plan 2", href: "https://www.gov.uk/repaying-your-student-loan/which-repayment-plan-you-are-on" },
  { label: "Institute for Fiscal Studies — Student loans", href: "https://ifs.org.uk/" },
];

export default function Plan2Guide() {
  return (
    <Guide
      kicker="The Plan 2 guide"
      title="How Plan 2 student loan repayments work in 2026/27"
      intro={
        <>
          Plan 2 covers students from England and Wales who started university between September 2012 and July 2023. You repay 9% of your
          income above £29,385, interest is linked to inflation and your earnings, and anything left after 30 years is written off. This guide
          explains each part, and why many graduates will never repay the full balance.
        </>
      }
      meta={["2026/27 rules", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>You repay 9% of income above £29,385 a year. On £35,000 that is £42.11 a month.</li>
          <li>Interest from September 2026 is 4.1% (RPI) on lower incomes, rising to a capped 6% for incomes of about £44,300 or more.</li>
          <li>The threshold is frozen at £29,385 from April 2027 until April 2030.</li>
          <li>Whatever is left after 30 years is written off. Most Plan 2 borrowers are expected to have some written off.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£29,385", label: "Repayment threshold" },
            { value: "9%", label: "Of income above it" },
            { value: "4.1% to 6%", label: "Interest from Sept 2026" },
            { value: "30 years", label: "Then written off" },
          ]}
        />
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who has a Plan 2 loan">
        <ul>
          <li>English students who started an undergraduate course between 1 September 2012 and 31 July 2023.</li>
          <li>Welsh students who started on or after 1 September 2012.</li>
          <li>Students on Advanced Learner Loans.</li>
        </ul>
        <p>
          English students starting from August 2023 are on Plan 5. Scottish students are on Plan 4, and older English and Welsh loans and
          Northern Ireland loans are on Plan 1. Your online Student Loans Company account shows your plan.
        </p>
      </GuideSection>

      <GuideSection id="repayments" n={3} kicker="Repaying" title="How repayments work">
        <p>
          Repayments start in the April after you leave your course, and only when your income is over the threshold. Employers take them
          through PAYE, alongside income tax, using a monthly threshold of £2,448.75 or a weekly one of about £565. If your income falls below the
          threshold, repayments stop automatically.
        </p>
        <WorkedExample
          title="Salary £35,000"
          steps={[
            { label: "Income above the threshold: £35,000 − £29,385", value: "£5,615" },
            { label: "Repayment at 9%", value: "£505.35 a year" },
          ]}
          total={{ label: "A month", value: "£42.11" }}
        />
      </GuideSection>

      <GuideSection id="by-salary" n={4} kicker="Salaries" title="Repayments by salary">
        <Figure label="Monthly Plan 2 repayments, 2026/27" caption="9% of income above £29,385.">
          <Bars
            items={[
              { label: "£30,000", value: 4.61 },
              { label: "£35,000", value: 42.11 },
              { label: "£45,000", value: 117.11 },
              { label: "£60,000", value: 229.61 },
              { label: "£80,000", value: 379.61 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
        <p>
          The repayment depends only on income, not on how much you owe. Someone owing £20,000 and someone owing £80,000 repay the same each
          month on the same salary.
        </p>
      </GuideSection>

      <GuideSection id="interest" n={5} kicker="Interest" title="Interest and the 6% cap">
        <p>
          Plan 2 interest is based on the Retail Prices Index from March each year: 4.1% for September 2026 to August 2027. While you are
          studying, and once you earn over the upper interest threshold, it is RPI plus 3%. Between the two income thresholds, it rises on a
          sliding scale. For 2026/27, the government has capped Plan 2 interest at 6%.
        </p>
        <DataTable
          caption="Plan 2 interest from 1 September 2026"
          head={["Income", "Interest rate"]}
          numeric={[1]}
          rows={[
            ["£29,385 or less", "4.1%"],
            ["£35,000", "4.82%"],
            ["£41,135", "5.6%"],
            ["About £44,300 or more", "6% (cap)"],
          ]}
        />
        <p>Without the cap, interest for those earning £52,885 or more would be 7.1%.</p>
      </GuideSection>

      <GuideSection id="freeze" n={6} kicker="Threshold" title="The threshold freeze to 2030">
        <p>
          The Plan 2 threshold rose to £29,385 in April 2026. It is then frozen until April 2030. As pay rises with inflation, more of your
          income will be above the threshold, so repayments will grow faster than pay. After 2030 it is expected to rise with inflation again.
        </p>
      </GuideSection>

      <GuideSection id="projection" n={7} kicker="Long term" title="Will you ever pay it off?">
        <p>
          Most Plan 2 borrowers owe more than they will repay. The balance often grows in the early years because interest is more than the
          repayments. Whether you clear it depends mostly on your earnings over 30 years.
        </p>
        <DataTable
          caption="£45,000 balance, pay rising 3% a year, RPI 3% after this year"
          head={["Starting salary", "Total repaid", "Written off", "Cleared?"]}
          numeric={[1, 2]}
          rows={[
            ["£25,000", "£0", "£161,127", "No"],
            ["£35,000", "£34,266", "£143,815", "No"],
            ["£45,000", "£77,084", "£75,377", "No"],
            ["£60,000", "£86,576", "£0", "Yes, after 22 years"],
          ]}
        />
        <p>
          These projections use simple assumptions and cash figures, not adjusted for inflation. They show the pattern: only high earners are
          likely to repay in full, and they repay the most.
        </p>
      </GuideSection>

      <GuideSection id="write-off" n={8} kicker="Write-off" title="The 30-year write-off">
        <Timeline
          items={[
            { when: "Leave university", what: "Interest continues", detail: "No repayments until the April after you finish." },
            { when: "The April after", what: "Repayments start if you earn over the threshold", detail: "The 30-year clock starts." },
            { when: "30 years later", what: "Any balance is cancelled", detail: "Also cancelled if you die or become permanently unable to work." },
          ]}
        />
        <p>The written-off amount is not taxed and does not affect your credit record.</p>
      </GuideSection>

      <GuideSection id="overpaying" n={9} kicker="Overpaying" title="Should you overpay?">
        <p>
          Voluntary overpayments only save money if you would otherwise clear the loan before the write-off. In the example on £35,000, paying an
          extra £100 a month raises the total you repay from £34,266 to £70,266, and the loan is still not cleared. The extra money simply
          reduces the amount written off.
        </p>
        <Callout tone="warn" title="Think twice before overpaying">
          For most Plan 2 borrowers, money is better used to clear expensive debts, build savings or save for a home or pension.
        </Callout>
      </GuideSection>

      <GuideSection id="self-employed" n={10} kicker="Other income" title="Self-employed and other income">
        <p>
          If you are self-employed or have other income over £2,000, such as rent or savings interest, repayments are worked out through
          Self Assessment along with your tax. They are due by 31 January after the tax year, and may be included in payments on account.
        </p>
      </GuideSection>

      <GuideSection id="postgrad" n={11} kicker="Two loans" title="Plan 2 with a Postgraduate Loan">
        <CompareCards
          columns={[
            { name: "Plan 2", rows: [{ label: "Rate", value: "9% above £29,385" }, { label: "At £40,000", value: "£79.61 a month" }] },
            { name: "Postgraduate", rows: [{ label: "Rate", value: "6% above £21,000" }, { label: "At £40,000", value: "£95.00 a month" }] },
          ]}
        />
        <p>With both loans, the repayments are added together: £174.61 a month on £40,000.</p>
      </GuideSection>

      <GuideSection id="abroad" n={12} kicker="Abroad" title="Moving abroad">
        <p>
          If you move abroad for more than three months, you must tell the Student Loans Company. You then repay directly, using thresholds set
          for the country you live in. If you do not provide income details, you can be charged fixed repayments and the higher interest rate.
        </p>
      </GuideSection>

      <GuideSection id="myths" n={13} kicker="Myths" title="Myths about student loans">
        <ul>
          <li><strong>&ldquo;It hurts my credit score.&rdquo;</strong> It does not appear on credit files, though mortgage lenders consider the repayments as an outgoing.</li>
          <li><strong>&ldquo;The balance is what I will pay.&rdquo;</strong> Most people repay less, or more if they earn a lot.</li>
          <li><strong>&ldquo;Bailiffs collect it.&rdquo;</strong> Repayments come from pay, like tax; they stop if your income falls.</li>
        </ul>
      </GuideSection>

      <GuideSection id="marginal" n={14} kicker="Take-home pay" title="How it feels in your payslip">
        <p>
          Because repayments work like an extra tax, a basic-rate taxpayer above the threshold effectively keeps 63p of each extra pound: 20%
          goes in income tax, 8% in National Insurance and 9% in student loan repayments. A higher-rate taxpayer keeps 49p. A pay rise is
          still always worth having, but it is smaller after deductions than many people expect.
        </p>
        <p>
          Pension contributions through salary sacrifice reduce the pay used for repayments, so they save 9% on top of tax and National
          Insurance. The <a href="/tax-and-salary/salary-calculator">salary calculator</a> shows your full take-home pay including student loan.
        </p>
      </GuideSection>

      <GuideSection id="mortgages" n={15} kicker="Borrowing" title="Student loans and mortgages">
        <p>
          A student loan does not show on your credit file, and the balance is not treated like other debt. But lenders look at your monthly
          repayments when working out what you can afford, because they reduce your take-home pay. On £35,000, £42.11 a month is a small
          amount; on £60,000, £229.61 a month makes more difference. Paying off a Plan 2 loan early to borrow more is rarely worthwhile.
        </p>
      </GuideSection>

      <GuideSection id="checking" n={16} kicker="Records" title="Checking your balance and repayments">
        <ul>
          <li>Your online Student Loans Company account shows the balance, interest added and repayments received.</li>
          <li>Your payslip shows the amount taken each pay period, and your P60 shows the total for the tax year.</li>
          <li>If the SLC records do not match your payslips, contact them with copies of your P60s.</li>
          <li>When you are close to clearing the loan, consider switching to Direct Debit to avoid overpaying through PAYE.</li>
        </ul>
      </GuideSection>

      <GuideSection id="vs-plan5" n={17} kicker="Comparison" title="Plan 2 compared with Plan 5">
        <CompareCards
          columns={[
            { name: "Plan 2", rows: [{ label: "Threshold", value: "£29,385, frozen to 2030" }, { label: "Interest", value: "RPI to RPI + 3%, capped at 6% in 2026/27" }, { label: "Written off", value: "After 30 years" }] },
            { name: "Plan 5", rows: [{ label: "Threshold", value: "£25,000, then rising with RPI from 2027" }, { label: "Interest", value: "RPI only, 4.1%" }, { label: "Written off", value: "After 40 years" }] },
          ]}
        />
        <p>
          Plan 5 borrowers start repaying at a lower income and for ten more years, so most will repay more in total than a Plan 2 borrower on
          the same salary. See the <a href="/students/plan-5-student-loan">Plan 5 calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Treating the balance like a normal debt.</strong> What you repay depends on your income, not the balance.</li>
          <li><strong>Overpaying a loan you will never clear.</strong> It only reduces the amount written off.</li>
          <li><strong>Not telling SLC when you move abroad.</strong> This can lead to penalty interest and fixed repayments.</li>
          <li><strong>Forgetting to claim a refund.</strong> If you were charged in a year your income was below the threshold, you can get it back.</li>
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
          caption="Plan 2 threshold, 2026/27"
          head={["Paid", "Threshold"]}
          numeric={[1]}
          rows={[
            ["Yearly", "£29,385"],
            ["Monthly", "£2,448.75"],
            ["Weekly", "about £565"],
          ]}
        />
        <p>
          Your employer compares the pay in each period with these figures and takes 9% of anything above them. If your pay is uneven, the
          monthly amounts can vary a lot even though the yearly total is what matters.
        </p>
      </GuideSection>

      <GuideSection id="first-year" n={21} kicker="Example" title="Your first year in numbers">
        <WorkedExample
          title="Balance £45,000, salary £35,000"
          steps={[
            { label: "Interest added this year at 4.82%", value: "£2,167.56" },
            { label: "Repaid through your pay", value: "£505.35" },
          ]}
          total={{ label: "Change in the balance", value: "Rises" }}
        />
        <p>
          When interest is more than your repayments, the balance grows even though you are paying. That is normal for income-contingent loans
          and does not change what you pay each month, which depends only on your income.
        </p>
      </GuideSection>

      <GuideSection id="diy" n={22} kicker="How to" title="Working it out yourself">
        <ol>
          <li>Take your yearly income before tax.</li>
          <li>Subtract the Plan 2 threshold of £29,385.</li>
          <li>Multiply what is left by 9%. That is your yearly repayment.</li>
          <li>Divide by 12 for a monthly figure.</li>
        </ol>
        <p>The calculator does this for you, adds any Postgraduate Loan, and projects the balance over the years ahead.</p>
      </GuideSection>

      <GuideSection id="why-grows" n={23} kicker="Balance" title="Why your balance keeps growing">
        <p>
          Many Plan 2 graduates are surprised to see their balance rise every year even though they are repaying. With a £45,000 balance and a
          £35,000 salary, interest of about £2,168 is added in the first year, while repayments are £505. The balance grows by over £1,600.
        </p>
        <p>
          This does not mean you will pay more each month: repayments depend only on income. It mostly affects how much is written off at the
          end. For most middle earners, the size of the balance matters far less than their salary over the next 30 years.
        </p>
      </GuideSection>

      <GuideSection id="policy" n={24} kicker="Background" title="Changes to Plan 2 over time">
        <p>
          The Plan 2 threshold started at £21,000 in 2016, rose to £25,000 in 2018, and has risen since with earnings or inflation. Governments
          have frozen it several times, and it is now frozen at £29,385 from April 2027 to April 2030. The 6% interest cap for 2026/27 is a
          one-year decision. Because the rules can change, treat any long-term projection as a guide rather than a forecast.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£29,385", label: "Threshold, frozen to 2030" },
            { value: "£52,885", label: "Upper interest threshold" },
            { value: "9%", label: "Repayment rate" },
            { value: "4.1%", label: "RPI, March 2026" },
            { value: "6%", label: "Interest cap 2026/27" },
            { value: "30 years", label: "Write-off" },
            { value: "£42.11", label: "A month on £35,000" },
            { value: "£2,448.75", label: "Monthly threshold" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Cost of a degree — the guide. Figures from src/lib/students/nations.ts and loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "parts", title: "The parts of the cost" },
  { id: "tuition", title: "Tuition fees" },
  { id: "maintenance", title: "Maintenance loans" },
  { id: "interest", title: "Interest while you study" },
  { id: "examples", title: "Worked examples" },
  { id: "repaying", title: "How Plan 5 repayment works" },
  { id: "same-repayment", title: "Why borrowing less may not save you anything" },
  { id: "real-cost", title: "The real cost: what you repay" },
  { id: "living", title: "Living costs the loan does not cover" },
  { id: "parents", title: "The parental contribution" },
  { id: "reduce", title: "Ways to reduce the cost" },
  { id: "other-nations", title: "Students from Scotland, Wales and Northern Ireland" },
  { id: "assumptions", title: "The assumptions behind the numbers" },
  { id: "placement", title: "Placement years and years abroad" },
  { id: "postgrad", title: "Adding a master&rsquo;s degree" },
  { id: "compare-routes", title: "Degree, apprenticeship or work?" },
  { id: "monthly", title: "What repayments look like each month" },
  { id: "self-employed", title: "If you become self-employed or work abroad" },
  { id: "nhs", title: "Nursing, teaching and other funded routes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Student finance: how much you can get", href: "https://www.gov.uk/student-finance/new-fulltime-students" },
  { label: "GOV.UK — Repaying your student loan: Plan 5", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "GOV.UK — Student loan interest rates", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
  { label: "Student Finance England — 2026/27 maintenance loan tables", href: "https://www.gov.uk/student-finance/new-fulltime-students" },
  { label: "Office for Students — Tuition fees", href: "https://www.officeforstudents.org.uk/" },
];

export default function DegreeGuide() {
  return (
    <Guide
      kicker="The cost of a degree guide"
      title="How much does a degree really cost?"
      intro={
        <>
          A three-year degree in England can mean borrowing £60,000 or more. But the number on your loan statement is not the same as what you
          will pay, because Plan 5 student loans are repaid as a share of your income and written off after 40 years. This guide breaks down
          what you borrow, how it grows while you study, and what you are likely to repay over your working life.
        </>
      }
      meta={["2026/27 figures", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Tuition fees are capped at <strong>£9,790 a year</strong> in 2026/27, about £30,000 for a three-year degree.</li>
          <li>The maintenance loan is up to <strong>£10,830 a year</strong> away from home outside London, less if your household income is over £25,000.</li>
          <li>A student from a household on £25,000 could borrow about <strong>£64,000</strong> over three years, rising to about £68,000 with interest by graduation.</li>
          <li>Repayments are <strong>9% of income over £25,000</strong>, for up to 40 years. Many graduates never repay the full balance.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£9,790", label: "Tuition fee cap, 2026/27" },
            { value: "£10,830", label: "Most maintenance loan, away from home" },
            { value: "9%", label: "Of income over £25,000" },
            { value: "40 years", label: "Until the loan is written off" },
          ]}
        />
      </GuideSection>

      <GuideSection id="parts" n={2} kicker="Overview" title="The parts of the cost">
        <p>For an English student on a course starting in 2026, the cost of a degree has three parts:</p>
        <ol>
          <li><strong>Tuition fees</strong>, paid straight to the university by a tuition fee loan;</li>
          <li><strong>Living costs</strong>, partly covered by a maintenance loan paid to you each term;</li>
          <li><strong>Interest</strong>, added to the loan from the day each payment is made.</li>
        </ol>
        <p>
          Both loans are added together into one Plan 5 balance. The calculator adds them up year by year, then projects what you would repay
          after graduating.
        </p>
      </GuideSection>

      <GuideSection id="tuition" n={3} kicker="Fees" title="Tuition fees">
        <p>
          The fee cap for full-time undergraduate courses in England rose to £9,535 in 2025/26 and to £9,790 in 2026/27, the first rises since
          2017. The government plans to raise it with inflation in future years, so the calculator assumes a 3% rise a year unless you change it.
          On that assumption a three-year course starting in 2026 costs about £30,260 in fees; a four-year course about £40,960.
        </p>
        <p>
          Accelerated two-year degrees can charge up to £11,750 a year, and private providers that are not approved for the full fee loan may be
          limited to £6,525 a year of loan.
        </p>
      </GuideSection>

      <GuideSection id="maintenance" n={4} kicker="Living costs" title="Maintenance loans">
        <DataTable
          caption="Maintenance loan 2026/27, household income £25,000 or less"
          head={["Where you live", "Most you can get", "Least you can get"]}
          numeric={[1, 2]}
          rows={[
            ["With parents", "£9,118", "£4,013"],
            ["Away, outside London", "£10,830", "£5,048"],
            ["Away, in London", "£14,135", "£7,039"],
          ]}
        />
        <p>
          The loan falls as household income rises above £25,000, down to the minimum at about £58,000 to £70,000 depending on where you live.
          Use the <a href="/uk/students/maintenance-loan">maintenance loan calculator</a> for your exact figure.
        </p>
      </GuideSection>

      <GuideSection id="interest" n={5} kicker="Interest" title="Interest while you study">
        <p>
          Plan 5 loans charge interest at RPI only: 4.1% from September 2026, based on March 2026 RPI. That is lower than older <a href="/uk/students/plan-2-student-loan">Plan 2</a>{" "}loans, which
          charge up to RPI plus 3% while you study. Interest is added from the day each payment is made, so by graduation the balance is already
          larger than what you borrowed: about £3,900 more on a £63,700 three-year loan at 3%.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Three years away from home, household income £25,000"
          steps={[
            { label: "Tuition fees, rising 3% a year", value: "£30,260" },
            { label: "Maintenance loans", value: "£33,474" },
            { label: "Borrowed", value: "£63,734" },
            { label: "Interest while studying at 3%", value: "£3,862" },
          ]}
          total={{ label: "Balance at graduation", value: "£67,596" }}
        />
        <WorkedExample
          title="The same course, household income £70,000"
          steps={[
            { label: "Tuition fees", value: "£30,260" },
            { label: "Maintenance loans (the minimum)", value: "£15,603" },
            { label: "Borrowed", value: "£45,863" },
          ]}
          total={{ label: "Balance at graduation", value: "£48,642" }}
        />
        <p>
          Four years in London from a low-income household would mean borrowing about £100,000, or £107,700 by graduation.
        </p>
      </GuideSection>

      <GuideSection id="repaying" n={7} kicker="Repayment" title="How Plan 5 repayment works">
        <ul>
          <li>Repayments start the April after you leave your course.</li>
          <li>You repay 9% of your income over £25,000 a year (£2,083 a month), through your payslip.</li>
          <li>The threshold rises with RPI from April 2027.</li>
          <li>Anything left is written off 40 years after you were first due to repay.</li>
        </ul>
        <p>
          On a starting salary of £28,000 you repay £270 in the first year, £22.50 a month. On £40,000, it is £1,350 a year. See the{" "}
          <a href="/uk/students/plan-5-student-loan">Plan 5 calculator</a> for your own figures.
        </p>
      </GuideSection>

      <GuideSection id="same-repayment" n={8} kicker="A surprise" title="Why borrowing less may not save you anything">
        <p>
          Look at the two examples above. One student borrows £63,734, the other £45,863. If they both start on £28,000 and get pay rises of 4.5%
          a year, they repay exactly the same: about £100,064 over 40 years. The difference is only in how much is written off: £78,761 against
          £16,271.
        </p>
        <Callout title="Your income decides what you pay">
          For most graduates, the amount repaid depends on what they earn, not what they borrowed. Only those who earn enough to clear the loan
          pay more for borrowing more.
        </Callout>
      </GuideSection>

      <GuideSection id="real-cost" n={9} kicker="Lifetime" title="The real cost: what you repay">
        <CompareCards
          columns={[
            {
              name: "Starting on £28,000",
              rows: [
                { label: "Repaid over 40 years", value: "£100,064" },
                { label: "Loan cleared?", value: "No" },
                { label: "Written off", value: "£78,761" },
              ],
            },
            {
              name: "Starting on £40,000",
              rows: [
                { label: "Repaid", value: "£121,422" },
                { label: "Loan cleared?", value: "Yes, after 32 years" },
                { label: "Written off", value: "£0" },
              ],
            },
          ]}
        />
        <p>
          These are cash totals over decades. Because they are spread over 40 years of rising prices, they are worth much less in today&rsquo;s
          money. Even so, for a typical graduate the loan works out as an extra 9% tax on earnings above £25,000 for most of their career.
        </p>
      </GuideSection>

      <GuideSection id="living" n={10} kicker="Budget" title="Living costs the loan does not cover">
        <p>
          For many students the maintenance loan does not cover rent and food. Student rents outside London often run at £150 to £200 a week for
          44 to 51 weeks, which alone can use up most of the loan. Plan your first year with the{" "}
          <a href="/uk/students/student-budget">student budget calculator</a>, and remember costs the loan does not pay for: books, equipment, field
          trips, laptops and travel home.
        </p>
      </GuideSection>

      <GuideSection id="parents" n={11} kicker="Family" title="The parental contribution">
        <p>
          When household income is over £25,000, the maintenance loan is reduced on the assumption that parents will make up the difference.
          There is no legal duty to pay, and no one checks, but the gap can be large: at £62,410 of household income, a student living away from
          home gets £5,048 instead of £10,830, a gap of £5,782 a year.
        </p>
      </GuideSection>

      <GuideSection id="reduce" n={12} kicker="Saving money" title="Ways to reduce the cost">
        <ul>
          <li>Apply for university bursaries and scholarships, which do not have to be repaid.</li>
          <li>Live at home if your university is close enough: rent savings can outweigh the smaller loan.</li>
          <li>Work part-time, ideally no more than 15 hours a week in term time.</li>
          <li>Consider a degree apprenticeship, where your employer pays the fees and you earn a wage.</li>
          <li>Only take the maintenance loan you need: you can ask for less each year.</li>
        </ul>
      </GuideSection>

      <GuideSection id="other-nations" n={13} kicker="UK nations" title="Students from Scotland, Wales and Northern Ireland">
        <p>
          Scottish students at Scottish universities pay no tuition fees: see the <a href="/uk/students/saas-funding">SAAS funding calculator</a>.
          Welsh students get a non-repayable grant of at least £1,020 alongside their loan: see the{" "}
          <a href="/uk/students/welsh-student-finance">Welsh student finance calculator</a>. Northern Ireland has lower fees at its own universities
          and <a href="/uk/students/plan-1-student-loan">Plan 1</a>{" "}loans.
        </p>
      </GuideSection>

      <GuideSection id="assumptions" n={14} kicker="Method" title="The assumptions behind the numbers">
        <p>
          The calculator adds each year&rsquo;s loans at the start of the year and charges a year&rsquo;s interest on the balance. After graduating,
          it uses 2026/27 interest for the first year, then the RPI you choose, a Plan 5 threshold of £25,000 rising with RPI, and your pay rising by
          the rate you choose. Real careers rarely follow a straight line, so treat the repayment figures as a guide to the shape of the cost,
          not a forecast.
        </p>
      </GuideSection>

      <GuideSection id="placement" n={15} kicker="Longer courses" title="Placement years and years abroad">
        <p>
          A sandwich year in industry or a year abroad adds a year to your course. Universities charge much less for these years: the fee is capped at
          20% of the full fee for a placement year and 15% for a year abroad, and you may get a reduced maintenance loan or a Turing Scheme grant to help with costs abroad.
          If you are paid on a placement, you can save towards your final year. Set the course length to include the extra year to see its effect.
        </p>
      </GuideSection>

      <GuideSection id="postgrad" n={16} kicker="Postgraduate" title="Adding a master&rsquo;s degree">
        <p>
          A Postgraduate Loan of over £12,000 can help pay for a master&rsquo;s course. It is repaid at 6% of income over £21,000, on top of your
          undergraduate repayments, so a graduate with both pays 15% of income above the thresholds. See the{" "}
          <a href="/uk/students/postgrad-loan">Postgraduate Loan calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="compare-routes" n={17} kicker="Alternatives" title="Degree, apprenticeship or work?">
        <CompareCards
          columns={[
            {
              name: "Degree",
              rows: [
                { label: "Fees", value: "Paid by a loan" },
                { label: "Income while studying", value: "Loan and part-time work" },
                { label: "Debt", value: "Plan 5 loan" },
              ],
            },
            {
              name: "Degree apprenticeship",
              rows: [
                { label: "Fees", value: "Paid by employer and government" },
                { label: "Income while studying", value: "A wage" },
                { label: "Debt", value: "None" },
              ],
            },
          ]}
        />
        <p>
          Degree apprenticeships are competitive and not available for every subject, but for those who get one they remove the loan altogether.
        </p>
      </GuideSection>

      <GuideSection id="monthly" n={18} kicker="Monthly" title="What repayments look like each month">
        <p>
          Repayments come straight out of your pay, so it helps to think of them monthly. On £28,000 a year, 9% of the £3,000 over the threshold is £270
          a year, or £22.50 a month. On £35,000 it is £75 a month; on £45,000, £150 a month; on £60,000, £262.50 a month. Because the threshold rises
          with inflation from 2027, a <a href="/uk/tax-and-salary/pay-rise">pay rise</a>{" "}that only keeps up with prices does not increase what you repay in real terms.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={19} kicker="Other work" title="If you become self-employed or work abroad">
        <p>
          If you are self-employed, student loan repayments are worked out on your Self Assessment return and paid with your tax bill. If you move
          abroad, you repay the Student Loans Company directly, with a threshold set for the country you live in. You must tell the Student Loans
          Company if you leave the UK for more than 3 months; if you do not, it can charge fixed repayments that may be higher.
        </p>
      </GuideSection>

      <GuideSection id="nhs" n={20} kicker="Special routes" title="Nursing, teaching and other funded routes">
        <p>
          Some courses have extra help. Nursing, midwifery and many allied health students in England can get the NHS Learning Support Fund, a grant of at
          least £5,000 a year on top of the normal loans. Teacher training can come with bursaries or scholarships in shortage subjects. Medicine and dentistry
          students get NHS bursaries in the later years of their course. Check your course&rsquo;s funding page, because these can reduce what you borrow.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Student finance in England, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Tuition fee cap", "£9,790"],
            ["Accelerated degree fee cap", "£11,750"],
            ["Maintenance loan away from home (maximum)", "£10,830"],
            ["Maintenance loan in London (maximum)", "£14,135"],
            ["Maintenance loan living with parents (maximum)", "£9,118"],
            ["Plan 5 repayment threshold", "£25,000"],
            ["Plan 5 interest from September 2026", "4.1% (RPI)"],
            ["Write-off", "40 years"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

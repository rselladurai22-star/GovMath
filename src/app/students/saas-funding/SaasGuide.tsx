import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** SAAS funding — the guide. Figures from src/lib/students/nations.ts (SAAS 2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "tuition", title: "Free tuition in Scotland" },
  { id: "young-independent", title: "Young or independent student?" },
  { id: "young-table", title: "Young students: bursary and loan" },
  { id: "independent-table", title: "Independent students" },
  { id: "income", title: "How household income is assessed" },
  { id: "examples", title: "Worked examples" },
  { id: "elsewhere", title: "Studying elsewhere in the UK" },
  { id: "extra", title: "Extra help" },
  { id: "payments", title: "When and how you are paid" },
  { id: "repaying", title: "Repaying a Plan 4 loan" },
  { id: "previous-study", title: "If you have studied before" },
  { id: "apply", title: "How and when to apply" },
  { id: "budgeting", title: "Making the money last" },
  { id: "should-borrow", title: "Should you take the full loan?" },
  { id: "council-tax", title: "Council tax and benefits" },
  { id: "part-time", title: "Part-time and postgraduate study" },
  { id: "compare-uk", title: "Scotland compared with the rest of the UK" },
  { id: "repay-example", title: "What Plan 4 repayments look like" },
  { id: "disabled", title: "Disabled students" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "SAAS — Undergraduate funding for Scottish students", href: "https://www.saas.gov.uk/full-time/support-for-scottish-students/undergraduate" },
  { label: "SAAS — Parent and carer funding information 2026/27", href: "https://www.saas.gov.uk/files/446/saas-parent-carer-funding-information.pdf" },
  { label: "mygov.scot — Student finance: household income", href: "https://www.mygov.scot/student-finance-apply/household-income" },
  { label: "GOV.UK — Repaying your student loan: Plan 4", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
];

export default function SaasGuide() {
  return (
    <Guide
      kicker="The SAAS funding guide"
      title="Student funding for Scottish students in 2026/27"
      intro={
        <>
          Students from Scotland are funded by the Student Awards Agency Scotland (SAAS), not Student Finance England. Tuition at Scottish
          universities is free, and living costs are covered by a non-repayable bursary and a student loan, both based on your household
          income. This guide explains the 2026/27 amounts, who counts as a young or independent student, and how a <a href="/students/plan-4-student-loan">Plan 4</a>{" "}loan is repaid.
        </>
      }
      meta={["2026/27 figures", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Tuition at a Scottish university is <strong>free</strong> for Scottish students: SAAS pays the fee.</li>
          <li>Young students from households on £20,999 or less get <strong>£11,400 a year</strong>: a £2,000 bursary and a £9,400 loan.</li>
          <li>Above £34,000 of household income you get the minimum loan of <strong>£8,400</strong> and no bursary.</li>
          <li>The loan is <strong>Plan 4</strong>: you repay 9% of income over £33,795, and it is written off after 30 years.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£0", label: "Tuition at Scottish universities" },
            { value: "£11,400", label: "Most support a year" },
            { value: "£2,000", label: "Most bursary a year" },
            { value: "£33,795", label: "Plan 4 repayment threshold" },
          ]}
        />
      </GuideSection>

      <GuideSection id="tuition" n={2} kicker="Fees" title="Free tuition in Scotland">
        <p>
          If you live in Scotland and study a first degree at a Scottish university or college, SAAS pays your tuition fee directly: £1,820 a
          year for most courses. You do not borrow it and never repay it, but you must apply to SAAS every year for it to be paid. This is the
          main reason Scottish graduates usually leave with far smaller loans than students from England.
        </p>
      </GuideSection>

      <GuideSection id="young-independent" n={3} kicker="Your status" title="Young or independent student?">
        <CompareCards
          columns={[
            {
              name: "Young student",
              rows: [
                { label: "Age", value: "Under 25 when the course starts" },
                { label: "Income counted", value: "Your parents'" },
                { label: "Bursary", value: "Young Students' Bursary, up to £2,000" },
              ],
            },
            {
              name: "Independent student",
              rows: [
                { label: "Who", value: "25 or over, married, a parent, or self-supporting for 3 years" },
                { label: "Income counted", value: "Yours and any partner's" },
                { label: "Bursary", value: "Independent Students' Bursary, up to £1,000" },
              ],
            },
          ]}
        />
        <p>Care-experienced and estranged students are treated as independent and can get extra support.</p>
      </GuideSection>

      <GuideSection id="young-table" n={4} kicker="Young students" title="Young students: bursary and loan">
        <DataTable
          caption="Young students, 2026/27"
          head={["Household income", "Bursary", "Loan", "Total"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£0 to £20,999", "£2,000", "£9,400", "£11,400"],
            ["£21,000 to £23,999", "£1,125", "£9,400", "£10,525"],
            ["£24,000 to £33,999", "£500", "£9,400", "£9,900"],
            ["£34,000 and above", "£0", "£8,400", "£8,400"],
          ]}
        />
        <p>
          Notice the steps: £1 more of household income at a band edge can cost £875 or £625 of bursary, or £1,000 of loan. Pension contributions
          and some other deductions reduce the income SAAS counts, so it is worth giving full details.
        </p>
      </GuideSection>

      <GuideSection id="independent-table" n={5} kicker="Independent" title="Independent students">
        <DataTable
          caption="Independent students, 2026/27"
          head={["Income", "Bursary", "Loan", "Total"]}
          numeric={[1, 2, 3]}
          rows={[
            ["£0 to £20,999", "£1,000", "£10,400", "£11,400"],
            ["£21,000 to £23,999", "£0", "£10,400", "£10,400"],
            ["£24,000 to £33,999", "£0", "£9,900", "£9,900"],
            ["£34,000 and above", "£0", "£8,400", "£8,400"],
          ]}
        />
        <p>Independent students&rsquo; loans include a special support element at lower incomes. The total support at each income level is the same as for young students, or close to it, but more of it is loan.</p>
      </GuideSection>

      <GuideSection id="income" n={6} kicker="Income" title="How household income is assessed">
        <p>
          SAAS looks at gross taxable income for the previous tax year: for a course starting in 2026 that is usually 2025/26. For a young student
          living with both parents, both parents&rsquo; incomes are added together; with a parent and step-parent or partner, both count. Some
          deductions are allowed, such as pension contributions and an allowance for other dependent children.
        </p>
        <p>
          If your household income is over £34,000 you do not need to send income details: you get the minimum. If income has fallen sharply
          this year, ask SAAS whether it can use the current year instead.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={7} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Young student, household income £18,000, studying in Glasgow"
          steps={[
            { label: "Young Students' Bursary", value: "£2,000" },
            { label: "Student loan", value: "£9,400" },
            { label: "Tuition", value: "Free" },
          ]}
          total={{ label: "Support a year (£950 a month over 12 months)", value: "£11,400" }}
        />
        <WorkedExample
          title="Young student, household income £30,000, four-year degree"
          steps={[
            { label: "Bursary each year", value: "£500" },
            { label: "Loan each year", value: "£9,400" },
            { label: "Loans over 4 years", value: "£37,600" },
          ]}
          total={{ label: "Support a year", value: "£9,900" }}
        />
      </GuideSection>

      <GuideSection id="elsewhere" n={8} kicker="Rest of the UK" title="Studying elsewhere in the UK">
        <p>
          If you move to England, Wales or Northern Ireland to study, SAAS still funds you, but tuition is no longer free. You can borrow up to
          £9,790 a year as a Tuition Fee Loan to cover fees there, added to your Plan 4 loan. A four-year course in England could add over £39,000
          of fee loans, so the cost of studying outside Scotland is much higher. The bursary and living-cost loan are the same.
        </p>
      </GuideSection>

      <GuideSection id="extra" n={9} kicker="More support" title="Extra help">
        <ul>
          <li><strong>Care Experienced Students&rsquo; Bursary:</strong> a non-repayable bursary instead of the loan, for students who have been in care.</li>
          <li><strong>Disabled Students&rsquo; Allowance:</strong> for equipment, support workers and extra costs; not means-tested.</li>
          <li><strong>Lone Parents&rsquo; Grant and Dependants&rsquo; Grant:</strong> for students with children or an adult who depends on them.</li>
          <li><strong>Discretionary funds:</strong> your university can help in hardship.</li>
          <li><strong>Travel expenses:</strong> for some placements and students on certain islands.</li>
        </ul>
      </GuideSection>

      <GuideSection id="payments" n={10} kicker="Payments" title="When and how you are paid">
        <p>
          SAAS pays the bursary and loan monthly. You can choose to have it paid over the term months only, or spread over 12 months so that you
          have money over the summer. Spreading over 12 months gives smaller payments but evens out your budget. The first payment arrives once
          your university confirms you have enrolled.
        </p>
      </GuideSection>

      <GuideSection id="repaying" n={11} kicker="Repayment" title="Repaying a Plan 4 loan">
        <ul>
          <li>Repayments start the April after you leave your course.</li>
          <li>You repay 9% of income over £33,795 a year (2026/27), through your payslip.</li>
          <li>Interest is the lower of RPI or the Bank of England base rate plus 1%.</li>
          <li>Any balance left is written off 30 years after you were first due to repay.</li>
        </ul>
        <p>
          On a salary of £35,000 you would repay £108 a year, about £9 a month. Because the threshold is the highest of any UK plan, many Scottish
          graduates repay little in their early careers.
        </p>
      </GuideSection>

      <GuideSection id="previous-study" n={12} kicker="Eligibility" title="If you have studied before">
        <p>
          SAAS usually funds the length of your course plus one extra year, for a first degree. If you have already had SAAS funding for an earlier
          course, that time is taken off. If you already have a degree, you usually cannot get tuition fee support for a second one, though some
          courses such as nursing, teaching and some medicine routes have exceptions.
        </p>
      </GuideSection>

      <GuideSection id="apply" n={13} kicker="Process" title="How and when to apply">
        <Timeline
          items={[
            { when: "From April", what: "Applications open", detail: "Apply online with a SAAS account. You do not need your exam results first." },
            { when: "By 30 June", what: "Apply for on-time funding", detail: "So your money is ready for the start of term." },
            { when: "Over summer", what: "Send evidence", detail: "Your parents or partner send their income details through the SAAS document uploader." },
            { when: "Every year", what: "Reapply", detail: "Funding is not automatic for later years." },
          ]}
        />
        <Callout title="Late applications">
          The final deadline is usually 31 March in the academic year, but if you apply late you will wait longer for your first payment.
        </Callout>
      </GuideSection>

      <GuideSection id="budgeting" n={14} kicker="Budgeting" title="Making the money last">
        <p>
          SAAS pays monthly, which makes budgeting easier than the termly payments in England and Wales. If you choose 12 monthly payments, a young student
          from a household on under £21,000 gets £950 a month; on the minimum £8,400 loan it is £700 a month. Rent in Scottish university cities often
          takes £500 to £800 a month, so plan around it first. The <a href="/students/student-budget">student budget calculator</a> helps you set a weekly
          figure.
        </p>
      </GuideSection>

      <GuideSection id="should-borrow" n={15} kicker="Choices" title="Should you take the full loan?">
        <p>
          You do not have to take the full loan, and the bursary is paid whatever you borrow. Because Plan 4 has the highest repayment threshold of any UK
          student loan and low interest, borrowing is relatively cheap. Many graduates repay only part of it before it is written off after 30 years.
          Even so, borrow only what you need: you can ask SAAS to increase your loan later in the year if your costs rise.
        </p>
      </GuideSection>

      <GuideSection id="council-tax" n={16} kicker="Other money" title="Council tax and benefits">
        <p>
          Full-time students are disregarded for council tax, so a household where everyone is a student pays nothing. Most <a href="/students/student-council-tax">full-time students</a>{" "}cannot
          claim <a href="/benefits/universal-credit">Universal Credit</a>, but some can, including lone parents and some disabled students. Student loans count as income for those who can.
          Students who live with parents on benefits should check whether the family&rsquo;s benefits change when they start their course.
        </p>
      </GuideSection>

      <GuideSection id="part-time" n={17} kicker="Other courses" title="Part-time and postgraduate study">
        <p>
          Part-time students in Scotland can get help with <a href="/students/degree-cost">tuition fees</a>{" "}if their income is under £25,000, but no living-cost loan. Postgraduate students
          can get a SAAS postgraduate tuition fee loan and a living-cost loan for eligible master&rsquo;s courses. These have different amounts and
          rules from the undergraduate funding on this page.
        </p>
      </GuideSection>

      <GuideSection id="compare-uk" n={18} kicker="Comparison" title="Scotland compared with the rest of the UK">
        <p>
          A Scottish student on a four-year degree at a Scottish university, from a household on £30,000, borrows £37,600 for living costs over the whole
          course and nothing for tuition. An English student on a three-year degree in England borrows around £30,000 for tuition alone, plus a
          maintenance loan. Scottish graduates also start repaying at a higher threshold, £33,795 rather than £25,000 for English <a href="/students/plan-5-student-loan">Plan 5</a>{" "}loans, so they
          usually repay less each month for longer.
        </p>
      </GuideSection>

      <GuideSection id="repay-example" n={19} kicker="Monthly repayments" title="What Plan 4 repayments look like">
        <p>
          Plan 4 repayments are 9% of income over £33,795 a year. On £35,000 that is £108 a year, about £9 a month; on £40,000, £558 a year or £47 a month;
          on £50,000, £1,458 a year or £122 a month. The threshold rises with RPI each April, so many Scottish graduates repay little in their first
          years of work.
        </p>
      </GuideSection>

      <GuideSection id="disabled" n={20} kicker="Extra support" title="Disabled students">
        <p>
          Disabled Students&rsquo; Allowance in Scotland helps with the extra costs of studying with a disability, long-term illness, mental health condition
          or learning difficulty. It can pay for equipment, non-medical personal help and extra travel costs. It is not means-tested and does not have to be
          repaid. You apply to SAAS with evidence of your condition, and a needs assessment works out what you need.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          caption="SAAS funding, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Tuition at Scottish universities", "Free (SAAS pays £1,820)"],
            ["Most support for young students", "£11,400 a year"],
            ["Young Students' Bursary", "Up to £2,000"],
            ["Independent Students' Bursary", "Up to £1,000"],
            ["Minimum loan", "£8,400"],
            ["Tuition Fee Loan, studying elsewhere in the UK", "Up to £9,790"],
            ["Plan 4 threshold", "£33,795"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

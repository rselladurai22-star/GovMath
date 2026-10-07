import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Welsh student finance — the guide. Figures from src/lib/students/nations.ts (Student Finance Wales 2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How Welsh support works" },
  { id: "table", title: "Grant and loan by household income" },
  { id: "examples", title: "Worked examples" },
  { id: "fees", title: "Tuition fees" },
  { id: "income", title: "Household income" },
  { id: "compare-england", title: "Wales compared with England" },
  { id: "extra", title: "Extra grants" },
  { id: "repaying", title: "Repaying your loans" },
  { id: "cancellation", title: "The £1,500 loan cancellation" },
  { id: "part-time", title: "Part-time and postgraduate study" },
  { id: "apply", title: "How and when to apply" },
  { id: "independent", title: "Independent and mature students" },
  { id: "budgeting", title: "Making the money last" },
  { id: "should-borrow", title: "Should you take the full loan?" },
  { id: "nhs", title: "Health and teaching courses" },
  { id: "example-london", title: "A London example" },
  { id: "repay-example", title: "What repayments look like" },
  { id: "disabled", title: "Disabled students" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Student Finance Wales — Undergraduate students", href: "https://www.studentfinancewales.co.uk/undergraduate-students/" },
  { label: "Student Finance Wales — Notes for full-time students 2026/27 (PN1)", href: "https://studentfinancewales.co.uk/media/3qklw05b/sfw_pn1_notes_2627_e_o.pdf" },
  { label: "Student Finance Wales — Parents' guide 2026/27", href: "https://www.studentfinancewales.co.uk/media/rpwlr5nu/sfw_parents_guide_to_student_finance_2627_o_e.pdf" },
  { label: "GOV.UK — Repaying your student loan: Plan 2", href: "https://www.gov.uk/repaying-your-student-loan/what-you-pay" },
];

export default function WalesGuide() {
  return (
    <Guide
      kicker="The Welsh student finance guide"
      title="Student finance for Welsh students in 2026/27"
      intro={
        <>
          Wales has the most generous undergraduate support in the UK. Every full-time student from Wales gets the same total amount for living
          costs, whatever their family&rsquo;s income; what changes is how much of it is a grant you never repay and how much is a loan. This
          guide explains the 2026/27 figures, how the grant tapers with income and how the loans are repaid.
        </>
      }
      meta={["2026/27 figures", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Total support is <strong>£12,590</strong> a year living away from home, <strong>£10,685</strong> living with parents and <strong>£15,720</strong> in London.</li>
          <li>Part is a <strong>Welsh Government Learning Grant</strong>: up to £7,020, £8,260 or £10,325, and at least £1,020 for everyone.</li>
          <li>The rest is a <strong><a href="/uk/students/maintenance-loan">Maintenance Loan</a></strong>, repaid on Plan 2.</li>
          <li>Tuition is covered by a <strong>Tuition Fee Loan</strong> of up to £9,790 a year.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£12,590", label: "Support away from home" },
            { value: "£8,260", label: "Most grant away from home" },
            { value: "£1,020", label: "Grant for everyone" },
            { value: "£1,500", label: "Loan cancellation" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How Welsh support works">
        <p>
          Student Finance Wales first works out your Welsh Government Learning Grant from your household income, then pays the rest of the fixed
          total as a Maintenance Loan. So a student from a low-income home gets more grant and less loan; a student from a high-income home gets
          the £1,020 minimum grant and more loan. Everyone ends up with the same money to live on.
        </p>
        <Callout title="Different from England">
          In England, higher household income cuts the total you can get. In Wales it only changes the mix of grant and loan.
        </Callout>
      </GuideSection>

      <GuideSection id="table" n={3} kicker="Figures" title="Grant and loan by household income">
        <DataTable
          caption="Living away from home outside London, 2026/27 (total £12,590)"
          head={["Household income", "Grant", "Loan"]}
          numeric={[1, 2]}
          rows={[
            ["£18,370 or less", "£8,260", "£4,330"],
            ["£25,000", "£7,085", "£5,505"],
            ["£30,000", "£6,198", "£6,392"],
            ["£35,000", "£5,311", "£7,279"],
            ["£40,000", "£4,425", "£8,165"],
            ["£45,000", "£3,538", "£9,052"],
            ["£50,000", "£2,651", "£9,939"],
            ["£59,200 or more", "£1,020", "£11,570"],
          ]}
        />
        <p>Living with parents, the grant runs from £7,020 down to £1,020 within a £10,685 total; in London, from £10,325 to £1,020 within £15,720.</p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Living away from home, household income £35,000, three-year course"
          steps={[
            { label: "Learning Grant each year", value: "£5,311" },
            { label: "Maintenance Loan each year", value: "£7,279" },
            { label: "Tuition Fee Loan each year", value: "£9,790" },
            { label: "Grants over 3 years (not repaid)", value: "£15,933" },
          ]}
          total={{ label: "Loans over 3 years", value: "£51,207" }}
        />
        <WorkedExample
          title="Living with parents, household income £18,000"
          steps={[
            { label: "Learning Grant", value: "£7,020" },
            { label: "Maintenance Loan", value: "£3,665" },
          ]}
          total={{ label: "Support a year", value: "£10,685" }}
        />
      </GuideSection>

      <GuideSection id="fees" n={5} kicker="Fees" title="Tuition fees">
        <p>
          Universities across the UK can charge up to £9,790 a year in 2026/27. Welsh students can borrow the full amount as a Tuition Fee Loan,
          paid straight to the university, whether they study in Wales or elsewhere in the UK. Private providers without a fee cap are limited to
          a £6,525 loan. Students who started before August 2018 had a different system with a Fee Grant.
        </p>
      </GuideSection>

      <GuideSection id="income" n={6} kicker="Income" title="Household income">
        <p>
          For a student starting in 2026/27, Student Finance Wales uses household taxable income for the 2024/25 tax year. For students who
          depend on their parents that means both parents&rsquo; income, or a parent and their partner. Independent students, for example those
          aged 25 or over, married or self-supporting for 3 years, are assessed on their own and their partner&rsquo;s income. Some pension
          contributions and an allowance for other dependent children are taken off. If income has dropped a lot this year, ask for a current year
          income assessment.
        </p>
      </GuideSection>

      <GuideSection id="compare-england" n={7} kicker="Comparison" title="Wales compared with England">
        <CompareCards
          columns={[
            {
              name: "Wales",
              rows: [
                { label: "Total support away from home", value: "£12,590 for everyone" },
                { label: "Grant", value: "£1,020 to £8,260" },
                { label: "Loan plan", value: "Plan 2: 9% over £29,385" },
              ],
            },
            {
              name: "England",
              rows: [
                { label: "Total support away from home", value: "£5,048 to £10,830" },
                { label: "Grant", value: "None" },
                { label: "Loan plan", value: "Plan 5: 9% over £25,000" },
              ],
            },
          ]}
        />
        <p>
          A Welsh student from a low-income family gets £8,260 a year of grant that an English student would have to borrow. Over three years that is
          £24,780 less debt.
        </p>
      </GuideSection>

      <GuideSection id="extra" n={8} kicker="More support" title="Extra grants">
        <ul>
          <li><strong>Special Support Grant</strong> of up to £5,181 instead of the Learning Grant for lone parents, some disabled students and those on certain benefits; it does not reduce the loan.</li>
          <li><strong>Childcare Grant</strong> of up to £196 a week for one child or £335 for two or more.</li>
          <li><strong>Parents&rsquo; Learning Allowance</strong> of up to £1,983 and <strong>Adult Dependants&rsquo; Grant</strong> of up to £3,474.</li>
          <li><strong>Disabled Students&rsquo; Allowance</strong> for extra costs, not means-tested.</li>
          <li><strong>Travel Grant</strong> for some students studying abroad or on placements.</li>
        </ul>
      </GuideSection>

      <GuideSection id="repaying" n={9} kicker="Repayment" title="Repaying your loans">
        <p>
          Welsh students&rsquo; Tuition Fee and Maintenance Loans are Plan 2 loans, even for courses starting after 2023. You repay 9% of income over
          £29,385 a year from the April after you leave, through your payslip, and anything left is written off 30 years later. On £32,000 you would
          repay £235 a year, about £20 a month. Interest is RPI plus up to 3% depending on income, capped at 6% from September 2026. See the{" "}
          <a href="/uk/students/plan-2-student-loan">Plan 2 calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="cancellation" n={10} kicker="Bonus" title="The £1,500 loan cancellation">
        <p>
          Welsh students can have up to £1,500 of their Maintenance Loan written off when they make their first repayment. It happens automatically
          if you are eligible; you do not need to apply. Keep your contact details up to date with the Student Loans Company so it is applied.
        </p>
      </GuideSection>

      <GuideSection id="part-time" n={11} kicker="Other courses" title="Part-time and postgraduate study">
        <p>
          Wales also offers living-cost support to part-time undergraduates, worked out in proportion to the intensity of the course, and a
          postgraduate master&rsquo;s package combining a grant and a loan. Check Student Finance Wales for the details of each.
        </p>
      </GuideSection>

      <GuideSection id="apply" n={12} kicker="Process" title="How and when to apply">
        <Timeline
          items={[
            { when: "From spring", what: "Applications open", detail: "Apply online with a Student Finance Wales account." },
            { when: "Well before term", what: "Apply for on-time funding", detail: "Applications take several weeks to process, so apply early to have money at the start of term." },
            { when: "Summer", what: "Parents confirm income", detail: "Through their own online account." },
            { when: "Each year", what: "Reapply", detail: "Usually a short online form." },
          ]}
        />
      </GuideSection>

      <GuideSection id="independent" n={13} kicker="Independent" title="Independent and mature students">
        <p>
          You are assessed as an independent student, on your own income and any partner&rsquo;s rather than your parents&rsquo;, if you are 25 or over
          at the start of the academic year, are married or in a civil partnership, have a child you look after, have supported yourself for at least
          3 years, or are care-experienced or estranged from your parents. Many mature students have little or no taxable income in the assessment year,
          so they get the full Learning Grant.
        </p>
        <p>
          Students aged 60 or over on the first day of the academic year get a different, smaller package of support, so check with Student Finance
          Wales if this applies to you.
        </p>
      </GuideSection>

      <GuideSection id="budgeting" n={14} kicker="Budgeting" title="Making the money last">
        <p>
          The grant and loan are paid together in three instalments, at the start of each term. Rent, especially for a private house on a 51-week contract,
          can take most of each payment. Before term starts:
        </p>
        <ul>
          <li>work out your rent for each term and set it aside as soon as each payment arrives;</li>
          <li>divide what is left by the weeks until the next payment to get a weekly budget;</li>
          <li>remember the April payment has to last until the autumn if your tenancy covers the summer.</li>
        </ul>
        <p>
          The <a href="/uk/students/student-budget">student budget calculator</a> works this out for you.
        </p>
      </GuideSection>

      <GuideSection id="should-borrow" n={15} kicker="Choices" title="Should you take the full loan?">
        <p>
          The Learning Grant is paid whether or not you take the loan, so you can ask for a smaller Maintenance Loan and keep the grant. Whether to
          borrow the full amount depends on your plans. Plan 2 loans are only repaid once you earn over £29,385, and many graduates never clear the
          balance before it is written off after 30 years, so for them borrowing more may not mean repaying more. If you expect to earn well and clear
          the loan, borrowing less saves interest of up to RPI plus 3%. If you do not need the money, you can also repay early without a penalty.
        </p>
      </GuideSection>

      <GuideSection id="nhs" n={16} kicker="Special courses" title="Health and teaching courses">
        <p>
          Some courses have their own funding. Students on NHS-funded nursing, midwifery and allied health courses in Wales who agree to work in Wales
          after qualifying can get their tuition paid and a non-repayable bursary through the NHS Wales Bursary Scheme, with a reduced Maintenance Loan.
          Teacher training and some other courses may also have incentives. Check with your university before you apply, because these schemes change
          what Student Finance Wales pays.
        </p>
      </GuideSection>

      <GuideSection id="example-london" n={17} kicker="Example" title="A London example">
        <WorkedExample
          title="Studying in London, household income £45,000, three-year course"
          steps={[
            { label: "Learning Grant each year", value: "£4,255" },
            { label: "Maintenance Loan each year", value: "£11,465" },
            { label: "Total support each year", value: "£15,720" },
            { label: "Grants over 3 years (not repaid)", value: "£12,765" },
          ]}
          total={{ label: "Maintenance Loans over 3 years", value: "£34,395" }}
        />
        <p>
          London rents are high, so even £15,720 a year may not cover everything. Check what your university offers in bursaries.
        </p>
      </GuideSection>

      <GuideSection id="repay-example" n={18} kicker="Monthly repayments" title="What repayments look like">
        <p>
          Plan 2 repayments are 9% of income over £29,385 a year, taken from your pay. On £32,000 that is £235 a year, about £20 a month; on £40,000,
          £955 a year or £80 a month; on £50,000, £1,855 a year or £155 a month. The Plan 2 threshold is frozen at £29,385 until April 2030, so
          repayments rise if your pay goes up. Interest is RPI plus up to 3%, depending on income, capped at 6% from September 2026, and anything left
          after 30 years is written off.
        </p>
      </GuideSection>

      <GuideSection id="disabled" n={19} kicker="Extra support" title="Disabled students">
        <p>
          Disabled Students&rsquo; Allowance helps with the extra costs of studying with a disability, long-term health condition, mental health condition or
          specific learning difficulty such as dyslexia. It pays for specialist equipment, non-medical helpers such as note-takers or mentors, and extra travel
          costs. It is not based on household income and does not have to be repaid. You apply through Student Finance Wales, usually with medical evidence,
          and then have a needs assessment.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Student Finance Wales, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Total support with parents / away / London", "£10,685 / £12,590 / £15,720"],
            ["Most grant with parents / away / London", "£7,020 / £8,260 / £10,325"],
            ["Grant for everyone", "£1,020"],
            ["Full grant up to household income of", "£18,370"],
            ["Grant tapers to £1,020 at", "£59,200"],
            ["Tuition Fee Loan", "Up to £9,790"],
            ["Plan 2 threshold", "£29,385"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

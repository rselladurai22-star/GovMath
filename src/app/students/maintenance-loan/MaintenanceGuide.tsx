import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Maintenance loan — the guide. Figures from src/lib/students/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What the maintenance loan is for" },
  { id: "maximums", title: "Maximum and minimum loans" },
  { id: "income", title: "How household income is assessed" },
  { id: "taper", title: "How the loan falls as income rises" },
  { id: "example", title: "A worked example" },
  { id: "payments", title: "When the money is paid" },
  { id: "gap", title: "The gap between the loan and living costs" },
  { id: "parents", title: "What parents are expected to give" },
  { id: "independent", title: "Independent students" },
  { id: "extra", title: "Grants and extra help" },
  { id: "fees", title: "Tuition fees" },
  { id: "repaying", title: "Repaying the loan" },
  { id: "applying", title: "How and when to apply" },
  { id: "nations", title: "Wales, Scotland and Northern Ireland" },
  { id: "living-costs", title: "What living costs to plan for" },
  { id: "london", title: "Studying in London" },
  { id: "home", title: "Living at home" },
  { id: "working", title: "Working while you study" },
  { id: "banking", title: "Student bank accounts and overdrafts" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "weekly", title: "Turning the loan into a weekly budget" },
  { id: "changes", title: "If your circumstances change" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Student finance for undergraduates: what you'll get", href: "https://www.gov.uk/student-finance/new-fulltime-students" },
  { label: "GOV.UK — Understanding student living costs", href: "https://www.gov.uk/guidance/understanding-student-living-costs" },
  { label: "GOV.UK — Extra help: Childcare Grant, Parents' Learning Allowance, Adult Dependants' Grant", href: "https://www.gov.uk/extra-money-pay-university" },
  { label: "GOV.UK — Apply for student finance", href: "https://www.gov.uk/apply-online-for-student-finance" },
];

export default function MaintenanceGuide() {
  return (
    <Guide
      kicker="The maintenance loan guide"
      title="How much maintenance loan you can get in 2026/27"
      intro={
        <>
          The maintenance loan helps full-time students from England pay for rent, food and other living costs. How much you get depends on
          where you live while studying and your household income. This guide explains the 2026/27 amounts, how income is assessed, and how
          to plan for the gap between the loan and what university life really costs.
        </>
      }
      meta={["2026/27 figures", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Living away from home outside London, the most you can get is £10,830 and the least is £5,048.</li>
          <li>You get the maximum if household income is £25,000 or less. Above that, the loan falls until it reaches the minimum at £62,410.</li>
          <li>Living at home, the range is £4,013 to £9,118; in London, £7,039 to £14,135.</li>
          <li>Tuition fees of up to £9,790 are covered by a separate tuition fee loan.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£10,830", label: "Most, away from home" },
            { value: "£14,135", label: "Most, in London" },
            { value: "£9,118", label: "Most, living with parents" },
            { value: "£25,000", label: "Full loan up to this income" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What the maintenance loan is for">
        <p>
          The maintenance loan is paid into your bank account to help with living costs: rent, food, travel, books and going out. It is repaid
          together with your tuition fee loan after you leave university, as part of your Plan 5 student loan, and only once you earn over
          £25,000 a year.
        </p>
      </GuideSection>

      <GuideSection id="maximums" n={3} kicker="Amounts" title="Maximum and minimum loans">
        <DataTable
          caption="Full-time students starting or continuing in 2026/27, Student Finance England"
          head={["Where you live", "Maximum", "Minimum", "Minimum from income of"]}
          numeric={[1, 2, 3]}
          rows={[
            ["With parents", "£9,118", "£4,013", "£58,347"],
            ["Away, outside London", "£10,830", "£5,048", "£62,410"],
            ["Away, in London", "£14,135", "£7,039", "£70,131"],
            ["Studying abroad", "£12,403", "", ""],
          ]}
        />
        <p>
          The minimum is paid whatever your household income. Students aged 60 or over get up to £4,582, which is not means-tested.
        </p>
      </GuideSection>

      <GuideSection id="income" n={4} kicker="Means test" title="How household income is assessed">
        <ul>
          <li>For most students under 25, household income is your parents&rsquo; income, or one parent and their partner.</li>
          <li>For 2026/27, Student Finance England uses income from the 2024/25 tax year.</li>
          <li>Pension contributions are deducted, and £1,130 is taken off for each other child your parents support.</li>
          <li>Your own income from savings or work over a small amount can count, but part-time job earnings during the course usually do not.</li>
        </ul>
        <Callout title="If income has fallen">
          If your household income this year is likely to be at least 15% lower than in 2024/25, you can ask for a current-year assessment.
        </Callout>
      </GuideSection>

      <GuideSection id="taper" n={5} kicker="Taper" title="How the loan falls as income rises">
        <Figure label="Away from home, outside London" caption="Maintenance loan by household income, 2026/27.">
          <Bars
            items={[
              { label: "£25,000", value: 10830 },
              { label: "£35,000", value: 9285 },
              { label: "£45,000", value: 7739 },
              { label: "£55,000", value: 6194 },
              { label: "£62,410+", value: 5048 },
            ]}
          />
        </Figure>
        <p>
          Above £25,000, the loan for a student living away from home outside London falls by about £1 for every £6.47 of extra household
          income, until it reaches the minimum.
        </p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="Household income £40,000, living away from home outside London"
          steps={[
            { label: "Maintenance loan for the year", value: "£8,512" },
            { label: "Paid in three instalments of about", value: "£2,837" },
            { label: "Rent at £160 a week for 40 weeks", value: "£6,400" },
          ]}
          total={{ label: "Left for everything else", value: "£2,112" }}
        />
        <p>Over a three-year course with £9,790 fees, this student would borrow about £54,906 before interest.</p>
      </GuideSection>

      <GuideSection id="payments" n={7} kicker="Timing" title="When the money is paid">
        <Timeline
          items={[
            { when: "Start of term 1", what: "First instalment", detail: "Paid once your university confirms you have registered." },
            { when: "January", what: "Second instalment", detail: "Usually at the start of the second term." },
            { when: "April", what: "Third instalment", detail: "Usually at the start of the third term." },
          ]}
        />
        <p>The first payment can take a few days to arrive, so it helps to have some money for the first week.</p>
      </GuideSection>

      <GuideSection id="gap" n={8} kicker="Budgeting" title="The gap between the loan and living costs">
        <p>
          For many students, the loan does not cover everything. Rent alone can take most of it, especially in London and other big cities.
          Plan a weekly budget: rent, food, travel, phone, course costs and social life. Many students work part-time during term or in the
          holidays.
        </p>
      </GuideSection>

      <GuideSection id="parents" n={9} kicker="Families" title="What parents are expected to give">
        <p>
          The means test assumes that parents with higher incomes will help make up the difference between the maximum and the student&rsquo;s
          actual loan. At £40,000 household income, that is £2,318 a year for a student away from home outside London. There is no legal duty
          for parents to pay, but it is worth discussing early.
        </p>
      </GuideSection>

      <GuideSection id="independent" n={10} kicker="Independence" title="Independent students">
        <CompareCards
          columns={[
            { name: "Assessed on your own income if you", rows: [{ label: "Age", value: "Are 25 or over at the start of the year" }, { label: "Family", value: "Are married or have children" }] },
            { name: "Or you", rows: [{ label: "Support", value: "Supported yourself for 3 years" }, { label: "Care", value: "Are estranged or were in care" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="extra" n={11} kicker="Grants" title="Grants and extra help">
        <DataTable
          caption="Extra support in 2026/27 that does not have to be repaid"
          head={["Support", "Amount"]}
          rows={[
            ["Childcare Grant", "Up to 85% of costs: £199.62 a week for one child, £342.24 for two or more"],
            ["Parents' Learning Allowance", "£50 to £2,024 a year"],
            ["Adult Dependants' Grant", "Up to £3,545 a year"],
            ["Disabled Students' Allowance", "Help with extra costs from a disability"],
          ]}
        />
        <p>Universities also offer bursaries, scholarships and hardship funds. Check your university&rsquo;s website.</p>
      </GuideSection>

      <GuideSection id="fees" n={12} kicker="Fees" title="Tuition fees">
        <p>
          Tuition fees in England are up to £9,790 a year for 2026/27, or £11,750 for accelerated degrees. The tuition fee loan is paid straight
          to your university and is not means-tested.
        </p>
      </GuideSection>

      <GuideSection id="repaying" n={13} kicker="Repaying" title="Repaying the loan">
        <p>
          Your maintenance and tuition fee loans form one Plan 5 balance. You repay 9% of income above £25,000, with interest at RPI, and any
          balance is written off after 40 years. The <a href="/students/plan-5-student-loan">Plan 5 calculator</a> shows what you might repay.
        </p>
      </GuideSection>

      <GuideSection id="applying" n={14} kicker="Applying" title="How and when to apply">
        <ol>
          <li>Apply online on GOV.UK as soon as applications open, usually in the spring before you start. You do not need a confirmed place.</li>
          <li>Your parents or partner will be asked to confirm their income online.</li>
          <li>Apply again for each year of your course.</li>
        </ol>
      </GuideSection>

      <GuideSection id="nations" n={15} kicker="UK nations" title="Wales, Scotland and Northern Ireland">
        <p>
          Students from Wales, Scotland and Northern Ireland apply to their own student finance bodies, with different amounts and grants. This
          calculator covers Student Finance England.
        </p>
      </GuideSection>

      <GuideSection id="living-costs" n={16} kicker="Budget" title="What living costs to plan for">
        <ul>
          <li><strong>Rent:</strong> usually the biggest cost, often for 40 to 51 weeks a year.</li>
          <li><strong>Food and household:</strong> groceries, cleaning, toiletries.</li>
          <li><strong>Travel:</strong> local transport and trips home. A 16-25 Railcard saves a third on most rail fares.</li>
          <li><strong>Course costs:</strong> books, equipment, field trips, printing.</li>
          <li><strong>Phone and broadband,</strong> plus a TV licence if you watch live TV or BBC iPlayer.</li>
          <li><strong>Social life and sport:</strong> worth budgeting for rather than leaving to chance.</li>
        </ul>
        <p>Divide your loan by the number of weeks in term, and compare it with your weekly spending, to see if it will stretch.</p>
      </GuideSection>

      <GuideSection id="london" n={17} kicker="London" title="Studying in London">
        <p>
          London students get a bigger loan, up to £14,135, because rents are higher. Even so, rent in London halls can take most of it. The
          minimum loan in London is £7,039, reached at a household income of £70,131. At £40,000 household income, a London student can borrow
          £11,777.
        </p>
      </GuideSection>

      <GuideSection id="home" n={18} kicker="At home" title="Living at home">
        <p>
          Living with parents means a smaller loan, up to £9,118, and less to repay later. At £40,000 household income, the loan is £6,822. For
          many students, living at home saves far more in rent than the loan difference, but it can mean longer travel and less independence.
        </p>
      </GuideSection>

      <GuideSection id="working" n={19} kicker="Work" title="Working while you study">
        <p>
          Many students work part-time. Universities usually recommend no more than about 15 hours a week during term. Income tax and National
          Insurance apply as normal, but most students earn below the £12,570 Personal Allowance. Your own earnings during the course do not
          usually reduce your maintenance loan.
        </p>
      </GuideSection>

      <GuideSection id="banking" n={20} kicker="Banking" title="Student bank accounts and overdrafts">
        <p>
          Student bank accounts usually offer an interest-free overdraft, often a few thousand pounds, which can help with timing gaps between
          loan payments. It must be repaid after graduation, usually over a few years. Avoid relying on credit cards, which charge high interest.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={21} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Applying late.</strong> Apply as early as you can so the money arrives at the start of term.</li>
          <li><strong>Not checking household income evidence.</strong> Delays in parents confirming income can hold up payments.</li>
          <li><strong>Forgetting to reapply each year.</strong> Funding is not automatic for later years.</li>
          <li><strong>Spending the first instalment too fast.</strong> It has to last until January.</li>
        </ul>
      </GuideSection>

      <GuideSection id="weekly" n={22} kicker="Budget" title="Turning the loan into a weekly budget">
        <p>
          Thinking in weeks makes a budget easier to stick to. A £8,512 loan spread over 40 weeks of term is £212.80 a week. Take off rent of
          £160 a week and £52.80 is left for food, travel, course costs and everything else. If that is not enough, plan where the rest will
          come from before term starts: savings, part-time work, help from family, or a bursary.
        </p>
        <DataTable
          caption="Household income £40,000, 40 weeks of term"
          head={["Living", "Loan", "A week"]}
          numeric={[1, 2]}
          rows={[
            ["With parents", "£6,822", "£170.55"],
            ["Away, outside London", "£8,512", "£212.80"],
            ["Away, in London", "£11,777", "£294.43"],
          ]}
        />
        <p>Remember that rent for halls and private lets often covers more than 40 weeks, so check the length of your contract.</p>
      </GuideSection>

      <GuideSection id="changes" n={23} kicker="Changes" title="If your circumstances change">
        <p>
          Your loan is set for the whole academic year when you apply, but it is not fixed for good. Tell Student
          Finance England as soon as something changes, because the amount can go up or down part-way through the year.
        </p>
        <ul>
          <li>
            <strong>Household income falls.</strong>{" "}If your parents&rsquo; income this tax year is likely to be well below the
            year Student Finance England normally uses, you can ask for a current year income assessment. It can raise
            your loan, but you must send the actual figures once the year ends.
          </li>
          <li>
            <strong>Your parents separate or a parent dies.</strong>{" "}The household is reassessed, often with only one
            parent&rsquo;s income counted.
          </li>
          <li>
            <strong>You move out, or back home.</strong> Living away from home and living with parents have different
            rates, so a move part-way through the year changes your remaining instalments.
          </li>
          <li>
            <strong>You change course or leave.</strong> Payments stop or are recalculated, and you may be asked to repay
            some of an instalment straight away.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={24} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£10,830", label: "Max, away outside London" },
            { value: "£14,135", label: "Max, London" },
            { value: "£9,118", label: "Max, with parents" },
            { value: "£5,048", label: "Min, away outside London" },
            { value: "£25,000", label: "Full loan income limit" },
            { value: "£62,410", label: "Minimum from, away" },
            { value: "£9,790", label: "Tuition fee" },
            { value: "£4,582", label: "Aged 60 or over" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

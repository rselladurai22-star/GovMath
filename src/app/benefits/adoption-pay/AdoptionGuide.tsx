import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Statutory Adoption Pay — the guide. Figures from src/lib/benefits/families.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "leave", title: "Adoption leave" },
  { id: "pay", title: "Statutory Adoption Pay" },
  { id: "eligibility", title: "Who qualifies for pay" },
  { id: "earnings", title: "How average weekly earnings are worked out" },
  { id: "examples", title: "Worked examples" },
  { id: "employer", title: "Enhanced employer schemes" },
  { id: "timeline", title: "Notice and key dates" },
  { id: "partner", title: "Leave for the other adopter" },
  { id: "special", title: "Overseas, surrogacy and fostering to adopt" },
  { id: "self-employed", title: "If you cannot get adoption pay" },
  { id: "money", title: "Other money when a child arrives" },
  { id: "rights", title: "Your rights at work" },
  { id: "tax", title: "Tax, National Insurance and pensions" },
  { id: "planning", title: "Planning your finances for the year" },
  { id: "return", title: "Coming back to work" },
  { id: "keeping-in-touch", title: "Keeping-in-touch days" },
  { id: "recovering", title: "How employers recover the cost" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Adoption pay and leave", href: "https://www.gov.uk/adoption-pay-leave" },
  { label: "GOV.UK — Adoption pay and leave: eligibility", href: "https://www.gov.uk/adoption-pay-leave/eligibility" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Shared Parental Leave and Pay", href: "https://www.gov.uk/shared-parental-leave-and-pay" },
  { label: "GOV.UK — Paternity pay and leave", href: "https://www.gov.uk/paternity-pay-leave" },
];

export default function AdoptionGuide() {
  return (
    <Guide
      kicker="The adoption pay guide"
      title="Statutory Adoption Pay and leave in 2026/27"
      intro={
        <>
          When you adopt a child, or have a child through surrogacy, you have the same right to time off as a birth parent: up to 52 weeks of
          adoption leave, with up to 39 weeks of Statutory Adoption Pay. This guide explains who qualifies, how the pay is worked out, the
          dates and notice that matter, and the help available for the other adopter.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Statutory Adoption Pay is <strong>90% of your average weekly earnings for 6 weeks</strong>, then <strong>£194.32 a week</strong> (or 90% if lower) for 33 weeks.</li>
          <li>You need <strong>26 weeks with your employer</strong> by the week you are matched, and earnings of at least <strong>£129 a week</strong>.</li>
          <li>Adoption leave of up to 52 weeks is a day-one right for employees.</li>
          <li>Only one adopter gets adoption pay; the other can get paternity pay or share leave.</li>
        </ul>
        <KeyStats
          items={[
            { value: "39 weeks", label: "Of Statutory Adoption Pay" },
            { value: "£194.32", label: "Weekly flat rate from April 2026" },
            { value: "£129", label: "Lower Earnings Limit a week" },
            { value: "52 weeks", label: "Of adoption leave" },
          ]}
        />
      </GuideSection>

      <GuideSection id="leave" n={2} kicker="Leave" title="Adoption leave">
        <p>
          Employees can take up to 52 weeks of adoption leave: 26 weeks of ordinary leave and 26 weeks of additional leave. You do not need to
          have worked for your employer for any minimum time to get the leave itself. Leave can start on the day the child is placed with you or
          up to 14 days before. For overseas adoptions it starts within 28 days of the child arriving in the UK.
        </p>
        <p>
          Adoption leave is only for the main adopter. In a couple adopting together, you choose who takes it; the other can take paternity leave.
        </p>
      </GuideSection>

      <GuideSection id="pay" n={3} kicker="Pay" title="Statutory Adoption Pay">
        <DataTable
          caption="Statutory Adoption Pay from 6 April 2026"
          head={["Weeks", "Amount"]}
          rows={[
            ["1 to 6", "90% of average weekly earnings"],
            ["7 to 39", "£194.32 a week, or 90% of earnings if lower"],
            ["40 to 52", "Unpaid, unless your employer pays more"],
          ]}
        />
        <p>
          The rates are the same as Statutory Maternity Pay. Your employer pays it through payroll, so Income Tax and National Insurance are taken
          off, and recovers most or all of it from HMRC.
        </p>
      </GuideSection>

      <GuideSection id="eligibility" n={4} kicker="Eligibility" title="Who qualifies for pay">
        <p>To get Statutory Adoption Pay you must:</p>
        <ul>
          <li>be an employee or worker on your employer&rsquo;s payroll;</li>
          <li>have worked for them continuously for at least 26 weeks by the end of the week you were matched with a child;</li>
          <li>earn on average at least £129 a week (the Lower Earnings Limit) in the 8 weeks before that;</li>
          <li>give the right notice and proof of the adoption, usually a matching certificate.</li>
        </ul>
        <p>Agency workers and people on zero-hours contracts can qualify if they meet these tests.</p>
      </GuideSection>

      <GuideSection id="earnings" n={5} kicker="Earnings" title="How average weekly earnings are worked out">
        <p>
          Your employer adds up your gross pay in the 8 weeks (or 2 monthly pay days) up to the last pay day before the end of the matching week,
          and divides by 8. Overtime, bonuses and commission paid in that time count. Salary sacrifice reduces it, so if you are planning to adopt,
          check how a sacrifice scheme affects your pay. The calculator estimates it as your salary divided by 52 unless you enter a figure.
        </p>
        <Callout title="A pay rise counts">
          If you get a pay rise that would have applied during the 8 weeks, even if it is backdated later, your adoption pay is recalculated.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Salary of £36,000, 52 weeks of leave"
          steps={[
            { label: "Average weekly earnings: £36,000 ÷ 52", value: "£692.31" },
            { label: "Weeks 1 to 6 at 90%: 6 × £623.08", value: "£3,738.46" },
            { label: "Weeks 7 to 39 at £194.32: 33 weeks", value: "£6,412.56" },
            { label: "Weeks 40 to 52", value: "£0" },
          ]}
          total={{ label: "Statutory Adoption Pay in total", value: "£10,151.02" }}
        />
        <WorkedExample
          title="Part-time, average earnings £200 a week"
          steps={[
            { label: "90% of earnings", value: "£180.00 a week" },
            { label: "Lower than £194.32, so paid for all 39 weeks", value: "39 × £180" },
          ]}
          total={{ label: "Statutory Adoption Pay in total", value: "£7,020.00" }}
        />
      </GuideSection>

      <GuideSection id="employer" n={7} kicker="Enhanced pay" title="Enhanced employer schemes">
        <p>
          Many employers pay more than the statutory minimum, often full pay for a number of weeks and then half pay. Schemes are usually
          inclusive of Statutory Adoption Pay: you get whichever is higher each week, not both. On average earnings of £600 a week, a scheme of
          16 weeks full pay and 10 weeks half pay gives £15,126 over 52 weeks, compared with £9,653 from the statutory scheme alone.
        </p>
        <p>
          Some schemes ask you to return to work for a period, often 3 to 6 months, or repay the enhanced part. Check the policy before you
          start leave.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={8} kicker="Dates" title="Notice and key dates">
        <Timeline
          items={[
            { when: "Within 7 days of being matched", what: "Tell your employer", detail: "Give the placement date and when you want leave to start." },
            { when: "Within 28 days", what: "Employer confirms", detail: "They tell you when your leave will end." },
            { when: "Up to 14 days before placement", what: "Leave can start", detail: "Or on the day of placement." },
            { when: "28 days' notice", what: "Ask for pay", detail: "Your employer may ask for the matching certificate." },
            { when: "8 weeks' notice", what: "Returning early", detail: "Tell your employer if you want to come back before 52 weeks." },
          ]}
        />
      </GuideSection>

      <GuideSection id="partner" n={9} kicker="Partners" title="Leave for the other adopter">
        <CompareCards
          columns={[
            {
              name: "Paternity leave and pay",
              rows: [
                { label: "Leave", value: "Up to 2 weeks" },
                { label: "Pay", value: "£194.32 or 90% if lower" },
                { label: "When", value: "Within 52 weeks of placement" },
              ],
            },
            {
              name: "Shared parental leave",
              rows: [
                { label: "Leave", value: "Up to 50 weeks shared" },
                { label: "Pay", value: "Up to 37 weeks shared" },
                { label: "How", value: "The main adopter ends adoption leave early" },
              ],
            },
          ]}
        />
        <p>
          Use the <a href="/benefits/shared-parental-leave">shared parental leave calculator</a> to plan a split between you.
        </p>
      </GuideSection>

      <GuideSection id="special" n={10} kicker="Special cases" title="Overseas, surrogacy and fostering to adopt">
        <ul>
          <li><strong>Overseas adoption:</strong> the 26 weeks are counted to the week you get official notification. Pay starts when the child arrives in the UK or later.</li>
          <li><strong>Surrogacy:</strong> intended parents who apply for a parental order can get adoption leave and pay, with the 26 weeks counted to the 15th week before the baby is due.</li>
          <li><strong>Fostering for adoption:</strong> approved foster carers in fostering-for-adoption placements can get adoption leave and pay.</li>
          <li><strong>Step-parents and family adoptions:</strong> adopting a stepchild or a relative&rsquo;s child does not give adoption leave or pay.</li>
        </ul>
      </GuideSection>

      <GuideSection id="self-employed" n={11} kicker="Other options" title="If you cannot get adoption pay">
        <p>
          There is no equivalent of Maternity Allowance for adopters. If you do not qualify for Statutory Adoption Pay, for example because you
          are self-employed or have not been with your employer for 26 weeks, your employer must give you form SAP1 explaining why. Check
          Universal Credit, which can help with a drop in income, and Child Benefit, which you can claim as soon as the child lives with you.
        </p>
      </GuideSection>

      <GuideSection id="money" n={12} kicker="Other help" title="Other money when a child arrives">
        <ul>
          <li><a href="/benefits/child-benefit">Child Benefit</a> from the date the child comes to live with you.</li>
          <li>Universal Credit&rsquo;s child element, if you claim it.</li>
          <li>Adoption allowances from your local authority in some cases, particularly for children with additional needs.</li>
          <li>The <a href="/benefits/sure-start-maternity-grant">Sure Start Maternity Grant</a> if you adopt a child under 1 and get a qualifying benefit.</li>
          <li>Funded childcare hours and Tax-Free Childcare once you return to work.</li>
        </ul>
      </GuideSection>

      <GuideSection id="rights" n={13} kicker="Protection" title="Your rights at work">
        <p>
          While on adoption leave you keep your contractual rights apart from pay, including holiday, which keeps building up. You can do up to 10
          keeping-in-touch days without ending your leave. You have the right to return to the same job after 26 weeks, or to a similar one after
          52. Being treated unfairly or dismissed because you took adoption leave is unlawful.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={14} kicker="Deductions" title="Tax, National Insurance and pensions">
        <p>
          Statutory Adoption Pay is treated as earnings. Income Tax and National Insurance are taken off it through payroll, just like normal pay,
          so the figure in the calculator is before deductions. At £194.32 a week most people pay little or no tax on the flat-rate weeks,
          because it is below the weekly Personal Allowance of about £242.
        </p>
        <p>
          Your employer must keep paying its pension contributions during paid adoption leave as if you were on your normal pay. Your own
          contributions are based on what you actually receive. If you pay into a pension by salary sacrifice, check with your employer how the
          arrangement works while you are on leave.
        </p>
      </GuideSection>

      <GuideSection id="planning" n={15} kicker="Budgeting" title="Planning your finances for the year">
        <p>
          The drop from normal pay to £194.32 a week after week 6 is often the hardest part of adoption leave. A simple plan helps:
        </p>
        <ul>
          <li>work out your monthly income in each phase of leave: the first 6 weeks, weeks 7 to 39 and any unpaid weeks;</li>
          <li>list fixed costs such as rent or mortgage, council tax and childcare deposits, and see which months fall short;</li>
          <li>save some of the higher first-6-week payments for the unpaid weeks at the end;</li>
          <li>check whether Universal Credit could top up your household income while you are on the lower rate;</li>
          <li>ask your employer whether you can use accrued holiday at full pay at the end of your leave.</li>
        </ul>
      </GuideSection>

      <GuideSection id="return" n={16} kicker="Returning" title="Coming back to work">
        <p>
          If you want to return before the end of 52 weeks, give your employer 8 weeks&rsquo; notice. You can ask for flexible working from your
          first day in the job, and your employer must consider it reasonably. Many adopters use shared parental leave to return part-time
          while their partner takes some of the leave, or use unpaid parental leave later on: up to 18 weeks for each child before their 18th
          birthday, usually taken in blocks of a week.
        </p>
      </GuideSection>

      <GuideSection id="keeping-in-touch" n={17} kicker="Contact" title="Keeping-in-touch days">
        <p>
          You can work up to 10 keeping-in-touch days during adoption leave without ending your leave or losing adoption pay for that week. They can be
          used for training, team days or a gradual return. Both you and your employer have to agree, and you should be paid for the work, usually at
          your normal rate, with Statutory Adoption Pay counting towards it. If you share leave through shared parental leave, you get up to 20 more.
        </p>
      </GuideSection>

      <GuideSection id="recovering" n={18} kicker="Employers" title="How employers recover the cost">
        <p>
          Employers pay Statutory Adoption Pay through payroll and claim most of it back from HMRC: 92% for most employers, or 108.5% for small
          employers whose Class 1 National Insurance was £45,000 or less in the previous tax year. Any enhanced pay above the statutory amount is the
          employer&rsquo;s own cost.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          caption="Adoption leave and pay, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Adoption leave", "Up to 52 weeks"],
            ["Statutory Adoption Pay", "39 weeks"],
            ["First 6 weeks", "90% of average weekly earnings"],
            ["Weeks 7 to 39", "£194.32, or 90% if lower"],
            ["Lower Earnings Limit", "£129 a week"],
            ["Service needed for pay", "26 weeks by the matching week"],
            ["Keeping-in-touch days", "Up to 10"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

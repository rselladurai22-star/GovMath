import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Maternity pay — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "smp", title: "How Statutory Maternity Pay works" },
  { id: "eligibility", title: "Who qualifies for SMP" },
  { id: "awe", title: "Average weekly earnings" },
  { id: "examples", title: "What you get at different salaries" },
  { id: "enhanced", title: "Enhanced maternity pay" },
  { id: "ma", title: "Maternity Allowance" },
  { id: "dates", title: "Key dates and notice" },
  { id: "during", title: "During your leave" },
  { id: "tax", title: "Tax, pensions and benefits" },
  { id: "sharing", title: "Sharing leave with your partner" },
  { id: "budget", title: "Budgeting for the drop in pay" },
  { id: "holiday", title: "Using holiday around maternity leave" },
  { id: "returning", title: "Returning to work" },
  { id: "uc", title: "Maternity pay and Universal Credit" },
  { id: "pregnancy-rights", title: "Your rights while pregnant" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Maternity pay and leave", href: "https://www.gov.uk/maternity-pay-leave" },
  { label: "GOV.UK — Maternity Allowance", href: "https://www.gov.uk/maternity-allowance" },
  { label: "GOV.UK — Statutory Maternity Pay: employer guide", href: "https://www.gov.uk/employers-maternity-pay-leave" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Shared Parental Leave and Pay", href: "https://www.gov.uk/shared-parental-leave-and-pay" },
];

export default function MaternityGuide() {
  return (
    <Guide
      kicker="The maternity pay guide"
      title="Maternity pay and leave in 2026/27"
      intro={
        <>
          Most employed mothers can take up to 52 weeks of maternity leave and get Statutory Maternity Pay for 39 of them. The
          first six weeks are paid at 90% of your earnings, then the rate drops sharply. This guide explains who qualifies,
          how the pay is worked out, what enhanced schemes add, and what to do if you do not qualify.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li><strong>Weeks 1 to 6:</strong> 90% of your average weekly earnings, with no upper limit.</li>
          <li><strong>Weeks 7 to 39:</strong> £194.32 a week, or 90% of your earnings if that is less.</li>
          <li><strong>Weeks 40 to 52:</strong> unpaid, unless your employer pays more.</li>
          <li>You need 26 weeks with your employer by the qualifying week and average earnings of at least £129 a week.</li>
        </ul>
        <KeyStats
          items={[
            { value: "52 weeks", label: "Maternity leave" },
            { value: "39 weeks", label: "Statutory pay" },
            { value: "£194.32", label: "Weekly rate after week 6" },
            { value: "£129", label: "Weekly earnings needed for SMP" },
          ]}
        />
      </GuideSection>

      <GuideSection id="smp" n={2} kicker="The rules" title="How Statutory Maternity Pay works">
        <p>
          Statutory Maternity Pay (SMP) is paid by your employer through payroll, in the same way as your salary. The employer
          reclaims most or all of it from HMRC.
        </p>
        <WorkedExample
          title="A £36,000 salary: average weekly earnings £692.31"
          steps={[
            { label: "Weeks 1 to 6: 90% × £692.31 = £623.08", value: "£3,738.46" },
            { label: "Weeks 7 to 39: 33 × £194.32", value: "£6,412.56" },
            { label: "Weeks 40 to 52", value: "£0" },
          ]}
          total={{ label: "SMP in total", value: "£10,151.02" }}
        />
        <p>
          That is less than a third of the £36,000 the same year would normally pay. Planning for the drop after week six, and
          the unpaid final 13 weeks, is the single most important part of budgeting for maternity leave.
        </p>
      </GuideSection>

      <GuideSection id="eligibility" n={3} kicker="Eligibility" title="Who qualifies for SMP">
        <p>To get SMP you must:</p>
        <ul>
          <li>be an employee, not self-employed or a worker paid through an agency without an employment contract;</li>
          <li>
            have worked for your employer continuously for at least 26 weeks by the end of the <strong>qualifying week</strong>,
            the 15th week before the week your baby is due;
          </li>
          <li>earn on average at least £129 a week, the Lower Earnings Limit for 2026/27;</li>
          <li>give your employer the right notice and proof of pregnancy, usually a MAT B1 form from your midwife or GP.</li>
        </ul>
        <p>
          Maternity <strong>leave</strong> is a day-one right for employees: you get 52 weeks however long you have worked there.
          It is the <strong>pay</strong> that needs the 26 weeks.
        </p>
      </GuideSection>

      <GuideSection id="awe" n={4} kicker="The earnings test" title="Average weekly earnings">
        <p>
          Your employer works out your average weekly earnings from the gross pay you were actually paid in the eight weeks (or
          two months if paid monthly) up to the last payday before the end of the qualifying week.
        </p>
        <ul>
          <li>Overtime, commission and bonuses paid in that period count.</li>
          <li>A <a href="/tax-and-salary/pay-rise">pay rise</a>{" "}that takes effect at any time before the end of your SMP must be included, and SMP recalculated.</li>
          <li>Salary sacrifice reduces the pay that counts, unless the scheme protects it.</li>
        </ul>
        <Callout tone="good" title="Timing a bonus or overtime">
          Because the 90% weeks have no cap, extra pay in the eight-week period raises your first six weeks of SMP. A bonus paid
          in that window can be worth more than one paid at another time.
        </Callout>
      </GuideSection>

      <GuideSection id="examples" n={5} kicker="Worked examples" title="What you get at different salaries">
        <DataTable
          caption="Statutory Maternity Pay over 39 weeks, 2026/27"
          head={["Salary", "Weeks 1 to 6 (a week)", "Weeks 7 to 39 (a week)", "Total SMP"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["£9,000", "£155.77", "£155.77", "£6,075.00"],
            ["£20,000", "£346.15", "£194.32", "£8,489.48"],
            ["£30,000", "£519.23", "£194.32", "£9,527.94"],
            ["£50,000", "£865.38", "£194.32", "£11,604.87"],
            ["£80,000", "£1,384.62", "£194.32", "£14,720.25"],
          ]}
        />
        <Figure label="Total SMP by salary" caption="Higher earners get more only in the first six weeks.">
          <Bars
            items={[
              { label: "£20,000", value: 8489.48 },
              { label: "£30,000", value: 9527.94 },
              { label: "£50,000", value: 11604.87 },
              { label: "£80,000", value: 14720.25 },
            ]}
          />
        </Figure>
        <p>
          Below about £11,227 a year, 90% of earnings is less than £194.32, so the whole 39 weeks are paid at 90%. Above it,
          everything after week six is the flat rate.
        </p>
      </GuideSection>

      <GuideSection id="enhanced" n={6} kicker="Employer schemes" title="Enhanced maternity pay">
        <p>
          Many employers pay more than SMP. Schemes are usually described in weeks of full and half pay, and are normally
          &ldquo;inclusive&rdquo; of SMP: the employer tops up SMP to the scheme amount rather than paying both.
        </p>
        <CompareCards
          columns={[
            {
              name: "6 weeks full, 12 weeks half pay",
              rows: [
                { label: "SMP", value: "£10,151" },
                { label: "Employer adds", value: "£2,237" },
                { label: "Total", value: "£12,388" },
              ],
            },
            {
              name: "26 weeks full pay",
              rows: [
                { label: "SMP", value: "£10,151" },
                { label: "Employer adds", value: "£10,375" },
                { label: "Total", value: "£20,526" },
              ],
            },
          ]}
        />
        <p>
          Both examples are on a £36,000 salary. Check your contract for conditions: many schemes ask you to repay the enhanced
          part if you do not return to work for a set period, often three to six months.
        </p>
      </GuideSection>

      <GuideSection id="ma" n={7} kicker="If you do not qualify" title="Maternity Allowance">
        <p>
          If you cannot get SMP, for example because you are self-employed, changed jobs during pregnancy or earn less than £129
          a week, you may get <strong>Maternity Allowance</strong> from Jobcentre Plus instead.
        </p>
        <ul>
          <li>You must have worked, employed or self-employed, for at least 26 of the 66 weeks before your due week.</li>
          <li>You must have earned at least £30 a week in any 13 of those weeks.</li>
          <li>It pays £194.32 a week, or 90% of your earnings if lower, for 39 weeks. There are no higher first six weeks.</li>
        </ul>
        <p>
          On £25,000 a year, Maternity Allowance would pay £7,578.48 over 39 weeks. Maternity Allowance is not taxable, but it
          does count as income for Universal Credit. A lower rate applies in some cases, such as working in a spouse&rsquo;s
          business.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={8} kicker="Timing" title="Key dates and notice">
        <Timeline
          items={[
            { when: "15 weeks before", what: "Tell your employer", detail: "Give the due date and when you want leave to start, in the 15th week before the due week. Your employer confirms your return date within 28 days." },
            { when: "From 20 weeks before", what: "Get your MAT B1", detail: "Your midwife or GP can issue it from 20 weeks before the due date. Your employer needs it to pay SMP." },
            { when: "11 weeks before", what: "Earliest leave start", detail: "Leave starts automatically if you are off for a pregnancy-related reason in the last four weeks." },
            { when: "After the birth", what: "Two weeks compulsory leave", detail: "You must take at least two weeks off after the birth, or four weeks if you work in a factory." },
          ]}
        />
      </GuideSection>

      <GuideSection id="during" n={9} kicker="Your rights" title="During your leave">
        <ul>
          <li>
            <strong>Holiday:</strong> you keep accruing paid holiday for the whole 52 weeks, including <a href="/life/bank-holidays">bank holidays</a>{" "}if your
            contract gives them.
          </li>
          <li>
            <strong>Keeping in touch days:</strong> up to 10 days of work without losing SMP or ending your leave, paid at a rate
            you agree with your employer.
          </li>
          <li>
            <strong>Returning:</strong> after 26 weeks you return to the same job; after 52 weeks, to the same job or a suitable
            alternative.
          </li>
          <li>
            <strong>Redundancy:</strong> you have extra protection from redundancy during pregnancy, maternity leave and for 18
            months after the birth.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="tax" n={10} kicker="Interactions" title="Tax, pensions and benefits">
        <p>
          SMP is paid through payroll and taxed like pay: Income Tax and <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}come off. Because your pay falls,
          you may pay less tax overall that year, and payroll often refunds some tax automatically.
        </p>
        <p>
          Your employer must keep paying pension contributions on the pay you would have earned during the paid part of your
          leave, while your own contribution is based on what you actually receive. While you get SMP or Maternity Allowance you
          also keep building qualifying years for your State Pension.
        </p>
        <p>
          SMP counts as earnings for Universal Credit. If your household gets UC, it may go up while you are on leave.
        </p>
      </GuideSection>

      <GuideSection id="sharing" n={11} kicker="Options" title="Sharing leave with your partner">
        <p>
          You can end your maternity leave early and share the rest with your partner as Shared Parental Leave. Up to 50 weeks of
          leave and 37 weeks of pay can be shared. Ending maternity leave before six weeks means losing the 90% weeks, because
          shared parental pay is always at the flat rate or less. See the{" "}
          <a href="/benefits/shared-parental-leave">shared parental leave calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={12} kicker="Planning" title="Budgeting for the drop in pay">
        <p>
          For most people the big change comes in week 7. On a £36,000 salary, gross weekly pay drops from £692.31 to £623.08 for
          six weeks, then to £194.32. Over a full 52-week leave, statutory pay is £10,151 against £36,000 of normal pay.
        </p>
        <DataTable
          caption="Monthly gross pay on SMP, £36,000 salary"
          head={["Period", "Roughly a month"]}
          numeric={[1]}
          rows={[
            ["Normal pay", "£3,000"],
            ["Weeks 1 to 6", "£2,700"],
            ["Weeks 7 to 39", "£842"],
            ["Weeks 40 to 52", "£0"],
          ]}
        />
        <p>
          Building a cushion before the baby arrives, checking whether your household could get Universal Credit, and using
          holiday to extend paid time off all help. <a href="/benefits/child-benefit">Child Benefit</a>, at £27.05 a week for a first child, also starts once you
          claim.
        </p>
      </GuideSection>

      <GuideSection id="holiday" n={13} kicker="Annual leave" title="Using holiday around maternity leave">
        <p>
          You keep building up holiday for the whole of maternity leave. A full-time employee with the statutory 28 days accrues
          the full year&rsquo;s entitlement during 52 weeks off. Many people take some of it before leave starts and the rest
          at the end, so their return to work is gradual and the unpaid weeks are covered by full holiday pay.
        </p>
        <p>
          Holiday cannot be taken at the same time as maternity leave, so it is added before or after. Agree dates with your
          employer in advance, and check whether your contract lets you carry holiday into the next leave year.
        </p>
      </GuideSection>

      <GuideSection id="returning" n={14} kicker="Back to work" title="Returning to work">
        <p>
          Your employer assumes you will take the full 52 weeks. To return earlier, give at least 8 weeks&rsquo; notice. You do
          not need to give notice if you return on the expected date.
        </p>
        <p>
          You can ask for flexible working, such as fewer days or different hours, from your first day in a job. Employers must
          consider the request reasonably and respond within two months. Many parents agree a phased return using holiday or
          keeping in touch days.
        </p>
        <p>
          If your employer becomes insolvent or refuses to pay SMP you are owed, HMRC can pay it directly. Contact the HMRC
          Statutory Payment Disputes Team.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={15} kicker="Benefits" title="Maternity pay and Universal Credit">
        <p>
          If your household gets Universal Credit, or could during your leave, maternity pay affects it in different ways:
        </p>
        <ul>
          <li>
            <strong>SMP</strong> counts as earnings. After any work allowance, Universal Credit falls by 55p for each £1, the same
            as wages.
          </li>
          <li>
            <strong>Maternity Allowance</strong> counts as unearned income, so it reduces Universal Credit pound for pound.
          </li>
          <li>When your pay drops after week six, or stops after week 39, your Universal Credit usually rises.</li>
        </ul>
        <p>
          A new baby also adds a child element of £303.94 a month to a Universal Credit award, and there is no longer a limit of
          two children. The <a href="/benefits/universal-credit">Universal Credit calculator</a> shows what you could get.
        </p>
      </GuideSection>

      <GuideSection id="pregnancy-rights" n={16} kicker="Before the birth" title="Your rights while pregnant">
        <ul>
          <li>Paid time off for antenatal appointments, including antenatal classes recommended by your midwife or GP.</li>
          <li>A risk assessment of your work, with changes or suspension on full pay if risks cannot be removed.</li>
          <li>Protection from unfair treatment, dismissal or redundancy because of your pregnancy.</li>
          <li>Sickness for a pregnancy-related reason must be recorded separately and not used against you.</li>
        </ul>
        <p>
          If you are off sick with a pregnancy-related illness in the four weeks before your due week, your maternity leave and
          pay start automatically.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "90%", label: "Of earnings for the first 6 weeks" },
            { value: "£194.32", label: "Weekly SMP after week 6" },
            { value: "39 weeks", label: "Of pay" },
            { value: "52 weeks", label: "Of leave" },
            { value: "26 weeks", label: "Service needed by the qualifying week" },
            { value: "£129", label: "Lower Earnings Limit a week" },
            { value: "10", label: "Keeping in touch days" },
            { value: "11 weeks", label: "Earliest leave before the due date" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

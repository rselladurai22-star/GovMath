import {
  Callout,
  CompareCards,
  DataTable,
  Guide,
  GuideSection,
  KeyStats,
  Timeline,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Shared Parental Leave — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the sharing works" },
  { id: "eligibility", title: "Who is eligible" },
  { id: "pay", title: "Shared parental pay" },
  { id: "plans", title: "Comparing plans" },
  { id: "six-weeks", title: "Why the first six weeks matter" },
  { id: "blocks", title: "Booking leave in blocks" },
  { id: "notice", title: "Notice and paperwork" },
  { id: "enhanced", title: "Employer enhanced pay" },
  { id: "split-days", title: "Working during shared leave" },
  { id: "adoption", title: "Adoption and surrogacy" },
  { id: "enhanced-example", title: "When one employer pays more" },
  { id: "together", title: "Being off at the same time" },
  { id: "talking", title: "Talking to your employers" },
  { id: "steps", title: "Step by step: booking shared leave" },
  { id: "reasons", title: "Why many couples do not use it" },
  { id: "example-year", title: "An example year" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Shared Parental Leave and Pay", href: "https://www.gov.uk/shared-parental-leave-and-pay" },
  { label: "GOV.UK — Shared Parental Leave: eligibility", href: "https://www.gov.uk/shared-parental-leave-and-pay/eligibility" },
  { label: "GOV.UK — Shared parental leave and pay: employer guide", href: "https://www.gov.uk/shared-parental-leave-and-pay-employer-guide" },
  { label: "GOV.UK — Maternity pay and leave", href: "https://www.gov.uk/maternity-pay-leave" },
  { label: "GOV.UK — Paternity pay and leave", href: "https://www.gov.uk/paternity-pay-leave" },
];

export default function SharedGuide() {
  return (
    <Guide
      kicker="The shared parental leave guide"
      title="Shared Parental Leave and Pay explained"
      intro={
        <>
          Shared Parental Leave lets parents split up to 50 weeks of leave and 37 weeks of pay in the first year after a birth or
          adoption. You can take turns, or be off at the same time. This guide explains how the weeks are shared, who qualifies,
          what it pays, and how to plan it so you do not lose money.
        </>
      }
      meta={["2026/27 rates", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The mother ends her maternity leave early; the weeks left become Shared Parental Leave.</li>
          <li>Up to <strong>50 weeks</strong> of leave and <strong>37 weeks</strong> of pay can be shared.</li>
          <li>Pay is <strong>£194.32 a week</strong> or 90% of earnings if less, for both parents.</li>
          <li>Each parent can book up to three blocks, with 8 weeks&rsquo; notice for each.</li>
        </ul>
        <KeyStats
          items={[
            { value: "50 weeks", label: "Leave to share" },
            { value: "37 weeks", label: "Paid weeks to share" },
            { value: "£194.32", label: "Weekly shared parental pay" },
            { value: "52 weeks", label: "From the birth, to use it all" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Mechanics" title="How the sharing works">
        <p>
          The mother is entitled to 52 weeks of maternity leave and 39 weeks of maternity pay. The first two weeks after the
          birth are compulsory leave. If she gives notice to end her maternity leave early, whatever is left can be shared.
        </p>
        <WorkedExample
          title="Maternity leave ends after 20 weeks"
          steps={[
            { label: "Leave left: 52 − 20", value: "32 weeks" },
            { label: "Paid weeks left: 39 − 20", value: "19 weeks" },
            { label: "Partner takes 12 weeks", value: "12 paid" },
          ]}
          total={{ label: "Still available", value: "20 weeks, 7 paid" }}
        />
        <p>
          The partner&rsquo;s two weeks of paternity leave are separate and do not come out of the shared weeks. From April 2026
          a partner can take paternity leave even after shared parental leave.
        </p>
      </GuideSection>

      <GuideSection id="eligibility" n={3} kicker="Who qualifies" title="Who is eligible">
        <p>Both parents have to pass a test, but the tests are different.</p>
        <CompareCards
          columns={[
            {
              name: "The parent taking leave",
              rows: [
                { label: "Status", value: "An employee" },
                { label: "Service", value: "26 weeks by the 15th week before the due week" },
                { label: "For pay", value: "Average earnings of £129 a week or more" },
              ],
            },
            {
              name: "The other parent",
              rows: [
                { label: "Status", value: "Employed or self-employed" },
                { label: "Work", value: "26 of the 66 weeks before the due week" },
                { label: "Earnings", value: "£390 or more in 13 of those weeks" },
              ],
            },
          ]}
        />
        <p>
          The mother must also be entitled to maternity leave, Statutory Maternity Pay or Maternity Allowance. A self-employed
          mother on Maternity Allowance can end it early so that her employed partner can take shared leave.
        </p>
      </GuideSection>

      <GuideSection id="pay" n={4} kicker="Pay" title="Shared parental pay">
        <p>
          Statutory Shared Parental Pay (ShPP) is the lower of <strong>£194.32</strong> a week or 90% of the parent&rsquo;s
          average weekly earnings. Each parent&rsquo;s pay is based on their own earnings.
        </p>
        <DataTable
          caption="Weekly pay for different salaries"
          head={["Salary", "Average weekly earnings", "Weekly shared parental pay"]}
          numeric={[0, 1, 2]}
          rows={[
            ["£9,000", "£173.08", "£155.77"],
            ["£20,000", "£384.62", "£194.32"],
            ["£42,000", "£807.69", "£194.32"],
          ]}
        />
        <p>Pay is taxed through payroll like maternity and paternity pay.</p>
      </GuideSection>

      <GuideSection id="plans" n={5} kicker="Examples" title="Comparing plans">
        <p>For a mother on £36,000 and a partner on £42,000, using statutory pay only:</p>
        <DataTable
          caption="Total statutory pay for the family"
          head={["Plan", "Mother", "Partner", "Total"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Mother takes all 52 weeks", "£10,151", "£0", "£10,151"],
            ["Switch at 26 weeks, partner takes 26", "£7,625", "£2,526", "£10,151"],
            ["Switch at 20 weeks, partner takes 12", "£6,459", "£2,332", "£8,791"],
            ["Switch at 6 weeks, partner takes 33", "£3,738", "£6,413", "£10,151"],
            ["Switch at 4 weeks, partner takes 35", "£2,492", "£6,801", "£9,294"],
          ]}
        />
        <p>
          On statutory pay, sharing does not usually change the family total, because both parents get the same flat rate after
          the first six weeks. It changes who is at home, and when. Leaving paid weeks unused, as in the 20-and-12 plan, simply
          loses that pay.
        </p>
      </GuideSection>

      <GuideSection id="six-weeks" n={6} kicker="A trap" title="Why the first six weeks matter">
        <p>
          The first six weeks of maternity pay are at 90% of earnings with no upper limit. Shared parental pay never exceeds
          £194.32. If the mother ends maternity leave before six weeks, the remaining high-rate weeks become flat-rate weeks.
        </p>
        <Callout tone="warn" title="Switching at 4 weeks costs £857 here">
          In the example above, switching at 4 weeks gives £9,294 against £10,151 when switching at 6 weeks. The two
          high-rate weeks lost are worth £428.76 more each than the flat rate.
        </Callout>
      </GuideSection>

      <GuideSection id="blocks" n={7} kicker="Planning" title="Booking leave in blocks">
        <ul>
          <li>Each parent can give up to three notices booking leave, plus changes.</li>
          <li>A continuous block, such as 10 weeks in a row, cannot be refused by the employer.</li>
          <li>A discontinuous block, such as alternate weeks, can be refused; it then becomes one continuous block unless you withdraw it.</li>
          <li>Parents can be off at the same time, as long as the total stays within the shared weeks.</li>
          <li>All shared leave must end by the child&rsquo;s first birthday, or one year after adoption placement.</li>
        </ul>
      </GuideSection>

      <GuideSection id="notice" n={8} kicker="Paperwork" title="Notice and paperwork">
        <Timeline
          items={[
            { when: "Before maternity leave ends", what: "Curtailment notice", detail: "The mother gives notice to end maternity leave or pay on a future date, at least 8 weeks ahead." },
            { when: "8 weeks before", what: "Notice of entitlement", detail: "Each parent tells their own employer how much leave they plan to take, with a declaration from the other parent." },
            { when: "8 weeks before each block", what: "Booking notice", detail: "Each period of leave needs at least 8 weeks' notice to that parent's employer." },
          ]}
        />
        <p>Curtailment notice is usually binding once given, but can be withdrawn in a few cases, such as if the partner turns out not to qualify.</p>
      </GuideSection>

      <GuideSection id="enhanced" n={9} kicker="Employer schemes" title="Employer enhanced pay">
        <p>
          Many employers top up maternity pay, but fewer top up shared parental pay. If the mother has generous enhanced
          maternity pay and her partner gets only statutory pay, switching early can cost the family thousands.
        </p>
        <p>
          Before planning, check both employers&rsquo; policies. Some offer the same enhanced pay for shared leave as for
          maternity leave, but they are not required to.
        </p>
      </GuideSection>

      <GuideSection id="split-days" n={10} kicker="Keeping in touch" title="Working during shared leave">
        <p>
          Each parent can work up to 20 &ldquo;shared parental leave in touch&rdquo; (SPLIT) days without ending their leave.
          These are on top of the mother&rsquo;s 10 keeping in touch days during maternity leave. Pay for the days is agreed
          with the employer.
        </p>
      </GuideSection>

      <GuideSection id="adoption" n={11} kicker="Other families" title="Adoption and surrogacy">
        <p>
          Shared Parental Leave works the same way for adopters and intended parents in surrogacy. The main adopter ends their
          adoption leave early, and the remaining weeks are shared. Statutory Adoption Pay pays 90% for the first six weeks, so
          the same timing trap applies.
        </p>
      </GuideSection>

      <GuideSection id="enhanced-example" n={12} kicker="Worked example" title="When one employer pays more">
        <p>
          A mother earning £36,000 has an employer scheme paying full pay for 26 weeks. Her partner gets statutory pay only.
        </p>
        <DataTable
          caption="Family pay under two plans"
          head={["Plan", "Mother", "Partner", "Total"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Mother takes 39 weeks of paid leave", "£20,526", "£0", "£20,526"],
            ["Mother switches at 20 weeks, partner takes 19", "£13,846", "£3,692", "£17,538"],
          ]}
        />
        <p>
          Switching early gives up six weeks of the mother&rsquo;s full pay, so the family is about £2,988 worse off. In this
          case it may be better for the partner to take shared leave after week 26, when the full pay has ended.
        </p>
      </GuideSection>

      <GuideSection id="together" n={13} kicker="Options" title="Being off at the same time">
        <p>
          Shared Parental Leave does not have to be taken in turns. The partner can take shared leave while the mother is still
          on maternity leave, so you are both at home in the early weeks.
        </p>
        <WorkedExample
          title="Mother takes 30 weeks; partner takes 4 weeks during them"
          steps={[
            { label: "Mother ends maternity leave at", value: "Week 30" },
            { label: "Leave left to share: 52 − 30", value: "22 weeks" },
            { label: "Partner takes, overlapping weeks 3 to 6", value: "4 weeks" },
          ]}
          total={{ label: "Shared leave left", value: "18 weeks" }}
        />
        <p>
          To do this, the mother gives notice to end her maternity leave at week 30 before the partner&rsquo;s leave starts.
          The partner&rsquo;s weeks then count against the shared total, even though they fall during her maternity leave.
        </p>
      </GuideSection>

      <GuideSection id="talking" n={14} kicker="Practical" title="Talking to your employers">
        <p>Before you give formal notice, it helps to speak to both employers informally. Ask:</p>
        <ul>
          <li>Do you pay enhanced shared parental pay, and on what conditions?</li>
          <li>Are you likely to agree to discontinuous blocks?</li>
          <li>How will cover be arranged, and how will we keep in touch?</li>
          <li>Can I use holiday next to the shared leave?</li>
        </ul>
        <p>
          Employers often agree arrangements they could legally refuse if they have time to plan. Eight weeks is the minimum
          notice; giving more makes agreement more likely.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={15} kicker="How to" title="Step by step: booking shared leave">
        <ol>
          <li>Check both parents meet the eligibility tests, and look up both employers&rsquo; pay policies.</li>
          <li>Decide roughly how you want to split the weeks, and whether you want to overlap.</li>
          <li>The mother gives notice to end maternity leave and pay on a future date.</li>
          <li>Each parent gives their employer a notice of entitlement and intention, with a declaration from the other parent.</li>
          <li>Each parent books their first block of leave with at least 8 weeks&rsquo; notice.</li>
          <li>Book later blocks, up to three each in total, again with 8 weeks&rsquo; notice.</li>
        </ol>
        <p>
          Employers often provide their own forms. Keep copies of everything you send and the replies, in case dates need to
          change.
        </p>
      </GuideSection>

      <GuideSection id="reasons" n={16} kicker="Take-up" title="Why many couples do not use it">
        <p>Only a small share of eligible parents take shared parental leave. The usual reasons are:</p>
        <ul>
          <li>
            <strong>Money:</strong> the partner often earns more and would drop to £194.32 a week, while the mother may have
            enhanced pay.
          </li>
          <li>
            <strong>Complexity:</strong> the notices and declarations put people off, especially when plans are uncertain.
          </li>
          <li>
            <strong>Breastfeeding and recovery:</strong> many mothers prefer to take the early months themselves.
          </li>
          <li>
            <strong>Workplace culture:</strong> some partners worry about how a long absence will be seen.
          </li>
        </ul>
        <p>
          Even a short block of shared leave, such as a month when the mother returns to work, can make the handover to
          childcare easier, and it does not have to cost the family money if the weeks are paid ones.
        </p>
      </GuideSection>

      <GuideSection id="example-year" n={17} kicker="Worked example" title="An example year">
        <Timeline
          items={[
            { when: "Weeks 1 to 2", what: "Both at home", detail: "The mother's compulsory maternity leave; the partner takes two weeks of paternity leave." },
            { when: "Weeks 3 to 26", what: "Mother on maternity leave", detail: "Six weeks at 90% of earnings, then £194.32 a week." },
            { when: "Weeks 27 to 39", what: "Partner on shared parental leave", detail: "13 paid weeks at £194.32. The mother's maternity leave ended at week 26." },
            { when: "Weeks 40 to 52", what: "Unpaid shared leave, or back to work", detail: "13 weeks of unpaid leave are left to share, or to use for a gradual start at nursery." },
          ]}
        />
        <p>
          For a mother on £36,000 and a partner on £42,000, this plan pays £10,151 in total, the same as the mother taking all
          39 paid weeks, while giving the partner three months at home.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "50 weeks", label: "Shareable leave" },
            { value: "37 weeks", label: "Shareable pay" },
            { value: "£194.32", label: "Weekly ShPP" },
            { value: "2 weeks", label: "Compulsory maternity leave" },
            { value: "8 weeks", label: "Notice for each block" },
            { value: "3", label: "Blocks each parent can book" },
            { value: "20", label: "SPLIT days each" },
            { value: "£129", label: "Weekly earnings needed for pay" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

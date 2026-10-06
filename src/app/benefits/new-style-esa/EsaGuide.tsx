import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** New Style ESA — the guide. Figures from src/lib/benefits/new-style.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What New Style ESA is" },
  { id: "rates", title: "How much you get" },
  { id: "stages", title: "The assessment phase and the two groups" },
  { id: "conditions", title: "The National Insurance conditions" },
  { id: "examples", title: "Worked examples" },
  { id: "pensions", title: "Pensions and permitted work" },
  { id: "uc", title: "New Style ESA and Universal Credit" },
  { id: "wca", title: "The Work Capability Assessment" },
  { id: "time-limit", title: "The 365-day limit" },
  { id: "claim", title: "How to claim" },
  { id: "other-help", title: "Other help if you are ill or disabled" },
  { id: "fit-notes", title: "Fit notes and evidence" },
  { id: "appeals", title: "Challenging a decision" },
  { id: "sick-pay", title: "Moving from Statutory Sick Pay" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Employment and Support Allowance (ESA)", href: "https://www.gov.uk/employment-support-allowance" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Check your National Insurance record", href: "https://www.gov.uk/check-national-insurance-record" },
  { label: "GOV.UK — Work Capability Assessment", href: "https://www.gov.uk/employment-support-allowance/your-esa-claim" },
  { label: "GOV.UK — Permitted work: working while on ESA", href: "https://www.gov.uk/employment-support-allowance/working-while-you-claim" },
];

export default function EsaGuide() {
  return (
    <Guide
      kicker="The New Style ESA guide"
      title="New Style Employment and Support Allowance in 2026/27"
      intro={
        <>
          New Style Employment and Support Allowance is the benefit for people who cannot work, or can only work a little, because of illness or
          disability, and who have paid enough National Insurance. Like New Style JSA, it ignores savings and a partner&rsquo;s income. This guide
          covers the 2026/27 rates, the assessment, the time limit and how it fits with Universal Credit.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>For the first 13 weeks you get <strong>£95.55 a week</strong> at 25 or over, or <strong>£75.65</strong> under 25.</li>
          <li>After the assessment, the <strong>work-related activity group</strong> gets £95.55 a week for up to 365 days.</li>
          <li>The <strong>support group</strong> gets <strong>£145.90 a week</strong> with no time limit.</li>
          <li>You qualify through Class 1 National Insurance in the two tax years before the year you claim.</li>
          <li>Half of any private or workplace pension over £85 a week is taken off.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£95.55", label: "Assessment and main rate, 25+" },
            { value: "£145.90", label: "Support group a week" },
            { value: "365 days", label: "Limit outside the support group" },
            { value: "£203.50", label: "Permitted work a week" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What New Style ESA is">
        <p>
          ESA used to come in two forms. Income-related ESA is being replaced by Universal Credit; the contributory form is now called New Style
          ESA. You can get it if you:
        </p>
        <ul>
          <li>have an illness or disability that affects how much you can work;</li>
          <li>are under State Pension age;</li>
          <li>are not getting Statutory Sick Pay (you can claim New Style ESA when it ends, or if you cannot get it);</li>
          <li>have paid enough Class 1 National Insurance as an employee, or have enough credits.</li>
        </ul>
        <p>
          You can be employed or self-employed when you claim, and you can have savings or a working partner. You need a fit note from your doctor
          for the first weeks.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Rates" title="How much you get">
        <DataTable
          caption="New Style ESA rates from April 2026"
          head={["Stage", "Under 25", "25 or over"]}
          numeric={[1, 2]}
          rows={[
            ["Assessment phase (first 13 weeks)", "£75.65", "£95.55"],
            ["Work-related activity group", "£95.55", "£95.55"],
            ["Work-related activity group, claims before 3 April 2017", "£133.50", "£133.50"],
            ["Support group", "£145.90", "£145.90"],
          ]}
        />
        <p>
          The main phase rate is £95.55 at any age. The support group adds a support component of £50.35. Claims made before 3 April 2017 in the
          work-related activity group keep a work-related activity component of £37.95; newer claims do not get it.
        </p>
      </GuideSection>

      <GuideSection id="stages" n={4} kicker="Stages" title="The assessment phase and the two groups">
        <Timeline
          items={[
            { when: "Days 1 to 7", what: "Waiting days", detail: "No ESA is paid for these, unless you move from certain other benefits." },
            { when: "Weeks 1 to 13", what: "Assessment phase", detail: "Basic rate while the DWP assesses you. You send a questionnaire (ESA50) and may have an assessment." },
            { when: "After the assessment", what: "Main phase", detail: "You are placed in the work-related activity group or the support group, and the higher rate is backdated to week 14." },
          ]}
        />
        <p>
          If the assessment finds you fit for work, ESA stops. You can ask for a mandatory reconsideration and then appeal, and may be able to claim
          New Style JSA or Universal Credit meanwhile.
        </p>
      </GuideSection>

      <GuideSection id="conditions" n={5} kicker="Eligibility" title="The National Insurance conditions">
        <p>The conditions match New Style JSA:</p>
        <ol>
          <li>Class 1 National Insurance paid on earnings of at least 26 times the Lower Earnings Limit in one of the two tax years that count (£3,198 for 2023/24 or 2024/25).</li>
          <li>Contributions paid or credited on earnings of at least 50 times the Lower Earnings Limit in both years (£6,150 each for 2023/24 and 2024/25).</li>
        </ol>
        <p>
          For a claim made between 4 January 2026 and 2 January 2027, the years that count are 2023/24 and 2024/25. National Insurance credits,
          for example from Statutory Sick Pay, Universal Credit or caring, count for the second condition. The calculator works out the years
          from your claim date.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Support group, aged 45, no other income"
          steps={[
            { label: "Main phase rate", value: "£95.55" },
            { label: "Support component", value: "+ £50.35" },
          ]}
          total={{ label: "New Style ESA a week", value: "£145.90" }}
        />
        <WorkedExample
          title="Support group with a work pension of £120 a week"
          steps={[
            { label: "Main rate and support component", value: "£145.90" },
            { label: "Pension over £85", value: "£35.00" },
            { label: "Half of that is taken off", value: "− £17.50" },
          ]}
          total={{ label: "New Style ESA a week", value: "£128.40" }}
        />
        <WorkedExample
          title="Aged 22, in the assessment phase"
          steps={[{ label: "Assessment rate under 25", value: "£75.65" }]}
          total={{ label: "New Style ESA a week, rising to £95.55 if placed in a group", value: "£75.65" }}
        />
      </GuideSection>

      <GuideSection id="pensions" n={7} kicker="Deductions" title="Pensions and permitted work">
        <p>
          <strong>Pensions.</strong> Private, workplace and personal pensions over £85 a week reduce ESA by half of the excess. Pensions from
          ill-health retirement count the same way. The State Pension is not relevant, as ESA stops at State Pension age.
        </p>
        <p>
          <strong>Permitted work.</strong> You can work while on ESA without it affecting your benefit if you work under 16 hours a week and earn
          no more than £203.50 a week. You can also earn up to £20 a week at any hours, or work under supervision as part of a treatment
          programme. Earn more than this and ESA stops, so tell the DWP before you start work.
        </p>
        <p>
          <strong>Not counted:</strong> savings, a partner&rsquo;s earnings, PIP and Child Benefit.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={8} kicker="Universal Credit" title="New Style ESA and Universal Credit">
        <p>
          You can claim both. Universal Credit counts New Style ESA as income, monthly (weekly × 52 ÷ 12). For a single person renting at £700 a
          month, in the support group and with the health element for new claims (£217.26 a month), Universal Credit before ESA would be
          £1,342.16 a month. With ESA of £632.23 a month, UC falls to £709.93: together they still come to £1,342.16.
        </p>
        <Callout title="One assessment for both">
          If you claim both, a single Work Capability Assessment decides your ESA group and whether UC includes the health element. Since April
          2026 the UC health element is £217.26 a month for new claims and £429.80 for older claims and people with the most severe conditions.
        </Callout>
      </GuideSection>

      <GuideSection id="wca" n={9} kicker="Assessment" title="The Work Capability Assessment">
        <p>
          The assessment looks at what you can and cannot do: walking, standing and sitting, using your hands, communicating, staying conscious,
          continence, learning tasks, coping with change and getting about. You score points for each activity; 15 points places you in the
          work-related activity group. The support group is for people who meet at least one of a list of more serious descriptors, or where
          work-related activity would be a substantial risk to their health.
        </p>
        <p>
          Fill in the questionnaire carefully, with examples of bad days and how long tasks take, and send medical evidence. Many decisions are
          changed on reconsideration or appeal.
        </p>
      </GuideSection>

      <GuideSection id="time-limit" n={10} kicker="Duration" title="The 365-day limit">
        <p>
          In the assessment phase and the work-related activity group, New Style ESA is paid for up to 365 days. Time in the assessment phase
          counts. In the support group there is no limit. If you reach the limit and later your condition worsens enough for the support group,
          you can ask for ESA to restart.
        </p>
        <p>
          The government has proposed replacing New Style ESA and JSA with a single time-limited unemployment insurance benefit, and is reviewing
          the Work Capability Assessment. Until changes become law, the rules here apply.
        </p>
      </GuideSection>

      <GuideSection id="claim" n={11} kicker="Process" title="How to claim">
        <ul>
          <li>Claim online on GOV.UK, or by phone if you cannot use the online service.</li>
          <li>Have your National Insurance number, bank details, your doctor&rsquo;s details and your fit note.</li>
          <li>If you get Statutory Sick Pay, you can claim up to 3 months before it ends so payments follow on.</li>
          <li>ESA is paid every two weeks into your bank account.</li>
        </ul>
      </GuideSection>

      <GuideSection id="other-help" n={12} kicker="Other help" title="Other help if you are ill or disabled">
        <CompareCards
          columns={[
            {
              name: "Personal Independence Payment",
              rows: [
                { label: "For", value: "Extra costs of a long-term condition" },
                { label: "Means-tested", value: "No" },
                { label: "Affects ESA", value: "No" },
              ],
            },
            {
              name: "Universal Credit",
              rows: [
                { label: "For", value: "Low income, help with rent" },
                { label: "Means-tested", value: "Yes" },
                { label: "Affects ESA", value: "No, but ESA reduces UC" },
              ],
            },
          ]}
        />
        <p>
          Check <a href="/benefits/pip-points">PIP</a> and <a href="/benefits/universal-credit">Universal Credit</a>, and the{" "}
          <a href="/benefits/benefits-checker">benefits checker</a> for everything at once.
        </p>
      </GuideSection>

      <GuideSection id="fit-notes" n={13} kicker="Evidence" title="Fit notes and evidence">
        <p>
          For the first 7 days of sickness you can self-certify. After that you need a fit note (a statement of fitness for work) from a
          GP, hospital doctor, nurse, pharmacist, physiotherapist or occupational therapist. Keep sending fit notes until the Work
          Capability Assessment decides your claim, or ESA may stop.
        </p>
        <p>
          For the assessment, the most useful evidence describes how your condition affects what you can do, not just the diagnosis:
          letters from specialists, care plans, prescriptions and a diary of a typical week. Ask your GP or support workers early, as letters
          can take weeks.
        </p>
      </GuideSection>

      <GuideSection id="appeals" n={14} kicker="Disputes" title="Challenging a decision">
        <ol>
          <li>
            <strong>Mandatory reconsideration.</strong> Ask the DWP to look at the decision again within one month of the date on the letter.
            Explain which descriptors you think apply and send any new evidence.
          </li>
          <li>
            <strong>Appeal.</strong> If the decision does not change, appeal to the Social Security and Child Support Tribunal within one
            month of the reconsideration notice. A judge and a doctor hear the case, independent of the DWP.
          </li>
        </ol>
        <p>
          While you appeal a fit-for-work decision, you can usually get ESA paid at the assessment rate if you keep sending fit notes. A
          large share of appeals succeed, so it is worth asking a welfare rights adviser for help.
        </p>
      </GuideSection>

      <GuideSection id="sick-pay" n={15} kicker="Sick pay" title="Moving from Statutory Sick Pay">
        <p>
          Statutory Sick Pay lasts up to 28 weeks. You cannot get New Style ESA for the same days, but you can claim it up to 3 months before your
          sick pay ends so there is no gap. Weeks on Statutory Sick Pay also give you National Insurance credits, which help with the second
          contribution condition. See the <a href="/tax-and-salary/statutory-sick-pay">Statutory Sick Pay calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Reference" title="Key numbers">
        <DataTable
          caption="New Style ESA, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Assessment rate, 25 or over", "£95.55 a week"],
            ["Assessment rate, under 25", "£75.65 a week"],
            ["Main phase rate", "£95.55 a week"],
            ["Support component", "£50.35 a week"],
            ["Work-related activity component (pre-2017 claims)", "£37.95 a week"],
            ["Pension ignored", "£85 a week (then half counts)"],
            ["Permitted work limit", "£203.50 a week, under 16 hours"],
            ["Time limit outside support group", "365 days"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

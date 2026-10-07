import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** New Style JSA — the guide. Figures from src/lib/benefits/new-style.ts (2026/27). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What New Style JSA is" },
  { id: "rates", title: "How much you get" },
  { id: "conditions", title: "The National Insurance conditions" },
  { id: "years", title: "Which tax years count" },
  { id: "examples", title: "Worked examples" },
  { id: "reductions", title: "What reduces it" },
  { id: "uc", title: "New Style JSA and Universal Credit" },
  { id: "claim", title: "How to claim" },
  { id: "commitment", title: "Your Claimant Commitment and sanctions" },
  { id: "after", title: "When the 26 weeks end" },
  { id: "compare", title: "New Style JSA or ESA?" },
  { id: "redundancy", title: "If you have been made redundant" },
  { id: "records", title: "Keeping your National Insurance record healthy" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Jobseeker's Allowance (JSA)", href: "https://www.gov.uk/jobseekers-allowance" },
  { label: "GOV.UK — Benefit and pension rates 2026 to 2027", href: "https://www.gov.uk/government/publications/benefit-and-pension-rates-2026-to-2027" },
  { label: "GOV.UK — Check your National Insurance record", href: "https://www.gov.uk/check-national-insurance-record" },
  { label: "GOV.UK — National Insurance credits", href: "https://www.gov.uk/national-insurance-credits" },
  { label: "Legislation — Jobseekers Act 1995, section 2 (contribution conditions)", href: "https://www.legislation.gov.uk/ukpga/1995/18/section/2" },
];

export default function JsaGuide() {
  return (
    <Guide
      kicker="The New Style JSA guide"
      title="New Style Jobseeker’s Allowance in 2026/27"
      intro={
        <>
          New Style Jobseeker&rsquo;s Allowance is the benefit you build up through <a href="/uk/tax-and-salary/national-insurance">National Insurance</a>{" "}while you work. If you lose your job, it
          pays a flat weekly amount for up to 26 weeks, whatever your savings and whatever your partner earns. This guide explains who qualifies,
          how much it pays in 2026/27, how it fits with Universal Credit and what you have to do to keep it.
        </>
      }
      meta={["2026/27 rates", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>New Style JSA pays <strong>£95.55 a week</strong> if you are 25 or over, or <strong>£75.65</strong> if you are under 25, from April 2026.</li>
          <li>It lasts for up to <strong>26 weeks</strong> (182 days): up to £2,484.30 in all at the higher rate.</li>
          <li>You qualify through your National Insurance record in the two tax years before the year you claim, not through low income.</li>
          <li>Savings and a partner&rsquo;s earnings do not affect it. A private pension over £50 a week does.</li>
          <li>You can claim it alongside Universal Credit, which counts it as income.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£95.55", label: "A week at 25 or over" },
            { value: "£75.65", label: "A week under 25" },
            { value: "26 weeks", label: "Longest it is paid" },
            { value: "16 hours", label: "Work this much and it stops" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What New Style JSA is">
        <p>
          There used to be two kinds of Jobseeker&rsquo;s Allowance: contribution-based and income-based. Income-based JSA has been replaced by
          Universal Credit, and contribution-based JSA is now called New Style JSA. It is a contributory benefit, like the State Pension: you earn
          the right to it by paying Class 1 National Insurance as an employee.
        </p>
        <p>To get it you must:</p>
        <ul>
          <li>be over 18 (some 16 and 17-year-olds can claim) and under State Pension age;</li>
          <li>not be in full-time education;</li>
          <li>be available for work and actively looking for it;</li>
          <li>work less than 16 hours a week;</li>
          <li>meet the National Insurance conditions below.</li>
        </ul>
        <p>Self-employed National Insurance (Class 2 and Class 4) does not count towards it.</p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Rates" title="How much you get">
        <DataTable
          caption="New Style JSA rates from April 2026"
          head={["Age", "A week", "Every two weeks", "Over 26 weeks"]}
          numeric={[1, 2, 3]}
          rows={[
            ["25 or over", "£95.55", "£191.10", "£2,484.30"],
            ["Under 25", "£75.65", "£151.30", "£1,966.90"],
          ]}
        />
        <p>
          It is paid every two weeks into your bank account, in arrears. There are no extra amounts for a partner or children: help for them comes
          through Universal Credit and Child Benefit. New Style JSA is taxable, but it is paid without tax taken off; it goes on your <a href="/uk/tax-and-salary/p45-p60-explainer">P45</a>{" "}or into
          your <a href="/uk/tax-and-salary/tax-code-decoder">tax code</a>.
        </p>
      </GuideSection>

      <GuideSection id="conditions" n={4} kicker="Eligibility" title="The National Insurance conditions">
        <p>Two tests, both about the two tax years that count for your claim:</p>
        <ol>
          <li>
            <strong>Paid contributions.</strong> In one of the two years, you paid Class 1 National Insurance on earnings of at least 26 times the
            Lower Earnings Limit. For 2023/24 and 2024/25 the Lower Earnings Limit was £123 a week, so that is £3,198.
          </li>
          <li>
            <strong>Paid or credited.</strong> In both years, you paid or were credited with contributions on earnings of at least 50 times the
            Lower Earnings Limit: £6,150 for each of those years.
          </li>
        </ol>
        <p>
          Credits count for the second test only. You get them automatically on Universal Credit, Carer&rsquo;s Allowance, <a href="/uk/tax-and-salary/statutory-sick-pay">Statutory Sick Pay</a>,
          maternity pay and while getting <a href="/uk/benefits/child-benefit">Child Benefit</a>{" "}for a child under 12, among others. Check your record on GOV.UK: each year shows as full
          or with a gap.
        </p>
        <Callout title="Low or irregular pay">
          National Insurance is only paid on weekly earnings above the Lower Earnings Limit. If your pay was uneven, some weeks may not count. The
          calculator assumes steady pay; the DWP uses your actual record.
        </Callout>
      </GuideSection>

      <GuideSection id="years" n={5} kicker="Dates" title="Which tax years count">
        <p>
          The years that count depend on the benefit year your claim falls in. A benefit year starts on the first Sunday in January, and uses the
          last two complete tax years before it.
        </p>
        <DataTable
          caption="Tax years used for a New Style JSA claim"
          head={["Claim made between", "Tax years that count"]}
          rows={[
            ["5 January 2025 and 3 January 2026", "2022/23 and 2023/24"],
            ["4 January 2026 and 2 January 2027", "2023/24 and 2024/25"],
            ["3 January 2027 and 1 January 2028", "2024/25 and 2025/26"],
          ]}
        />
        <p>
          So someone who stopped working in 2023 may still qualify for a claim in late 2026, while someone who only started work in 2025 will not
          qualify until 2027 or later. The calculator works out the years from the claim date you enter.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={6} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="Made redundant at 40, claiming in October 2026"
          steps={[
            { label: "Pay in 2023/24 and 2024/25", value: "£22,000 each year" },
            { label: "Condition 1: £3,198 in one year", value: "Met" },
            { label: "Condition 2: £6,150 in both years", value: "Met" },
            { label: "Rate at 25 or over", value: "£95.55 a week" },
          ]}
          total={{ label: "New Style JSA for 26 weeks", value: "£2,484.30" }}
        />
        <WorkedExample
          title="Retired early at 60 with a work pension of £80 a week"
          steps={[
            { label: "Personal rate", value: "£95.55" },
            { label: "Pension over £50 a week", value: "− £30.00" },
          ]}
          total={{ label: "New Style JSA a week", value: "£65.55" }}
        />
        <WorkedExample
          title="Part-time work of 10 hours, earning £40 a week after tax"
          steps={[
            { label: "Personal rate", value: "£95.55" },
            { label: "Earnings over £5 a week", value: "− £35.00" },
          ]}
          total={{ label: "New Style JSA a week", value: "£60.55" }}
        />
      </GuideSection>

      <GuideSection id="reductions" n={7} kicker="Deductions" title="What reduces it">
        <ul>
          <li><strong>Pensions:</strong> any private, workplace or personal pension over £50 a week reduces JSA pound for pound. The State Pension does not apply, as you cannot claim JSA after State Pension age.</li>
          <li><strong>Part-time work:</strong> earnings after tax, National Insurance and half of any pension contribution, above £5 a week, reduce JSA pound for pound. Working 16 hours or more stops it entirely.</li>
          <li><strong>Not affected:</strong> savings, redundancy pay, a partner&rsquo;s income, Child Benefit, <a href="/uk/benefits/pip-points">PIP</a>.</li>
        </ul>
        <p>
          Payments from your last job, such as holiday pay or pay in lieu of notice, can delay the start of your claim. Tell the Jobcentre about them.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={8} kicker="Universal Credit" title="New Style JSA and Universal Credit">
        <p>
          You can claim both. Universal Credit counts New Style JSA as unearned income, so your UC falls by the full amount, converted to a monthly
          figure (weekly × 52 ÷ 12). For a single person aged 30 renting at £700 a month with no other income, Universal Credit alone would be
          about £1,124.90 a month. With New Style JSA of £414.05 a month, UC falls to £710.85: the total is the same.
        </p>
        <p>So why claim JSA at all?</p>
        <ul>
          <li>it is paid whatever your savings, so it helps if savings over £16,000 rule out UC;</li>
          <li>it ignores your partner&rsquo;s earnings, which might cancel UC;</li>
          <li>it keeps paying if a UC award ends, for example after a partner gets a job;</li>
          <li>you get National Insurance credits either way.</li>
        </ul>
        <Callout title="One Claimant Commitment">
          If you get both, you have one work coach and one set of work-search requirements.
        </Callout>
      </GuideSection>

      <GuideSection id="claim" n={9} kicker="Process" title="How to claim">
        <Timeline
          items={[
            { when: "Day 1", what: "Claim online on GOV.UK", detail: "You need your National Insurance number, bank details and dates of your last job." },
            { when: "Within a few days", what: "Book your first interview", detail: "The Jobcentre contacts you to arrange it." },
            { when: "Interview", what: "Agree your Claimant Commitment", detail: "What you will do each week to look for work." },
            { when: "After 7 waiting days", what: "Payment starts", detail: "Then every two weeks, in arrears." },
          ]}
        />
        <p>
          Claim as soon as you stop working. Backdating is limited and usually needs a good reason.
        </p>
      </GuideSection>

      <GuideSection id="commitment" n={10} kicker="Conditions" title="Your Claimant Commitment and sanctions">
        <p>
          While you get JSA you must look for and be available for work, attend appointments and do what your Claimant Commitment says. If you do
          not, without a good reason, your JSA can be stopped for a fixed period: a sanction. Leaving a job voluntarily or being dismissed for
          misconduct can also lead to a sanction of 13 weeks or more.
        </p>
        <p>
          If you disagree with a sanction, ask for a mandatory reconsideration within a month, then appeal to a tribunal. Hardship payments may be
          available through Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="after" n={11} kicker="Afterwards" title="When the 26 weeks end">
        <p>
          New Style JSA stops after 182 days. You cannot claim again until you have paid enough National Insurance in later tax years. If you are
          still looking for work, Universal Credit continues (or you can claim it), depending on your household income and savings. You keep
          getting National Insurance credits if you continue to look for work and sign on.
        </p>
        <p>
          The government has proposed replacing New Style JSA and New Style ESA with a single, time-limited unemployment insurance benefit. Until
          that becomes law, the rules on this page apply.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={12} kicker="Which benefit?" title="New Style JSA or ESA?">
        <CompareCards
          columns={[
            {
              name: "New Style JSA",
              rows: [
                { label: "For", value: "People able to work and looking for it" },
                { label: "Rate", value: "£95.55 (£75.65 under 25)" },
                { label: "How long", value: "26 weeks" },
                { label: "Pension rule", value: "£1 for £1 over £50 a week" },
              ],
            },
            {
              name: "New Style ESA",
              rows: [
                { label: "For", value: "People whose illness or disability limits work" },
                { label: "Rate", value: "£95.55, or £145.90 in the support group" },
                { label: "How long", value: "52 weeks, or no limit in the support group" },
                { label: "Pension rule", value: "Half of pension over £85 a week" },
              ],
            },
          ]}
        />
        <p>
          If you are ill, claim <a href="/uk/benefits/new-style-esa">New Style ESA</a> instead. You cannot get both for the same days.
        </p>
      </GuideSection>

      <GuideSection id="redundancy" n={13} kicker="Redundancy" title="If you have been made redundant">
        <p>
          Redundancy pay does not reduce New Style JSA or count as savings for it, though it does count as savings for Universal Credit.
          Holiday pay and pay in lieu of notice from your last job can push back the date JSA starts, because they are treated as
          earnings for the period they cover.
        </p>
        <p>
          Claim straight away even if you have notice pay to come: the Jobcentre works out the start date. Check the{" "}
          <a href="/uk/tax-and-salary/redundancy">redundancy pay calculator</a> to see what you are owed, and remember that the first
          £30,000 of redundancy pay is usually tax-free.
        </p>
      </GuideSection>

      <GuideSection id="records" n={14} kicker="Your record" title="Keeping your National Insurance record healthy">
        <p>
          While you get New Style JSA you get National Insurance credits each week, which keep your State Pension record growing and help
          you qualify for contributory benefits in later years. If JSA ends and you are still looking for work, keep signing on through
          Universal Credit to keep the credits. Check your record on GOV.UK once a year: gaps can sometimes be filled by voluntary Class 3
          contributions.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Reference" title="Key numbers">
        <DataTable
          caption="New Style JSA, 2026/27"
          head={["Item", "Amount"]}
          rows={[
            ["Rate at 25 or over", "£95.55 a week"],
            ["Rate under 25", "£75.65 a week"],
            ["Longest award", "182 days (26 weeks)"],
            ["Pension ignored", "£50 a week"],
            ["Earnings ignored", "£5 a week"],
            ["Hours limit", "Under 16 a week"],
            ["Lower Earnings Limit 2023/24 and 2024/25", "£123 a week"],
            ["Waiting days", "7"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

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

/** Statutory Sick Pay — the full 2026/27 guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "changes", title: "What changed in April 2026" },
  { id: "who", title: "Who can get SSP" },
  { id: "how-much", title: "How much SSP you get" },
  { id: "daily", title: "Daily rates and part weeks" },
  { id: "earnings", title: "Average weekly earnings" },
  { id: "how-long", title: "How long SSP lasts" },
  { id: "company", title: "Company sick pay" },
  { id: "evidence", title: "Telling your employer and fit notes" },
  { id: "tax-benefits", title: "Tax, benefits and disputes" },
  { id: "scenarios", title: "SSP in different situations" },
  { id: "holiday-maternity", title: "SSP, holiday and maternity" },
  { id: "universal-credit", title: "SSP and Universal Credit" },
  { id: "employers", title: "For employers" },
  { id: "qualifying", title: "Qualifying days and periods of sickness" },
  { id: "work-types", title: "Agency, zero-hours and several jobs" },
  { id: "disputes", title: "If your employer will not pay" },
  { id: "returning", title: "Returning to work" },
  { id: "key-numbers", title: "Key numbers for 2026/27" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Statutory Sick Pay", href: "https://www.gov.uk/statutory-sick-pay" },
  { label: "GOV.UK — Statutory Sick Pay: employer guide", href: "https://www.gov.uk/employers-sick-pay" },
  { label: "business.gov.uk — Statutory Sick Pay changes", href: "https://www.business.gov.uk/campaign/employment-changes/employers/statutory-sick-pay/" },
  { label: "GOV.UK — Rates and thresholds for employers 2026 to 2027", href: "https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027" },
  { label: "GOV.UK — Taking sick leave", href: "https://www.gov.uk/taking-sick-leave" },
];

export default function SSPGuide() {
  return (
    <Guide
      kicker="The sick pay guide"
      title="Statutory Sick Pay, explained clearly"
      intro={
        <>
          Statutory Sick Pay (SSP) is the minimum your employer must pay when you are too ill to work. It changed
          significantly on 6 April 2026: it is now paid from the first day, and low earners qualify for the first time.
          This guide explains the new rules, how much you get and how long it lasts.
        </>
      }
      meta={["2026/27 rules", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="changes" n={1} kicker="New rules" title="What changed in April 2026">
        <CompareCards
          columns={[
            {
              name: "Before 6 April 2026",
              rows: [
                { label: "First paid day", value: "Day 4 (3 waiting days)" },
                { label: "Earnings needed", value: "At least £125 a week" },
                { label: "Weekly amount", value: "£118.75 flat" },
              ],
            },
            {
              name: "From 6 April 2026",
              rows: [
                { label: "First paid day", value: "Day 1" },
                { label: "Earnings needed", value: "None" },
                { label: "Weekly amount", value: "Lower of £123.25 or 80% of earnings" },
              ],
            },
          ]}
        />
        <p>
          The changes came from the Employment Rights Act. Removing the waiting days means short illnesses are now
          paid, and removing the earnings test brings in about 1.3 million low-paid workers, many with more than one
          job, who previously got nothing.
        </p>
      </GuideSection>

      <GuideSection id="who" n={2} kicker="Eligibility" title="Who can get SSP">
        <p>You can get SSP if you:</p>
        <ul>
          <li>are classed as an employee and have done some work for your employer,</li>
          <li>are too ill to work, and</li>
          <li>tell your employer you are sick, within their deadline or within 7 days.</li>
        </ul>
        <p>
          Agency workers, zero-hours workers and people with several jobs can all qualify. If you have more than one
          employer you can get SSP from each one. You cannot get SSP if you are self-employed, already getting Statutory
          Maternity Pay, or in some cases if you are in prison or abroad.
        </p>
      </GuideSection>

      <GuideSection id="how-much" n={3} kicker="The amount" title="How much SSP you get">
        <p>
          For 2026/27, SSP is the <strong>lower</strong> of £123.25 a week or 80% of your average weekly earnings. The
          80% rule only matters if you earn less than about £154 a week.
        </p>
        <DataTable
          caption="Weekly SSP by average weekly earnings, 2026/27"
          head={["Average weekly earnings", "80% of earnings", "Weekly SSP"]}
          numeric={[1, 2]}
          rows={[
            ["£80", "£64.00", "£64.00"],
            ["£120", "£96.00", "£96.00"],
            ["£150", "£120.00", "£120.00"],
            ["£154.06 or more", "£123.25 or more", "£123.25"],
            ["£500", "£400.00", "£123.25"],
          ]}
        />
        <WorkedExample
          title="Worked example: 3 days off, earning £500 a week, 5-day week"
          steps={[
            { label: "Weekly SSP", note: "80% of £500 is more than £123.25", value: "£123.25" },
            { label: "Daily rate", note: "£123.25 ÷ 5", value: "£24.65" },
            { label: "Before April 2026", note: "All 3 days were waiting days", value: "£0" },
          ]}
          total={{ label: "SSP now", value: "£73.95" }}
        />
      </GuideSection>

      <GuideSection id="daily" n={4} kicker="Daily rates" title="Daily rates and part weeks">
        <p>
          SSP is paid for <strong>qualifying days</strong>: the days you normally work. The weekly amount is divided by
          the number of qualifying days in your week.
        </p>
        <DataTable
          caption="Daily SSP at the full weekly rate of £123.25"
          head={["Days worked a week", "Daily SSP"]}
          numeric={[1]}
          rows={[
            ["3", "£41.08"],
            ["4", "£30.81"],
            ["5", "£24.65"],
            ["7", "£17.61"],
          ]}
        />
        <p>
          If your days vary, you and your employer can agree which days count as qualifying days. There must be at least
          one a week.
        </p>
      </GuideSection>

      <GuideSection id="earnings" n={5} kicker="Earnings" title="Average weekly earnings">
        <p>
          Your average weekly earnings are normally worked out over the 8 weeks before the pay day before you fell ill.
          They include overtime, bonuses, holiday pay and statutory pay, before tax and National Insurance. If you have
          worked for less than 8 weeks, a shorter period is used.
        </p>
        <p>
          For most people this only matters if you earn less than £154.06 a week, because above that SSP is the flat
          £123.25.
        </p>
      </GuideSection>

      <GuideSection id="how-long" n={6} kicker="Duration" title="How long SSP lasts">
        <p>
          SSP is paid for up to <strong>28 weeks</strong>{" "}in a period of sickness. If you are ill again within 8 weeks of
          a previous spell, the two are &ldquo;linked&rdquo; and count as one period, sharing the same 28 weeks.
        </p>
        <Timeline
          items={[
            { when: "Days 1 to 7", what: "Self-certify", detail: "You can tell your employer you are ill without a doctor’s note." },
            { when: "From day 8", what: "Fit note", detail: "Your employer can ask for a fit note from a GP, hospital doctor, nurse, pharmacist or physiotherapist." },
            { when: "Week 23", what: "Warning", detail: "If SSP is going to end, your employer should give you form SSP1 by the start of week 23, or within 7 days if it ends sooner." },
            { when: "Week 28", what: "SSP ends", detail: "You may be able to claim New Style Employment and Support Allowance or Universal Credit." },
          ]}
        />
      </GuideSection>

      <GuideSection id="company" n={7} kicker="Employer schemes" title="Company sick pay">
        <p>
          Many employers pay more than SSP, for example full pay for a number of weeks followed by half pay. This is called
          contractual or occupational sick pay. SSP is included within it, not paid on top: you receive whichever is
          higher.
        </p>
        <p>
          Company schemes often have conditions, such as a minimum length of service, and different rules for absence
          triggers and return-to-work meetings. Check your contract or staff handbook. If your company scheme runs out
          before 28 weeks, you still get SSP for the rest of the period.
        </p>
      </GuideSection>

      <GuideSection id="evidence" n={8} kicker="Evidence" title="Telling your employer and fit notes">
        <p>
          Follow your employer&rsquo;s absence rules. They can set a deadline for telling them, but they cannot insist on
          notice in person or on a form you have not been given. If they have no rules, you must tell them within 7 days.
        </p>
        <Callout title="Fit notes are free">
          A fit note can say you are not fit for work, or that you may be fit for work with changes such as reduced hours
          or lighter duties. GPs must not charge for a fit note for SSP purposes.
        </Callout>
      </GuideSection>

      <GuideSection id="tax-benefits" n={9} kicker="Tax and benefits" title="Tax, benefits and disputes">
        <ul>
          <li>
            <strong>Tax:</strong> SSP is paid through payroll and taxed like pay, with Income Tax and National Insurance
            deducted as normal.
          </li>
          <li>
            <strong>Universal Credit:</strong> SSP counts as earnings, so it reduces Universal Credit through the taper in
            the same way as wages.
          </li>
          <li>
            <strong>Disputes:</strong> if your employer refuses SSP, ask them for a written explanation (form SSP1 if they
            say you are not entitled). You can then ask HMRC to decide.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="scenarios" n={10} kicker="Examples" title="SSP in different situations">
        <DataTable
          caption="Statutory Sick Pay examples, 2026/27"
          head={["Situation", "Weekly SSP", "Days off", "SSP paid"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Full-time, £600 a week, 5-day week", "£123.25", "10", "£246.50"],
            ["Part-time, £150 a week, 3-day week", "£120.00", "3", "£120.00"],
            ["Low earner, £100 a week, 2-day week", "£80.00", "4", "£160.00"],
            ["Full-time, off for the full 28 weeks", "£123.25", "140", "£3,451.00"],
          ]}
        />
        <p>
          Before April 2026 the part-time and low-earning workers in this table would have had nothing, and everyone would
          have lost the first three days.
        </p>
      </GuideSection>

      <GuideSection id="holiday-maternity" n={11} kicker="Other leave" title="SSP, holiday and maternity">
        <ul>
          <li>
            If you fall ill during booked holiday, you can ask to take the days as sick leave instead and rebook your
            holiday later.
          </li>
          <li>
            You can choose to take paid holiday while off sick, which gives you holiday pay instead of SSP for those
            days.
          </li>
          <li>
            SSP stops if you start Statutory Maternity Pay or Maternity Allowance. If you are off sick with a
            pregnancy-related illness in the four weeks before your due date, your maternity pay period starts
            automatically.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="universal-credit" n={12} kicker="Benefits" title="SSP and Universal Credit">
        <p>
          SSP is treated as earnings for Universal Credit, so it reduces your award in the same way as wages: by 55p for
          every £1 above any work allowance. Because SSP is usually lower than your normal wages, your Universal Credit
          will often go up while you are off sick.
        </p>
        <p>
          If SSP ends after 28 weeks and you are still too ill to work, you can claim the health element of Universal
          Credit or New Style Employment and Support Allowance, depending on your National Insurance record. Your
          employer should give you form SSP1 to help with the claim.
        </p>
      </GuideSection>

      <GuideSection id="employers" n={13} kicker="For employers" title="For employers">
        <ul>
          <li>SSP is paid through payroll on your normal paydays, with tax and NI deducted.</li>
          <li>Since April 2026, pay SSP from the first qualifying day, with no earnings test.</li>
          <li>Use the lower of £123.25 or 80% of average weekly earnings, divided by qualifying days.</li>
          <li>Employers cannot reclaim SSP from HMRC; the general recovery scheme ended in 2014, and the temporary Covid scheme has closed.</li>
          <li>Keep payroll records, including SSP payments, for at least 3 years.</li>
        </ul>
      </GuideSection>

      <GuideSection id="qualifying" n={14} kicker="The rules" title="Qualifying days and periods of sickness">
        <p>
          SSP is worked out using <strong>qualifying days</strong>, the days of the week you normally work. If you work
          Monday to Friday, those are your qualifying days, and a weekend spent ill does not count. If your pattern
          changes from week to week, you and your employer can agree which days count, as long as there is at least one
          each week.
        </p>
        <p>
          A <strong>period of incapacity for work</strong> is a run of days when you are too ill to work. Periods that
          are 8 weeks or less apart are linked and treated as one, which matters for the 28-week limit. Since April 2026
          there are no waiting days, so the old rules about linking periods to avoid serving waiting days again no
          longer affect how much you receive at the start.
        </p>
        <p>
          SSP is paid on your normal paydays, in the same way as wages. If you are paid monthly, SSP for days off in
          the month is added to that month&rsquo;s pay.
        </p>
      </GuideSection>

      <GuideSection id="work-types" n={15} kicker="Different jobs" title="Agency, zero-hours and several jobs">
        <p>
          Agency workers are paid SSP by the agency, or by an umbrella company if one employs them. Zero-hours workers
          can get SSP for days they were due to work, and the April 2026 changes mean many of them qualify for the first
          time because the earnings test has gone.
        </p>
        <p>
          If you have two jobs, each employer looks only at your earnings with them. You can get SSP from both, or from
          one if you can still do the other job. Before April 2026, people with two low-paid jobs often got nothing,
          because neither job alone reached the earnings threshold.
        </p>
        <p>
          If you are self-employed, SSP does not apply. You may be able to claim New Style Employment and Support
          Allowance based on your National Insurance contributions, or Universal Credit.
        </p>
      </GuideSection>

      <GuideSection id="disputes" n={16} kicker="Disputes" title="If your employer will not pay">
        <p>
          If your employer says you are not entitled to SSP, they must explain why in writing, usually on form SSP1, within
          7 days of your request. Common reasons include not telling them in time, not being an employee, or having
          reached the 28-week limit.
        </p>
        <p>
          If you disagree, raise it with your employer first, and then ask HMRC&rsquo;s Statutory Payment Disputes Team
          to make a formal decision. HMRC can order your employer to pay. If your employer cannot pay, for example because
          it is insolvent, HMRC can pay you directly.
        </p>
      </GuideSection>

      <GuideSection id="returning" n={17} kicker="Back to work" title="Returning to work">
        <p>
          A fit note may say you &ldquo;may be fit for work&rdquo; with changes, such as a phased return, reduced hours,
          different duties or changes to your workplace. Your employer should discuss these with you. If they cannot make
          the changes, you are treated as not fit for work and SSP continues.
        </p>
        <p>
          During a phased return you are paid for the hours you work. If you work part of a day, it does not count as a
          sick day for SSP. Many employers hold a return-to-work meeting to agree a plan, and some offer occupational
          health support.
        </p>
        <p>
          If you are off sick for more than four weeks, your employer may refer you to occupational health or ask for your
          consent to contact your doctor. You do not have to agree to a medical report, but it can help your employer
          make the right adjustments.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Quick reference" title="Key numbers for 2026/27">
        <KeyStats
          items={[
            { value: "£123.25", label: "Maximum weekly SSP" },
            { value: "80%", label: "Of average earnings, if lower" },
            { value: "Day 1", label: "SSP starts from the first day off" },
            { value: "28 weeks", label: "Longest SSP period" },
            { value: "8 weeks", label: "Gap that links two spells" },
            { value: "7 days", label: "Self-certification before a fit note" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

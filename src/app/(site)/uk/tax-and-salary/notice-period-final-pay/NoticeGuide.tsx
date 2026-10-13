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

/** Notice periods and final pay: the guide. Figures from src/lib/tax/employment-rights.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "statutory-employer", title: "Notice your employer must give" },
  { id: "statutory-employee", title: "Notice you must give" },
  { id: "contract", title: "Contract notice and the longer rule" },
  { id: "counting", title: "Counting the days" },
  { id: "months", title: "Notice in months" },
  { id: "last-day", title: "Last working day vs leaving date" },
  { id: "example-dismissal", title: "Example: notice from an employer" },
  { id: "example-resign", title: "Example: resigning" },
  { id: "final-pay", title: "What goes in your final pay" },
  { id: "part-month", title: "Pay for part of a month" },
  { id: "holiday", title: "Untaken holiday" },
  { id: "pilon", title: "Pay in lieu of notice" },
  { id: "garden-leave", title: "Garden leave" },
  { id: "deductions", title: "Deductions from final pay" },
  { id: "tax", title: "Tax, your P45 and code 0T" },
  { id: "notice-pay-rate", title: "Pay during notice" },
  { id: "leaving-early", title: "Leaving early or extending" },
  { id: "problems", title: "If final pay is wrong" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK: Handing in your notice", href: "https://www.gov.uk/handing-in-your-notice" },
  { label: "GOV.UK: Dismissal, notice periods", href: "https://www.gov.uk/dismissal/notice-periods" },
  { label: "Acas: Notice periods", href: "https://www.acas.org.uk/notice-periods" },
  { label: "Acas: Final pay when someone leaves a job", href: "https://www.acas.org.uk/final-pay-when-someone-leaves-a-job" },
  { label: "GOV.UK: Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK: Bank holidays", href: "https://www.gov.uk/bank-holidays" },
];

export default function NoticeGuide() {
  return (
    <Guide
      kicker="The notice and final pay guide"
      title="Notice periods and your final pay in the UK"
      intro={
        <>
          Whether you are resigning or being let go, two questions come up straight away: when is my last day, and what will my last payslip say? This guide explains
          the legal minimum notice, how it sits alongside your contract, how to count the days, and how final pay, untaken holiday and pay in lieu of notice are
          worked out.
        </>
      }
      meta={["Great Britain and Northern Ireland", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            <strong>Your employer</strong>{" "}must give at least 1 week&rsquo;s notice after a month&rsquo;s service, and 1 week for each full year from 2 years, up to
            12 weeks.
          </li>
          <li>
            <strong>You</strong>{" "}must give at least 1 week&rsquo;s notice after a month&rsquo;s service.
          </li>
          <li>Your contract can ask for more notice, but not less. The longer one applies.</li>
          <li>Notice starts the day after it is given.</li>
          <li>
            Your final pay covers the days worked in your last pay period, untaken holiday and, if your employer ends your job early, pay in lieu of notice.
          </li>
        </ul>
        <p>These rules are the same across the UK. Your contract may be more generous, so check it as well.</p>
      </GuideSection>

      <GuideSection id="statutory-employer" n={2} kicker="Employer notice" title="Notice your employer must give">
        <p>
          The minimum notice an employer must give depends on how long you have worked there without a break. It applies to dismissals for any reason other than
          gross misconduct, including redundancy.
        </p>
        <DataTable
          caption="Statutory minimum notice from an employer"
          head={["Continuous service", "Minimum notice"]}
          rows={[
            ["Under 1 month", "None"],
            ["1 month to under 2 years", "1 week"],
            ["2 full years", "2 weeks"],
            ["3 to 11 full years", "1 week per full year"],
            ["12 years or more", "12 weeks"],
          ]}
        />
        <p>
          Only full years count. With 5 years and 11 months of service you are owed 5 weeks. The calculator counts your service from your start date to the date
          notice is given.
        </p>
      </GuideSection>

      <GuideSection id="statutory-employee" n={3} kicker="Your notice" title="Notice you must give">
        <p>
          If you resign, the legal minimum is 1 week once you have worked for a month. It does not grow with service. In practice most contracts set a longer
          period, often one month, and three months or more for senior roles.
        </p>
        <p>
          You must give the notice in your contract. If it says one month, you must give one month, even though the law only asks for a week. Give notice in
          writing, keep a copy and note the date.
        </p>
      </GuideSection>

      <GuideSection id="contract" n={4} kicker="The rule" title="Contract notice and the longer rule">
        <p>
          Your contract and the law both set a notice period. The <strong>longer</strong> one applies. A contract cannot give you less than the statutory minimum: any
          clause that tries to is overridden.
        </p>
        <CompareCards
          columns={[
            {
              name: "Statutory wins",
              rows: [
                { label: "Service", value: "6 full years" },
                { label: "Contract notice", value: "1 month" },
                { label: "Statutory notice", value: "6 weeks" },
                { label: "Notice that applies", value: "6 weeks" },
              ],
            },
            {
              name: "Contract wins",
              rows: [
                { label: "Service", value: "2 full years" },
                { label: "Contract notice", value: "3 months" },
                { label: "Statutory notice", value: "2 weeks" },
                { label: "Notice that applies", value: "3 months" },
              ],
            },
          ]}
        />
        <p>
          If your contract says nothing, you are entitled to &quot;reasonable notice&quot;, which can be longer than the statutory minimum for senior staff. The
          calculator uses the statutory minimum in that case.
        </p>
      </GuideSection>

      <GuideSection id="counting" n={5} kicker="Counting" title="Counting the days">
        <p>
          A notice period starts on the day <strong>after</strong>{" "}notice is given. A week&rsquo;s notice given on a Friday runs from Saturday and ends at the end of
          the following Friday. Six weeks&rsquo; notice given on Friday 30 October 2026 ends on Friday 11 December 2026.
        </p>
        <p>
          Notice given by letter or email takes effect when you receive it and have had a chance to read it, not when it was sent. If you are on holiday when a
          letter arrives, notice may start when you get back. For important dates, give and ask for notice in a way that leaves a clear record.
        </p>
        <p>
          Weekends and bank holidays count as part of the notice period: notice runs in calendar time, not working days. Our{" "}
          <a href="/uk/life/days-between-dates">days between dates calculator</a>{" "}is handy for checking long periods.
        </p>
      </GuideSection>

      <GuideSection id="months" n={6} kicker="Months" title="Notice in months">
        <p>
          A month&rsquo;s notice ends on the same date in the following month. Notice given on 30 October ends on 30 November. If the next month is shorter, it ends
          on the last day of that month: one month from 31 January 2026 is 28 February 2026.
        </p>
        <p>
          A month is not the same as four weeks. One month is about 4.3 weeks, so three months is about 13 weeks. That is why a contract of three months beats the
          12-week statutory maximum.
        </p>
      </GuideSection>

      <GuideSection id="last-day" n={7} kicker="Dates" title="Last working day vs leaving date">
        <p>Three dates matter, and they are not always the same:</p>
        <ul>
          <li><strong>The end of the notice period:</strong> when notice runs out.</li>
          <li>
            <strong>Your leaving date</strong> (the &quot;effective date of termination&quot;): when your employment legally ends. It is the end of notice, unless
            you are paid in lieu, when it is the day notice is given.
          </li>
          <li>
            <strong>Your last working day:</strong> the last day you actually work. If notice ends on a Saturday, Sunday or bank holiday, it is the working day
            before. On garden leave it is the day you were sent home.
          </li>
        </ul>
        <p>
          The calculator uses the bank holidays for England and Wales, Scotland or Northern Ireland, which differ. For example, St Andrew&rsquo;s Day is a bank
          holiday in Scotland only. See our <a href="/uk/life/bank-holidays">bank holidays page</a>{" "}for the full list.
        </p>
      </GuideSection>

      <GuideSection id="example-dismissal" n={8} kicker="Example" title="Example: notice from an employer">
        <p>
          Sam started on 15 January 2020 and is given notice on Friday 30 October 2026. Their contract says one month. They earn £36,000, work five days a week, have
          a holiday year starting on 1 January with 28 days, and have taken 15 days.
        </p>
        <WorkedExample
          title="Sam: 6 full years, 1 month in the contract"
          steps={[
            { label: "Statutory notice", note: "6 full years", value: "6 weeks, to 11 Dec 2026" },
            { label: "Contract notice", note: "1 month", value: "To 30 Nov 2026" },
            { label: "Salary for December", note: "9 of 23 paid working days × £3,000", value: "£1,173.91" },
            { label: "Untaken holiday", note: "26.5 days built up − 15 taken = 11.5 days × £138.46", value: "£1,587.57" },
          ]}
          total={{ label: "Final pay before tax", value: "£2,761.48" }}
        />
        <p>
          The statutory 6 weeks is longer than one month, so Sam&rsquo;s notice ends on Friday 11 December 2026. Using calendar days instead (11 of 31 days in
          December), the salary part would be £1,064.52 and the total £2,652.08.
        </p>
      </GuideSection>

      <GuideSection id="example-resign" n={9} kicker="Example" title="Example: resigning">
        <p>
          Priya started on 1 January 2025, has nothing about notice in her contract and resigns on Saturday 31 October 2026. She must give the statutory 1 week, which
          ends on Saturday 7 November. Her last working day is Friday 6 November.
        </p>
        <WorkedExample
          title="Priya: £30,000, 1 week’s notice"
          steps={[
            { label: "Salary for November", note: "5 of 21 working days × £2,500", value: "£595.24" },
            { label: "Untaken holiday", note: "23.9 days built up − 20 taken = 3.9 days × £115.38", value: "£445.10" },
          ]}
          total={{ label: "Final pay before tax", value: "£1,040.34" }}
        />
      </GuideSection>

      <GuideSection id="final-pay" n={10} kicker="Final pay" title="What goes in your final pay">
        <p>Your last payslip should include:</p>
        <ul>
          <li>salary or wages for the days worked in the last pay period;</li>
          <li>pay for any holiday built up and not taken;</li>
          <li>pay in lieu of notice, if your job ended without you working your notice;</li>
          <li>overtime, commission and bonuses you have earned under your contract;</li>
          <li>statutory payments such as Statutory Sick Pay or maternity pay still due.</li>
        </ul>
        <p>
          It is usually paid on your normal payday. If you are made redundant, redundancy pay is added; our{" "}
          <a href="/uk/tax-and-salary/redundancy">redundancy pay calculator</a>{" "}works out that part and the tax on it.
        </p>
      </GuideSection>

      <GuideSection id="part-month" n={11} kicker="Part months" title="Pay for part of a month">
        <p>
          If you leave part way through a month, your employer pays a share of the monthly salary. There is no single legal method, so contracts and payroll
          systems differ:
        </p>
        <DataTable
          caption="Common ways to pay part of a month"
          head={["Method", "How it works"]}
          rows={[
            ["Working days in the month", "Monthly pay × working days paid ÷ working days in that month"],
            ["Calendar days in the month", "Monthly pay × calendar days paid ÷ days in that month"],
            ["Yearly working days", "Yearly pay ÷ 260 × working days paid"],
            ["Yearly calendar days", "Yearly pay ÷ 365 × calendar days paid"],
          ]}
        />
        <p>
          The methods can differ by a hundred pounds or more on a month&rsquo;s pay, as Sam&rsquo;s example shows. Check your contract or staff handbook, and ask
          payroll which method it uses if the figure looks wrong.
        </p>
      </GuideSection>

      <GuideSection id="holiday" n={12} kicker="Holiday" title="Untaken holiday">
        <p>
          Holiday builds up through the holiday year. When you leave, you are paid for statutory holiday built up but not taken. The usual sum is your yearly
          entitlement × the share of the holiday year you worked, minus the days you have taken.
        </p>
        <p>
          The statutory entitlement is 5.6 weeks: 28 days for a five-day week, including bank holidays if your employer counts them. Part-time staff get 5.6 times
          their working week. Use our <a href="/uk/tax-and-salary/holiday-entitlement">holiday entitlement calculator</a>{" "}for other patterns, or the{" "}
          <a href="/uk/tax-and-salary/holiday-pay-irregular-hours">irregular hours holiday pay calculator</a>{" "}if your hours vary.
        </p>
        <Callout title="Your employer can ask you to use it">
          Your employer can tell you to take holiday during your notice, as long as it gives notice at least twice as long as the holiday. If you are on garden leave,
          you may be told to take holiday then.
        </Callout>
      </GuideSection>

      <GuideSection id="pilon" n={13} kicker="PILON" title="Pay in lieu of notice">
        <p>
          With pay in lieu of notice (PILON), your employer ends your job on the day and pays you for the notice period instead. Your leaving date is the day notice is
          given.
        </p>
        <WorkedExample
          title="Alex: £52,000, 3 months’ notice paid in lieu"
          steps={[
            { label: "Salary for October", note: "Full month to 30 October", value: "£4,333.33" },
            { label: "Untaken holiday", note: "6.3 days × £200", value: "£1,267.95" },
            { label: "Pay in lieu of notice", note: "3 months × £4,333.33", value: "£13,000.00" },
          ]}
          total={{ label: "Final pay before tax", value: "£18,601.28" }}
        />
        <p>
          PILON is taxed as normal pay, with National Insurance. Since April 2018 that has applied to all the basic pay for unworked notice, even if your contract does
          not mention PILON. Holiday stops building up on the day your job ends, so Alex is paid for holiday up to 30 October only.
        </p>
      </GuideSection>

      <GuideSection id="garden-leave" n={14} kicker="Garden leave" title="Garden leave">
        <p>
          On garden leave you are told not to come to work, but you stay employed until your notice ends. You are paid as normal and keep your benefits, such as
          pension contributions and a company car.
        </p>
        <CompareCards
          columns={[
            {
              name: "Garden leave",
              rows: [
                { label: "Still employed", value: "Yes, to the end of notice" },
                { label: "Pay", value: "Normal salary each month" },
                { label: "Holiday builds up", value: "Yes" },
                { label: "Can start a new job", value: "Not until notice ends" },
              ],
            },
            {
              name: "Pay in lieu",
              rows: [
                { label: "Still employed", value: "No, ends on the day" },
                { label: "Pay", value: "Lump sum in final pay" },
                { label: "Holiday builds up", value: "No" },
                { label: "Can start a new job", value: "Straight away" },
              ],
            },
          ]}
        />
        <p>
          Jo, on £42,000, resigns on 30 October with one month&rsquo;s notice and is put on garden leave. Her employment ends on 30 November. Her November pay is the
          full £3,500, plus £1,731.34 for 10.7 days of holiday not taken, giving £5,231.34 before tax.
        </p>
      </GuideSection>

      <GuideSection id="deductions" n={15} kicker="Deductions" title="Deductions from final pay">
        <p>
          Your employer can only take money from your final pay if the law allows it (tax, National Insurance, student loan, a court order), your contract allows it,
          or you have agreed in writing in advance. Common examples:
        </p>
        <ul>
          <li>holiday taken but not yet built up;</li>
          <li>a season ticket loan, training costs or a salary advance;</li>
          <li>an earlier overpayment of wages.</li>
        </ul>
        <Callout tone="warn" title="Training cost clauses">
          Clauses that make you repay training costs if you leave must be clear and reasonable. A deduction cannot take you below the National Minimum Wage for the
          hours in that pay period, except for some recovery of earlier overpayments.
        </Callout>
      </GuideSection>

      <GuideSection id="tax" n={16} kicker="Tax" title="Tax, your P45 and code 0T">
        <p>
          Final pay, holiday pay and PILON are taxed through payroll in the normal way. Your employer then gives you a{" "}
          <a href="/uk/tax-and-salary/p45-p60-explainer">P45</a>, which your next employer uses to carry on your tax code.
        </p>
        <p>
          If something is paid after the P45 has been issued, payroll must use tax code 0T for that payment. That gives no tax-free allowance, so it can take too
          much tax for now. It is put right through your next job or a refund from HMRC.
        </p>
      </GuideSection>

      <GuideSection id="notice-pay-rate" n={17} kicker="Pay rules" title="Pay during notice">
        <p>
          While you work your notice you are paid as normal. If you are off sick or on holiday during the statutory notice period, special rules can protect your
          pay: if your contract notice is less than a week longer than the statutory minimum, you must normally be paid your usual pay during the statutory notice even when off sick.
          Acas can explain how this applies to you.
        </p>
      </GuideSection>

      <GuideSection id="leaving-early" n={18} kicker="Changes" title="Leaving early or extending">
        <Timeline
          items={[
            { when: "You want to go sooner", what: "Ask to shorten your notice", detail: "Many employers agree. Get the new leaving date in writing." },
            { when: "Employer wants you sooner", what: "PILON or garden leave", detail: "Your employer can end your job early by paying in lieu, or keep you at home." },
            { when: "You change your mind", what: "Ask to withdraw notice", detail: "Your employer does not have to agree once notice is given." },
            { when: "New job offer", what: "Check the start date", detail: "Starting before your notice ends could breach your contract." },
          ]}
        />
      </GuideSection>

      <GuideSection id="problems" n={19} kicker="Problems" title="If final pay is wrong">
        <p>
          Start by asking payroll for a breakdown. If it is still wrong, raise a written grievance or complaint. If that fails, contact Acas for early conciliation,
          which you must do before an employment tribunal claim. Claims for unpaid wages and holiday pay must usually start within three months less one day of the
          payment that was missed.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "1 week", label: "Minimum notice you must give after a month’s service" },
            { value: "1 week a year", label: "Minimum notice from an employer, from 2 years of service" },
            { value: "12 weeks", label: "Most statutory notice from an employer" },
            { value: "The day after", label: "When a notice period starts" },
            { value: "5.6 weeks", label: "Statutory holiday a year (28 days for a 5-day week)" },
            { value: "0T", label: "Tax code for payments made after your P45" },
            { value: "3 months less 1 day", label: "Usual time limit for unpaid wages claims" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

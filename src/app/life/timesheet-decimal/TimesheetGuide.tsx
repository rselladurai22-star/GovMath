import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Timesheets and decimal hours — the guide. Figures from src/lib/life/everyday.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "decimal", title: "Converting minutes to decimal hours" },
  { id: "table", title: "Conversion table" },
  { id: "week", title: "Working out a weekly total" },
  { id: "overnight", title: "Night shifts" },
  { id: "breaks", title: "Breaks and the law" },
  { id: "overtime", title: "Overtime" },
  { id: "pay", title: "From hours to pay" },
  { id: "rounding", title: "Rounding and clocking in" },
  { id: "limits", title: "Working time limits" },
  { id: "records", title: "Keeping records" },
  { id: "annualised", title: "Annualised and variable hours" },
  { id: "holiday", title: "Holiday pay for irregular hours" },
  { id: "self-employed", title: "Timesheets for the self-employed" },
  { id: "spreadsheet", title: "Timesheets in a spreadsheet" },
  { id: "zero-hours", title: "Zero-hours and agency work" },
  { id: "checks", title: "Checking your payslip" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Rest breaks at work", href: "https://www.gov.uk/rest-breaks-work" },
  { label: "GOV.UK — Maximum weekly working hours", href: "https://www.gov.uk/maximum-weekly-working-hours" },
  { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "GOV.UK — Overtime: your rights", href: "https://www.gov.uk/overtime-your-rights" },
  { label: "Acas — Working hours", href: "https://www.acas.org.uk/working-hours" },
];

export default function TimesheetGuide() {
  return (
    <Guide
      kicker="The timesheet guide"
      title="Timesheets and decimal hours"
      intro={
        <>
          Payroll systems work in decimal hours, but clocks show hours and minutes. Seven hours forty minutes is 7.67 hours, not 7.40. This guide
          shows how to convert times, total a week, handle breaks, night shifts and overtime, and check your pay against the minimum wage.
        </>
      }
      meta={["2026/27 rates", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Divide the minutes by 60 to get the decimal part: 45 minutes is 0.75 hours.</li>
          <li>Take unpaid breaks off each day before adding up the week.</li>
          <li>A finish time earlier than the start time means the shift ran past midnight.</li>
          <li>Multiply decimal hours by the hourly rate to get gross pay.</li>
        </ul>
        <KeyStats
          items={[
            { value: "0.25", label: "15 minutes" },
            { value: "0.5", label: "30 minutes" },
            { value: "0.75", label: "45 minutes" },
            { value: "£12.71", label: "National Living Wage an hour" },
          ]}
        />
      </GuideSection>

      <GuideSection id="decimal" n={2} kicker="The method" title="Converting minutes to decimal hours">
        <WorkedExample
          title="A shift from 07:45 to 16:10 with a 45-minute unpaid break"
          steps={[
            { label: "Time from start to finish", value: "8 hours 25 minutes" },
            { label: "Less the break", value: "7 hours 40 minutes" },
            { label: "40 minutes ÷ 60", value: "0.67" },
          ]}
          total={{ label: "Decimal hours", value: "7.67" }}
        />
        <Callout tone="warn" title="7:40 is not 7.40">
          Writing 7 hours 40 minutes as 7.40 underpays by 16 minutes. Going the other way, 7.6 hours is 7 hours 36 minutes.
        </Callout>
      </GuideSection>

      <GuideSection id="table" n={3} kicker="Reference" title="Conversion table">
        <DataTable
          caption="Minutes to decimal hours"
          head={["Minutes", "Decimal", "Minutes", "Decimal"]}
          rows={[
            ["5", "0.083", "35", "0.583"],
            ["10", "0.167", "40", "0.667"],
            ["15", "0.25", "45", "0.75"],
            ["20", "0.333", "50", "0.833"],
            ["25", "0.417", "55", "0.917"],
            ["30", "0.5", "60", "1"],
          ]}
        />
      </GuideSection>

      <GuideSection id="week" n={4} kicker="Totals" title="Working out a weekly total">
        <WorkedExample
          title="Monday to Thursday 09:00 to 17:30, Friday 09:00 to 16:00, 30-minute breaks"
          steps={[
            { label: "Monday to Thursday: 8 hours a day", value: "32.0" },
            { label: "Friday", value: "6.5" },
            { label: "Total in hours and minutes", value: "38:30" },
          ]}
          total={{ label: "Decimal hours", value: "38.5" }}
        />
        <p>At the National Living Wage of £12.71 an hour, 38.5 hours is £489.34 before tax.</p>
      </GuideSection>

      <GuideSection id="overnight" n={5} kicker="Shift work" title="Night shifts">
        <p>
          If a shift runs past midnight, add 24 hours to the finish time before subtracting. A shift from 22:00 to 06:30 with a 30-minute break is 8
          hours. The calculator does this automatically when the finish time is earlier than the start time.
        </p>
        <p>Night workers have extra protections, including a limit of 8 hours in 24 on average and free health assessments.</p>
      </GuideSection>

      <GuideSection id="breaks" n={6} kicker="Rights" title="Breaks and the law">
        <CompareCards
          columns={[
            {
              name: "Adults (18 and over)",
              rows: [
                { label: "During the day", value: "20 minutes if working more than 6 hours" },
                { label: "Between shifts", value: "11 hours" },
                { label: "Weekly", value: "24 hours a week, or 48 a fortnight" },
              ],
            },
            {
              name: "Young workers (under 18)",
              rows: [
                { label: "During the day", value: "30 minutes if working more than 4.5 hours" },
                { label: "Between shifts", value: "12 hours" },
                { label: "Weekly", value: "48 hours" },
              ],
            },
          ]}
        />
        <p>Breaks do not have to be paid unless your contract says so. Enter only unpaid breaks in the calculator.</p>
      </GuideSection>

      <GuideSection id="overtime" n={7} kicker="Extra hours" title="Overtime">
        <p>
          There is no legal right to extra pay for overtime. Your contract sets whether overtime is paid, at what rate, and after how many hours. Your
          average pay for all hours worked must not fall below the minimum wage.
        </p>
        <WorkedExample
          title="38.5 hours plus a 6-hour Saturday, overtime after 40 hours at time and a half, £12.71 an hour"
          steps={[
            { label: "Total hours", value: "44.5" },
            { label: "40 hours at £12.71", value: "£508.40" },
            { label: "4.5 hours at £19.07", value: "£85.79" },
          ]}
          total={{ label: "Gross pay", value: "£594.19" }}
        />
      </GuideSection>

      <GuideSection id="pay" n={8} kicker="Money" title="From hours to pay">
        <p>
          Gross pay is decimal hours times the hourly rate, plus any overtime premium. Tax and National Insurance come off afterwards. The{" "}
          <a href="/tax-and-salary/salary-calculator">salary calculator</a> shows take-home pay, and the{" "}
          <a href="/tax-and-salary/minimum-wage">minimum wage checker</a> confirms the legal minimum for your age.
        </p>
      </GuideSection>

      <GuideSection id="rounding" n={9} kicker="Fairness" title="Rounding and clocking in">
        <p>
          Some employers round clock-in times to the nearest 5 or 15 minutes. Rounding must not leave workers paid below the minimum wage for the
          time they actually work. Time spent on required tasks such as security checks, putting on uniform or compulsory training usually counts as
          working time.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={10} kicker="Hours" title="Working time limits">
        <p>
          Most workers cannot be made to work more than 48 hours a week on average, normally over 17 weeks, unless they opt out in writing. Workers
          under 18 cannot work more than 8 hours a day or 40 hours a week. Some jobs, such as the armed forces and some transport roles, have
          different rules.
        </p>
      </GuideSection>

      <GuideSection id="records" n={11} kicker="Paperwork" title="Keeping records">
        <p>
          Keep your own record of start, finish and break times. If your pay looks wrong, your record helps you raise it with your employer, and
          employers must keep records showing they pay at least the minimum wage, usually for 6 years.
        </p>
      </GuideSection>

      <GuideSection id="annualised" n={12} kicker="Contracts" title="Annualised and variable hours">
        <p>
          Some contracts set hours over a year rather than a week, such as 1,950 hours a year, which is 37.5 hours a week on average. Busy weeks are
          balanced by quieter ones. Keeping weekly totals in decimal hours makes it easy to track how many hours you have left to work.
        </p>
      </GuideSection>

      <GuideSection id="holiday" n={13} kicker="Leave" title="Holiday pay for irregular hours">
        <p>
          Since April 2024, irregular-hours and part-year workers in Great Britain build up holiday at 12.07% of the hours they work in each pay
          period. If you work 38.5 hours in a week, that adds about 4.65 hours of holiday. Employers can also pay this as rolled-up holiday pay of
          12.07% on top of each payment, shown separately on the payslip.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={14} kicker="Freelancers" title="Timesheets for the self-employed">
        <p>
          Freelancers who bill by the hour should record time in decimal hours to invoice accurately. Many round to the nearest 6 or 15 minutes, as
          set out in their terms. At £45 an hour, 2 hours 20 minutes is 2.33 hours, or £105.
        </p>
      </GuideSection>

      <GuideSection id="spreadsheet" n={15} kicker="Tools" title="Timesheets in a spreadsheet">
        <p>
          In Excel or Google Sheets, enter times as 09:00 and 17:30. Subtract the start from the finish, take off the break, and multiply by 24 to turn
          the result into decimal hours. For night shifts use =MOD(finish-start,1)*24 so the result is not negative.
        </p>
        <DataTable
          caption="Spreadsheet formulas"
          head={["Task", "Formula"]}
          rows={[
            ["Hours in a day shift", "=(C2-B2)*24-D2/60"],
            ["Hours in a night shift", "=MOD(C2-B2,1)*24-D2/60"],
            ["Decimal to hours and minutes", "=E2/24, formatted as [h]:mm"],
          ]}
        />
      </GuideSection>

      <GuideSection id="zero-hours" n={16} kicker="Flexible work" title="Zero-hours and agency work">
        <p>
          If you work variable shifts, keep a record of every shift, including time spent waiting on site at your employer&rsquo;s request, which can
          count as working time. Agency workers are entitled to the same basic pay and conditions as permanent staff after 12 weeks in the same
          role.
        </p>
      </GuideSection>

      <GuideSection id="checks" n={17} kicker="Pay" title="Checking your payslip">
        <CompareCards
          columns={[
            {
              name: "Check",
              rows: [
                { label: "Hours", value: "Match your own record in decimal hours" },
                { label: "Rate", value: "At least the minimum wage for your age" },
                { label: "Overtime", value: "Paid at the contract rate" },
              ],
            },
            {
              name: "If something is wrong",
              rows: [
                { label: "First", value: "Raise it with your manager or payroll" },
                { label: "Next", value: "Use the grievance procedure" },
                { label: "Minimum wage", value: "Report underpayment to HMRC" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="questions" n={18} kicker="FAQs" title="Common questions">
        <h3>How do I convert 7 hours 20 minutes to decimal?</h3>
        <p>20 ÷ 60 = 0.33, so it is 7.33 hours.</p>
        <h3>How do I convert decimal hours back to minutes?</h3>
        <p>Multiply the decimal part by 60. 0.6 hours is 36 minutes.</p>
        <h3>Is a 30-minute lunch break paid?</h3>
        <p>Only if your contract says so. The legal minimum break does not have to be paid.</p>
        <h3>How many hours is 9 to 5 with a lunch break?</h3>
        <p>8 hours less a 30-minute unpaid lunch is 7.5 hours, or 37.5 hours over five days.</p>
        <h3>What is 37.5 hours in hours and minutes?</h3>
        <p>37 hours 30 minutes, written 37:30.</p>
        <h3>Does travel time count as working hours?</h3>
        <p>
          Normal travel between home and a fixed workplace does not. Travel between jobs during the day, or to customers for workers without a fixed
          workplace, usually does.
        </p>
        <h3>Can my employer deduct time for being late?</h3>
        <p>
          They can avoid paying for time not worked, but deductions from wages must be allowed by your contract and cannot take your pay below the
          minimum wage.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "÷ 60", label: "Minutes to decimal" },
            { value: "× 60", label: "Decimal to minutes" },
            { value: "20 mins", label: "Break after 6 hours" },
            { value: "11 hours", label: "Rest between shifts" },
            { value: "48 hours", label: "Average weekly limit" },
            { value: "£12.71", label: "National Living Wage, 21 and over" },
            { value: "38.5", label: "Hours in a typical full-time week" },
            { value: "6 years", label: "Pay records kept" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

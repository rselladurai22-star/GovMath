import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Date calculator — the guide. Every figure comes from src/lib/life/dates.ts and calendar.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "day-zero", title: "Does the start date count?" },
  { id: "days-weeks", title: "Adding days and weeks" },
  { id: "months", title: "Adding months" },
  { id: "month-ends", title: "Month ends and 31st dates" },
  { id: "years", title: "Adding years and leap years" },
  { id: "mixed", title: "Mixing years, months and days" },
  { id: "subtract", title: "Counting back from a date" },
  { id: "working-days", title: "Working days" },
  { id: "bank-holidays", title: "UK bank holidays by nation" },
  { id: "christmas", title: "Working days around Christmas and Easter" },
  { id: "other-countries", title: "Working days outside the UK" },
  { id: "deadlines", title: "Deadlines and notice periods" },
  { id: "repeating", title: "Repeating dates and schedules" },
  { id: "week-numbers", title: "Week numbers and day of the year" },
  { id: "formats", title: "Writing dates clearly" },
  { id: "spreadsheet", title: "Date sums in a spreadsheet" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "related", title: "Related date tools" },
  { id: "contracts", title: "Probation, trial and contract periods" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — UK bank holidays", href: "https://www.gov.uk/bank-holidays" },
  { label: "GOV.UK — Handing in your notice", href: "https://www.gov.uk/handing-in-your-notice" },
  { label: "Royal Museums Greenwich — Which years are leap years?", href: "https://www.rmg.co.uk/stories/time/which-years-are-leap-years-can-you-have-leap-seconds" },
  { label: "ISO — ISO 8601 date and time format", href: "https://www.iso.org/iso-8601-date-and-time-format.html" },
];

export default function DateCalcGuide() {
  return (
    <Guide
      kicker="The date guide"
      title="How to add and subtract days, months and working days"
      intro={
        <>
          Working out a date a set time from now sounds easy, but month lengths, leap years, weekends and bank holidays all get in the way. This guide explains how each
          kind of date sum works, with examples, so you can trust the answer for deadlines, notice periods, deliveries and plans.
        </>
      }
      meta={["Worked examples", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The start date is day 0, so 1 day after Monday is Tuesday.</li>
          <li>Days and weeks are exact: a week is always 7 days.</li>
          <li>Months follow the calendar, and a date that does not exist (such as 31 February) becomes the month&rsquo;s last day.</li>
          <li>Working days skip Saturdays, Sundays and, in the UK, the bank holidays of the nation you choose.</li>
        </ul>
        <KeyStats
          items={[
            { value: "9 Jan 2027", label: "90 days after 11 October 2026" },
            { value: "28 Feb 2027", label: "6 months after 31 August 2026" },
            { value: "6 Nov 2026", label: "20 working days after 11 October 2026" },
            { value: "3 Jul 2026", label: "100 days before 11 October 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="day-zero" n={2} kicker="Counting" title="Does the start date count?">
        <p>
          The calculator treats the start date as day 0. Adding 1 day to Monday gives Tuesday, and adding 7 days gives the next Monday. This matches how most deadlines
          are written: &ldquo;within 14 days of 1 March&rdquo; usually means by 15 March.
        </p>
        <Callout title="Check the wording">
          Some rules count the first day, or say &ldquo;clear days&rdquo;, which leave out both the first and the last day. If a deadline is important, read the exact words
          and, if in doubt, aim for the earlier date.
        </Callout>
      </GuideSection>

      <GuideSection id="days-weeks" n={3} kicker="Days and weeks" title="Adding days and weeks">
        <p>Days and weeks are the simplest sums, because every day and every week is the same length. A few examples from 11 October 2026:</p>
        <DataTable
          caption="Counting forward from Sunday 11 October 2026"
          head={["Add", "Date", "Day"]}
          rows={[
            ["6 weeks", "22 November 2026", "Sunday"],
            ["90 days", "9 January 2027", "Saturday"],
            ["13 weeks", "10 January 2027", "Sunday"],
            ["1,000 days", "7 July 2029", "Saturday"],
          ]}
        />
        <p>Adding whole weeks always lands on the same weekday as the start date, which is handy for repeating meetings or shifts.</p>
      </GuideSection>

      <GuideSection id="months" n={4} kicker="Months" title="Adding months">
        <p>
          A month is not a fixed number of days, so months are added by the calendar: the same day number, a set number of months later. 3 months after 11 October 2026
          is 11 January 2027. That is 92 days, while 3 months from another start could be 89 to 92 days.
        </p>
        <CompareCards
          columns={[
            {
              name: "3 months",
              rows: [
                { label: "From", value: "11 October 2026" },
                { label: "To", value: "11 January 2027" },
                { label: "Rule", value: "Same day, 3 months on" },
              ],
            },
            {
              name: "13 weeks",
              rows: [
                { label: "From", value: "11 October 2026" },
                { label: "To", value: "10 January 2027" },
                { label: "Rule", value: "91 days exactly" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="month-ends" n={5} kicker="Month ends" title="Month ends and 31st dates">
        <p>
          If the start date is the 29th, 30th or 31st, the target month may be too short. The calculator then uses the last day of that month, which is the usual rule in
          contracts and bank payments.
        </p>
        <WorkedExample
          title="6 months after 31 August 2026"
          steps={[
            { label: "Count 6 months", note: "September to February", value: "February 2027" },
            { label: "31 February does not exist", note: "February 2027 has 28 days", value: "Use 28" },
          ]}
          total={{ label: "Result", value: "28 February 2027" }}
        />
        <p>Likewise, 1 month after 31 January 2026 is 28 February 2026, but 1 month after 31 January 2024 was 29 February 2024, a leap year.</p>
      </GuideSection>

      <GuideSection id="years" n={6} kicker="Years" title="Adding years and leap years">
        <p>
          Adding a year keeps the same day and month. The one exception is 29 February: a year after 29 February 2024 is 28 February 2025. Leap years come every 4 years,
          except century years that do not divide by 400, so 2000 was a leap year and 2100 will not be.
        </p>
      </GuideSection>

      <GuideSection id="mixed" n={7} kicker="Combined" title="Mixing years, months and days">
        <p>
          When you enter several units, the calculator adds the years and months first, then the weeks and days. Doing it in this order gives the answer people expect,
          and the step-by-step card shows each stage.
        </p>
        <WorkedExample
          title="1 year, 2 months, 1 week and 3 days before 11 October 2026"
          steps={[
            { label: "Take away 14 months", value: "11 August 2025" },
            { label: "Take away 10 days", note: "1 week and 3 days", value: "1 August 2025" },
          ]}
          total={{ label: "Result", value: "Friday 1 August 2025" }}
        />
      </GuideSection>

      <GuideSection id="subtract" n={8} kicker="Counting back" title="Counting back from a date">
        <p>
          Subtracting works the same way in reverse. It answers questions like &ldquo;when must I post this?&rdquo;, &ldquo;when did the 90-day period start?&rdquo; or
          &ldquo;when should I hand in my notice?&rdquo;. 100 days before 11 October 2026 is Friday 3 July 2026.
        </p>
      </GuideSection>

      <GuideSection id="working-days" n={9} kicker="Working days" title="Working days">
        <p>
          A working day (or business day) is normally Monday to Friday, not counting public holidays. Choose Working days in the calculator to count only these. The
          start date is day 0, and the next working day is day 1, so 1 working day after a Friday is the Monday.
        </p>
        <WorkedExample
          title="20 working days after Sunday 11 October 2026 (England and Wales)"
          steps={[
            { label: "Working days counted", value: "20" },
            { label: "Weekend days skipped", value: "6" },
            { label: "Bank holidays skipped", value: "0" },
          ]}
          total={{ label: "Result", value: "Friday 6 November 2026" }}
        />
        <p>That is 26 calendar days later. Over a typical month, working days are roughly 5 in every 7 calendar days.</p>
      </GuideSection>

      <GuideSection id="bank-holidays" n={10} kicker="UK" title="UK bank holidays by nation">
        <p>
          England and Wales, Scotland and Northern Ireland each have their own bank holidays. When a bank holiday falls on a weekend, a substitute day is usually given on
          the next weekday. The 2027 dates for England and Wales are:
        </p>
        <DataTable
          caption="Bank holidays in England and Wales, 2027"
          head={["Holiday", "Date"]}
          rows={[
            ["New Year's Day", "Friday 1 January"],
            ["Good Friday", "Friday 26 March"],
            ["Easter Monday", "Monday 29 March"],
            ["Early May bank holiday", "Monday 3 May"],
            ["Spring bank holiday", "Monday 31 May"],
            ["Summer bank holiday", "Monday 30 August"],
            ["Christmas Day (substitute day)", "Monday 27 December"],
            ["Boxing Day (substitute day)", "Tuesday 28 December"],
          ]}
        />
        <p>
          Scotland adds 2 January (a substitute day on 4 January in 2027) and St Andrew&rsquo;s Day, has its summer holiday on the first Monday of August, and does not
          have Easter Monday. Northern Ireland adds St Patrick&rsquo;s Day (17 March) and the Battle of the Boyne (12 July). The{" "}
          <a href="/uk/life/bank-holidays">bank holiday calculator</a>{" "}lists every date for each nation.
        </p>
      </GuideSection>

      <GuideSection id="christmas" n={11} kicker="Holidays" title="Working days around Christmas and Easter">
        <p>Holiday periods make the biggest difference to working-day sums. 10 working days after Thursday 17 December 2026 lands on:</p>
        <DataTable
          caption="10 working days after Thursday 17 December 2026"
          head={["Rule", "Result", "Holidays skipped"]}
          rows={[
            ["Weekends only", "Thursday 31 December 2026", "0"],
            ["England and Wales", "Tuesday 5 January 2027", "3"],
            ["Scotland", "Wednesday 6 January 2027", "4"],
          ]}
        />
        <p>
          At Easter, 5 working days after Wednesday 24 March 2027 is Friday 2 April 2027 in England and Wales, because Good Friday and Easter Monday are skipped. In
          Northern Ireland, 5 working days after Friday 12 March 2027 is Monday 22 March, one day later than elsewhere because of St Patrick&rsquo;s Day.
        </p>
      </GuideSection>

      <GuideSection id="other-countries" n={12} kicker="Other countries" title="Working days outside the UK">
        <p>
          The calculator knows UK bank holidays only. For other countries, choose &ldquo;None (weekends only)&rdquo; under More options, then add one working day for each
          public holiday in your country that falls within the period. In countries where the weekend is not Saturday and Sunday, count by hand or use calendar days.
        </p>
      </GuideSection>

      <GuideSection id="deadlines" n={13} kicker="Uses" title="Deadlines and notice periods">
        <p>Common uses for a date calculator include:</p>
        <ul>
          <li>
            <strong>Notice periods.</strong>{" "}A one-month notice period handed in on 15 March ends on 15 April. See the{" "}
            <a href="/uk/tax-and-salary/notice-period-final-pay">notice period and final pay calculator</a>{" "}for pay.
          </li>
          <li>
            <strong>Refunds and returns.</strong>{" "}In the UK, you usually have 14 days to cancel most online orders after the goods arrive.
          </li>
          <li>
            <strong>Delivery and payment terms.</strong>{" "}&ldquo;Payment within 30 days&rdquo; and &ldquo;delivery in 5 working days&rdquo; are both easy to check.
          </li>
          <li>
            <strong>Travel.</strong>{" "}Some countries require a passport to be valid for 3 or 6 months after you arrive.
          </li>
        </ul>
        <Callout tone="warn" title="Legal deadlines">
          Courts, tribunals and government bodies have their own counting rules. Use the calculator as a guide and check the rules for your case.
        </Callout>
      </GuideSection>

      <GuideSection id="repeating" n={14} kicker="Schedules" title="Repeating dates and schedules">
        <p>
          The &ldquo;Repeating the period&rdquo; table shows the next 8 dates at the same interval, such as every 28 days for a prescription or every 3 months for a bill.
          Each date is worked out from the start date, not from the one before, so a monthly schedule from 31 January goes 28 February, 31 March, 30 April rather than
          drifting to the 28th.
        </p>
      </GuideSection>

      <GuideSection id="week-numbers" n={15} kicker="Week numbers" title="Week numbers and day of the year">
        <p>
          The calculator shows the ISO week number and the day of the year for the result. ISO weeks start on Monday, and week 1 is the week that contains the
          year&rsquo;s first Thursday. Some years have 53 weeks: 2026 is one, so 31 December 2026 and 1 January 2027 are both in week 53. 11 October 2026 is in week 41
          and is day 284 of the year.
        </p>
      </GuideSection>

      <GuideSection id="formats" n={16} kicker="Formats" title="Writing dates clearly">
        <p>
          In the UK, 06/10/2026 means 6 October 2026, but in the US it means June 10. To avoid mistakes, write the month as a word (6 October 2026) or use the
          international format, 2026-10-06, which also sorts correctly in spreadsheets and file names.
        </p>
      </GuideSection>

      <GuideSection id="spreadsheet" n={17} kicker="Tools" title="Date sums in a spreadsheet">
        <p>
          In Excel or Google Sheets, =A1+90 adds 90 days to a date in A1, =EDATE(A1, 3) adds 3 months with the month-end rule, and =WORKDAY(A1, 10, holidays) adds 10
          working days, skipping dates listed in a holidays range. =NETWORKDAYS(A1, B1, holidays) counts working days between two dates, including both ends.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Counting the start date as day 1, which makes every answer a day early.</li>
          <li>Treating a month as 30 days, which drifts by a day or two each month.</li>
          <li>Forgetting a bank holiday, especially substitute days after Christmas and New Year.</li>
          <li>Using England&rsquo;s bank holidays for Scotland or Northern Ireland.</li>
          <li>Mixing up UK and US date order.</li>
        </ul>
      </GuideSection>

      <GuideSection id="related" n={19} kicker="More tools" title="Related date tools">
        <ul>
          <li>
            <a href="/uk/life/days-between-dates">Days between dates</a>: count calendar and working days between two dates.
          </li>
          <li>
            <a href="/everyday/age-calculator">Age calculator</a>: exact age in years, months and days.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="contracts" n={20} kicker="Work and contracts" title="Probation, trial and contract periods">
        <p>
          Many work and contract periods are written in months or weeks, and the start date decides where they end. A few examples, each counted with the start date as
          day 0:
        </p>
        <DataTable
          caption="Example periods"
          head={["Period", "Starts", "Ends"]}
          rows={[
            ["6-month probation", "1 September 2026", "1 March 2027"],
            ["3 months' notice", "31 October 2026", "31 January 2027"],
            ["12-week contract", "1 October 2026", "24 December 2026"],
          ]}
        />
        <p>
          Some contracts end on the day before the matching date (for example, a year from 1 September ending on 31 August). If yours is written that way, take one
          day off the result. Your contract or offer letter says which applies.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "Day 0", label: "The start date" },
            { value: "28 to 31", label: "Days in a month" },
            { value: "8", label: "Bank holidays in England and Wales, 2027" },
            { value: "9", label: "In Scotland, 2027" },
            { value: "10", label: "In Northern Ireland, 2027" },
            { value: "52 or 53", label: "ISO weeks in a year" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

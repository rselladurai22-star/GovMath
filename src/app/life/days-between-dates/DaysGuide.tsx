import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Days between dates — the guide. Figures from src/lib/life/calendar.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "inclusive", title: "Counting the end date or not" },
  { id: "examples", title: "Worked examples" },
  { id: "months", title: "Why months are tricky" },
  { id: "working", title: "Working days" },
  { id: "adding", title: "Adding days to a date" },
  { id: "leap", title: "Leap years" },
  { id: "uses", title: "Everyday uses" },
  { id: "legal", title: "Legal and official deadlines" },
  { id: "age", title: "Working out an age" },
  { id: "spreadsheets", title: "Doing it in a spreadsheet" },
  { id: "nights", title: "Nights, days and stays" },
  { id: "interest", title: "Day counts for interest" },
  { id: "clocks", title: "Clock changes and time zones" },
  { id: "pregnancy", title: "Pregnancy and baby dates" },
  { id: "school", title: "School and term dates" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — UK bank holidays", href: "https://www.gov.uk/bank-holidays" },
  { label: "GOV.UK — Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK — Statutory notice periods", href: "https://www.gov.uk/handing-in-your-notice" },
  { label: "GOV.UK — Employment tribunal time limits", href: "https://www.gov.uk/employment-tribunals" },
];

export default function DaysGuide() {
  return (
    <Guide
      kicker="The date calculator guide"
      title="How to count the days between two dates"
      intro={
        <>
          Counting days sounds simple until you hit questions like whether to include the end date, how long a month is, or which days are working
          days. This guide explains the conventions, shows worked examples with bank holidays, and covers adding days to a date for deadlines.
        </>
      }
      meta={["Updated for 2026 and 2027", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Most date differences leave out the end date: Monday to Wednesday is 2 days.</li>
          <li>Counting both dates adds one day, which suits holidays and some contracts.</li>
          <li>Working days leave out weekends and bank holidays, which differ between the UK nations.</li>
          <li>Months vary from 28 to 31 days, so &ldquo;months and days&rdquo; answers are counted on the calendar, not by dividing by 30.</li>
        </ul>
        <KeyStats
          items={[
            { value: "365", label: "Days in 2026 and 2027" },
            { value: "253", label: "Working days in 2027, England and Wales" },
            { value: "52 weeks 1 day", label: "A normal year" },
            { value: "2028", label: "Next leap year" },
          ]}
        />
      </GuideSection>

      <GuideSection id="inclusive" n={2} kicker="Conventions" title="Counting the end date or not">
        <CompareCards
          columns={[
            {
              name: "End date excluded (default)",
              rows: [
                { label: "Monday to Wednesday", value: "2 days" },
                { label: "Used for", value: "Ages, durations, countdowns, nights in a hotel" },
              ],
            },
            {
              name: "End date included",
              rows: [
                { label: "Monday to Wednesday", value: "3 days" },
                { label: "Used for", value: "Days of an event, leave booked, some contracts" },
              ],
            },
          ]}
        />
        <p>
          A whole calendar year counted with both dates included, 1 January to 31 December, is 365 days. Without the end date it is 364. Always check
          which convention your situation needs.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={3} kicker="Real numbers" title="Worked examples">
        <DataTable
          caption="Days between dates, England and Wales"
          head={["From", "To", "Days", "Working days"]}
          numeric={[2, 3]}
          rows={[
            ["4 Oct 2026", "25 Dec 2026", "82", "59"],
            ["31 Jan 2026", "15 Mar 2026", "43", "30"],
            ["21 Dec 2026", "4 Jan 2027", "14", "7"],
            ["1 Jan 2027", "31 Dec 2027 (inclusive)", "365", "253"],
          ]}
        />
        <WorkedExample
          title="4 October to 25 December 2026"
          steps={[
            { label: "Days", value: "82" },
            { label: "Weeks and days", value: "11 weeks, 5 days" },
            { label: "Months and days", value: "2 months, 21 days" },
            { label: "Weekend days", value: "23" },
          ]}
          total={{ label: "Working days", value: "59" }}
        />
        <p>
          Over Christmas, from 21 December 2026 to 4 January 2027, there are 14 days but only 7 working days, because three bank holidays fall in the
          period: Christmas Day, the Boxing Day substitute on 28 December, and New Year&rsquo;s Day.
        </p>
      </GuideSection>

      <GuideSection id="months" n={4} kicker="Calendar maths" title="Why months are tricky">
        <p>
          Adding a month moves to the same day number in the next month, unless that month is shorter. From 31 January, one month later is 28
          February (29 in a leap year). So 31 January to 15 March 2026 is 1 month and 15 days, even though it is 43 days.
        </p>
        <Callout title="Monthly payments and notice">
          Banks and contracts usually treat a month as a calendar month. A notice period of one month given on 31 January normally ends on 28 or 29
          February, not 2 March.
        </Callout>
      </GuideSection>

      <GuideSection id="working" n={5} kicker="Business days" title="Working days">
        <p>
          Working days are Monday to Friday, less bank holidays. The calculator uses the bank holidays for England and Wales, Scotland or Northern
          Ireland. Some organisations also close between Christmas and New Year, or treat other days as non-working, so their count may differ.
        </p>
        <DataTable
          caption="Working days a year"
          head={["Nation", "2026", "2027"]}
          numeric={[1, 2]}
          rows={[
            ["England and Wales", "253", "253"],
            ["Scotland", "252", "252"],
            ["Northern Ireland", "251", "251"],
          ]}
        />
      </GuideSection>

      <GuideSection id="adding" n={6} kicker="Deadlines" title="Adding days to a date">
        <DataTable
          caption="Adding days, from 4 October 2026"
          head={["Add", "Result"]}
          rows={[
            ["30 days", "3 November 2026"],
            ["90 days", "2 January 2027"],
            ["10 working days", "16 October 2026"],
            ["1,000 days", "30 June 2029"],
          ]}
        />
        <p>
          Adding working days skips weekends and bank holidays. From 23 December 2026, 3 working days later is 30 December, because Christmas Day and
          the Boxing Day substitute are skipped.
        </p>
      </GuideSection>

      <GuideSection id="leap" n={7} kicker="Extra days" title="Leap years">
        <p>
          A leap year has 366 days, with 29 February. Years divisible by 4 are leap years, except century years not divisible by 400. So 2000 was a
          leap year, 2100 will not be, and the next leap year is 2028. Someone born on 29 February legally reaches a birthday on 1 March in non-leap
          years in England and Wales.
        </p>
      </GuideSection>

      <GuideSection id="uses" n={8} kicker="Practical" title="Everyday uses">
        <ul>
          <li>Counting down to a holiday, wedding or due date.</li>
          <li>Working out how long you have been in a job, for redundancy or holiday entitlement.</li>
          <li>Checking how many working days are left to meet a deadline.</li>
          <li>Planning a notice period or a tenancy end date.</li>
          <li>Calculating interest for a number of days on a loan or savings account.</li>
        </ul>
      </GuideSection>

      <GuideSection id="legal" n={9} kicker="Official" title="Legal and official deadlines">
        <p>
          Many legal time limits have their own rules. Some count calendar days, others clear days or working days, and some exclude the day of the
          event that starts the clock. Employment tribunal claims, for example, usually have a time limit of three months less one day from the act
          complained of. Always check the specific rule, and do not leave things to the last day.
        </p>
      </GuideSection>

      <GuideSection id="age" n={10} kicker="Birthdays" title="Working out an age">
        <p>
          For an age, put the date of birth as the start date and today as the end date, and leave out the end date. The years, months and days
          figure is the exact age. Someone born on 29 February 2000 was 26 years, 7 months and 5 days old on 4 October 2026, and had lived 9,714
          days.
        </p>
      </GuideSection>

      <GuideSection id="spreadsheets" n={11} kicker="Tools" title="Doing it in a spreadsheet">
        <p>
          In Excel or Google Sheets, subtracting one date from another gives the number of days. NETWORKDAYS counts working days and can take a list
          of bank holidays. DATEDIF gives whole years, months or days. Remember that NETWORKDAYS includes both the start and end dates.
        </p>
      </GuideSection>

      <GuideSection id="nights" n={12} kicker="Travel" title="Nights, days and stays">
        <p>
          A hotel stay from Friday to Sunday is 2 nights but covers 3 days. Booking sites count nights, which is the same as days with the end date
          left out. Car hire is usually charged per 24-hour period, so a later return time can add a whole extra day. Travel insurance usually counts
          both the start and end dates of a trip.
        </p>
      </GuideSection>

      <GuideSection id="interest" n={13} kicker="Money" title="Day counts for interest">
        <p>
          UK banks usually work out savings and loan interest daily, dividing the annual rate by 365, even in leap years. The number of days is
          normally counted from the day money arrives up to, but not including, the day it leaves. That is the same as the calculator&rsquo;s default
          setting, so you can use it to check interest for a period.
        </p>
        <WorkedExample
          title="Interest on £10,000 at 4% for 82 days"
          steps={[
            { label: "Daily interest: £10,000 × 4% ÷ 365", value: "£1.10" },
            { label: "Days", value: "82" },
          ]}
          total={{ label: "Interest", value: "£89.86" }}
        />
      </GuideSection>

      <GuideSection id="clocks" n={14} kicker="Time" title="Clock changes and time zones">
        <p>
          The calculator works in whole days, so clock changes do not affect the result. In hours, the day the clocks go forward in March has 23
          hours and the day they go back in October has 25. For international deadlines, check which time zone applies, as a UK date can already be
          tomorrow in Asia or still yesterday in the Americas.
        </p>
      </GuideSection>

      <GuideSection id="pregnancy" n={15} kicker="Family" title="Pregnancy and baby dates">
        <p>
          Pregnancy is counted from the first day of the last period, with a due date 280 days, or 40 weeks, later. Maternity leave can start from
          11 weeks before the week the baby is due. The <a href="/benefits/maternity-pay">maternity pay calculator</a> works out the key dates and
          pay.
        </p>
      </GuideSection>

      <GuideSection id="school" n={16} kicker="Education" title="School and term dates">
        <p>
          School terms in England add up to 190 teaching days a year, set by councils or academy trusts. Term dates do not follow bank holidays
          exactly, so use your school&rsquo;s calendar for exact counts. The calculator is useful for counting the days left until a holiday or
          an exam.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={17} kicker="FAQs" title="Common questions">
        <h3>How many days until Christmas?</h3>
        <p>Enter today and 25 December. From 4 October 2026 it is 82 days.</p>
        <h3>How many working days are in a year?</h3>
        <p>253 in England and Wales in 2026 and 2027, 252 in Scotland and 251 in Northern Ireland.</p>
        <h3>Does the calculator count bank holidays as working days?</h3>
        <p>No. Bank holidays that fall on weekdays are left out of the working-day count.</p>
        <h3>Can I count backwards?</h3>
        <p>Yes. Use a minus number of days to find an earlier date.</p>
        <h3>How many weeks are there between two dates?</h3>
        <p>Divide the days by 7. The calculator shows whole weeks and the days left over.</p>
        <h3>Why does my answer differ from another calculator by one day?</h3>
        <p>Usually because one counts the end date and the other does not. Switch &ldquo;Include the end date&rdquo; to compare.</p>
        <h3>Does the calculator know about past bank holidays?</h3>
        <p>Yes, including one-off days such as the 2022 Platinum Jubilee and the 2023 coronation.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "365", label: "Days in a normal year" },
            { value: "366", label: "Days in a leap year" },
            { value: "52", label: "Weeks in a year, plus 1 or 2 days" },
            { value: "253", label: "Working days, England and Wales 2027" },
            { value: "8", label: "Bank holidays, England and Wales" },
            { value: "28 to 31", label: "Days in a month" },
            { value: "8,760", label: "Hours in a normal year" },
            { value: "2028", label: "Next leap year" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

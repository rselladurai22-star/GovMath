import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Hours and time calculator — the guide. Every figure comes from src/lib/life/dates.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "between", title: "Hours between two times" },
  { id: "midnight", title: "Shifts past midnight" },
  { id: "breaks", title: "Taking off breaks" },
  { id: "decimal", title: "Hours and minutes to decimal hours" },
  { id: "trap", title: "The 7.30 trap" },
  { id: "adding", title: "Adding up hours and minutes" },
  { id: "week", title: "From a day to a week and a year" },
  { id: "pay", title: "Working out pay" },
  { id: "clocks", title: "24-hour and 12-hour clocks" },
  { id: "rules", title: "Breaks and working hours rules" },
  { id: "spreadsheet", title: "Times in a spreadsheet" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Rest breaks at work", href: "https://www.gov.uk/rest-breaks-work" },
  { label: "GOV.UK — Maximum weekly working hours", href: "https://www.gov.uk/maximum-weekly-working-hours" },
  { label: "GOV.UK — National Minimum Wage and National Living Wage rates", href: "https://www.gov.uk/national-minimum-wage-rates" },
  { label: "US Department of Labor — Overtime pay", href: "https://www.dol.gov/agencies/whd/overtime" },
];

export default function TimeGuide() {
  return (
    <Guide
      kicker="The time guide"
      title="How to work out hours and minutes"
      intro={
        <>
          Time does not add up like ordinary numbers: there are 60 minutes in an hour and 24 hours in a day. This guide shows how to find the time between two times, deal
          with shifts past midnight and breaks, add up a list of times and turn hours and minutes into decimal hours for a timesheet.
        </>
      }
      meta={["Worked examples", "7 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Subtract the start from the finish; if the minutes go negative, borrow 60 from the hours.</li>
          <li>If the finish is earlier than the start, the time runs past midnight: add 24 hours to the finish.</li>
          <li>Decimal hours = minutes ÷ 60, so 7 hours 45 minutes is 7.75.</li>
          <li>Take unpaid breaks off the total before working out pay.</li>
        </ul>
        <KeyStats
          items={[
            { value: "8:00", label: "09:00 to 17:30, less 30 minutes" },
            { value: "7:15", label: "22:00 to 06:00, less 45 minutes" },
            { value: "0.75", label: "45 minutes in decimal hours" },
            { value: "40:00", label: "Five 8-hour days" },
          ]}
        />
      </GuideSection>

      <GuideSection id="between" n={2} kicker="Method" title="Hours between two times">
        <p>
          Write both times in the 24-hour clock, then take the start from the finish. Do the minutes first. If the finish minutes are smaller than the start minutes, add
          60 to them and take 1 from the hours.
        </p>
        <WorkedExample
          title="From 09:00 to 17:30"
          steps={[
            { label: "Minutes", note: "30 − 0", value: "30" },
            { label: "Hours", note: "17 − 9", value: "8" },
          ]}
          total={{ label: "Time between", value: "8 hours 30 minutes" }}
        />
      </GuideSection>

      <GuideSection id="midnight" n={3} kicker="Night shifts" title="Shifts past midnight">
        <p>
          When the finish time is earlier than the start, the shift has crossed midnight. Add 24 hours to the finish time, then subtract as usual. The calculator does
          this automatically whenever the finish is at or before the start.
        </p>
        <WorkedExample
          title="A night shift from 22:00 to 06:00 with a 45-minute break"
          steps={[
            { label: "06:00 + 24 hours", value: "30:00" },
            { label: "30:00 − 22:00", value: "8:00" },
            { label: "Less the break", value: "−0:45" },
          ]}
          total={{ label: "Time worked", value: "7 hours 15 minutes" }}
        />
        <Callout title="Shifts over 24 hours">
          A finish time alone cannot show a shift longer than a day. For those, add up the hours of each day with &ldquo;Add up hours and minutes&rdquo;.
        </Callout>
      </GuideSection>

      <GuideSection id="breaks" n={4} kicker="Breaks" title="Taking off breaks">
        <p>
          Enter any unpaid break in minutes and the calculator takes it off. A long day shift from 07:30 to 19:30 with a 60-minute break is 12 hours on site but 11 hours
          worked. Paid breaks should not be taken off, so leave the break at 0 if yours is paid.
        </p>
      </GuideSection>

      <GuideSection id="decimal" n={5} kicker="Decimals" title="Hours and minutes to decimal hours">
        <p>
          Payroll systems and many timesheets use decimal hours, where 0.5 is half an hour. To convert, divide the minutes by 60 and add them to the hours. To go back,
          multiply the decimal part by 60.
        </p>
        <DataTable
          caption="Minutes as decimal hours (rounded to 2 places)"
          head={["Minutes", "Decimal"]}
          rows={[
            ["5", "0.08"],
            ["10", "0.17"],
            ["15", "0.25"],
            ["20", "0.33"],
            ["25", "0.42"],
            ["30", "0.50"],
            ["40", "0.67"],
            ["45", "0.75"],
            ["50", "0.83"],
            ["55", "0.92"],
          ]}
          numeric={[0, 1]}
        />
        <p>
          The <a href="/everyday/timesheet-decimal">timesheet calculator</a>{" "}does this for a whole week, day by day, with overtime.
        </p>
      </GuideSection>

      <GuideSection id="trap" n={6} kicker="Watch out" title="The 7.30 trap">
        <CompareCards
          columns={[
            {
              name: "7:30 (hours and minutes)",
              rows: [
                { label: "Means", value: "7 hours 30 minutes" },
                { label: "Decimal", value: "7.50" },
              ],
            },
            {
              name: "7.30 (decimal hours)",
              rows: [
                { label: "Means", value: "7 hours 18 minutes" },
                { label: "Decimal", value: "7.30" },
              ],
            },
          ]}
        />
        <p>Writing 7.30 on a decimal timesheet when you mean half past seven loses 12 minutes of pay. Always check which format the form expects.</p>
      </GuideSection>

      <GuideSection id="adding" n={7} kicker="Adding" title="Adding up hours and minutes">
        <p>
          Add the hours and the minutes separately, then turn each 60 minutes into an hour. To take time away, subtract the minutes first, borrowing an hour if needed.
          In the calculator, start a line with a minus to take it away.
        </p>
        <WorkedExample
          title="7:30 + 8:15 − 0:45"
          steps={[
            { label: "7:30 + 8:15", value: "15:45" },
            { label: "15:45 − 0:45", value: "15:00" },
          ]}
          total={{ label: "Total", value: "15 hours (15.00)" }}
        />
      </GuideSection>

      <GuideSection id="week" n={8} kicker="Totals" title="From a day to a week and a year">
        <p>
          Multiply a day&rsquo;s hours by the days you work. Five 8-hour days make 40 hours a week, and 52 weeks of that is 2,080 hours a year. A 9-to-5 day with a
          30-minute unpaid lunch is 7 hours 30 minutes, or 37 hours 30 minutes over five days. The calculator shows a day, a week, an average month (52 weeks ÷ 12) and a
          year.
        </p>
      </GuideSection>

      <GuideSection id="pay" n={9} kicker="Pay" title="Working out pay">
        <p>Pay is decimal hours × hourly rate. Use decimal hours, not hours and minutes, or the answer will be wrong.</p>
        <WorkedExample
          title="8 hours at £12.71 an hour (the UK National Living Wage from April 2026)"
          steps={[
            { label: "Decimal hours", value: "8.00" },
            { label: "× £12.71", value: "£101.68" },
          ]}
          total={{ label: "Five days", value: "£508.40" }}
        />
        <p>
          This is pay before tax. Choose £, $ or € under More options. To see holiday entitlement for your hours, try the{" "}
          <a href="/uk/tax-and-salary/holiday-entitlement">holiday entitlement calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="clocks" n={10} kicker="Clocks" title="24-hour and 12-hour clocks">
        <p>
          The calculator reads both. In the 12-hour clock, 12am is midnight and 12pm is midday, so a shift from 9pm to 5am is 21:00 to 05:00 in the 24-hour clock.
          You can type 09:00, 9.30, 1730 or 5:30pm, and choose how times are shown under More options.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={11} kicker="Rules" title="Breaks and working hours rules">
        <p>
          In the UK, adult workers usually have the right to one uninterrupted 20-minute rest break if they work more than 6 hours a day, and it does not have to be paid.
          Most workers cannot be made to work more than 48 hours a week on average, normally over 17 weeks, unless they opt out.
        </p>
        <p>
          In the US, the federal rule is that most hourly employees get overtime at one and a half times their regular rate for hours over 40 in a workweek. Contracts
          and local laws can give more.
        </p>
      </GuideSection>

      <GuideSection id="spreadsheet" n={12} kicker="Tools" title="Times in a spreadsheet">
        <p>
          Spreadsheets store times as fractions of a day. With a start in A1 and a finish in B1, =MOD(B1-A1, 1) gives the time between them, even past midnight. Format
          the cell as [h]:mm to show totals over 24 hours, and multiply by 24 to get decimal hours.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={13} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Subtracting times as decimals, such as 17.30 − 9.45 = 7.85, instead of 7 hours 45 minutes.</li>
          <li>Forgetting that a night shift crosses midnight.</li>
          <li>Taking off a paid break, or forgetting an unpaid one.</li>
          <li>Rounding each day before adding, which can add up to several minutes a week.</li>
        </ul>
        <p>
          For days rather than hours, use the <a href="/everyday/date-calculator">date calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "60", label: "Minutes in an hour" },
            { value: "1,440", label: "Minutes in a day" },
            { value: "÷ 60", label: "Minutes to decimal hours" },
            { value: "2,080", label: "Hours in a year of 40-hour weeks" },
            { value: "20 min", label: "UK rest break after 6 hours" },
            { value: "48", label: "UK average weekly hours limit" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

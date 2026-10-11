import { Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Countdown calculator — the guide. Every figure comes from src/lib/life/dates.ts and calendar.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how-days", title: "How the days are counted" },
  { id: "example", title: "A worked example" },
  { id: "weekends", title: "Weekends and working days" },
  { id: "live", title: "The live countdown" },
  { id: "christmas", title: "Christmas and New Year" },
  { id: "easter", title: "Why Easter moves" },
  { id: "bank-holidays", title: "The next bank holiday" },
  { id: "own-date", title: "Counting down to your own date" },
  { id: "planning", title: "Using a countdown to plan" },
  { id: "past", title: "Dates that have passed" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — UK bank holidays", href: "https://www.gov.uk/bank-holidays" },
  { label: "Royal Museums Greenwich — When is Easter?", href: "https://www.rmg.co.uk/stories/topics/when-easter" },
  { label: "Royal Museums Greenwich — Which years are leap years?", href: "https://www.rmg.co.uk/stories/time/which-years-are-leap-years-can-you-have-leap-seconds" },
];

export default function CountdownGuide() {
  return (
    <Guide
      kicker="The countdown guide"
      title="How to count down the days to a date"
      intro={
        <>
          Whether it is Christmas, a holiday, a wedding or a deadline, a countdown tells you how much time is left. This guide explains how the days, weekends and working
          days are counted, why Easter moves, and how to use a countdown to plan.
        </>
      }
      meta={["Worked examples", "6 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Days are counted from today to the date: on the day before, there is 1 day to go.</li>
          <li>Weekends are the Saturdays between now and the date.</li>
          <li>Working days are the weekdays in between, less bank holidays.</li>
          <li>The live countdown ticks to midnight at the start of the date, in your own time zone.</li>
        </ul>
        <KeyStats
          items={[
            { value: "75 days", label: "11 October to Christmas Day 2026" },
            { value: "10", label: "Weekends in between" },
            { value: "54", label: "Working days in between" },
            { value: "1,800", label: "Hours to go" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how-days" n={2} kicker="Counting" title="How the days are counted">
        <p>
          The calculator counts whole days from midnight today to midnight at the start of the date. It uses the date on your device, so the count always starts from
          your own today, wherever you are. On the date itself, it says the day is today.
        </p>
        <p>
          The same number is often called &ldquo;sleeps&rdquo;: one night for each day to go. Weeks are days ÷ 7, with the rest as days, and months are counted by the
          calendar, the same way as an age.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Example" title="A worked example">
        <WorkedExample
          title="From Sunday 11 October 2026 to Christmas Day"
          steps={[
            { label: "Days", value: "75" },
            { label: "Weeks", value: "10 weeks and 5 days" },
            { label: "Months", value: "2 months and 14 days" },
            { label: "Weekends", value: "10" },
            { label: "Working days in between", note: "England and Wales", value: "54" },
          ]}
          total={{ label: "Christmas Day", value: "Friday 25 December 2026" }}
        />
      </GuideSection>

      <GuideSection id="weekends" n={4} kicker="Weekends" title="Weekends and working days">
        <p>
          Weekends are counted as the Saturdays after today, up to and including the date. If today is Saturday, this weekend is not counted, because it has already
          started. Working days are the weekdays strictly between today and the date, so neither today nor the date itself is counted.
        </p>
        <p>
          In the UK, bank holidays are taken off the working days for the nation you choose under More options. From 11 October 2026 to New Year&rsquo;s Day 2027 there are
          82 days, with 57 working days in England and Wales after Christmas Day and the Boxing Day substitute day are taken off.
        </p>
      </GuideSection>

      <GuideSection id="live" n={5} kicker="Live" title="The live countdown">
        <p>
          While the page is open, the live countdown shows days, hours, minutes and seconds until midnight at the start of the date. It runs in your browser from your
          device&rsquo;s clock and time zone, so if your clock is wrong the countdown will be too. Around the clocks changing in spring and autumn, a day can be 23 or 25
          hours long, and the live count allows for that.
        </p>
      </GuideSection>

      <GuideSection id="christmas" n={6} kicker="Christmas" title="Christmas and New Year">
        <p>Christmas Day is always 25 December, but the weekday changes each year:</p>
        <DataTable
          caption="Christmas Day by year"
          head={["Year", "Weekday"]}
          rows={[
            ["2026", "Friday"],
            ["2027", "Saturday"],
            ["2028", "Monday"],
            ["2029", "Tuesday"],
            ["2030", "Wednesday"],
          ]}
        />
        <p>
          When Christmas Day or Boxing Day falls on a weekend, UK bank holidays move to the following weekdays. In 2027, both fall on a weekend, so the bank holidays are
          Monday 27 and Tuesday 28 December.
        </p>
      </GuideSection>

      <GuideSection id="easter" n={7} kicker="Easter" title="Why Easter moves">
        <p>
          Easter Sunday is the first Sunday after the first full moon on or after 21 March, using the church&rsquo;s tables, so it can fall between 22 March and 25 April.
          Good Friday is two days before and Easter Monday the day after.
        </p>
        <DataTable
          caption="Easter Sunday"
          head={["Year", "Date"]}
          rows={[
            ["2027", "28 March"],
            ["2028", "16 April"],
            ["2029", "1 April"],
            ["2030", "21 April"],
            ["2031", "13 April"],
          ]}
        />
      </GuideSection>

      <GuideSection id="bank-holidays" n={8} kicker="Bank holidays" title="The next bank holiday">
        <p>
          The next bank holiday depends on where you live. On 11 October 2026, the next one in England, Wales and Northern Ireland was Christmas Day, but in Scotland it
          was St Andrew&rsquo;s Day on Monday 30 November. Choose your nation under More options, or see every date in the{" "}
          <a href="/uk/life/bank-holidays">bank holiday calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="own-date" n={9} kicker="Your date" title="Counting down to your own date">
        <p>
          Choose &ldquo;A date I choose&rdquo; to count down to a holiday, a wedding, a due date, exams or a birthday. Give it a name, then copy the link: the link holds
          the date and name, so it shows the right countdown whenever it is opened. For a birthday, the <a href="/everyday/age-calculator">age calculator</a>{" "}also shows
          how old you will be.
        </p>
      </GuideSection>

      <GuideSection id="planning" n={10} kicker="Planning" title="Using a countdown to plan">
        <p>
          Knowing the working days left helps with deadlines: if a project needs 40 working days and there are 54 before Christmas, there is room for 14 days of slack.
          To find a date a set number of working days away, use the <a href="/everyday/date-calculator">date calculator</a>, and to count between two dates, the{" "}
          <a href="/uk/life/days-between-dates">days between dates calculator</a>.
        </p>
        <Callout title="Saving towards a date">
          Divide what you need by the weeks left. For example, saving 300 over 10 weeks is 30 a week. Starting a week later makes it about 33.
        </Callout>
      </GuideSection>

      <GuideSection id="past" n={11} kicker="Past dates" title="Dates that have passed">
        <p>
          If the date is in the past, the calculator counts the days since it instead, with weeks and weekends. This is handy for anniversaries, the days since a
          purchase, or how long a claim has been open.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={12} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "24", label: "Hours in a day (23 or 25 when clocks change)" },
            { value: "86,400", label: "Seconds in a day" },
            { value: "22 Mar to 25 Apr", label: "Range of Easter Sunday" },
            { value: "28 March", label: "Easter Sunday 2027" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Age calculator — the guide. Every figure comes from src/lib/life/dates.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "method", title: "How exact age is counted" },
  { id: "example", title: "A worked example" },
  { id: "months", title: "Why months are tricky" },
  { id: "month-ends", title: "Birthdays at the end of a month" },
  { id: "leap-years", title: "Leap years and your age in days" },
  { id: "leap-day", title: "Born on 29 February" },
  { id: "units", title: "Your age in weeks, days and hours" },
  { id: "age-on-date", title: "Age on a future or past date" },
  { id: "weekday", title: "The day you were born" },
  { id: "next-birthday", title: "Next birthday and half birthday" },
  { id: "milestones", title: "Milestones: 10,000 days and a billion seconds" },
  { id: "babies", title: "Babies: age in weeks and months" },
  { id: "age-gap", title: "The age gap between two people" },
  { id: "official", title: "When age matters officially" },
  { id: "school-year", title: "School years and cut-off dates" },
  { id: "spreadsheet", title: "Working out age in a spreadsheet" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "time-zones", title: "Time zones and time of birth" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Royal Museums Greenwich — Which years are leap years?", href: "https://www.rmg.co.uk/stories/time/which-years-are-leap-years-can-you-have-leap-seconds" },
  { label: "GOV.UK — Check your State Pension age", href: "https://www.gov.uk/state-pension-age" },
  { label: "GOV.UK — Schools admissions: school starting age", href: "https://www.gov.uk/schools-admissions/school-starting-age" },
  { label: "ISO — ISO 8601 date and time format", href: "https://www.iso.org/iso-8601-date-and-time-format.html" },
];

export default function AgeGuide() {
  return (
    <Guide
      kicker="The age guide"
      title="How to work out your exact age"
      intro={
        <>
          Saying how old you are sounds simple until you need it to the day: for a form, a milestone, a baby&rsquo;s check-up or a birthday on 29 February. This guide
          explains how exact age is counted, why months cause trouble, and how to find your age in weeks, days and hours.
        </>
      }
      meta={["Worked examples", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Exact age is whole years since your last birthday, then whole months, then the days left over.</li>
          <li>Months are counted by date, not as 30 days, so a month after 15 March is 15 April.</li>
          <li>Age in days counts every day since birth, including each 29 February.</li>
          <li>Someone born on 29 February has a birthday on 28 February or 1 March in other years, depending on the rule used.</li>
        </ul>
        <KeyStats
          items={[
            { value: "36 y 3 m 26 d", label: "Born 15 June 1990, on 11 October 2026" },
            { value: "13,267", label: "Days old on that date" },
            { value: "435", label: "Months old" },
            { value: "1,895 weeks", label: "Plus 2 days" },
          ]}
        />
      </GuideSection>

      <GuideSection id="method" n={2} kicker="The method" title="How exact age is counted">
        <p>Exact age is built up in three steps, from the biggest unit to the smallest:</p>
        <ol>
          <li>
            <strong>Years.</strong>{" "}Count the birthdays that have passed. If this year&rsquo;s birthday has not come yet, it does not count.
          </li>
          <li>
            <strong>Months.</strong>{" "}From the last birthday, count how many times the same day of the month has come round.
          </li>
          <li>
            <strong>Days.</strong>{" "}Count the days from the last of those monthly dates up to today.
          </li>
        </ol>
        <p>
          This is how people usually say an age, and it is how the calculator works. It avoids averages such as &ldquo;365.25 days a year&rdquo; or &ldquo;30.4 days a
          month&rdquo;, which can put the answer a day out.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Example" title="A worked example">
        <WorkedExample
          title="Born 15 June 1990, age on 11 October 2026"
          steps={[
            { label: "Last birthday", note: "15 June 2026", value: "36 years" },
            { label: "Monthly dates since then", note: "15 July, 15 August, 15 September", value: "3 months" },
            { label: "15 September to 11 October", value: "26 days" },
          ]}
          total={{ label: "Exact age", value: "36 years, 3 months, 26 days" }}
        />
        <p>
          On the same day, the person is 13,267 days old, which is 1,895 weeks and 2 days, or 318,408 hours. Their next birthday, when they turn 37, is on 15 June 2027,
          247 days away.
        </p>
      </GuideSection>

      <GuideSection id="months" n={4} kicker="Months" title="Why months are tricky">
        <p>
          Months run from 28 to 31 days, so &ldquo;one month&rdquo; is not a fixed number of days. Counting by date keeps the answer natural: from 15 September to 15
          October is one month, even though September has 30 days and October 31.
        </p>
        <p>
          The leftover days are counted from the last monthly date. That is why two people born a day apart can show the same number of months but a different number of
          days.
        </p>
        <Callout title="Totals stay exact">
          Total days, weeks and hours do not depend on month lengths at all. They are a plain count of days, so they are the most precise way to compare ages.
        </Callout>
      </GuideSection>

      <GuideSection id="month-ends" n={5} kicker="Edge cases" title="Birthdays at the end of a month">
        <p>
          If you were born on the 29th, 30th or 31st, some months have no matching day. The calculator then uses the last day of that month. So for someone born on 31
          January 2000, a month after 31 January 2026 is 28 February 2026.
        </p>
        <WorkedExample
          title="Born 31 January 2000, age on 1 March 2026"
          steps={[
            { label: "Last birthday", note: "31 January 2026", value: "26 years" },
            { label: "One month on", note: "28 February 2026 (no 31st)", value: "1 month" },
            { label: "28 February to 1 March", value: "1 day" },
          ]}
          total={{ label: "Exact age", value: "26 years, 1 month, 1 day" }}
        />
      </GuideSection>

      <GuideSection id="leap-years" n={6} kicker="Leap years" title="Leap years and your age in days">
        <p>
          A year has 365 days, or 366 in a leap year. In the Gregorian calendar a year is a leap year if it divides by 4, except century years, which must also divide by
          400. So 2000 was a leap year but 1900 was not, and 2100 will not be.
        </p>
        <p>
          That is why the same age in years can be a different number of days. An 18th birthday on 11 October 2026 comes 6,574 days after birth. A 100th birthday on the
          same day comes 36,525 days after birth, because the century includes 25 leap days.
        </p>
        <DataTable
          caption="Leap years around now"
          head={["Years", "Leap years"]}
          rows={[
            ["2020 to 2029", "2020, 2024, 2028"],
            ["2030 to 2039", "2032, 2036"],
            ["2040 to 2049", "2040, 2044, 2048"],
          ]}
        />
      </GuideSection>

      <GuideSection id="leap-day" n={7} kicker="29 February" title="Born on 29 February">
        <p>
          People born on 29 February (often called leaplings) only have their real birthday every four years. In other years, they celebrate on 28 February or 1 March.
          Which day counts for official purposes depends on the country and the organisation, so the calculator lets you choose.
        </p>
        <CompareCards
          columns={[
            {
              name: "1 March rule (the default)",
              rows: [
                { label: "Born", value: "29 February 2008" },
                { label: "Age on 28 February 2026", value: "17 years, 11 months, 27 days" },
                { label: "Turns 18 on", value: "1 March 2026" },
              ],
            },
            {
              name: "28 February rule",
              rows: [
                { label: "Born", value: "29 February 2008" },
                { label: "Age on 28 February 2026", value: "18 years, 0 months, 0 days" },
                { label: "Turns 18 on", value: "28 February 2026" },
              ],
            },
          ]}
        />
        <Callout tone="warn" title="For legal ages, check the rule">
          If a legal age matters on that one day, for example buying alcohol or signing a contract, the organisation checking your age applies its own rules. Ask them.
        </Callout>
      </GuideSection>

      <GuideSection id="units" n={8} kicker="Units" title="Your age in weeks, days and hours">
        <p>Once the days are counted, the other units follow:</p>
        <ul>
          <li>
            <strong>Weeks:</strong>{" "}days ÷ 7, with the remainder as days.
          </li>
          <li>
            <strong>Hours:</strong>{" "}days × 24.
          </li>
          <li>
            <strong>Minutes:</strong>{" "}days × 1,440.
          </li>
          <li>
            <strong>Months:</strong>{" "}whole years × 12, plus the months since the last birthday.
          </li>
        </ul>
        <DataTable
          caption="Born 15 June 1990, on 11 October 2026"
          head={["Unit", "Age"]}
          rows={[
            ["Years, months, days", "36 years, 3 months, 26 days"],
            ["Months", "435 months and 26 days"],
            ["Weeks", "1,895 weeks and 2 days"],
            ["Days", "13,267"],
            ["Hours", "318,408"],
            ["Minutes", "19,104,480"],
          ]}
          numeric={[1]}
        />
      </GuideSection>

      <GuideSection id="age-on-date" n={9} kicker="Any date" title="Age on a future or past date">
        <p>
          The &ldquo;Age on&rdquo; date is today unless you change it. Set it to a future date to see how old you will be at a wedding, an exam or a retirement date, or to
          a past date to check how old someone was when something happened. The method is the same: count from the date of birth to the date you choose.
        </p>
        <p>
          For pension planning, the State Pension age depends on your date of birth rather than a round number of years for some people, so use the{" "}
          <a href="/uk/investing/state-pension-age">State Pension age lookup</a>{" "}for that.
        </p>
      </GuideSection>

      <GuideSection id="weekday" n={10} kicker="Weekday" title="The day you were born">
        <p>
          The calculator shows the weekday of your birth. A few examples: 15 June 1990 was a Friday, 1 January 2000 was a Saturday and 29 February 2008 was a Friday.
        </p>
        <p>
          Birthdays move one weekday later each year, or two after a 29 February. So a birthday that falls on a Friday this year usually falls on a Saturday next year.
          The calculator lists the weekday of your next six birthdays, which helps when planning a party.
        </p>
      </GuideSection>

      <GuideSection id="next-birthday" n={11} kicker="Birthdays" title="Next birthday and half birthday">
        <p>
          The next birthday is the first one after the &ldquo;Age on&rdquo; date. If today is your birthday, the calculator says so and counts to next year&rsquo;s. The
          half birthday is six months after a birthday, using the month-end rule above. For someone born on 15 June it is 15 December.
        </p>
        <p>
          To count down the days to a birthday or any other date, use the <a href="/uk/life/days-between-dates">days between dates calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="milestones" n={12} kicker="Fun" title="Milestones: 10,000 days and a billion seconds">
        <p>Round numbers of days, weeks, months and seconds make good excuses for a celebration. For someone born on 15 June 1990:</p>
        <Timeline
          items={[
            { when: "11 March 1993", what: "1,000 days old" },
            { when: "14 January 2000", what: "500 weeks old" },
            { when: "31 October 2017", what: "10,000 days old", detail: "About 27 years and 4 months after birth." },
            { when: "21 February 2022", what: "1 billion seconds old", detail: "11,574 days: about 31 years and 8 months." },
            { when: "13 October 2028", what: "2,000 weeks old" },
            { when: "15 February 2032", what: "500 months old" },
            { when: "18 March 2045", what: "20,000 days old" },
          ]}
        />
        <p>The calculator lists every milestone from 1,000 days to 1,000 months for your own date of birth, with how long ago or how far away each one is.</p>
      </GuideSection>

      <GuideSection id="babies" n={13} kicker="Babies" title="Babies: age in weeks and months">
        <p>
          Babies are usually described in weeks for the first few months, then in months. A baby born on 20 March 2026 is 29 weeks and 2 days old on 11 October 2026, or 6
          months and 21 days.
        </p>
        <p>
          Health visitors and doctors may use a baby&rsquo;s corrected age if the baby was born early. That is the age counted from the due date instead of the birth date.
          To work it out, enter the due date as the date of birth.
        </p>
      </GuideSection>

      <GuideSection id="age-gap" n={14} kicker="Two people" title="The age gap between two people">
        <p>
          Add a second date of birth under More options to see the gap between two people. The calculator counts from the older person&rsquo;s birth date to the younger
          person&rsquo;s, in the same years, months and days, with total days and weeks. The gap stays the same throughout their lives, though it sounds smaller as the
          years go by.
        </p>
      </GuideSection>

      <GuideSection id="official" n={15} kicker="Official ages" title="When age matters officially">
        <p>Many rights and duties start on a birthday. In the UK, for example:</p>
        <ul>
          <li>you can apply for a provisional driving licence at 15 years and 9 months;</li>
          <li>you can vote in UK general elections at 18 (16 in Scottish and Welsh elections; a bill to lower it to 16 for all UK elections is going through Parliament);</li>
          <li>the State Pension age is 66, rising to 67 between 2026 and 2028.</li>
        </ul>
        <p>
          Always check the exact rule with the organisation, as some ages are reached on the birthday itself and some rules count a set number of days or months
          instead.
        </p>
      </GuideSection>

      <GuideSection id="school-year" n={16} kicker="Schools" title="School years and cut-off dates">
        <p>
          In England, children usually start school in the September after they turn 4, and must be in education from the term after their 5th birthday. The school year
          runs from 1 September to 31 August, so children born in late August are the youngest in their year and those born in September the oldest. Scotland uses a
          different cut-off, based on a March-to-February year.
        </p>
      </GuideSection>

      <GuideSection id="spreadsheet" n={17} kicker="Tools" title="Working out age in a spreadsheet">
        <p>
          In Excel or Google Sheets, =DATEDIF(A1, B1, &quot;Y&quot;) gives whole years between a birth date in A1 and a date in B1. Use &quot;YM&quot; for the months after
          the last birthday and &quot;MD&quot; for the days. =B1-A1 gives total days. Spreadsheets can treat 29 February and month ends differently, so check edge cases
          against the calculator.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Subtracting the birth year from this year, which overstates the age until the birthday comes round.</li>
          <li>Dividing days by 365, which drifts by a day every four years or so.</li>
          <li>Counting months as 30 days, which gives the wrong number of days left over.</li>
          <li>Writing dates in the wrong order: 06/10 is 6 October in the UK but June 10 in the US.</li>
        </ul>
        <p>
          To count the days between any two dates without working out an age, use the <a href="/uk/life/days-between-dates">days between dates calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="time-zones" n={19} kicker="Fine print" title="Time zones and time of birth">
        <p>
          The calculator counts whole days and uses the date on your device as today. It does not use the time of birth, so hours and minutes are counted from midnight.
          If you were born late at night, or in a different time zone from where you live now, your age in hours may be a little different, but your age in days,
          months and years is the same.
        </p>
        <p>
          Planning something around an age? The <a href="/everyday/date-calculator">date calculator</a>{" "}adds days, weeks, months or years to any date.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "365 or 366", label: "Days in a year" },
            { value: "1,440", label: "Minutes in a day" },
            { value: "6,574", label: "Days in 18 years (with 4 leap days)" },
            { value: "36,525", label: "Days in 100 years (with 25 leap days)" },
            { value: "11,574", label: "Days in a billion seconds" },
            { value: "27 y 4 m", label: "About when you are 10,000 days old" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

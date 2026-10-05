import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Pro-rata rent — the guide. Figures from src/lib/life/everyday.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "methods", title: "The two main methods" },
  { id: "examples", title: "Worked examples" },
  { id: "february", title: "February and leap years" },
  { id: "weekly", title: "Weekly and monthly rent" },
  { id: "moving-in", title: "Moving in part-way through a month" },
  { id: "moving-out", title: "Moving out" },
  { id: "deposits", title: "Deposits and holding deposits" },
  { id: "rent-day", title: "Changing your rent day" },
  { id: "bills", title: "Splitting bills and council tax" },
  { id: "disputes", title: "If you disagree" },
  { id: "renters-rights", title: "Rent in advance and the Renters' Rights Act" },
  { id: "uc", title: "Universal Credit and Housing Benefit" },
  { id: "lodgers", title: "Lodgers and rooms" },
  { id: "students", title: "Students and fixed academic years" },
  { id: "checklist", title: "A quick checklist" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Tenant Fees Act 2019 guidance", href: "https://www.gov.uk/guidance/tenant-fees-act-2019-guidance-for-tenants" },
  { label: "GOV.UK — Tenancy deposit protection", href: "https://www.gov.uk/tenancy-deposit-protection" },
  { label: "GOV.UK — Private renting: your rights", href: "https://www.gov.uk/private-renting" },
  { label: "Shelter — Rent", href: "https://england.shelter.org.uk/housing_advice/private_renting" },
];

export default function ProRataGuide() {
  return (
    <Guide
      kicker="The pro-rata rent guide"
      title="How to work out rent for part of a month"
      intro={
        <>
          When a tenancy starts or ends part-way through a rent period, you pay rent for the days you have the property. There is more than one way
          to work out the daily rate, and the answers differ by a few pounds. This guide explains the methods, with worked examples, and covers
          deposits and changing your rent day.
        </>
      }
      meta={["England", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Most letting agents use the annual method: monthly rent × 12 ÷ 365 for a daily rate.</li>
          <li>Some divide the monthly rent by the number of days in that month.</li>
          <li>Multiply the daily rate by the days you have the property, counting the first and last day.</li>
          <li>Your tenancy agreement may say which method applies.</li>
        </ul>
        <KeyStats
          items={[
            { value: "× 12 ÷ 365", label: "Annual daily rate" },
            { value: "£39.45", label: "A day on £1,200 a month" },
            { value: "× 52 ÷ 12", label: "Weekly to monthly" },
            { value: "5 weeks", label: "Deposit cap" },
          ]}
        />
      </GuideSection>

      <GuideSection id="methods" n={2} kicker="Methods" title="The two main methods">
        <CompareCards
          columns={[
            {
              name: "Annual method",
              rows: [
                { label: "Daily rate", value: "Monthly rent × 12 ÷ 365" },
                { label: "£1,200 a month", value: "£39.45 a day, all year" },
                { label: "Fair because", value: "Every day costs the same" },
              ],
            },
            {
              name: "Calendar month method",
              rows: [
                { label: "Daily rate", value: "Monthly rent ÷ days in the month" },
                { label: "£1,200 a month", value: "£38.71 in October, £42.86 in February" },
                { label: "Fair because", value: "Each month's rent is split exactly" },
              ],
            },
          ]}
        />
        <p>
          A third way divides the weekly equivalent rent by 7, which gives almost the same answer as the annual method. In a leap year, the annual
          method divides by 366.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={3} kicker="Real numbers" title="Worked examples">
        <WorkedExample
          title="Moving in on 20 October 2026, rent £1,200 a month"
          steps={[
            { label: "Days: 20 to 31 October, inclusive", value: "12" },
            { label: "Annual daily rate: £1,200 × 12 ÷ 365", value: "£39.45" },
            { label: "12 × £39.45", value: "£473.42" },
          ]}
          total={{ label: "Rent for October", value: "£473.42" }}
        />
        <DataTable
          caption="Rent of £1,200 a month, both methods"
          head={["Period", "Days", "Annual method", "Calendar month"]}
          numeric={[1, 2, 3]}
          rows={[
            ["20 to 31 Oct 2026", "12", "£473.42", "£464.52"],
            ["1 to 10 Nov 2026", "10", "£394.52", "£400.00"],
            ["15 to 28 Feb 2027", "14", "£552.33", "£600.00"],
            ["10 to 29 Feb 2028", "20", "£786.89", "£827.59"],
          ]}
        />
      </GuideSection>

      <GuideSection id="february" n={4} kicker="Short months" title="February and leap years">
        <p>
          The calendar month method gives a much higher daily rate in February, because the full month&rsquo;s rent is split over only 28 or 29 days.
          For half of February 2027, it gives £600, compared with £552.33 using the annual method. If you are moving in during February, check which
          method your landlord uses.
        </p>
      </GuideSection>

      <GuideSection id="weekly" n={5} kicker="Conversions" title="Weekly and monthly rent">
        <p>
          A month is not four weeks. To convert weekly rent to monthly, multiply by 52 and divide by 12. A weekly rent of £300 is £1,300 a month, not
          £1,200. To convert monthly rent to weekly, multiply by 12 and divide by 52: £1,200 a month is £276.92 a week.
        </p>
        <Callout tone="warn" title="The four-week trap">
          Multiplying weekly rent by 4 understates the monthly cost by about 8%, because most months are longer than four weeks.
        </Callout>
      </GuideSection>

      <GuideSection id="moving-in" n={6} kicker="Starting" title="Moving in part-way through a month">
        <p>
          Many agents ask for a part month&rsquo;s rent to bring the rent day into line with the first of the month, then a full month&rsquo;s rent on
          the 1st. Others simply make the rent day the date you move in, so no pro-rata payment is needed. Ask which applies before you sign, so you
          can budget for the first two payments.
        </p>
      </GuideSection>

      <GuideSection id="moving-out" n={7} kicker="Ending" title="Moving out">
        <p>
          You owe rent until the tenancy legally ends, not the day you hand back the keys. If your notice ends part-way through a rent period, the
          landlord should only charge rent up to the end date, worked out pro rata. If you have paid a full month in advance, you should get back the
          rent for the days after the tenancy ends.
        </p>
      </GuideSection>

      <GuideSection id="deposits" n={8} kicker="Deposits" title="Deposits and holding deposits">
        <DataTable
          caption="Deposit caps in England under the Tenant Fees Act"
          head={["Deposit", "Cap", "On £1,200 a month"]}
          rows={[
            ["Tenancy deposit, annual rent under £50,000", "5 weeks' rent", "£1,384.62"],
            ["Holding deposit", "1 week's rent", "£276.92"],
          ]}
        />
        <p>
          Your tenancy deposit must be protected in a government-approved scheme within 30 days. A holding deposit must be returned or put towards
          the first rent or deposit within the agreed deadline, usually 15 days.
        </p>
      </GuideSection>

      <GuideSection id="rent-day" n={9} kicker="Payments" title="Changing your rent day">
        <p>
          If your pay day changes, you can ask your landlord to move your rent day. If they agree, you pay a pro-rata amount for the days between the
          old and new dates. Get the change in writing to avoid confusion about arrears.
        </p>
      </GuideSection>

      <GuideSection id="bills" n={10} kicker="Other costs" title="Splitting bills and council tax">
        <p>
          Council tax is charged daily, so a part month is worked out in the same way. Energy and water bills depend on meter readings, so take readings
          on the day you move in and out, and send them to the suppliers. If you share a property, the percentage calculator can split bills fairly.
        </p>
      </GuideSection>

      <GuideSection id="disputes" n={11} kicker="Problems" title="If you disagree">
        <p>
          Check your tenancy agreement first. If it is silent, either method is reasonable, but the landlord cannot charge more than the rent due for
          the period. Most disagreements are a few pounds and can be settled by showing both calculations. For larger disputes, contact Shelter or
          Citizens Advice.
        </p>
      </GuideSection>

      <GuideSection id="renters-rights" n={12} kicker="New rules" title="Rent in advance and the Renters' Rights Act">
        <p>
          The Renters&rsquo; Rights Act changes private renting in England. Tenancies become periodic, with rent periods of no more than a month, and
          landlords can no longer demand large amounts of rent in advance before a tenancy begins. Pro-rata calculations still matter when a tenancy
          starts or ends part-way through a rent period, and the same daily-rate methods apply.
        </p>
      </GuideSection>

      <GuideSection id="uc" n={13} kicker="Benefits" title="Universal Credit and Housing Benefit">
        <p>
          Universal Credit pays housing costs monthly, based on your assessment period, not your rent day. If you move in part-way through an
          assessment period, the housing element is usually worked out for the whole period at the new rent, as long as you are liable for rent on
          the last day. Housing Benefit, used mainly by pensioners, is worked out weekly, so part weeks are calculated day by day.
        </p>
      </GuideSection>

      <GuideSection id="lodgers" n={14} kicker="Shared homes" title="Lodgers and rooms">
        <p>
          Lodgers often pay weekly or every four weeks. For a part week, divide the weekly rent by 7 and multiply by the days. If you pay every four
          weeks, remember there are 13 four-week periods in a year, not 12, so the yearly total is higher than 12 monthly payments of the same amount.
        </p>
        <WorkedExample
          title="A lodger paying £150 a week, moving in on a Thursday"
          steps={[
            { label: "Daily rate: £150 ÷ 7", value: "£21.43" },
            { label: "Thursday to Sunday: 4 days", value: "£85.71" },
          ]}
          total={{ label: "First part-week rent", value: "£85.71" }}
        />
      </GuideSection>

      <GuideSection id="students" n={15} kicker="Students" title="Students and fixed academic years">
        <p>
          Student lets often run for 44 or 51 weeks. Rent may be quoted weekly but paid in termly instalments. To compare offers, work out the total
          for the whole tenancy and the weekly equivalent, and check whether the summer months are included.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={16} kicker="Quick check" title="A quick checklist">
        <ol>
          <li>Find the exact start or end date of the tenancy.</li>
          <li>Check the tenancy agreement for a pro-rata method.</li>
          <li>Count the days, including the first and last.</li>
          <li>Work out the daily rate and multiply.</li>
          <li>Keep a record of the calculation with your payment.</li>
        </ol>
      </GuideSection>

      <GuideSection id="questions" n={17} kicker="FAQs" title="Common questions">
        <h3>Is pro-rata rent calculated on 30 days?</h3>
        <p>Rarely. Most agents use 365 days a year, and some use the actual days in the month.</p>
        <h3>Do I count the day I move in?</h3>
        <p>Yes. Rent is usually charged from the start date of the tenancy, including that day.</p>
        <h3>What about the day I move out?</h3>
        <p>The last day of the tenancy is also counted.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "365", label: "Days a year (366 in a leap year)" },
            { value: "52 ÷ 12", label: "Weeks in a month, on average" },
            { value: "4.33", label: "Weeks in an average month" },
            { value: "5 weeks", label: "Deposit cap under £50,000" },
            { value: "6 weeks", label: "Deposit cap at £50,000 or more" },
            { value: "1 week", label: "Holding deposit cap" },
            { value: "30 days", label: "To protect a deposit" },
            { value: "15 days", label: "Usual holding deposit deadline" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

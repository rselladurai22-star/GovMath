import { CompareCards, DataTable, Guide, GuideSection, KeyStats, Callout, type Source, type TocItem } from "@/components/guide/Guide";

/** Bank holidays — the guide. Dates from src/lib/life/calendar.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "2027", title: "Bank holidays in 2027" },
  { id: "nations", title: "Differences between the nations" },
  { id: "substitute", title: "Substitute days" },
  { id: "easter", title: "Why Easter moves" },
  { id: "rights", title: "Your rights at work" },
  { id: "part-time", title: "Part-time workers" },
  { id: "pay", title: "Pay on a bank holiday" },
  { id: "planner", title: "Making the most of your leave" },
  { id: "working-days", title: "Working days in a year" },
  { id: "banks", title: "Banks, payments and deadlines" },
  { id: "special", title: "One-off bank holidays" },
  { id: "2028", title: "Bank holidays in 2028" },
  { id: "history", title: "A short history" },
  { id: "travel", title: "Travel and services" },
  { id: "shift", title: "Shift workers and the self-employed" },
  { id: "schools", title: "Schools and bank holidays" },
  { id: "international", title: "Compared with other countries" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — UK bank holidays", href: "https://www.gov.uk/bank-holidays" },
  { label: "GOV.UK — Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK — Holiday entitlement: bank holidays", href: "https://www.gov.uk/holiday-entitlement-rights/bank-holidays-and-public-holidays" },
  { label: "Legislation.gov.uk — Banking and Financial Dealings Act 1971", href: "https://www.legislation.gov.uk/ukpga/1971/80" },
];

export default function BankHolidaysGuide() {
  return (
    <Guide
      kicker="The bank holidays guide"
      title="UK bank holidays 2026 to 2028"
      intro={
        <>
          England and Wales have 8 bank holidays a year, Scotland 9 and Northern Ireland 10. This guide lists the dates, explains substitute days
          and why Easter moves, sets out your rights at work, and shows how to turn a few days of annual leave into long breaks.
        </>
      }
      meta={["2026 to 2028", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            England and Wales: <strong>8</strong> bank holidays a year.
          </li>
          <li>
            Scotland: <strong>9</strong>, including 2 January and St Andrew&rsquo;s Day, but not Easter Monday.
          </li>
          <li>
            Northern Ireland: <strong>10</strong>, including St Patrick&rsquo;s Day and the Battle of the Boyne.
          </li>
          <li>When a bank holiday falls on a weekend, a substitute weekday is given instead.</li>
        </ul>
        <KeyStats
          items={[
            { value: "8", label: "England and Wales" },
            { value: "9", label: "Scotland" },
            { value: "10", label: "Northern Ireland" },
            { value: "253", label: "Working days in 2027, England and Wales" },
          ]}
        />
      </GuideSection>

      <GuideSection id="2027" n={2} kicker="Dates" title="Bank holidays in 2027">
        <DataTable
          caption="England and Wales, 2027"
          head={["Bank holiday", "Date"]}
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
          In 2027 Christmas Day falls on a Saturday and Boxing Day on a Sunday, so the bank holidays move to Monday 27 and Tuesday 28 December. In
          2028, New Year&rsquo;s Day is a Saturday, so the bank holiday is Monday 3 January, and Easter falls later, with Good Friday on 14 April.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={3} kicker="Across the UK" title="Differences between the nations">
        <CompareCards
          columns={[
            {
              name: "Scotland",
              rows: [
                { label: "Extra", value: "2 January, St Andrew's Day (30 November)" },
                { label: "Not a bank holiday", value: "Easter Monday" },
                { label: "Summer", value: "First Monday of August" },
              ],
            },
            {
              name: "Northern Ireland",
              rows: [
                { label: "Extra", value: "St Patrick's Day (17 March), Battle of the Boyne (12 July)" },
                { label: "Summer", value: "Last Monday of August" },
                { label: "Total", value: "10 a year" },
              ],
            },
          ]}
        />
        <p>
          In Scotland, bank holidays are mainly days when banks close. Many Scottish employers follow local public holidays set by councils instead,
          which can differ from the bank holiday list.
        </p>
      </GuideSection>

      <GuideSection id="substitute" n={4} kicker="Weekends" title="Substitute days">
        <p>
          If a bank holiday falls on a Saturday or Sunday, the next weekday that is not already a bank holiday becomes a substitute day. When Christmas
          Day is on a Sunday, Boxing Day stays on Monday and Christmas moves to Tuesday. When both fall at the weekend, they move to Monday and
          Tuesday.
        </p>
      </GuideSection>

      <GuideSection id="easter" n={5} kicker="Moving dates" title="Why Easter moves">
        <p>
          Easter Sunday is the first Sunday after the first full moon on or after 21 March, using church tables. It can fall between 22 March and 25
          April, so Good Friday and Easter Monday move each year. In 2026 Easter Sunday was 5 April; in 2027 it is 28 March; in 2028 it is 16 April.
        </p>
      </GuideSection>

      <GuideSection id="rights" n={6} kicker="Employment law" title="Your rights at work">
        <ul>
          <li>There is no legal right to paid time off on bank holidays.</li>
          <li>Almost all workers are entitled to 5.6 weeks of paid holiday a year, which can include bank holidays.</li>
          <li>Your contract says whether bank holidays are extra to your annual leave or part of it.</li>
          <li>Your employer can require you to work on a bank holiday if your contract allows it.</li>
          <li>Extra pay for working a bank holiday depends on your contract, not the law.</li>
        </ul>
        <Callout title="5.6 weeks for a full-time worker">
          For someone working 5 days a week, 5.6 weeks is 28 days. If bank holidays are included, that leaves 20 days to book.
        </Callout>
      </GuideSection>

      <GuideSection id="part-time" n={7} kicker="Fairness" title="Part-time workers">
        <p>
          Part-time workers must not be treated less favourably. Because most bank holidays fall on Mondays, someone who never works Mondays could
          lose out if bank holidays are given only to those who work that day. Many employers give part-time staff a pro-rata share of bank holiday
          entitlement as hours, which they take on days they would normally work.
        </p>
      </GuideSection>

      <GuideSection id="pay" n={8} kicker="Money" title="Pay on a bank holiday">
        <p>
          If a bank holiday is part of your paid leave, you are paid as normal. Some employers pay time-and-a-half or double time for working a bank
          holiday, or give a day off in lieu, but this is not required by law. Check your contract or staff handbook.
        </p>
      </GuideSection>

      <GuideSection id="planner" n={9} kicker="Leave" title="Making the most of your leave">
        <DataTable
          caption="Long breaks for up to 4 days of leave, England and Wales, 2027"
          head={["Break", "Leave needed", "Days off"]}
          numeric={[1, 2]}
          rows={[
            ["Christmas 2026 to 3 January 2027", "3", "10"],
            ["Christmas 2027 to 3 January 2028", "3", "10"],
            ["Easter: 20 to 29 March", "4", "10"],
            ["Early May: 1 to 9 May", "4", "9"],
            ["Spring: 29 May to 6 June", "4", "9"],
            ["Summer: 28 August to 5 September", "4", "9"],
          ]}
        />
        <p>
          Christmas and Easter give the best return, because two bank holidays fall close together. The calculator shows the plans for any year and
          nation, and you can change how many days of leave to use.
        </p>
      </GuideSection>

      <GuideSection id="working-days" n={10} kicker="Counting" title="Working days in a year">
        <DataTable
          caption="Working days (Monday to Friday, less bank holidays)"
          head={["Nation", "2026", "2027"]}
          numeric={[1, 2]}
          rows={[
            ["England and Wales", "253", "253"],
            ["Scotland", "252", "252"],
            ["Northern Ireland", "251", "251"],
          ]}
        />
        <p>
          The <a href="/life/days-between-dates">days between dates calculator</a> counts working days between any two dates, allowing for bank
          holidays.
        </p>
      </GuideSection>

      <GuideSection id="banks" n={11} kicker="Money" title="Banks, payments and deadlines">
        <p>
          Bank holidays are non-working days for most payment systems. Payments due on a bank holiday are usually made on the next working day, and
          salaries are often paid the working day before. Statutory deadlines that fall on a bank holiday may move too, but check the rules for each
          one: some HMRC deadlines do not move.
        </p>
      </GuideSection>

      <GuideSection id="special" n={12} kicker="Exceptions" title="One-off bank holidays">
        <p>
          The government can create extra bank holidays or move existing ones by royal proclamation. Recent examples include the Platinum Jubilee in
          June 2022, the State Funeral of Queen Elizabeth II in September 2022, and the coronation of King Charles III on 8 May 2023. The early May
          bank holiday was moved to 8 May in 2020 for VE Day.
        </p>
      </GuideSection>

      <GuideSection id="2028" n={13} kicker="Dates" title="Bank holidays in 2028">
        <DataTable
          caption="England and Wales, 2028 (expected)"
          head={["Bank holiday", "Date"]}
          rows={[
            ["New Year's Day (substitute day)", "Monday 3 January"],
            ["Good Friday", "Friday 14 April"],
            ["Easter Monday", "Monday 17 April"],
            ["Early May bank holiday", "Monday 1 May"],
            ["Spring bank holiday", "Monday 29 May"],
            ["Summer bank holiday", "Monday 28 August"],
            ["Christmas Day", "Monday 25 December"],
            ["Boxing Day", "Tuesday 26 December"],
          ]}
        />
        <p>
          These dates follow the usual rules. The government confirms bank holidays a year or two ahead and occasionally changes them, so check
          GOV.UK before booking travel.
        </p>
      </GuideSection>

      <GuideSection id="history" n={14} kicker="Background" title="A short history">
        <p>
          Bank holidays began with the Bank Holidays Act 1871, introduced by Sir John Lubbock, which gave bank staff four days off a year in England,
          Wales and Ireland, plus Christmas Day and Good Friday, which were already traditional holidays. The Banking and Financial Dealings Act
          1971 set out the modern framework. New Year&rsquo;s Day became a bank holiday in England and Wales in 1974, and the early May bank holiday
          followed in 1978.
        </p>
      </GuideSection>

      <GuideSection id="travel" n={15} kicker="Practicalities" title="Travel and services">
        <p>
          Public transport usually runs a Sunday or reduced timetable on bank holidays, and engineering works are often planned for long weekends.
          GP surgeries and many council services close, while pharmacies may open on a rota. Rubbish collections often move by a day in the week
          after a bank holiday. Check local arrangements, especially over Christmas and New Year.
        </p>
      </GuideSection>

      <GuideSection id="shift" n={16} kicker="Other workers" title="Shift workers and the self-employed">
        <p>
          Shift workers in hospitals, care homes, transport, hospitality and retail often work bank holidays. Rotas usually share them out fairly,
          and some contracts give extra pay or a day in lieu. The self-employed have no paid holiday, so bank holidays are simply days they choose
          whether to work. Clients may be closed, so plan invoices and deadlines around them.
        </p>
      </GuideSection>

      <GuideSection id="schools" n={17} kicker="Families" title="Schools and bank holidays">
        <p>
          Schools close on bank holidays, and Easter often falls in or next to the spring holiday. Term dates are set by councils or academy trusts,
          not by the bank holiday list, so the spring half-term usually includes the spring bank holiday but Easter holidays vary.
        </p>
      </GuideSection>

      <GuideSection id="international" n={18} kicker="Comparison" title="Compared with other countries">
        <p>
          England and Wales have fewer public holidays than many European countries, several of which have 11 to 14. The UK statutory minimum of 5.6
          weeks of paid holiday, which can include bank holidays, is broadly similar to the European minimum of four weeks plus public holidays.
        </p>
      </GuideSection>

      <GuideSection id="questions" n={19} kicker="FAQs" title="Common questions">
        <h3>Is Easter Monday a bank holiday in Scotland?</h3>
        <p>No. Scotland has 2 January and St Andrew&rsquo;s Day instead, though some employers give Easter Monday off.</p>
        <h3>Is St Patrick&rsquo;s Day a bank holiday in England?</h3>
        <p>No, only in Northern Ireland.</p>
        <h3>Do shops close on bank holidays?</h3>
        <p>Most open, with shorter hours on some days. Large shops in England and Wales must close on Christmas Day and Easter Sunday.</p>
        <h3>Will there be extra bank holidays?</h3>
        <p>Only if the government announces one, usually for a national event.</p>
        <h3>Is Christmas Eve a bank holiday?</h3>
        <p>No. Christmas Eve and New Year&rsquo;s Eve are normal working days, though many employers close early.</p>
        <h3>When is the next bank holiday?</h3>
        <p>The calculator shows the next one for your nation, counting from today.</p>
        <h3>Does a bank holiday count as a working day for notice periods?</h3>
        <p>It depends on the contract or law involved. Many legal time limits count calendar days, not working days, so check the specific rule.</p>
        <h3>Can my employer make me take annual leave on a bank holiday?</h3>
        <p>Yes, if your contract says bank holidays come out of your annual leave, or if they give you the right notice.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "8", label: "England and Wales" },
            { value: "9", label: "Scotland" },
            { value: "10", label: "Northern Ireland" },
            { value: "5.6 weeks", label: "Statutory paid holiday" },
            { value: "28 days", label: "For a 5-day week" },
            { value: "28 March", label: "Easter Sunday 2027" },
            { value: "253", label: "Working days in 2027, England and Wales" },
            { value: "10 days", label: "Off for 3 days' leave at Christmas" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

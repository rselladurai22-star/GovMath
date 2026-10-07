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

/** Holiday entitlement — the full guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "minimum", title: "The legal minimum" },
  { id: "bank-holidays", title: "Bank holidays" },
  { id: "part-time", title: "Part-time workers" },
  { id: "irregular", title: "Irregular hours and part-year work" },
  { id: "starting-leaving", title: "Starting or leaving mid-year" },
  { id: "holiday-pay", title: "How holiday pay is worked out" },
  { id: "booking", title: "Booking and refusing holiday" },
  { id: "carry-over", title: "Carrying holiday over" },
  { id: "sickness", title: "Sickness and family leave" },
  { id: "hours-table", title: "Holiday in hours" },
  { id: "pay-example", title: "Working out a day’s holiday pay" },
  { id: "leaving-example", title: "Holiday pay when you leave" },
  { id: "mistakes", title: "Common employer mistakes" },
  { id: "holiday-year", title: "Your holiday year" },
  { id: "agency-term", title: "Agency workers and term-time staff" },
  { id: "compressed", title: "Compressed hours and four-day weeks" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Holiday entitlement", href: "https://www.gov.uk/holiday-entitlement-rights" },
  { label: "GOV.UK — Holiday pay: the basics", href: "https://www.gov.uk/holiday-entitlement-rights/holiday-pay-the-basics" },
  { label: "GOV.UK — Holiday pay and entitlement reforms from 1 January 2024", href: "https://www.gov.uk/government/publications/simplifying-holiday-entitlement-and-holiday-pay-calculations/holiday-pay-and-entitlement-reforms-from-1-january-2024" },
  { label: "GOV.UK — Calculate holiday entitlement", href: "https://www.gov.uk/calculate-your-holiday-entitlement" },
  { label: "Acas — Holiday, sickness and leave", href: "https://www.acas.org.uk/checking-holiday-entitlement" },
];

export default function HolidayGuide() {
  return (
    <Guide
      kicker="The holiday guide"
      title="Holiday entitlement, explained clearly"
      intro={
        <>
          Almost every worker in the UK has a legal right to paid holiday, whether full-time, part-time, casual or on a
          zero-hours contract. This guide explains how much you are entitled to, how <a href="/life/bank-holidays">bank holidays</a>{" "}and part-time hours
          work, how holiday pay should be calculated, and what happens when you start or leave a job.
        </>
      }
      meta={["Current rules", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="minimum" n={1} kicker="The basics" title="The legal minimum">
        <p>
          The Working Time Regulations give almost all workers <strong>5.6 weeks of paid holiday</strong>{" "}a year. A
          &ldquo;week&rdquo; means the number of days or hours you normally work in a week, so the entitlement scales
          with your pattern. There is a cap of 28 days, so someone working six days a week still gets 28.
        </p>
        <DataTable
          caption="Statutory holiday by days worked a week"
          head={["Days a week", "Holiday a year", "In weeks"]}
          numeric={[1, 2]}
          rows={[
            ["1", "5.6 days", "5.6"],
            ["2", "11.2 days", "5.6"],
            ["3", "16.8 days", "5.6"],
            ["4", "22.4 days", "5.6"],
            ["5", "28 days", "5.6"],
            ["6", "28 days (cap)", "4.7"],
          ]}
        />
        <p>
          Many employers give more than the minimum, such as 25 days plus bank holidays (33 days in all). Your contract
          sets your actual entitlement, but it can never be less than the legal minimum.
        </p>
      </GuideSection>

      <GuideSection id="bank-holidays" n={2} kicker="Bank holidays" title="Bank holidays">
        <p>
          There is no legal right to have bank holidays off or to be paid extra for working them. Employers can include
          the 8 bank holidays in England and Wales (9 in Scotland, 10 in Northern Ireland) in your 5.6 weeks. That is why
          28 days is often described as &ldquo;20 days plus bank holidays&rdquo;.
        </p>
        <p>
          If you work a bank holiday, whether you get extra pay or a day off in lieu depends on your contract. If your
          workplace closes on bank holidays, your employer can require you to use your holiday for those days.
        </p>
      </GuideSection>

      <GuideSection id="part-time" n={3} kicker="Part-time" title="Part-time workers">
        <p>
          Part-time workers get the same 5.6 weeks off as full-time workers, made up of their own working days. Someone
          working three days a week gets 16.8 days: 5.6 weeks of three-day weeks.
        </p>
        <p>
          Bank holidays are where part-timers are most often short-changed. If you never work Mondays you would miss out
          on most bank holidays, so fair employers pro-rate bank holidays into a total that you book like any other day.
          Part-time workers must not be treated less favourably than comparable full-timers.
        </p>
        <CompareCards
          columns={[
            {
              name: "Full time, 5 days",
              rows: [
                { label: "Contract", value: "25 days + 8 bank holidays" },
                { label: "Total", value: "33 days" },
              ],
            },
            {
              name: "Part time, 3 days",
              rows: [
                { label: "Pro-rated total", value: "33 × 3 ÷ 5 = 19.8 days" },
                { label: "Same weeks off", value: "6.6 weeks" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="irregular" n={4} kicker="Irregular hours" title="Irregular hours and part-year work">
        <p>
          Since holiday years starting on or after 1 April 2024, workers with irregular hours (such as zero-hours or
          casual workers) and part-year workers (such as term-time staff) build up holiday at <strong>12.07%</strong> of
          the hours they work in each pay period.
        </p>
        <WorkedExample
          title="Worked example: 30 hours worked in a pay period"
          steps={[
            { label: "Hours worked", value: "30" },
            { label: "Accrual rate", value: "12.07%" },
          ]}
          total={{ label: "Holiday built up", value: "3.62 hours" }}
        />
        <p>
          The 12.07% comes from 5.6 weeks of holiday divided by the 46.4 weeks of the year you are not on holiday. For
          these workers, employers can also use <strong>rolled-up holiday pay</strong>: an extra 12.07% added to your pay
          for each hour worked, shown separately on your payslip. You then take unpaid time off.
        </p>
      </GuideSection>

      <GuideSection id="starting-leaving" n={5} kicker="Part years" title="Starting or leaving mid-year">
        <p>
          If you start or leave part-way through the holiday year, your entitlement is pro-rated. Starting halfway
          through gives you half the year&rsquo;s holiday.
        </p>
        <p>
          In your <strong>first year</strong>{" "}of a job, holiday builds up at one-twelfth of your annual entitlement at
          the start of each month. Your employer can round up to the nearest half day. After the first year, you can
          take your full year&rsquo;s holiday whenever it is agreed.
        </p>
        <p>
          When you leave, your employer must pay you for any statutory holiday you have built up but not taken. If you
          have taken more than you have built up, they can only take the excess back from your final pay if your contract
          or a written agreement says so.
        </p>
      </GuideSection>

      <GuideSection id="holiday-pay" n={6} kicker="Holiday pay" title="How holiday pay is worked out">
        <p>
          Holiday pay should be your normal pay. For the first four weeks of statutory holiday, &ldquo;normal&rdquo;
          includes regular <a href="/tax-and-salary/overtime">overtime</a>, commission, shift premiums and other payments linked to the work you do.
        </p>
        <p>
          If your pay varies, holiday pay is based on your average pay over the previous 52 weeks in which you were paid,
          ignoring weeks with no pay. If you have worked for less than 52 weeks, the average uses the weeks you have
          worked.
        </p>
        <Callout title="The extra 1.6 weeks">
          The remaining 1.6 weeks of statutory holiday, and any extra contractual holiday, can be paid at basic pay,
          unless your contract says otherwise.
        </Callout>
      </GuideSection>

      <GuideSection id="booking" n={7} kicker="Booking" title="Booking and refusing holiday">
        <Timeline
          items={[
            { when: "Your request", what: "Give notice of twice the length of the holiday", detail: "For a week off, give at least two weeks’ notice, unless your contract sets different rules." },
            { when: "Employer refusal", what: "They can say no with notice of the same length", detail: "To refuse a week off they must tell you at least a week before it was due to start." },
            { when: "Set shutdowns", what: "Employers can tell you when to take holiday", detail: "For example over Christmas, with notice of twice the length of the holiday." },
          ]}
        />
        <p>
          Your employer can refuse a request for business reasons, but they must let you take your full entitlement over
          the year. They cannot replace statutory holiday with extra pay while you are still employed.
        </p>
      </GuideSection>

      <GuideSection id="carry-over" n={8} kicker="Carry over" title="Carrying holiday over">
        <p>
          You must normally take at least 4 of your 5.6 weeks within the holiday year. Your employer can agree to let you
          carry over the remaining 1.6 weeks, and any extra contractual holiday, if your contract allows it.
        </p>
        <p>
          You can carry over more, up to 4 weeks, if you could not take holiday because of sickness or family leave, and
          you have 18 months to use it. If your employer stopped you from taking holiday, or did not tell you about your
          right to take it and that you might lose it, you can also carry it over.
        </p>
      </GuideSection>

      <GuideSection id="sickness" n={9} kicker="Leave" title="Sickness and family leave">
        <ul>
          <li>Holiday continues to build up while you are off sick, and while on maternity, paternity, adoption or <a href="/benefits/shared-parental-leave">shared parental leave</a>.</li>
          <li>If you are ill during booked holiday, you can take it as sick leave instead and rebook the holiday later.</li>
          <li>You can choose to take holiday while off sick, so you receive holiday pay instead of sick pay.</li>
        </ul>
      </GuideSection>

      <GuideSection id="hours-table" n={10} kicker="Reference" title="Holiday in hours">
        <p>
          Many employers record holiday in hours, which is fairer when your days are different lengths. The statutory
          minimum is 5.6 times your weekly hours.
        </p>
        <DataTable
          caption="Statutory holiday in hours"
          head={["Hours a week", "Holiday hours a year"]}
          numeric={[1]}
          rows={[
            ["16", "89.6"],
            ["20", "112"],
            ["30", "168"],
            ["37.5", "210"],
            ["40", "224"],
          ]}
        />
      </GuideSection>

      <GuideSection id="pay-example" n={11} kicker="Example" title="Working out a day’s holiday pay">
        <WorkedExample
          title="Variable pay averaging £520 a week, five-day week"
          steps={[
            { label: "Average weekly pay over the last 52 paid weeks", note: "Including regular overtime and commission", value: "£520.00" },
            { label: "Days worked a week", value: "5" },
          ]}
          total={{ label: "A day’s holiday pay", value: "£104.00" }}
        />
        <p>
          If your employer only pays basic pay of £450 a week for the first four weeks of statutory holiday, they are
          underpaying you by £14 for every day of holiday.
        </p>
      </GuideSection>

      <GuideSection id="leaving-example" n={12} kicker="Example" title="Holiday pay when you leave">
        <WorkedExample
          title="Leaving halfway through the holiday year"
          steps={[
            { label: "Full-year entitlement", value: "28 days" },
            { label: "Built up by the halfway point", note: "28 × 6 ÷ 12", value: "14 days" },
            { label: "Already taken", value: "8 days" },
            { label: "Untaken", value: "6 days" },
            { label: "Daily pay", value: "£110" },
          ]}
          total={{ label: "Holiday pay in your final pay", value: "£660" }}
        />
        <p>
          Your employer can ask you to take untaken holiday during your notice period instead of paying it, if they give
          you enough notice.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={13} kicker="Watch out" title="Common employer mistakes">
        <ul>
          <li>Not pro-rating bank holidays fairly for part-time workers.</li>
          <li>Paying holiday at basic pay when regular overtime or commission should be included.</li>
          <li>Telling irregular-hours workers they have no holiday, or not showing rolled-up pay on payslips.</li>
          <li>Refusing all holiday requests so the year&rsquo;s entitlement cannot be used.</li>
          <li>Not paying untaken holiday in a leaver&rsquo;s final pay.</li>
        </ul>
        <p>
          If you think you have been underpaid, raise it with your employer first, then contact Acas. Claims for unpaid
          holiday pay usually go to an employment tribunal within three months less one day.
        </p>
      </GuideSection>

      <GuideSection id="holiday-year" n={14} kicker="Timing" title="Your holiday year">
        <p>
          Your holiday year is the 12 months over which your entitlement runs. Your contract should say when it starts:
          common choices are 1 January, 1 April or the anniversary of your start date. If your contract does not say, the
          holiday year starts on the anniversary of the day you started.
        </p>
        <p>
          Plan holiday early in the year so you can use it all. Many employers have busy periods when holiday is
          restricted, and requests often cluster around school holidays and Christmas. If you are close to the end of the
          year with holiday left, ask your employer in writing whether you can carry it over, and keep their reply.
        </p>
        <p>
          When you change jobs, your new employer&rsquo;s holiday year applies, and your entitlement for the first part
          year is pro-rated from your start date.
        </p>
      </GuideSection>

      <GuideSection id="agency-term" n={15} kicker="Other workers" title="Agency workers and term-time staff">
        <p>
          <strong>Agency workers</strong> are entitled to paid holiday from the agency that pays them, from their first
          day. After 12 weeks in the same role, they are also entitled to the same holiday as directly recruited staff
          doing the same job, under the Agency Workers Regulations.
        </p>
        <p>
          <strong>Term-time and other part-year workers</strong> build up holiday at 12.07% of the hours they work, so
          they get holiday proportionate to the time they actually work rather than a full 5.6 weeks. Many school staff
          take their holiday during the school holidays, and their pay is often spread across 12 months.
        </p>
        <p>
          If your hours change part-way through the year, for example from five days to three, holiday should be
          recalculated for each part of the year based on the hours in it.
        </p>
      </GuideSection>

      <GuideSection id="compressed" n={16} kicker="Work patterns" title="Compressed hours and four-day weeks">
        <p>
          If you work your full-time hours over fewer days, such as 37.5 hours over four days, your holiday entitlement is
          the same in hours as a five-day worker&rsquo;s, but fewer days. 5.6 weeks of a four-day week is 22.4 days, and each
          day off uses 9.375 hours.
        </p>
        <p>
          This is why holiday in hours is fairer for compressed patterns. A bank holiday that falls on one of your long
          days uses more of your entitlement than one that falls on a shorter day, so employers often convert everything
          to hours. If your employer uses days, check that your total still equals 5.6 times your weekly hours.
        </p>
        <p>
          On a true four-day week, where pay stays the same but hours fall, for example to 32 a week, your statutory
          entitlement is 5.6 × 32 = 179.2 hours, or 22.4 days of 8 hours. Contracts for these schemes usually set out the
          holiday rules in detail.
        </p>
      <p>
          To scale a full-time salary to your hours or days, use the <a href="/tax-and-salary/pro-rata">pro rata salary calculator</a>. To add up the hours you have worked, the <a href="/life/timesheet-decimal">timesheet calculator</a> turns hours and minutes into decimal hours.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={17} kicker="Quick reference" title="Key numbers">
        <KeyStats
          items={[
            { value: "5.6 weeks", label: "Statutory paid holiday a year" },
            { value: "28 days", label: "Maximum statutory holiday" },
            { value: "12.07%", label: "Accrual for irregular hours and part-year workers" },
            { value: "52 weeks", label: "Reference period for variable holiday pay" },
            { value: "4 weeks", label: "Must be taken in the year" },
            { value: "18 months", label: "To use holiday carried over after sickness" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

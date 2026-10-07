import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Salary to hourly: the guide. Figures from src/lib/us/pay.ts (fromSalary, fromHourly) and tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "salary-to-hourly", title: "Salary to hourly" },
  { id: "hourly-to-salary", title: "Hourly to salary" },
  { id: "table", title: "Common salaries as hourly pay" },
  { id: "hourly-table", title: "Common hourly rates as salaries" },
  { id: "periods", title: "Weekly, biweekly and semimonthly" },
  { id: "hours", title: "Your real hours" },
  { id: "time-off", title: "Vacation, holidays and unpaid time off" },
  { id: "minimum-wage", title: "The federal minimum wage" },
  { id: "exempt", title: "Salaried, exempt and overtime" },
  { id: "part-time", title: "Part-time and 37.5-hour weeks" },
  { id: "compare", title: "Comparing job offers" },
  { id: "after-tax", title: "From gross to take-home" },
  { id: "shortcuts", title: "Mental math shortcuts" },
  { id: "raises", title: "Raises in hourly terms" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "U.S. Department of Labor: Minimum wage", href: "https://www.dol.gov/agencies/whd/minimum-wage" },
  { label: "U.S. Department of Labor: State minimum wage laws", href: "https://www.dol.gov/agencies/whd/minimum-wage/state" },
  { label: "U.S. Department of Labor: Overtime pay", href: "https://www.dol.gov/agencies/whd/overtime" },
  { label: "U.S. Department of Labor: Fact Sheet 17A, exemptions for executive, administrative and professional employees", href: "https://www.dol.gov/agencies/whd/fact-sheets/17a-overtime" },
  { label: "U.S. Office of Personnel Management: Federal holidays", href: "https://www.opm.gov/policy-data-oversight/pay-leave/federal-holidays/" },
];

export default function SalaryHourlyGuide() {
  return (
    <Guide
      kicker="The pay conversion guide"
      title="How to convert a salary to an hourly wage"
      intro={
        <>
          Job ads quote pay in different ways: $24 an hour, $50,000 a year, $1,900 every two weeks. This guide shows how to turn any one of them into
          the others, which hours and weeks to use, and how your rate compares with the federal minimum wage.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Hourly rate = yearly salary ÷ (hours a week × weeks a year).</li>
          <li>Yearly salary = hourly rate × hours a week × weeks a year.</li>
          <li>A full-time year is 40 × 52 = 2,080 hours.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$24.04", label: "$50,000 a year, hourly" },
            { value: "$52,000", label: "$25 an hour, yearly" },
            { value: "2,080", label: "Hours in a full-time year" },
            { value: "$15,080", label: "$7.25 an hour, yearly" },
          ]}
        />
      </GuideSection>

      <GuideSection id="salary-to-hourly" n={2} kicker="Method" title="Salary to hourly">
        <p>Divide the salary by the hours you work in a year. For a $50,000 salary and a standard full-time week:</p>
        <WorkedExample
          title="$50,000 a year, 40 hours a week"
          steps={[
            { label: "Hours a year: 40 × 52", value: "2,080" },
            { label: "$50,000 ÷ 2,080", value: "$24.04" },
          ]}
          total={{ label: "Hourly rate", value: "$24.04" }}
        />
      </GuideSection>

      <GuideSection id="hourly-to-salary" n={3} kicker="Method" title="Hourly to salary">
        <p>Multiply the other way. $25 an hour for 40 hours a week is $1,000 a week, and 52 of those weeks make $52,000 a year.</p>
        <WorkedExample
          title="$25 an hour, 40 hours a week"
          steps={[
            { label: "Weekly: $25 × 40", value: "$1,000" },
            { label: "Yearly: $1,000 × 52", value: "$52,000" },
            { label: "Monthly: $52,000 ÷ 12", value: "$4,333.33" },
          ]}
          total={{ label: "Yearly salary", value: "$52,000" }}
        />
      </GuideSection>

      <GuideSection id="table" n={4} kicker="Reference" title="Common salaries as hourly pay">
        <DataTable
          caption="Before tax, 40 hours a week, 52 weeks"
          head={["Salary", "Hourly", "Weekly", "Monthly"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["$30,000", "$14.42", "$576.92", "$2,500"],
            ["$40,000", "$19.23", "$769.23", "$3,333.33"],
            ["$50,000", "$24.04", "$961.54", "$4,166.67"],
            ["$60,000", "$28.85", "$1,153.85", "$5,000"],
            ["$75,000", "$36.06", "$1,442.31", "$6,250"],
            ["$100,000", "$48.08", "$1,923.08", "$8,333.33"],
            ["$150,000", "$72.12", "$2,884.62", "$12,500"],
          ]}
        />
      </GuideSection>

      <GuideSection id="hourly-table" n={5} kicker="Reference" title="Common hourly rates as salaries">
        <DataTable
          caption="Before tax, 40 hours a week, 52 weeks"
          head={["Hourly", "Yearly", "Monthly"]}
          numeric={[0, 1, 2]}
          rows={[
            ["$7.25", "$15,080", "$1,256.67"],
            ["$10", "$20,800", "$1,733.33"],
            ["$15", "$31,200", "$2,600"],
            ["$20", "$41,600", "$3,466.67"],
            ["$25", "$52,000", "$4,333.33"],
            ["$30", "$62,400", "$5,200"],
            ["$40", "$83,200", "$6,933.33"],
            ["$50", "$104,000", "$8,666.67"],
          ]}
        />
      </GuideSection>

      <GuideSection id="periods" n={6} kicker="Paychecks" title="Weekly, biweekly and semimonthly">
        <p>
          The pay period changes the size of each check, not your yearly pay. On $50,000 a year, a biweekly check (26 a year) is $1,923.08 before tax and a
          semimonthly check (24 a year, often on the 15th and the last day of the month) is $2,083.33. Biweekly payers hand out a third check in two months
          of each year, which is handy for budgeting if you plan your bills around two checks a month.
        </p>
      </GuideSection>

      <GuideSection id="hours" n={7} kicker="Accuracy" title="Your real hours">
        <p>
          The answer is only as good as the hours you enter. A salaried job with a 40-hour contract that regularly runs to 45 hours pays less per hour than it
          looks. $60,000 a year is $28.85 an hour at 40 hours a week, but $25.64 at 45 hours: the same pay spread over more time.
        </p>
        <CompareCards
          columns={[
            {
              name: "$60,000 at 40 hours",
              rows: [
                { label: "Hours a year", value: "2,080" },
                { label: "Hourly", value: "$28.85" },
              ],
            },
            {
              name: "$60,000 at 45 hours",
              rows: [
                { label: "Hours a year", value: "2,340" },
                { label: "Hourly", value: "$25.64" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="time-off" n={8} kicker="Time off" title="Vacation, holidays and unpaid time off">
        <p>
          If you are paid for vacation and holidays, keep the year at 52 weeks: you are paid for all of them. There are 11 federal holidays, but private
          employers do not have to give them as paid days off, and no federal law requires paid vacation. If your time off is unpaid, take it out. $25 an hour
          over 50 paid weeks instead of 52 is $50,000 a year rather than $52,000. Enter unpaid days under More options.
        </p>
      </GuideSection>

      <GuideSection id="minimum-wage" n={9} kicker="The floor" title="The federal minimum wage">
        <p>
          The federal minimum wage under the Fair Labor Standards Act is $7.25 an hour, unchanged since July 2009. Full time, that is $290 a week and $15,080 a
          year. Many states and cities set a higher minimum, and when they do, the higher one applies. Tipped employees can be paid a lower cash wage if tips
          bring them up to the minimum. The Department of Labor keeps a list of state rates.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={10} kicker="Overtime" title="Salaried, exempt and overtime">
        <p>
          Being paid a salary does not on its own take away your right to overtime. To be exempt as an executive, administrative or professional employee, you
          must usually be paid at least $684 a week ($35,568 a year) and do work that meets the duties tests. A 2024 rule that would have raised this level
          was struck down by a federal court, and the Department of Labor now applies the $684 figure. If you are non-exempt, hours over 40 in a week are paid
          at time and a half: see the <a href="/us/taxes/overtime-calculator">overtime calculator</a>.
        </p>
        <Callout tone="warn" title="Check your hourly rate on a salary">
          $35,568 a year at 50 hours a week works out to $13.68 an hour. A salaried worker below the $684 a week level who works those hours should be getting
          overtime pay on top.
        </Callout>
      </GuideSection>

      <GuideSection id="part-time" n={11} kicker="Other schedules" title="Part-time and 37.5-hour weeks">
        <p>
          Use your own hours. $20 an hour for 30 hours a week is $600 a week and $31,200 a year. Some employers quote salaries on a 37.5-hour week, where
          $50,000 a year is $25.64 an hour instead of $24.04.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={12} kicker="Job offers" title="Comparing job offers">
        <p>When you weigh a salaried offer against an hourly one, convert both to the same period and the same hours, then look at what comes with the pay:</p>
        <ul>
          <li>Health insurance: the employer&rsquo;s share of premiums can be worth thousands of dollars a year.</li>
          <li>Retirement: a 401(k) match is extra pay. See the <a href="/us/savings/401k-calculator">401(k) calculator</a>.</li>
          <li>Paid time off, sick days and holidays.</li>
          <li>Overtime: hourly and non-exempt workers are paid for extra hours; exempt salaried staff are not.</li>
        </ul>
      </GuideSection>

      <GuideSection id="after-tax" n={13} kicker="Take-home" title="From gross to take-home">
        <p>
          Every figure here is gross pay, before tax. Federal income tax, Social Security (6.2%), Medicare (1.45%) and any state or local income tax come out
          of each check, along with any 401(k) or health insurance deductions. The <a href="/us/taxes/paycheck-calculator">paycheck calculator</a> shows
          your take-home pay, and the <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a> shows which bracket your pay falls in.
        </p>
      </GuideSection>

      <GuideSection id="shortcuts" n={14} kicker="Quick estimates" title="Mental math shortcuts">
        <ul>
          <li>Hourly to yearly: double it and add three zeros. $20 an hour is about $40,000 (exactly $41,600 at 2,080 hours).</li>
          <li>Yearly to hourly: halve it and drop three zeros. $60,000 is about $30 an hour (exactly $28.85).</li>
          <li>Monthly from yearly: divide by 12. Weekly: divide by 52.</li>
        </ul>
        <p>The shortcuts assume 2,000 hours a year, so they run about 4% off. Use the calculator for the exact figure.</p>
      </GuideSection>

      <GuideSection id="raises" n={15} kicker="Pay rises" title="Raises in hourly terms">
        <p>
          A raise quoted as an hourly figure grows a lot over a year. Every extra $1 an hour is worth $2,080 a year at 40 hours a week, before tax. Going from
          $20 to $25 an hour lifts full-time pay from $41,600 to $52,000. Turned around, a $5,000 raise on a salary is about $2.40 an hour at 2,080 hours.
          When you negotiate, it helps to know both numbers: the hourly figure sounds small, while the yearly figure shows what it adds to your budget and to
          any 401(k) contributions set as a share of pay.
        </p>
        <p>
          If your raise comes with longer hours, convert the new pay at the new hours before you compare. A move from $50,000 at 40 hours to $55,000 at 45
          hours is a raise in yearly pay, but your hourly rate falls from $24.04 to $23.50.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={16} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "2,080", label: "Hours in a 40-hour, 52-week year" },
            { value: "$7.25", label: "Federal minimum wage an hour" },
            { value: "$684", label: "Weekly salary level for the overtime exemption" },
            { value: "26 / 24", label: "Biweekly / semimonthly checks a year" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Overtime: the guide. Figures from src/lib/us/pay.ts (overtimeWeek, overtimeSaving), tax-2026.ts (overtimeDeduction) and pay-extra.ts (californiaWeek). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "time-and-a-half", title: "How time and a half works" },
  { id: "workweek", title: "The 40-hour workweek" },
  { id: "double-time", title: "Double time" },
  { id: "regular-rate", title: "What counts in your regular rate" },
  { id: "exempt", title: "Exempt and non-exempt workers" },
  { id: "threshold", title: "The salary threshold in 2026" },
  { id: "california", title: "California and daily overtime" },
  { id: "deduction", title: "No tax on overtime: the deduction" },
  { id: "premium", title: "Only the premium counts" },
  { id: "phase-out", title: "The income phase-out" },
  { id: "saving", title: "What the deduction is worth" },
  { id: "w2", title: "Form W-2, code TT and your return" },
  { id: "withholding", title: "Withholding and your paycheck" },
  { id: "salaried", title: "Salaried workers and overtime" },
  { id: "comp-time", title: "Comp time, tips and other cases" },
  { id: "records", title: "Keep your own records" },
  { id: "after-tax", title: "What overtime is worth after tax" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "U.S. Department of Labor: Overtime pay", href: "https://www.dol.gov/agencies/whd/overtime" },
  { label: "U.S. Department of Labor: Fact Sheet 23, overtime pay requirements of the FLSA", href: "https://www.dol.gov/agencies/whd/fact-sheets/23-flsa-overtime-pay" },
  { label: "U.S. Department of Labor: Fact Sheet 17A, exemptions for executive, administrative and professional employees", href: "https://www.dol.gov/agencies/whd/fact-sheets/17a-overtime" },
  { label: "IRS: One, Big, Beautiful Bill Act tax deductions for working Americans and seniors", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors" },
  { label: "IRS: One, Big, Beautiful Bill provisions", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions" },
  { label: "California Department of Industrial Relations: Overtime FAQ", href: "https://www.dir.ca.gov/dlse/faq_overtime.htm" },
];

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export default function OvertimeGuide() {
  return (
    <Guide
      kicker="The overtime guide"
      title="Overtime pay and the new overtime deduction"
      intro={
        <>
          Federal law says most hourly workers earn time and a half for hours over 40 in a week. From 2025 to 2028, part of that overtime also comes off your
          taxable income. This guide explains how overtime is worked out, who is owed it, the salary threshold in 2026 and what the deduction is worth.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Overtime rate = regular rate × 1.5. Overtime pay = overtime rate × hours over 40.</li>
          <li>Federal overtime starts after 40 hours in a workweek, not after 8 hours in a day (California and a few other states differ).</li>
          <li>For 2025 to 2028 you can deduct the extra half of time and a half, up to $12,500 a year ($25,000 joint), with a phase-out above $150,000 ($300,000 joint).</li>
          <li>Salaried workers paid under $684 a week are usually owed overtime too.</li>
        </ul>
        <KeyStats
          items={[
            { value: "1.5×", label: "Federal overtime rate" },
            { value: "40", label: "Hours a week before overtime" },
            { value: "$12,500", label: "Most you can deduct ($25,000 joint)" },
            { value: "$684", label: "Weekly salary level for exemption" },
          ]}
        />
      </GuideSection>

      <GuideSection id="time-and-a-half" n={2} kicker="Method" title="How time and a half works">
        <p>
          Your overtime rate is one and a half times your regular rate. Each overtime hour is paid at that rate. The &ldquo;half&rdquo; is the overtime
          premium: the extra you earn on top of straight time.
        </p>
        <WorkedExample
          title="$20 an hour, 50 hours in the week"
          steps={[
            { label: "Regular pay: 40 × $20", value: "$800" },
            { label: "Overtime rate: $20 × 1.5", value: "$30" },
            { label: "Overtime pay: 10 × $30", value: "$300" },
            { label: "Of which premium: 10 × $10", value: "$100" },
          ]}
          total={{ label: "Week's pay before tax", value: "$1,100" }}
        />
        <p>Each extra hour of overtime adds $30 to the week at this rate:</p>
        <Bars
          format={usd}
          items={[
            { label: "No overtime", value: 800 },
            { label: "5 hours", value: 950 },
            { label: "10 hours", value: 1100 },
            { label: "15 hours", value: 1250 },
            { label: "20 hours", value: 1400 },
          ]}
        />
      </GuideSection>

      <GuideSection id="workweek" n={3} kicker="The rules" title="The 40-hour workweek">
        <p>
          Under the Fair Labor Standards Act (FLSA), overtime is due for hours worked over 40 in a workweek. A workweek is a fixed, repeating period of 168
          hours (seven days in a row) that your employer chooses. It does not have to match the calendar week, but it cannot be changed to avoid overtime.
        </p>
        <ul>
          <li>Each week stands alone. Your employer cannot average 50 hours one week and 30 the next to avoid paying overtime.</li>
          <li>Federal law does not require extra pay for weekends, holidays or nights, unless those hours push you over 40 in the week.</li>
          <li>Paid time off you did not work, such as a holiday, does not count toward the 40 hours under federal law, though some employers count it.</li>
          <li>Overtime must be paid even if your employer did not approve it in advance, as long as it allowed you to work the hours.</li>
        </ul>
      </GuideSection>

      <GuideSection id="double-time" n={4} kicker="Higher rates" title="Double time">
        <p>
          Federal law never requires double time. It comes from state law (California is the main example), a union contract or your employer&rsquo;s own
          policy. When it applies, those hours are paid at twice your regular rate.
        </p>
        <WorkedExample
          title="$30 an hour: 40 regular, 8 overtime, 4 double-time hours"
          steps={[
            { label: "Regular: 40 × $30", value: "$1,200" },
            { label: "Overtime: 8 × $45", value: "$360" },
            { label: "Double time: 4 × $60", value: "$240" },
          ]}
          total={{ label: "Week's pay before tax", value: "$1,800" }}
        />
        <p>
          Of the $600 earned above straight time, only $180 is the federal premium (half the $30 rate for each of the 12 hours over 40). That is the figure
          that counts for the tax deduction.
        </p>
      </GuideSection>

      <GuideSection id="regular-rate" n={5} kicker="The rules" title="What counts in your regular rate">
        <p>
          Overtime is worked out on your &ldquo;regular rate&rdquo;, which can be more than your base hourly wage. It includes most pay you receive for
          work, such as shift differentials, commissions and nondiscretionary bonuses (bonuses promised for hitting targets or attendance). It leaves out
          discretionary gifts, expense reimbursements and pay for time not worked, such as vacation.
        </p>
        <p>
          If you earn a $50 production bonus in a 50-hour week, that bonus raises your regular rate for the week by $1 an hour ($50 ÷ 50 hours), and the 10
          overtime hours earn an extra half of that dollar each.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={6} kicker="Who is covered" title="Exempt and non-exempt workers">
        <p>
          Most hourly workers are non-exempt and must be paid overtime. Exempt workers are not owed overtime. To be exempt as an executive, administrative or
          professional employee, three tests must all be met:
        </p>
        <ul>
          <li>Salary basis: you are paid a set salary that does not go down when you work less.</li>
          <li>Salary level: at least $684 a week ($35,568 a year).</li>
          <li>Duties: your main work is management, office work tied to running the business with independent judgment, or work that needs advanced knowledge.</li>
        </ul>
        <p>
          Job titles do not decide it: an &ldquo;assistant manager&rdquo; who mostly runs a register may still be owed overtime. Some workers have their
          own rules, including outside sales staff, certain computer professionals, teachers, doctors and lawyers, some farm workers and some transport workers.
        </p>
      </GuideSection>

      <GuideSection id="threshold" n={7} kicker="2026" title="The salary threshold in 2026">
        <Timeline
          items={[
            { when: "January 2020", what: "$684 a week takes effect", detail: "The 2019 rule set the salary level at $684 a week and the highly compensated level at $107,432 a year." },
            { when: "July 2024", what: "First step of the 2024 rule", detail: "A new rule raised the level to $844 a week, with $1,128 planned for January 2025." },
            { when: "November 2024", what: "A federal court vacates the 2024 rule", detail: "The Eastern District of Texas struck the whole rule down, so the 2019 levels applied again." },
            { when: "May 2026", what: "The 2024 rule is removed", detail: "The Department of Labor took the vacated rule out of the regulations, confirming the $684 level." },
          ]}
        />
        <p>
          In 2026, then, a salaried worker generally needs at least $684 a week ($35,568 a year) to be exempt. Highly compensated employees earning at least
          $107,432 a year, including at least $684 a week in salary, need to meet only part of a duties test. Some states set higher salary levels, such as
          California, Colorado, New York and Washington; the higher one applies.
        </p>
      </GuideSection>

      <GuideSection id="california" n={8} kicker="State rules" title="California and daily overtime">
        <p>California counts overtime by the day as well as the week:</p>
        <ul>
          <li>Time and a half for hours over 8 in a workday (up to 12) and over 40 in a workweek.</li>
          <li>Double time for hours over 12 in a workday.</li>
          <li>On the seventh day worked in a row in a workweek, time and a half for the first 8 hours and double time after that.</li>
        </ul>
        <CompareCards
          columns={[
            {
              name: "Federal rules",
              rows: [
                { label: "Four 12.5-hour days at $20", value: "50 hours" },
                { label: "Regular / overtime / double", value: "40 / 10 / 0" },
                { label: "Week's pay", value: "$1,100" },
              ],
            },
            {
              name: "California rules",
              rows: [
                { label: "Four 12.5-hour days at $20", value: "50 hours" },
                { label: "Regular / overtime / double", value: "32 / 16 / 2" },
                { label: "Week's pay", value: "$1,200" },
              ],
            },
          ]}
        />
        <p>
          A few other states, such as Alaska, Nevada and Colorado, also have daily overtime rules with their own conditions. When state and federal law
          differ, you get whichever rule pays more. For the tax deduction, though, only the federal premium counts: in the California week above, $100.
        </p>
      </GuideSection>

      <GuideSection id="deduction" n={9} kicker="Tax" title="No tax on overtime: the deduction">
        <p>
          The One Big Beautiful Bill Act (Public Law 119-21) added a deduction for qualified overtime compensation for tax years 2025 through 2028. The main
          rules, as the IRS sets them out:
        </p>
        <ul>
          <li>You can deduct up to $12,500 a year, or $25,000 on a joint return.</li>
          <li>It is a deduction, not an exclusion: overtime is still income, and it lowers the income your federal tax is worked out on.</li>
          <li>You can claim it whether you take the standard deduction or itemize.</li>
          <li>You need a valid Social Security number on the return, and married couples must file jointly.</li>
          <li>It applies to federal income tax only. Social Security and Medicare still apply, and states decide for themselves.</li>
        </ul>
        <p>
          Workers who earn tips have a separate deduction of up to $25,000 for qualified tips; see the <a href="/us/taxes/tip-calculator">tip calculator</a>{" "}
          guide.
        </p>
      </GuideSection>

      <GuideSection id="premium" n={10} kicker="Tax" title="Only the premium counts">
        <p>
          Qualified overtime compensation is the pay above your regular rate that section 7 of the FLSA requires: the half in time and a half. The straight
          time part of each overtime hour is taxed as usual. In the $20-an-hour example, 10 overtime hours earn $300, but only $100 is deductible.
        </p>
        <Callout tone="warn" title="Overtime that does not qualify">
          Overtime paid only because of state law, a union contract or company policy, such as California&rsquo;s daily overtime or double time, does not
          count beyond the federal half. Nor does overtime paid to exempt employees, who are not owed it under the FLSA.
        </Callout>
      </GuideSection>

      <GuideSection id="phase-out" n={11} kicker="Tax" title="The income phase-out">
        <p>
          The $12,500 limit ($25,000 joint) falls by $100 for each $1,000, or part of $1,000, of modified AGI above $150,000 ($300,000 joint). Because any part
          of $1,000 counts, $500 over the line already costs $100.
        </p>
        <DataTable
          caption="The most you can deduct, by modified AGI"
          head={["Filing", "Modified AGI", "Most you can deduct"]}
          numeric={[1, 2]}
          rows={[
            ["Single", "$150,000", "$12,500"],
            ["Single", "$150,500", "$12,400"],
            ["Single", "$180,000", "$9,500"],
            ["Single", "$275,000", "$0"],
            ["Joint", "$320,000", "$23,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="saving" n={12} kicker="Tax" title="What the deduction is worth">
        <p>The tax you save is the deduction times your top tax rate, so the same overtime is worth more in a higher bracket.</p>
        <WorkedExample
          title="$20 an hour, 10 overtime hours a week for 50 weeks, single"
          steps={[
            { label: "Regular pay: $20 × 40 × 52", value: "$41,600" },
            { label: "Overtime pay: $300 × 50", value: "$15,000" },
            { label: "Qualified premium: $100 × 50", value: "$5,000" },
            { label: "Top tax rate", value: "12%" },
          ]}
          total={{ label: "Federal income tax saved", value: "$600" }}
        />
        <p>
          The same household filing jointly (one earner, no other income) sits in the 10% bracket and saves $500. A single worker at $35 an hour with 15
          overtime hours a week for 50 weeks earns a $13,125 premium, deducts the $12,500 limit and saves $2,750 at 22%. The{" "}
          <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a> shows your top rate.
        </p>
      </GuideSection>

      <GuideSection id="w2" n={13} kicker="Filing" title="Form W-2, code TT and your return">
        <p>
          From tax year 2026, employers report qualified overtime compensation on Form W-2 in box 12 with code TT. You cannot claim more than that figure.
          For 2025, the first year, employers did not have to report it separately, and the IRS let workers work it out from pay stubs or other records. You
          claim the deduction on your Form 1040 return; the <a href="/us/taxes/federal-income-tax">federal income tax calculator</a> shows the effect on your
          refund or balance due.
        </p>
      </GuideSection>

      <GuideSection id="withholding" n={14} kicker="Paychecks" title="Withholding and your paycheck">
        <p>
          Your employer withholds federal income tax on overtime the same way as on other wages, along with Social Security (6.2%) and Medicare (1.45%). A
          big overtime check can be withheld at a higher rate than usual because payroll treats it as if you earned that much every period; the difference
          comes back when you file. If you work steady overtime, you can update Form W-4 to account for the deduction and keep more in each check. The{" "}
          <a href="/us/taxes/paycheck-calculator">paycheck calculator</a> shows your take-home pay.
        </p>
      </GuideSection>

      <GuideSection id="salaried" n={15} kicker="Salaried workers" title="Salaried workers and overtime">
        <p>
          A salary below $684 a week does not make you exempt. A salaried, non-exempt worker&rsquo;s regular rate is usually the weekly salary divided by
          the hours it is meant to cover. For a $35,568 salary meant for 40 hours, that is $17.10 an hour, so overtime is $25.65 an hour. Use the{" "}
          <a href="/us/taxes/salary-to-hourly">salary to hourly calculator</a> to find your rate first.
        </p>
      </GuideSection>

      <GuideSection id="comp-time" n={16} kicker="Special cases" title="Comp time, tips and other cases">
        <ul>
          <li>
            <strong>Comp time.</strong> Private employers must pay overtime in cash. Only state and local government employers can give compensatory time off
            instead, at one and a half hours for each overtime hour.
          </li>
          <li>
            <strong>Tipped workers.</strong> Overtime is worked out on the full minimum wage, not the lower cash wage, so the overtime cash rate is higher
            than 1.5 times the cash wage.
          </li>
          <li>
            <strong>Two jobs with one employer.</strong> Hours in different roles for the same employer are added together for the 40-hour test.
          </li>
          <li>
            <strong>Fluctuating workweek.</strong> Some salaried, non-exempt workers with varying hours are paid half-time for overtime under this method,
            which needs a clear agreement and a fixed salary.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="records" n={17} kicker="Your rights" title="Keep your own records">
        <p>
          Employers must keep records of hours worked, but your own log of start and finish times is useful if your pay looks wrong. If you think you have
          been underpaid, raise it with payroll first. You can also contact the Department of Labor&rsquo;s Wage and Hour Division, which can recover back
          pay, usually for up to two years (three if the violation was willful).
        </p>
      </GuideSection>

      <GuideSection id="after-tax" n={18} kicker="Take-home" title="What overtime is worth after tax">
        <p>
          Overtime is taxed like the rest of your pay, so the extra money you keep depends on your bracket, payroll taxes and your state. Take the single
          worker at $20 an hour with 10 overtime hours a week for 50 weeks. The overtime adds $15,000 of pay. Without the deduction, it would add $1,800 of
          federal income tax; with the $5,000 deduction, it adds $1,200. Social Security and Medicare take another $1,147.50.
        </p>
        <WorkedExample
          title="$15,000 of overtime pay in 2026, single, no state tax"
          steps={[
            { label: "Overtime pay", value: "$15,000" },
            { label: "Extra federal income tax (after the deduction)", value: "−$1,200" },
            { label: "Social Security and Medicare (7.65%)", value: "−$1,147.50" },
          ]}
          total={{ label: "Kept before any state tax", value: "$12,652.50" }}
        />
        <p>
          A state income tax would take a little more. Overtime is still worth working for most people: every extra hour pays more than a regular one, and
          the deduction makes each one worth a bit more again through 2028.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "40 hours", label: "Federal overtime starts after" },
            { value: "1.5×", label: "Federal overtime rate" },
            { value: "$684 / week", label: "Salary level for exemption ($35,568 a year)" },
            { value: "$107,432", label: "Highly compensated employee level" },
            { value: "$12,500", label: "Overtime deduction limit ($25,000 joint)" },
            { value: "$150,000", label: "Phase-out starts ($300,000 joint)" },
            { value: "2025–2028", label: "Years the deduction applies" },
            { value: "Code TT", label: "W-2 box 12, from 2026" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

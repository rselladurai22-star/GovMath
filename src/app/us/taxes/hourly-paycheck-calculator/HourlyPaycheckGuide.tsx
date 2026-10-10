import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Hourly paycheck: the guide. Figures from src/lib/us/credits-payroll.ts (hourlyPaycheck), which runs paycheck() in pay.ts with 2026 rates. */


const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "gross", title: "From hourly rate to gross pay" },
  { id: "example", title: "A $20-an-hour paycheck, line by line" },
  { id: "federal", title: "Federal income tax on hourly pay" },
  { id: "fica", title: "Social Security and Medicare" },
  { id: "state", title: "State income tax" },
  { id: "rates", title: "Take-home at common hourly rates" },
  { id: "part-time", title: "Part-time or full-time" },
  { id: "overtime", title: "Overtime pay" },
  { id: "deduction", title: "The overtime deduction" },
  { id: "withholding-spikes", title: "Why overtime weeks look heavily taxed" },
  { id: "after-tax-wage", title: "Your after-tax hourly wage" },
  { id: "frequency", title: "Weekly, biweekly or monthly" },
  { id: "unpaid", title: "Unpaid time off" },
  { id: "k401", title: "401(k) and benefits" },
  { id: "children", title: "Children and your W-4" },
  { id: "minimum", title: "Minimum wage" },
  { id: "two-jobs", title: "Two jobs" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: Publication 15-T, Federal Income Tax Withholding Methods", href: "https://www.irs.gov/publications/p15t" },
  { label: "IRS: Rev. Proc. 2025-32, 2026 inflation adjustments", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "IRS: Tax Withholding Estimator", href: "https://www.irs.gov/individuals/tax-withholding-estimator" },
  { label: "Social Security Administration: 2026 contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
  { label: "U.S. Department of Labor: Overtime pay", href: "https://www.dol.gov/agencies/whd/overtime" },
  { label: "U.S. Department of Labor: State minimum wage laws", href: "https://www.dol.gov/agencies/whd/minimum-wage/state" },
  { label: "IRS: One, Big, Beautiful Bill Act deductions for working Americans", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-act-tax-deductions-for-working-americans-and-seniors" },
];

export default function HourlyPaycheckGuide() {
  return (
    <Guide
      kicker="The hourly pay guide"
      title="How an hourly paycheck is worked out"
      intro={
        <>
          If you are paid by the hour, your paycheck changes with your hours. This guide shows how your rate becomes gross pay, what comes out for tax, how
          overtime is paid and taxed, and how much you really keep for each hour you work in 2026.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Gross pay = hourly rate × regular hours + 1.5 × rate × overtime hours, for each week in the pay period.</li>
          <li>Out come federal income tax, 6.2% Social Security, 1.45% Medicare and any state or local tax.</li>
          <li>At $20 an hour, 40 hours, paid every two weeks in Texas, you take home about $1,369 a paycheck.</li>
          <li>That is about $17.12 for every hour you work.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$1,369", label: "Biweekly take-home at $20/h, 40 h, Texas" },
            { value: "$17.12", label: "Kept per hour worked" },
            { value: "7.65%", label: "Social Security plus Medicare" },
            { value: "1.5×", label: "Federal overtime rate" },
          ]}
        />
      </GuideSection>

      <GuideSection id="gross" n={2} kicker="Method" title="From hourly rate to gross pay">
        <p>
          Gross pay is what you earn before anything comes out. Multiply your hourly rate by your hours for the week, add overtime, then multiply by the weeks
          in your pay period: one for weekly pay, two for biweekly. For pay twice a month, your employer usually works out a yearly figure and divides by 24.
        </p>
        <p>
          A full-time year is 2,080 hours (40 × 52). At $20 an hour that is $41,600. Use the{" "}
          <a href="/us/taxes/salary-to-hourly">salary to hourly calculator</a>{" "}to compare an hourly job with a salaried one, and the{" "}
          <a href="/everyday/timesheet-decimal">timesheet calculator</a>{" "}to add up a week of start and finish times.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A $20-an-hour paycheck, line by line">
        <WorkedExample
          title="$20 an hour, 40 hours a week, biweekly, single, Texas"
          steps={[
            { label: "Gross pay: $20 × 40 × 2", value: "$1,600.00" },
            { label: "Federal income tax", value: "−$108.15" },
            { label: "Social Security (6.2%)", value: "−$99.20" },
            { label: "Medicare (1.45%)", value: "−$23.20" },
            { label: "Texas income tax", value: "$0.00" },
          ]}
          total={{ label: "Take-home pay", value: "$1,369.45" }}
        />
        <p>Over a year that is $35,606 of take-home pay from $41,600 of gross pay. About 14.4% goes in tax.</p>
      </GuideSection>

      <GuideSection id="federal" n={4} kicker="Tax" title="Federal income tax on hourly pay">
        <p>
          Your employer turns each paycheck into a yearly figure, takes off the 2026 standard deduction ($16,100 single, $32,200 married filing jointly), works
          out the tax with the brackets and divides it back to one paycheck. At $41,600 a year, single, the taxable income is $25,500: 10% on the first $12,400
          and 12% on the rest, about $2,812 a year or $108.15 a paycheck.
        </p>
      </GuideSection>

      <GuideSection id="fica" n={5} kicker="Tax" title="Social Security and Medicare">
        <p>
          Social Security takes 6.2% of every dollar you earn, up to $184,500 in 2026, and Medicare takes 1.45% with no cap. Together they are 7.65%: $122.40
          of a $1,600 paycheck. There is no standard deduction for these taxes, so they start on your first dollar of pay. Your employer pays the same amount
          again on top; see the <a href="/us/taxes/payroll-tax-calculator">employer payroll tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="state" n={6} kicker="Tax" title="State income tax">
        <p>Nine states do not tax wages. Elsewhere, the same $20-an-hour job pays less:</p>
        <Bars
          format={(n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          items={[
            { label: "Texas", value: 1369.45 },
            { label: "California", value: 1323.77 },
            { label: "New York", value: 1306.01 },
            { label: "Illinois", value: 1295.81 },
          ]}
        />
        <p>
          California&rsquo;s figure includes the 1.3% state disability insurance (SDI) taken from wages. Some cities and counties add their own income tax,
          such as New York City, Philadelphia and many Ohio cities; add it under More options.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={7} kicker="Table" title="Take-home at common hourly rates">
        <DataTable
          caption="40 hours a week, biweekly, single, Texas, 2026"
          head={["Hourly rate", "Gross per paycheck", "Take-home per paycheck", "Kept per hour"]}
          numeric={[1, 2, 3]}
          rows={[
            ["$7.25", "$580.00", "$535.63", "$6.70"],
            ["$15", "$1,200.00", "$1,048.05", "$13.10"],
            ["$20", "$1,600.00", "$1,369.45", "$17.12"],
            ["$25", "$2,000.00", "$1,690.85", "$21.14"],
            ["$30", "$2,400.00", "$2,012.25", "$25.15"],
            ["$40", "$3,200.00", "$2,590.82", "$32.39"],
          ]}
        />
      </GuideSection>

      <GuideSection id="part-time" n={8} kicker="Hours" title="Part-time or full-time">
        <p>
          Fewer hours mean a smaller paycheck, but a slightly bigger share kept, because more of your pay sits under the standard deduction. At $20 an hour in
          Texas, paid biweekly:
        </p>
        <DataTable
          caption="$20 an hour, single, Texas, 2026"
          head={["Hours a week", "Take-home per paycheck", "Share lost to tax", "Kept per hour"]}
          numeric={[1, 2, 3]}
          rows={[
            ["20", "$720.72", "9.9%", "$18.02"],
            ["25", "$885.42", "11.5%", "$17.71"],
            ["30", "$1,048.05", "12.7%", "$17.47"],
            ["35", "$1,208.75", "13.7%", "$17.27"],
            ["40", "$1,369.45", "14.4%", "$17.12"],
          ]}
        />
        <p>
          Part-time jobs often come without employer health insurance or a 401(k) match, which can matter more than the tax difference.
        </p>
      </GuideSection>

      <GuideSection id="overtime" n={9} kicker="Overtime" title="Overtime pay">
        <p>
          Under the Fair Labor Standards Act, most hourly workers earn at least 1.5 times their regular rate for hours over 40 in a workweek. At $20 an hour,
          each overtime hour pays $30.
        </p>
        <CompareCards
          columns={[
            {
              name: "40 hours",
              rows: [
                { label: "Week's gross pay", value: "$800" },
                { label: "Biweekly take-home", value: "$1,369.45" },
                { label: "Kept per hour", value: "$17.12" },
              ],
            },
            {
              name: "45 hours",
              rows: [
                { label: "Week's gross pay", value: "$950" },
                { label: "Biweekly take-home", value: "$1,610.50" },
                { label: "Kept per hour", value: "$17.89" },
              ],
            },
            {
              name: "50 hours",
              rows: [
                { label: "Week's gross pay", value: "$1,100" },
                { label: "Biweekly take-home", value: "$1,851.55" },
                { label: "Kept per hour", value: "$18.52" },
              ],
            },
          ]}
        />
        <p>
          Some states, such as California, also pay overtime after 8 hours in a day. The <a href="/us/taxes/overtime-calculator">overtime calculator</a>{" "}
          covers daily overtime and double time.
        </p>
      </GuideSection>

      <GuideSection id="deduction" n={10} kicker="Tax" title="The overtime deduction">
        <p>
          From 2025 to 2028 you can deduct the overtime premium, the extra half of time and a half, up to $12,500 a year ($25,000 joint). It lowers federal
          income tax only, and payroll does not take it into account, so it shows up as a bigger refund or a smaller bill when you file.
        </p>
        <WorkedExample
          title="$20 an hour, 5 overtime hours every week, single"
          steps={[
            { label: "Overtime premium: $10 × 5 × 52", value: "$2,600" },
            { label: "Top tax rate", value: "12%" },
          ]}
          total={{ label: "Federal tax saved when you file", value: "$312" }}
        />
        <p>With 10 overtime hours a week the premium doubles to $5,200 and the saving to $624.</p>
      </GuideSection>

      <GuideSection id="withholding-spikes" n={11} kicker="Paychecks" title="Why overtime weeks look heavily taxed">
        <p>
          Payroll works on each paycheck as if you earned the same every period. A big overtime check is treated as a higher yearly income, so the tax on it
          looks steep. Over the year it evens out: your real tax depends on your total pay, and anything over-withheld comes back as a refund.
        </p>
      </GuideSection>

      <GuideSection id="after-tax-wage" n={12} kicker="Insight" title="Your after-tax hourly wage">
        <p>
          Divide your take-home pay for the year by the hours you work. It is the honest figure for deciding whether an extra shift, a longer commute or a
          higher-paid job is worth it. At $20 an hour full time in Texas it is $17.12; in California, $16.55.
        </p>
        <Callout tone="good" title="Compare jobs by take-home per hour">
          A $22 job with a long unpaid commute can pay less per hour of your time than a $20 job close to home.
        </Callout>
      </GuideSection>

      <GuideSection id="frequency" n={13} kicker="Paydays" title="Weekly, biweekly or monthly">
        <p>
          The same $41,600 a year pays $684.72 a week, $1,369.45 every two weeks, $1,483.57 twice a month or $2,967.13 a month after tax in Texas. The yearly
          total is the same. Biweekly pay gives two months a year with three paydays.
        </p>
      </GuideSection>

      <GuideSection id="unpaid" n={14} kicker="Hours" title="Unpaid time off">
        <p>
          Hourly workers without paid vacation earn nothing in the weeks they do not work. With two unpaid weeks, the $20-an-hour job pays $40,000 a year
          instead of $41,600, and $34,320 after tax. Set paid weeks under More options to see your year.
        </p>
      </GuideSection>

      <GuideSection id="k401" n={15} kicker="Savings" title="401(k) and benefits">
        <p>
          A traditional 401(k) comes out before income tax. Saving 6% at $20 an hour, 40 hours, puts $96 a paycheck into your account but cuts take-home by
          only $84.48. Health, dental and vision premiums through a cafeteria plan come out before Social Security and Medicare too.
        </p>
      </GuideSection>

      <GuideSection id="children" n={16} kicker="Family" title="Children and your W-4">
        <p>
          Listing children on step 3 of Form W-4 lowers withholding by $2,200 a child. A head of household at $20 an hour with two children has no federal
          income tax withheld at all, and takes home $1,477.60 a paycheck. The{" "}
          <a href="/us/taxes/child-tax-credit-calculator">child tax credit calculator</a>{" "}shows the refundable part you get when you file.
        </p>
      </GuideSection>

      <GuideSection id="minimum" n={17} kicker="Rules" title="Minimum wage">
        <p>
          The federal minimum wage is $7.25 an hour, unchanged since 2009. Most states and many cities set a higher rate, and your employer must pay the
          highest that applies. Full time at $7.25 is $15,080 a year, below the standard deduction, so no federal income tax is withheld; only Social Security
          and Medicare come out.
        </p>
      </GuideSection>

      <GuideSection id="two-jobs" n={18} kicker="Special cases" title="Two jobs">
        <p>
          Each employer withholds as if its job were your only one, so each takes off the full standard deduction. Together that can leave too little tax
          withheld. Use step 2 of Form W-4, or the IRS Tax Withholding Estimator, to fix it. Social Security stops at $184,500 of total pay, but each
          employer keeps withholding it; any excess comes back on your return.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "2,080", label: "Hours in a full-time year" },
            { value: "$7.25", label: "Federal minimum wage" },
            { value: "1.5×", label: "Overtime rate after 40 hours" },
            { value: "$12,500", label: "Overtime deduction limit ($25,000 joint)" },
            { value: "$16,100", label: "Standard deduction, single" },
            { value: "6.2%", label: "Social Security, up to $184,500" },
            { value: "1.45%", label: "Medicare, all pay" },
            { value: "9", label: "States with no tax on wages" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The paycheck guide. Every figure comes from src/lib/us/pay.ts and tax-2026.ts (2026 rates). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "gross-net", title: "Gross pay and net pay" },
  { id: "worked", title: "A $60,000 paycheck, line by line" },
  { id: "federal", title: "Federal income tax withholding" },
  { id: "w4", title: "How your Form W-4 changes it" },
  { id: "fica", title: "Social Security and Medicare (FICA)" },
  { id: "state", title: "State income tax" },
  { id: "local", title: "City and county income tax" },
  { id: "k401", title: "Traditional 401(k): saving before tax" },
  { id: "roth", title: "Roth 401(k): saving after tax" },
  { id: "benefits", title: "Health insurance, HSA and FSA" },
  { id: "frequency", title: "Weekly, biweekly or monthly pay" },
  { id: "hourly", title: "Hourly pay" },
  { id: "family", title: "Married, with children" },
  { id: "salaries", title: "Take-home at common salaries" },
  { id: "bonus", title: "Bonuses, overtime and tips" },
  { id: "refund", title: "Refund or bill at tax time" },
  { id: "stub", title: "Reading your pay stub" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS — Publication 15-T, Federal Income Tax Withholding Methods", href: "https://www.irs.gov/publications/p15t" },
  { label: "IRS — Form W-4, Employee's Withholding Certificate", href: "https://www.irs.gov/forms-pubs/about-form-w-4" },
  { label: "IRS — Tax Withholding Estimator", href: "https://www.irs.gov/individuals/tax-withholding-estimator" },
  { label: "IRS — 2026 inflation adjustments (Rev. Proc. 2025-32)", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
  { label: "Social Security Administration — 2026 Social Security changes", href: "https://www.ssa.gov/news/press/factsheets/colafacts2026.pdf" },
  { label: "Tax Foundation — State individual income tax rates and brackets, 2026", href: "https://taxfoundation.org/data/all/state/state-income-tax-rates/" },
  { label: "U.S. Department of Labor — Overtime pay", href: "https://www.dol.gov/agencies/whd/overtime" },
];

export default function PaycheckGuide() {
  return (
    <Guide
      kicker="The paycheck guide"
      title="How your paycheck is worked out in 2026"
      intro={
        <>
          Your take-home pay is what is left after federal income tax, Social Security, Medicare, state and local tax, and anything you choose to put
          aside, such as a 401(k) or health insurance. This guide walks through each line on a pay stub with 2026 figures, so you can check your own.
        </>
      }
      meta={["2026 tax year", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Start with gross pay for the pay period: your salary divided by the number of paychecks.</li>
          <li>Take off pre-tax deductions (traditional 401(k), health insurance, HSA), then federal and state income tax on what is left.</li>
          <li>Take off Social Security (6.2%) and Medicare (1.45%) on your pay before 401(k) contributions.</li>
          <li>Take off after-tax deductions such as a Roth 401(k). What remains is your net pay.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$1,938", label: "Biweekly take-home on $60,000, single, Texas" },
            { value: "7.65%", label: "Social Security plus Medicare" },
            { value: "$16,100", label: "2026 standard deduction, single" },
            { value: "$184,500", label: "2026 Social Security wage base" },
          ]}
        />
      </GuideSection>

      <GuideSection id="gross-net" n={2} kicker="Basics" title="Gross pay and net pay">
        <p>
          <strong>Gross pay</strong>{" "}is what you earn before anything comes out: your salary, or your hours times your hourly rate. <strong>Net pay</strong>
          {" "}(take-home pay) is the amount that lands in your bank account. The gap between the two is made up of taxes your employer must withhold
          and deductions you chose.
        </p>
        <p>
          Some deductions come out <em>before</em>{" "}tax and lower the pay that is taxed. Others come out <em>after</em>{" "}tax. The order matters, which is
          why a 6% 401(k) contribution costs you less than 6% of your take-home pay.
        </p>
      </GuideSection>

      <GuideSection id="worked" n={3} kicker="Example" title="A $60,000 paycheck, line by line">
        <p>A single person in Texas (no state income tax) earning $60,000 a year, paid every two weeks, with no 401(k) and no children:</p>
        <WorkedExample
          title="$60,000 a year, 26 paychecks, single, Texas"
          steps={[
            { label: "Gross pay ($60,000 ÷ 26)", value: "$2,307.69" },
            { label: "Federal income tax", note: "$5,020 for the year ÷ 26", value: "−$193.08" },
            { label: "Social Security (6.2%)", value: "−$143.08" },
            { label: "Medicare (1.45%)", value: "−$33.46" },
          ]}
          total={{ label: "Take-home per paycheck", value: "$1,938.08" }}
        />
        <p>
          Over a year that is $50,390 of take-home pay. About 16% of gross pay goes in tax: $5,020 of federal income tax and $4,590 of Social Security
          and Medicare.
        </p>
      </GuideSection>

      <GuideSection id="federal" n={4} kicker="Federal" title="Federal income tax withholding">
        <p>
          Your employer withholds federal income tax so that, by the end of the year, you have paid roughly the tax you owe. The IRS percentage-method
          tables in Publication 15-T do this by turning each paycheck into a yearly figure, taking off the standard deduction, applying the brackets and
          dividing the result back down.
        </p>
        <p>
          For the $60,000 example: $60,000 less the $16,100 standard deduction leaves $43,900 of taxable income. Tax is 10% of the first $12,400 ($1,240)
          plus 12% of the next $31,500 ($3,780), or $5,020 for the year. Divided by 26 paychecks, that is $193.08 each. To see how the brackets work at
          any income, use the <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>.
        </p>
        <Callout title="Your bracket is not your tax rate">
          The $60,000 earner is in the 12% bracket but pays only about 8.4% of gross pay in federal income tax, because the first dollars are taxed at
          0% (the standard deduction) and 10%.
        </Callout>
      </GuideSection>

      <GuideSection id="w4" n={5} kicker="Form W-4" title="How your Form W-4 changes it">
        <p>The Form W-4 you give your employer tells payroll how to withhold. Since 2020 it has no allowances. Instead it has five steps:</p>
        <ul>
          <li><strong>Step 1:</strong>{" "}your filing status (single, married filing jointly or head of household).</li>
          <li><strong>Step 2:</strong>{" "}tick the box if you have two jobs or your spouse works, so more tax is withheld.</li>
          <li><strong>Step 3:</strong>{" "}credits for children ($2,200 each under 17) and other dependents ($500 each).</li>
          <li><strong>Step 4:</strong>{" "}other income, extra deductions and extra withholding per paycheck.</li>
          <li><strong>Step 5:</strong>{" "}sign it.</li>
        </ul>
        <p>
          Asking for $50 extra a paycheck in step 4(c) takes the $60,000 example from $1,938.08 to $1,888.08, and adds $1,300 to your federal tax
          paid over the year, which comes back as a refund if you did not owe it.
        </p>
      </GuideSection>

      <GuideSection id="fica" n={6} kicker="Payroll tax" title="Social Security and Medicare (FICA)">
        <p>
          FICA tax has two parts. Social Security is 6.2% of pay up to the 2026 wage base of $184,500; above that, it stops for the rest of the year.
          Medicare is 1.45% of all pay, plus an extra 0.9% on pay over $200,000 (single) or $250,000 (married filing jointly). Your employer pays a
          matching 7.65% on top, which does not show on your stub.
        </p>
        <WorkedExample
          title="FICA on a $250,000 salary, single"
          steps={[
            { label: "Social Security: 6.2% of $184,500", value: "$11,439" },
            { label: "Medicare: 1.45% of $250,000", value: "$3,625" },
            { label: "Additional Medicare: 0.9% of $50,000", value: "$450" },
          ]}
          total={{ label: "FICA for the year", value: "$15,514" }}
        />
        <p>Traditional 401(k) contributions do not lower FICA. Cafeteria plan benefits such as health insurance do.</p>
      </GuideSection>

      <GuideSection id="state" n={7} kicker="State" title="State income tax">
        <p>
          Nine states have no income tax on wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming.
          The other 41 states and DC each have their own rules. Some use one flat rate, such as Arizona (2.5%), Colorado (4.4%) and Illinois (4.95%);
          the rest, including California and New York, tax income in brackets. Each state also has its own standard deduction, personal exemptions
          or credits. The calculator applies your state&rsquo;s 2026 brackets, deductions and exemptions for your filing status and dependents.
        </p>
        <DataTable
          caption="State income tax on $60,000, single, no dependents, 2026 state rules"
          head={["State", "State tax a year", "Share of pay", "Take-home a year"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Texas or Florida", "$0", "0%", "$50,390"],
            ["Ohio", "$875", "1.5%", "$49,516"],
            ["Arizona", "$1,291", "2.2%", "$49,099"],
            ["New Jersey", "$1,767", "2.9%", "$48,623"],
            ["Pennsylvania", "$1,842", "3.1%", "$48,548"],
            ["North Carolina", "$1,885", "3.1%", "$48,505"],
            ["Colorado", "$1,932", "3.2%", "$48,458"],
            ["Georgia", "$2,246", "3.7%", "$48,145"],
            ["California (including 1.3% SDI)", "$2,420", "4.0%", "$47,970"],
            ["Virginia", "$2,636", "4.4%", "$47,754"],
            ["New York (before any city tax)", "$2,643", "4.4%", "$47,747"],
            ["Massachusetts", "$2,780", "4.6%", "$47,610"],
            ["Illinois", "$2,825", "4.7%", "$47,565"],
            ["Oregon", "$4,420", "7.4%", "$45,970"],
          ]}
        />
        <p>
          A state&rsquo;s top rate can mislead: Ohio&rsquo;s 2.75% and New Jersey&rsquo;s brackets leave far less tax at $60,000 than a flat 4.95% in
          Illinois, where the $60,000 example loses $108.66 a paycheck to state tax, leaving $1,829.42. A few states also let you deduct some federal
          tax (Alabama in full, Missouri and Oregon in part); we include Alabama&rsquo;s and leave out the other two, so those figures can be a little high.
        </p>
      </GuideSection>

      <GuideSection id="local" n={8} kicker="Local" title="City and county income tax">
        <p>
          Some places add their own income tax: New York City and Yonkers, Philadelphia and most Pennsylvania municipalities, Detroit and other Michigan
          cities, many Ohio cities, every Indiana county, Kentucky cities and counties, and parts of Maryland (where county tax is part of the state
          return). Rates usually run from about 1% to 4%. Enter yours under More options if your stub shows a local line.
        </p>
      </GuideSection>

      <GuideSection id="k401" n={9} kicker="Saving" title="Traditional 401(k): saving before tax">
        <p>
          A traditional 401(k) contribution comes out of your pay before federal and most state income tax, so it lowers your tax. The 2026 limit is
          $24,500, plus $8,000 if you are 50 or over (or $11,250 at ages 60 to 63).
        </p>
        <CompareCards
          columns={[
            {
              name: "$75,000, no 401(k)",
              rows: [
                { label: "Federal tax per paycheck", value: "$295.00" },
                { label: "Into 401(k)", value: "$0" },
                { label: "Take-home", value: "$2,368.94" },
              ],
            },
            {
              name: "$75,000, 6% 401(k)",
              rows: [
                { label: "Federal tax per paycheck", value: "$256.92" },
                { label: "Into 401(k)", value: "$173.08" },
                { label: "Take-home", value: "$2,233.94" },
              ],
            },
          ]}
        />
        <p>
          Putting $173.08 a paycheck into the 401(k) costs only $135.00 of take-home pay, because federal tax falls by $38.08. With an employer match,
          the first few percent are usually the best return you can get. The <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows what
          these contributions grow to.
        </p>
      </GuideSection>

      <GuideSection id="roth" n={10} kicker="Saving" title="Roth 401(k): saving after tax">
        <p>
          A Roth 401(k) contribution comes out after tax. It does not lower your tax today, but qualified withdrawals in retirement are tax-free. On
          the same $75,000 salary, 6% to a Roth 401(k) leaves $2,195.87 a paycheck, against $2,233.94 with a traditional 401(k). The traditional and
          Roth contributions share one $24,500 limit. If you want to save outside work, the <a href="/us/savings/roth-ira-calculator">Roth IRA
          calculator</a>{" "}covers the separate IRA limit.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={11} kicker="Benefits" title="Health insurance, HSA and FSA">
        <p>
          Health, dental and vision premiums, HSA contributions and FSA contributions paid through your employer&rsquo;s cafeteria plan (Section 125)
          come out before income tax <em>and</em>{" "}before Social Security and Medicare. On $60,000 in Texas, $3,000 a year of premiums cuts take-home
          pay from $50,390 to $47,979.50: the benefits cost you $2,410.50, not $3,000.
        </p>
        <p>The 2026 HSA limits are $4,400 for self-only cover and $8,750 for family cover, plus $1,000 at age 55 or over.</p>
      </GuideSection>

      <GuideSection id="frequency" n={12} kicker="Schedules" title="Weekly, biweekly or monthly pay">
        <p>
          Your yearly pay and tax are the same however often you are paid; only the size of each paycheck changes. Biweekly means 26 paychecks (two
          months a year have three). Semimonthly means 24, usually on the 15th and the last day of the month.
        </p>
        <Bars
          items={[
            { label: "Weekly (52)", value: 969.04 },
            { label: "Biweekly (26)", value: 1938.08 },
            { label: "Semimonthly (24)", value: 2099.58 },
            { label: "Monthly (12)", value: 4199.17 },
          ]}
          format={(n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        />
        <p>Take-home per paycheck on $60,000, single, Texas.</p>
      </GuideSection>

      <GuideSection id="hourly" n={13} kicker="Hourly" title="Hourly pay">
        <p>
          For hourly workers the calculator multiplies your rate by your hours and paid weeks to get yearly pay, then works out each paycheck the same
          way. At $20 an hour for 40 hours a week, 52 weeks a year, pay is $41,600 a year.
        </p>
        <WorkedExample
          title="$20 an hour, 40 hours, paid weekly, single, Texas"
          steps={[
            { label: "Gross pay ($20 × 40)", value: "$800.00" },
            { label: "Federal income tax", value: "−$54.08" },
            { label: "Social Security", value: "−$49.60" },
            { label: "Medicare", value: "−$11.60" },
          ]}
          total={{ label: "Take-home per week", value: "$684.72" }}
        />
        <p>
          To convert between hourly and yearly pay, try the <a href="/us/taxes/salary-to-hourly">salary to hourly calculator</a>. Hours over 40 a week
          are usually paid at time and a half; the <a href="/us/taxes/overtime-calculator">overtime calculator</a>{" "}works that out.
        </p>
      </GuideSection>

      <GuideSection id="family" n={14} kicker="Families" title="Married, with children">
        <p>
          Married filing jointly doubles the standard deduction to $32,200 and widens the lower brackets. Each child under 17 is worth a $2,200 child
          tax credit, which payroll spreads over the year when you list it on your W-4.
        </p>
        <WorkedExample
          title="$100,000, married filing jointly, two children, Georgia, biweekly"
          steps={[
            { label: "Gross pay", value: "$3,846.15" },
            { label: "Federal income tax", note: "$3,240 a year after $4,400 of child credits", value: "−$124.62" },
            { label: "Social Security", value: "−$238.46" },
            { label: "Medicare", value: "−$55.77" },
            { label: "Georgia tax (4.99%)", value: "−$191.92" },
          ]}
          total={{ label: "Take-home per paycheck", value: "$3,235.38" }}
        />
        <Callout tone="warn" title="Two earners">
          If both spouses work, each job&rsquo;s payroll assumes it is the only income and gives each the full standard deduction and lower brackets.
          Tick step 2 on both W-4s, or use the IRS Tax Withholding Estimator, to avoid a bill in April.
        </Callout>
      </GuideSection>

      <GuideSection id="salaries" n={15} kicker="Table" title="Take-home at common salaries">
        <DataTable
          caption="Single, Texas, paid every two weeks, no 401(k), 2026"
          head={["Salary", "Per paycheck", "Per year", "Share in tax"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["$30,000", "$1,010.96", usd(26285), "12.4%"],
            ["$40,000", "$1,320.00", usd(34320), "14.2%"],
            ["$50,000", "$1,629.04", usd(42355), "15.3%"],
            ["$60,000", "$1,938.08", usd(50390), "16.0%"],
            ["$75,000", "$2,368.94", usd(61592.5), "17.9%"],
            ["$100,000", "$3,045.38", usd(79180), "20.8%"],
            ["$150,000", "$4,376.58", usd(113791), "24.1%"],
            ["$200,000", "$5,727.96", usd(148927), "25.5%"],
          ]}
        />
        <p>In a state with income tax, take off your state rate times your pay as well.</p>
      </GuideSection>

      <GuideSection id="bonus" n={16} kicker="Extra pay" title="Bonuses, overtime and tips">
        <p>
          Bonuses and commissions are &quot;supplemental wages&quot;. Employers often withhold a flat 22% federal tax on them (37% on the part over $1
          million in a year), which can be more or less than your real rate. Either way, the right tax is settled on your return.
        </p>
        <p>
          From 2025 to 2028, workers can deduct up to $12,500 of qualified overtime premium ($25,000 married filing jointly) and up to $25,000 of
          qualified tips on their return. These deductions do not lower Social Security and Medicare, and most payroll systems do not reflect them in
          withholding, so they usually show up as a bigger refund. The <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}
          includes both.
        </p>
      </GuideSection>

      <GuideSection id="refund" n={17} kicker="Tax time" title="Refund or bill at tax time">
        <p>Withholding is an estimate. You get a refund if too much was withheld, and owe if too little was. Common reasons for a bill:</p>
        <ul>
          <li>Two jobs, or a working spouse, without step 2 ticked.</li>
          <li>Side income, interest or investment gains with no tax withheld.</li>
          <li>A child turning 17, which ends the $2,200 credit for that child.</li>
        </ul>
        <p>Common reasons for a refund: refundable credits, the overtime and tips deductions, and itemized deductions you did not tell payroll about.</p>
      </GuideSection>

      <GuideSection id="stub" n={18} kicker="Pay stub" title="Reading your pay stub">
        <p>Most stubs show the same lines as this calculator, with codes that vary by payroll company:</p>
        <ul>
          <li><strong>FIT or Fed W/H:</strong>{" "}federal income tax withheld.</li>
          <li><strong>OASDI or SS:</strong>{" "}Social Security. <strong>MED or HI:</strong>{" "}Medicare.</li>
          <li><strong>SIT or SWT:</strong>{" "}state income tax. <strong>LIT or CITY:</strong>{" "}local tax.</li>
          <li><strong>401K, 125, HSA:</strong>{" "}pre-tax deductions. <strong>ROTH:</strong>{" "}after-tax.</li>
          <li><strong>YTD:</strong>{" "}year-to-date totals, useful for checking the Social Security cap.</li>
        </ul>
        <p>Some states also take a small payroll tax for disability or family leave, such as California SDI or New Jersey FLI.</p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Dividing salary by 24 when you are paid biweekly (26 times a year).</li>
          <li>Thinking a raise into a higher bracket can lower take-home pay. Only the extra dollars are taxed at the higher rate.</li>
          <li>Forgetting that 401(k) contributions still pay Social Security and Medicare.</li>
          <li>Using last year&rsquo;s W-4 after marriage, a new child or a second job.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "$16,100", label: "Standard deduction, single" },
            { value: "$32,200", label: "Standard deduction, married filing jointly" },
            { value: "6.2%", label: "Social Security, up to $184,500" },
            { value: "1.45%", label: "Medicare, plus 0.9% over $200,000" },
            { value: "$24,500", label: "401(k) limit" },
            { value: "$2,200", label: "Child tax credit per child" },
            { value: "22%", label: "Flat federal withholding on bonuses" },
            { value: "9", label: "States with no tax on wages" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

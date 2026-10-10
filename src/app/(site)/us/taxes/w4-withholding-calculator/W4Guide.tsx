import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The W-4 guide. Figures from src/lib/us/withholding.ts (withholdingPerPaycheck, w4Plan) and tax-2026.ts, tax year 2026. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what-it-does", title: "What Form W-4 does" },
  { id: "how-employers", title: "How your employer works out withholding" },
  { id: "basic", title: "Example: a basic W-4" },
  { id: "step1", title: "Step 1: filing status" },
  { id: "step2", title: "Step 2: two jobs or a working spouse" },
  { id: "two-earners", title: "Example: two earners, one household" },
  { id: "step3", title: "Step 3: children and other credits" },
  { id: "step4a", title: "Step 4(a): other income" },
  { id: "step4b", title: "Step 4(b): deductions" },
  { id: "new-deductions", title: "Tips, overtime, car loans and seniors on the 2026 form" },
  { id: "step4c", title: "Step 4(c): extra withholding" },
  { id: "mid-year", title: "Fixing withholding partway through the year" },
  { id: "second-job", title: "Example: a second job found in October" },
  { id: "refund-target", title: "Aiming for a refund" },
  { id: "exempt", title: "Claiming exempt" },
  { id: "pay-stub", title: "Reading your pay stub" },
  { id: "when", title: "When to file a new W-4" },
  { id: "other-income", title: "Self-employment, gains and bonuses" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS: Form W-4 (2026), Employee's Withholding Certificate", href: "https://www.irs.gov/pub/irs-pdf/fw4.pdf" },
  { label: "IRS: Publication 15-T (2026), Federal Income Tax Withholding Methods", href: "https://www.irs.gov/pub/irs-pdf/p15t.pdf" },
  { label: "IRS: Publication 505, Tax Withholding and Estimated Tax", href: "https://www.irs.gov/publications/p505" },
  { label: "IRS: Tax withholding estimator", href: "https://www.irs.gov/individuals/tax-withholding-estimator" },
  { label: "IRS: About Form W-4", href: "https://www.irs.gov/forms-pubs/about-form-w-4" },
  { label: "IRS: 2026 inflation adjustments (Rev. Proc. 2025-32)", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
];

const usd = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function W4Guide() {
  return (
    <Guide
      kicker="The W-4 guide"
      title="How to fill in Form W-4 so your 2026 withholding comes out right"
      intro={
        <>
          Form W-4 tells your employer how much federal income tax to take from each paycheck. Get it right and you neither owe in April nor lend the IRS money all year. This guide explains
          each step of the 2026 form, how payroll turns it into a dollar figure, and how to catch up when you find a gap late in the year.
        </>
      }
      meta={["Tax year 2026", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>With one job and no other income, Step 1 alone usually gets you close: the tables are built to match your tax.</li>
          <li>Step 3 lowers withholding for children ($2,200 each) and other dependents ($500 each).</li>
          <li>Step 4(a) raises it for income with no withholding; Step 4(b) lowers it for deductions; Step 4(c) adds a fixed dollar amount.</li>
          <li>Late in the year, the gap has to be closed over fewer paychecks, so each change is bigger.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$216.15", label: "Withheld biweekly: single, $65,000, basic W-4" },
            { value: "$8,600", label: "Withholding offset, single or head of household" },
            { value: "$12,900", label: "Withholding offset, married filing jointly" },
            { value: "$2,200", label: "Step 3 amount per child under 17" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what-it-does" n={2} kicker="Background" title="What Form W-4 does">
        <p>
          The W-4 is not filed with the IRS. You give it to your employer, who keeps it and uses it every payday. It doesn&rsquo;t change the tax you owe for the year, only how much you pay
          ahead through payroll. The difference shows up as your refund or balance due when you file; the <a href="/us/taxes/tax-refund-calculator">tax refund calculator</a>{" "}shows where
          you are heading.
        </p>
        <p>
          Since 2020 the form has no &ldquo;allowances&rdquo;. Instead it asks for dollar amounts: credits, other income, deductions and extra tax. If you never filled in a new one, your
          employer still uses your old form with the allowance method.
        </p>
      </GuideSection>

      <GuideSection id="how-employers" n={3} kicker="Method" title="How your employer works out withholding">
        <p>Payroll follows IRS Publication 15-T. For a 2020-or-later W-4 the percentage method is:</p>
        <Timeline
          items={[
            { when: "1", what: "Annualize the paycheck", detail: "Taxable pay for the period (after pre-tax 401(k) and benefits) times the number of paychecks in a year." },
            { when: "2", what: "Adjust it", detail: "Add Step 4(a), subtract Step 4(b), and subtract $8,600 ($12,900 married filing jointly) unless the Step 2 box is checked." },
            { when: "3", what: "Apply the withholding table", detail: "The table is the 2026 brackets shifted by the rest of the standard deduction: tax starts at $7,500 single, $19,300 joint, $15,550 head of household." },
            { when: "4", what: "Take off credits", detail: "Subtract Step 3, then divide by the number of paychecks." },
            { when: "5", what: "Add extra", detail: "Add Step 4(c). The result is federal income tax for this paycheck." },
          ]}
        />
        <p>
          The $8,600 offset plus the table&rsquo;s zero band adds up to the full standard deduction ($7,500 + $8,600 = $16,100), so with one job and nothing else the year&rsquo;s withholding
          matches the year&rsquo;s tax almost to the dollar.
        </p>
      </GuideSection>

      <GuideSection id="basic" n={4} kicker="Worked example" title="Example: a basic W-4">
        <WorkedExample
          title="Single, $65,000 a year, paid every two weeks, only Step 1 filled in"
          steps={[
            { label: "Paycheck $2,500 × 26", value: "$65,000" },
            { label: "Less the $8,600 offset", value: "$56,400" },
            { label: "Table: $1,240 + 12% of the amount over $19,900", value: "$5,620" },
            { label: "Divided by 26 paychecks", value: "$216.15" },
          ]}
          total={{ label: "Federal tax withheld each paycheck", value: "$216.15" }}
        />
        <p>
          A year of $216.15 paychecks withholds $5,620, and the 2026 tax on $65,000 for a single filer is also $5,620. That is the design goal: one job, standard deduction, no other income,
          no refund and no bill.
        </p>
      </GuideSection>

      <GuideSection id="step1" n={5} kicker="Step 1" title="Step 1: filing status">
        <p>
          Check the status you expect to file with: single or married filing separately, married filing jointly (or qualifying surviving spouse), or head of household. Head of household needs
          a qualifying person and you paying more than half the cost of keeping up the home. The status sets the offset and table, so it moves withholding a lot.
        </p>
        <DataTable
          caption="Federal tax withheld each paycheck with a basic W-4, 2026"
          head={["Pay", "Status", "Per paycheck"]}
          numeric={[2]}
          rows={[
            ["$65,000, biweekly", "Single", usd(216.15)],
            ["$100,000, biweekly", "Married filing jointly", usd(293.85)],
            ["$50,000, twice a month", "Head of household", usd(114.5)],
          ]}
        />
      </GuideSection>

      <GuideSection id="step2" n={6} kicker="Step 2" title="Step 2: two jobs or a working spouse">
        <p>
          Each employer&rsquo;s payroll assumes its job is your only one and gives you the full standard deduction and the low brackets. With two jobs, or two working spouses filing jointly,
          that happens twice, and too little is withheld. Step 2 fixes it in one of three ways:
        </p>
        <ul>
          <li>
            <strong>(a) the IRS estimator</strong>{" "}or a calculator like this one, then enter the result in Step 4(c) on one W-4;
          </li>
          <li>
            <strong>(b) the Multiple Jobs Worksheet</strong>{" "}on page 3 of the form, using its tables of household salaries;
          </li>
          <li>
            <strong>(c) the checkbox</strong>, ticked on both W-4s, which halves the standard deduction and brackets for each job. It is accurate when the two jobs pay about the same.
          </li>
        </ul>
        <p>Fill in Steps 3 and 4(b) on one W-4 only, ideally for the highest-paying job, and leave them blank on the other.</p>
      </GuideSection>

      <GuideSection id="two-earners" n={7} kicker="Worked example" title="Example: two earners, one household">
        <p>A married couple filing jointly earns $60,000 and $50,000, both paid every two weeks.</p>
        <CompareCards
          columns={[
            {
              name: "Both W-4s basic, box unchecked",
              rows: [
                { label: "Withheld in the year", value: "$4,620" },
                { label: "Their 2026 tax", value: "$8,840" },
                { label: "Result", value: "Owe $4,220" },
              ],
            },
            {
              name: "Step 2 box checked on both",
              rows: [
                { label: "Withheld in the year", value: "$8,840" },
                { label: "Their 2026 tax", value: "$8,840" },
                { label: "Result", value: "Break even" },
              ],
            },
          ]}
        />
        <p>
          Without Step 2, each job gets the full $12,900 offset and the low brackets, so the household is under-withheld by $4,220. With similar salaries the checkbox gets it exactly right.
        </p>
      </GuideSection>

      <GuideSection id="step3" n={8} kicker="Step 3" title="Step 3: children and other credits">
        <p>
          If your total income will be $200,000 or less ($400,000 married filing jointly), multiply qualifying children under 17 by $2,200 and other dependents by $500. You can add other credits
          you expect, such as education credits or the foreign tax credit. Payroll divides the total across your paychecks.
        </p>
        <WorkedExample
          title="Married filing jointly, $100,000, biweekly, two children"
          steps={[
            { label: "Basic W-4", value: "$293.85 a paycheck" },
            { label: "Step 3: 2 × $2,200 = $4,400, so $169.23 less a paycheck", value: "$124.62 a paycheck" },
            { label: "Withheld in the year", value: "$3,240" },
            { label: "The couple's 2026 tax after the child tax credit", value: "$3,240" },
          ]}
          total={{ label: "Refund forgone by leaving Step 3 blank", value: "$4,400" }}
        />
        <p>
          The <a href="/us/taxes/child-tax-credit-calculator">child tax credit calculator</a>{" "}checks the credit, including the phase-out above $200,000 ($400,000 joint).
        </p>
      </GuideSection>

      <GuideSection id="step4a" n={9} kicker="Step 4(a)" title="Step 4(a): other income">
        <p>
          Enter income for the year that has no withholding: interest, dividends, retirement income. Payroll adds it to your annualized wages, so it is taxed at your rate through your paychecks.
          A single filer at $65,000 who adds $10,000 in Step 4(a) has $295.00 withheld every two weeks instead of $216.15.
        </p>
        <p>
          You can leave Step 4(a) blank for privacy and put an equivalent dollar amount in Step 4(c) instead. Don&rsquo;t put self-employment income here: it also carries self-employment tax.
        </p>
      </GuideSection>

      <GuideSection id="step4b" n={10} kicker="Step 4(b)" title="Step 4(b): deductions">
        <p>
          Step 4(b) is for deductions beyond the basic standard deduction. The Deductions Worksheet on page 4 adds up the new tips, overtime, car loan interest and senior deductions,
          adjustments such as student loan interest and deductible IRA contributions, and itemized deductions above your standard deduction ($16,100 single, $32,200 joint, $24,150 head of
          household).
        </p>
        <WorkedExample
          title="Married filing jointly, $150,000, biweekly, $40,000 of itemized deductions"
          steps={[
            { label: "Itemized deductions", value: "$40,000" },
            { label: "Less the standard deduction", value: "−$32,200" },
            { label: "Step 4(b)", value: "$7,800" },
            { label: "Withholding drops from $590.00 to", value: "$524.00" },
          ]}
          total={{ label: "Refund avoided over a full year", value: "$1,716" }}
        />
      </GuideSection>

      <GuideSection id="new-deductions" n={11} kicker="New on the 2026 form" title="Tips, overtime, car loans and seniors on the 2026 form">
        <DataTable
          caption="Deductions Worksheet, Form W-4 (2026)"
          head={["Line", "Deduction", "Limit", "Only if total income is under"]}
          rows={[
            ["1a", "Qualified tips", "$25,000", "$150,000 ($300,000 joint)"],
            ["1b", "Qualified overtime (the half in time and a half)", "$12,500 ($25,000 joint)", "$150,000 ($300,000 joint)"],
            ["1c", "Passenger vehicle loan interest", "$10,000", "$100,000 ($200,000 joint)"],
            ["3a, 3b", "Age 65 or older", "$6,000 each", "$75,000 ($150,000 joint)"],
          ]}
        />
        <p>
          These deductions run from 2025 to 2028. A single server earning $40,000 with $8,000 of tips would have $100.77 withheld each biweekly paycheck on a basic W-4, but $63.85 with $8,000
          in Step 4(b): $960 a year stays in her pay instead of coming back as a refund. The <a href="/us/taxes/overtime-calculator">overtime calculator</a>{" "}works out the qualifying premium.
        </p>
      </GuideSection>

      <GuideSection id="step4c" n={12} kicker="Step 4(c)" title="Step 4(c): extra withholding">
        <p>
          Step 4(c) is the simplest lever: a dollar amount added to every paycheck. It is the right tool for a second job (the Multiple Jobs Worksheet result goes here), for side income you
          would rather not list, or to catch up a shortfall late in the year. It stays until you file a new W-4, so remember to take it off in January if it was only for this year.
        </p>
      </GuideSection>

      <GuideSection id="mid-year" n={13} kicker="Timing" title="Fixing withholding partway through the year">
        <p>
          The same gap is easy to close in February and painful in November. Take the single filer at $65,000 who also has $10,000 of interest and dividends, which raises the 2026 tax from
          $5,620 to $7,670. With a basic W-4 all year, the bill in April would be $2,050.
        </p>
        <DataTable
          caption="Closing a $2,050 gap: when the new W-4 starts"
          head={["Paychecks left", "New W-4", "Withheld each paycheck"]}
          numeric={[2]}
          rows={[
            ["26 (January)", "Step 4(a) $10,000", usd(295)],
            ["20 (March)", "Step 4(a) $10,000, Step 4(c) $24", usd(319)],
            ["6 (October)", "Step 4(a) $10,000, Step 4(c) $263", usd(558)],
          ]}
        />
        <Bars
          format={(n) => "$" + n.toLocaleString("en-US")}
          items={[
            { label: "January", value: 295 },
            { label: "March", value: 319 },
            { label: "October", value: 558 },
          ]}
        />
        <p>The calculator above takes your year-to-date withholding and the paychecks left, so its suggestion closes the gap by December 31.</p>
      </GuideSection>

      <GuideSection id="second-job" n={14} kicker="Worked example" title="Example: a second job found in October">
        <p>
          The same single filer ($65,000, $216.15 a paycheck) also works a weekend job paying $30,000 a year, which on its own basic W-4 withholds $1,420 for the year. Together the two jobs
          bring a 2026 tax of $12,070, but withholding is heading for $7,040.
        </p>
        <WorkedExample
          title="Six biweekly paychecks left at the main job"
          steps={[
            { label: "Tax for 2026", value: "$12,070" },
            { label: "Withholding on course for", value: "$7,040" },
            { label: "Gap", value: "$5,030" },
            { label: "Step 4(c) on the main job: $5,030 ÷ 6", value: "$838" },
          ]}
          total={{ label: "New withholding each paycheck", value: usd(1054.15) }}
        />
        <p>
          That is a steep change; in January it would have been far smaller. When the extra is more than your paycheck can carry, a January 15, 2027 estimated payment covers the rest; the{" "}
          <a href="/us/taxes/estimated-tax-calculator">quarterly estimated tax calculator</a>{" "}shows how.
        </p>
      </GuideSection>

      <GuideSection id="refund-target" n={15} kicker="Choice" title="Aiming for a refund">
        <p>
          Some people like a small refund as a cushion. Enter the refund you would like under More options and the calculator adds just enough to Step 4(c). For the single filer at $65,000 with
          six paychecks left, a $500 refund needs $83 extra a paycheck. Over a full year the same cushion would cost about $19 a paycheck.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={16} kicker="Special case" title="Claiming exempt">
        <p>
          You can claim exemption from withholding for 2026 only if you had no federal income tax liability in 2025 and expect none in 2026, for example a student with a summer job well below the
          standard deduction. Social Security and Medicare are still withheld. An exempt W-4 expires: file a new one by February 16, 2027 or withholding restarts at the single rate.
        </p>
      </GuideSection>

      <GuideSection id="pay-stub" n={17} kicker="How to" title="Reading your pay stub">
        <p>You need three numbers from your latest stub:</p>
        <ul>
          <li>
            <strong>Federal income tax this period</strong>, often labeled Fed W/H, FIT or FITW. Not Social Security (OASDI) or Medicare.
          </li>
          <li>
            <strong>Federal income tax year to date</strong>, the YTD column on the same line.
          </li>
          <li>
            <strong>Gross pay</strong>{" "}for the period and year to date, and any pre-tax deductions such as 401(k), HSA and health premiums.
          </li>
        </ul>
        <p>
          Then count your remaining paydays in 2026. Biweekly workers get 26 paychecks in most years; check your employer&rsquo;s calendar. The{" "}
          <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}shows the rest of your stub, including state tax.
        </p>
      </GuideSection>

      <GuideSection id="when" n={18} kicker="Timing" title="When to file a new W-4">
        <ul>
          <li>Each January, to check the year ahead.</li>
          <li>After marriage, divorce, or a child&rsquo;s birth or 17th birthday.</li>
          <li>When you or your spouse start a second job, or one of you stops working.</li>
          <li>After a big raise, a bonus, or new side or investment income.</li>
          <li>When you buy a home and expect to itemize, or start getting tips or overtime.</li>
          <li>After a refund or bill in April that was bigger than you wanted.</li>
        </ul>
        <Callout title="How fast it works">
          Employers must put a new W-4 into effect no later than the start of the first payroll period ending on or after the 30th day after they receive it. Many do it the next payday.
        </Callout>
      </GuideSection>

      <GuideSection id="other-income" n={19} kicker="Beyond wages" title="Self-employment, gains and bonuses">
        <p>
          Self-employment income brings self-employment tax as well as income tax, so it is better handled with estimated payments or a Step 4(c) figure from a full calculation. Capital gains
          are often lumpy: cover a one-off sale with an estimated payment rather than a W-4 change you will forget to undo.
        </p>
        <p>
          Bonuses are usually withheld at a flat 22%, which can be too much or too little depending on your bracket; the <a href="/us/taxes/bonus-tax-calculator">bonus tax calculator</a>{" "}
          shows the difference.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Filling in Step 3 on both spouses&rsquo; W-4s, which claims the children twice.</li>
          <li>Putting your full itemized deductions in Step 4(b) instead of the part above the standard deduction.</li>
          <li>Ignoring Step 2 with two similar incomes: the most common cause of a surprise bill.</li>
          <li>Leaving a large Step 4(c) in place after the problem that needed it has gone.</li>
          <li>Checking only Social Security and Medicare on the stub instead of federal income tax.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "$8,600", label: "Offset: single, separate, head of household" },
            { value: "$12,900", label: "Offset: married filing jointly" },
            { value: "$2,200", label: "Step 3 per child under 17" },
            { value: "$500", label: "Step 3 per other dependent" },
            { value: "$200,000", label: "Step 3 income limit ($400,000 joint)" },
            { value: "$25,000", label: "Tips limit on the Deductions Worksheet" },
            { value: "$6,000", label: "Senior deduction per person" },
            { value: "February 16, 2027", label: "An exempt W-4 must be renewed by" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

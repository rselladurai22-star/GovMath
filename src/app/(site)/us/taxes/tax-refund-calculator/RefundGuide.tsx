import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The tax refund guide. Figures from src/lib/us/tax-2026.ts (federalReturn) and taxes-extra.ts (returnWithQbi), tax year 2026. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "formula", title: "The refund formula" },
  { id: "why", title: "Why most people get a refund" },
  { id: "example-single", title: "Example: single, $65,000" },
  { id: "withholding", title: "Withholding: the money you already paid" },
  { id: "credits", title: "Refundable and non-refundable credits" },
  { id: "example-family", title: "Example: a married couple with two children" },
  { id: "example-low", title: "Example: a refund bigger than the tax withheld" },
  { id: "no-withholding", title: "Income with nothing withheld" },
  { id: "what-changes", title: "What changes your refund" },
  { id: "deduction-credit", title: "Deductions versus credits" },
  { id: "itemizing", title: "Itemizing and the standard deduction" },
  { id: "estimated", title: "Estimated payments and last year's overpayment" },
  { id: "big-or-small", title: "Is a big refund good?" },
  { id: "owing", title: "If you owe instead" },
  { id: "timing", title: "When the refund arrives" },
  { id: "offsets", title: "When a refund is held or reduced" },
  { id: "next-year", title: "Getting it right next year" },
  { id: "state", title: "State refunds are separate" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS: About refunds", href: "https://www.irs.gov/refunds/about-refunds" },
  { label: "IRS: Where's My Refund?", href: "https://www.irs.gov/refunds" },
  { label: "IRS: Modernizing payments to and from America's bank account (paper checks)", href: "https://www.irs.gov/newsroom/modernizing-payments-to-and-from-americas-bank-account" },
  { label: "IRS: 2026 inflation adjustments (Rev. Proc. 2025-32)", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
  { label: "IRS: Child tax credit", href: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit" },
  { label: "IRS: Tax withholding estimator", href: "https://www.irs.gov/individuals/tax-withholding-estimator" },
  { label: "Bureau of the Fiscal Service: Treasury Offset Program", href: "https://www.fiscal.treasury.gov/top/" },
];

export default function RefundGuide() {
  return (
    <Guide
      kicker="The tax refund guide"
      title="Where your 2026 refund comes from, and what changes it"
      intro={
        <>
          A refund isn&rsquo;t a gift from the IRS. It is the tax you paid during 2026 that turned out to be more than you owed, plus any refundable credits. This guide shows how the
          figure is built, with worked 2026 examples, and which changes move it up or down.
        </>
      }
      meta={["Tax year 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Refund = tax withheld + estimated payments + refundable credits − your total 2026 tax.</li>
          <li>If the result is negative, that is your balance due, payable by April 15, 2027.</li>
          <li>Anything that raises your tax without raising withholding (a side gig, interest, a sale of shares) shrinks the refund.</li>
          <li>Deductions save your bracket rate; credits save their full amount.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$580", label: "Refund: single, $65,000 wages, $6,200 withheld" },
            { value: "$2,200", label: "Child tax credit per child" },
            { value: "$1,700", label: "Refundable part per child" },
            { value: "21 days", label: "Most e-filed refunds arrive within" },
          ]}
        />
      </GuideSection>

      <GuideSection id="formula" n={2} kicker="Method" title="The refund formula">
        <p>Every Form 1040 ends the same way. You work out your tax for the year, then compare it with what you have already paid in.</p>
        <Timeline
          items={[
            { when: "Step 1", what: "Total tax for 2026", detail: "Income tax after non-refundable credits, plus self-employment tax and any surtaxes." },
            { when: "Step 2", what: "What you paid in", detail: "Federal tax withheld from pay, pensions and other payments (box 2 of your W-2s), plus estimated payments." },
            { when: "Step 3", what: "Refundable credits", detail: "The refundable part of the child tax credit, the earned income tax credit and the refundable part of the American opportunity credit." },
            { when: "Step 4", what: "Refund or balance due", detail: "Steps 2 and 3 minus step 1. Positive: a refund. Negative: you owe." },
          ]}
        />
        <p>
          The calculator above follows those four steps. It uses the full 2026 return from the <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}but puts the focus on the
          last line: the check you get or the bill you pay.
        </p>
      </GuideSection>

      <GuideSection id="why" n={3} kicker="Background" title="Why most people get a refund">
        <p>
          Withholding is an estimate. Your employer works out each paycheck&rsquo;s tax from your Form W-4 and the IRS tables, as if that paycheck were repeated all year and you had no other
          income or deductions. Real life rarely matches: a raise in March, a child born in June, student loan interest, a move to a job with a different pay schedule. Each one nudges the
          estimate away from your real tax.
        </p>
        <p>
          Refundable credits such as the earned income tax credit are also paid only when you file, never through payroll. So most returns end in a refund, and a typical refund runs to a few
          thousand dollars.
        </p>
      </GuideSection>

      <GuideSection id="example-single" n={4} kicker="Worked example" title="Example: single, $65,000">
        <WorkedExample
          title="Single filer, $65,000 wages, $6,200 withheld in 2026"
          steps={[
            { label: "Wages", value: "$65,000" },
            { label: "Standard deduction", value: "−$16,100" },
            { label: "Taxable income", value: "$48,900" },
            { label: "Tax: 10% on $12,400, 12% on $36,500", value: "$5,620" },
            { label: "Federal tax withheld", value: "−$6,200" },
          ]}
          total={{ label: "Refund", value: "$580" }}
        />
        <p>
          Withholding of $6,200 against a tax of $5,620 means $580 comes back. Spread over 26 biweekly paychecks, that is about $22 a paycheck that was taken but not needed.
        </p>
      </GuideSection>

      <GuideSection id="withholding" n={5} kicker="Paid in" title="Withholding: the money you already paid">
        <p>
          The figure that matters is federal income tax withheld: box 2 of each W-2, and box 4 of any 1099-R (pensions and IRA withdrawals) or 1099-G (unemployment) where you asked for tax to
          be taken. Social Security and Medicare are separate and never come back as a refund, except when two employers together took Social Security on more than the $184,500 wage base.
        </p>
        <p>
          Before the year ends you can estimate box 2 from your latest pay stub: the year-to-date federal tax, plus that paycheck&rsquo;s federal tax times the paychecks still to come. The{" "}
          <a href="/us/taxes/w4-withholding-calculator">W-4 withholding calculator</a>{" "}does this for you and shows what to change.
        </p>
      </GuideSection>

      <GuideSection id="credits" n={6} kicker="Credits" title="Refundable and non-refundable credits">
        <p>Credits come in two kinds, and the difference decides whether you can get back more than you paid in.</p>
        <CompareCards
          columns={[
            {
              name: "Non-refundable",
              rows: [
                { label: "Can cut tax to", value: "$0, no further" },
                { label: "Examples", value: "Child tax credit (most of it), $500 other dependent credit, Lifetime Learning, dependent care" },
                { label: "Effect on refund", value: "Up to the income tax you owe" },
              ],
            },
            {
              name: "Refundable",
              rows: [
                { label: "Can cut tax to", value: "Below $0: paid to you" },
                { label: "Examples", value: "Up to $1,700 a child of the child tax credit, earned income credit, 40% of the American opportunity credit" },
                { label: "Effect on refund", value: "Full amount, even with no tax withheld" },
              ],
            },
          ]}
        />
        <p>
          The <a href="/us/taxes/child-tax-credit-calculator">child tax credit calculator</a>{" "}splits your credit into the two parts, and the{" "}
          <a href="/us/taxes/earned-income-credit-calculator">earned income credit calculator</a>{" "}works out the EITC, which you can enter in the calculator above under More options.
        </p>
      </GuideSection>

      <GuideSection id="example-family" n={7} kicker="Worked example" title="Example: a married couple with two children">
        <WorkedExample
          title="Married filing jointly, $120,000 wages, two children under 17, $6,000 withheld"
          steps={[
            { label: "Wages", value: "$120,000" },
            { label: "Standard deduction", value: "−$32,200" },
            { label: "Taxable income", value: "$87,800" },
            { label: "Tax before credits", value: "$10,040" },
            { label: "Child tax credit, 2 × $2,200", value: "−$4,400" },
            { label: "Total tax", value: "$5,640" },
            { label: "Federal tax withheld", value: "−$6,000" },
          ]}
          total={{ label: "Refund", value: "$360" }}
        />
        <p>
          If this couple also earned $3,000 of savings interest with nothing withheld, their tax would rise by $360 (12% of $3,000) to $6,000, and the refund would vanish: they would break even.
        </p>
      </GuideSection>

      <GuideSection id="example-low" n={8} kicker="Worked example" title="Example: a refund bigger than the tax withheld">
        <p>Refundable credits can pay out more than you ever had withheld. Two head-of-household parents show how:</p>
        <DataTable
          caption="Head of household, 2026"
          head={["", "One child, $45,000 wages", "Two children, $30,000 wages"]}
          numeric={[1, 2]}
          rows={[
            ["Taxable income", "$20,850", "$5,850"],
            ["Income tax before credits", "$2,148", "$585"],
            ["Child tax credit used against tax", "$2,148", "$585"],
            ["Refundable child tax credit", "$52", "$3,400"],
            ["Federal tax withheld", "$1,500", "$500"],
            ["Refund", "$1,552", "$3,900"],
          ]}
        />
        <p>
          The second parent had only $500 withheld but gets $3,900 back, because up to $1,700 a child is refundable (limited to 15% of earned income above $2,500). Both may also qualify for the
          earned income tax credit, which would add to the refund; these figures leave it out.
        </p>
      </GuideSection>

      <GuideSection id="no-withholding" n={9} kicker="Lower refunds" title="Income with nothing withheld">
        <p>
          The quickest way to lose a refund is income that has no tax taken from it: freelance and gig work, interest, dividends, a sale of shares or crypto, rental profit, or an IRA withdrawal
          where you declined withholding.
        </p>
        <WorkedExample
          title="The single filer from section 4, plus $8,000 of side-gig profit"
          steps={[
            { label: "Self-employment tax on $8,000", value: "$1,130" },
            { label: "Income tax rises from $5,620 to", value: "$6,779" },
            { label: "Total tax", value: "$7,909" },
            { label: "Federal tax withheld", value: "−$6,200" },
          ]}
          total={{ label: "Balance due", value: "$1,709" }}
        />
        <p>
          A $580 refund turns into a $1,709 bill. Side income brings self-employment tax as well as income tax, which is why the{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}suggests setting aside a share of every payment.
        </p>
      </GuideSection>

      <GuideSection id="what-changes" n={10} kicker="Scenarios" title="What changes your refund">
        <p>Starting from the single filer with a $580 refund, here is what each change on its own would do:</p>
        <DataTable
          caption="Single, $65,000 wages, $6,200 withheld, 2026"
          head={["Change", "New refund", "Change"]}
          numeric={[1, 2]}
          rows={[
            ["Nothing", "$580", "—"],
            ["$1,000 into a traditional IRA", "$700", "+$120"],
            ["$1,000 more pay, nothing extra withheld", "$460", "−$120"],
            ["$1,000 long-term capital gain", "$513", "−$68"],
            ["$1,000 of side-gig profit", "$349", "−$231"],
            ["$300 more withheld", "$880", "+$300"],
            ["One more child under 17", "$2,780", "+$2,200"],
          ]}
        />
        <Bars
          format={(n) => "$" + Math.round(n).toLocaleString("en-US")}
          items={[
            { label: "Side gig", value: 231 },
            { label: "Extra pay", value: 120 },
            { label: "Capital gain", value: 68 },
            { label: "IRA", value: 120 },
            { label: "More withheld", value: 300 },
            { label: "Child", value: 2200 },
          ]}
        />
        <p>
          The first four bars lower the refund and the last three raise it. A gig dollar costs more than a pay dollar because it carries self-employment tax; a long-term gain costs less
          because it is taxed at 0% or 15% here.
        </p>
      </GuideSection>

      <GuideSection id="deduction-credit" n={11} kicker="Rule of thumb" title="Deductions versus credits">
        <p>
          A deduction lowers taxable income, so it is worth your bracket rate: $1,000 of deductions saves $120 in the 12% bracket and $220 in the 22% bracket. A credit lowers the tax itself, so
          $1,000 of credit is worth $1,000.
        </p>
        <p>
          Adjustments (deductible IRA contributions, student loan interest, HSA contributions made outside payroll, educator expenses) work like deductions but come off before the standard
          deduction, so they help everyone, itemizer or not. The new 2025 to 2028 deductions for seniors, tips and overtime also sit on top of the standard deduction.
        </p>
      </GuideSection>

      <GuideSection id="itemizing" n={12} kicker="Deductions" title="Itemizing and the standard deduction">
        <p>
          You get the larger of the standard deduction and your itemized deductions, never both. For 2026 the standard deduction is $16,100 single, $32,200 married filing jointly and $24,150
          head of household. Only itemized deductions above that line change your refund.
        </p>
        <p>
          That is why a charity gift or extra mortgage interest often makes no difference: for most households the standard deduction is larger. In the calculator, the &ldquo;$1,000 more
          itemized deductions&rdquo; row shows &ldquo;no change&rdquo; until your itemized total passes the standard deduction.
        </p>
      </GuideSection>

      <GuideSection id="estimated" n={13} kicker="Paid in" title="Estimated payments and last year's overpayment">
        <p>
          Quarterly Form 1040-ES payments count toward what you paid in, exactly like withholding. So does any 2025 refund you chose to apply to 2026 instead of taking it as cash. Forgetting to
          enter either is a common reason a return shows a balance due that isn&rsquo;t real.
        </p>
        <p>
          If you have self-employment or investment income, the <a href="/us/taxes/estimated-tax-calculator">quarterly estimated tax calculator</a>{" "}shows how much to pay on each due date so
          the refund (or bill) at the end stays small.
        </p>
      </GuideSection>

      <GuideSection id="big-or-small" n={14} kicker="Choice" title="Is a big refund good?">
        <CompareCards
          columns={[
            {
              name: "A big refund",
              rows: [
                { label: "Upside", value: "Forced saving; no bill in April" },
                { label: "Downside", value: "Your money, held all year without interest" },
                { label: "Fix", value: "Lower withholding on Form W-4" },
              ],
            },
            {
              name: "A small refund or small bill",
              rows: [
                { label: "Upside", value: "More in every paycheck" },
                { label: "Downside", value: "Less cushion if something changes" },
                { label: "Aim", value: "Within a few hundred dollars of zero" },
              ],
            },
          ]}
        />
        <p>
          A $2,600 refund is $100 a paycheck for a biweekly earner. In a savings account that money would earn interest; with the IRS it earns nothing. On the other
          hand, a refund is a dependable lump sum many families plan around. Either is fine as long as it is a choice.
        </p>
      </GuideSection>

      <GuideSection id="owing" n={15} kicker="Balance due" title="If you owe instead">
        <p>
          A balance due is payable by April 15, 2027, even if you file for an extension. If you owe $1,000 or more, the IRS may add an underpayment penalty unless what you paid in during 2026
          covered the smaller of:
        </p>
        <ul>
          <li>90% of your 2026 tax, or</li>
          <li>100% of your 2025 tax (110% if your 2025 adjusted gross income was over $150,000, or $75,000 married filing separately).</li>
        </ul>
        <Callout tone="warn" title="Late-year fix">
          Withholding counts as paid evenly through the year, even if it happens in December. Raising withholding on your last few paychecks of 2026 can clear a penalty that a single late
          estimated payment would not.
        </Callout>
      </GuideSection>

      <GuideSection id="timing" n={16} kicker="Payment" title="When the refund arrives">
        <Timeline
          items={[
            { when: "Late January 2027", what: "IRS starts accepting 2026 returns", detail: "The 2026 filing season opened on January 26; expect a similar date." },
            { when: "Within 21 days", what: "Most e-filed refunds with direct deposit", detail: "Paper returns take several weeks longer." },
            { when: "Mid-February or later", what: "Refunds that include the EITC or the refundable child tax credit", detail: "By law these can't be issued before mid-February, so early filers usually see them around the start of March." },
            { when: "April 15, 2027", what: "Filing deadline", detail: "Three years from the due date to claim a refund before it is lost." },
          ]}
        />
        <p>
          The Treasury began phasing out paper refund checks on September 30, 2025. Give bank account details on your return; without them the IRS writes to ask, and a paper check is a last
          resort after several weeks. Track a refund with &ldquo;Where&rsquo;s My Refund?&rdquo; on irs.gov.
        </p>
      </GuideSection>

      <GuideSection id="offsets" n={17} kicker="Exceptions" title="When a refund is held or reduced">
        <p>
          The Treasury Offset Program can take all or part of a federal refund to pay past-due child support, defaulted federal debts and some state tax or unemployment debts. You get a notice
          explaining the offset. The IRS also holds refunds while it checks a return that doesn&rsquo;t match its records, for example missing 1099 income or a dependent claimed by two people.
        </p>
      </GuideSection>

      <GuideSection id="next-year" n={18} kicker="Planning" title="Getting it right next year">
        <p>
          Once you know this year&rsquo;s result, fix next year&rsquo;s at the source. A new Form W-4 changes withholding from your next paycheck. For a refund that is too big, add deductions in
          Step 4(b) or credits in Step 3; for a balance due, add other income in Step 4(a) or a dollar amount in Step 4(c).
        </p>
        <p>Check again in January and after any big change: a new job, marriage or divorce, a new child, or a large raise or bonus.</p>
      </GuideSection>

      <GuideSection id="state" n={19} kicker="State" title="State refunds are separate">
        <p>
          This calculator covers your federal return only. Most states with an income tax have their own return, withholding and refund, worked out on different deductions and rates. Nine
          states have no income tax on wages. A state refund you deducted on last year&rsquo;s itemized federal return may be taxable income this year.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Counting Social Security and Medicare as tax withheld. Only federal income tax withholding counts.</li>
          <li>Entering wages after 401(k) as gross pay, then taking the 401(k) off again.</li>
          <li>Forgetting a second W-2 or a 1099, which changes the refund and brings an IRS letter later.</li>
          <li>Expecting a deduction to come back dollar for dollar. Only credits do.</li>
          <li>Claiming a child who doesn&rsquo;t have a Social Security number valid for work, or who lived with you less than half the year.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "$16,100", label: "Standard deduction, single" },
            { value: "$32,200", label: "Standard deduction, joint" },
            { value: "$24,150", label: "Standard deduction, head of household" },
            { value: "$2,200", label: "Child tax credit per child" },
            { value: "$1,700", label: "Refundable per child" },
            { value: "$1,000", label: "Balance due before penalties may apply" },
            { value: "April 15, 2027", label: "Filing and payment deadline" },
            { value: "21 days", label: "Most e-filed refunds" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

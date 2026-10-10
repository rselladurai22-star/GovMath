import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Child tax credit: the guide. Figures from src/lib/us/credits-payroll.ts (childCredit, familyCredits) and tax-2026.ts (2026 rates). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "amount", title: "How much the credit is in 2026" },
  { id: "qualifying", title: "Who counts as a qualifying child" },
  { id: "ssn", title: "Social Security number rules" },
  { id: "other-dependents", title: "The $500 credit for other dependents" },
  { id: "two-parts", title: "The two parts: tax cut and refund" },
  { id: "refundable", title: "How the refundable part is worked out" },
  { id: "low-income", title: "Example: a low-income family" },
  { id: "middle-income", title: "Example: a middle-income family" },
  { id: "ladder", title: "The credit as income rises" },
  { id: "three-children", title: "Three or more children" },
  { id: "phase-out", title: "The income phase-out" },
  { id: "high-income", title: "Example: a high-income family" },
  { id: "form", title: "Schedule 8812, step by step" },
  { id: "eitc", title: "The credit and the EITC together" },
  { id: "withholding", title: "Getting the credit in your paychecks" },
  { id: "timing", title: "When the refund arrives" },
  { id: "separated", title: "Divorced and separated parents" },
  { id: "history", title: "How the credit has changed" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: Rev. Proc. 2025-32, 2026 inflation adjustments (section 4.05)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "IRS: Child tax credit", href: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit" },
  { label: "IRS: Schedule 8812 (Form 1040) and instructions", href: "https://www.irs.gov/forms-pubs/about-schedule-8812-form-1040" },
  { label: "IRS: One, Big, Beautiful Bill provisions", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions" },
  { label: "IRS: Form 8332, release of claim to exemption for child of divorced or separated parents", href: "https://www.irs.gov/forms-pubs/about-form-8332" },
  { label: "IRS: Form W-4, Employee's Withholding Certificate", href: "https://www.irs.gov/forms-pubs/about-form-w-4" },
];

export default function ChildCreditGuide() {
  return (
    <Guide
      kicker="The child tax credit guide"
      title="The 2026 child tax credit, explained"
      intro={
        <>
          The child tax credit is the biggest tax break most families get. For 2026 it is $2,200 for each child under 17, and part of it can come back as a
          refund. This guide explains who qualifies, how the refundable part works, where the phase-out starts and how Schedule 8812 puts it together.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>$2,200 for each qualifying child under 17 at the end of 2026.</li>
          <li>Up to $1,700 a child is refundable: you can get it even if you owe no income tax, as long as you earn more than $2,500.</li>
          <li>$500 for each other dependent, such as a 17-year-old or a parent you support. This part is not refundable.</li>
          <li>The credit falls by $50 for each $1,000 of income above $200,000 ($400,000 married filing jointly).</li>
        </ul>
        <KeyStats
          items={[
            { value: "$2,200", label: "Credit per child under 17" },
            { value: "$1,700", label: "Most refundable per child" },
            { value: "$500", label: "Credit per other dependent" },
            { value: "$400,000", label: "Phase-out start, joint ($200,000 others)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="amount" n={2} kicker="2026" title="How much the credit is in 2026">
        <p>
          The One Big Beautiful Bill Act set the credit at $2,200 a child from 2025, made it permanent and tied it to inflation from 2026. The IRS confirmed in
          Rev. Proc. 2025-32 that the 2026 credit stays at $2,200 and the refundable amount is $1,700. Adjustments go in $100 steps, so the credit can rise in
          later years once inflation adds up.
        </p>
        <p>
          It is a credit, not a deduction: it comes straight off your tax bill, dollar for dollar. A $2,200 credit saves $2,200, whatever your tax bracket.
        </p>
      </GuideSection>

      <GuideSection id="qualifying" n={3} kicker="Eligibility" title="Who counts as a qualifying child">
        <p>Every one of these tests must be met for each child:</p>
        <ul>
          <li><strong>Age.</strong>{" "}Under 17 on December 31, 2026. A child who turns 17 during the year counts only for the $500 credit.</li>
          <li><strong>Relationship.</strong>{" "}Your son, daughter, stepchild, eligible foster child, brother, sister, half-sibling or stepsibling, or a descendant of any of them.</li>
          <li><strong>Residency.</strong>{" "}Lived with you for more than half the year. Time away at school, in hospital or in juvenile detention usually counts as time with you.</li>
          <li><strong>Support.</strong>{" "}Did not pay for more than half of their own support.</li>
          <li><strong>Dependent.</strong>{" "}You claim the child as a dependent, and the child does not file a joint return (except to get a refund).</li>
          <li><strong>Citizenship.</strong>{" "}A U.S. citizen, national or resident alien.</li>
        </ul>
      </GuideSection>

      <GuideSection id="ssn" n={4} kicker="Eligibility" title="Social Security number rules">
        <p>
          The child must have a Social Security number that is valid for employment, issued by the due date of your return. From 2025, the parent claiming the
          credit also needs an SSN. On a joint return, one spouse having an SSN is enough. A child with an Individual Taxpayer Identification Number (ITIN)
          instead of an SSN cannot get the $2,200 credit, but can still bring the $500 credit for other dependents.
        </p>
      </GuideSection>

      <GuideSection id="other-dependents" n={5} kicker="Other dependents" title="The $500 credit for other dependents">
        <p>
          Dependents who do not qualify for the child tax credit can bring a $500 credit instead. That includes children aged 17 and 18, full-time students
          aged 19 to 23, parents, grandparents and other relatives you support, and children without an SSN. The $500 credit is not refundable: it can only
          cut tax you owe. It shares the same phase-out as the child credit.
        </p>
      </GuideSection>

      <GuideSection id="two-parts" n={6} kicker="How it works" title="The two parts: tax cut and refund">
        <p>The credit works in two steps:</p>
        <CompareCards
          columns={[
            {
              name: "Non-refundable part",
              rows: [
                { label: "What it does", value: "Cuts your income tax" },
                { label: "Limit", value: "Your income tax before credits" },
                { label: "Counts", value: "Child and other dependent credits" },
              ],
            },
            {
              name: "Additional child tax credit",
              rows: [
                { label: "What it does", value: "Paid to you as a refund" },
                { label: "Limit", value: "$1,700 a child" },
                { label: "Also limited to", value: "15% of earnings over $2,500" },
              ],
            },
          ]}
        />
        <p>
          First the credit wipes out income tax. Whatever is left over can be refunded, up to $1,700 for each child and up to 15% of your earned income above
          $2,500. Social Security and Medicare are not reduced; the credit only works against income tax.
        </p>
      </GuideSection>

      <GuideSection id="refundable" n={7} kicker="How it works" title="How the refundable part is worked out">
        <p>
          The refundable part, called the additional child tax credit (ACTC), is the smallest of three figures: the credit left after your tax is cleared,
          $1,700 times the number of qualifying children, and 15% of your earned income above $2,500. Earned income means wages, salary, tips and net
          self-employment earnings. Interest, dividends, pensions, unemployment and child support do not count.
        </p>
        <DataTable
          caption="Earnings needed for the full refundable amount"
          head={["Children", "Most refundable", "Earned income needed"]}
          numeric={[1, 2]}
          rows={[
            ["1", "$1,700", "$13,833"],
            ["2", "$3,400", "$25,167"],
            ["3", "$5,100", "$36,500"],
          ]}
        />
      </GuideSection>

      <GuideSection id="low-income" n={8} kicker="Worked example" title="Example: a low-income family">
        <p>A single parent filing as head of household earns $30,000 in wages and has two children under 17.</p>
        <WorkedExample
          title="Head of household, $30,000 wages, two children"
          steps={[
            { label: "Full credit: 2 × $2,200", value: "$4,400" },
            { label: "Income tax before credits", value: "$585" },
            { label: "Used against tax", value: "$585" },
            { label: "Left over", value: "$3,815" },
            { label: "Refundable limit: 2 × $1,700", value: "$3,400" },
            { label: "15% of ($30,000 − $2,500)", value: "$4,125" },
          ]}
          total={{ label: "Credit received: $585 + $3,400", value: "$3,985" }}
        />
        <p>
          $415 of the credit cannot be used: there is no tax left to cut, and the refund is capped at $1,700 a child. This family could also get about $6,029
          from the earned income credit.
        </p>
      </GuideSection>

      <GuideSection id="middle-income" n={9} kicker="Worked example" title="Example: a middle-income family">
        <p>
          A married couple filing jointly earns $90,000 with two children. Their income tax before credits is $6,440, so the whole $4,400 credit cuts their tax,
          leaving $2,040 to pay. No refundable part is needed. At $60,000, the same family has $2,840 of tax: the credit clears it and the other $1,560 is
          refunded, so they still get the full $4,400.
        </p>
        <Callout tone="good" title="The full credit, one way or another">
          A married couple with two children gets the full $4,400 at any wage from about $45,000 up to $400,000, partly as a tax cut and partly as a refund.
        </Callout>
      </GuideSection>

      <GuideSection id="ladder" n={10} kicker="Visual" title="The credit as income rises">
        <p>
          For a married couple with two children and only wages, the credit builds up with earnings and then stays flat until the phase-out at $400,000:
        </p>
        <Bars
          format={usd}
          items={[
            { label: "$5,000", value: 375 },
            { label: "$10,000", value: 1125 },
            { label: "$20,000", value: 2625 },
            { label: "$30,000", value: 3400 },
            { label: "$40,000", value: 4180 },
            { label: "$50,000", value: 4400 },
            { label: "$75,000", value: 4400 },
          ]}
        />
        <p>
          Up to $30,000 it is all refund, because the standard deduction of $32,200 leaves no tax to cut. The refund is capped at $3,400, and above $30,000
          the tax cut makes up the rest of the $4,400.
        </p>
      </GuideSection>

      <GuideSection id="three-children" n={11} kicker="Larger families" title="Three or more children">
        <p>
          With three or more qualifying children, Schedule 8812 offers a second way to work out the refundable limit: the Social Security and Medicare tax you
          paid (plus half of any self-employment tax), less your earned income credit. You get the larger of that and the 15% figure. In practice this helps
          only when the EITC is small, because the EITC usually takes the payroll figure to zero. A couple earning $28,000 with three children gets $3,825
          refundable (15% of $25,500) and an EITC of $8,231.
        </p>
      </GuideSection>

      <GuideSection id="phase-out" n={12} kicker="Higher incomes" title="The income phase-out">
        <p>
          The credit falls by $50 for each $1,000, or part of $1,000, of modified AGI above $200,000 ($400,000 married filing jointly). These thresholds are
          not adjusted for inflation. Modified AGI is your AGI plus any foreign income you excluded; for most people it is simply AGI.
        </p>
        <DataTable
          caption="Where the credit runs out (modified AGI, children under 17 only)"
          head={["Children", "Single or head of household", "Married filing jointly"]}
          numeric={[1, 2]}
          rows={[
            ["1", "$243,000", "$443,000"],
            ["2", "$287,000", "$487,000"],
            ["3", "$331,000", "$531,000"],
          ]}
        />
      </GuideSection>

      <GuideSection id="high-income" n={13} kicker="Worked example" title="Example: a high-income family">
        <WorkedExample
          title="Married filing jointly, $440,000, two children"
          steps={[
            { label: "Full credit", value: "$4,400" },
            { label: "Over the threshold: $440,000 − $400,000", value: "$40,000" },
            { label: "Reduction: 40 × $50", value: "−$2,000" },
          ]}
          total={{ label: "Credit after the phase-out", value: "$2,400" }}
        />
        <p>
          A single parent earning $220,000 with one child loses $1,000 and keeps $1,200. Pre-tax savings lower AGI: every $1,000 put into a traditional
          401(k) or HSA wins back $50 of credit on top of the tax it saves. The <a href="/us/savings/401k-calculator">401(k) calculator</a>{" "}shows what that
          does to your savings.
        </p>
      </GuideSection>

      <GuideSection id="form" n={14} kicker="Filing" title="Schedule 8812, step by step">
        <ol>
          <li>Count qualifying children (× $2,200) and other dependents (× $500).</li>
          <li>Take off $50 for each $1,000 of modified AGI over the threshold (line 12).</li>
          <li>Use the credit against your income tax, up to the tax you owe (line 14).</li>
          <li>Take the leftover (line 16a), the $1,700-a-child cap (line 16b) and 15% of earnings over $2,500 (line 20).</li>
          <li>With three or more children, compare with payroll taxes less the EITC (line 25).</li>
          <li>The smallest allowed figure is your additional child tax credit (line 27), which goes on Form 1040 line 28.</li>
        </ol>
        <p>
          The leftover on line 16a includes any unused $500 credit, so a family with one child and one older dependent can still get the full $1,700 refunded
          when tax uses up part of the credit. The calculator above follows the form&rsquo;s order.
        </p>
      </GuideSection>

      <GuideSection id="eitc" n={15} kicker="Other credits" title="The credit and the EITC together">
        <p>
          Lower-income working families can get both credits. They are worked out separately, and the earned income credit is fully refundable. A single
          parent with one child earning $25,000 gets about $4,250 of EITC on top of the child credit. See the{" "}
          <a href="/us/taxes/earned-income-credit-calculator">earned income credit calculator</a>{" "}for your figure, and the{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}for the whole return.
        </p>
      </GuideSection>

      <GuideSection id="withholding" n={16} kicker="Paychecks" title="Getting the credit in your paychecks">
        <p>
          You do not have to wait for a refund. On step 3 of Form W-4, multiply the number of children under 17 by $2,200 and other dependents by $500. Your
          employer then withholds less federal tax each payday. The refundable part beyond your tax still comes only when you file. The{" "}
          <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}shows how much more you take home.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={17} kicker="Refunds" title="When the refund arrives">
        <p>
          The PATH Act stops the IRS from issuing refunds that include the additional child tax credit or the earned income credit before mid-February. The
          IRS uses the time to check for fraud. If you file online early with direct deposit and there are no problems, most of these refunds arrive by early
          March 2027.
        </p>
      </GuideSection>

      <GuideSection id="separated" n={18} kicker="Special cases" title="Divorced and separated parents">
        <p>
          Only one person can claim the credit for each child. Usually that is the custodial parent: the one the child lived with for more nights in the year.
          The custodial parent can let the other parent claim the child, and the credit, by signing Form 8332. The custodial parent keeps head of household
          status and the earned income credit, which cannot be passed over. If parents share custody exactly, the tie-breaker rules give the child to the
          parent with the higher AGI.
        </p>
      </GuideSection>

      <GuideSection id="history" n={19} kicker="Background" title="How the credit has changed">
        <Timeline
          items={[
            { when: "2018", what: "$2,000 a child", detail: "The Tax Cuts and Jobs Act doubled the credit, raised the phase-out to $200,000/$400,000 and added the $500 credit for other dependents." },
            { when: "2021", what: "$3,000 to $3,600, fully refundable", detail: "The American Rescue Plan raised the credit for one year and paid half in monthly advance payments." },
            { when: "2022", what: "Back to $2,000", detail: "The refundable part rose with inflation: $1,500 in 2022, $1,600 in 2023 and $1,700 in 2024 and 2025." },
            { when: "2025", what: "$2,200, made permanent", detail: "The One Big Beautiful Bill Act raised the credit and added the SSN rule for the parent." },
            { when: "2026", what: "$2,200, refundable $1,700", detail: "The first year of inflation adjustment, confirmed in Rev. Proc. 2025-32." },
          ]}
        />
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Avoid" title="Common mistakes">
        <ul>
          <li>Claiming a child who turned 17 during the year. They count for $500, not $2,200.</li>
          <li>Both parents claiming the same child. The IRS will reject the second return and may hold the refund.</li>
          <li>Forgetting the $500 credit for older children, students and relatives you support.</li>
          <li>Leaving step 3 of Form W-4 blank and waiting months for money you could have had in each paycheck.</li>
          <li>Counting interest, child support or unemployment as earned income for the refundable part.</li>
        </ul>
        <Callout tone="warn" title="Wrong claims have a cost">
          If the IRS finds a claim was reckless or careless, it can bar you from the credit for two years; for fraud, ten years. Keep records showing where
          each child lived.
        </Callout>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "$2,200", label: "Credit per child under 17" },
            { value: "$1,700", label: "Refundable per child" },
            { value: "$500", label: "Credit per other dependent" },
            { value: "$2,500", label: "Earnings before the refund starts" },
            { value: "15%", label: "Of earnings above $2,500, refundable" },
            { value: "$200,000", label: "Phase-out start (single, head of household)" },
            { value: "$400,000", label: "Phase-out start (married filing jointly)" },
            { value: "$50", label: "Lost per $1,000 above the threshold" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** EITC: the guide. Figures from src/lib/us/credits-payroll.ts (eitc, EITC_2026), which holds the Rev. Proc. 2025-32 table. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What the EITC is" },
  { id: "table", title: "The 2026 EITC table" },
  { id: "shape", title: "Phase-in, plateau and phase-out" },
  { id: "phase-in", title: "Example: in the phase-in" },
  { id: "phase-out", title: "Example: in the phase-out" },
  { id: "joint", title: "Married couples and the joint limits" },
  { id: "marriage", title: "The marriage penalty" },
  { id: "earned", title: "What counts as earned income" },
  { id: "agi", title: "When AGI is bigger than earnings" },
  { id: "investment", title: "The $12,200 investment income limit" },
  { id: "child", title: "Who is a qualifying child" },
  { id: "childless", title: "Workers without children" },
  { id: "ssn", title: "Social Security numbers and residency" },
  { id: "separate", title: "Married filing separately" },
  { id: "self-employed", title: "Self-employed workers" },
  { id: "other-credits", title: "The EITC with other credits" },
  { id: "timing", title: "When the refund arrives" },
  { id: "benefits", title: "The EITC and public benefits" },
  { id: "mistakes", title: "Mistakes and audits" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "IRS: Rev. Proc. 2025-32, 2026 inflation adjustments (section 4.06)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "IRS: Earned income tax credit (EITC)", href: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc" },
  { label: "IRS: Who qualifies for the earned income tax credit", href: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/who-qualifies-for-the-earned-income-tax-credit-eitc" },
  { label: "IRS: Qualifying child rules", href: "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit/qualifying-child-rules" },
  { label: "IRS: Publication 596, Earned Income Credit", href: "https://www.irs.gov/publications/p596" },
  { label: "26 U.S.C. § 32, Earned income (Cornell LII)", href: "https://www.law.cornell.edu/uscode/text/26/32" },
];

export default function EitcGuide() {
  return (
    <Guide
      kicker="The EITC guide"
      title="The 2026 earned income tax credit, explained"
      intro={
        <>
          The earned income tax credit (EITC) is a refundable credit for people who work and earn low to moderate incomes. In 2026 it is worth up to $8,231
          for a family with three or more children. This guide explains the 2026 table, how the credit rises and falls with income and who qualifies.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Up to $664 with no children, $4,427 with one, $7,316 with two and $8,231 with three or more.</li>
          <li>You need earned income: wages, tips or self-employment profit.</li>
          <li>It is fully refundable, so you get it even if you owe no income tax.</li>
          <li>It ends at $19,540 to $62,974 of income for single filers, and $26,820 to $70,244 for joint filers.</li>
          <li>Investment income over $12,200 rules you out.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$8,231", label: "Maximum, three or more children" },
            { value: "$7,316", label: "Maximum, two children" },
            { value: "$4,427", label: "Maximum, one child" },
            { value: "$664", label: "Maximum, no children" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What the EITC is">
        <p>
          Congress created the credit in 1975 to reward work and offset Social Security and Medicare taxes for lower-paid workers. The amount depends on three things: your earned income, your adjusted gross income (AGI) and how many qualifying children you
          have. Filing status changes where the phase-out starts.
        </p>
      </GuideSection>

      <GuideSection id="table" n={3} kicker="2026" title="The 2026 EITC table">
        <p>The IRS published these figures in Rev. Proc. 2025-32 for tax year 2026:</p>
        <DataTable
          caption="2026 earned income credit parameters"
          head={["", "No children", "One child", "Two children", "Three or more"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["Credit rate (phase-in)", "7.65%", "34%", "40%", "45%"],
            ["Earnings for the maximum", "$8,680", "$13,020", "$18,290", "$18,290"],
            ["Maximum credit", "$664", "$4,427", "$7,316", "$8,231"],
            ["Phase-out rate", "7.65%", "15.98%", "21.06%", "21.06%"],
            ["Phase-out starts (single, HoH)", "$10,860", "$23,890", "$23,890", "$23,890"],
            ["Credit ends (single, HoH)", "$19,540", "$51,593", "$58,629", "$62,974"],
            ["Phase-out starts (joint)", "$18,140", "$31,160", "$31,160", "$31,160"],
            ["Credit ends (joint)", "$26,820", "$58,863", "$65,899", "$70,244"],
          ]}
        />
      </GuideSection>

      <GuideSection id="shape" n={4} kicker="How it works" title="Phase-in, plateau and phase-out">
        <p>The credit has three stages, shaped like a flat-topped hill:</p>
        <ul>
          <li><strong>Phase-in.</strong>{" "}The credit is a percentage of your earnings: 34 cents for each dollar with one child, 40 cents with two, 45 cents with three or more.</li>
          <li><strong>Plateau.</strong>{" "}Once earnings reach the &quot;earned income amount&quot;, you get the maximum, until income reaches the phase-out start.</li>
          <li><strong>Phase-out.</strong>{" "}Above that, the credit falls by 15.98 cents (one child) or 21.06 cents (two or more) for each extra dollar, until it reaches zero.</li>
        </ul>
        <p>For a single parent with one child, the credit at different earnings looks like this:</p>
        <Bars
          format={usd}
          items={[
            { label: "$5,000", value: 1700 },
            { label: "$10,000", value: 3400 },
            { label: "$15,000", value: 4427 },
            { label: "$20,000", value: 4427 },
            { label: "$30,000", value: 3451 },
            { label: "$40,000", value: 1853 },
            { label: "$50,000", value: 255 },
          ]}
        />
      </GuideSection>

      <GuideSection id="phase-in" n={5} kicker="Worked example" title="Example: in the phase-in">
        <WorkedExample
          title="Single parent, one child, $10,000 of wages"
          steps={[
            { label: "Credit rate", value: "34%" },
            { label: "34% × $10,000", value: "$3,400" },
            { label: "Maximum for one child", value: "$4,427" },
          ]}
          total={{ label: "EITC", value: "$3,400" }}
        />
        <p>
          In the phase-in, more work pays twice: the extra wage, and 34 cents more credit on each dollar. A parent with two children earning $20,000 is on the
          plateau and gets the full $7,316.
        </p>
      </GuideSection>

      <GuideSection id="phase-out" n={6} kicker="Worked example" title="Example: in the phase-out">
        <WorkedExample
          title="Single parent, two children, $35,000 of wages"
          steps={[
            { label: "Maximum credit", value: "$7,316" },
            { label: "Income above $23,890", value: "$11,110" },
            { label: "Reduction: 21.06% × $11,110", value: "−$2,340" },
          ]}
          total={{ label: "EITC", value: "$4,976" }}
        />
        <p>
          The same income on a joint return gives $6,507, because the joint phase-out starts $7,270 higher. A worker with no children earning $15,000 gets
          $347.
        </p>
      </GuideSection>

      <GuideSection id="joint" n={7} kicker="Filing status" title="Married couples and the joint limits">
        <p>
          On a joint return, the phase-out starts at $31,160 with children ($18,140 without), about $7,300 higher than for single filers. Both spouses&rsquo;
          earnings and AGI are added together. Head of household filers use the single limits.
        </p>
        <DataTable
          caption="EITC for a married couple filing jointly"
          head={["Joint income", "One child", "Two children", "Three or more"]}
          numeric={[1, 2, 3]}
          rows={[
            ["$30,000", "$4,427", "$7,316", "$8,231"],
            ["$40,000", "$3,014", "$5,454", "$6,369"],
            ["$50,000", "$1,416", "$3,348", "$4,263"],
            ["$60,000", "$0", "$1,242", "$2,157"],
          ]}
        />
      </GuideSection>

      <GuideSection id="marriage" n={8} kicker="Filing status" title="The marriage penalty">
        <p>The higher joint limits do not fully make up for adding a second income:</p>
        <CompareCards
          columns={[
            {
              name: "Not married",
              rows: [
                { label: "Parent, head of household, $25,000, two children", value: "$7,082" },
                { label: "Partner, single, $25,000, no children", value: "$0" },
                { label: "Total EITC", value: "$7,082" },
              ],
            },
            {
              name: "Married, filing jointly",
              rows: [
                { label: "Joint income", value: "$50,000" },
                { label: "Two children", value: "Yes" },
                { label: "Total EITC", value: "$3,348" },
              ],
            },
          ]}
        />
        <p>Marrying would cost this couple $3,734 of credit. It is worth checking before choosing a wedding date near the end of the year.</p>
      </GuideSection>

      <GuideSection id="earned" n={9} kicker="Income" title="What counts as earned income">
        <p>Earned income includes:</p>
        <ul>
          <li>Wages, salary and tips that are taxable (Form W-2 box 1).</li>
          <li>Net earnings from self-employment, after half of self-employment tax.</li>
          <li>Union strike benefits, and long-term disability pay received before minimum retirement age.</li>
          <li>Nontaxable combat pay, if you choose to include it.</li>
        </ul>
        <p>
          It does not include interest, dividends, pensions, Social Security, unemployment benefits, alimony, child support, or pay received while an inmate.
          Pre-tax 401(k) contributions are left out too, because they are not in box 1.
        </p>
      </GuideSection>

      <GuideSection id="agi" n={10} kicker="Income" title="When AGI is bigger than earnings">
        <p>
          The phase-out uses whichever is larger: your AGI or your earned income. Unemployment, a pension or interest can push AGI above your earnings and cut
          the credit. A single parent with one child who earns $20,000 and has $10,000 of other income gets $3,451, not the $4,427 maximum, because the
          phase-out is worked out on $30,000.
        </p>
      </GuideSection>

      <GuideSection id="investment" n={11} kicker="Income" title="The $12,200 investment income limit">
        <p>
          If your investment income is more than $12,200 in 2026, you cannot claim the EITC at all. There is no gradual reduction: $1 over the line removes
          the whole credit. Investment income counts taxable and tax-exempt interest, dividends, net capital gains, net rents and royalties, and net passive
          income.
        </p>
        <Callout tone="warn" title="A cliff, not a slope">
          Selling shares or a rental property in a year you would otherwise claim the credit can cost thousands. Spreading a sale over two years may help.
        </Callout>
      </GuideSection>

      <GuideSection id="child" n={12} kicker="Eligibility" title="Who is a qualifying child">
        <p>A qualifying child for the EITC must pass four tests:</p>
        <ul>
          <li><strong>Relationship.</strong>{" "}Your child, stepchild, foster child, brother, sister, half- or step-sibling, or a descendant of any of them.</li>
          <li><strong>Age.</strong>{" "}Under 19 at the end of the year, under 24 if a full-time student, or any age if permanently and totally disabled, and younger than you (or your spouse).</li>
          <li><strong>Residency.</strong>{" "}Lived with you in the United States for more than half the year.</li>
          <li><strong>Joint return.</strong>{" "}Did not file a joint return, unless only to claim a refund.</li>
        </ul>
        <p>
          The EITC age limit is higher than the child tax credit&rsquo;s (under 17), so an 18-year-old can bring you the EITC but only the $500 credit for
          other dependents. The support test does not apply to the EITC.
        </p>
      </GuideSection>

      <GuideSection id="childless" n={13} kicker="Eligibility" title="Workers without children">
        <p>
          Workers without a qualifying child can get up to $664. You (or your spouse, on a joint return) must be at least 25 and under 65 at the end of 2026,
          you must have lived in the United States for more than half the year, and nobody else can claim you as a dependent or qualifying child. The credit
          ends at $19,540 ($26,820 joint).
        </p>
      </GuideSection>

      <GuideSection id="ssn" n={14} kicker="Eligibility" title="Social Security numbers and residency">
        <p>
          You, your spouse on a joint return and each qualifying child need a Social Security number that is valid for work, issued by the due date of the
          return. An ITIN is not enough. You must be a U.S. citizen or resident alien for the whole year, unless you are married to a citizen or resident and
          choose to be taxed as a resident. People who file Form 2555 to exclude foreign earnings cannot claim it.
        </p>
      </GuideSection>

      <GuideSection id="separate" n={15} kicker="Filing status" title="Married filing separately">
        <p>
          Since 2021, a married person filing separately can claim the EITC if a qualifying child lived with them for more than half the year and they either
          lived apart from their spouse for the last six months of the year, or are legally separated under a written agreement or court decree and did not
          live in the same home at the end of the year. They use the single limits.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={16} kicker="Special cases" title="Self-employed workers">
        <p>
          Net self-employment earnings count as earned income, after the deduction for half of self-employment tax. A loss reduces your earned income. Because
          the IRS checks self-employment claims closely, keep receipts and records of your income. The{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}shows the tax on your profit.
        </p>
      </GuideSection>

      <GuideSection id="other-credits" n={17} kicker="Other credits" title="The EITC with other credits">
        <p>
          The EITC stacks with the child tax credit. A single parent with one child earning $25,000 gets about $4,250 of EITC and the $2,200 child credit,
          partly as a refund. See the <a href="/us/taxes/child-tax-credit-calculator">child tax credit calculator</a>, and the{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}for your whole return. Many states and DC also have their own earned income
          credit, usually a percentage of the federal one.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={18} kicker="Refunds" title="When the refund arrives">
        <p>
          Under the PATH Act, the IRS holds refunds that include the EITC or the additional child tax credit until mid-February. Filing early does not change
          that, but filing online with direct deposit means most of these refunds arrive by early March. Free filing help is available at Volunteer Income
          Tax Assistance (VITA) sites.
        </p>
      </GuideSection>

      <GuideSection id="benefits" n={19} kicker="Benefits" title="The EITC and public benefits">
        <p>
          Federal law says a tax refund, including the EITC, does not count as income for federal means-tested benefits such as SNAP, Medicaid, SSI or
          housing assistance, and does not count as a resource for 12 months after you get it. Saving part of the refund is therefore safe for these
          programs.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Avoid" title="Mistakes and audits">
        <ul>
          <li>Claiming a child who did not live with you for more than half the year.</li>
          <li>Two people claiming the same child: tie-breaker rules decide, usually in favor of the parent.</li>
          <li>Reporting income wrongly, such as leaving out self-employment income or adding invented income to raise the credit.</li>
          <li>Using the single limits when married and not meeting the separated-spouse rules.</li>
        </ul>
        <Callout tone="warn" title="Bans for wrong claims">
          A credit claimed in error must be repaid with interest. If the IRS finds a claim reckless, it can ban you for two years; for fraud, ten years.
        </Callout>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "$8,231", label: "Maximum EITC, 2026" },
            { value: "$70,244", label: "Highest joint income with a credit" },
            { value: "$62,974", label: "Highest single income with a credit" },
            { value: "$12,200", label: "Investment income limit" },
            { value: "45%", label: "Phase-in rate, three or more children" },
            { value: "21.06%", label: "Phase-out rate, two or more children" },
            { value: "25 to 64", label: "Age range without children" },
            { value: "Mid-February", label: "Earliest EITC refunds" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

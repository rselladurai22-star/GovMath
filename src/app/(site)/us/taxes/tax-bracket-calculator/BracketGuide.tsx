import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The tax bracket guide. Figures from src/lib/us/tax-2026.ts (tax year 2026). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How brackets work" },
  { id: "single", title: "2026 brackets: single" },
  { id: "joint", title: "2026 brackets: married filing jointly" },
  { id: "hoh", title: "Head of household and filing separately" },
  { id: "taxable", title: "Brackets apply to taxable income" },
  { id: "example", title: "Example: $80,000, single" },
  { id: "example-joint", title: "Example: $150,000, married" },
  { id: "marginal", title: "Marginal and effective rates" },
  { id: "table", title: "Effective rates at common incomes" },
  { id: "myth", title: "The raise myth" },
  { id: "status", title: "How filing status changes your bracket" },
  { id: "marriage", title: "Marriage penalty or bonus" },
  { id: "gains", title: "Capital gains have their own brackets" },
  { id: "other", title: "Other taxes on top" },
  { id: "planning", title: "Using your bracket to plan" },
  { id: "inflation", title: "Why brackets change each year" },
  { id: "hoh-example", title: "Example: head of household, $60,000" },
  { id: "paycheck", title: "Brackets and your paycheck" },
  { id: "history", title: "Where today’s rates came from" },
  { id: "states", title: "State brackets are separate" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "deductions-worth", title: "What a deduction is worth in each bracket" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS — 2026 inflation adjustments (Rev. Proc. 2025-32)", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
  { label: "IRS — Federal income tax rates and brackets", href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets" },
  { label: "IRS — Filing status", href: "https://www.irs.gov/filing/filing-status" },
  { label: "Tax Foundation — 2026 tax brackets", href: "https://taxfoundation.org/data/all/federal/2026-tax-brackets/" },
];

export default function BracketGuide() {
  return (
    <Guide
      kicker="The tax bracket guide"
      title="How the 2026 federal tax brackets work"
      intro={
        <>
          The United States taxes income in layers. Your bracket is the rate on your top layer, not on all your income, which is why your real tax rate is
          lower than your bracket. This guide sets out the 2026 brackets for every filing status and shows, with worked examples, how to use them.
        </>
      }
      meta={["Tax year 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>There are seven rates in 2026: 10%, 12%, 22%, 24%, 32%, 35% and 37%.</li>
          <li>Each rate applies only to the slice of taxable income inside its band.</li>
          <li>Your bracket (marginal rate) is the rate on your last dollar. Your effective rate is your total tax divided by your income.</li>
          <li>A single person earning $80,000 is in the 22% bracket but pays $8,770, about 11% of income.</li>
        </ul>
        <KeyStats
          items={[
            { value: "7", label: "Federal tax rates" },
            { value: "$50,400", label: "Top of the 12% band, single" },
            { value: "$100,800", label: "Top of the 12% band, joint" },
            { value: "37%", label: "Top rate, over $640,600 single" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How brackets work">
        <p>
          Picture your taxable income poured into a row of buckets. The first bucket holds the first $12,400 (for a single filer) and is taxed at 10%.
          Once it is full, the next dollars go into the 12% bucket, and so on. Only the dollars in each bucket pay that bucket&rsquo;s rate.
        </p>
        <p>This is called a progressive system. It means everyone pays the same tax on their first $12,400, whether they earn $20,000 or $2 million.</p>
      </GuideSection>

      <GuideSection id="single" n={3} kicker="Rates" title="2026 brackets: single">
        <DataTable
          caption="Single filers, 2026 taxable income"
          head={["Rate", "Taxable income", "Tax at the top of the band"]}
          numeric={[2]}
          rows={[
            ["10%", "$0 to $12,400", "$1,240"],
            ["12%", "$12,400 to $50,400", "$5,800"],
            ["22%", "$50,400 to $105,700", "$17,966"],
            ["24%", "$105,700 to $201,775", "$41,024"],
            ["32%", "$201,775 to $256,225", "$58,448"],
            ["35%", "$256,225 to $640,600", "$192,979"],
            ["37%", "Over $640,600", "—"],
          ]}
        />
      </GuideSection>

      <GuideSection id="joint" n={4} kicker="Rates" title="2026 brackets: married filing jointly">
        <DataTable
          caption="Married filing jointly (and qualifying surviving spouses), 2026 taxable income"
          head={["Rate", "Taxable income", "Tax at the top of the band"]}
          numeric={[2]}
          rows={[
            ["10%", "$0 to $24,800", "$2,480"],
            ["12%", "$24,800 to $100,800", "$11,600"],
            ["22%", "$100,800 to $211,400", "$35,932"],
            ["24%", "$211,400 to $403,550", "$82,048"],
            ["32%", "$403,550 to $512,450", "$116,896"],
            ["35%", "$512,450 to $768,700", "$206,584"],
            ["37%", "Over $768,700", "—"],
          ]}
        />
        <p>Up to the 32% band, the joint brackets are exactly double the single ones.</p>
      </GuideSection>

      <GuideSection id="hoh" n={5} kicker="Rates" title="Head of household and filing separately">
        <DataTable
          caption="Head of household, 2026 taxable income"
          head={["Rate", "Taxable income", "Tax at the top of the band"]}
          numeric={[2]}
          rows={[
            ["10%", "$0 to $17,700", "$1,770"],
            ["12%", "$17,700 to $67,450", "$7,740"],
            ["22%", "$67,450 to $105,700", "$16,155"],
            ["24%", "$105,700 to $201,775", "$39,213"],
            ["32%", "$201,775 to $256,225", "$56,637"],
            ["35%", "$256,225 to $640,600", "$191,168"],
            ["37%", "Over $640,600", "—"],
          ]}
        />
        <p>
          Married filing separately uses the single bands, except that the 35% band ends at $384,350, half the joint figure. Head of household is for
          unmarried people who pay more than half the cost of a home for a qualifying person, such as a child.
        </p>
      </GuideSection>

      <GuideSection id="taxable" n={6} kicker="Taxable income" title="Brackets apply to taxable income">
        <p>
          The brackets apply after deductions. For most people that means income minus the standard deduction: $16,100 single, $32,200 married filing
          jointly or $24,150 head of household in 2026. A single person aged 65 also gets an extra $2,050 and, from 2025 to 2028, a $6,000 senior
          deduction, so on $50,000 they have taxable income of only $25,850.
        </p>
        <p>
          If you know your taxable income (line 15 of Form 1040), choose &quot;Taxable income&quot; in the calculator. Otherwise enter your income and
          it takes off the deduction for you.
        </p>
      </GuideSection>

      <GuideSection id="example" n={7} kicker="Example" title="Example: $80,000, single">
        <WorkedExample
          title="Single, $80,000 of wages, standard deduction"
          steps={[
            { label: "Income", value: "$80,000" },
            { label: "Standard deduction", value: "−$16,100" },
            { label: "Taxable income", value: "$63,900" },
            { label: "10% of $12,400", value: "$1,240" },
            { label: "12% of $38,000", value: "$4,560" },
            { label: "22% of $13,500", value: "$2,970" },
          ]}
          total={{ label: "Federal income tax", value: "$8,770" }}
        />
        <p>This person is in the 22% bracket. Their tax is 11.0% of income and 13.7% of taxable income.</p>
      </GuideSection>

      <GuideSection id="example-joint" n={8} kicker="Example" title="Example: $150,000, married">
        <WorkedExample
          title="Married filing jointly, $150,000, standard deduction"
          steps={[
            { label: "Taxable income ($150,000 − $32,200)", value: "$117,800" },
            { label: "10% of $24,800", value: "$2,480" },
            { label: "12% of $76,000", value: "$9,120" },
            { label: "22% of $17,000", value: "$3,740" },
          ]}
          total={{ label: "Federal income tax", value: "$15,340" }}
        />
        <p>The couple is in the 22% bracket and pays 10.2% of income.</p>
      </GuideSection>

      <GuideSection id="marginal" n={9} kicker="Two rates" title="Marginal and effective rates">
        <CompareCards
          columns={[
            {
              name: "Marginal rate",
              rows: [
                { label: "What it is", value: "Rate on your next dollar" },
                { label: "Use it for", value: "Raises, deductions, 401(k)" },
                { label: "$80,000 single", value: "22%" },
              ],
            },
            {
              name: "Effective rate",
              rows: [
                { label: "What it is", value: "Total tax ÷ income" },
                { label: "Use it for", value: "Budgets, comparisons" },
                { label: "$80,000 single", value: "11.0%" },
              ],
            },
          ]}
        />
        <p>
          The marginal rate tells you what a change is worth. The effective rate tells you what you pay overall. Both appear in the calculator, along
          with how much more income you can earn before reaching the next bracket.
        </p>
      </GuideSection>

      <GuideSection id="table" n={10} kicker="Table" title="Effective rates at common incomes">
        <DataTable
          caption="Federal income tax on wages, standard deduction, no credits, 2026"
          head={["Income", "Single tax", "Effective", "Bracket", "Joint tax", "Effective", "Bracket"]}
          numeric={[0, 1, 2, 3, 4, 5, 6]}
          rows={[
            ["$25,000", "$890", "3.6%", "10%", "$0", "0.0%", "10%"],
            ["$50,000", "$3,820", "7.6%", "12%", "$1,780", "3.6%", "10%"],
            ["$75,000", "$7,670", "10.2%", "22%", "$4,640", "6.2%", "12%"],
            ["$100,000", "$13,170", "13.2%", "22%", "$7,640", "7.6%", "12%"],
            ["$150,000", "$24,734", "16.5%", "24%", "$15,340", "10.2%", "22%"],
            ["$200,000", "$36,734", "18.4%", "24%", "$26,340", "13.2%", "22%"],
            ["$300,000", "$68,134", "22.7%", "35%", "$49,468", "16.5%", "24%"],
            ["$500,000", "$138,134", "27.6%", "35%", "$102,608", "20.5%", "32%"],
            ["$1,000,000", "$320,000", "32.0%", "37%", "$280,251", "28.0%", "37%"],
          ]}
        />
        <Bars
          items={[
            { label: "$50,000", value: 7.64 },
            { label: "$100,000", value: 13.17 },
            { label: "$200,000", value: 18.37 },
            { label: "$500,000", value: 27.63 },
            { label: "$1,000,000", value: 32 },
          ]}
          format={(n) => `${n.toFixed(1)}%`}
        />
        <p>Effective rate for a single filer. Even at $1 million it stays below the 37% top rate.</p>
      </GuideSection>

      <GuideSection id="myth" n={11} kicker="Myth" title="The raise myth">
        <Callout title="Can a raise push me into a higher bracket and cut my pay?">
          No. Only the extra dollars are taxed at the higher rate. A single person with $105,700 of taxable income who gets $1,000 more pays $240 more
          tax (24% of $1,000) and keeps $760 of it.
        </Callout>
        <p>
          The real cliffs in the tax system come from benefits and credits that phase out, such as the earned income tax credit, premium tax credits for
          Marketplace health cover and the child tax credit at high incomes, not from the brackets themselves.
        </p>
      </GuideSection>

      <GuideSection id="status" n={12} kicker="Filing status" title="How filing status changes your bracket">
        <Bars
          items={[
            { label: "Single", value: 8770 },
            { label: "Married filing separately", value: 8770 },
            { label: "Head of household", value: 6348 },
            { label: "Married filing jointly", value: 5240 },
          ]}
          format={(n) => "$" + n.toLocaleString("en-US")}
        />
        <p>
          Federal income tax on $80,000 of income under each status. Head of household gets a bigger standard deduction and wider low bands than single,
          so it pays $2,422 less here. Joint figures assume one income of $80,000 for the couple.
        </p>
      </GuideSection>

      <GuideSection id="marriage" n={13} kicker="Couples" title="Marriage penalty or bonus">
        <p>
          Because the joint bands are double the single ones up to the 32% band, two people with similar incomes usually pay the same tax married as
          single. Two singles earning $60,000 each pay $10,040 between them, and so does a married couple earning $120,000.
        </p>
        <p>
          Couples with one main earner get a <strong>marriage bonus</strong>: one person earning $100,000 pays $13,170 single but $7,640 married filing
          jointly. A <strong>marriage penalty</strong>{" "}can appear at the very top, where the 37% band starts at $768,700 joint, less than double the
          $640,600 single figure.
        </p>
      </GuideSection>

      <GuideSection id="gains" n={14} kicker="Investments" title="Capital gains have their own brackets">
        <p>
          Long-term capital gains and qualified dividends are taxed at 0%, 15% or 20%, stacked on top of your other taxable income. A single filer pays
          0% on gains that fit under $49,450 of total taxable income ($98,900 joint). The <a href="/us/taxes/capital-gains-tax">capital gains tax
          calculator</a>{" "}shows how your gain fills these bands.
        </p>
      </GuideSection>

      <GuideSection id="other" n={15} kicker="Beyond brackets" title="Other taxes on top">
        <ul>
          <li>Social Security (6.2%) and Medicare (1.45%) on wages, which have no brackets and no standard deduction.</li>
          <li>Self-employment tax of 15.3% on freelance profit: see the <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>.</li>
          <li>The 0.9% Additional Medicare tax and 3.8% net investment income tax at high incomes.</li>
          <li>State and local income tax in most states.</li>
        </ul>
        <p>
          For everything together on one paycheck, use the <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>; for a full return, the{" "}
          <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="planning" n={16} kicker="Planning" title="Using your bracket to plan">
        <ul>
          <li>
            <strong>Traditional or Roth?</strong>{" "}If your bracket now is higher than you expect in retirement, a traditional 401(k) or IRA usually wins; if
            lower, a Roth.
          </li>
          <li><strong>Deductions are worth your bracket:</strong> $1,000 of deduction saves $220 in the 22% bracket, $120 in the 12% bracket.</li>
          <li><strong>Room to fill:</strong>{" "}people in a low-income year can convert some of a traditional IRA to a Roth up to the top of the 12% band.</li>
          <li><strong>Timing:</strong>{" "}a bonus or a gain that would cross into a higher band may be worth spreading over two tax years.</li>
        </ul>
      </GuideSection>

      <GuideSection id="inflation" n={17} kicker="Indexing" title="Why brackets change each year">
        <p>
          The IRS adjusts the bands and standard deduction for inflation every year, so a raise that only keeps up with prices does not push you into a
          higher bracket. The 2026 figures were published in Rev. Proc. 2025-32 in October 2025. The 2025 tax law made the 10% to 37% rates permanent.
        </p>
      </GuideSection>

      <GuideSection id="hoh-example" n={18} kicker="Example" title="Example: head of household, $60,000">
        <p>
          A single parent earning $60,000 who files as head of household takes off a $24,150 standard deduction, leaving $35,850 of taxable income. That
          is taxed at 10% on the first $17,700 and 12% on the next $18,150, for $3,948 of tax before the child tax credit. The same income filed as single
          would be in the 22% bracket; as head of household it stays in the 12% bracket.
        </p>
      </GuideSection>

      <GuideSection id="paycheck" n={19} kicker="Withholding" title="Brackets and your paycheck">
        <p>
          Your employer uses the same brackets to work out how much federal tax to withhold from each paycheck. Payroll turns your pay into a yearly
          figure, takes off the standard deduction for the filing status on your Form W-4, applies the brackets and spreads the result across your
          paychecks. If you have two jobs, each employer assumes it is your only one, which is why two-job households often owe at tax time: both jobs
          fill the low brackets. Ticking step 2 of the W-4 fixes this.
        </p>
      </GuideSection>

      <GuideSection id="history" n={20} kicker="Background" title="Where today&rsquo;s rates came from">
        <p>
          The current seven rates were set by the Tax Cuts and Jobs Act of 2017, which replaced the earlier 10%, 15%, 25%, 28%, 33%, 35% and 39.6%
          rates from 2018. They were due to expire after 2025, but the 2025 tax law made them permanent, along with the larger standard deduction. The
          band edges still move with inflation each year.
        </p>
      </GuideSection>

      <GuideSection id="states" n={21} kicker="States" title="State brackets are separate">
        <p>
          Your state bracket has nothing to do with your federal one. Nine states do not tax wages at all, more than a dozen charge one flat rate, and the
          rest have their own brackets, often with far lower thresholds than the federal ones. California, for example, has rates from 1% to 12.3%, plus
          1% on income over $1 million. The <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}lets you add your state rate.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={22} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Applying your bracket rate to all your income, which overstates your tax.</li>
          <li>Looking up your salary in the bracket table instead of your taxable income.</li>
          <li>Using last year&rsquo;s brackets: they rise every year.</li>
          <li>Forgetting that long-term gains and qualified dividends use separate, lower rates.</li>
          <li>Assuming married couples always pay more: most pay the same or less than two single people.</li>
        </ul>
      </GuideSection>

      <GuideSection id="deductions-worth" n={23} kicker="Deductions" title="What a deduction is worth in each bracket">
        <DataTable
          caption="Federal income tax saved by $1,000 of extra deductions"
          head={["Your bracket", "Tax saved", "Cost of the $1,000"]}
          numeric={[1, 2]}
          rows={[
            ["10%", "$100", "$900"],
            ["12%", "$120", "$880"],
            ["22%", "$220", "$780"],
            ["24%", "$240", "$760"],
            ["32%", "$320", "$680"],
            ["35%", "$350", "$650"],
            ["37%", "$370", "$630"],
          ]}
        />
        <p>
          This is why the same 401(k) contribution or charitable gift costs a high earner less than a lower earner. A credit is different: a $1,000 credit
          saves $1,000 whatever your bracket. A deduction that spans two bands saves a blend of the two rates.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={24} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "$12,400", label: "Top of 10% band, single" },
            { value: "$50,400", label: "Top of 12% band, single" },
            { value: "$105,700", label: "Top of 22% band, single" },
            { value: "$201,775", label: "Top of 24% band, single" },
            { value: "$24,800", label: "Top of 10% band, joint" },
            { value: "$100,800", label: "Top of 12% band, joint" },
            { value: "$211,400", label: "Top of 22% band, joint" },
            { value: "$768,700", label: "Start of 37%, joint" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

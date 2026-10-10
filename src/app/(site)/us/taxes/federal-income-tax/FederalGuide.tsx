import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The federal income tax guide. Figures from src/lib/us/tax-2026.ts and taxes-extra.ts (tax year 2026). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "steps", title: "How the 2026 return works" },
  { id: "income", title: "What counts as income" },
  { id: "agi", title: "Adjustments and AGI" },
  { id: "deduction", title: "Standard or itemized deduction" },
  { id: "new-deductions", title: "The new senior, tips and overtime deductions" },
  { id: "brackets", title: "The 2026 tax brackets" },
  { id: "example-single", title: "Example: single, $75,000" },
  { id: "credits", title: "Child tax credit and other credits" },
  { id: "example-family", title: "Example: a family of four" },
  { id: "gains", title: "Capital gains and dividends" },
  { id: "self-employed", title: "Self-employment income" },
  { id: "surtaxes", title: "Additional Medicare and investment taxes" },
  { id: "retirees", title: "Retirees" },
  { id: "effective", title: "Effective rates at common incomes" },
  { id: "lower", title: "Ways to lower your tax" },
  { id: "refund", title: "Refund or balance due" },
  { id: "dates", title: "Key dates" },
  { id: "status", title: "Choosing your filing status" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "records", title: "Documents you will need" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS — 2026 inflation adjustments (Rev. Proc. 2025-32)", href: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill" },
  { label: "IRS — One Big Beautiful Bill provisions", href: "https://www.irs.gov/newsroom/one-big-beautiful-bill-provisions" },
  { label: "IRS — Child tax credit", href: "https://www.irs.gov/credits-deductions/individuals/child-tax-credit" },
  { label: "IRS — Topic 409, Capital gains and losses", href: "https://www.irs.gov/taxtopics/tc409" },
  { label: "IRS — Topic 559, Net investment income tax", href: "https://www.irs.gov/taxtopics/tc559" },
  { label: "IRS — Estimated taxes", href: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" },
  { label: "Kiplinger — SALT deduction for 2026", href: "https://kiplinger.com/taxes/salt-deduction-gets-an-update-for-2026-taxes" },
];

export default function FederalGuide() {
  return (
    <Guide
      kicker="The federal income tax guide"
      title="How your 2026 federal income tax is worked out"
      intro={
        <>
          Your federal income tax follows the same path for almost everyone: add up your income, take off adjustments and deductions, apply the brackets,
          then subtract credits. This guide walks through each step with 2026 figures, the new deductions from the 2025 tax law, and worked examples.
        </>
      }
      meta={["Tax year 2026", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Taxable income = total income − adjustments − the standard or itemized deduction − any extra deductions.</li>
          <li>Tax is charged band by band at 10%, 12%, 22%, 24%, 32%, 35% and 37%.</li>
          <li>Credits, such as $2,200 for each child under 17, come off the tax itself.</li>
          <li>Compare the result with what was withheld from your pay to see your refund or balance due.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$16,100", label: "Standard deduction, single" },
            { value: "$32,200", label: "Standard deduction, married filing jointly" },
            { value: "$7,670", label: "Tax on $75,000 of wages, single" },
            { value: "April 15, 2027", label: "Deadline for 2026 returns" },
          ]}
        />
      </GuideSection>

      <GuideSection id="steps" n={2} kicker="Method" title="How the 2026 return works">
        <Timeline
          items={[
            { when: "Step 1", what: "Total income", detail: "Wages, interest, dividends, gains, business profit, pensions and other income." },
            { when: "Step 2", what: "Adjusted gross income (AGI)", detail: "Less adjustments such as half of self-employment tax, deductible IRA contributions and student loan interest." },
            { when: "Step 3", what: "Taxable income", detail: "Less the standard or itemized deduction, plus the senior, tips, overtime and business income deductions." },
            { when: "Step 4", what: "Tax", detail: "Brackets on ordinary income; 0%, 15% or 20% on long-term gains and qualified dividends." },
            { when: "Step 5", what: "Credits and other taxes", detail: "Less credits; plus self-employment tax and surtaxes." },
            { when: "Step 6", what: "Refund or balance due", detail: "Compare with tax withheld and estimated payments." },
          ]}
        />
      </GuideSection>

      <GuideSection id="income" n={3} kicker="Step 1" title="What counts as income">
        <p>
          Almost everything: wages (box 1 of your W-2, which is already after traditional 401(k) and cafeteria plan deductions), tips, bonuses, interest,
          dividends, capital gains, freelance and gig profit, rental profit, unemployment benefits, pensions and IRA withdrawals, and part of Social
          Security for many retirees.
        </p>
        <p>
          Some income is tax-free: Roth IRA withdrawals that qualify, municipal bond interest, gifts and inheritances you receive, most life insurance
          payouts, and up to $250,000 of gain on selling your main home ($500,000 for married couples).
        </p>
      </GuideSection>

      <GuideSection id="agi" n={4} kicker="Step 2" title="Adjustments and AGI">
        <p>
          Adjustments come off before your deduction, so they help whether or not you itemize. The main ones are half of self-employment tax,
          deductible traditional IRA contributions (up to $7,500 in 2026, plus $1,100 at 50 or over), HSA contributions made outside payroll, student
          loan interest (up to $2,500) and self-employed health insurance and retirement plans.
        </p>
        <p>
          The result is your adjusted gross income (AGI). Many other rules hang off it: the child tax credit phase-out, the senior deduction and the
          Roth IRA limits, among others.
        </p>
      </GuideSection>

      <GuideSection id="deduction" n={5} kicker="Step 3" title="Standard or itemized deduction">
        <DataTable
          caption="2026 standard deduction"
          head={["Filing status", "Standard deduction", "Extra at 65 or blind (each)"]}
          numeric={[1, 2]}
          rows={[
            ["Single", "$16,100", "$2,050"],
            ["Married filing jointly", "$32,200", "$1,650"],
            ["Married filing separately", "$16,100", "$1,650"],
            ["Head of household", "$24,150", "$2,050"],
          ]}
        />
        <p>
          You itemize only if your deductions add up to more. The main ones are mortgage interest, state and local taxes (the SALT deduction, capped at
          $40,400 for 2026, or $20,200 married filing separately, and reduced for incomes above $505,000), gifts to charity and medical costs above 7.5%
          of AGI.
        </p>
        <CompareCards
          columns={[
            {
              name: "Married, $180,000, standard",
              rows: [
                { label: "Deduction", value: "$32,200" },
                { label: "Taxable income", value: "$147,800" },
                { label: "Tax", value: "$21,940" },
              ],
            },
            {
              name: "Married, $180,000, itemized",
              rows: [
                { label: "Deduction", value: "$35,000" },
                { label: "Taxable income", value: "$145,000" },
                { label: "Tax", value: "$21,324" },
              ],
            },
          ]}
        />
        <p>Itemizing $35,000 saves this couple $616, because only the $2,800 above the standard deduction counts, taxed at 22%.</p>
      </GuideSection>

      <GuideSection id="new-deductions" n={6} kicker="New for 2025 to 2028" title="The new senior, tips and overtime deductions">
        <p>The 2025 tax law (the One Big Beautiful Bill Act) added three deductions you can take whether or not you itemize, for 2025 to 2028:</p>
        <ul>
          <li><strong>Senior deduction:</strong> $6,000 for each person 65 or over, reduced by 6% of AGI above $75,000 ($150,000 joint).</li>
          <li><strong>Tips:</strong>{" "}up to $25,000 of qualified tips in jobs that customarily get tips.</li>
          <li><strong>Overtime:</strong>{" "}up to $12,500 ($25,000 joint) of the overtime premium, the extra half in time and a half.</li>
        </ul>
        <p>
          The tips and overtime deductions shrink by $100 for each $1,000 of income above $150,000 ($300,000 joint), and married people filing
          separately cannot claim them. They lower income tax only, not Social Security or Medicare.
        </p>
        <CompareCards
          columns={[
            {
              name: "Server, $40,000 incl. $10,000 tips",
              rows: [
                { label: "Tax without the deduction", value: "$2,620" },
                { label: "Tax with it", value: "$1,420" },
                { label: "Saving", value: "$1,200" },
              ],
            },
            {
              name: "$70,000 incl. $5,000 overtime premium",
              rows: [
                { label: "Tax without the deduction", value: "$6,570" },
                { label: "Tax with it", value: "$5,620" },
                { label: "Saving", value: "$950" },
              ],
            },
          ]}
        />
        <p>
          The <a href="/us/taxes/overtime-calculator">overtime calculator</a>{" "}works out your premium from your hours.
        </p>
      </GuideSection>

      <GuideSection id="brackets" n={7} kicker="Step 4" title="The 2026 tax brackets">
        <DataTable
          caption="2026 ordinary income tax brackets (taxable income)"
          head={["Rate", "Single", "Married filing jointly", "Head of household"]}
          rows={[
            ["10%", "$0 to $12,400", "$0 to $24,800", "$0 to $17,700"],
            ["12%", "to $50,400", "to $100,800", "to $67,450"],
            ["22%", "to $105,700", "to $211,400", "to $105,700"],
            ["24%", "to $201,775", "to $403,550", "to $201,775"],
            ["32%", "to $256,225", "to $512,450", "to $256,225"],
            ["35%", "to $640,600", "to $768,700", "to $640,600"],
            ["37%", "above", "above", "above"],
          ]}
        />
        <p>
          Each rate applies only to the income inside its band. Married filing separately uses the single bands up to the 35% band, which ends at
          $384,350. The <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows your income split band by band.
        </p>
      </GuideSection>

      <GuideSection id="example-single" n={8} kicker="Example" title="Example: single, $75,000">
        <WorkedExample
          title="Single, $75,000 of wages, $7,000 withheld"
          steps={[
            { label: "Wages", value: "$75,000" },
            { label: "Standard deduction", value: "−$16,100" },
            { label: "Taxable income", value: "$58,900" },
            { label: "10% of $12,400", value: "$1,240" },
            { label: "12% of $38,000", value: "$4,560" },
            { label: "22% of $8,500", value: "$1,870" },
            { label: "Tax", value: "$7,670" },
            { label: "Withheld", value: "−$7,000" },
          ]}
          total={{ label: "Balance due", value: "$670" }}
        />
        <p>The tax is 10.2% of wages, even though the top dollars are taxed at 22%.</p>
      </GuideSection>

      <GuideSection id="credits" n={9} kicker="Step 5" title="Child tax credit and other credits">
        <p>
          A credit cuts your tax dollar for dollar, so it is worth more than a deduction of the same size. The child tax credit is $2,200 for each child
          under 17 with a Social Security number. Up to $1,700 per child is refundable: you can get it even if you owe no income tax, as long as you
          earned more than $2,500. Other dependents bring a $500 credit.
        </p>
        <p>
          The credits fall by $50 for each $1,000 of AGI above $200,000 ($400,000 married filing jointly). Other credits, such as the earned income tax
          credit, education credits and the child and dependent care credit, are not in this calculator.
        </p>
      </GuideSection>

      <GuideSection id="example-family" n={10} kicker="Example" title="Example: a family of four">
        <WorkedExample
          title="Married filing jointly, $120,000, two children, $6,000 withheld"
          steps={[
            { label: "Wages", value: "$120,000" },
            { label: "Standard deduction", value: "−$32,200" },
            { label: "Taxable income", value: "$87,800" },
            { label: "Tax before credits", value: "$10,040" },
            { label: "Child tax credit (2 × $2,200)", value: "−$4,400" },
            { label: "Tax", value: "$5,640" },
            { label: "Withheld", value: "−$6,000" },
          ]}
          total={{ label: "Refund", value: "$360" }}
        />
        <p>
          A head of household earning $50,000 with one child has $25,850 of taxable income and $2,748 of tax before credits; the $2,200 credit cuts it
          to $548. With $1,500 withheld, the refund is $952.
        </p>
      </GuideSection>

      <GuideSection id="gains" n={11} kicker="Investments" title="Capital gains and dividends">
        <p>
          Long-term gains (assets held more than a year) and qualified dividends sit on top of your other taxable income and are taxed at 0%, 15% or 20%.
          A single person with $80,000 of wages and a $10,000 long-term gain pays $8,770 on the wages and $1,500 (15%) on the gain, $10,270 in all.
          Short-term gains are taxed like wages. The <a href="/us/taxes/capital-gains-tax">capital gains tax calculator</a>{" "}goes into the detail.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={12} kicker="Business income" title="Self-employment income">
        <p>
          Freelance, 1099 and gig profit pays income tax and self-employment tax (15.3% on 92.35% of profit). Half of the self-employment tax is an
          adjustment, and most sole proprietors also get the qualified business income (QBI) deduction of up to 20% of their business income.
        </p>
        <WorkedExample
          title="Single, $50,000 freelance profit, no other income"
          steps={[
            { label: "Self-employment tax", value: "$7,064.78" },
            { label: "QBI deduction", value: "$6,073.52" },
            { label: "Income tax", value: "$2,667.29" },
          ]}
          total={{ label: "Total federal tax", value: "$9,732.07" }}
        />
        <p>
          The <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}also works out your quarterly estimated payments.
        </p>
      </GuideSection>

      <GuideSection id="surtaxes" n={13} kicker="High incomes" title="Additional Medicare and investment taxes">
        <p>
          Two surtaxes apply at higher incomes and are not indexed for inflation. The Additional Medicare tax is 0.9% of wages and self-employment income
          above $200,000 ($250,000 married filing jointly, $125,000 separately). The net investment income tax is 3.8% of the smaller of your investment
          income and your AGI above the same thresholds.
        </p>
      </GuideSection>

      <GuideSection id="retirees" n={14} kicker="Retirement" title="Retirees">
        <p>
          A married couple, both 65 or over, with $60,000 of pension and IRA income get a $35,500 standard deduction ($32,200 plus $1,650 each) and a
          $12,000 senior deduction. Their taxable income is $12,500, and their tax is $1,250.
        </p>
        <Callout title="Social Security benefits">
          Up to 85% of Social Security benefits can be taxable, depending on your other income. Enter only the taxable part (box 6b of your 1040) as
          other income.
        </Callout>
      </GuideSection>

      <GuideSection id="effective" n={15} kicker="Table" title="Effective rates at common incomes">
        <DataTable
          caption="Federal income tax on wages, standard deduction, no children, 2026 (the $250,000 single figure includes $450 of Additional Medicare tax)"
          head={["Wages", "Single", "Rate", "Married jointly", "Rate"]}
          numeric={[0, 1, 2, 3, 4]}
          rows={[
            ["$30,000", "$1,420", "4.7%", "$0", "0.0%"],
            ["$50,000", "$3,820", "7.6%", "$1,780", "3.6%"],
            ["$75,000", "$7,670", "10.2%", "$4,640", "6.2%"],
            ["$100,000", "$13,170", "13.2%", "$7,640", "7.6%"],
            ["$150,000", "$24,734", "16.5%", "$15,340", "10.2%"],
            ["$250,000", "$51,754", "20.7%", "$37,468", "15.0%"],
          ]}
        />
        <Bars
          items={[
            { label: "$50,000", value: 7.64 },
            { label: "$100,000", value: 13.17 },
            { label: "$150,000", value: 16.49 },
            { label: "$250,000", value: 20.7 },
          ]}
          format={(n) => `${n.toFixed(1)}%`}
        />
        <p>Effective federal rate for a single filer.</p>
      </GuideSection>

      <GuideSection id="lower" n={16} kicker="Planning" title="Ways to lower your tax">
        <ul>
          <li>
            <strong>Pre-tax retirement saving.</strong>{" "}$10,000 into a traditional 401(k) on $90,000 of wages cuts a single person&rsquo;s tax from
            $10,970 to $8,770, saving $2,200.
          </li>
          <li><strong>An HSA</strong>, if you have a high-deductible health plan: deductible going in, tax-free for medical costs.</li>
          <li><strong>Hold investments over a year</strong>{" "}to get the lower long-term rates.</li>
          <li><strong>Claim every credit:</strong>{" "}child, dependent care, education and the earned income credit.</li>
          <li><strong>Bunch charity gifts</strong>{" "}into one year so you clear the standard deduction and can itemize.</li>
        </ul>
      </GuideSection>

      <GuideSection id="refund" n={17} kicker="Settling up" title="Refund or balance due">
        <p>
          Your refund is the tax withheld and paid in the year, plus any refundable credits, minus your total tax. If you owe $1,000 or more and paid in
          less than 90% of this year&rsquo;s tax and less than 100% of last year&rsquo;s (110% if your AGI was over $150,000), the IRS may add an
          underpayment penalty. To change your withholding for the rest of the year, update your W-4; the <a href="/us/taxes/paycheck-calculator">paycheck
          calculator</a>{" "}shows what that does to each paycheck.
        </p>
      </GuideSection>

      <GuideSection id="dates" n={18} kicker="Calendar" title="Key dates">
        <Timeline
          items={[
            { when: "January 15, 2027", what: "Last 2026 estimated payment" },
            { when: "January 31, 2027", what: "Employers send W-2s; most 1099s due" },
            { when: "April 15, 2027", what: "2026 returns and any balance due" },
            { when: "October 15, 2027", what: "Extended deadline (an extension gives more time to file, not to pay)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="status" n={19} kicker="Filing status" title="Choosing your filing status">
        <p>
          Your status depends on your situation on December 31. Married couples can file jointly or separately; filing jointly almost always costs less,
          and some credits are not available separately. Head of household is for unmarried people who pay more than half the cost of a home for a
          qualifying person, and it brings a $24,150 standard deduction and wider low brackets than single. A surviving spouse with a dependent child can
          use the joint rates for two years after the year of death.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={20} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Comparing your tax with your bracket instead of your effective rate.</li>
          <li>Counting traditional 401(k) contributions twice: W-2 box 1 already leaves them out.</li>
          <li>Forgetting income with no withholding, such as interest, side work or a sale of shares.</li>
          <li>Claiming the overtime deduction on all overtime pay instead of only the extra half.</li>
          <li>Assuming an extension gives more time to pay. Interest and penalties run from April 15.</li>
        </ul>
      </GuideSection>

      <GuideSection id="records" n={21} kicker="Paperwork" title="Documents you will need">
        <ul>
          <li><strong>Form W-2</strong>{" "}from each employer: wages in box 1 and federal tax withheld in box 2.</li>
          <li><strong>Forms 1099</strong>: 1099-INT for interest, 1099-DIV for dividends, 1099-B for sales of investments, 1099-NEC and 1099-K for freelance and platform income, 1099-R for pensions and IRA withdrawals, SSA-1099 for Social Security.</li>
          <li><strong>Form 1098</strong>{" "}for mortgage interest and 1098-E for student loan interest, if you might itemize or claim the adjustment.</li>
          <li><strong>Records of estimated payments</strong>{" "}you made during the year, and last year&rsquo;s return for the safe-harbor figures.</li>
        </ul>
        <p>
          Most of these arrive by January 31, 2027. Wait until you have them all before filing, because a missing form is the most common reason for an IRS
          letter months later.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "10% to 37%", label: "Seven brackets" },
            { value: "$16,100", label: "Standard deduction, single" },
            { value: "$32,200", label: "Standard deduction, joint" },
            { value: "$24,150", label: "Standard deduction, head of household" },
            { value: "$2,200", label: "Child tax credit per child" },
            { value: "$6,000", label: "Senior deduction per person" },
            { value: "$25,000", label: "Most tips you can deduct" },
            { value: "$40,400", label: "SALT deduction cap" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

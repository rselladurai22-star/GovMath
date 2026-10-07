import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The self-employment tax guide. Figures from src/lib/us/tax-2026.ts and taxes-extra.ts (tax year 2026). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What self-employment tax is" },
  { id: "who", title: "Who pays it" },
  { id: "how", title: "How it is worked out" },
  { id: "example", title: "Example: $60,000 of profit" },
  { id: "half", title: "The deduction for half" },
  { id: "income-tax", title: "Income tax on top" },
  { id: "qbi", title: "The 20% QBI deduction" },
  { id: "cap", title: "The Social Security cap and W-2 wages" },
  { id: "side", title: "A side gig alongside a job" },
  { id: "table", title: "Tax at different profit levels" },
  { id: "quarterly", title: "Quarterly estimated payments" },
  { id: "safe-harbor", title: "The safe harbors" },
  { id: "set-aside", title: "How much to set aside" },
  { id: "expenses", title: "Expenses that lower both taxes" },
  { id: "retirement", title: "Retirement plans for the self-employed" },
  { id: "s-corp", title: "LLCs and S corporations" },
  { id: "forms", title: "Forms you will use" },
  { id: "benefits", title: "Social Security credits and benefits" },
  { id: "couples", title: "Spouses and family members" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "states", title: "State tax for the self-employed" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS — Self-employment tax (Social Security and Medicare taxes)", href: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
  { label: "IRS — Estimated taxes", href: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" },
  { label: "IRS — Form 1040-ES, Estimated Tax for Individuals", href: "https://www.irs.gov/forms-pubs/about-form-1040-es" },
  { label: "IRS — Publication 505, Tax Withholding and Estimated Tax", href: "https://www.irs.gov/publications/p505" },
  { label: "IRS — Qualified business income deduction", href: "https://www.irs.gov/newsroom/qualified-business-income-deduction" },
  { label: "IRS — Rev. Proc. 2025-32 (2026 QBI thresholds)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "Social Security Administration — Contribution and benefit base", href: "https://www.ssa.gov/oact/cola/cbb.html" },
];

export default function SelfEmploymentGuide() {
  return (
    <Guide
      kicker="The self-employment tax guide"
      title="Self-employment tax and quarterly payments in 2026"
      intro={
        <>
          When you work for yourself, nobody withholds tax from your pay. You pay both halves of Social Security and Medicare through self-employment
          tax, plus income tax, and you pay it during the year in quarterly installments. This guide explains each piece with 2026 figures.
        </>
      }
      meta={["Tax year 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Self-employment tax is 15.3% (12.4% Social Security plus 2.9% Medicare) on 92.35% of your net profit.</li>
          <li>Social Security stops at $184,500 of combined wages and self-employment earnings in 2026; Medicare does not.</li>
          <li>You deduct half of it when working out your income tax.</li>
          <li>Income tax comes on top. Pay both in four estimated payments: April 15, June 15 and September 15, 2026, and January 15, 2027.</li>
        </ul>
        <KeyStats
          items={[
            { value: "15.3%", label: "Self-employment tax rate" },
            { value: "92.35%", label: "Share of profit it applies to" },
            { value: "$400", label: "Net earnings before it starts" },
            { value: "$8,478", label: "SE tax on $60,000 profit" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What self-employment tax is">
        <p>
          Employees pay 7.65% of their pay in Social Security and Medicare, and their employer pays another 7.65%. When you are self-employed you are both,
          so you pay the full 15.3%. It funds the same benefits: your Social Security retirement pension, disability cover and Medicare. Profit you
          report builds your Social Security record just as wages do.
        </p>
      </GuideSection>

      <GuideSection id="who" n={3} kicker="Who" title="Who pays it">
        <p>
          Anyone with $400 or more of net earnings from self-employment: freelancers and contractors paid on a 1099-NEC, gig workers on delivery and
          ride-share apps, sole proprietors, single-member LLCs and partners in a business. It does not matter whether you also have a job, or whether
          you are already collecting Social Security.
        </p>
        <p>
          $400 of net earnings is about $433 of profit, because the tax applies to 92.35% of profit: $433 × 92.35% is $399.88, just under the line.
        </p>
      </GuideSection>

      <GuideSection id="how" n={4} kicker="Method" title="How it is worked out">
        <Timeline
          items={[
            { when: "Step 1", what: "Net profit", detail: "Business income less business expenses (Schedule C)." },
            { when: "Step 2", what: "× 92.35%", detail: "This mirrors the employer half being deductible for a company." },
            { when: "Step 3", what: "Social Security: 12.4%", detail: "On earnings up to $184,500, less any W-2 wages you had." },
            { when: "Step 4", what: "Medicare: 2.9%", detail: "On all net earnings, plus 0.9% above $200,000 ($250,000 joint)." },
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Example" title="Example: $60,000 of profit">
        <WorkedExample
          title="Single, $60,000 net profit, no other income"
          steps={[
            { label: "Net profit", value: "$60,000.00" },
            { label: "× 92.35% = net earnings", value: "$55,410.00" },
            { label: "Social Security: 12.4%", value: "$6,870.84" },
            { label: "Medicare: 2.9%", value: "$1,606.89" },
          ]}
          total={{ label: "Self-employment tax", value: "$8,477.73" }}
        />
        <p>That is 14.1% of profit. Income tax is extra, as the next sections show.</p>
      </GuideSection>

      <GuideSection id="half" n={6} kicker="Deduction" title="The deduction for half">
        <p>
          You deduct half of your self-employment tax as an adjustment to income, before the standard deduction. In the example that is $4,238.87,
          bringing adjusted gross income down to $55,761. It lowers income tax only; it does not reduce the self-employment tax itself.
        </p>
      </GuideSection>

      <GuideSection id="income-tax" n={7} kicker="Income tax" title="Income tax on top">
        <WorkedExample
          title="Income tax on the $60,000 example"
          steps={[
            { label: "Profit less half of SE tax", value: "$55,761" },
            { label: "Standard deduction", value: "−$16,100" },
            { label: "QBI deduction", value: "−$7,932" },
            { label: "Taxable income", value: "$31,729" },
            { label: "Income tax (10% and 12%)", value: "$3,559" },
            { label: "Self-employment tax", value: "$8,478" },
          ]}
          total={{ label: "Total federal tax", value: "$12,037" }}
        />
        <p>
          The total is 20.1% of profit. Most self-employed people pay more in self-employment tax than in income tax until profit reaches well into
          six figures. To see the whole return, use the <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="qbi" n={8} kicker="Deduction" title="The 20% QBI deduction">
        <p>
          The qualified business income (QBI) deduction lets most sole proprietors deduct up to 20% of their business profit, after the self-employment
          tax deduction and self-employed retirement and health insurance. It is capped at 20% of taxable income before the deduction (less any net
          capital gain), which is why the example gets $7,932 rather than 20% of $55,761.
        </p>
        <ul>
          <li>It was made permanent by the 2025 tax law.</li>
          <li>From 2026 there is a minimum deduction of $400 if you have at least $1,000 of QBI from a business you actively run.</li>
          <li>
            Above $201,750 of taxable income ($403,500 joint) the deduction phases out over the next $75,000 ($150,000 joint) unless the business pays
            W-2 wages or owns property. Doctors, lawyers, accountants, consultants and other service businesses lose it entirely above the range.
          </li>
        </ul>
        <Callout tone="warn" title="QBI does not cut self-employment tax">
          Like the standard deduction, it lowers taxable income for income tax only.
        </Callout>
      </GuideSection>

      <GuideSection id="cap" n={9} kicker="The cap" title="The Social Security cap and W-2 wages">
        <p>
          Social Security applies to the first $184,500 of combined wages and self-employment earnings in 2026. If you have a job too, your wages fill that
          base first.
        </p>
        <CompareCards
          columns={[
            {
              name: "$50,000 profit, no job",
              rows: [
                { label: "Social Security part", value: "$5,725.70" },
                { label: "Medicare part", value: "$1,339.08" },
                { label: "SE tax", value: "$7,064.78" },
              ],
            },
            {
              name: "$50,000 profit + $150,000 wages",
              rows: [
                { label: "Social Security part", value: "$4,278.00" },
                { label: "Medicare part", value: "$1,339.08" },
                { label: "SE tax", value: "$5,617.08" },
              ],
            },
          ]}
        />
        <p>With $150,000 of wages, only $34,500 of the earnings is left under the cap, so Social Security is 12.4% of $34,500.</p>
      </GuideSection>

      <GuideSection id="side" n={10} kicker="Side income" title="A side gig alongside a job">
        <p>
          A single person with a $50,000 job and $3,500 of federal tax withheld owes $3,820 for the year. Adding $10,000 of side-gig profit brings $1,412.96
          of self-employment tax and raises total federal tax to $6,125.13: the side gig costs $2,305 in federal tax, 23% of its profit. With only $3,500
          withheld, $2,625 is left to pay.
        </p>
        <Callout title="The easy fix">
          Raise the withholding on your job with a new Form W-4 (step 4(c)). Withholding counts as paid evenly through the year, so it can cover the
          side income without quarterly payments.
        </Callout>
      </GuideSection>

      <GuideSection id="table" n={11} kicker="Table" title="Tax at different profit levels">
        <DataTable
          caption="Single, no other income, standard and QBI deductions, 2026"
          head={["Net profit", "SE tax", "Total federal tax", "Share of profit"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["$10,000", "$1,413", "$1,413", "14.1%"],
            ["$25,000", "$3,532", "$4,103", "16.4%"],
            ["$50,000", "$7,065", "$9,732", "19.5%"],
            ["$75,000", "$10,597", "$15,495", "20.7%"],
            ["$100,000", "$14,130", "$22,365", "22.4%"],
            ["$150,000", "$21,194", "$37,608", "25.1%"],
            ["$200,000", "$28,234", "$53,431", "26.7%"],
            ["$250,000", "$29,573", "$66,360", "26.5%"],
          ]}
        />
        <p>
          Between $200,000 and $250,000 the share barely moves, because the Social Security part stops at the $184,500 cap. State income tax would be
          extra in most states.
        </p>
      </GuideSection>

      <GuideSection id="quarterly" n={12} kicker="Paying" title="Quarterly estimated payments">
        <p>If you expect to owe $1,000 or more when you file, the IRS expects you to pay during the year. The 2026 dates are:</p>
        <DataTable
          caption="2026 estimated tax due dates"
          head={["Payment", "Income earned", "Due"]}
          rows={[
            ["1", "January 1 to March 31, 2026", "April 15, 2026"],
            ["2", "April 1 to May 31, 2026", "June 15, 2026"],
            ["3", "June 1 to August 31, 2026", "September 15, 2026"],
            ["4", "September 1 to December 31, 2026", "January 15, 2027"],
          ]}
        />
        <p>
          For the $60,000 example with no prior-year figure, the safe-harbor payment is $2,708.37 a quarter (90% of $12,037), and $3,009.30 a quarter
          covers the full bill. Pay through IRS Direct Pay, the Electronic Federal Tax Payment System or your IRS online account.
        </p>
      </GuideSection>

      <GuideSection id="safe-harbor" n={13} kicker="Penalties" title="The safe harbors">
        <p>You avoid the underpayment penalty if your withholding and estimated payments, paid on time, cover the smallest of:</p>
        <ul>
          <li>90% of this year&rsquo;s tax;</li>
          <li>100% of last year&rsquo;s tax (110% if last year&rsquo;s AGI was over $150,000, or $75,000 married filing separately);</li>
          <li>or you owe less than $1,000 after withholding.</li>
        </ul>
        <p>
          Last year&rsquo;s figure is often the easier target, because you already know it. If the $60,000 freelancer paid $5,000 of tax last year,
          $1,250 a quarter is enough to avoid a penalty, with the rest due in April 2027. The penalty itself works like interest on each late or short
          quarter, at the IRS underpayment rate.
        </p>
      </GuideSection>

      <GuideSection id="set-aside" n={14} kicker="Budgeting" title="How much to set aside">
        <p>
          A simple rule: move 25% to 30% of every client payment into a separate savings account, more in a state with income tax. The calculator shows
          the exact share for your figures. Put the money in a high-yield savings account until each due date; the{" "}
          <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}can help you plan the monthly amount.
        </p>
      </GuideSection>

      <GuideSection id="expenses" n={15} kicker="Expenses" title="Expenses that lower both taxes">
        <p>
          Business expenses come off before self-employment tax, so each dollar saves both taxes. Common ones: equipment and software, a home office used
          only for work, business mileage (the IRS sets a standard rate each year), phone and internet in proportion to business use, professional fees,
          insurance, advertising and travel. Keep receipts and a mileage log.
        </p>
      </GuideSection>

      <GuideSection id="retirement" n={16} kicker="Retirement" title="Retirement plans for the self-employed">
        <p>
          A SEP IRA or solo 401(k) lets you save far more than an IRA alone. In 2026 a solo 401(k) allows $24,500 of employee deferrals plus an employer
          contribution of up to 20% of net self-employment earnings (after the half-SE deduction). Contributions lower income tax, not self-employment tax.
        </p>
        <p>
          A single freelancer with $100,000 of profit who puts $15,000 into a SEP IRA cuts total federal tax from $22,364.55 to $19,817.73, a saving of
          $2,546.82, while self-employment tax stays at $14,129.55. The <a href="/us/savings/retirement-calculator">retirement calculator</a>{" "}shows
          what steady saving adds up to.
        </p>
      </GuideSection>

      <GuideSection id="s-corp" n={17} kicker="Structures" title="LLCs and S corporations">
        <p>
          A single-member LLC is taxed like a sole proprietor by default, so the same rules apply. Some owners elect S corporation status: they pay
          themselves a reasonable salary (with payroll tax) and take the rest as distributions, which do not pay Social Security or Medicare. The saving
          has to cover payroll costs, a separate business return and state fees, so it tends to pay off only at higher, steady profits. Get advice
          before switching.
        </p>
      </GuideSection>

      <GuideSection id="forms" n={18} kicker="Paperwork" title="Forms you will use">
        <ul>
          <li><strong>1099-NEC and 1099-K:</strong>{" "}what clients and payment platforms report paying you.</li>
          <li><strong>Schedule C:</strong>{" "}your business income and expenses.</li>
          <li><strong>Schedule SE:</strong>{" "}self-employment tax.</li>
          <li><strong>Form 8995:</strong>{" "}the QBI deduction.</li>
          <li><strong>Form 1040-ES:</strong>{" "}quarterly estimated payments.</li>
        </ul>
        <p>Report all your business income, even if you did not get a 1099 for it.</p>
      </GuideSection>

      <GuideSection id="benefits" n={19} kicker="What you get" title="Social Security credits and benefits">
        <p>
          Self-employment tax is not money lost. It earns Social Security credits (up to four a year) toward your retirement pension, disability and
          survivor benefits, and Medicare in later life. Your benefit is based on your highest 35 years of earnings, so years of low reported profit can
          lower it. Check your record each year in your my Social Security account at ssa.gov.
        </p>
      </GuideSection>

      <GuideSection id="couples" n={20} kicker="Families" title="Spouses and family members">
        <p>
          Self-employment tax is worked out for each person, even on a joint return. If you and your spouse run a business together, each of you files a
          Schedule SE for your share of the profit, so both build a Social Security record. Paying your own children under 18 to work in a sole
          proprietorship can be free of Social Security and Medicare, though the pay must be reasonable for real work.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={21} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Saving only for income tax and forgetting the 15.3% self-employment tax, which is often the bigger bill.</li>
          <li>Leaving out income because no 1099 arrived. Payment apps and platforms report to the IRS, and all income is taxable.</li>
          <li>Missing deductible costs such as business mileage, software and a home office.</li>
          <li>Skipping the June 15 payment: the second installment comes only two months after the first.</li>
          <li>Mixing business and personal spending in one account, which makes records harder to prove.</li>
        </ul>
      </GuideSection>

      <GuideSection id="states" n={22} kicker="States" title="State tax for the self-employed">
        <p>
          Most states tax your business profit as ordinary income, and many also expect quarterly estimated payments on similar dates. A few add their own
          business taxes: New York City&rsquo;s unincorporated business tax, Portland and Multnomah County business taxes, and gross receipts taxes in
          states such as Washington, Ohio and Delaware. Nine states have no income tax on earnings, but some still tax business revenue. Check your
          state&rsquo;s department of revenue for its estimated tax rules and add your state tax to the amount you set aside.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={23} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: "15.3%", label: "SE tax: 12.4% + 2.9%" },
            { value: "$184,500", label: "Social Security wage base" },
            { value: "0.9%", label: "Extra Medicare over $200,000 single" },
            { value: "$400", label: "Net earnings threshold" },
            { value: "20%", label: "QBI deduction" },
            { value: "$201,750", label: "QBI phase-out starts, single" },
            { value: "$1,000", label: "Owed before penalties can apply" },
            { value: "4", label: "Estimated payments a year" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

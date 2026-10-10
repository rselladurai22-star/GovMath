import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The 529 guide. Figures from collegePlan() in src/lib/us/retirement-income.ts and grow() in src/lib/us/savings.ts (6% return, 4% college cost inflation unless stated). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what-is", title: "What a 529 plan is" },
  { id: "costs-today", title: "What college costs today" },
  { id: "costs-later", title: "What it will cost when your child goes" },
  { id: "example", title: "Worked example: a three-year-old" },
  { id: "by-type", title: "Monthly saving by type of college" },
  { id: "start-early", title: "Why starting early matters" },
  { id: "partial", title: "You don't have to save it all" },
  { id: "returns", title: "The return you assume" },
  { id: "inflation", title: "The inflation you assume" },
  { id: "qualified", title: "What 529 money can pay for" },
  { id: "k12", title: "K-12 tuition and the new $20,000 limit" },
  { id: "state-tax", title: "State tax deductions" },
  { id: "superfunding", title: "Grandparents and superfunding" },
  { id: "financial-aid", title: "529s and financial aid" },
  { id: "leftover", title: "If your child doesn't use it" },
  { id: "roth", title: "Rolling leftovers into a Roth IRA" },
  { id: "credits", title: "Coordinating with education credits" },
  { id: "investments", title: "Choosing investments" },
  { id: "other-accounts", title: "Other ways to save for college" },
  { id: "key-numbers", title: "Key numbers for 2026" },
];

const SOURCES: Source[] = [
  { label: "IRS: Publication 970, Tax Benefits for Education", href: "https://www.irs.gov/publications/p970" },
  { label: "IRS: 529 plans, questions and answers", href: "https://www.irs.gov/newsroom/529-plans-questions-and-answers" },
  { label: "IRS: Rev. Proc. 2025-32 (2026 gift tax exclusion)", href: "https://www.irs.gov/pub/irs-drop/rp-25-32.pdf" },
  { label: "Investor.gov (SEC): An introduction to 529 plans", href: "https://www.investor.gov/introduction-investing/investing-basics/glossary/529-plans" },
  { label: "College Board: Trends in College Pricing and Student Aid 2025", href: "https://research.collegeboard.org/trends/college-pricing" },
  { label: "Federal Student Aid: How aid is calculated", href: "https://studentaid.gov/complete-aid-process/how-calculated" },
];

export default function CollegeGuide() {
  return (
    <Guide
      kicker="The 529 college savings guide"
      title="How much to save for college in a 529 plan"
      intro={
        <>
          College costs are large and a long way off, which makes them easy to put off. This guide shows what college costs in 2025&ndash;26, what that could grow to by the time your child
          enrolls, how much a month it takes to get there in a 529 plan, and the tax rules that make a 529 the usual first choice for college saving.
        </>
      }
      meta={["Updated for 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Four years at an in-state public university cost about {usd(103400)} at 2025&ndash;26 prices, including housing and food.</li>
          <li>With 4% yearly cost growth, a baby born now faces about {usd(222376)} for the same four years.</li>
          <li>Saving {usd(574)} a month from birth, earning 6%, covers all of it. Covering half takes {usd(287)} a month.</li>
          <li>529 growth is tax-free when spent on qualified education costs, and many states add a tax deduction.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(25850), label: "One year, in-state public, 2025–26" },
            { value: usd(574), label: "Monthly from birth for four years in-state" },
            { value: "$19,000", label: "2026 gift exclusion per giver" },
            { value: "$35,000", label: "Lifetime 529 to Roth IRA rollover" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what-is" n={2} kicker="Basics" title="What a 529 plan is">
        <p>
          A 529 plan is a state-sponsored investment account for education, named after section 529 of the tax code. You put in money you have already paid tax on; it is invested, usually
          in mutual funds; and the growth is free of federal tax (and usually state tax) when you withdraw it for qualified education costs. There is no federal deduction for contributions,
          but many states give one.
        </p>
        <p>
          You can join any state&rsquo;s plan, not just your own, and the account owner (usually a parent) keeps control of the money, not the student. Anyone can contribute: parents,
          grandparents, friends.
        </p>
      </GuideSection>

      <GuideSection id="costs-today" n={3} kicker="Prices" title="What college costs today">
        <DataTable
          caption="Average published prices, full-time undergraduates, 2025–26 (College Board)"
          head={["Type", "Tuition and fees", "With housing and food"]}
          numeric={[1, 2]}
          rows={[
            ["Public two-year, in-district", "$4,150", "$15,000"],
            ["Public four-year, in-state", "$11,950", "$25,850"],
            ["Public four-year, out-of-state", "$31,880", "$45,780"],
            ["Private nonprofit four-year", "$45,000", "$60,920"],
          ]}
        />
        <p>
          These are sticker prices. Many students pay less after grants and scholarships, especially at private colleges. Books, transport and personal costs come on top. Choose a type in
          the calculator, or enter your own yearly figure under More options.
        </p>
      </GuideSection>

      <GuideSection id="costs-later" n={4} kicker="Future cost" title="What it will cost when your child goes">
        <p>
          The calculator raises today&rsquo;s price by the inflation rate you choose (4% by default) for each year until each year of college. For a newborn starting an in-state public
          university at 18, the four years cost:
        </p>
        <Bars
          format={usd}
          items={[
            { label: "Year 1 (age 18)", value: 52367 },
            { label: "Year 2", value: 54462 },
            { label: "Year 3", value: 56641 },
            { label: "Year 4", value: 58906 },
          ]}
        />
        <p>
          That adds up to {usd(222376)}, a little over twice today&rsquo;s {usd(103400)}. The <a href="/us/savings/inflation-calculator">inflation calculator</a>{" "}shows how prices
          compound over other periods.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Worked example" title="Worked example: a three-year-old">
        <WorkedExample
          title="Child aged 3, in-state public, $5,000 already saved, 6% return, 4% cost growth"
          steps={[
            { label: "Four years of college at future prices", value: usd(197692) },
            { label: "Today’s $5,000 grown for 15 years", value: usd(12270) },
            { label: "Still to build", value: usd(185422) },
          ]}
          total={{ label: "Monthly saving needed", value: usd(638) }}
        />
        <p>
          The target is cautious: it assumes the whole cost is saved by the first day of college. In practice money for the later years stays invested a little longer and earns a little
          more.
        </p>
      </GuideSection>

      <GuideSection id="by-type" n={6} kicker="Comparison" title="Monthly saving by type of college">
        <DataTable
          caption="Saving from birth, nothing saved yet, 6% return, 4% cost growth, four years from age 18"
          head={["Type", "Four years at future prices", "Monthly from birth"]}
          numeric={[1, 2]}
          rows={[
            ["Public two-year, in-district", usd(129038), usd(333)],
            ["Public four-year, in-state", usd(222376), usd(574)],
            ["Public four-year, out-of-state", usd(393825), usd(1017)],
            ["Private nonprofit four-year", usd(524068), usd(1353)],
          ]}
        />
        <p>
          Two years at a community college usually costs much less in total than this table shows, because most students live at home. Covering in-state tuition only (without housing) from
          birth takes {usd(265)} a month.
        </p>
      </GuideSection>

      <GuideSection id="start-early" n={7} kicker="Time" title="Why starting early matters">
        <CompareCards
          columns={[
            { name: "Start at birth", rows: [{ label: "Years of saving", value: "18" }, { label: "Monthly for in-state public", value: usd(574) }] },
            { name: "Start at 8", rows: [{ label: "Years of saving", value: "10" }, { label: "Monthly for in-state public", value: usd(992) }] },
            { name: "Start at 13", rows: [{ label: "Years of saving", value: "5" }, { label: "Monthly for in-state public", value: usd(1914) }] },
          ]}
        />
        <p>
          Later starts face a lower total (fewer years of cost growth), but far fewer months to save and less time for growth. {usd(100)} a month for 18 years at 6% grows to {usd(38735)};
          the same over 10 years grows to {usd(16388)}. The <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows the effect in detail.
        </p>
      </GuideSection>

      <GuideSection id="partial" n={8} kicker="Realistic goals" title="You don't have to save it all">
        <p>
          Few families pay for college entirely from savings. Most combine savings with income during the college years, grants, scholarships, work and some borrowing. Saving for half of
          in-state costs from birth takes {usd(287)} a month. The calculator&rsquo;s &ldquo;share to cover&rdquo; field sets your own goal. If you already have a set amount in mind,
          enter it as your planned monthly saving: {usd(250)} a month from birth grows to about {usd(96838)}, 44% of four in-state years.
        </p>
        <p>
          The <a href="/us/loans/student-loan-calculator">student loan calculator</a>{" "}shows what borrowing the rest would cost after graduation.
        </p>
      </GuideSection>

      <GuideSection id="returns" n={9} kicker="Assumptions" title="The return you assume">
        <p>The calculator uses 6% a year by default, a middle figure for a mix of stocks and bonds over many years. The rate makes a large difference:</p>
        <DataTable
          caption="Monthly saving from birth for four in-state years"
          head={["Yearly return", "Monthly saving"]}
          numeric={[1]}
          rows={[
            ["4%", usd(705)],
            ["6%", usd(574)],
            ["8%", usd(463)],
          ]}
        />
        <p>Returns are not guaranteed, and plans move into safer, lower-returning investments as college gets close.</p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Assumptions" title="The inflation you assume">
        <p>
          College prices rose much faster than general inflation for decades, though growth in published prices has slowed in recent years. The default 4% is cautious. At 3%, four in-state
          years for a newborn cost {usd(184113)} instead of {usd(222376)}, and the monthly saving falls from {usd(574)} to {usd(475)}.
        </p>
      </GuideSection>

      <GuideSection id="qualified" n={11} kicker="Rules" title="What 529 money can pay for">
        <ul>
          <li>Tuition and required fees at eligible colleges, universities, community colleges and many trade schools, including some abroad.</li>
          <li>Books, supplies and required equipment, and computers, software and internet access used for school.</li>
          <li>Housing and food for students enrolled at least half-time, up to the college&rsquo;s published cost of attendance (or actual cost for college housing).</li>
          <li>Registered apprenticeship costs.</li>
          <li>Up to $10,000 in a lifetime toward the beneficiary&rsquo;s student loans (and $10,000 for each sibling).</li>
          <li>K-12 tuition and, from 2026, other K-12 costs (see the next section).</li>
        </ul>
        <p>
          Withdrawals for anything else are &ldquo;non-qualified&rdquo;: the earnings part is taxed as income and usually adds a 10% penalty. The contributions part comes back tax-free.
        </p>
      </GuideSection>

      <GuideSection id="k12" n={12} kicker="2026 change" title="K-12 tuition and the new $20,000 limit">
        <p>
          From 2026, up to $20,000 a year per student (up from $10,000) can come out of a 529 for elementary and secondary school, and the list of K-12 costs widened beyond tuition to include
          things such as books, tutoring and standardized test fees. Some states don&rsquo;t follow the federal K-12 rules for state tax, so check your plan before using it this way.
        </p>
      </GuideSection>

      <GuideSection id="state-tax" n={13} kicker="State tax" title="State tax deductions">
        <p>
          Many states let residents deduct 529 contributions, or claim a credit, usually only for their own state&rsquo;s plan and often up to a yearly cap. Enter your state&rsquo;s cap and
          rate under More options to see the yearly saving. A deduction is worth your state tax rate times the amount deducted: $5,000 deducted at a 5% rate saves $250. The{" "}
          <a href="/us/taxes/state-income-tax-calculator">state income tax calculator</a>{" "}shows your state&rsquo;s marginal rate.
        </p>
        <Callout tone="warn" title="Check the recapture rules">
          Some states take back the deduction if you roll the money to another state&rsquo;s plan or make a non-qualified withdrawal.
        </Callout>
      </GuideSection>

      <GuideSection id="superfunding" n={14} kicker="Gifts" title="Grandparents and superfunding">
        <p>
          A 529 contribution is a gift to the beneficiary. In 2026 each person can give $19,000 to each child without using any lifetime gift and estate exemption. A 529 has a special rule:
          you can treat one large gift as spread over five years. That lets one giver put in {usd(95000)} at once, or a married couple {usd(190000)}, by filing a gift tax return (Form 709)
          to make the election.
        </p>
        <p>
          Left to grow for 18 years at 6%, {usd(95000)} becomes about {usd(278993)}: more than four years at an in-state public university, even at future prices.
        </p>
      </GuideSection>

      <GuideSection id="financial-aid" n={15} kicker="FAFSA" title="529s and financial aid">
        <p>
          A 529 owned by a parent (or by a dependent student) counts as a parental asset on the FAFSA, which reduces aid by at most about 5.64% of its value. Since the simplified FAFSA, money
          from a grandparent-owned 529 is no longer counted as the student&rsquo;s income, which used to cut aid sharply. Private colleges that use the CSS Profile may count these accounts
          differently.
        </p>
      </GuideSection>

      <GuideSection id="leftover" n={16} kicker="Flexibility" title="If your child doesn't use it">
        <ul>
          <li>Change the beneficiary to another family member, including siblings, cousins, a parent or yourself, with no tax.</li>
          <li>If your child gets a tax-free scholarship, you can withdraw up to the scholarship amount without the 10% penalty (the earnings are still taxed).</li>
          <li>The penalty also doesn&rsquo;t apply on death or disability, or for attendance at a US military academy.</li>
          <li>Keep it for graduate school or a future grandchild: 529s have no age limit or deadline.</li>
        </ul>
      </GuideSection>

      <GuideSection id="roth" n={17} kicker="SECURE 2.0" title="Rolling leftovers into a Roth IRA">
        <p>
          Since 2024, unused 529 money can move to a Roth IRA for the beneficiary, up to {usd(35000)} in a lifetime. The account must have been open at least 15 years, contributions from
          the last five years (and their earnings) can&rsquo;t be moved, and each year&rsquo;s rollover counts toward the yearly IRA limit, so it takes several years. The beneficiary needs
          earned income at least equal to the amount rolled over. The <a href="/us/savings/roth-ira-calculator">Roth IRA calculator</a>{" "}shows what a head start like that can grow to.
        </p>
      </GuideSection>

      <GuideSection id="credits" n={18} kicker="Tax credits" title="Coordinating with education credits">
        <p>
          You can&rsquo;t use the same expenses for a tax-free 529 withdrawal and for the American Opportunity Tax Credit (worth up to $2,500 a year) or the Lifetime Learning Credit. Many
          families pay the first $4,000 of tuition each year from other money to claim the full American Opportunity credit, and use the 529 for the rest.
        </p>
      </GuideSection>

      <GuideSection id="investments" n={19} kicker="Investing" title="Choosing investments">
        <p>
          Most plans offer age-based (target enrollment) portfolios that start mostly in stocks and move toward bonds and cash as college nears, plus single funds. Compare fees: direct-sold
          plans are usually cheaper than adviser-sold ones. You can change investments twice a year, or when you change the beneficiary. Each state also sets a lifetime account limit,
          often several hundred thousand dollars.
        </p>
      </GuideSection>

      <GuideSection id="other-accounts" n={20} kicker="Alternatives" title="Other ways to save for college">
        <ul>
          <li>
            <strong>Coverdell education savings account:</strong>{" "}tax-free growth for education like a 529, but only $2,000 a year per child in total, with income limits for those who
            contribute.
          </li>
          <li>
            <strong>Custodial account (UTMA or UGMA):</strong>{" "}can be spent on anything for the child, but the money becomes the child&rsquo;s at 18 or 21, counts heavily against
            financial aid, and its earnings can be taxed at the parents&rsquo; rate.
          </li>
          <li>
            <strong>Roth IRA:</strong>{" "}contributions can be withdrawn at any time, and earnings can be taken for college without the 10% penalty (though they may be taxed). Using it for
            college means less for retirement.
          </li>
          <li>
            <strong>Taxable brokerage or savings account:</strong>{" "}fully flexible, with no tax break. Good for money that might be needed for something else.
          </li>
        </ul>
        <p>
          For most families saving mainly for college, the 529&rsquo;s tax-free growth and state deduction make it the first choice, with other accounts for money that needs to stay
          flexible. The <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}works for any of them.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers for 2026">
        <KeyStats
          items={[
            { value: usd(25850), label: "One year in-state public, 2025–26" },
            { value: usd(60920), label: "One year private nonprofit, 2025–26" },
            { value: "$19,000", label: "Gift exclusion per giver" },
            { value: usd(95000), label: "Five-year superfund, one giver" },
            { value: "$20,000", label: "Yearly K-12 limit from 2026" },
            { value: "$10,000", label: "Lifetime student loan repayment" },
            { value: "$35,000", label: "Lifetime Roth IRA rollover" },
            { value: "10%", label: "Penalty on non-qualified earnings" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

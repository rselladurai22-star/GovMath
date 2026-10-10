import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Emergency fund (US) — the guide. Figures from src/lib/us/wealth.ts (emergencyFund, suggestedMonths). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an emergency fund is for" },
  { id: "essentials", title: "Counting essential costs" },
  { id: "months", title: "How many months you need" },
  { id: "situations", title: "Our suggestion, situation by situation" },
  { id: "example", title: "A worked example" },
  { id: "speed", title: "How fast you can build it" },
  { id: "other-income", title: "Counting other income" },
  { id: "unemployment", title: "How long job searches take" },
  { id: "starter", title: "Start with a starter fund" },
  { id: "debt", title: "Emergency fund or debt first?" },
  { id: "where", title: "Where to keep it" },
  { id: "interest", title: "What a high-yield account earns" },
  { id: "insurance", title: "FDIC and NCUA insurance" },
  { id: "not-invest", title: "Why not invest it?" },
  { id: "self-employed", title: "If you're self-employed" },
  { id: "what-counts", title: "What counts as an emergency" },
  { id: "rebuild", title: "Using it and rebuilding it" },
  { id: "automate", title: "Making saving automatic" },
  { id: "how-many", title: "How many Americans have one" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB — An essential guide to building an emergency fund", href: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" },
  { label: "Federal Reserve — Economic Well-Being of U.S. Households: unexpected expenses", href: "https://www.federalreserve.gov/consumerscommunities/sheddataviz/unexpectedexpenses-table.html" },
  { label: "U.S. Bureau of Labor Statistics — Employment Situation, Table A-12: unemployed persons by duration", href: "https://www.bls.gov/news.release/empsit.t12.htm" },
  { label: "FDIC — National rates and rate caps", href: "https://www.fdic.gov/national-rates-and-rate-caps" },
  { label: "FDIC — Understanding deposit insurance", href: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
  { label: "NCUA — Share insurance coverage", href: "https://ncua.gov/consumers/share-insurance-coverage" },
  { label: "IRS — Topic no. 403, Interest received", href: "https://www.irs.gov/taxtopics/tc403" },
];

export default function EmergencyGuide() {
  return (
    <Guide
      kicker="The emergency fund guide"
      title="How big your emergency fund should be"
      intro={
        <>
          An emergency fund is cash you keep for the bills you can&rsquo;t plan for: a job loss, a car repair, a trip to the emergency room. This guide
          shows how to size it from your essential costs, why some households need three months and others twelve, how quickly you can build it, and
          where to keep it so it earns interest without putting it at risk.
        </>
      }
      meta={["Worked examples", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Size the fund from essential costs, not your whole budget: housing, food, utilities, transportation, insurance and minimum debt payments.</li>
          <li>Three months suits a two-income household with steady jobs. Six months is the usual target with one income, and nine to twelve for the self-employed.</li>
          <li>$4,000 a month of essentials makes a six-month fund of $24,000.</li>
          <li>Keep it in an insured high-yield savings account. At 4% APY, $24,000 earns about $960 a year; at the national average of 0.37%, about $89.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3–6 months", label: "Usual range of cover" },
            { value: "$24,000", label: "Six months of $4,000 essentials" },
            { value: "$960", label: "A year's interest on it at 4% APY" },
            { value: "63%", label: "Of adults would pay a $400 bill with cash (2025)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an emergency fund is for">
        <p>
          An emergency fund does two jobs. It pays for one-off shocks, such as a broken furnace, a deductible or an urgent flight home, and it keeps
          the household running if your income stops. Without one, those costs go on a credit card, into a personal loan, or come out of a 401(k)
          with tax and penalties, and a one-off bill turns into months of interest.
        </p>
        <p>
          The Consumer Financial Protection Bureau describes the fund as a buffer that keeps a surprise from becoming a debt. It is the first building
          block of most financial plans: it protects your retirement savings and your credit score at the same time.
        </p>
      </GuideSection>

      <GuideSection id="essentials" n={3} kicker="The base" title="Counting essential costs">
        <p>
          The calculator asks only for the costs you would still have to pay in a crisis. In a lean month you would drop restaurants, subscriptions,
          travel and new clothes. What remains is your essential budget:
        </p>
        <ul>
          <li><strong>Housing:</strong>{" "}rent or mortgage, plus property tax, insurance and HOA dues.</li>
          <li><strong>Food:</strong>{" "}groceries at a basic level.</li>
          <li><strong>Utilities and phone:</strong>{" "}power, water, gas, internet and a phone plan.</li>
          <li><strong>Transportation:</strong>{" "}car payment, insurance, gas and transit.</li>
          <li><strong>Insurance and health care:</strong>{" "}premiums, prescriptions and regular care. If you lose a job, COBRA can cost the full premium plus 2%.</li>
          <li><strong>Minimum debt payments:</strong>{" "}what you must pay to stay current.</li>
          <li><strong>Childcare and other essentials.</strong></li>
        </ul>
        <p>
          A bank or card statement for the last three months is the quickest way to get real figures. Most people find their essential costs are
          between half and three-quarters of their total spending.
        </p>
      </GuideSection>

      <GuideSection id="months" n={4} kicker="The target" title="How many months you need">
        <p>
          The classic advice is three to six months of expenses. The right number depends on how likely you are to lose income and how long it might
          take to replace it.
        </p>
        <DataTable
          caption="Fund size for $4,000 a month of essential costs"
          head={["Months of cover", "Fund", "Suits"]}
          numeric={[1]}
          rows={[
            ["3", "$12,000", "Two steady incomes, renters"],
            ["6", "$24,000", "One income, or a family with a home"],
            ["9", "$36,000", "Self-employed, commission or seasonal pay"],
            ["12", "$48,000", "Irregular income with dependents, or an uncertain industry"],
          ]}
        />
      </GuideSection>

      <GuideSection id="situations" n={5} kicker="Our rule" title="Our suggestion, situation by situation">
        <p>
          The calculator suggests a number of months from your answers under More options. It starts at three months for a two-earner household and
          six for one earner, adds three for self-employed or irregular income, one for dependents, one for owning a home and two if your job feels
          uncertain, takes one off for a very stable job, and keeps the result between 3 and 12.
        </p>
        <DataTable
          caption="Suggested months for some common households"
          head={["Household", "Suggested months"]}
          numeric={[1]}
          rows={[
            ["Two earners, steady pay, renting", "3"],
            ["Two earners, stable jobs, children, homeowners", "4"],
            ["One earner, steady pay, renting", "6"],
            ["One earner, children, homeowner", "8"],
            ["One earner, self-employed", "9"],
            ["One earner, self-employed, children, homeowner, uncertain work", "12"],
          ]}
        />
        <p>
          It is a starting point, not a rule. If you would sleep better with more, choose a longer cover in the &quot;Months of cover&quot; option.
        </p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="One earner renting, $4,000 a month of essentials, $5,000 saved, $500 a month going in at 4% APY"
          steps={[
            { label: "Essentials: $1,800 rent + $600 food + $350 utilities + $450 transport + $300 insurance + $250 debt + $250 other", value: "$4,000" },
            { label: "Suggested cover (one earner)", value: "6 months" },
            { label: "Target ($4,000 × 6)", value: "$24,000" },
            { label: "Gap ($24,000 − $5,000)", value: "$19,000" },
            { label: "Interest earned while building", value: "$1,616" },
          ]}
          total={{ label: "Time to reach the target", value: "35 months" }}
        />
        <p>
          Today the $5,000 covers 1.25 months. In a regular account at 0.37%, the same plan takes 38 months and earns $167 of interest, so the
          high-yield account saves three months of saving.
        </p>
      </GuideSection>

      <GuideSection id="speed" n={7} kicker="Pace" title="How fast you can build it">
        <Figure label="Months to a $24,000 fund from $5,000, at 4% APY" caption="Monthly deposits at the end of each month.">
          <Bars
            format={(n) => `${n} months`}
            items={[
              { label: "$250 a month", value: 65 },
              { label: "$500 a month", value: 35 },
              { label: "$750 a month", value: 24 },
              { label: "$1,000 a month", value: 19 },
            ]}
          />
        </Figure>
        <p>
          A full fund can take two or three years to build, and that is normal. Every month of cover you add makes a surprise easier to absorb, so
          progress counts long before you reach the target. Our <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}works
          backward from a deadline if you want the fund by a set date.
        </p>
      </GuideSection>

      <GuideSection id="other-income" n={8} kicker="Households" title="Counting other income">
        <p>
          If a partner&rsquo;s pay or unemployment benefits would keep coming in, the fund only has to cover the shortfall. In the example, if a
          partner brings home $2,500 a month, the fund covers $1,500 a month, so six months is $9,000. The $5,000 already saved covers 3.3 months, and
          at $500 a month the target is reached in 8 months.
        </p>
        <Callout tone="warn" title="Don't count on benefits too much">
          State unemployment benefits usually replace only part of your pay, up to a weekly maximum, and last a limited number of weeks. They can take
          a few weeks to start. Count on them cautiously, if at all.
        </Callout>
      </GuideSection>

      <GuideSection id="unemployment" n={9} kicker="Context" title="How long job searches take">
        <p>
          The Bureau of Labor Statistics reported that in September 2026 the median spell of unemployment was 11.5 weeks and the average 24.8 weeks
          (seasonally adjusted). The average is pulled up by long spells: a minority of people take six months or more to find work. Three months of
          cover handles a typical search; six months handles most of the long ones.
        </p>
      </GuideSection>

      <GuideSection id="starter" n={10} kicker="First step" title="Start with a starter fund">
        <p>
          If you are starting from nothing, a full fund can feel out of reach. Aim first for a starter fund of $1,000 or one month of essentials. It
          covers the most common surprises, such as a car repair or an insurance deductible, and stops them going on a credit card. The CFPB suggests
          looking at the unexpected costs you have actually faced in the past to set a first goal.
        </p>
      </GuideSection>

      <GuideSection id="debt" n={11} kicker="Priorities" title="Emergency fund or debt first?">
        <p>
          With credit card debt at 20% or more, every dollar of extra payment earns a guaranteed return at that rate, far more than a savings account
          pays. But without any cash buffer, the next surprise goes straight back on the card.
        </p>
        <CompareCards
          columns={[
            {
              name: "A common order",
              rows: [
                { label: "1", value: "Pay every minimum" },
                { label: "2", value: "Build a starter fund" },
                { label: "3", value: "Take any 401(k) match" },
                { label: "4", value: "Pay down high-interest debt" },
                { label: "5", value: "Finish the full fund" },
              ],
            },
            {
              name: "Why it works",
              rows: [
                { label: "Starter fund", value: "Stops new debt" },
                { label: "Match", value: "An instant 50% to 100% return" },
                { label: "Debt", value: "A guaranteed return at its rate" },
                { label: "Full fund", value: "Protects against job loss" },
              ],
            },
          ]}
        />
        <p>
          Our <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a>{" "}and{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}show how quickly extra payments clear a balance.
        </p>
      </GuideSection>

      <GuideSection id="where" n={12} kicker="Where" title="Where to keep it">
        <p>The fund needs to be safe, separate and quick to reach. That rules out most investments and favors these:</p>
        <ul>
          <li><strong>High-yield savings account:</strong>{" "}usually at an online bank, insured, paying far more than a branch account, with transfers in one or two days.</li>
          <li><strong>Money market account:</strong>{" "}similar, sometimes with checks or a debit card.</li>
          <li><strong>Short CDs or a CD ladder:</strong>{" "}for the part of a large fund you are unlikely to need in a hurry. Early withdrawal penalties apply; see our <a href="/us/savings/cd-calculator">CD calculator</a>.</li>
          <li><strong>Treasury bills or a money market fund:</strong>{" "}not FDIC insured, but low risk; selling takes a day or two.</li>
        </ul>
        <p>
          Keeping the fund at a different bank from your checking account adds a little friction, which helps you leave it alone for real emergencies.
        </p>
      </GuideSection>

      <GuideSection id="interest" n={13} kicker="Interest" title="What a high-yield account earns">
        <p>
          The FDIC&rsquo;s national average savings rate was 0.37% on September 21, 2026. Top online high-yield accounts paid around 4% to 4.3% APY in
          early October 2026. On an emergency fund, that gap is real money:
        </p>
        <DataTable
          caption="A year's interest on a full fund"
          head={["Fund", "At 0.37%", "At 4%"]}
          numeric={[1, 2]}
          rows={[
            ["$12,000 (3 months of $4,000)", "$44", "$480"],
            ["$24,000 (6 months)", "$89", "$960"],
            ["$36,000 (9 months)", "$133", "$1,440"],
            ["$48,000 (12 months)", "$178", "$1,920"],
          ]}
        />
        <p>
          Savings rates are variable and move with the Federal Reserve&rsquo;s decisions. Interest is taxed as ordinary income in the year it is
          credited, and your bank sends Form 1099-INT if you earn $10 or more. Our{" "}
          <a href="/us/savings/high-yield-savings-calculator">high-yield savings calculator</a>{" "}compares accounts after tax.
        </p>
      </GuideSection>

      <GuideSection id="insurance" n={14} kicker="Safety" title="FDIC and NCUA insurance">
        <p>
          Deposits at an FDIC-insured bank are protected up to $250,000 per depositor, per insured bank, for each account ownership category. Credit
          union deposits have the same protection from the NCUA. A joint account counts as a separate ownership category, so a couple can hold up to
          $500,000 in joint accounts at one bank. Check that an online bank or app is itself insured or holds your money at an insured partner bank.
        </p>
      </GuideSection>

      <GuideSection id="not-invest" n={15} kicker="Risk" title="Why not invest it?">
        <p>
          Stocks earn more over decades, but an emergency fund isn&rsquo;t a decades-long fund. Emergencies cluster with recessions: the year you are
          most likely to lose your job is often the year the stock market has fallen. Having to sell investments 30% below what you paid, to pay rent,
          locks in the loss. Cash is boring on purpose.
        </p>
        <p>
          Once your fund is complete, money beyond it can go into a 401(k), IRA or brokerage account, where it can take risk.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={16} kicker="Irregular pay" title="If you're self-employed">
        <p>
          Freelancers, contractors and business owners have no unemployment insurance in most cases, often pay for their own health insurance, and
          see income swing from month to month. That is why the calculator adds three months for irregular income. Keep the emergency fund separate
          from money set aside for quarterly estimated taxes, which isn&rsquo;t yours to spend. Our{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>{" "}shows how much to put aside for tax.
        </p>
      </GuideSection>

      <GuideSection id="what-counts" n={17} kicker="Discipline" title="What counts as an emergency">
        <p>
          A useful test: is it unexpected, necessary and urgent? A job loss, a medical bill, an essential car or home repair, or emergency travel
          qualify. A sale, a vacation or a predictable bill such as car insurance renewal does not. Save for known irregular costs in a separate
          &quot;sinking fund&quot; so they don&rsquo;t drain your emergency money.
        </p>
      </GuideSection>

      <GuideSection id="rebuild" n={18} kicker="After" title="Using it and rebuilding it">
        <p>
          Using the fund is the point of having it, so don&rsquo;t feel guilty. Afterward, return your monthly saving to the fund until it is back to
          target before restarting extra debt payments or investing. If you used it because of a job loss, cut back to essentials early: the fund
          lasts longest if you don&rsquo;t wait until it is half gone.
        </p>
      </GuideSection>

      <GuideSection id="automate" n={19} kicker="Habits" title="Making saving automatic">
        <ul>
          <li>Schedule a transfer for the day after payday, so the money moves before you can spend it.</li>
          <li>Ask your employer to split direct deposit between checking and savings.</li>
          <li>Send tax refunds, bonuses and cash gifts straight to the fund.</li>
          <li>When you pay off a loan, keep sending the same payment to savings.</li>
        </ul>
      </GuideSection>

      <GuideSection id="how-many" n={20} kicker="The picture" title="How many Americans have one">
        <p>
          The Federal Reserve&rsquo;s survey of household well-being asks how adults would pay an unexpected $400 bill. In 2025, 63% said they would
          cover it with cash or its equivalent, the same as in 2022, 2023 and 2024 and down from 68% in 2021. The rest would borrow, sell something
          or couldn&rsquo;t pay it at all. Even a small fund puts you ahead of a large share of households.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Usual cover", "3 to 6 months of essential costs"],
            ["Self-employed or irregular income", "9 to 12 months"],
            ["FDIC national average savings rate, September 21, 2026", "0.37%"],
            ["Top high-yield savings accounts, early October 2026", "About 4% to 4.3% APY"],
            ["FDIC and NCUA insurance", "$250,000 per depositor, per institution, per ownership category"],
            ["Median length of unemployment, September 2026", "11.5 weeks"],
            ["Adults who would pay a $400 bill with cash, 2025", "63%"],
            ["Form 1099-INT threshold", "$10 of interest"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

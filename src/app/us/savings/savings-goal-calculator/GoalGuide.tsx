import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Savings goals — the guide. Figures from src/lib/us/savings.ts (depositForGoal, monthsToGoal). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How the calculator works" },
  { id: "two-ways", title: "Two ways to plan" },
  { id: "emergency", title: "Example: an emergency fund" },
  { id: "emergency-size", title: "How big an emergency fund should be" },
  { id: "down-payment", title: "Example: a down payment" },
  { id: "other-goals", title: "A car, a vacation and other goals" },
  { id: "deadline", title: "How the deadline changes the amount" },
  { id: "rates", title: "High-yield savings rates in 2026" },
  { id: "where", title: "Where to keep goal money" },
  { id: "safety", title: "Deposit insurance" },
  { id: "tax", title: "Tax on interest" },
  { id: "automate", title: "Make it automatic" },
  { id: "several", title: "Saving for several goals" },
  { id: "debt", title: "Saving vs paying off debt" },
  { id: "long-term", title: "When a goal is years away" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "sinking", title: "Sinking funds for yearly bills" },
  { id: "progress", title: "Checking your progress" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB — An essential guide to building an emergency fund", href: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" },
  { label: "FDIC — National rates and rate caps", href: "https://www.fdic.gov/national-rates-and-rate-caps" },
  { label: "FDIC — Deposit insurance", href: "https://www.fdic.gov/resources/deposit-insurance" },
  { label: "NCUA — Share insurance coverage", href: "https://ncua.gov/consumers/share-insurance-coverage" },
  { label: "Investor.gov (SEC) — Savings goal calculator", href: "https://www.investor.gov/financial-tools-calculators/calculators/savings-goal-calculator" },
  { label: "IRS — Topic no. 403, Interest received", href: "https://www.irs.gov/taxtopics/tc403" },
];

export default function GoalGuide() {
  return (
    <Guide
      kicker="The savings goal guide"
      title="How to reach a savings goal on time"
      intro={
        <>
          Whether it&rsquo;s an emergency fund, a down payment or a vacation, a clear target and a monthly amount make a goal far more likely to
          happen. This guide explains how the calculator works, walks through common goals, and covers where to keep the money and what savings
          accounts pay in 2026.
        </>
      }
      meta={["Worked examples", "9 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>To grow $2,000 into a $15,000 emergency fund in a year at 4%, save about $1,057 a month.</li>
          <li>Saving $500 a month instead, the same goal takes 25 months.</li>
          <li>The best online savings accounts paid around 4% in September 2026; the national average was about 0.38%.</li>
          <li>Keep goal money in an insured savings account, money market account or CD, not in stocks.</li>
        </ul>
        <KeyStats
          items={[
            { value: "$1,057", label: "A month: $15k in 12 months" },
            { value: "25 months", label: "At $500 a month" },
            { value: "~4%", label: "Top high-yield savings, Sept 2026" },
            { value: "$250,000", label: "FDIC insurance per depositor, per bank" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Method" title="How the calculator works">
        <p>
          You enter your goal, what you have already saved and the interest rate. The calculator grows your current savings at that rate, works out
          what is still missing, and then finds the monthly deposit that fills the gap, allowing for the interest each deposit earns. Interest is
          added monthly at a twelfth of the yearly rate, and deposits go in at the end of each month.
        </p>
        <p>
          Because interest does part of the work, you need to deposit a little less than the gap divided by the months. The longer the time and the
          higher the rate, the bigger interest&rsquo;s share.
        </p>
      </GuideSection>

      <GuideSection id="two-ways" n={3} kicker="Modes" title="Two ways to plan">
        <CompareCards
          columns={[
            {
              name: "I know my deadline",
              rows: [
                { label: "You enter", value: "Goal, savings, rate, months" },
                { label: "You get", value: "The monthly amount" },
                { label: "Best for", value: "Fixed dates: a wedding, a move, tuition" },
              ],
            },
            {
              name: "I know my monthly amount",
              rows: [
                { label: "You enter", value: "Goal, savings, rate, monthly saving" },
                { label: "You get", value: "How long it takes" },
                { label: "Best for", value: "Open goals: an emergency fund, a car" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="emergency" n={4} kicker="Real numbers" title="Example: an emergency fund">
        <WorkedExample
          title="Goal $15,000, already saved $2,000, 4% a year, 12 months"
          steps={[
            { label: "Still to find", value: "$13,000" },
            { label: "Monthly deposit at 4%", value: "$1,056.95" },
            { label: "Monthly deposit at 0.38%", value: "$1,080.81" },
          ]}
          total={{ label: "Save each month", value: "$1,057" }}
        />
        <p>
          Over a single year, interest makes only a small difference: about $24 a month. If you can save $500 a month instead, you reach $15,000 in
          25 months at 4%, or 26 months at 0.38%.
        </p>
      </GuideSection>

      <GuideSection id="emergency-size" n={5} kicker="How much" title="How big an emergency fund should be">
        <p>
          The usual advice is three to six months of essential spending: rent or mortgage, food, utilities, insurance, transport and minimum debt
          payments. On essentials of $2,500 a month, that is $7,500 to $15,000. Aim higher if you are self-employed, have one income, or work in an
          industry with frequent layoffs.
        </p>
        <Callout title="Start small">
          The Consumer Financial Protection Bureau suggests building savings a little at a time. Even a few hundred dollars can stop a car repair
          or a medical bill from going on a credit card. Set a first target, such as $1,000, then build toward the full amount.
        </Callout>
      </GuideSection>

      <GuideSection id="down-payment" n={6} kicker="Buying a home" title="Example: a down payment">
        <WorkedExample
          title="Goal $60,000 (20% of a $300,000 home), already saved $10,000, 36 months"
          steps={[
            { label: "Monthly deposit at 4%", value: "$1,276.20" },
            { label: "Monthly deposit at 0.38%", value: "$1,378.04" },
            { label: "Your deposits over 3 years at 4%", value: "$45,943" },
            { label: "Interest earned at 4%", value: "$4,057" },
          ]}
          total={{ label: "Saved by keeping it in a high-yield account", value: "$3,666 of deposits" }}
        />
        <p>
          A 20% down payment avoids private mortgage insurance on a conventional loan. Many buyers put down less, but remember closing costs too,
          often 2% to 5% of the price. If you can put aside $1,000 a month instead, the $60,000 takes 45 months at 4%. See what price fits your
          income with our <a href="/us/housing/mortgage-affordability">home affordability calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="other-goals" n={7} kicker="Everyday goals" title="A car, a vacation and other goals">
        <DataTable
          caption="Monthly saving at 4% a year"
          head={["Goal", "Already saved", "Months", "Save each month"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Vacation: $3,000", "$0", "10", "$295.53"],
            ["Emergency fund: $15,000", "$2,000", "12", "$1,056.95"],
            ["Car: $25,000", "$5,000", "24", "$785.17"],
            ["Down payment: $60,000", "$10,000", "36", "$1,276.20"],
          ]}
        />
        <p>
          Paying cash for a car, or making a bigger down payment, means borrowing less and paying less interest; our{" "}
          <a href="/us/loans/auto-loan-calculator">auto loan calculator</a> shows the difference.
        </p>
      </GuideSection>

      <GuideSection id="deadline" n={8} kicker="Timing" title="How the deadline changes the amount">
        <Figure label="Monthly saving for a $15,000 emergency fund from $2,000 at 4%" caption="A longer deadline lowers the monthly amount a lot.">
          <Bars
            format={(n) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            items={[
              { label: "6 months", value: 2_142.01 },
              { label: "12 months", value: 1_056.95 },
              { label: "24 months", value: 514.52 },
            ]}
          />
        </Figure>
        <p>
          Doubling the time more than halves the monthly amount, because interest has longer to work. If the number looks impossible, move the
          deadline before you give up on the goal.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={9} kicker="2026 rates" title="High-yield savings rates in 2026">
        <p>
          The FDIC publishes a national average rate for savings accounts each month. It was about 0.38% through mid-2026, because many large
          banks pay very little. Online banks and credit unions often pay far more: the best high-yield savings accounts paid around 4% APY in
          September 2026.
        </p>
        <p>
          On $10,000 for a year, 0.38% earns about $38 and 4% about $407. Savings rates are variable and tend to follow the Federal Reserve&rsquo;s
          interest rate decisions, so the rate you get today may change. The calculator keeps it fixed. See how interest builds over longer periods
          with our <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="where" n={10} kicker="Accounts" title="Where to keep goal money">
        <ul>
          <li><strong>High-yield savings account:</strong> variable rate, access at any time. Good for emergency funds.</li>
          <li><strong>Money market account:</strong> similar to savings, sometimes with checks or a debit card.</li>
          <li>
            <strong>Certificate of deposit (CD):</strong> fixed rate for a fixed term; an early withdrawal penalty if you take money out early.
            Good when you know the date. Try our <a href="/us/savings/cd-calculator">CD calculator</a>.
          </li>
          <li><strong>Treasury bills:</strong> short-term US government debt; interest is exempt from state income tax.</li>
        </ul>
        <p>
          For a goal within about five years, avoid putting the money in stocks. A market fall just before you need it could leave you short, and
          there may not be time to recover.
        </p>
      </GuideSection>

      <GuideSection id="safety" n={11} kicker="Protection" title="Deposit insurance">
        <p>
          Deposits at FDIC-insured banks are protected up to $250,000 per depositor, per insured bank, for each account ownership category, such as
          single and joint accounts. Credit union deposits have the same $250,000 protection from the NCUA. Check that an online bank is insured, or
          that a fintech app holds your money at an insured partner bank, before you open an account.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={12} kicker="Tax" title="Tax on interest">
        <p>
          Interest from savings accounts, money market accounts and CDs is taxable income in the year it is paid, at your ordinary income tax
          rate. Your bank sends Form 1099-INT if you earn $10 or more in a year. The calculator doesn&rsquo;t take tax off, so in the 22% bracket
          you would keep about 78% of the interest shown.
        </p>
      </GuideSection>

      <GuideSection id="automate" n={13} kicker="Habits" title="Make it automatic">
        <p>
          Set up an automatic transfer to your savings on payday, so the money moves before you can spend it. Many employers can split your direct
          deposit between two accounts. Name the account after the goal; people tend to leave money alone when it has a clear purpose. Put windfalls
          such as tax refunds and bonuses straight into the goal to get there sooner.
        </p>
      </GuideSection>

      <GuideSection id="several" n={14} kicker="Priorities" title="Saving for several goals">
        <p>A common order is:</p>
        <ol>
          <li>A starter emergency fund.</li>
          <li>Enough in your 401(k) to get the full employer match.</li>
          <li>Pay off high-interest debt such as credit cards.</li>
          <li>Build the full emergency fund.</li>
          <li>Save for medium-term goals, such as a home or car, while saving more for retirement.</li>
        </ol>
        <p>Run the calculator once per goal and add up the monthly amounts to see whether the plan fits your budget.</p>
      </GuideSection>

      <GuideSection id="debt" n={15} kicker="Trade-offs" title="Saving vs paying off debt">
        <p>
          Credit cards often charge 20% or more, far above what savings earn. Once you have a starter emergency fund, extra money usually does more
          good paying down that debt. Our <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a> compares the snowball and avalanche
          methods.
        </p>
      </GuideSection>

      <GuideSection id="long-term" n={16} kicker="Beyond five years" title="When a goal is years away">
        <p>
          For goals more than about five years away, such as retirement, investing can make sense because there is time to ride out market falls.
          The <a href="/us/savings/retirement-calculator">retirement calculator</a> is built for that. For college saving, look at a 529 plan, which
          grows tax-free when used for qualified education costs.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={17} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Keeping savings in a checking account or a savings account paying close to nothing.</li>
          <li>Setting a deadline that makes the monthly amount unrealistic, then giving up.</li>
          <li>Dipping into goal money for everyday spending.</li>
          <li>Forgetting extra costs, such as closing costs on a home or sales tax and fees on a car.</li>
          <li>Investing short-term money in stocks.</li>
        </ul>
      </GuideSection>

      <GuideSection id="sinking" n={18} kicker="Irregular bills" title="Sinking funds for yearly bills">
        <p>
          A sinking fund is a small savings goal for a bill you know is coming: car insurance, holiday gifts, property tax, a vet bill. Saving
          $1,200 for an insurance bill due in 12 months at 4% takes about $98.18 a month; $1,000 for the holidays in 11 months takes about $89.40.
          Spreading these costs out stops them landing on a credit card and keeps your emergency fund for real emergencies.
        </p>
      </GuideSection>

      <GuideSection id="progress" n={19} kicker="Staying on track" title="Checking your progress">
        <p>
          Check your balance against the chart every few months. If you fall behind, you have three choices: save a little more each month, push
          the deadline back, or lower the goal. If a rate change or a windfall puts you ahead, you could reach the goal early or move the extra to
          your next goal. Copy the calculator&rsquo;s link to save your plan and come back to it.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["Emergency fund guide", "3 to 6 months of essential spending"],
            ["FDIC national average savings rate, mid-2026", "About 0.38%"],
            ["Top high-yield savings rates, September 2026", "Around 4% APY"],
            ["FDIC and NCUA insurance", "$250,000 per depositor, per institution, per category"],
            ["Form 1099-INT threshold", "$10 of interest"],
            ["Down payment to avoid PMI (conventional loan)", "20%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

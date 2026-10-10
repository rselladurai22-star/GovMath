import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** High-yield savings (US) — the guide. Figures from src/lib/us/wealth.ts (savingsAccount, realReturn). */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a high-yield savings account is" },
  { id: "rates", title: "Rates in 2026" },
  { id: "example", title: "A worked example" },
  { id: "over-time", title: "How the gap grows" },
  { id: "one-year", title: "A year's interest by balance" },
  { id: "apy", title: "APY and how interest is paid" },
  { id: "variable", title: "Variable rates and rate cuts" },
  { id: "tax", title: "Tax on interest" },
  { id: "inflation", title: "Interest, tax and inflation" },
  { id: "fees", title: "Fees and minimums" },
  { id: "fdic", title: "FDIC insurance and the $250,000 limit" },
  { id: "access", title: "Getting your money out" },
  { id: "alternatives", title: "Money market accounts, CDs and T-bills" },
  { id: "uses", title: "What to keep in one" },
  { id: "choosing", title: "Choosing an account" },
  { id: "switching", title: "Switching banks" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "couples", title: "Couples and joint accounts" },
  { id: "ladder", title: "Using savings with other accounts" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "FDIC — National rates and rate caps", href: "https://www.fdic.gov/national-rates-and-rate-caps" },
  { label: "FDIC — Understanding deposit insurance", href: "https://www.fdic.gov/resources/deposit-insurance/understanding-deposit-insurance" },
  { label: "NCUA — Share insurance coverage", href: "https://ncua.gov/consumers/share-insurance-coverage" },
  { label: "IRS — Topic no. 403, Interest received", href: "https://www.irs.gov/taxtopics/tc403" },
  { label: "Federal Reserve — Interim final rule amending Regulation D (April 24, 2020)", href: "https://www.federalreserve.gov/newsevents/pressreleases/bcreg20200424a.htm" },
  { label: "TreasuryDirect — Treasury bills", href: "https://www.treasurydirect.gov/marketable-securities/treasury-bills/" },
];

export default function HysaGuide() {
  return (
    <Guide
      kicker="The high-yield savings guide"
      title="How much more a high-yield savings account pays"
      intro={
        <>
          A high-yield savings account is an ordinary insured savings account that pays far more interest than the national average. This guide shows
          how big the difference is in dollars, how the interest is taxed, what happens when rates fall, and how FDIC insurance and withdrawal rules
          work, so you can decide whether moving your savings is worth it.
        </>
      }
      meta={["Worked examples", "10 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The FDIC national average savings rate was 0.37% on September 21, 2026. Top online high-yield accounts paid around 4% to 4.3% APY in early October 2026.</li>
          <li>On $10,000 for a year, that is about $400 of interest instead of $37.</li>
          <li>$10,000 plus $200 a month for 5 years grows to $25,402 at 4%, against $22,296 at 0.37%: $3,106 more.</li>
          <li>Both kinds are insured up to $250,000 per depositor, per bank, per ownership category, so the higher rate costs you no safety.</li>
        </ul>
        <KeyStats
          items={[
            { value: "0.37%", label: "FDIC national average savings rate" },
            { value: "About 4%", label: "Top high-yield accounts, October 2026" },
            { value: "$3,106", label: "Extra over 5 years in our example" },
            { value: "$250,000", label: "FDIC insurance limit" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a high-yield savings account is">
        <p>
          There is no legal definition: &quot;high-yield&quot; simply means a savings account paying well above the average. Most are offered by
          online banks and some credit unions, which save on branches and pass part of the saving on as a higher rate. Many large branch banks still
          pay 0.01% to 0.10% on standard savings, which is why the national average stays low.
        </p>
        <p>
          A high-yield account works like any savings account: you can add or take out money at any time, the balance can&rsquo;t fall, and deposits
          are insured if the bank is FDIC-insured or the credit union NCUA-insured.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="2026" title="Rates in 2026">
        <p>
          The FDIC publishes a national average for each kind of deposit account. On September 21, 2026, it was 0.37% for savings, 0.63% for money
          market accounts, 0.07% for interest checking and 1.73% for 12-month CDs. In early October 2026, the best widely available high-yield
          savings accounts paid around 4% to 4.3% APY, with some promotional rates higher for a few months.
        </p>
        <Callout title="Use today's rate">
          The calculator starts at 4% for the high-yield account and the FDIC average for the regular one. Enter the APYs your banks actually quote.
        </Callout>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="$10,000 opening deposit, $200 a month, 5 years: 4% APY against 0.37%"
          steps={[
            { label: "Your deposits: $10,000 + $200 × 60", value: "$22,000" },
            { label: "Interest at 4%", value: "$3,402" },
            { label: "Interest at 0.37%", value: "$296" },
            { label: "Balance at 4%", value: "$25,402" },
            { label: "Balance at 0.37%", value: "$22,296" },
          ]}
          total={{ label: "Extra from the high-yield account", value: "$3,106" }}
        />
        <p>
          After federal tax at 22% on each year&rsquo;s interest, paid from the account, the balances are $24,614 and $22,231, still $2,383 apart.
          The tax on the high-yield interest is $737 over the five years, against $65.
        </p>
      </GuideSection>

      <GuideSection id="over-time" n={5} kicker="Over time" title="How the gap grows">
        <Figure label="Extra balance from 4% instead of 0.37%" caption="$10,000 plus $200 a month, before tax.">
          <Bars
            format={(n) => "$" + n.toLocaleString("en-US")}
            items={[
              { label: "1 year", value: 403 },
              { label: "3 years", value: 1_527 },
              { label: "5 years", value: 3_106 },
              { label: "10 years", value: 9_320 },
            ]}
          />
        </Figure>
        <DataTable
          caption="Balances with $10,000 plus $200 a month"
          head={["Years", "At 4%", "At 0.37%", "Gap"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1", "$12,844", "$12,441", "$403"],
            ["3", "$18,877", "$17,350", "$1,527"],
            ["5", "$25,402", "$22,296", "$3,106"],
            ["10", "$44,142", "$34,821", "$9,320"],
          ]}
        />
        <p>
          The gap grows faster each year because the higher rate earns interest on interest. Our{" "}
          <a href="/us/savings/compound-interest-calculator">compound interest calculator</a>{" "}shows the same effect over longer periods.
        </p>
      </GuideSection>

      <GuideSection id="one-year" n={6} kicker="Quick view" title="A year's interest by balance">
        <DataTable
          caption="Interest on a single deposit left for one year"
          head={["Balance", "At 0.37%", "At 4%"]}
          numeric={[1, 2]}
          rows={[
            ["$5,000", "$19", "$200"],
            ["$10,000", "$37", "$400"],
            ["$25,000", "$93", "$1,000"],
            ["$50,000", "$185", "$2,000"],
            ["$100,000", "$370", "$4,000"],
          ]}
        />
        <p>
          On an <a href="/us/savings/emergency-fund-calculator">emergency fund</a>{" "}of $25,000, moving it is worth about $900 a year. On a $2,000
          balance it is worth about $73, which may still be worth a few minutes of paperwork.
        </p>
      </GuideSection>

      <GuideSection id="apy" n={7} kicker="Rates" title="APY and how interest is paid">
        <p>
          Banks must quote the annual percentage yield (APY) on savings accounts under the Truth in Savings Act. The APY includes compounding, so it
          is the figure to compare. Most high-yield accounts compound interest daily and credit it monthly. The calculator credits interest monthly at
          the rate that gives exactly the APY over a year, and adds your monthly deposit at the end of each month.
        </p>
      </GuideSection>

      <GuideSection id="variable" n={8} kicker="Risk" title="Variable rates and rate cuts">
        <p>
          Savings rates are variable: the bank can change them at any time, and they usually follow the Federal Reserve&rsquo;s rate decisions. Some
          headline rates are bonuses that last a few months or need a direct deposit.
        </p>
        <p>
          In the example, if the high-yield rate drops one point to 3% after the first year, the balance after five years is $24,634, with $2,634 of
          interest: still $2,338 more than the regular account. Use the &quot;rate change after year 1&quot; option to test your own scenario. If you
          want a fixed rate, a <a href="/us/savings/cd-calculator">CD</a>{" "}locks one in for its term.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={9} kicker="Tax" title="Tax on interest">
        <p>
          Interest from savings accounts is taxed as ordinary income in the year it is credited, even if you don&rsquo;t withdraw it. Your bank sends
          Form 1099-INT if you earn $10 or more, and you must report interest even if you don&rsquo;t get one. Most states tax it too; nine states
          have no income tax on wages or interest.
        </p>
        <p>
          The calculator takes your federal bracket and state rate from More options and shows the balance after tax. The higher your bracket, the
          smaller the after-tax gap, but the high-yield account always comes out ahead when its rate is higher. Our{" "}
          <a href="/us/taxes/tax-bracket-calculator">tax bracket calculator</a>{" "}shows your federal bracket.
        </p>
      </GuideSection>

      <GuideSection id="inflation" n={10} kicker="Real value" title="Interest, tax and inflation">
        <p>
          What matters for buying power is the real return: interest after tax, minus inflation. At 4% with 22% federal tax, you keep 3.12%, and with
          2.5% inflation the real return is about 0.60% a year. At 0.37%, the real return is about −2.08% even before tax, so money in a low-rate
          account loses buying power every year.
        </p>
        <Callout tone="warn" title="A place to park, not to grow">
          Even a good savings rate barely beats inflation after tax. Money for goals more than five years away, such as retirement, usually belongs
          in investments like a <a href="/us/savings/401k-calculator">401(k)</a>{" "}or IRA.
        </Callout>
      </GuideSection>

      <GuideSection id="fees" n={11} kicker="Costs" title="Fees and minimums">
        <p>
          Most online high-yield accounts have no monthly fee and no minimum balance. Some branch savings accounts charge a monthly maintenance fee
          unless you keep a minimum balance or link a checking account. A $5 monthly fee wipes out more than a 0.37% account earns: in the example,
          $300 of fees over five years against $296 of interest, leaving $21,993 from $22,000 of deposits.
        </p>
      </GuideSection>

      <GuideSection id="fdic" n={12} kicker="Safety" title="FDIC insurance and the $250,000 limit">
        <p>
          Deposits at an FDIC-insured bank are insured up to $250,000 per depositor, per insured bank, for each ownership category: single accounts,
          joint accounts, certain retirement accounts and trust accounts are separate categories. Credit union deposits get the same cover from the
          NCUA. Insurance applies automatically; you don&rsquo;t need to apply.
        </p>
        <p>
          If your savings pass $250,000 at one bank in one category, spread them across banks or categories. Some fintech apps aren&rsquo;t banks:
          they place your money with partner banks, and FDIC insurance protects you only if the partner bank fails, not if the app does. Check
          which bank holds your money.
        </p>
      </GuideSection>

      <GuideSection id="access" n={13} kicker="Access" title="Getting your money out">
        <p>
          Transfers from an online high-yield account to your checking account usually take one to three business days, so keep a little cash in
          checking for same-day needs. In April 2020 the Federal Reserve removed the federal limit of six convenient withdrawals a month from
          savings accounts. Some banks still keep a monthly limit or charge for extra withdrawals, so read the account terms.
        </p>
      </GuideSection>

      <GuideSection id="alternatives" n={14} kicker="Options" title="Money market accounts, CDs and T-bills">
        <CompareCards
          columns={[
            {
              name: "High-yield savings",
              rows: [
                { label: "Rate", value: "Variable" },
                { label: "Access", value: "Any time, 1–3 days" },
                { label: "Insured", value: "Yes, FDIC or NCUA" },
              ],
            },
            {
              name: "CD",
              rows: [
                { label: "Rate", value: "Fixed for the term" },
                { label: "Access", value: "Penalty if you withdraw early" },
                { label: "Insured", value: "Yes, FDIC or NCUA" },
              ],
            },
            {
              name: "Treasury bills",
              rows: [
                { label: "Rate", value: "Set at each auction" },
                { label: "Access", value: "At maturity, or sell" },
                { label: "Insured", value: "Backed by the US government; no state tax" },
              ],
            },
          ]}
        />
        <p>
          Money market accounts are insured deposit accounts that sometimes add checks or a debit card. Money market funds, sold by brokers, are not
          FDIC insured, though they are low risk. Treasury bill interest is exempt from state and local income tax, which can tip the balance in a
          high-tax state.
        </p>
      </GuideSection>

      <GuideSection id="uses" n={15} kicker="Uses" title="What to keep in one">
        <ul>
          <li>An emergency fund of three to six months of essential costs.</li>
          <li>Savings for goals within a few years: a down payment, a car, a wedding or a vacation. Our <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}sets the monthly amount.</li>
          <li>Money set aside for quarterly estimated taxes or an annual insurance bill.</li>
          <li>Cash waiting to be invested.</li>
        </ul>
      </GuideSection>

      <GuideSection id="choosing" n={16} kicker="Checklist" title="Choosing an account">
        <ul>
          <li>Is the bank FDIC-insured, or the credit union NCUA-insured?</li>
          <li>Is the rate standard, or a bonus for a few months or with conditions?</li>
          <li>Are there monthly fees, minimum balances or withdrawal limits?</li>
          <li>How quickly do transfers reach your checking account?</li>
          <li>Has the bank kept its rate competitive in the past, or does it lag when rates fall?</li>
        </ul>
      </GuideSection>

      <GuideSection id="switching" n={17} kicker="Moving" title="Switching banks">
        <p>
          Opening an online savings account takes a few minutes with your Social Security number and ID. Link your current checking account, move
          the money, and keep the old account open until the first transfer arrives. If you have automatic transfers into savings, point them at the
          new account. There is no tax to pay on moving cash between banks.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Avoid these" title="Common mistakes">
        <ul>
          <li>Leaving savings at a big bank paying close to nothing out of habit.</li>
          <li>Chasing a promotional rate that falls after three months.</li>
          <li>Keeping long-term money in savings, where inflation and tax eat the interest.</li>
          <li>Going over $250,000 at one bank in one ownership category.</li>
          <li>Forgetting to report the interest on your tax return.</li>
        </ul>
      </GuideSection>

      <GuideSection id="couples" n={19} kicker="Households" title="Couples and joint accounts">
        <p>
          A joint savings account is its own FDIC ownership category, insured up to $250,000 for each co-owner, so a couple can hold up to $500,000
          in joint accounts at one bank, plus $250,000 each in single accounts. Interest on a joint account is usually reported under the Social
          Security number of the first-named owner, but married couples filing jointly simply report it on their joint return.
        </p>
        <p>
          Some couples keep one shared high-yield account for the emergency fund and household goals, and separate accounts for personal spending.
          Others open several &quot;buckets&quot; or sub-accounts at the same bank, one per goal, which many online banks offer at no cost. Naming
          each bucket after its goal makes it easier to leave the money alone until it is needed.
        </p>
      </GuideSection>

      <GuideSection id="ladder" n={20} kicker="Planning" title="Using savings with other accounts">
        <p>
          A high-yield account works best as one layer of a plan. A common order is: one month of spending in checking for bills, three to six months
          of essential costs in a high-yield savings account for emergencies, money for goals one to five years away in savings, CDs or Treasury bills
          depending on when you need it, and long-term money in a 401(k), IRA or brokerage account.
        </p>
        <p>
          If you hold a large cash balance and can wait for part of it, splitting it between a high-yield account and a few CDs maturing at different
          times keeps some money available while locking a fixed rate on the rest. When rates are expected to fall, a CD protects that part of your
          savings from cuts; when they are expected to rise, staying in savings lets you benefit straight away. Because nobody knows which way rates
          will move, many savers simply split the difference.
        </p>
      </GuideSection>
      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          numeric={[1]}
          rows={[
            ["FDIC national average savings rate, September 21, 2026", "0.37%"],
            ["FDIC national average money market rate", "0.63%"],
            ["FDIC national average 12-month CD rate", "1.73%"],
            ["Top high-yield savings accounts, early October 2026", "About 4% to 4.3% APY"],
            ["FDIC and NCUA insurance", "$250,000 per depositor, per institution, per ownership category"],
            ["Form 1099-INT threshold", "$10 of interest"],
            ["Federal limit on savings withdrawals", "Removed in April 2020 (banks may set their own)"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

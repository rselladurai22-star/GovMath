import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Credit card interest guide. Figures from src/lib/us/loan-math.ts (cardCycle, cardYear). Average APRs: Federal Reserve G.19, released October 7, 2026. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "apr", title: "Your card's APR" },
  { id: "average", title: "Average card rates in 2026" },
  { id: "daily-rate", title: "The daily periodic rate" },
  { id: "adb", title: "The average daily balance" },
  { id: "example", title: "A worked example" },
  { id: "compounding", title: "Daily compounding" },
  { id: "grace", title: "The grace period" },
  { id: "lose-grace", title: "Losing and regaining the grace period" },
  { id: "trailing", title: "Residual interest" },
  { id: "timing", title: "When you pay matters" },
  { id: "year", title: "A year of interest" },
  { id: "rates", title: "What a few points of APR cost" },
  { id: "several-aprs", title: "Cards with several APRs" },
  { id: "card-act", title: "Your rights under the CARD Act" },
  { id: "statement", title: "Reading your statement" },
  { id: "cut", title: "Ways to pay less interest" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Federal Reserve: Consumer Credit (G.19), interest rates", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "CFPB: How does my credit card company calculate the amount of interest I owe?", href: "https://www.consumerfinance.gov/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/" },
  { label: "CFPB: What is a grace period for a credit card?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-grace-period-for-a-credit-card-en-47/" },
  { label: "CFPB: Regulation Z, 12 CFR 1026.5 (statement timing) and 1026.54 (no double-cycle billing)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/54/" },
  { label: "CFPB: Regulation Z, 12 CFR 1026.55 (limits on rate increases)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/55/" },
];

export default function CardInterestGuide() {
  return (
    <Guide
      kicker="The credit card interest guide"
      title="How your card works out interest"
      intro={
        <>
          Credit card interest looks mysterious on a statement, but it follows a short recipe: a daily rate from your APR, applied to your balance each day of the billing cycle.
          This guide walks through the average daily balance method, daily compounding, the grace period that lets you pay no interest at all, and what a typical balance costs
          over a year.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Daily periodic rate = APR ÷ 365. At 22% that is 0.06027% a day.</li>
          <li>A $5,000 balance at 22% costs about $91.21 over a 30-day cycle with daily compounding.</li>
          <li>Pay the full statement balance every month and most cards charge no interest on purchases.</li>
          <li>Paying $200 a month on $5,000 at 22% and spending nothing more still costs about $938 of interest in a year.</li>
        </ul>
        <KeyStats
          items={[
            { value: "about 22.4%", label: "Average APR, accounts charged interest (Fed, Aug 2026)" },
            { value: "0.06027%", label: "Daily rate at 22% APR" },
            { value: "$91.21", label: "30 days on $5,000 at 22%" },
            { value: "21 days", label: "Minimum time from statement to due date" },
          ]}
        />
      </GuideSection>

      <GuideSection id="apr" n={2} kicker="Basics" title="Your card's APR">
        <p>
          A card&rsquo;s annual percentage rate is its yearly interest rate. Unlike a loan APR, it does not fold in fees: annual fees, late fees and cash advance fees are charged
          separately. Most cards have a variable APR, set as the prime rate plus a margin, so it moves when the Federal Reserve changes rates. Your statement lists each APR on the
          account. For how lenders build fees into a loan&rsquo;s APR, see our <a href="/us/loans/apr-calculator">APR calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="average" n={3} kicker="Context" title="Average card rates in 2026">
        <DataTable
          caption="Commercial bank credit card rates, Federal Reserve G.19 (released October 7, 2026)"
          head={["Measure", "Q2 2026", "August 2026"]}
          numeric={[1, 2]}
          rows={[
            ["Accounts assessed interest", "22.15%", "22.36%"],
            ["All accounts", "20.94%", "21.19%"],
          ]}
        />
        <p>
          &quot;Accounts assessed interest&quot; covers people who carry a balance, so it is the better guide to what a balance costs. Store cards and cards for people with lower
          credit scores often charge close to 30%.
        </p>
      </GuideSection>

      <GuideSection id="daily-rate" n={4} kicker="The maths" title="The daily periodic rate">
        <p>
          Cards charge interest by the day. The daily periodic rate is the APR divided by 365 (a few issuers use 360). At 22%, that is 0.22 ÷ 365 = 0.0006027, or 0.06027% a
          day. On a $5,000 balance that is about $3.01 of interest every day. Over 30 days that adds up to $90.41 before compounding.
        </p>
      </GuideSection>

      <GuideSection id="adb" n={5} kicker="The maths" title="The average daily balance">
        <p>
          Your balance changes during the month as purchases post and payments arrive. Most issuers use the average daily balance method, including new purchases:
        </p>
        <ol>
          <li>Take the balance at the end of each day of the billing cycle.</li>
          <li>Add them up and divide by the number of days in the cycle.</li>
          <li>Interest = average daily balance × daily rate × days in the cycle.</li>
        </ol>
        <p>With daily compounding, each day&rsquo;s interest is added to the balance first, so it is included in the average.</p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$5,000 balance, 22% APR, 30-day cycle"
          steps={[
            { label: "Days 1 to 9", note: "starting balance", value: "$5,000" },
            { label: "Day 10", note: "$500 of purchases post", value: "+$500" },
            { label: "Day 20", note: "$200 payment credited", value: "−$200" },
            { label: "Average daily balance", note: "with daily compounding", value: "$5,322.51" },
            { label: "Daily rate", note: "22% ÷ 365", value: "0.06027%" },
          ]}
          total={{ label: "Interest for the cycle", value: "$96.24" }}
        />
        <p>
          The new statement balance is $5,396.24: the payment did not even cover the new purchases, so the debt grew. Without the $200 payment, the interest would have been
          $97.57.
        </p>
      </GuideSection>

      <GuideSection id="compounding" n={7} kicker="The maths" title="Daily compounding">
        <CompareCards
          columns={[
            {
              name: "Simple daily interest",
              rows: [
                { label: "$5,000 at 22% for 30 days", value: "$90.41" },
                { label: "Same, APR ÷ 360", value: "$91.67" },
              ],
            },
            {
              name: "Compounded daily",
              rows: [
                { label: "$5,000 at 22% for 30 days", value: "$91.21" },
                { label: "Same, APR ÷ 360", value: "$92.48" },
              ],
            },
          ]}
        />
        <p>
          Compounding adds under a dollar a month on $5,000, but it never stops. A 31-day cycle costs $94.27 on the same balance. The calculator lets you switch compounding and the
          360-day year under More options to match your card agreement.
        </p>
      </GuideSection>

      <GuideSection id="grace" n={8} kicker="Grace period" title="The grace period">
        <p>
          Most cards give a grace period on purchases: if you paid the previous statement balance in full by the due date, new purchases are interest-free as long as you pay this
          statement in full too. Card issuers do not have to offer a grace period, but if they do, the CARD Act rules require the statement to be mailed or delivered at least 21
          days before the payment is due.
        </p>
        <Callout tone="good" title="Pay in full and pay no interest">
          Someone who paid last month in full, spends $600 this month and pays the $1,500 statement balance in full is charged $0.00. Keep doing it every month and the card costs
          nothing in interest.
        </Callout>
      </GuideSection>

      <GuideSection id="lose-grace" n={9} kicker="Grace period" title="Losing and regaining the grace period">
        <Timeline
          items={[
            { when: "Month 1", what: "You pay $1,400 of a $1,500 statement", detail: "The grace period is lost. Interest is charged on the $100 left unpaid and on new purchases from the day they post, but not on the $1,400 you paid in time." },
            { when: "Same cycle", what: "Interest appears", detail: "With $600 of purchases on day 10 and the $1,400 payment on day 20, about $9.46 on a balance subject to interest averaging $523.42." },
            { when: "Month 2 or 3", what: "You pay the full statement balance", detail: "Most cards restore the grace period once you pay in full, sometimes after a second month." },
          ]}
        />
        <p>
          Since 2010, issuers may not charge interest on balances from the cycle before last (double-cycle billing), and when you pay part of a balance within the grace period
          they cannot charge interest on the part you paid on time.
        </p>
      </GuideSection>

      <GuideSection id="trailing" n={10} kicker="Grace period" title="Residual interest">
        <p>
          If you carried a balance, then pay the statement in full, you may still see a small interest charge on the next statement. That is residual (or trailing) interest for
          the days between the statement closing and your payment arriving. Ask the issuer for a payoff amount if you want to clear the card exactly, and pay in full again the next
          month; the charge should then stop.
        </p>
      </GuideSection>

      <GuideSection id="timing" n={11} kicker="Timing" title="When you pay matters">
        <Bars
          format={(n) => `$${n.toFixed(2)}`}
          items={[
            { label: "Paid on day 1", value: 93.92 },
            { label: "Paid on day 5", value: 94.41 },
            { label: "Paid on day 20", value: 96.24 },
            { label: "Paid on day 30", value: 97.45 },
            { label: "No payment", value: 97.57 },
          ]}
        />
        <p>
          The worked example with the $200 payment made on different days. The earlier a payment arrives, the more days the balance is lower. The saving is small each month,
          but paying as soon as your paycheck lands, or splitting your payment into two, is an easy habit.
        </p>
      </GuideSection>

      <GuideSection id="year" n={12} kicker="Over a year" title="A year of interest">
        <DataTable
          caption="$5,000 at 22%, no new purchases, interest compounded daily"
          head={["Monthly payment", "Interest in 12 months", "Balance after 12 months"]}
          numeric={[1, 2]}
          rows={[
            ["$150", "$1,006", "$4,206"],
            ["$200", "$938", "$3,538"],
            ["$300", "$801", "$2,201"],
            ["$500", "$530", "almost nothing"],
          ]}
        />
        <p>
          Now add $500 of spending a month to the $200 payment: after a year the interest is $1,662 and the balance has grown to $10,262. Payments that do not cover new spending
          plus interest only make the debt bigger. To set a payoff date, use our <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={13} kicker="Rates" title="What a few points of APR cost">
        <DataTable
          caption="$5,000 balance; first column is one 30-day cycle with no payment, second is a year paying $200 a month"
          head={["APR", "Interest in 30 days", "Interest in a year"]}
          numeric={[1, 2]}
          rows={[
            ["18%", "$74.50", "$750"],
            ["21.19% (all-accounts average)", "$87.82", "$899"],
            ["22.36% (average when charged interest)", "$92.71", "$955"],
            ["25%", "$103.77", "$1,083"],
            ["29.99%", "$124.73", "$1,337"],
          ]}
        />
        <p>
          Calling your issuer to ask for a lower rate works more often than people expect, especially with a good payment record. A 0% balance transfer can cut the cost further;
          see our <a href="/us/loans/balance-transfer-calculator">balance transfer calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="several-aprs" n={14} kicker="Rates" title="Cards with several APRs">
        <p>
          One card can have different APRs for purchases, balance transfers and cash advances, plus a promotional rate and a penalty rate. Each part of the balance is charged at
          its own rate. Under the CARD Act, any payment above the minimum must go first to the balance with the highest APR. Cash advances usually have no grace period, so
          interest starts the day you take the cash.
        </p>
      </GuideSection>

      <GuideSection id="card-act" n={15} kicker="Your rights" title="Your rights under the CARD Act">
        <ul>
          <li>45 days&rsquo; notice before the APR on new purchases goes up or other significant terms change, with the right to refuse and pay off the old balance on the old terms.</li>
          <li>No rate increase in the first year of the account, apart from variable-rate changes, promotional rates ending and late payments.</li>
          <li>A penalty APR can apply to your existing balance only if you are more than 60 days late, and must be reviewed after six months of on-time payments.</li>
          <li>Statements at least 21 days before the due date, and the same due date each month.</li>
        </ul>
      </GuideSection>

      <GuideSection id="statement" n={16} kicker="Statements" title="Reading your statement">
        <p>
          The &quot;Interest Charge Calculation&quot; box lists each balance type, its APR, the balance subject to interest rate (your average daily balance) and the interest
          charged. Enter those figures here to check them. The minimum payment warning box shows how long paying only the minimum would take, and the payment that clears the
          balance in three years.
        </p>
      </GuideSection>

      <GuideSection id="cut" n={17} kicker="Saving" title="Ways to pay less interest">
        <ol>
          <li>Pay the full statement balance by the due date to keep the grace period.</li>
          <li>If you carry a balance, stop using that card for new spending.</li>
          <li>Pay early in the cycle, or make two payments a month.</li>
          <li>Ask the issuer for a lower APR.</li>
          <li>Move the balance to a 0% card or a lower-rate personal loan, and clear it during the promotion.</li>
          <li>With several cards, put extra money on the highest APR first; our <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}plans it.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator">
        <p>
          Enter the balance at the start of the billing cycle, the purchase APR, this cycle&rsquo;s purchases and payment, and whether you paid last month&rsquo;s statement in
          full. Under More options, set the cycle length, the days your purchases post and your payment is credited, daily compounding and the 360- or 365-day year. The results
          show this cycle&rsquo;s interest, your balance day by day, how payment timing changes the interest, and a 12-month projection.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average card APR, accounts charged interest (Fed G.19, August 2026)", "about 22.4%"],
            ["Average card APR, all accounts (same)", "about 21.2%"],
            ["Daily periodic rate", "APR ÷ 365 (some cards ÷ 360)"],
            ["Statement to due date (if a grace period is offered)", "at least 21 days"],
            ["Notice before an APR increase", "45 days"],
            ["Lateness before a penalty APR hits existing balances", "more than 60 days"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

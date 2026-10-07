import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Credit card payoff — the guide. Figures from src/lib/us/loans.ts and loans-extra.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "interest", title: "How card interest is charged" },
  { id: "minimum", title: "How the minimum payment works" },
  { id: "minimum-trap", title: "The cost of paying the minimum" },
  { id: "fixed", title: "Paying a fixed amount" },
  { id: "deadline", title: "Clearing the card by a date" },
  { id: "rate", title: "How much the APR matters" },
  { id: "statement", title: "What your statement must tell you" },
  { id: "grace", title: "The grace period" },
  { id: "transfer", title: "Balance transfers" },
  { id: "transfer-risks", title: "Balance transfer catches" },
  { id: "consolidation", title: "Debt consolidation loans" },
  { id: "several", title: "If you have several cards" },
  { id: "lower-rate", title: "Asking for a lower rate" },
  { id: "hardship", title: "If you are struggling" },
  { id: "credit-score", title: "Paying down cards and your credit score" },
  { id: "budget", title: "Finding the money to pay more" },
  { id: "after", title: "After the card is clear" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "lump-sum", title: "Using a lump sum" },
  { id: "twice", title: "Paying more than once a month" },
  { id: "penalty-apr", title: "Penalty APRs and cash advances" },
  { id: "transfer-fee", title: "When the transfer fee is higher" },
  { id: "plan", title: "A step-by-step payoff plan" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Federal Reserve — Consumer Credit G.19 (credit card interest rates)", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "CFPB — What is a credit card minimum payment?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-card-minimum-payment-en-34/" },
  { label: "CFPB — Credit cards: answers to common questions", href: "https://www.consumerfinance.gov/consumer-tools/credit-cards/" },
  { label: "CFPB — What is a balance transfer?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-balance-transfer-fee-en-49/" },
  { label: "FTC — How to get out of debt", href: "https://consumer.ftc.gov/articles/how-get-out-debt" },
  { label: "AnnualCreditReport.com — Free credit reports", href: "https://www.annualcreditreport.com/" },
];

export default function CardPayoffGuide() {
  return (
    <Guide
      kicker="The credit card payoff guide"
      title="How to pay off a credit card faster"
      intro={
        <>
          Credit cards are among the most expensive ways to borrow, and the minimum payment is designed to keep you paying for years. This guide
          shows how card interest and minimum payments work, what a fixed payment or a deadline saves, when a balance transfer helps, and how to
          get the balance to zero for good.
        </>
      }
      meta={["Worked examples", "13 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A {usd(6_000)} balance at 22% charges about $110 of interest in the first month.</li>
          <li>Paying only a typical minimum (1% of the balance plus interest, at least $25) takes 20 years 9 months and costs {usd(9_933)} in interest.</li>
          <li>Paying a fixed $300 a month clears it in 26 months for {usd(1_543)} of interest.</li>
          <li>A 0% balance transfer with a 3% fee, paid at $300 a month, costs about {usd(207)} in fee and interest.</li>
        </ul>
        <KeyStats
          items={[
            { value: "about 22%", label: "Average APR on cards charged interest (Fed, August 2026)" },
            { value: usd(9_933), label: "Interest on $6,000 paying the minimum" },
            { value: usd(1_543), label: "Interest paying $300 a month" },
            { value: "26 months", label: "To clear $6,000 at $300 a month" },
          ]}
        />
      </GuideSection>

      <GuideSection id="interest" n={2} kicker="Basics" title="How card interest is charged">
        <p>
          Your card&rsquo;s APR is a yearly rate. Most issuers divide it by 365 to get a daily rate, apply it to your balance each day and add the
          interest to your account once a month. Because interest is added to the balance, next month you pay interest on it too.
        </p>
        <p>
          A {usd(6_000)} balance at 22% costs about $110 a month in interest (6,000 × 22% ÷ 12). The calculator uses the monthly rate, which
          is within a few cents of the daily method. Cards often have several APRs: one for purchases, one for cash advances and one for balance
          transfers, plus a higher penalty APR if you pay late.
        </p>
        <p>
          The Federal Reserve&rsquo;s G.19 survey put the average rate on cards that were charged interest at about 22% in August 2026, and about
          21% across all accounts. Store cards and cards for people rebuilding credit often charge 28% or more.
        </p>
      </GuideSection>

      <GuideSection id="minimum" n={3} kicker="Minimums" title="How the minimum payment works">
        <p>
          Each issuer sets its own formula, shown in the card agreement. A common one is <strong>1% of the balance plus that month&rsquo;s interest
          and fees</strong>, or a floor such as $25 or $35, whichever is more. Others use 2% plus interest. Because the minimum is a share of the
          balance, it falls as the balance falls, which is why paying only the minimum takes so long.
        </p>
        <p>
          On {usd(6_000)} at 22%, the first minimum under the 1% formula is $170: $60 of principal and $110 of interest. Change the share and
          the floor under More options to match your card.
        </p>
      </GuideSection>

      <GuideSection id="minimum-trap" n={4} kicker="Minimums" title="The cost of paying the minimum">
        <CompareCards
          columns={[
            { name: "1% plus interest, $25 floor", rows: [{ label: "First payment", value: "$170" }, { label: "Time to clear", value: "20 years 9 months" }, { label: "Interest", value: usd(9_933) }] },
            { name: "2% plus interest, $25 floor", rows: [{ label: "First payment", value: "$230" }, { label: "Time to clear", value: "12 years 2 months" }, { label: "Interest", value: usd(5_145) }] },
            { name: "Fixed $300 a month", rows: [{ label: "First payment", value: "$300" }, { label: "Time to clear", value: "2 years 2 months" }, { label: "Interest", value: usd(1_543) }] },
          ]}
        />
        <p>
          Paying only the minimum, the {usd(6_000)} costs more in interest than the original balance. The fix is simple: keep paying the amount
          of your first minimum, or more, even as the minimum falls.
        </p>
      </GuideSection>

      <GuideSection id="fixed" n={5} kicker="Plans" title="Paying a fixed amount">
        <DataTable
          caption="$6,000 at 22% APR, no new spending"
          head={["Monthly payment", "Time to clear", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["$150", "6 years 1 month", usd(4_913)],
            ["$200", "3 years 8 months", usd(2_791)],
            ["$300", "2 years 2 months", usd(1_543)],
            ["$500", "1 year 2 months", usd(839)],
          ]}
        />
        <p>
          Each extra dollar goes straight to the balance, so the savings are large at first: going from $150 to $200 a month saves{" "}
          {usd(2_122)} and more than two years.
        </p>
      </GuideSection>

      <GuideSection id="deadline" n={6} kicker="Plans" title="Clearing the card by a date">
        <p>Choose &quot;Clear it by a set time&quot; to get the payment that clears the card in a set number of months.</p>
        <DataTable
          caption="Payment to clear $6,000 at 22%"
          head={["Clear it in", "Monthly payment", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["12 months", "$561.57", usd(739)],
            ["24 months", "$311.27", usd(1_470)],
            ["36 months", "$229.14", usd(2_249)],
          ]}
        />
        <p>
          A deadline works well with an automatic payment set for the amount, so the plan runs without you having to decide each month.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={7} kicker="Rates" title="How much the APR matters">
        <Figure label="Interest on $6,000 paid at $300 a month" caption="Same payment, different APRs.">
          <Bars
            format={usd}
            items={[
              { label: "18% APR", value: 1_187 },
              { label: "22% APR", value: 1_543 },
              { label: "26% APR", value: 1_950 },
              { label: "30% APR", value: 2_422 },
            ]}
          />
        </Figure>
        <p>At $300 a month, each four points of APR adds roughly $350 to $470 of interest and one or two months.</p>
      </GuideSection>

      <GuideSection id="statement" n={8} kicker="Your rights" title="What your statement must tell you">
        <p>
          Under the federal Credit CARD Act of 2009, your monthly statement must show how long it would take to pay off the balance making only
          minimum payments, the total you would pay, and the monthly payment that would clear it in three years. Compare those lines with this
          calculator. The Act also requires that any amount you pay above the minimum goes to the balance with the highest APR first.
        </p>
      </GuideSection>

      <GuideSection id="grace" n={9} kicker="Basics" title="The grace period">
        <p>
          If you pay the full statement balance by the due date, most cards charge no interest on new purchases. Once you carry a balance, you
          usually lose that grace period, so new purchases start charging interest straight away. That is why the calculator assumes you stop
          using the card: putting new spending on a card you are paying down makes the payoff longer and more expensive.
        </p>
      </GuideSection>

      <GuideSection id="transfer" n={10} kicker="Transfers" title="Balance transfers">
        <p>
          A balance transfer card moves your debt to a new card with a low or 0% introductory APR, often for 12 to 21 months. You usually pay a
          fee of 3% to 5% of the amount moved, added to the new balance. Turn on &quot;Compare a balance transfer&quot; under More options.
        </p>
        <WorkedExample
          title="$6,000 moved to a 0% card for 18 months, 3% fee, then 22%"
          steps={[
            { label: "Transfer fee", value: "$180" },
            { label: "Balance on the new card", value: usd(6_180) },
            { label: "Paying $300 a month: left when the 0% ends", value: usd(780) },
            { label: "Interest after the 0% ends", value: usd(27) },
          ]}
          total={{ label: "Fee and interest, against $1,543 on the old card", value: usd(207) }}
        />
        <p>Paying $343.33 a month instead clears the whole {usd(6_180)} before the 0% ends, so you pay only the $180 fee.</p>
      </GuideSection>

      <GuideSection id="transfer-risks" n={11} kicker="Transfers" title="Balance transfer catches">
        <ul>
          <li>You usually need good credit to qualify, and the limit may be lower than your balance.</li>
          <li>The 0% may apply only to transfers made within the first few weeks.</li>
          <li>New purchases on the transfer card may charge the normal APR.</li>
          <li>A late payment can end the 0% rate early.</li>
          <li>Moving the debt does not help if you run the old card back up.</li>
        </ul>
        <Callout tone="warn" title="Watch for deferred interest">
          Some store cards offer &quot;no interest if paid in full&quot; deals. These are not 0% APR: if any balance is left at the end, interest is
          charged back to the date of purchase. A true 0% balance transfer only charges interest from the day the offer ends.
        </Callout>
      </GuideSection>

      <GuideSection id="consolidation" n={12} kicker="Options" title="Debt consolidation loans">
        <p>
          A personal loan at a lower fixed rate can replace card debt with one fixed payment and an end date. The Federal Reserve&rsquo;s survey
          put the average 24-month personal loan rate at banks at about 11.9% in August 2026, well under typical card rates, though your rate
          depends on your credit. Check origination fees, and use the <a href="/us/loans/loan-calculator">loan calculator</a> to compare the
          total cost with your card plan.
        </p>
      </GuideSection>

      <GuideSection id="several" n={13} kicker="Options" title="If you have several cards">
        <p>
          Pay the minimum on every card and put every spare dollar on one. The avalanche method targets the highest APR first and saves the most
          interest; the snowball method targets the smallest balance first for quick wins. The{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a> compares both for up to six debts.
        </p>
      </GuideSection>

      <GuideSection id="lower-rate" n={14} kicker="Options" title="Asking for a lower rate">
        <p>
          Call your issuer and ask for a lower APR, especially if you have paid on time and have offers from other cards. It does not always
          work, but it costs nothing to ask. Even a few points help: at $300 a month, a cut from 26% to 22% saves about {usd(407)}.
        </p>
      </GuideSection>

      <GuideSection id="hardship" n={15} kicker="Help" title="If you are struggling">
        <p>
          If you cannot make the minimum, contact the issuer before you miss a payment. Many have hardship programs that lower the rate or the
          payment for a time. A nonprofit credit counseling agency can set up a debt management plan, which often brings lower rates. Be wary of
          debt settlement companies that charge upfront fees: the FTC warns that this is not allowed for companies that sell by phone.
        </p>
      </GuideSection>

      <GuideSection id="credit-score" n={16} kicker="Credit" title="Paying down cards and your credit score">
        <p>
          Credit utilization, your card balances as a share of your limits, is a major part of credit scores. Paying balances down usually lifts
          your score, and many people aim to keep utilization under about 30%, and lower still for the best scores. Closing a paid-off card can
          raise utilization by removing its limit, so think before closing old cards with no annual fee.
        </p>
      </GuideSection>

      <GuideSection id="budget" n={17} kicker="Money" title="Finding the money to pay more">
        <p>
          List your take-home pay and fixed bills, then cut back on spending categories for a few months and send the difference to the card.
          Tax refunds, raises and bonuses work well as lump-sum payments. The <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>{" "}
          shows your take-home pay if you want to adjust your W-4 withholding instead of waiting for a refund.
        </p>
      </GuideSection>

      <GuideSection id="after" n={18} kicker="Next" title="After the card is clear">
        <p>
          Keep paying the same amount, but into savings. An emergency fund of a few months of expenses stops the next car repair or medical bill
          going on the card. Then pay the full statement balance each month so the grace period means you never pay card interest again. The{" "}
          <a href="/us/savings/savings-goal-calculator">savings goal calculator</a> shows how fast the fund builds.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Watch out" title="Common mistakes">
        <ul>
          <li>Paying the minimum and letting the payment fall as the balance falls.</li>
          <li>Using the card while paying it off.</li>
          <li>Taking a balance transfer and not clearing it before the 0% ends.</li>
          <li>Missing a payment: late fees and a penalty APR make everything slower.</li>
          <li>Taking cash advances, which charge a fee and interest from day one.</li>
        </ul>
      </GuideSection>

      <GuideSection id="lump-sum" n={20} kicker="Strategy" title="Using a lump sum">
        <p>
          A tax refund or bonus sent straight to the card has a big effect because it stops interest from day one. Paying {usd(1_000)} off the
          {usd(6_000)} balance and then $300 a month clears the card in 21 months with {usd(1_022)} of interest, five months sooner than $300 a
          month alone and {usd(521)} cheaper. Raising the regular payment from $300 to $350 instead clears it in 21 months with {usd(1_269)} of
          interest.
        </p>
        <p>
          Enter your balance after the lump sum in the calculator to see the new payoff date.
        </p>
      </GuideSection>

      <GuideSection id="twice" n={21} kicker="Strategy" title="Paying more than once a month">
        <p>
          Because most cards charge interest on your average daily balance, paying half your amount every two weeks, or paying as soon as you are
          paid, lowers the average balance and trims the interest a little. It also helps you avoid late payments. What matters most, though, is
          the total you pay each month, not how you split it.
        </p>
      </GuideSection>

      <GuideSection id="penalty-apr" n={22} kicker="Watch out" title="Penalty APRs and cash advances">
        <p>
          Paying more than 60 days late can trigger a penalty APR, often around 29.99%. On {usd(6_000)} at $300 a month, a 29.99% rate means 29
          months and {usd(2_420)} of interest, against 26 months and {usd(1_543)} at 22%. By law, the issuer must restore your old rate on
          existing balances after six months of on-time payments.
        </p>
        <p>
          Cash advances usually carry a higher APR than purchases, an upfront fee and no grace period, so interest starts the day you take the
          cash. Avoid them while you are paying down a balance.
        </p>
      </GuideSection>

      <GuideSection id="transfer-fee" n={23} kicker="Transfers" title="When the transfer fee is higher">
        <p>
          Some cards charge 5% and give a shorter 0% period. Moving {usd(6_000)} to a card with a 5% fee and 12 months at 0%, then 22%, and
          paying $300 a month: the fee is {usd(300)}, {usd(2_700)} is left when the 0% ends, and you pay {usd(278)} of interest after that,
          clearing the card in 22 months. That still beats {usd(1_543)} of interest on the old card, but by less. The longer the 0% period and
          the more you can pay each month, the better a transfer works.
        </p>
      </GuideSection>

      <GuideSection id="plan" n={24} kicker="Action" title="A step-by-step payoff plan">
        <ol>
          <li>Find your balance, APR and minimum payment on your latest statement.</li>
          <li>Decide a monthly amount you can keep up, and try it in the calculator.</li>
          <li>Set up an automatic payment for that amount, a few days after payday.</li>
          <li>Move the card out of your wallet and phone so it is not used for new spending.</li>
          <li>Check whether a balance transfer or a lower-rate loan would cut the cost.</li>
          <li>Send any windfalls straight to the card.</li>
          <li>Recheck the plan every few months and raise the payment when you can.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={25} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average APR, cards charged interest (Fed G.19, August 2026)", "about 22%"],
            ["Average APR, all card accounts", "about 21%"],
            ["Common minimum payment", "1% of balance + interest, or $25 to $35"],
            ["Typical balance transfer fee", "3% to 5%"],
            ["Typical 0% introductory period", "12 to 21 months"],
            ["Example: $6,000 at 22%, $300 a month", "26 months, $1,543 interest"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

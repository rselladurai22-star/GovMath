import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** The balance transfer guide. Every figure comes from transferPlan() in src/lib/us/borrowing.ts and minimumOnly() in src/lib/us/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how-it-works", title: "How a balance transfer works" },
  { id: "the-fee", title: "The transfer fee" },
  { id: "example", title: "Worked example: $6,000 at 24%" },
  { id: "pay-to-clear", title: "The payment that clears it in time" },
  { id: "leftover", title: "What happens to a leftover balance" },
  { id: "fee-vs-months", title: "Fee or intro period: which matters more" },
  { id: "small-balances", title: "When the saving is tiny" },
  { id: "large-balances", title: "Larger balances" },
  { id: "low-payment", title: "If you can only pay a little" },
  { id: "not-zero", title: "Low-rate offers that aren't 0%" },
  { id: "minimum-trap", title: "Versus minimum payments" },
  { id: "rules", title: "Federal rules that protect you" },
  { id: "losing-promo", title: "How you can lose the 0% rate" },
  { id: "purchases", title: "New purchases on the card" },
  { id: "deferred", title: "0% APR is not deferred interest" },
  { id: "credit-score", title: "Your credit score" },
  { id: "steps", title: "Doing it step by step" },
  { id: "alternatives", title: "Alternatives" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What is a balance transfer fee?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-balance-transfer-fee-en-49/" },
  { label: "CFPB: Credit cards, answers to common questions", href: "https://www.consumerfinance.gov/consumer-tools/credit-cards/" },
  { label: "CFPB: Regulation Z, 12 CFR 1026.55 (limits on increasing rates)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/55/" },
  { label: "CFPB: Regulation Z, 12 CFR 1026.53 (allocation of payments)", href: "https://www.consumerfinance.gov/rules-policy/regulations/1026/53/" },
  { label: "Federal Reserve: Consumer Credit G.19 (credit card interest rates)", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "FTC: How to get out of debt", href: "https://consumer.ftc.gov/articles/how-get-out-debt" },
];

export default function BalanceTransferGuide() {
  return (
    <Guide
      kicker="The balance transfer guide"
      title="Balance transfers: what a 0% card really saves after the fee"
      intro={
        <>
          A 0% balance transfer card can stop interest on credit card debt for a year or more, but it isn&rsquo;t free: there is a fee up front and a normal rate waiting at the end. This
          guide shows how to work out what a transfer saves, the monthly payment that clears the debt before the offer ends, and the rules and traps worth knowing first.
        </>
      }
      meta={["Updated for 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A transfer saves money when the interest you avoid is larger than the fee, usually 3% to 5% of the balance.</li>
          <li>Moving $6,000 from a 24% card to an 18-month 0% card with a 3% fee, paying $300 a month, saves about $1,530.</li>
          <li>To clear the whole balance before the 0% ends, divide the balance plus fee by the intro months: $343.33 a month in that example.</li>
          <li>Anything left when the offer ends is charged the card&rsquo;s normal rate.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3% to 5%", label: "Typical transfer fee" },
            { value: "12 to 21", label: "Typical 0% months" },
            { value: "$1,530", label: "Saved on $6,000 at 24%" },
            { value: "6 months", label: "Legal minimum for a promo rate" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how-it-works" n={2} kicker="Basics" title="How a balance transfer works">
        <p>
          You open a new card (or use one you have) and ask it to pay off the balance on your old card. The debt now sits on the new card, usually at 0% for an introductory period. The
          transfer fee is added to the new balance on day one. You then make monthly payments as usual, and every dollar of them goes to the debt instead of to interest.
        </p>
        <p>
          When the intro period ends, the new card&rsquo;s normal APR applies to whatever is left. The new card usually can&rsquo;t be from the same bank as the old one, and the amount you
          can move, fee included, is limited by the new card&rsquo;s credit limit.
        </p>
      </GuideSection>

      <GuideSection id="the-fee" n={3} kicker="Cost" title="The transfer fee">
        <p>
          Most cards charge 3% to 5% of the amount moved, often with a minimum of about $5. The fee is a one-off cost: on $6,000 it is $180 at 3%, $240 at 4% and $300 at 5%. Some cards charge
          a lower fee if you transfer within the first 60 days and a higher one after. A few cards charge no fee but usually offer a shorter 0% period.
        </p>
        <p>
          Compare the fee with what the old card charges each month. At 24%, $6,000 costs $120 of interest in the first month, so a 3% fee is about a month and a half of interest.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="Worked example: $6,000 at 24%">
        <WorkedExample
          title="$6,000 balance, 24% APR now; new card 0% for 18 months, 3% fee, then 24%; $300 a month"
          steps={[
            { label: "Transfer fee added", value: "$180.00" },
            { label: "Balance left when the 0% ends", value: "$780.00" },
            { label: "Interest after the 0% ends", value: "$29.62" },
            { label: "Total paid with the transfer (21 months)", value: "$6,209.62" },
            { label: "Total paid staying put (26 months)", value: "$7,739.24" },
          ]}
          total={{ label: "Saved by transferring", value: "$1,529.61" }}
        />
        <p>
          Staying on the old card would have cost $1,739.24 in interest. The transfer replaces that with a $180 fee and about $30 of interest, and clears the debt five months sooner.
        </p>
      </GuideSection>

      <GuideSection id="pay-to-clear" n={5} kicker="Target" title="The payment that clears it in time">
        <p>
          The simplest plan is to clear everything before the 0% ends. Add the fee to the balance and divide by the number of 0% months. For $6,000 with a 3% fee over 18 months, that is
          $6,180 ÷ 18 = $343.33 a month. Paid that way, the transfer costs only the $180 fee.
        </p>
        <Callout tone="good" title="Set up autopay for the target, not the minimum">
          The card&rsquo;s minimum payment during a 0% offer is often only 1% of the balance plus fees. Paying only that leaves most of the debt to the normal rate.
        </Callout>
      </GuideSection>

      <GuideSection id="leftover" n={6} kicker="After the offer" title="What happens to a leftover balance">
        <p>
          At $300 a month the example leaves $780 when the 18 months end. From then on it is charged 24%, and three more payments clear it with $29.62 of interest. A small leftover like this
          does little harm; a large one undoes much of the saving. If you know you will have a leftover, look for a longer intro period, or plan a second transfer near the end (another fee,
          and not guaranteed to be approved).
        </p>
      </GuideSection>

      <GuideSection id="fee-vs-months" n={7} kicker="Choosing a card" title="Fee or intro period: which matters more">
        <p>For $6,000 moved from a 24% card, paying $300 a month, the saving over staying put at each fee and intro period is:</p>
        <DataTable
          caption="Saving on $6,000 from a 24% card at $300 a month"
          head={["Intro period", "3% fee", "4% fee", "5% fee"]}
          numeric={[1, 2, 3]}
          rows={[
            ["12 months", "$1,279", "$1,206", "$1,133"],
            ["15 months", "$1,440", "$1,371", "$1,302"],
            ["18 months", "$1,530", "$1,466", "$1,402"],
            ["21 months", "$1,559", "$1,499", "$1,439"],
          ]}
        />
        <p>
          When your payment can&rsquo;t clear the balance in time, the extra months often matter more than the fee. A 5% card with 21 months at 0% saves about as much as a 3% card with 15
          months, and clears the debt with no interest at all.
        </p>
      </GuideSection>

      <GuideSection id="small-balances" n={8} kicker="Small debts" title="When the saving is tiny">
        <p>
          Moving $1,000 from a 24% card to a 6-month 0% card with a 5% fee, paying $200 a month, saves only $14.54: the $50 fee eats most of the $64.54 interest you avoid. If you would
          clear a small balance within a few months anyway, a transfer is rarely worth a new account.
        </p>
      </GuideSection>

      <GuideSection id="large-balances" n={9} kicker="Big debts" title="Larger balances">
        <p>
          The bigger the balance and the rate, the more a transfer is worth. $15,000 at 22%, moved to a 21-month 0% card with a 4% fee that rises to 27% afterward:
        </p>
        <CompareCards
          columns={[
            {
              name: "$500 a month",
              rows: [
                { label: "Fee", value: "$600" },
                { label: "Left when the 0% ends", value: "$5,100" },
                { label: "Interest after", value: "$759.74" },
                { label: "Saving versus staying", value: "$5,616.96" },
              ],
            },
            {
              name: "$750 a month",
              rows: [
                { label: "Fee", value: "$600" },
                { label: "Left when the 0% ends", value: "$0" },
                { label: "Interest after", value: "$0" },
                { label: "Saving versus staying", value: "$3,257.17" },
              ],
            },
          ]}
        />
        <p>
          The saving looks smaller at $750 only because staying put also costs less at that payment. What matters is that $750 a month (the target is $742.86) clears $15,000 in 21 months
          for a $600 fee.
        </p>
      </GuideSection>

      <GuideSection id="low-payment" n={10} kicker="Tight budgets" title="If you can only pay a little">
        <p>
          A transfer helps most when payments are low, because the old card&rsquo;s interest is eating more of each one. At $200 a month on the $6,000 example (with the new card&rsquo;s
          rate rising to 28% afterward), staying put takes 47 months and $3,254.63 of interest. The transfer takes 34 months and saves $2,548.91, even though $2,580 is left when the 0%
          ends.
        </p>
      </GuideSection>

      <GuideSection id="not-zero" n={11} kicker="Offers" title="Low-rate offers that aren't 0%">
        <p>
          Some cards offer a low fixed rate, such as 3.99%, for the intro period with no fee. On the $6,000 example that costs $245.78 of interest, leaves $814.07 at the end of 18 months, and
          saves $1,493.46: about the same as the 0% card with a 3% fee. Enter the intro rate under More options to compare.
        </p>
      </GuideSection>

      <GuideSection id="minimum-trap" n={12} kicker="Context" title="Versus minimum payments">
        <p>
          The calculator compares the same payment on both cards. If you have been paying only the minimum, the real comparison is starker: $6,000 at 24% with a minimum of 1% of the balance
          plus interest (at least $25) takes 252 months and $10,886.92 of interest. The <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a>{" "}shows that path in full.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={13} kicker="Your rights" title="Federal rules that protect you">
        <ul>
          <li>A promotional rate must last at least six months (Regulation Z, under the Credit CARD Act).</li>
          <li>The issuer can&rsquo;t raise the rate on an existing balance unless a promotion ends as disclosed, a variable rate follows its index, or you are more than 60 days late.</li>
          <li>Payments above the minimum must go to the balance with the highest rate first, so extra payments reach purchases charged at the normal rate before the 0% balance.</li>
          <li>The card must tell you the intro rate, how long it lasts and the rate that follows before you accept.</li>
        </ul>
      </GuideSection>

      <GuideSection id="losing-promo" n={14} kicker="Traps" title="How you can lose the 0% rate">
        <p>
          Read the terms for what ends the offer early. Many card agreements end the promotional rate after a late or returned payment. Once a payment is more than 60 days late, the issuer
          can apply a penalty rate to the whole balance. Late fees apply too. Autopay for at least the minimum is the simplest protection.
        </p>
      </GuideSection>

      <GuideSection id="purchases" n={15} kicker="Traps" title="New purchases on the card">
        <p>
          Many transfer cards charge their normal rate on purchases. While you carry a transferred balance, you usually lose the grace period, so new purchases can be charged interest from
          the day you make them. The simplest rule is to use a different card, or cash, for spending until the transfer is paid off.
        </p>
      </GuideSection>

      <GuideSection id="deferred" n={16} kicker="Traps" title="0% APR is not deferred interest">
        <p>
          Store cards often advertise &ldquo;no interest if paid in full&rdquo; in 12 months. That is deferred interest: if any balance remains at the end, interest is charged back to the
          start on the whole original amount. A true 0% APR offer charges nothing for the intro months, whatever is left. Check which kind you are looking at.
        </p>
      </GuideSection>

      <GuideSection id="credit-score" n={17} kicker="Credit" title="Your credit score">
        <p>
          Applying for a new card adds a hard inquiry and a new account, which can lower your score a little for a while. The extra credit limit reduces your credit use (the share of your
          limits you are using), which tends to help, as long as the old card isn&rsquo;t run back up. Keeping the old card open usually helps your score more than closing it, if it has no
          annual fee.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={18} kicker="How to" title="Doing it step by step">
        <Timeline
          items={[
            { when: "Step 1", what: "Check the numbers", detail: "Use this calculator with your balance, rate and realistic payment." },
            { when: "Step 2", what: "Apply", detail: "Compare the fee, the 0% months, the rate afterward and any transfer deadline (often 60 to 120 days)." },
            { when: "Step 3", what: "Request the transfer", detail: "Give the new card the old account number and the amount, fee included, within the credit limit." },
            { when: "Step 4", what: "Keep paying the old card", detail: "Until the transfer shows as complete, which can take one to three weeks." },
            { when: "Step 5", what: "Set up autopay", detail: "For the payment that clears the balance before the 0% ends." },
          ]}
        />
      </GuideSection>

      <GuideSection id="alternatives" n={19} kicker="Other routes" title="Alternatives">
        <p>
          If you can&rsquo;t get a transfer card, or your debt is larger than any limit you are offered, a fixed-rate personal loan can replace several cards with one payment. The{" "}
          <a href="/us/loans/debt-consolidation-calculator">debt consolidation calculator</a>{" "}compares that with keeping the cards, and the{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}orders several debts by the avalanche or snowball method. To see what your current card costs each month,
          try the <a href="/us/loans/credit-card-interest-calculator">credit card interest calculator</a>. Nonprofit credit counseling agencies can also set up a debt management plan with
          lower rates.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "3% to 5%", label: "Usual transfer fee" },
            { value: "12 to 21 months", label: "Usual 0% period" },
            { value: "6 months", label: "Shortest promo the law allows" },
            { value: "60 days", label: "Late before a penalty rate can apply to the balance" },
            { value: "$343.33", label: "Monthly payment to clear $6,000 + 3% in 18 months" },
            { value: "$1,530", label: "Saved on $6,000 from a 24% card at $300 a month" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Debt consolidation guide. Figures from src/lib/us/borrowing.ts (consolidate, personalLoan) and src/lib/us/loans.ts (amortize). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What consolidation means" },
  { id: "example", title: "A worked example" },
  { id: "each-debt", title: "Your debts as they stand" },
  { id: "average", title: "Your average rate" },
  { id: "term", title: "When a longer term costs more" },
  { id: "rate", title: "The rate you can get" },
  { id: "fee", title: "The origination fee" },
  { id: "same-budget", title: "Keep paying the same amount" },
  { id: "options", title: "Ways to consolidate" },
  { id: "transfer", title: "Balance transfer cards" },
  { id: "home", title: "Home equity and 401(k) loans" },
  { id: "dmp", title: "Debt management plans" },
  { id: "settlement", title: "Debt settlement is different" },
  { id: "credit", title: "Effect on your credit" },
  { id: "habits", title: "Making it stick" },
  { id: "when-not", title: "When not to consolidate" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: Consolidating credit card debt", href: "https://www.consumerfinance.gov/ask-cfpb/what-do-i-need-to-know-if-im-thinking-about-consolidating-my-credit-card-debt-en-1861/" },
  { label: "CFPB: What is a debt consolidation loan?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-consolidation-loan-en-1859/" },
  { label: "CFPB: What is credit counseling?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-credit-counseling-en-1451/" },
  { label: "CFPB: Debt settlement and debt relief services", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-debt-settlementdebt-relief-services-and-should-i-use-them-en-1457/" },
  { label: "Federal Reserve: Consumer Credit (G.19), interest rates", href: "https://www.federalreserve.gov/releases/g19/current/default.htm" },
  { label: "NerdWallet: Average personal loan interest rates by credit score (October 2026)", href: "https://www.nerdwallet.com/article/loans/personal-loans/average-personal-loan-rates" },
];

export default function DebtConsolidationGuide() {
  return (
    <Guide
      kicker="The debt consolidation guide"
      title="When one loan beats several debts"
      intro={
        <>
          Debt consolidation means paying off several debts, usually credit cards, with one new loan. Done well, it swaps high card rates for a lower fixed rate and a clear end
          date. Done badly, it lowers the payment but stretches the debt out and costs more. This guide shows how to tell the difference before you sign.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Consolidation saves money when the loan&rsquo;s interest and fee are less than the interest left on your debts.</li>
          <li>{usd(13_000)} of card debt at an average of about 25% costs {usd(8_431)} in interest at today&rsquo;s {usd(420)} a month.</li>
          <li>A 36-month loan at 14% with a 4% fee costs {usd(3_662)} and saves about {usd(4_770)}.</li>
          <li>A 60-month loan at 19.47% with a 5% fee costs about {usd(80)} more than doing nothing, even though its rate is lower.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(4_770), label: "Saved with a 36-month loan at 14%" },
            { value: "about 22%", label: "Average APR on cards charged interest (Fed, Aug 2026)" },
            { value: "about 15%", label: "Average personal loan offer, excellent credit (Oct 2026)" },
            { value: "56 months", label: "Time to clear the example cards at today's payments" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What consolidation means">
        <p>
          You take out one loan, use it to pay off your cards or other debts in full, and then repay the loan in fixed monthly installments. Most people use an unsecured personal
          loan, but a 0% balance transfer card, a home equity loan or a credit union loan can do the same job. The aim is a lower total cost and a single payment that clears the
          debt by a known date.
        </p>
        <p>
          The CFPB warns that some low consolidation rates are teaser rates that rise later, and that a lower payment may simply come from a longer term. Always compare the total
          cost, not the payment.
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="Three cards, $13,000 in all, consolidated with a 36-month loan at 14% and a 4% fee"
          steps={[
            { label: "Balances to pay off", value: usd(13_000) },
            { label: "Loan needed so the fee still leaves $13,000", note: "$13,000 ÷ 0.96", value: usd(13_542) },
            { label: "Monthly payment", value: "$462.82" },
            { label: "Interest over 36 months", value: usd(3_120) },
            { label: "Plus the fee", value: usd(542) },
            { label: "Interest at today's payments", value: usd(8_431) },
          ]}
          total={{ label: "Saving", value: usd(4_770) }}
        />
        <p>
          The payment goes up by about {usd(43)} a month, but the debt is gone in 3 years instead of 4 years 8 months, and the true APR of the loan, with the fee, is 16.90%.
        </p>
      </GuideSection>

      <GuideSection id="each-debt" n={4} kicker="Today" title="Your debts as they stand">
        <DataTable
          caption="The example debts at their current payments"
          head={["Debt", "Balance", "APR", "Payment", "Paid off in", "Interest"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["Visa card", usd(8_000), "23.99%", usd(240), "56 months", usd(5_311)],
            ["Store card", usd(3_500), "28.99%", usd(120), "52 months", usd(2_630)],
            ["Mastercard", usd(1_500), "21.00%", usd(60), "34 months", usd(490)],
          ]}
        />
        <p>
          The calculator assumes you keep paying today&rsquo;s amount on each debt until it is gone, with no new spending. If you only pay minimums that shrink as the balance
          falls, the true cost of doing nothing is higher still; our <a href="/us/loans/credit-card-payoff">credit card payoff calculator</a>{" "}shows minimum-only payoff.
        </p>
      </GuideSection>

      <GuideSection id="average" n={5} kicker="Rates" title="Your average rate">
        <p>
          To judge a loan offer, work out your balance-weighted average rate: multiply each balance by its APR, add them up and divide by the total balance. For the example
          cards it is 24.99%. A consolidation loan whose APR, including the fee, is well below that average is worth a closer look. The calculator shows your average and the
          loan&rsquo;s APR with the fee side by side.
        </p>
      </GuideSection>

      <GuideSection id="term" n={6} kicker="Term" title="When a longer term costs more">
        <p>
          A lower rate does not guarantee a saving. If the loan runs longer than your debts would, the extra months of interest can wipe out the benefit of the lower rate.
        </p>
        <DataTable
          caption="$13,000 of the example debts consolidated at 14% with a 4% fee"
          head={["Loan term", "Monthly payment", "Interest and fee", "Saving vs today"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Today: 56 months", usd(420), usd(8_431), "—"],
            ["36 months", "$462.82", usd(3_662), usd(4_770)],
            ["48 months", "$370.05", usd(4_762), usd(3_669)],
            ["60 months", "$315.09", usd(5_905), usd(2_526)],
          ]}
        />
        <Callout tone="warn" title="A lower payment is not a saving">
          At the average good-credit rate of 19.47% with a 5% fee, a 36-month loan saves {usd(3_256)}. A 60-month loan at the same rate drops the payment to $358.52 but costs
          {" "}{usd(8_511)} in interest and fees: about {usd(80)} more than keeping your current payments. At the fair-credit average of 24.21% with a 6% fee over 60 months, it costs
          {" "}{usd(2_541)} more.
        </Callout>
      </GuideSection>

      <GuideSection id="rate" n={7} kicker="Rates" title="The rate you can get">
        <p>
          NerdWallet&rsquo;s October 2026 figures for pre-qualified personal loan offers averaged about 15.2% for credit scores of 720 to 850, 19.5% for 690 to 719, 24.2% for 630
          to 689 and 29.7% below 630. The Federal Reserve put the average on cards that were charged interest at about 22% in August 2026. So consolidation tends to pay off for
          people with good or excellent credit and high-rate cards, and rarely for people whose credit is already damaged. Our{" "}
          <a href="/us/loans/personal-loan-calculator">personal loan calculator</a>{" "}shows the payment at each credit band.
        </p>
        <Bars
          format={usd}
          items={[
            { label: "Today", value: 8_431 },
            { label: "11.9%, no fee", value: 2_522 },
            { label: "14%, 4% fee", value: 3_662 },
            { label: "19.47%, 5% fee", value: 5_175 },
          ]}
        />
        <p>Interest and fees on the example debts with a 36-month loan at each rate.</p>
      </GuideSection>

      <GuideSection id="fee" n={8} kicker="Fees" title="The origination fee">
        <p>
          Many consolidation loans charge an origination fee, usually taken out of the money you receive. If the lender sends {usd(13_000)} minus a 4% fee, you have only{" "}
          {usd(12_480)} to pay off {usd(13_000)} of debt. Borrow enough to cover the fee: divide the total by one minus the fee, here about {usd(13_542)}. Some lenders send the
          money straight to your card issuers, which makes sure it is used to pay them off.
        </p>
      </GuideSection>

      <GuideSection id="same-budget" n={9} kicker="Strategy" title="Keep paying the same amount">
        <p>
          The best of both worlds is a longer loan for safety, with your old payment kept up. Paying the old {usd(420)} a month on a 60-month loan at 14% clears it in 41 months,
          for about {usd(4_086)} of interest and fees: {usd(4_345)} less than today. If money gets tight, you can drop back to the required $315.09. Check first that the loan has
          no prepayment penalty.
        </p>
      </GuideSection>

      <GuideSection id="options" n={10} kicker="Options" title="Ways to consolidate">
        <CompareCards
          columns={[
            { name: "Personal loan", rows: [{ label: "Rate", value: "Fixed" }, { label: "Security", value: "None" }, { label: "Best for", value: "Larger debts, 2 to 5 years" }] },
            { name: "0% balance transfer", rows: [{ label: "Rate", value: "0% for a time" }, { label: "Security", value: "None" }, { label: "Best for", value: "Debt you can clear in the promo" }] },
            { name: "Home equity loan", rows: [{ label: "Rate", value: "Lower, fixed" }, { label: "Security", value: "Your home" }, { label: "Best for", value: "Rarely worth the risk" }] },
          ]}
        />
      </GuideSection>

      <GuideSection id="transfer" n={11} kicker="Options" title="Balance transfer cards">
        <p>
          A 0% balance transfer card charges a fee, usually 3% to 5% of the amount moved, and then no interest for a promotional period, sometimes up to about 21 months. If you
          can pay the balance off before the promotion ends, it usually beats any loan. If not, what is left starts charging the card&rsquo;s normal rate. Our{" "}
          <a href="/us/loans/balance-transfer-calculator">balance transfer calculator</a>{" "}shows the payment you need to clear it in time.
        </p>
      </GuideSection>

      <GuideSection id="home" n={12} kicker="Options" title="Home equity and 401(k) loans">
        <p>
          A home equity loan or line of credit usually has a lower rate, but it turns unsecured card debt into debt secured on your home. The CFPB warns that if you cannot repay,
          you could lose the home. A 401(k) loan avoids a credit check but takes money out of the market, and if you leave your job the balance can become due quickly or be
          taxed as a withdrawal. Both are big steps for card debt.
        </p>
      </GuideSection>

      <GuideSection id="dmp" n={13} kicker="Options" title="Debt management plans">
        <p>
          If you cannot get a good loan, a nonprofit credit counseling agency may set up a debt management plan. You pay the agency once a month, and it pays your creditors, who
          often agree to lower rates and waive some fees. The plan usually lasts three to five years and your cards are closed. Look for an agency that is a nonprofit, accredited,
          and clear about its fees.
        </p>
      </GuideSection>

      <GuideSection id="settlement" n={14} kicker="Warning" title="Debt settlement is different">
        <Callout tone="warn" title="Be careful with &ldquo;debt relief&rdquo; companies">
          Some companies that advertise consolidation are really debt settlement firms. They ask you to stop paying creditors and save money in an account while they negotiate,
          and they often charge large fees. Missed payments hurt your credit, creditors can sue, and forgiven debt can be taxable income. Under the FTC&rsquo;s rules, companies
          that sell debt relief by phone cannot charge a fee before they have settled a debt.
        </Callout>
      </GuideSection>

      <GuideSection id="credit" n={15} kicker="Credit" title="Effect on your credit">
        <p>
          Applying for the loan causes a hard inquiry, which can lower your score by a few points for a while, and the new account lowers the average age of your accounts. On the
          other hand, paying the cards down to zero cuts your credit use, one of the biggest factors in your score. For most people the score recovers within months and then
          improves, as long as every payment on the new loan is on time.
        </p>
      </GuideSection>

      <GuideSection id="habits" n={16} kicker="Habits" title="Making it stick">
        <p>
          The biggest risk is ending up with the loan and full cards again. Before you consolidate, look at why the debt built up. Set a budget, build a small emergency fund so
          surprises do not go on a card, and set the loan to autopay. If you keep the cards open for your credit score, use them for small planned purchases you pay off each
          month, or put them away.
        </p>
      </GuideSection>

      <GuideSection id="when-not" n={17} kicker="Alternatives" title="When not to consolidate">
        <ul>
          <li>The loan&rsquo;s APR with fees is close to your average rate, or the term is much longer.</li>
          <li>The debt is small enough to clear within a year or two by paying a little extra.</li>
          <li>You would need to secure the loan on your home or car to get a good rate.</li>
          <li>You are not yet sure you can stop adding to the cards.</li>
        </ul>
        <p>
          In those cases, paying extra on the highest-rate debt first often costs less. Our <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}compares the
          avalanche and snowball methods.
        </p>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator">
        <p>
          Enter each debt&rsquo;s balance, APR and what you pay each month (up to five debts; the fourth and fifth are under More options). Then enter the consolidation
          loan&rsquo;s rate, term and fee. The results compare your current path with the loan at every term from 24 to 84 months, show the saving or extra cost, and warn when a
          longer loan costs more than you pay today.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average APR on cards charged interest (Fed G.19, August 2026)", "about 22%"],
            ["Average 24-month personal loan rate at banks (same)", "about 11.9%"],
            ["Average personal loan offer, credit 720 to 850 (NerdWallet, October 2026)", "about 15.2%"],
            ["Average personal loan offer, credit 690 to 719", "about 19.5%"],
            ["Typical balance transfer fee", "3% to 5%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

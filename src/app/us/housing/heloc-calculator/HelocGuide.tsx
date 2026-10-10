import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** HELOC guide. Figures from src/lib/us/home-equity.ts (equityAvailable, heloc) and src/lib/us/loans.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a HELOC is" },
  { id: "limit", title: "How much you can borrow" },
  { id: "cltv", title: "CLTV limits in practice" },
  { id: "rate", title: "Prime plus a margin" },
  { id: "draw", title: "The draw period" },
  { id: "repay", title: "The repayment period" },
  { id: "example", title: "A worked example" },
  { id: "jump", title: "The payment jump" },
  { id: "rates-rise", title: "If rates rise" },
  { id: "even", title: "Drawing as you go" },
  { id: "principal", title: "Paying principal early" },
  { id: "costs", title: "Fees and closing costs" },
  { id: "uses", title: "Good and poor uses" },
  { id: "vs-loan", title: "HELOC or home equity loan" },
  { id: "tax", title: "Is HELOC interest deductible?" },
  { id: "risks", title: "The risks" },
  { id: "freeze", title: "When a lender can freeze the line" },
  { id: "apply", title: "Applying" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What is a home equity line of credit (HELOC)?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-line-of-credit-heloc-en-110/" },
  { label: "Federal Reserve: What you should know about home equity lines of credit", href: "https://www.federalreserve.gov/pubs/HomeLine/" },
  { label: "Federal Reserve: FOMC statement, September 16, 2026", href: "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260916a.htm" },
  { label: "Bankrate: Wall Street Journal prime rate", href: "https://www.bankrate.com/rates/interest-rates/wall-street-prime-rate/" },
  { label: "Bankrate: Current HELOC rates", href: "https://www.bankrate.com/home-equity/heloc-rates/" },
  { label: "IRS Publication 936: Home Mortgage Interest Deduction", href: "https://www.irs.gov/publications/p936" },
];

export default function HelocGuide() {
  return (
    <Guide
      kicker="The HELOC guide"
      title="How a home equity line of credit works, and what it costs"
      intro={
        <>
          A HELOC lets you borrow against your home as you need the money, at a variable rate. It is cheap and flexible while you pay interest only, then the payment rises when
          the repayment period starts. This guide explains the borrowing limit, the two periods, the rate and the risks.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Lenders usually let all loans on your home reach 80% to 85% of its value. On a {usd(500_000)} home with {usd(300_000)} owed, 85% allows a line of {usd(125_000)}.</li>
          <li>The rate is the prime rate, about 7.00% in October 2026, plus a margin. Bankrate&rsquo;s average was about 7.33% on October 7, 2026.</li>
          <li>Drawing {usd(50_000)} at 7.5% costs $312.50 a month interest-only for 10 years, then $402.80 for 20 years.</li>
          <li>Total interest over 30 years: {usd(84_171)}. The rate can change at any time.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(125_000), label: "Line on a $500,000 home with $300,000 owed (85%)" },
            { value: "about 7.00%", label: "Prime rate, October 2026" },
            { value: "$312.50", label: "Interest-only payment on $50,000 at 7.5%" },
            { value: "$402.80", label: "Payment once repayment starts" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a HELOC is">
        <p>
          A home equity line of credit is a revolving line, like a credit card, secured on your home. The lender approves a limit. During the draw period, usually 10 years, you
          borrow what you need, repay and borrow again, and pay interest only on what you have drawn. In the repayment period, usually 20 years, you can no longer draw, and the
          balance is paid off with principal and interest.
        </p>
        <Timeline
          items={[
            { when: "Day one", what: "Line opens", detail: "You draw by check, card or transfer, up to the limit." },
            { when: "Years 1 to 10", what: "Draw period", detail: "Interest-only payments on the balance; borrow and repay freely." },
            { when: "Years 11 to 30", what: "Repayment period", detail: "No new draws; principal and interest pay the balance to zero." },
          ]}
        />
      </GuideSection>

      <GuideSection id="limit" n={3} kicker="Borrowing power" title="How much you can borrow">
        <WorkedExample
          title="$500,000 home, $300,000 mortgage, 85% limit"
          steps={[
            { label: "Home value", value: usd(500_000) },
            { label: "Most the lender allows in all", note: "85% combined loan-to-value", value: usd(425_000) },
            { label: "Less your mortgage", value: `−${usd(300_000)}` },
          ]}
          total={{ label: "HELOC limit", value: usd(125_000) }}
        />
        <p>
          Your equity is {usd(200_000)}, but the lender keeps a cushion of 15% of the value, here {usd(75_000)}, in case prices fall. Your credit score, income and debt-to-income
          ratio also count; the <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows where you stand.
        </p>
      </GuideSection>

      <GuideSection id="cltv" n={4} kicker="Borrowing power" title="CLTV limits in practice">
        <DataTable
          caption="$500,000 home with $300,000 owed"
          head={["CLTV limit", "Total loans allowed", "HELOC limit"]}
          numeric={[1, 2]}
          rows={[
            ["80%", usd(400_000), usd(100_000)],
            ["85%", usd(425_000), usd(125_000)],
            ["90%", usd(450_000), usd(150_000)],
          ]}
        />
        <p>
          Most lenders cap the combined loan-to-value at 80% to 85%. A few credit unions and banks go to 90% or more for borrowers with strong credit, usually at a higher margin.
          If you already owe more than the limit, there is no room for a HELOC until you pay down the mortgage or the home gains value.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={5} kicker="The rate" title="Prime plus a margin">
        <p>
          HELOC rates are variable. Most follow the Wall Street Journal prime rate, which sits 3 points above the top of the Federal Reserve&rsquo;s target range. The Fed raised its
          range to 3.75% to 4.00% on September 16, 2026, putting prime at about 7.00%. Your lender adds a margin, from below zero for an introductory offer to 2 points or more,
          depending on your credit score, the CLTV and the line size.
        </p>
        <p>
          The rate changes whenever prime changes, usually from the next billing cycle. Your agreement sets a lifetime cap, often 18%, and sometimes a floor. Some lenders let you
          lock part of the balance at a fixed rate.
        </p>
      </GuideSection>

      <GuideSection id="draw" n={6} kicker="Payments" title="The draw period">
        <p>
          In the draw period most HELOCs ask only for the interest: balance × rate ÷ 12. On {usd(50_000)} at 7.5% that is $312.50 a month. Over 10 years you pay {usd(37_500)} of
          interest and still owe the full {usd(50_000)}. Low payments are the main attraction, and the main trap: an interest-only payment does nothing to reduce the debt.
        </p>
      </GuideSection>

      <GuideSection id="repay" n={7} kicker="Payments" title="The repayment period">
        <p>
          When the draw period ends, the balance is amortized over the repayment period, like a normal loan. {usd(50_000)} at 7.5% over 20 years costs $402.80 a month, with{" "}
          {usd(46_671)} of interest. Some lines instead require a balloon payment of the whole balance at the end of the draw period; check your agreement.
        </p>
      </GuideSection>

      <GuideSection id="example" n={8} kicker="Worked example" title="A worked example">
        <CompareCards
          columns={[
            {
              name: "Years 1 to 10",
              rows: [
                { label: "Balance", value: usd(50_000) },
                { label: "Payment", value: "$312.50" },
                { label: "Interest", value: usd(37_500) },
              ],
            },
            {
              name: "Years 11 to 30",
              rows: [
                { label: "Balance", value: "Falls to $0" },
                { label: "Payment", value: "$402.80" },
                { label: "Interest", value: usd(46_671) },
              ],
            },
          ]}
        />
        <p>Total interest over the 30 years is {usd(84_171)} at a steady 7.5%: more than one and a half times the {usd(50_000)} borrowed.</p>
      </GuideSection>

      <GuideSection id="jump" n={9} kicker="Watch out" title="The payment jump">
        <p>
          The step from $312.50 to $402.80 is a rise of $90.30 a month, or 29%. On larger balances, or if rates have risen by then, the jump is bigger. Many borrowers are caught out
          because ten years of interest-only payments feel normal. Mark the end of your draw period in your calendar and plan for the higher payment well ahead.
        </p>
      </GuideSection>

      <GuideSection id="rates-rise" n={10} kicker="Rates" title="If rates rise">
        <DataTable
          caption="$50,000 drawn, margin 0.5 point, 10-year draw and 20-year repayment"
          head={["Prime rate", "Draw payment", "Repayment payment", "Total interest"]}
          numeric={[1, 2, 3]}
          rows={[
            ["6%", "$270.83", "$372.79", usd(71_969)],
            ["7% (October 2026)", "$312.50", "$402.80", usd(84_171)],
            ["8%", "$354.17", "$433.91", usd(96_639)],
            ["9%", "$395.83", "$466.07", usd(109_356)],
            ["10%", "$437.50", "$499.19", usd(122_306)],
          ]}
        />
        <p>
          Each point on prime adds about $42 a month in the draw period on this balance. Prime has moved by several points within a few years before. The calculator&rsquo;s table
          shows your own line at other rates, and you can stress-test the repayment period under More options.
        </p>
      </GuideSection>

      <GuideSection id="even" n={11} kicker="Strategy" title="Drawing as you go">
        <p>
          A HELOC suits costs that arrive over time, such as a renovation paid in stages or college tuition each fall. You pay interest only on what you have drawn. Drawing{" "}
          {usd(50_000)} in equal monthly amounts over 10 years starts at $2.60 a month of interest, reaches $156.25 after five years, and costs {usd(18_906)} of interest in the draw
          period instead of {usd(37_500)}.
        </p>
      </GuideSection>

      <GuideSection id="principal" n={12} kicker="Strategy" title="Paying principal early">
        <p>
          Nothing stops you paying principal during the draw period. Paying {usd(50_000)} as if it were a 30-year loan at 7.5%, $349.61 a month, leaves {usd(43_397)} owed after
          10 years instead of {usd(50_000)}, and makes the later jump smaller. For a short-term need, paying it off within a few years is cheapest: {usd(20_000)} cleared in 5 years
          at 7.5% costs $400.76 a month and {usd(4_046)} of interest.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={13} kicker="Costs" title="Fees and closing costs">
        <p>
          Many lenders advertise no closing costs on HELOCs, but read the terms. Common charges include an appraisal, an annual fee of $50 to $100, a fee for each draw, and an early
          closure fee if you close the line within about three years, often to recover the closing costs the lender paid. Add these under More options to see the full cost.
        </p>
      </GuideSection>

      <GuideSection id="uses" n={14} kicker="Uses" title="Good and poor uses">
        <Bars
          format={(n) => `${n}%`}
          items={[
            { label: "Average HELOC rate", value: 7.33 },
            { label: "10-year home equity loan", value: 8.66 },
          ]}
        />
        <p>
          A HELOC is often the cheapest way to borrow a large sum, well below typical credit card and personal loan rates. Home improvements are the classic use: they can add value
          and the interest may be deductible. Consolidating high-rate debt can save interest, but it turns unsecured debt into debt secured on your home; the{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}shows other ways to clear it. Holidays, cars and everyday spending are poor uses: you could still
          be paying for them decades later.
        </p>
      </GuideSection>

      <GuideSection id="vs-loan" n={15} kicker="Compare" title="HELOC or home equity loan">
        <p>
          A home equity loan gives you a lump sum at a fixed rate with a fixed payment from the start. It suits one known cost and borrowers who want certainty. A HELOC suits costs
          spread over time and people who will repay quickly. Bankrate&rsquo;s October 7, 2026 survey put average HELOC rates at about 7.33% and 10-year home equity loans at about
          8.66%, so the line is cheaper today but can rise. The <a href="/us/housing/home-equity-loan-calculator">home equity loan calculator</a>{" "}compares the two with a cash-out
          refinance.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={16} kicker="Taxes" title="Is HELOC interest deductible?">
        <p>
          Only if you itemize, and only when the money is used to buy, build or substantially improve the home that secures the line. The One Big Beautiful Bill Act made this rule
          permanent, along with the {usd(750_000)} cap on mortgage debt whose interest you can deduct ({usd(375_000)} if married filing separately), counting the first mortgage and
          the HELOC together (IRS Publication 936). Interest on money used for a car, tuition or credit cards is not deductible. Keep receipts that show where the money went.
        </p>
      </GuideSection>

      <GuideSection id="risks" n={17} kicker="Risks" title="The risks">
        <ul>
          <li>Your home is the security: if you cannot pay, the lender can foreclose.</li>
          <li>The rate and payment can rise with prime, with little warning.</li>
          <li>The payment jumps when the draw period ends.</li>
          <li>If prices fall, you can owe more than the home is worth, which makes selling or refinancing hard.</li>
          <li>An open line makes it easy to keep borrowing.</li>
        </ul>
        <Callout tone="warn" title="Borrow for value, repay with a plan">
          Decide before you draw how and when you will repay, and keep the balance well below the limit.
        </Callout>
      </GuideSection>

      <GuideSection id="freeze" n={18} kicker="Rules" title="When a lender can freeze the line">
        <p>
          Under federal rules (Regulation Z), a lender can freeze or reduce your line if the home&rsquo;s value falls significantly, if your finances change so that it reasonably
          believes you cannot repay, or if you default on a material term. Many lines were cut this way in 2008 and 2020. Do not count on an unused line as your only emergency
          fund.
        </p>
      </GuideSection>

      <GuideSection id="apply" n={19} kicker="Process" title="Applying">
        <ol>
          <li>Check your credit report and score; better scores win lower margins.</li>
          <li>Get quotes from your bank, a credit union and an online lender. Compare the margin, introductory rate, fees, draw and repayment terms and the rate cap.</li>
          <li>The lender values the home and checks income and debts.</li>
          <li>On your main home, you have three business days after signing to cancel (the right of rescission).</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <p>
          Enter your home&rsquo;s value, what you owe and the lender&rsquo;s CLTV limit to see the line you could get. Add the amount you plan to draw and the margin from a quote, and
          the draw and repayment periods from the offer. Under More options, update the prime rate, choose to draw gradually, add fees and test a higher rate for the repayment
          years. The table of prime rates shows how sensitive your payments are.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Wall Street Journal prime rate (October 2026)", "about 7.00%"],
            ["Federal funds target range (from September 16, 2026)", "3.75% to 4.00%"],
            ["Average HELOC rate (Bankrate, October 7, 2026)", "about 7.33%"],
            ["Typical CLTV limit", "80% to 85%"],
            ["Typical draw period", "10 years"],
            ["Typical repayment period", "20 years"],
            ["Mortgage debt cap for the interest deduction", "$750,000"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

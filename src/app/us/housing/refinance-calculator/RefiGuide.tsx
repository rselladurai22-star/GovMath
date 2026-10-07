import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Refinance guide. Figures from src/lib/us/mortgage.ts (refinance) and src/lib/us/housing-loans-extra.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What refinancing does" },
  { id: "example", title: "A worked example" },
  { id: "break-even", title: "The break-even point" },
  { id: "reset", title: "The 30-year reset trap" },
  { id: "keep-date", title: "Keeping your payoff date" },
  { id: "rate-drop", title: "How big a rate drop is worth it" },
  { id: "closing", title: "Closing costs" },
  { id: "roll-in", title: "Rolling costs into the loan" },
  { id: "points", title: "Paying points" },
  { id: "cash-out", title: "Cash-out refinancing" },
  { id: "shorter", title: "Refinancing to a shorter term" },
  { id: "rates-2026", title: "Rates in 2026" },
  { id: "pmi", title: "Dropping PMI or FHA insurance" },
  { id: "when-not", title: "When not to refinance" },
  { id: "process", title: "How the process works" },
  { id: "using", title: "Using the calculator well" },
  { id: "arm", title: "Moving from an adjustable rate to a fixed rate" },
  { id: "stay", title: "How long you will keep the loan" },
  { id: "streamline", title: "Streamline refinances" },
  { id: "tax", title: "Taxes and refinancing" },
  { id: "offers", title: "Comparing lender offers" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Freddie Mac: Understanding the costs of refinancing", href: "https://myhome.freddiemac.com/refinancing/costs-of-refinancing" },
  { label: "Freddie Mac: Primary Mortgage Market Survey", href: "https://www.freddiemac.com/pmms" },
  { label: "CFPB: Interest rate vs APR", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" },
  { label: "CFPB: What are closing costs?", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-closing-costs-en-1845/" },
  { label: "IRS Publication 936: Home Mortgage Interest Deduction", href: "https://www.irs.gov/publications/p936" },
  { label: "CFPB: When can I remove private mortgage insurance?", href: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" },
];

export default function RefiGuide() {
  return (
    <Guide
      kicker="The refinance guide"
      title="When does refinancing pay off?"
      intro={
        <>
          Refinancing replaces your mortgage with a new one, usually to get a lower rate, change the term or take cash out. A lower payment is not the whole story: closing costs
          and a fresh 30-year term can make a refinance cost more overall. This guide shows how to judge the break-even point and the lifetime cost.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Divide the closing costs by the monthly saving: that is how many months it takes to break even.</li>
          <li>Refinancing {usd(300_000)} from 7.75% to 6.5% saves {usd(370)} a month and breaks even in 25 months on {usd(9_000)} of costs.</li>
          <li>But a new 30-year loan on 25 years left costs {usd(11_838)} more overall. A 25-year loan instead saves {usd(63_109)}.</li>
          <li>Plan to keep the home and loan well past the break-even point.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(370), label: "Monthly saving, 7.75% to 6.5%" },
            { value: "25 months", label: "Break-even on $9,000 of costs" },
            { value: `+${usd(11_838)}`, label: "Lifetime cost of resetting to 30 years" },
            { value: `−${usd(63_109)}`, label: "Lifetime saving with a 25-year loan" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What refinancing does">
        <p>
          A new lender, or your current one, pays off the old mortgage with a new loan. You go through an application, appraisal and closing again, and pay closing costs again.
          People refinance to:
        </p>
        <ul>
          <li>get a lower interest rate and payment;</li>
          <li>switch from an adjustable rate to a fixed rate;</li>
          <li>shorten the term and pay the home off sooner;</li>
          <li>take cash out of their equity;</li>
          <li>remove a co-borrower, or drop FHA mortgage insurance.</li>
        </ul>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$300,000 left at 7.75%, 25 years to go, refinancing to 6.5% for 30 years"
          steps={[
            { label: "Current payment", value: "$2,265.99" },
            { label: "New payment", value: "$1,896.20" },
            { label: "Monthly saving", value: "$369.78" },
            { label: "Closing costs", note: "3% of the loan, paid in cash", value: usd(9_000) },
            { label: "Break-even", note: "$9,000 ÷ $369.78, rounded up", value: "25 months" },
          ]}
          total={{ label: "Lifetime difference", value: `+${usd(11_838)}` }}
        />
        <p>
          The saving pays back the closing costs in just over two years, which looks good. Yet over the life of the loans you pay {usd(691_633)} with the refinance (including
          the {usd(9_000)}) against {usd(679_796)} by keeping your loan. The reason is the extra five years of payments.
        </p>
      </GuideSection>

      <GuideSection id="break-even" n={4} kicker="Break-even" title="The break-even point">
        <p>
          The break-even point is the month when the savings have repaid the closing costs. If you sell or refinance again before then, you lose money. Rules of thumb such as
          &ldquo;refinance when rates fall 1%&rdquo; are rough; the break-even month answers the real question: will you keep this loan long enough?
        </p>
        <p>The calculator uses closing costs ÷ monthly saving. It counts costs whether you pay them in cash or roll them in, because rolled-in costs are still repaid.</p>
      </GuideSection>

      <GuideSection id="reset" n={5} kicker="Watch out" title="The 30-year reset trap">
        <p>
          A lower payment often comes from spreading the balance over a longer term, not just from the lower rate. Starting a new 30-year loan five years into your old one means 35
          years of payments in all.
        </p>
        <CompareCards
          columns={[
            {
              name: "Keep the loan",
              rows: [
                { label: "Payment", value: "$2,266" },
                { label: "Interest left", value: usd(379_796) },
                { label: "Total still to pay", value: usd(679_796) },
              ],
            },
            {
              name: "New 30-year at 6.5%",
              rows: [
                { label: "Payment", value: "$1,896" },
                { label: "Interest", value: usd(382_633) },
                { label: "Total with costs", value: usd(691_633) },
              ],
            },
            {
              name: "New 25-year at 6.5%",
              rows: [
                { label: "Payment", value: "$2,026" },
                { label: "Interest", value: usd(307_686) },
                { label: "Total with costs", value: usd(616_686) },
              ],
            },
          ]}
        />
        <p>The calculator warns you when a refinance lowers the payment but raises the total cost.</p>
      </GuideSection>

      <GuideSection id="keep-date" n={6} kicker="Strategy" title="Keeping your payoff date">
        <p>
          You can get both a low required payment and a low total cost. Take the 30-year loan at 6.5%, but pay {usd(2_025.62)} a month, the payment for a 25-year loan. The loan is
          then paid off in exactly 300 months with {usd(307_686)} of interest, the same as a 25-year loan, while you keep the right to drop back to {usd(1_896)} if money is
          tight.
        </p>
        <Callout title="Check for prepayment penalties">
          Most new mortgages have none, but confirm on the Loan Estimate before planning to pay extra.
        </Callout>
      </GuideSection>

      <GuideSection id="rate-drop" n={7} kicker="Rates" title="How big a rate drop is worth it">
        <DataTable
          caption="$300,000 at 7.75% with 25 years left, $9,000 of closing costs"
          head={["New rate", "Term", "Monthly saving", "Break-even", "Lifetime difference"]}
          numeric={[2, 3, 4]}
          rows={[
            ["7.25%", "25 years", "$98", "93 months", `−${usd(20_270)}`],
            ["7.25%", "30 years", "$219", "42 months", `+${usd(65_954)}`],
            ["7.0%", "25 years", "$146", "62 months", `−${usd(34_695)}`],
            ["6.5%", "25 years", "$240", "38 months", `−${usd(63_109)}`],
            ["6.5%", "30 years", "$370", "25 months", `+${usd(11_838)}`],
            ["6.0%", "25 years", "$333", "28 months", `−${usd(90_925)}`],
            ["6.0%", "30 years", "$467", "20 months", `−${usd(23_281)}`],
          ]}
        />
        <p>
          A drop of half a point can still save money overall if you keep the term and stay for years, though break-even takes almost eight years. A bigger drop pays back
          faster and survives a longer term.
        </p>
      </GuideSection>

      <GuideSection id="closing" n={8} kicker="Costs" title="Closing costs">
        <p>
          Freddie Mac says to expect refinance closing costs of about 3% to 6% of the loan: on {usd(300_000)}, {usd(9_000)} to {usd(18_000)}. They include the application and
          origination fees, appraisal, title search and insurance, recording fees, and any points. Some lenders offer a &ldquo;no-closing-cost&rdquo; refinance, which means a
          higher rate or costs added to the loan; the costs are still there.
        </p>
        <p>Ask your current lender too. It may waive some fees to keep you, and a title company may give a reissue discount if your title policy is recent.</p>
      </GuideSection>

      <GuideSection id="roll-in" n={9} kicker="Costs" title="Rolling costs into the loan">
        <p>
          Rolling the {usd(9_000)} into a 25-year loan at 6.5% makes the new loan {usd(309_000)} and the payment {usd(2_086)}. The saving falls to {usd(180)} a month, the
          break-even moves out to 51 months, and the lifetime saving drops from {usd(63_109)} to {usd(53_879)}, because you pay interest on the costs for 25 years.
        </p>
      </GuideSection>

      <GuideSection id="points" n={10} kicker="Points" title="Paying points">
        <p>
          A discount point costs 1% of the loan and lowers the rate. If paying {usd(3_000)} more in costs (one point on {usd(300_000)}) cut the rate in the example from 6.5% to 6.25%
          on a 25-year loan, the saving would rise to {usd(287)} a month and break-even would be 42 months on the {usd(12_000)} total. Points are worth it only if you will keep the
          loan for many years. Compare offers on APR, which includes points and fees.
        </p>
      </GuideSection>

      <GuideSection id="cash-out" n={11} kicker="Cash out" title="Cash-out refinancing">
        <p>
          A cash-out refinance borrows more than you owe and pays you the difference, often to pay for renovations or to clear higher-rate debt. Lenders usually cap the new loan at
          about 80% of the home&rsquo;s value.
        </p>
        <p>
          Taking {usd(40_000)} out in the example with a 30-year loan at 6.5% gives a payment of {usd(2_149)}, still {usd(117)} below today&rsquo;s, but after counting the cash you
          receive the refinance costs {usd(62_855)} more over its life. Using home equity to pay off a credit card turns unsecured debt into debt secured on your home, and spreads it
          over decades. Our <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a> compares faster ways to clear debts.
        </p>
      </GuideSection>

      <GuideSection id="shorter" n={12} kicker="Term" title="Refinancing to a shorter term">
        <p>
          Moving from a 30-year to a 15-year loan usually raises the payment but often comes with a lower rate and saves a lot of interest. If you can afford the higher payment
          comfortably, it is one of the surest ways to cut the total cost. If not, paying extra on a 30-year loan gets much of the same benefit with more flexibility; our{" "}
          <a href="/us/housing/mortgage-calculator">mortgage calculator</a> shows the effect of extra payments.
        </p>
      </GuideSection>

      <GuideSection id="rates-2026" n={13} kicker="Context" title="Rates in 2026">
        <p>
          Freddie Mac&rsquo;s weekly survey put the average 30-year fixed rate at about 7.3% and the 15-year at about 6.6% on October 1, 2026, higher than a year earlier. Refinancing
          pays only if your new rate is clearly below your current one, so homeowners who locked in lower rates in earlier years usually have no reason to refinance now. Those who
          bought at higher rates may find chances as rates move.
        </p>
      </GuideSection>

      <GuideSection id="pmi" n={14} kicker="Mortgage insurance" title="Dropping PMI or FHA insurance">
        <p>
          On a conventional loan you do not need to refinance to remove PMI: you can ask your servicer once the balance reaches 80% of the original value, and it ends
          automatically at 78%. FHA mortgage insurance often lasts for the life of the loan, so FHA borrowers who now have 20% equity sometimes refinance into a conventional loan to
          drop it. Count that saving alongside any rate saving.
        </p>
      </GuideSection>

      <GuideSection id="when-not" n={15} kicker="Pitfalls" title="When not to refinance">
        <ul>
          <li>You plan to sell before the break-even month.</li>
          <li>The lower payment comes only from restarting a long term.</li>
          <li>Your credit score has fallen, so the rate offered is not much better.</li>
          <li>Your home&rsquo;s value has fallen and you would need to bring cash to closing.</li>
          <li>You would turn short-term debt into 30-year debt without a plan to stop using credit.</li>
        </ul>
      </GuideSection>

      <GuideSection id="process" n={16} kicker="Process" title="How the process works">
        <ol>
          <li>Check your credit and get quotes from three or more lenders on the same day.</li>
          <li>Compare Loan Estimates: rate, APR, points and total closing costs.</li>
          <li>Lock your rate, then provide income documents and order an appraisal.</li>
          <li>You receive the Closing Disclosure at least three business days before closing: check it against the Loan Estimate.</li>
          <li>When you refinance your main home with a new lender, federal law usually gives you three business days after closing to cancel (the right of rescission).</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={17} kicker="How to use it" title="Using the calculator well">
        <p>
          Enter your current balance, rate and the months left (your statement shows them). Enter the new rate, term and closing costs from a quote. Under More options, choose
          whether to roll the costs in and add any cash out. Check three results: the monthly saving, the break-even month and the lifetime difference. If the calculator warns about
          the reset trap, try a shorter term. For other loans, use our <a href="/us/loans/loan-calculator">loan calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="arm" n={18} kicker="Loan types" title="Moving from an adjustable rate to a fixed rate">
        <p>
          If you have an adjustable-rate mortgage (ARM), its rate is fixed only for an opening period, often five, seven or ten years, and then resets in line with a market index,
          within caps set in your loan documents. Refinancing into a fixed-rate loan before the first reset swaps that uncertainty for a known payment. It can make sense even when
          the fixed rate is a little higher than your current ARM rate, because you are paying for certainty.
        </p>
        <p>
          To use the calculator for this, enter your current ARM rate and your best guess of the rate after the reset, and compare both against the fixed-rate offer. Your loan
          documents show the index, the margin added to it and the caps on each change.
        </p>
      </GuideSection>

      <GuideSection id="stay" n={19} kicker="Planning" title="How long you will keep the loan">
        <p>
          The break-even month only helps if you compare it with how long you expect to keep the loan. People move for jobs, family and space more often than they expect, and
          many refinance again when rates fall. If there is a real chance you will move within three or four years, a refinance with a long break-even is a gamble.
        </p>
        <p>
          On the other hand, if you plan to stay for decades and the rate drop is meaningful, even a refinance with a break-even of four or five years can save tens of thousands
          of dollars, as long as you keep the payoff date in view.
        </p>
      </GuideSection>

      <GuideSection id="streamline" n={20} kicker="Programs" title="Streamline refinances">
        <p>
          FHA and VA loans have simplified refinance programs: the FHA Streamline Refinance and the VA Interest Rate Reduction Refinance Loan (IRRRL). They usually need less
          paperwork and often no appraisal, but they must lower your payment or move you to a more stable loan. Closing costs still apply and can often be rolled in, so check the
          break-even month the same way.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={21} kicker="Taxes" title="Taxes and refinancing">
        <p>
          If you itemize deductions, mortgage interest on your home is generally deductible within IRS limits. A lower rate means less interest and so a smaller deduction, but
          you still come out ahead: a deduction only returns part of each dollar of interest. Points paid on a refinance are usually deducted over the life of the loan rather than
          all at once (IRS Publication 936). Most households take the standard deduction, so for them the tax side makes no difference. The calculator ignores tax effects.
        </p>
      </GuideSection>

      <GuideSection id="offers" n={22} kicker="Shopping" title="Comparing lender offers">
        <p>
          Every lender must give you a Loan Estimate within three business days of your application, in the same standard format, so offers are easy to line up. Compare the rate,
          the APR, the points in section A, and the total closing costs. A lower rate with high points can be worse than a slightly higher rate with no points if you might move
          or refinance again within a few years.
        </p>
        <p>
          Get estimates on the same day if you can, because rates move daily. Ask each lender whether the rate is locked and for how long, and what happens if closing is
          delayed. Then run each offer through the calculator: the one with the best break-even and lifetime figures for the time you expect to keep the loan is usually the one to
          pick.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={23} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Refinance closing costs (Freddie Mac)", "about 3% to 6% of the loan"],
            ["Break-even", "Closing costs ÷ monthly saving"],
            ["Average 30-year rate (October 1, 2026)", "about 7.3%"],
            ["Average 15-year rate (October 1, 2026)", "about 6.6%"],
            ["Typical cash-out limit", "about 80% of the home's value"],
            ["Right to cancel (main home, new lender)", "usually 3 business days"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

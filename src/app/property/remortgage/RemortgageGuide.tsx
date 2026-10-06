import { CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Remortgaging — the guide. Figures from src/lib/property/remortgage.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "why", title: "Why remortgage?" },
  { id: "svr", title: "The cost of drifting onto the standard variable rate" },
  { id: "examples", title: "Worked examples" },
  { id: "fees", title: "Fees: upfront or added to the loan" },
  { id: "erc", title: "Early repayment charges" },
  { id: "product-transfer", title: "Product transfer or full remortgage?" },
  { id: "fixed-tracker", title: "Fixed, tracker or variable?" },
  { id: "length", title: "Two-year or five-year fix?" },
  { id: "ltv", title: "Loan to value: why your home's value matters" },
  { id: "borrowing-more", title: "Borrowing more when you remortgage" },
  { id: "timeline", title: "When to start" },
  { id: "affordability", title: "Affordability checks" },
  { id: "brokers", title: "Using a broker" },
  { id: "overpay", title: "Remortgaging and overpayments" },
  { id: "term", title: "Changing the term" },
  { id: "interest-only", title: "Interest-only mortgages" },
  { id: "rates-outlook", title: "If rates may fall" },
  { id: "example-small", title: "A smaller mortgage example" },
  { id: "joint-borrowers", title: "Changing who is on the mortgage" },
  { id: "costs", title: "Other costs of remortgaging" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "MoneyHelper — Remortgaging", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/remortgaging-to-cut-costs" },
  { label: "MoneyHelper — Early repayment charges", href: "https://www.moneyhelper.org.uk/en/homes/buying-a-home/mortgage-fees-explained" },
  { label: "FCA — Mortgages: your rights", href: "https://www.fca.org.uk/consumers/mortgages" },
  { label: "Bank of England — Bank Rate", href: "https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate" },
];

export default function RemortgageGuide() {
  return (
    <Guide
      kicker="The remortgage guide"
      title="Should I remortgage?"
      intro={
        <>
          When a fixed or tracker mortgage deal ends, most lenders move you onto their standard variable rate, which is usually much higher. Switching
          to a new deal can save hundreds of pounds a month, but fees, early repayment charges and the length of the new deal all change the sums. This
          guide explains how to compare a remortgage properly, over the length of the deal, and the choices that make the biggest difference.
        </>
      }
      meta={["October 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Moving £200,000 from a 7.5% standard variable rate to a 4.5% fix cuts payments by about <strong>£346 a month</strong> over 20 years.</li>
          <li>Over a 2-year deal, after a £999 fee, that leaves you about <strong>£10,900</strong> better off.</li>
          <li>Compare deals over their whole length, including fees, not just the rate.</li>
          <li>Start looking up to 6 months before your current deal ends, so you never pay an early repayment charge or the variable rate.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£346", label: "Monthly saving in the example" },
            { value: "3 months", label: "To repay a £999 fee" },
            { value: "6 months", label: "How early you can lock in a deal" },
            { value: "1% to 5%", label: "Typical early repayment charge" },
          ]}
        />
      </GuideSection>

      <GuideSection id="why" n={2} kicker="Basics" title="Why remortgage?">
        <p>
          Remortgaging means moving your mortgage to a new deal, either with a new lender or your current one. Most people do it when their fixed rate
          ends, to avoid the standard variable rate. Others remortgage to borrow more for home improvements, to release equity, to switch from
          interest-only to repayment, or to take advantage of a lower loan to value now that they have paid off some of the loan or their home has risen
          in value.
        </p>
      </GuideSection>

      <GuideSection id="svr" n={3} kicker="Default" title="The cost of drifting onto the standard variable rate">
        <p>
          The standard variable rate (SVR) is set by each lender and is usually several percentage points above the best fixed rates. Lenders rely on
          some borrowers not acting. On a £200,000 mortgage with 20 years left, an SVR of 7.5% means payments of £1,611 a month against £1,265 at 4.5%.
          Even three months on the SVR costs over £1,000.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={4} kicker="Worked examples" title="Worked examples">
        <WorkedExample
          title="£200,000, 20 years left, 7.5% SVR against a 2-year fix at 4.5% with a £999 fee"
          steps={[
            { label: "Monthly payment on the SVR", value: "£1,611.19" },
            { label: "Monthly payment on the new deal", value: "£1,265.30" },
            { label: "Monthly saving", value: "£345.89" },
            { label: "Fee repaid after", value: "3 months" },
          ]}
          total={{ label: "Better off after 2 years", value: "£10,897" }}
        />
        <p>
          Over a 5-year deal at the same rates, the gain grows to about £28,160. The calculator includes the lower balance at the end of the deal,
          because more of each payment goes on capital when the rate is lower.
        </p>
        <WorkedExample
          title="Leaving a 5% deal early for 4.2%, with a 2% early repayment charge"
          steps={[
            { label: "Monthly saving", value: "£86.77" },
            { label: "Early repayment charge on £200,000", value: "£4,000" },
            { label: "Arrangement fee", value: "£999" },
          ]}
          total={{ label: "Worse off after 2 years", value: "£1,848" }}
        />
      </GuideSection>

      <GuideSection id="fees" n={5} kicker="Fees" title="Fees: upfront or added to the loan">
        <p>
          Many of the lowest rates come with arrangement fees of £999 or more; fee-free deals usually have a higher rate. On a large mortgage a low rate
          with a fee is often cheaper; on a small mortgage the fee can outweigh the rate saving. You can usually add the fee to the loan, but then you pay
          interest on it for the rest of the term. On £150,000 moving from 7.5% to 3.9% with a £1,499 fee added, the gain over 2 years is about £8,936,
          compared with £9,676 for a fee-free 4.2% deal. Use the calculator to compare both.
        </p>
      </GuideSection>

      <GuideSection id="erc" n={6} kicker="Charges" title="Early repayment charges">
        <p>
          Fixed and tracker deals usually charge an early repayment charge (ERC) if you leave or repay in full before the deal ends: often 1% to 5% of the
          balance, falling each year. On £200,000, a 2% charge is £4,000, which can wipe out the benefit of a slightly lower rate. Most lenders let you
          overpay up to 10% a year without a charge. The simplest way to avoid ERCs is to time the switch for the day your deal ends.
        </p>
      </GuideSection>

      <GuideSection id="product-transfer" n={7} kicker="Options" title="Product transfer or full remortgage?">
        <CompareCards
          columns={[
            {
              name: "Product transfer (same lender)",
              rows: [
                { label: "Paperwork", value: "Minimal, often online" },
                { label: "Affordability check", value: "Usually none if borrowing the same" },
                { label: "Legal work", value: "None" },
              ],
            },
            {
              name: "Remortgage (new lender)",
              rows: [
                { label: "Paperwork", value: "Full application" },
                { label: "Affordability check", value: "Yes" },
                { label: "Choice", value: "The whole market, often lower rates" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="fixed-tracker" n={8} kicker="Rate types" title="Fixed, tracker or variable?">
        <ul>
          <li><strong>Fixed:</strong> the rate and payment stay the same for the deal. Certainty, but you do not benefit if rates fall.</li>
          <li><strong>Tracker:</strong> follows the Bank of England base rate plus a margin. Payments fall if rates fall and rise if they rise.</li>
          <li><strong>Discount or SVR:</strong> set by the lender and can change at any time.</li>
        </ul>
        <p>Some trackers have no early repayment charge, which gives you the option to fix later.</p>
      </GuideSection>

      <GuideSection id="length" n={9} kicker="Deal length" title="Two-year or five-year fix?">
        <p>
          A two-year fix gives you the chance to switch again sooner, which helps if rates fall or your home&rsquo;s value rises enough to move you into a
          lower loan-to-value band. A five-year fix gives longer certainty and fewer arrangement fees. If you might move home, check whether the mortgage is
          portable, so you can take it with you without an early repayment charge.
        </p>
      </GuideSection>

      <GuideSection id="ltv" n={10} kicker="Equity" title="Loan to value: why your home's value matters">
        <p>
          Lenders price mortgages in bands of loan to value (LTV): the mortgage as a share of the home&rsquo;s value. Rates usually step down at 90%,
          85%, 80%, 75% and 60%. If your balance has fallen or your home has risen in value since you last borrowed, you may now qualify for a cheaper band.
          A £200,000 mortgage on a £340,000 home is about 59% LTV, which usually gets the best rates.
        </p>
      </GuideSection>

      <GuideSection id="borrowing-more" n={11} kicker="Equity release" title="Borrowing more when you remortgage">
        <p>
          You can borrow more when you remortgage, for example for an extension or to consolidate debts. Mortgage rates are often lower than personal loan
          rates, but spreading a debt over 20 years can cost far more in total interest. Check the overall cost, and whether your lender will ask what the
          money is for.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={12} kicker="Timing" title="When to start">
        <Timeline
          items={[
            { when: "6 months before your deal ends", what: "Start comparing", detail: "Many lenders let you secure a rate this far ahead." },
            { when: "3 to 4 months before", what: "Apply", detail: "A full remortgage can take 4 to 8 weeks." },
            { when: "Before completion", what: "Keep checking rates", detail: "If rates fall, you can often switch to a cheaper deal before it starts." },
            { when: "The day your deal ends", what: "Switch", detail: "No early repayment charge and no time on the standard variable rate." },
          ]}
        />
      </GuideSection>

      <GuideSection id="affordability" n={13} kicker="Checks" title="Affordability checks">
        <p>
          A new lender checks your income, spending and credit record, and whether you could afford the payments if rates rose. If your income has fallen,
          a product transfer with your current lender may be easier, as it often needs no new affordability check. See the{" "}
          <a href="/property/mortgage-affordability">mortgage affordability calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="brokers" n={14} kicker="Help" title="Using a broker">
        <p>
          A mortgage broker can search a wide range of lenders, including deals not offered directly, and handle the application. Many are paid by the lender
          and charge you nothing; others charge a fee. Ask whether they search the whole market. Your current lender&rsquo;s product transfer offer is
          always worth comparing against what the broker finds.
        </p>
      </GuideSection>

      <GuideSection id="overpay" n={15} kicker="Overpayments" title="Remortgaging and overpayments">
        <p>
          A remortgage is a good moment to think about overpaying. If you have savings earning less than your mortgage rate after tax, using some to reduce
          the balance before you switch can lower your loan to value and your payments. Most deals let you overpay up to 10% of the balance each year without
          a charge. Keep an emergency fund first, because money paid into a mortgage is hard to get back. See the{" "}
          <a href="/property/mortgage-overpayment">mortgage overpayment calculator</a> to see the interest you could save.
        </p>
      </GuideSection>

      <GuideSection id="term" n={16} kicker="Mortgage term" title="Changing the term">
        <p>
          When you remortgage you can also change the length of the mortgage. Shortening it raises monthly payments but cuts total interest sharply;
          extending it lowers payments but adds interest. Lenders usually want the mortgage repaid before you reach a set age, often 70 or 75. If your new
          payment is much lower than before, consider keeping your payment the same by shortening the term: you will be mortgage-free sooner.
        </p>
      </GuideSection>

      <GuideSection id="interest-only" n={17} kicker="Interest-only" title="Interest-only mortgages">
        <p>
          If you have an interest-only mortgage, your payments only cover interest, so the balance stays the same. At remortgage, lenders will ask how you plan
          to repay the loan at the end. Switching some or all of it to repayment raises your monthly cost but means the debt shrinks. The calculator assumes a
          repayment mortgage.
        </p>
      </GuideSection>

      <GuideSection id="rates-outlook" n={18} kicker="Rate outlook" title="If rates may fall">
        <p>
          Nobody knows where interest rates will go. If you think rates may fall, a shorter fix or a tracker with no early repayment charge keeps you flexible.
          If you value certainty, a longer fix protects you if rates rise. Many borrowers choose based on how much a rise in payments would hurt their budget,
          rather than trying to predict the market.
        </p>
      </GuideSection>

      <GuideSection id="example-small" n={19} kicker="Example" title="A smaller mortgage example">
        <WorkedExample
          title="£150,000, 15 years left, 7.5% SVR against a fee-free 4.2% two-year fix"
          steps={[
            { label: "Monthly payment on the SVR", value: "£1,390.52" },
            { label: "Monthly payment on the new deal", value: "£1,124.63" },
            { label: "Monthly saving", value: "£265.89" },
          ]}
          total={{ label: "Better off after 2 years", value: "£9,676" }}
        />
      </GuideSection>

      <GuideSection id="joint-borrowers" n={20} kicker="Joint mortgages" title="Changing who is on the mortgage">
        <p>
          Remortgaging is often when couples add or remove a name from the mortgage, after a marriage, separation or inheritance. Removing someone needs the
          lender&rsquo;s agreement that the remaining borrower can afford the loan alone, and may need legal work to transfer ownership of the home. Adding a
          borrower usually needs a full application. Stamp Duty can apply when a share of a property changes hands for money or debt, so take advice first.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={21} kicker="Costs" title="Other costs of remortgaging">
        <p>
          Besides the arrangement fee, a remortgage can involve a valuation fee, legal fees for the conveyancing, a broker fee and sometimes a fee for leaving your
          old lender, often called an exit or deeds release fee of up to a few hundred pounds. Many remortgage deals include a free valuation and free standard
          legal work, which can be worth several hundred pounds. Add any you will pay under More options in the calculator.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          caption="£200,000 over 20 years at different rates"
          head={["Rate", "Monthly payment"]}
          numeric={[1]}
          rows={[
            ["4.0%", "£1,211.96"],
            ["4.5%", "£1,265.30"],
            ["5.0%", "£1,319.91"],
            ["7.5%", "£1,611.19"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

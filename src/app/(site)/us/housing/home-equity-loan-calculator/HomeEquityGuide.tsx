import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Home equity loan guide. Figures from src/lib/us/home-equity.ts (equityAvailable, equityOptions, firstYearInterest, deductibleShare), loans.ts and housing-loans-extra.ts (loanWithFee). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a home equity loan is" },
  { id: "limit", title: "How much you can borrow" },
  { id: "example", title: "A worked example" },
  { id: "term", title: "Choosing the term" },
  { id: "rates", title: "Rates in 2026" },
  { id: "costs", title: "Closing costs and the APR" },
  { id: "three-ways", title: "Three ways to tap equity" },
  { id: "low-rate", title: "When you have a low first mortgage" },
  { id: "high-rate", title: "When your mortgage rate is high" },
  { id: "heloc", title: "Home equity loan or HELOC" },
  { id: "tax", title: "Is the interest deductible?" },
  { id: "tax-example", title: "Working out the tax saving" },
  { id: "uses", title: "Sensible uses" },
  { id: "debt", title: "Consolidating debt" },
  { id: "qualify", title: "Qualifying" },
  { id: "risks", title: "The risks" },
  { id: "selling", title: "If you sell the home" },
  { id: "process", title: "From application to cash" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What is a home equity loan?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106/" },
  { label: "CFPB: What is a home equity line of credit (HELOC)?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-line-of-credit-heloc-en-110/" },
  { label: "IRS Publication 936: Home Mortgage Interest Deduction", href: "https://www.irs.gov/publications/p936" },
  { label: "Bankrate: Current home equity loan rates", href: "https://www.bankrate.com/home-equity/current-interest-rates/" },
  { label: "Bankrate: Current HELOC rates", href: "https://www.bankrate.com/home-equity/heloc-rates/" },
  { label: "Freddie Mac: Primary Mortgage Market Survey", href: "https://www.freddiemac.com/pmms" },
];

export default function HomeEquityGuide() {
  return (
    <Guide
      kicker="The home equity loan guide"
      title="How much you can borrow against your home, and the cheapest way to do it"
      intro={
        <>
          A home equity loan turns part of your home&rsquo;s value into cash, repaid at a fixed rate over a fixed term. This guide explains the borrowing limit, the payment and the
          true cost, compares it with a HELOC and a cash-out refinance, and sets out when the interest is tax deductible.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Lenders usually cap all loans on the home at 80% to 85% of its value. A {usd(500_000)} home with {usd(300_000)} owed supports up to {usd(125_000)} at 85%.</li>
          <li>{usd(50_000)} at 8.66% over 15 years costs $497.07 a month and {usd(39_473)} in interest.</li>
          <li>If your first mortgage has a low rate, a second loan is far cheaper than a cash-out refinance.</li>
          <li>The interest is deductible only if you itemize and the money buys, builds or substantially improves the home.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(125_000), label: "Most you could borrow: $500,000 home, $300,000 owed, 85%" },
            { value: "$497.07", label: "Monthly payment, $50,000 at 8.66% over 15 years" },
            { value: "about 8.66%", label: "Average 10-year home equity loan rate, October 2026" },
            { value: "$750,000", label: "Cap on mortgage debt for the interest deduction" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a home equity loan is">
        <p>
          A home equity loan, sometimes called a second mortgage, is a lump sum borrowed against the equity in your home: its value minus what you owe. You get all the money at
          closing and repay it in equal monthly payments at a fixed rate, usually over 5 to 30 years. Your first mortgage stays as it is. Because the home secures the loan, rates
          are lower than on credit cards or personal loans, but missing payments puts the home at risk.
        </p>
      </GuideSection>

      <GuideSection id="limit" n={3} kicker="Borrowing power" title="How much you can borrow">
        <WorkedExample
          title="$500,000 home, $300,000 mortgage, 85% CLTV limit"
          steps={[
            { label: "Home value", value: usd(500_000) },
            { label: "Most all loans can reach", note: "85% combined loan-to-value (CLTV)", value: usd(425_000) },
            { label: "Less your mortgage", value: `−${usd(300_000)}` },
          ]}
          total={{ label: "Most you can borrow", value: usd(125_000) }}
        />
        <p>
          At an 80% limit the same home supports {usd(100_000)}. The lender also checks your credit and income: a debt-to-income ratio under about 43% is a common requirement, and
          the <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows yours with the new payment added.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$50,000 at 8.66% fixed for 15 years, $1,000 of closing costs"
          steps={[
            { label: "Monthly payment", value: "$497.07" },
            { label: "Total interest", value: usd(39_473) },
            { label: "Cash in hand after costs", value: usd(49_000) },
            { label: "CLTV after the loan", note: "($300,000 + $50,000) ÷ $500,000", value: "70%" },
          ]}
          total={{ label: "APR including the costs", value: "9.00%" }}
        />
        <p>
          Closing costs taken from the loan mean you repay {usd(50_000)} but receive {usd(49_000)}, so the true cost, the APR, is 9.00% rather than 8.66%. With {usd(2_500)} of
          costs it would be 9.54%.
        </p>
      </GuideSection>

      <GuideSection id="term" n={5} kicker="Term" title="Choosing the term">
        <DataTable
          caption="$50,000 at 8.66%"
          head={["Term", "Monthly payment", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["5 years", "$1,029.69", usd(11_781)],
            ["10 years", "$624.22", usd(24_906)],
            ["15 years", "$497.07", usd(39_473)],
            ["20 years", "$438.99", usd(55_357)],
            ["30 years", "$390.14", usd(90_451)],
          ]}
        />
        <p>
          Stretching the term lowers the payment but multiplies the interest. Match the term to what you are paying for: a roof that lasts 25 years can justify a longer loan than
          a car that lasts eight. Rates are often a little lower for shorter terms.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={6} kicker="Rates" title="Rates in 2026">
        <Bars
          format={(n) => `${n.toFixed(2)}%`}
          items={[
            { label: "Prime rate", value: 7 },
            { label: "Average HELOC", value: 7.33 },
            { label: "30-year mortgage", value: 7.3 },
            { label: "10-year home equity loan", value: 8.66 },
          ]}
        />
        <p>
          Bankrate&rsquo;s survey put the average 10-year home equity loan at about 8.66% and the average HELOC at about 7.33% on October 7, 2026. Freddie Mac&rsquo;s 30-year
          first-mortgage average was about 7.3% on October 1, 2026. Home equity loans cost more than first mortgages because the lender is paid second if the home is sold in
          foreclosure. Your rate depends on your credit score, the CLTV and the loan size.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={7} kicker="Costs" title="Closing costs and the APR">
        <p>
          Expect closing costs of about 2% to 5% of the loan: an appraisal, origination and title fees, and recording charges. Some lenders waive them, sometimes in exchange for a
          slightly higher rate or a fee if you repay within a few years. Compare offers on the APR, which spreads the costs over the loan, and on the total cash you will repay.
        </p>
      </GuideSection>

      <GuideSection id="three-ways" n={8} kicker="Compare" title="Three ways to tap equity">
        <CompareCards
          columns={[
            {
              name: "Home equity loan",
              rows: [
                { label: "Money", value: "Lump sum" },
                { label: "Rate", value: "Fixed" },
                { label: "First mortgage", value: "Unchanged" },
              ],
            },
            {
              name: "HELOC",
              rows: [
                { label: "Money", value: "Draw as needed" },
                { label: "Rate", value: "Variable" },
                { label: "First mortgage", value: "Unchanged" },
              ],
            },
            {
              name: "Cash-out refinance",
              rows: [
                { label: "Money", value: "Lump sum" },
                { label: "Rate", value: "Fixed or adjustable" },
                { label: "First mortgage", value: "Replaced" },
              ],
            },
          ]}
        />
        <p>
          The calculator raises the same cash all three ways and shows your total mortgage payments now and later, and the extra interest and costs over each loan&rsquo;s life
          compared with keeping only your mortgage.
        </p>
      </GuideSection>

      <GuideSection id="low-rate" n={9} kicker="Compare" title="When you have a low first mortgage">
        <DataTable
          caption="Raising $50,000 with $300,000 owed at 4% and 25 years left"
          head={["Option", "All payments now", "Later", "Extra interest and costs"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Keep the mortgage only", "$1,583.51", "$1,583.51", "–"],
            ["Home equity loan, 8.66%, 15 years", "$2,080.58", "$2,080.58", usd(40_473)],
            ["HELOC, 7.33%, 10 + 20 years", "$1,888.93", "$1,981.13", usd(82_078)],
            ["Cash-out refinance, 7.3%, 30 years", "$2,399.50", "$2,399.50", usd(349_266)],
          ]}
        />
        <p>
          Millions of homeowners hold mortgages from 2020 and 2021 at 3% to 4%. A cash-out refinance would reprice the whole {usd(300_000)} at 7.3% and restart a 30-year term, adding
          about {usd(349_000)} of interest and costs to raise {usd(50_000)}. A second loan leaves the cheap mortgage alone. The HELOC has the lowest payment at first but, over its
          30-year life, costs about twice the home equity loan, because you pay interest only for ten years.
        </p>
      </GuideSection>

      <GuideSection id="high-rate" n={10} kicker="Compare" title="When your mortgage rate is high">
        <p>
          The picture changes if your first mortgage already costs more than today&rsquo;s rates. With the same {usd(300_000)} at 7.5%, a cash-out refinance at 7.3% has the lowest
          monthly payment, $2,399.50 against $2,714.04 with a home equity loan on top, because it also cuts the rate and spreads the debt over 30 years. Over the long run it still
          costs {usd(159_227)} more than keeping the mortgage, against {usd(40_473)} for the home equity loan, mostly from the five extra years of payments. The{" "}
          <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}shows the break-even month for a rate-cutting refinance.
        </p>
      </GuideSection>

      <GuideSection id="heloc" n={11} kicker="Compare" title="Home equity loan or HELOC">
        <p>
          Choose a home equity loan for one known cost, such as a roof or a kitchen with a fixed quote, and when you want a payment that never changes. Choose a HELOC for costs that
          come in stages or are uncertain, and when you can repay quickly; you pay interest only on what you draw. A HELOC&rsquo;s rate moves with the prime rate, about 7.00% in
          October 2026. The <a href="/us/housing/heloc-calculator">HELOC calculator</a>{" "}shows its draw and repayment payments in detail.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={12} kicker="Taxes" title="Is the interest deductible?">
        <p>
          Interest on a home equity loan is deductible only if you itemize and you use the money to buy, build or substantially improve the home that secures the loan. Interest on
          money used for anything else, such as paying off credit cards, buying a car or paying tuition, is not deductible. The One Big Beautiful Bill Act (P.L. 119-21) made this
          rule permanent, along with the {usd(750_000)} limit ({usd(375_000)} if married filing separately) on total mortgage debt, first mortgage and home equity loan together, whose
          interest can be deducted (IRS Publication 936). Loans taken out before December 16, 2017 keep the older {usd(1_000_000)} limit.
        </p>
        <Callout title="Keep the paper trail">
          Keep contracts, invoices and receipts that show the money went into the home. They support the deduction and also add to your cost basis when you sell.
        </Callout>
      </GuideSection>

      <GuideSection id="tax-example" n={13} kicker="Taxes" title="Working out the tax saving">
        <p>
          On {usd(50_000)} at 8.66% over 15 years, first-year interest is {usd(4_264)}. If the loan pays for a renovation and you itemize in the 24% bracket, that saves about{" "}
          {usd(1_023)} of federal tax in the first year, making the rate about 6.58% after tax. Most households take the standard deduction ({usd(32_200)} for married couples filing
          jointly in 2026) and get no saving. Above the cap only part of the interest counts: with {usd(700_000)} on the first mortgage and a {usd(100_000)} improvement loan, 93.75%
          of the interest is deductible.
        </p>
      </GuideSection>

      <GuideSection id="uses" n={14} kicker="Uses" title="Sensible uses">
        <ul>
          <li>Renovations and repairs that keep or add value, where the interest may be deductible.</li>
          <li>A large one-off cost with a fixed price, such as a new roof, heating system or accessibility work.</li>
          <li>Replacing much higher-rate debt, with a firm plan not to run it up again.</li>
        </ul>
        <p>Avoid using home equity for holidays, cars or day-to-day spending: you could still be paying for them long after they are gone.</p>
      </GuideSection>

      <GuideSection id="debt" n={15} kicker="Debt" title="Consolidating debt">
        <p>
          Swapping credit card debt at over 20% for a home equity loan near 9% can save a lot of interest, but it moves unsecured debt onto your home and often over a longer term.
          Pay it off over a short term, close or freeze the cards you cleared, and compare with a balance transfer or a debt plan first. The{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}shows how fast you could clear the debts without borrowing against your home.
        </p>
      </GuideSection>

      <GuideSection id="qualify" n={16} kicker="Qualifying" title="Qualifying">
        <p>
          Lenders look at four things: equity (the CLTV after the loan), your credit score (many want 620 to 680 or more, with the best rates above 740), your debt-to-income ratio,
          and stable income. Expect an appraisal or an automated valuation of the home. A lower CLTV and a higher score usually win a lower rate.
        </p>
      </GuideSection>

      <GuideSection id="risks" n={17} kicker="Risks" title="The risks">
        <ul>
          <li>Your home secures the loan: if you cannot pay, the lender can foreclose.</li>
          <li>If prices fall, you could owe more than the home is worth, which makes selling or refinancing hard.</li>
          <li>A second monthly payment for years cuts your room in the budget if income drops.</li>
          <li>Closing costs make borrowing small amounts expensive.</li>
        </ul>
      </GuideSection>

      <GuideSection id="selling" n={18} kicker="Selling" title="If you sell the home">
        <p>
          Both the first mortgage and the home equity loan are paid off from the sale proceeds at closing. Check the loan for an early payoff fee before you borrow if you might move
          within a few years. Money spent on improvements also adds to your cost basis, which can reduce any capital gain above the home sale exclusion.
        </p>
      </GuideSection>

      <GuideSection id="process" n={19} kicker="Process" title="From application to cash">
        <ol>
          <li>Check your credit report and your home&rsquo;s likely value.</li>
          <li>Get Loan Estimates from your bank, a credit union and an online lender on the same day.</li>
          <li>Compare the rate, APR, closing costs and any early payoff fee.</li>
          <li>Close. For a loan on your main home, you have three business days to cancel, so the money arrives after that.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <p>
          Enter your home&rsquo;s value, what you owe and the lender&rsquo;s CLTV limit to see the most you can borrow. Then add the amount, rate and term from a quote. Under More
          options, add closing costs, say what the money is for and whether you itemize, and enter your current mortgage rate and the HELOC and refinance rates you have been
          offered to compare all three ways. For the total monthly housing cost with tax and insurance, use the{" "}
          <a href="/us/housing/mortgage-calculator">mortgage calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Typical CLTV limit", "80% to 85%"],
            ["Average 10-year home equity loan rate (Bankrate, October 7, 2026)", "about 8.66%"],
            ["Average HELOC rate (Bankrate, October 7, 2026)", "about 7.33%"],
            ["Average 30-year mortgage rate (Freddie Mac, October 1, 2026)", "about 7.3%"],
            ["Typical closing costs", "about 2% to 5% of the loan"],
            ["Mortgage debt cap for the interest deduction", "$750,000 ($375,000 married filing separately)"],
            ["Right to cancel (main home)", "3 business days"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

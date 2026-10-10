import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Business loan guide. Figures from src/lib/us/loan-math.ts (sba7a, cashAdvanceApr, trueApr, dscr, simpleInterest) and src/lib/us/loans.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "types", title: "The main kinds of business financing" },
  { id: "term", title: "How a term loan payment works" },
  { id: "term-example", title: "A term loan example" },
  { id: "fees", title: "Origination fees and APR" },
  { id: "sba", title: "SBA 7(a) loans in brief" },
  { id: "sba-rates", title: "SBA 7(a) maximum rates" },
  { id: "sba-fees", title: "SBA guaranty fees for 2026–27" },
  { id: "sba-example", title: "An SBA 7(a) example" },
  { id: "sba-terms", title: "SBA terms, collateral and guarantees" },
  { id: "504", title: "SBA 504 loans" },
  { id: "mca", title: "Merchant cash advances" },
  { id: "factor", title: "Factor rate to APR" },
  { id: "mca-compare", title: "A cash advance against a loan" },
  { id: "dscr", title: "Debt service coverage" },
  { id: "day-count", title: "Actual/360 interest" },
  { id: "disclosure", title: "Disclosures and your rights" },
  { id: "tax", title: "Taxes on business borrowing" },
  { id: "applying", title: "Getting ready to apply" },
  { id: "using", title: "Using the calculator" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "SBA: 7(a) loan program terms, conditions and eligibility", href: "https://www.sba.gov/partners/lenders/7a-loan-program/terms-conditions-eligibility" },
  { label: "SBA: Information Notice 5000-872051, 7(a) fees (FY 2026)", href: "https://www.sba.gov/document/information-notice-5000-872051-7a-fees-effective-october-1-2025-fiscal-year-2026" },
  { label: "NAGGL: SBA notices announcing FY 2027 7(a) and 504 fees (Information Notice 5000-881797)", href: "https://www.naggl.org/sba-issues-notices-announcing-fy-2027-7a-and-504-loan-program-fees/" },
  { label: "SBA: 504 loans", href: "https://www.sba.gov/funding-programs/loans/504-loans" },
  { label: "Federal Register: SBA maximum allowable 7(a) interest rates (August 1, 2022)", href: "https://www.govinfo.gov/content/pkg/FR-2022-08-01/pdf/2022-16162.pdf" },
  { label: "IRS: Questions and answers about the business interest expense limitation (section 163(j))", href: "https://www.irs.gov/newsroom/questions-and-answers-about-the-limitation-on-the-deduction-for-business-interest-expense" },
];

export default function BusinessLoanGuide() {
  return (
    <Guide
      kicker="The business loan guide"
      title="What business financing really costs"
      intro={
        <>
          Business lenders quote costs in many ways: an interest rate, a rate over prime, a guaranty fee, a factor rate. This guide puts them on one scale. It covers term loans,
          the SBA 7(a) program with its rate caps and fees for loans approved from October 1, 2026, SBA 504 loans, merchant cash advances, and the debt service coverage ratio
          lenders use to decide how much you can borrow.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>$250,000 at 9.5% over 10 years costs $3,234.94 a month and $138,193 in interest.</li>
          <li>An SBA 7(a) loan of $500,000 carries an $11,250 guaranty fee and a variable-rate cap of 9.75% with prime at 6.75%.</li>
          <li>A $50,000 cash advance at a 1.3 factor repaid over 6 months is about 109% APR.</li>
          <li>Most lenders want yearly cash flow of at least 1.25 times your yearly debt payments.</li>
        </ul>
        <KeyStats
          items={[
            { value: "6.75%", label: "WSJ prime rate (since December 11, 2025)" },
            { value: "$5 million", label: "Largest standard SBA 7(a) loan" },
            { value: "2% to 3.75%", label: "SBA guaranty fee on the guaranteed part" },
            { value: "1.25×", label: "Typical minimum debt service coverage" },
          ]}
        />
      </GuideSection>

      <GuideSection id="types" n={2} kicker="Options" title="The main kinds of business financing">
        <DataTable
          head={["Type", "How it works", "Typical use"]}
          rows={[
            ["Bank term loan", "Lump sum, fixed monthly payments over 1 to 10 years or more", "Expansion, equipment, buying a business"],
            ["SBA 7(a) loan", "Bank loan with a partial SBA guarantee and capped rates", "Working capital, equipment, real estate, refinancing"],
            ["SBA 504 loan", "Bank plus a Certified Development Company, long fixed rate", "Buildings, land and major equipment"],
            ["Online term loan", "Faster approval, higher rates, often weekly or daily payments", "Short-term needs"],
            ["Line of credit", "Draw and repay as needed; interest only on what you use", "Seasonal cash flow"],
            ["Merchant cash advance", "Lump sum repaid from sales at a factor rate", "Quick cash when loans are not available"],
          ]}
        />
      </GuideSection>

      <GuideSection id="term" n={3} kicker="The maths" title="How a term loan payment works">
        <p>
          A term loan is repaid in equal installments. Each month the lender charges interest on the balance at one-twelfth of the yearly rate; the rest of the payment reduces the
          balance. The payment is P × r ÷ (1 − (1 + r)<sup>−n</sup>), where P is the loan, r the monthly rate and n the number of payments. The same maths drives personal loans
          and mortgages; our <a href="/us/loans/loan-calculator">loan calculator</a>{" "}shows a monthly schedule for any fixed loan.
        </p>
      </GuideSection>

      <GuideSection id="term-example" n={4} kicker="Worked example" title="A term loan example">
        <WorkedExample
          title="$250,000 at 9.5% over 10 years with a 2% origination fee"
          steps={[
            { label: "Monthly payment", note: "120 payments", value: "$3,234.94" },
            { label: "Total interest", value: "$138,193" },
            { label: "Origination fee", note: "2%, taken from the loan", value: "$5,000" },
            { label: "Cash you receive", value: "$245,000" },
          ]}
          total={{ label: "APR including the fee", value: "9.98%" }}
        />
      </GuideSection>

      <GuideSection id="fees" n={5} kicker="Fees" title="Origination fees and APR">
        <p>
          Many lenders charge an origination or packaging fee. If it comes out of the loan, you pay interest on money you never receive, so the true cost is higher than the rate.
          The calculator turns the fee into an APR using the same method lenders must use for consumer loans. Our <a href="/us/loans/apr-calculator">APR calculator</a>{" "}explains
          the method and handles points and quoted payments.
        </p>
      </GuideSection>

      <GuideSection id="sba" n={6} kicker="SBA 7(a)" title="SBA 7(a) loans in brief">
        <p>
          The Small Business Administration does not usually lend directly. Under the 7(a) program, a bank or other approved lender makes the loan and the SBA guarantees part of
          it: 85% of loans of $150,000 or less and 75% of larger ones (50% for SBA Express). If the business defaults, the SBA repays the lender the guaranteed share. That lets
          lenders offer longer terms and lend to businesses they would otherwise turn down. The most a standard 7(a) loan can be is $5 million; SBA Express loans go up to
          $500,000.
        </p>
      </GuideSection>

      <GuideSection id="sba-rates" n={7} kicker="SBA 7(a)" title="SBA 7(a) maximum rates">
        <p>
          Rates are agreed with the lender but cannot exceed the SBA&rsquo;s maximums, which are a base rate (usually prime) plus a spread that depends on the loan size. Since
          March 1, 2026 lenders can also peg variable rates to SOFR or Treasury rates, but the cap is still worked out from prime.
        </p>
        <DataTable
          caption="Maximum 7(a) rates with prime at 6.75%"
          head={["Loan size", "Variable cap", "Fixed cap"]}
          numeric={[1, 2]}
          rows={[
            ["$25,000 or less", "13.25% (prime + 6.5)", "14.75% (prime + 8)"],
            ["$25,001 to $50,000", "13.25% (prime + 6.5)", "13.75% (prime + 7)"],
            ["$50,001 to $250,000", "12.75% (prime + 6)", "12.75% (prime + 6)"],
            ["$250,001 to $350,000", "11.25% (prime + 4.5)", "11.75% (prime + 5)"],
            ["Over $350,000", "9.75% (prime + 3)", "11.75% (prime + 5)"],
          ]}
        />
        <p>
          With a variable rate, the payment changes when prime does. The calculator holds the rate you enter for the whole term; try a higher rate to see what a rise in prime
          would do.
        </p>
      </GuideSection>

      <GuideSection id="sba-fees" n={8} kicker="SBA 7(a)" title="SBA guaranty fees for 2026–27">
        <p>
          The SBA charges the lender an upfront guaranty fee, which the lender usually passes on to you. For loans approved from October 1, 2026 to September 30, 2027, with a
          term over 12 months, the fee is a share of the guaranteed part of the loan:
        </p>
        <DataTable
          caption="Upfront guaranty fee, term over 12 months"
          head={["Loan", "Guaranteed part", "Fee rate", "Fee"]}
          numeric={[1, 2, 3]}
          rows={[
            ["$100,000", "$85,000", "2%", "$1,700"],
            ["$150,000", "$127,500", "2%", "$2,550"],
            ["$250,000", "$187,500", "3%", "$5,625"],
            ["$500,000", "$375,000", "3%", "$11,250"],
            ["$1,000,000", "$750,000", "3.5%", "$26,250"],
            ["$2,000,000", "$1,500,000", "3.5% / 3.75%", "$53,750"],
            ["$5,000,000", "$3,750,000", "3.5% / 3.75%", "$138,125"],
          ]}
        />
        <p>
          Loans of 12 months or less pay 0.25% of the guaranteed part. Loans of $700,000 or less to manufacturers, food supply chain businesses and businesses in rural areas pay
          no upfront fee, and SBA Express loans to veteran-owned businesses pay none. The lender also pays the SBA a yearly service fee of 0.55% of the guaranteed balance, which
          it may not charge to you. These tiers are the same as for fiscal year 2026.
        </p>
      </GuideSection>

      <GuideSection id="sba-example" n={9} kicker="Worked example" title="An SBA 7(a) example">
        <WorkedExample
          title="$500,000 variable-rate 7(a) loan at the 9.75% cap over 10 years"
          steps={[
            { label: "SBA guarantee", note: "75% of $500,000", value: "$375,000" },
            { label: "Guaranty fee", note: "3% of the guaranteed part", value: "$11,250" },
            { label: "Loan with the fee added", value: "$511,250" },
            { label: "Monthly payment", note: "120 payments at 9.75%", value: "$6,685.63" },
            { label: "Total interest", value: "$291,025" },
          ]}
          total={{ label: "APR including the fee", value: "10.28%" }}
        />
        <p>
          A $1,000,000 real estate loan at 9.75% over 25 years has a $26,250 fee, a payment of $9,145.30 with the fee added, and an APR of about 10.08%: the longer term spreads
          the fee more thinly.
        </p>
      </GuideSection>

      <GuideSection id="sba-terms" n={10} kicker="SBA 7(a)" title="SBA terms, collateral and guarantees">
        <ul>
          <li>
            <strong>Term:</strong> generally up to 10 years for working capital, inventory and equipment, and up to 25 years for real estate.
          </li>
          <li>
            <strong>Collateral:</strong> lenders take available business assets, and may take personal real estate, but a loan is not declined only for lack of collateral.
          </li>
          <li>
            <strong>Personal guarantee:</strong> every owner of 20% or more must guarantee the loan in full.
          </li>
          <li>
            <strong>Prepayment:</strong> loans of 15 years or more carry a fee if you prepay a large part in the first three years (5%, 3%, then 1% of the prepaid amount).
          </li>
          <li>
            <strong>Equity injection:</strong> lenders usually want you to put in money of your own, often about 10% for a business purchase or startup.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="504" n={11} kicker="SBA 504" title="SBA 504 loans">
        <p>
          The 504 program finances buildings, land and long-lived equipment at long fixed rates. A typical project is split three ways:
        </p>
        <CompareCards
          columns={[
            { name: "Bank", rows: [{ label: "Share", value: "about 50%" }, { label: "Security", value: "first lien" }] },
            { name: "CDC / SBA", rows: [{ label: "Share", value: "about 40%" }, { label: "Rate", value: "fixed, 10, 20 or 25 years" }] },
            { name: "You", rows: [{ label: "Share", value: "about 10%" }, { label: "More for", value: "startups and special-use buildings" }] },
          ]}
        />
        <p>
          The Certified Development Company&rsquo;s part is funded by SBA-guaranteed debentures sold to investors, up to $5 million per business ($5.5 million for manufacturers and
          certain energy projects). 504 loans cannot be used for working capital, inventory or rental real estate. For those, a 7(a) loan is the SBA option.
        </p>
      </GuideSection>

      <GuideSection id="mca" n={12} kicker="Cash advances" title="Merchant cash advances">
        <p>
          A merchant cash advance is not a loan in law: the provider buys a share of your future sales at a discount. You receive a lump sum and repay it, plus a fixed fee, from
          your card sales or bank account, usually each business day or each week. The fee is set by a factor rate, often between about 1.1 and 1.5. Because the cost is fixed,
          paying back sooner does not save you anything, and the faster you repay, the higher the effective yearly rate.
        </p>
      </GuideSection>

      <GuideSection id="factor" n={13} kicker="Cash advances" title="Factor rate to APR">
        <p>
          To compare an advance with a loan, the calculator finds the rate per payment at which the payments repay the cash you received, then multiplies by the number of
          payments in a year (252 business days, or 52 weeks), the same method used for APRs.
        </p>
        <DataTable
          caption="$50,000 advance, payments each business day"
          head={["Factor", "Repay", "Over 6 months", "Over 12 months"]}
          numeric={[1, 2, 3]}
          rows={[
            ["1.15", "$57,500", "56.86%", "28.53%"],
            ["1.20", "$60,000", "74.77%", "37.51%"],
            ["1.30", "$65,000", "109.26%", "54.81%"],
            ["1.40", "$70,000", "142.21%", "71.32%"],
            ["1.50", "$75,000", "173.83%", "87.17%"],
          ]}
        />
        <p>
          Paid off in 3 months instead, the 1.3 advance is about 217% APR, at $1,031.75 each business day. A $1,000 fee taken from the advance raises the 6-month figure from
          109% to about 118%.
        </p>
      </GuideSection>

      <GuideSection id="mca-compare" n={14} kicker="Cash advances" title="A cash advance against a loan">
        <Bars
          format={(n) => "$" + Math.round(n).toLocaleString("en-US")}
          items={[
            { label: "Cash advance, factor 1.3", value: 15_000 },
            { label: "Loan at 12% over 6 months", value: 1_765 },
            { label: "Loan at 11% over 6 months", value: 1_616 },
          ]}
        />
        <p>
          The cost of $50,000 for six months. Advances are fast and easy to get, but they cost many times more than a loan. Using one advance to pay off another (stacking) can trap
          a business in a cycle of daily payments.
        </p>
        <Callout tone="warn" title="Read the contract">
          Check for a confession of judgment clause, personal guarantees, reconciliation rights if sales fall, and default fees. If you can, talk to a bank, a credit union, a
          Community Development Financial Institution or an SBA lender first.
        </Callout>
      </GuideSection>

      <GuideSection id="dscr" n={15} kicker="Lending decisions" title="Debt service coverage">
        <p>
          The debt service coverage ratio (DSCR) is the cash your business generates for paying debt, divided by the debt payments due in a year. Lenders usually measure cash flow
          as net operating income, or EBITDA adjusted for owner pay. A DSCR of 1.0 means every dollar goes on debt; most lenders want at least 1.25.
        </p>
        <WorkedExample
          title="The $500,000 SBA loan above, cash flow of $90,000 a year"
          steps={[
            { label: "Yearly payments", note: "$6,685.63 × 12", value: "$80,228" },
            { label: "Yearly cash flow", value: "$90,000" },
            { label: "Cash flow needed for 1.25×", value: "$100,284" },
          ]}
          total={{ label: "DSCR", value: "1.12×" }}
        />
        <p>
          At 1.12 the loan would be hard to approve. A longer term, a smaller loan or more cash flow would lift the ratio. Enter your figures under More options to check your own.
        </p>
      </GuideSection>

      <GuideSection id="day-count" n={16} kicker="Small print" title="Actual/360 interest">
        <p>
          Many business loans charge interest on an actual/360 basis: each day costs 1/360 of the yearly rate, so a full year costs 365/360 of it. On $250,000 at 9.5%, a full
          year of interest is $24,079.86 on actual/360, against $23,750 on actual/365. Our <a href="/us/loans/simple-interest-calculator">simple interest calculator</a>{" "}shows
          the effect for any sum and dates.
        </p>
      </GuideSection>

      <GuideSection id="disclosure" n={17} kicker="Rules" title="Disclosures and your rights">
        <p>
          The federal Truth in Lending Act does not cover business credit, so lenders need not show an APR. Some states have stepped in: California and New York require many
          commercial financing providers, including cash advance companies, to give an estimated APR and the total cost before you sign, and several other states have similar
          laws. Whatever the law, ask every provider for the total amount you will repay and how long it will take, then put each offer through this calculator.
        </p>
      </GuideSection>

      <GuideSection id="tax" n={18} kicker="Taxes" title="Taxes on business borrowing">
        <p>
          Interest on money borrowed for the business is generally a deductible business expense, and loan fees are usually deducted over the life of the loan. Repaying principal
          is not deductible. Larger businesses face a limit on business interest under section 163(j); most small businesses with average gross receipts under the inflation-adjusted
          threshold are exempt. If you are a sole proprietor, the deduction lowers your self-employment tax as well as income tax; see our{" "}
          <a href="/us/taxes/self-employment-tax">self-employment tax calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="applying" n={19} kicker="Applying" title="Getting ready to apply">
        <ol>
          <li>Two or three years of business tax returns and year-to-date profit and loss statement and balance sheet.</li>
          <li>Personal tax returns and a personal financial statement for each owner of 20% or more.</li>
          <li>A clear use of funds and, for new or growing businesses, a business plan with projections.</li>
          <li>Details of existing business debt, so the lender can work out your DSCR.</li>
          <li>Your business and personal credit reports, checked for errors in advance.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator">
        <p>
          Choose the type of financing. For a term loan, enter the amount, the rate, the term and any origination fee. For an SBA 7(a) loan, the guaranty fee and the rate cap are
          worked out for you; under More options you can switch to a fixed rate, change the prime rate, apply the manufacturer and rural fee waiver, or pay the fee at closing. For
          a cash advance, enter the factor rate and the expected payoff time. Add your yearly cash flow to see the debt service coverage ratio.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["WSJ prime rate (since December 11, 2025)", "6.75%"],
            ["SBA 7(a) maximum loan / SBA Express", "$5 million / $500,000"],
            ["SBA guarantee", "85% up to $150,000, 75% above, 50% Express"],
            ["Guaranty fee (term over 12 months, FY 2027)", "2% / 3% / 3.5% and 3.75%"],
            ["Fee waiver (manufacturers, food supply chain, rural)", "$700,000 or less"],
            ["Lender's yearly service fee (not passed on)", "0.55%"],
            ["SBA 504 debenture limit", "$5 million ($5.5 million manufacturers, energy)"],
            ["Typical minimum DSCR", "1.25"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

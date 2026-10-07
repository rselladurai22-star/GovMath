import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** US mortgage guide. Figures from src/lib/us/mortgage.ts and src/lib/us/loans.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "piti", title: "What goes into the payment" },
  { id: "example", title: "A worked example" },
  { id: "formula", title: "How the payment is worked out" },
  { id: "amortization", title: "Where each payment goes" },
  { id: "rates", title: "How much the rate matters" },
  { id: "rates-2026", title: "Mortgage rates in 2026" },
  { id: "term", title: "15, 20 or 30 years" },
  { id: "down-payment", title: "How big a down payment" },
  { id: "pmi", title: "PMI and how to get rid of it" },
  { id: "property-tax", title: "Property tax" },
  { id: "insurance", title: "Homeowners insurance" },
  { id: "hoa", title: "HOA dues" },
  { id: "escrow", title: "Escrow and why payments change" },
  { id: "extra", title: "Paying extra principal" },
  { id: "loan-types", title: "Conventional, FHA, VA and USDA" },
  { id: "closing", title: "Cash you need at closing" },
  { id: "apr", title: "Interest rate vs APR" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "biweekly", title: "Biweekly payments" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Freddie Mac: Primary Mortgage Market Survey (weekly rates)", href: "https://www.freddiemac.com/pmms" },
  { label: "Freddie Mac: Breaking down PMI", href: "https://myhome.freddiemac.com/buying/breaking-down-pmi" },
  { label: "CFPB: When can I remove private mortgage insurance?", href: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" },
  { label: "CFPB: Interest rate vs APR", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-mortgage-interest-rate-and-an-apr-en-135/" },
  { label: "CFPB: What are closing costs?", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-closing-costs-en-1845/" },
  { label: "CFPB: Buying a house", href: "https://www.consumerfinance.gov/owning-a-home/" },
  { label: "Tax Foundation: How high are property taxes in your state?", href: "https://taxfoundation.org/data/all/property-taxes/how-high-are-property-taxes-in-your-state/" },
];

export default function MortgageGuide() {
  return (
    <Guide
      kicker="The mortgage guide"
      title="How your mortgage payment is built"
      intro={
        <>
          A mortgage payment is more than the loan. Property tax, homeowners insurance, private mortgage insurance and HOA dues often add a quarter or more on top. This guide
          explains each part, how amortization works, what the rate and term do to the total cost, and how to make PMI and interest stop sooner.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>On a {usd(400_000)} home with 10% down at 7.25% over 30 years, principal and interest is {usd(2_456)} a month.</li>
          <li>Add 1% property tax, {usd(1_800)} a year of insurance and 0.5% PMI and the first payment is {usd(3_089)}.</li>
          <li>Over 30 years you would pay {usd(524_100)} in interest, more than the {usd(360_000)} you borrowed.</li>
          <li>Paying {usd(200)} extra a month saves {usd(130_583)} of interest and clears the loan 6 years 4 months sooner.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(3_089), label: "First monthly payment in the example" },
            { value: usd(524_100), label: "Interest over 30 years" },
            { value: "9 yrs 10 mos", label: "Until PMI ends automatically" },
            { value: "about 7.3%", label: "Average 30-year rate, October 1, 2026" },
          ]}
        />
      </GuideSection>

      <GuideSection id="piti" n={2} kicker="Basics" title="What goes into the payment">
        <p>
          Lenders call the monthly payment <strong>PITI</strong>: principal, interest, taxes and insurance. Principal repays what you borrowed. Interest is the lender&rsquo;s charge
          for the loan. Taxes and insurance are usually collected by your servicer each month and paid for you from an escrow account.
        </p>
        <p>Two more costs often sit on top:</p>
        <ul>
          <li>
            <strong>Private mortgage insurance (PMI)</strong>, on a conventional loan with less than 20% down. It protects the lender, not you.
          </li>
          <li>
            <strong>HOA dues</strong>, if the home is in a homeowners association. You usually pay these to the association directly, but lenders count them when deciding what you
            can afford.
          </li>
        </ul>
        <p>
          The calculator shows each part separately, so you can see which costs are fixed for the life of the loan (principal and interest on a fixed-rate mortgage) and which can
          rise (tax, insurance and dues).
        </p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>Here is a typical first-time purchase, using the calculator&rsquo;s default figures.</p>
        <WorkedExample
          title="$400,000 home, 10% down, 7.25% for 30 years"
          steps={[
            { label: "Loan", note: "$400,000 less $40,000 down", value: usd(360_000) },
            { label: "Principal and interest", value: "$2,455.83" },
            { label: "Property tax", note: "1% of the price, $4,000 a year", value: "$333.33" },
            { label: "Homeowners insurance", note: "$1,800 a year", value: "$150.00" },
            { label: "PMI", note: "0.5% of the loan a year", value: "$150.00" },
          ]}
          total={{ label: "First monthly payment", value: "$3,089.17" }}
        />
        <p>
          PMI drops off automatically after 9 years 10 months, when the scheduled balance reaches 78% of the price. From then on the payment is {usd(2_939)}, if tax and insurance
          have not changed. If the home had an HOA charging {usd(250)} a month, the payment would be {usd(3_339)}.
        </p>
      </GuideSection>

      <GuideSection id="formula" n={4} kicker="The maths" title="How the payment is worked out">
        <p>
          A fixed-rate mortgage uses the standard loan formula. With a monthly rate <em>r</em>{" "}(the yearly rate ÷ 12), <em>n</em>{" "}monthly payments and a loan <em>P</em>:
        </p>
        <p>
          <strong>Payment = P × r ÷ (1 − (1 + r)<sup>−n</sup>)</strong>
        </p>
        <p>
          At 7.25%, <em>r</em>{" "}is 0.6042% a month, and a 30-year loan has 360 payments. The formula sets one payment that clears the loan exactly on time. Interest each month is the
          balance times <em>r</em>; whatever is left of the payment reduces the balance. The same formula drives our{" "}
          <a href="/us/loans/loan-calculator">loan calculator</a>{" "}for car and personal loans.
        </p>
      </GuideSection>

      <GuideSection id="amortization" n={5} kicker="Amortization" title="Where each payment goes">
        <p>
          Early payments are mostly interest, because the balance is at its largest. In the example, the first payment of {usd(2_456)} is {usd(2_175)} interest and only $280.83
          principal. Principal does not overtake interest until payment 246, more than 20 years in.
        </p>
        <DataTable
          caption="$360,000 at 7.25% over 30 years: balance at the end of selected years"
          head={["Year", "Balance left", "Repaid so far"]}
          numeric={[1, 2]}
          rows={[
            ["1", usd(356_516), usd(3_484)],
            ["5", usd(339_764), usd(20_236)],
            ["10", usd(310_717), usd(49_283)],
            ["15", usd(269_026), usd(90_974)],
            ["20", usd(209_183), usd(150_817)],
            ["30", "$0", usd(360_000)],
          ]}
        />
        <p>
          In year one you pay {usd(25_986)} of interest and only {usd(3_484)} of principal. This is why selling or refinancing in the first few years leaves you with little equity
          beyond your down payment and any rise in the home&rsquo;s value.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={6} kicker="Rates" title="How much the rate matters">
        <p>Small differences in the rate change both the payment and the lifetime interest a lot. On a {usd(360_000)} loan over 30 years:</p>
        <DataTable
          head={["Rate", "Principal and interest", "Total interest"]}
          numeric={[1, 2]}
          rows={[
            ["5.5%", "$2,044", usd(375_855)],
            ["6.0%", "$2,158", usd(417_017)],
            ["6.5%", "$2,275", usd(459_160)],
            ["7.0%", "$2,395", usd(502_232)],
            ["7.25%", "$2,456", usd(524_100)],
            ["7.5%", "$2,517", usd(546_182)],
            ["8.0%", "$2,642", usd(590_959)],
          ]}
        />
        <p>
          Each half point is worth about {usd(120)} a month on this loan, and over {usd(40_000)} of interest over 30 years. Shopping around with three or more lenders and comparing
          Loan Estimates on the same day is one of the cheapest ways to save.
        </p>
      </GuideSection>

      <GuideSection id="rates-2026" n={7} kicker="Context" title="Mortgage rates in 2026">
        <p>
          Freddie Mac&rsquo;s Primary Mortgage Market Survey put the average 30-year fixed rate at about 7.3% on October 1, 2026, up from about 6.3% a year earlier. The 15-year
          average was about 6.6%. These are averages for borrowers with strong credit and around 20% down; your rate depends on your credit score, down payment, loan type and
          whether you pay points.
        </p>
        <Callout title="Rates change every week">
          Use the rate on a Loan Estimate if you have one. A rate lock fixes it for a set period, often 30 to 60 days, while your purchase closes.
        </Callout>
      </GuideSection>

      <GuideSection id="term" n={8} kicker="Term" title="15, 20 or 30 years">
        <p>A shorter loan costs more each month but far less overall, and 15-year loans usually come with a lower rate too.</p>
        <CompareCards
          columns={[
            {
              name: "15 years at 6.6%",
              rows: [
                { label: "Principal and interest", value: "$3,156" },
                { label: "Total interest", value: usd(208_046) },
                { label: "PMI lasts", value: "3 years 1 month" },
              ],
            },
            {
              name: "20 years at 7.25%",
              rows: [
                { label: "Principal and interest", value: "$2,845" },
                { label: "Total interest", value: usd(322_885) },
                { label: "PMI lasts", value: "5 years" },
              ],
            },
            {
              name: "30 years at 7.25%",
              rows: [
                { label: "Principal and interest", value: "$2,456" },
                { label: "Total interest", value: usd(524_100) },
                { label: "PMI lasts", value: "9 years 10 months" },
              ],
            },
          ]}
        />
        <p>
          The 15-year loan costs {usd(700)} more a month than the 30-year but saves about {usd(316_000)} of interest. A middle path is to take the 30-year loan for its lower
          required payment and pay extra when you can, which keeps flexibility if money gets tight.
        </p>
      </GuideSection>

      <GuideSection id="down-payment" n={9} kicker="Down payment" title="How big a down payment">
        <p>You do not need 20% down. Many conventional loans accept 3% to 5%, and FHA loans 3.5%. But a bigger down payment shrinks the loan, the payment and PMI.</p>
        <DataTable
          caption="$400,000 home at 7.25% over 30 years, 1% tax, $1,800 insurance, 0.5% PMI"
          head={["Down payment", "Loan", "First payment", "PMI months", "Total PMI"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["3.5%", usd(386_000), "$3,277", "152", usd(24_447)],
            ["5%", usd(380_000), "$3,234", "145", usd(22_958)],
            ["10%", usd(360_000), "$3,089", "118", usd(17_700)],
            ["15%", usd(340_000), "$2,944", "82", usd(11_617)],
            ["20%", usd(320_000), "$2,666", "0", "$0"]
          ]}
        />
        <p>
          Going from 10% to 20% down saves {usd(423)} a month at the start. Keep enough cash for closing costs, moving and an emergency fund, though: an empty savings account the
          day you get the keys is a risk of its own. Our <a href="/us/housing/mortgage-affordability">home affordability calculator</a>{" "}shows how the down payment changes the price
          you can buy at.
        </p>
      </GuideSection>

      <GuideSection id="pmi" n={10} kicker="PMI" title="PMI and how to get rid of it">
        <p>
          PMI is charged on conventional loans when the loan is more than 80% of the home&rsquo;s value. Freddie Mac puts the usual cost at about $30 to $70 a month for every{" "}
          {usd(100_000)} borrowed, roughly 0.35% to 0.85% of the loan a year. Better credit and a bigger down payment push it toward the low end.
        </p>
        <p>Under the Homeowners Protection Act, as the CFPB explains, PMI on most conventional loans made since 1999 stops in one of three ways:</p>
        <ul>
          <li>
            <strong>You ask</strong>{" "}once the balance reaches 80% of the original value (the lower of the price or appraisal). You need a good payment record and the lender may want
            proof the value has not fallen.
          </li>
          <li>
            <strong>It ends automatically</strong>{" "}when the original schedule reaches 78%, if you are up to date.
          </li>
          <li>
            <strong>It must end at the loan&rsquo;s midpoint</strong>, year 15 on a 30-year loan, even if neither has happened.
          </li>
        </ul>
        <p>
          In the example, you could ask to cancel after 8 years 8 months; with {usd(200)} a month extra, after 5 years 8 months. Extra payments do not move the automatic 78% date,
          which follows the original schedule, so put the request in writing.
        </p>
      </GuideSection>

      <GuideSection id="property-tax" n={11} kicker="Taxes" title="Property tax">
        <p>
          Property tax is set by your county, city and school district, as a share of the assessed value. Nationally it averages about 1% of a home&rsquo;s value a year. The Tax
          Foundation&rsquo;s latest state ranking runs from about 0.3% in Hawaii to about 2.2% in New Jersey, with Illinois and New Hampshire also above 2%.
        </p>
        <Bars
          format={(n) => `${n.toFixed(2)}%`}
          items={[
            { label: "New Jersey", value: 2.21 },
            { label: "Illinois", value: 2.05 },
            { label: "New Hampshire", value: 2.03 },
            { label: "Wyoming", value: 0.55 },
            { label: "Louisiana", value: 0.52 },
            { label: "Alabama", value: 0.4 },
            { label: "Hawaii", value: 0.3 },
          ]}
        />
        <p>
          The tax is often reassessed after a sale, so the seller&rsquo;s bill can understate yours. Check the county assessor&rsquo;s site, and ask about homestead exemptions,
          which lower the taxable value of a main home in many states.
        </p>
      </GuideSection>

      <GuideSection id="insurance" n={12} kicker="Insurance" title="Homeowners insurance">
        <p>
          Lenders require homeowners insurance that covers the cost of rebuilding. Premiums depend heavily on location: areas exposed to hurricanes, hail or wildfire cost far more,
          and premiums in those areas have risen quickly in recent years. Flood damage is not covered by a standard policy; in a flood zone your lender will require separate flood
          insurance.
        </p>
        <p>Get a real quote before you make an offer, and enter it in the calculator. A few hundred dollars a year can change what you can afford.</p>
      </GuideSection>

      <GuideSection id="hoa" n={13} kicker="HOA" title="HOA dues">
        <p>
          Condos, townhomes and many newer subdivisions charge HOA dues for shared upkeep, amenities and sometimes some utilities or insurance. Lenders count them in your
          debt-to-income ratio. Ask for the association&rsquo;s budget and reserve study: a thin reserve fund can mean a special assessment, a one-off bill to owners, later on.
        </p>
      </GuideSection>

      <GuideSection id="escrow" n={14} kicker="Escrow" title="Escrow and why payments change">
        <p>
          Your servicer collects one-twelfth of the yearly tax and insurance bills each month and pays them when due. Once a year it runs an escrow analysis. If the bills went up, your
          payment rises and you may be asked to make up a shortage; if they went down, you may get a refund of the surplus.
        </p>
        <p>So even on a fixed-rate loan, your total payment usually creeps up over time. Only the principal and interest part is truly fixed.</p>
      </GuideSection>

      <GuideSection id="extra" n={15} kicker="Paying extra" title="Paying extra principal">
        <p>
          Every extra dollar goes straight to principal, which cuts the interest charged in every month that follows. On the {usd(360_000)} example loan:
        </p>
        <DataTable
          head={["Extra each month", "Interest saved", "Paid off sooner"]}
          numeric={[1, 2]}
          rows={[
            ["$100", usd(76_309), "3 years 7 months"],
            ["$200", usd(130_583), "6 years 4 months"],
            ["$500", usd(230_870), "11 years 7 months"],
          ]}
        />
        <p>
          Before paying extra, check that you have an emergency fund, that higher-rate debts such as credit cards are cleared, and that you are getting any employer 401(k) match.
          Money in your home is hard to get back without selling or borrowing.
        </p>
      </GuideSection>

      <GuideSection id="loan-types" n={16} kicker="Loan types" title="Conventional, FHA, VA and USDA">
        <ul>
          <li>
            <strong>Conventional</strong>{" "}loans follow Fannie Mae and Freddie Mac rules. PMI applies below 20% down and can be cancelled.
          </li>
          <li>
            <strong>FHA</strong>{" "}loans allow 3.5% down with lower credit scores, but charge an upfront and an annual mortgage insurance premium instead of PMI, often for the life of
            the loan.
          </li>
          <li>
            <strong>VA</strong>{" "}loans, for eligible service members and veterans, need no down payment and no monthly mortgage insurance, but most borrowers pay a one-time funding
            fee.
          </li>
          <li>
            <strong>USDA</strong>{" "}loans cover eligible rural areas with no down payment and an annual guarantee fee.
          </li>
        </ul>
        <p>For FHA, VA or USDA loans, enter their yearly fee as the PMI rate to get a close estimate.</p>
      </GuideSection>

      <GuideSection id="closing" n={17} kicker="Closing" title="Cash you need at closing">
        <p>
          On top of the down payment you pay closing costs: lender fees, appraisal, title insurance, recording and transfer taxes, plus prepaid interest and the first deposits into
          escrow. These often come to several thousand dollars and can be negotiated in part, for example as a seller credit. Your Loan Estimate lists them; the CFPB&rsquo;s
          closing cost guide explains each line.
        </p>
      </GuideSection>

      <GuideSection id="apr" n={18} kicker="APR" title="Interest rate vs APR">
        <p>
          The interest rate sets your payment. The APR adds lender fees and points, spread over the loan, so it is higher. Use the APR to compare offers with different fees, and the
          rate to work out the payment. Points are prepaid interest: one point costs 1% of the loan and usually lowers the rate a little. Points pay off only if you keep the loan
          long enough, and many people refinance or move first. Our <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}uses the same break-even logic.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Budgeting on principal and interest only, then finding the escrow payment is hundreds more.</li>
          <li>Using the seller&rsquo;s old property tax bill instead of the tax after reassessment.</li>
          <li>Forgetting that PMI does not cancel itself at 80%: you have to ask.</li>
          <li>Stretching to the lender&rsquo;s maximum and leaving no room for repairs (a common rule of thumb is to set aside about 1% of the home&rsquo;s value a year).</li>
          <li>Comparing offers on rate alone instead of the APR and the fees on the Loan Estimate.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price and down payment, as dollars or a percent.</li>
          <li>Use a real rate quote and pick the term.</li>
          <li>Under More options, enter the property tax (as a rate or a dollar figure), an insurance quote, HOA dues and your PMI rate.</li>
          <li>Try an extra monthly payment to see the interest saved and the new payoff date.</li>
          <li>Copy the link to share the exact figures with a partner or loan officer.</li>
        </ol>
        <p>
          Renting for now? Our <a href="/us/housing/rent-affordability">rent affordability calculator</a>{" "}shows what rent fits your income, and the{" "}
          <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows your ratios as a lender sees them.
        </p>
      </GuideSection>

      <GuideSection id="biweekly" n={21} kicker="Paying extra" title="Biweekly payments">
        <p>
          Some lenders and services offer biweekly payments: half the monthly payment every two weeks. Because a year has 52 weeks, that makes 26 half-payments, or 13 full
          payments instead of 12. The effect is the same as adding one-twelfth of a payment each month.
        </p>
        <p>
          On the example loan, one-twelfth of the {usd(2_456)} payment is about {usd(205)}. Adding that each month pays the loan off in 283 months, 6 years 5 months early, and
          saves {usd(132_742)} of interest. You can get the same result yourself with an extra monthly payment, without paying a fee to a third-party biweekly service.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Average 30-year fixed rate (Freddie Mac, October 1, 2026)", "about 7.3%"],
            ["Average 15-year fixed rate (same week)", "about 6.6%"],
            ["PMI cost (Freddie Mac)", "about $30 to $70 a month per $100,000"],
            ["Ask to cancel PMI", "80% of original value"],
            ["PMI ends automatically", "78% on the original schedule"],
            ["Typical property tax", "about 1% of value a year"],
            ["Minimum down payment", "3% to 5% conventional, 3.5% FHA, 0% VA and USDA"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** How much house can I afford: the guide. Figures from src/lib/us/mortgage.ts (affordability). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "dti", title: "Debt-to-income ratios" },
  { id: "rule", title: "The 28/36 rule" },
  { id: "example", title: "A worked example" },
  { id: "binds", title: "Which limit binds" },
  { id: "limits", title: "28/36, 43% and FHA limits" },
  { id: "income", title: "Price by income" },
  { id: "rate", title: "What the rate does" },
  { id: "down", title: "What a bigger down payment does" },
  { id: "debts", title: "Paying off debt first" },
  { id: "tax-hoa", title: "Property tax, insurance and HOA" },
  { id: "term", title: "15-year vs 30-year" },
  { id: "income-counts", title: "What counts as income" },
  { id: "debts-count", title: "What counts as debt" },
  { id: "take-home", title: "Approved vs comfortable" },
  { id: "cash", title: "Cash beyond the down payment" },
  { id: "credit", title: "Credit score and approval" },
  { id: "steps", title: "Steps before you shop" },
  { id: "using", title: "Using the calculator well" },
  { id: "two-incomes", title: "Two incomes and co-borrowers" },
  { id: "self-employed", title: "If you are self-employed" },
  { id: "student-loans", title: "Student loans and your ratios" },
  { id: "after", title: "Costs that rise after you buy" },
  { id: "rent-vs-buy", title: "Renting while you save" },
  { id: "preapproval", title: "Prequalification vs preapproval" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What is a debt-to-income ratio?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/" },
  { label: "Fannie Mae Selling Guide B3-6-02: Debt-to-income ratios", href: "https://selling-guide.fanniemae.com/sel/b3-6-02/debt-income-ratios" },
  { label: "HUD: Single Family Housing Policy Handbook 4000.1 (overview)", href: "https://www.hud.gov/sites/dfiles/SFH/documents/Handbook-4000-1-Overview.pdf" },
  { label: "Freddie Mac: Primary Mortgage Market Survey", href: "https://www.freddiemac.com/pmms" },
  { label: "Freddie Mac: Breaking down PMI", href: "https://myhome.freddiemac.com/buying/breaking-down-pmi" },
  { label: "HUD Mortgagee Letter 2023-05: FHA annual mortgage insurance premium", href: "https://archives.hud.gov/news/2024/2023-05hsgml.pdf" },
  { label: "CFPB: Buying a house", href: "https://www.consumerfinance.gov/owning-a-home/" },
];

export default function AffordGuide() {
  return (
    <Guide
      kicker="The home affordability guide"
      title="How much house can you afford?"
      intro={
        <>
          Lenders decide how much you can borrow mainly from your debt-to-income ratios: how much of your gross monthly income would go on the mortgage, and on all your debts
          together. This guide explains the 28/36 rule, the higher limits some loans allow, and how income, rates, down payment and debts move the price you can buy at.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>The classic rule: housing costs up to 28% of gross income, and all debts up to 36%.</li>
          <li>On {usd(100_000)} a year with {usd(500)} of other debts and {usd(40_000)} down at 7.25%, that buys a home of about {usd(306_360)}.</li>
          <li>FHA&rsquo;s standard 31/43 limits raise that to about {usd(337_333)}.</li>
          <li>A lower rate, a bigger down payment or fewer debts all raise the price; property tax and HOA dues lower it.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(306_360), label: "Price on $100,000 a year at 28/36" },
            { value: usd(2_333), label: "Monthly payment at that price" },
            { value: "28% / 36%", label: "Classic housing and all-debts limits" },
            { value: "about 3.1×", label: "Price to income in the example" },
          ]}
        />
      </GuideSection>

      <GuideSection id="dti" n={2} kicker="Basics" title="Debt-to-income ratios">
        <p>Lenders use two ratios, both against your gross (before-tax) monthly income:</p>
        <ul>
          <li>
            <strong>Front-end ratio:</strong>{" "}the full housing payment (principal, interest, property tax, insurance, mortgage insurance and HOA dues) divided by gross income.
          </li>
          <li>
            <strong>Back-end ratio:</strong>{" "}the housing payment plus every other monthly debt payment, divided by gross income.
          </li>
        </ul>
        <p>
          The CFPB explains these ratios in plain terms. Our <a href="/us/loans/debt-to-income-ratio">debt-to-income ratio calculator</a>{" "}works out your current ratios.
        </p>
      </GuideSection>

      <GuideSection id="rule" n={3} kicker="The rule" title="The 28/36 rule">
        <p>
          The 28/36 rule is the long-standing guideline: spend no more than 28% of gross income on housing, and no more than 36% on all debts including housing. It is not a law, and
          many loans allow more, but it is a sensible place to start because it leaves room for taxes, saving and everyday costs.
        </p>
        <p>On {usd(100_000)} a year, gross income is {usd(8_333)} a month. 28% of that is {usd(2_333)}; 36% is {usd(3_000)}.</p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$100,000 income, $500 debts, $40,000 down, 7.25% for 30 years"
          steps={[
            { label: "Housing limit", note: "28% of $8,333", value: usd(2_333) },
            { label: "All-debts room", note: "36% of $8,333, less $500 of debts", value: usd(2_500) },
            { label: "Lower limit sets the payment", note: "Housing", value: usd(2_333) },
            { label: "Of which principal and interest", value: "$1,817" },
            { label: "Property tax (1%), insurance, PMI", value: "$516" },
            { label: "Loan that payment supports", value: usd(266_360) },
          ]}
          total={{ label: "Home price with $40,000 down", value: usd(306_360) }}
        />
        <p>
          The calculator finds the highest price whose full payment fits both limits. Because property tax and PMI grow with the price, it searches rather than working backward
          from a single formula.
        </p>
      </GuideSection>

      <GuideSection id="binds" n={5} kicker="Limits" title="Which limit binds">
        <p>
          Only one limit decides your price: whichever leaves the smaller housing payment. With few debts, the housing limit binds. Once other debts pass 8% of gross income (the gap
          between 28% and 36%), the all-debts limit takes over.
        </p>
        <p>
          In the example, raising other debts from {usd(500)} to {usd(1_000)} a month cuts the all-debts room to {usd(2_000)}. That limit now binds and the price falls to{" "}
          {usd(265_064)}, {usd(41_296)} less.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={6} kicker="Limits" title="28/36, 43% and FHA limits">
        <CompareCards
          columns={[
            {
              name: "28/36",
              rows: [
                { label: "Who uses it", value: "Classic guideline" },
                { label: "Example price", value: usd(306_360) },
              ],
            },
            {
              name: "28/43",
              rows: [
                { label: "Who uses it", value: "A common upper limit" },
                { label: "Example price", value: usd(306_360) },
              ],
            },
            {
              name: "31/43",
              rows: [
                { label: "Who uses it", value: "FHA standard limits" },
                { label: "Example price", value: usd(337_333) },
              ],
            },
          ]}
        />
        <p>
          In the example, 28/43 gives the same price as 28/36 because the 28% housing limit binds either way. A higher all-debts limit only helps if you carry a lot of other debt.
        </p>
        <p>
          Fannie Mae&rsquo;s Selling Guide sets a 36% maximum for manually underwritten loans, up to 45% with strong credit and reserves, and up to 50% for loans approved through its
          Desktop Underwriter system. FHA loans start from 31% and 43% under HUD&rsquo;s handbook, and allow more with compensating factors such as cash reserves. Being allowed 50%
          is not the same as being comfortable at 50%.
        </p>
      </GuideSection>

      <GuideSection id="income" n={7} kicker="Income" title="Price by income">
        <p>At 28/36, with {usd(500)} of other debts, {usd(40_000)} down and 7.25% over 30 years:</p>
        <DataTable
          head={["Income a year", "Home price", "Monthly payment", "Limit that binds"]}
          numeric={[1, 2]}
          rows={[
            [usd(60_000), usd(185_872), usd(1_300), "All debts"],
            [usd(80_000), usd(248_546), usd(1_867), "Housing"],
            [usd(100_000), usd(306_360), usd(2_333), "Housing"],
            [usd(150_000), usd(450_897), usd(3_500), "Housing"],
            [usd(200_000), usd(595_434), usd(4_667), "Housing"],
          ]}
        />
        <p>
          At {usd(60_000)}, the {usd(500)} of debts is 10% of income, so the all-debts limit binds and leaves {usd(1_300)} for housing instead of {usd(1_400)}.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={8} kicker="Rates" title="What the rate does">
        <p>
          The same payment buys less house when rates rise. Freddie Mac&rsquo;s survey put the average 30-year rate at about 7.3% on October 1, 2026. On {usd(100_000)} a year:
        </p>
        <Bars
          format={usd}
          items={[
            { label: "6.0%", value: 336_736 },
            { label: "6.5%", value: 323_990 },
            { label: "7.0%", value: 312_048 },
            { label: "7.25%", value: 306_360 },
            { label: "7.5%", value: 300_854 },
            { label: "8.0%", value: 290_360 },
          ]}
        />
        <p>Each half point costs about {usd(10_500)} to {usd(13_000)} of buying power here. A better credit score, which earns a lower rate, is worth real money.</p>
      </GuideSection>

      <GuideSection id="down" n={9} kicker="Down payment" title="What a bigger down payment does">
        <DataTable
          caption="$100,000 income, $500 debts, 7.25% for 30 years"
          head={["Down payment", "Home price", "Loan"]}
          numeric={[1, 2]}
          rows={[
            [usd(20_000), usd(288_425), usd(268_425)],
            [usd(40_000), usd(306_360), usd(266_360)],
            [usd(60_000), usd(324_296), usd(264_296)],
            [usd(80_000), usd(356_504), usd(276_504)],
            [usd(100_000), usd(374_327), usd(274_327)],
          ]}
        />
        <p>
          Each extra {usd(20_000)} down adds about {usd(18_000)} to the price, because property tax rises with the price. The jump from {usd(60_000)} to {usd(80_000)} is bigger,{" "}
          {usd(32_208)}, because 20% down removes PMI and frees that money for the loan.
        </p>
      </GuideSection>

      <GuideSection id="debts" n={10} kicker="Debts" title="Paying off debt first">
        <p>
          If the all-debts limit binds, every dollar of monthly debt you clear adds a dollar of housing payment. In the example with {usd(1_000)} of debts, clearing them raises the price
          from {usd(265_064)} to {usd(306_360)}. Paying off a small car loan or card balance before applying can be worth more than saving the same cash for the down payment. Our{" "}
          <a href="/us/loans/debt-payoff-calculator">debt payoff calculator</a>{" "}helps plan it.
        </p>
      </GuideSection>

      <GuideSection id="tax-hoa" n={11} kicker="Running costs" title="Property tax, insurance and HOA">
        <p>
          Costs that do not repay the loan still count in the payment. Doubling the property tax rate from 1% to 2% cuts the example price from {usd(306_360)} to {usd(277_691)}. A{" "}
          {usd(300)} monthly HOA fee cuts it to {usd(269_194)}. Two similar homes in neighboring towns can be very different purchases once tax and dues are counted.
        </p>
      </GuideSection>

      <GuideSection id="term" n={12} kicker="Term" title="15-year vs 30-year">
        <p>
          A 15-year loan builds equity fast and costs far less interest, but the higher payment buys less house. At about 6.6% over 15 years, the example price is {usd(254_653)},
          compared with {usd(306_360)} on a 30-year loan at 7.25%.
        </p>
      </GuideSection>

      <GuideSection id="income-counts" n={13} kicker="Income" title="What counts as income">
        <p>
          Lenders use stable, documented income, usually with a two-year history: salary and wages, regular overtime and bonuses, self-employment income after expenses (from your
          tax returns), Social Security, pensions, alimony and child support you receive. Income from a new job or side gig may count only partly, or not until it has a track
          record.
        </p>
      </GuideSection>

      <GuideSection id="debts-count" n={14} kicker="Debts" title="What counts as debt">
        <ul>
          <li>Car, student and personal loan payments, including deferred student loans (lenders use a set payment).</li>
          <li>Minimum credit card payments, even if you pay in full each month.</li>
          <li>Child support and alimony you pay.</li>
          <li>Not counted: rent you will stop paying, utilities, phone, insurance and groceries.</li>
        </ul>
      </GuideSection>

      <GuideSection id="take-home" n={15} kicker="Comfort" title="Approved vs comfortable">
        <p>
          Ratios use gross pay, but you live on take-home pay. On {usd(100_000)} a year, federal tax, Social Security, Medicare, state tax and retirement savings take a large
          share. Check the payment against your real paycheck with our <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>, and remember repairs, utilities and
          furnishing a bigger home.
        </p>
        <Callout tone="warn" title="Leave a margin">
          If the payment would use most of what is left after essentials, pick a lower price than the maximum, or wait and save a larger down payment.
        </Callout>
      </GuideSection>

      <GuideSection id="cash" n={16} kicker="Cash" title="Cash beyond the down payment">
        <p>
          You also need closing costs, often several thousand dollars, plus moving, any immediate repairs and an emergency fund. Some lenders want reserves of a few months&rsquo;
          payments left in the bank after closing. Do not put every dollar into the down payment.
        </p>
      </GuideSection>

      <GuideSection id="credit" n={17} kicker="Credit" title="Credit score and approval">
        <p>
          Your credit score sets your rate and PMI cost, and can decide which loan programs you qualify for. FHA loans accept lower scores. Before applying, check your credit
          reports for errors, keep card balances low, and avoid opening new credit.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={18} kicker="Next steps" title="Steps before you shop">
        <ol>
          <li>Work out your price range here, then check the payment against your take-home pay.</li>
          <li>Get preapproved by two or three lenders and compare Loan Estimates.</li>
          <li>Look up property tax and HOA dues for each home you like.</li>
          <li>Use our <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}on a specific listing.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator well">
        <p>
          Enter household income before tax, every monthly debt payment and your down payment. Use a real rate quote. Under More options, choose 28/36, 28/43, FHA&rsquo;s 31/43 or
          your own limits, and enter local property tax, insurance and HOA dues. The results show each rule side by side and what a bigger down payment would change.
        </p>
      </GuideSection>

      <GuideSection id="two-incomes" n={20} kicker="Households" title="Two incomes and co-borrowers">
        <p>
          When two people apply together, lenders add both incomes and both sets of debts. That usually raises the price you can afford, but both borrowers are fully responsible
          for the whole loan, and both credit histories count. Some lenders price the loan from the lower of the two middle credit scores, so one weaker score can raise the rate
          for both of you.
        </p>
        <p>
          If only one of you will be on the loan, enter only that person&rsquo;s income and debts. Income from a partner who is not on the loan does not count toward the ratios,
          even if they will help with the payment.
        </p>
      </GuideSection>

      <GuideSection id="self-employed" n={21} kicker="Income" title="If you are self-employed">
        <p>
          Lenders usually average the last two years of self-employment income from your tax returns, after business expenses. Writing off a lot of expenses lowers your tax bill,
          but it also lowers the income a lender can use. If your income is rising, the two-year average can understate what you earn now; if it is falling, lenders may use the
          lower recent year. Enter the figure from your returns rather than your gross sales.
        </p>
      </GuideSection>

      <GuideSection id="student-loans" n={22} kicker="Debts" title="Student loans and your ratios">
        <p>
          Student loan payments count as debt even when they are deferred or in forbearance. Rules differ by loan program: some lenders use your actual income-driven payment, and
          others use a set share of the balance when the payment shown is zero. A large balance on a low income-driven payment can therefore count for more than you pay. Ask each
          lender how it treats your loans, and enter the figure it will use. Our <a href="/us/loans/student-loan-calculator">student loan calculator</a>{" "}shows the standard payment.
        </p>
      </GuideSection>

      <GuideSection id="after" n={23} kicker="Planning" title="Costs that rise after you buy">
        <p>
          A fixed-rate mortgage keeps principal and interest the same, but the rest of the payment tends to rise. Property tax is often reassessed after a sale and can climb as
          values rise. Insurance premiums have been rising quickly in many states. HOA dues can go up, and special assessments can arrive with little warning. Build in room for
          these increases rather than buying at the very top of your range.
        </p>
        <p>
          Owning also brings costs a landlord used to cover: a new roof, a water heater, appliances, lawn care and pest control. Many owners set aside a little each month in a
          separate account so a repair does not go on a credit card.
        </p>
      </GuideSection>

      <GuideSection id="rent-vs-buy" n={24} kicker="Options" title="Renting while you save">
        <p>
          If the price you can afford does not match the homes you want, renting for another year or two while you pay down debt and build a bigger down payment can change the
          numbers a lot. In the example, adding {usd(40_000)} to the down payment and clearing {usd(500)} of monthly debts would both raise your budget. Our{" "}
          <a href="/us/housing/rent-affordability">rent affordability calculator</a>{" "}shows what rent fits while you save.
        </p>
        <p>
          State and local first-time buyer programs can also help with the down payment or closing costs, often as a grant or a low-cost second loan. Your state housing finance
          agency lists what is available.
        </p>
      </GuideSection>

      <GuideSection id="preapproval" n={25} kicker="Lenders" title="Prequalification vs preapproval">
        <p>
          A prequalification is a quick estimate from figures you give the lender, much like this calculator. A preapproval goes further: the lender checks your credit and
          documents such as pay stubs, W-2s, bank statements and tax returns, and states how much it is willing to lend. Sellers take preapproved buyers more seriously, and the
          process often reveals problems early, such as an error on a credit report or a debt you forgot to count.
        </p>
        <p>
          A preapproval is not a final approval. The lender will still appraise the home and recheck your income and credit before closing, so avoid new debt, large unexplained
          deposits and job changes until the keys are in your hand.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={26} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Classic guideline", "28% housing, 36% all debts"],
            ["FHA standard limits", "31% housing, 43% all debts"],
            ["Fannie Mae maximum", "36% manual (45% with conditions), 50% automated"],
            ["Average 30-year rate (October 1, 2026)", "about 7.3%"],
            ["PMI ends", "At 20% to 22% equity"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

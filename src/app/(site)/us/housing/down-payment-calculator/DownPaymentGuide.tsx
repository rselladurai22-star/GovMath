import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Down payment guide. Figures from downPaymentOptions(), monthsToSave() and monthlyToSave() in src/lib/us/home-buying.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "minimums", title: "Minimum down payments by loan type" },
  { id: "amounts", title: "What each percentage costs" },
  { id: "example", title: "A worked example" },
  { id: "compare", title: "All five options compared" },
  { id: "pmi", title: "PMI: the price of less than 20%" },
  { id: "fha", title: "FHA's 3.5% option" },
  { id: "cash-to-close", title: "Cash to close" },
  { id: "saving-time", title: "How long it takes to save" },
  { id: "monthly-target", title: "Saving to a deadline" },
  { id: "where", title: "Where to keep the money" },
  { id: "sources-of-money", title: "Gifts, assistance and retirement accounts" },
  { id: "twenty-or-less", title: "Wait for 20% or buy sooner?" },
  { id: "reserves", title: "Keep a cushion" },
  { id: "jumbo", title: "Conforming limits and jumbo loans" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Freddie Mac: Budgeting for upfront homebuying costs", href: "https://myhome.freddiemac.com/blog/homebuying/budgeting-upfront-homebuying-costs" },
  { label: "Freddie Mac: Breaking down PMI", href: "https://myhome.freddiemac.com/buying/breaking-down-pmi" },
  { label: "Freddie Mac: Home Possible (3% down)", href: "https://sf.freddiemac.com/working-with-us/origination-underwriting/mortgage-products/home-possible" },
  { label: "HUD Mortgagee Letter 2023-05: FHA mortgage insurance premiums", href: "https://archives.hud.gov/news/2024/2023-05hsgml.pdf" },
  { label: "CFPB: What is an FHA loan?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-fha-loan-en-121/" },
  { label: "CFPB: When can I remove private mortgage insurance?", href: "https://www.consumerfinance.gov/ask-cfpb/when-can-i-remove-private-mortgage-insurance-pmi-from-my-loan-en-202/" },
  { label: "FHFA: Conforming loan limit values for 2026", href: "https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026" },
  { label: "FDIC: National rates and rate caps", href: "https://www.fdic.gov/national-rates-and-rate-caps" },
];

export default function DownPaymentGuide() {
  return (
    <Guide
      kicker="The down payment guide"
      title="How much to put down, and how to get there"
      intro={
        <>
          The down payment is usually the biggest hurdle to buying a home. You need less than the old 20% rule suggests, but every percentage point changes your loan, your
          monthly payment, your mortgage insurance and how long you have to save. This guide sets the options side by side with real numbers.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Conventional loans start at 3% down, FHA loans at 3.5%, and VA and USDA loans can need nothing.</li>
          <li>Below 20% down, conventional loans charge PMI until the balance falls to 78% of the price; FHA charges its own mortgage insurance.</li>
          <li>On a {usd(400_000)} home at 7.25%, going from 3% to 20% down lowers the payment from {usd(3_255)} to {usd(2_630)} a month.</li>
          <li>Plan for closing costs too: Freddie Mac puts them at about 2% to 5% of the price.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3%", label: "Lowest conventional down payment" },
            { value: "3.5%", label: "FHA minimum with a 580+ score" },
            { value: usd(52_000), label: "Cash for 10% down plus 3% closing on $400,000" },
            { value: "34 months", label: "To save it at $1,000 a month from $15,000" },
          ]}
        />
      </GuideSection>

      <GuideSection id="minimums" n={2} kicker="Rules" title="Minimum down payments by loan type">
        <DataTable
          head={["Loan", "Minimum down", "Mortgage insurance"]}
          rows={[
            ["Conventional (for example Freddie Mac Home Possible)", "3%", "PMI below 20% down; ends at 78% of the price"],
            ["Conventional, standard", "5%", "PMI below 20% down"],
            ["FHA, credit score 580+", "3.5%", "1.75% upfront plus annual MIP"],
            ["FHA, credit score 500 to 579", "10%", "1.75% upfront plus annual MIP for 11 years"],
            ["VA (eligible service members and veterans)", "0%", "None; a one-time funding fee instead"],
            ["USDA (eligible rural areas, income limits)", "0%", "Upfront and annual guarantee fees"],
          ]}
        />
        <p>
          3% conventional programs usually have conditions, such as being a first-time buyer or earning under an area income limit. Lenders can also set their own minimum credit
          scores above the program rules.
        </p>
      </GuideSection>

      <GuideSection id="amounts" n={3} kicker="Dollars" title="What each percentage costs">
        <DataTable
          caption="Down payment in dollars"
          head={["Home price", "3%", "5%", "10%", "20%"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            [usd(250_000), usd(7_500), usd(12_500), usd(25_000), usd(50_000)],
            [usd(350_000), usd(10_500), usd(17_500), usd(35_000), usd(70_000)],
            [usd(400_000), usd(12_000), usd(20_000), usd(40_000), usd(80_000)],
            [usd(500_000), usd(15_000), usd(25_000), usd(50_000), usd(100_000)],
            [usd(750_000), usd(22_500), usd(37_500), usd(75_000), usd(150_000)],
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <p>Take a {usd(400_000)} home with a 30-year loan at 7.25%, 0.89% property tax, {usd(1_800)} of insurance a year and PMI at 0.5% of the loan.</p>
        <WorkedExample
          title="10% down on a $400,000 home"
          steps={[
            { label: "Down payment", note: "10% of the price", value: usd(40_000) },
            { label: "Closing costs", note: "3% of the price", value: usd(12_000) },
            { label: "Loan", value: usd(360_000) },
            { label: "Principal and interest", value: "$2,455.83" },
            { label: "PMI", note: "0.5% of the loan a year, for 9 years 10 months", value: "$150.00" },
          ]}
          total={{ label: "Monthly payment with tax and insurance", value: usd(3_053) }}
        />
        <p>
          You need {usd(52_000)} at closing. With {usd(15_000)} saved and {usd(1_000)} a month going into a 4% savings account, you would have it in 34 months.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={5} kicker="Side by side" title="All five options compared">
        <DataTable
          caption="$400,000 home, 7.25% for 30 years, 3% closing costs, PMI 0.5%"
          head={["Option", "Cash to close", "Loan", "Monthly payment", "PMI or MIP a month", "Insurance lasts"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["3% conventional", usd(24_000), usd(388_000), usd(3_255), "$161.67", "12 years 10 months"],
            ["3.5% FHA", usd(26_000), usd(392_755), usd(3_302), "$176.14", "Life of the loan"],
            ["5% conventional", usd(32_000), usd(380_000), usd(3_197), "$158.33", "12 years 1 month"],
            ["10% conventional", usd(52_000), usd(360_000), usd(3_053), "$150.00", "9 years 10 months"],
            ["20% conventional", usd(92_000), usd(320_000), usd(2_630), "$0", "None"],
          ]}
        />
        <Bars
          format={(n) => usd(n)}
          items={[
            { label: "3% conventional", value: 3_255 },
            { label: "3.5% FHA", value: 3_302 },
            { label: "5% conventional", value: 3_197 },
            { label: "10% conventional", value: 3_053 },
            { label: "20% conventional", value: 2_630 },
          ]}
        />
        <p>
          Each step up in down payment lowers the payment, but the big drop comes at 20%, where PMI disappears. Over the full 30 years, interest falls from {usd(564_864)} with 3%
          down to {usd(465_867)} with 20% down.
        </p>
      </GuideSection>

      <GuideSection id="pmi" n={6} kicker="PMI" title="PMI: the price of less than 20%">
        <p>
          Private mortgage insurance protects the lender if you stop paying. Freddie Mac puts it at about $30 to $70 a month per {usd(100_000)} borrowed, roughly 0.35% to 0.85% of
          the loan a year, with smaller down payments and lower credit scores at the high end. The calculator uses one rate you choose; ask lenders for real quotes at each down
          payment.
        </p>
        <p>
          PMI does not last forever. You can ask to cancel it once the balance reaches 80% of the original value, and it ends automatically at 78% on the original schedule. In the
          example, total PMI comes to {usd(24_897)} with 3% down, {usd(17_700)} with 10% down and {usd(11_617)} with 15% down. Our{" "}
          <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}shows how extra payments bring the cancellation date forward.
        </p>
      </GuideSection>

      <GuideSection id="fha" n={7} kicker="FHA" title="FHA's 3.5% option">
        <p>
          FHA loans charge an upfront mortgage insurance premium of 1.75% of the loan, usually added to the balance, plus an annual premium. Under HUD&rsquo;s current table, a 30-year
          loan with less than 5% down pays 0.55% a year for the life of the loan. In the example the upfront premium is {usd(6_755)}, the loan becomes {usd(392_755)}, and the first
          year&rsquo;s MIP is {usd(176)} a month.
        </p>
        <p>
          At the same rate, the FHA option costs {usd(47)} a month more than 3% conventional, and its mortgage insurance adds up to {usd(49_386)} over 30 years. FHA earns its place
          when your credit score would make conventional PMI expensive, or when you need its more flexible rules. Our <a href="/us/housing/fha-loan-calculator">FHA loan calculator</a>{" "}
          models it in detail.
        </p>
      </GuideSection>

      <GuideSection id="cash-to-close" n={8} kicker="Closing" title="Cash to close">
        <p>
          The down payment is only part of the cash you bring to closing. Closing costs cover lender fees, the appraisal, title insurance, recording fees and prepaid items such as
          the first year of homeowners insurance and some property tax. Freddie Mac puts them at about 2% to 5% of the price.
        </p>
        <p>
          Two ways to bring this down: ask the seller for a credit toward closing costs as part of your offer, and compare Loan Estimates from several lenders. Our{" "}
          <a href="/us/housing/closing-cost-calculator">closing cost calculator</a>{" "}lists each fee.
        </p>
      </GuideSection>

      <GuideSection id="saving-time" n={9} kicker="Saving" title="How long it takes to save">
        <p>
          Starting from {usd(15_000)} saved and putting away {usd(1_000)} a month at 4% APY, here is how long each option takes (down payment plus 3% closing costs on {usd(400_000)}):
        </p>
        <DataTable
          head={["Option", "Cash needed", "Time to save"]}
          numeric={[1]}
          rows={[
            ["3% conventional", usd(24_000), "9 months"],
            ["3.5% FHA", usd(26_000), "11 months"],
            ["5% conventional", usd(32_000), "1 year 4 months"],
            ["10% conventional", usd(52_000), "2 years 10 months"],
            ["15% conventional", usd(72_000), "4 years 3 months"],
            ["20% conventional", usd(92_000), "5 years 6 months"],
          ]}
        />
        <p>
          How much you save each month matters far more than the interest rate. For the 10% option, {usd(500)} a month takes 61 months, {usd(2_000)} a month takes 18 months. At 0%
          interest, {usd(1_000)} a month takes 37 months instead of 34.
        </p>
      </GuideSection>

      <GuideSection id="monthly-target" n={10} kicker="Deadline" title="Saving to a deadline">
        <p>
          If you know when you want to buy, work backward. To reach {usd(52_000)} from {usd(15_000)} at 4% APY, you need to save about {usd(921)} a month to buy in three years, or{" "}
          {usd(510)} a month to buy in five. Set the &ldquo;Years you want to buy in&rdquo; field under More options to see your own figure, or use our{" "}
          <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}for any other target.
        </p>
        <Callout title="Automate it">
          Set up an automatic transfer on payday into a separate account. Money you never see in your checking account is much easier to save.
        </Callout>
      </GuideSection>

      <GuideSection id="where" n={11} kicker="Safety" title="Where to keep the money">
        <p>
          Down payment money has a deadline, so it should not be exposed to the stock market. High-yield savings accounts paid around 4% in September 2026, while the FDIC&rsquo;s
          national average for savings accounts was about 0.38%. Money market accounts and short CDs timed to your purchase are good options too. Keep each account at an
          FDIC-insured bank or NCUA-insured credit union, within the {usd(250_000)} coverage limit.
        </p>
      </GuideSection>

      <GuideSection id="sources-of-money" n={12} kicker="Help" title="Gifts, assistance and retirement accounts">
        <ul>
          <li>
            <strong>Gifts</strong>{" "}from family are allowed on conventional, FHA and VA loans, usually with a signed gift letter and a paper trail.
          </li>
          <li>
            <strong>Down payment assistance</strong>{" "}from state housing finance agencies and some cities comes as grants or low-cost second loans, often for first-time buyers
            under an income limit.
          </li>
          <li>
            <strong>Retirement accounts</strong>: a first-time buyer can take up to {usd(10_000)} from an IRA without the 10% early withdrawal penalty (income tax still applies to
            traditional IRA money), and many 401(k) plans offer loans. Both set back your retirement saving, so treat them as a last resort.
          </li>
        </ul>
      </GuideSection>

      <GuideSection id="twenty-or-less" n={13} kicker="Strategy" title="Wait for 20% or buy sooner?">
        <CompareCards
          columns={[
            {
              name: "Buy sooner with 5% down",
              rows: [
                { label: "Cash to close", value: usd(32_000) },
                { label: "Monthly payment", value: usd(3_197) },
                { label: "Time to save", value: "1 year 4 months" },
              ],
            },
            {
              name: "Wait for 20% down",
              rows: [
                { label: "Cash to close", value: usd(92_000) },
                { label: "Monthly payment", value: usd(2_630) },
                { label: "Time to save", value: "5 years 6 months" },
              ],
            },
          ]}
        />
        <p>
          Waiting four more years saves {usd(567)} a month, but you pay rent in the meantime and the price may change. If prices rise faster than you save, the target moves away from
          you. Our <a href="/us/housing/rent-vs-buy-calculator">rent vs buy calculator</a>{" "}helps weigh the years of rent against the cost of buying sooner.
        </p>
      </GuideSection>

      <GuideSection id="reserves" n={14} kicker="Safety net" title="Keep a cushion">
        <p>
          Do not empty every account to make the down payment bigger. New owners face moving costs, furniture and the first repairs, and lenders sometimes ask for a few months of
          payments left in savings after closing. Many planners suggest keeping three to six months of expenses as an emergency fund on top of the down payment.
        </p>
      </GuideSection>

      <GuideSection id="jumbo" n={15} kicker="Limits" title="Conforming limits and jumbo loans">
        <p>
          Fannie Mae and Freddie Mac buy loans up to the conforming loan limit. For 2026 the FHFA set it at {usd(832_750)} for a one-unit home in most counties, up to {usd(1_249_125)}{" "}
          in high-cost areas. Loans above the limit are jumbo loans, which often need 10% to 20% down. The calculator flags a loan above the baseline limit.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={16} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Saving only for the down payment and forgetting closing costs.</li>
          <li>Keeping the down payment in stocks a year before buying.</li>
          <li>Assuming PMI is the same at every down payment: smaller down payments usually pay a higher rate.</li>
          <li>Opening new credit cards or a car loan while saving, which can hurt your score and your debt-to-income ratio.</li>
          <li>Waiting years for 20% when PMI for a few years would cost less than the rent paid while saving.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={17} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price you are aiming for and pick the down payment you want to reach.</li>
          <li>Add what you have saved and what you can put away each month.</li>
          <li>Use a real rate quote, and a PMI quote at your credit score under More options.</li>
          <li>Read the table to compare all options, then try a target year to see the monthly saving needed.</li>
          <li>Check your full budget with our <a href="/us/housing/mortgage-affordability">home affordability calculator</a>.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={18} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Lowest conventional down payment", "3%"],
            ["FHA minimum", "3.5% (score 580+), 10% (500 to 579)"],
            ["FHA upfront and annual MIP (30 years, under 5% down)", "1.75% and 0.55%"],
            ["PMI (Freddie Mac)", "about 0.35% to 0.85% of the loan a year"],
            ["PMI ends", "78% of the original value on schedule; ask at 80%"],
            ["Closing costs (Freddie Mac)", "about 2% to 5% of the price"],
            ["2026 conforming loan limit, one unit", "$832,750 (up to $1,249,125)"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

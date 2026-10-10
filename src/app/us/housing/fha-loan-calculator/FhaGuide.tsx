import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** FHA loan guide. Figures from fhaLoan() and fhaAnnualMip() in src/lib/us/home-buying.ts and mortgage() in src/lib/us/mortgage.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What an FHA loan is" },
  { id: "eligibility", title: "Who can get one" },
  { id: "example", title: "A worked example" },
  { id: "ufmip", title: "The upfront premium" },
  { id: "annual-mip", title: "The annual premium" },
  { id: "duration", title: "How long MIP lasts" },
  { id: "down-options", title: "3.5%, 5% or 10% down" },
  { id: "fifteen", title: "15-year FHA loans" },
  { id: "limits", title: "2026 FHA loan limits" },
  { id: "vs-conventional", title: "FHA vs conventional" },
  { id: "removing-mip", title: "Getting rid of MIP" },
  { id: "dti", title: "Debt-to-income and approval" },
  { id: "property", title: "Property rules" },
  { id: "closing", title: "Closing costs and gifts" },
  { id: "timeline", title: "From application to keys" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "HUD Mortgagee Letter 2023-05: FHA annual mortgage insurance premium rates", href: "https://archives.hud.gov/news/2024/2023-05hsgml.pdf" },
  { label: "HUD: FHA announces 2026 loan limits (HUD No. 25-145)", href: "https://www.hud.gov/news/hud-no-25-145" },
  { label: "HUD: FHA mortgage limits by county", href: "https://entp.hud.gov/idapp/html/hicostlook.cfm" },
  { label: "HUD: FHA lenders and Mortgagee Letter 2025-23", href: "https://www.hud.gov/hud-partners/single-family-lender" },
  { label: "CFPB: What is an FHA loan?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-fha-loan-en-121/" },
  { label: "CFPB: FHA loans", href: "https://www.consumerfinance.gov/owning-a-home/loan-options/fha-loans/" },
  { label: "FHFA: Conforming loan limit values for 2026", href: "https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026" },
  { label: "Freddie Mac: Breaking down PMI", href: "https://myhome.freddiemac.com/buying/breaking-down-pmi" },
];

export default function FhaGuide() {
  return (
    <Guide
      kicker="The FHA loan guide"
      title="How FHA loans and mortgage insurance work"
      intro={
        <>
          FHA loans open the door to buyers with smaller down payments and lower credit scores. The price is mortgage insurance: an upfront premium and an annual one that often
          lasts as long as the loan. This guide explains every part of the payment with 2026 figures, and when an FHA loan beats a conventional one.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>FHA loans need 3.5% down with a credit score of 580 or more, or 10% down with 500 to 579.</li>
          <li>You pay 1.75% of the loan upfront (usually added to the loan) and an annual premium of 0.55% on most loans with 3.5% down.</li>
          <li>With less than 10% down, annual MIP lasts for the life of the loan; with 10% or more, it stops after 11 years.</li>
          <li>In 2026 the one-unit FHA limit is {usd(541_287)} in most counties and up to {usd(1_249_125)} in the most expensive.</li>
        </ul>
        <KeyStats
          items={[
            { value: "3.5%", label: "Minimum down with a 580+ score" },
            { value: "1.75%", label: "Upfront MIP" },
            { value: "0.55%", label: "Annual MIP, most loans with 3.5% down" },
            { value: usd(541_287), label: "2026 FHA limit in most counties" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What an FHA loan is">
        <p>
          An FHA loan is a mortgage from an ordinary lender that is insured by the Federal Housing Administration, part of HUD. If you stop paying, FHA covers the lender&rsquo;s loss.
          That insurance lets lenders accept smaller down payments, lower credit scores and higher debt-to-income ratios than they would on a conventional loan.
        </p>
        <p>
          You pay for the insurance through mortgage insurance premiums (MIP). Unlike PMI on a conventional loan, MIP has an upfront part and often cannot be cancelled by asking.
        </p>
      </GuideSection>

      <GuideSection id="eligibility" n={3} kicker="Rules" title="Who can get one">
        <DataTable
          head={["Credit score", "Minimum down payment"]}
          rows={[
            ["580 or more", "3.5%"],
            ["500 to 579", "10%"],
            ["Under 500", "Not eligible for FHA insurance"],
          ]}
        />
        <p>
          The home must be your main residence, and you usually move in within 60 days. FHA does not require you to be a first-time buyer. Many lenders add their own rules on top
          of FHA&rsquo;s, often a minimum score around 620, so compare a few.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <p>A {usd(350_000)} home with the minimum 3.5% down, 7.25% for 30 years, 0.89% property tax and {usd(1_800)} of insurance a year:</p>
        <WorkedExample
          title="$350,000 home, 3.5% down, FHA"
          steps={[
            { label: "Down payment", note: "3.5% of the price", value: usd(12_250) },
            { label: "Base loan", value: usd(337_750) },
            { label: "Upfront MIP", note: "1.75%, added to the loan", value: "$5,910.63" },
            { label: "Principal and interest", note: "On $343,661", value: "$2,344.37" },
            { label: "Annual MIP", note: "0.55% of the average balance, first year", value: "$154.12" },
            { label: "Property tax and insurance", value: "$409.58" },
          ]}
          total={{ label: "First monthly payment", value: "$2,908.08" }}
        />
        <p>
          Over 30 years, the upfront and annual premiums add up to {usd(43_213)}, and interest to {usd(500_313)}. To see the same home without mortgage insurance, try our{" "}
          <a href="/us/housing/mortgage-calculator">mortgage calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="ufmip" n={5} kicker="Upfront" title="The upfront premium">
        <p>
          Every FHA purchase loan carries an upfront mortgage insurance premium (UFMIP) of 1.75% of the base loan amount. It is due at closing, but almost everyone finances it,
          which adds it to the balance. You then pay interest on it for the life of the loan.
        </p>
        <p>
          In the example the premium is $5,910.63. Financing it raises the loan to {usd(343_661)}. If you pay it in cash instead, turn off &ldquo;Add the upfront MIP to the
          loan&rdquo; under More options; the payment drops a little and the cash you need at closing rises.
        </p>
      </GuideSection>

      <GuideSection id="annual-mip" n={6} kicker="Annual" title="The annual premium">
        <p>
          The annual premium is set by HUD Mortgagee Letter 2023-05, which cut most rates by 0.30 percentage points from March 20, 2023. It depends on the term, the base loan amount
          and the loan-to-value ratio (LTV):
        </p>
        <DataTable
          caption="FHA annual MIP, loans of more than 15 years"
          head={["Base loan", "LTV 90% or less", "Over 90% to 95%", "Over 95%"]}
          rows={[
            ["$726,200 or less", "0.50% for 11 years", "0.50% for the loan's life", "0.55% for the loan's life"],
            ["Over $726,200", "0.70% for 11 years", "0.70% for the loan's life", "0.75% for the loan's life"],
          ]}
        />
        <p>
          HUD charges the annual premium on the average balance you owe during each year, collected monthly. That is why it falls a little each year: in the example from $154.12 a
          month in year one to $152.58 in year two and $132.21 in year 11.
        </p>
      </GuideSection>

      <GuideSection id="duration" n={7} kicker="Duration" title="How long MIP lasts">
        <p>
          On loans made since June 2013, the rule is simple: with an LTV over 90% (less than 10% down), annual MIP lasts for the whole loan term. With 10% or more down, it ends
          after 11 years. There is no cancellation at 78% or 80% as there is with PMI on a conventional loan.
        </p>
        <Callout tone="warn" title="Life-of-loan MIP adds up">
          In the example, MIP for the life of the loan comes to {usd(37_302)} in annual premiums on top of the {usd(5_911)} upfront premium, unless you refinance out of it.
        </Callout>
      </GuideSection>

      <GuideSection id="down-options" n={8} kicker="Down payment" title="3.5%, 5% or 10% down">
        <p>On the same {usd(350_000)} home at 7.25% over 30 years:</p>
        <DataTable
          head={["Down payment", "Loan with UFMIP", "Annual MIP", "MIP a month", "MIP lasts", "First payment", "All MIP"]}
          numeric={[1, 3, 5, 6]}
          rows={[
            ["3.5% ($12,250)", usd(343_661), "0.55%", "$154.12", "Life of the loan", "$2,908.08", usd(43_213)],
            ["5% ($17,500)", usd(338_319), "0.50%", "$137.94", "Life of the loan", "$2,855.45", usd(39_203)],
            ["10% ($35,000)", usd(320_513), "0.50%", "$130.68", "11 years", "$2,726.72", usd(21_667)],
          ]}
        />
        <p>
          Putting 10% down cuts total mortgage insurance by about half because MIP stops after 11 years. Our <a href="/us/housing/down-payment-calculator">down payment calculator</a>{" "}
          shows how long each amount would take to save.
        </p>
      </GuideSection>

      <GuideSection id="fifteen" n={9} kicker="Term" title="15-year FHA loans">
        <p>Loans of 15 years or less have much lower annual premiums: 0.15% to 0.40% for base loans up to $726,200, and 0.15% to 0.65% above it.</p>
        <CompareCards
          columns={[
            {
              name: "15 years, 3.5% down",
              rows: [
                { label: "Annual MIP", value: "0.40%, for 15 years" },
                { label: "First payment", value: "$3,657.37" },
                { label: "All MIP", value: usd(17_895) },
                { label: "Total interest", value: usd(221_026) },
              ],
            },
            {
              name: "15 years, 10% down",
              rows: [
                { label: "Annual MIP", value: "0.15%, for 11 years" },
                { label: "First payment", value: "$3,374.12" },
                { label: "All MIP", value: usd(9_321) },
                { label: "Total interest", value: usd(206_139) },
              ],
            },
          ]}
        />
        <p>The payment is much higher, but if it fits your budget a 15-year FHA loan cuts both interest and mortgage insurance sharply.</p>
      </GuideSection>

      <GuideSection id="limits" n={10} kicker="Limits" title="2026 FHA loan limits">
        <p>
          FHA only insures loans up to a county limit. For 2026 (case numbers from January 1, 2026), HUD set the one-unit limit at {usd(541_287)} in lower-cost areas, the
          &ldquo;floor&rdquo;, and {usd(1_249_125)} in the highest-cost areas, the &ldquo;ceiling&rdquo;, which is 150% of the national conforming limit of {usd(832_750)}. Alaska,
          Hawaii, Guam and the U.S. Virgin Islands have higher limits. Two- to four-unit homes have higher limits too.
        </p>
        <p>
          The limit applies to the base loan before the upfront premium. Look up your county on HUD&rsquo;s FHA mortgage limits page and enter it under More options; the calculator
          warns you if the loan is over it.
        </p>
      </GuideSection>

      <GuideSection id="vs-conventional" n={11} kicker="Compare" title="FHA vs conventional">
        <p>At the same 7.25% rate on the {usd(350_000)} home:</p>
        <CompareCards
          columns={[
            {
              name: "FHA, 3.5% down",
              rows: [
                { label: "Loan", value: usd(343_661) },
                { label: "Mortgage insurance", value: "$154.12 a month, for life" },
                { label: "First payment", value: "$2,908.08" },
                { label: "All mortgage insurance", value: usd(43_213) },
              ],
            },
            {
              name: "Conventional, 5% down",
              rows: [
                { label: "Loan", value: usd(332_500) },
                { label: "Mortgage insurance", value: "$138.54 a month (0.5% PMI), 12 years 1 month" },
                { label: "First payment", value: "$2,816.36" },
                { label: "All mortgage insurance", value: usd(20_089) },
              ],
            },
          ]}
        />
        <p>
          With good credit, conventional usually wins: lower insurance that ends. FHA wins when your score would push PMI toward the top of Freddie Mac&rsquo;s 0.35% to 0.85% range
          or beyond, when your debt-to-income ratio is high, or when you need the smallest possible down payment with a modest score. FHA rates are often a little different from
          conventional rates, so compare real quotes.
        </p>
      </GuideSection>

      <GuideSection id="removing-mip" n={12} kicker="Exit" title="Getting rid of MIP">
        <p>
          Because MIP usually lasts for the life of the loan, the way out is to refinance into a conventional loan once your equity reaches about 20%, through repayment, rising
          prices or both. That only makes sense if the new rate and closing costs work; our <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}works out the
          break-even. Selling the home also ends it.
        </p>
        <p>
          If you refinance into another FHA loan within three years, HUD credits part of your original upfront premium against the new one.
        </p>
      </GuideSection>

      <GuideSection id="dti" n={13} kicker="Approval" title="Debt-to-income and approval">
        <p>
          FHA looks at two ratios: your housing payment (including MIP, tax and insurance) as a share of gross monthly income, and all your monthly debts as a share of it.
          FHA&rsquo;s standard guides are 31% and 43%, and its automated underwriting can approve higher ratios with strong compensating factors. Our{" "}
          <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}shows your ratios.
        </p>
      </GuideSection>

      <GuideSection id="property" n={14} kicker="Property" title="Property rules">
        <p>
          FHA appraisers check that the home is safe, sound and secure, not just its value. Peeling paint in older homes, a broken heating system or a leaking roof may have to be
          fixed before closing. Condos must be on FHA&rsquo;s approved list or get a single-unit approval. Homes with up to four units qualify if you live in one.
        </p>
      </GuideSection>

      <GuideSection id="closing" n={15} kicker="Cash" title="Closing costs and gifts">
        <p>
          You still pay normal closing costs on top of the down payment and any unfinanced upfront premium. FHA allows the seller to pay up to 6% of the price toward your costs, and
          the whole down payment can be a documented gift from family, an employer or an approved assistance program.
        </p>
      </GuideSection>

      <GuideSection id="timeline" n={16} kicker="Process" title="From application to keys">
        <Timeline
          items={[
            { when: "Before you shop", what: "Check your credit and get preapproved", detail: "Ask lenders to quote both FHA and conventional." },
            { when: "Offer accepted", what: "Apply and get your Loan Estimate", detail: "It shows the upfront and monthly MIP." },
            { when: "Within a few weeks", what: "FHA appraisal and underwriting", detail: "Repairs flagged by the appraiser may need doing before closing." },
            { when: "Three days before closing", what: "Closing Disclosure", detail: "Compare it with your Loan Estimate." },
            { when: "Closing day", what: "Sign and get the keys", detail: "The upfront MIP is paid or added to the loan." },
          ]}
        />
      </GuideSection>

      <GuideSection id="mistakes" n={17} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Comparing FHA and conventional on the rate alone, ignoring the upfront premium and life-of-loan MIP.</li>
          <li>Assuming MIP drops off at 20% equity like PMI. It does not; you have to refinance.</li>
          <li>Forgetting that the 1.75% premium is added to the loan, so you start owing more than the price less your down payment.</li>
          <li>Using the national floor when your county&rsquo;s limit is higher, or the other way round.</li>
          <li>Skipping a conventional quote when your credit score is good.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price, pick your credit score band and set the down payment (it will not go below FHA&rsquo;s minimum).</li>
          <li>Use the FHA rate from a real quote and pick the term.</li>
          <li>Pick your state for typical property tax, then add your insurance quote and county loan limit under More options.</li>
          <li>Set the conventional comparison to the down payment, rate and PMI a lender quotes you.</li>
          <li>Read the year-by-year MIP table to see what you pay and for how long.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Minimum down payment", "3.5% (score 580+), 10% (500 to 579)"],
            ["Upfront MIP", "1.75% of the base loan"],
            ["Annual MIP, over 15 years, up to $726,200", "0.50% to 0.55%"],
            ["Annual MIP, over 15 years, above $726,200", "0.70% to 0.75%"],
            ["MIP duration", "11 years with 10%+ down; otherwise the loan term"],
            ["2026 one-unit FHA limit", "$541,287 floor, $1,249,125 ceiling"],
            ["2026 conforming loan limit", "$832,750"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

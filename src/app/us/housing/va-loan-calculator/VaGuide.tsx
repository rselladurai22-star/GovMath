import { Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";
import { VA_RESIDUAL } from "@/lib/us/home-buying";

/** VA loan guide. Figures from vaLoan(), fhaLoan() and VA_RESIDUAL in src/lib/us/home-buying.ts and mortgage() in src/lib/us/mortgage.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What a VA loan is" },
  { id: "eligibility", title: "Who is eligible" },
  { id: "example", title: "A worked example" },
  { id: "fee-table", title: "The 2026 funding fee" },
  { id: "fee-dollars", title: "The fee in dollars" },
  { id: "exempt", title: "Who is exempt" },
  { id: "financing", title: "Financing the fee" },
  { id: "down", title: "Does a down payment help?" },
  { id: "no-pmi", title: "No PMI" },
  { id: "limits", title: "Loan limits and entitlement" },
  { id: "residual", title: "Residual income" },
  { id: "compare", title: "VA vs FHA vs conventional" },
  { id: "closing", title: "Closing costs on a VA loan" },
  { id: "property", title: "Property and occupancy rules" },
  { id: "refinance", title: "Refinancing a VA loan" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "VA: Funding fee and closing costs", href: "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/" },
  { label: "VA: Home loan limits", href: "https://www.va.gov/housing-assistance/home-loans/loan-limits/" },
  { label: "VA Lenders Handbook (VA Pamphlet 26-7), chapter 4: credit underwriting and residual income", href: "https://www.benefits.va.gov/WARMS/pam26_7.asp" },
  { label: "CFPB: Special loan programs (VA, FHA, USDA)", href: "https://www.consumerfinance.gov/owning-a-home/loan-options/special-loan-programs/" },
  { label: "HUD Mortgagee Letter 2023-05: FHA mortgage insurance premiums", href: "https://archives.hud.gov/news/2024/2023-05hsgml.pdf" },
  { label: "FHFA: Conforming loan limit values for 2026", href: "https://www.fhfa.gov/news/news-release/fhfa-announces-conforming-loan-limit-values-for-2026" },
  { label: "Freddie Mac: Primary Mortgage Market Survey (weekly rates)", href: "https://www.freddiemac.com/pmms" },
];

export default function VaGuide() {
  return (
    <Guide
      kicker="The VA loan guide"
      title="How VA home loans and the funding fee work"
      intro={
        <>
          A VA home loan is one of the most valuable benefits of military service: no down payment, no monthly mortgage insurance and limits on closing costs. In return, most
          borrowers pay a one-time funding fee. This guide explains the 2026 fee table, who is exempt, whether to finance the fee and how a VA loan compares with FHA and
          conventional loans.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>With full entitlement you can buy with no down payment and there is no VA loan limit.</li>
          <li>There is no PMI. Instead most borrowers pay a funding fee: 2.15% of the loan the first time with less than 5% down, 3.3% after that.</li>
          <li>Veterans receiving compensation for a service-connected disability, and some others, pay no fee at all.</li>
          <li>On a {usd(400_000)} home at 7.25% with nothing down, the payment is about {usd(3_234)} a month with the fee financed.</li>
        </ul>
        <KeyStats
          items={[
            { value: "0%", label: "Down payment with full entitlement" },
            { value: "2.15%", label: "First-use funding fee, under 5% down" },
            { value: "3.3%", label: "Subsequent-use fee, under 5% down" },
            { value: "$0", label: "Monthly mortgage insurance" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What a VA loan is">
        <p>
          A VA loan is a mortgage from a private lender that the Department of Veterans Affairs partly guarantees. If you default, the VA repays part of the lender&rsquo;s loss.
          That guarantee replaces the down payment and mortgage insurance a lender would otherwise want. The funding fee helps pay for the program, so it costs taxpayers less.
        </p>
      </GuideSection>

      <GuideSection id="eligibility" n={3} kicker="Eligibility" title="Who is eligible">
        <p>
          Eligibility depends on your service. It generally covers veterans and service members who meet minimum active-duty service requirements, National Guard and Reserve
          members with qualifying service, and some surviving spouses. You prove it with a Certificate of Eligibility (COE), which your lender can usually request online. The COE
          also shows your entitlement and whether you are exempt from the funding fee.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <p>A {usd(400_000)} home, first use of the benefit, no down payment, 7.25% for 30 years, 0.89% property tax and {usd(1_800)} of insurance a year:</p>
        <WorkedExample
          title="$400,000 home, VA, nothing down"
          steps={[
            { label: "Base loan", value: usd(400_000) },
            { label: "Funding fee", note: "2.15%, added to the loan", value: usd(8_600) },
            { label: "Loan", value: usd(408_600) },
            { label: "Principal and interest", value: "$2,787.37" },
            { label: "Property tax", note: "0.89% of the price", value: "$296.67" },
            { label: "Homeowners insurance", value: "$150.00" },
          ]}
          total={{ label: "Monthly payment", value: "$3,234.04" }}
        />
        <p>There is no PMI line. Over 30 years the loan costs {usd(594_854)} in interest; a bigger down payment or a lower rate would cut that.</p>
      </GuideSection>

      <GuideSection id="fee-table" n={5} kicker="Fee" title="The 2026 funding fee">
        <p>The VA&rsquo;s current funding fee rates took effect on April 7, 2023, and are unchanged for 2026. For purchase and construction loans:</p>
        <DataTable
          head={["Down payment", "First use", "After first use"]}
          rows={[
            ["Less than 5%", "2.15%", "3.3%"],
            ["5% to 9.99%", "1.5%", "1.5%"],
            ["10% or more", "1.25%", "1.25%"],
          ]}
        />
        <p>
          Other VA loans have their own fees: 0.5% for an interest rate reduction refinance (IRRRL), 2.15% or 3.3% for a cash-out refinance, 0.5% to assume a VA loan and 1% for a
          manufactured home not on a permanent foundation.
        </p>
      </GuideSection>

      <GuideSection id="fee-dollars" n={6} kicker="Dollars" title="The fee in dollars">
        <DataTable
          caption="Funding fee on purchases"
          head={["Home price", "First use, 0% down", "After first use, 0% down", "5% down", "10% down"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            [usd(200_000), usd(4_300), usd(6_600), usd(2_850), usd(2_250)],
            [usd(300_000), usd(6_450), usd(9_900), usd(4_275), usd(3_375)],
            [usd(400_000), usd(8_600), usd(13_200), usd(5_700), usd(4_500)],
            [usd(500_000), usd(10_750), usd(16_500), usd(7_125), usd(5_625)],
            [usd(750_000), usd(16_125), usd(24_750), usd(10_688), usd(8_438)],
          ]}
        />
        <p>The fee is a percentage of the loan, not the price, so with 5% or 10% down it applies to the smaller loan.</p>
      </GuideSection>

      <GuideSection id="exempt" n={7} kicker="Exemptions" title="Who is exempt">
        <p>According to the VA, you do not pay the funding fee if any of these apply:</p>
        <ul>
          <li>You receive VA compensation for a service-connected disability.</li>
          <li>You are eligible for that compensation but receive retirement or active-duty pay instead.</li>
          <li>You are a surviving spouse receiving Dependency and Indemnity Compensation (DIC).</li>
          <li>You are a service member with a proposed or memorandum rating, before closing, saying you are eligible for compensation from a pre-discharge claim.</li>
          <li>You are on active duty and show you received a Purple Heart on or before closing.</li>
        </ul>
        <p>
          On the example home, an exemption saves {usd(8_600)} upfront, or $58.66 a month if the fee would have been financed. If you are later awarded compensation effective
          before your closing date, you may be able to get the fee refunded.
        </p>
      </GuideSection>

      <GuideSection id="financing" n={8} kicker="Cash or loan" title="Financing the fee">
        <p>
          You can pay the funding fee at closing or add it to the loan. On purchase loans it is the only cost that can be financed; other closing costs must be paid in cash or by
          the seller.
        </p>
        <CompareCards
          columns={[
            {
              name: "Fee added to the loan",
              rows: [
                { label: "Cash needed for the fee", value: "$0" },
                { label: "Principal and interest", value: "$2,787.37" },
                { label: "Interest on the fee over 30 years", value: usd(12_520) },
              ],
            },
            {
              name: "Fee paid at closing",
              rows: [
                { label: "Cash needed for the fee", value: usd(8_600) },
                { label: "Principal and interest", value: "$2,728.71" },
                { label: "Interest on the fee", value: "$0" },
              ],
            },
          ]}
        />
        <p>
          Financing makes sense if the cash is better kept as an emergency fund, or if you expect to sell or refinance within a few years. Remember it also leaves you owing more
          than the price on day one.
        </p>
      </GuideSection>

      <GuideSection id="down" n={9} kicker="Down payment" title="Does a down payment help?">
        <DataTable
          caption="$400,000 home, first use, 7.25% for 30 years, fee financed"
          head={["Down payment", "Fee", "Loan", "Monthly payment", "Total interest"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["$0", usd(8_600), usd(408_600), "$3,234.04", usd(594_854)],
            ["$20,000 (5%)", usd(5_700), usd(385_700), "$3,077.82", usd(561_515)],
            ["$40,000 (10%)", usd(4_500), usd(364_500), "$2,933.20", usd(530_652)],
          ]}
        />
        <p>
          Putting 5% down cuts the fee by {usd(2_900)} and the payment by {usd(156)} a month. For someone using the benefit a second time, the saving is bigger: the fee drops from
          3.3% ({usd(13_200)}) to 1.5%. Whether it is worth it depends on what else that cash could do for you.
        </p>
      </GuideSection>

      <GuideSection id="no-pmi" n={10} kicker="Insurance" title="No PMI">
        <p>
          A conventional loan with less than 20% down carries PMI until you reach 22% equity, and an FHA loan with less than 10% down carries MIP for its whole life. A VA loan has
          neither, at any down payment. That is the main reason it usually beats both, even with the funding fee.
        </p>
      </GuideSection>

      <GuideSection id="limits" n={11} kicker="Limits" title="Loan limits and entitlement">
        <p>
          Since January 1, 2020, borrowers with <strong>full entitlement</strong>{" "}have no VA loan limit: the VA guarantees a quarter of any loan amount, so lenders can lend with no
          down payment. You have full entitlement if you have never used it, or if you repaid an earlier VA loan in full and sold the home.
        </p>
        <p>
          With <strong>remaining (reduced) entitlement</strong>, for example while an earlier VA loan is still open, the county conforming loan limit sets how much you can borrow
          without a down payment. For 2026 that limit is {usd(832_750)} in most counties and up to {usd(1_249_125)} in high-cost areas.
        </p>
        <Callout title="No limit is not unlimited">
          Your lender still has to approve the loan on your income, debts, credit and residual income. No limit just means the VA&rsquo;s guarantee is not capped.
        </Callout>
      </GuideSection>

      <GuideSection id="residual" n={12} kicker="Approval" title="Residual income">
        <p>
          Besides the debt-to-income ratio (the VA&rsquo;s benchmark is 41%), VA lenders check residual income: what is left each month after the mortgage payment, taxes, other
          debts and an allowance for maintenance and utilities. The VA&rsquo;s guide for loans of {usd(80_000)} or more:
        </p>
        <DataTable
          caption="VA residual income guide, loans of $80,000 or more, a month"
          head={["Family size", ...VA_RESIDUAL.regions]}
          numeric={[1, 2, 3, 4]}
          rows={VA_RESIDUAL.rows.map((row, k) => [String(k + 1), ...row.map((n) => usd(n))])}
        />
        <p>
          Add {usd(VA_RESIDUAL.extraPerMember)} for each family member over five. Lenders look more closely when residual income is low or the ratio is above 41%, but these are
          guides rather than hard cut-offs. The calculator shows the guide figure for your household under More options; our{" "}
          <a href="/us/loans/debt-to-income-ratio">debt-to-income calculator</a>{" "}works out your ratio.
        </p>
      </GuideSection>

      <GuideSection id="compare" n={13} kicker="Compare" title="VA vs FHA vs conventional">
        <p>The same {usd(400_000)} home at 7.25% for 30 years:</p>
        <CompareCards
          columns={[
            {
              name: "VA, nothing down",
              rows: [
                { label: "Cash for the loan", value: "$0" },
                { label: "Upfront fee", value: usd(8_600) },
                { label: "Mortgage insurance", value: "None" },
                { label: "Monthly payment", value: "$3,234.04" },
              ],
            },
            {
              name: "FHA, 3.5% down",
              rows: [
                { label: "Cash for the loan", value: usd(14_000) },
                { label: "Upfront fee", value: usd(6_755) },
                { label: "Mortgage insurance", value: "$176.14 a month, for life" },
                { label: "Monthly payment", value: "$3,302.09" },
              ],
            },
            {
              name: "Conventional, 5% down",
              rows: [
                { label: "Cash for the loan", value: usd(20_000) },
                { label: "Upfront fee", value: "$0" },
                { label: "Mortgage insurance", value: "$158.33 a month until 78%" },
                { label: "Monthly payment", value: "$3,197.27" },
              ],
            },
          ]}
        />
        <p>
          The VA loan needs no cash for the down payment and is cheaper each month than FHA. A conventional loan with 5% down is a little cheaper each month at the same rate, but
          needs {usd(20_000)} more upfront and charges PMI for years. VA rates are often competitive, so ask for quotes on each. Our{" "}
          <a href="/us/housing/fha-loan-calculator">FHA loan calculator</a>{" "}covers the FHA side in detail.
        </p>
      </GuideSection>

      <GuideSection id="closing" n={14} kicker="Closing" title="Closing costs on a VA loan">
        <p>
          You still pay closing costs, but the VA limits what lenders can charge veterans, and sellers can pay some or all of them. Get a Loan Estimate from several VA lenders and
          compare the fees, not just the rate. Our <a href="/us/housing/closing-cost-calculator">closing cost calculator</a>{" "}shows the usual lines.
        </p>
      </GuideSection>

      <GuideSection id="property" n={15} kicker="Rules" title="Property and occupancy rules">
        <p>
          A VA loan is for a home you will live in, including homes with up to four units if you live in one. The VA appraisal checks the value and that the home meets minimum
          property requirements: safe, structurally sound and sanitary. Repairs it flags usually have to be done before closing.
        </p>
      </GuideSection>

      <GuideSection id="refinance" n={16} kicker="Later" title="Refinancing a VA loan">
        <p>
          If rates fall, an interest rate reduction refinance loan (IRRRL, or &ldquo;streamline&rdquo;) swaps your VA loan for one at a lower rate with a 0.5% funding fee and little
          paperwork. A VA cash-out refinance lets you borrow against your equity, with the same 2.15% or 3.3% fees as a purchase. Our{" "}
          <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}finds the break-even point.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={17} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Not checking the COE for a funding fee exemption before closing.</li>
          <li>Assuming no down payment means no cash: you still need closing costs, moving money and reserves.</li>
          <li>Forgetting that the second use costs 3.3% with less than 5% down.</li>
          <li>Comparing VA and conventional on the rate alone, without the fee and PMI.</li>
          <li>Starting with almost no equity and having to sell early in a falling market.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={18} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price and any down payment, a real VA rate quote and the term.</li>
          <li>Choose first use or used before, and switch on the exemption if your COE shows one.</li>
          <li>Pick your state for typical property tax, and add insurance and HOA dues under More options.</li>
          <li>Set your household size and region to see the VA residual income guide.</li>
          <li>Read the comparison to see what VA saves against FHA and conventional loans.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={19} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Funding fee, under 5% down", "2.15% first use, 3.3% after"],
            ["Funding fee, 5% to 9.99% down", "1.5%"],
            ["Funding fee, 10% or more down", "1.25%"],
            ["IRRRL funding fee", "0.5%"],
            ["VA loan limit with full entitlement", "None"],
            ["2026 conforming loan limit (reduced entitlement)", "$832,750, up to $1,249,125"],
            ["Debt-to-income benchmark", "41%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

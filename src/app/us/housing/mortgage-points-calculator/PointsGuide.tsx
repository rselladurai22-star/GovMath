import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Mortgage points guide. Figures from src/lib/us/home-equity.ts (pointsOption, pointsTaxValue). */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What discount points are" },
  { id: "price", title: "How much a point cuts the rate" },
  { id: "example", title: "A worked example" },
  { id: "break-even", title: "The break-even month" },
  { id: "balance", title: "The fuller break-even" },
  { id: "stay", title: "How long you will keep the loan" },
  { id: "options", title: "Comparing several options" },
  { id: "pricing", title: "When the rate cut is small or large" },
  { id: "credits", title: "Lender credits: negative points" },
  { id: "term", title: "Points on a 15-year loan" },
  { id: "tax-buy", title: "Tax: points on a purchase" },
  { id: "tax-refi", title: "Tax: points on a refinance" },
  { id: "seller", title: "Seller-paid points" },
  { id: "cash", title: "Points or a bigger down payment" },
  { id: "rates", title: "Points when rates may fall" },
  { id: "origination", title: "Discount points vs origination fees" },
  { id: "loan-estimate", title: "Reading the Loan Estimate" },
  { id: "checklist", title: "A quick checklist" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What are discount points and lender credits?", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-discount-points-and-lender-credits-and-how-do-they-work-en-136/" },
  { label: "CFPB: Loan Estimate explainer", href: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/" },
  { label: "IRS Topic no. 504: Home mortgage points", href: "https://www.irs.gov/taxtopics/tc504" },
  { label: "IRS Publication 936: Home Mortgage Interest Deduction", href: "https://www.irs.gov/publications/p936" },
  { label: "Freddie Mac: Primary Mortgage Market Survey", href: "https://www.freddiemac.com/pmms" },
];

export default function PointsGuide() {
  return (
    <Guide
      kicker="The mortgage points guide"
      title="Is buying down your rate worth it?"
      intro={
        <>
          Discount points let you pay cash at closing for a lower mortgage rate. Whether they pay off depends on one question: will you keep the loan long enough for the lower
          payments to repay the cost? This guide shows how to find the break-even month and compare options, and how points are taxed.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A point costs 1% of the loan. On {usd(400_000)}, that is {usd(4_000)}.</li>
          <li>If it cuts a 7.25% rate to 7%, the payment falls by $67.50 a month. The cost is repaid in 60 months, or 48 counting the faster paydown.</li>
          <li>Keep the loan 10 years and one point leaves you {usd(6_091)} ahead; leave after 3 years and you are {usd(985)} behind.</li>
          <li>Points on a home purchase are usually deductible in the year paid, but only if you itemize.</li>
        </ul>
        <KeyStats
          items={[
            { value: usd(4_000), label: "Cost of 1 point on $400,000" },
            { value: "$67.50", label: "Monthly saving, 7.25% to 7%" },
            { value: "60 months", label: "Simple break-even" },
            { value: `+${usd(6_091)}`, label: "Net gain if you keep the loan 10 years" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What discount points are">
        <p>
          Discount points are prepaid interest. You pay the lender a lump sum at closing, and in return it gives you a lower rate for the life of the loan. One point is 1% of the
          loan amount; you can often buy fractions, such as half a point or 0.125 of a point. The CFPB describes them as a trade: more cash now for a lower payment later.
        </p>
      </GuideSection>

      <GuideSection id="price" n={3} kicker="Pricing" title="How much a point cuts the rate">
        <p>
          There is no fixed exchange rate. Each lender prices points daily, and the cut varies with the loan type, the market and how far below the &ldquo;par&rdquo; rate you go.
          About 0.25 of a percentage point per point is a common rule of thumb, which is the calculator&rsquo;s default, but your Loan Estimate shows the real trade. Ask each lender
          for the rate with no points and with one or two points so you can compare.
        </p>
      </GuideSection>

      <GuideSection id="example" n={4} kicker="Worked example" title="A worked example">
        <WorkedExample
          title="$400,000 for 30 years at 7.25%, buying 1 point"
          steps={[
            { label: "Cost of 1 point", note: "1% of $400,000", value: usd(4_000) },
            { label: "New rate", note: "7.25% − 0.25", value: "7.00%" },
            { label: "Payment with no points", value: "$2,728.71" },
            { label: "Payment with 1 point", value: "$2,661.21" },
            { label: "Monthly saving", value: "$67.50" },
          ]}
          total={{ label: "Simple break-even", value: "60 months" }}
        />
      </GuideSection>

      <GuideSection id="break-even" n={5} kicker="Break-even" title="The break-even month">
        <p>
          The usual test divides the cost by the monthly saving: {usd(4_000)} ÷ $67.50 = 59.3, so the points pay for themselves in the 60th month, five years after closing. Sell or
          refinance before then and you lose money; stay longer and every month after is a gain.
        </p>
      </GuideSection>

      <GuideSection id="balance" n={6} kicker="Break-even" title="The fuller break-even">
        <p>
          The simple test misses one thing. With a lower rate, more of each payment goes to principal, so you owe less when you leave, and you get that back when you sell or
          refinance. Counting it, the example breaks even after 48 months rather than 60. The calculator shows both, and its chart plots savings so far, including the lower
          balance, against the cost.
        </p>
      </GuideSection>

      <GuideSection id="stay" n={7} kicker="Planning" title="How long you will keep the loan">
        <DataTable
          caption="$400,000 at 7.25% for 30 years: net gain or loss by the time you sell or refinance"
          head={["Years kept", "1 point", "2 points", "1 point lender credit"]}
          numeric={[1, 2, 3]}
          rows={[
            ["3", `−${usd(985)}`, `−${usd(1_971)}`, `+${usd(983)}`],
            ["5", `+${usd(1_038)}`, `+${usd(2_071)}`, `−${usd(1_044)}`],
            ["7", `+${usd(3_065)}`, `+${usd(6_117)}`, `−${usd(3_076)}`],
            ["10", `+${usd(6_091)}`, `+${usd(12_155)}`, `−${usd(6_117)}`],
            ["15", `+${usd(10_991)}`, `+${usd(21_912)}`, `−${usd(11_057)}`],
            ["30", `+${usd(20_298)}`, `+${usd(40_353)}`, `−${usd(20_535)}`],
          ]}
        />
        <p>
          This is the deciding number. Many people sell or refinance within ten years, often sooner than they expect. If there is a fair chance you will move, or that rates will
          fall enough to refinance, a long break-even is a bet against yourself.
        </p>
      </GuideSection>

      <GuideSection id="options" n={8} kicker="Compare" title="Comparing several options">
        <DataTable
          caption="$400,000 for 30 years, 0.25 cut per point, kept 10 years"
          head={["Option", "Rate", "Cost", "Payment", "Net after 10 years"]}
          numeric={[2, 3, 4]}
          rows={[
            ["No points", "7.25%", "$0", "$2,728.71", "–"],
            ["0.5 point", "7.125%", usd(2_000), "$2,694.87", `+${usd(3_049)}`],
            ["1 point", "7.00%", usd(4_000), "$2,661.21", `+${usd(6_091)}`],
            ["2 points", "6.75%", usd(8_000), "$2,594.39", `+${usd(12_155)}`],
            ["3 points", "6.50%", usd(12_000), "$2,528.27", `+${usd(18_189)}`],
          ]}
        />
        <p>
          When each point buys the same cut, every option breaks even at the same month, and more points simply magnify the gain or the loss. In real pricing the cut per point
          often shrinks as you buy more, so compare the actual offers row by row.
        </p>
      </GuideSection>

      <GuideSection id="pricing" n={9} kicker="Pricing" title="When the rate cut is small or large">
        <Bars
          format={(n) => `${n} months`}
          items={[
            { label: "0.125 cut per point", value: 119 },
            { label: "0.25 cut per point", value: 60 },
            { label: "0.375 cut per point", value: 40 },
          ]}
        />
        <p>
          The cut per point matters more than anything. On the example loan, a point that buys only 0.125 takes 119 months, nearly ten years, to break even and gains just{" "}
          {usd(1_049)} over ten years. One that buys 0.375 breaks even in 40 months and gains {usd(11_127)}.
        </p>
      </GuideSection>

      <GuideSection id="credits" n={10} kicker="Credits" title="Lender credits: negative points">
        <p>
          Lender credits run the other way. The lender pays part of your closing costs, and you accept a higher rate. One point of credit on the example loan gives you{" "}
          {usd(4_000)} at closing and a 7.5% rate, adding $68.15 a month. The credit stays ahead for about four years (48 months, counting the slower paydown); after that, it costs
          you. Credits suit buyers short of cash at closing and those who expect to move or refinance soon.
        </p>
      </GuideSection>

      <GuideSection id="term" n={11} kicker="Term" title="Points on a 15-year loan">
        <p>
          On a shorter loan, a rate cut saves less each month because the balance falls faster. One point on {usd(400_000)} at 6.6% over 15 years saves $54.93 a month and takes 73
          months to break even (51 counting the lower balance). It leaves you {usd(4_335)} ahead after ten years, against {usd(6_091)} on the 30-year loan.
        </p>
      </GuideSection>

      <GuideSection id="tax-buy" n={12} kicker="Taxes" title="Tax: points on a purchase">
        <p>
          Points are mortgage interest for tax purposes. On a loan to buy or build your main home, you can usually deduct them in full in the year you pay them, if you itemize and
          meet the IRS tests: the points are a percentage of the loan, shown on the settlement statement, normal in your area, and paid from your own funds, not borrowed from the
          lender (IRS Topic 504). In the 22% bracket, {usd(4_000)} of points saves about $880 of federal tax in the first year; in the 24% bracket, about $960.
        </p>
        <Callout title="Only if you itemize">
          Most households take the standard deduction ({usd(32_200)} for married couples filing jointly in 2026). For them, points bring no tax saving at all. The deduction also
          falls under the {usd(750_000)} mortgage debt cap.
        </Callout>
      </GuideSection>

      <GuideSection id="tax-refi" n={13} kicker="Taxes" title="Tax: points on a refinance">
        <p>
          Points paid to refinance are deducted evenly over the life of the new loan. {usd(4_000)} on a 30-year refinance gives about {usd(133)} of deduction a year, worth about $29
          a year in the 22% bracket. If you sell or refinance again, you can deduct the part not yet deducted in that year. The{" "}
          <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}checks whether the refinance itself pays off.
        </p>
      </GuideSection>

      <GuideSection id="seller" n={14} kicker="Negotiating" title="Seller-paid points">
        <p>
          In a slow market you can ask the seller to pay for points as a concession. You get the lower rate without using your own cash, and the IRS lets the buyer deduct seller-paid
          points too, but you must reduce the home&rsquo;s cost basis by the same amount. Loan programs cap seller concessions, often at 3% to 6% of the price, so check with your
          lender.
        </p>
      </GuideSection>

      <GuideSection id="cash" n={15} kicker="Trade-off" title="Points or a bigger down payment">
        <CompareCards
          columns={[
            {
              name: "Buy points",
              rows: [
                { label: "Lowers", value: "The rate" },
                { label: "Gets back", value: "Only if you stay" },
                { label: "Best for", value: "Long stays" },
              ],
            },
            {
              name: "Put more down",
              rows: [
                { label: "Lowers", value: "The balance" },
                { label: "Gets back", value: "As equity when you sell" },
                { label: "Best for", value: "Avoiding PMI" },
              ],
            },
          ]}
        />
        <p>
          Cash spent on points is gone if you leave early; cash added to the down payment stays as equity. If extra cash would take you to 20% down and remove PMI, that usually beats
          points. Keep a cash cushion for repairs too. The <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}shows the PMI side.
        </p>
      </GuideSection>

      <GuideSection id="rates" n={16} kicker="Context" title="Points when rates may fall">
        <p>
          Freddie Mac&rsquo;s survey put the average 30-year rate at about 7.3% on October 1, 2026. If you think rates could fall enough to refinance within a few years, points are
          risky: the refinance resets the clock and the money is lost. If rates are already low and you plan to stay, points lock in a lower cost for decades.
        </p>
      </GuideSection>

      <GuideSection id="origination" n={17} kicker="Fees" title="Discount points vs origination fees">
        <p>
          Not every &ldquo;point&rdquo; lowers your rate. An origination fee, sometimes quoted in points, is the lender&rsquo;s charge for making the loan and buys nothing. Only
          discount points reduce the rate. On the Loan Estimate, both sit in section A, Origination Charges, labeled separately. Compare offers on the APR, which counts all of them.
        </p>
      </GuideSection>

      <GuideSection id="loan-estimate" n={18} kicker="Paperwork" title="Reading the Loan Estimate">
        <p>
          Page 2, section A lists &ldquo;% of loan amount (points)&rdquo; with the dollar cost. Page 1 shows the rate and the monthly principal and interest. Ask lenders for estimates
          on the same day, with the same lock period, for a no-points rate and a one-point rate. The difference in payment, divided into the difference in cost, is your break-even.
          The <a href="/us/housing/amortization-calculator">amortization calculator</a>{" "}shows the full schedule at either rate.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={19} kicker="Decide" title="A quick checklist">
        <ol>
          <li>How long will you realistically keep this loan?</li>
          <li>What rate cut does each point buy on your actual offer?</li>
          <li>Is the break-even comfortably shorter than your stay?</li>
          <li>Would the cash do more as a down payment, an emergency fund or debt repayment?</li>
          <li>Do you itemize? If not, ignore the tax side.</li>
        </ol>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <p>
          Enter the loan amount, the rate with no points and the term. Add the points you are offered and the rate cut each one buys, then how long you expect to keep the loan.
          The answer gives the break-even month; the table compares half a point to three points and a lender credit. Under More options, say whether the loan is a purchase or a
          refinance and whether you itemize to see the tax value.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Cost of 1 discount point", "1% of the loan amount"],
            ["Common rate cut per point", "about 0.25 of a percentage point (varies by lender)"],
            ["Simple break-even", "Cost of points ÷ monthly saving"],
            ["Points on a main home purchase", "Usually deductible in the year paid, if you itemize"],
            ["Points on a refinance", "Deducted over the life of the loan"],
            ["Average 30-year rate (October 1, 2026)", "about 7.3%"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

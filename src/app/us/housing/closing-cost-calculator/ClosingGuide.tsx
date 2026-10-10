import { Bars, Callout, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Buyer closing cost guide. Figures from closingCosts() in src/lib/us/estate-property.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const usd2 = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what-they-are", title: "What closing costs are" },
  { id: "example", title: "A worked example" },
  { id: "lender", title: "Lender fees" },
  { id: "points", title: "Discount points" },
  { id: "title", title: "Title insurance and settlement" },
  { id: "government", title: "Recording fees and transfer taxes" },
  { id: "prepaids", title: "Prepaid interest and insurance" },
  { id: "escrow", title: "Escrow deposits" },
  { id: "percent", title: "Why the share falls as the price rises" },
  { id: "down-payment", title: "Smaller down payments" },
  { id: "credits", title: "Seller and lender credits" },
  { id: "cash", title: "Cash to close" },
  { id: "documents", title: "Loan Estimate and Closing Disclosure" },
  { id: "shopping", title: "Which costs you can shop for" },
  { id: "timeline", title: "When you pay what" },
  { id: "wire", title: "Wire fraud" },
  { id: "taxes", title: "Closing costs and your taxes" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "CFPB: What are closing costs?", href: "https://www.consumerfinance.gov/ask-cfpb/what-are-closing-costs-en-1845/" },
  { label: "CFPB: Loan Estimate explainer", href: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/" },
  { label: "CFPB: Closing Disclosure explainer", href: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/" },
  { label: "CFPB: Your home loan toolkit", href: "https://www.consumerfinance.gov/owning-a-home/resources/your-home-loan-toolkit/" },
  { label: "CFPB: Mortgage closing scams", href: "https://www.consumerfinance.gov/about-us/blog/mortgage-closing-scams-how-protect-yourself-and-your-closing-funds/" },
  { label: "Fannie Mae Selling Guide: Interested party contributions", href: "https://selling-guide.fanniemae.com/sel/b3-4.1-02/interested-party-contributions-ipcs" },
  { label: "IRS: Publication 530, Tax information for homeowners", href: "https://www.irs.gov/publications/p530" },
  { label: "U.S. Census Bureau: American Community Survey 2024, median real estate taxes (B25103)", href: "https://data.census.gov/table/ACSDT1Y2024.B25103" },
];

export default function ClosingGuide() {
  return (
    <Guide
      kicker="The closing cost guide"
      title="What you pay at closing, and why"
      intro={
        <>
          Buying a home takes more cash than the down payment. Lenders, title companies, the county and sometimes the state all charge fees, and you prepay interest, insurance
          and property tax. This guide walks through each line you will see on a Loan Estimate, shows how much a typical purchase costs, and explains which costs you can shop
          for or ask the seller to cover.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Closing costs are commonly quoted at 2% to 5% of the price. In our example of a {usd(400_000)} home with 10% down they come to {usd2(11_112.6)}, or 2.78%.</li>
          <li>About a third of that is not a fee at all: it is prepaid interest, insurance and property tax that you would owe anyway.</li>
          <li>With the {usd(40_000)} down payment, you need {usd2(51_112.6)} in cash at closing.</li>
          <li>Transfer taxes, discount points and smaller loans push the share up; seller and lender credits bring the cash down.</li>
        </ul>
        <KeyStats
          items={[
            { value: "2% to 5%", label: "Commonly quoted range, as a share of price" },
            { value: "2.78%", label: "Our $400,000 example" },
            { value: usd2(51_112.6), label: "Cash to close in the example" },
            { value: "3 business days", label: "Closing Disclosure before closing" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what-they-are" n={2} kicker="Basics" title="What closing costs are">
        <p>Closing costs fall into five groups, and the calculator shows each:</p>
        <ul>
          <li><strong>Lender fees</strong>: origination, discount points, underwriting and processing.</li>
          <li><strong>Title and services</strong>: title insurance, settlement or attorney fees, the appraisal and the inspection.</li>
          <li><strong>Government fees and taxes</strong>: recording fees, transfer taxes and, in a few states, a tax on the mortgage.</li>
          <li><strong>Prepaids</strong>: interest to the end of the month and the first year of homeowners insurance.</li>
          <li><strong>Escrow deposits</strong>: a few months of property tax and insurance to start your escrow account.</li>
        </ul>
        <p>The first three are true costs. The last two are your own money paid early.</p>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Worked example" title="A worked example">
        <p>
          A {usd(400_000)} home with 10% down, a {usd(360_000)} 30-year loan at 7.25%, closing on the 16th of the month, at the US typical property tax rate. The fee amounts are
          the calculator&rsquo;s examples, not national averages.
        </p>
        <WorkedExample
          title="$400,000 purchase, 10% down"
          steps={[
            { label: "Lender fees", note: "0.5% origination + $1,200 other fees", value: usd(3_000) },
            { label: "Title and services", note: "title $2,000, settlement $800, appraisal $650, inspection $450", value: usd(3_900) },
            { label: "Recording fees", value: usd(150) },
            { label: "Prepaids", note: "15 days of interest + a year of insurance", value: usd2(2_872.6) },
            { label: "Escrow deposits", note: "3 months of tax + 2 of insurance", value: usd(1_190) },
          ]}
          total={{ label: "Closing costs", value: usd2(11_112.6) }}
        />
        <p>
          The fees alone (lender, services and government) are {usd(7_050)}, 1.76% of the price. Add the {usd(40_000)} down payment and the cash to close is{" "}
          {usd2(51_112.6)}. The monthly principal and interest payment is {usd2(2_455.83)}.
        </p>
      </GuideSection>

      <GuideSection id="lender" n={4} kicker="Lender" title="Lender fees">
        <p>
          Lenders charge for making the loan. Some quote a single <strong>origination fee</strong>, often a percentage of the loan; others list underwriting, processing,
          application and document fees separately. The credit report, flood certification and tax service fees are small charges the lender passes on.
        </p>
        <p>
          Lender fees are the costs that vary most between lenders, and they are on page 2 of the Loan Estimate (section A), so comparing offers is easy. A lender with a lower
          rate and higher fees can still be the better deal if you keep the loan a long time.
        </p>
      </GuideSection>

      <GuideSection id="points" n={5} kicker="Points" title="Discount points">
        <p>
          A discount point costs 1% of the loan and lowers the rate, often by about a quarter of a point, though the trade varies by lender and by day. In the example, one point
          adds {usd(3_600)}, taking closing costs to {usd2(14_712.6)}.
        </p>
        <p>
          Points pay off only if you keep the loan long enough for the lower payment to make up the cost. Divide the cost by the monthly saving to get the months to break even.
          Our <a href="/us/housing/refinance-calculator">refinance calculator</a>{" "}works out the same break-even for a new loan.
        </p>
      </GuideSection>

      <GuideSection id="title" n={6} kicker="Title" title="Title insurance and settlement">
        <p>
          <strong>Title insurance</strong>{" "}protects against claims on the property from before you owned it: unpaid liens, forged deeds, errors in public records. The
          lender&rsquo;s policy is required and protects the loan. The owner&rsquo;s policy is optional and protects your equity. Both are paid once, at closing.
        </p>
        <p>
          Title premiums are set or filed by state and depend on the price, so the calculator takes them as a percentage. In some states the seller customarily buys the
          owner&rsquo;s policy. The <strong>settlement fee</strong>{" "}pays the title company, escrow agent or attorney who runs the closing; some states require an attorney.
        </p>
      </GuideSection>

      <GuideSection id="government" n={7} kicker="Taxes" title="Recording fees and transfer taxes">
        <p>
          The county charges a <strong>recording fee</strong>{" "}to put the deed and mortgage on the public record, usually a modest amount. <strong>Transfer taxes</strong>{" "}(also
          called deed, conveyance or excise taxes) can be much larger. They are set by the state, county or city, and who pays depends on local custom and your contract.
        </p>
        <ul>
          <li>Texas and many other states have no state transfer tax at all.</li>
          <li>Pennsylvania charges 1% at the state level, and most localities add about 1% more; buyer and seller usually split it.</li>
          <li>New York State charges 0.4%, New York City adds more, and buyers of homes of {usd(1_000_000)} or more pay a 1% &quot;mansion tax&quot;.</li>
          <li>A few states tax the mortgage itself, such as New York&rsquo;s mortgage recording tax and Florida&rsquo;s intangible tax on new loans.</li>
        </ul>
        <p>
          The calculator leaves transfer tax at zero unless you enter a rate, because local rules vary too much to fill in automatically. In the example, a 1% buyer&rsquo;s share
          would add {usd(4_000)}, taking closing costs to {usd2(15_112.6)}. Your title company can tell you the exact figure.
        </p>
      </GuideSection>

      <GuideSection id="prepaids" n={8} kicker="Prepaids" title="Prepaid interest and insurance">
        <p>
          Mortgage interest is paid in arrears, so your first payment is usually due on the first day of the second month after closing. To cover the days between closing
          and the end of the closing month, you prepay interest at closing. On the example loan that is {usd2(71.51)} a day.
        </p>
        <Bars
          format={usd2}
          items={[
            { label: "Close on the last day (1 day)", value: 71.51 },
            { label: "Close mid-month (15 days)", value: 1_072.6 },
            { label: "Close on the 1st (30 days)", value: 2_145.21 },
          ]}
        />
        <p>
          Closing late in the month lowers the cash you need, but it does not save money overall: you simply start paying interest through the regular payments instead. Lenders
          also want the first year of homeowners insurance paid before closing.
        </p>
      </GuideSection>

      <GuideSection id="escrow" n={9} kicker="Escrow" title="Escrow deposits">
        <p>
          If your lender collects property tax and insurance through escrow, it opens the account with a starting deposit, so there is enough money when the first bills come
          due. The number of months depends on when your local taxes are due. Federal rules let the servicer hold a cushion of up to two months on top.
        </p>
        <p>
          The calculator sets the property tax from your state&rsquo;s typical rate (0.89% of value for the US as a whole, Census Bureau 2024). Our{" "}
          <a href="/us/housing/property-tax-calculator">property tax calculator</a>{" "}works it out from your own mill rate and exemptions.
        </p>
      </GuideSection>

      <GuideSection id="percent" n={10} kicker="Price" title="Why the share falls as the price rises">
        <p>
          Many fees are flat amounts: the appraisal, the inspection, recording and much of the lender&rsquo;s charges. They weigh more on a cheaper home. With the same settings, a
          {" "}{usd(250_000)} home costs {usd2(8_951.63)} to close, or 3.58% of the price, against 2.78% at {usd(400_000)}. Percentage-based items such as title insurance,
          transfer tax and points scale with the price.
        </p>
      </GuideSection>

      <GuideSection id="down-payment" n={11} kicker="Down payment" title="Smaller down payments">
        <p>
          With 3.5% down instead of 10%, the loan on the {usd(400_000)} home is {usd(386_000)}, so loan-based fees and prepaid interest rise a little: closing costs are{" "}
          {usd2(11_320.07)}. But the cash to close falls to {usd2(25_320.07)}. FHA, VA and USDA loans add their own upfront fees, which are usually rolled into the loan. Our{" "}
          <a href="/us/housing/mortgage-calculator">mortgage calculator</a>{" "}shows the monthly cost, including PMI, of a smaller down payment.
        </p>
      </GuideSection>

      <GuideSection id="credits" n={12} kicker="Credits" title="Seller and lender credits">
        <p>
          A <strong>seller credit</strong>{" "}(seller concession) is money the seller agrees to put toward your closing costs, often in exchange for a higher price or instead of
          repairs. Loan programs cap it: for conventional loans Fannie Mae allows 3% to 9% of the price depending on the down payment. In the example, a {usd(6_000)} credit cuts the
          cash to close to {usd2(45_112.6)}.
        </p>
        <p>
          A <strong>lender credit</strong>{" "}is the reverse of points: the lender pays some costs in return for a higher rate. It helps when cash is short, but costs more over
          time. Credits can&rsquo;t exceed your actual costs, and they can&rsquo;t be taken as cash.
        </p>
      </GuideSection>

      <GuideSection id="cash" n={13} kicker="The total" title="Cash to close">
        <p>Cash to close is the down payment plus closing costs, less credits and the earnest money you already paid:</p>
        <DataTable
          head={["Example", "Closing costs", "Cash to close"]}
          numeric={[1, 2]}
          rows={[
            ["$400,000, 10% down", usd2(11_112.6), usd2(51_112.6)],
            ["Plus 1 discount point", usd2(14_712.6), usd2(54_712.6)],
            ["With a $6,000 seller credit", usd2(11_112.6), usd2(45_112.6)],
            ["With $8,000 earnest money already paid", usd2(11_112.6), usd2(43_112.6)],
            ["3.5% down instead", usd2(11_320.07), usd2(25_320.07)],
          ]}
        />
        <p>
          Keep the money in a checking or savings account well before closing: lenders want to see where large deposits came from. Our{" "}
          <a href="/us/savings/savings-goal-calculator">savings goal calculator</a>{" "}shows how long it takes to save it.
        </p>
      </GuideSection>

      <GuideSection id="documents" n={14} kicker="Paperwork" title="Loan Estimate and Closing Disclosure">
        <p>
          Within three business days of your application, the lender must send a <strong>Loan Estimate</strong>: a standard three-page form listing the rate, payment and every
          closing cost. Because every lender uses the same form, you can lay offers side by side.
        </p>
        <p>
          At least three business days before closing you receive the <strong>Closing Disclosure</strong>, with the final figures. Compare it line by line with the Loan Estimate.
          Some fees can&rsquo;t rise at all, others can rise by no more than 10% in total, and some (such as prepaids) can change freely.
        </p>
      </GuideSection>

      <GuideSection id="shopping" n={15} kicker="Saving" title="Which costs you can shop for">
        <p>
          Section C of the Loan Estimate lists services you can shop for, such as title services and the settlement agent. The lender gives you a list of providers, but you can
          choose your own. Lender fees are negotiable, and asking two or three lenders for Loan Estimates on the same day is the best way to see the range.
        </p>
        <Callout title="Same day, same loan">
          Rates change daily, so ask for every Loan Estimate on the same day, for the same loan amount, term and lock period. Otherwise the comparison is meaningless.
        </Callout>
      </GuideSection>

      <GuideSection id="timeline" n={16} kicker="Timing" title="When you pay what">
        <Timeline
          items={[
            { when: "With the offer", what: "Earnest money", detail: "Held in escrow and credited at closing." },
            { when: "Before closing", what: "Inspection and appraisal", detail: "Often paid when ordered." },
            { when: "Before closing", what: "Homeowners insurance", detail: "The first year's premium." },
            { when: "At closing", what: "Everything else", detail: "Down payment, fees, taxes, prepaid interest and escrow deposits, by wire or cashier's check." },
          ]}
        />
      </GuideSection>

      <GuideSection id="wire" n={17} kicker="Safety" title="Wire fraud">
        <p>
          Criminals hack or imitate real estate and title company emails and send fake wiring instructions just before closing. Money sent to the wrong account is often lost
          for good. Confirm the instructions by phone, using a number you already have, never one in the email.
        </p>
      </GuideSection>

      <GuideSection id="taxes" n={18} kicker="Taxes" title="Closing costs and your taxes">
        <p>
          Most closing costs are not deductible. If you itemize, points paid on a loan to buy your main home are usually deductible in the year you pay them, and the property tax
          and mortgage interest you prepay count with the rest of the year&rsquo;s. Other costs, such as title insurance and recording fees, are added to your home&rsquo;s cost
          basis, which lowers the taxable gain when you sell.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Saving only for the down payment.</li>
          <li>Comparing lenders on rate alone instead of the full Loan Estimate.</li>
          <li>Forgetting transfer taxes in a high-tax state or city.</li>
          <li>Moving money between accounts in the weeks before closing without a paper trail.</li>
          <li>Wiring money on the strength of an email.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={20} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the price, down payment, rate and state.</li>
          <li>Enter any transfer tax you will pay; ask your agent or title company.</li>
          <li>Under More options, replace the example fees with your Loan Estimate&rsquo;s figures.</li>
          <li>Add seller or lender credits and earnest money to see the final cash to close.</li>
        </ol>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["Commonly quoted closing costs", "2% to 5% of the price"],
            ["One discount point", "1% of the loan"],
            ["Loan Estimate", "within 3 business days of applying"],
            ["Closing Disclosure", "at least 3 business days before closing"],
            ["Escrow cushion (RESPA)", "up to 2 months"],
            ["Typical property tax (Census Bureau, 2024)", "about 0.89% of value a year"],
            ["Fannie Mae seller contribution limits", "3% to 9% of the price, by down payment"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

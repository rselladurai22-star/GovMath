import { Bars, Callout, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** US property tax guide. Figures from src/lib/us/estate-property.ts and the state rates in src/lib/us/states.ts. */

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how-it-works", title: "How property tax works" },
  { id: "assessment", title: "Market value and assessed value" },
  { id: "mills", title: "Mill rates" },
  { id: "example", title: "A worked example" },
  { id: "effective", title: "Effective tax rates" },
  { id: "states", title: "Property tax by state" },
  { id: "homestead", title: "Homestead exemptions" },
  { id: "examples", title: "Three state examples" },
  { id: "seniors", title: "Senior, veteran and disability relief" },
  { id: "caps", title: "Assessment caps and freezes" },
  { id: "new-buyers", title: "Buying a home: the reassessment trap" },
  { id: "escrow", title: "Escrow and your mortgage payment" },
  { id: "growth", title: "How the bill grows" },
  { id: "appeal", title: "Appealing your assessment" },
  { id: "deduction", title: "Deducting property tax" },
  { id: "calendar", title: "The property tax year" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "using", title: "Using the calculator well" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "U.S. Census Bureau: American Community Survey 2024, median real estate taxes (B25103)", href: "https://data.census.gov/table/ACSDT1Y2024.B25103" },
  { label: "U.S. Census Bureau: American Community Survey 2024, median home value (B25077)", href: "https://data.census.gov/table/ACSDT1Y2024.B25077" },
  { label: "Tax Foundation: How high are property taxes in your state?", href: "https://taxfoundation.org/data/all/property-taxes/how-high-are-property-taxes-in-your-state/" },
  { label: "Texas Comptroller: Property tax exemptions", href: "https://comptroller.texas.gov/taxes/property-tax/exemptions/" },
  { label: "Florida Department of Revenue: Property tax exemptions", href: "https://floridarevenue.com/property/Pages/Taxpayers_Exemptions.aspx" },
  { label: "California State Board of Equalization: Homeowners' exemption", href: "https://www.boe.ca.gov/proptaxes/homeowners_exemption.htm" },
  { label: "CFPB: What is an escrow or impound account?", href: "https://www.consumerfinance.gov/ask-cfpb/what-is-an-escrow-or-impound-account-en-140/" },
  { label: "IRS: Topic 503, Deductible taxes", href: "https://www.irs.gov/taxtopics/tc503" },
];

export default function PropertyTaxGuide() {
  return (
    <Guide
      kicker="The property tax guide"
      title="How your property tax bill is worked out"
      intro={
        <>
          Property tax pays for schools, roads, police and fire services, and it is set locally: by your county, city, school district and a list of special districts. The
          same house can cost three times as much in tax in one state as in another. This guide explains assessments, mill rates, exemptions and caps, compares the states, and
          shows how to check your own bill.
        </>
      }
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Americans pay about 0.89% of their home&rsquo;s value a year in property tax: {usd(3_560)} on a {usd(400_000)} home.</li>
          <li>Typical state rates run from 0.27% in Hawaii to 1.92% in Illinois: {usd(1_080)} to {usd(7_680)} on the same home.</li>
          <li>Your bill is the taxable value (assessed value less exemptions) times the local rate.</li>
          <li>A homestead exemption on your main home can cut the bill by hundreds or thousands of dollars, but you usually have to apply.</li>
        </ul>
        <KeyStats
          items={[
            { value: "0.89%", label: "US typical rate (Census Bureau, 2024)" },
            { value: usd(3_560), label: "Tax on a $400,000 home at that rate" },
            { value: "1.92%", label: "Highest state: Illinois" },
            { value: "0.27%", label: "Lowest state: Hawaii" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how-it-works" n={2} kicker="Basics" title="How property tax works">
        <p>Every property tax bill comes from the same three steps:</p>
        <ol>
          <li>
            <strong>Assessment.</strong>{" "}The county assessor estimates your home&rsquo;s market value and applies the state&rsquo;s assessment ratio.
          </li>
          <li>
            <strong>Exemptions.</strong>{" "}Homestead, senior, veteran and other exemptions come off the assessed value.
          </li>
          <li>
            <strong>Rate.</strong>{" "}Each local body (county, city, school district, library, fire district) sets a rate. Added together they make your total rate, which is
            applied to the taxable value.
          </li>
        </ol>
        <p>Credits and rebates, where they exist, come off the final bill.</p>
      </GuideSection>

      <GuideSection id="assessment" n={3} kicker="Assessment" title="Market value and assessed value">
        <p>
          <strong>Market value</strong>{" "}is what the home would sell for. <strong>Assessed value</strong>{" "}is the figure the tax is charged on. Many states assess at 100% of
          market value; others tax a fixed share. A state that assesses at 40% and a state that assesses at 100% can produce the same bill, if the first one&rsquo;s rate is
          two and a half times higher. That is why comparing rates between places only works with effective rates.
        </p>
        <p>
          Assessments are not always current. Some counties reassess every year; others every few years; a few states limit how fast assessed value can rise. Your assessment
          notice shows both figures.
        </p>
      </GuideSection>

      <GuideSection id="mills" n={4} kicker="Rates" title="Mill rates">
        <p>
          Many places quote the rate in <strong>mills</strong>. One mill is one-tenth of a cent, or $1 of tax for every $1,000 of taxable value. A rate of 20 mills is 2%. To
          turn a percentage into mills, multiply by 10; to turn mills into a percentage, divide by 10.
        </p>
        <DataTable
          head={["Mill rate", "Percent of taxable value", "Tax on $100,000 taxable"]}
          numeric={[1, 2]}
          rows={[
            ["10 mills", "1.0%", usd(1_000)],
            ["20 mills", "2.0%", usd(2_000)],
            ["35 mills", "3.5%", usd(3_500)],
            ["60 mills", "6.0%", usd(6_000)],
          ]}
        />
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Worked example" title="A worked example">
        <p>A {usd(350_000)} home in a county that assesses at 40% of value, with a combined rate of 60 mills and a {usd(25_000)} homestead exemption.</p>
        <WorkedExample
          title="Mill rate method"
          steps={[
            { label: "Market value", value: usd(350_000) },
            { label: "Assessed value", note: "40% of value", value: usd(140_000) },
            { label: "Homestead exemption", value: "−" + usd(25_000) },
            { label: "Taxable value", value: usd(115_000) },
            { label: "Rate", note: "60 mills = $60 per $1,000", value: "6%" },
          ]}
          total={{ label: "Property tax a year", value: usd(6_900) }}
        />
        <p>
          Without the exemption, the bill would be {usd(8_400)}, so the homestead exemption saves {usd(1_500)} a year. The effective rate is about 1.97% of market value, even
          though the headline rate is 6%.
        </p>
      </GuideSection>

      <GuideSection id="effective" n={6} kicker="Comparing" title="Effective tax rates">
        <p>
          The <strong>effective rate</strong>{" "}is the tax divided by the home&rsquo;s market value. It cuts through assessment ratios and mill rates, so it is the only fair way to
          compare places. The state figures in the calculator are effective rates: the median real estate tax paid in each state divided by the median home value, from the
          Census Bureau&rsquo;s 2024 American Community Survey. That is the same measure the Tax Foundation uses.
        </p>
        <p>
          A state figure is an average. Rates inside a state differ by county, city and school district, sometimes by a factor of two or more. Use your own bill or the
          county&rsquo;s published rate when you have it.
        </p>
      </GuideSection>

      <GuideSection id="states" n={7} kicker="States" title="Property tax by state">
        <p>Here is what a {usd(400_000)} home would pay at each state&rsquo;s typical rate, for a selection of states:</p>
        <Bars
          format={usd}
          items={[
            { label: "Illinois (1.92%)", value: 7_680 },
            { label: "New Jersey (1.89%)", value: 7_560 },
            { label: "Connecticut (1.66%)", value: 6_640 },
            { label: "New York (1.45%)", value: 5_800 },
            { label: "Texas (1.31%)", value: 5_240 },
            { label: "US (0.89%)", value: 3_560 },
            { label: "Florida (0.75%)", value: 3_000 },
            { label: "California (0.71%)", value: 2_840 },
            { label: "Colorado (0.49%)", value: 1_960 },
            { label: "Alabama (0.38%)", value: 1_520 },
            { label: "Hawaii (0.27%)", value: 1_080 },
          ]}
        />
        <p>
          States with no income tax, such as Texas and New Hampshire, often lean more on property tax. States with high home values, such as Hawaii and California, can raise a
          lot with a low rate. The calculator&rsquo;s table ranks all 50 states and DC for the value you enter.
        </p>
      </GuideSection>

      <GuideSection id="homestead" n={8} kicker="Exemptions" title="Homestead exemptions">
        <p>
          A <strong>homestead exemption</strong>{" "}lowers the taxable value of the home you live in. It does not apply to rentals or second homes. Some are a fixed dollar amount,
          some are a percentage, and some apply only to certain levies, such as school taxes. Most states have one, and many counties add their own.
        </p>
        <p>
          The exemption is rarely automatic. You apply once to the county appraiser or assessor, usually by a deadline early in the year, and it continues while you live there.
          New buyers miss it more often than anyone: check your first bill.
        </p>
      </GuideSection>

      <GuideSection id="examples" n={9} kicker="Examples" title="Three state examples">
        <ul>
          <li>
            <strong>Texas</strong>{" "}takes {usd(140_000)} off the value for school district taxes on a homestead, and another {usd(60_000)} for owners 65 or older or disabled
            (both raised by voters in November 2025). School taxes are also frozen at the level of the year you turn 65.
          </li>
          <li>
            <strong>Florida</strong>{" "}takes up to {usd(50_000)} off a homestead&rsquo;s assessed value: the first {usd(25_000)} applies to all taxes and the second {usd(25_000)}
            {" "}(on value between {usd(50_000)} and {usd(75_000)}) to non-school taxes. On a {usd(400_000)} home at Florida&rsquo;s typical 0.75%, applying {usd(50_000)} to every
            levy would cut the bill from {usd(3_000)} to {usd(2_625)}; the real saving is a little less because of the school-tax rule.
          </li>
          <li>
            <strong>California</strong>{" "}gives a {usd(7_000)} homeowners&rsquo; exemption. Its bigger protection is Proposition 13, which limits the basic rate to 1% of assessed
            value plus voter-approved debt, and caps yearly rises in assessed value at 2% until the home is sold.
          </li>
        </ul>
        <Callout title="Exemptions in the calculator">
          The calculator applies every exemption to the whole rate. Where an exemption covers only some levies, such as Texas&rsquo;s school exemption, use the mill rate method
          and enter the school rate on its own, or enter a smaller exemption to get the same saving.
        </Callout>
      </GuideSection>

      <GuideSection id="seniors" n={10} kicker="Relief" title="Senior, veteran and disability relief">
        <p>Most states offer extra help to some owners. The common types are:</p>
        <ul>
          <li><strong>Senior exemptions</strong>: a larger exemption from age 65, sometimes tied to income.</li>
          <li><strong>Freezes</strong>: the assessed value or the tax stays at the level of the year you qualify.</li>
          <li><strong>Circuit breakers</strong>: a credit or rebate when the tax is a high share of your income.</li>
          <li><strong>Deferrals</strong>: the tax is postponed until the home is sold, with interest.</li>
          <li><strong>Veteran exemptions</strong>: partial or full exemptions for disabled veterans and their surviving spouses.</li>
        </ul>
        <p>Enter exemptions under More options and credits as a dollar amount. The county assessor&rsquo;s website lists what is available and how to apply.</p>
      </GuideSection>

      <GuideSection id="caps" n={11} kicker="Caps" title="Assessment caps and freezes">
        <p>
          Many states limit how fast assessed value, or the total tax levy, can grow. California caps yearly increases at 2% and Florida&rsquo;s Save Our Homes rule caps
          homesteads at 3% (or inflation, if lower). Under a cap, long-time owners can pay far less than new neighbors in identical houses.
        </p>
        <p>
          The cap usually ends when the home sells. The buyer is assessed at market value, which brings us to the most common budgeting mistake.
        </p>
      </GuideSection>

      <GuideSection id="new-buyers" n={12} kicker="Buying" title="Buying a home: the reassessment trap">
        <p>
          A listing shows the seller&rsquo;s last tax bill. That bill may include the seller&rsquo;s homestead exemption, senior freeze or years of capped growth. After you buy,
          the home is often reassessed at the price you paid, and your bill can jump.
        </p>
        <p>
          Budget from the purchase price times the local effective rate, not the seller&rsquo;s bill. Our <a href="/us/housing/mortgage-calculator">mortgage calculator</a>
          {" "}adds the result to your monthly payment, and the <a href="/us/housing/closing-cost-calculator">closing cost calculator</a>{" "}shows the tax you prepay into escrow
          at closing.
        </p>
      </GuideSection>

      <GuideSection id="escrow" n={13} kicker="Escrow" title="Escrow and your mortgage payment">
        <p>
          Most lenders collect property tax with your monthly payment and hold it in an escrow account, then pay the bill when it is due. On a {usd(3_560)} tax bill that is
          {" "}{usd(296.67)} a month. Federal rules (RESPA) let the servicer keep a cushion of up to two months&rsquo; worth, {usd(593.33)} here, to cover increases.
        </p>
        <p>
          The servicer reviews the account once a year. If the tax rose, you get a shortage notice and a higher payment. This is the main reason a fixed-rate mortgage payment
          changes.
        </p>
      </GuideSection>

      <GuideSection id="growth" n={14} kicker="Growth" title="How the bill grows">
        <p>
          If a home&rsquo;s value rises 3% a year and the rate stays the same, a {usd(3_560)} bill becomes {usd(4_784)} after ten years. At 2% a year it becomes{" "}
          {usd(4_340)}. In practice, local governments often lower rates when values jump, and raise them when budgets need more, so bills track spending more than prices.
        </p>
      </GuideSection>

      <GuideSection id="appeal" n={15} kicker="Appeals" title="Appealing your assessment">
        <p>If your assessed value looks too high, you can appeal. The steps are similar everywhere:</p>
        <ol>
          <li>Check the notice for errors: square footage, bedrooms, lot size, a garage you don&rsquo;t have.</li>
          <li>Find three to five recent sales of similar homes nearby that sold for less.</li>
          <li>File by the deadline on the notice, often 30 to 60 days after it is mailed.</li>
          <li>Attend an informal review or a hearing before the local board.</li>
        </ol>
        <p>Appeals are free in most places. You can appeal the value, not the rate.</p>
      </GuideSection>

      <GuideSection id="deduction" n={16} kicker="Income tax" title="Deducting property tax">
        <p>
          Property tax on your home is deductible on your federal return only if you itemize. It counts toward the state and local tax (SALT) deduction, which also includes
          state income or sales tax and is capped. With the 2026 standard deduction at {usd(16_100)} single and {usd(32_200)} for married couples, most homeowners no longer
          itemize. Our <a href="/us/taxes/federal-income-tax">federal income tax calculator</a>{" "}shows whether itemizing helps you.
        </p>
      </GuideSection>

      <GuideSection id="calendar" n={17} kicker="Timing" title="The property tax year">
        <Timeline
          items={[
            { when: "Valuation date", what: "Often January 1", detail: "The assessor values the home as of a fixed date." },
            { when: "Spring", what: "Assessment notices", detail: "Check the value and exemptions; the appeal window opens." },
            { when: "Summer", what: "Rates set", detail: "Local bodies adopt budgets and tax rates." },
            { when: "Fall or winter", what: "Bills due", detail: "Some places bill once a year, others in two or four installments." },
          ]}
        />
        <p>Dates vary by state and county. Some places bill in arrears, so a bill paid this year may cover last year.</p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li>Budgeting from the seller&rsquo;s bill instead of the purchase price.</li>
          <li>Never applying for the homestead exemption.</li>
          <li>Comparing headline mill rates between counties with different assessment ratios.</li>
          <li>Missing the appeal deadline on the assessment notice.</li>
          <li>Forgetting that an escrow shortage raises the mortgage payment.</li>
        </ul>
      </GuideSection>

      <GuideSection id="using" n={19} kicker="How to use it" title="Using the calculator well">
        <ol>
          <li>Enter the home&rsquo;s value and pick your state for a typical rate.</li>
          <li>If you have your bill, switch to the mill rate method and enter the total mills and the assessment ratio.</li>
          <li>Add your homestead exemption, and any senior or veteran exemption or credit under More options.</li>
          <li>Check the state comparison and the 10-year view.</li>
        </ol>
        <p>
          Weighing renting against owning? Our <a href="/us/housing/rent-affordability">rent affordability calculator</a>{" "}is a good next step.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Reference" title="Key numbers">
        <DataTable
          head={["Item", "Figure"]}
          rows={[
            ["US typical effective rate (Census Bureau, 2024)", "about 0.89% of value"],
            ["Highest state rates", "Illinois 1.92%, New Jersey 1.89%, Connecticut 1.66%"],
            ["Lowest state rates", "Hawaii 0.27%, Alabama 0.38%, Arizona and Idaho 0.43%"],
            ["One mill", "$1 per $1,000 of taxable value"],
            ["Texas school homestead exemption", `${usd(140_000)}, plus ${usd(60_000)} at 65 or disabled`],
            ["Florida homestead exemption", `up to ${usd(50_000)}`],
            ["California homeowners' exemption", usd(7_000)],
            ["Escrow cushion (RESPA)", "up to 2 months of payments"],
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

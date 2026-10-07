import {
  Bars,
  Callout,
  CompareCards,
  DataTable,
  Figure,
  Guide,
  GuideSection,
  KeyStats,
  WorkedExample,
  type Source,
  type TocItem,
} from "@/components/guide/Guide";

/** Business mileage — the guide. Pure server component. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "rates", title: "The approved mileage rates" },
  { id: "business", title: "What counts as a business journey" },
  { id: "self-employed", title: "Mileage for the self-employed" },
  { id: "actual", title: "Mileage rate or actual costs?" },
  { id: "employees", title: "Mileage for employees" },
  { id: "over", title: "When your employer pays more" },
  { id: "passengers", title: "Passengers" },
  { id: "company-cars", title: "Company cars and electric vehicles" },
  { id: "records", title: "Keeping a mileage log" },
  { id: "year", title: "A year of mixed travel" },
  { id: "directors", title: "Company directors" },
  { id: "other-travel", title: "Other travel you can claim" },
  { id: "rate-value", title: "Is 45p enough?" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Travel: mileage and fuel rates and allowances", href: "https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances" },
  { label: "GOV.UK — Simplified expenses: vehicles", href: "https://www.gov.uk/simpler-income-tax-simplified-expenses/vehicles-" },
  { label: "GOV.UK — Claim tax relief for your job expenses: vehicles", href: "https://www.gov.uk/tax-relief-for-employees/vehicles-you-use-for-work" },
  { label: "GOV.UK — Advisory fuel rates for company cars", href: "https://www.gov.uk/guidance/advisory-fuel-rates" },
];

export default function MileageGuide() {
  return (
    <Guide
      kicker="The mileage guide"
      title="Business mileage: what you can claim"
      intro={
        <>
          If you use your own vehicle for work, HMRC lets you claim a fixed amount per business mile. The self-employed claim
          it as an expense; employees get it tax-free from their employer or claim tax relief on any shortfall. This guide
          explains the rates, what counts as business travel, how the 10,000-mile threshold works and what records to keep.
        </>
      }
      meta={["2026/27 rates", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>
            <strong>Cars and vans:</strong> 45p a mile for the first 10,000 business miles in the tax year, 25p a mile after
            that.
          </li>
          <li>
            <strong>Motorcycles:</strong> 24p a mile. <strong>Bicycles:</strong> 20p a mile.
          </li>
          <li>Commuting to your normal workplace is not business mileage.</li>
        </ul>
        <KeyStats
          items={[
            { value: "45p", label: "Per mile, first 10,000 miles" },
            { value: "25p", label: "Per mile after 10,000" },
            { value: "£3,600", label: "Claim for 8,000 business miles" },
            { value: "£936", label: "Tax and NI saved on that, basic rate sole trader" },
          ]}
        />
      </GuideSection>

      <GuideSection id="rates" n={2} kicker="Rates" title="The approved mileage rates">
        <p>
          HMRC&rsquo;s <strong>approved mileage allowance payments</strong> (AMAP) are the same for petrol, diesel, hybrid and
          electric vehicles. They are meant to cover all the costs of running the vehicle: fuel, insurance, servicing, tax,
          repairs and wear and tear.
        </p>
        <DataTable
          caption="Approved mileage rates, 2026/27"
          head={["Vehicle", "First 10,000 business miles", "Above 10,000"]}
          rows={[
            ["Car or van", "45p", "25p"],
            ["Motorcycle", "24p", "24p"],
            ["Bicycle", "20p", "20p"],
          ]}
        />
        <p>
          The 10,000 miles are counted across the whole tax year, 6 April to 5 April, and across all your business journeys in
          cars and vans. Once you pass 10,000, every further mile is at 25p, so the average rate falls as mileage rises.
        </p>
        <Figure label="Claim for a car or van at different annual mileages" caption="The average rate falls from 45p to 35p a mile at 20,000 miles.">
          <Bars
            items={[
              { label: "5,000 miles", value: 2250 },
              { label: "10,000 miles", value: 4500 },
              { label: "15,000 miles", value: 5750 },
              { label: "20,000 miles", value: 7000 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="business" n={3} kicker="The test" title="What counts as a business journey">
        <p>A journey counts if you make it for work, other than ordinary <a href="/vehicles/commuter-comparison">commuting</a>. Typical examples:</p>
        <ul>
          <li>visiting a client, customer or supplier;</li>
          <li>travelling to a temporary workplace, such as a building site or a client&rsquo;s office for a project;</li>
          <li>going to a training course for your current job or trade;</li>
          <li>driving between two of your workplaces during the day;</li>
          <li>collecting stock or materials, or going to the bank or post office for the business.</li>
        </ul>
        <p>
          <strong>Commuting</strong> between home and a permanent workplace does not count, even if you work on the way. A
          workplace is usually temporary if you go there for a limited task or period. For employees, a workplace stops being
          temporary if you expect to spend 40% or more of your working time there for more than 24 months.
        </p>
        <Callout title="Working from home">
          If your home is genuinely your business base, as it is for many sole traders, journeys from home to clients and
          suppliers are business journeys. For an employee who simply chooses to work from home some days, the journey to the
          office is still commuting.
        </Callout>
      </GuideSection>

      <GuideSection id="self-employed" n={4} kicker="Sole traders" title="Mileage for the self-employed">
        <p>
          Sole traders and partners can claim the mileage rates as <strong>simplified expenses</strong>{" "}for cars, vans and
          motorcycles. Bicycles are not included: claim the business share of a bike&rsquo;s actual costs instead. The claim is a business expense, so it cuts your profit and therefore your Income Tax and Class 4
          National Insurance.
        </p>
        <WorkedExample
          title="8,000 business miles by car, basic-rate sole trader"
          steps={[
            { label: "8,000 miles at 45p", value: "£3,600" },
            { label: "Income Tax saved at 20%", value: "£720" },
            { label: "Class 4 NI saved at 6%", value: "£216" },
          ]}
          total={{ label: "Total saved", value: "£936" }}
        />
        <p>
          A higher-rate <a href="/business/sole-trader-tax">sole trader</a>{" "}saves 42% instead, £1,512 on the same mileage. Limited companies cannot use simplified
          expenses; instead, the company can pay a director the approved rates tax-free for business use of their own car.
        </p>
      </GuideSection>

      <GuideSection id="actual" n={5} kicker="Choosing a method" title="Mileage rate or actual costs?">
        <p>Sole traders can choose between two methods for each vehicle:</p>
        <CompareCards
          columns={[
            {
              name: "Mileage rate",
              rows: [
                { label: "Claim", value: "45p / 25p per business mile" },
                { label: "Records", value: "A mileage log" },
                { label: "Vehicle cost", value: "Included in the rate" },
                { label: "Best for", value: "Cheaper cars, moderate mileage" },
              ],
            },
            {
              name: "Actual costs",
              rows: [
                { label: "Claim", value: "Business share of all running costs" },
                { label: "Records", value: "Every receipt plus a log" },
                { label: "Vehicle cost", value: "Capital allowances" },
                { label: "Best for", value: "Expensive vehicles, high business use" },
              ],
            },
          ]}
        />
        <p>
          Under actual costs you claim the business share of fuel, insurance, servicing, repairs, road tax and breakdown cover,
          plus capital allowances on the vehicle itself. If you drive 12,000 miles a year, 8,000 of them for business, you
          claim two-thirds of those costs.
        </p>
        <Callout tone="warn" title="Once chosen, it sticks">
          If you use the mileage rate for a vehicle, you must keep using it for as long as you use that vehicle in the
          business. You cannot switch to actual costs in a year with a big repair bill. Vans are the main exception to watch:
          many van users do better on actual costs with capital allowances, so decide before the first claim.
        </Callout>
        <p>
          Whichever method you use, you can claim parking, tolls and congestion charges for business journeys on top. Fines
          are never allowable.
        </p>
      </GuideSection>

      <GuideSection id="employees" n={6} kicker="Employees" title="Mileage for employees">
        <p>
          If you use your own vehicle for work, your employer can pay you up to the approved rates tax-free. Many pay less. You
          can then claim <strong>Mileage Allowance Relief</strong> on the difference.
        </p>
        <WorkedExample
          title="5,000 business miles, employer pays 25p"
          steps={[
            { label: "Approved amount: 5,000 × 45p", value: "£2,250" },
            { label: "Paid by your employer: 5,000 × 25p", value: "−£1,250" },
            { label: "Relief you can claim", value: "£1,000" },
          ]}
          total={{ label: "Tax saved, basic rate", value: "£200" }}
        />
        <p>
          The relief reduces your taxable income, so the saving is your tax rate times the claim: £200 at 20%, £400 at 40%. If
          your employer pays nothing, you claim relief on the whole approved amount.
        </p>
        <p>
          Claim online or with form <strong>P87</strong> if your work expenses are £2,500 or less and you do not file a tax
          return; otherwise claim through Self Assessment. You can claim for up to four previous tax years, and HMRC may adjust
          your <a href="/tax-and-salary/tax-code-decoder">tax code</a>{" "}for future years.
        </p>
      </GuideSection>

      <GuideSection id="over" n={7} kicker="Taxable mileage" title="When your employer pays more">
        <p>
          If your employer pays more than the approved rate, the excess is taxable pay and goes through payroll or on your
          P11D. A common case is a flat rate that ignores the 10,000-mile drop.
        </p>
        <DataTable
          caption="Employer payments compared with the approved amount"
          head={["Situation", "Employer pays", "Approved amount", "Result"]}
          numeric={[1, 2]}
          rows={[
            ["1,000 miles at 55p", "£550", "£450", "£100 taxable"],
            ["12,000 miles at a flat 45p", "£5,400", "£5,000", "£400 taxable"],
            ["5,000 miles at 25p", "£1,250", "£2,250", "Claim relief on £1,000"],
            ["3,000 miles, nothing paid", "£0", "£1,350", "Claim relief on £1,350"],
          ]}
        />
      </GuideSection>

      <GuideSection id="passengers" n={8} kicker="Car sharing" title="Passengers">
        <p>
          An employer can pay up to <strong>5p a mile</strong> extra, tax-free, for each fellow employee you carry on a business
          journey in a car or van. If your employer does not pay it, you cannot claim relief for it. The self-employed cannot
          claim a passenger rate.
        </p>
      </GuideSection>

      <GuideSection id="company-cars" n={9} kicker="Other vehicles" title="Company cars and electric vehicles">
        <p>
          The approved mileage rates are for <strong>your own</strong>{" "}vehicle. If you drive a company car, different rules
          apply: your employer can reimburse business fuel at HMRC&rsquo;s <strong>advisory fuel rates</strong>, which are set
          quarterly by engine size and fuel type, with a separate advisory electricity rate for fully electric company cars.
        </p>
        <p>
          For your own <a href="/vehicles/petrol-vs-ev-cost">electric car</a>, the normal 45p and 25p rates apply. Because electricity is often cheaper per mile than
          petrol or diesel, the approved rate can work out well for EV drivers who charge at home.
        </p>
      </GuideSection>

      <GuideSection id="records" n={10} kicker="Paperwork" title="Keeping a mileage log">
        <p>For every business journey, record:</p>
        <ul>
          <li>the date;</li>
          <li>where you started and finished, ideally with postcodes;</li>
          <li>the reason for the journey, such as the client or site;</li>
          <li>the business miles.</li>
        </ul>
        <p>
          A spreadsheet, a notebook in the car or an app all work, as long as the records are made at the time. HMRC can ask for
          them, and a claim without a log is easy to challenge. Sole traders must keep records for at least five years after the
          31 January filing deadline; employees should keep them in case HMRC checks a relief claim.
        </p>
      </GuideSection>

      <GuideSection id="year" n={11} kicker="Worked example" title="A year of mixed travel">
        <p>
          A self-employed electrician drives 12,000 business miles in 2026/27 in their own van, on the mileage rate. They also
          take the train to two trade shows and stay one night at each.
        </p>
        <WorkedExample
          title="The electrician's travel claim"
          steps={[
            { label: "First 10,000 miles at 45p", value: "£4,500" },
            { label: "Next 2,000 miles at 25p", value: "£500" },
            { label: "Train fares, two hotel nights and meals away", value: "Claimed at cost" },
            { label: "Parking and tolls", value: "Claimed at cost" },
          ]}
          total={{ label: "Mileage claim", value: "£5,000" }}
        />
        <p>
          At the basic rate, the £5,000 mileage claim saves £1,300 in Income Tax and Class 4 NI. The average rate across the
          year is 41.7p a mile, because the last 2,000 miles are at 25p.
        </p>
        <p>
          If the same electrician had already claimed 8,000 miles before switching to a new van, the first 2,000 miles in the new
          van would be at 45p and the rest at 25p. The 10,000-mile limit applies across all your cars and vans in the year, not
          to each vehicle.
        </p>
      </GuideSection>

      <GuideSection id="directors" n={12} kicker="Limited companies" title="Company directors">
        <p>
          A director who uses their own car for company business is treated like an employee. The company can pay them the
          approved rates tax-free, and the payments are an allowable expense for the company, saving <a href="/business/corporation-tax">Corporation Tax</a>.
        </p>
        <p>
          This is often a tax-efficient way to cover the cost of a personal car used for work, because the director pays no
          Income Tax or <a href="/tax-and-salary/national-insurance">National Insurance</a>{" "}on the payments and the company gets relief. If the company pays less than the
          approved rate, the director can claim Mileage Allowance Relief on the difference.
        </p>
        <p>
          A car owned by the company is different: it usually creates a taxable benefit in kind, and fuel for private use can
          trigger a separate fuel benefit charge. The{" "}
          <a href="/vehicles/benefit-in-kind">benefit-in-kind calculator</a> covers company cars.
        </p>
      </GuideSection>

      <GuideSection id="other-travel" n={13} kicker="Beyond mileage" title="Other travel you can claim">
        <p>The same business travel rules apply to other costs of getting around:</p>
        <ul>
          <li>train, bus, coach and air fares for business journeys;</li>
          <li>taxis, where a taxi is reasonable for the journey;</li>
          <li>hotels and reasonable meals when you stay away overnight on business;</li>
          <li>meals while travelling away from your normal base, but not your everyday lunch.</li>
        </ul>
        <p>
          These are claimed at cost with receipts, whether you are self-employed or an employee reclaiming through your
          employer. The <a href="/business/allowable-expenses">allowable expenses calculator</a> totals them with your other
          business costs.
        </p>
      </GuideSection>

      <GuideSection id="rate-value" n={14} kicker="Real costs" title="Is 45p enough?">
        <p>
          The 45p rate has not changed since 2011, while the cost of buying and running a car has risen. Whether it covers your
          real costs depends on the vehicle. For a small, economical car the rate can be generous; for a large van, or a car
          bought new at a high price, it may fall short.
        </p>
        <p>
          If you are self-employed and think your actual costs are higher, work out both methods for a new vehicle before your
          first claim, because you cannot switch later. Employees cannot claim actual costs: the approved rate is the most they
          can receive tax-free or claim relief on.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={15} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "45p", label: "Cars and vans, first 10,000 miles" },
            { value: "25p", label: "Cars and vans, above 10,000" },
            { value: "24p", label: "Motorcycles" },
            { value: "20p", label: "Bicycles" },
            { value: "5p", label: "Passenger payment, per colleague" },
            { value: "£2,500", label: "P87 limit for employee claims" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

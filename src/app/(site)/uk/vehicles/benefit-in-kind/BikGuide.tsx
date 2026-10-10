import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Company car tax — the guide. Figures from src/lib/vehicles/tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "how", title: "How company car tax works" },
  { id: "rates", title: "The 2026/27 rates" },
  { id: "hybrids", title: "Plug-in hybrids and electric range" },
  { id: "diesel", title: "The diesel supplement" },
  { id: "example", title: "Worked examples" },
  { id: "compare", title: "Electric, hybrid, petrol and diesel compared" },
  { id: "your-rate", title: "Your tax rate matters" },
  { id: "reducing", title: "Things that reduce the benefit" },
  { id: "fuel", title: "Free fuel" },
  { id: "future", title: "Rates in future years" },
  { id: "employer", title: "What it costs your employer" },
  { id: "paying", title: "How the tax is collected" },
  { id: "cash", title: "Company car or cash allowance?" },
  { id: "list-price", title: "The list price, or P11D value" },
  { id: "opra", title: "Salary sacrifice and car allowances" },
  { id: "mid-year", title: "Changing car part-way through the year" },
  { id: "mileage", title: "Business fuel and advisory rates" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "HMRC — Company car benefit: the appropriate percentage", href: "https://www.gov.uk/guidance/company-car-benefit-the-appropriate-percentage-480-appendix-2" },
  { label: "GOV.UK — Tax on company benefits: company cars", href: "https://www.gov.uk/tax-company-benefits/tax-on-company-cars" },
  { label: "GOV.UK — Van benefit charge and fuel benefit charges 2026 to 2027", href: "https://www.gov.uk/government/publications/increase-to-van-benefit-charge-and-fuel-benefit-charges-for-cars-and-vans" },
  { label: "GOV.UK — Company car tax rates 2028 to 2030", href: "https://www.gov.uk/government/publications/income-tax-company-car-tax-rates-2028-to-2030" },
];

export default function BikGuide() {
  return (
    <Guide
      kicker="The company car tax guide"
      title="How company car tax works in 2026/27"
      intro={
        <>
          If your employer gives you a car you can use privately, you pay income tax on it as a benefit in kind. The amount depends on the
          car&rsquo;s list price, its CO2 emissions and <a href="/uk/vehicles/fuel-cost-journey">fuel</a>, and your own tax rate. This guide explains the 2026/27 rates, why electric cars
          are so much cheaper, and how the rates will change.
        </>
      }
      meta={["2026/27 rates", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Taxable benefit = list price × the appropriate percentage for the car.</li>
          <li>Electric cars are taxed at 4% in 2026/27. Petrol cars at 120 g/km are taxed at 30%.</li>
          <li>On a £40,000 car, an electric model costs a basic-rate taxpayer £320 a year; a 120 g/km <a href="/uk/vehicles/petrol-vs-ev-cost">petrol car</a>{" "}costs up to £4,800.</li>
          <li>The electric rate rises to 5% in 2027/28, 7% in 2028/29 and 9% in 2029/30.</li>
        </ul>
        <KeyStats
          items={[
            { value: "4%", label: "Electric cars, 2026/27" },
            { value: "37%", label: "Maximum rate" },
            { value: "£29,200", label: "Fuel benefit multiplier" },
            { value: "15%", label: "Employer National Insurance" },
          ]}
        />
      </GuideSection>

      <GuideSection id="how" n={2} kicker="Basics" title="How company car tax works">
        <p>
          A company car available for private use is a taxable benefit, even if you only use it to drive to and from work. HMRC turns the car
          into a cash value, called the cash equivalent or taxable benefit, and you pay income tax on it at your usual rates.
        </p>
        <ol>
          <li>Start with the list price when new, including VAT, delivery and factory options.</li>
          <li>Multiply by the appropriate percentage, set by CO2 emissions and fuel.</li>
          <li>Reduce it for any days the car was unavailable and any payments you make for private use.</li>
          <li>Pay income tax on the result at your <a href="/uk/tax-and-salary/tax-bracket-checker">marginal rate</a>.</li>
        </ol>
        <p>You do not pay employee National Insurance on a company car, but your employer pays Class 1A National Insurance on it.</p>
      </GuideSection>

      <GuideSection id="rates" n={3} kicker="Rates" title="The 2026/27 rates">
        <DataTable
          caption="Appropriate percentages for 2026/27, petrol and RDE2 diesel"
          head={["CO2 (g/km)", "Rate"]}
          numeric={[1]}
          rows={[
            ["0 (electric)", "4%"],
            ["1 to 50", "4% to 16% by electric range"],
            ["51 to 54", "17%"],
            ["55 to 59", "18%"],
            ["60 to 64", "19%"],
            ["65 to 69", "20%"],
            ["70 to 79", "21%"],
            ["80 to 84", "22%"],
            ["100 to 104", "26%"],
            ["120 to 124", "30%"],
            ["140 to 144", "34%"],
            ["155 and above", "37%"],
          ]}
        />
        <p>
          Above 80 g/km, the rate rises by one percentage point for every 5 g/km. For 2026/27, rates for cars at 74 g/km or less went up by
          one point, while rates for cars at 75 g/km and above stayed the same as in 2025/26.
        </p>
      </GuideSection>

      <GuideSection id="hybrids" n={4} kicker="Hybrids" title="Plug-in hybrids and electric range">
        <DataTable
          caption="Cars with 1 to 50 g/km, 2026/27"
          head={["Electric range", "Rate"]}
          numeric={[1]}
          rows={[
            ["130 miles or more", "4%"],
            ["70 to 129 miles", "7%"],
            ["40 to 69 miles", "10%"],
            ["30 to 39 miles", "14%"],
            ["Under 30 miles", "16%"],
          ]}
        />
        <p>
          Most plug-in hybrids have an electric range of 30 to 80 miles. From April 2028, the range no longer matters: all cars from 1 to 50
          g/km will be taxed at 18%, rising to 19% in 2029/30, which ends much of the tax advantage of plug-in hybrids.
        </p>
      </GuideSection>

      <GuideSection id="diesel" n={5} kicker="Diesel" title="The diesel supplement">
        <p>
          Diesel cars that do not meet the RDE2 emissions standard pay an extra 4 percentage points, up to the 37% maximum. A 120 g/km diesel
          is taxed at 34% instead of 30%. RDE2 diesels are taxed like petrol cars.
        </p>
      </GuideSection>

      <GuideSection id="example" n={6} kicker="Real numbers" title="Worked examples">
        <WorkedExample
          title="Electric car, list price £40,000, salary £45,000"
          steps={[
            { label: "Taxable benefit: £40,000 × 4%", value: "£1,600" },
            { label: "Tax at 20%", value: "£320 a year" },
          ]}
          total={{ label: "Cost a month", value: "£26.67" }}
        />
        <WorkedExample
          title="Petrol car, 120 g/km, list price £40,000, salary £45,000"
          steps={[
            { label: "Taxable benefit: £40,000 × 30%", value: "£12,000" },
            { label: "Part taxed at 20%, part at 40% as it takes income over £50,270", value: "£3,746 a year" },
          ]}
          total={{ label: "Cost a month", value: "£312.17" }}
        />
      </GuideSection>

      <GuideSection id="compare" n={7} kicker="Comparison" title="Electric, hybrid, petrol and diesel compared">
        <Figure label="Tax a year on a £40,000 company car" caption="Salary £45,000, England, 2026/27.">
          <Bars
            items={[
              { label: "Electric (4%)", value: 320 },
              { label: "Plug-in hybrid, 80 miles (7%)", value: 560 },
              { label: "Plug-in hybrid, 45 miles (10%)", value: 800 },
              { label: "Petrol 120 g/km (30%)", value: 3746 },
              { label: "Diesel 120 g/km (34%)", value: 4386 },
            ]}
          />
        </Figure>
        <p>
          The gap is large: a petrol car at this price costs over ten times as much in tax as an electric one. That is the main reason most new
          company cars are now electric.
        </p>
      </GuideSection>

      <GuideSection id="your-rate" n={8} kicker="Tax rate" title="Your tax rate matters">
        <p>
          The same car costs a higher-rate taxpayer twice as much as a basic-rate taxpayer. On £60,000, the electric car above costs £640 a
          year and the petrol car £4,800. A large benefit can also push part of your income into a higher band, as in the petrol example.
        </p>
        <p>
          Scottish taxpayers pay Scottish rates on the benefit. On a £45,000 Scottish salary, the electric car costs £672 a year, because that
          salary is already in the 42% band.
        </p>
        <Callout tone="warn" title="Watch the £100,000 line">
          A company car counts towards adjusted net income. If it takes you over £100,000, you start to lose your Personal Allowance and may
          lose tax-free childcare and <a href="/uk/benefits/free-childcare-hours">funded childcare</a>{" "}hours.
        </Callout>
      </GuideSection>

      <GuideSection id="reducing" n={9} kicker="Reductions" title="Things that reduce the benefit">
        <ul>
          <li><strong>Capital contribution:</strong> up to £5,000 you pay towards the car comes off the list price. On a 30% petrol car, £5,000 cuts the benefit by £1,500 and the tax from £3,746 to £3,146.</li>
          <li><strong>Payments for private use:</strong> what you pay your employer for private use comes off the benefit pound for pound.</li>
          <li><strong>Unavailable days:</strong> if the car is unavailable for 30 days or more in a row, the benefit is reduced pro rata.</li>
        </ul>
      </GuideSection>

      <GuideSection id="fuel" n={10} kicker="Fuel" title="Free fuel">
        <p>
          If your employer pays for fuel for private journeys, there is a second charge: the car&rsquo;s percentage × £29,200. For the 120 g/km
          petrol car, that adds £8,760 to your taxable income and takes the yearly tax from £3,746 to £7,250.
        </p>
        <p>
          Unless you drive a lot of private miles, it is usually cheaper to pay for private fuel yourself. There is no fuel benefit for
          electricity to charge an electric company car.
        </p>
      </GuideSection>

      <GuideSection id="future" n={11} kicker="Future" title="Rates in future years">
        <DataTable
          head={["Tax year", "Electric", "1 to 50 g/km"]}
          rows={[
            ["2026/27", "4%", "4% to 16% by range"],
            ["2027/28", "5%", "5% to 17% by range"],
            ["2028/29", "7%", "18%"],
            ["2029/30", "9%", "19%"],
          ]}
        />
        <p>
          Even at 9%, an electric car remains far cheaper to run as a company car than a petrol car. On a £40,000 car, the benefit would be
          £3,600 in 2029/30.
        </p>
      </GuideSection>

      <GuideSection id="employer" n={12} kicker="Employer" title="What it costs your employer">
        <p>
          Your employer pays Class 1A National Insurance at 15% on the taxable benefit. For a £40,000 electric car that is £240 a year; for the
          120 g/km petrol car it is £1,800. Electric cars also give employers a 100% first-year capital allowance, which is one reason many
          employers favour them.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={13} kicker="Collection" title="How the tax is collected">
        <p>
          Most employers either report the car on a P11D after the tax year, and HMRC adjusts your tax code, or payroll the benefit so the tax
          comes out of each payslip. Payrolling of benefits is due to become compulsory from April 2027. Check your tax code shows the right
          car, especially when you change car mid-year.
        </p>
      </GuideSection>

      <GuideSection id="cash" n={14} kicker="Choice" title="Company car or cash allowance?">
        <CompareCards
          columns={[
            {
              name: "Company car",
              rows: [
                { label: "Cost to you", value: "Tax on the benefit" },
                { label: "Running costs", value: "Often included" },
                { label: "Best for", value: "Electric cars and high business mileage" },
              ],
            },
            {
              name: "Cash allowance",
              rows: [
                { label: "Cost to you", value: "Taxed as salary, with National Insurance" },
                { label: "Running costs", value: "Yours, but you can claim 45p a business mile" },
                { label: "Best for", value: "Petrol or diesel drivers with low mileage" },
              ],
            },
          ]}
        />
      </GuideSection>

      <GuideSection id="list-price" n={15} kicker="Price" title="The list price, or P11D value">
        <p>
          The price used is the car&rsquo;s list price on the day before it was first registered, often called the P11D value. It includes
          VAT, delivery charges and any options or accessories fitted by the manufacturer or dealer. It excludes the first-year <a href="/uk/vehicles/car-tax-ved">car tax</a>{" "}and the
          first registration fee.
        </p>
        <p>
          Discounts your employer negotiates do not reduce the list price, and nor does the car&rsquo;s age. A three-year-old company car is
          taxed on the same list price as when it was new. Accessories added later, such as a tow bar worth £100 or more, are added to the
          price from when they are fitted.
        </p>
      </GuideSection>

      <GuideSection id="opra" n={16} kicker="Arrangements" title="Salary sacrifice and car allowances">
        <p>
          When a car is provided through salary sacrifice or instead of a cash allowance, special rules called optional remuneration
          arrangements apply. You are taxed on the higher of the normal benefit and the salary you gave up. Cars with emissions of 75 g/km or
          less are exempt from this rule, so electric cars are taxed only on the normal benefit.
        </p>
        <p>
          That is why salary sacrifice works so well for electric cars and so poorly for petrol ones. The{" "}
          <a href="/uk/vehicles/ev-salary-sacrifice">EV salary sacrifice calculator</a> shows what an electric car would cost you this way.
        </p>
      </GuideSection>

      <GuideSection id="mid-year" n={17} kicker="Changes" title="Changing car part-way through the year">
        <p>
          The benefit is worked out for each car for the days it was available to you. If you swap a petrol car for an electric one in
          October, you pay tax on the petrol car for about half the year and on the electric car for the rest. Your employer must tell HMRC
          about the change, usually on form P46(Car) if they do not payroll benefits, so that your tax code can be updated.
        </p>
        <p>
          If you are taxed on a car you no longer have, contact HMRC through your personal tax account. Overpaid tax is refunded or adjusted
          through your tax code.
        </p>
      </GuideSection>

      <GuideSection id="mileage" n={18} kicker="Business miles" title="Business fuel and advisory rates">
        <p>
          If you pay for fuel yourself, your employer can reimburse business journeys using HMRC&rsquo;s advisory fuel rates without any tax.
          From 1 September 2026, these are 14p to 27p a mile for petrol cars, depending on engine size, and 7p a mile for electric cars charged
          at home or 15p at a public charger. Paying for business fuel this way does not trigger the fuel benefit charge.
        </p>
        <p>
          Your commute is not a business journey. Fuel for <a href="/uk/vehicles/commuter-comparison">commuting</a>{" "}paid by your employer counts as private fuel.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Using the discounted price.</strong> The benefit uses the full list price, including options.</li>
          <li><strong>Accepting free fuel without checking.</strong> The fuel benefit often costs more than the fuel is worth.</li>
          <li><strong>Ignoring the tax code.</strong> An out-of-date car in your tax code means paying the wrong tax all year.</li>
          <li><strong>Forgetting the £100,000 effect.</strong> A large benefit can cost you your Personal Allowance and childcare support.</li>
          <li><strong>Choosing a hybrid for tax alone.</strong> From April 2028, plug-in hybrids are taxed at 18%, much closer to petrol cars.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4%", label: "Electric, 2026/27" },
            { value: "5% / 7% / 9%", label: "Electric, 2027 to 2030" },
            { value: "16%", label: "Hybrid under 30 miles range" },
            { value: "37%", label: "Maximum" },
            { value: "4%", label: "Non-RDE2 diesel supplement" },
            { value: "£29,200", label: "Fuel benefit multiplier" },
            { value: "£4,170", label: "Van benefit" },
            { value: "£5,000", label: "Capital contribution cap" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

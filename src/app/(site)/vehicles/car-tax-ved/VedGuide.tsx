import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Car tax (VED) — the guide. Figures from src/lib/vehicles/tax-2026.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what", title: "What car tax is" },
  { id: "which-system", title: "Which system your car is in" },
  { id: "first-year", title: "The first-year rate" },
  { id: "standard", title: "The standard rate" },
  { id: "supplement", title: "The expensive car supplement" },
  { id: "electric", title: "Electric cars" },
  { id: "hybrids", title: "Hybrids and diesels" },
  { id: "older", title: "Cars registered 2001 to 2017" },
  { id: "paying", title: "Paying monthly or every six months" },
  { id: "eved", title: "Pay-per-mile from 2028" },
  { id: "exempt", title: "Who pays nothing" },
  { id: "buying-selling", title: "Buying, selling and refunds" },
  { id: "penalties", title: "Penalties" },
  { id: "using", title: "Using the calculator" },
  { id: "co2", title: "Where the CO2 figure comes from" },
  { id: "list-price", title: "Working out the list price" },
  { id: "budgeting", title: "Budgeting over the life of a car" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK — Vehicle tax rate tables", href: "https://www.gov.uk/vehicle-tax-rate-tables" },
  { label: "GOV.UK — Vehicle tax for electric and low emission vehicles", href: "https://www.gov.uk/guidance/vehicle-tax-for-electric-and-low-emissions-vehicles" },
  { label: "GOV.UK — Electric Vehicle Excise Duty (eVED)", href: "https://www.gov.uk/government/publications/electric-vehicle-excise-duty-eved" },
  { label: "GOV.UK — Historic (classic) vehicles", href: "https://www.gov.uk/historic-vehicles" },
  { label: "GOV.UK — Vehicles exempt from vehicle tax", href: "https://www.gov.uk/vehicle-exempt-from-vehicle-tax" },
];

export default function VedGuide() {
  return (
    <Guide
      kicker="The car tax guide"
      title="How much car tax you pay in 2026/27"
      intro={
        <>
          Vehicle Excise Duty, usually called car tax or road tax, depends on when your car was first registered, its CO2 emissions, its fuel
          and, for newer cars, its list price. This guide explains each part of the system, the rates from 1 April 2026, and the changes coming
          for electric cars.
        </>
      }
      meta={["Rates from April 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Most cars registered since April 2017 pay £200 a year from the second year.</li>
          <li>Cars with a list price over £40,000 pay £440 more a year in years 2 to 6, so £640 a year.</li>
          <li>Electric cars pay £10 in the first year and then £200. New electric cars over £50,000 also pay the supplement.</li>
          <li>Cars registered from March 2001 to March 2017 pay between £20 and £790 a year depending on CO2.</li>
        </ul>
        <KeyStats
          items={[
            { value: "£200", label: "Standard rate a year" },
            { value: "£440", label: "Expensive car supplement" },
            { value: "£10", label: "First year for electric cars" },
            { value: "£5,690", label: "Highest first-year rate" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what" n={2} kicker="Basics" title="What car tax is">
        <p>
          Vehicle Excise Duty is a yearly tax on vehicles used or kept on public roads. It is collected by the DVLA and goes to the Treasury.
          Since 2014 there has been no paper tax disc: the DVLA records your payment against your registration, and cameras check it
          automatically.
        </p>
        <p>
          The rate is fixed by the rules that applied when your car was first registered, so two similar cars can pay very different amounts.
          The rates usually rise each April in line with inflation.
        </p>
      </GuideSection>

      <GuideSection id="which-system" n={3} kicker="Systems" title="Which system your car is in">
        <Timeline
          items={[
            { when: "Before March 2001", what: "Engine size", detail: "Two rates, one for engines up to 1,549cc and one for larger engines." },
            { when: "March 2001 to March 2017", what: "Bands A to M by CO2", detail: "The yearly rate depends on emissions for the life of the car." },
            { when: "April 2017 onwards", what: "First-year rate, then a flat rate", detail: "CO2 sets only the first-year rate; after that most cars pay the same." },
          ]}
        />
        <p>The date of first registration is on your V5C logbook. For imported cars, it is the date the car was first registered anywhere.</p>
      </GuideSection>

      <GuideSection id="first-year" n={4} kicker="New cars" title="The first-year rate">
        <p>
          For cars registered from April 2017, the first year&rsquo;s tax depends on CO2 emissions. It is usually paid by the dealer and built
          into the price of a new car.
        </p>
        <DataTable
          caption="First-year rates from 1 April 2026"
          head={["CO2 (g/km)", "Petrol, RDE2 diesel, hybrid", "Other diesel"]}
          numeric={[1, 2]}
          rows={[
            ["0", "£10", "£10"],
            ["1 to 50", "£115", "£135"],
            ["51 to 75", "£135", "£280"],
            ["76 to 90", "£280", "£365"],
            ["91 to 100", "£365", "£405"],
            ["101 to 110", "£405", "£455"],
            ["111 to 130", "£455", "£560"],
            ["131 to 150", "£560", "£1,410"],
            ["151 to 170", "£1,410", "£2,270"],
            ["171 to 190", "£2,270", "£3,420"],
            ["191 to 225", "£3,420", "£4,850"],
            ["226 to 255", "£4,850", "£5,690"],
            ["Over 255", "£5,690", "£5,690"],
          ]}
        />
      </GuideSection>

      <GuideSection id="standard" n={5} kicker="Year 2 onwards" title="The standard rate">
        <p>
          From the second year, every car registered since April 2017 pays the same standard rate, whatever its emissions: £200 a year from
          1 April 2026, up from £195. Petrol, diesel, hybrid and electric cars all pay it.
        </p>
        <WorkedExample
          title="A petrol car, 120 g/km, list price £25,000"
          steps={[
            { label: "First year", value: "£455" },
            { label: "Years 2 to 6: £200 × 5", value: "£1,000" },
          ]}
          total={{ label: "Car tax over six years", value: "£1,455" }}
        />
      </GuideSection>

      <GuideSection id="supplement" n={6} kicker="Supplement" title="The expensive car supplement">
        <p>
          Cars with a list price over £40,000 pay an extra £440 a year for five years, from the second year to the sixth. The list price is
          the price when new, including options, not what you paid. A used car that cost £20,000 still pays the supplement if it listed at
          over £40,000.
        </p>
        <WorkedExample
          title="A petrol car, 140 g/km, list price £45,000"
          steps={[
            { label: "First year", value: "£560" },
            { label: "Years 2 to 6: (£200 + £440) × 5", value: "£3,200" },
            { label: "From year 7", value: "£200 a year" },
          ]}
          total={{ label: "Car tax over six years", value: "£3,760" }}
        />
        <Figure label="Six years of car tax" caption="Cars registered from April 2026.">
          <Bars
            items={[
              { label: "Electric, £35k", value: 1010 },
              { label: "Petrol 120 g/km, £25k", value: 1455 },
              { label: "Diesel 120 g/km, £25k", value: 1560 },
              { label: "Electric, £55k", value: 3210 },
              { label: "Petrol 140 g/km, £45k", value: 3760 },
            ]}
          />
        </Figure>
      </GuideSection>

      <GuideSection id="electric" n={7} kicker="Electric" title="Electric cars">
        <p>
          Electric cars were exempt from car tax until April 2025. Now they pay like other cars, with a few differences:
        </p>
        <ul>
          <li>The first-year rate is £10.</li>
          <li>From the second year, they pay the £200 standard rate.</li>
          <li>For electric cars registered from 1 April 2025, the expensive car supplement starts above £50,000 rather than £40,000.</li>
          <li>Electric cars registered between April 2017 and March 2025 never pay the supplement.</li>
          <li>Electric cars registered between March 2001 and March 2017 pay the band A rate of £20.</li>
        </ul>
      </GuideSection>

      <GuideSection id="hybrids" n={8} kicker="Fuel types" title="Hybrids and diesels">
        <CompareCards
          columns={[
            {
              name: "Hybrids",
              rows: [
                { label: "First year", value: "Same as petrol, by CO2" },
                { label: "From year 2", value: "£200, the old £10 discount ended in 2025" },
                { label: "Supplement", value: "Over £40,000" },
              ],
            },
            {
              name: "Diesels",
              rows: [
                { label: "RDE2 diesels", value: "Same first-year rate as petrol" },
                { label: "Other diesels", value: "One band higher in the first year" },
                { label: "From year 2", value: "£200, like other cars" },
              ],
            },
          ]}
        />
        <p>
          RDE2 is a newer emissions test. Most diesel cars sold new since 2021 meet it; the car&rsquo;s certificate of conformity will say.
        </p>
      </GuideSection>

      <GuideSection id="older" n={9} kicker="Older cars" title="Cars registered 2001 to 2017">
        <DataTable
          caption="12-month rates from 1 April 2026"
          head={["Band", "CO2 (g/km)", "Rate"]}
          numeric={[2]}
          rows={[
            ["A", "Up to 100", "£20"],
            ["B", "101 to 110", "£20"],
            ["C", "111 to 120", "£35"],
            ["D", "121 to 130", "£170"],
            ["E", "131 to 140", "£200"],
            ["F", "141 to 150", "£225"],
            ["G", "151 to 165", "£275"],
            ["H", "166 to 175", "£325"],
            ["I", "176 to 185", "£360"],
            ["J", "186 to 200", "£410"],
            ["K", "201 to 225", "£445"],
            ["L", "226 to 255", "£760"],
            ["M", "Over 255", "£790"],
          ]}
        />
        <p>
          Cars in bands A to C can be much cheaper to tax than a new car. Cars over 225 g/km first registered before 23 March 2006 pay the
          band K rate rather than the band L or M rate.
        </p>
      </GuideSection>

      <GuideSection id="paying" n={10} kicker="Payment" title="Paying monthly or every six months">
        <DataTable
          caption="A car paying the £200 standard rate"
          head={["How you pay", "Cost over a year"]}
          numeric={[1]}
          rows={[
            ["12 months in one go", "£200"],
            ["Monthly Direct Debit: £17.50 × 12", "£210"],
            ["Two 6-month payments: £110 × 2", "£220"],
          ]}
        />
        <p>Spreading the cost by monthly Direct Debit adds 5%. Paying for 6 months at a time costs 10% more over the year.</p>
      </GuideSection>

      <GuideSection id="eved" n={11} kicker="Changes" title="Pay-per-mile from 2028">
        <p>
          From April 2028, electric cars are due to pay an Electric Vehicle Excise Duty of 3p a mile, and plug-in hybrids 1.5p a mile, on top
          of car tax. Drivers will estimate their mileage when they tax the car, and the figure will be checked at the MOT. At 8,000 miles a
          year, that is about £240 for an electric car and £120 for a plug-in hybrid. The rates are expected to rise with inflation.
        </p>
      </GuideSection>

      <GuideSection id="exempt" n={12} kicker="Exemptions" title="Who pays nothing">
        <ul>
          <li><strong>Historic vehicles:</strong> cars built more than 40 years ago. From 1 April 2026, that means cars built before 1 January 1986.</li>
          <li><strong>Disabled drivers:</strong> people getting the higher rate mobility part of Disability Living Allowance, the enhanced mobility part of PIP, and some other benefits.</li>
          <li><strong>Mobility vehicles:</strong> cars leased through the Motability scheme.</li>
          <li><strong>Off-road vehicles:</strong> cars with a SORN, which cannot be driven or parked on public roads.</li>
        </ul>
        <p>You still need to tax an exempt vehicle, but you pay £0.</p>
      </GuideSection>

      <GuideSection id="buying-selling" n={13} kicker="Changing cars" title="Buying, selling and refunds">
        <p>
          Car tax does not transfer with the car. When you buy a used car, you must tax it before driving it away. When you sell, scrap or
          SORN a car, the DVLA refunds any full months left. The <a href="/vehicles/sorn-declaration">SORN calculator</a> works out your
          refund.
        </p>
      </GuideSection>

      <GuideSection id="penalties" n={14} kicker="Rules" title="Penalties">
        <p>
          If your car is untaxed and not SORN, the DVLA can send an £80 late licensing penalty, halved to £40 if paid promptly. Driving
          untaxed can lead to a court fine of up to £1,000, and the car can be clamped or impounded.
        </p>
        <Callout tone="warn" title="Check before you drive">
          Tax lapses when a Direct Debit fails or when you buy a car. Use the free GOV.UK vehicle enquiry service to check any car&rsquo;s tax.
        </Callout>
      </GuideSection>

      <GuideSection id="using" n={15} kicker="How to" title="Using the calculator">
        <ol>
          <li>Choose when the car was first registered.</li>
          <li>Pick the fuel type and enter the CO2 figure from the V5C.</li>
          <li>For cars from April 2017, enter the list price when new.</li>
          <li>Under &ldquo;More options&rdquo;, tell us if an electric car was registered before April 2025, and your yearly mileage to see the 2028 per-mile charge.</li>
        </ol>
      </GuideSection>

      <GuideSection id="co2" n={16} kicker="Emissions" title="Where the CO2 figure comes from">
        <p>
          The CO2 figure is in section V.7 of your V5C logbook. Cars registered since September 2018 were tested under the newer WLTP
          procedure, which gives higher, more realistic figures than the older NEDC test. That is one reason first-year rates for similar cars
          can look higher than they did a few years ago.
        </p>
        <p>
          If the logbook has no CO2 figure, the car is usually taxed by engine size instead. For a new car, the dealer or manufacturer will
          give the official figure, and it appears on the window sticker in the showroom.
        </p>
      </GuideSection>

      <GuideSection id="list-price" n={17} kicker="Supplement" title="Working out the list price">
        <p>
          The list price for the supplement is the published price of the car on the day before it was first registered. It includes VAT
          and any options fitted before registration, such as paint, wheels or a sunroof. It excludes the first-year car tax and the first
          registration fee.
        </p>
        <ul>
          <li>Discounts from the dealer do not reduce the list price.</li>
          <li>Options added after registration do not count.</li>
          <li>A car listed at £39,500 with £1,000 of factory options has a list price of £40,500, so it pays the supplement.</li>
        </ul>
        <p>
          The DVLA vehicle enquiry service shows whether a car pays the supplement. It is worth checking before you buy a used car aged two to
          six years, as the extra £440 a year adds up.
        </p>
      </GuideSection>

      <GuideSection id="budgeting" n={18} kicker="Planning" title="Budgeting over the life of a car">
        <p>
          For most cars registered since 2017, car tax is a steady £200 a year after the first year, so it is easy to budget for. The big
          differences come from the first-year rate, which you pay only on a new car, and the supplement, which lasts five years.
        </p>
        <p>
          If you are choosing between a new car just over £40,000 and a similar one just under, the supplement adds £2,200 over five years.
          For electric cars registered from April 2025 the line is £50,000. From 2028, high-mileage electric drivers will also need to allow
          for the pay-per-mile charge.
        </p>
        <p>
          Car tax is only one running cost. Fuel or electricity, insurance, servicing and depreciation usually cost much more. The{" "}
          <a href="/vehicles/petrol-vs-ev-cost">petrol vs electric calculator</a> puts them side by side.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={19} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Assuming tax comes with a used car.</strong> It never does. Tax it before you drive it home.</li>
          <li><strong>Using the price you paid.</strong> The supplement uses the list price when new.</li>
          <li><strong>Forgetting a Direct Debit has failed.</strong> The DVLA cancels the tax, and cameras can pick up an untaxed car quickly.</li>
          <li><strong>Driving after a SORN.</strong> A SORN car cannot be used or parked on a public road.</li>
        </ul>
      </GuideSection>

      <GuideSection id="questions" n={20} kicker="FAQs" title="Common questions">
        <h3>Do I pay the supplement on a used car?</h3>
        <p>Yes, if its list price when new was over the threshold and it is between two and six years old.</p>
        <h3>Do electric cars pay car tax now?</h3>
        <p>Yes, since April 2025. Most pay £200 a year from the second year.</p>
        <h3>Will my tax go up every year?</h3>
        <p>The rates usually rise each April with inflation, though they are rounded to the nearest £5.</p>
        <h3>Is car tax the same in Scotland, Wales and Northern Ireland?</h3>
        <p>Yes. Vehicle Excise Duty is a UK-wide tax with the same rates everywhere.</p>
        <h3>Can I get a refund if I sell my car?</h3>
        <p>Yes. The DVLA refunds any full months left once it knows you have sold, scrapped or SORNed the car. The new keeper must tax it themselves.</p>
        <h3>Do I need to tax a car I never drive?</h3>
        <p>If it is kept on a public road, yes. If it is kept off the road, for example on a drive or in a garage, you can make a SORN instead and pay nothing.</p>
        <h3>How do I find my car&rsquo;s tax band?</h3>
        <p>Enter the registration on the GOV.UK vehicle enquiry service. It shows the CO2 figure, the date of first registration, and when the tax is due.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£200", label: "Standard rate from year 2" },
            { value: "£440", label: "Supplement, years 2 to 6" },
            { value: "£40,000", label: "Supplement threshold" },
            { value: "£50,000", label: "Threshold for new electric cars" },
            { value: "£10", label: "Electric first year" },
            { value: "£20 to £790", label: "Bands A to M" },
            { value: "3p a mile", label: "Electric cars from April 2028" },
            { value: "5%", label: "Extra for monthly Direct Debit" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

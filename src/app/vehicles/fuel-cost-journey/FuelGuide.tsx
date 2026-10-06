import { Bars, Callout, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Journey fuel cost — the guide. Figures from src/lib/vehicles/running.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "formula", title: "How the cost is worked out" },
  { id: "example", title: "A worked example" },
  { id: "mpg", title: "What your mpg means in pence a mile" },
  { id: "electric", title: "Electric cars: home versus public charging" },
  { id: "prices", title: "Fuel prices in 2026" },
  { id: "sharing", title: "Sharing the cost" },
  { id: "business", title: "Business mileage and what you can claim" },
  { id: "economy", title: "Getting better economy" },
  { id: "other-costs", title: "What a trip really costs" },
  { id: "long-trips", title: "Planning a long trip" },
  { id: "loads", title: "Towing, roof boxes and full loads" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "HMRC — Travel: mileage and fuel rates and allowances", href: "https://www.gov.uk/government/publications/rates-and-allowances-travel-mileage-and-fuel-allowances" },
  { label: "HMRC — Advisory fuel rates", href: "https://www.gov.uk/guidance/advisory-fuel-rates" },
  { label: "Ofgem — Energy price cap", href: "https://www.ofgem.gov.uk/energy-price-cap" },
  { label: "RAC Fuel Watch", href: "https://www.rac.co.uk/drive/advice/fuel-watch/" },
];

export default function FuelGuide() {
  return (
    <Guide
      kicker="The fuel cost guide"
      title="How much a car journey costs in fuel"
      intro={
        <>
          The fuel cost of a trip depends on three things: how far you drive, how efficient your car is, and what you pay for fuel or
          electricity. This guide shows how to work it out, what your mpg means in pence per mile, how electric cars compare, and what you can
          claim for business journeys.
        </>
      }
      meta={["Prices for autumn 2026", "8 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>A 240-mile round trip in a 45 mpg petrol car at 173.8p a litre costs about £42.14 in fuel.</li>
          <li>That is 17.6p a mile. A 30 mpg car costs 26.3p a mile; a 60 mpg car 13.2p.</li>
          <li>An electric car doing 3.5 miles per kWh costs £5.49 on an 8p overnight tariff, but £51.43 on 75p rapid chargers.</li>
          <li>For business trips in your own car, you can be paid 45p a mile tax-free.</li>
        </ul>
        <KeyStats
          items={[
            { value: "173.8p", label: "Petrol a litre, late Sept 2026" },
            { value: "198.9p", label: "Diesel a litre" },
            { value: "26.32p", label: "Home electricity a kWh" },
            { value: "45p", label: "Tax-free business mileage" },
          ]}
        />
      </GuideSection>

      <GuideSection id="formula" n={2} kicker="Method" title="How the cost is worked out">
        <ol>
          <li>Divide the distance by your miles per gallon to get gallons.</li>
          <li>Multiply by 4.546 to turn UK gallons into litres.</li>
          <li>Multiply by the price per litre.</li>
        </ol>
        <p>
          For an electric car, divide the miles by miles per kWh and multiply by the price per kWh. If your car shows litres per 100km, the
          calculator converts it for you.
        </p>
        <Callout title="UK and US gallons are different">
          A UK gallon is 4.546 litres; a US gallon is 3.785. US mpg figures look worse for the same car, so make sure you use UK mpg.
        </Callout>
      </GuideSection>

      <GuideSection id="example" n={3} kicker="Real numbers" title="A worked example">
        <WorkedExample
          title="120 miles each way, 45 mpg, petrol at 173.8p"
          steps={[
            { label: "Round trip", value: "240 miles" },
            { label: "Fuel used: 240 ÷ 45 × 4.546", value: "24.25 litres" },
            { label: "Cost: 24.25 × £1.738", value: "£42.14" },
          ]}
          total={{ label: "Cost a mile", value: "17.6p" }}
        />
        <p>Shared between four people, that is £10.53 each. A 5p rise in the litre price adds about £1.21 to the same trip.</p>
      </GuideSection>

      <GuideSection id="mpg" n={4} kicker="Economy" title="What your mpg means in pence a mile">
        <DataTable
          caption="Petrol at 173.8p a litre"
          head={["Economy", "Litres per 100km", "Cost a mile"]}
          numeric={[1, 2]}
          rows={[
            ["30 mpg", "9.4", "26.3p"],
            ["40 mpg", "7.1", "19.8p"],
            ["50 mpg", "5.6", "15.8p"],
            ["60 mpg", "4.7", "13.2p"],
          ]}
        />
        <p>Over 8,000 miles a year, a 45 mpg petrol car uses about £1,405 of fuel at this price.</p>
      </GuideSection>

      <GuideSection id="electric" n={5} kicker="Electric" title="Electric cars: home versus public charging">
        <Figure label="240 miles in different cars" caption="Fuel or electricity only. Electric cars at 3.5 miles per kWh.">
          <Bars
            items={[
              { label: "EV, 8p overnight", value: 5.49 },
              { label: "EV, 26.32p home", value: 18.05 },
              { label: "Diesel 55 mpg", value: 39.46 },
              { label: "Petrol 45 mpg", value: 42.14 },
              { label: "EV, 75p rapid", value: 51.43 },
            ]}
            format={(n) => `£${n.toFixed(2)}`}
          />
        </Figure>
        <p>
          Where you charge matters more than anything else for an electric car. On an overnight tariff, a long trip costs a fraction of petrol.
          Relying on rapid public chargers can cost more than petrol. The <a href="/vehicles/petrol-vs-ev-cost">petrol vs electric calculator</a>{" "}
          compares the full yearly costs.
        </p>
      </GuideSection>

      <GuideSection id="prices" n={6} kicker="Prices" title="Fuel prices in 2026">
        <p>
          Pump prices rose through September 2026 as oil went back above $100 a barrel. In the week ending 27 September, the UK average was
          173.8p a litre for petrol and 198.9p for diesel. Fuel duty is 52.95p a litre until the end of 2026; it is due to rise by 3p in January
          2027 and 2p in March 2027. VAT at 20% is charged on top of the duty.
        </p>
        <p>
          Supermarket forecourts are usually the cheapest, and motorway services the most expensive. Checking prices before a long trip can save
          several pounds a tank.
        </p>
      </GuideSection>

      <GuideSection id="sharing" n={7} kicker="Sharing" title="Sharing the cost">
        <p>
          Sharing fuel costs with passengers is legal and does not count as running a taxi, as long as you do not make a profit. If you are
          paid more than the cost of the trip, your insurance may not cover it. Car-sharing sites usually cap what drivers can charge for this
          reason.
        </p>
      </GuideSection>

      <GuideSection id="business" n={8} kicker="Work" title="Business mileage and what you can claim">
        <DataTable
          caption="HMRC approved mileage allowance payments"
          head={["Vehicle", "First 10,000 business miles", "After 10,000"]}
          rows={[
            ["Car or van", "45p", "25p"],
            ["Motorbike", "24p", "24p"],
            ["Bicycle", "20p", "20p"],
            ["Each passenger on a business trip", "5p", "5p"],
          ]}
        />
        <p>
          The 240-mile trip, if it were a business journey in your own car, could be paid at £108 tax-free, or £120 with a colleague as a
          passenger. Commuting to your normal workplace does not count. Company car drivers use the lower advisory fuel rates instead, such as
          14p to 27p a mile for petrol from September 2026.
        </p>
      </GuideSection>

      <GuideSection id="economy" n={9} kicker="Saving" title="Getting better economy">
        <ul>
          <li><strong>Slow down:</strong> economy falls quickly above 60mph. Dropping from 45 to 40 mpg adds £5.27 to the example trip.</li>
          <li><strong>Check tyre pressures:</strong> soft tyres increase drag and wear.</li>
          <li><strong>Lose weight and drag:</strong> remove roof boxes and heavy items you do not need.</li>
          <li><strong>Drive smoothly:</strong> anticipate traffic and avoid harsh acceleration and braking.</li>
          <li><strong>Use air conditioning sensibly:</strong> it adds a little fuel use, though open windows also add drag at speed.</li>
        </ul>
      </GuideSection>

      <GuideSection id="other-costs" n={10} kicker="Full cost" title="What a trip really costs">
        <p>
          Fuel is only part of the cost of driving. Wear and tear, tyres, servicing and depreciation add more for every mile, which is why the
          45p mileage rate is much higher than the fuel cost alone. For regular journeys such as commuting, the{" "}
          <a href="/vehicles/commuter-comparison">commuter comparison</a> adds parking and wear, and compares the train and bus.
        </p>
      </GuideSection>

      <GuideSection id="long-trips" n={11} kicker="Planning" title="Planning a long trip">
        <p>
          For a holiday or a long drive, add up every leg, including detours and driving around at the other end. Fill up before joining the
          motorway, where fuel is usually dearer, and use a price comparison app to find cheaper stations along the route. In an electric car,
          plan rapid charging stops in advance and charge at home overnight before you set off, so most of the energy comes at the cheaper
          home rate.
        </p>
        <p>
          If you are travelling abroad, fuel prices and units differ: Europe uses litres and kilometres, so the l/100km option is handy for
          hire cars.
        </p>
      </GuideSection>

      <GuideSection id="loads" n={12} kicker="Loads" title="Towing, roof boxes and full loads">
        <p>
          A caravan, trailer or roof box can cut economy by a quarter or more, especially at motorway speeds. A car full of people and luggage
          also uses more fuel than the same car with just the driver. If you often tow or carry heavy loads, base the calculation on the
          economy you see in those conditions, not the official figure.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={13} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Using US mpg.</strong> US gallons are smaller, so the numbers do not match UK figures.</li>
          <li><strong>Using the official economy.</strong> Real-world economy is usually lower.</li>
          <li><strong>Forgetting the return leg.</strong>{" "}Turn on &ldquo;Return journey&rdquo; for round trips.</li>
          <li><strong>Charging a passenger more than the cost.</strong> Making a profit can invalidate your insurance.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4.546", label: "Litres in a UK gallon" },
            { value: "173.8p", label: "Petrol a litre" },
            { value: "198.9p", label: "Diesel a litre" },
            { value: "52.95p", label: "Fuel duty a litre" },
            { value: "45p / 25p", label: "Business mileage rates" },
            { value: "7p / 15p", label: "Electric advisory rates" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

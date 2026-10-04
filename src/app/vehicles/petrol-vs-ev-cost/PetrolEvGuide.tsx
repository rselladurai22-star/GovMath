import { Bars, Callout, CompareCards, DataTable, Figure, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Petrol vs electric — the guide. Figures from src/lib/vehicles/running.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "what-counts", title: "What to compare" },
  { id: "energy", title: "Fuel versus electricity" },
  { id: "charging", title: "Where you charge changes everything" },
  { id: "example", title: "A worked example over six years" },
  { id: "mileage", title: "How mileage changes the answer" },
  { id: "purchase", title: "Purchase price and resale value" },
  { id: "servicing", title: "Servicing, tyres and insurance" },
  { id: "tax", title: "Car tax and the 2028 mileage charge" },
  { id: "company", title: "Company cars and salary sacrifice" },
  { id: "practical", title: "Practical questions" },
  { id: "verdict", title: "Who saves most" },
  { id: "tariffs", title: "EV tariffs explained" },
  { id: "no-driveway", title: "If you have no driveway" },
  { id: "used", title: "Buying a used electric car" },
  { id: "hybrids", title: "Where hybrids fit" },
  { id: "prices-change", title: "If prices change" },
  { id: "mistakes", title: "Common mistakes" },
  { id: "costs-per-mile", title: "The full cost per mile" },
  { id: "checklist", title: "Before you switch" },
  { id: "questions", title: "Common questions" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Ofgem — Energy price cap", href: "https://www.ofgem.gov.uk/energy-price-cap" },
  { label: "GOV.UK — Vehicle tax for electric and low emission vehicles", href: "https://www.gov.uk/guidance/vehicle-tax-for-electric-and-low-emissions-vehicles" },
  { label: "GOV.UK — Electric Vehicle Excise Duty (eVED)", href: "https://www.gov.uk/government/publications/electric-vehicle-excise-duty-eved" },
  { label: "Energy Saving Trust — Electric vehicles", href: "https://energysavingtrust.org.uk/advice/electric-vehicles/" },
];

export default function PetrolEvGuide() {
  return (
    <Guide
      kicker="The petrol vs electric guide"
      title="Is an electric car cheaper to run than petrol?"
      intro={
        <>
          Electric cars usually cost more to buy but much less to run, as long as you can charge cheaply. Whether you save overall depends on
          your mileage, where you charge, how long you keep the car and what it is worth at the end. This guide works through each factor with
          real 2026 prices.
        </>
      }
      meta={["Autumn 2026 prices", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>Fuel for 8,000 miles in a 45 mpg petrol car costs about £1,405 a year at 173.8p a litre.</li>
          <li>An electric car charged 80% at home on an 8p tariff and 20% on 75p rapid chargers costs about £489.</li>
          <li>Charged entirely at home on that tariff, it costs £183; entirely on rapid chargers, £1,714, more than petrol.</li>
          <li>With a £5,000 higher price, the total cost over six years is close; higher mileage tips it towards electric.</li>
        </ul>
        <KeyStats
          items={[
            { value: "17.6p", label: "Petrol a mile, 45 mpg" },
            { value: "2.3p", label: "Electric a mile, 8p home tariff" },
            { value: "21.4p", label: "Electric a mile, 75p rapid charger" },
            { value: "3p", label: "Electric mileage charge from 2028" },
          ]}
        />
      </GuideSection>

      <GuideSection id="what-counts" n={2} kicker="Method" title="What to compare">
        <p>A fair comparison includes everything you pay over the time you keep the car:</p>
        <ul>
          <li>The purchase price, after any discount or grant.</li>
          <li>Fuel or electricity.</li>
          <li>Servicing, tyres and repairs.</li>
          <li>Car tax and, from 2028, the electric mileage charge.</li>
          <li>Insurance.</li>
          <li>What the car is worth when you sell it.</li>
        </ul>
        <p>The calculator adds these up year by year and shows when, if ever, the electric car catches up.</p>
      </GuideSection>

      <GuideSection id="energy" n={3} kicker="Energy" title="Fuel versus electricity">
        <p>
          A petrol car doing 45 mpg uses about 0.1 litres a mile, which costs 17.6p at 173.8p a litre. An electric car doing 3.5 miles per kWh
          uses 0.29 kWh a mile. What that costs depends entirely on the price of the electricity.
        </p>
        <DataTable
          caption="Electric car at 3.5 miles per kWh"
          head={["Where you charge", "Price a kWh", "Cost a mile"]}
          numeric={[1, 2]}
          rows={[
            ["Overnight EV tariff", "8p", "2.3p"],
            ["Home, standard price cap", "26.32p", "7.5p"],
            ["80% home tariff, 20% rapid", "21.4p average", "6.1p"],
            ["Rapid public charger", "75p", "21.4p"],
          ]}
        />
      </GuideSection>

      <GuideSection id="charging" n={4} kicker="Charging" title="Where you charge changes everything">
        <Figure label="Energy for 8,000 miles a year" caption="Petrol 45 mpg at 173.8p; electric 3.5 miles per kWh.">
          <Bars
            items={[
              { label: "EV, all home tariff", value: 183 },
              { label: "EV, 80/20 home and rapid", value: 489 },
              { label: "EV, all price cap", value: 602 },
              { label: "Petrol", value: 1405 },
              { label: "EV, all rapid", value: 1714 },
            ]}
          />
        </Figure>
        <p>
          With a driveway and an overnight EV tariff, an electric car is very cheap to run. Without home charging, costs depend on finding
          cheaper public chargers, such as slower on-street or supermarket chargers, rather than motorway rapid chargers.
        </p>
      </GuideSection>

      <GuideSection id="example" n={5} kicker="Real numbers" title="A worked example over six years">
        <WorkedExample
          title="8,000 miles a year for six years, 20% public charging"
          steps={[
            { label: "Petrol: £25,000 car, running £2,505 a year, worth 35% at the end", value: "£31,278" },
            { label: "Electric: £30,000 car, running £1,589 a year plus 3p a mile from 2028, worth 30%", value: "£31,495" },
          ]}
          total={{ label: "Difference", value: "Petrol £217 cheaper" }}
        />
        <p>
          In this case the two are almost level. Without the 2028 mileage charge, electric would be £743 cheaper. With all charging at home,
          electric would cost £29,657 in total, saving £1,621.
        </p>
      </GuideSection>

      <GuideSection id="mileage" n={6} kicker="Mileage" title="How mileage changes the answer">
        <DataTable
          caption="Six-year total, same cars and charging as the example"
          head={["Miles a year", "Petrol", "Electric", "Cheaper"]}
          numeric={[1, 2]}
          rows={[
            ["4,000", "£27,064", "£29,547", "Petrol by £2,483"],
            ["8,000", "£31,278", "£31,495", "Petrol by £217"],
            ["15,000", "£38,652", "£34,903", "Electric by £3,749"],
          ]}
        />
        <p>
          The more you drive, the more the lower running cost counts. At 15,000 miles a year, the electric car pays back its higher price in
          the fourth year.
        </p>
      </GuideSection>

      <GuideSection id="purchase" n={7} kicker="Buying" title="Purchase price and resale value">
        <p>
          The price gap between electric and petrol cars has narrowed, and used electric cars have become much cheaper. If you can buy an
          electric car for the same price as the petrol one, it is £3,283 cheaper over six years in the example.
        </p>
        <p>
          Resale values for electric cars have been less predictable than for petrol cars, as battery technology and new models move quickly.
          The calculator lets you set the value at the end for each car, so you can test a range.
        </p>
      </GuideSection>

      <GuideSection id="servicing" n={8} kicker="Maintenance" title="Servicing, tyres and insurance">
        <CompareCards
          columns={[
            { name: "Electric", rows: [{ label: "Servicing", value: "Fewer moving parts, no oil changes" }, { label: "Brakes", value: "Last longer thanks to regenerative braking" }, { label: "Tyres", value: "Can wear faster because of weight" }] },
            { name: "Petrol", rows: [{ label: "Servicing", value: "Oil, filters, spark plugs, clutch" }, { label: "Brakes", value: "Normal wear" }, { label: "Tyres", value: "Normal wear" }] },
          ]}
        />
        <p>Insurance for electric cars is often a little higher, as repairs can be more expensive. Get quotes for both cars before deciding.</p>
      </GuideSection>

      <GuideSection id="tax" n={9} kicker="Tax" title="Car tax and the 2028 mileage charge">
        <p>
          Since April 2025, electric cars pay car tax: £10 in the first year and then the £200 standard rate, the same as petrol. New electric
          cars over £50,000 pay the £440 expensive car supplement in years 2 to 6. From April 2028, electric cars are due to pay 3p a mile on
          top, which is £240 a year at 8,000 miles. The <a href="/vehicles/car-tax-ved">car tax calculator</a> has the details.
        </p>
      </GuideSection>

      <GuideSection id="company" n={10} kicker="Work" title="Company cars and salary sacrifice">
        <p>
          The sums are very different through work. Electric company cars are taxed at 4% of the list price in 2026/27, against around 30% for a
          typical petrol car, and salary sacrifice saves income tax and National Insurance. See the{" "}
          <a href="/vehicles/ev-salary-sacrifice">EV salary sacrifice calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="practical" n={11} kicker="Living with it" title="Practical questions">
        <ul>
          <li><strong>Range:</strong> most new electric cars manage 200 to 300 miles in real driving, less in cold weather.</li>
          <li><strong>Home charger:</strong> fitting one typically costs £800 to £1,200, and you need off-street parking.</li>
          <li><strong>Long trips:</strong> rapid chargers add 20 to 40 minutes per stop and cost much more than home charging.</li>
          <li><strong>Battery health:</strong> most batteries have an 8-year warranty and degrade slowly.</li>
        </ul>
      </GuideSection>

      <GuideSection id="verdict" n={12} kicker="Summary" title="Who saves most">
        <Callout title="Electric usually wins if you">
          Can charge at home on an EV tariff, drive 8,000 miles a year or more, and keep the car for several years.
        </Callout>
        <Callout tone="warn" title="Petrol may still be cheaper if you">
          Have no home charging and rely on rapid chargers, drive few miles, or pay a large premium for the electric car.
        </Callout>
      </GuideSection>

      <GuideSection id="tariffs" n={13} kicker="Tariffs" title="EV tariffs explained">
        <p>
          Most energy suppliers now offer tariffs for electric car owners with a much cheaper rate for a few hours overnight. Some charge a
          low rate only while the car is charging, managed through the charger or the car&rsquo;s app. The trade-off is a higher daytime rate
          for the rest of the house, so check the whole household bill, not just the car.
        </p>
        <p>
          If you work from home and use a lot of electricity in the day, a standard tariff at the 26.32p price cap may suit better. Even then,
          charging costs about 7.5p a mile, well under half the cost of petrol.
        </p>
      </GuideSection>

      <GuideSection id="no-driveway" n={14} kicker="Access" title="If you have no driveway">
        <p>
          Many households, especially in towns and cities, have no off-street parking. For them, the cost of running an electric car depends on what public
          charging is nearby. Slower on-street and destination chargers are usually cheaper than rapid chargers, and some councils offer lower
          rates for residents. Some workplaces offer free or cheap charging, which is not taxed as a benefit.
        </p>
        <p>
          Set the share of public charging in the calculator to match your situation. At 100% public charging at 75p a kWh, the electric car
          in the example costs £1,714 a year in electricity, more than the petrol car&rsquo;s fuel.
        </p>
      </GuideSection>

      <GuideSection id="used" n={15} kicker="Used cars" title="Buying a used electric car">
        <p>
          Used electric car prices fell sharply in recent years, which makes them good value for buyers. Before buying, ask for a battery
          health report, check how much of the battery warranty is left, and check the real-world range on the kind of journeys you do. A used
          car bought for the same price as a petrol equivalent removes the purchase gap entirely.
        </p>
      </GuideSection>

      <GuideSection id="hybrids" n={16} kicker="Hybrids" title="Where hybrids fit">
        <p>
          A self-charging hybrid cannot be plugged in but uses less fuel in town. Enter its real mpg as the petrol car. A plug-in hybrid can
          run on electricity for short trips and petrol for long ones; it is cheapest when you charge it every night and most journeys are
          within its electric range. From April 2028 plug-in hybrids are due to pay 1.5p a mile on top of car tax.
        </p>
      </GuideSection>

      <GuideSection id="prices-change" n={17} kicker="Uncertainty" title="If prices change">
        <p>
          Fuel and electricity prices both move. Petrol rose sharply in September 2026 and fuel duty is due to go up by 5p a litre in early
          2027. Electricity prices change every quarter under the price cap. The calculator assumes today&rsquo;s prices for the whole period,
          so try a range: a higher petrol price and a higher electricity price, to see how robust the answer is.
        </p>
      </GuideSection>

      <GuideSection id="mistakes" n={18} kicker="Pitfalls" title="Common mistakes">
        <ul>
          <li><strong>Assuming all charging is at home.</strong> Count holidays and long trips on rapid chargers.</li>
          <li><strong>Comparing list prices only.</strong> Running costs and resale value matter as much.</li>
          <li><strong>Forgetting the 2028 mileage charge.</strong> It narrows the gap for high-mileage drivers.</li>
          <li><strong>Using the official mpg for the petrol car.</strong> Real-world economy is usually lower, which favours electric.</li>
        </ul>
      </GuideSection>

      <GuideSection id="costs-per-mile" n={19} kicker="Per mile" title="The full cost per mile">
        <p>
          Putting everything on a per-mile basis makes the comparison easier to picture. In the six-year example at 8,000 miles a year, the
          petrol car costs about 65p a mile in total, including the drop in its value, and the electric car about the same, at 66p. Fuel
          and electricity are only a small part: depreciation is the biggest single cost for both.
        </p>
        <p>
          That is why the purchase price and resale value matter so much. A cheaper used electric car, or keeping either car for longer,
          lowers the cost per mile more than any change in fuel or electricity prices.
        </p>
      </GuideSection>

      <GuideSection id="checklist" n={20} kicker="Summary" title="Before you switch">
        <ol>
          <li>Work out your real yearly mileage from your last two MOT certificates.</li>
          <li>Check whether you can charge at home or at work, and what EV tariffs are available.</li>
          <li>Get insurance quotes for both cars.</li>
          <li>Compare total costs over the years you will keep the car, not just the monthly payment.</li>
          <li>Test drive on the journeys you do most, especially if you have long trips or cold winters.</li>
          <li>For a used electric car, ask for a battery health report.</li>
        </ol>
      </GuideSection>

      <GuideSection id="questions" n={21} kicker="FAQs" title="Common questions">
        <h3>Do electric cars pay the ULEZ?</h3>
        <p>No. They are exempt from ULEZ and clean air zone charges, but pay the London congestion charge at a discount.</p>
        <h3>Will electricity prices rise?</h3>
        <p>They may. The calculator assumes today&rsquo;s prices throughout; try a higher price to test it.</p>
        <h3>What about hybrids?</h3>
        <p>Enter a hybrid&rsquo;s real mpg in the petrol car. Plug-in hybrids are cheapest if most trips are within their electric range.</p>
        <h3>Are there grants for electric cars?</h3>
        <p>The Electric Car Grant has offered discounts of up to £3,750 on some new electric cars under £37,000. Check whether the car you want qualifies, and enter the discounted price.</p>
        <h3>Do electric cars cost more to insure?</h3>
        <p>Often a little more, because repairs and parts can be dearer. The gap has narrowed as more insurers and repairers handle electric cars.</p>
        <h3>How long do electric car batteries last?</h3>
        <p>Most are designed to outlast the car, losing capacity slowly over many years. Manufacturers usually guarantee the battery for 8 years or around 100,000 miles.</p>
        <h3>Is an electric car cheaper to service?</h3>
        <p>Usually. There is no oil, spark plugs, clutch or exhaust, and brakes wear more slowly. Tyres may need replacing sooner because of the extra weight.</p>
        <h3>What if I mostly drive short trips?</h3>
        <p>Short trips suit electric cars well, as petrol engines are least efficient when cold. But at low mileage, the savings take longer to cover any higher purchase price.</p>
        <h3>Does cold weather affect electric cars?</h3>
        <p>Yes. Range can fall by a fifth or more in winter, as batteries are less efficient and heating uses energy. Pre-heating while plugged in at home helps.</p>
      </GuideSection>

      <GuideSection id="key-numbers" n={22} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "173.8p", label: "Petrol a litre" },
            { value: "26.32p", label: "Price cap a kWh" },
            { value: "8p", label: "Typical EV tariff a kWh" },
            { value: "£1,405", label: "Petrol fuel, 8,000 miles" },
            { value: "£183", label: "Electricity, 8,000 miles at 8p" },
            { value: "£200", label: "Car tax for both" },
            { value: "3p a mile", label: "Electric charge from 2028" },
            { value: "£240", label: "That charge at 8,000 miles" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

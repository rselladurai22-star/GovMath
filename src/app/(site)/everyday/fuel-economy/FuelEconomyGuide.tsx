import { Callout, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Fuel economy — the guide. Figures from src/lib/life/maths.ts and PRICES_2026 in src/lib/vehicles/running.ts. */

const TOC: TocItem[] = [
  { id: "short-answer", title: "The short answer" },
  { id: "units", title: "The four ways to measure economy" },
  { id: "gallons", title: "UK and US gallons" },
  { id: "convert", title: "Converting between units" },
  { id: "table", title: "Conversion table" },
  { id: "fill-up", title: "Measuring your real MPG" },
  { id: "cost", title: "Cost per mile and per trip" },
  { id: "yearly", title: "What better MPG saves in a year" },
  { id: "mpg-trap", title: "The MPG illusion" },
  { id: "official", title: "Official figures and real driving" },
  { id: "save", title: "Using less fuel" },
  { id: "prices", title: "Prices per litre and per gallon" },
  { id: "abroad", title: "Driving abroad" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "NIST — Guide for the Use of the SI, Appendix B.8: conversion factors", href: "https://www.nist.gov/pml/special-publication-811/nist-guide-si-appendix-b-conversion-factors/nist-guide-si-appendix-b8" },
  { label: "legislation.gov.uk — Weights and Measures Act 1985, Schedule 1", href: "https://www.legislation.gov.uk/ukpga/1985/72/schedule/1" },
  { label: "US Department of Energy and EPA — fueleconomy.gov", href: "https://www.fueleconomy.gov/" },
  { label: "GOV.UK — Weekly road fuel prices", href: "https://www.gov.uk/government/statistics/weekly-road-fuel-prices" },
];

export default function FuelEconomyGuide() {
  return (
    <Guide
      kicker="The fuel economy guide"
      title="How to measure and compare fuel economy"
      intro={
        <>
          Miles per gallon, litres per 100 km and km per litre all describe the same thing in different ways, and the UK and US use different gallons.
          This guide explains each unit, how to convert between them, how to measure your own car&rsquo;s economy and what it means for your fuel bill.
        </>
      }
      meta={["Worked examples", "6 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="short-answer" n={1} kicker="In brief" title="The short answer">
        <ul>
          <li>L/100 km = about 282.5 ÷ UK mpg, or about 235.2 ÷ US mpg.</li>
          <li>UK mpg is about 1.2 times US mpg for the same car.</li>
          <li>Your real MPG = distance since the last full tank ÷ fuel added to refill.</li>
          <li>Cost per mile = price per litre × litres per mile.</li>
        </ul>
        <KeyStats
          items={[
            { value: "5.65", label: "L/100 km at 50 mpg (UK)" },
            { value: "41.6", label: "US mpg at 50 UK mpg" },
            { value: "17.6p", label: "Petrol per mile at 45 mpg (UK)" },
            { value: "£35.12", label: "200 miles at 45 mpg (UK)" },
          ]}
        />
      </GuideSection>

      <GuideSection id="units" n={2} kicker="Units" title="The four ways to measure economy">
        <DataTable
          caption="Fuel economy units"
          head={["Unit", "Used in", "Better is"]}
          rows={[
            ["Miles per UK gallon", "UK", "Higher"],
            ["Miles per US gallon", "US", "Higher"],
            ["Litres per 100 km", "Europe, Australia, Canada", "Lower"],
            ["Km per litre", "Japan, India, Latin America", "Higher"],
          ]}
        />
        <p>
          MPG and km per litre measure distance per unit of fuel. L/100 km measures fuel per unit of distance, so a smaller number means a more
          efficient car.
        </p>
      </GuideSection>

      <GuideSection id="gallons" n={3} kicker="Units" title="UK and US gallons">
        <p>
          The UK (imperial) gallon is defined as exactly 4.54609 litres. The US gallon is 231 cubic inches, which is 3.785411784 litres. A UK gallon is
          therefore about 20% bigger, and the same car shows about 20% more miles per gallon in UK figures. A car rated at 50 mpg in the UK does about
          41.6 mpg in US gallons. UK fuel is sold by the litre, but car economy is still quoted in miles per UK gallon.
        </p>
      </GuideSection>

      <GuideSection id="convert" n={4} kicker="Converting" title="Converting between units">
        <WorkedExample
          title="50 mpg (UK) to litres per 100 km"
          steps={[
            { label: "50 miles × 1.609344", value: "80.47 km" },
            { label: "4.54609 litres ÷ 80.47 km", value: "0.0565 L per km" },
            { label: "× 100", value: "5.65 L/100 km" },
          ]}
          total={{ label: "Answer", value: "5.65 L/100 km" }}
        />
        <p>
          Because L/100 km is the reciprocal of MPG, the shortcut is to divide a constant by the MPG: about 282.5 for UK mpg and 235.2 for US mpg. Km per
          litre is 100 ÷ L/100 km.
        </p>
      </GuideSection>

      <GuideSection id="table" n={5} kicker="Table" title="Conversion table">
        <DataTable
          caption="Common figures converted"
          head={["UK mpg", "US mpg", "L/100 km", "km/L"]}
          numeric={[0, 1, 2, 3]}
          rows={[
            ["30", "25.0", "9.42", "10.6"],
            ["36.0", "30", "7.84", "12.8"],
            ["40", "33.3", "7.06", "14.2"],
            ["48.0", "40", "5.88", "17.0"],
            ["50", "41.6", "5.65", "17.7"],
            ["60", "50.0", "4.71", "21.2"],
          ]}
        />
      </GuideSection>

      <GuideSection id="fill-up" n={6} kicker="Measuring" title="Measuring your real MPG">
        <p>The dashboard figure is an estimate. The fill-up method is more accurate:</p>
        <ol>
          <li>Fill the tank until the pump clicks off, and reset the trip meter.</li>
          <li>Drive as normal, ideally for at least half a tank.</li>
          <li>Fill up again at the same pump if you can, and note the litres added.</li>
          <li>Divide the distance on the trip meter by the fuel added.</li>
        </ol>
        <WorkedExample
          title="412 miles, then 38.5 litres to refill"
          steps={[
            { label: "38.5 litres ÷ 4.54609", value: "8.47 UK gallons" },
            { label: "412 miles ÷ 8.47", value: "48.6 mpg (UK)" },
          ]}
          total={{ label: "In L/100 km", value: "5.81" }}
        />
        <p>Repeat over several tanks and average the results for a steadier figure.</p>
      </GuideSection>

      <GuideSection id="cost" n={7} kicker="Cost" title="Cost per mile and per trip">
        <p>
          The UK average petrol price was about 173.8p a litre and diesel about 198.9p in late September 2026. At 45 mpg (UK), a car uses about 0.101
          litres a mile. Shopping in the US? Running costs matter when you check <a href="/us/loans/car-affordability-calculator">how much car you can afford</a>.
        </p>
        <DataTable
          caption="200 miles at 45 mpg (UK)"
          head={["Fuel", "Price a litre", "Per mile", "200 miles"]}
          numeric={[1, 2, 3]}
          rows={[
            ["Petrol", "173.8p", "17.6p", "£35.12"],
            ["Diesel", "198.9p", "20.1p", "£40.19"],
          ]}
        />
        <p>
          In the US, with fuel priced per US gallon, divide the price by US mpg. At an example price of $3.20 a gallon and 30 mpg (US), fuel costs about
          10.7 cents a mile, or $21.33 for 200 miles. For UK journeys with passengers, parking, tolls and HMRC mileage rates, use the{" "}
          <a href="/uk/vehicles/fuel-cost-journey">fuel cost per journey calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="yearly" n={8} kicker="Cost" title="What better MPG saves in a year">
        <DataTable
          caption="Petrol for 10,000 miles a year at 173.8p a litre"
          head={["UK mpg", "Cost a year"]}
          numeric={[0, 1]}
          rows={[
            ["30", "£2,634"],
            ["40", "£1,975"],
            ["50", "£1,580"],
            ["60", "£1,317"],
          ]}
        />
        <p>
          The step from 30 to 40 mpg saves about £659 a year; the step from 50 to 60 saves about £263. To compare petrol, diesel and electric over
          several years, see the <a href="/uk/vehicles/petrol-vs-ev-cost">petrol vs EV running cost calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="mpg-trap" n={9} kicker="Watch out" title="The MPG illusion">
        <Callout title="Equal MPG gains are not equal savings">
          Fuel used depends on 1 ÷ MPG, so each extra mile per gallon saves less than the one before. Replacing a 30 mpg car saves far more fuel than
          replacing a 50 mpg one. Litres per 100 km avoids this trap, because savings scale with the number.
        </Callout>
      </GuideSection>

      <GuideSection id="official" n={10} kicker="Real world" title="Official figures and real driving">
        <p>
          Official figures come from a standard laboratory test (WLTP in the UK and Europe; the EPA test in the US). Real driving often uses more:
          short trips with a cold engine, motorway speeds, stop-start traffic, heavy loads, roof boxes, under-inflated tyres and air conditioning all
          raise fuel use. The fill-up method shows what your car really does.
        </p>
      </GuideSection>

      <GuideSection id="save" n={11} kicker="Tips" title="Using less fuel">
        <ul>
          <li>Drive smoothly: gentle acceleration and early braking save fuel.</li>
          <li>Keep to the speed limit; fuel use rises quickly at higher speeds.</li>
          <li>Check tyre pressures monthly and remove roof racks when not in use.</li>
          <li>Combine short trips, and share lifts. The <a href="/uk/vehicles/commuter-comparison">commuter cost comparison</a>{" "}compares driving with the train, bus and bike.</li>
        </ul>
      </GuideSection>

      <GuideSection id="prices" n={12} kicker="Prices" title="Prices per litre and per gallon">
        <p>
          UK and European pumps price fuel by the litre; US pumps by the US gallon. To compare, convert both to the same unit. 173.8p a litre is about
          £7.90 per UK gallon. An example US price of $3.20 a gallon is about $0.85 a litre. Choose the unit your price uses under &ldquo;Price is
          per&rdquo;, and the calculator converts it.
        </p>
      </GuideSection>

      <GuideSection id="abroad" n={13} kicker="Travel" title="Driving abroad">
        <p>
          Hiring a car abroad, you may see economy in L/100 km and distances in kilometres. Set the trip distance to kilometres under More options and
          the currency to euros or dollars, and enter the local price per litre. A car that does 50 mpg (UK) at home uses about 5.65 litres every 100
          km, so a 400 km drive needs about 22.6 litres.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={14} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "4.54609 L", label: "UK gallon" },
            { value: "3.785411784 L", label: "US gallon" },
            { value: "1.609344 km", label: "One mile" },
            { value: "282.5 ÷ mpg", label: "UK mpg to L/100 km" },
            { value: "235.2 ÷ mpg", label: "US mpg to L/100 km" },
            { value: "× 1.2", label: "US mpg to UK mpg (about)" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

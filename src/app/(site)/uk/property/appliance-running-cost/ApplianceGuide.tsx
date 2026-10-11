import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Appliance running costs: the full guide. Pure server component. Figures from src/lib/energy/costs.ts. */

const TOC: TocItem[] = [
  { id: "basics", title: "How running costs work" },
  { id: "sum", title: "The sum, step by step" },
  { id: "rate", title: "Which unit rate to use" },
  { id: "table", title: "Typical costs of common appliances" },
  { id: "biggest", title: "The biggest users" },
  { id: "kettle", title: "Kettles" },
  { id: "cooking", title: "Air fryer, oven, microwave and hob" },
  { id: "laundry", title: "Washing and drying clothes" },
  { id: "heaters", title: "Electric heaters" },
  { id: "gas-v-electric", title: "Electric heater or gas central heating?" },
  { id: "hot-water", title: "Electric showers and immersion heaters" },
  { id: "cold", title: "Fridges and freezers" },
  { id: "screens", title: "TVs, consoles and computers" },
  { id: "standby", title: "Standby power" },
  { id: "ev", title: "Charging an electric car at home" },
  { id: "off-peak", title: "Economy 7 and off-peak rates" },
  { id: "labels", title: "Finding the wattage and energy label" },
  { id: "measure", title: "Measuring real use" },
  { id: "cut", title: "Cutting the cost" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "Ofgem: energy price cap unit rates and standing charges", href: "https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges" },
  { label: "Ofgem: changes to the energy price cap, 1 October to 31 December 2026", href: "https://ofgem.gov.uk/news/changes-energy-price-cap-between-1-october-and-31-december-2026" },
  { label: "Ofgem: review of typical domestic consumption values, decision", href: "https://www.ofgem.gov.uk/consultation/review-typical-domestic-consumption-values" },
  { label: "GOV.UK: Boiler Plus factsheet", href: "https://assets.publishing.service.gov.uk/media/5b2cc1e2ed915d586e2d8fe9/Boiler_Plus_Factsheet_v3.pdf" },
];

export default function ApplianceGuide() {
  return (
    <Guide
      kicker="The appliance running cost guide"
      title="What your appliances cost to run"
      intro={
        <>
          Every appliance costs money in the same way: the power it draws, for how long, times the price of a unit of electricity. This guide shows the
          sum, the price cap rate for October to December 2026, typical costs for more than 25 common appliances, and where the real savings are.
        </>
      }
      meta={["October 2026", "11 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="basics" n={1} kicker="The basics" title="How running costs work">
        <p>
          Electricity is sold by the <strong>kilowatt hour (kWh)</strong>, often called a unit. One kWh is the energy used by something drawing 1,000 watts
          (1kW) for one hour. A 3,000-watt kettle uses a unit in 20 minutes. A 100-watt TV takes 10 hours to use the same unit.
        </p>
        <p>
          Your supplier charges a price for each unit you use, plus a daily standing charge that you pay whatever you use. The standing charge does not
          change when you switch an appliance on or off, so the running cost of an appliance is only the units it uses multiplied by the unit rate.
        </p>
        <p>
          Two things decide the bill for an appliance: how powerful it is, and how long it runs. A powerful appliance used briefly, like a kettle or a hair
          dryer, can cost less over a year than a small one that runs for hours every day, like a dehumidifier.
        </p>
      </GuideSection>

      <GuideSection id="sum" n={2} kicker="The method" title="The sum, step by step">
        <p>The calculation has three steps. Here it is for a 3,000-watt kettle boiled for 3 minutes, at the price cap rate.</p>
        <WorkedExample
          title="A kettle at the October to December 2026 price cap"
          steps={[
            { label: "Power in kilowatts", note: "3,000 watts ÷ 1,000", value: "3 kW" },
            { label: "Time in hours", note: "3 minutes ÷ 60", value: "0.05 hours" },
            { label: "Units used", note: "3 kW × 0.05 hours", value: "0.15 kWh" },
            { label: "Cost", note: "0.15 kWh × 26.32p", value: "3.9p" },
          ]}
          total={{ label: "Four boils a day for a year", value: "£57.64" }}
        />
        <p>
          Some appliances do not run at full power the whole time. An oven, an oil-filled radiator or a fridge has a thermostat that switches the heating
          element or compressor on and off once it reaches temperature. The calculator has a &ldquo;share of time drawing power&rdquo; setting for this
          under More options.
        </p>
      </GuideSection>

      <GuideSection id="rate" n={3} kicker="The price" title="Which unit rate to use">
        <p>
          The calculator starts with the <strong>Ofgem price cap</strong> rate for electricity from 1 October to 31 December 2026: <strong>26.32p per kWh</strong>,
          the average for Great Britain paying by Direct Debit. From July to September 2026 it was 26.11p.
        </p>
        <p>
          The government removed VAT from household electricity from 1 October 2026 to 31 March 2027, so the 26.32p rate includes no VAT. Without that
          change, the rate would be about 5% higher. Gas still carries 5% VAT.
        </p>
        <p>
          The cap is an average. Rates differ by region and by payment method, and fixed tariffs have their own prices. For the most accurate answer,
          take the unit rate from your latest bill or your supplier&rsquo;s app and enter it under More options.
        </p>
        <Callout title="Next price cap">
          Ofgem is due to announce the cap for January to March 2027 on 25 November 2026. If the unit rate changes, every figure here changes in proportion.
        </Callout>
      </GuideSection>

      <GuideSection id="table" n={4} kicker="At a glance" title="Typical costs of common appliances">
        <p>These are typical wattages and use, at 26.32p a unit. Your own appliance may use more or less: check its rating plate.</p>
        <DataTable
          caption="Typical running costs at 26.32p per kWh"
          head={["Appliance", "Typical use", "Each use", "A year"]}
          numeric={[2, 3]}
          rows={[
            ["Kettle (3kW)", "3 min, 4 a day", "4p", "£57.64"],
            ["Microwave (1.2kW)", "5 min, 2 a day", "3p", "£19.21"],
            ["Air fryer (1.5kW)", "20 min, 1 a day", "13p", "£48.03"],
            ["Electric oven (2.4kW)", "45 min, 1 a day", "28p", "£103.75"],
            ["Washing machine, 40°C", "4 a week", "20p", "£41.17"],
            ["Tumble dryer (2.5kW)", "75 min, 3 a week", "82p", "£128.66"],
            ["Heat pump tumble dryer", "2 hours, 3 a week", "42p", "£65.88"],
            ["Dishwasher", "5 a week", "26p", "£68.62"],
            ["Fridge freezer", "Always on", "19p a day", "£69.17"],
            ["Electric heater (2kW)", "3 hours a day", "£1.58", "£576.41"],
            ["Oil-filled radiator (1.5kW)", "4 hours a day", "95p", "£345.84"],
            ["Dehumidifier (300W)", "8 hours a day", "63p", "£230.56"],
            ["Electric shower (9.5kW)", "8 min a day", "33p", "£121.69"],
            ["Immersion heater (3kW)", "1 hour a day", "79p", "£288.20"],
            ["TV (100W)", "4 hours a day", "11p", "£38.43"],
            ["Games console (150W)", "2 hours a day", "8p", "£28.82"],
          ]}
        />
      </GuideSection>

      <GuideSection id="biggest" n={5} kicker="Where the money goes" title="The biggest users">
        <p>
          Anything that heats, or that runs for many hours, tends to top the list. With typical use, these cost the most over a year at the price cap rate:
        </p>
        <Bars
          items={[
            { label: "Electric car, 2 charges a week", value: 768.54 },
            { label: "Electric heater, 3 hours a day", value: 576.41 },
            { label: "Oil-filled radiator, 4 hours a day", value: 345.84 },
            { label: "Immersion heater, 1 hour a day", value: 288.2 },
            { label: "Dehumidifier, 8 hours a day", value: 230.56 },
            { label: "Tumble dryer, 3 a week", value: 128.66 },
            { label: "Electric shower, 8 min a day", value: 121.69 },
            { label: "Electric oven, 1 a day", value: 103.75 },
          ]}
          format={(n) => "£" + n.toFixed(2)}
        />
        <p>
          Ofgem&rsquo;s typical home uses 2,500 kWh of electricity a year, which is about £658 in units at 26.32p. A single heater used every day in winter
          can add a large share of that on its own.
        </p>
      </GuideSection>

      <GuideSection id="kettle" n={6} kicker="Kitchen" title="Kettles">
        <p>
          A kettle is one of the most powerful things in a home, usually 2,500 to 3,000 watts, but it only runs for a few minutes. A 3kW kettle costs
          about <strong>1.3p a minute</strong>, so a 3-minute boil costs about 4p.
        </p>
        <p>
          The biggest saving is boiling only the water you need. Boiling a full kettle for one mug heats water you then let go cold. Descaling helps too,
          as scale slows the element down.
        </p>
      </GuideSection>

      <GuideSection id="cooking" n={7} kicker="Kitchen" title="Air fryer, oven, microwave and hob">
        <p>
          An air fryer is smaller and heats up quickly, so it usually costs less than a full-size oven for the same food. With typical figures, a
          20-minute air fryer meal costs about <strong>13p</strong> and a 45-minute oven meal about <strong>28p</strong>. Once a day for a year, that is a
          saving of about <strong>£55.72</strong>.
        </p>
        <CompareCards
          columns={[
            { name: "Air fryer", rows: [{ label: "Power", value: "1,500 W" }, { label: "Time", value: "20 min" }, { label: "Each meal", value: "13p" }, { label: "A year, daily", value: "£48.03" }] },
            { name: "Electric oven", rows: [{ label: "Power", value: "2,400 W" }, { label: "Time", value: "45 min, on 60%" }, { label: "Each meal", value: "28p" }, { label: "A year, daily", value: "£103.75" }] },
          ]}
        />
        <p>
          The gap closes when you fill the oven: one oven cooking a whole family meal can beat several air fryer batches. A microwave is the cheapest way to
          reheat food, at about 3p for 5 minutes. A slow cooker uses little power (about 200 watts) but runs for hours, so 8 hours costs about 42p. One
          ring of an electric hob for 20 minutes costs about 9p.
        </p>
      </GuideSection>

      <GuideSection id="laundry" n={8} kicker="Laundry" title="Washing and drying clothes">
        <p>
          A washing machine spends most of its energy heating water. A typical 40°C wash uses about 0.75 kWh, or <strong>20p</strong>. Washing at 30°C or
          on an eco programme uses less.
        </p>
        <p>
          Drying is the expensive part. A vented or condenser tumble dryer at 2,500 watts for 75 minutes uses about 3.1 kWh, or <strong>82p</strong> a load.
          A heat pump dryer recycles its warm air and uses about half as much: about <strong>42p</strong> a load. At three loads a week, that is £128.66 a
          year against £65.88.
        </p>
        <p>
          A heated clothes airer at 300 watts for 4 hours costs about 32p. A dehumidifier in the same room for 8 hours costs about 63p, but also helps with
          damp. Drying outside is free.
        </p>
      </GuideSection>

      <GuideSection id="heaters" n={9} kicker="Heating" title="Electric heaters">
        <p>
          Every electric heater turns one unit of electricity into one unit of heat, whatever its type. A 2kW fan heater and a 2kW convector give the same heat
          for the same cost: about <strong>53p an hour</strong> at full power, or £1.58 for 3 hours.
        </p>
        <p>
          An oil-filled radiator holds its heat and its thermostat switches the element off once the room is warm. At 1,500 watts, drawing power about 60%
          of the time, 4 hours costs about 95p. A halogen heater warms people in front of it quickly, which suits short spells: 1,200 watts for 3 hours
          also costs about 95p.
        </p>
        <Callout tone="warn" title="Heaters add up quickly">
          A 2kW heater used for 3 hours every day costs about £48 a month. Over a whole year that is £576.41, nearly as much as the unit cost of a
          typical home&rsquo;s other electricity.
        </Callout>
      </GuideSection>

      <GuideSection id="gas-v-electric" n={10} kicker="Heating" title="Electric heater or gas central heating?">
        <p>
          Gas is much cheaper per unit than electricity. At the October to December 2026 cap, gas costs 7.97p per kWh. A boiler loses some heat up the
          flue: new gas boilers in England must be rated at least 92% efficient, and we assume 90% in real use. That makes a unit of heat from gas about{" "}
          <strong>8.86p</strong>, against <strong>26.32p</strong> from an electric heater: electric heat costs about 3 times as much.
        </p>
        <CompareCards
          columns={[
            { name: "2kW electric heater", rows: [{ label: "Heat a day", value: "6 kWh" }, { label: "Cost a day", value: "£1.58" }, { label: "A year, daily", value: "£576.41" }] },
            { name: "Gas central heating", rows: [{ label: "Same heat a day", value: "6 kWh" }, { label: "Cost a day", value: "53p" }, { label: "A year, daily", value: "£193.94" }] },
          ]}
        />
        <p>
          That is not the whole story. Central heating warms every room with a radiator, while a heater warms one. If you only need one room warm for a few
          hours, a heater can cost less than heating the whole house. Choose &ldquo;Gas central heating&rdquo; in the calculator to compare your own heater.
        </p>
      </GuideSection>

      <GuideSection id="hot-water" n={11} kicker="Hot water" title="Electric showers and immersion heaters">
        <p>
          An electric shower is often the most powerful appliance in a home: 8.5 to 10.5kW is common. A 9.5kW shower costs about <strong>4p a minute</strong>,
          so an 8-minute shower is about 33p and a 10-minute one about 42p. Four people each showering for 8 minutes every day would spend about £486.74 a year.
        </p>
        <p>
          An immersion heater heats a tank of hot water. A 3kW element running for an hour costs about 79p, or £288.20 a year if used daily. A timer, a
          well-insulated tank and an off-peak rate all cut that cost.
        </p>
      </GuideSection>

      <GuideSection id="cold" n={12} kicker="Always on" title="Fridges and freezers">
        <p>
          A fridge freezer runs all day, every day, but its compressor only draws power part of the time. An average draw of about 30 watts works out at
          about 263 kWh a year, or <strong>£69.17</strong>.
        </p>
        <p>
          The energy label gives a better figure for your own model: it shows the kWh used a year. Multiply that by your unit rate. Older models,
          frost-covered freezers and a fridge next to an oven or in a warm garage all use more.
        </p>
      </GuideSection>

      <GuideSection id="screens" n={13} kicker="Entertainment" title="TVs, consoles and computers">
        <p>
          Screens use less than people expect. A 100-watt TV on for 4 hours a day costs about 11p a day, or £38.43 a year. A games console at 150 watts for 2
          hours a day costs about 8p a day, or £28.82 a year. A laptop uses little power, about 8p for 6 hours, while a desktop computer and screen at 200
          watts costs about 21p for 4 hours, or £76.85 a year.
        </p>
        <p>Larger TVs and gaming PCs draw more. The figure on the rating plate is the most it can draw; average use is often lower.</p>
      </GuideSection>

      <GuideSection id="standby" n={14} kicker="Always on" title="Standby power">
        <p>
          Things left on standby still use a little power. Each watt drawn all year round costs about <strong>£2.31</strong> at 26.32p a unit. A home with
          10 watts of standby across a TV, a set-top box, chargers and a microwave clock spends about £23.06 a year on nothing.
        </p>
        <p>Switching off at the wall, or using a plug with a timer, removes that cost. Leave fridges, freezers and anything that needs to stay on alone.</p>
      </GuideSection>

      <GuideSection id="ev" n={15} kicker="Motoring" title="Charging an electric car at home">
        <p>
          A typical home charger delivers about 7kW. Four hours puts about 28 kWh into the battery, which costs about <strong>£7.37</strong> at the price cap
          rate. On an overnight tariff at 8p a unit, the same charge costs about £2.24. Twice a week for a year, that is £768.54 against £233.60.
        </p>
        <p>
          To compare an electric car with petrol or diesel over several years, use our <a href="/uk/vehicles/petrol-vs-ev-cost">petrol vs electric car calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="off-peak" n={16} kicker="Tariffs" title="Economy 7 and off-peak rates">
        <p>
          Economy 7 tariffs have two rates: a cheaper rate for seven hours at night and a dearer rate for the rest of the day. Ofgem assumes 42% of an Economy
          7 home&rsquo;s electricity is used at night. Smart tariffs with cheap overnight or off-peak periods work in a similar way.
        </p>
        <p>
          A cheap night rate only saves money if you move use into those hours: a dishwasher, washing machine or car charger on a timer, or a hot water
          tank heated overnight. If most of your use is in the day, the higher day rate can make Economy 7 cost more than a single-rate tariff.
        </p>
        <p>Pick &ldquo;Off-peak&rdquo; under More options in the calculator and enter the night rate from your bill.</p>
      </GuideSection>

      <GuideSection id="labels" n={17} kicker="Your appliance" title="Finding the wattage and energy label">
        <p>
          The power is printed on the rating plate, usually on the back, underneath or inside the door, and in the manual. It is shown in watts (W) or
          kilowatts (kW). If it shows a range, such as 2,520 to 3,000W, the higher figure is the most it can draw.
        </p>
        <p>The energy label on newer appliances gives energy use in a more useful form:</p>
        <ul>
          <li><strong>Fridges and freezers:</strong> kWh a year.</li>
          <li><strong>Washing machines, washer-dryers and dishwashers:</strong> kWh per 100 cycles on the eco programme. Divide by 100 for one cycle.</li>
          <li><strong>TVs and monitors:</strong> kWh per 1,000 hours. Divide by 1,000 for one hour.</li>
        </ul>
      </GuideSection>

      <GuideSection id="measure" n={18} kicker="Your home" title="Measuring real use">
        <p>
          A plug-in energy monitor sits between the socket and the appliance and shows the power it actually draws and the units used. It is the most accurate
          way to see what a thermostat appliance, such as a fridge or oil-filled radiator, really uses over a day.
        </p>
        <p>
          A smart meter&rsquo;s in-home display shows what the whole home is using right now. Switch an appliance on and watch the jump: that is roughly its
          power.
        </p>
      </GuideSection>

      <GuideSection id="cut" n={19} kicker="Saving money" title="Cutting the cost">
        <ul>
          <li><strong>Use it for less time.</strong> Cost rises in step with time, so halving the time halves the cost.</li>
          <li><strong>Pick the smaller tool.</strong> A microwave or air fryer for small meals, a heated airer instead of a tumble dryer.</li>
          <li><strong>Use lower settings.</strong> Washing at 30°C, eco programmes and a lower heater setting all use less.</li>
          <li><strong>Move use to cheaper hours</strong> if you have an off-peak tariff.</li>
          <li><strong>Check your tariff.</strong> See your whole bill with our <a href="/uk/property/energy-bill-calculator">energy bill calculator</a>.</li>
        </ul>
        <p>
          If you are struggling to pay, contact your supplier: they must offer help such as a payment plan. Our <a href="/uk/benefits/benefits-checker">benefits checker</a>{" "}
          shows support you may be missing, and people over State Pension age can check <a href="/uk/benefits/pension-credit">Pension Credit</a>, which opens the
          door to other help with bills. If you are moving home, add energy to your <a href="/uk/property/moving-house-budget">moving house budget</a>.
        </p>
      </GuideSection>

      <GuideSection id="key-numbers" n={20} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "26.32p", label: "Electricity per kWh, October to December 2026 cap" },
            { value: "0%", label: "VAT on electricity to 31 March 2027" },
            { value: "7.97p", label: "Gas per kWh at the cap" },
            { value: "2,500 kWh", label: "Typical yearly electricity use" },
            { value: "£2.31", label: "Cost of 1 watt left on all year" },
            { value: "4p", label: "A 3-minute kettle boil" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Heat pump vs gas boiler: the full guide. Pure server component. Figures from src/lib/energy/home-upgrades.ts. */

const TOC: TocItem[] = [
  { id: "basics", title: "How the two compare" },
  { id: "heat", title: "Working out your heat demand" },
  { id: "scop", title: "Heat pump efficiency (SCOP)" },
  { id: "boiler", title: "Gas boiler efficiency" },
  { id: "prices", title: "Gas and electricity prices" },
  { id: "worked", title: "A worked example" },
  { id: "sizes", title: "Small, medium and large homes" },
  { id: "scop-matters", title: "Why efficiency decides it" },
  { id: "standing", title: "The gas standing charge" },
  { id: "tariffs", title: "Heat pump tariffs" },
  { id: "costs", title: "What a heat pump costs" },
  { id: "bus", title: "The Boiler Upgrade Scheme" },
  { id: "nations", title: "Scotland, Wales and Northern Ireland" },
  { id: "vat", title: "0% VAT until March 2027" },
  { id: "payback", title: "Payback and the 15-year view" },
  { id: "carbon", title: "Carbon" },
  { id: "suitable", title: "Is your home suitable?" },
  { id: "solar", title: "Adding solar panels" },
  { id: "living", title: "Living with a heat pump" },
  { id: "steps", title: "Next steps" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "GOV.UK: Apply for the Boiler Upgrade Scheme, what you can get", href: "https://www.gov.uk/apply-boiler-upgrade-scheme/what-you-can-get" },
  { label: "DESNZ: Boiler Upgrade Scheme statistics", href: "https://www.gov.uk/government/collections/boiler-upgrade-scheme-statistics" },
  { label: "DESNZ: Alternative low carbon heating technology costs, analytical annex", href: "https://assets.publishing.service.gov.uk/media/6917213f9d50fc2fe8161800/alternative-low-carbon-heating-technology-costs-analytical-annex.pdf" },
  { label: "Ofgem: energy price cap unit rates and standing charges", href: "https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges" },
  { label: "Ofgem: review of typical domestic consumption values, decision", href: "https://www.ofgem.gov.uk/consultation/review-typical-domestic-consumption-values" },
  { label: "HMRC: VAT on energy-saving materials and heating equipment (Notice 708/6)", href: "https://www.gov.uk/guidance/vat-on-energy-saving-materials-and-heating-equipment-notice-7086" },
  { label: "DESNZ: Greenhouse gas reporting conversion factors 2026", href: "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026" },
  { label: "GOV.UK: Boiler Plus factsheet", href: "https://assets.publishing.service.gov.uk/media/5b2cc1e2ed915d586e2d8fe9/Boiler_Plus_Factsheet_v3.pdf" },
];

export default function HeatPumpGuide() {
  return (
    <Guide
      kicker="The heat pump guide"
      title="Heat pump or gas boiler: what it really costs"
      intro={
        <>
          A heat pump turns one unit of electricity into about three units of heat, but electricity costs about three times as much as gas. This guide
          shows how the sums work at the January 2027 price cap, what decides whether a heat pump is cheaper to run, what it costs to fit after the £7,500
          grant and how long it takes to pay back.
        </>
      }
      meta={["November 2026", "12 min read", "Reviewed November 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="basics" n={1} kicker="The basics" title="How the two compare">
        <p>
          A gas boiler burns gas to heat water for your radiators and taps. A good one turns about 90% of the gas&rsquo;s energy into useful heat. An air
          source heat pump works like a fridge in reverse: it takes heat from the outside air and moves it into the house, using electricity to run a
          compressor.
        </p>
        <p>
          Because it moves heat rather than making it, a heat pump gives out more heat than the electricity it uses. Over a year, a typical one in a UK home
          gives about 2.8 units of heat for each unit of electricity.
        </p>
        <p>
          The comparison comes down to four numbers: how much heat your home needs, the boiler&rsquo;s efficiency, the heat pump&rsquo;s efficiency and the
          prices of gas and electricity. The calculator puts them together, then adds the upfront costs and the grant.
        </p>
      </GuideSection>

      <GuideSection id="heat" n={2} kicker="Your home" title="Working out your heat demand">
        <p>
          The heat your home needs is the same whichever system makes it. The easiest way to find it is from your gas use: multiply the kWh of gas on your
          annual statement by the boiler&rsquo;s efficiency. A home burning 9,500 kWh of gas in a 90% boiler needs about 8,550 kWh of heat.
        </p>
        <p>If you do not know your gas use, the calculator uses Ofgem&rsquo;s typical figures from July 2026:</p>
        <DataTable
          caption="Ofgem typical gas use and the heat it gives"
          head={["Home", "Gas a year", "Heat at 90%"]}
          numeric={[1, 2]}
          rows={[
            ["Low use (flat or small house)", "6,000 kWh", "5,400 kWh"],
            ["Medium use (typical house)", "9,500 kWh", "8,550 kWh"],
            ["High use (large house)", "14,000 kWh", "12,600 kWh"],
          ]}
        />
        <p>An installer will do a room-by-room heat loss survey, which gives a more exact figure and decides the size of the heat pump.</p>
      </GuideSection>

      <GuideSection id="scop" n={3} kicker="Efficiency" title="Heat pump efficiency (SCOP)">
        <p>
          A heat pump&rsquo;s efficiency over a whole year is its <strong>seasonal coefficient of performance (SCOP)</strong>, or seasonal performance factor
          when measured in a real home. A SCOP of 3 means 3 kWh of heat for each kWh of electricity.
        </p>
        <p>
          The government&rsquo;s Electrification of Heat trial measured hundreds of heat pumps in UK homes. Air source heat pumps had a median of about 2.8,
          and that is our starting figure. Many did better: well-designed systems running radiators at low temperatures reach 3.5 or more.
        </p>
        <p>
          Efficiency falls when the heat pump has to heat water to a high temperature, so a system designed for low flow temperatures, with larger radiators
          where needed, runs more cheaply.
        </p>
      </GuideSection>

      <GuideSection id="boiler" n={4} kicker="Efficiency" title="Gas boiler efficiency">
        <p>
          New gas boilers in England must be at least 92% efficient under the Boiler Plus rules. In real homes they often do a little worse, because they
          run at higher temperatures than in tests. We assume 90%; you can change it under More options.
        </p>
        <p>
          The boiler&rsquo;s efficiency matters twice: it sets how much heat your home needs from your gas use, and how much gas a new boiler would burn. If
          you replace an old boiler with a new one, its running cost hardly changes in this comparison, because the heat demand is worked out from the same gas.
        </p>
      </GuideSection>

      <GuideSection id="prices" n={5} kicker="Prices" title="Gas and electricity prices">
        <p>From 1 January to 31 March 2027, the Ofgem price cap for Great Britain, paying by Direct Debit, is:</p>
        <DataTable
          caption="Price cap, January to March 2027"
          head={["", "Unit rate", "Standing charge"]}
          rows={[
            ["Electricity (no VAT until 30 June 2027)", "32.69p per kWh", "54.77p a day"],
            ["Gas (5% VAT)", "10.96p per kWh", "29.65p a day"],
          ]}
        />
        <p>
          Electricity costs about 3 times as much as gas per unit. Per unit of heat, gas in a 90% boiler costs about 12.18p, and electricity in a heat pump
          with a SCOP of 2.8 about 11.68p. The two are close, which is why the efficiency of the heat pump matters so much. From October to December 2026
          the rates were 26.32p for electricity and 7.97p for gas: the January rise came mainly from higher wholesale gas prices, and gas rose by more, which
          helps heat pumps.
        </p>
      </GuideSection>

      <GuideSection id="worked" n={6} kicker="Example" title="A worked example">
        <p>A typical house using 9,500 kWh of gas, at the January 2027 cap, with a heat pump at the median SCOP of 2.8 and the gas supply capped.</p>
        <WorkedExample
          title="Running costs for a year"
          steps={[
            { label: "Heat needed", note: "9,500 kWh gas × 90%", value: "8,550 kWh" },
            { label: "Gas boiler: gas", note: "9,500 × 10.96p", value: "£1,041" },
            { label: "Gas boiler: standing charge", note: "29.65p × 365", value: "£108" },
            { label: "Heat pump: electricity", note: "8,550 ÷ 2.8 = 3,054 kWh × 32.69p", value: "£998" },
          ]}
          total={{ label: "Heat pump saves", value: "£151 a year" }}
        />
        <p>
          The heat pump uses a little less money in fuel, and leaving gas also removes the £108 standing charge. Upfront, a median heat pump at £12,908 less
          the £7,500 grant costs £5,408, about £2,408 more than a £3,000 boiler. At £151 a year, that does not quite pay back within 15 years.
        </p>
      </GuideSection>

      <GuideSection id="sizes" n={7} kicker="Homes" title="Small, medium and large homes">
        <p>At SCOP 2.8 and the January 2027 cap:</p>
        <DataTable
          caption="Running cost a year at SCOP 2.8"
          head={["Home", "Gas boiler", "Heat pump", "Difference", "15 years: boiler", "15 years: heat pump"]}
          numeric={[1, 2, 3, 4, 5]}
          rows={[
            ["Low use", "£766", "£630", "£135 cheaper", "£14,487", "£14,865"],
            ["Medium use", "£1,149", "£998", "£151 cheaper", "£20,241", "£20,381"],
            ["High use", "£1,643", "£1,471", "£172 cheaper", "£27,639", "£27,474"],
          ]}
        />
        <p>
          The 15-year totals include a £3,000 boiler or a £12,908 heat pump less the £7,500 grant. At the median efficiency, the boiler is slightly cheaper overall
          for the low and medium homes, and the heat pump for the high-use home, where it pays back in about 14 years. A better SCOP or a cheaper electricity
          tariff tips the balance further.
        </p>
      </GuideSection>

      <GuideSection id="scop-matters" n={8} kicker="Efficiency" title="Why efficiency decides it">
        <p>For the medium home, the heat pump&rsquo;s running cost a year at different SCOPs (the boiler costs £1,149):</p>
        <Bars
          items={[
            { label: "SCOP 2.5", value: 1118 },
            { label: "SCOP 2.8", value: 998.21 },
            { label: "SCOP 3.0", value: 931.66 },
            { label: "SCOP 3.5", value: 798.57 },
            { label: "SCOP 4.0", value: 698.75 },
            { label: "Gas boiler", value: 1149.42 },
          ]}
        />
        <p>
          At these prices, the heat pump matches the boiler at a SCOP of about 2.43. At 3.5 it saves £351 a year and pays back the extra upfront cost in
          6.9 years; at 4.0 it saves £451 and pays back in 5.3 years. Ask installers what SCOP they design for, and how they will get there.
        </p>
      </GuideSection>

      <GuideSection id="standing" n={9} kicker="Standing charge" title="The gas standing charge">
        <p>
          If you switch fully to a heat pump and have the gas supply capped, you stop paying the gas standing charge: 29.65p a day, about £108 a year at
          the cap. Your electricity standing charge stays the same either way.
        </p>
        <p>
          If you keep gas for a hob, the standing charge stays. In the medium example, that cuts the £151 saving to £43 a year, and raises the break-even
          SCOP from 2.43 to 2.68. An induction hob costs little to run: see our{" "}
          <a href="/uk/property/appliance-running-cost">appliance running cost calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="tariffs" n={10} kicker="Tariffs" title="Heat pump tariffs">
        <p>
          Several suppliers offer tariffs for heat pump owners, with cheaper electricity at set times or a lower rate for the heat pump. Running the heat pump
          more in the cheap periods lowers the average price you pay.
        </p>
        <CompareCards
          columns={[
            { name: "32.69p (price cap)", rows: [{ label: "Heat pump a year", value: "£998" }, { label: "Saving", value: "£151" }, { label: "Payback", value: "Over 15 years" }] },
            { name: "Average 20p", rows: [{ label: "Heat pump a year", value: "£611" }, { label: "Saving", value: "£539" }, { label: "Payback", value: "4.5 years" }] },
            { name: "Average 15p", rows: [{ label: "Heat pump a year", value: "£458" }, { label: "Saving", value: "£691" }, { label: "Payback", value: "3.5 years" }] },
          ]}
        />
        <p>
          Check the whole tariff, not just the cheap rate: what you pay for the rest of the house&rsquo;s electricity matters too. Our{" "}
          <a href="/uk/property/energy-bill-calculator">energy bill calculator</a> shows your full bill.
        </p>
      </GuideSection>

      <GuideSection id="costs" n={11} kicker="Upfront" title="What a heat pump costs">
        <p>
          The government publishes the cost of every heat pump fitted under the Boiler Upgrade Scheme. From April to June 2026, the median air source heat
          pump cost <strong>£12,908</strong> before the grant. A quarter cost less than £11,128 and a quarter more than £15,627.
        </p>
        <p>
          The price usually includes the heat pump, a hot water cylinder, controls, and any radiators that need upsizing. Homes with a combi boiler and no
          cylinder need room for one. A replacement gas boiler is cheaper: we use £3,000 as an example, but enter your own quote. If your boiler is fine for
          now, set the boiler cost to £0.
        </p>
      </GuideSection>

      <GuideSection id="bus" n={12} kicker="Grant" title="The Boiler Upgrade Scheme">
        <p>In England and Wales, the Boiler Upgrade Scheme gives:</p>
        <ul>
          <li><strong>£7,500</strong> towards an air source or ground source heat pump.</li>
          <li><strong>£2,500</strong> towards an air-to-air heat pump.</li>
          <li><strong>£5,000</strong> towards a biomass boiler.</li>
          <li>An extra <strong>£1,500</strong> until March 2027 for an air or ground source heat pump in a home heated by oil or LPG with no mains gas.</li>
        </ul>
        <p>
          The installer applies and takes the grant off your bill. The installer must be MCS certified, and the home normally needs a valid Energy
          Performance Certificate. Without the grant, the medium example&rsquo;s extra upfront cost rises from £2,408 to £9,908.
        </p>
      </GuideSection>

      <GuideSection id="nations" n={13} kicker="Where you live" title="Scotland, Wales and Northern Ireland">
        <p>
          Wales is covered by the Boiler Upgrade Scheme. Scotland is not: Home Energy Scotland offers its own grant and an interest-free loan for heat pumps.
          Northern Ireland has no equivalent grant, and its energy prices are not covered by the Ofgem cap, so enter your own rates.
        </p>
      </GuideSection>

      <GuideSection id="vat" n={14} kicker="Tax" title="0% VAT until March 2027">
        <p>
          Installing a heat pump in a home in Great Britain is zero-rated for VAT until <strong>31 March 2027</strong>. From 1 April 2027, the rate is due to
          return to 5%. On a £12,908 heat pump, that would add about £645.
        </p>
        <Callout title="Electricity VAT">
          Household electricity also carries no VAT from 1 October 2026 to 30 June 2027, which lowers heat pump running costs. Gas keeps 5% VAT. If
          electricity VAT returns at 5% in July 2027, heat pump running costs rise by about 5%.
        </Callout>
      </GuideSection>

      <GuideSection id="payback" n={15} kicker="Payback" title="Payback and the 15-year view">
        <p>
          Payback is the extra upfront cost divided by the yearly saving. If the heat pump costs less upfront than the boiler after the grant, it pays back
          from day one. If it costs more to run, it never pays back.
        </p>
        <p>
          A large home with a well-designed system (SCOP 3.5) saves £466 a year and pays back in 5.2 years; over 15 years it costs £23,061 against the
          boiler&rsquo;s £27,639. Price changes matter too: if gas and electricity both rose 3% a year, the medium example&rsquo;s 15-year totals would be
          £24,378 for the boiler and £23,974 for the heat pump.
        </p>
      </GuideSection>

      <GuideSection id="carbon" n={16} kicker="Carbon" title="Carbon">
        <p>
          Using the government&rsquo;s 2026 conversion factors (0.182 kg of CO2e per kWh of gas and 0.144 kg per kWh of grid electricity, including losses),
          the medium home&rsquo;s boiler produces about 1.7 tonnes of CO2e a year and the heat pump about 440 kg: a cut of about 1.3 tonnes, or three quarters.
        </p>
        <p>As the grid gets cleaner each year, the heat pump&rsquo;s carbon falls further. A gas boiler&rsquo;s does not.</p>
      </GuideSection>

      <GuideSection id="suitable" n={17} kicker="Your home" title="Is your home suitable?">
        <ul>
          <li><strong>Insulation:</strong> loft and wall insulation reduce the heat needed and let the heat pump run at lower, more efficient temperatures.</li>
          <li><strong>Radiators:</strong> some may need to be larger. Underfloor heating suits heat pumps well.</li>
          <li><strong>Space:</strong> an outdoor unit (usually beside or behind the house) and a hot water cylinder indoors.</li>
          <li><strong>Noise and planning:</strong> most air source heat pumps are permitted development in England if they meet the size and noise rules. Check with your council for flats, listed buildings and conservation areas.</li>
        </ul>
      </GuideSection>

      <GuideSection id="solar" n={18} kicker="Together" title="Adding solar panels">
        <p>
          Solar panels make most of their power in summer, when a heat pump needs least. They still help with hot water and spring and autumn heating, and
          with a battery or a smart tariff the two can work well together. See what panels would make on your roof with our{" "}
          <a href="/uk/property/solar-panel-calculator">solar panel calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="living" n={19} kicker="Day to day" title="Living with a heat pump">
        <p>
          Heat pumps work best running steadily at a lower temperature, rather than blasting heat in the morning and evening like a boiler. Radiators feel
          warm rather than hot. Many people leave the heating on low all day and set the hot water to heat once or twice a day.
        </p>
        <p>
          Servicing is recommended once a year, as with a boiler. Both systems typically last 15 years or more. If you are planning a move, our{" "}
          <a href="/uk/property/moving-house-budget">moving house budget</a> helps you plan the costs.
        </p>
      </GuideSection>

      <GuideSection id="steps" n={20} kicker="Next steps" title="Next steps">
        <ul>
          <li><strong>Find your gas use</strong> from your annual statement and enter it.</li>
          <li><strong>Get quotes</strong> from at least two or three MCS-certified installers, with a heat loss survey.</li>
          <li><strong>Ask for the expected SCOP</strong> and flow temperature in writing.</li>
          <li><strong>Check the grant:</strong> the installer applies for the Boiler Upgrade Scheme.</li>
          <li><strong>Compare tariffs</strong> for heat pump owners before switching.</li>
          <li><strong>Plan the timing:</strong> 0% VAT runs to 31 March 2027.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "£7,500", label: "Boiler Upgrade Scheme grant, air or ground source" },
            { value: "£12,908", label: "Median air source heat pump cost, April to June 2026" },
            { value: "2.8", label: "Median measured efficiency (SCOP) in UK homes" },
            { value: "2.43", label: "SCOP where a heat pump matches gas at the January 2027 cap" },
            { value: "£108", label: "Gas standing charge a year, saved if you cap the gas" },
            { value: "1.3 tonnes", label: "CO2e saved a year, typical house" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

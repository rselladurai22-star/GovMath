import { Bars, Callout, CompareCards, DataTable, Guide, GuideSection, KeyStats, Timeline, WorkedExample, type Source, type TocItem } from "@/components/guide/Guide";

/** Solar panels: the full guide. Pure server component. Figures from src/lib/energy/home-upgrades.ts. */

const kwhFmt = (n: number) => `${n.toLocaleString("en-GB")} kWh`;

const TOC: TocItem[] = [
  { id: "basics", title: "How solar panels save money" },
  { id: "size", title: "System size: kWp and panels" },
  { id: "sun", title: "How much sun your region gets" },
  { id: "roof", title: "Which way your roof faces" },
  { id: "shade", title: "Shade" },
  { id: "self-use", title: "Using the power at home" },
  { id: "seg", title: "The Smart Export Guarantee" },
  { id: "worked", title: "A worked example" },
  { id: "regions", title: "Payback across the UK" },
  { id: "cost", title: "What panels cost" },
  { id: "vat", title: "0% VAT until March 2027" },
  { id: "battery", title: "Is a battery worth it?" },
  { id: "tariffs", title: "Smart tariffs and electric cars" },
  { id: "ageing", title: "Panel ageing and the 25-year view" },
  { id: "prices", title: "If electricity prices change" },
  { id: "carbon", title: "Carbon savings" },
  { id: "rules", title: "Planning permission and MCS" },
  { id: "upkeep", title: "Upkeep, inverters and insurance" },
  { id: "moving", title: "Selling or moving home" },
  { id: "quotes", title: "Getting good quotes" },
  { id: "key-numbers", title: "Key numbers" },
];

const SOURCES: Source[] = [
  { label: "European Commission JRC: PVGIS solar output tool", href: "https://re.jrc.ec.europa.eu/pvg_tools/en/" },
  { label: "DESNZ: Solar PV cost data", href: "https://www.gov.uk/government/statistics/solar-pv-cost-data" },
  { label: "Ofgem: Smart Export Guarantee annual report, April 2024 to March 2025", href: "https://www.ofgem.gov.uk/transparency-document/smart-export-guarantee-annual-report-april-2024-march-2025" },
  { label: "Ofgem: About the Smart Export Guarantee", href: "https://www.ofgem.gov.uk/environmental-and-social-schemes/smart-export-guarantee-seg" },
  { label: "Ofgem: energy price cap unit rates and standing charges", href: "https://www.ofgem.gov.uk/your-energy-supply/your-energy-bill/energy-price-cap-unit-rates-and-standing-charges" },
  { label: "HMRC: VAT on energy-saving materials and heating equipment (Notice 708/6)", href: "https://www.gov.uk/guidance/vat-on-energy-saving-materials-and-heating-equipment-notice-7086" },
  { label: "DESNZ: Greenhouse gas reporting conversion factors 2026", href: "https://www.gov.uk/government/publications/greenhouse-gas-reporting-conversion-factors-2026" },
  { label: "GOV.UK: Planning permission for solar panels (Planning Portal)", href: "https://www.planningportal.co.uk/permission/common-projects/solar-panels/planning-permission" },
];

export default function SolarGuide() {
  return (
    <Guide
      kicker="The solar panel guide"
      title="What solar panels could save you"
      intro={
        <>
          Solar panels pay for themselves in two ways: the electricity you use from them is electricity you do not buy, and the rest can be sold to a
          supplier. This guide explains how much a home system makes in each part of the UK, what it costs, how long it takes to pay back and what changes the answer.
        </>
      }
      meta={["October 2026", "12 min read", "Reviewed October 2026"]}
      toc={TOC}
      sources={SOURCES}
    >
      <GuideSection id="basics" n={1} kicker="The basics" title="How solar panels save money">
        <p>
          Panels on your roof turn daylight into electricity. An inverter changes it into the kind your home uses. Whatever your home needs at that moment
          comes from the panels first. Anything left over flows out to the grid.
        </p>
        <p>The money comes from two places:</p>
        <ul>
          <li>
            <strong>The bill saving.</strong> Every unit (kWh) you use from the panels is a unit you do not buy. At the October to December 2026 price cap,
            that is worth 26.32p a unit.
          </li>
          <li>
            <strong>The export income.</strong> Units you send to the grid earn money under the Smart Export Guarantee (SEG). The rate depends on your
            tariff and is usually much lower than what you pay to buy electricity.
          </li>
        </ul>
        <p>
          Because a unit used at home is worth about twice as much as a unit exported, the share you use yourself matters almost as much as the size of
          the system. The calculator lets you set that share.
        </p>
      </GuideSection>

      <GuideSection id="size" n={2} kicker="Size" title="System size: kWp and panels">
        <p>
          Systems are sized in <strong>kilowatts peak (kWp)</strong>: the output in ideal test conditions. A 4 kWp system made of 430-watt panels has 10
          panels (4,000 ÷ 430, rounded up). Most new panels are rated about 400 to 450 watts.
        </p>
        <p>
          Real output is always below the peak figure, because the sun is rarely at full strength. What matters is how many kWh the system makes over a
          year. In the UK, each kWp makes roughly 800 to 1,150 kWh a year, depending on where you live and the roof.
        </p>
        <p>
          The size you can fit depends on the roof. A typical three-bedroom house has room for about 8 to 12 panels on one slope. If you only know how many
          panels fit, pick &ldquo;Panels&rdquo; in the calculator.
        </p>
      </GuideSection>

      <GuideSection id="sun" n={3} kicker="Location" title="How much sun your region gets">
        <p>
          We use the European Commission&rsquo;s PVGIS tool, which models solar output from satellite weather data. For each region, it gives the yearly
          output of 1 kWp facing south at a 35° tilt, allowing 14% for losses in wiring, the inverter and dirt.
        </p>
        <Bars
          items={[
            { label: "South East England (Brighton)", value: 1156 },
            { label: "South West England (Exeter)", value: 1052 },
            { label: "South Wales (Cardiff)", value: 1042 },
            { label: "East of England (Norwich)", value: 1030 },
            { label: "London", value: 1019 },
            { label: "Midlands (Birmingham)", value: 968 },
            { label: "North East England (Newcastle)", value: 949 },
            { label: "Northern Ireland (Belfast)", value: 919 },
            { label: "Southern Scotland (Edinburgh)", value: 904 },
            { label: "North West England (Manchester)", value: 886 },
            { label: "Highlands (Inverness)", value: 811 },
          ]}
          format={kwhFmt}
        />
        <p>
          The sunniest south coast makes over 40% more than the Highlands. Even so, panels in Scotland can still pay back: they simply take a little longer.
        </p>
      </GuideSection>

      <GuideSection id="roof" n={4} kicker="Orientation" title="Which way your roof faces">
        <p>
          South-facing roofs make the most. Using the PVGIS figures for Birmingham, this is how other directions compare with a south roof at 35°:
        </p>
        <DataTable
          caption="Output against a south-facing roof"
          head={["Roof faces", "Share of output", "4 kWp, Midlands, a year"]}
          numeric={[1, 2]}
          rows={[
            ["South", "100%", "3,872 kWh"],
            ["South-east or south-west", "93%", "3,612 kWh"],
            ["East or west", "78%", "3,024 kWh"],
            ["Panels laid flat", "83%", "3,220 kWh"],
            ["North-east or north-west", "61%", "2,376 kWh"],
            ["North", "54%", "2,096 kWh"],
          ]}
        />
        <p>
          East and west roofs lose about a fifth of the output, but they spread it across the morning and evening, when many homes use more power. That
          can raise the share you use yourself. Some homes put panels on both an east and a west slope for that reason.
        </p>
      </GuideSection>

      <GuideSection id="shade" n={5} kicker="Shade" title="Shade">
        <p>
          Shade costs more than you might expect. Panels are wired in strings, and on older systems a shadow on one panel can pull down the whole string.
          Modern systems often use optimisers or microinverters to limit this.
        </p>
        <p>
          The calculator takes off 10% for some shade (a chimney or a tree for part of the day) and 25% for heavy shade. With some shade, the 4 kWp example
          makes 3,485 kWh instead of 3,872, and payback moves from 9.2 to 10.3 years. With heavy shade it makes 2,904 kWh and takes 12.4 years. An installer
          should check shade properly during the survey.
        </p>
      </GuideSection>

      <GuideSection id="self-use" n={6} kicker="Self-use" title="Using the power at home">
        <p>
          The share of output you use at home is the biggest unknown. It depends on who is in during the day, what runs then and whether you have a battery.
          Without a battery, about a third to a half is common. We start at 40%, and 70% with a battery.
        </p>
        <p>For the 4 kWp example in the Midlands (2,500 kWh used a year, SEG at 12.9p):</p>
        <DataTable
          caption="How the share used at home changes the first year"
          head={["Used at home", "Bill saving", "Export income", "Total", "Payback"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["20%", "£204", "£400", "£603", "10.8 years"],
            ["40%", "£408", "£300", "£707", "9.2 years"],
            ["60%", "£611", "£200", "£811", "8.0 years"],
            ["70% (all your use)", "£658", "£177", "£835", "7.7 years"],
          ]}
        />
        <p>
          At 70% the panels would cover everything this home uses, so the calculator caps the saving at your own use: you cannot save more than you would
          have bought. Ways to use more yourself include running the washing machine and dishwasher in the day, heating water with a solar diverter, and
          charging an electric car at home. Our <a href="/uk/property/appliance-running-cost">appliance running cost calculator</a> shows what each appliance uses.
        </p>
      </GuideSection>

      <GuideSection id="seg" n={7} kicker="Export" title="The Smart Export Guarantee">
        <p>
          The Smart Export Guarantee requires larger suppliers to offer a tariff that pays for electricity you export. Suppliers set their own rates; the
          only rule is that the rate must be above zero. You do not have to use your own supplier.
        </p>
        <p>
          Ofgem&rsquo;s report for April 2024 to March 2025 shows £56.97 million paid for 443.1 GWh exported: <strong>about 12.9p a unit</strong> on average.
          Flat tariffs ranged from about 1p to 15p, with higher rates on some time-of-use deals.
        </p>
        <CompareCards
          columns={[
            { name: "SEG at 4p", rows: [{ label: "Export income", value: "£93" }, { label: "First year", value: "£501" }, { label: "Payback", value: "13.1 years" }] },
            { name: "SEG at 12.9p", rows: [{ label: "Export income", value: "£300" }, { label: "First year", value: "£707" }, { label: "Payback", value: "9.2 years" }] },
            { name: "SEG at 15p", rows: [{ label: "Export income", value: "£348" }, { label: "First year", value: "£756" }, { label: "Payback", value: "8.6 years" }] },
          ]}
        />
        <p>Shopping around for the export tariff is one of the easiest ways to shorten payback.</p>
      </GuideSection>

      <GuideSection id="worked" n={8} kicker="Example" title="A worked example">
        <p>A 4 kWp system on a south-facing roof in Birmingham, no shade, no battery, in a home using 2,500 kWh a year.</p>
        <WorkedExample
          title="4 kWp in the Midlands, October 2026 prices"
          steps={[
            { label: "Yearly output", note: "4 kWp × 968 kWh", value: "3,872 kWh" },
            { label: "Used at home", note: "40% of output", value: "1,549 kWh" },
            { label: "Exported", note: "the rest", value: "2,323 kWh" },
            { label: "Bill saving", note: "1,549 × 26.32p", value: "£408" },
            { label: "Export income", note: "2,323 × 12.9p", value: "£300" },
            { label: "Cost", note: "4 kWp × £1,595 median", value: "£6,380" },
          ]}
          total={{ label: "Payback", value: "9.2 years" }}
        />
        <p>
          Over 25 years, allowing for 0.5% less output each year and today&rsquo;s prices, the panels bring in about £16,662, or £10,282 more than they cost.
          They cover about 62% of the electricity this home uses.
        </p>
      </GuideSection>

      <GuideSection id="regions" n={9} kicker="Across the UK" title="Payback across the UK">
        <p>The same 4 kWp system, cost and use, in each region:</p>
        <DataTable
          caption="4 kWp facing south, 40% used at home, £6,380"
          head={["Region", "Output a year", "First year", "Payback", "25-year return"]}
          numeric={[1, 2, 3, 4]}
          rows={[
            ["South East England", "4,624 kWh", "£845", "7.7 years", "£13,518"],
            ["South West England", "4,208 kWh", "£769", "8.5 years", "£11,728"],
            ["South Wales", "4,168 kWh", "£761", "8.5 years", "£11,556"],
            ["East of England", "4,120 kWh", "£753", "8.6 years", "£11,349"],
            ["London", "4,076 kWh", "£745", "8.7 years", "£11,160"],
            ["Midlands", "3,872 kWh", "£707", "9.2 years", "£10,282"],
            ["Yorkshire and the Humber", "3,808 kWh", "£696", "9.4 years", "£10,006"],
            ["North East England", "3,796 kWh", "£693", "9.4 years", "£9,955"],
            ["Northern Ireland", "3,676 kWh", "£672", "9.7 years", "£9,438"],
            ["Southern Scotland", "3,616 kWh", "£661", "9.9 years", "£9,180"],
            ["North West England", "3,544 kWh", "£647", "10.1 years", "£8,870"],
            ["Highlands", "3,244 kWh", "£593", "11.0 years", "£7,579"],
          ]}
        />
        <p>
          Northern Ireland has its own electricity market and prices, and no price cap, so enter your own unit rate there. The SEG does not apply in
          Northern Ireland either: ask your supplier what it pays for exports.
        </p>
      </GuideSection>

      <GuideSection id="cost" n={10} kicker="Cost" title="What panels cost">
        <p>
          The government publishes the cost of every system registered with MCS. For April 2025 to March 2026, the median cost was{" "}
          <strong>£1,595 per kW</strong> for systems up to 4 kW and <strong>£1,546 per kW</strong> for 4 to 10 kW. Costs fell again in real terms, and a record
          264,742 installations were counted.
        </p>
        <DataTable
          caption="Typical cost at the 2025/26 median"
          head={["System", "About", "Typical cost"]}
          numeric={[2]}
          rows={[
            ["3 kWp", "7 panels", "£4,785"],
            ["4 kWp", "10 panels", "£6,380"],
            ["5 kWp", "12 panels", "£7,729"],
            ["6 kWp", "14 panels", "£9,275"],
          ]}
        />
        <p>
          Real quotes vary with scaffolding, roof type, the inverter, bird protection and monitoring. Enter yours under More options for an exact payback.
        </p>
      </GuideSection>

      <GuideSection id="vat" n={11} kicker="Tax" title="0% VAT until March 2027">
        <p>
          Installing solar panels and batteries in homes in Great Britain is zero-rated for VAT until <strong>31 March 2027</strong>. From 1 April 2027, the rate
          is due to return to the reduced rate of 5%. On a £6,380 system that would add about £319.
        </p>
        <Callout title="Electricity VAT is 0% too, for now">
          Household electricity also carries no VAT from 1 October 2026 to 31 March 2027. That lowers the unit rate, which slightly lowers the value of each
          unit your panels save. If VAT returns, each saved unit is worth about 5% more.
        </Callout>
      </GuideSection>

      <GuideSection id="battery" n={12} kicker="Storage" title="Is a battery worth it?">
        <p>
          A battery stores spare daytime output for the evening. In the example, raising the share used at home from 40% to 70% adds about{" "}
          <strong>£128 a year</strong>, because each stored unit is worth 26.32p used rather than 12.9p exported.
        </p>
        <p>
          That means a battery costing more than about £1,280 would take over 10 years to repay itself on solar alone. Batteries become better value when you
          also charge them from the grid at a cheap overnight rate and use that power at peak times. Put the battery&rsquo;s cost under More options to see
          the combined payback.
        </p>
      </GuideSection>

      <GuideSection id="tariffs" n={13} kicker="Tariffs" title="Smart tariffs and electric cars">
        <p>
          Some suppliers offer higher export rates to customers who also buy from them, or rates that change with the time of day. Read the conditions:
          some need a smart meter, a battery or a particular import tariff.
        </p>
        <p>
          An electric car charged at home in the day soaks up a lot of solar output. If yours is parked at home on sunny days, raise the share used at home.
          See what charging costs in our <a href="/uk/vehicles/petrol-vs-ev-cost">petrol vs electric car calculator</a>.
        </p>
      </GuideSection>

      <GuideSection id="ageing" n={14} kicker="Lifespan" title="Panel ageing and the 25-year view">
        <p>
          Panels slowly lose output. Warranties often promise about 0.4% to 0.55% a year. We assume 0.5%, so the example system makes 3,872 kWh in year 1 and
          about 3,433 kWh in year 25.
        </p>
        <Timeline
          items={[
            { when: "Year 1", what: "Installed", detail: "£6,380 spent; £707 back in the first year." },
            { when: "Year 9", what: "Payback", detail: "Savings and income pass the cost after about 9.2 years." },
            { when: "Year 10", what: "Ahead", detail: "About £536 ahead." },
            { when: "Year 25", what: "End of the usual warranty", detail: "About £10,282 ahead, at today's prices." },
          ]}
        />
        <p>Many panels keep working well beyond 25 years, so the real return can be higher.</p>
      </GuideSection>

      <GuideSection id="prices" n={15} kicker="Prices" title="If electricity prices change">
        <p>
          Nobody knows what electricity will cost in 10 or 20 years. The calculator starts with today&rsquo;s price cap and lets you add a yearly change. If
          prices and export rates both rose 3% a year, the example would pay back in 8.2 years instead of 9.2, and the 25-year return would be £17,734
          instead of £10,282.
        </p>
        <p>
          Ofgem announces the next cap, for January to March 2027, on 25 November 2026. Our <a href="/uk/property/energy-bill-calculator">energy bill calculator</a>{" "}
          shows your whole bill at the cap.
        </p>
      </GuideSection>

      <GuideSection id="carbon" n={16} kicker="Carbon" title="Carbon savings">
        <p>
          Each unit of grid electricity in 2026 comes with about 0.144 kg of CO2e, counting generation and losses in the wires (DESNZ conversion factors). The
          example system&rsquo;s 3,872 kWh a year saves about <strong>557 kg of CO2e</strong> a year. As the grid gets cleaner, the carbon saved per unit falls.
        </p>
        <p>
          If you also want to cut gas, our <a href="/uk/property/heat-pump-vs-boiler">heat pump vs gas boiler calculator</a> compares the running costs and
          carbon of the two.
        </p>
      </GuideSection>

      <GuideSection id="rules" n={17} kicker="Rules" title="Planning permission and MCS">
        <p>
          Most roof panels on houses are permitted development, so you do not need planning permission, as long as they do not stick out more than 0.2 metres
          and do not sit higher than the roof. Listed buildings, flats and homes in conservation areas or World Heritage Sites have extra rules: check with your council.
        </p>
        <p>
          Use an installer certified by the Microgeneration Certification Scheme (MCS). You need the MCS certificate to get paid under the SEG, and it
          shows the system was designed and fitted to the standard. Your network operator must also be told about the connection; the installer usually does this.
        </p>
      </GuideSection>

      <GuideSection id="upkeep" n={18} kicker="Upkeep" title="Upkeep, inverters and insurance">
        <p>
          Panels need little upkeep. Rain usually keeps them clean enough. The inverter is the part most likely to need replacing during the panels&rsquo; life,
          often once in 25 years. The calculator does not include that cost, so leave some room for it.
        </p>
        <p>Tell your home insurer about the panels. Most add them at no or little extra cost.</p>
      </GuideSection>

      <GuideSection id="moving" n={19} kicker="Moving" title="Selling or moving home">
        <p>
          Owned panels usually go with the house. Buyers will ask for the MCS certificate, the warranty and the SEG details. Panels on a lease or
          &ldquo;rent-a-roof&rdquo; deal are different: some lenders are wary of these, so read the lease before you agree.
        </p>
        <p>
          If you are paying for panels from savings, compare the return with leaving the money in a savings account using our{" "}
          <a href="/uk/investing/savings-interest">savings interest calculator</a>. If you add the cost to your mortgage, our{" "}
          <a href="/uk/property/remortgage">remortgage calculator</a> shows the cost of borrowing more.
        </p>
      </GuideSection>

      <GuideSection id="quotes" n={20} kicker="Next steps" title="Getting good quotes">
        <ul>
          <li><strong>Get at least three quotes</strong> from MCS-certified installers.</li>
          <li><strong>Check the expected output</strong> in kWh a year. MCS installers must give a performance estimate.</li>
          <li><strong>Compare like with like:</strong> panel and inverter make, warranties, scaffolding, bird protection and monitoring.</li>
          <li><strong>Ask about shade</strong> and how the design deals with it.</li>
          <li><strong>Pick an export tariff</strong> before the system goes live.</li>
          <li><strong>Plan the timing:</strong> 0% VAT runs to 31 March 2027.</li>
        </ul>
      </GuideSection>

      <GuideSection id="key-numbers" n={21} kicker="Summary" title="Key numbers">
        <KeyStats
          items={[
            { value: "811–1,156", label: "kWh a year per kWp across UK regions" },
            { value: "£1,595", label: "Median cost per kW, systems up to 4 kW, 2025/26" },
            { value: "12.9p", label: "Average SEG payment per kWh, 2024/25" },
            { value: "26.32p", label: "Electricity unit rate, October to December 2026 cap" },
            { value: "9.2 years", label: "Payback, 4 kWp in the Midlands" },
            { value: "0% VAT", label: "On home solar until 31 March 2027" },
          ]}
        />
      </GuideSection>
    </Guide>
  );
}

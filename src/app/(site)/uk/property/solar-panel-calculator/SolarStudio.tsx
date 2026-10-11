"use client";

import { CAP_OCT_DEC_2026 as CAP, TDCV_2026 } from "@/lib/energy/costs";
import {
  ORIENTATION,
  PANEL_WATTS,
  SEG_AVERAGE_PENCE,
  SELF_USE,
  SHADING,
  SOLAR_DEGRADATION,
  SOLAR_REGIONS,
  solarKwp,
  solarRegion,
  solarStudy,
  solarTypicalCost,
  type Orientation,
  type Shading,
} from "@/lib/energy/home-upgrades";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, gbpShort, whole } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const REGION_IDS = SOLAR_REGIONS.map((r) => r.id);
const ORIENTS = Object.keys(ORIENTATION) as Orientation[];
const SHADES = Object.keys(SHADING) as Shading[];

const SCHEMA = {
  by: oneOf<"kwp" | "panels">("kwp", ["kwp", "panels"]),
  kwp: num(4, 0, 50),
  panels: num(10, 0, 100),
  region: oneOf<string>("midlands", REGION_IDS),
  facing: oneOf<Orientation>("s", ORIENTS),
  use: num(TDCV_2026.elec.medium, 0, 50_000),
  battery: bool(false),
  costBy: oneOf<"typical" | "quote">("typical", ["typical", "quote"]),
  quote: num(7000, 0, 200_000),
  shade: oneOf<Shading>("none", SHADES),
  self: num(SELF_USE.noBattery, 0, 100),
  rate: num(CAP.elecUnit, 0, 200),
  seg: num(SEG_AVERAGE_PENCE, 0, 100),
  batteryCost: num(0, 0, 100_000),
  panelW: num(PANEL_WATTS, 100, 800),
  degr: num(SOLAR_DEGRADATION, 0, 5),
  rise: num(0, -10, 20),
  years: num(25, 1, 40),
};
const ADVANCED = ["shade", "self", "rate", "seg", "costBy", "quote", "batteryCost", "panelW", "degr", "rise", "years"] as const;

const kwh = (n: number) => `${whole(n)} kWh`;
const yrs = (n: number | null, max: number) => (n === null ? `over ${max} years` : n === 0 ? "0 years" : `${n.toFixed(1)} years`);

export default function SolarStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const region = solarRegion(v.region);
  const kwp = solarKwp({ by: v.by, kwp: v.kwp, panels: v.panels, panelWatts: v.panelW });
  const typical = solarTypicalCost(kwp);
  const panelCost = v.costBy === "quote" ? v.quote : typical;
  const cost = panelCost + (v.battery ? v.batteryCost : 0);
  const years = Math.max(1, Math.round(v.years));
  const r = solarStudy({
    kwp,
    yieldPerKwp: region.yield,
    orientation: v.facing,
    shading: v.shade,
    useKwh: v.use,
    selfUsePct: v.self,
    unitRate: v.rate,
    segRate: v.seg,
    cost,
    years,
    degradation: v.degr,
    priceRise: v.rise,
  });
  const panelsNeeded = v.panelW > 0 ? Math.ceil((kwp * 1000) / v.panelW) : 0;
  const nothing = kwp <= 0 || r.generation <= 0;

  const setBattery = (on: boolean) => {
    st.set("battery", on);
    st.set("self", on ? SELF_USE.battery : SELF_USE.noBattery);
  };

  // Same system without and with a battery, for the comparison card.
  const alt = solarStudy({
    kwp,
    yieldPerKwp: region.yield,
    orientation: v.facing,
    shading: v.shade,
    useKwh: v.use,
    selfUsePct: v.battery ? SELF_USE.noBattery : SELF_USE.battery,
    unitRate: v.rate,
    segRate: v.seg,
    cost: panelCost,
    years,
    degradation: v.degr,
    priceRise: v.rise,
  });
  const batteryGain = v.battery ? r.yearly - alt.yearly : alt.yearly - r.yearly;

  return (
    <Studio
      title="Your solar panels"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my solar savings"
      onReset={st.reset}
      dock={{ label: "A year", value: gbp(r.yearly) }}
      inputs={
        <>
          <InputGroup title="Your solar panels">
            <RadioGroup
              label="System size by"
              value={v.by}
              onChange={st.bind("by")}
              options={[
                { value: "kwp", label: "kWp" },
                { value: "panels", label: "Panels" },
              ]}
              info="Your quote gives the size in kWp (kilowatts peak). If you only know how many panels fit, pick Panels: we use 430 watts a panel, which you can change under More options."
            />
            {v.by === "kwp" ? (
              <StepperField label="System size" value={v.kwp} onChange={st.bind("kwp")} step={0.1} min={0} max={50} unit="kWp" dp={2} info="A typical home system is about 3.5 to 5 kWp, about 8 to 12 panels." />
            ) : (
              <StepperField label="Number of panels" value={v.panels} onChange={st.bind("panels")} step={1} min={0} max={100} unit="panels" dp={0} />
            )}
            <SelectField
              label="Where you live"
              value={v.region}
              onChange={st.bind("region")}
              options={SOLAR_REGIONS.map((x) => ({ value: x.id, label: `${x.name} (${whole(x.yield)} kWh per kWp)` }))}
              info="Yearly output of 1 kWp facing south at 35°, from the European Commission's PVGIS tool for a town in each region. The south of England gets the most sun, the north of Scotland the least."
            />
            <SelectField
              label="Roof faces"
              value={v.facing}
              onChange={st.bind("facing")}
              options={ORIENTS.map((o) => ({ value: o, label: `${ORIENTATION[o].label} (${Math.round(ORIENTATION[o].factor * 100)}%)` }))}
              info="The share of a south-facing roof's output. East and west roofs still make about four fifths as much."
            />
            <StepperField label="Electricity you use a year" value={v.use} onChange={st.bind("use")} step={100} min={0} max={50000} unit="kWh" dp={0} info={`On your annual statement or in your supplier's app. Ofgem's typical figure is ${whole(TDCV_2026.elec.medium)} kWh.`} />
            <Switch label="With a home battery" checked={v.battery} onChange={setBattery} info="A battery stores daytime output for the evening, so more of it is used at home instead of exported. We raise the share used at home from 40% to 70%; change it under More options." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <RadioGroup
              label="Shading"
              value={v.shade}
              onChange={st.bind("shade")}
              optional
              options={SHADES.map((s) => ({ value: s, label: s === "some" ? "Some" : SHADING[s].label }))}
              info="Shade from chimneys, trees or nearby buildings. We take off 10% for some shade and 25% for heavy shade. An MCS installer does a proper shade check."
            />
            <StepperField label="Share of output used at home" value={v.self} onChange={st.bind("self")} step={5} min={0} max={100} unit="%" dp={0} optional info="Who is home in the day matters most. Without a battery, about a third to a half is common; with a battery, more. The rest is exported." />
            <StepperField label="Electricity unit rate" value={v.rate} onChange={st.bind("rate")} step={0.5} min={0} max={200} unit="p/kWh" dp={2} optional info={`What each unit you no longer buy would have cost. The price cap rate for ${CAP.label} is ${CAP.elecUnit}p.`} />
            <StepperField label="Export rate (SEG)" value={v.seg} onChange={st.bind("seg")} step={0.5} min={0} max={100} unit="p/kWh" dp={2} optional info={`What your Smart Export Guarantee tariff pays. Ofgem's figures show about ${SEG_AVERAGE_PENCE}p paid on average per unit in 2024/25; flat tariffs ranged from about 1p to 15p.`} />
            <RadioGroup
              label="Panel cost"
              value={v.costBy}
              onChange={st.bind("costBy")}
              optional
              options={[
                { value: "typical", label: `Typical (${gbp(typical)})` },
                { value: "quote", label: "My quote" },
              ]}
              info="Typical is the government's median installed cost per kW for 2025/26, from the MCS database. Quotes vary with scaffolding, roof type and extras."
            />
            {v.costBy === "quote" && <MoneyField label="Your quote for the panels" value={v.quote} onChange={st.bind("quote")} max={200000} optional />}
            {v.battery && <MoneyField label="Battery cost" value={v.batteryCost} onChange={st.bind("batteryCost")} max={100000} optional info="From your quote. It is added to the cost before working out payback." />}
            <StepperField label="Watts per panel" value={v.panelW} onChange={st.bind("panelW")} step={5} min={100} max={800} unit="W" dp={0} optional />
            <StepperField label="Yearly loss of output" value={v.degr} onChange={st.bind("degr")} step={0.1} min={0} max={5} unit="%" dp={1} optional info="Panels slowly make less. Warranties often promise about 0.4% to 0.55% a year." />
            <StepperField label="Yearly change in prices" value={v.rise} onChange={st.bind("rise")} step={0.5} min={-10} max={20} unit="%" dp={1} optional info="Applied to the unit rate and the export rate each year. 0% keeps today's prices." />
            <StepperField label="Years to count" value={v.years} onChange={st.bind("years")} step={1} min={1} max={40} unit="years" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Saving and export income, first year"
        value={gbp(r.yearly)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          nothing ? (
            <>Enter a system size above zero to see what the panels could make.</>
          ) : (
            <>
              A {kwp.toFixed(2).replace(/\.?0+$/, "")} kWp system in {region.name} {v.facing === "flat" ? "laid flat" : `facing ${ORIENTATION[v.facing].label.toLowerCase()}`} makes about <b>{kwh(r.generation)}</b> a year. Using{" "}
              {Math.round(r.selfShare * 100)}% at home saves <b>{gbp(r.billSaving)}</b> and exporting the rest earns <b>{gbp(r.exportIncome)}</b>. At {gbp(cost)}, it pays back in{" "}
              <b>{yrs(r.payback, years)}</b>
              {r.payback === null ? " (it does not pay back in that time)" : ""}.
            </>
          )
        }
        badges={[`${kwh(r.generation)} a year`, `Payback ${yrs(r.payback, years)}`, `${whole(r.co2)} kg CO2e saved`]}
      />

      <ResultCard title="Where the money comes from" sub="First year, at today's prices.">
        <SplitBar
          segments={[
            { label: "Bill saving", value: r.billSaving, display: gbp(r.billSaving), color: "#2a78d6" },
            { label: "Export income", value: r.exportIncome, display: gbp(r.exportIncome), color: "#1baf7a" },
          ]}
        />
      </ResultCard>

      <Facts
        items={[
          { label: "Yearly generation", value: kwh(r.generation), note: `${whole(region.yield)} kWh per kWp before roof and shade` },
          { label: "Used at home", value: kwh(r.selfUsed), note: `${Math.round(r.coverage * 100)}% of your use` },
          { label: "Exported", value: kwh(r.exported) },
          { label: "Payback", value: yrs(r.payback, years), tone: r.payback === null ? "warn" : "good" },
          { label: `${years}-year return`, value: gbp(r.netReturn), note: `${gbp(r.totalBenefit)} in, ${gbp(cost)} cost`, tone: r.netReturn >= 0 ? "good" : "bad" },
          { label: "Carbon saved", value: `${whole(r.co2)} kg`, note: "CO2e in the first year" },
        ]}
      />

      <Assumptions
        items={[
          { label: "System", value: `${kwp.toFixed(2)} kWp${v.by === "kwp" ? `, about ${panelsNeeded} panels of ${v.panelW}W` : ` (${v.panels} × ${v.panelW}W)`}` },
          { label: "Output", value: `${whole(region.yield)} kWh per kWp (${region.place}) × ${Math.round(ORIENTATION[v.facing].factor * 100)}% roof × ${Math.round(SHADING[v.shade].factor * 100)}% shade` },
          { label: "Used at home", value: `${v.self}% of output, capped at your use` },
          { label: "Prices", value: `${v.rate}p a unit, ${v.seg}p export, ${v.rise}% a year change` },
          { label: "Cost", value: `${gbp(cost)}${v.costBy === "typical" ? " (typical median)" : " (your quote)"}${v.battery ? ", battery included" : ""}` },
          { label: "Panel ageing", value: `${v.degr}% less output each year` },
        ]}
        note="Estimates from regional sunshine data. An MCS-certified installer's survey of your roof gives a better figure. Maintenance and an inverter replacement (often needed once in 25 years) are not included."
      />

      <ResultCard title={`Running total over ${years} years`} sub="Savings and export income less the cost. It crosses zero at payback.">
        <AreaChart
          series={[
            { key: "in", label: "Saving and income to date", color: "#2a78d6", values: [0, ...r.years.map((y) => y.net + cost)], fill: true },
            { key: "cost", label: "Cost", color: "#eb6834", values: Array(years + 1).fill(cost), dashed: true },
          ]}
          xLabel={(i) => `Year ${i}`}
          yFormat={gbpShort}
          ariaLabel="Cumulative savings against the cost of the panels"
          readout={(i) => (i === 0 ? <>Installed: {gbp(cost)} spent.</> : <>Year {i}: {gbp(r.years[i - 1].net + cost)} back, {r.years[i - 1].net >= 0 ? `${gbp(r.years[i - 1].net)} ahead` : `${gbp(-r.years[i - 1].net)} still to recover`}.</>)}
        />
      </ResultCard>

      <ResultCard title={v.battery ? "Without a battery" : "With a battery"} sub={`Same panels, ${v.battery ? SELF_USE.noBattery : SELF_USE.battery}% used at home instead of ${v.self}%.`}>
        <Compare
          head={["Option", "A year"]}
          rows={[
            { label: v.battery ? "With your battery" : "Panels only", value: gbp(r.yearly), bar: 1, current: true },
            {
              label: v.battery ? "Panels only" : "Adding a battery",
              value: gbp(alt.yearly),
              bar: r.yearly > 0 ? Math.min(1, alt.yearly / Math.max(r.yearly, alt.yearly)) : 0,
              delta: alt.yearly >= r.yearly ? `${gbp(alt.yearly - r.yearly)} more` : `${gbp(r.yearly - alt.yearly)} less`,
              deltaTone: alt.yearly >= r.yearly ? "up" : "down",
            },
          ]}
        />
        <p className="footnote">
          A battery adds about {gbp(Math.max(0, batteryGain))} a year here, so a battery costing more than about {gbp(Math.max(0, batteryGain) * 10)} would take over 10 years to repay itself, before any
          extra from a cheap overnight tariff.
        </p>
      </ResultCard>

      <ResultCard title="Year by year" sub="Output falls slowly as panels age.">
        <DataTable
          summary="Show the yearly table"
          columns={["Year", "Generation", "Used at home", "Saving", "Export", "Net to date"]}
          rows={r.years.map((y) => [y.year, kwh(y.generation), kwh(y.selfUsed), gbp(y.saving), gbp(y.exportIncome), gbp(y.net)])}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you get quotes.">
        {v.battery && v.batteryCost <= 0 && (
          <Callout tone="warn" title="Add the battery cost">
            The battery&rsquo;s cost is not counted yet. Enter it under More options for a true payback.
          </Callout>
        )}
        {(v.facing === "n" || v.facing === "ne-nw") && (
          <Callout tone="warn" title="A north-facing roof">
            North-facing panels make about half what south-facing ones do, so payback is much longer. A different roof slope, if you have one, may be better.
          </Callout>
        )}
        {r.selfUsed >= v.use && v.use > 0 && (
          <Callout title="More than you use">
            The panels cover all the electricity you use at the share you set, so any extra output is exported at the SEG rate.
          </Callout>
        )}
        <Callout title="0% VAT until 31 March 2027">
          Solar panels and batteries installed in homes in Great Britain carry no VAT until 31 March 2027. From 1 April 2027 the rate is due to return to 5%.
        </Callout>
        <Callout title="Export payments need MCS">
          To be paid under the Smart Export Guarantee, the panels must be MCS certified (or equivalent) and you need a smart meter that records exports.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Unit rate from the Ofgem price cap, {CAP.label}. Output from PVGIS 5.3. Costs are the DESNZ 2025/26 median.
      </p>
    </Studio>
  );
}

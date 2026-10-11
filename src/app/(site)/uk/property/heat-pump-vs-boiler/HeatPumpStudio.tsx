"use client";

import { BOILER_EFFICIENCY, CAP_OCT_DEC_2026 as CAP } from "@/lib/energy/costs";
import {
  BOILER_COST_EXAMPLE,
  BUS_GRANT,
  HOUSE_GAS,
  HP_COST_QUARTILES,
  HP_MEDIAN_COST,
  HP_SCOP_DEFAULT,
  heatDemand,
  heatPumpVsBoiler,
  type HouseSize,
} from "@/lib/energy/home-upgrades";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, gbpShort, whole } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SIZES = Object.keys(HOUSE_GAS) as HouseSize[];

const SCHEMA = {
  from: oneOf<"gas" | "size">("size", ["gas", "size"]),
  gas: num(HOUSE_GAS.medium.kwh, 0, 100_000),
  size: oneOf<HouseSize>("medium", SIZES),
  scop: num(HP_SCOP_DEFAULT, 1, 6),
  hpCost: num(HP_MEDIAN_COST, 0, 100_000),
  boilerCost: num(BOILER_COST_EXAMPLE, 0, 50_000),
  grant: bool(true),
  eff: num(Math.round(BOILER_EFFICIENCY * 100), 50, 100),
  gasUnit: num(CAP.gasUnit, 0, 100),
  gasStanding: num(CAP.gasStanding, 0, 200),
  elecUnit: num(CAP.elecUnit, 0, 200),
  keepGas: bool(false),
  years: num(15, 1, 30),
  gasRise: num(0, -10, 20),
  elecRise: num(0, -10, 20),
};
const ADVANCED = ["eff", "gasUnit", "gasStanding", "elecUnit", "keepGas", "years", "gasRise", "elecRise"] as const;

const kwh = (n: number) => `${whole(n)} kWh`;
const kg = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)} tonnes` : `${whole(n)} kg`);

export default function HeatPumpStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const eff = v.eff / 100;
  const gasUse = v.from === "gas" ? v.gas : HOUSE_GAS[v.size].kwh;
  const heat = heatDemand(gasUse, eff);
  const years = Math.max(1, Math.round(v.years));
  const grant = v.grant ? BUS_GRANT : 0;
  const r = heatPumpVsBoiler({
    heatKwh: heat,
    boilerEff: eff,
    scop: v.scop,
    gasUnit: v.gasUnit,
    gasStanding: v.gasStanding,
    elecUnit: v.elecUnit,
    keepGas: v.keepGas,
    boilerCost: v.boilerCost,
    hpCost: v.hpCost,
    grant,
    years,
    gasRise: v.gasRise,
    elecRise: v.elecRise,
  });
  const cheaper = r.saving >= 0;
  const periodGap = r.boilerPeriod - r.heatPumpPeriod;
  const nothing = heat <= 0;
  const payText = r.payback === null ? `not within ${years} years` : r.payback === 0 ? "from day one" : `${r.payback.toFixed(1)} years`;

  return (
    <Studio
      title="Heat pump or gas boiler"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare heat pump and boiler"
      onReset={st.reset}
      dock={{ label: cheaper ? "Heat pump saves" : "Heat pump costs more", value: `${gbp(Math.abs(r.saving))} a year` }}
      inputs={
        <>
          <InputGroup title="Your home">
            <RadioGroup
              label="Heat needed from"
              value={v.from}
              onChange={st.bind("from")}
              options={[
                { value: "size", label: "Size of home" },
                { value: "gas", label: "My gas use" },
              ]}
              info="Your yearly gas use (on your annual statement) gives the best answer. If you do not know it, pick a home size: we use Ofgem's low, medium and high typical gas use."
            />
            {v.from === "gas" ? (
              <StepperField label="Gas you use a year" value={v.gas} onChange={st.bind("gas")} step={250} min={0} max={100000} unit="kWh" dp={0} info="Include heating and hot water. Cooking uses little gas, so it makes little difference." />
            ) : (
              <SelectField
                label="Home"
                value={v.size}
                onChange={st.bind("size")}
                options={SIZES.map((s) => ({ value: s, label: `${HOUSE_GAS[s].label}, ${whole(HOUSE_GAS[s].kwh)} kWh gas` }))}
              />
            )}
            <StepperField
              label="Heat pump efficiency (SCOP)"
              value={v.scop}
              onChange={st.bind("scop")}
              step={0.1}
              min={1}
              max={6}
              unit=""
              dp={1}
              info="Units of heat for each unit of electricity, over a year. Air source heat pumps measured in UK homes had a median of about 2.8. A well-designed system with low flow temperatures can reach 3.5 or more."
            />
            <MoneyField label="Heat pump cost before grant" value={v.hpCost} onChange={st.bind("hpCost")} max={100000} info={`Median for an air source heat pump under the Boiler Upgrade Scheme, April to June 2026: ${gbp(HP_MEDIAN_COST)}. Half cost between ${gbp(HP_COST_QUARTILES.lower)} and ${gbp(HP_COST_QUARTILES.upper)}.`} />
            <MoneyField label="New gas boiler cost" value={v.boilerCost} onChange={st.bind("boilerCost")} max={50000} info="What a replacement boiler would cost you. £3,000 is an example: use your own quote. Set it to 0 if your boiler does not need replacing yet." />
            <Switch label={`Boiler Upgrade Scheme grant (${gbp(BUS_GRANT)})`} checked={v.grant} onChange={st.bind("grant")} info="England and Wales. Your installer applies for it and takes it off the price. Scotland has its own Home Energy Scotland grant and loan; Northern Ireland has no equivalent." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Gas boiler efficiency" value={v.eff} onChange={st.bind("eff")} step={1} min={50} max={100} unit="%" dp={0} optional info="New boilers in England must be rated at least 92%. Real homes often do a little worse; we assume 90%." />
            <StepperField label="Gas unit rate" value={v.gasUnit} onChange={st.bind("gasUnit")} step={0.1} min={0} max={100} unit="p/kWh" dp={2} optional info={`Price cap, ${CAP.label}: ${CAP.gasUnit}p, including 5% VAT.`} />
            <StepperField label="Gas standing charge" value={v.gasStanding} onChange={st.bind("gasStanding")} step={0.5} min={0} max={200} unit="p/day" dp={2} optional info={`Price cap: ${CAP.gasStanding}p a day. You stop paying it if you have the gas supply capped.`} />
            <StepperField label="Electricity unit rate" value={v.elecUnit} onChange={st.bind("elecUnit")} step={0.5} min={0} max={200} unit="p/kWh" dp={2} optional info={`Price cap: ${CAP.elecUnit}p, with no VAT until 31 March 2027. Heat pump and time-of-use tariffs can be cheaper.`} />
            <Switch label="Keep gas for cooking" checked={v.keepGas} onChange={st.bind("keepGas")} optional info="If you keep a gas hob, you keep paying the gas standing charge." />
            <StepperField label="Years to compare" value={v.years} onChange={st.bind("years")} step={1} min={1} max={30} unit="years" dp={0} optional info="Gas boilers and heat pumps both often last about 15 years or more." />
            <StepperField label="Yearly change in gas prices" value={v.gasRise} onChange={st.bind("gasRise")} step={0.5} min={-10} max={20} unit="%" dp={1} optional />
            <StepperField label="Yearly change in electricity prices" value={v.elecRise} onChange={st.bind("elecRise")} step={0.5} min={-10} max={20} unit="%" dp={1} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Heat pump against gas boiler, a year"
        value={gbp(Math.abs(r.saving))}
        unit={cheaper ? "a year cheaper" : "a year dearer"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          nothing ? (
            <>Enter your gas use or pick a home size to compare.</>
          ) : (
            <>
              Your home needs about <b>{kwh(r.heatKwh)}</b> of heat a year. A gas boiler would cost <b>{gbp(r.boiler.total)}</b> a year including the standing
              charge; a heat pump with a SCOP of {v.scop} would cost <b>{gbp(r.heatPump.total)}</b>. After{grant > 0 ? " the grant" : ""}, the heat pump costs{" "}
              {r.extraUpfront >= 0 ? <b>{gbp(r.extraUpfront)} more</b> : <b>{gbp(-r.extraUpfront)} less</b>} upfront, and pays back <b>{payText}</b>.
            </>
          )
        }
        badges={[`Payback ${payText}`, `${years}-year gap ${periodGap >= 0 ? `${gbp(periodGap)} to heat pump` : `${gbp(-periodGap)} to boiler`}`, `${kg(r.co2Saving)} CO2e less a year`]}
      />

      <ResultCard title="Running cost a year" sub="Heating and hot water. The electricity standing charge is paid either way, so it is left out.">
        <SplitBar
          segments={[
            { label: "Gas boiler", value: r.boiler.total, display: gbp(r.boiler.total), color: "#eb6834" },
            { label: "Heat pump", value: r.heatPump.total, display: gbp(r.heatPump.total), color: "#2a78d6" },
          ]}
        />
      </ResultCard>

      <Facts
        items={[
          { label: "Gas boiler a year", value: gbp(r.boiler.total), note: `${gbp(r.boiler.fuel)} gas + ${gbp(r.boiler.standing)} standing charge` },
          { label: "Heat pump a year", value: gbp(r.heatPump.total), note: `${kwh(r.hpKwh)} of electricity${v.keepGas ? ", gas standing charge kept" : ""}` },
          { label: "Upfront: heat pump", value: gbp(r.heatPump.upfront), note: grant > 0 ? `after the ${gbp(grant)} grant` : "no grant" },
          { label: "Upfront: boiler", value: gbp(r.boiler.upfront) },
          { label: "Payback", value: payText, tone: r.payback === null ? "warn" : "good" },
          { label: "Carbon a year", value: `${kg(r.boiler.co2)} vs ${kg(r.heatPump.co2)}`, note: "gas boiler vs heat pump, CO2e" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Heat needed", value: `${kwh(gasUse)} gas × ${v.eff}% efficiency = ${kwh(r.heatKwh)}` },
          { label: "Heat pump", value: `SCOP ${v.scop}: ${kwh(r.hpKwh)} of electricity` },
          { label: "Prices", value: `Gas ${v.gasUnit}p + ${v.gasStanding}p a day; electricity ${v.elecUnit}p` },
          { label: "Price change", value: `Gas ${v.gasRise}% a year, electricity ${v.elecRise}% a year` },
          { label: "Gas supply", value: v.keepGas ? "Kept for cooking" : "Capped: no gas standing charge" },
          { label: "Not included", value: "Servicing, radiator or cylinder work beyond the quote" },
        ]}
        note="Estimates. A heat loss survey by an MCS-certified installer gives your home's real heat demand and the heat pump's expected efficiency."
      />

      <ResultCard title={`Total cost over ${years} years`} sub="Upfront cost plus running costs.">
        <Compare
          head={["Option", `${years} years`]}
          rows={[
            { label: "Gas boiler", value: gbp(r.boilerPeriod), bar: Math.min(1, r.boilerPeriod / Math.max(1, r.boilerPeriod, r.heatPumpPeriod)), current: periodGap < 0 },
            {
              label: "Heat pump",
              value: gbp(r.heatPumpPeriod),
              bar: Math.min(1, r.heatPumpPeriod / Math.max(1, r.boilerPeriod, r.heatPumpPeriod)),
              delta: periodGap >= 0 ? `${gbp(periodGap)} less` : `${gbp(-periodGap)} more`,
              deltaTone: periodGap >= 0 ? "down" : "up",
              current: periodGap >= 0,
            },
          ]}
        />
        <AreaChart
          series={[
            { key: "boiler", label: "Gas boiler", color: "#eb6834", values: [r.boiler.upfront, ...r.years.map((y) => y.boilerTotal)] },
            { key: "hp", label: "Heat pump", color: "#2a78d6", values: [r.heatPump.upfront, ...r.years.map((y) => y.heatPumpTotal)], fill: true },
          ]}
          xLabel={(i) => `Year ${i}`}
          yFormat={gbpShort}
          ariaLabel="Total cost of a gas boiler and a heat pump over time"
          readout={(i) =>
            i === 0 ? (
              <>Installed: boiler {gbp(r.boiler.upfront)}, heat pump {gbp(r.heatPump.upfront)}.</>
            ) : (
              <>
                Year {i}: boiler {gbp(r.years[i - 1].boilerTotal)}, heat pump {gbp(r.years[i - 1].heatPumpTotal)}.
              </>
            )
          }
        />
      </ResultCard>

      <ResultCard title="What efficiency does to the answer" sub="Running cost a year at your prices, for different heat pump SCOPs.">
        <DataTable
          summary="Show the SCOP table"
          columns={["SCOP", "Electricity", "Heat pump a year", "Against the boiler"]}
          rows={[2.5, 2.8, 3, 3.5, 4].map((s) => {
            const x = heatPumpVsBoiler({ heatKwh: heat, boilerEff: eff, scop: s, gasUnit: v.gasUnit, gasStanding: v.gasStanding, elecUnit: v.elecUnit, keepGas: v.keepGas, boilerCost: 0, hpCost: 0, grant: 0, years: 1 });
            return [s.toFixed(1), kwh(x.hpKwh), gbp(x.heatPump.total), x.saving >= 0 ? `${gbp(x.saving)} cheaper` : `${gbp(-x.saving)} dearer`];
          })}
        />
        {r.breakEvenScop !== null && (
          <p className="footnote">At these prices, a heat pump matches the boiler&rsquo;s running cost at a SCOP of {r.breakEvenScop.toFixed(2)}. Above that it is cheaper to run.</p>
        )}
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you decide.">
        {!cheaper && !nothing && (
          <Callout tone="warn" title="Dearer to run at these prices">
            Electricity costs about {(v.elecUnit / Math.max(0.01, v.gasUnit)).toFixed(1)} times as much as gas per unit, so the heat pump needs a SCOP above{" "}
            {r.breakEvenScop?.toFixed(2) ?? "its break-even"} to be cheaper to run. A heat pump tariff, a better-designed system or capping the gas supply all help.
          </Callout>
        )}
        {v.keepGas && (
          <Callout title="Capping the gas">
            Keeping gas for cooking costs {gbp(r.boiler.standing)} a year in standing charges alone. Switching to an electric hob removes it.
          </Callout>
        )}
        <Callout title="0% VAT until 31 March 2027">
          Heat pumps installed in homes in Great Britain carry no VAT until 31 March 2027. From 1 April 2027 the rate is due to return to 5%.
        </Callout>
        <Callout title="Off the gas grid?">
          Homes heated by oil or LPG with no mains gas can get an extra £1,500 from the Boiler Upgrade Scheme until March 2027, £9,000 in all.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Prices from the Ofgem price cap, {CAP.label}, Great Britain average for Direct Debit. Costs from the Boiler Upgrade Scheme statistics.
      </p>
    </Studio>
  );
}

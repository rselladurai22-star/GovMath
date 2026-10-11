"use client";

import {
  APPLIANCES,
  BOILER_EFFICIENCY,
  CAP_OCT_DEC_2026 as CAP,
  OFF_PEAK_EXAMPLE,
  TDCV_2026,
  applianceById,
  gasHeatCost,
  runningCost,
  type ApplianceId,
} from "@/lib/energy/costs";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const IDS = APPLIANCES.map((a) => a.id) as ApplianceId[];
type CompareId = ApplianceId | "none" | "gas";
const CMP_IDS = ["none", "gas", ...IDS] as CompareId[];
const KETTLE = applianceById("kettle");

const SCHEMA = {
  app: oneOf<ApplianceId>("kettle", IDS),
  watts: num(KETTLE.watts, 0, 22_000),
  minutes: num(KETTLE.minutes, 0, 1440),
  freq: num(KETTLE.freq, 0, 100),
  per: oneOf<"day" | "week">(KETTLE.per, ["day", "week"]),
  cmp: oneOf<CompareId>("none", CMP_IDS),
  tariff: oneOf<"cap" | "offpeak" | "own">("cap", ["cap", "offpeak", "own"]),
  offpeak: num(OFF_PEAK_EXAMPLE, 0, 100),
  own: num(CAP.elecUnit, 0, 200),
  cycling: num(KETTLE.cycling, 0, 100),
  cmpMinutes: num(0, 0, 1440),
  boiler: num(Math.round(BOILER_EFFICIENCY * 100), 50, 100),
};
const ADVANCED = ["tariff", "offpeak", "own", "cycling", "cmpMinutes", "boiler"] as const;

/** 4p, 12.5p or £1.58. */
function money(n: number): string {
  const v = Number.isFinite(n) ? n : 0;
  if (v < 1) {
    const p = v * 100;
    return `${p < 10 ? p.toFixed(1).replace(/\.0$/, "") : Math.round(p)}p`;
  }
  return gbp(v, true);
}
const kwh = (n: number) => `${n < 10 ? n.toFixed(2).replace(/\.?0+$/, "") || "0" : Math.round(n).toLocaleString("en-GB")} kWh`;

export default function ApplianceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const a = applianceById(v.app);
  const rate = v.tariff === "offpeak" ? v.offpeak : v.tariff === "own" ? v.own : CAP.elecUnit;
  const r = runningCost({ watts: v.watts, minutes: v.minutes, freq: v.freq, per: v.per, cycling: v.cycling, rate });
  const rateLabel = v.tariff === "offpeak" ? "Off-peak rate" : v.tariff === "own" ? "Your rate" : "Price cap rate";

  const pickApp = (id: ApplianceId) => {
    const x = applianceById(id);
    st.set("app", id);
    st.set("watts", x.watts);
    st.set("minutes", x.minutes);
    st.set("freq", x.freq);
    st.set("per", x.per);
    st.set("cycling", x.cycling);
  };

  // Second appliance or gas central heating, used the same number of times.
  const b = v.cmp !== "none" && v.cmp !== "gas" ? applianceById(v.cmp) : null;
  const rb = b
    ? runningCost({ watts: b.watts, minutes: v.cmpMinutes > 0 ? v.cmpMinutes : b.minutes, freq: v.freq, per: v.per, cycling: b.cycling, rate })
    : null;
  const gasYear = v.cmp === "gas" ? gasHeatCost(r.kwhPerYear, CAP.gasUnit, v.boiler / 100) : 0;
  const gasUse = v.cmp === "gas" ? gasHeatCost(r.kwhPerUse, CAP.gasUnit, v.boiler / 100) : 0;
  const cmpName = v.cmp === "gas" ? "Gas central heating (same heat)" : b?.name ?? "";
  const cmpYear = v.cmp === "gas" ? gasYear : rb?.perYear ?? 0;
  const cmpUse = v.cmp === "gas" ? gasUse : rb?.perUse ?? 0;
  const hasCmp = v.cmp !== "none";
  const saving = r.perYear - cmpYear;

  const typicalElec = (TDCV_2026.elec.medium * rate) / 100;
  const usesWord = v.per === "week" ? "a week" : "a day";
  const nothing = r.kwhPerUse <= 0 || r.usesPerDay <= 0 || rate <= 0;

  const all = APPLIANCES.filter((x) => x.id !== "custom").map((x) => ({ x, c: runningCost({ ...x, rate }) }));
  all.sort((p, q) => q.c.perYear - p.c.perYear);

  return (
    <Studio
      title="Your appliance"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out the running cost"
      onReset={st.reset}
      dock={{ label: "Cost a year", value: gbp(r.perYear) }}
      inputs={
        <>
          <InputGroup title="Your appliance">
            <SelectField
              label="Appliance"
              value={v.app}
              onChange={pickApp}
              options={APPLIANCES.map((x) => ({ value: x.id, label: x.name }))}
              info="Picking an appliance fills in a typical wattage and time. Change them to match yours: the wattage is on the rating plate or in the manual."
            />
            <StepperField
              label="Power"
              value={v.watts}
              onChange={st.bind("watts")}
              step={v.watts >= 1000 ? 100 : 10}
              min={0}
              max={22000}
              unit="W"
              dp={0}
              info="Watts, from the rating plate or manual. 1,000 watts (1kW) running for an hour uses 1 kWh. If the label shows a range, use the higher figure."
            />
            <StepperField
              label="Minutes each use"
              value={v.minutes}
              onChange={st.bind("minutes")}
              step={v.minutes >= 60 ? 15 : 1}
              min={0}
              max={1440}
              unit="min"
              dp={0}
              info="How long it is on each time. For something always on, such as a fridge freezer, use 1,440 minutes (24 hours) once a day."
            />
            <StepperField label="Uses" value={v.freq} onChange={st.bind("freq")} step={1} min={0} max={100} unit={usesWord} dp={1} />
            <RadioGroup
              label="Counted"
              value={v.per}
              onChange={st.bind("per")}
              options={[
                { value: "day", label: "A day" },
                { value: "week", label: "A week" },
              ]}
            />
            <SelectField
              label="Compare with"
              value={v.cmp}
              onChange={st.bind("cmp")}
              options={[
                { value: "none" as CompareId, label: "Nothing" },
                { value: "gas" as CompareId, label: "Gas central heating (same heat)" },
                ...APPLIANCES.filter((x) => x.id !== "custom").map((x) => ({ value: x.id as CompareId, label: x.name })),
              ]}
              info="Compare with a second appliance used as often, such as an air fryer against the oven, or with heating the room by gas central heating instead."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <RadioGroup
              label="Electricity rate"
              value={v.tariff}
              onChange={st.bind("tariff")}
              optional
              options={[
                { value: "cap", label: `Price cap (${CAP.elecUnit}p)` },
                { value: "offpeak", label: "Off-peak" },
                { value: "own", label: "My own rate" },
              ]}
              info={`The price cap rate is the Great Britain average for Direct Debit, ${CAP.label}. Economy 7 and other time-of-use tariffs have a cheaper night rate: pick Off-peak and enter yours.`}
            />
            {v.tariff === "offpeak" && (
              <StepperField
                label="Off-peak rate"
                value={v.offpeak}
                onChange={st.bind("offpeak")}
                step={0.5}
                min={0}
                max={100}
                unit="p/kWh"
                dp={2}
                optional
                info={`Your night or off-peak unit rate, from your bill. ${OFF_PEAK_EXAMPLE}p is an example of an overnight electric car tariff; Economy 7 night rates are often higher.`}
              />
            )}
            {v.tariff === "own" && (
              <StepperField label="Your unit rate" value={v.own} onChange={st.bind("own")} step={0.5} min={0} max={200} unit="p/kWh" dp={2} optional info="From your bill or your supplier's app. Use the rate including any VAT." />
            )}
            <StepperField
              label="Share of time drawing power"
              value={v.cycling}
              onChange={st.bind("cycling")}
              step={5}
              min={0}
              max={100}
              unit="%"
              dp={0}
              optional
              info="Ovens, oil-filled radiators and other thermostat appliances switch their element on and off once hot. 100% means full power the whole time."
            />
            {b && (
              <StepperField
                label={`Minutes each use: ${b.name.toLowerCase()}`}
                value={v.cmpMinutes > 0 ? v.cmpMinutes : b.minutes}
                onChange={st.bind("cmpMinutes")}
                step={5}
                min={0}
                max={1440}
                unit="min"
                dp={0}
                optional
                info="How long the second appliance runs each time. It is used as often as the first."
              />
            )}
            {v.cmp === "gas" && (
              <StepperField
                label="Boiler efficiency"
                value={v.boiler}
                onChange={st.bind("boiler")}
                step={1}
                min={50}
                max={100}
                unit="%"
                dp={0}
                optional
                info="New gas boilers in England must be rated at least 92% efficient. Older boilers and real homes often do worse; we assume 90%."
              />
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`${a.id === "custom" ? "Your appliance" : a.name}, a year`}
        value={gbp(r.perYear)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          nothing ? (
            <>Enter the power, the minutes each use and how often you use it to see the cost.</>
          ) : (
            <>
              At {v.watts.toLocaleString("en-GB")} watts for {v.minutes.toLocaleString("en-GB")} minutes{v.cycling < 100 ? ` (drawing power ${v.cycling}% of the time)` : ""}, each use takes{" "}
              <b>{kwh(r.kwhPerUse)}</b> and costs <b>{money(r.perUse)}</b> at {rate}p a unit. Used {v.freq} {v.freq === 1 ? "time" : "times"} {usesWord}, that is{" "}
              <b>{gbp(r.perMonth, true)}</b> a month.
              {hasCmp && (
                <>
                  {" "}
                  {cmpName} would cost <b>{gbp(cmpYear)}</b> a year, {saving >= 0 ? `${gbp(saving)} less` : `${gbp(-saving)} more`}.
                </>
              )}
            </>
          )
        }
        badges={[`${money(r.perUse)} a use`, `${money(r.perHour)} an hour`, `${kwh(r.kwhPerYear)} a year`]}
      />

      <ResultCard
        title={hasCmp ? "Side by side, a year" : "Share of a typical electricity bill"}
        sub={hasCmp ? `Used ${v.freq} ${v.freq === 1 ? "time" : "times"} ${usesWord}.` : `Against the unit cost of ${TDCV_2026.elec.medium.toLocaleString("en-GB")} kWh, Ofgem's typical yearly use.`}
      >
        <SplitBar
          segments={
            hasCmp
              ? [
                  { label: a.id === "custom" ? "Your appliance" : a.name, value: r.perYear, display: gbp(r.perYear), color: "#2a78d6" },
                  { label: cmpName, value: cmpYear, display: gbp(cmpYear), color: "#eb6834" },
                ]
              : [
                  { label: a.id === "custom" ? "Your appliance" : a.name, value: r.perYear, display: gbp(r.perYear), color: "#2a78d6" },
                  { label: "Rest of typical use", value: Math.max(0, typicalElec - r.perYear), display: gbp(Math.max(0, typicalElec - r.perYear)), color: "#c3c8ce" },
                ]
          }
        />
      </ResultCard>

      <Facts
        items={[
          { label: "Each use", value: money(r.perUse), note: kwh(r.kwhPerUse) },
          { label: "An hour", value: money(r.perHour) },
          { label: "A day", value: money(r.perDay) },
          { label: "A week", value: money(r.perWeek) },
          { label: "A month", value: gbp(r.perMonth, true) },
          { label: "A year", value: gbp(r.perYear, true), note: kwh(r.kwhPerYear) },
        ]}
      />

      <Assumptions
        items={[
          { label: rateLabel, value: `${rate}p per kWh` },
          { label: "Period", value: v.tariff === "cap" ? CAP.label : "Your tariff" },
          { label: "Power", value: `${v.watts.toLocaleString("en-GB")} W, on ${v.cycling}% of the time` },
          { label: "Use", value: `${v.minutes} min, ${v.freq} ${usesWord}` },
          { label: "Standing charge", value: "Not included" },
        ]}
        note="Wattages and times are typical figures. Check the rating plate on yours. The standing charge is paid whether the appliance is on or not, so it is left out."
      />

      {hasCmp && (
        <ResultCard title="Compare" sub={`Each at ${v.cmp === "gas" ? `${rate}p electricity and ${CAP.gasUnit}p gas` : `${rate}p a unit`}.`}>
          <Compare
            head={["Option", "A year"]}
            rows={[
              { label: `${a.id === "custom" ? "Your appliance" : a.name} (${money(r.perUse)} a use)`, value: gbp(r.perYear), bar: 1, current: true },
              {
                label: `${cmpName} (${money(cmpUse)} a use)`,
                value: gbp(cmpYear),
                bar: r.perYear > 0 ? Math.min(1, cmpYear / Math.max(r.perYear, cmpYear)) : 0,
                delta: saving >= 0 ? `${gbp(saving)} less` : `${gbp(-saving)} more`,
                deltaTone: saving >= 0 ? "down" : "up",
              },
            ]}
          />
          {v.cmp === "gas" && !a.heat && (
            <Callout tone="warn" title="Only heaters compare with gas">
              Gas central heating gives heat, so this comparison only makes sense for a heater, electric blanket or similar. For other appliances, pick a second appliance instead.
            </Callout>
          )}
        </ResultCard>
      )}

      <ResultCard title="Every common appliance, a year" sub={`Typical use at ${rate}p a unit. Yours is highlighted.`}>
        <BarChart
          rows={all.map(({ x, c }) => ({ label: x.name, note: `${x.watts.toLocaleString("en-GB")} W, ${x.minutes} min, ${x.freq} ${x.per === "week" ? "a week" : "a day"}`, value: c.perYear, display: gbp(c.perYear), current: x.id === v.app }))}
          caption="Typical wattages and use. Your own figures will differ."
        />
      </ResultCard>

      <ResultCard title="Cost table" sub="The same appliance over different periods.">
        <DataTable
          summary="Show the cost table"
          columns={["Period", "Energy", "Cost"]}
          rows={[
            ["Each use", kwh(r.kwhPerUse), money(r.perUse)],
            ["An hour switched on", kwh((v.watts / 1000) * (Math.min(100, v.cycling) / 100)), money(r.perHour)],
            ["A day", kwh(r.kwhPerDay), money(r.perDay)],
            ["A week", kwh(r.kwhPerDay * 7), money(r.perWeek)],
            ["A month", kwh(r.kwhPerYear / 12), gbp(r.perMonth, true)],
            ["A year", kwh(r.kwhPerYear), gbp(r.perYear, true)],
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways to cut the cost.">
        {a.heat && v.cmp !== "gas" && (
          <Callout title="Heating a room with electricity">
            Each unit of electricity costs about {(CAP.elecUnit / (CAP.gasUnit / BOILER_EFFICIENCY)).toFixed(1)} times as much as the same heat from a {Math.round(BOILER_EFFICIENCY * 100)}% efficient gas boiler. Heating one room with a heater can still be cheaper than heating the whole house. Pick &ldquo;Gas central heating&rdquo; above to compare.
          </Callout>
        )}
        {r.perYear > 200 && (
          <Callout tone="warn" title="A big user">
            This appliance costs more than {gbp(200)} a year. Using it for less time, on a lower setting, or at an off-peak rate makes the biggest difference.
          </Callout>
        )}
        <Callout title="Your whole bill">
          Appliance costs leave out the daily standing charge. See your full gas and electricity bill with our <a href="/uk/property/energy-bill-calculator">energy bill calculator</a>.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Price cap unit rate {CAP.elecUnit}p per kWh, Great Britain average for Direct Debit, {CAP.label}. Your region and tariff may differ.
      </p>
    </Studio>
  );
}

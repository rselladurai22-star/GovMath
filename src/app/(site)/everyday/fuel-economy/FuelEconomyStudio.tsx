"use client";

import { fillUpL100, fromL100, fuelCost, LITRES, MILE_KM, toL100, type EconomyUnit, type VolumeUnit } from "@/lib/life/maths";
import { PRICES_2026 } from "@/lib/vehicles/running";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Cur = "gbp" | "usd" | "eur";
type Dist = "mi" | "km";

const SCHEMA = {
  mode: oneOf<"convert" | "fillup">("convert", ["convert", "fillup"]),
  eco: num(45, 0, 1000),
  unit: oneOf<EconomyUnit>("mpg-uk", ["mpg-uk", "mpg-us", "l100", "kml"]),
  dist: num(412, 0, 100_000),
  distUnit: oneOf<Dist>("mi", ["mi", "km"]),
  fuel: num(38.5, 0, 10_000),
  fuelUnit: oneOf<VolumeUnit>("litre", ["litre", "uk-gallon", "us-gallon"]),
  price: num(PRICES_2026.petrol / 100, 0, 1000),
  priceUnit: oneOf<VolumeUnit>("litre", ["litre", "uk-gallon", "us-gallon"]),
  cur: oneOf<Cur>("gbp", ["gbp", "usd", "eur"]),
  trip: num(200, 0, 100_000),
  tripUnit: oneOf<Dist>("mi", ["mi", "km"]),
  yearly: num(7000, 0, 200_000),
  people: num(1, 1, 9),
};
const ADVANCED = ["cur", "tripUnit", "yearly", "people"] as const;
const CODE: Record<Cur, string> = { gbp: "GBP", usd: "USD", eur: "EUR" };
const UNIT_LABEL: Record<EconomyUnit, string> = { "mpg-uk": "MPG (UK gallons)", "mpg-us": "MPG (US gallons)", l100: "Litres per 100 km", kml: "Km per litre" };
const UNIT_SHORT: Record<EconomyUnit, string> = { "mpg-uk": "mpg (UK)", "mpg-us": "mpg (US)", l100: "L/100 km", kml: "km/L" };
const VOL_LABEL: Record<VolumeUnit, string> = { litre: "litre", "uk-gallon": "UK gallon", "us-gallon": "US gallon" };

export default function FuelEconomyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const fmt = (dp: number) => new Intl.NumberFormat("en-GB", { style: "currency", currency: CODE[v.cur], currencyDisplay: "narrowSymbol", minimumFractionDigits: dp, maximumFractionDigits: dp });
  const m = (x: number) => fmt(2).format(Number.isFinite(x) ? x : 0);
  const m3 = (x: number) => fmt(3).format(Number.isFinite(x) ? x : 0);
  const n = (x: number, dp = 1) => (Number.isFinite(x) ? x.toLocaleString("en-GB", { maximumFractionDigits: dp, minimumFractionDigits: dp }) : "—");
  const sym = fmt(0).format(0).replace(/[\d.,\s]/g, "");

  const l100 = v.mode === "convert" ? toL100(v.eco, v.unit) : fillUpL100(v.dist, v.distUnit, v.fuel, v.fuelUnit);
  const ok = l100 > 0;
  const all = (["mpg-uk", "mpg-us", "l100", "kml"] as EconomyUnit[]).map((u) => ({ u, value: fromL100(l100, u) }));
  const cost = fuelCost(l100, v.price, v.priceUnit, v.trip, v.tripUnit);
  const year = fuelCost(l100, v.price, v.priceUnit, v.yearly, v.tripUnit);
  const tripLabel = `${n(v.trip, 0)} ${v.tripUnit === "mi" ? "miles" : "km"}`;
  const headline: EconomyUnit =
    v.mode === "convert" ? (v.unit === "l100" ? "mpg-uk" : "l100") : v.fuelUnit === "us-gallon" ? "mpg-us" : v.fuelUnit === "uk-gallon" || v.distUnit === "mi" ? "mpg-uk" : "l100";
  const headValue = fromL100(l100, headline);

  // Same trip at other economies, for comparison.
  const baseMpg = fromL100(l100, "mpg-uk");
  const steps = ok ? [0.75, 1, 1.25, 1.5].map((k) => baseMpg * k) : [];
  const maxCost = ok ? fuelCost(toL100(steps[0], "mpg-uk"), v.price, v.priceUnit, v.yearly, v.tripUnit).trip : 1;

  return (
    <Studio
      title="Your fuel economy"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate fuel economy"
      onReset={st.reset}
      dock={{ label: UNIT_SHORT[headline], value: ok ? n(headValue) : "—" }}
      inputs={
        <>
          <InputGroup title="Your car">
            <RadioGroup
              label="I know"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "convert", label: "My MPG or L/100 km" },
                { value: "fillup", label: "Distance and fuel used" },
              ]}
            />
            {v.mode === "convert" ? (
              <>
                <StepperField label="Fuel economy" value={v.eco} onChange={st.bind("eco")} step={0.5} min={0} max={150} unit="" dp={2} />
                <SelectField label="Unit" value={v.unit} onChange={st.bind("unit")} options={(Object.keys(UNIT_LABEL) as EconomyUnit[]).map((u) => ({ value: u, label: UNIT_LABEL[u] }))} />
              </>
            ) : (
              <>
                <StepperField label="Distance since last fill-up" value={v.dist} onChange={st.bind("dist")} step={10} min={0} max={2000} unit={v.distUnit === "mi" ? "miles" : "km"} dp={1} info="Fill the tank, reset the trip meter, drive as normal, then fill up again. Use the distance on the trip meter." />
                <Segmented2 label="Distance in" value={v.distUnit} onChange={st.bind("distUnit")} />
                <StepperField label="Fuel added to refill" value={v.fuel} onChange={st.bind("fuel")} step={0.5} min={0} max={200} unit={v.fuelUnit === "litre" ? "litres" : "gallons"} dp={2} />
                <SelectField
                  label="Fuel measured in"
                  value={v.fuelUnit}
                  onChange={st.bind("fuelUnit")}
                  options={[
                    { value: "litre", label: "Litres" },
                    { value: "uk-gallon", label: "UK gallons" },
                    { value: "us-gallon", label: "US gallons" },
                  ]}
                />
              </>
            )}
            <StepperField label="Fuel price" value={v.price} onChange={st.bind("price")} step={0.01} min={0} max={20} unit={`${sym} per ${VOL_LABEL[v.priceUnit]}`} dp={3} info={`Default: UK average petrol, ${PRICES_2026.petrol}p a litre (late September 2026). Diesel was ${PRICES_2026.diesel}p.`} />
            <SelectField
              label="Price is per"
              value={v.priceUnit}
              onChange={st.bind("priceUnit")}
              options={[
                { value: "litre", label: "Litre" },
                { value: "us-gallon", label: "US gallon" },
                { value: "uk-gallon", label: "UK gallon" },
              ]}
            />
            <StepperField label="Trip distance" value={v.trip} onChange={st.bind("trip")} step={10} min={0} max={5000} unit={v.tripUnit === "mi" ? "miles" : "km"} dp={1} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Currency"
              value={v.cur}
              onChange={st.bind("cur")}
              optional
              options={[
                { value: "gbp", label: "Pounds (£)" },
                { value: "usd", label: "Dollars ($)" },
                { value: "eur", label: "Euros (€)" },
              ]}
            />
            <Segmented2 label="Trip and yearly distance in" value={v.tripUnit} onChange={st.bind("tripUnit")} optional />
            <StepperField label="Distance a year" value={v.yearly} onChange={st.bind("yearly")} step={500} min={0} max={50_000} unit={v.tripUnit === "mi" ? "miles" : "km"} dp={0} optional />
            <StepperField label="People sharing the trip" value={v.people} onChange={(x) => st.set("people", Math.max(1, Math.round(x)))} step={1} min={1} max={9} unit="people" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={ok ? `Fuel economy in ${UNIT_SHORT[headline]}` : "Enter your figures"}
        value={ok ? n(headValue) : "—"}
        unit={ok ? UNIT_SHORT[headline] : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          ok ? (
            <>
              That is <b>{n(fromL100(l100, "mpg-uk"))} mpg</b>{" "}in UK gallons, <b>{n(fromL100(l100, "mpg-us"))} mpg</b>{" "}in US gallons, <b>{n(l100, 2)} L/100 km</b>{" "}and{" "}
              <b>{n(fromL100(l100, "kml"))} km per litre</b>. At {m3(v.price)} per {VOL_LABEL[v.priceUnit]}, fuel costs <b>{m(cost.perMile)}</b>{" "}a mile ({m(cost.perKm)} a km), and
              the {tripLabel} trip costs <b>{m(cost.trip)}</b>
              {v.people > 1 ? <>, or {m(cost.trip / v.people)} each for {v.people} people</> : null}.
            </>
          ) : (
            <>Enter a fuel economy above zero, or a distance and the fuel you added.</>
          )
        }
        badges={ok ? [`${n(cost.litres)} litres for the trip`, `${m3(cost.perLitre)} a litre`] : undefined}
      />

      {ok && (
        <>
          <Facts
            items={all.map((x) => ({ label: UNIT_LABEL[x.u], value: n(x.value, x.u === "l100" ? 2 : 1) }))}
          />

          <ResultCard title="What it costs" sub={`Fuel only, at ${m3(v.price)} per ${VOL_LABEL[v.priceUnit]}.`}>
            <Statement
              columns={["Fuel", "Cost"]}
              rows={[
                { label: "Per mile", values: [`${n(l100 / 100 * MILE_KM, 3)} L`, m(cost.perMile)] },
                { label: "Per km", values: [`${n(l100 / 100, 3)} L`, m(cost.perKm)] },
                { label: `This trip (${tripLabel})`, values: [`${n(cost.litres)} L`, m(cost.trip)], kind: "total" as const },
                ...(v.people > 1 ? [{ label: `Each of ${v.people} people`, values: ["", m(cost.trip / v.people)] }] : []),
                { label: `A year (${n(v.yearly, 0)} ${v.tripUnit === "mi" ? "miles" : "km"})`, values: [`${n(year.litres, 0)} L`, m(year.trip)] },
                { label: "A month", values: [`${n(year.litres / 12, 0)} L`, m(year.trip / 12)] },
              ]}
            />
          </ResultCard>

          <ResultCard title="If your car were more or less efficient" sub={`Yearly fuel cost over ${n(v.yearly, 0)} ${v.tripUnit === "mi" ? "miles" : "km"}.`}>
            <Compare
              head={["Fuel economy", "A year"]}
              rows={steps.map((mpg, k) => {
                const c = fuelCost(toL100(mpg, "mpg-uk"), v.price, v.priceUnit, v.yearly, v.tripUnit).trip;
                return {
                  label: `${n(mpg)} mpg (UK) · ${n(toL100(mpg, "mpg-uk"), 1)} L/100 km`,
                  value: m(c),
                  delta: k === 1 ? "Yours" : `${c > year.trip ? "+" : "−"}${m(Math.abs(c - year.trip))}`,
                  deltaTone: k === 1 ? undefined : c > year.trip ? ("up" as const) : ("down" as const),
                  bar: maxCost > 0 ? c / maxCost : 0,
                  current: k === 1,
                };
              })}
            />
          </ResultCard>

          <Callout title="UK and US gallons are different">
            A UK (imperial) gallon is {n(LITRES["uk-gallon"], 5)} litres and a US gallon {n(LITRES["us-gallon"], 6)} litres, so the same car shows about 20% more
            miles per gallon in UK figures. Always check which gallon a figure uses.
          </Callout>
          <Callout title="Planning a UK journey?">
            The <a href="/uk/vehicles/fuel-cost-journey">fuel cost per journey calculator</a>{" "}adds return trips, passengers, tolls, parking and HMRC mileage
            rates.
          </Callout>
        </>
      )}

      <Assumptions
        items={[
          { label: "UK gallon", value: "4.54609 litres" },
          { label: "US gallon", value: "3.785411784 litres" },
          { label: "Mile", value: "1.609344 km" },
          { label: "Cost", value: "Fuel only: no wear, tax or insurance" },
        ]}
      />
    </Studio>
  );
}

function Segmented2({ label, value, onChange, optional }: { label: string; value: Dist; onChange: (v: Dist) => void; optional?: boolean }) {
  return (
    <RadioGroup
      label={label}
      value={value}
      onChange={onChange}
      optional={optional}
      options={[
        { value: "mi", label: "Miles" },
        { value: "km", label: "Kilometres" },
      ]}
    />
  );
}

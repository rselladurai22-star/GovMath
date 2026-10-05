"use client";

import { AMAP, journeyCost, PRICES_2026, type Efficiency } from "@/lib/vehicles/running";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Fuel = "petrol" | "diesel" | "electric";

const SCHEMA = {
  miles: num(120, 0, 10_000),
  returnTrip: bool(true),
  fuel: oneOf<Fuel>("petrol", ["petrol", "diesel", "electric"]),
  units: oneOf<"mpg" | "l100">("mpg", ["mpg", "l100"]),
  mpg: num(45, 1, 200),
  l100: num(6.3, 1, 30),
  mikwh: num(3.5, 0.5, 10),
  price: num(PRICES_2026.petrol, 0, 1_000),
  people: num(1, 1, 9),
  tolls: num(0, 0, 1_000),
  parking: num(0, 0, 1_000),
};
const ADVANCED = ["units", "people", "tolls", "parking"] as const;

export default function FuelStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const electric = v.fuel === "electric";
  const eff: Efficiency = electric ? { kind: "mikwh", value: v.mikwh } : v.units === "mpg" ? { kind: "mpg", value: v.mpg } : { kind: "l100", value: v.l100 };
  const base = { miles: v.miles, returnTrip: v.returnTrip, eff, price: v.price, people: v.people, tolls: v.tolls, parking: v.parking };
  const r = journeyCost(base);
  const setFuel = (f: Fuel) => {
    st.set("fuel", f);
    st.set("price", f === "petrol" ? PRICES_2026.petrol : f === "diesel" ? PRICES_2026.diesel : PRICES_2026.homeElectric);
  };
  const alts = [
    { label: `Petrol, 45 mpg at ${PRICES_2026.petrol}p`, r: journeyCost({ ...base, eff: { kind: "mpg", value: 45 }, price: PRICES_2026.petrol }) },
    { label: `Diesel, 55 mpg at ${PRICES_2026.diesel}p`, r: journeyCost({ ...base, eff: { kind: "mpg", value: 55 }, price: PRICES_2026.diesel }) },
    { label: `Electric, home at ${PRICES_2026.homeElectric}p/kWh`, r: journeyCost({ ...base, eff: { kind: "mikwh", value: 3.5 }, price: PRICES_2026.homeElectric }) },
    { label: `Electric, overnight tariff at ${PRICES_2026.offPeak}p`, r: journeyCost({ ...base, eff: { kind: "mikwh", value: 3.5 }, price: PRICES_2026.offPeak }) },
    { label: `Electric, rapid charger at ${PRICES_2026.publicRapid}p`, r: journeyCost({ ...base, eff: { kind: "mikwh", value: 3.5 }, price: PRICES_2026.publicRapid }) },
  ];
  const maxAlt = Math.max(1, ...alts.map((a) => a.r.fuel));
  const unitWord = electric ? "kWh" : "litres";

  return (
    <Studio
      title="Your journey"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate fuel cost"
      onReset={st.reset}
      dock={{ label: v.people > 1 ? "Each" : "Journey cost", value: gbp(v.people > 1 ? r.perPerson : r.total, true) }}
      inputs={
        <>
          <InputGroup title="The trip">
            <StepperField label="Distance one way" value={v.miles} onChange={st.bind("miles")} step={5} min={0} max={10_000} unit="miles" dp={0} />
            <Switch label="Return journey" checked={v.returnTrip} onChange={st.bind("returnTrip")} />
          </InputGroup>
          <InputGroup title="Your car">
            <Segmented
              label="Fuel"
              value={v.fuel}
              onChange={setFuel}
              options={[
                { value: "petrol", label: "Petrol" },
                { value: "diesel", label: "Diesel" },
                { value: "electric", label: "Electric" },
              ]}
            />
            {electric ? (
              <StepperField label="Efficiency" value={v.mikwh} onChange={st.bind("mikwh")} step={0.1} min={0.5} max={10} unit="miles/kWh" dp={1} hint="Most electric cars manage 3 to 4.5." />
            ) : v.units === "mpg" ? (
              <StepperField label="Fuel economy" value={v.mpg} onChange={st.bind("mpg")} step={1} min={1} max={200} unit="mpg" dp={0} hint="UK gallons. Real-world figures are usually below the official one." />
            ) : (
              <StepperField label="Fuel use" value={v.l100} onChange={st.bind("l100")} step={0.1} min={1} max={30} unit="l/100km" dp={1} />
            )}
            <StepperField label={electric ? "Electricity price" : "Fuel price"} value={v.price} onChange={st.bind("price")} step={electric ? 1 : 0.5} min={0} max={1_000} unit={electric ? "p/kWh" : "p/litre"} dp={electric ? 2 : 1} hint={electric ? "26.32p on the price cap; 7p to 10p on an overnight EV tariff." : "UK average in late September 2026."} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {!electric && (
              <Segmented
                label="Economy units"
                value={v.units}
                onChange={st.bind("units")}
                optional
                options={[
                  { value: "mpg", label: "mpg" },
                  { value: "l100", label: "l/100km" },
                ]}
              />
            )}
            <StepperField label="People sharing the cost" value={v.people} onChange={(n) => st.set("people", Math.round(n))} step={1} min={1} max={9} unit="people" dp={0} optional />
            <MoneyField label="Tolls and charges" value={v.tolls} onChange={st.bind("tolls")} optional hint="Bridges, tolls, clean air zones or the congestion charge." />
            <MoneyField label="Parking" value={v.parking} onChange={st.bind("parking")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.people > 1 ? `Each of ${Math.round(v.people)} people pays` : "This journey costs"}
        value={gbp(v.people > 1 ? r.perPerson : r.total, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Driving <b>{r.miles.toLocaleString("en-GB")} miles</b> uses about {r.units.toFixed(1)} {unitWord}, costing <b>{gbp(r.fuel, true)}</b> in {electric ? "electricity" : "fuel"}
            {v.tolls + v.parking > 0 ? <>, plus {gbp(v.tolls + v.parking, true)} in tolls and parking</> : null}. That is {(r.perMile * 100).toFixed(1)}p a mile.
          </>
        }
        badges={[`${(r.perMile * 100).toFixed(1)}p a mile`, `${r.units.toFixed(1)} ${unitWord}`, v.returnTrip ? "Return trip" : "One way"]}
      />

      <Facts
        items={[
          { label: "Distance", value: `${r.miles.toLocaleString("en-GB")} miles` },
          { label: electric ? "Electricity" : "Fuel", value: gbp(r.fuel, true) },
          { label: "Total", value: gbp(r.total, true) },
          { label: "Business mileage at 45p", value: gbp(r.claim, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Gallon", value: "UK gallon, 4.546 litres" },
          { label: "Price", value: `${v.price}${electric ? "p per kWh" : "p per litre"}` },
          { label: "Not included", value: "Wear, tyres, servicing or depreciation" },
        ]}
      />

      <ResultCard title="The same trip in other cars" sub="Fuel or electricity only.">
        <Compare head={["Car", "Cost"]} rows={alts.map((a) => ({ label: a.label, value: gbp(a.r.fuel, true), bar: a.r.fuel / maxAlt }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Claiming and saving.">
        <Callout title="Driving for work?">
          If you use your own car for business, your employer can pay up to {AMAP.carFirst}p a mile tax-free for the first 10,000 miles a year, and {AMAP.carAfter}p after that. If they pay less, you can claim tax relief on the difference.
        </Callout>
        <Callout title="Cut the cost">Driving at 60mph rather than 70mph, keeping tyres pumped up and removing roof boxes can noticeably improve economy.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Real economy depends on speed, traffic, weather and load.
      </p>
    </Studio>
  );
}

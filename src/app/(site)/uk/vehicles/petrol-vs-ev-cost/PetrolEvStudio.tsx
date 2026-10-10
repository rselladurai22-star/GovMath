"use client";

import { petrolVsEv, PRICES_2026 } from "@/lib/vehicles/running";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, gbpShort, per } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  miles: num(8_000, 0, 100_000),
  years: num(6, 1, 15),
  petrolPrice: num(25_000, 0, 500_000),
  mpg: num(45, 1, 200),
  fuelPrice: num(PRICES_2026.petrol, 0, 1_000),
  evPrice: num(30_000, 0, 500_000),
  miPerKwh: num(3.5, 0.5, 10),
  homePrice: num(PRICES_2026.offPeak, 0, 200),
  publicShare: num(20, 0, 100),
  publicPrice: num(PRICES_2026.publicRapid, 0, 200),
  petrolServicing: num(300, 0, 10_000),
  evServicing: num(200, 0, 10_000),
  petrolTax: num(200, 0, 5_000),
  evTax: num(200, 0, 5_000),
  petrolInsurance: num(600, 0, 10_000),
  evInsurance: num(700, 0, 10_000),
  eved: bool(true),
  petrolResidual: num(35, 0, 100),
  evResidual: num(30, 0, 100),
};
const ADVANCED = ["petrolServicing", "evServicing", "petrolTax", "evTax", "petrolInsurance", "evInsurance", "eved", "petrolResidual", "evResidual"] as const;

export default function PetrolEvStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = petrolVsEv({
    milesPerYear: v.miles,
    years: v.years,
    mpg: v.mpg,
    fuelPrice: v.fuelPrice,
    petrolServicing: v.petrolServicing,
    petrolTax: v.petrolTax,
    petrolInsurance: v.petrolInsurance,
    petrolPrice: v.petrolPrice,
    miPerKwh: v.miPerKwh,
    homePrice: v.homePrice,
    publicPrice: v.publicPrice,
    publicShare: v.publicShare / 100,
    evServicing: v.evServicing,
    evTax: v.evTax,
    evInsurance: v.evInsurance,
    evPrice: v.evPrice,
    eved: v.eved,
    petrolResidual: v.petrolResidual / 100,
    evResidual: v.evResidual / 100,
  });
  const years = Math.round(v.years);
  const evCheaper = r.evTotal < r.petrolTotal;
  const diff = Math.abs(r.petrolTotal - r.evTotal);
  const yearlyEnergySaving = r.petrolEnergy - r.evEnergy;
  const maxRun = Math.max(1, r.petrolRunning, r.evRunning);

  return (
    <Studio
      title="Your driving"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare petrol and electric"
      onReset={st.reset}
      dock={{ label: evCheaper ? "Electric saves" : "Petrol saves", value: gbp(diff) }}
      inputs={
        <>
          <InputGroup title="Your driving">
            <StepperField label="Miles a year" value={v.miles} onChange={(n) => st.set("miles", Math.round(n))} step={500} min={0} max={100_000} unit="miles" dp={0} />
            <StepperField label="Years you will keep the car" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={1} max={15} unit="years" dp={0} />
          </InputGroup>
          <InputGroup title="Petrol car">
            <MoneyField label="Price" value={v.petrolPrice} onChange={st.bind("petrolPrice")} />
            <StepperField label="Fuel economy" value={v.mpg} onChange={st.bind("mpg")} step={1} min={1} max={200} unit="mpg" dp={0} />
            <StepperField label="Petrol price" value={v.fuelPrice} onChange={st.bind("fuelPrice")} step={0.5} min={0} max={1_000} unit="p/litre" dp={1} />
          </InputGroup>
          <InputGroup title="Electric car">
            <MoneyField label="Price" value={v.evPrice} onChange={st.bind("evPrice")} hint="After any discount or grant." />
            <StepperField label="Efficiency" value={v.miPerKwh} onChange={st.bind("miPerKwh")} step={0.1} min={0.5} max={10} unit="miles/kWh" dp={1} />
            <StepperField label="Home electricity price" value={v.homePrice} onChange={st.bind("homePrice")} step={0.5} min={0} max={200} unit="p/kWh" dp={2} hint="About 8p on an overnight EV tariff; 26.32p on the standard price cap." />
            <StepperField label="Share charged at public chargers" value={v.publicShare} onChange={st.bind("publicShare")} step={5} min={0} max={100} unit="%" dp={0} />
            {v.publicShare > 0 && <StepperField label="Public charging price" value={v.publicPrice} onChange={st.bind("publicPrice")} step={1} min={0} max={200} unit="p/kWh" dp={0} />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Petrol servicing a year" value={v.petrolServicing} onChange={st.bind("petrolServicing")} optional />
            <MoneyField label="Electric servicing a year" value={v.evServicing} onChange={st.bind("evServicing")} optional />
            <MoneyField label="Petrol car tax a year" value={v.petrolTax} onChange={st.bind("petrolTax")} optional />
            <MoneyField label="Electric car tax a year" value={v.evTax} onChange={st.bind("evTax")} optional hint="£200, or £640 for new electric cars over £50,000 in years 2 to 6." />
            <MoneyField label="Petrol insurance a year" value={v.petrolInsurance} onChange={st.bind("petrolInsurance")} optional />
            <MoneyField label="Electric insurance a year" value={v.evInsurance} onChange={st.bind("evInsurance")} optional />
            <Switch label="Include 3p a mile for electric cars from April 2028" checked={v.eved} onChange={st.bind("eved")} optional />
            <StepperField label="Petrol car value at the end" value={v.petrolResidual} onChange={st.bind("petrolResidual")} step={5} min={0} max={100} unit="% of price" dp={0} optional />
            <StepperField label="Electric car value at the end" value={v.evResidual} onChange={st.bind("evResidual")} step={5} min={0} max={100} unit="% of price" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Over ${years} ${per(years, "years")}`}
        value={`${evCheaper ? "Electric" : "Petrol"} saves ${gbp(diff)}`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Driving {v.miles.toLocaleString("en-GB")} {per(v.miles.toLocaleString("en-GB"), "miles")} a year, fuel costs <b>{gbp(r.petrolEnergy)}</b> a year in the petrol car and electricity <b>{gbp(r.evEnergy)}</b> in the electric car, a saving of{" "}
            {gbp(yearlyEnergySaving)} a year. After the purchase price, running costs and resale value, the {evCheaper ? "electric" : "petrol"} car is <b>{gbp(diff)}</b> cheaper over {years} {per(years, "years")}.
            {r.breakEven !== null && r.breakEven > 0 ? <> The electric car pays back its higher price in year {r.breakEven}.</> : null}
          </>
        }
        badges={[`Petrol ${(r.petrolPerMile * 100).toFixed(1)}p a mile`, `Electric ${(r.evPerMile * 100).toFixed(1)}p a mile`, `Charging at ${r.evPerKwh.toFixed(1)}p/kWh average`]}
      />

      <Facts
        items={[
          { label: "Petrol fuel a year", value: gbp(r.petrolEnergy) },
          { label: "Electricity a year", value: gbp(r.evEnergy), tone: "good" },
          { label: `Petrol total, ${years} ${per(years, "years")}`, value: gbp(r.petrolTotal) },
          { label: `Electric total, ${years} ${per(years, "years")}`, value: gbp(r.evTotal) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Totals", value: "Purchase price plus running costs, minus value at the end" },
          { label: "Prices", value: "Fuel and electricity stay at today's prices" },
          { label: "Charging", value: `${100 - v.publicShare}% at home, ${v.publicShare}% public` },
          { label: "Pay-per-mile", value: v.eved ? "3p a mile from year 3 (April 2028)" : "Not included" },
        ]}
      />

      <ResultCard title="Total cost over time" sub="Purchase price plus running costs.">
        <AreaChart
          ariaLabel="Total cost over time"
          series={[
            { key: "petrol", label: "Petrol", color: "#94a3b8", values: r.path.map((p) => p.petrolTotal), dashed: true },
            { key: "ev", label: "Electric", color: "#5b1e6e", values: r.path.map((p) => p.evTotal), fill: true },
          ]}
          xLabel={(i) => `Yr ${i}`}
          yFormat={gbpShort}
          initial={years}
          hint="Drag across the chart, or use the arrow keys, to read any year."
          readout={(i) => (
            <>
              Year <b>{i}</b>: petrol <b>{gbp(r.path[i]?.petrolTotal ?? 0)}</b>, electric <b>{gbp(r.path[i]?.evTotal ?? 0)}</b>
            </>
          )}
        />
      </ResultCard>

      <ResultCard title="Running costs a year" sub="Fuel or electricity, servicing, tax and insurance.">
        <Compare
          head={["Car", "A year"]}
          rows={[
            { label: "Petrol", value: gbp(r.petrolRunning), bar: r.petrolRunning / maxRun },
            { label: "Electric", value: gbp(r.evRunning), bar: r.evRunning / maxRun, current: true },
          ]}
        />
        <Statement
          columns={["Petrol", "Electric"]}
          rows={[
            { label: "Fuel or electricity", values: [gbp(r.petrolEnergy), gbp(r.evEnergy)] },
            { label: "Servicing", values: [gbp(v.petrolServicing), gbp(v.evServicing)] },
            { label: "Car tax", values: [gbp(v.petrolTax), gbp(v.evTax)] },
            { label: "Insurance", values: [gbp(v.petrolInsurance), gbp(v.evInsurance)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="What changes the answer most.">
        <Callout title="Where you charge">Charging overnight at home on an EV tariff is the biggest saving. Relying on rapid chargers can make an electric car cost more per mile than petrol.</Callout>
        <Callout title="Mileage">The more you drive, the more the lower running cost counts. Low-mileage drivers may take many years to recover a higher purchase price.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration only. Prices, resale values and running costs vary.
      </p>
    </Studio>
  );
}

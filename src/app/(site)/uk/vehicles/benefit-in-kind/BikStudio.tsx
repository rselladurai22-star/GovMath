"use client";

import { BIK_2026, companyCar2026, type BikFuel } from "@/lib/vehicles/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  listPrice: num(40_000, 0, 1_000_000),
  fuel: oneOf<BikFuel>("electric", ["electric", "hybrid", "petrol", "diesel-rde2", "diesel"]),
  co2: num(120, 0, 500),
  range: num(40, 0, 500),
  salary: num(45_000, 0, 10_000_000),
  scotland: bool(false),
  options: num(0, 0, 500_000),
  capital: num(0, 0, 100_000),
  privateUse: num(0, 0, 100_000),
  unavailable: num(0, 0, 365),
  freeFuel: bool(false),
};
const ADVANCED = ["scotland", "options", "capital", "privateUse", "unavailable", "freeFuel"] as const;

const FUEL_LABEL: Record<BikFuel, string> = {
  electric: "Electric",
  hybrid: "Plug-in or other hybrid",
  petrol: "Petrol",
  "diesel-rde2": "Diesel (RDE2)",
  diesel: "Diesel (not RDE2)",
};

export default function BikStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = {
    listPrice: v.listPrice,
    options: v.options,
    fuel: v.fuel,
    co2: v.fuel === "electric" ? 0 : v.co2,
    range: v.range,
    capitalContribution: v.capital,
    privateUsePayment: v.privateUse,
    unavailableDays: v.unavailable,
    freeFuel: v.freeFuel,
    salary: v.salary,
    scotland: v.scotland,
  };
  const r = companyCar2026(base);
  const alts: { label: string; fuel: BikFuel; co2: number; range: number }[] = [
    { label: "Electric", fuel: "electric", co2: 0, range: 0 },
    { label: "Plug-in hybrid, 40-mile range", fuel: "hybrid", co2: 30, range: 45 },
    { label: "Petrol, 120 g/km", fuel: "petrol", co2: 120, range: 0 },
    { label: "Diesel (not RDE2), 120 g/km", fuel: "diesel", co2: 120, range: 0 },
  ];
  const altR = alts.map((a) => ({ ...a, r: companyCar2026({ ...base, fuel: a.fuel, co2: a.co2, range: a.range }) }));
  const maxTax = Math.max(1, ...altR.map((a) => a.r.tax));
  const evYears = Object.entries(BIK_2026.zevByYear).map(([year, pct]) => ({ year, cash: (v.listPrice + v.options - Math.min(5_000, v.capital)) * pct }));

  return (
    <Studio
      title="Your company car"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my company car tax"
      onReset={st.reset}
      dock={{ label: "Tax a month", value: gbp(r.monthly, true) }}
      inputs={
        <>
          <InputGroup title="The car">
            <MoneyField label="List price (P11D value)" value={v.listPrice} onChange={st.bind("listPrice")} hint="Including VAT and delivery, excluding first-year car tax." />
            <SelectField label="Fuel" value={v.fuel} onChange={st.bind("fuel")} options={(Object.keys(FUEL_LABEL) as BikFuel[]).map((k) => ({ value: k, label: FUEL_LABEL[k] }))} />
            {v.fuel !== "electric" && <StepperField label="CO2 emissions" value={v.co2} onChange={(n) => st.set("co2", Math.round(n))} step={1} min={0} max={500} unit="g/km" dp={0} />}
            {v.fuel === "hybrid" && v.co2 <= 50 && <StepperField label="Electric range" value={v.range} onChange={(n) => st.set("range", Math.round(n))} step={1} min={0} max={500} unit="miles" dp={0} hint="Only matters for 1 to 50 g/km." />}
          </InputGroup>
          <InputGroup title="You">
            <MoneyField label="Salary a year" value={v.salary} onChange={st.bind("salary")} hint="Sets the rate of tax you pay on the benefit." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Scottish taxpayer" checked={v.scotland} onChange={st.bind("scotland")} optional />
            <MoneyField label="Options and accessories" value={v.options} onChange={st.bind("options")} optional />
            <MoneyField label="Your capital contribution" value={v.capital} onChange={st.bind("capital")} optional hint="Up to £5,000 comes off the price." />
            <MoneyField label="You pay for private use, a year" value={v.privateUse} onChange={st.bind("privateUse")} optional />
            <StepperField label="Days the car was unavailable" value={v.unavailable} onChange={(n) => st.set("unavailable", Math.round(n))} step={1} min={0} max={365} unit="days" dp={0} optional hint="Only periods of 30 days or more in a row." />
            {v.fuel !== "electric" && <Switch label="Employer pays for private fuel" checked={v.freeFuel} onChange={st.bind("freeFuel")} optional />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Company car tax a year"
        value={gbp(r.tax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            A {FUEL_LABEL[v.fuel].toLowerCase()} car {v.fuel !== "electric" ? <>at {v.co2} g/km </> : null}is taxed at <b>{percent(r.percent, 0)}</b> of its list price, a benefit of <b>{gbp(r.cashEquivalent)}</b>
            {r.fuelBenefit > 0 ? <> plus {gbp(r.fuelBenefit)} for free fuel</> : null}. On your salary that costs <b>{gbp(r.tax)}</b> a year in income tax, about {gbp(r.monthly, true)} a month.
          </>
        }
        badges={[`${percent(r.percent, 0)} rate`, `Taxed at ${percent(r.taxRate, 0)}`, `Employer NI ${gbp(r.employerNi)}`]}
      />

      <Facts
        items={[
          { label: "Benefit in kind rate", value: percent(r.percent, 0) },
          { label: "Taxable benefit", value: gbp(r.taxable) },
          { label: "Tax a year", value: gbp(r.tax) },
          { label: "Tax a month", value: gbp(r.monthly, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Price used", value: `${gbp(r.price)} after options and contributions` },
          { label: "Tax", value: v.scotland ? "Scottish income tax bands" : "England, Wales and Northern Ireland bands" },
          { label: "Collected", value: "Usually through your tax code (P11D or payrolling)" },
        ]}
      />

      <ResultCard title="Compare fuel types" sub={`Same list price of ${gbp(v.listPrice)}, tax a year.`}>
        <Compare
          head={["Car", "Tax a year"]}
          rows={altR.map((a) => ({ label: `${a.label} (${percent(a.r.percent, 0)})`, value: gbp(a.r.tax), bar: a.r.tax / maxTax, current: a.fuel === v.fuel && (a.fuel !== "hybrid" || v.co2 <= 50) }))}
        />
      </ResultCard>

      <ResultCard title="Electric rates are rising" sub="Taxable benefit for an electric car at this price.">
        <Statement columns={["Rate", "Benefit"]} rows={evYears.map((e) => ({ label: e.year, values: [percent(BIK_2026.zevByYear[e.year], 0), gbp(e.cash)] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Cutting the cost.">
        {r.fuelBenefit > 0 && (
          <Callout tone="warn" title="Free fuel is rarely worth it">
            The fuel benefit adds {gbp(r.fuelBenefit)} to your taxable income. Unless you drive a lot of private miles, paying for your own fuel is usually cheaper.
          </Callout>
        )}
        <Callout title="Salary sacrifice">Electric cars through salary sacrifice can cost far less than leasing privately. See the EV salary sacrifice calculator.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. Your P11D or payrolled benefit figure from your employer is the final word.
      </p>
    </Studio>
  );
}

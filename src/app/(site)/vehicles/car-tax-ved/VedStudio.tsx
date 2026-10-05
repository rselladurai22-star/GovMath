"use client";

import { eved, VED_2026, VED_BANDS_2001, ved2026, type VedFuel } from "@/lib/vehicles/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  era: oneOf<"2017" | "2001">("2017", ["2017", "2001"]),
  fuel: oneOf<VedFuel>("petrol", ["petrol", "diesel-rde2", "diesel", "alternative", "electric"]),
  co2: num(120, 0, 500),
  listPrice: num(30_000, 0, 1_000_000),
  zevBefore2025: bool(false),
  miles: num(8_000, 0, 100_000),
};
const ADVANCED = ["zevBefore2025", "miles"] as const;

const FUEL_LABEL: Record<VedFuel, string> = {
  petrol: "Petrol",
  "diesel-rde2": "Diesel (RDE2)",
  diesel: "Diesel (not RDE2)",
  alternative: "Hybrid or other alternative fuel",
  electric: "Electric",
};

export default function VedStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const electric = v.fuel === "electric";
  const r = ved2026({ era: v.era, fuel: v.fuel, co2: electric ? 0 : v.co2, listPrice: v.listPrice, zevBefore2025: v.zevBefore2025 });
  const newCar = v.era === "2017";
  const evedYear = electric ? eved(v.miles, "electric") : v.fuel === "alternative" && v.co2 <= 75 ? eved(v.miles, "plugIn") : 0;
  const compare = [100, 130, 150, 170, 200].map((c) => ({ c, r: ved2026({ era: v.era, fuel: v.fuel === "electric" ? "petrol" : v.fuel, co2: c, listPrice: v.listPrice }) }));
  const maxFirst = Math.max(1, ...compare.map((x) => x.r.firstYear));

  return (
    <Studio
      title="Your car"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my car tax"
      onReset={st.reset}
      dock={{ label: newCar ? "Yearly tax from year 2" : "Yearly tax", value: gbp(r.yearsTwoToSix) }}
      inputs={
        <>
          <InputGroup title="Your car">
            <Segmented
              label="First registered"
              value={v.era}
              onChange={st.bind("era")}
              options={[
                { value: "2017", label: "From April 2017", note: "First-year rate by CO2, then a flat rate." },
                { value: "2001", label: "March 2001 to March 2017", note: "Bands A to M by CO2." },
              ]}
            />
            <SelectField label="Fuel" value={v.fuel} onChange={st.bind("fuel")} options={(Object.keys(FUEL_LABEL) as VedFuel[]).map((k) => ({ value: k, label: FUEL_LABEL[k] }))} />
            {!electric && <StepperField label="CO2 emissions" value={v.co2} onChange={(n) => st.set("co2", Math.round(n))} step={1} min={0} max={500} unit="g/km" dp={0} hint="On your V5C logbook, section V.7." />}
            {newCar && <MoneyField label="List price when new" value={v.listPrice} onChange={st.bind("listPrice")} hint="Including options, before discounts. Not what you paid second-hand." />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {electric && newCar && <Switch label="Registered before 1 April 2025" checked={v.zevBefore2025} onChange={st.bind("zevBefore2025")} optional hint="Electric cars registered before then never pay the expensive car supplement." />}
            <StepperField label="Miles a year" value={v.miles} onChange={(n) => st.set("miles", Math.round(n))} step={500} min={0} max={100_000} unit="miles" dp={0} optional hint="Used for the pay-per-mile charge on electric and plug-in hybrid cars from April 2028." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={newCar ? "Yearly car tax from the second year" : "Yearly car tax"}
        value={gbp(r.yearsTwoToSix)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          newCar ? (
            <>
              A new {FUEL_LABEL[v.fuel].toLowerCase()} car {electric ? "" : <>with {v.co2} g/km of CO2 </>}pays <b>{gbp(r.firstYear)}</b> in the first year, usually included in the price. After that it pays{" "}
              <b>{gbp(r.yearsTwoToSix)}</b> a year{r.supplement > 0 ? <>, including the £{VED_2026.supplement} expensive car supplement for years 2 to 6. From year 7 it falls to {gbp(r.later)}</> : null}.
            </>
          ) : (
            <>
              Your car is in <b>band {r.band}</b> and pays <b>{gbp(r.standard)}</b> a year, or {gbp(r.monthlyDirectDebit, true)} a month by Direct Debit.
            </>
          )
        }
        badges={newCar ? [`First year ${gbp(r.firstYear)}`, r.supplement > 0 ? "Expensive car supplement" : "No supplement", `Six years ${gbp(r.sixYearTotal)}`] : [`Band ${r.band}`]}
      />

      <Facts
        items={
          newCar
            ? [
                { label: "First year", value: gbp(r.firstYear) },
                { label: "Years 2 to 6", value: `${gbp(r.yearsTwoToSix)} a year` },
                { label: "From year 7", value: `${gbp(r.later)} a year` },
                { label: "Monthly Direct Debit", value: gbp(r.monthlyDirectDebit, true) },
              ]
            : [
                { label: "Band", value: r.band ?? "" },
                { label: "12 months", value: gbp(r.standard) },
                { label: "6 months", value: gbp(r.standard * 0.55, true) },
                { label: "Monthly Direct Debit", value: gbp(r.monthlyDirectDebit, true) },
              ]
        }
      />

      <Assumptions
        items={[
          { label: "Rates", value: "From 1 April 2026" },
          { label: "Fuel", value: FUEL_LABEL[v.fuel] },
          ...(newCar ? [{ label: "Supplement", value: electric ? "List price over £50,000, electric cars registered from 1 April 2025" : "List price over £40,000" }] : []),
          { label: "Paying", value: "12 months in one go. Monthly and 6-monthly payments cost 5% and 10% more" },
        ]}
      />

      {newCar && (
        <ResultCard title="First-year rate by emissions" sub={`${FUEL_LABEL[v.fuel === "electric" ? "petrol" : v.fuel]} cars.`}>
          <Compare
            head={["CO2", "First year"]}
            rows={compare.map((x) => ({ label: `${x.c} g/km`, value: gbp(x.r.firstYear), bar: x.r.firstYear / maxFirst, current: !electric && x.c === v.co2 }))}
          />
        </ResultCard>
      )}

      {!newCar && (
        <ResultCard title="Bands A to M" sub="Cars registered 1 March 2001 to 31 March 2017.">
          <Statement columns={["12 months"]} rows={VED_BANDS_2001.map(([b, max, rate], i) => ({ label: `${b}: ${i === 0 ? "up to 100" : max === Infinity ? "over 255" : `${VED_BANDS_2001[i - 1][1] + 1} to ${max}`} g/km`, values: [gbp(rate)] }))} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Changes ahead.">
        {evedYear > 0 && (
          <Callout tone="warn" title="Pay-per-mile charge from April 2028">
            Electric cars are due to pay 3p a mile and plug-in hybrids 1.5p a mile on top of car tax from April 2028. At {v.miles.toLocaleString("en-GB")} miles a year that would be about <b>{gbp(evedYear)}</b> a year.
          </Callout>
        )}
        <Callout title="Selling or scrapping?">You get a refund for full months left when you sell, scrap or SORN a car. Tax does not pass to the new keeper.</Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Check your exact rate on GOV.UK using your registration number.
      </p>
    </Studio>
  );
}

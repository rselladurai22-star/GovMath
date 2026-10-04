"use client";

import { commuteCosts, cycleToWork, PRICES_2026 } from "@/lib/vehicles/running";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  miles: num(12, 0, 200),
  days: num(5, 0, 7),
  weeks: num(46, 0, 52),
  mpg: num(45, 1, 200),
  fuelPrice: num(PRICES_2026.petrol, 0, 1_000),
  parking: num(6, 0, 200),
  season: num(2_400, 0, 50_000),
  dailyRail: num(14, 0, 500),
  bus: num(3, 0, 50),
  wear: num(12, 0, 100),
  zone: num(0, 0, 100),
  bikeYearly: num(150, 0, 5_000),
};
const ADVANCED = ["weeks", "wear", "zone", "bikeYearly", "dailyRail"] as const;

export default function CommuteStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = commuteCosts({
    oneWayMiles: v.miles,
    daysPerWeek: v.days,
    weeks: v.weeks,
    mpg: v.mpg,
    fuelPrice: v.fuelPrice,
    parkingPerDay: v.parking,
    wearPence: v.wear,
    zonePerDay: v.zone,
    seasonTicket: v.season,
    dailyRail: v.dailyRail,
    busSingle: v.bus,
    bikeYearly: v.bikeYearly,
  });
  const opts = r.options.filter((o) => o.available);
  const cheapest = opts.reduce((a, b) => (b.yearly < a.yearly ? b : a), opts[0]);
  const car = r.options[0];
  const maxY = Math.max(1, ...opts.map((o) => o.yearly));
  const c2w = cycleToWork(1_000, 0.2, 0.08);

  return (
    <Studio
      title="Your commute"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Compare my commute"
      onReset={st.reset}
      dock={{ label: "Cheapest", value: `${cheapest.label}, ${gbp(cheapest.yearly)}` }}
      inputs={
        <>
          <InputGroup title="Your journey">
            <StepperField label="Distance one way" value={v.miles} onChange={st.bind("miles")} step={1} min={0} max={200} unit="miles" dp={0} />
            <StepperField label="Days a week" value={v.days} onChange={(n) => st.set("days", Math.round(n))} step={1} min={0} max={7} unit="days" dp={0} />
          </InputGroup>
          <InputGroup title="By car">
            <StepperField label="Fuel economy" value={v.mpg} onChange={st.bind("mpg")} step={1} min={1} max={200} unit="mpg" dp={0} />
            <StepperField label="Fuel price" value={v.fuelPrice} onChange={st.bind("fuelPrice")} step={0.5} min={0} max={1_000} unit="p/litre" dp={1} />
            <MoneyField label="Parking a day" value={v.parking} onChange={st.bind("parking")} />
          </InputGroup>
          <InputGroup title="By public transport">
            <MoneyField label="Annual rail season ticket" value={v.season} onChange={st.bind("season")} hint="0 if you would pay daily fares." />
            <MoneyField label="Bus fare each way" value={v.bus} onChange={st.bind("bus")} hint="Capped at £3 in England outside London until December 2026, then £2." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks a year" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional hint="Allow for holidays and working from home." />
            <MoneyField label="Daily return rail fare" value={v.dailyRail} onChange={st.bind("dailyRail")} optional hint="Used if cheaper than the season ticket, or if you have none." />
            <StepperField label="Car wear, tyres and servicing" value={v.wear} onChange={st.bind("wear")} step={1} min={0} max={100} unit="p/mile" dp={0} optional />
            <MoneyField label="Zone or congestion charge a day" value={v.zone} onChange={st.bind("zone")} optional />
            <MoneyField label="Bike and kit, a year" value={v.bikeYearly} onChange={st.bind("bikeYearly")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Cheapest way to commute"
        value={`${cheapest.label}: ${gbp(cheapest.yearly)} a year`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Over {r.days} commuting days and {r.miles.toLocaleString("en-GB")} miles a year, driving costs <b>{gbp(car.yearly)}</b>, or {gbp(car.perDay, true)} a day, including fuel, parking and wear.
            {cheapest.key !== "car" ? (
              <>
                {" "}
                The {cheapest.label.toLowerCase()} is <b>{gbp(car.yearly - cheapest.yearly)}</b> a year cheaper.
              </>
            ) : null}
          </>
        }
        badges={opts.map((o) => `${o.label} ${gbp(o.perDay, true)}/day`)}
      />

      <Facts items={opts.map((o) => ({ label: o.label, value: gbp(o.yearly), tone: o.key === cheapest.key ? ("good" as const) : undefined }))} />

      <Assumptions
        items={[
          { label: "Days", value: `${Math.round(v.days)} a week for ${Math.round(v.weeks)} weeks` },
          { label: "Car", value: "Fuel, parking, wear and any zone charge; not insurance, tax or depreciation" },
          { label: "Train", value: v.season > 0 ? "Season ticket or daily fares, whichever is cheaper" : "Daily return fares" },
          { label: "Bike", value: v.miles <= 15 ? "Included" : "Not shown over 15 miles each way" },
        ]}
      />

      <ResultCard title="A year of commuting" sub="Each option.">
        <Compare head={["Option", "A year"]} rows={opts.map((o) => ({ label: o.label, value: gbp(o.yearly), bar: o.yearly / maxY, current: o.key === cheapest.key }))} />
      </ResultCard>

      <ResultCard title="What driving costs" sub="Yearly breakdown.">
        <SplitBar
          segments={[
            { label: "Fuel", value: r.carParts.fuel, display: gbp(r.carParts.fuel), color: "#4353ff" },
            { label: "Parking", value: r.carParts.parking, display: gbp(r.carParts.parking), color: "#94a3b8" },
            { label: "Wear", value: r.carParts.wear, display: gbp(r.carParts.wear), color: "#f59e0b" },
            ...(r.carParts.zone > 0 ? [{ label: "Zone charges", value: r.carParts.zone, display: gbp(r.carParts.zone), color: "#ef4444" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Ways to save.">
        <Callout title="Cycle to Work">A £1,000 bike through the Cycle to Work scheme costs a basic-rate taxpayer about {gbp(c2w.cost)}, saving {gbp(c2w.saving)} in tax and National Insurance.</Callout>
        <Callout title="Rail fares frozen">Regulated rail fares in England, including most season tickets, are frozen until March 2027.</Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Estimate only. Check exact fares with National Rail and your bus operator.
      </p>
    </Studio>
  );
}

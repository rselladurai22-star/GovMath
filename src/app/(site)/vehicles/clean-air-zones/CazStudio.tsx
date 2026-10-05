"use client";

import { LONDON_CC, lezPenalties, zoneCompliant, zoneCost, ZONES_2026, type ZoneVehicle } from "@/lib/vehicles/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

type Fuel = "petrol" | "diesel" | "hybrid" | "electric";

const SCHEMA = {
  zone: oneOf("london-ulez", ZONES_2026.map((z) => z.key) as [string, ...string[]]),
  vehicle: oneOf<ZoneVehicle>("car", ["car", "van", "motorbike"]),
  fuel: oneOf<Fuel>("diesel", ["petrol", "diesel", "hybrid", "electric"]),
  year: num(2014, 1950, 2026),
  days: num(5, 0, 7),
  weeks: num(46, 0, 52),
  compliance: oneOf<"auto" | "yes" | "no">("auto", ["auto", "yes", "no"]),
  congestion: bool(false),
};
const ADVANCED = ["weeks", "compliance", "congestion"] as const;

export default function CazStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const zone = ZONES_2026.find((z) => z.key === v.zone) ?? ZONES_2026[0];
  const auto = zoneCompliant(v.fuel, Math.round(v.year));
  const compliant = v.compliance === "auto" ? auto : v.compliance === "yes";
  const base = { zone: v.zone, vehicle: v.vehicle, compliant, daysPerWeek: Math.round(v.days), weeks: Math.round(v.weeks), congestion: v.congestion, electric: v.fuel === "electric" };
  const r = zoneCost(base);
  const london = zone.key === "london-ulez";
  const penalty = zone.kind === "penalty";
  const others = ZONES_2026.map((z) => ({ z, r: zoneCost({ ...base, zone: z.key, congestion: false }) }));
  const maxYear = Math.max(1, ...others.map((o) => o.r.yearly));
  const firstPenalties = lezPenalties(5);

  return (
    <Studio
      title="Your journeys"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my vehicle"
      onReset={st.reset}
      dock={{ label: penalty ? "Penalties a year" : "Charges a year", value: gbp(r.yearly) }}
      inputs={
        <>
          <InputGroup title="Where">
            <SelectField label="Zone" value={v.zone} onChange={st.bind("zone")} options={ZONES_2026.map((z) => ({ value: z.key, label: z.name }))} />
            <StepperField label="Days a week in the zone" value={v.days} onChange={(n) => st.set("days", Math.round(n))} step={1} min={0} max={7} unit="days" dp={0} />
          </InputGroup>
          <InputGroup title="Your vehicle">
            <Segmented
              label="Vehicle"
              value={v.vehicle}
              onChange={st.bind("vehicle")}
              options={[
                { value: "car", label: "Car" },
                { value: "van", label: "Van" },
                { value: "motorbike", label: "Motorbike" },
              ]}
            />
            <SelectField
              label="Fuel"
              value={v.fuel}
              onChange={st.bind("fuel")}
              options={[
                { value: "petrol", label: "Petrol" },
                { value: "diesel", label: "Diesel" },
                { value: "hybrid", label: "Petrol hybrid" },
                { value: "electric", label: "Electric" },
              ]}
            />
            {v.fuel !== "electric" && <StepperField label="Year first registered" value={v.year} onChange={(n) => st.set("year", Math.round(n))} step={1} min={1950} max={2026} unit="" dp={0} />}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Weeks a year" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional hint="46 allows for holidays and bank holidays." />
            <SelectField
              label="Does it meet the standard?"
              value={v.compliance}
              onChange={st.bind("compliance")}
              optional
              options={[
                { value: "auto", label: "Work it out from the year" },
                { value: "yes", label: "Yes, the checker says it is compliant" },
                { value: "no", label: "No, the checker says it is not" },
              ]}
            />
            {london && <Switch label="Also driving in the central congestion charge zone" checked={v.congestion} onChange={st.bind("congestion")} optional hint={`£${LONDON_CC.daily} a day, ${LONDON_CC.hours}.`} />}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={penalty ? "Penalties if you drive in a year" : "Zone charges a year"}
        value={gbp(r.yearly)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !r.charged ? (
            <>
              {compliant ? "Your vehicle meets the emissions standard" : `${zone.name} does not charge this type of vehicle`}, so you pay nothing{london && v.congestion ? " for the ULEZ" : ""} in {zone.name}.
            </>
          ) : penalty ? (
            <>
              Your vehicle does not meet the standard. Driving in a Scottish low emission zone is not allowed: each entry gets a penalty starting at <b>£60</b> and doubling for repeat entries
              within 90 days, up to £480. {r.days} entries in a year could cost <b>{gbp(r.yearly)}</b>.
            </>
          ) : (
            <>
              {compliant ? null : <>Your vehicle does not meet the standard, so it pays <b>{gbp(r.daily, true)}</b> a day. </>}
              {r.congestionDaily > 0 ? <>The congestion charge adds {gbp(r.congestionDaily, true)} a day. </> : null}
              Over {r.days} days a year, that is <b>{gbp(r.yearly)}</b>.
            </>
          )
        }
        badges={[compliant ? "Compliant" : "Not compliant", `${zone.hours}`]}
      />

      <Facts
        items={[
          { label: "Daily charge", value: penalty ? "Penalty" : gbp(r.daily, true) },
          { label: "Congestion charge", value: london && v.congestion ? gbp(r.congestionDaily, true) : "n/a" },
          { label: "Days a year", value: `${r.days}` },
          { label: "A year", value: gbp(r.yearly) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Standard", value: "Euro 4 petrol (usually 2006 on), Euro 6 diesel (usually September 2015 on)" },
          { label: "Compliance", value: v.compliance === "auto" ? `Estimated from ${v.fuel === "electric" ? "fuel" : Math.round(v.year)}: ${auto ? "compliant" : "not compliant"}` : compliant ? "Compliant, as entered" : "Not compliant, as entered" },
          { label: "Zone", value: zone.notes },
          { label: "Charges", value: "2026 rates" },
        ]}
      />

      <ResultCard title="The same driving in other zones" sub="Yearly cost for your vehicle.">
        <Compare
          head={["Zone", "A year"]}
          rows={others.map((o) => ({ label: o.z.name, value: o.r.charged ? gbp(o.r.yearly) : "£0", bar: o.r.yearly / maxYear, current: o.z.key === v.zone }))}
        />
      </ResultCard>

      {penalty && (
        <ResultCard title="How Scottish penalties build up" sub="Repeat entries within 90 days.">
          <Compare head={["Entry", "Penalty"]} rows={firstPenalties.map((p, i) => ({ label: `Entry ${i + 1}`, value: gbp(p), bar: p / 480 }))} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Before you drive in.">
        <Callout title="Check your exact vehicle">The standard depends on the Euro rating, not the year. Use the official GOV.UK, TfL or Scottish checker with your registration.</Callout>
        {!compliant && r.charged && (
          <Callout tone="warn" title="Pay on time">
            Charges must be paid by midnight on the sixth day after you drive in (in London, by midnight on the third day after). Missing it means a penalty charge notice of up to £180 in London or £120 elsewhere.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Charges as published for 2026. Some vehicles and residents get exemptions or discounts.
      </p>
    </Studio>
  );
}

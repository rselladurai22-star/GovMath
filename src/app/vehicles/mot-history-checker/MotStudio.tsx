"use client";

import { useSyncExternalStore } from "react";
import { MOT, motCheckUrl, motDates, normaliseReg, validReg } from "@/lib/vehicles/rules";
import { formatDate } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, Switch, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, date, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  reg: text("", 10),
  firstReg: date("2023-05-15"),
  expiry: date(""),
  ni: bool(false),
};
const ADVANCED = ["ni"] as const;

const noop = () => () => {};
const todayIso = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
};

const RESULTS = [
  ["Pass", "The vehicle met the minimum standards on the day of the test."],
  ["Pass with advisories", "Things to watch or fix soon, such as tyres near the limit."],
  ["Pass with minor defects", "Small problems that should be repaired as soon as possible."],
  ["Fail: major defect", "Must be repaired before the car can pass. You may still drive it if the old MOT is valid and it is roadworthy."],
  ["Fail: dangerous defect", "Do not drive it until repaired. Fines of up to £2,500, a driving ban and 3 penalty points are possible."],
];

export default function MotStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useSyncExternalStore(noop, todayIso, () => "2026-10-04");
  const r = motDates({ firstReg: v.firstReg, expiry: v.expiry || undefined, northernIreland: v.ni, today });
  const plateOk = v.reg.length > 0 && validReg(v.reg);

  return (
    <Studio
      title="Your vehicle"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my MOT date"
      onReset={st.reset}
      dock={{ label: r.overdue ? "MOT overdue since" : "MOT due", value: formatDate(r.due, "medium") }}
      inputs={
        <>
          <InputGroup title="Your vehicle">
            <TextField label="Number plate" value={v.reg} onChange={st.bind("reg")} placeholder="AB12 CDE" uppercase maxLength={10} hint="Optional. Used to link to the official MOT history." />
            <DateField label="Date first registered" value={v.firstReg} onChange={st.bind("firstReg")} min="1900-01-01" max="2026-12-31" hint="On the V5C logbook." />
            <DateField label="Current MOT expiry" value={v.expiry} onChange={st.bind("expiry")} min="2000-01-01" max="2040-12-31" hint="Leave blank if it has never had an MOT." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Registered in Northern Ireland" checked={v.ni} onChange={st.bind("ni")} optional hint="The first MOT is at 4 years there." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.overdue ? "MOT overdue since" : r.needsFirst ? "First MOT due" : "MOT due"}
        value={formatDate(r.due)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.historic ? (
            <>This vehicle is over {MOT.historicYears} years old, so it is usually exempt from the MOT if it has not been substantially changed. You must still keep it roadworthy.</>
          ) : r.overdue ? (
            <>
              The MOT ran out on <b>{formatDate(r.due)}</b>. You must not drive it except to a pre-booked MOT or for repairs. Driving without a valid MOT can lead to a fine of up to {gbp(MOT.fine)}.
            </>
          ) : (
            <>
              {r.needsFirst ? <>The first MOT is due on the {v.ni ? "fourth" : "third"} anniversary of registration, </> : <>The current MOT runs out on </>}
              <b>{formatDate(r.due)}</b>. You can have it tested from <b>{formatDate(r.earliest)}</b> and keep the same renewal date.
              {r.daysToDue >= 0 ? <> That is {r.daysToDue.toLocaleString("en-GB")} days away.</> : null}
            </>
          )
        }
        badges={[`${r.ageYears} years old`, r.historic ? "Usually exempt" : `Max fee ${gbp(MOT.carFee, true)}`, plateOk ? normaliseReg(v.reg) : "No plate entered"]}
      />

      <Facts
        items={[
          { label: "MOT due", value: formatDate(r.due, "medium") },
          { label: "Earliest test keeping the date", value: formatDate(r.earliest, "medium") },
          { label: "First MOT was due", value: formatDate(r.firstDue, "medium") },
          { label: "Maximum fee (car)", value: gbp(MOT.carFee, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "First MOT", value: v.ni ? "4 years after registration (Northern Ireland)" : "3 years after registration (Great Britain)" },
          { label: "Early test", value: "Up to a month minus a day before expiry keeps the same date" },
          { label: "Historic", value: `Vehicles over ${MOT.historicYears} years old are usually exempt` },
        ]}
      />

      <ResultCard title="Check the official history" sub="Free from DVSA.">
        {plateOk ? (
          <p>
            <a href={motCheckUrl(v.reg)} target="_blank" rel="noopener noreferrer">
              View the MOT history for {normaliseReg(v.reg)} on GOV.UK
            </a>
            . It shows every test, the mileage recorded, and any failures or advisories.
          </p>
        ) : (
          <p className="footnote">Enter a number plate to get a direct link to its MOT history on GOV.UK.</p>
        )}
      </ResultCard>

      <ResultCard title="What the results mean" sub="MOT outcomes.">
        <Statement columns={["Meaning"]} rows={RESULTS.map(([k, m]) => ({ label: k, values: [m] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Avoid a fail.">
        <Callout title="Free reminders">Sign up on GOV.UK for a free text or email reminder a month before your MOT is due.</Callout>
        <Callout title="Quick checks">Lights, tyres, wipers, washer fluid and number plates cause many failures and are easy to check yourself first.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Check the exact due date on GOV.UK. Some vehicles, such as taxis, have different rules.
      </p>
    </Studio>
  );
}

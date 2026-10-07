"use client";

import { useSyncExternalStore } from "react";
import { licenceRenewal } from "@/lib/vehicles/rules";
import { formatDate } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { date, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { per } from "@/components/flagship/format";

const SCHEMA = {
  dob: date("1956-03-10"),
  photocard: date(""),
};
const ADVANCED = ["photocard"] as const;

const noop = () => () => {};
const todayIso = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
};

export default function LicenceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useSyncExternalStore(noop, todayIso, () => "2026-10-04");
  const r = licenceRenewal(v.dob, today, v.photocard || undefined);
  const due = r.daysToNext <= 90;
  const upcoming = r.schedule.filter((x) => x.date >= today).slice(0, 6);

  return (
    <Studio
      title="Your licence"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my renewal date"
      onReset={st.reset}
      dock={{ label: "Renew by", value: formatDate(r.next, "medium") }}
      inputs={
        <>
          <InputGroup title="You">
            <DateField label="Date of birth" value={v.dob} onChange={st.bind("dob")} min="1920-01-01" max="2010-12-31" />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <DateField label="Photocard expiry date" value={v.photocard} onChange={st.bind("photocard")} optional min="2020-01-01" max="2040-12-31" hint="Section 4b on the front. Under 70, the photo must be renewed every 10 years." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={r.over70 ? "Your next renewal" : r.nextAge >= 70 ? "Renew at 70 on" : "Renew your photocard by"}
        value={formatDate(r.next)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {r.nextAge >= 70 ? (
              <>
                Your licence runs out when you turn <b>{r.nextAge}</b>, on <b>{formatDate(r.next)}</b>.
              </>
            ) : (
              <>
                Your photocard runs out on <b>{formatDate(r.next)}</b>, before you turn 70.
              </>
            )}{" "}
            You can renew from <b>{formatDate(r.applyFrom)}</b>, 90 days before. Renewing at 70 and over is free, online or by post.
            {r.daysToNext >= 0 ? <> That is {r.daysToNext.toLocaleString("en-GB")} {per(r.daysToNext.toLocaleString("en-GB"), "days")} from today.</> : null}
          </>
        }
        badges={[`Age ${r.age}`, r.over70 ? "Renew every 3 years" : "Renew at 70", "Free at 70 and over"]}
      />

      <Facts
        items={[
          { label: "Your age", value: `${r.age}` },
          { label: "Renew by", value: formatDate(r.next, "medium") },
          { label: "Apply from", value: formatDate(r.applyFrom, "medium") },
          { label: "Cost", value: r.nextAge >= 70 ? "Free" : "£14 online" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rule", value: "Car licences expire at 70 and every 3 years after" },
          { label: "Applying", value: "Up to 90 days before; DVLA sends a reminder" },
          { label: "Lorries and buses", value: "Different rules: renewal every 5 years from 45 with a medical" },
        ]}
      />

      <ResultCard title="Your renewal dates" sub="Every 3 years from 70.">
        <Statement columns={["Renew by"]} rows={upcoming.map((x) => ({ label: `Age ${x.age}`, values: [formatDate(x.date, "medium")] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="When you renew.">
        {due && <Callout tone="good" title="You can renew now">You are within 90 days of the renewal date, so you can apply today on GOV.UK.</Callout>}
        <Callout title="Eyesight and health">You must be able to read a number plate from 20 metres, and tell the DVLA about any medical condition that affects your driving. The government has consulted on making eye tests compulsory for drivers over 70 at each renewal.</Callout>
        <Callout tone="warn" title="Do not miss the date">Driving with an expired licence can lead to a fine of up to £1,000 and may invalidate your insurance.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Renew only on GOV.UK. Other websites charge for what is free.
      </p>
    </Studio>
  );
}

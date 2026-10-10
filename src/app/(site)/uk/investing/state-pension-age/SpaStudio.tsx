"use client";

import { useSyncExternalStore } from "react";
import { deferral, newStatePension, STATE_PENSION, statePensionAge2026 } from "@/lib/investing/retirement";
import { dateDiff, formatDate } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  dob: date("1980-06-15"),
  years: num(35, 0, 50),
  defer: num(0, 0, 520),
};
const ADVANCED = ["years", "defer"] as const;

const noop = () => () => {};
const todayIso = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
};

const BAND_TEXT = {
  "before-1960": "People born before 6 April 1960 have already reached State Pension age.",
  "66-67": "Your State Pension age is between 66 and 67, under the Pensions Act 2014.",
  "67": "Your State Pension age is 67. The rise from 66 to 67 happens between 2026 and 2028.",
  "67-68": "Your State Pension age falls on a fixed date as it rises from 67 to 68 between 2044 and 2046.",
  "68": "Your State Pension age is 68, under the Pensions Act 2007.",
} as const;

export default function SpaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useSyncExternalStore(noop, todayIso, () => null);
  const r = statePensionAge2026(v.dob, today ?? undefined);
  // Before 6 October 1954, State Pension age was below 66 and depended on sex and date of birth.
  const older = v.dob < "1954-10-06";
  const until = today && !r.already ? dateDiff(today, r.date) : null;
  const sp = newStatePension(v.years);
  const d = deferral(sp.weekly, Math.round(v.defer));
  const scenarios = [0, 52, 104, 260].map((w) => ({ w, r: deferral(sp.weekly, w) }));
  const maxW = Math.max(1, ...scenarios.map((x) => x.r.weekly));

  return (
    <Studio
      title="Your State Pension"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my State Pension age"
      onReset={st.reset}
      dock={{ label: "State Pension age", value: older ? "Already reached" : formatDate(r.date, "medium") }}
      inputs={
        <>
          <InputGroup title="You">
            <DateField label="Date of birth" value={v.dob} onChange={st.bind("dob")} min="1930-01-01" max="2010-12-31" />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label="Qualifying years of National Insurance by State Pension age"
              value={v.years}
              onChange={(n) => st.set("years", Math.round(n))}
              step={1}
              min={0}
              max={50}
              unit="years"
              dp={0}
              optional
              hint="35 for the full new State Pension, 10 for any."
            />
            <StepperField label="Weeks you put off claiming" value={v.defer} onChange={(n) => st.set("defer", Math.round(n))} step={1} min={0} max={520} unit="weeks" dp={0} optional hint="At least 9 weeks. Each 9 weeks adds 1%, just under 5.8% a year." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="You reach State Pension age on"
        value={older ? "Already reached" : formatDate(r.date)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          older ? (
            <>You reached State Pension age before 2020. For people born before 6 October 1954, it depended on sex and date of birth, and was between 60 and 66.</>
          ) : (
            <>
              Born on {formatDate(v.dob)}, you reach State Pension age at <b>{r.ageText}</b>, on <b>{formatDate(r.date)}</b>.{" "}
              {until ? (
                <>
                  That is{" "}
                  <b>
                    {until.years} {until.years === 1 ? "year" : "years"}, {until.months} {until.months === 1 ? "month" : "months"} and {until.monthDays} {until.monthDays === 1 ? "day" : "days"}
                  </b>{" "}
                  from today.
                </>
              ) : r.already ? (
                <>You have already reached it.</>
              ) : null}
            </>
          )
        }
        badges={older ? [] : [`Age ${r.ageText}`, r.band === "67-68" ? "Fixed date" : "On your birthday or monthly date"]}
      />

      <Facts
        items={[
          { label: "State Pension age", value: older ? "Below 66" : r.ageText },
          { label: "Weekly State Pension", value: sp.eligible ? gbp(sp.weekly, true) : "£0" },
          { label: "A year", value: gbp(sp.annual) },
          { label: "With deferral", value: d.extra > 0 ? `${gbp(d.weekly, true)} a week` : "Not deferred" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rules", value: "Current law (Pensions Acts 1995 to 2014). A third review is under way" },
          { label: "Amount", value: `New State Pension, ${gbp(STATE_PENSION.newWeekly, true)} a week in 2026/27, in today's money` },
          { label: "Record", value: `${v.years} qualifying years, no contracted-out deduction` },
        ]}
        note={!older ? BAND_TEXT[r.band] : undefined}
      />

      <ResultCard title="If you put off claiming" sub="Weekly State Pension in today's money.">
        <Compare
          head={["Deferred for", "A week"]}
          rows={scenarios.map((x) => ({
            label: x.w === 0 ? "Claim on time" : `${x.w / 52} ${x.w === 52 ? "year" : "years"}`,
            value: gbp(x.r.weekly, true),
            bar: x.r.weekly / maxW,
            current: x.w === Math.round(v.defer),
            delta: x.r.extra > 0 ? `+${gbp(x.r.extra, true)}` : undefined,
            deltaTone: "down",
          }))}
        />
        {d.extra > 0 && (
          <Callout title="When deferring pays off">
            Deferring {Math.round(v.defer)} {per(Math.round(v.defer), "weeks")} gives up {gbp(sp.weekly * Math.round(v.defer))} of pension but adds {gbp(d.extra, true)} a week. It takes about{" "}
            <b>{d.breakEvenYears.toFixed(1)} {per(d.breakEvenYears.toFixed(1), "years")}</b> of the higher pension to catch up, ignoring tax and future rises.
          </Callout>
        )}
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Planning ahead.">
        {!sp.eligible && (
          <Callout tone="warn" title="You need at least 10 qualifying years">
            With fewer than 10 years, you get no new State Pension. You may be able to fill gaps with voluntary National Insurance contributions.
          </Callout>
        )}
        {sp.eligible && v.years < STATE_PENSION.qualifyingYears && (
          <Callout title="Filling gaps">
            Each extra qualifying year adds about {gbp(STATE_PENSION.newWeekly / STATE_PENSION.qualifyingYears, true)} a week ({gbp((STATE_PENSION.newWeekly / STATE_PENSION.qualifyingYears) * 52)} a year). Voluntary Class 3
            contributions cost £18.40 a week (£956.80 for a full year) in 2026/27.
          </Callout>
        )}
        <Callout title="Check your forecast">Your official forecast on GOV.UK shows your amount, including any effect of being contracted out before 2016.</Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Based on current law. State Pension age may change. Not financial advice.
      </p>
    </Studio>
  );
}

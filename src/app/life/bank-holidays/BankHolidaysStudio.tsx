"use client";

import { useSyncExternalStore } from "react";
import { bankHolidays, countDays, dateDiff, formatDate, leavePlans, NATION_LABEL, type Nation } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const YEARS = ["2025", "2026", "2027", "2028", "2029", "2030"] as const;

const SCHEMA = {
  nation: oneOf<Nation>("england-and-wales", ["england-and-wales", "scotland", "northern-ireland"]),
  year: oneOf<(typeof YEARS)[number]>("2027", YEARS),
  leave: num(4, 1, 9),
};
const ADVANCED = ["leave"] as const;

const long = (iso: string) => formatDate(iso, "long");
const noop = () => () => {};
const todayIso = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
};
const short = (iso: string) => formatDate(iso, "short");

export default function BankHolidaysStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  // Today's date on the client only, so the server render does not depend on the clock.
  const today = useSyncExternalStore(noop, todayIso, () => null);
  const year = Number(v.year);
  const list = bankHolidays(year, v.nation);
  const allYears = today ? [Number(today.slice(0, 4)), Number(today.slice(0, 4)) + 1].flatMap((y) => bankHolidays(y, v.nation)) : [];
  const next = today ? allYears.find((h) => h.date >= today) : undefined;
  const daysToNext = today && next ? dateDiff(today, next.date).days : 0;
  const yearCount = countDays(`${year}-01-01`, `${year}-12-31`, v.nation);
  const plans = leavePlans(year, v.nation, v.leave).slice(0, 6);
  const maxOff = Math.max(1, ...plans.map((p) => p.daysOff));

  return (
    <Studio
      title="Year and nation"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See bank holidays"
      onReset={st.reset}
      dock={{ label: `${year} bank holidays`, value: String(list.length) }}
      inputs={
        <>
          <InputGroup title="Which bank holidays">
            <SelectField
              label="Nation"
              value={v.nation}
              onChange={st.bind("nation")}
              options={[
                { value: "england-and-wales", label: "England and Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "northern-ireland", label: "Northern Ireland" },
              ]}
            />
            <SelectField label="Year" value={v.year} onChange={st.bind("year")} options={YEARS.map((y) => ({ value: y, label: y }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Most days of annual leave to use per break" value={v.leave} onChange={(n) => st.set("leave", Math.round(n))} step={1} min={1} max={9} unit="days" dp={0} optional hint="For the leave planner." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={next ? "Next bank holiday" : `Bank holidays in ${year}`}
        value={next ? `${daysToNext === 0 ? "Today" : `${daysToNext} ${daysToNext === 1 ? "day" : "days"}`}` : String(list.length)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {next ? (
              <>
                The next bank holiday in {NATION_LABEL[v.nation]} is <b>{next.name}</b> on <b>{long(next.date)}</b>.{" "}
              </>
            ) : null}
            There are <b>{list.length}</b> bank holidays in {NATION_LABEL[v.nation]} in {year}, leaving <b>{yearCount.working}</b> working days in the year.
          </>
        }
        badges={[NATION_LABEL[v.nation], `${list.length} in ${year}`, `${yearCount.working} working days`]}
      />

      <Facts
        items={[
          { label: "Bank holidays", value: String(list.length) },
          { label: "Weekend days", value: String(yearCount.weekends) },
          { label: "Working days", value: String(yearCount.working) },
          { label: "Substitute days", value: String(list.filter((h) => h.name.includes("substitute")).length) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Source", value: "GOV.UK rules and announced one-off days" },
          { label: "Weekends", value: "Saturday and Sunday" },
          { label: "Future years", value: "Worked out from the usual rules" },
          { label: "Working days", value: "Monday to Friday, less bank holidays" },
        ]}
      />

      <ResultCard title={`Bank holidays in ${year}`} sub={NATION_LABEL[v.nation]}>
        <Statement columns={["Date"]} rows={list.map((h) => ({ label: h.name, values: [short(h.date)] }))} />
      </ResultCard>

      {plans.length > 0 && (
        <ResultCard title="Make the most of your leave" sub={`The longest breaks for up to ${v.leave} days of annual leave each.`}>
          <Compare
            head={["Break", "Days off"]}
            rows={plans.map((p) => ({
              label: `${short(p.from)} to ${short(p.to)}`,
              value: `${p.daysOff} days`,
              delta: `${p.leaveDays} leave`,
              bar: p.daysOff / maxOff,
            }))}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Bank holidays and your rights.">
        <Callout title="No legal right to the day off">
          There is no statutory right to time off on a bank holiday. Many employers give it, often as part of the 5.6 weeks of paid holiday, but your contract decides.
        </Callout>
        <Callout title="Substitute days">
          When a bank holiday falls on a weekend, the next weekday becomes a substitute bank holiday, so you do not lose it.
        </Callout>
        {year >= 2028 && (
          <Callout tone="warn" title="Check nearer the time">
            Dates for {year} follow the usual rules. The government can add or move bank holidays, so check GOV.UK before booking.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Dates follow GOV.UK. Future years may change.
      </p>
    </Studio>
  );
}

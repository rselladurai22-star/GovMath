"use client";

import type { ReactNode } from "react";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, SelectField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { whole } from "@/components/flagship/format";
import { date, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";
import { useNowSeconds, useToday } from "@/components/flagship/useToday";
import { addDays, formatDate, NATION_LABEL, type Nation } from "@/lib/life/calendar";
import { countdown, daysFrom, isIsoDate, isLeapYear, presetDate, splitSeconds, weekdayName, type DayRule, type Preset } from "@/lib/life/dates";

type Hols = Nation | "none";
const HOLS: Hols[] = ["england-and-wales", "scotland", "northern-ireland", "none"];
const PRESETS: Preset[] = ["christmas", "newyear", "easter", "bankholiday", "custom"];
const PRESET_LABEL: Record<Preset, string> = {
  christmas: "Christmas",
  newyear: "New Year",
  easter: "Easter Sunday",
  bankholiday: "The next UK bank holiday",
  custom: "A date I choose",
};
/** With no date chosen (or shared), the example is this many days after the visitor's today. */
const EXAMPLE_DAYS_AHEAD = 100;

const SCHEMA = {
  event: oneOf<Preset>("christmas", PRESETS),
  // "" means a date worked out from the visitor's today in the browser, so the default never goes stale.
  target: date(""),
  name: text("", 40),
  hols: oneOf<Hols>("england-and-wales", HOLS),
};
const ADVANCED = ["hols"] as const;

const medium = (iso: string) => formatDate(iso, "medium");
const long = (iso: string) => formatDate(iso, "long");
const plural = (n: number, word: string) => `${whole(n)} ${word}${n === 1 ? "" : "s"}`;
const pad = (n: number) => String(n).padStart(2, "0");
const MAX_DAYS = 36_525;

/** Days, hours, minutes and seconds to local midnight at the start of the target day. Only this part re-renders each second. */
function LiveTicker({ target }: { target: string }) {
  const now = useNowSeconds();
  const [y, m, d] = target.split("-").map(Number);
  const live = now === null ? null : splitSeconds(Math.floor(new Date(y, m - 1, d).getTime() / 1_000) - now);
  return (
    <p className="gm-countdown" aria-live="off" style={{ fontSize: "1.6rem", fontWeight: 700, margin: "8px 0", fontVariantNumeric: "tabular-nums" }}>
      {live ? `${whole(live.d)} days ${pad(live.h)}h ${pad(live.m)}m ${pad(live.s)}s` : "…"}
    </p>
  );
}

export default function CountdownStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  const custom = v.event === "custom";
  const nation: Nation = v.hols === "none" ? "england-and-wales" : v.hols;
  const rule: DayRule = v.hols === "none" ? { kind: "weekdays" } : { kind: "uk", nation };
  const customDate = v.target || (today ? addDays(today, EXAMPLE_DAYS_AHEAD) : null);

  const inputs = (
    <>
      <InputGroup title="Count down to">
        <SelectField label="Count down to" value={v.event} onChange={st.bind("event")} options={PRESETS.map((p) => ({ value: p, label: PRESET_LABEL[p] }))} />
        {custom && (
          <>
            <DateField label="Date" value={customDate ?? ""} onChange={st.bind("target")} hint="A holiday, a wedding, a due date, a deadline or a birthday." />
            <TextField label="What is happening?" value={v.name} onChange={st.bind("name")} placeholder="My holiday" maxLength={40} optional />
          </>
        )}
      </InputGroup>
      <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
        <SelectField
          label="Bank holidays"
          value={v.hols}
          onChange={st.bind("hols")}
          optional
          options={HOLS.map((h) => ({ value: h, label: h === "none" ? "None (weekends only, any country)" : `UK: ${NATION_LABEL[h]}` }))}
          info="Used for working days and for the next bank holiday. Outside the UK, choose weekends only."
        />
      </AdvancedOptions>
    </>
  );

  const studio = (children: ReactNode, dock = "") => (
    <Studio title="Your countdown" ready={st.ready} onCalculate={st.calculate} calculateLabel="See the countdown" onReset={st.reset} dock={{ label: "Days to go", value: dock }} inputs={inputs}>
      {children}
    </Studio>
  );

  // Everything below depends on today's date, which is known only in the browser.
  if (!today) return studio(<Answer eyebrow="Days to go" value="…" sentence="Counting the days from today." />);

  const ev = custom
    ? { date: customDate && isIsoDate(customDate) ? customDate : "", name: v.name.trim() || "Your date" }
    : presetDate(v.event as Exclude<Preset, "custom">, today, nation);
  if (!ev.date) return studio(<Answer eyebrow="Days to go" value="Check the date" sentence="Enter a real calendar date to count down to." />);
  if (Math.abs(daysFrom(today, ev.date)) > MAX_DAYS) return studio(<Answer eyebrow="Days to go" value="Too far away" sentence="Pick a date within 100 years of today." />);

  const c = countdown(today, ev.date, rule);
  const label = ev.name;
  const isToday = c.days === 0;
  const year = Number(today.slice(0, 4));
  const yearDays = isLeapYear(year) ? 366 : 365;
  const gone = daysFrom(`${year}-01-01`, today);
  const others = (["christmas", "newyear", "easter", "bankholiday"] as const).map((p) => {
    const h = presetDate(p, today, nation);
    return { label: p === "bankholiday" ? h.name : PRESET_LABEL[p], values: [medium(h.date), plural(daysFrom(today, h.date), "day")] };
  });

  return studio(
    <>
      <Answer
        eyebrow={c.past ? `Days since ${label}` : `Days until ${label}`}
        value={isToday ? "Today" : plural(c.days, "day")}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          isToday ? (
            <>
              <b>{label}</b>{" "}is today, {long(ev.date)}.
            </>
          ) : c.past ? (
            <>
              <b>{label}</b>{" "}was on {long(ev.date)}, <b>{plural(c.days, "day")}</b>{" "}ago ({plural(c.weeks, "week")} and {plural(c.weekDays, "day")}).
            </>
          ) : (
            <>
              <b>{label}</b>{" "}is on {long(ev.date)}. That is <b>{plural(c.days, "day")}</b>{" "}away: {plural(c.weeks, "week")} and {plural(c.weekDays, "day")}, with{" "}
              {plural(c.saturdays, "weekend")} and {plural(c.working, "working day")} in between.
            </>
          )
        }
        badges={[weekdayName(ev.date), c.past ? "Already passed" : `${plural(c.days, "sleep")}`, `${whole(c.hours)} hours`]}
      />

      <Facts
        items={[
          { label: "Weeks", value: `${whole(c.weeks)} + ${plural(c.weekDays, "day")}` },
          { label: "Months", value: `${whole(c.months)} + ${plural(c.monthDays, "day")}` },
          { label: c.past ? "Weekends since" : "Weekends to go", value: whole(c.saturdays) },
          { label: "Working days between", value: whole(c.working) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Today", value: `${long(today)} (on this device)` },
          { label: "Days", value: "From midnight today to midnight at the start of the day" },
          { label: "Weekends", value: "Saturdays after today, up to the date" },
          { label: "Working days", value: v.hols === "none" ? "Weekdays strictly between the two dates" : `Weekdays strictly between the two dates, less ${NATION_LABEL[nation]} bank holidays` },
        ]}
      />

      {!c.past && !isToday && (
        <ResultCard title="Live countdown" sub="Ticking down to midnight at the start of the day, in your time zone.">
          <LiveTicker target={ev.date} />
        </ResultCard>
      )}

      <ResultCard title={`${year} so far`} sub="Days gone and days left in this calendar year.">
        <SplitBar
          segments={[
            { label: "Days gone", value: gone, display: whole(gone), color: "#2a78d6" },
            { label: "Days left (after today)", value: yearDays - gone - 1, display: whole(yearDays - gone - 1), color: "#c3c8ce" },
          ]}
          caption={<>Today is day {gone + 1} of {yearDays}.</>}
        />
      </ResultCard>

      <ResultCard title="Other countdowns">
        <Statement columns={["Date", "Days"]} rows={others} />
      </ResultCard>

      {c.holidays.length > 0 && (
        <ResultCard title="Bank holidays in between" sub="Not counted as working days.">
          <Statement columns={["Date"]} rows={c.holidays.slice(0, 20).map((h) => ({ label: h.name, values: [medium(h.date)] }))} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing">
        <Callout title="Planning around the date">
          To add or take away days from a date, try the <a href="/everyday/date-calculator">date calculator</a>. To count the days between two dates, use the{" "}
          <a href="/uk/life/days-between-dates">days between dates calculator</a>, and see every date for the year in the <a href="/uk/life/bank-holidays">bank holiday calculator</a>.
        </Callout>
      </ResultCard>
    </>,
    isToday ? "Today" : plural(c.days, "day"),
  );
}

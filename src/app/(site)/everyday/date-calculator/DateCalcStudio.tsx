"use client";

import type { ReactNode } from "react";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { whole } from "@/components/flagship/format";
import { date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { useToday } from "@/components/flagship/useToday";
import { formatDate, NATION_LABEL, type Nation } from "@/lib/life/calendar";
import { addMonths, dayOfYear, daysFrom, isIsoDate, isoWeek, shiftDate, shiftWorkingDays, weekdayName, type DayRule } from "@/lib/life/dates";

type Hols = Nation | "none";
const HOLS: Hols[] = ["england-and-wales", "scotland", "northern-ireland", "none"];

const SCHEMA = {
  // "" means today, resolved in the browser so the default never goes stale.
  start: date(""),
  dir: oneOf("add", ["add", "sub"] as const),
  mode: oneOf("calendar", ["calendar", "working"] as const),
  days: num(30, 0, 100_000),
  weeks: num(0, 0, 10_000),
  months: num(0, 0, 2_400),
  years: num(0, 0, 200),
  hols: oneOf<Hols>("england-and-wales", HOLS),
};
const ADVANCED = ["years", "hols"] as const;

const medium = (iso: string) => formatDate(iso, "medium");
const long = (iso: string) => formatDate(iso, "long");
const plural = (n: number, word: string) => `${whole(n)} ${word}${n === 1 ? "" : "s"}`;
const MIN = "0100-01-01";
const MAX = "9999-12-31";

export default function DateCalcStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  const start = v.start || today;
  const working = v.mode === "working";
  const sign = v.dir === "add" ? 1 : -1;
  const rule: DayRule = v.hols === "none" ? { kind: "weekdays" } : { kind: "uk", nation: v.hols };

  const inputs = (
    <>
      <InputGroup title="Your date">
        <DateField label="Start date" value={start ?? ""} onChange={st.bind("start")} hint="Today unless you pick another date." />
        <Segmented
          label="Add or subtract"
          value={v.dir}
          onChange={st.bind("dir")}
          options={[
            { value: "add", label: "Add" },
            { value: "sub", label: "Subtract" },
          ]}
        />
        <Segmented
          label="Count"
          value={v.mode}
          onChange={st.bind("mode")}
          options={[
            { value: "calendar", label: "Calendar days", note: "Every day counts, weekends included." },
            { value: "working", label: "Working days", note: "Monday to Friday, skipping bank holidays if you choose a UK nation under More options." },
          ]}
        />
        <StepperField label={working ? "Working days" : "Days"} value={v.days} onChange={(n) => st.set("days", Math.round(n))} step={1} min={0} max={working ? 5_000 : 100_000} unit="days" dp={0} />
        {!working && (
          <>
            <StepperField label="Weeks" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} step={1} min={0} max={10_000} unit="weeks" dp={0} />
            <StepperField label="Months" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={0} max={2_400} unit="months" dp={0} />
          </>
        )}
      </InputGroup>
      <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
        {!working && <StepperField label="Years" value={v.years} onChange={(n) => st.set("years", Math.round(n))} step={1} min={0} max={200} unit="years" dp={0} optional />}
        <SelectField
          label="Bank holidays for working days"
          value={v.hols}
          onChange={st.bind("hols")}
          optional
          options={HOLS.map((h) => ({ value: h, label: h === "none" ? "None (weekends only, any country)" : `UK: ${NATION_LABEL[h]}` }))}
          info="Used only when counting working days. Outside the UK, choose weekends only and allow for your own public holidays."
        />
      </AdvancedOptions>
    </>
  );

  const studio = (children: ReactNode, dock = "") => (
    <Studio title="Your date" ready={st.ready} onCalculate={st.calculate} calculateLabel="Work out the date" onReset={st.reset} dock={{ label: "Result date", value: dock }} inputs={inputs}>
      {children}
    </Studio>
  );

  if (!start) return studio(<Answer eyebrow="Result date" value="…" sentence="Pick a start date to see the result." />);
  if (!isIsoDate(start)) return studio(<Answer eyebrow="Result date" value="Check the date" sentence="Enter a real calendar date as the start date." />);

  const period = { years: working ? 0 : v.years, months: working ? 0 : v.months, weeks: working ? 0 : v.weeks, days: v.days };
  const totalMonths = period.years * 12 + period.months;
  const plain = shiftDate(start, period, sign as 1 | -1);
  const ws = working ? shiftWorkingDays(start, sign * v.days, rule) : null;
  const result = ws ? ws.date : plain;
  if (result < MIN || result > MAX || !isIsoDate(result))
    return studio(<Answer eyebrow="Result date" value="Out of range" sentence="The result falls outside the years 100 to 9999. Try a smaller period." />);

  const gap = Math.abs(daysFrom(start, result));
  const afterMonths = totalMonths ? addMonths(start, sign * totalMonths) : start;
  const clamped = totalMonths > 0 && afterMonths.slice(8) !== start.slice(8);
  const verb = v.dir === "add" ? "after" : "before";
  const what = working
    ? plural(v.days, "working day")
    : [period.years && plural(period.years, "year"), period.months && plural(period.months, "month"), period.weeks && plural(period.weeks, "week"), (period.days || !(period.years || period.months || period.weeks)) && plural(period.days, "day")]
        .filter(Boolean)
        .join(", ");
  const repeats = Array.from({ length: 8 }, (_, i) => {
    const k = i + 1;
    const d = working
      ? shiftWorkingDays(start, sign * v.days * k, rule).date
      : shiftDate(start, { years: period.years * k, months: period.months * k, weeks: period.weeks * k, days: period.days * k }, sign as 1 | -1);
    return isIsoDate(d) && d >= MIN && d <= MAX ? [`× ${k}`, medium(d), weekdayName(d)] : [`× ${k}`, "Out of range", ""];
  });
  const isToday = !!today && start === today;

  return studio(
    <>
      <Answer
        eyebrow="Result date"
        value={medium(result)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {what} {verb} {isToday ? "today" : long(start)} is <b>{long(result)}</b>. That is {plural(gap, "calendar day")} {v.dir === "add" ? "later" : "earlier"}
            {ws && v.days > 0 ? (
              <>
                , skipping {plural(ws.weekendDays, "weekend day")}
                {ws.holidays.length ? <> and {plural(ws.holidays.length, "bank holiday")}</> : null}
              </>
            ) : null}
            .
          </>
        }
        badges={[weekdayName(result), `Week ${isoWeek(result)}`, `Day ${dayOfYear(result)} of the year`]}
      />

      <Facts
        items={[
          { label: "Day of the week", value: weekdayName(result) },
          { label: "Calendar days apart", value: whole(gap) },
          { label: "Weeks apart", value: `${whole(Math.floor(gap / 7))} + ${plural(gap % 7, "day")}` },
          { label: "ISO week number", value: String(isoWeek(result)) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Start date", value: `${long(start)}${isToday ? " (today on this device)" : ""}` },
          { label: "Counting", value: working ? "Working days: the start date is day 0, and the next working day is day 1" : "Calendar days: the start date is day 0, so 1 day after Monday is Tuesday" },
          ...(working ? [{ label: "Days off", value: v.hols === "none" ? "Saturdays and Sundays" : `Saturdays, Sundays and ${NATION_LABEL[v.hols as Nation]} bank holidays` }] : []),
          ...(!working && totalMonths ? [{ label: "Months", value: "Added first, keeping the day of the month or using the month's last day if it is shorter" }] : []),
        ]}
      />

      {ws && v.days > 0 && (
        <ResultCard title="How the days split" sub={`${plural(gap, "calendar day")} between the two dates.`}>
          <SplitBar
            segments={[
              { label: "Working days", value: v.days, display: whole(v.days), color: "#2a78d6" },
              { label: "Weekend days", value: ws.weekendDays, display: whole(ws.weekendDays), color: "#c3c8ce" },
              { label: "Bank holidays", value: ws.holidays.length, display: whole(ws.holidays.length), color: "#eb6834" },
            ]}
          />
        </ResultCard>
      )}

      {!working && (period.years || period.months) && (period.weeks || period.days) ? (
        <ResultCard title="Step by step" sub="Years and months first, then weeks and days.">
          <Statement
            columns={["Date"]}
            rows={[
              { label: "Start", values: [medium(start)] },
              { label: `${v.dir === "add" ? "+" : "−"} ${plural(totalMonths, "month")}`, values: [medium(afterMonths)] },
              { label: `${v.dir === "add" ? "+" : "−"} ${plural(period.weeks * 7 + period.days, "day")}`, values: [medium(result)], kind: "total" },
            ]}
          />
        </ResultCard>
      ) : null}

      {ws && ws.holidays.length > 0 && (
        <ResultCard title="Bank holidays skipped">
          <Statement columns={["Date"]} rows={ws.holidays.slice(0, 20).map((h) => ({ label: h.name, values: [medium(h.date)] }))} />
        </ResultCard>
      )}

      <ResultCard title="Repeating the period" sub="Useful for schedules, such as every 28 days or every 3 months.">
        <DataTable summary="See the next 8 dates" columns={["Repeat", "Date", "Day"]} rows={repeats} />
      </ResultCard>

      <ResultCard title="Worth knowing">
        {clamped && (
          <Callout title="Month ends">
            {medium(start)} has no matching day {plural(totalMonths, "month")} {verb}, so the calculator used the last day of that month ({medium(afterMonths)}).
          </Callout>
        )}
        {working && v.hols === "none" && (
          <Callout title="Public holidays">Only weekends are skipped. Add a day for each public holiday in your country that falls in the period.</Callout>
        )}
        <Callout title="Counting between two dates?">
          To count the days, weeks or working days between two dates, use the <a href="/uk/life/days-between-dates">days between dates calculator</a>. For an exact age, use the{" "}
          <a href="/everyday/age-calculator">age calculator</a>.
        </Callout>
      </ResultCard>
    </>,
    medium(result),
  );
}

"use client";

import { addDays, addWorkingDays, countDays, dateDiff, formatDate, NATION_LABEL, type Nation } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  start: date("2026-10-04"),
  end: date("2026-12-25"),
  includeEnd: bool(false),
  nation: oneOf<Nation>("england-and-wales", ["england-and-wales", "scotland", "northern-ireland"]),
  add: num(30, -3650, 3650),
  addWorking: num(10, -1000, 1000),
};
const ADVANCED = ["includeEnd", "nation", "add", "addWorking"] as const;

const long = (iso: string) => formatDate(iso, "long");
const plural = (n: number, word: string) => `${n.toLocaleString("en-GB")} ${word}${n === 1 ? "" : "s"}`;

export default function DaysStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const [a, b] = v.start <= v.end ? [v.start, v.end] : [v.end, v.start];
  const d = dateDiff(a, b, v.includeEnd);
  // Count from the start date up to the end date, leaving out the end date unless it is included.
  const c = countDays(a, v.includeEnd ? b : addDays(b, -1), v.nation, true);
  const plusDays = addDays(v.start, v.add);
  const plusWorking = addWorkingDays(v.start, v.addWorking, v.nation);
  const ymd = [d.years ? plural(d.years, "year") : "", d.months ? plural(d.months, "month") : "", plural(d.monthDays, "day")].filter(Boolean).join(", ");

  return (
    <Studio
      title="Your dates"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the days"
      onReset={st.reset}
      dock={{ label: "Days between", value: d.days.toLocaleString("en-GB") }}
      inputs={
        <>
          <InputGroup title="From and to">
            <DateField label="Start date" value={v.start} onChange={st.bind("start")} />
            <DateField label="End date" value={v.end} onChange={st.bind("end")} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Include the end date" checked={v.includeEnd} onChange={st.bind("includeEnd")} optional hint="Counts both the first and last day, as for a hotel stay counted in days rather than nights." />
            <SelectField
              label="Bank holidays for"
              value={v.nation}
              onChange={st.bind("nation")}
              optional
              options={[
                { value: "england-and-wales", label: "England and Wales" },
                { value: "scotland", label: "Scotland" },
                { value: "northern-ireland", label: "Northern Ireland" },
              ]}
            />
            <StepperField label="Add calendar days to the start date" value={v.add} onChange={(n) => st.set("add", Math.round(n))} step={1} min={-3650} max={3650} unit="days" dp={0} optional hint="Use a minus number to go back." />
            <StepperField label="Add working days to the start date" value={v.addWorking} onChange={(n) => st.set("addWorking", Math.round(n))} step={1} min={-1000} max={1000} unit="days" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Days between"
        value={d.days.toLocaleString("en-GB")}
        unit={d.days === 1 ? "day" : "days"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            From <b>{long(a)}</b> to <b>{long(b)}</b> is <b>{plural(d.days, "day")}</b>
            {v.includeEnd ? ", counting both dates" : ""}. That is <b>{ymd}</b>, or <b>{plural(d.weeks, "week")}</b> and <b>{plural(d.weekDays, "day")}</b>, with <b>{plural(c.working, "working day")}</b> in{" "}
            {NATION_LABEL[v.nation]}.
          </>
        }
        badges={[plural(d.weeks, "week"), plural(c.working, "working day"), `${c.holidays.length} bank ${c.holidays.length === 1 ? "holiday" : "holidays"}`]}
      />

      <Facts
        items={[
          { label: "Calendar days", value: d.days.toLocaleString("en-GB") },
          { label: "Working days", value: c.working.toLocaleString("en-GB"), tone: "good" },
          { label: "Weekend days", value: c.weekends.toLocaleString("en-GB") },
          { label: "Hours", value: d.hours.toLocaleString("en-GB") },
        ]}
      />

      <Assumptions
        items={[
          { label: "Counting", value: v.includeEnd ? "Start and end dates included" : "End date not included" },
          { label: "Working days", value: "Monday to Friday, less bank holidays" },
          { label: "Bank holidays", value: NATION_LABEL[v.nation] },
          { label: "Time zone", value: "UK dates, whole days" },
        ]}
      />

      <ResultCard title="The same gap, different ways" sub="All from the same two dates.">
        <Statement
          columns={["Value"]}
          rows={[
            { label: "Years, months and days", values: [ymd] },
            { label: "Total months and days", values: [`${plural(d.totalMonths, "month")}, ${plural(d.monthDays, "day")}`] },
            { label: "Weeks and days", values: [`${plural(d.weeks, "week")}, ${plural(d.weekDays, "day")}`] },
            { label: "Days", values: [d.days.toLocaleString("en-GB")] },
            { label: "Hours", values: [d.hours.toLocaleString("en-GB")] },
            { label: "Minutes", values: [(d.hours * 60).toLocaleString("en-GB")] },
          ]}
        />
        {c.total > 0 && (
          <SplitBar
            segments={[
              { label: "Working days", value: c.working, display: String(c.working), color: "#5b1e6e" },
              { label: "Weekends", value: c.weekends, display: String(c.weekends), color: "#94a3b8" },
              { label: "Bank holidays", value: c.holidays.length, display: String(c.holidays.length), color: "#f59e0b" },
            ]}
          />
        )}
      </ResultCard>

      <ResultCard title="Adding to a date" sub={`Starting from ${long(v.start)}.`}>
        <Statement
          columns={["Date"]}
          rows={[
            { label: `${v.add >= 0 ? "Plus" : "Minus"} ${plural(Math.abs(v.add), "day")}`, values: [long(plusDays)] },
            { label: `${v.addWorking >= 0 ? "Plus" : "Minus"} ${plural(Math.abs(v.addWorking), "working day")}`, values: [long(plusWorking)] },
          ]}
        />
      </ResultCard>

      {c.holidays.length > 0 && (
        <ResultCard title="Bank holidays in this period" sub={NATION_LABEL[v.nation]}>
          <Statement columns={["Date"]} rows={c.holidays.map((h) => ({ label: h.name, values: [long(h.date)] }))} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Counting dates correctly.">
        <Callout title="Inclusive or exclusive?">
          Most date differences leave out the end date: from Monday to Wednesday is 2 days. Holiday bookings, contracts and some legal time limits may count both days. Turn on &ldquo;Include the end date&rdquo; to add one.
        </Callout>
        <Callout title="Months are not all the same length">
          Adding a month to 31 January gives 28 or 29 February. That is why the months-and-days answer can differ from dividing the days by 30.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        Bank holidays follow GOV.UK. Legal deadlines can have their own counting rules.
      </p>
    </Studio>
  );
}

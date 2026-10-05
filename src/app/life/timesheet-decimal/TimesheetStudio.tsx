"use client";

import { decimalToHhmm, timesheet, toMinutes } from "@/lib/life/everyday";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const NAMES = { mon: "Monday", tue: "Tuesday", wed: "Wednesday", thu: "Thursday", fri: "Friday", sat: "Saturday", sun: "Sunday" };
type Day = (typeof DAYS)[number];

const SCHEMA = {
  monS: text("09:00", 5), monE: text("17:30", 5), monB: num(30, 0, 600),
  tueS: text("09:00", 5), tueE: text("17:30", 5), tueB: num(30, 0, 600),
  wedS: text("09:00", 5), wedE: text("17:30", 5), wedB: num(30, 0, 600),
  thuS: text("09:00", 5), thuE: text("17:30", 5), thuB: num(30, 0, 600),
  friS: text("09:00", 5), friE: text("16:00", 5), friB: num(30, 0, 600),
  satS: text("", 5), satE: text("", 5), satB: num(0, 0, 600),
  sunS: text("", 5), sunE: text("", 5), sunB: num(0, 0, 600),
  hourly: num(12.71, 0, 1_000),
  otAfter: num(0, 0, 100),
  otRate: num(1.5, 1, 3),
};
const ADVANCED = ["satS", "satE", "satB", "sunS", "sunE", "sunB", "hourly", "otAfter", "otRate"] as const;
const MINUTES = [5, 10, 15, 20, 30, 45];

export default function TimesheetStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const shift = (d: Day) => ({ start: v[`${d}S`], end: v[`${d}E`], breakMins: v[`${d}B`] });
  const valid = (t: string) => t === "" || Number.isFinite(toMinutes(t));
  const r = timesheet(DAYS.map(shift), v.hourly, v.otAfter, v.otRate);
  const worked = DAYS.filter((_, i) => r.hours[i] > 0);
  const bad = DAYS.filter((d) => !valid(v[`${d}S`]) || !valid(v[`${d}E`]));
  const maxH = Math.max(1, ...r.hours);

  const dayFields = (d: Day, optional = false) => (
    <div key={d}>
      <TextField label={`${NAMES[d]} start`} value={v[`${d}S`]} onChange={st.bind(`${d}S`)} placeholder="09:00" maxLength={5} optional={optional} />
      <TextField label={`${NAMES[d]} finish`} value={v[`${d}E`]} onChange={st.bind(`${d}E`)} placeholder="17:30" maxLength={5} optional={optional} />
      <StepperField label={`${NAMES[d]} unpaid break`} value={v[`${d}B`]} onChange={(n) => st.set(`${d}B`, Math.round(n))} step={15} min={0} max={600} unit="mins" dp={0} optional={optional} />
    </div>
  );

  return (
    <Studio
      title="Your week"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my hours"
      onReset={st.reset}
      dock={{ label: "Hours this week", value: r.total.toFixed(2) }}
      inputs={
        <>
          <InputGroup title="Monday to Friday (24-hour times)">{(["mon", "tue", "wed", "thu", "fri"] as Day[]).map((d) => dayFields(d))}</InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {dayFields("sat", true)}
            {dayFields("sun", true)}
            <MoneyField label="Hourly pay" value={v.hourly} onChange={st.bind("hourly")} pence optional hint="The National Living Wage is £12.71 from April 2026." />
            <StepperField label="Overtime after" value={v.otAfter} onChange={st.bind("otAfter")} step={0.5} min={0} max={100} unit="hours" dp={1} optional hint="Hours a week before overtime starts. 0 for none." />
            <StepperField label="Overtime rate" value={v.otRate} onChange={st.bind("otRate")} step={0.25} min={1} max={3} unit="× pay" dp={2} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Hours this week"
        value={r.total.toFixed(2)}
        unit="hours"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            You worked <b>{r.total.toFixed(2)} hours</b>, which is <b>{decimalToHhmm(r.total)}</b> in hours and minutes, over <b>{worked.length}</b> {worked.length === 1 ? "day" : "days"}.
            {v.hourly > 0 ? (
              <>
                {" "}
                At <b>{gbp(v.hourly, true)}</b> an hour{r.overtime > 0 ? <>, with <b>{r.overtime.toFixed(2)}</b> hours of overtime at {v.otRate}×</> : null}, that is <b>{gbp(r.pay, true)}</b> before tax.
              </>
            ) : null}
            {bad.length > 0 ? <> Check the times for {bad.map((d) => NAMES[d]).join(", ")}: use the 24-hour format, such as 17:30.</> : null}
          </>
        }
        badges={[`${decimalToHhmm(r.total)} hh:mm`, `${worked.length} days`, r.overtime > 0 ? `${r.overtime.toFixed(2)} h overtime` : "No overtime"]}
      />

      <Facts
        items={[
          { label: "Decimal hours", value: r.total.toFixed(2) },
          { label: "Hours and minutes", value: decimalToHhmm(r.total) },
          { label: "Average a day", value: worked.length ? (r.total / worked.length).toFixed(2) : "0.00" },
          { label: "Gross pay", value: gbp(r.pay, true), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Times", value: "24-hour clock; a finish before the start means overnight" },
          { label: "Breaks", value: "Unpaid, taken off each day" },
          { label: "Overtime", value: v.otAfter > 0 ? `After ${v.otAfter} hours at ${v.otRate}×` : "None" },
          { label: "Pay", value: "Before tax and National Insurance" },
        ]}
      />

      <ResultCard title="Day by day" sub="Hours worked after breaks.">
        <Compare
          head={["Day", "Hours"]}
          rows={DAYS.map((d, i) => ({
            label: NAMES[d],
            value: r.hours[i].toFixed(2),
            delta: r.hours[i] > 0 ? decimalToHhmm(r.hours[i]) : undefined,
            bar: r.hours[i] / maxH,
          }))}
        />
      </ResultCard>

      <ResultCard title="Minutes as decimals" sub="For converting by hand.">
        <Statement columns={["Decimal"]} rows={MINUTES.map((m) => ({ label: `${m} minutes`, values: [(m / 60).toFixed(m % 3 === 0 ? 2 : 3)] }))} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Hours and pay.">
        <Callout title="Rest breaks">
          Adult workers are entitled to a 20-minute rest break if they work more than 6 hours a day. It does not have to be paid unless your contract says so.
        </Callout>
        {r.total > 48 && (
          <Callout tone="warn" title="Over 48 hours">
            The Working Time Regulations limit average weekly working time to 48 hours over 17 weeks, unless you have opted out in writing.
          </Callout>
        )}
        {v.hourly > 0 && v.hourly < 12.71 && (
          <Callout tone="warn" title="Below the National Living Wage">
            Workers aged 21 or over must be paid at least £12.71 an hour from April 2026. Check the <a href="/tax-and-salary/minimum-wage">minimum wage checker</a>.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Gross pay before tax. Check your contract for paid breaks and overtime.
      </p>
    </Studio>
  );
}

"use client";

import type { ReactNode } from "react";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { bool, date, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { useToday } from "@/components/flagship/useToday";
import { addDays, formatDate } from "@/lib/life/calendar";
import { datePregnancy, milestones, progressOn, weeksAndDays, type DatingMethod } from "@/lib/life/pregnancy";

const METHODS: DatingMethod[] = ["lmp", "conception", "ivf5", "ivf3", "scan"];
/** With no date entered (or shared), the example starts 8 weeks before the visitor's today. */
const EXAMPLE_WEEKS_AGO = 8;

const SCHEMA = {
  method: oneOf<DatingMethod>("lmp", METHODS),
  date: date(""),
  cycle: num(28, 20, 45),
  sw: num(12, 4, 30),
  sd: num(0, 0, 6),
  uk: bool(true),
};
const ADVANCED = ["uk"] as const;

const DATE_LABEL: Record<DatingMethod, string> = {
  lmp: "First day of your last period",
  conception: "Date of conception",
  ivf5: "Date of the 5-day embryo transfer",
  ivf3: "Date of the 3-day embryo transfer",
  scan: "Date of your dating scan",
};
const METHOD_LABEL: Record<DatingMethod, string> = {
  lmp: "Last period",
  conception: "Conception date",
  ivf5: "IVF: 5-day transfer (blastocyst)",
  ivf3: "IVF: 3-day transfer",
  scan: "Dating scan result",
};

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const long = (iso: string) => formatDate(iso, "long");
const medium = (iso: string) => formatDate(iso, "medium");
const TRIMESTER = ["", "first", "second", "third"];

export default function DueDateStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  // An entered or shared date wins; otherwise an example from the visitor's own today (known only after mount).
  const when = ISO.test(v.date) ? v.date : today ? addDays(today, -7 * EXAMPLE_WEEKS_AGO) : null;
  const inputs = (
        <>
          <InputGroup title="How to work it out">
            <SelectField
              label="Calculate from"
              value={v.method}
              onChange={st.bind("method")}
              options={METHODS.map((m) => ({ value: m, label: METHOD_LABEL[m] }))}
              info="Most people use the first day of their last period. Once you have had a dating scan, the scan date is more accurate."
            />
            <DateField label={DATE_LABEL[v.method]} value={when ?? ""} onChange={st.bind("date")} />
            {v.method === "lmp" && (
              <StepperField
                label="Usual cycle length"
                value={v.cycle}
                onChange={(n) => st.set("cycle", Math.round(n))}
                step={1}
                min={20}
                max={45}
                unit="days"
                dp={0}
                hint="From the first day of one period to the day before the next. 28 days if you are not sure."
              />
            )}
            {v.method === "scan" && (
              <>
                <StepperField label="Pregnancy at the scan: weeks" value={v.sw} onChange={(n) => st.set("sw", Math.round(n))} step={1} min={4} max={30} unit="weeks" dp={0} hint="As written on your scan report, for example 12+3." />
                <StepperField label="Pregnancy at the scan: days" value={v.sd} onChange={(n) => st.set("sd", Math.round(n))} step={1} min={0} max={6} unit="days" dp={0} />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch label="Show UK dates for work and benefits" checked={v.uk} onChange={st.bind("uk")} optional hint="Telling your employer, the earliest maternity leave and Healthy Start." />
          </AdvancedOptions>
        </>
  );
  if (!when)
    return (
      <Studio title="Your dates" ready={st.ready} onCalculate={st.calculate} calculateLabel="Work out my due date" onReset={st.reset} dock={{ label: "Due date", value: "" }} inputs={inputs}>
        <Answer eyebrow="Estimated due date" value="…" sentence="Enter a date to see your due date and how many weeks pregnant you are." />
      </Studio>
    );
  const r = datePregnancy({ method: v.method, date: when, cycle: v.cycle, scanWeeks: v.sw, scanDays: v.sd });
  const p = today ? progressOn(r.start, today) : null;
  const keys = milestones(r.start, v.uk);
  const next = today ? keys.find((m) => m.date >= today) : undefined;
  const done = p ? Math.max(0, Math.min(280, p.totalDays)) : 0;

  let sentence: ReactNode = null;
  if (!p) sentence = <>Your estimated due date is <b>{long(r.due)}</b>.</>;
  else if (p.status === "before")
    sentence = (
      <>
        Your estimated due date would be <b>{long(r.due)}</b>. That date is in the future, so the pregnancy count has not started yet: check the date you entered.
      </>
    );
  else if (p.status === "past42")
    sentence = (
      <>
        The estimated due date was <b>{long(r.due)}</b>, more than two weeks ago. If you are still pregnant, contact your midwife or maternity unit today.
      </>
    );
  else
    sentence = (
      <>
        Your estimated due date is <b>{long(r.due)}</b>. Today you are <b>{weeksAndDays(p.totalDays)}</b>{" "}pregnant, in the{" "}
        <b>{TRIMESTER[p.trimester]} trimester</b>
        {p.daysToDue > 0 ? (
          <>
            , with <b>{p.daysToDue}</b>{" "}days to go.
          </>
        ) : p.daysToDue === 0 ? (
          <>. Today is the due date.</>
        ) : (
          <>, {-p.daysToDue} days past the due date.</>
        )}
      </>
    );

  return (
    <Studio
      title="Your dates"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my due date"
      onReset={st.reset}
      dock={{ label: "Due date", value: medium(r.due) }}
      inputs={inputs}
    >
      <Answer
        eyebrow="Estimated due date"
        value={medium(r.due)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={sentence}
        badges={[METHOD_LABEL[v.method], p && p.status !== "before" ? `${p.weeks}+${p.days} today` : "40 weeks", p && p.status !== "before" ? `Trimester ${p.trimester}` : "Estimate only"]}
      />

      <Facts
        items={[
          { label: "Due date", value: medium(r.due) },
          { label: "Pregnant today", value: p && p.status !== "before" ? `${p.weeks} weeks ${p.days} days` : "Not yet" },
          { label: "Conception (about)", value: medium(r.conception) },
          { label: "Full term from", value: medium(keys.find((k) => k.key === "term")?.date ?? r.due) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Method", value: METHOD_LABEL[v.method] },
          { label: "Pregnancy length", value: "280 days (40 weeks) from the first day of the last period" },
          ...(v.method === "lmp" ? [{ label: "Cycle", value: `${v.cycle} days (ovulation ${v.cycle - 14} days in)` }] : []),
          { label: "Counted from", value: medium(r.start) },
        ]}
      />

      {p && p.status !== "before" && (
        <ResultCard title="How far along you are" sub={`${weeksAndDays(done)} of 40 weeks.`}>
          <SplitBar
            segments={[
              { label: "Done", value: done, display: weeksAndDays(done), color: "#2a78d6" },
              { label: "To go", value: Math.max(0, 280 - done), display: weeksAndDays(Math.max(0, 280 - done)), color: "#c3c8ce" },
            ]}
            caption={next ? <>Next: {next.label.toLowerCase()} on {long(next.date)}.</> : undefined}
          />
        </ResultCard>
      )}

      <ResultCard title="Key dates" sub="Weeks are counted from the first day of the last period.">
        <Statement
          columns={["Week", "Date"]}
          rows={keys.map((m) => ({
            label: (
              <>
                <b>{m.label}</b>
                <br />
                <small>{m.detail}</small>
              </>
            ),
            values: [`${m.week}+${m.day}`, medium(m.date)],
            kind: m.key === "due" ? ("total" as const) : undefined,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing">
        <Callout title="A due date is an estimate">
          Pregnancy normally lasts 37 to 42 weeks, so most babies arrive in the five weeks around the date, not on it. Your midwife will confirm your dates at
          the dating scan.
        </Callout>
        {v.method === "lmp" && (v.cycle < 21 || v.cycle > 35) && (
          <Callout tone="warn" title="Cycles outside 21 to 35 days">
            The NHS counts cycles of 21 to 35 days as normal. With a shorter or longer cycle, or irregular periods, the dating scan is a better guide.
          </Callout>
        )}
        <Callout title="Not medical advice">
          If you think you are pregnant, contact a GP or a midwife to book your first appointment, ideally before 10 weeks. For pain, bleeding or worries,
          call your maternity unit or NHS 111. Try the <a href="/everyday/ovulation-calculator">ovulation calculator</a>{" "}if you are planning a pregnancy.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        An estimate based on a 40-week pregnancy, as used by the NHS. Not medical advice: your midwife or doctor confirms your dates.
      </p>
    </Studio>
  );
}

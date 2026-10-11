"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { num, oneOf, ShareButton, text, useStudio, type Query } from "@/components/flagship/useStudio";
import { clockLabel, decimalHours, hhmm, hoursMinutes, parseClock, parseDuration, timeBetween } from "@/lib/life/dates";

const SCHEMA = {
  mode: oneOf("between", ["between", "add"] as const),
  start: text("09:00", 8),
  end: text("17:30", 8),
  brk: num(30, 0, 720),
  days: num(5, 0, 7),
  d1: text("7:30", 12),
  d2: text("8:15", 12),
  d3: text("-0:45", 12),
  d4: text("", 12),
  d5: text("", 12),
  d6: text("", 12),
  d7: text("", 12),
  d8: text("", 12),
  clock: oneOf("24h", ["24h", "12h"] as const),
  cur: oneOf("gbp", ["gbp", "usd", "eur"] as const),
  rate: num(0, 0, 10_000),
};
const ADVANCED = ["d5", "d6", "d7", "d8", "clock", "cur", "rate"] as const;
const LINES = ["d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8"] as const;
const SYMBOL = { gbp: "£", usd: "$", eur: "€" };

/** A duration line: a leading minus (or −) takes it away. */
function readLine(raw: string): { sign: 1 | -1; mins: number } | null {
  const t = raw.trim();
  if (!t) return null;
  const neg = /^[-−]/.test(t);
  const mins = parseDuration(neg ? t.slice(1) : t.replace(/^\+/, ""));
  return { sign: neg ? -1 : 1, mins };
}

export default function TimeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const between = v.mode === "between";
  const sym = SYMBOL[v.cur];
  const money = (n: number) => `${sym}${n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const clock = (m: number) => clockLabel(m, v.clock);

  const a = parseClock(v.start);
  const b = parseClock(v.end);
  const timesOk = Number.isFinite(a) && Number.isFinite(b);
  const span = timeBetween(a, b, v.brk);

  const lines = LINES.map((k, i) => ({ key: k, n: i + 1, line: readLine(v[k]) }));
  const used = lines.filter((l) => l.line && Number.isFinite(l.line.mins));
  const bad = lines.filter((l) => l.line && !Number.isFinite(l.line.mins));
  const total = used.reduce((s, l) => s + l.line!.sign * l.line!.mins, 0);

  const mins = between ? span.net : total;
  const week = between ? span.net * v.days : 0;

  const inputs = (
    <>
      <InputGroup title="Your times">
        <Segmented
          label="Work out"
          value={v.mode}
          onChange={st.bind("mode")}
          options={[
            { value: "between", label: "Time between two times" },
            { value: "add", label: "Add up hours and minutes" },
          ]}
        />
        {between ? (
          <>
            <TextField label="Start time" value={v.start} onChange={st.bind("start")} placeholder="09:00" maxLength={8} hint="24-hour (17:30) or with am/pm (5:30pm)." />
            <TextField label="Finish time" value={v.end} onChange={st.bind("end")} placeholder="17:30" maxLength={8} hint="If the finish is earlier than the start, the time runs past midnight." />
            <StepperField label="Unpaid break" value={v.brk} onChange={(n) => st.set("brk", Math.round(n))} step={5} min={0} max={720} unit="mins" dp={0} />
            <StepperField label="Days a week like this" value={v.days} onChange={(n) => st.set("days", Math.round(n))} step={1} min={0} max={7} unit="days" dp={0} />
          </>
        ) : (
          LINES.slice(0, 4).map((k, i) => (
            <TextField
              key={k}
              label={`Time ${i + 1}`}
              value={v[k]}
              onChange={st.bind(k)}
              placeholder="7:30"
              maxLength={12}
              hint={i === 0 ? "Hours:minutes (7:30), 7h 30m, 45m or decimal hours (7.5). Start with a minus (−0:45) to take time away." : undefined}
            />
          ))
        )}
      </InputGroup>
      <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
        {!between &&
          LINES.slice(4).map((k, i) => <TextField key={k} label={`Time ${i + 5}`} value={v[k]} onChange={st.bind(k)} placeholder="1:00" maxLength={12} optional />)}
        <Segmented
          label="Clock style"
          value={v.clock}
          onChange={st.bind("clock")}
          optional
          options={[
            { value: "24h", label: "24-hour" },
            { value: "12h", label: "12-hour (am/pm)" },
          ]}
        />
        <Segmented
          label="Currency"
          value={v.cur}
          onChange={st.bind("cur")}
          optional
          options={[
            { value: "gbp", label: "£" },
            { value: "usd", label: "$" },
            { value: "eur", label: "€" },
          ]}
        />
        <MoneyField label="Hourly pay" value={v.rate} onChange={(n) => st.set("rate", n)} symbol={sym} pence optional hint="Optional: shows pay for the hours. Leave at 0 to skip." />
      </AdvancedOptions>
    </>
  );

  const value = hhmm(mins);
  const pay = v.rate > 0 ? v.rate * decimalHours(mins) : 0;

  return (
    <Studio title="Your times" ready={st.ready} onCalculate={st.calculate} calculateLabel="Work out the time" onReset={st.reset} dock={{ label: between ? "Time worked" : "Total", value }} inputs={inputs}>
      <Answer
        eyebrow={between ? "Time between" : "Total time"}
        value={value}
        unit="hours"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          between ? (
            timesOk ? (
              <>
                From <b>{clock(a)}</b>{" "}to <b>{clock(b)}</b>
                {span.overnight ? " (the next day)" : ""} is <b>{hoursMinutes(span.gross)}</b>.{" "}
                {v.brk > 0 ? (
                  <>
                    Less a {v.brk}-minute break, that is <b>{hoursMinutes(span.net)}</b>, or <b>{decimalHours(span.net).toFixed(2)}</b>{" "}decimal hours.
                  </>
                ) : (
                  <>
                    In decimal hours that is <b>{decimalHours(span.net).toFixed(2)}</b>.
                  </>
                )}
              </>
            ) : (
              <>Enter a start and a finish time, such as 09:00 and 17:30.</>
            )
          ) : used.length ? (
            <>
              The {used.length === 1 ? "time adds" : `${used.length} times add`} up to <b>{hoursMinutes(total)}</b>, or <b>{decimalHours(total).toFixed(2)}</b>{" "}decimal hours.
            </>
          ) : (
            <>Enter some times, such as 7:30 and 8:15.</>
          )
        }
        badges={[`${decimalHours(mins).toFixed(2)} decimal hours`, `${Math.round(mins).toLocaleString("en-GB")} minutes`, ...(between && span.overnight ? ["Past midnight"] : [])]}
      />

      <Facts
        items={
          between
            ? [
                { label: "Total span", value: hhmm(span.gross) },
                { label: "Break", value: `${v.brk} mins` },
                { label: "Worked (decimal)", value: decimalHours(span.net).toFixed(2) },
                { label: `Week (${v.days} days)`, value: `${hhmm(week)} (${decimalHours(week).toFixed(2)})` },
              ]
            : [
                { label: "Total", value: hhmm(total) },
                { label: "Decimal hours", value: decimalHours(total).toFixed(2) },
                { label: "Minutes", value: Math.round(total).toLocaleString("en-GB") },
                { label: "Lines counted", value: String(used.length) },
              ]
        }
      />

      <Assumptions
        items={[
          ...(between
            ? [
                { label: "Midnight", value: "A finish at or before the start is read as the next day" },
                { label: "Break", value: "Taken off the total, as an unpaid break" },
              ]
            : [{ label: "Minus lines", value: "A line starting with a minus is taken away" }]),
          { label: "Decimal hours", value: "Minutes ÷ 60, rounded to 2 places (7:45 = 7.75)" },
          ...(v.rate > 0 ? [{ label: "Pay", value: `${money(v.rate)} an hour × decimal hours, before tax` }] : []),
        ]}
      />

      {between && timesOk && span.gross > 0 && (
        <ResultCard title="How the time splits">
          <SplitBar
            segments={[
              { label: "Worked", value: span.net, display: hhmm(span.net), color: "#2a78d6" },
              { label: "Break", value: Math.min(v.brk, span.gross), display: hhmm(Math.min(v.brk, span.gross)), color: "#c3c8ce" },
            ]}
          />
        </ResultCard>
      )}

      {between && timesOk && (
        <ResultCard title="Over a week, month and year" sub={`${v.days} days a week like this one.`}>
          <Statement
            columns={["Hours", "Decimal", ...(v.rate > 0 ? ["Pay"] : [])]}
            rows={[
              { label: "A day", mult: 1 },
              { label: "A week", mult: v.days },
              { label: "A month (average)", mult: (v.days * 52) / 12 },
              { label: "A year (52 weeks)", mult: v.days * 52 },
            ].map((r) => ({ label: r.label, values: [hhmm(span.net * r.mult), decimalHours(span.net * r.mult).toFixed(2), ...(v.rate > 0 ? [money(v.rate * decimalHours(span.net * r.mult))] : [])] }))}
          />
        </ResultCard>
      )}

      {!between && used.length > 0 && (
        <ResultCard title="Running total">
          <Statement
            columns={["Time", "Running total"]}
            rows={used.map((l, i) => {
              const running = used.slice(0, i + 1).reduce((s, x) => s + x.line!.sign * x.line!.mins, 0);
              return { label: `Time ${l.n}`, values: [`${l.line!.sign < 0 ? "−" : "+"}${hhmm(l.line!.mins)}`, hhmm(running)], kind: l.line!.sign < 0 ? ("deduction" as const) : undefined };
            })}
          />
        </ResultCard>
      )}

      {v.rate > 0 && (
        <ResultCard title="Pay for this time">
          <Facts items={[{ label: between ? "A day" : "Total", value: money(pay) }, ...(between ? [{ label: "A week", value: money(v.rate * decimalHours(week)) }] : [])]} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing">
        {between && !timesOk && (
          <Callout tone="warn" title="Check the times">
            Times can be written as 09:00, 9.30, 1730 or 5:30pm. Hours run from 0 to 23 (or 1 to 12 with am or pm) and minutes from 00 to 59.
          </Callout>
        )}
        {between && timesOk && span.breakTooLong && (
          <Callout tone="warn" title="The break is longer than the time">
            The break is longer than the time between the two times, so the hours worked show as zero.
          </Callout>
        )}
        {!between && bad.length > 0 && (
          <Callout tone="warn" title="Some lines were skipped">
            {bad.map((l) => `Time ${l.n}`).join(", ")} could not be read. Use 7:30, 7h 30m, 45m or 7.5.
          </Callout>
        )}
        {!between && total < 0 && <Callout title="Negative total">More time was taken away than added, so the total is below zero.</Callout>}
        <Callout title="Filling in a timesheet?">
          The <a href="/everyday/timesheet-decimal">timesheet calculator</a>{" "}adds up a whole week day by day, with overtime and pay. To check your holiday, see the{" "}
          <a href="/uk/tax-and-salary/holiday-entitlement">holiday entitlement calculator</a>.
        </Callout>
      </ResultCard>
    </Studio>
  );
}

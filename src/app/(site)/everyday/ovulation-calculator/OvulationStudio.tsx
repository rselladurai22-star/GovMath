"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { bool, date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { useToday } from "@/components/flagship/useToday";
import { addDays, formatDate } from "@/lib/life/calendar";
import { cycleDay, cyclesAhead, daysBetween, NORMAL_CYCLE, phaseOn, type DayPhase } from "@/lib/life/pregnancy";

/** With no date entered (or shared), the example period started 10 days before the visitor's today. */
const EXAMPLE_DAYS_AGO = 10;

const SCHEMA = {
  last: date(""),
  cycle: num(28, 20, 45),
  count: num(6, 3, 12),
  luteal: num(14, 9, 18),
  bleed: num(5, 1, 10),
  irregular: bool(false),
  shortest: num(26, 20, 45),
  longest: num(32, 20, 45),
};
const ADVANCED = ["count", "luteal", "bleed", "irregular", "shortest", "longest"] as const;

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const short = (iso: string) => formatDate(iso, "short");
const medium = (iso: string) => formatDate(iso, "medium");
const range = (a: string, b: string) => `${short(a)} to ${short(b)}`;

const PHASE_LABEL: Record<DayPhase, string> = {
  period: "your period",
  follicular: "the days before your fertile window",
  fertile: "your fertile window",
  ovulation: "your likely ovulation day",
  luteal: "the days after ovulation",
};

export default function OvulationStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const today = useToday();
  // An entered or shared date wins; otherwise an example from the visitor's own today (known only after mount).
  const last = ISO.test(v.last) ? v.last : today ? addDays(today, -EXAMPLE_DAYS_AGO) : null;
  const inputs = (
        <>
          <InputGroup title="Your last period">
            <DateField label="First day of your last period" value={last ?? ""} onChange={st.bind("last")} />
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
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Cycles to show" value={v.count} onChange={(n) => st.set("count", Math.round(n))} step={1} min={3} max={12} unit="cycles" dp={0} optional />
            <StepperField
              label="Luteal phase"
              value={v.luteal}
              onChange={(n) => st.set("luteal", Math.round(n))}
              step={1}
              min={9}
              max={18}
              unit="days"
              dp={0}
              optional
              hint="Days from ovulation to your next period. Usually about 14; the NHS gives 10 to 16. Ovulation tests or temperature charts can show yours."
            />
            <StepperField label="Period length" value={v.bleed} onChange={(n) => st.set("bleed", Math.round(n))} step={1} min={1} max={10} unit="days" dp={0} optional />
            <Switch label="My cycles are irregular" checked={v.irregular} onChange={st.bind("irregular")} optional hint="Give your shortest and longest recent cycles for a wider, safer window." />
            {v.irregular && (
              <>
                <StepperField label="Shortest recent cycle" value={v.shortest} onChange={(n) => st.set("shortest", Math.round(n))} step={1} min={20} max={45} unit="days" dp={0} optional />
                <StepperField label="Longest recent cycle" value={v.longest} onChange={(n) => st.set("longest", Math.round(n))} step={1} min={20} max={45} unit="days" dp={0} optional />
              </>
            )}
          </AdvancedOptions>
        </>
  );
  if (!last)
    return (
      <Studio title="Your cycle" ready={st.ready} onCalculate={st.calculate} calculateLabel="Find my fertile days" onReset={st.reset} dock={{ label: "Fertile window", value: "" }} inputs={inputs}>
        <Answer eyebrow="Your next fertile window" value="…" sentence="Enter the first day of your last period to see your fertile days." />
      </Studio>
    );
  const input = {
    lastPeriod: last,
    cycle: v.cycle,
    luteal: v.luteal,
    periodLength: v.bleed,
    shortest: v.irregular ? v.shortest : undefined,
    longest: v.irregular ? v.longest : undefined,
  };
  const ref = today && today > last ? today : last;
  const cycles = cyclesAhead(input, ref, v.count);
  // The next fertile window that has not ended yet.
  const target = cycles.find((c) => (v.irregular ? c.wideEnd : c.fertileEnd) >= ref) ?? cycles[cycles.length - 1];
  const now = today ? cycles.find((c) => today >= c.periodStart && today < c.nextPeriod) : undefined;
  const winStart = v.irregular ? target.wideStart : target.fertileStart;
  const winEnd = v.irregular ? target.wideEnd : target.fertileEnd;
  const ovDay = daysBetween(target.periodStart, target.ovulation) + 1;
  const outside = v.cycle < NORMAL_CYCLE.min || v.cycle > NORMAL_CYCLE.max;
  const lutealDays = v.cycle - v.luteal;
  const bleed = Math.min(v.bleed, v.cycle);

  return (
    <Studio
      title="Your cycle"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my fertile days"
      onReset={st.reset}
      dock={{ label: "Fertile window", value: range(winStart, winEnd) }}
      inputs={inputs}
    >
      <Answer
        eyebrow="Your next fertile window"
        value={range(winStart, winEnd)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Your most fertile days are likely to be <b>{medium(winStart)}</b>{" "}to <b>{medium(winEnd)}</b>, with ovulation around{" "}
            <b>{formatDate(target.ovulation, "long")}</b>{" "}(day {ovDay} of your cycle). Your next period is due on about <b>{medium(target.nextPeriod)}</b>.
            {now && today ? (
              <>
                {" "}Today is day {cycleDay(now, today)}: {PHASE_LABEL[phaseOn(now, today)]}.
              </>
            ) : null}
          </>
        }
        badges={[`${v.cycle}-day cycle`, `Ovulation day ${ovDay}`, v.irregular ? "Irregular: wider window" : "Estimate only"]}
      />

      <Facts
        items={[
          { label: "Likely ovulation", value: medium(target.ovulation) },
          { label: "Fertile window", value: range(winStart, winEnd) },
          { label: "Next period", value: medium(target.nextPeriod) },
          { label: "Test from", value: medium(target.nextPeriod), note: "If your period is late." },
        ]}
      />

      <Assumptions
        items={[
          { label: "Cycle", value: `${v.cycle} days` },
          { label: "Ovulation", value: `${v.luteal} days before the next period` },
          { label: "Fertile window", value: v.irregular ? `From your ${v.shortest}-day to your ${v.longest}-day cycle` : "The 5 days before ovulation and ovulation day" },
          { label: "Period", value: `${v.bleed} days` },
        ]}
      />

      <ResultCard title="Your cycle at a glance" sub={`A ${v.cycle}-day cycle, day by day.`}>
        <SplitBar
          segments={[
            { label: "Period", value: bleed, display: `${bleed} days`, color: "#e34948" },
            { label: "Before fertile days", value: Math.max(0, lutealDays - 5 - bleed), display: `${Math.max(0, lutealDays - 5 - bleed)} days`, color: "#c3c8ce" },
            { label: "Fertile window", value: 6, display: "6 days", color: "#1baf7a" },
            { label: "After ovulation", value: Math.max(0, v.luteal - 1), display: `${Math.max(0, v.luteal - 1)} days`, color: "#4a3aa7" },
          ]}
          caption="The fertile window is the 5 days before ovulation plus ovulation day."
        />
      </ResultCard>

      <ResultCard title={`Your next ${cycles.length} cycles`} sub="Dates are estimates: cycles vary from month to month.">
        <Statement
          columns={["Fertile window", "Ovulation", "Next period"]}
          rows={cycles.map((c) => ({
            label: <>Period from {short(c.periodStart)}</>,
            values: [v.irregular ? range(c.wideStart, c.wideEnd) : range(c.fertileStart, c.fertileEnd), short(c.ovulation), short(c.nextPeriod)],
          }))}
        />
        <p className="footnote">
          If you conceive in the cycle that starts on {short(target.periodStart)}, your estimated due date would be {medium(target.dueIfConceived)}. See the{" "}
          <a href={`/everyday/pregnancy-due-date?date=${target.periodStart}${v.cycle !== 28 ? `&cycle=${v.cycle}` : ""}`}>pregnancy due date calculator</a>.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing">
        <Callout tone="warn" title="Not a form of contraception">
          Sperm can survive for up to 7 days and ovulation can come early or late, so you can get pregnant outside these dates. A calendar alone is not a
          reliable way to avoid pregnancy. Talk to a GP, pharmacist or sexual health clinic about contraception.
        </Callout>
        {(v.irregular || outside) && (
          <Callout title="Irregular or unusual cycles">
            The NHS counts cycles of 21 to 35 days as normal. If your cycles are irregular, ovulation tests or tracking your temperature and cervical mucus
            give a better picture than dates alone. See a GP if your periods are very irregular, stop, or are under 21 or over 35 days apart.
          </Callout>
        )}
        <Callout title="Trying for a baby">
          The NHS suggests having sex every 2 to 3 days through the cycle rather than timing it exactly. See a GP if you have not conceived after a year of
          trying (sooner if you are 36 or over, or know of a fertility problem). Not medical advice.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimates from your cycle length, based on NHS information. Not medical advice and not contraception.
      </p>
    </Studio>
  );
}

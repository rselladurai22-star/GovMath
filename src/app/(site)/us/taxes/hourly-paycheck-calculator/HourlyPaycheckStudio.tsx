"use client";

import { hourlyPaycheck, type HourlyInput } from "@/lib/us/credits-payroll";
import { stateNote, FREQUENCY_LABEL, PERIODS, type PayFrequency } from "@/lib/us/pay";
import { STATES, stateByCode } from "@/lib/us/states";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, per, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const FREQS = ["weekly", "biweekly", "semimonthly", "monthly"] as const;
const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);
const MULTS = ["1.5", "2"] as const;

const SCHEMA = {
  rate: num(20, 0, 10_000),
  hours: num(40, 0, 80),
  ot: num(0, 0, 60),
  freq: oneOf<PayFrequency>("biweekly", FREQS),
  state: oneOf<string>("TX", CODES),
  status: oneOf<FilingStatus>("single", STATUSES),
  mult: oneOf<(typeof MULTS)[number]>("1.5", MULTS),
  weeks: num(52, 1, 52),
  k401: num(0, 0, 100),
  children: num(0, 0, 15),
  s125: num(0, 0, 1_000_000),
  local: num(0, 0, 10),
};
const ADVANCED = ["status", "mult", "weeks", "k401", "children", "s125", "local"] as const;

const COLORS = { net: "#2a78d6", federal: "#eb6834", fica: "#4a3aa7", state: "#eda100", save: "#1baf7a", benefits: "#9aa1a9" };
const LADDER = [20, 25, 30, 35, 40, 45, 50];

export default function HourlyPaycheckStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input: HourlyInput = {
    rate: v.rate,
    hours: v.hours,
    overtimeHours: v.ot,
    overtimeMultiplier: Number(v.mult),
    weeks: v.weeks,
    frequency: v.freq,
    status: v.status,
    k401Pct: v.k401 / 100,
    rothPct: 0,
    section125: v.s125,
    children: Math.round(v.children),
    otherDependents: 0,
    state: v.state,
    localRate: v.local / 100,
    extraWithholding: 0,
  };
  const r = hourlyPaycheck(input);
  const p = r.pay;
  const n = PERIODS[v.freq];
  const state = stateByCode(v.state);
  const fica = p.socialSecurity.period + p.medicare.period;
  const stateLocal = p.state.period + p.local.period;
  const otPerCheck = (r.overtimeWeekly * v.weeks) / n;

  const ladder = LADDER.map((h) => {
    const x = hourlyPaycheck({ ...input, hours: Math.min(h, 40), overtimeHours: Math.max(0, h - 40), overtimeMultiplier: 1.5 });
    return { h, x };
  });
  const maxLadder = Math.max(1, ...ladder.map((l) => l.x.pay.net.period));
  const totalHours = v.hours + v.ot;

  const segments = [
    { label: "Take-home pay", value: Math.max(0, p.net.period), display: usd(p.net.period, true), color: COLORS.net },
    { label: "Federal income tax", value: p.federal.period, display: usd(p.federal.period, true), color: COLORS.federal },
    { label: "Social Security and Medicare", value: fica, display: usd(fica, true), color: COLORS.fica },
    { label: "State and local tax", value: stateLocal, display: usd(stateLocal, true), color: COLORS.state },
    { label: "401(k)", value: p.k401.period, display: usd(p.k401.period, true), color: COLORS.save },
    { label: "Pre-tax benefits", value: p.section125.period, display: usd(p.section125.period, true), color: COLORS.benefits },
  ].filter((s, i) => i === 0 || s.value > 0);

  const weeksPer = v.weeks / n;
  const row = (label: string, year: number, kind?: "deduction" | "total", swatch?: string) => ({
    label,
    kind,
    swatch,
    values: [usd(v.weeks > 0 ? year / v.weeks : 0, true), usd(year / n, true), usd(year)],
  });

  return (
    <Studio
      title="Your hourly paycheck"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my take-home"
      onReset={st.reset}
      dock={{ label: "Take-home per paycheck", value: usd(p.net.period, true) }}
      inputs={
        <>
          <InputGroup title="Your hours and pay">
            <MoneyField label="Hourly rate" symbol="$" pence value={v.rate} onChange={st.bind("rate")} slider={{ min: 7, max: 100, step: 0.25, ends: ["$7", "$100"] }} />
            <StepperField label="Regular hours a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={80} unit="hours" dp={1} info="Straight-time hours, up to 40 for most hourly workers." />
            <StepperField
              label="Overtime hours a week"
              value={v.ot}
              onChange={st.bind("ot")}
              step={1}
              min={0}
              max={60}
              unit="hours"
              dp={1}
              info="Hours over 40 in the workweek, paid at time and a half under federal law."
            />
            <SelectField label="How often you are paid" value={v.freq} onChange={st.bind("freq")} options={FREQS.map((f) => ({ value: f, label: `${FREQUENCY_LABEL[f]} (${PERIODS[f]} paychecks)` }))} />
            <SelectField label="State you work in" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} info={stateNote(v.state)} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} optional />
            <RadioGroup
              label="Overtime rate"
              value={v.mult}
              onChange={st.bind("mult")}
              options={[
                { value: "1.5", label: "Time and a half" },
                { value: "2", label: "Double time" },
              ]}
              optional
            />
            <StepperField label="Paid weeks a year" value={v.weeks} onChange={st.bind("weeks")} step={1} min={1} max={52} unit="weeks" dp={0} optional info="52 if you get paid vacation or work all year." />
            <StepperField label="Traditional 401(k)" value={v.k401} onChange={st.bind("k401")} step={1} min={0} max={100} unit="%" dp={1} optional info={`Taken before income tax, up to ${usd(US_2026.limits.k401)} in 2026.`} />
            <StepperField label="Children under 17" value={v.children} onChange={(x) => st.set("children", Math.round(x))} step={1} min={0} max={15} unit="children" dp={0} optional info="As on step 3 of Form W-4: $2,200 child tax credit each." />
            <MoneyField label="Pre-tax benefits a year" symbol="$" value={v.s125} onChange={st.bind("s125")} optional info="Health, dental and vision premiums, HSA and FSA through a cafeteria plan." />
            <StepperField label="Local income tax" value={v.local} onChange={st.bind("local")} step={0.1} min={0} max={10} unit="%" dp={2} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Take-home pay, ${FREQUENCY_LABEL[v.freq].toLowerCase()}`}
        value={usd(p.net.period, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            At <b>{usd(v.rate, true)}</b>{" "}an hour for {totalHours} {per(totalHours, "hours")} a week
            {v.ot > 0 ? ` (${v.ot} of them overtime)` : ""}, each paycheck is <b>{usd(p.gross.period, true)}</b>{" "}before tax and <b>{usd(p.net.period, true)}</b>{" "}after.
            You keep about <b>{usd(r.netPerHour, true)}</b>{" "}for every hour you work.
          </>
        }
        badges={[`${usd(r.netPerHour, true)} an hour after tax`, `${percent(p.taxShare, 1)} of pay in tax`, `${usd(p.net.year)} a year`]}
      />

      <Facts
        items={[
          { label: "Gross pay per paycheck", value: usd(p.gross.period, true) },
          { label: "Overtime pay per paycheck", value: usd(otPerCheck, true) },
          { label: "Taxes per paycheck", value: usd(p.federal.period + fica + stateLocal, true) },
          { label: "Take-home per hour worked", value: usd(r.netPerHour, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 federal brackets, standard deduction and state tax" },
          { label: "Hours", value: `The same ${totalHours} hours every week for ${v.weeks} paid weeks` },
          { label: "Form W-4", value: `2020 or later form, ${FILING_LABEL[v.status].toLowerCase()}, no other jobs` },
          { label: "Federal tax", value: "The year's tax on this pay spread evenly over your paychecks" },
          { label: "State", value: state ? stateNote(state.code) : "" },
          { label: "Overtime deduction", value: "Not in withholding; shown separately as tax back when you file" },
        ]}
      />

      <ResultCard title="Where each paycheck goes" sub="Your gross pay split into tax, savings and take-home.">
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="Your pay stub" sub={`Per week, per paycheck (${weeksPer.toFixed(weeksPer % 1 === 0 ? 0 : 2)} weeks) and per year.`}>
        <Statement
          columns={["Week", "Paycheck", "Year"]}
          rows={[
            row(`Regular pay (${v.hours} h × ${usd(v.rate, true)})`, r.regularWeekly * v.weeks),
            ...(v.ot > 0 ? [row(`Overtime (${v.ot} h × ${usd(v.rate * Number(v.mult), true)})`, r.overtimeWeekly * v.weeks)] : []),
            row("Gross pay", p.gross.year),
            ...(p.section125.year > 0 ? [row("Pre-tax benefits", p.section125.year, "deduction", COLORS.benefits)] : []),
            ...(p.k401.year > 0 ? [row("Traditional 401(k)", p.k401.year, "deduction", COLORS.save)] : []),
            row("Federal income tax", p.federal.year, "deduction", COLORS.federal),
            row("Social Security and Medicare", p.socialSecurity.year + p.medicare.year, "deduction", COLORS.fica),
            ...(p.state.year + p.local.year > 0 ? [row("State and local tax", p.state.year + p.local.year, "deduction", COLORS.state)] : []),
            row("Take-home pay", p.net.year, "total", COLORS.net),
          ]}
        />
      </ResultCard>

      <ResultCard title="Part-time, full-time and overtime" sub="Take-home per paycheck at other weekly hours, same rate. Hours over 40 at time and a half.">
        <Compare
          head={["Hours a week", "Take-home per paycheck"]}
          rows={ladder.map((l) => ({
            label: `${l.h} hours (${usd(l.x.netPerHour, true)}/h kept)`,
            value: usd(l.x.pay.net.period, true),
            bar: l.x.pay.net.period / maxLadder,
            current: Math.abs(l.h - totalHours) < 0.01,
          }))}
        />
        <p className="footnote">Each extra hour is taxed at your top rate, so the share you keep falls slightly as hours rise, until overtime pay lifts it again.</p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Things that change your real paycheck.">
        {v.rate > 0 && v.rate < US_2026.minimumWage && (
          <Callout tone="warn" title="Below the federal minimum wage">
            The federal minimum wage is {usd(US_2026.minimumWage, true)} an hour, and many states set a higher one. Tipped workers can be paid less in cash if tips make up the difference.
          </Callout>
        )}
        {r.overtimeTaxSaving > 0 && (
          <Callout tone="good" title="Tax back on your overtime">
            The {usd(r.overtimePremium)} of overtime premium you earn in a year (the half in time and a half) can be deducted for 2025 to 2028. That saves about{" "}
            {usd(r.overtimeTaxSaving)} of federal income tax when you file. See the <a href="/us/taxes/overtime-calculator">overtime calculator</a>.
          </Callout>
        )}
        {v.hours > 40 && (
          <Callout tone="warn" title="Regular hours over 40">
            Most hourly workers must get overtime for hours over 40 in a workweek. Put those hours in the overtime field instead.
          </Callout>
        )}
        {state && <Callout title={state.name}>{stateNote(state.code)}</Callout>}
        <Callout title="Real withholding can differ">
          Payroll uses the IRS tables in Publication 15-T, which work on each paycheck. A week with lots of overtime is withheld as if you earned that much every week, so
          more comes out; the difference returns when you file.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax advice.
      </p>
    </Studio>
  );
}

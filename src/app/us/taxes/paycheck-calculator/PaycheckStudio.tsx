"use client";

import { paycheck, fromHourly, stateNote, FREQUENCY_LABEL, PERIODS, type PayFrequency, type PaycheckInput } from "@/lib/us/pay";
import { STATES, stateByCode } from "@/lib/us/states";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, per, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const FREQS = ["weekly", "biweekly", "semimonthly", "monthly"] as const;
const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  pay: oneOf<"salary" | "hourly">("salary", ["salary", "hourly"]),
  salary: num(60_000, 0, 100_000_000),
  hourly: num(25, 0, 100_000),
  hours: num(40, 0, 168),
  freq: oneOf<PayFrequency>("biweekly", FREQS),
  status: oneOf<FilingStatus>("single", STATUSES),
  state: oneOf<string>("TX", CODES),
  stateRate: num(5, 0, 20),
  k401: num(0, 0, 100),
  children: num(0, 0, 15),
  roth: num(0, 0, 100),
  s125: num(0, 0, 1_000_000),
  others: num(0, 0, 15),
  local: num(0, 0, 10),
  extra: num(0, 0, 100_000),
  weeks: num(52, 1, 52),
};
const ADVANCED = ["roth", "s125", "others", "local", "extra", "weeks"] as const;

const COLORS = { net: "#2a78d6", federal: "#eb6834", ss: "#4a3aa7", medicare: "#e87ba4", state: "#eda100", save: "#1baf7a", benefits: "#9aa1a9" };

export default function PaycheckStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const annual = v.pay === "hourly" ? fromHourly(v.hourly, v.hours, v.weeks).annual : v.salary;
  const input: PaycheckInput = {
    salary: annual,
    frequency: v.freq,
    status: v.status,
    k401Pct: v.k401 / 100,
    rothPct: v.roth / 100,
    section125: v.s125,
    children: Math.round(v.children),
    otherDependents: Math.round(v.others),
    state: v.state,
    stateRate: v.stateRate / 100,
    localRate: v.local / 100,
    extraWithholding: v.extra,
  };
  const p = paycheck(input);
  const state = stateByCode(v.state);
  const asks = state?.income.kind === "ask";
  const n = p.periods;
  const fica = p.socialSecurity.period + p.medicare.period;
  const stateLocal = p.state.period + p.local.period;
  const saving = p.k401.period + p.roth.period;

  const ladder = [0, 3, 6, 10, 15].map((pct) => ({ pct, r: paycheck({ ...input, k401Pct: pct / 100 }) }));
  const maxLadder = Math.max(1, ...ladder.map((l) => l.r.net.period));
  const freqRows = FREQS.map((f) => ({ f, r: paycheck({ ...input, frequency: f }) }));
  const maxFreq = Math.max(1, ...freqRows.map((x) => x.r.net.period));
  const onePct = paycheck({ ...input, k401Pct: Math.min(1, input.k401Pct + 0.01) });
  const costOfOnePct = p.net.period - onePct.net.period;
  const addedOnePct = onePct.k401.period - p.k401.period;

  const segments = [
    { label: "Take-home pay", value: Math.max(0, p.net.period), display: usd(p.net.period, true), color: COLORS.net },
    { label: "Federal income tax", value: p.federal.period, display: usd(p.federal.period, true), color: COLORS.federal },
    { label: "Social Security", value: p.socialSecurity.period, display: usd(p.socialSecurity.period, true), color: COLORS.ss },
    { label: "Medicare", value: p.medicare.period, display: usd(p.medicare.period, true), color: COLORS.medicare },
    { label: "State and local tax", value: stateLocal, display: usd(stateLocal, true), color: COLORS.state },
    { label: "401(k) savings", value: saving, display: usd(saving, true), color: COLORS.save },
    { label: "Pre-tax benefits", value: p.section125.period, display: usd(p.section125.period, true), color: COLORS.benefits },
  ].filter((s, i) => i === 0 || s.value > 0);

  const row = (label: string, line: { year: number }, kind?: "deduction" | "total", swatch?: string) => ({
    label,
    kind,
    swatch,
    values: [usd(line.year / n, true), usd(line.year / 12, true), usd(line.year)],
  });

  return (
    <Studio
      title="Your paycheck"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my paycheck"
      onReset={st.reset}
      dock={{ label: "Take-home per paycheck", value: usd(p.net.period, true) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <Segmented
              label="How you are paid"
              value={v.pay}
              onChange={st.bind("pay")}
              options={[
                { value: "salary", label: "Salary" },
                { value: "hourly", label: "Hourly" },
              ]}
            />
            {v.pay === "salary" ? (
              <MoneyField label="Salary a year (before tax)" symbol="$" value={v.salary} onChange={st.bind("salary")} slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} />
            ) : (
              <>
                <MoneyField label="Hourly rate" symbol="$" pence value={v.hourly} onChange={st.bind("hourly")} />
                <StepperField label="Hours a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={80} unit="hours" dp={1} />
              </>
            )}
            <SelectField label="How often you are paid" value={v.freq} onChange={st.bind("freq")} options={FREQS.map((f) => ({ value: f, label: `${FREQUENCY_LABEL[f]} (${PERIODS[f]} paychecks)` }))} />
          </InputGroup>
          <InputGroup title="Your taxes">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <SelectField label="State you work in" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} info={stateNote(v.state)} />
            {asks && (
              <StepperField
                label={`${state?.name ?? "State"} income tax rate`}
                value={v.stateRate}
                onChange={st.bind("stateRate")}
                step={0.25}
                min={0}
                max={15}
                unit="%"
                dp={2}
                info="This state taxes income at graduated rates. Enter the share of your pay you expect to go in state income tax: your last return or a recent pay stub shows it."
              />
            )}
            <StepperField label="Traditional 401(k)" value={v.k401} onChange={st.bind("k401")} step={1} min={0} max={100} unit="%" dp={1} info={`Taken before income tax, up to the 2026 limit of ${usd(US_2026.limits.k401)}.`} />
            <StepperField label="Children under 17" value={v.children} onChange={(x) => st.set("children", Math.round(x))} step={1} min={0} max={15} unit="children" dp={0} info="As on step 3 of your Form W-4: $2,200 child tax credit each." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Roth 401(k)" value={v.roth} onChange={st.bind("roth")} step={1} min={0} max={100} unit="%" dp={1} optional info="Taken after tax, so it does not lower your tax today." />
            <MoneyField
              label="Pre-tax benefits a year"
              symbol="$"
              value={v.s125}
              onChange={st.bind("s125")}
              optional
              info="Health, dental and vision premiums, HSA and FSA paid through your employer's cafeteria (Section 125) plan. Free of income tax, Social Security and Medicare."
            />
            <StepperField label="Other dependents" value={v.others} onChange={(x) => st.set("others", Math.round(x))} step={1} min={0} max={15} unit="people" dp={0} optional info="Older children and relatives you support: $500 credit each." />
            <StepperField label="Local income tax" value={v.local} onChange={st.bind("local")} step={0.1} min={0} max={10} unit="%" dp={2} optional info="City or county income tax, for example in New York City, Philadelphia, Detroit, Ohio cities or Indiana counties." />
            <MoneyField label="Extra federal withholding per paycheck" symbol="$" value={v.extra} onChange={st.bind("extra")} optional info="Step 4(c) of Form W-4." />
            {v.pay === "hourly" && <StepperField label="Paid weeks a year" value={v.weeks} onChange={st.bind("weeks")} step={1} min={1} max={52} unit="weeks" dp={0} optional />}
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
            On <b>{usd(annual)}</b> a year, paid {PERIODS[v.freq]} times, each paycheck is <b>{usd(p.gross.period, true)}</b> before tax. After federal tax, Social Security, Medicare
            {p.state.year > 0 ? `, ${state?.name ?? "state"} tax` : ""}
            {saving > 0 ? " and your 401(k)" : ""} you keep <b>{usd(p.net.period, true)}</b>, or <b>{usd(p.net.year)}</b> a year.
          </>
        }
        badges={[`${percent(p.taxShare, 1)} of pay goes in tax`, `${percent(p.marginalFederal)} federal bracket`, `${usd(p.net.year / 12)} a month`]}
      />

      <Facts
        items={[
          { label: "Gross pay per paycheck", value: usd(p.gross.period, true) },
          { label: "Federal income tax", value: usd(p.federal.period, true) },
          { label: "Social Security and Medicare", value: usd(fica, true) },
          { label: "State and local tax", value: usd(stateLocal, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 rates, brackets and standard deduction" },
          { label: "Form W-4", value: `2020 or later form, ${FILING_LABEL[v.status].toLowerCase()}, no other jobs or income` },
          { label: "Federal tax", value: "The year's tax on this pay, spread evenly over your paychecks" },
          { label: "State", value: state ? stateNote(state.code) : "" },
          { label: "FICA", value: `Social Security 6.2% up to ${usd(US_2026.socialSecurity.wageBase)}; Medicare 1.45%, plus 0.9% on high pay` },
        ]}
      />

      <ResultCard title="Where each paycheck goes" sub="Your gross pay split into tax, savings and take-home.">
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="Your pay stub" sub="Per paycheck, per month and per year.">
        <Statement
          columns={["Paycheck", "Month", "Year"]}
          rows={[
            row("Gross pay", p.gross),
            ...(p.section125.year > 0 ? [row("Pre-tax benefits", p.section125, "deduction", COLORS.benefits)] : []),
            ...(p.k401.year > 0 ? [row("Traditional 401(k)", p.k401, "deduction", COLORS.save)] : []),
            row("Federal income tax", p.federal, "deduction", COLORS.federal),
            row("Social Security (6.2%)", p.socialSecurity, "deduction", COLORS.ss),
            row("Medicare", p.medicare, "deduction", COLORS.medicare),
            ...(p.state.year > 0 ? [row("State income tax", p.state, "deduction", COLORS.state)] : []),
            ...(p.local.year > 0 ? [row("Local income tax", p.local, "deduction", COLORS.state)] : []),
            ...(p.roth.year > 0 ? [row("Roth 401(k)", p.roth, "deduction", COLORS.save)] : []),
            row("Take-home pay", p.net, "total", COLORS.net),
          ]}
        />
      </ResultCard>

      <ResultCard title="What your 401(k) costs per paycheck" sub="Take-home at different traditional 401(k) rates.">
        <Compare
          head={["401(k) rate", "Take-home"]}
          rows={ladder.map((l) => ({
            label: `${l.pct}% (${usd(l.r.k401.period, true)} saved)`,
            value: usd(l.r.net.period, true),
            delta: l.pct === 0 ? undefined : `−${usd(ladder[0].r.net.period - l.r.net.period, true)}`,
            deltaTone: "down" as const,
            bar: l.r.net.period / maxLadder,
            current: Math.abs(l.pct - v.k401) < 0.01,
          }))}
        />
        <p className="footnote">
          Each extra 1% puts {usd(addedOnePct, true)} into your 401(k) but cuts take-home by only {usd(costOfOnePct, true)}, because it comes out before income tax.
        </p>
      </ResultCard>

      <ResultCard title="Paycheck by pay schedule" sub="The same yearly pay, paid more or less often.">
        <Compare
          head={["Schedule", "Take-home per paycheck"]}
          rows={freqRows.map((x) => ({
            label: `${FREQUENCY_LABEL[x.f]} (${PERIODS[x.f]} a year)`,
            value: usd(x.r.net.period, true),
            bar: x.r.net.period / maxFreq,
            current: x.f === v.freq,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Things that change the figure on your real pay stub.">
        {state && <Callout title={`${state.name}`}>{stateNote(state.code)}</Callout>}
        {p.k401Capped && (
          <Callout tone="warn" title="401(k) limit reached">
            {v.k401}% of your pay is more than the 2026 limit of {usd(US_2026.limits.k401)}, so we capped it. People aged 50 or over can add up to {usd(US_2026.limits.k401CatchUp)} more.
          </Callout>
        )}
        {v.children > 0 && (
          <Callout tone="good" title="Child tax credit">
            Your withholding counts the credit for {v.children} {per(v.children, "children")}. Any refundable part (up to $1,700 a child) comes back as a refund when you file in 2027, not in your paychecks.
          </Callout>
        )}
        {annual > US_2026.socialSecurity.wageBase && (
          <Callout title="Social Security stops at the wage base">
            Social Security tax applies only to the first {usd(US_2026.socialSecurity.wageBase)} of pay in 2026. We averaged it over the year; in practice it stops once you pass the cap, so late-year paychecks are bigger.
          </Callout>
        )}
        <Callout title="Real withholding can differ">
          Employers use the IRS percentage-method tables, which round and can differ by a few dollars a paycheck. Bonuses are often withheld at a flat 22%.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax advice.
      </p>
    </Studio>
  );
}

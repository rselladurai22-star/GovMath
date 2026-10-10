"use client";

import { CPI_LATEST, raise, raisePath, yearsToDouble, type RaiseInput } from "@/lib/us/credits-payroll";
import { stateNote, FREQUENCY_LABEL, PERIODS, type PayFrequency } from "@/lib/us/pay";
import { STATES } from "@/lib/us/states";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const FREQS = ["weekly", "biweekly", "semimonthly", "monthly"] as const;
const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const CODES = STATES.map((s) => s.code);

const SCHEMA = {
  pay: oneOf<"salary" | "hourly">("salary", ["salary", "hourly"]),
  salary: num(60_000, 0, 100_000_000),
  hourly: num(20, 0, 100_000),
  hours: num(40, 0, 80),
  mode: oneOf<"pct" | "amount">("pct", ["pct", "amount"]),
  pct: num(4, -50, 200),
  amount: num(3_000, 0, 10_000_000),
  hourlyRaise: num(1, 0, 10_000),
  state: oneOf<string>("TX", CODES),
  status: oneOf<FilingStatus>("single", STATUSES),
  freq: oneOf<PayFrequency>("biweekly", FREQS),
  k401: num(0, 0, 100),
  children: num(0, 0, 15),
  inflation: num(Math.round(CPI_LATEST * 1000) / 10, 0, 50),
  years: num(10, 1, 40),
};
const ADVANCED = ["status", "freq", "k401", "children", "inflation", "years"] as const;

const COLORS = { net: "#2a78d6", federal: "#eb6834", fica: "#4a3aa7", state: "#eda100", save: "#1baf7a", real: "#9aa1a9" };

export default function RaiseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const yearHours = v.hours * 52;
  const oldPay = v.pay === "hourly" ? v.hourly * yearHours : v.salary;
  const value = v.mode === "pct" ? v.pct / 100 : v.pay === "hourly" ? v.hourlyRaise * yearHours : v.amount;
  const inflation = v.inflation / 100;
  const input: RaiseInput = {
    oldPay,
    mode: v.mode,
    value,
    inflation,
    frequency: v.freq,
    status: v.status,
    k401Pct: v.k401 / 100,
    rothPct: 0,
    section125: 0,
    children: Math.round(v.children),
    otherDependents: 0,
    state: v.state,
    localRate: 0,
    extraWithholding: 0,
  };
  const r = raise(input);
  const n = PERIODS[v.freq];
  const d = (a: { year: number }, b: { year: number }) => a.year - b.year;
  const fed = d(r.after.federal, r.before.federal);
  const fica = d(r.after.socialSecurity, r.before.socialSecurity) + d(r.after.medicare, r.before.medicare);
  const stateTax = d(r.after.state, r.before.state) + d(r.after.local, r.before.local);
  const save = d(r.after.k401, r.before.k401);
  const years = Math.round(v.years);
  const path = raisePath(oldPay, r.pct, inflation, years);
  const double = yearsToDouble(r.pct);
  const newHourly = v.pay === "hourly" && yearHours > 0 ? r.newPay / yearHours : 0;
  const cut = r.raise < 0;

  const segments = [
    { label: "Extra take-home pay", value: Math.max(0, r.netRaise), display: usd(r.netRaise), color: COLORS.net },
    { label: "Federal income tax", value: Math.max(0, fed), display: usd(fed), color: COLORS.federal },
    { label: "Social Security and Medicare", value: Math.max(0, fica), display: usd(fica), color: COLORS.fica },
    { label: "State tax", value: Math.max(0, stateTax), display: usd(stateTax), color: COLORS.state },
    { label: "401(k)", value: Math.max(0, save), display: usd(save), color: COLORS.save },
  ].filter((s, i) => i === 0 || s.value > 0);

  const row = (label: string, b: { year: number }, a: { year: number }, kind?: "deduction" | "total", swatch?: string) => ({
    label,
    kind,
    swatch,
    values: [usd(b.year / n, true), usd(a.year / n, true), `${a.year - b.year >= 0 ? "+" : "−"}${usd(Math.abs(a.year - b.year) / n, true)}`],
  });

  return (
    <Studio
      title="Your raise"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See my raise"
      onReset={st.reset}
      dock={{ label: "Extra take-home per paycheck", value: usd(r.netRaise / n, true) }}
      inputs={
        <>
          <InputGroup title="Your pay now">
            <RadioGroup
              label="How you are paid"
              value={v.pay}
              onChange={st.bind("pay")}
              options={[
                { value: "salary", label: "Salary" },
                { value: "hourly", label: "Hourly" },
              ]}
            />
            {v.pay === "salary" ? (
              <MoneyField label="Current salary a year" symbol="$" value={v.salary} onChange={st.bind("salary")} slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} />
            ) : (
              <>
                <MoneyField label="Current hourly rate" symbol="$" pence value={v.hourly} onChange={st.bind("hourly")} />
                <StepperField label="Hours a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={80} unit="hours" dp={1} />
              </>
            )}
            <SelectField label="State you work in" value={v.state} onChange={st.bind("state")} options={STATES.map((s) => ({ value: s.code, label: s.name }))} info={stateNote(v.state)} />
          </InputGroup>
          <InputGroup title="Your raise">
            <RadioGroup
              label="Raise given as"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "pct", label: "Percent" },
                { value: "amount", label: v.pay === "hourly" ? "Dollars an hour" : "Dollars a year" },
              ]}
            />
            {v.mode === "pct" ? (
              <StepperField label="Raise" value={v.pct} onChange={st.bind("pct")} step={0.5} min={0} max={50} unit="%" dp={2} />
            ) : v.pay === "hourly" ? (
              <MoneyField label="Raise an hour" symbol="$" pence value={v.hourlyRaise} onChange={st.bind("hourlyRaise")} />
            ) : (
              <MoneyField label="Raise a year" symbol="$" value={v.amount} onChange={st.bind("amount")} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} optional />
            <SelectField label="How often you are paid" value={v.freq} onChange={st.bind("freq")} options={FREQS.map((f) => ({ value: f, label: `${FREQUENCY_LABEL[f]} (${PERIODS[f]} paychecks)` }))} optional />
            <StepperField label="Traditional 401(k)" value={v.k401} onChange={st.bind("k401")} step={1} min={0} max={100} unit="%" dp={1} optional info={`A percentage of pay, so it grows with the raise. Limit ${usd(US_2026.limits.k401)} in 2026.`} />
            <StepperField label="Children under 17" value={v.children} onChange={(x) => st.set("children", Math.round(x))} step={1} min={0} max={15} unit="children" dp={0} optional />
            <StepperField
              label="Inflation"
              value={v.inflation}
              onChange={st.bind("inflation")}
              step={0.1}
              min={0}
              max={15}
              unit="%"
              dp={1}
              optional
              info={`Prices rose ${percent(CPI_LATEST, 1)} in the 12 months to August 2026 (CPI-U, Bureau of Labor Statistics).`}
            />
            <StepperField label="Years of raises to project" value={v.years} onChange={st.bind("years")} step={1} min={1} max={40} unit="years" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="New pay a year"
        value={usd(r.newPay)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            A {percent(r.pct, 1)} raise on <b>{usd(oldPay)}</b>{" "}adds <b>{usd(r.raise)}</b>{" "}a year{newHourly > 0 ? `, a new rate of ${usd(newHourly, true)} an hour` : ""}. After tax
            {save > 0 ? " and your 401(k)" : ""} you take home <b>{usd(r.netRaise / n, true)}</b>{" "}more each paycheck, or <b>{usd(r.netRaise)}</b>{" "}a year.
          </>
        }
        badges={[`${percent(Math.max(0, r.kept))} of the raise kept`, `Real raise ${r.real >= 0 ? "+" : ""}${percent(r.real, 2)}`, `${usd(r.raise / n, true)} more gross per paycheck`]}
      />

      <Facts
        items={[
          { label: "Raise a year (gross)", value: usd(r.raise) },
          { label: "Extra take-home a year", value: usd(r.netRaise) },
          { label: "Tax on each extra dollar", value: percent(r.taxOnRaise, 1) },
          { label: "Raise after inflation", value: `${r.real >= 0 ? "+" : "−"}${percent(Math.abs(r.real), 2)}`, tone: r.real < 0 ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 federal brackets, standard deduction and state tax, for a full year at each pay" },
          { label: "Pay", value: v.pay === "hourly" ? `${v.hours} hours a week for 52 weeks` : "Salary paid evenly across the year" },
          { label: "Form W-4", value: `${FILING_LABEL[v.status]}, no other jobs or income` },
          { label: "Inflation", value: `${v.inflation}% a year, the same every year` },
          { label: "Future raises", value: `The same ${percent(r.pct, 1)} every year in the projection` },
        ]}
      />

      <ResultCard title="Where your raise goes" sub={`Your ${usd(r.raise)} a year split into tax, savings and take-home.`}>
        {cut || r.raise === 0 ? <p className="footnote">Enter a raise above zero to see how it splits.</p> : <SplitBar segments={segments} />}
      </ResultCard>

      <ResultCard title="Your paycheck before and after" sub={`Per paycheck, ${FREQUENCY_LABEL[v.freq].toLowerCase()}.`}>
        <Statement
          columns={["Now", "After the raise", "Change"]}
          rows={[
            row("Gross pay", r.before.gross, r.after.gross),
            ...(r.after.k401.year > 0 ? [row("Traditional 401(k)", r.before.k401, r.after.k401, "deduction", COLORS.save)] : []),
            row("Federal income tax", r.before.federal, r.after.federal, "deduction", COLORS.federal),
            row("Social Security", r.before.socialSecurity, r.after.socialSecurity, "deduction", COLORS.fica),
            row("Medicare", r.before.medicare, r.after.medicare, "deduction", COLORS.fica),
            ...(r.after.state.year > 0 ? [row("State income tax", r.before.state, r.after.state, "deduction", COLORS.state)] : []),
            row("Take-home pay", r.before.net, r.after.net, "total", COLORS.net),
          ]}
        />
      </ResultCard>

      <ResultCard title={`The same raise every year for ${years} ${years === 1 ? "year" : "years"}`} sub="Your pay in future dollars and in today's dollars after inflation.">
        <AreaChart
          ariaLabel="Pay over time with yearly raises"
          series={[
            { key: "pay", label: "Pay", color: COLORS.net, values: path.map((p) => p.pay), fill: true },
            { key: "real", label: "In today's dollars", color: COLORS.real, values: path.map((p) => p.real), dashed: true },
          ]}
          xLabel={(i) => `Year ${path[i]?.year ?? 0}`}
          yFormat={usdShort}
          initial={path.length - 1}
          readout={(i) => (
            <>
              After <b>{path[i]?.year ?? 0}</b>{" "}{path[i]?.year === 1 ? "year" : "years"}: <b>{usd(path[i]?.pay ?? 0)}</b>, worth <b>{usd(path[i]?.real ?? 0)}</b>{" "}in today&apos;s dollars.
            </>
          )}
        />
        <p className="footnote">
          {double !== null ? `At ${percent(r.pct, 1)} a year your pay doubles in about ${double.toFixed(1)} years. ` : ""}
          {yearsToDouble(inflation) !== null ? `Prices double in about ${(yearsToDouble(inflation) ?? 0).toFixed(1)} years at ${v.inflation}% inflation.` : ""}
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="What the figures mean for you.">
        {r.real < 0 && (
          <Callout tone="warn" title="A pay cut in real terms">
            Prices rose faster than your pay. To keep up with {v.inflation}% inflation you would need a raise of {usd(r.keepUp)} a year.
          </Callout>
        )}
        {r.after.marginalFederal > r.before.marginalFederal && (
          <Callout title="Part of the raise is in a higher bracket">
            The raise takes you from the {percent(r.before.marginalFederal)} to the {percent(r.after.marginalFederal)} federal bracket. Only the dollars above the line pay the higher
            rate, so a raise never lowers your take-home pay.
          </Callout>
        )}
        {v.children > 0 && (
          <Callout title="Credits can shrink">
            At lower incomes a raise can reduce the earned income credit, and above $200,000 ($400,000 joint) the child tax credit. Check the{" "}
            <a href="/us/taxes/earned-income-credit-calculator">earned income credit calculator</a>.
          </Callout>
        )}
        <Callout title="Negotiating">
          Ask in dollars a year, and compare offers by take-home pay. A 401(k) match or better health plan can be worth as much as a few percent of salary.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for 2026. Not tax or financial advice.
      </p>
    </Studio>
  );
}

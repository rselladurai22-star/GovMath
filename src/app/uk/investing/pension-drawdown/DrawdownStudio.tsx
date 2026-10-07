"use client";

import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, gbpShort, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { drawdown, type TaxFreeMode } from "@/lib/investing/savings";
import { PENSION_2026 } from "@/lib/investing/wrappers";
import { STATE_PENSION } from "@/lib/investing/retirement";

const FULL_SP = Math.round(STATE_PENSION.newWeekly * 52 * 100) / 100;

const SCHEMA = {
  pot: num(250_000, 0, 10_000_000),
  age: num(66, 55, 90),
  mode: oneOf<TaxFreeMode>("upfront", ["upfront", "phased", "none"]),
  withdrawal: num(15_000, 0, 1_000_000),
  sp: num(FULL_SP, 0, 50_000),
  spAge: num(67, 60, 70),
  growth: num(4, -5, 15),
  inflation: num(2.5, 0, 10),
  other: num(0, 0, 1_000_000),
  scotland: bool(false),
};
const ADVANCED = ["sp", "spAge", "growth", "inflation", "other", "scotland"] as const;

export default function DrawdownStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = {
    pot: v.pot,
    age: v.age,
    taxFree: v.mode,
    withdrawal: v.withdrawal,
    growth: v.growth / 100,
    inflation: v.inflation / 100,
    statePension: v.sp,
    spAge: v.spAge,
    otherIncome: v.other,
    scotland: v.scotland,
  };
  const r = drawdown(input);
  const lasts = r.runsOutAt === null ? "beyond 100" : `age ${r.runsOutAt}`;
  const fy = r.firstYear;
  const levels = [0.6, 0.8, 1, 1.2, 1.4].map((k) => Math.round((v.withdrawal * k) / 500) * 500).filter((x, i, a) => x > 0 && a.indexOf(x) === i);
  const ladder = levels.map((w) => ({ w, x: drawdown({ ...input, withdrawal: w }) }));
  const maxYears = Math.max(1, ...ladder.map((l) => (l.x.runsOutAt ?? 100) - v.age));
  const startRate = v.pot > 0 ? v.withdrawal / (v.pot - r.lumpSum || 1) : 0;

  return (
    <Studio
      title="Your pension pot and the income you want"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="See how long my pension lasts"
      onReset={st.reset}
      dock={{ label: "Pot lasts until", value: lasts }}
      inputs={
        <>
          <InputGroup title="Your pension">
            <MoneyField label="Pension pot" value={v.pot} onChange={st.bind("pot")} big slider={{ min: 0, max: 1_000_000, step: 5_000, ends: ["£0", "£1m"] }} hint="Defined contribution pensions: workplace, personal and SIPPs together." />
            <StepperField label="Your age now" value={v.age} onChange={(n) => st.set("age", Math.round(n))} step={1} min={55} max={90} unit="years" dp={0} hint="You can usually access a pension from 55, rising to 57 in April 2028." />
            <RadioGroup
              label="Tax-free cash"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "upfront", label: "Take 25% as a lump sum now" },
                { value: "phased", label: "Take it bit by bit: 25% of each withdrawal tax-free" },
                { value: "none", label: "Do not take tax-free cash" },
              ]}
            />
            <MoneyField label="Yearly withdrawal, before tax" value={v.withdrawal} onChange={st.bind("withdrawal")} hint="In today's money. It rises each year with inflation." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="State Pension a year" value={v.sp} onChange={st.bind("sp")} optional hint={`The full new State Pension is ${gbp(FULL_SP, true)} a year in 2026/27.`} />
            <StepperField label="State Pension age" value={v.spAge} onChange={(n) => st.set("spAge", Math.round(n))} step={1} min={60} max={70} unit="years" dp={0} optional />
            <StepperField label="Investment growth after fees" value={v.growth} onChange={st.bind("growth")} step={0.5} min={-5} max={15} unit="%" dp={1} optional />
            <StepperField label="Inflation" value={v.inflation} onChange={st.bind("inflation")} step={0.5} min={0} max={10} unit="%" dp={1} optional />
            <MoneyField label="Other taxable income a year" value={v.other} onChange={st.bind("other")} optional hint="Part-time work, a final salary pension or rent." />
            <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your pot lasts until"
        value={lasts}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {r.lumpSum > 0 ? (
              <>
                You take <b>{gbp(r.lumpSum)}</b> tax-free now, leaving {gbp(v.pot - r.lumpSum)} invested.{" "}
              </>
            ) : null}
            Withdrawing <b>{gbp(v.withdrawal)}</b> a year, rising with inflation, and growing at {percent(v.growth / 100, 1)}, the pot {r.runsOutAt === null ? <>still has money left at 100</> : <>runs out at <b>{r.runsOutAt}</b></>}. In the first year your
            total income after tax is <b>{gbp(fy?.net ?? 0)}</b>.
          </>
        }
        badges={[v.mode === "upfront" ? "25% lump sum" : v.mode === "phased" ? "Phased tax-free cash" : "No tax-free cash", `${percent(startRate, 1)} withdrawal rate`, `${percent(v.growth / 100, 1)} growth`]}
      />

      <Facts
        items={[
          { label: "Tax-free lump sum", value: gbp(r.lumpSum) },
          { label: "Income after tax, year 1", value: gbp(fy?.net ?? 0), note: "Including State Pension" },
          { label: "Income Tax, year 1", value: gbp(fy?.tax ?? 0) },
          { label: "Total tax over the plan", value: gbp(r.totalTax) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Growth", value: `${percent(v.growth / 100, 1)} a year after fees, every year` },
          { label: "Withdrawals", value: `${gbp(v.withdrawal)} a year, rising ${percent(v.inflation / 100, 1)} a year` },
          { label: "State Pension", value: `${gbp(v.sp)} a year from ${v.spAge}, rising with inflation` },
          { label: "Tax", value: "2026/27 bands and rates for every year" },
        ]}
      />

      {r.path.length > 1 && (
        <ResultCard title="Your pot year by year" sub="Value at the end of each year.">
          <AreaChart
            ariaLabel="Pension pot value by age"
            series={[
              { key: "pot", label: "Pot", color: "#5b1e6e", values: r.path.map((p) => p.pot), fill: true },
              { key: "net", label: "Income after tax", color: "#0f9f6e", values: r.path.map((p) => p.net) },
            ]}
            xLabel={(i) => `Age ${r.path[i]?.age ?? ""}`}
            yFormat={gbpShort}
            initial={0}
            readout={(i) => {
              const p = r.path[i];
              if (!p) return null;
              return (
                <>
                  Age <b>{p.age}</b>: withdraw {gbp(p.withdrawal)}, income after tax <b>{gbp(p.net)}</b>, pot <b>{gbp(p.pot)}</b>.
                </>
              );
            }}
            hint="Drag across the chart, or use the arrow keys, to read any age."
          />
        </ResultCard>
      )}

      <ResultCard title="Different withdrawals" sub="How long the pot lasts.">
        <Compare
          head={["Yearly withdrawal", "Lasts until"]}
          rows={ladder.map((l) => ({ label: gbp(l.w), value: l.x.runsOutAt === null ? "100+" : `Age ${l.x.runsOutAt}`, bar: ((l.x.runsOutAt ?? 100) - v.age) / maxYears, current: l.w === v.withdrawal }))}
        />
      </ResultCard>

      <ResultCard title="Things to know">
        <Callout tone="warn" title="Taking taxable income limits future contributions">
          Once you take taxable money from a pension through drawdown, the Money Purchase Annual Allowance applies: only {gbp(PENSION_2026.mpaa)} a year can then go into defined contribution pensions with tax relief.
        </Callout>
        <Callout title={`Tax-free cash is capped at ${gbp(PENSION_2026.lumpSumAllowance)}`}>
          The Lump Sum Allowance limits the total tax-free cash you can take from all your pensions, for most people.
        </Callout>
        <Callout title="Free guidance">
          Pension Wise, from MoneyHelper, offers a free appointment to talk through your options before you take money from a defined contribution pension.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Illustration with steady growth. Real returns vary, and losses early in retirement can shorten how long a pot lasts.
      </p>
    </Studio>
  );
}

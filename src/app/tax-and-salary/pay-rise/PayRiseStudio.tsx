"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import { payRise } from "@/lib/tax/pay-and-perks";
import { CPI_LATEST } from "@/lib/investing/growth";

const SCHEMA = {
  salary: num(35_000, 0, 10_000_000),
  mode: oneOf<"pct" | "amount">("pct", ["pct", "amount"]),
  pct: num(5, -50, 100),
  newSalary: num(36_750, 0, 10_000_000),
  ...taxParams,
  inflation: num(Math.round(CPI_LATEST.rate * 1000) / 10, -5, 20),
  kids: num(0, 0, 10),
};
const ADVANCED = [...TAX_KEYS, "inflation", "kids"] as const;

export default function PayRiseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const newSalary = v.mode === "pct" ? v.salary * (1 + v.pct / 100) : v.newSalary;
  const base = { salary: v.salary, region: v.region, plan: v.plan, pensionPct: v.pension, inflation: v.inflation / 100, children: v.kids };
  const r = payRise({ ...base, newSalary });
  const deducted = r.rise - r.extraAfterCharge;
  const ladder = [1, 2, 3, 5, 10].map((p) => ({ p, x: payRise({ ...base, newSalary: v.salary * (1 + p / 100) }) }));
  const maxL = Math.max(1, ...ladder.map((l) => l.x.extraAfterCharge));

  return (
    <Studio
      title="Your salary and the pay rise"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my pay rise"
      onReset={st.reset}
      dock={{ label: "Extra a month", value: gbp(r.extraAfterCharge / 12) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField label="Salary now, a year" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} />
            <Segmented
              label="The rise as"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "pct", label: "A percentage" },
                { value: "amount", label: "A new salary" },
              ]}
            />
            {v.mode === "pct" ? (
              <StepperField label="Pay rise" value={v.pct} onChange={st.bind("pct")} step={0.5} min={-50} max={100} unit="%" dp={1} />
            ) : (
              <MoneyField label="New salary, a year" value={v.newSalary} onChange={st.bind("newSalary")} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <TaxSituationFields region={v.region} plan={v.plan} pension={v.pension} onRegion={st.bind("region")} onPlan={st.bind("plan")} onPension={st.bind("pension")} />
            <StepperField label="Inflation over the year" value={v.inflation} onChange={st.bind("inflation")} step={0.1} min={-5} max={20} unit="%" dp={1} optional hint={`CPI was ${percent(CPI_LATEST.rate, 1)} in ${CPI_LATEST.month}.`} />
            <StepperField label="Children you get Child Benefit for" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional hint="Over £60,000 the High Income Child Benefit Charge takes some back." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Extra take-home a month"
        value={gbp(r.extraAfterCharge / 12)}
        unit={`${gbp(r.extraAfterCharge)} a year`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.rise <= 0 ? (
            <>Enter a pay rise to see what it is worth.</>
          ) : (
            <>
              A rise of <b>{gbp(r.rise)}</b> ({percent(r.risePct, 1)}) adds <b>{gbp(r.extraAfterCharge)}</b> a year to your take-home: you keep <b>{percent(r.keptShare)}</b> of it. After {percent(v.inflation / 100, 1)}{" "}
              inflation your take-home is {r.realChange >= 0 ? <>worth <b>{gbp(r.realChange)}</b> more</> : <>worth <b>{gbp(-r.realChange)}</b> less</>} in real terms.
            </>
          )
        }
        badges={[`${percent(r.risePct, 1)} rise`, `Keep ${percent(r.keptShare)}`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "Take-home now", value: gbp(r.before), note: `${gbp(r.before / 12)} a month` },
          { label: "Take-home after", value: gbp(r.after), note: `${gbp(r.after / 12)} a month` },
          { label: "Real change", value: gbp(r.realChange), tone: r.realChange >= 0 ? "good" : "bad", note: `${percent(r.realChangePct, 1)} after inflation` },
          { label: "Rise to beat inflation", value: gbp(r.riseToMatchInflation), note: v.salary > 0 ? `${percent(r.riseToMatchInflation / v.salary, 1)} of salary` : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27 rates and thresholds for both salaries" },
          { label: "Tax code", value: "1257L, no other income" },
          { label: "Pension", value: v.pension > 0 ? `${v.pension}% by salary sacrifice` : "None" },
          { label: "Inflation", value: `${percent(v.inflation / 100, 1)} over the year` },
        ]}
      />

      <ResultCard title="Where your pay rise goes" sub={`On a rise of ${gbp(r.rise)} a year.`}>
        <SplitBar
          segments={[
            { label: "You keep", value: r.extraAfterCharge, display: gbp(r.extraAfterCharge), color: "#0f9f6e" },
            { label: "Tax, NI, loan and pension", value: Math.max(0, deducted - r.extraCharge), display: gbp(Math.max(0, deducted - r.extraCharge)), color: "#f59e0b" },
            ...(r.extraCharge > 0 ? [{ label: "Child Benefit charge", value: r.extraCharge, display: gbp(r.extraCharge), color: "#db2777" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Different rises" sub="Extra take-home a year.">
        <Compare head={["Pay rise", "Extra a year"]} rows={ladder.map((l) => ({ label: `${l.p}% (${gbp(l.x.rise)})`, value: gbp(l.x.extraAfterCharge), delta: `Keep ${percent(l.x.keptShare)}`, bar: l.x.extraAfterCharge / maxL }))} />
      </ResultCard>

      <ResultCard title="What it means">
        {r.keptShare < 0.5 && r.rise > 0 && (
          <Callout tone="warn" title={`You keep less than half of this rise`}>
            Part of it falls in a high marginal rate band: the 40% higher rate, the £100,000 Personal Allowance taper or the Child Benefit charge. Paying more into your pension by salary sacrifice can claw some back.
          </Callout>
        )}
        {r.realChange < 0 && r.rise > 0 && (
          <Callout tone="warn" title="A real-terms pay cut">
            Your take-home rises by less than prices, so you can buy less with it. You would need a rise of about {gbp(r.riseToMatchInflation)} to stand still.
          </Callout>
        )}
        <Callout title="Universal Credit">
          If you get Universal Credit, it falls by 55p for each extra pound of take-home pay, on top of tax and NI. See the <a href="/benefits/universal-credit-taper">UC taper calculator</a>.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 tax rules. A rise part-way through the year is spread across that tax year; this compares full years.
      </p>
    </Studio>
  );
}

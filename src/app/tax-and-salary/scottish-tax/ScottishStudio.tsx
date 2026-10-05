"use client";

import { computeTakeHome, marginalRate, STUDENT_PLAN_ORDER, STUDENT_PLANS } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { taxParams } from "@/components/flagship/taxOptions";

const SCHEMA = {
  salary: num(45_000),
  bonus: num(0),
  plan: taxParams.plan,
  pension: taxParams.pension,
};
const ADVANCED = ["bonus", "plan", "pension"] as const;

export default function ScottishStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { gross: v.salary, bonus: v.bonus, pensionPct: v.pension, plan: v.plan };
  const scot = computeTakeHome({ ...base, region: "scotland" });
  const ruk = computeTakeHome({ ...base, region: "ruk" });
  const diff = scot.incomeTaxTotal - ruk.incomeTaxTotal;
  const marginal = marginalRate({ ...base, region: "scotland" });
  const adjusted = scot.adjustedGross;
  const inFiftyZone = adjusted > 43_662 && adjusted < 50_270;
  const bands = scot.taxBands;
  const maxBand = Math.max(...bands.map((b) => b.income), 1);
  const top = bands[bands.length - 1];

  const ladder = [20_000, 30_000, 40_000, 50_000, 60_000, 80_000, 100_000, 150_000].map((g) => {
    const a = computeTakeHome({ gross: g, bonus: 0, pensionPct: v.pension, plan: "none", region: "scotland" });
    const b = computeTakeHome({ gross: g, bonus: 0, pensionPct: v.pension, plan: "none", region: "ruk" });
    const d = a.incomeTaxTotal - b.incomeTaxTotal;
    return [gbp(g), gbp(a.incomeTaxTotal), gbp(b.incomeTaxTotal), `${d >= 0 ? "+" : "−"}${gbp(Math.abs(d))}`];
  });

  return (
    <Studio
      title="Your pay"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my Scottish tax"
      onReset={st.reset}
      dock={{ label: "Take-home a month", value: gbp(scot.takeHome / 12) }}
      inputs={
        <>
          <InputGroup title="Your pay">
            <MoneyField
              label="Yearly salary (before tax)"
              value={v.salary}
              onChange={st.bind("salary")}
              big
              slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }}
              hint="You pay Scottish Income Tax if you live in Scotland. Your tax code starts with S."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Bonus this year" value={v.bonus} onChange={st.bind("bonus")} optional />
            <SelectField
              label="Student loan"
              value={v.plan}
              onChange={st.bind("plan")}
              optional
              options={STUDENT_PLAN_ORDER.map((id) => {
                const p = STUDENT_PLANS[id];
                return { value: id, label: id === "none" ? p.label : `${p.label}: ${Math.round(p.rate * 100)}% over ${gbp(p.threshold)}` };
              })}
              hint="Most people who studied in Scotland are on Plan 4."
            />
            <StepperField
              label="Pension contribution"
              value={v.pension}
              onChange={(n) => st.set("pension", Math.round(n))}
              step={1}
              min={0}
              max={60}
              unit="%"
              optional
              hint="By salary sacrifice, before tax and National Insurance."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your Scottish Income Tax"
        value={gbp(scot.incomeTaxTotal)}
        unit="a year"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.salary <= 0 ? (
            <>Enter your salary to see your Scottish tax.</>
          ) : Math.abs(diff) < 1 ? (
            <>That is the same as you would pay in the rest of the UK.</>
          ) : (
            <>
              That is <b>{gbp(Math.abs(diff))}</b> a year {diff > 0 ? "more" : "less"} than in England, Wales or Northern Ireland. You take home{" "}
              <b>{gbp(scot.takeHome / 12)}</b> a month.
            </>
          )
        }
        badges={[`Top band: ${top.label.toLowerCase()} (${percent(top.rate)})`, `${percent(marginal)} on your next £1`, `${percent(scot.totalGross > 0 ? scot.incomeTaxTotal / scot.totalGross : 0, 1)} effective`]}
      />

      <Facts
        items={[
          { label: "Take-home a year", value: gbp(scot.takeHome), tone: "good" },
          { label: "Take-home a month", value: gbp(scot.takeHome / 12) },
          { label: "National Insurance", value: gbp(scot.ni.total), note: "Same UK-wide" },
          { label: "Vs rest of UK", value: `${diff >= 0 ? "+" : "−"}${gbp(Math.abs(diff))}`, tone: diff > 0 ? "warn" : "good", note: "Income Tax a year" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Tax code", value: "S1257L" },
          { label: "Pension", value: v.pension > 0 ? `${v.pension}% salary sacrifice` : "None" },
          { label: "Student loan", value: STUDENT_PLANS[v.plan].label },
        ]}
      />

      {bands.length > 1 && (
        <ResultCard title="Your income, band by band" sub="Scotland's six bands. Only the income inside each band is taxed at its rate.">
          <Compare
            head={["Band", "Tax on that slice"]}
            rows={bands.map((b, i) => ({
              label: (
                <>
                  {b.label} <span style={{ color: "var(--muted)" }}>· {percent(b.rate)}</span>
                </>
              ),
              value: gbp(b.tax),
              delta: `on ${gbp(b.income)}`,
              bar: b.income / maxBand,
              current: i === bands.length - 1,
            }))}
          />
        </ResultCard>
      )}

      {v.salary > 0 && (
        <ResultCard title="Scotland and the rest of the UK" sub="The same pay, taxed under each system.">
          <Statement
            columns={["Scotland", "Rest of UK"]}
            rows={[
              { label: "Income Tax", values: [gbp(-scot.incomeTaxTotal), gbp(-ruk.incomeTaxTotal)], kind: "deduction" },
              { label: "National Insurance", values: [gbp(-scot.ni.total), gbp(-ruk.ni.total)], kind: "deduction" },
              ...(v.plan !== "none" ? [{ label: "Student loan", values: [gbp(-scot.studentLoan), gbp(-ruk.studentLoan)], kind: "deduction" as const }] : []),
              { label: "Take-home a year", values: [gbp(scot.takeHome), gbp(ruk.takeHome)], kind: "total" },
              { label: "Take-home a month", values: [gbp(scot.takeHome / 12), gbp(ruk.takeHome / 12)] },
            ]}
          />
        </ResultCard>
      )}

      {v.salary > 0 && (
        <ResultCard title="Worth knowing" sub="Where the Scottish system works differently.">
          {inFiftyZone && (
            <Callout tone="warn" title="You are in the 50% zone">
              Between £43,663 and £50,270 you pay 42% Scottish Income Tax and 8% UK National Insurance on each extra pound. Pension contributions here save 50p in
              the pound.
            </Callout>
          )}
          {adjusted > 100_000 && adjusted < 125_140 && (
            <Callout tone="warn" title="Your tax-free allowance is being withdrawn">
              Between £100,000 and £125,140 you lose £1 of allowance for every £2 earned. With the 45% advanced rate that is an effective 67.5% Income Tax rate.
            </Callout>
          )}
          <Callout title="Savings and dividends use UK rates">
            Scottish rates apply only to earnings, pensions and rental income. Interest and dividends are taxed using the UK bands and rates.
          </Callout>
        </ResultCard>
      )}

      <DataTable summary="Scottish and UK Income Tax at different salaries" columns={["Salary", "Scotland", "Rest of UK", "Difference"]} rows={ladder} />

      <p className="footnote" style={{ textAlign: "center" }}>2026/27 Scottish rates and UK National Insurance. Assumes a standard S1257L tax code.</p>
    </Studio>
  );
}

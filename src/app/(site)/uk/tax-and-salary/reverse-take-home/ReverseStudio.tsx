"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import { STUDENT_PLANS, computeTakeHome } from "@/lib/tax/take-home-engine";
import { grossForTakeHome, hourlyFor } from "@/lib/tax/reverse";

const COLORS = { keep: "#0f9f6e", tax: "#f59e0b", ni: "#5b1e6e", loan: "#db2777", pension: "#2e0a3a" };

type Period = "month" | "year" | "week";
const PER_YEAR: Record<Period, number> = { month: 12, year: 1, week: 52 };

const SCHEMA = {
  target: num(2_500, 0, 1_000_000),
  period: oneOf<Period>("month", ["month", "year", "week"]),
  ...taxParams,
  hours: num(37.5, 1, 80),
};
const ADVANCED = [...TAX_KEYS, "hours"] as const;

export default function ReverseStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const yearly = v.target * PER_YEAR[v.period];
  const opts = { region: v.region, plan: v.plan, pensionPct: v.pension };
  const gross = grossForTakeHome({ target: yearly, ...opts });
  const t = computeTakeHome({ gross, bonus: 0, pensionPct: v.pension, plan: v.plan, region: v.region });
  const hourly = hourlyFor(gross, v.hours);
  const deductions = t.incomeTaxTotal + t.ni.total + t.studentLoan;
  const inTrap = t.adjustedGross > 100_000 && t.adjustedGross < 125_140;
  const step = v.period === "year" ? 5_000 : v.period === "month" ? 250 : 50;
  const ladder = [-2, -1, 0, 1, 2]
    .map((k) => v.target + k * step)
    .filter((x) => x > 0)
    .map((x) => ({ x, g: grossForTakeHome({ target: x * PER_YEAR[v.period], ...opts }) }));
  const maxG = Math.max(1, ...ladder.map((l) => l.g));
  const word = v.period === "year" ? "a year" : v.period === "month" ? "a month" : "a week";

  return (
    <Studio
      title="The take-home pay you want"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find the salary I need"
      onReset={st.reset}
      dock={{ label: "Salary needed", value: gbp(gross) }}
      inputs={
        <>
          <InputGroup title="Your target">
            <MoneyField
              label="Take-home pay you want"
              value={v.target}
              onChange={st.bind("target")}
              big
              slider={{ min: 0, max: v.period === "year" ? 150_000 : v.period === "month" ? 12_000 : 3_000, step: v.period === "week" ? 10 : 50 }}
              hint="What you want to land in your bank after Income Tax, National Insurance, student loan and pension."
            />
            <Segmented
              label="Per"
              value={v.period}
              onChange={st.bind("period")}
              options={[
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
                { value: "week", label: "Week" },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <TaxSituationFields
              region={v.region}
              plan={v.plan}
              pension={v.pension}
              onRegion={st.bind("region")}
              onPlan={st.bind("plan")}
              onPension={st.bind("pension")}
            />
            <StepperField label="Paid hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} min={1} max={80} unit="hours" dp={1} optional hint="To turn the salary into an hourly rate." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Salary you need"
        value={gbp(gross)}
        unit="a year before tax"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          yearly <= 0 ? (
            <>Enter the take-home pay you want.</>
          ) : (
            <>
              To take home <b>{gbp(v.target)}</b> {word} you need a salary of <b>{gbp(gross)}</b>, about <b>{gbp(gross / 12)}</b> a month or <b>{gbp(hourly, true)}</b> an hour. Of that,{" "}
              <b>{gbp(deductions)}</b> a year goes in deductions{t.pensionContribution > 0 ? <> and {gbp(t.pensionContribution)} into your pension</> : null}.
            </>
          )
        }
        badges={[REGION_LABEL[v.region], STUDENT_PLANS[v.plan].short === "None" ? "No student loan" : STUDENT_PLANS[v.plan].short, `${percent(t.effectiveRate)} deducted`]}
      />

      <Facts
        items={[
          { label: "Salary a month", value: gbp(gross / 12) },
          { label: "Hourly rate", value: gbp(hourly, true), note: `At ${v.hours} hours a week` },
          { label: "Income Tax", value: gbp(t.incomeTaxTotal) },
          { label: "National Insurance", value: gbp(t.ni.total) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27 rates and thresholds" },
          { label: "Tax code", value: "1257L, no other income or benefits in kind" },
          { label: "Where you live", value: REGION_LABEL[v.region] },
          { label: "Pension", value: v.pension > 0 ? `${v.pension}% by salary sacrifice` : "None" },
        ]}
      />

      <ResultCard title="Where the salary goes" sub={`A salary of ${gbp(gross)} a year.`}>
        <SplitBar
          segments={[
            { label: "Take-home", value: t.takeHome, display: gbp(t.takeHome), color: COLORS.keep },
            { label: "Income Tax", value: t.incomeTaxTotal, display: gbp(t.incomeTaxTotal), color: COLORS.tax },
            { label: "National Insurance", value: t.ni.total, display: gbp(t.ni.total), color: COLORS.ni },
            ...(t.studentLoan > 0 ? [{ label: "Student loan", value: t.studentLoan, display: gbp(t.studentLoan), color: COLORS.loan }] : []),
            ...(t.pensionContribution > 0 ? [{ label: "Pension", value: t.pensionContribution, display: gbp(t.pensionContribution), color: COLORS.pension }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Nearby targets" sub={`Salary needed for take-home ${word}.`}>
        <Compare
          head={["Take-home", "Salary needed"]}
          rows={ladder.map((l) => ({ label: gbp(l.x), value: gbp(l.g), bar: l.g / maxG, current: l.x === v.target }))}
        />
      </ResultCard>

      <ResultCard title="What it means">
        <Callout title={`Each extra £1 of salary gives you ${Math.round(t.marginalKeep * 100)}p`}>
          At this salary {percent(t.marginalRate)} of any pay rise goes in deductions, so to take home £100 more you need about {gbp(100 / Math.max(0.01, t.marginalKeep))} more salary.
        </Callout>
        {inTrap && (
          <Callout tone="warn" title="You are in the £100,000 tax trap">
            Between £100,000 and £125,140 your tax-free Personal Allowance is withdrawn, so pay in this range is taxed at an effective 60% plus National Insurance. Paying more into your pension can bring your
            income back below £100,000.
          </Callout>
        )}
        {v.region === "scotland" && (
          <Callout title="Scottish Income Tax">
            Scotland has six Income Tax bands. On lower salaries you pay a little less than in the rest of the UK; above about £30,000 you pay more.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 tax year. Assumes a standard tax code and the same pay every month. Benefits in kind, other income and tax code changes are not included.
      </p>
    </Studio>
  );
}

"use client";

import { overtimeOutcome } from "@/lib/tax/overtime";
import type { PayPeriod } from "@/lib/tax/payslip";
import { STUDENT_PLANS } from "@/lib/tax/take-home-engine";
import { NMW_2026 } from "@/lib/benefits/minimum-wage";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, Chips, Field, InputGroup, MoneyField, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

const COLORS = { keep: "#0f9f6e", tax: "#f59e0b", ni: "#5b1e6e", loan: "#db2777", pension: "#2e0a3a" };
type Basis = "salary" | "hourly";

const SCHEMA = {
  basis: oneOf<Basis>("salary", ["salary", "hourly"]),
  salary: num(32_000),
  rate: num(16.5, 0, 10_000),
  hours: num(37.5, 1, 100),
  ot: num(10, 0, 200),
  mult: num(1.5, 1, 3),
  ot2: num(0, 0, 200),
  mult2: num(2, 1, 3),
  regular: bool(true),
  period: oneOf<PayPeriod>("month", ["month", "week"]),
  pensionOnOt: bool(false),
  ...taxParams,
};
const ADVANCED = ["ot2", "mult2", "regular", "period", "pensionOnOt", ...TAX_KEYS] as const;
const pounds = (n: number) => gbp(n, true);
const MULTS = [
  { value: 1, label: "1×" },
  { value: 1.25, label: "1.25×" },
  { value: 1.5, label: "1.5×" },
  { value: 2, label: "2×" },
];

export default function OvertimeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const word = v.period === "month" ? "month" : "week";
  const n = v.period === "month" ? 12 : 52;
  const salary = v.basis === "salary" ? v.salary : v.rate * v.hours * 52;
  const common = { salary, hours: v.hours, period: v.period, regular: v.regular, pensionPct: v.pension, pensionOnOvertime: v.pensionOnOt, plan: v.plan, region: v.region };
  const tiers = [{ hours: v.ot, multiplier: v.mult }, ...(v.ot2 > 0 ? [{ hours: v.ot2, multiplier: v.mult2 }] : [])];
  const r = overtimeOutcome({ ...common, tiers });
  const year = v.regular ? r.kept * n : r.kept;
  const yearIncome = salary + (v.regular ? r.gross * n : r.gross);
  const crossesHigher = salary < 50_270 && yearIncome > 50_270;
  const crossesTrap = yearIncome > 100_000 && salary < 125_140;
  const hasLoan = v.plan !== "none";
  const weeklyHours = v.hours + r.overtimeHours / (52 / n);
  const nlw = NMW_2026["national-living-wage"].hourly;

  const ladder = [5, 10, 15, 20, 30, 40].map((h) => {
    const o = overtimeOutcome({ ...common, tiers: [{ hours: h, multiplier: v.mult }] });
    return [`${h} hours`, gbp(o.gross), gbp(o.kept), pounds(o.keptPerHour)];
  });

  return (
    <Studio
      title="Your pay and overtime"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my overtime"
      onReset={st.reset}
      dock={{ label: `Overtime kept a ${word}`, value: gbp(r.kept) }}
      inputs={
        <>
          <InputGroup title="Your basic pay">
            <Segmented
              label="You know your"
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "salary", label: "Yearly salary" },
                { value: "hourly", label: "Hourly rate" },
              ]}
            />
            {v.basis === "salary" ? (
              <MoneyField label="Yearly salary (before tax)" value={v.salary} onChange={st.bind("salary")} big slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} />
            ) : (
              <MoneyField label="Basic hourly rate" value={v.rate} onChange={st.bind("rate")} pence big max={10_000} slider={{ min: 0, max: 60, step: 0.25, ends: ["£0", "£60"] }} />
            )}
            <StepperField label="Contracted hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} min={1} max={100} unit="hrs" dp={1} />
          </InputGroup>
          <InputGroup title="Your overtime">
            <StepperField label={`Overtime hours a ${word}`} value={v.ot} onChange={st.bind("ot")} step={1} min={0} max={200} unit="hrs" />
            <Field label="Overtime rate" hint="1.5× is time and a half; 2× is double time.">
              <Chips label="Overtime rate" value={v.mult} onChange={st.bind("mult")} options={MULTS} />
            </Field>
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label={`Hours at a second rate, a ${word}`} value={v.ot2} onChange={st.bind("ot2")} step={1} min={0} max={200} unit="hrs" optional hint="For example Sunday or bank holiday hours." />
            <StepperField label="Second rate" value={v.mult2} onChange={st.bind("mult2")} step={0.25} min={1} max={3} unit="×" dp={2} optional />
            <Switch
              label={`Overtime every ${word}`}
              checked={v.regular}
              onChange={st.bind("regular")}
              optional
              hint={v.regular ? "Regular overtime raises your income for the whole year." : "A one-off: the extra Income Tax is all taken in that pay period."}
            />
            <Segmented
              label="You are paid"
              value={v.period}
              onChange={st.bind("period")}
              optional
              options={[
                { value: "month", label: "Monthly" },
                { value: "week", label: "Weekly" },
              ]}
            />
            <TaxSituationFields region={v.region} plan={v.plan} pension={v.pension} onRegion={st.bind("region")} onPlan={st.bind("plan")} onPension={st.bind("pension")} />
            <Switch label="Pension also taken from overtime" checked={v.pensionOnOt} onChange={st.bind("pensionOnOt")} optional hint="Many schemes take the same percentage from all pay." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Your overtime after tax, a ${word}`}
        value={gbp(r.kept)}
        unit={`of ${gbp(r.gross)} overtime pay`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.gross <= 0 ? (
            <>Add your overtime hours to see what they are worth.</>
          ) : (
            <>
              <b>{r.overtimeHours}</b> hours of overtime pays <b>{gbp(r.gross)}</b> before tax. After deductions you keep <b>{gbp(r.kept)}</b>, which is{" "}
              <b>{pounds(r.keptPerHour)}</b> for each extra hour{v.regular && <>, or about <b>{gbp(year)}</b> over a year</>}.
            </>
          )
        }
        badges={[`${percent(r.deductionRate)} deducted`, `Basic rate ${pounds(r.hourly)} an hour`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "Income Tax", value: gbp(r.tax) },
          { label: "National Insurance", value: gbp(r.ni) },
          hasLoan ? { label: "Student loan", value: gbp(r.studentLoan) } : { label: "Kept an hour", value: pounds(r.keptPerHour) },
          { label: v.regular ? "Kept over a year" : "Kept in total", value: gbp(year), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Overtime", value: v.regular ? `Every ${word}` : `One ${word} only` },
          { label: "Tax code", value: "1257L, cumulative" },
          { label: "Student loan", value: STUDENT_PLANS[v.plan].label },
        ]}
      />

      {r.gross > 0 && (
        <ResultCard title="Where your overtime pay goes" sub={`One ${word}'s overtime, split by who gets it.`}>
          <SplitBar
            segments={[
              { label: "You keep", value: r.kept, display: gbp(r.kept), color: COLORS.keep },
              ...(r.pension > 0 ? [{ label: "Pension", value: r.pension, display: gbp(r.pension), color: COLORS.pension }] : []),
              { label: "Income Tax", value: r.tax, display: gbp(r.tax), color: COLORS.tax },
              { label: "National Insurance", value: r.ni, display: gbp(r.ni), color: COLORS.ni },
              ...(hasLoan ? [{ label: "Student loan", value: r.studentLoan, display: gbp(r.studentLoan), color: COLORS.loan }] : []),
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title={`Your ${word} with and without overtime`} sub="Take-home pay for a normal pay period and one with your overtime.">
        <Statement
          columns={[`Normal ${word}`, `With overtime`]}
          rows={[
            { label: "Take-home", values: [gbp(r.normalNet, true), gbp(r.overtimeNet, true)], kind: "total" },
            { label: "Hours a week", values: [`${v.hours}`, `${Math.round(weeklyHours * 10) / 10}`] },
          ]}
        />
      </ResultCard>

      {r.gross > 0 && (
        <ResultCard title="Worth knowing" sub="How your overtime interacts with the rules.">
          {crossesTrap ? (
            <Callout tone="warn" title="Some of this overtime is taxed at an effective 60%">
              Above £100,000 you lose £1 of tax-free allowance for every £2 earned. Overtime in that band keeps only about 38p in the pound. Extra pension
              contributions bring your income back down.
            </Callout>
          ) : crossesHigher ? (
            <Callout title="Your overtime reaches the 40% band">
              With overtime your yearly pay passes £50,270, so the part above it is taxed at 40% instead of 20%. National Insurance drops to 2% on it.
            </Callout>
          ) : null}
          {weeklyHours > 48 && (
            <Callout tone="warn" title={`About ${Math.round(weeklyHours)} hours a week`}>
              Most workers cannot be required to work more than 48 hours a week on average unless they have opted out in writing.
            </Callout>
          )}
          {r.hourly > 0 && r.hourly < nlw && (
            <Callout tone="warn" title="Your basic rate is below the National Living Wage">
              The minimum for workers aged 21 and over is {pounds(nlw)} an hour from April 2026. Check our minimum wage calculator.
            </Callout>
          )}
          <Callout title="Overtime and holiday pay">
            Regular overtime usually has to be included in your holiday pay for the first four weeks of statutory leave.
          </Callout>
        </ResultCard>
      )}

      <DataTable summary={`Different amounts of overtime a ${word}`} columns={["Overtime", "Gross", "You keep", "Kept an hour"]} rows={ladder} />

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. National Insurance and student loan are worked out on each payment; Income Tax evens out over the year.
      </p>
    </Studio>
  );
}

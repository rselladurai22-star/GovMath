"use client";

import { fromHourly, fromSalary } from "@/lib/tax/hourly";
import { computeTakeHome, STUDENT_PLANS } from "@/lib/tax/take-home-engine";
import { NMW_2026, type NMWBand } from "@/lib/benefits/minimum-wage";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

const COLORS = { keep: "#0f9f6e", tax: "#f59e0b", ni: "#4353ff", loan: "#db2777", pension: "#7c3aed" };
type Direction = "to-salary" | "to-hourly";
const BANDS = Object.keys(NMW_2026) as NMWBand[];

const SCHEMA = {
  dir: oneOf<Direction>("to-salary", ["to-salary", "to-hourly"]),
  rate: num(15, 0, 10_000),
  salary: num(30_000),
  hours: num(37.5, 0, 100),
  weeks: num(52, 1, 52),
  days: num(5, 1, 7),
  ot: num(0, 0, 60),
  otRate: num(1.5, 1, 3),
  age: oneOf<NMWBand>("national-living-wage", BANDS),
  ...taxParams,
};
const ADVANCED = ["weeks", "days", "ot", "otRate", "age", ...TAX_KEYS] as const;

const pounds = (n: number) => gbp(n, true);

export default function HourlyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const toSalary = v.dir === "to-salary";
  const shape = { hours: v.hours, weeks: v.weeks, overtimeHours: v.ot, overtimeRate: v.otRate };
  const pay = toSalary ? fromHourly(v.rate, shape) : fromSalary(v.salary, shape);
  const snap = computeTakeHome({ gross: pay.annual, bonus: 0, pensionPct: v.pension, plan: v.plan, region: v.region });
  const netHourly = pay.annualHours > 0 ? snap.takeHome / pay.annualHours : 0;
  const daily = v.days > 0 ? pay.annual / v.weeks / v.days : 0;
  const minimum = NMW_2026[v.age].hourly;
  const belowMin = pay.hourly > 0 && pay.hourly < minimum - 0.005;
  const vsNLW = NMW_2026["national-living-wage"].hourly;
  const loan = snap.studentLoan;

  const ladder = [16, 20, 25, 30, 35, 37.5, 40].map((h) => {
    const p = toSalary ? fromHourly(v.rate, { ...shape, hours: h, overtimeHours: 0 }) : fromHourly(pay.hourly, { ...shape, hours: h, overtimeHours: 0 });
    const t = computeTakeHome({ gross: p.annual, bonus: 0, pensionPct: v.pension, plan: v.plan, region: v.region });
    return [`${h} hours`, gbp(p.annual), gbp(t.takeHome / 12)];
  });

  return (
    <Studio
      title="Your pay"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={toSalary ? "Work out my salary" : "Work out my hourly rate"}
      onReset={st.reset}
      dock={toSalary ? { label: "Yearly salary", value: gbp(pay.annual) } : { label: "Hourly rate", value: pounds(pay.hourly) }}
      inputs={
        <>
          <InputGroup title="What you know">
            <Segmented
              label="Convert"
              value={v.dir}
              onChange={st.bind("dir")}
              options={[
                { value: "to-salary", label: "Hourly to salary" },
                { value: "to-hourly", label: "Salary to hourly" },
              ]}
            />
            {toSalary ? (
              <MoneyField
                label="Hourly rate (before tax)"
                value={v.rate}
                onChange={st.bind("rate")}
                pence
                big
                max={10_000}
                slider={{ min: 0, max: 60, step: 0.25, ends: ["£0", "£60"] }}
              />
            ) : (
              <MoneyField
                label="Yearly salary (before tax)"
                value={v.salary}
                onChange={st.bind("salary")}
                big
                slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }}
              />
            )}
            <StepperField
              label="Hours a week"
              value={v.hours}
              onChange={st.bind("hours")}
              step={0.5}
              min={0}
              max={100}
              unit="hrs"
              dp={1}
              hint="Your contracted hours, not counting overtime. Full time is usually 35 to 40."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label="Paid weeks a year"
              value={v.weeks}
              onChange={st.bind("weeks")}
              step={1}
              min={1}
              max={52}
              unit="wks"
              optional
              hint="52 if your holiday is paid. Use fewer if you take unpaid time off, e.g. 47 for five weeks unpaid."
            />
            <StepperField label="Days a week" value={v.days} onChange={st.bind("days")} step={1} min={1} max={7} unit="days" optional hint="Used for your daily rate." />
            <StepperField label="Overtime hours a week" value={v.ot} onChange={st.bind("ot")} step={0.5} min={0} max={60} unit="hrs" dp={1} optional />
            <StepperField
              label="Overtime rate"
              value={v.otRate}
              onChange={st.bind("otRate")}
              step={0.25}
              min={1}
              max={3}
              unit="×"
              dp={2}
              optional
              hint="1.5 for time and a half, 2 for double time."
            />
            <SelectField
              label="Your age, for the minimum wage check"
              value={v.age}
              onChange={st.bind("age")}
              optional
              options={BANDS.map((b) => ({ value: b, label: `${NMW_2026[b].age}: ${pounds(NMW_2026[b].hourly)} an hour` }))}
            />
            <TaxSituationFields
              region={v.region}
              plan={v.plan}
              pension={v.pension}
              onRegion={st.bind("region")}
              onPlan={st.bind("plan")}
              onPension={st.bind("pension")}
              pensionAside={`${gbp(snap.pensionContribution)} a year`}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={toSalary ? "Your yearly salary" : "Your hourly rate"}
        value={toSalary ? gbp(pay.annual) : pounds(pay.hourly)}
        unit={toSalary ? "a year before tax" : "an hour before tax"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          pay.annual <= 0 ? (
            <>Enter your pay and hours to see the conversion.</>
          ) : (
            <>
              {toSalary ? (
                <>
                  <b>{pounds(pay.hourly)}</b> an hour for <b>{v.hours}</b> hours a week
                  {v.ot > 0 && <> plus {v.ot} hours of overtime</>} comes to <b>{gbp(pay.annual)}</b> a year.
                </>
              ) : (
                <>
                  A <b>{gbp(v.salary)}</b> salary for <b>{v.hours}</b> hours a week works out at <b>{pounds(pay.hourly)}</b> an hour.
                </>
              )}{" "}
              After tax you take home about <b>{gbp(snap.takeHome / 12)}</b> a month, or <b>{pounds(netHourly)}</b> for each hour worked.
            </>
          )
        }
        badges={[
          `${v.weeks} paid weeks`,
          belowMin ? "Below the minimum wage" : `${percent(vsNLW > 0 ? pay.hourly / vsNLW - 1 : 0)} vs National Living Wage`,
          REGION_LABEL[v.region],
        ]}
      />

      <Facts
        items={[
          { label: "A month", value: gbp(pay.monthly), note: "Before tax" },
          { label: "A week", value: gbp(pay.weekly), note: "Before tax" },
          { label: "A day", value: gbp(daily), note: `${v.days}-day week` },
          { label: "Take-home an hour", value: pounds(netHourly), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Paid weeks", value: v.weeks === 52 ? "52 (holiday paid)" : `${v.weeks} a year` },
          { label: "Tax code", value: "1257L" },
          { label: "Student loan", value: STUDENT_PLANS[v.plan].label },
        ]}
      />

      {pay.annual > 0 && (
        <ResultCard title="Before and after tax" sub="Your pay for each period, and what reaches your bank account.">
          <Statement
            columns={["Before tax", "Take-home"]}
            rows={[
              { label: "An hour", values: [pounds(pay.hourly), pounds(netHourly)] },
              { label: "A day", values: [gbp(daily), gbp(daily * (snap.takeHome / Math.max(pay.annual, 1)))] },
              { label: "A week", values: [gbp(pay.weekly), gbp(snap.takeHome / 52)] },
              { label: "A month", values: [gbp(pay.monthly), gbp(snap.takeHome / 12)] },
              { label: "A year", values: [gbp(pay.annual), gbp(snap.takeHome)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {pay.annual > 0 && (
        <ResultCard title="Where a year's pay goes" sub="Your gross pay, split into what you keep and what is deducted.">
          <SplitBar
            segments={[
              { label: "Take-home", value: snap.takeHome, display: gbp(snap.takeHome), color: COLORS.keep },
              ...(snap.pensionContribution > 0 ? [{ label: "Pension", value: snap.pensionContribution, display: gbp(snap.pensionContribution), color: COLORS.pension }] : []),
              { label: "Income Tax", value: snap.incomeTaxTotal, display: gbp(snap.incomeTaxTotal), color: COLORS.tax },
              { label: "National Insurance", value: snap.ni.total, display: gbp(snap.ni.total), color: COLORS.ni },
              ...(loan > 0 ? [{ label: "Student loan", value: loan, display: gbp(loan), color: COLORS.loan }] : []),
            ]}
            caption={pay.annualOvertime > 0 ? <>Includes <b>{gbp(pay.annualOvertime)}</b> a year of overtime.</> : undefined}
          />
        </ResultCard>
      )}

      {pay.hourly > 0 && (
        <ResultCard title="Minimum wage check" sub={`The legal minimum for ${NMW_2026[v.age].age.toLowerCase()} from April 2026 is ${pounds(minimum)} an hour.`}>
          {belowMin ? (
            <Callout tone="warn" title={`${pounds(minimum - pay.hourly)} an hour below the legal minimum`}>
              At {v.hours} hours a week that is about <b>{gbp((minimum - pay.hourly) * v.hours * v.weeks)}</b> a year short. Check what counts as working time, and
              raise it with your employer or Acas. Use our minimum wage checker for the details.
            </Callout>
          ) : (
            <Callout tone="good" title={`${pounds(pay.hourly - minimum)} an hour above the minimum`}>
              Your basic rate meets the {pounds(minimum)} minimum for your age. Deductions for uniforms or accommodation can still take some workers below it.
            </Callout>
          )}
        </ResultCard>
      )}

      <DataTable summary="The same rate at different hours" columns={["Hours a week", "Yearly pay", "Take-home a month"]} rows={ladder} />

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. Take-home assumes a standard tax code and pay spread evenly through the year.
      </p>
    </Studio>
  );
}

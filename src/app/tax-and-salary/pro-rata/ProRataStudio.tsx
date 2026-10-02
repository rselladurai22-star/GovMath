"use client";

import { proRata } from "@/lib/tax/pro-rata";
import { computeTakeHome, STUDENT_PLANS } from "@/lib/tax/take-home-engine";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, TAX_KEYS, taxParams, TaxSituationFields } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

type Basis = "hours" | "days";

const SCHEMA = {
  salary: num(40_000),
  basis: oneOf<Basis>("hours", ["hours", "days"]),
  hours: num(30, 0, 100),
  ftHours: num(37.5, 1, 100),
  days: num(3, 0, 7),
  ftDays: num(5, 1, 7),
  months: num(12, 1, 12),
  holiday: num(33, 0, 60),
  ...taxParams,
};
const ADVANCED = ["months", "holiday", ...TAX_KEYS] as const;

const oneDp = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-GB");

export default function ProRataStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const byHours = v.basis === "hours";
  const r = proRata({
    fullTimeSalary: v.salary,
    basis: v.basis,
    hours: v.hours,
    fullTimeHours: v.ftHours,
    days: v.days,
    fullTimeDays: v.ftDays,
    months: v.months,
    fullTimeHolidayDays: v.holiday,
  });
  const tax = { pensionPct: v.pension, plan: v.plan, region: v.region, bonus: 0 };
  const yours = computeTakeHome({ ...tax, gross: r.salary });
  const full = computeTakeHome({ ...tax, gross: v.salary });
  const partYear = v.months < 12;
  const yearSnap = computeTakeHome({ ...tax, gross: r.earnedThisYear });
  const keepYou = yours.takeHome / Math.max(1, r.salary);
  const keepFull = full.takeHome / Math.max(1, v.salary);
  const shareWord = byHours ? `${oneDp(v.hours)} of ${oneDp(v.ftHours)} hours` : `${v.days} of ${v.ftDays} days`;

  const ladder = (byHours ? [16, 20, 22.5, 25, 30, 32.5] : [1, 2, 3, 4]).map((x) => {
    const p = proRata({ fullTimeSalary: v.salary, basis: v.basis, hours: x, fullTimeHours: v.ftHours, days: x, fullTimeDays: v.ftDays });
    const t = computeTakeHome({ ...tax, gross: p.salary });
    return [byHours ? `${x} hours` : `${x} day${x === 1 ? "" : "s"}`, percent(p.fte), gbp(p.salary), gbp(t.takeHome / 12)];
  });

  return (
    <Studio
      title="Your job"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my pro-rata pay"
      onReset={st.reset}
      dock={{ label: "Pro-rata salary", value: gbp(r.salary) }}
      inputs={
        <>
          <InputGroup title="The job">
            <MoneyField
              label="Full-time salary"
              value={v.salary}
              onChange={st.bind("salary")}
              big
              slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }}
              hint="The salary advertised for the full-time version of the job (FTE)."
            />
            <Segmented
              label="Your part-time pattern is set in"
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "hours", label: "Hours a week" },
                { value: "days", label: "Days a week" },
              ]}
            />
            {byHours ? (
              <>
                <StepperField label="Your hours a week" value={v.hours} onChange={st.bind("hours")} step={0.5} min={0} max={100} unit="hrs" dp={1} />
                <StepperField label="Full-time hours a week" value={v.ftHours} onChange={st.bind("ftHours")} step={0.5} min={1} max={100} unit="hrs" dp={1} hint="Usually 35 to 40. Check the job advert or contract." />
              </>
            ) : (
              <>
                <StepperField label="Your days a week" value={v.days} onChange={st.bind("days")} step={0.5} min={0} max={7} unit="days" dp={1} />
                <StepperField label="Full-time days a week" value={v.ftDays} onChange={st.bind("ftDays")} step={1} min={1} max={7} unit="days" />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField
              label="Months you work this tax year"
              value={v.months}
              onChange={st.bind("months")}
              step={1}
              min={1}
              max={12}
              unit="months"
              optional
              hint="Starting or leaving part-way through the year? Your tax-free allowance covers the whole year, so tax on a part year is lower."
            />
            <StepperField
              label="Full-time holiday, including bank holidays"
              value={v.holiday}
              onChange={st.bind("holiday")}
              step={1}
              min={0}
              max={60}
              unit="days"
              optional
              hint="The legal minimum is 28 days for a five-day week. 25 days plus 8 bank holidays is 33."
            />
            <TaxSituationFields
              region={v.region}
              plan={v.plan}
              pension={v.pension}
              onRegion={st.bind("region")}
              onPlan={st.bind("plan")}
              onPension={st.bind("pension")}
              pensionAside={`${gbp(yours.pensionContribution)} a year`}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your pro-rata salary"
        value={gbp(r.salary)}
        unit="a year before tax"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.salary <= 0 ? (
            <>Enter the full-time salary to see your pro-rata pay.</>
          ) : (
            <>
              Working <b>{shareWord}</b> is <b>{percent(r.fte)}</b> of full time, so you earn <b>{gbp(r.salary)}</b> a year. That is about{" "}
              <b>{gbp(yours.takeHome / 12)}</b> a month after tax.
            </>
          )
        }
        badges={[`${percent(r.fte)} FTE`, `${gbp(r.hourly, true)} an hour`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "A month, before tax", value: gbp(r.salary / 12) },
          { label: "Take-home a month", value: gbp(yours.takeHome / 12), tone: "good" },
          { label: "Holiday a year", value: `${oneDp(r.holidayDays)} days`, note: `${oneDp(r.holidayHours)} hours` },
          { label: "Share you keep", value: percent(keepYou), note: `vs ${percent(keepFull)} full time` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Full time", value: byHours ? `${oneDp(v.ftHours)} hours a week` : `${v.ftDays} days a week` },
          { label: "Tax code", value: "1257L" },
          { label: "Student loan", value: STUDENT_PLANS[v.plan].label },
        ]}
      />

      {v.salary > 0 && (
        <ResultCard title="Your pay next to full time" sub="A month's pay for the full-time job and for your hours.">
          <Statement
            columns={["Full time", "Your hours"]}
            rows={[
              { label: "Gross pay", values: [gbp(v.salary / 12), gbp(r.salary / 12)] },
              ...(v.pension > 0 ? [{ label: "Pension", values: [gbp(-full.pensionContribution / 12), gbp(-yours.pensionContribution / 12)], kind: "deduction" as const }] : []),
              { label: "Income Tax", values: [gbp(-full.incomeTaxTotal / 12), gbp(-yours.incomeTaxTotal / 12)], kind: "deduction" },
              { label: "National Insurance", values: [gbp(-full.ni.total / 12), gbp(-yours.ni.total / 12)], kind: "deduction" },
              ...(v.plan !== "none" ? [{ label: "Student loan", values: [gbp(-full.studentLoan / 12), gbp(-yours.studentLoan / 12)], kind: "deduction" as const }] : []),
              { label: "Take-home", values: [gbp(full.takeHome / 12), gbp(yours.takeHome / 12)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {v.salary > 0 && r.fte < 1 && (
        <ResultCard title="Fewer hours, less tax" sub="You give up a share of your pay, but a smaller share of your take-home.">
          <Compare
            head={["What changes", "Share of full time"]}
            rows={[
              { label: "Hours worked", value: percent(r.fte), bar: r.fte },
              { label: "Gross pay", value: percent(r.fte), bar: r.fte },
              { label: "Take-home pay", value: percent(full.takeHome > 0 ? yours.takeHome / full.takeHome : 0), bar: full.takeHome > 0 ? yours.takeHome / full.takeHome : 0, current: true },
            ]}
          />
          <p className={s.hint}>
            Your tax-free allowance and the lower tax bands cover a bigger share of a smaller salary, so you keep a higher proportion of what you earn.
          </p>
        </ResultCard>
      )}

      {partYear && v.salary > 0 && (
        <ResultCard title={`Working ${v.months} months this tax year`} sub="What you earn between now and 5 April, and the tax on it.">
          <Facts
            items={[
              { label: "Earned this tax year", value: gbp(r.earnedThisYear) },
              { label: "Take-home this tax year", value: gbp(yearSnap.takeHome), tone: "good" },
              { label: "Tax this tax year", value: gbp(yearSnap.incomeTaxTotal) },
              { label: "Holiday this year", value: `${oneDp(r.holidayDays)} days` },
            ]}
          />
          <Callout title="You may be due a tax refund">
            Payroll taxes each month as if you earn it all year. If you only work part of the year and have no other income, you may have paid too much. HMRC
            usually refunds it automatically after the tax year ends, or through your tax code.
          </Callout>
        </ResultCard>
      )}

      <DataTable
        summary={byHours ? "The same job at different hours" : "The same job at different days"}
        columns={[byHours ? "Hours a week" : "Days a week", "Share of full time", "Yearly pay", "Take-home a month"]}
        rows={ladder}
      />

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. Holiday is shown in full-time-length days; your employer may express it in hours.
      </p>
    </Studio>
  );
}

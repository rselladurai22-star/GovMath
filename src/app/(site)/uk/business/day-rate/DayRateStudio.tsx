"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { STUDENT_PLAN_ORDER, STUDENT_PLANS, type StudentPlan } from "@/lib/tax/take-home-engine";
import { dayRate, VAT_THRESHOLD_2026 } from "@/lib/business/freelance";
import { grossForTakeHome } from "@/lib/tax/reverse";

const SCHEMA = {
  target: num(40_000, 0, 1_000_000),
  expenses: num(3_000, 0, 1_000_000),
  weeksOff: num(5, 0, 26),
  nonBillable: num(20, 0, 200),
  days: num(5, 1, 7),
  bankHolidays: num(8, 0, 20),
  sick: num(5, 0, 60),
  pension: num(0, 0, 100_000),
  scottish: bool(false),
  plan: oneOf<StudentPlan>("none", STUDENT_PLAN_ORDER),
};
const ADVANCED = ["days", "bankHolidays", "sick", "pension", "scottish", "plan"] as const;

export default function DayRateStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const base = { expenses: v.expenses, pension: v.pension, weeksOff: v.weeksOff, bankHolidays: v.bankHolidays, sickDays: v.sick, nonBillable: v.nonBillable, daysPerWeek: v.days, scottish: v.scottish, plan: v.plan };
  const r = dayRate({ ...base, target: v.target });
  const salary = grossForTakeHome({ target: v.target, region: v.scottish ? "scotland" : "ruk", plan: v.plan, pensionPct: 0 });
  const targets = [30_000, 40_000, 50_000, 60_000, 80_000].map((t) => ({ t, x: dayRate({ ...base, target: t }) }));
  const maxT = Math.max(1, ...targets.map((x) => x.x.dayRate));

  return (
    <Studio
      title="The income you want and the days you work"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my day rate"
      onReset={st.reset}
      dock={{ label: "Day rate", value: gbp(r.dayRate) }}
      inputs={
        <>
          <InputGroup title="What you want to earn">
            <MoneyField label="Take-home pay you want a year" value={v.target} onChange={st.bind("target")} big slider={{ min: 0, max: 150_000, step: 1_000, ends: ["£0", "£150k"] }} hint="After Income Tax, National Insurance and student loan." />
            <MoneyField label="Business costs a year" value={v.expenses} onChange={st.bind("expenses")} hint="Insurance, software, equipment, accountant, travel and other allowable expenses." />
          </InputGroup>
          <InputGroup title="Your working year">
            <StepperField label="Weeks off a year" value={v.weeksOff} onChange={st.bind("weeksOff")} step={1} min={0} max={26} unit="weeks" dp={0} hint="Holidays, not counting bank holidays." />
            <StepperField label="Unpaid days for admin, sales and training" value={v.nonBillable} onChange={st.bind("nonBillable")} step={1} min={0} max={200} unit="days" dp={0} hint="Days nobody pays for: finding work, invoicing, learning." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Days worked a week" value={v.days} onChange={st.bind("days")} step={1} min={1} max={7} unit="days" dp={0} optional />
            <StepperField label="Bank holidays off" value={v.bankHolidays} onChange={st.bind("bankHolidays")} step={1} min={0} max={20} unit="days" dp={0} optional />
            <StepperField label="Sick days to allow for" value={v.sick} onChange={st.bind("sick")} step={1} min={0} max={60} unit="days" dp={0} optional hint="No sick pay when self-employed." />
            <MoneyField label="Pension contributions a year" value={v.pension} onChange={st.bind("pension")} optional hint="Gross, into a personal pension. Basic-rate relief is added by your provider." />
            <Switch label="I pay Scottish Income Tax" checked={v.scottish} onChange={st.bind("scottish")} optional />
            <SelectField label="Student loan" value={v.plan} onChange={st.bind("plan")} optional options={STUDENT_PLAN_ORDER.map((id) => ({ value: id, label: STUDENT_PLANS[id].label }))} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Day rate you need"
        value={gbp(r.dayRate)}
        unit={`about ${gbp(r.hourly)} an hour`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            To take home <b>{gbp(v.target)}</b> as a sole trader, you need turnover of <b>{gbp(r.turnover)}</b> over <b>{r.billableDays} paid days</b>. That covers {gbp(v.expenses)} of costs and{" "}
            {gbp(r.tax + r.ni + r.studentLoan)} of tax and National Insurance. An employee would need a salary of about {gbp(salary)} for the same take-home.
          </>
        }
        badges={[`${r.billableDays} billable days`, `Turnover ${gbp(r.turnover)}`, r.overVat ? "Over the VAT threshold" : "Under the VAT threshold"]}
      />

      <Facts
        items={[
          { label: "Billable days a year", value: String(r.billableDays) },
          { label: "Profit needed", value: gbp(r.profit) },
          { label: "Income Tax", value: gbp(r.tax) },
          { label: "Class 4 NI", value: gbp(r.ni) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Business", value: "Sole trader, outside IR35, paying tax through Self Assessment" },
          { label: "Day", value: "7.5 hours, for the hourly figure" },
          { label: "Tax year", value: "2026/27 rates; no other income" },
          { label: "VAT", value: "Day rate before VAT" },
        ]}
      />

      <ResultCard title="Where each day's rate goes">
        <SplitBar
          segments={[
            { label: "Take-home", value: v.target, display: gbp(v.target / Math.max(1, r.billableDays)), color: "#0f9f6e" },
            { label: "Tax and NI", value: r.tax + r.ni + r.studentLoan, display: gbp((r.tax + r.ni + r.studentLoan) / Math.max(1, r.billableDays)), color: "#f59e0b" },
            { label: "Business costs", value: v.expenses, display: gbp(v.expenses / Math.max(1, r.billableDays)), color: "#5b1e6e" },
            ...(v.pension > 0 ? [{ label: "Pension (your share)", value: v.pension * 0.8, display: gbp((v.pension * 0.8) / Math.max(1, r.billableDays)), color: "#2e0a3a" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Day rate for other take-home targets">
        <Compare head={["Take-home a year", "Day rate"]} rows={targets.map((x) => ({ label: gbp(x.t), value: gbp(x.x.dayRate), delta: x.x.overVat ? "VAT due" : undefined, bar: x.x.dayRate / maxT, current: x.t === v.target }))} />
      </ResultCard>

      <ResultCard title="Things to think about">
        {r.overVat && (
          <Callout tone="warn" title="You would need to register for VAT">
            Turnover of {gbp(r.turnover)} is over the £{VAT_THRESHOLD_2026.register.toLocaleString("en-GB")} threshold. Add 20% VAT to your day rate for business clients; see the <a href="/uk/business/vat-threshold">VAT threshold checker</a>.
          </Callout>
        )}
        <Callout title="Payments on account">
          Self-employed tax is paid in January and July. In your second year you may pay a year and a half of tax in one go, so set aside a share of every invoice. See the{" "}
          <a href="/uk/business/payment-on-account">payment on account calculator</a>.
        </Callout>
        <Callout title="No employer benefits">
          Employees get paid holiday, sick pay and an employer pension contribution. Your day rate has to pay for these yourself, which is why it is so much higher than a salary divided by 260.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 tax rules for sole traders. Limited company contractors pay tax differently; see the IR35 and dividend calculators.
      </p>
    </Studio>
  );
}

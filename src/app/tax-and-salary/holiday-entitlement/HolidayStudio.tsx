"use client";

import { holidayPlan, IRREGULAR_ACCRUAL_PCT, STATUTORY_WEEKS } from "@/lib/benefits/holiday-entitlement";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Basis = "days" | "hours" | "irregular";
const SCHEMA = {
  basis: oneOf<Basis>("days", ["days", "hours", "irregular"]),
  days: num(5, 0.5, 7),
  hours: num(37.5, 1, 100),
  contract: num(0, 0, 60),
  months: num(12, 1, 12),
  worked: num(12, 0, 12),
  pay: num(0),
};
const ADVANCED = ["contract", "months", "worked", "pay"] as const;
const fmt = (n: number) => (Math.round(n * 10) / 10).toLocaleString("en-GB");

export default function HolidayStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const byDays = v.basis === "days";
  const r = holidayPlan({
    basis: byDays ? "days" : "hours",
    daysPerWeek: v.days,
    hoursPerWeek: v.hours,
    contractDays: v.contract,
    monthsEmployed: v.months,
    monthsWorkedSoFar: Math.min(v.worked, v.months),
    weeklyPay: v.pay,
  });
  const unit = byDays ? "days" : "hours";
  const capped = byDays && v.days * STATUTORY_WEEKS > 28;
  const irregularPerWeek = v.hours * (IRREGULAR_ACCRUAL_PCT / 100);

  return (
    <Studio
      title="Your working pattern"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my holiday"
      onReset={st.reset}
      dock={{ label: "Holiday this year", value: `${fmt(r.thisYear)} ${unit}` }}
      inputs={
        <>
          <InputGroup title="How you work">
            <Segmented
              label="Your hours are"
              value={v.basis}
              onChange={st.bind("basis")}
              options={[
                { value: "days", label: "Set days" },
                { value: "hours", label: "Set hours" },
                { value: "irregular", label: "Irregular", note: "Zero-hours, casual or term-time work: holiday builds up at 12.07% of the hours you work." },
              ]}
            />
            {byDays ? (
              <StepperField label="Days you work a week" value={v.days} onChange={st.bind("days")} step={0.5} min={0.5} max={7} unit="days" dp={1} />
            ) : (
              <StepperField
                label={v.basis === "irregular" ? "Average hours a week" : "Hours you work a week"}
                value={v.hours}
                onChange={st.bind("hours")}
                step={0.5}
                min={1}
                max={100}
                unit="hrs"
                dp={1}
              />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {byDays && (
              <StepperField
                label="Holiday in your contract, a full year"
                value={v.contract}
                onChange={st.bind("contract")}
                step={1}
                min={0}
                max={60}
                unit="days"
                optional
                hint="In your own working days, including bank holidays. Leave at 0 to see the legal minimum."
              />
            )}
            <StepperField
              label="Months of the holiday year you are employed"
              value={v.months}
              onChange={st.bind("months")}
              step={1}
              min={1}
              max={12}
              unit="months"
              optional
              hint="Starting or leaving part-way through? Your entitlement is pro-rated."
            />
            <StepperField
              label="Months worked so far"
              value={v.worked}
              onChange={st.bind("worked")}
              step={1}
              min={0}
              max={12}
              unit="months"
              optional
              hint="In your first year, holiday builds up at one-twelfth a month."
            />
            <MoneyField label="Your weekly pay" value={v.pay} onChange={st.bind("pay")} optional hint="To show what your holiday is worth. Use average pay including regular overtime." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your holiday this year"
        value={`${fmt(r.thisYear)} ${unit}`}
        unit={v.months < 12 ? `for ${v.months} months` : "a year, including bank holidays"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Everyone who works is entitled to <b>5.6 weeks</b> of paid holiday a year.{" "}
            {byDays ? (
              <>
                For a <b>{v.days}-day</b> week that is <b>{fmt(r.statutory)} days</b>
                {capped && <> (capped at 28 days)</>}.
              </>
            ) : (
              <>
                For <b>{v.hours} hours</b> a week that is <b>{fmt(r.statutory)} hours</b>.
              </>
            )}
            {r.fullYear > r.statutory && (
              <>
                {" "}
                Your contract gives <b>{fmt(r.fullYear)} days</b>.
              </>
            )}
          </>
        }
        badges={["5.6 weeks minimum", "Bank holidays can be included", v.basis === "irregular" ? "12.07% accrual" : byDays ? "Days basis" : "Hours basis"]}
      />

      <Facts
        items={[
          { label: "Legal minimum, full year", value: `${fmt(r.statutory)} ${unit}` },
          { label: "Your full year", value: `${fmt(r.fullYear)} ${unit}` },
          { label: "Built up so far", value: `${fmt(r.accrued)} ${unit}`, note: `After ${Math.min(v.worked, v.months)} months` },
          v.pay > 0 ? { label: "Worth", value: gbp(r.value), tone: "good" } : { label: "In weeks", value: `${fmt(r.thisYear / (byDays ? v.days : v.hours))} weeks` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Minimum", value: "5.6 weeks a year" },
          { label: "Bank holidays", value: "Included in the total" },
          { label: "Full-time cap", value: "28 days" },
          { label: "Holiday year", value: v.months < 12 ? `${v.months} months employed` : "Full year" },
        ]}
      />

      {byDays && r.fullYear > r.statutory && (
        <ResultCard title="Your contract and the legal minimum" sub="Your employer can give more than the minimum, but never less.">
          <Compare
            head={["Entitlement", "Days a year"]}
            rows={[
              { label: "Legal minimum", value: `${fmt(r.statutory)} days`, bar: r.statutory / r.fullYear },
              { label: "Your contract", value: `${fmt(r.fullYear)} days`, bar: 1, current: true },
            ]}
          />
        </ResultCard>
      )}

      {v.basis === "irregular" && (
        <ResultCard title="Holiday for irregular hours" sub="How holiday builds up when your hours change from week to week.">
          <Facts
            items={[
              { label: "Built up a week", value: `${fmt(irregularPerWeek)} hours`, note: `${IRREGULAR_ACCRUAL_PCT}% of ${v.hours} hours` },
              { label: "Built up a month", value: `${fmt((irregularPerWeek * 52) / 12)} hours` },
            ]}
          />
          <Callout title="Rolled-up holiday pay">
            For irregular-hours and part-year workers, employers can instead add 12.07% to your pay for every hour worked. It must be shown separately on your payslip,
            and you then take unpaid time off.
          </Callout>
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Rules that often catch people out.">
        <Callout title="Holiday pay should include regular overtime">
          For the first four weeks of statutory holiday, pay must reflect your normal pay, including regular overtime, commission and shift premiums, averaged over the
          previous 52 weeks you worked.
        </Callout>
        <Callout title="You can only be paid instead of holiday when you leave">
          Employers cannot pay you in lieu of statutory holiday while you are still employed. When you leave, you must be paid for holiday built up but not taken.
        </Callout>
        {r.statutory > 0 && (
          <Callout title="Carrying holiday over">
            You must usually take at least 4 weeks in the year. Employers can let you carry over the remaining 1.6 weeks, and you can carry over holiday you could not
            take because of sickness or family leave.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Statutory minimum under the Working Time Regulations. Your contract may give more.
      </p>
    </Studio>
  );
}

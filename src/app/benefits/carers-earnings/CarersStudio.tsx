"use client";

import { CA_2026, carerEarnings } from "@/lib/benefits/carers";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  hourly: num(12.71, 0, 200),
  hours: num(16, 0, 60),
  pensionPct: num(0, 0, 50),
  care: num(0, 0, 2_000),
  scotland: bool(false),
  statePension: num(0, 0, 1_000),
  caring35: bool(true),
  qualifying: bool(true),
  student: bool(false),
};
const ADVANCED = ["pensionPct", "care", "scotland", "statePension", "caring35", "qualifying", "student"] as const;
const HOURS = Array.from({ length: 31 }, (_, i) => i);
const axis = (n: number) => gbp(Math.round(n / 10) * 10);
const neg = (n: number): string => (n > 0.005 ? `−${gbp(n, true)}` : gbp(0, true));

export default function CarersStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const eligible = v.caring35 && v.qualifying && !v.student;
  const gross = v.hourly * v.hours;
  const at = (g: number) => carerEarnings({ grossWeekly: g, pensionWeekly: (g * v.pensionPct) / 100, careCostsWeekly: v.care, scotland: v.scotland, overlapping: v.statePension });
  const r = at(gross);
  const payable = eligible ? r.payable : 0;
  // Highest gross pay within the limit, with pension as a share of pay.
  let lo = 0;
  let hi = 5_000;
  for (let k = 0; k < 50; k++) {
    const mid = (lo + hi) / 2;
    if (at(mid).withinLimit) lo = mid;
    else hi = mid;
  }
  const maxGross = lo;
  const maxHours = v.hourly > 0 ? maxGross / v.hourly : 0;
  const curve = HOURS.map((h) => {
    const p = at(v.hourly * h);
    return { pay: Math.max(0, p.net - (v.hourly * h * v.pensionPct) / 100), total: Math.max(0, p.net - (v.hourly * h * v.pensionPct) / 100) + (eligible ? p.payable : 0) };
  });
  const pension = (gross * v.pensionPct) / 100;

  return (
    <Studio
      title="Your work and caring"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my earnings"
      onReset={st.reset}
      dock={{ label: "Carer's Allowance a week", value: gbp(payable, true) }}
      inputs={
        <>
          <InputGroup title="Your job">
            <MoneyField label="Hourly pay" value={v.hourly} onChange={st.bind("hourly")} pence hint="The National Living Wage is £12.71 from April 2026." />
            <StepperField label="Hours a week" value={v.hours} onChange={st.bind("hours")} step={1} min={0} max={60} unit="hours" dp={1} hint="If your hours vary, use your average." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Pension contribution" value={v.pensionPct} onChange={st.bind("pensionPct")} step={1} min={0} max={50} unit="%" dp={1} optional hint="Half of what you pay is taken off your earnings." />
            <MoneyField label="Care costs while you work, a week" value={v.care} onChange={st.bind("care")} pence optional hint="Paid to someone who is not a close relative, for the person you care for or a child under 16. Up to half your earnings." />
            <Switch label="I pay Scottish Income Tax" checked={v.scotland} onChange={st.bind("scotland")} optional hint="In Scotland, Carer Support Payment has replaced Carer's Allowance, with the same earnings limit." />
            <MoneyField label="State Pension or other overlapping benefit a week" value={v.statePension} onChange={st.bind("statePension")} pence optional hint="Paid instead of Carer's Allowance." />
            <Switch label="I care for 35 hours a week or more" checked={v.caring35} onChange={st.bind("caring35")} optional />
            <Switch label="They get a qualifying disability benefit" checked={v.qualifying} onChange={st.bind("qualifying")} optional hint="Attendance Allowance, PIP daily living, DLA middle or highest care, or similar." />
            <Switch label="I am in full-time education" checked={v.student} onChange={st.bind("student")} optional hint="21 hours or more of supervised study a week rules you out." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Carer's Allowance"
        value={gbp(payable, true)}
        unit="a week"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !eligible ? (
            <>
              On these answers you would not qualify. You must care for at least 35 hours a week for someone getting a qualifying disability benefit, and not be in full-time education.
            </>
          ) : r.withinLimit ? (
            <>
              Your earnings count as <b>{gbp(r.counted, true)}</b> a week, <b>{gbp(r.headroom, true)}</b> under the {gbp(CA_2026.earningsLimit)} limit.{" "}
              {r.underlying ? (
                <>Your State Pension is paid instead, so you have underlying entitlement only.</>
              ) : (
                <>
                  You can get <b>{gbp(payable, true)}</b> a week, about <b>{gbp(payable * 52)}</b> a year.
                </>
              )}
            </>
          ) : (
            <>
              Your earnings count as <b>{gbp(r.counted, true)}</b> a week, <b>{gbp(-r.headroom, true)}</b> over the {gbp(CA_2026.earningsLimit)} limit, so you would lose the whole{" "}
              <b>{gbp(CA_2026.weekly, true)}</b>. Working up to <b>{maxHours.toFixed(1)} hours</b> a week at this rate keeps you under.
            </>
          )
        }
        badges={[`Limit ${gbp(CA_2026.earningsLimit)} a week`, r.withinLimit ? "Within the limit" : "Over the limit", `Up to ${maxHours.toFixed(1)} hours`]}
      />

      <Facts
        items={[
          { label: "Gross pay a week", value: gbp(gross, true) },
          { label: "Earnings that count", value: gbp(r.counted, true), tone: r.withinLimit ? undefined : "warn" },
          { label: "Room under the limit", value: r.withinLimit ? gbp(r.headroom, true) : "None", tone: r.withinLimit ? "good" : "warn" },
          { label: "Most hours", value: `${maxHours.toFixed(1)} a week`, note: `At ${gbp(v.hourly, true)} an hour` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rates", value: "2026/27" },
          { label: "Pay", value: `${gbp(v.hourly, true)} × ${v.hours} hours a week` },
          { label: "Tax and NI", value: "Annualised, standard tax code" },
          { label: "Pension", value: v.pensionPct > 0 ? `${v.pensionPct}% of pay, before tax` : "None" },
        ]}
      />

      <ResultCard title="How your earnings are counted" sub="A week.">
        <Statement
          columns={["A week"]}
          rows={[
            { label: "Gross pay", values: [gbp(gross, true)] },
            { label: "Income Tax", values: [neg(r.tax)], kind: "deduction" as const },
            { label: "National Insurance", values: [neg(r.ni)], kind: "deduction" as const },
            ...(pension > 0 ? [{ label: "Half of pension contributions", values: [neg(r.pensionAllowed)], kind: "deduction" as const }] : []),
            ...(v.care > 0 ? [{ label: "Care costs allowed", values: [neg(r.careAllowed)], kind: "deduction" as const }] : []),
            { label: "Earnings that count", values: [gbp(r.counted, true)], kind: "total" as const },
            { label: "Earnings limit", values: [gbp(CA_2026.earningsLimit, true)] },
          ]}
        />
      </ResultCard>

      <ResultCard title="Income by hours worked" sub={`Take-home pay plus Carer's Allowance, at ${gbp(v.hourly, true)} an hour.`}>
        <AreaChart
          ariaLabel="Weekly income by hours worked"
          series={[
            { key: "total", label: "Pay plus Carer's Allowance", color: "#5b1e6e", values: curve.map((c) => c.total), fill: true },
            { key: "pay", label: "Take-home pay only", color: "#16a34a", values: curve.map((c) => c.pay), dashed: true },
          ]}
          xLabel={(i) => `${HOURS[i] ?? 0}h`}
          yFormat={axis}
          initial={Math.min(30, Math.round(v.hours))}
          hint="Drag across the chart, or use the arrow keys, to read any number of hours."
          readout={(i) => {
            const c = curve[i];
            if (!c) return null;
            return (
              <>
                <b>{HOURS[i]} hours</b>: take-home <b>{gbp(c.pay, true)}</b>, total with Carer&apos;s Allowance <b>{gbp(c.total, true)}</b> a week.
              </>
            );
          }}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Staying within the rules.">
        {!r.withinLimit && eligible && (
          <Callout tone="warn" title="A cliff edge, not a taper">
            Going a penny over {gbp(CA_2026.earningsLimit)} loses the whole {gbp(CA_2026.weekly, true)} for that week. Paying more into a pension, or claiming care costs, can bring your earnings back under.
          </Callout>
        )}
        {r.underlying && (
          <Callout title="Underlying entitlement still counts">
            You will not be paid Carer&apos;s Allowance on top of your State Pension, but claiming can add a carer addition of £48.15 a week to Pension Credit and a carer premium to Housing Benefit.
          </Callout>
        )}
        <Callout title="Tell the Carer's Allowance Unit about changes">
          Report pay rises, extra hours and one-off payments straight away. Overpayments have to be repaid, and earnings can be averaged if your pay varies.
        </Callout>
        <Callout title="On Universal Credit?">
          Carer&apos;s Allowance is taken off Universal Credit in full, but caring adds the carer element of £209.34 a month, and getting Carer&apos;s Allowance exempts the household from the benefit cap.
        </Callout>
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        2026/27 rates. An estimate, not a decision. Not financial advice.
      </p>
    </Studio>
  );
}

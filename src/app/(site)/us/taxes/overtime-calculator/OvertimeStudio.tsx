"use client";

import { overtimeSaving, overtimeWeek } from "@/lib/us/pay";
import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import AreaChart from "@/components/flagship/AreaChart";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { per, percent, usd, usdShort } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  rate: num(20, 0, 10_000),
  regular: num(40, 0, 80),
  ot: num(10, 0, 100),
  mult: oneOf<"1.5" | "2">("1.5", ["1.5", "2"]),
  dt: num(0, 0, 60),
  weeks: num(50, 0, 52),
  status: oneOf<FilingStatus>("single", ["single", "mfj", "hoh", "mfs"]),
  other: num(0, 0, 10_000_000),
};
const ADVANCED = ["mult", "dt", "weeks", "status", "other"] as const;

export default function OvertimeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const mult = Number(v.mult);
  const w = overtimeWeek(v.rate, v.regular, v.ot, mult, v.dt);
  const extraHours = v.ot + v.dt;
  // Only hours over 40 in the week carry an FLSA-required premium.
  const flsaHours = Math.min(extraHours, Math.max(0, v.regular + extraHours - 40));
  const weeklyPremium = extraHours > 0 ? w.premium * (flsaHours / extraHours) : 0;
  const yearlyBase = v.rate * v.regular * 52;
  const yearlyExtra = (w.overtimePay + w.doubleTimePay) * v.weeks;
  const premiumYear = weeklyPremium * v.weeks;
  const magi = yearlyBase + yearlyExtra + v.other;
  const saving = overtimeSaving(premiumYear, magi, v.status);
  const cap = US_2026.overtime.max[v.status];
  const totalHours = v.regular + extraHours;

  const maxH = 30;
  const curve = Array.from({ length: maxH + 1 }, (_, h) => overtimeWeek(v.rate, v.regular, h, mult, v.dt).total);
  const base = curve.map(() => w.regularPay);

  return (
    <Studio
      title="Your hours"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my overtime pay"
      onReset={st.reset}
      dock={{ label: "This week", value: usd(w.total, true) }}
      inputs={
        <>
          <InputGroup title="Pay and hours">
            <MoneyField label="Regular hourly rate" value={v.rate} onChange={st.bind("rate")} symbol="$" pence max={10_000} slider={{ min: 7.25, max: 100, step: 0.25, ends: ["$7.25", "$100"] }} />
            <StepperField label="Regular hours this week" value={v.regular} onChange={st.bind("regular")} step={0.5} min={0} max={80} unit="hours" dp={2} info="Under federal law, overtime starts after 40 hours in a workweek." />
            <StepperField label="Overtime hours" value={v.ot} onChange={st.bind("ot")} step={0.5} min={0} max={100} unit="hours" dp={2} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Overtime rate"
              value={v.mult}
              onChange={st.bind("mult")}
              optional
              options={[
                { value: "1.5", label: "Time and a half (1.5×)" },
                { value: "2", label: "Double time (2×)" },
              ]}
            />
            <StepperField label="Double-time hours" value={v.dt} onChange={st.bind("dt")} step={0.5} min={0} max={60} unit="hours" dp={2} optional info="Extra hours paid at twice the regular rate, for example over 12 hours in a day in California." />
            <StepperField label="Weeks a year with this overtime" value={v.weeks} onChange={(n) => st.set("weeks", Math.round(n))} step={1} min={0} max={52} unit="weeks" dp={0} optional info="Used for the yearly overtime pay and the tax deduction." />
            <SelectField
              label="Filing status"
              value={v.status}
              onChange={st.bind("status")}
              optional
              options={(["single", "mfj", "hoh", "mfs"] as FilingStatus[]).map((s) => ({ value: s, label: FILING_LABEL[s] }))}
            />
            <MoneyField label="Other household income a year" value={v.other} onChange={st.bind("other")} symbol="$" optional info="A spouse's pay or other income on the same return. It counts toward the $150,000 ($300,000 joint) phase-out and your tax bracket." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Pay for ${totalHours} ${per(totalHours, "hours")} this week`}
        value={usd(w.total, true)}
        unit="before tax"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Your overtime rate is <b>{usd(w.overtimeRate, true)}</b>{" "}an hour, so {v.ot} overtime {per(v.ot, "hours")} add <b>{usd(w.overtimePay, true)}</b>
            {v.dt > 0 ? (
              <>
                {" "}
                and {v.dt} double-time {per(v.dt, "hours")} add <b>{usd(w.doubleTimePay, true)}</b>
              </>
            ) : null}{" "}
            to <b>{usd(w.regularPay, true)}</b>{" "}of regular pay. Over {v.weeks} {per(v.weeks, "weeks")}, overtime adds <b>{usd(yearlyExtra)}</b>{" "}a year.
          </>
        }
        badges={[`Deduction ${usd(saving.deduction)}`, `Federal tax saved about ${usd(saving.taxSaved)}`]}
      />

      <SplitBar
        segments={[
          { label: "Regular pay", value: w.regularPay, display: usd(w.regularPay, true), color: "#0f9f6e" },
          { label: `Overtime (${mult}×)`, value: w.overtimePay, display: usd(w.overtimePay, true), color: "#f59e0b" },
          ...(w.doubleTimePay > 0 ? [{ label: "Double time (2×)", value: w.doubleTimePay, display: usd(w.doubleTimePay, true), color: "#5b1e6e" }] : []),
        ]}
      />

      <Facts
        items={[
          { label: "Overtime rate", value: usd(w.overtimeRate, true) },
          { label: "Overtime pay this week", value: usd(w.overtimePay + w.doubleTimePay, true) },
          { label: "Overtime pay a year", value: usd(yearlyExtra) },
          { label: "Federal tax saved", value: usd(saving.taxSaved), tone: "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Regular pay", value: `${usd(v.rate, true)} an hour, ${v.regular} hours a week, 52 weeks` },
          { label: "Overtime", value: `${v.weeks} ${per(v.weeks, "weeks")} a year like this one` },
          { label: "Filing status", value: FILING_LABEL[v.status] },
          { label: "Deduction", value: "Standard deduction; only the premium for hours over 40 counts" },
        ]}
      />

      <ResultCard title="No tax on overtime: your deduction" sub="For 2025 to 2028, the extra half of time and a half comes off your taxable income when you file.">
        <Statement
          columns={["A year"]}
          rows={[
            { label: "Qualified overtime premium", values: [usd(premiumYear)] },
            { label: `Limit for ${FILING_LABEL[v.status].toLowerCase()}`, values: [usd(cap)] },
            { label: "Modified AGI (estimate)", values: [usd(magi)] },
            { label: "Deduction after the phase-out", values: [usd(saving.deduction)] },
            { label: `Federal income tax saved (at ${percent(saving.marginal)})`, values: [usd(saving.taxSaved)], kind: "total" },
          ]}
        />
        {v.status === "mfs" ? (
          <Callout tone="warn" title="Not available married filing separately">
            Married couples must file a joint return to claim the overtime deduction.
          </Callout>
        ) : saving.deduction < Math.min(premiumYear, cap) ? (
          <Callout tone="warn" title="The phase-out reduces your deduction">
            Above {usd(US_2026.obbbaPhaseStart[v.status])} of modified AGI, the limit falls by $100 for each $1,000 of income, so you can deduct {usd(saving.deduction)}.
          </Callout>
        ) : null}
        {flsaHours < extraHours && (
          <Callout title="Some of your overtime is not federal overtime">
            Only hours over 40 in the week carry a premium the Fair Labor Standards Act requires. The premium on the other {extraHours - flsaHours} {per(extraHours - flsaHours, "hours")} (daily overtime under state law or a contract) is paid, but it does not count for the deduction.
          </Callout>
        )}
        <Callout title="What the deduction does not change">
          Your employer still withholds income tax on overtime, and Social Security, Medicare and most state income taxes still apply. The saving comes when you file, or sooner if you adjust your Form W-4.
        </Callout>
      </ResultCard>

      <ResultCard title="Your week with more or fewer overtime hours" sub={`Pay at ${usd(v.rate, true)} an hour with 0 to ${maxH} overtime hours.`}>
        <AreaChart
          series={[
            { key: "total", label: "Week's pay", color: "#0f9f6e", values: curve, fill: true },
            { key: "base", label: "Regular pay", color: "#94a3b8", values: base, dashed: true },
          ]}
          xLabel={(i) => `${i}h`}
          yFormat={usdShort}
          readout={(i) => (
            <>
              <b>{i}</b>{" "}overtime {per(i, "hours")}: <b>{usd(curve[i], true)}</b>{" "}for the week
            </>
          )}
          ariaLabel="A week's pay rising with overtime hours"
          hint="Drag across the chart, or use the arrow keys, to read any number of hours."
        />
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Before tax. For take-home pay, use the <a href="/us/taxes/paycheck-calculator">paycheck calculator</a>.
      </p>
    </Studio>
  );
}

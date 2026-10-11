"use client";

import { IRREGULAR_ACCRUAL, irregularHoliday, STATUTORY_WEEKS, WORKING_WEEKS } from "@/lib/tax/employment-rights";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Period = "week" | "month";
type Method = "accrue" | "rolled";

const SCHEMA = {
  hours: num(30, 0, 400),
  rate: num(12.71, 0, 1_000),
  period: oneOf<Period>("week", ["week", "month"]),
  method: oneOf<Method>("accrue", ["accrue", "rolled"]),
  extra: num(0),
  weeks: num(WORKING_WEEKS, 1, WORKING_WEEKS),
  refPay: num(0),
  refHours: num(0, 0, 10_000),
  refWeeks: num(52, 1, 52),
};
const ADVANCED = ["extra", "weeks", "refPay", "refHours", "refWeeks"] as const;

const hrs = (n: number, dp = 1) => {
  const v = Number.isFinite(n) ? n : 0;
  const t = v.toFixed(dp).replace(/\.0+$/, "");
  return `${t} hour${t === "1" ? "" : "s"}`;
};

export default function IrregularHolidayStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const pay = v.hours * v.rate + v.extra;
  const r = irregularHoliday({
    hours: v.hours,
    pay,
    period: v.period,
    weeksWorked: v.weeks,
    refPay: v.refPay,
    refHours: v.refHours,
    refWeeks: v.refWeeks,
  });
  const word = v.period === "week" ? "week" : "month";
  const rolled = v.method === "rolled";
  const partYear = v.weeks < WORKING_WEEKS - 0.05;

  const ladder = [8, 16, 24, 30, 37.5, 45].map((h) => {
    const x = irregularHoliday({ hours: h, pay: h * v.rate, period: "week" });
    return [h, hrs(x.accrued, 2), hrs(x.accruedRounded, 0), gbp(x.rolledUp, true)];
  });

  return (
    <Studio
      title="Your hours and pay"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my holiday"
      onReset={st.reset}
      dock={rolled ? { label: "Holiday pay", value: gbp(r.rolledUp, true) } : { label: "Holiday earned", value: hrs(r.accrued, 2) }}
      inputs={
        <>
          <InputGroup title="This pay period">
            <StepperField label={`Hours worked this ${word}`} value={v.hours} onChange={st.bind("hours")} step={0.5} min={0} max={400} unit="hours" dp={2} />
            <MoneyField
              label="Hourly pay"
              value={v.rate}
              onChange={st.bind("rate")}
              pence
              slider={{ min: 0, max: 50, step: 0.01, ends: ["£0", "£50"] }}
              hint="Your basic hourly rate before tax. The National Living Wage is £12.71 an hour from April 2026."
            />
            <Segmented
              label="You are paid"
              value={v.period}
              onChange={st.bind("period")}
              options={[
                { value: "week", label: "Weekly" },
                { value: "month", label: "Monthly" },
              ]}
            />
            <Segmented
              label="How your employer handles holiday"
              value={v.method}
              onChange={st.bind("method")}
              options={[
                { value: "accrue", label: "Holiday hours build up", note: "You build up 12.07% of the hours you work and are paid when you take time off." },
                { value: "rolled", label: "Rolled-up holiday pay", note: "An extra 12.07% of your pay is added to each payslip, and holiday is unpaid when you take it." },
              ]}
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField
              label={`Overtime, commission and other pay this ${word}`}
              value={v.extra}
              onChange={st.bind("extra")}
              pence
              optional
              hint="Rolled-up holiday pay is 12.07% of your total pay for the period, including overtime and commission."
            />
            <StepperField
              label="Weeks you work in a year"
              value={v.weeks}
              onChange={st.bind("weeks")}
              step={1}
              min={1}
              max={WORKING_WEEKS}
              unit="weeks"
              dp={1}
              optional
              hint="46.4 weeks is a full year less 5.6 weeks of holiday. A part-year worker, such as a term-time or seasonal worker, works fewer."
            />
            <MoneyField
              label="Pay in your last 52 paid weeks"
              value={v.refPay}
              onChange={st.bind("refPay")}
              optional
              hint="Total gross pay over the last 52 weeks in which you were paid, looking back no more than 104 weeks. Leave at 0 to use this period's hourly pay."
            />
            <StepperField label="Hours worked in those weeks" value={v.refHours} onChange={st.bind("refHours")} step={10} min={0} max={10_000} unit="hours" dp={1} optional />
            <StepperField
              label="Paid weeks in that period"
              value={v.refWeeks}
              onChange={st.bind("refWeeks")}
              step={1}
              min={1}
              max={52}
              unit="weeks"
              dp={0}
              optional
              hint="Usually 52. Fewer if you have not been paid for 52 weeks in the last 104."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={rolled ? `Rolled-up holiday pay this ${word}` : `Holiday earned this ${word}`}
        value={rolled ? gbp(r.rolledUp, true) : hrs(r.accrued, 2)}
        unit={rolled ? `on ${gbp(pay, true)} of pay` : `from ${hrs(v.hours, 2)} worked`}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.hours <= 0 ? (
            <>Enter the hours you worked in the pay period to see your holiday.</>
          ) : rolled ? (
            <>
              Your payslip should show <b>{gbp(r.rolledUp, true)}</b> of holiday pay as a separate line: 12.07% of <b>{gbp(pay, true)}</b>. Over a year at this
              pattern that is about <b>{gbp(r.yearRolledUp)}</b>.
            </>
          ) : (
            <>
              You build up <b>{hrs(r.accrued, 2)}</b> of paid holiday (GOV.UK&rsquo;s examples round this to <b>{hrs(r.accruedRounded, 0)}</b>). Over a year that is
              about <b>{hrs(r.yearAccrued)}</b>, worth about <b>{gbp(r.yearValue)}</b>.
            </>
          )
        }
        badges={["12.07% of hours worked", "Leave years from 1 April 2024", "Great Britain"]}
      />

      <Facts
        items={[
          { label: "Holiday hours this period", value: hrs(r.accrued, 2), note: `Rounded: ${hrs(r.accruedRounded, 0)}` },
          { label: "Rolled-up pay this period", value: gbp(r.rolledUp, true) },
          { label: "Holiday a year", value: hrs(r.yearAccrued), note: `${hrs(r.yearHours, 0)} worked` },
          { label: "Pay for an hour of holiday", value: gbp(r.avgHourly, true), note: r.refFromInputs ? "52-week average" : "This period’s rate" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Accrual rate", value: `${(IRREGULAR_ACCRUAL * 100).toFixed(2)}% (5.6 ÷ 46.4 weeks)` },
          { label: "Weekly hours", value: hrs(r.weeklyHours, 2) },
          { label: "Weeks worked a year", value: `${v.weeks} weeks` },
          { label: "Average week's pay", value: gbp(r.avgWeekPay, true) },
        ]}
        note="Holiday pay for time off should be your average pay over the last 52 paid weeks. Weeks with no pay are skipped, looking back up to 104 weeks."
      />

      {v.hours > 0 && (
        <ResultCard title="Compared with a regular worker" sub={`Holiday a year at ${hrs(r.weeklyHours, 1)} a week.`}>
          <Compare
            head={["Worker", "Holiday a year"]}
            rows={[
              { label: `You: 12.07% of ${hrs(r.yearHours, 0)}`, value: hrs(r.yearAccrued), bar: r.regularHours > 0 ? r.yearAccrued / r.regularHours : 0, current: true },
              { label: `Regular worker: ${STATUTORY_WEEKS} weeks`, value: hrs(r.regularHours), bar: 1 },
            ]}
          />
          {partYear && (
            <p className="footnote">
              You work {v.weeks} weeks, so you build up less than someone who works all year. Before April 2024, part-year workers could get the full 5.6 weeks.
            </p>
          )}
        </ResultCard>
      )}

      <DataTable
        summary={`Holiday from a week's hours at ${gbp(v.rate, true)} an hour`}
        columns={["Hours worked in the week", "Holiday earned", "Rounded", "Rolled-up holiday pay"]}
        rows={ladder}
      />

      <ResultCard title="Worth knowing" sub="Rules that catch people out.">
        {rolled && (
          <Callout title="Rolled-up pay must be shown separately">
            It must appear as its own line on each payslip and be paid with the work it relates to. When you then take holiday, it is unpaid, so put some aside.
          </Callout>
        )}
        {!rolled && (
          <Callout title="Holiday is paid at your average pay">
            When you take holiday, each hour should be paid at your average pay over the last 52 paid weeks, including regular overtime and commission for the first
            4 weeks a year.
          </Callout>
        )}
        <Callout title="Only for irregular-hours and part-year workers">
          If you work fixed hours all year, you get 5.6 weeks of holiday instead. Use the holiday entitlement calculator. In Northern Ireland these 2024 rules do not
          apply.
        </Callout>
      </ResultCard>
    </Studio>
  );
}

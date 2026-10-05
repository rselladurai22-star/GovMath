"use client";

import { SORN_PENALTY, sornPlan, sornRefundMonths } from "@/lib/vehicles/tax-2026";
import { formatDate } from "@/lib/life/calendar";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, DateField, InputGroup, MoneyField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { gbp, per } from "@/components/flagship/format";
import { date, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  sornDate: date("2026-10-15"),
  taxDue: date("2027-04-01"),
  yearlyTax: num(200, 0, 10_000),
  monthsOff: num(6, 0, 120),
  insurance: num(40, 0, 2_000),
};
const ADVANCED = ["monthsOff", "insurance"] as const;

export default function SornStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = sornPlan({ sornDate: v.sornDate, taxExpiry: v.taxDue, yearlyTax: v.yearlyTax, monthlyInsurance: v.insurance, monthsOff: v.monthsOff });
  const monthly = v.yearlyTax / 12;
  // The month the DVLA gets the SORN is never refunded, so waiting until next month loses a month.
  const [y, m] = v.sornDate.split("-").map(Number);
  const nextFirst = `${m === 12 ? y + 1 : y}-${String(m === 12 ? 1 : m + 1).padStart(2, "0")}-01`;
  const waitMonths = sornRefundMonths(nextFirst, v.taxDue);
  const options = [
    { label: "SORN this month (any day)", value: r.refund },
    { label: "SORN next month", value: monthly * waitMonths },
  ];
  const maxOpt = Math.max(1, ...options.map((o) => o.value));

  return (
    <Studio
      title="Your vehicle"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my refund"
      onReset={st.reset}
      dock={{ label: "Tax refund", value: gbp(r.refund, true) }}
      inputs={
        <>
          <InputGroup title="Tax and dates">
            <MoneyField label="Yearly vehicle tax" value={v.yearlyTax} onChange={st.bind("yearlyTax")} hint="£200 for most cars registered since April 2017." />
            <DateField label="Date of the SORN" value={v.sornDate} onChange={st.bind("sornDate")} min="2020-01-01" max="2035-12-31" />
            <DateField label="Tax due date" value={v.taxDue} onChange={st.bind("taxDue")} min="2020-01-01" max="2036-12-31" hint="The date your tax runs out, from your reminder or the GOV.UK vehicle check." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Months off the road" value={v.monthsOff} onChange={(n) => st.set("monthsOff", Math.round(n))} step={1} min={0} max={120} unit="months" dp={0} optional />
            <MoneyField label="Insurance you could cancel, a month" value={v.insurance} onChange={st.bind("insurance")} optional hint="Many people keep fire and theft cover while a car is stored." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Vehicle tax refund"
        value={gbp(r.refund, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            A SORN made on {formatDate(v.sornDate)} cancels your tax, which runs to {formatDate(v.taxDue)}. The DVLA refunds <b>{r.months} full {r.months === 1 ? "month" : "months"}</b> at{" "}
            {gbp(monthly, true)} a month, so you get about <b>{gbp(r.refund, true)}</b> back. Part months are not refunded.
          </>
        }
        badges={[`${r.months} full months`, "Refund by cheque or bank transfer", "SORN is free"]}
      />

      <Facts
        items={[
          { label: "Full months refunded", value: `${r.months}` },
          { label: "Refund", value: gbp(r.refund, true), tone: "good" },
          { label: `Tax saved over ${v.monthsOff} ${per(v.monthsOff, "months")}`, value: gbp(r.taxSaved) },
          { label: "Insurance saved", value: gbp(r.insuranceSaved) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Refund", value: "Full calendar months left after the month the DVLA gets the SORN" },
          { label: "Direct Debit", value: "Cancels automatically; no refund of future payments needed" },
          { label: "Tax", value: `${gbp(v.yearlyTax)} a year` },
        ]}
      />

      <ResultCard title="Timing matters" sub="Refunds are for whole months only.">
        <Compare
          head={["When", "Refund"]}
          rows={options.map((o, i) => ({ label: o.label, value: gbp(o.value, true), bar: o.value / maxOpt, current: i === 0 }))}
        />
        <p className="footnote">The month the DVLA receives the SORN is not refunded, so any day this month gives the same refund. Waiting until next month loses a month&apos;s tax.</p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Keeping it legal.">
        <Callout tone="warn" title="A SORN car cannot be on a public road">
          It must be kept on private land, such as a drive or garage. The only exception is driving to a pre-booked MOT. Being caught on the road can lead to a fine of up to {gbp(SORN_PENALTY.court)}.
        </Callout>
        <Callout title="Untaxed and no SORN">
          If a car is untaxed and not SORN, the DVLA sends an automatic £{SORN_PENALTY.late} penalty, reduced to £{SORN_PENALTY.earlyPay} if paid quickly.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate only. The DVLA works out the exact refund.
      </p>
    </Studio>
  );
}

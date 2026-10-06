"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { UC_2026 } from "@/lib/benefits/uc-engine";
import { ADVANCE_2026, STANDARD_LABEL, ucAdvance, type StandardKey } from "@/lib/benefits/uc-advance";

const KEYS = Object.keys(STANDARD_LABEL) as StandardKey[];

const SCHEMA = {
  who: oneOf<StandardKey>("single25", KEYS),
  estimate: num(1_125, 0, 10_000),
  advance: num(800, 0, 10_000),
  months: num(24, 1, 24),
  other: num(0, 0, 1_000),
};
const ADVANCED = ["other"] as const;

export default function AdvanceStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const r = ucAdvance({ estimate: v.estimate, advance: v.advance, months: v.months, standard: v.who, otherDeductions: v.other });
  const options = [6, 12, 18, 24].map((m) => ({ m, x: ucAdvance({ estimate: v.estimate, advance: v.advance, months: m, standard: v.who, otherDeductions: v.other }) }));
  const maxM = Math.max(1, ...options.map((o) => o.x.monthly));

  return (
    <Studio
      title="Your Universal Credit and the advance"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Work out my repayments"
      onReset={st.reset}
      dock={{ label: "Repayment a month", value: gbp(r.monthly, true) }}
      inputs={
        <>
          <InputGroup title="Your claim">
            <SelectField label="Who is claiming" value={v.who} onChange={st.bind("who")} options={KEYS.map((k) => ({ value: k, label: STANDARD_LABEL[k] }))} hint="Sets your standard allowance, which the deductions cap is based on." />
            <MoneyField
              label="Your estimated Universal Credit a month"
              value={v.estimate}
              onChange={st.bind("estimate")}
              pence
              hint="The most you can borrow is one month of this. Use the Universal Credit calculator if you do not know it."
            />
          </InputGroup>
          <InputGroup title="The advance">
            <MoneyField label="Advance you want" value={v.advance} onChange={st.bind("advance")} slider={{ min: 0, max: Math.max(100, Math.round(v.estimate)), step: 25 }} />
            <StepperField label="Months to repay" value={v.months} onChange={(n) => st.set("months", Math.round(n))} step={1} min={1} max={24} unit="months" dp={0} hint="Up to 24 months for a new claim advance." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Other deductions a month" value={v.other} onChange={st.bind("other")} optional pence hint="Such as an earlier advance, a benefit overpayment, rent or council tax arrears, or a fine. They share the same cap." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Repayment a month"
        value={gbp(r.monthly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.advance <= 0 ? (
            <>Enter the advance you want.</>
          ) : (
            <>
              An advance of <b>{gbp(r.advance, true)}</b> repaid over <b>{r.months} months</b> takes <b>{gbp(r.monthly, true)}</b> from each payment, leaving about <b>{gbp(r.paymentAfter, true)}</b> a month.{" "}
              {r.overCap ? (
                <>
                  That is <b>more than the 15% cap</b> of {gbp(r.cap, true)} on deductions.
                </>
              ) : (
                <>That is within the 15% cap of {gbp(r.cap, true)}.</>
              )}
            </>
          )
        }
        badges={[STANDARD_LABEL[v.who], `${r.months} months`, "Interest-free"]}
      />

      <Facts
        items={[
          { label: "UC left a month", value: gbp(r.paymentAfter, true) },
          { label: "Deductions cap", value: gbp(r.cap, true), note: `15% of ${gbp(UC_2026.standard[v.who], true)}` },
          { label: "Total deductions", value: gbp(r.totalDeductions, true), tone: r.overCap ? "warn" : "good" },
          { label: "Most you can borrow", value: gbp(r.max, true) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Advance", value: "New claim advance: up to one month of estimated Universal Credit" },
          { label: "Repayment", value: "Equal monthly amounts from your Universal Credit, starting with your first payment" },
          { label: "Cap", value: `${percent(ADVANCE_2026.capShare)} of your standard allowance for most deductions, from April 2025` },
          { label: "Your award", value: "Stays the same each month" },
        ]}
      />

      <ResultCard title="Your payment each month" sub="While the advance is being repaid.">
        <SplitBar
          segments={[
            { label: "Universal Credit you get", value: r.paymentAfter, display: gbp(r.paymentAfter, true), color: "#0f9f6e" },
            { label: "Advance repayment", value: r.monthly, display: gbp(r.monthly, true), color: "#f59e0b" },
            ...(v.other > 0 ? [{ label: "Other deductions", value: v.other, display: gbp(v.other, true), color: "#5b1e6e" }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Shorter or longer repayment" sub={`Repaying ${gbp(r.advance, true)}.`}>
        <Compare
          head={["Repay over", "A month"]}
          rows={options.map((o) => ({ label: `${o.m} months`, value: gbp(o.x.monthly, true), delta: o.x.overCap ? "Over cap" : "Within cap", deltaTone: o.x.overCap ? "up" : undefined, bar: o.x.monthly / maxM, current: o.m === r.months }))}
        />
      </ResultCard>

      <ResultCard title="What it means">
        {r.overCap && (
          <Callout tone="warn" title="Over the 15% deductions cap">
            {r.minMonthsForCap !== null
              ? `Repaying over at least ${r.minMonthsForCap} months keeps your deductions within the cap. `
              : "Even 24 months would not keep your deductions within the cap, because other deductions already use most of it. "}
            Ask for a longer repayment period, or a smaller advance.
          </Callout>
        )}
        <Callout title="Borrow only what you need">
          The advance is a loan, not extra money: every pound comes back out of later payments. If you can manage with less, a smaller advance leaves more Universal Credit each month.
        </Callout>
        <Callout title="Can you delay repayments?">
          In some cases of hardship you can ask for repayments to be paused for up to 3 months, or for a lower rate. Contact the DWP through your journal.
        </Callout>
      </ResultCard>

      <DataTable
        summary="First 12 months of repayments"
        columns={["Month", "Repayment", "UC paid", "Still owed"]}
        rows={r.schedule.map((s) => [s.month, gbp(s.repayment, true), gbp(s.paid, true), gbp(s.owed, true)])}
      />

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 standard allowances. The DWP decides the advance and repayment period; this shows how the sums work.
      </p>
    </Studio>
  );
}

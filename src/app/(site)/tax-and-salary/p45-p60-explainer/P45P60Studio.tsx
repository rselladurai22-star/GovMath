"use client";

import { listFields, type DocType } from "@/lib/tax/p45-p60";
import { bandTax } from "@/lib/tax/emergency-tax";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, DataTable, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, taxParams } from "@/components/flagship/taxOptions";
import s from "@/components/flagship/Flagship.module.css";

const MONTHS = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
const SCHEMA = {
  doc: oneOf<DocType>("P60", ["P60", "P45"]),
  pay: num(32_000),
  tax: num(3_900),
  month: num(6, 1, 12),
  code: num(1257, 0, 9_999),
  otherPay: num(0),
  otherTax: num(0),
  region: taxParams.region,
};
const ADVANCED = ["code", "otherPay", "otherTax", "region"] as const;

export default function P45P60Studio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const p60 = v.doc === "P60";
  const months = p60 ? 12 : v.month;
  const allowance = v.code * 10 + 9;
  const totalPay = v.pay + v.otherPay;
  const totalTax = v.tax + v.otherTax;
  const expected = Math.max(0, bandTax(totalPay - (allowance * months) / 12, months / 12, v.region));
  const diff = totalTax - expected;
  const verdict = Math.abs(diff) < 25 ? "about right" : diff > 0 ? "too much" : "too little";

  return (
    <Studio
      title="Your P45 or P60"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={p60 ? "Check my P60" : "Check my P45"}
      onReset={st.reset}
      dock={{ label: diff > 0 ? "Possibly overpaid" : "Difference", value: gbp(Math.abs(diff)) }}
      inputs={
        <>
          <InputGroup title="Your document">
            <Segmented
              label="Which document do you have?"
              value={v.doc}
              onChange={st.bind("doc")}
              options={[
                { value: "P60", label: "P60", note: "Your pay and tax for a whole tax year, given by your employer by 31 May." },
                { value: "P45", label: "P45", note: "Your pay and tax up to the day you left a job." },
              ]}
            />
            <MoneyField label={p60 ? "Pay in this employment" : "Total pay to date"} value={v.pay} onChange={st.bind("pay")} big hint={p60 ? "On your P60 under 'Pay and Income Tax details'." : "Box 7 on your P45 (part 1A)."} />
            <MoneyField label={p60 ? "Tax deducted" : "Total tax to date"} value={v.tax} onChange={st.bind("tax")} pence />
            {!p60 && (
              <SelectField
                label="Month you left"
                value={String(v.month)}
                onChange={(m) => st.set("month", Number(m))}
                options={MONTHS.map((m, i) => ({ value: String(i + 1), label: `${m} (month ${i + 1})` }))}
              />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])} description="Optional. Change these if your code was not 1257L or you had other PAYE income.">
            <StepperField label="Tax code number" value={v.code} onChange={(n) => st.set("code", Math.round(n))} step={1} min={0} max={9_999} unit="L" optional hint="The number in your code, e.g. 1257 for 1257L." />
            <MoneyField label="Pay from other jobs or pensions this year" value={v.otherPay} onChange={st.bind("otherPay")} optional />
            <MoneyField label="Tax deducted from them" value={v.otherTax} onChange={st.bind("otherTax")} pence optional />
            <Segmented
              label="Where you lived"
              value={v.region}
              onChange={st.bind("region")}
              optional
              options={[
                { value: "ruk", label: "England, Wales & NI" },
                { value: "scotland", label: "Scotland", note: "Uses the 2026/27 Scottish bands." },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={p60 ? "Your tax for the year looks" : "Your tax to date looks"}
        value={verdict === "about right" ? "About right" : gbp(Math.abs(diff))}
        unit={verdict === "about right" ? undefined : verdict}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            On <b>{gbp(totalPay)}</b> of pay {p60 ? "for the year" : `to the end of ${MONTHS[v.month - 1]}`}, with code <b>{v.code}L</b>, Income Tax should be about{" "}
            <b>{gbp(expected)}</b>. Your {v.doc} shows <b>{gbp(totalTax)}</b>
            {verdict === "too much" ? <>, so you may have overpaid.</> : verdict === "too little" ? <>, so you may owe a little more.</> : <>, which matches.</>}
          </>
        }
        badges={[v.doc, `Code ${v.code}L`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "Tax shown", value: gbp(totalTax, true) },
          { label: "Tax expected", value: gbp(expected, true) },
          { label: diff >= 0 ? "Possible overpayment" : "Possible underpayment", value: gbp(Math.abs(diff), true), tone: Math.abs(diff) < 25 ? "good" : diff > 0 ? "warn" : "bad" },
          { label: "Tax-free pay used", value: gbp((allowance * months) / 12), note: `${months} month${months === 1 ? "" : "s"}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Bands", value: "2026/27 (UK bands same as 2025/26)" },
          { label: "Tax code", value: `${v.code}L, cumulative` },
          { label: "Income", value: v.otherPay > 0 ? "Includes other PAYE income" : "This job only" },
          { label: "Not included", value: "Savings, dividends, rental income" },
        ]}
      />

      <ResultCard title="The check, line by line" sub="How we compare your figures with the tax due.">
        <Statement
          columns={["Amount"]}
          rows={[
            { label: "Pay", values: [gbp(totalPay)] },
            { label: "Tax-free pay from your code", values: [gbp(-(allowance * months) / 12)], kind: "deduction" },
            { label: "Taxable pay", values: [gbp(Math.max(0, totalPay - (allowance * months) / 12))] },
            { label: "Tax due", values: [gbp(expected, true)] },
            { label: "Tax shown on your document", values: [gbp(totalTax, true)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="What to do next" sub={verdict === "about right" ? "Nothing to do if this matches your payslips." : "How to sort out a difference."}>
        {verdict === "too much" && (
          <Callout tone="good" title="Getting overpaid tax back">
            {p60
              ? "HMRC normally sends a P800 tax calculation between June and November and refunds the overpayment. You can also check and claim in the HMRC app."
              : "Give your P45 to your next employer: they will use it to correct your tax, and refund the overpayment through payroll. If you are not working, you can claim a refund from HMRC."}
          </Callout>
        )}
        {verdict === "too little" && (
          <Callout tone="warn" title="If you owe tax">
            HMRC usually collects small underpayments through your tax code the following year, spread over the year. You do not normally need to pay it in one go.
          </Callout>
        )}
        <Callout title="Keep your P60 and P45">
          You need them to check your tax, claim refunds, fill in a Self Assessment return, and prove your income for a mortgage, a loan or a benefit claim. HMRC cannot issue
          replacements; your employer can give you a copy.
        </Callout>
      </ResultCard>

      <DataTable
        summary={`What each part of your ${v.doc} means`}
        columns={["Field", "What it means", "Watch out for"]}
        rows={listFields(v.doc).map((f) => [f.field, f.plain, f.watchFor])}
      />

      <p className={s.hint} style={{ textAlign: "center" }}>A quick check for employment and pension income taxed through PAYE. Other income needs Self Assessment.</p>
    </Studio>
  );
}

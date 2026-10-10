"use client";

import { emergencyTax, type EmergencyCode } from "@/lib/tax/emergency-tax";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { REGION_LABEL, taxParams } from "@/components/flagship/taxOptions";

const MONTHS = ["April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March"];
const SCHEMA = {
  pay: num(2_500, 0, 100_000),
  code: oneOf<EmergencyCode>("M1", ["M1", "BR", "0T"]),
  start: num(7, 1, 12),
  slips: num(1, 1, 12),
  prevPay: num(0),
  prevTax: num(0),
  region: taxParams.region,
};
const ADVANCED = ["prevPay", "prevTax", "region"] as const;
const CODE_LABEL: Record<EmergencyCode, string> = { M1: "1257L M1 (or W1, X)", BR: "BR", "0T": "0T" };

export default function EmergencyStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const slips = Math.min(v.slips, 13 - v.start);
  const r = emergencyTax({
    monthlyPay: v.pay,
    code: v.code,
    startMonth: v.start,
    payslips: slips,
    previousPay: v.prevPay,
    previousTax: v.prevTax,
    region: v.region,
  });
  const over = r.overpaidSoFar;
  const prefix = v.region === "scotland" ? "S" : "";

  return (
    <Studio
      title="Your pay and tax code"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Check my tax"
      onReset={st.reset}
      dock={{ label: "Overpaid so far", value: gbp(Math.max(0, over), true) }}
      inputs={
        <>
          <InputGroup title="Your job">
            <MoneyField label="Monthly pay before tax" value={v.pay} onChange={st.bind("pay")} big slider={{ min: 0, max: 10_000, step: 50, ends: ["£0", "£10k"] }} />
            <Segmented
              label="Your tax code"
              value={v.code}
              onChange={st.bind("code")}
              options={[
                { value: "M1", label: "1257L M1", note: "Also shown as W1, X or 'non-cumulative'. You get a month's allowance each month, but no catch-up." },
                { value: "BR", label: "BR", note: "Every pound is taxed at 20%, with no tax-free allowance." },
                { value: "0T", label: "0T", note: "No tax-free allowance, with the normal bands." },
              ]}
            />
            <SelectField
              label="Month you started this job"
              value={String(v.start)}
              onChange={(m) => st.set("start", Number(m))}
              options={MONTHS.map((m, i) => ({ value: String(i + 1), label: m }))}
            />
            <StepperField label="Payslips so far in this job" value={slips} onChange={st.bind("slips")} step={1} min={1} max={13 - v.start} unit="payslips" />
          </InputGroup>
          <AdvancedOptions
            changed={st.changed([...ADVANCED])}
            onReset={() => st.resetKeys([...ADVANCED])}
            description="Optional. If you had another job earlier this tax year, add the figures from your P45."
          >
            <MoneyField label="Pay from earlier jobs this tax year" value={v.prevPay} onChange={st.bind("prevPay")} optional hint="Box 'Total pay to date' on your P45." />
            <MoneyField label="Tax paid in earlier jobs this tax year" value={v.prevTax} onChange={st.bind("prevTax")} pence optional hint="Box 'Total tax to date' on your P45." />
            <Segmented
              label="Where you live"
              value={v.region}
              onChange={st.bind("region")}
              optional
              options={[
                { value: "ruk", label: "England, Wales & NI" },
                { value: "scotland", label: "Scotland" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={over > 1 ? "Tax you have overpaid so far" : over < -1 ? "Tax underpaid so far" : "Your tax is about right"}
        value={gbp(Math.abs(over), true)}
        unit={over > 1 ? "too much" : over < -1 ? "too little" : "difference"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            On code <b>{prefix}{CODE_LABEL[v.code]}</b>, each month&apos;s <b>{gbp(v.pay)}</b> is taxed <b>{gbp(r.monthEmergency, true)}</b>. With the right cumulative code,
            your tax so far would be <b>{gbp(r.dueSoFar, true)}</b> instead of <b>{gbp(r.takenSoFar, true)}</b>.
            {r.overpaidByYearEnd > 1 && (
              <>
                {" "}
                If nothing changes, you would overpay about <b>{gbp(r.overpaidByYearEnd)}</b> by 5 April.
              </>
            )}
          </>
        }
        badges={[`Started in ${MONTHS[v.start - 1]}`, `${slips} payslip${slips === 1 ? "" : "s"}`, REGION_LABEL[v.region]]}
      />

      <Facts
        items={[
          { label: "Tax a month, emergency code", value: gbp(r.monthEmergency, true) },
          { label: "Tax this month, correct code", value: gbp(Math.max(0, r.monthCorrect), true) },
          { label: "Overpaid so far", value: gbp(Math.max(0, over), true), tone: over > 1 ? "warn" : "good" },
          { label: "By 5 April if unchanged", value: gbp(Math.max(0, r.overpaidByYearEnd)), tone: r.overpaidByYearEnd > 1 ? "warn" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Correct code", value: `${prefix}1257L, cumulative` },
          { label: "Pay", value: "Same each month" },
          { label: "Other income", value: v.prevPay > 0 ? "Earlier job included" : "None this tax year" },
        ]}
      />

      <ResultCard title="Your tax so far" sub="Tax taken in this job compared with the right amount.">
        <Statement
          columns={["Emergency code", "Correct code"]}
          rows={[
            { label: "Pay in this job", values: [gbp(v.pay * slips), gbp(v.pay * slips)] },
            { label: "Tax taken", values: [gbp(-r.takenSoFar, true), gbp(-r.dueSoFar, true)], kind: "deduction" },
            { label: "Pay after tax", values: [gbp(v.pay * slips - r.takenSoFar, true), gbp(v.pay * slips - r.dueSoFar, true)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="How to get it fixed" sub="Most emergency codes are corrected within one or two payslips.">
        <Callout title="1. Give your employer your P45">
          If you had a job earlier this tax year, your P45 lets payroll use a cumulative code straight away. If you do not have one, complete the HMRC starter checklist.
        </Callout>
        <Callout title="2. Check your code in the HMRC app or personal tax account">
          You can see your tax code, update your income and tell HMRC about a new job online. HMRC then sends your employer the right code.
        </Callout>
        {over > 1 && (
          <Callout tone="good" title="3. Overpaid tax comes back">
            Once your code is corrected, overpaid tax is usually refunded through your next payslip. If you leave the job or the tax year ends first, HMRC refunds it,
            or you can claim it online.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026/27 rates. Estimates assume the same pay each month; your payslip may differ slightly because of rounding and pay dates.
      </p>
    </Studio>
  );
}

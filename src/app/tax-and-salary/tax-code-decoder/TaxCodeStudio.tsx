"use client";

import { decodeTaxCode, STANDARD_PERSONAL_ALLOWANCE, taxUnderCode } from "@/lib/tax/tax-code";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, Chips, InputGroup, MoneyField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { num, ShareButton, useStudio, type Param, type Query } from "@/components/flagship/useStudio";

const codeParam: Param<string> = { def: "1257L", parse: (raw) => raw.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) || undefined };
const SCHEMA = { code: codeParam, pay: num(0) };
const ADVANCED = ["pay"] as const;
const EXAMPLES = ["1257L", "S1257L", "1257L M1", "BR", "0T", "K475", "1383M", "1131N", "D0"];

const LETTER: Record<string, string> = {
  L: "You get the standard tax-free Personal Allowance.",
  M: "Marriage Allowance: you receive 10% of your partner’s allowance.",
  N: "Marriage Allowance: you transfer 10% of your allowance to your partner.",
  T: "Your code includes other calculations, often because income over £100,000 reduces your allowance.",
  Y: "An older age-related code.",
};

export default function TaxCodeStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const a = decodeTaxCode(v.code);
  const standard = decodeTaxCode(a.region === "scotland" ? "S1257L" : a.region === "wales" ? "C1257L" : "1257L");
  const pay = v.pay;
  const taxCode = pay > 0 ? taxUnderCode(pay, a) : 0;
  const taxStd = pay > 0 ? taxUnderCode(pay, standard) : 0;
  const flat = ["br", "d0", "d1", "nt"].includes(a.type);
  const allowance = a.type === "0t" ? 0 : a.personalAllowance;
  const diffAllowance = allowance - STANDARD_PERSONAL_ALLOWANCE;
  // Payroll adds £9 to the allowance in the code (1257L → £12,579).
  const payrollAllowance = allowance > 0 ? allowance + 9 : allowance;

  const body = a.normalised.replace(/^[SC]/, "").replace(/(W1|M1|X)$/, "");
  const numberPart = body.match(/^K?(\d+)/)?.[1];
  const letterPart = body.match(/^\d+([LMNTY])$/)?.[1];
  const parts = [
    ...(a.region !== "rUK" ? [{ label: a.normalised[0], value: a.region === "scotland" ? "Scotland" : "Wales", note: a.region === "scotland" ? "Taxed at Scottish rates" : "Welsh rates (same as England for 2026/27)" }] : []),
    ...(body.startsWith("K") ? [{ label: "K", value: "Negative allowance", note: "Something is added to your taxable pay" }] : []),
    ...(numberPart && !flat ? [{ label: numberPart, value: gbp(Number(numberPart) * 10), note: body.startsWith("K") ? "Added to taxable pay (number × 10)" : "Tax-free a year (number × 10)" }] : []),
    ...(letterPart ? [{ label: "Letter", value: letterPart, note: LETTER[letterPart] }] : []),
    ...(flat ? [{ label: body, value: "Flat rate", note: a.meaning }] : []),
    ...(a.type === "0t" ? [{ label: "0T", value: "No allowance", note: "Normal tax bands, no tax-free pay" }] : []),
    ...(a.emergency ? [{ label: a.normalised.match(/(W1|M1|X)$/)?.[1] ?? "", value: "Emergency", note: "Non-cumulative: each payslip taxed on its own" }] : []),
  ];

  return (
    <Studio
      title="Your tax code"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Decode my tax code"
      onReset={st.reset}
      dock={{ label: a.normalised || "Tax code", value: flat || a.type === "0t" ? "No allowance" : `${gbp(allowance)} tax-free` }}
      inputs={
        <>
          <InputGroup title="Your code">
            <TextField
              label="Tax code"
              value={v.code}
              onChange={(c) => st.set("code", c.toUpperCase().replace(/[^A-Z0-9 ]/g, "").slice(0, 12))}
              placeholder="e.g. 1257L"
              big
              uppercase
              hint="Find it on your payslip, P45, P60 or in the HMRC app."
            />
            <Chips label="Examples" value={EXAMPLES.includes(v.code) ? v.code : null} onChange={(c) => st.set("code", c)} options={EXAMPLES.map((e) => ({ value: e, label: e }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])} description="Optional. Add your pay to see the tax this code takes compared with the standard code.">
            <MoneyField label="Your yearly pay from this job" value={v.pay} onChange={st.bind("pay")} optional slider={{ min: 0, max: 150_000, step: 500, ends: ["£0", "£150k"] }} />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Tax code ${a.normalised || "?"}`}
        value={!a.valid ? "Not recognised" : flat ? a.type === "nt" ? "No tax" : "Flat rate" : a.type === "k" ? `−${gbp(-allowance)}` : gbp(allowance)}
        unit={!a.valid ? "" : flat ? "" : a.type === "k" ? "added to taxable pay a year" : "tax-free pay a year"}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          !a.valid ? (
            <>We could not read that code. Check it on your latest payslip or in the HMRC app, and type it without spaces.</>
          ) : (
            <>
              {a.meaning}
              {!flat && a.type !== "k" && a.type !== "0t" && diffAllowance !== 0 && (
                <>
                  {" "}
                  That is <b>{gbp(Math.abs(diffAllowance))}</b> {diffAllowance > 0 ? "more" : "less"} than the standard {gbp(STANDARD_PERSONAL_ALLOWANCE)}.
                </>
              )}
              {a.emergency && <> This is an emergency code, so each payslip is taxed on its own.</>}
            </>
          )
        }
        badges={[a.region === "scotland" ? "Scottish rates" : a.region === "wales" ? "Welsh rates" : "England, Wales or NI", a.emergency ? "Non-cumulative" : "Cumulative", a.valid ? "Valid code" : "Check the code"]}
      />

      {a.valid && (
        <Facts
          items={[
            { label: "Tax-free a month", value: flat || a.type === "0t" ? "£0" : a.type === "k" ? `−${gbp(-allowance / 12, true)}` : gbp(payrollAllowance / 12, true) },
            { label: "Tax-free a week", value: flat || a.type === "0t" ? "£0" : a.type === "k" ? `−${gbp(-allowance / 52, true)}` : gbp(payrollAllowance / 52, true) },
            pay > 0 ? { label: "Tax a year on this code", value: gbp(taxCode) } : { label: "Basis", value: a.emergency ? "Each payslip" : "Cumulative" },
            pay > 0
              ? { label: "Vs standard code", value: `${taxCode >= taxStd ? "+" : "−"}${gbp(Math.abs(taxCode - taxStd))}`, tone: taxCode > taxStd + 1 ? "warn" : "good" }
              : { label: "Standard code", value: standard.normalised },
          ]}
        />
      )}

      <Assumptions
        items={[
          { label: "Tax year", value: "2026/27" },
          { label: "Standard allowance", value: gbp(STANDARD_PERSONAL_ALLOWANCE) },
          { label: "Pay", value: pay > 0 ? `${gbp(pay)} a year` : "Not entered" },
          { label: "Applied", value: "Over a full tax year" },
        ]}
      />

      {a.valid && parts.length > 0 && (
        <ResultCard title="Your code, part by part" sub="What each part of the code tells your employer.">
          <Facts items={parts} />
        </ResultCard>
      )}

      {a.valid && pay > 0 && (
        <ResultCard title="This code next to the standard code" sub={`Income Tax on ${gbp(pay)} a year from this job.`}>
          <Statement
            columns={[a.normalised, standard.normalised]}
            rows={[
              { label: "Tax a year", values: [gbp(taxCode), gbp(taxStd)] },
              { label: "Tax a month", values: [gbp(taxCode / 12, true), gbp(taxStd / 12, true)] },
              { label: "Pay after tax a month", values: [gbp((pay - taxCode) / 12, true), gbp((pay - taxStd) / 12, true)], kind: "total" },
            ]}
          />
        </ResultCard>
      )}

      {a.valid && (
        <ResultCard title="Is your code right?" sub="Common reasons a code differs from 1257L.">
          {diffAllowance < 0 && !flat && a.type !== "0t" && (
            <Callout title="Why your allowance may be lower">
              HMRC reduces your allowance to collect tax on company benefits such as a car or medical insurance, untaxed income, tax you owe from earlier years, or because
              income over £100,000 reduces your allowance. Your coding notice in the HMRC app lists each adjustment.
            </Callout>
          )}
          {diffAllowance > 0 && !flat && (
            <Callout tone="good" title="Why your allowance may be higher">
              Allowances above £12,570 usually reflect Marriage Allowance, tax relief on work expenses such as uniform or professional fees, or higher-rate relief on
              pension contributions or Gift Aid.
            </Callout>
          )}
          {a.type === "k" && (
            <Callout tone="warn" title="K codes">
              A K code means the deductions from your allowance are more than the allowance itself. Tax deducted cannot be more than half of your pay in any pay period.
            </Callout>
          )}
          {(flat || a.type === "0t") && (
            <Callout title="Second jobs and pensions">
              BR, D0 and similar codes are normal for a second job or pension when your allowance is used by your main income. If this is your only job, contact HMRC.
            </Callout>
          )}
          {a.emergency && (
            <Callout tone="warn" title="Emergency code">
              Give your employer your P45 or update your details in the HMRC app. Our emergency tax calculator shows how much you may have overpaid.
            </Callout>
          )}
          {a.type === "standard" && diffAllowance === 0 && !a.emergency && (
            <Callout tone="good" title="This is the standard code">
              1257L is right for most people with one job and no company benefits or other adjustments.
            </Callout>
          )}
        </ResultCard>
      )}

      <p className="footnote" style={{ textAlign: "center" }}>2026/27 rules. Your coding notice from HMRC explains exactly how your code was worked out.</p>
    </Studio>
  );
}

"use client";

import { FILING_LABEL, standardDeduction, type FilingStatus, type ReturnInput } from "@/lib/us/tax-2026";
import { returnWithQbi } from "@/lib/us/taxes-extra";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, per, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;

const SCHEMA = {
  status: oneOf<FilingStatus>("single", STATUSES),
  wages: num(65_000, 0, 100_000_000),
  withheld: num(6_200, 0, 100_000_000),
  children: num(0, 0, 15),
  estimated: num(0, 0, 100_000_000),
  other: num(0, 0, 100_000_000),
  pension: num(0, 0, 100_000_000),
  ltcg: num(0, 0, 100_000_000),
  se: num(0, 0, 100_000_000),
  pretax: num(0, 0, 1_000_000),
  adjust: num(0, 0, 1_000_000),
  itemized: num(0, 0, 100_000_000),
  over65: num(0, 0, 2),
  others: num(0, 0, 15),
  overtime: num(0, 0, 1_000_000),
  tips: num(0, 0, 1_000_000),
  credits: num(0, 0, 1_000_000),
  refundable: num(0, 0, 1_000_000),
};
const ADVANCED = ["estimated", "other", "pension", "ltcg", "se", "pretax", "adjust", "itemized", "over65", "others", "overtime", "tips", "credits", "refundable"] as const;

const C = { tax: "#eb6834", refund: "#2a78d6", owe: "#e34948", paid: "#1baf7a" };

type Extras = { credits: number; refundable: number };

/** The return with the extra credits the visitor typed in: non-refundable ones only up to the income tax. */
function outcome(input: ReturnInput, x: Extras) {
  const r = returnWithQbi(input, true);
  const nonRef = Math.min(Math.max(0, x.credits), Math.max(0, r.incomeTax));
  const refundable = Math.max(0, x.refundable);
  return { r, nonRef, refundable, tax: r.totalTax - nonRef - refundable, refund: r.refund + nonRef + refundable };
}

export default function RefundStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const people = v.status === "mfj" ? 2 : 1;
  const input: ReturnInput = {
    status: v.status,
    wages: v.wages,
    otherIncome: v.other,
    nonInvestmentIncome: v.pension,
    longTermGains: v.ltcg,
    selfEmployment: v.se,
    preTax: Math.min(v.pretax, v.wages),
    adjustments: v.adjust,
    itemized: v.itemized,
    over65: Math.min(Math.round(v.over65), people),
    blind: 0,
    children: Math.round(v.children),
    otherDependents: Math.round(v.others),
    overtimePremium: v.overtime,
    tips: v.tips,
    withheld: v.withheld + v.estimated,
  };
  const x: Extras = { credits: v.credits, refundable: v.refundable };
  const o = outcome(input, x);
  const r = o.r;
  const refund = o.refund;
  const owes = refund < -0.5;
  const paidIn = v.withheld + v.estimated;
  const std = standardDeduction(v.status, input.over65, 0);
  const refundableAll = r.credits.refundable + o.refundable;
  const taxBeforeRefundable = Math.max(0, o.tax + refundableAll);

  const scenarios = [
    { label: "Put $1,000 into a traditional IRA", input: { ...input, adjustments: input.adjustments + 1_000 } },
    { label: "Earn $1,000 more at work (no extra withholding)", input: { ...input, wages: input.wages + 1_000 } },
    { label: "Earn $1,000 from a side gig (1099)", input: { ...input, selfEmployment: input.selfEmployment + 1_000 } },
    { label: "Sell shares for a $1,000 long-term gain", input: { ...input, longTermGains: input.longTermGains + 1_000 } },
    { label: "Have $1,000 more itemized deductions", input: { ...input, itemized: Math.max(input.itemized, 0) + 1_000 } },
    { label: "Claim one more child under 17", input: { ...input, children: input.children + 1 } },
    { label: "Have $50 more withheld from 6 paychecks", input: { ...input, withheld: input.withheld + 300 } },
  ].map((s) => {
    const n = outcome(s.input, x).refund;
    return { label: s.label, refund: n, change: n - refund };
  });
  const maxChange = Math.max(1, ...scenarios.map((s) => Math.abs(s.change)));

  const segments = owes
    ? [
        { label: "Covered by what you paid in", value: Math.max(0, paidIn + refundableAll), display: usd(paidIn + refundableAll), color: C.paid },
        { label: "Still to pay", value: -refund, display: usd(-refund), color: C.owe },
      ]
    : [
        { label: "Your 2026 tax", value: taxBeforeRefundable, display: usd(taxBeforeRefundable), color: C.tax },
        { label: "Refund", value: Math.max(0, refund), display: usd(refund), color: C.refund },
      ];

  return (
    <Studio
      title="Your 2026 tax refund"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my refund"
      onReset={st.reset}
      dock={{ label: owes ? "You owe" : "Your refund", value: usd(Math.abs(refund)) }}
      inputs={
        <>
          <InputGroup title="You and your pay">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <MoneyField label="Wages for 2026" symbol="$" value={v.wages} onChange={st.bind("wages")} slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="Gross pay for the whole year from every job, before 401(k) and other deductions." />
            <MoneyField label="Federal tax withheld in 2026" symbol="$" value={v.withheld} onChange={st.bind("withheld")} info="Box 2 of your W-2s. Before year end, add what your pay stub shows so far to what the rest of your paychecks will withhold." />
            <StepperField label="Children under 17" value={v.children} onChange={(n) => st.set("children", Math.round(n))} step={1} min={0} max={15} unit="children" dp={0} info="Each qualifying child under 17 at the end of 2026 is worth a $2,200 child tax credit, up to $1,700 of it refundable." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Estimated tax payments made" symbol="$" value={v.estimated} onChange={st.bind("estimated")} optional info="Form 1040-ES payments for 2026, and any 2025 overpayment you applied to 2026." />
            <MoneyField label="Traditional 401(k), HSA and other pre-tax payroll deductions" symbol="$" value={v.pretax} onChange={st.bind("pretax")} optional />
            <MoneyField label="Interest, dividends and short-term gains" symbol="$" value={v.other} onChange={st.bind("other")} optional info="Usually no tax is withheld from these, so they lower a refund." />
            <MoneyField label="Pensions, IRA and 401(k) withdrawals, unemployment" symbol="$" value={v.pension} onChange={st.bind("pension")} optional info="Taxed as ordinary income. Put any tax withheld from them in the withheld box." />
            <MoneyField label="Long-term capital gains and qualified dividends" symbol="$" value={v.ltcg} onChange={st.bind("ltcg")} optional />
            <MoneyField label="Self-employment profit (1099)" symbol="$" value={v.se} onChange={st.bind("se")} optional info="Net profit after business expenses. It brings self-employment tax as well as income tax." />
            <MoneyField label="Adjustments to income" symbol="$" value={v.adjust} onChange={st.bind("adjust")} optional info="Deductible traditional IRA contributions, student loan interest (up to $2,500), HSA contributions made outside payroll, educator expenses." />
            <MoneyField label="Itemized deductions" symbol="$" value={v.itemized} onChange={st.bind("itemized")} optional info="Mortgage interest, state and local taxes (up to the $40,400 SALT cap), charity and large medical bills. We use the larger of these and the standard deduction." />
            <StepperField label="People 65 or over" value={v.over65} onChange={(n) => st.set("over65", Math.round(n))} step={1} min={0} max={2} unit="people" dp={0} optional info="Adds to the standard deduction and brings the $6,000 senior deduction." />
            <StepperField label="Other dependents" value={v.others} onChange={(n) => st.set("others", Math.round(n))} step={1} min={0} max={15} unit="people" dp={0} optional info="Children 17 or older and relatives you support: a $500 credit each." />
            <MoneyField label="Qualified overtime premium" symbol="$" value={v.overtime} onChange={st.bind("overtime")} optional info="The extra half of time-and-a-half pay, deductible up to $12,500 ($25,000 joint)." />
            <MoneyField label="Qualified tips" symbol="$" value={v.tips} onChange={st.bind("tips")} optional info="Deductible up to $25,000 in a job that customarily received tips." />
            <MoneyField label="Other credits that cut your tax" symbol="$" value={v.credits} onChange={st.bind("credits")} optional info="Non-refundable credits such as the Lifetime Learning credit, the child and dependent care credit or the saver's credit. They can only cut your income tax to zero." />
            <MoneyField label="Other refundable credits" symbol="$" value={v.refundable} onChange={st.bind("refundable")} optional info="Credits paid even if they are more than your tax: the earned income tax credit and the refundable part of the American opportunity credit. The IRS EITC Assistant works out the EITC." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={owes ? "Estimated balance due" : "Estimated refund"}
        value={usd(Math.abs(refund))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          owes ? (
            <>
              Your 2026 federal tax comes to <b>{usd(o.tax)}</b>, but only <b>{usd(paidIn)}</b>{" "}was withheld or paid in. You would <b>owe {usd(-refund)}</b>{" "}when you file, due by April 15, 2027.
            </>
          ) : (
            <>
              You paid in <b>{usd(paidIn)}</b>
              {refundableAll > 0 ? (
                <>
                  {" "}and qualify for <b>{usd(refundableAll)}</b>{" "}of refundable credits
                </>
              ) : null}
              , against a 2026 federal tax of <b>{usd(Math.max(0, taxBeforeRefundable))}</b>. You should get back about <b>{usd(refund)}</b>.
            </>
          )
        }
        badges={[`${percent(r.ordinary.marginal)} bracket`, `${percent(Math.max(0, r.effectiveRate), 1)} effective rate`, owes ? "File by April 15, 2027" : `${usd(Math.max(0, refund) / 12)} a month overpaid`]}
      />

      <Facts
        items={[
          { label: "Total 2026 federal tax", value: usd(o.tax) },
          { label: "Withheld and paid in", value: usd(paidIn) },
          { label: "Refundable credits", value: usd(refundableAll) },
          { label: owes ? "Balance due" : "Refund", value: usd(Math.abs(refund)), tone: owes ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026, filed in early 2027" },
          { label: "Filing status", value: FILING_LABEL[v.status] },
          { label: "Deduction", value: `${r.deductionType === "itemized" ? "Itemized" : "Standard"}: ${usd(r.deduction)} (standard would be ${usd(std)})` },
          { label: "Credits worked out for you", value: "Child tax credit ($2,200 a child) and the $500 credit for other dependents; anything else you enter" },
          { label: "Not included", value: "State tax, AMT, the earned income credit unless you enter it" },
        ]}
      />

      <ResultCard title={owes ? "What you still need to pay" : "Where your refund comes from"} sub="What you paid in against your 2026 tax.">
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="Refund, step by step" sub="From your tax to the check (or bill) at the end.">
        <Statement
          columns={["2026"]}
          rows={[
            { label: "Adjusted gross income", values: [usd(r.agi)] },
            { label: r.deductionType === "itemized" ? "Itemized deductions" : "Standard deduction", values: [`−${usd(r.deduction)}`], kind: "deduction" },
            ...(r.seniorDeduction + r.overtimeDeduction + r.tipsDeduction + r.qbiDeduction > 0
              ? [{ label: "Senior, overtime, tips and business deductions", values: [`−${usd(r.seniorDeduction + r.overtimeDeduction + r.tipsDeduction + r.qbiDeduction)}`], kind: "deduction" as const }]
              : []),
            { label: "Taxable income", values: [usd(r.taxable)], kind: "total" },
            { label: "Income tax before credits", values: [usd(r.ordinary.tax + r.gains.tax)] },
            ...(r.credits.nonRefundable + o.nonRef > 0 ? [{ label: "Non-refundable credits", values: [`−${usd(r.credits.nonRefundable + o.nonRef)}`], kind: "deduction" as const }] : []),
            ...(r.se.seTax + r.niit + r.additionalMedicare > 0 ? [{ label: "Self-employment and other taxes", values: [usd(r.se.seTax + r.niit + r.additionalMedicare)] }] : []),
            { label: "Tax before refundable credits", values: [usd(taxBeforeRefundable)], kind: "total" },
            { label: "Federal tax withheld", values: [`−${usd(v.withheld)}`], kind: "deduction" },
            ...(v.estimated > 0 ? [{ label: "Estimated payments", values: [`−${usd(v.estimated)}`], kind: "deduction" as const }] : []),
            ...(refundableAll > 0 ? [{ label: "Refundable credits", values: [`−${usd(refundableAll)}`], kind: "deduction" as const }] : []),
            { label: owes ? "Balance due" : "Refund", values: [usd(Math.abs(refund))], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="What would change your refund" sub="Each change on its own, from where you are now.">
        <Compare
          head={["If you…", owes ? "Then you would owe or get" : "Your refund would be"]}
          rows={scenarios.map((s) => ({
            label: s.label,
            value: s.refund < -0.5 ? `Owe ${usd(-s.refund)}` : usd(s.refund),
            delta: Math.abs(s.change) < 0.5 ? "no change" : `${s.change > 0 ? "+" : "−"}${usd(Math.abs(s.change))}`,
            deltaTone: s.change >= 0 ? ("up" as const) : ("down" as const),
            bar: Math.abs(s.change) / maxChange,
          }))}
        />
        <p className="footnote">
          Extra income with nothing withheld cuts a refund by your tax rate on it. A deduction is worth your bracket rate; a credit is worth its face value.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you file.">
        {owes && -refund >= 1_000 && (
          <Callout tone="warn" title="You may owe an underpayment penalty">
            Owing {usd(-refund)} is $1,000 or more. The IRS charges interest-like penalties unless what you paid in covered 90% of your 2026 tax or 100% of your 2025 tax (110% if your 2025 AGI was over $150,000). A payment by
            January 15, 2027, or more withholding from your last paychecks, cuts it.
          </Callout>
        )}
        {owes && -refund < 1_000 && (
          <Callout title="Under $1,000: no penalty">
            You owe less than $1,000 after withholding, so there is no underpayment penalty. Pay by April 15, 2027 to avoid interest.
          </Callout>
        )}
        {!owes && refund > 2_000 && (
          <Callout title="A big refund is your own money, late">
            A {usd(refund)} refund is about {usd(refund / 26)} a paycheck if you are paid every two weeks. A new W-4 for 2027 would put that in your pay instead, with no interest lost.
          </Callout>
        )}
        {r.credits.refundable > 0 && (
          <Callout tone="good" title="Refundable child tax credit">
            {usd(r.credits.refundable)} of your child tax credit is refundable, so it is paid even though it is more than your income tax. By law, refunds that include it can&rsquo;t be issued before mid-February.
          </Callout>
        )}
        {v.children > 0 && (
          <Callout title="Children">
            We counted the credit for {Math.round(v.children)} {per(Math.round(v.children), "children")}. Each child needs a Social Security number valid for work, and so do you (or one of you if married filing jointly).
          </Callout>
        )}
        <Callout title="When it arrives">
          The IRS issues most refunds within 21 days of an e-filed return with direct deposit. Paper refund checks are being phased out, so have bank details ready.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for tax year 2026. Not tax advice.
      </p>
    </Studio>
  );
}

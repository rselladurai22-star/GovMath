"use client";

import { FILING_LABEL, standardDeduction, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import { returnWithQbi } from "@/lib/us/taxes-extra";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, per, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;

const SCHEMA = {
  status: oneOf<FilingStatus>("single", STATUSES),
  wages: num(75_000, 0, 100_000_000),
  withheld: num(7_000, 0, 100_000_000),
  children: num(0, 0, 15),
  other: num(0, 0, 100_000_000),
  pension: num(0, 0, 100_000_000),
  ltcg: num(0, 0, 100_000_000),
  se: num(0, 0, 100_000_000),
  pretax: num(0, 0, 1_000_000),
  adjust: num(0, 0, 1_000_000),
  itemized: num(0, 0, 100_000_000),
  over65: num(0, 0, 2),
  blind: num(0, 0, 2),
  others: num(0, 0, 15),
  overtime: num(0, 0, 1_000_000),
  tips: num(0, 0, 1_000_000),
  qbi: bool(true),
};
const ADVANCED = ["other", "pension", "ltcg", "se", "pretax", "adjust", "itemized", "over65", "blind", "others", "overtime", "tips", "qbi"] as const;

const C = { keep: "#2a78d6", income: "#eb6834", se: "#4a3aa7", other: "#e34948" };

export default function FederalStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const people = v.status === "mfj" ? 2 : 1;
  const input = {
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
    blind: Math.min(Math.round(v.blind), people),
    children: Math.round(v.children),
    otherDependents: Math.round(v.others),
    overtimePremium: v.overtime,
    tips: v.tips,
    withheld: v.withheld,
  };
  const r = returnWithQbi(input, v.qbi);
  const refund = r.refund;
  const owes = refund < 0;
  const std = standardDeduction(v.status, input.over65, input.blind);
  const otherTaxes = r.niit + r.additionalMedicare;
  const incomeTaxPos = Math.max(0, r.incomeTax - r.credits.refundable);
  const keep = Math.max(0, r.grossIncome - Math.max(0, r.totalTax));
  const below = r.seniorDeduction + r.overtimeDeduction + r.tipsDeduction + r.qbiDeduction;

  const statusRows = STATUSES.filter((s) => s !== v.status).map((s) => ({ s, x: returnWithQbi({ ...input, status: s }, v.qbi) }));
  const allRows = [{ s: v.status, x: r }, ...statusRows];
  const maxTax = Math.max(1, ...allRows.map((a) => Math.max(0, a.x.totalTax)));

  const lines = [
    { label: "Total income", values: [usd(r.grossIncome)] },
    ...(r.se.deduction > 0 ? [{ label: "Half of self-employment tax", values: [`−${usd(r.se.deduction)}`], kind: "deduction" as const }] : []),
    ...(v.adjust > 0 ? [{ label: "Adjustments (IRA, student loan interest…)", values: [`−${usd(v.adjust)}`], kind: "deduction" as const }] : []),
    { label: "Adjusted gross income (AGI)", values: [usd(r.agi)], kind: "total" as const },
    { label: r.deductionType === "itemized" ? "Itemized deductions" : "Standard deduction", values: [`−${usd(r.deduction)}`], kind: "deduction" as const },
    ...(r.seniorDeduction > 0 ? [{ label: "Senior deduction (65+)", values: [`−${usd(r.seniorDeduction)}`], kind: "deduction" as const }] : []),
    ...(r.overtimeDeduction > 0 ? [{ label: "Overtime deduction", values: [`−${usd(r.overtimeDeduction)}`], kind: "deduction" as const }] : []),
    ...(r.tipsDeduction > 0 ? [{ label: "Tips deduction", values: [`−${usd(r.tipsDeduction)}`], kind: "deduction" as const }] : []),
    ...(r.qbiDeduction > 0 ? [{ label: "Qualified business income deduction", values: [`−${usd(r.qbiDeduction)}`], kind: "deduction" as const }] : []),
    { label: "Taxable income", values: [usd(r.taxable)], kind: "total" as const },
    { label: "Tax on ordinary income", values: [usd(r.ordinary.tax)] },
    ...(r.gains.tax > 0 || v.ltcg > 0 ? [{ label: "Tax on long-term gains and dividends", values: [usd(r.gains.tax)] }] : []),
    ...(r.credits.nonRefundable > 0 ? [{ label: "Child and dependent credits", values: [`−${usd(r.credits.nonRefundable)}`], kind: "deduction" as const }] : []),
    ...(r.se.seTax > 0 ? [{ label: "Self-employment tax", values: [usd(r.se.seTax)] }] : []),
    ...(r.niit > 0 ? [{ label: "Net investment income tax (3.8%)", values: [usd(r.niit)] }] : []),
    ...(r.additionalMedicare > 0 ? [{ label: "Additional Medicare tax (0.9%)", values: [usd(r.additionalMedicare)] }] : []),
    ...(r.credits.refundable > 0 ? [{ label: "Refundable child tax credit", values: [`−${usd(r.credits.refundable)}`], kind: "deduction" as const }] : []),
    { label: "Total tax", values: [usd(r.totalTax)], kind: "total" as const },
    { label: "Already withheld or paid", values: [`−${usd(v.withheld)}`], kind: "deduction" as const },
    { label: owes ? "Balance due" : "Refund", values: [usd(Math.abs(refund))], kind: "total" as const },
  ];

  return (
    <Studio
      title="Your 2026 return"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my federal tax"
      onReset={st.reset}
      dock={{ label: owes ? "You owe" : "Your refund", value: usd(Math.abs(refund)) }}
      inputs={
        <>
          <InputGroup title="You">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <StepperField label="Children under 17" value={v.children} onChange={(x) => st.set("children", Math.round(x))} step={1} min={0} max={15} unit="children" dp={0} info="Each qualifying child under 17 at the end of 2026 is worth a $2,200 child tax credit." />
          </InputGroup>
          <InputGroup title="Income and tax paid">
            <MoneyField label="Wages and salary for 2026" symbol="$" value={v.wages} onChange={st.bind("wages")} slider={{ min: 0, max: 400_000, step: 1_000, ends: ["$0", "$400k"] }} info="Gross pay before 401(k) and other deductions." />
            <MoneyField label="Federal tax withheld" symbol="$" value={v.withheld} onChange={st.bind("withheld")} info="Box 2 of your W-2s, plus any estimated payments you made." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Traditional 401(k), HSA and other pre-tax payroll deductions" symbol="$" value={v.pretax} onChange={st.bind("pretax")} optional />
            <MoneyField label="Interest, short-term gains and other investment income" symbol="$" value={v.other} onChange={st.bind("other")} optional info="Taxed as ordinary income, and counted for the 3.8% net investment income tax." />
            <MoneyField label="Pensions, IRA and 401(k) withdrawals" symbol="$" value={v.pension} onChange={st.bind("pension")} optional info="Taxed as ordinary income, but not subject to the net investment income tax." />
            <MoneyField label="Long-term capital gains and qualified dividends" symbol="$" value={v.ltcg} onChange={st.bind("ltcg")} optional info="Taxed at 0%, 15% or 20%." />
            <MoneyField label="Self-employment profit" symbol="$" value={v.se} onChange={st.bind("se")} optional info="Net profit from Schedule C (1099 or freelance income less expenses)." />
            {v.se > 0 && <Switch label="Claim the 20% QBI deduction" checked={v.qbi} onChange={st.bind("qbi")} optional info="The qualified business income deduction for sole proprietors. We assume no employees; above $201,750 of taxable income ($403,500 joint) it phases out." />}
            <MoneyField label="Adjustments to income" symbol="$" value={v.adjust} onChange={st.bind("adjust")} optional info="Deductible IRA contributions, student loan interest (up to $2,500), HSA contributions made outside payroll, educator expenses." />
            <MoneyField label="Itemized deductions" symbol="$" value={v.itemized} onChange={st.bind("itemized")} optional info="Mortgage interest, state and local taxes (up to the SALT cap), charity and large medical bills. We use the larger of these and the standard deduction." />
            <StepperField label="People 65 or over" value={v.over65} onChange={(x) => st.set("over65", Math.round(x))} step={1} min={0} max={2} unit="people" dp={0} optional info="Adds to the standard deduction and brings the $6,000 senior deduction (2025 to 2028)." />
            <StepperField label="People who are blind" value={v.blind} onChange={(x) => st.set("blind", Math.round(x))} step={1} min={0} max={2} unit="people" dp={0} optional />
            <StepperField label="Other dependents" value={v.others} onChange={(x) => st.set("others", Math.round(x))} step={1} min={0} max={15} unit="people" dp={0} optional info="Children 17 or over and relatives you support: $500 credit each." />
            <MoneyField label="Qualified overtime premium" symbol="$" value={v.overtime} onChange={st.bind("overtime")} optional info="The extra half in time-and-a-half pay, not the whole overtime pay. Deductible up to $12,500 ($25,000 joint), 2025 to 2028." />
            <MoneyField label="Qualified tips" symbol="$" value={v.tips} onChange={st.bind("tips")} optional info="Tips in an occupation that customarily received tips. Deductible up to $25,000, 2025 to 2028." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={owes ? "Estimated balance due" : "Estimated refund"}
        value={usd(Math.abs(refund))}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            Your 2026 federal tax is <b>{usd(r.totalTax)}</b> on <b>{usd(r.grossIncome)}</b> of income. You have paid <b>{usd(v.withheld)}</b>, so you
            {owes ? (
              <>
                {" "}should expect to <b>owe {usd(-refund)}</b> when you file by April 15, 2027.
              </>
            ) : (
              <>
                {" "}should get a <b>refund of {usd(refund)}</b>.
              </>
            )}
          </>
        }
        badges={[`${percent(r.ordinary.marginal)} bracket`, `${percent(Math.max(0, r.effectiveRate), 1)} effective rate`, r.deductionType === "itemized" ? "Itemizing" : "Standard deduction"]}
      />

      <Facts
        items={[
          { label: "Adjusted gross income", value: usd(r.agi) },
          { label: "Taxable income", value: usd(r.taxable) },
          { label: "Total federal tax", value: usd(r.totalTax) },
          { label: owes ? "Balance due" : "Refund", value: usd(Math.abs(refund)), tone: owes ? "bad" : "good" },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026, filed in 2027" },
          { label: "Filing status", value: FILING_LABEL[v.status] },
          { label: "Deduction", value: `${r.deductionType === "itemized" ? "Itemized" : "Standard"}: ${usd(r.deduction)} (standard would be ${usd(std)})` },
          { label: "Credits", value: "Child tax credit and credit for other dependents only" },
          { label: "Not included", value: "State tax, the earned income credit, education and energy credits, AMT" },
        ]}
      />

      <ResultCard title="Where your income goes" sub="Your 2026 income split into federal taxes and what is left.">
        <SplitBar
          segments={[
            { label: "Left after federal tax", value: keep, display: usd(keep), color: C.keep },
            { label: "Income tax", value: incomeTaxPos, display: usd(incomeTaxPos), color: C.income },
            ...(r.se.seTax > 0 ? [{ label: "Self-employment tax", value: r.se.seTax, display: usd(r.se.seTax), color: C.se }] : []),
            ...(otherTaxes > 0 ? [{ label: "Medicare and investment surtaxes", value: otherTaxes, display: usd(otherTaxes), color: C.other }] : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="Your return, line by line" sub="A simplified Form 1040.">
        <Statement columns={["2026"]} rows={lines} />
      </ResultCard>

      <ResultCard title="Tax band by band" sub={`How ${usd(r.ordinaryTaxable)} of ordinary taxable income is taxed.`}>
        <Statement
          columns={["Income in band", "Tax"]}
          rows={[
            ...r.ordinary.bands
              .filter((b) => b.income > 0)
              .map((b) => ({ label: `${percent(b.rate)} bracket`, values: [usd(b.income), usd(b.tax)] })),
            ...(r.gains.zero + r.gains.fifteen + r.gains.twenty > 0
              ? [
                  { label: "Gains at 0%", values: [usd(r.gains.zero), usd(0)] },
                  { label: "Gains at 15%", values: [usd(r.gains.fifteen), usd(r.gains.fifteen * 0.15)] },
                  { label: "Gains at 20%", values: [usd(r.gains.twenty), usd(r.gains.twenty * 0.2)] },
                ]
              : []),
          ]}
        />
      </ResultCard>

      <ResultCard title="By filing status" sub="Total federal tax on the same income.">
        <Compare
          head={["Filing status", "Total tax"]}
          rows={allRows
            .slice()
            .sort((a, b) => STATUSES.indexOf(a.s) - STATUSES.indexOf(b.s))
            .map((a) => ({ label: FILING_LABEL[a.s], value: usd(a.x.totalTax), bar: Math.max(0, a.x.totalTax) / maxTax, current: a.s === v.status }))}
        />
        <p className="footnote">You can only use a status you qualify for: head of household needs a qualifying person and more than half the cost of keeping up your home.</p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Before you file.">
        {owes && -refund >= 1_000 && (
          <Callout tone="warn" title="Avoid an underpayment penalty">
            Owing {usd(-refund)} is over $1,000, so the IRS may charge a penalty unless your withholding covered 90% of this year&rsquo;s tax or 100% of last
            year&rsquo;s (110% if your AGI was over $150,000). Raise your W-4 withholding or make an estimated payment by January 15, 2027.
          </Callout>
        )}
        {!owes && refund > 3_000 && (
          <Callout title="A big refund is an interest-free loan">
            You are on track for a {usd(refund)} refund. Updating your W-4 would put about {usd(refund / 26)} more in each biweekly paycheck instead.
          </Callout>
        )}
        {r.deductionType === "standard" && v.itemized > 0 && (
          <Callout title="The standard deduction wins">
            Your itemized deductions of {usd(v.itemized)} are less than the {usd(std)} standard deduction, so we used the standard deduction.
          </Callout>
        )}
        {r.credits.refundable > 0 && (
          <Callout tone="good" title="Refundable child tax credit">
            {usd(r.credits.refundable)} of your child tax credit is refundable: you get it even though it is more than your income tax.
          </Callout>
        )}
        {below > 0 && (
          <Callout tone="good" title="Deductions on top of the standard deduction">
            The senior, overtime, tips and QBI deductions are taken on top of the standard or itemized deduction. Together they cut your taxable income by {usd(below)}.
          </Callout>
        )}
        {v.children > 0 && (
          <Callout title="Children">
            We gave the {usd(US_2026.childTaxCredit.perChild)} credit for {v.children} {per(v.children, "children")}. It falls by $50 for each $1,000 of income over {usd(US_2026.childTaxCredit.phaseStart[v.status])}.
          </Callout>
        )}
        <Callout title="Lower incomes">
          If your income is low, you may also qualify for the earned income tax credit, which this calculator leaves out. The IRS EITC Assistant checks it.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for tax year 2026. Not tax advice.
      </p>
    </Studio>
  );
}

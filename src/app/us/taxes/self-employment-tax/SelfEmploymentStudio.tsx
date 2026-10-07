"use client";

import { FILING_LABEL, US_2026, type FilingStatus } from "@/lib/us/tax-2026";
import { ESTIMATED_DUE_2026, estimatedPayments, returnWithQbi } from "@/lib/us/taxes-extra";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;

const SCHEMA = {
  entry: oneOf<"profit" | "revenue">("profit", ["profit", "revenue"]),
  profit: num(60_000, 0, 100_000_000),
  revenue: num(80_000, 0, 100_000_000),
  expenses: num(20_000, 0, 100_000_000),
  status: oneOf<FilingStatus>("single", STATUSES),
  wages: num(0, 0, 100_000_000),
  withheld: num(0, 0, 100_000_000),
  other: num(0, 0, 100_000_000),
  children: num(0, 0, 15),
  retirement: num(0, 0, 1_000_000),
  health: num(0, 0, 1_000_000),
  qbi: bool(true),
  knowPrior: bool(false),
  priorTax: num(0, 0, 100_000_000),
  priorAgi: num(0, 0, 100_000_000),
};
const ADVANCED = ["wages", "withheld", "other", "children", "retirement", "health", "qbi", "knowPrior", "priorTax", "priorAgi"] as const;

const C = { keep: "#2a78d6", ss: "#4a3aa7", med: "#e87ba4", income: "#eb6834", addl: "#e34948" };

export default function SelfEmploymentStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const profit = v.entry === "profit" ? v.profit : Math.max(0, v.revenue - v.expenses);
  const reductions = v.retirement + v.health;
  const r = returnWithQbi(
    {
      status: v.status,
      wages: v.wages,
      otherIncome: 0,
      nonInvestmentIncome: v.other,
      longTermGains: 0,
      selfEmployment: profit,
      preTax: 0,
      adjustments: reductions,
      itemized: 0,
      over65: 0,
      blind: 0,
      children: Math.round(v.children),
      otherDependents: 0,
      overtimePremium: 0,
      tips: 0,
      withheld: v.withheld,
    },
    v.qbi,
    reductions,
  );
  const se = r.se;
  const est = estimatedPayments(r.totalTax, v.withheld, v.status, v.knowPrior ? v.priorTax : null, v.priorAgi);
  const incomeTax = Math.max(0, r.incomeTax - r.credits.refundable);
  const keep = Math.max(0, profit - se.seTax - se.additionalMedicare - (v.wages + v.other > 0 ? 0 : incomeTax));
  const setAside = profit > 0 ? Math.min(1, Math.max(0, r.totalTax - v.withheld) / profit) : 0;
  const ssRoom = Math.max(0, US_2026.socialSecurity.wageBase - v.wages);

  return (
    <Studio
      title="Your self-employment tax"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my self-employment tax"
      onReset={st.reset}
      dock={{ label: "Self-employment tax", value: usd(se.seTax) }}
      inputs={
        <>
          <InputGroup title="Your business">
            <Segmented
              label="I know my"
              value={v.entry}
              onChange={st.bind("entry")}
              options={[
                { value: "profit", label: "Net profit" },
                { value: "revenue", label: "Income and expenses" },
              ]}
            />
            {v.entry === "profit" ? (
              <MoneyField label="Net profit for 2026" symbol="$" value={v.profit} onChange={st.bind("profit")} slider={{ min: 0, max: 300_000, step: 1_000, ends: ["$0", "$300k"] }} info="Schedule C line 31: 1099, freelance and gig income less business expenses." />
            ) : (
              <>
                <MoneyField label="Business income for 2026" symbol="$" value={v.revenue} onChange={st.bind("revenue")} info="Everything clients and platforms paid you, including 1099-NEC and 1099-K income." />
                <MoneyField label="Business expenses" symbol="$" value={v.expenses} onChange={st.bind("expenses")} info="Supplies, software, mileage, home office, phone and other ordinary and necessary costs." />
              </>
            )}
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="W-2 wages from a job" symbol="$" value={v.wages} onChange={st.bind("wages")} optional info="Wages already pay Social Security, which uses up part of the $184,500 wage base." />
            <MoneyField label="Federal tax withheld from wages" symbol="$" value={v.withheld} onChange={st.bind("withheld")} optional />
            <MoneyField label="Other income" symbol="$" value={v.other} onChange={st.bind("other")} optional info="Interest, a spouse's income on a joint return, rental profit and similar." />
            <StepperField label="Children under 17" value={v.children} onChange={(x) => st.set("children", Math.round(x))} step={1} min={0} max={15} unit="children" dp={0} optional />
            <MoneyField label="SEP IRA or solo 401(k) contributions" symbol="$" value={v.retirement} onChange={st.bind("retirement")} optional info="Lower income tax, not self-employment tax." />
            <MoneyField label="Self-employed health insurance" symbol="$" value={v.health} onChange={st.bind("health")} optional info="Premiums for you and your family when you are not eligible for an employer plan." />
            <Switch label="Claim the 20% QBI deduction" checked={v.qbi} onChange={st.bind("qbi")} optional info="Most sole proprietors qualify. We assume no employees; it phases out above $201,750 of taxable income ($403,500 joint)." />
            <Switch label="I know last year's total tax" checked={v.knowPrior} onChange={st.bind("knowPrior")} optional info="For the safe harbor: paying 100% of last year's tax (110% at higher incomes) avoids the penalty." />
            {v.knowPrior && (
              <>
                <MoneyField label="2025 total tax (Form 1040 line 24)" symbol="$" value={v.priorTax} onChange={st.bind("priorTax")} optional />
                <MoneyField label="2025 adjusted gross income" symbol="$" value={v.priorAgi} onChange={st.bind("priorAgi")} optional />
              </>
            )}
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Self-employment tax for 2026"
        value={usd(se.seTax)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          se.seTax > 0 ? (
            <>
              On <b>{usd(profit)}</b> of profit you pay <b>{usd(se.seTax)}</b> of Social Security and Medicare, plus about <b>{usd(incomeTax)}</b> of federal income tax: <b>{usd(r.totalTax)}</b> in all.
              Pay about <b>{usd(est.safeQuarter)}</b> each quarter to stay clear of penalties.
            </>
          ) : (
            <>
              Net earnings under $400 (92.35% of profit) pay no self-employment tax. Income tax may still be due on the profit.
            </>
          )
        }
        badges={[`${percent(profit > 0 ? se.seTax / profit : 0, 1)} of profit`, `Set aside ${percent(setAside)} of profit`, `${percent(r.ordinary.marginal)} income tax bracket`]}
      />

      <Facts
        items={[
          { label: "Self-employment tax", value: usd(se.seTax) },
          { label: "Half deducted from income", value: usd(se.deduction) },
          { label: "Federal income tax", value: usd(incomeTax) },
          { label: "Each quarterly payment", value: usd(est.safeQuarter) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 (Schedule SE and Form 1040-ES)" },
          { label: "Business", value: "Sole proprietor or single-member LLC, no employees" },
          { label: "Deduction", value: "Standard deduction" },
          { label: "QBI", value: v.qbi ? `20% deduction applied: ${usd(r.qbiDeduction)}` : "Not claimed" },
          { label: "Not included", value: "State income tax and any state estimated payments" },
        ]}
      />

      <ResultCard title="Where your profit goes" sub="Federal taxes on this year's profit.">
        <SplitBar
          segments={[
            { label: "Yours to keep", value: keep, display: usd(keep), color: C.keep },
            { label: "Social Security (12.4%)", value: se.socialSecurity, display: usd(se.socialSecurity), color: C.ss },
            { label: "Medicare (2.9%)", value: se.medicare, display: usd(se.medicare), color: C.med },
            ...(se.additionalMedicare > 0 ? [{ label: "Additional Medicare (0.9%)", value: se.additionalMedicare, display: usd(se.additionalMedicare), color: C.addl }] : []),
            ...(v.wages + v.other > 0 ? [] : [{ label: "Income tax", value: incomeTax, display: usd(incomeTax), color: C.income }]),
          ]}
          caption={v.wages + v.other > 0 ? "Income tax is left out here because it covers your other income too." : undefined}
        />
      </ResultCard>

      <ResultCard title="Schedule SE, step by step" sub="How the self-employment tax is worked out.">
        <Statement
          columns={["2026"]}
          rows={[
            { label: "Net profit", values: [usd(profit)] },
            { label: "× 92.35% = net earnings from self-employment", values: [usd(se.earnings)] },
            { label: `Social Security: 12.4% on up to ${usd(ssRoom)}`, values: [usd(se.socialSecurity)] },
            { label: "Medicare: 2.9% on all net earnings", values: [usd(se.medicare)] },
            { label: "Self-employment tax", values: [usd(se.seTax)], kind: "total" },
            { label: "Half deducted when working out AGI", values: [`−${usd(se.deduction)}`], kind: "deduction" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Your federal tax for 2026" sub="Self-employment tax plus income tax.">
        <Statement
          columns={["2026"]}
          rows={[
            { label: "Adjusted gross income", values: [usd(r.agi)] },
            { label: "Standard deduction", values: [`−${usd(r.deduction)}`], kind: "deduction" },
            ...(r.qbiDeduction > 0 ? [{ label: "QBI deduction", values: [`−${usd(r.qbiDeduction)}`], kind: "deduction" as const }] : []),
            { label: "Taxable income", values: [usd(r.taxable)], kind: "total" },
            { label: "Income tax after credits", values: [usd(incomeTax)] },
            { label: "Self-employment tax", values: [usd(se.seTax)] },
            ...(r.additionalMedicare > 0 ? [{ label: "Additional Medicare tax", values: [usd(r.additionalMedicare)] }] : []),
            { label: "Total federal tax", values: [usd(r.totalTax)], kind: "total" },
            ...(v.withheld > 0 ? [{ label: "Withheld from wages", values: [`−${usd(v.withheld)}`], kind: "deduction" as const }] : []),
            { label: "Still to pay", values: [usd(est.owed)], kind: "total" },
          ]}
        />
      </ResultCard>

      <ResultCard title="Quarterly estimated payments" sub="Form 1040-ES for the 2026 tax year.">
        <Statement
          columns={["To avoid penalties", "To cover it all"]}
          rows={ESTIMATED_DUE_2026.map((d) => ({ label: `${d.due} (${d.period})`, values: [usd(est.safeQuarter), usd(est.fullQuarter)] }))}
        />
        <p className="footnote">
          {est.basis === "current"
            ? "The safe-harbor column pays 90% of this year's tax."
            : `The safe-harbor column pays ${est.basis === "prior110" ? "110%" : "100%"} of last year's tax, which is less than 90% of this year's.`}{" "}
          Pay at IRS.gov/payments or with IRS Direct Pay. The rest is due by April 15, 2027.
        </p>
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Self-employment in practice.">
        {est.underThreshold ? (
          <Callout tone="good" title="No estimated payments needed">
            You owe less than $1,000 after withholding, so there is no underpayment penalty. You can pay the balance when you file.
          </Callout>
        ) : (
          <Callout tone="warn" title="Pay as you go">
            The IRS expects tax through the year. Missing the quarterly dates can bring a penalty charged like interest on each late quarter.
          </Callout>
        )}
        {v.wages > 0 && (
          <Callout title="A W-2 job helps">
            Instead of quarterly payments, you can raise the withholding on your job (Form W-4 step 4(c)). Withholding counts as paid evenly through the year.
          </Callout>
        )}
        {v.wages + se.earnings > US_2026.socialSecurity.wageBase && (
          <Callout title="Social Security is capped">
            The 12.4% Social Security part stops once wages and self-employment earnings together reach {usd(US_2026.socialSecurity.wageBase)}. Medicare has no cap.
          </Callout>
        )}
        <Callout title="Keep records">
          Every business expense lowers both income tax and self-employment tax. Keep receipts and a mileage log; the 2026 standard mileage rate is set by the IRS each year.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Estimate for tax year 2026, federal only. Not tax advice.
      </p>
    </Studio>
  );
}

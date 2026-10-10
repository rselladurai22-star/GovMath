"use client";

import { bracketTops, federalReturn, FILING_LABEL, ordinaryTax, RATES, standardDeduction, type FilingStatus } from "@/lib/us/tax-2026";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, RadioGroup, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { percent, usd } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const STATUSES = ["single", "mfj", "mfs", "hoh"] as const;
const BAND_COLORS = ["#2a78d6", "#1baf7a", "#eda100", "#eb6834", "#e34948", "#4a3aa7", "#e87ba4"];

const SCHEMA = {
  status: oneOf<FilingStatus>("single", STATUSES),
  income: num(80_000, 0, 100_000_000),
  mode: oneOf<"gross" | "taxable">("gross", ["gross", "taxable"]),
  itemized: num(0, 0, 100_000_000),
  over65: num(0, 0, 2),
  blind: num(0, 0, 2),
};
const ADVANCED = ["itemized", "over65", "blind"] as const;

/** Tax on ordinary taxable income for one status, with the deduction for gross income. */
function compute(status: FilingStatus, income: number, mode: "gross" | "taxable", itemized: number, over65: number, blind: number) {
  const people = status === "mfj" ? 2 : 1;
  if (mode === "taxable") {
    const o = ordinaryTax(income, status);
    return { taxable: Math.max(0, income), deduction: 0, deductionLabel: "", ...o };
  }
  const r = federalReturn({
    status,
    wages: income,
    otherIncome: 0,
    longTermGains: 0,
    selfEmployment: 0,
    preTax: 0,
    adjustments: 0,
    itemized,
    over65: Math.min(over65, people),
    blind: Math.min(blind, people),
    children: 0,
    otherDependents: 0,
    overtimePremium: 0,
    tips: 0,
    withheld: 0,
  });
  const deduction = r.deduction + r.seniorDeduction;
  return { taxable: r.taxable, deduction, deductionLabel: r.deductionType === "itemized" ? "Itemized deductions" : r.seniorDeduction > 0 ? "Standard and senior deductions" : "Standard deduction", ...r.ordinary };
}

export default function BracketStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const over65 = Math.round(v.over65);
  const blind = Math.round(v.blind);
  const r = compute(v.status, v.income, v.mode, v.itemized, over65, blind);
  const tops = [...bracketTops(v.status), Infinity];
  const idx = Math.max(0, RATES.indexOf(r.marginal));
  const top = tops[idx];
  const room = Number.isFinite(top) ? Math.max(0, top - r.taxable) : Infinity;
  const effective = v.income > 0 ? r.tax / v.income : 0;
  const nextThousand = ordinaryTax(r.taxable + 1_000, v.status).tax - r.tax;
  const used = r.bands.filter((b) => b.income > 0);

  const compare = STATUSES.map((s) => ({ s, x: compute(s, v.income, v.mode, v.itemized, over65, blind) }));
  const maxTax = Math.max(1, ...compare.map((c) => c.x.tax));

  const segments = [
    ...(r.deduction > 0 ? [{ label: "Deductions (0%)", value: r.deduction, display: usd(r.deduction), color: "#c3c8ce" }] : []),
    ...used.map((b) => ({ label: `${percent(b.rate)} band`, value: b.income, display: usd(b.income), color: BAND_COLORS[RATES.indexOf(b.rate)] })),
  ];
  if (segments.length === 0) segments.push({ label: "No income yet", value: 0, display: usd(0), color: "#c3c8ce" });

  const range = (from: number, to: number) => (Number.isFinite(to) ? `${usd(from)} to ${usd(to)}` : `Over ${usd(from)}`);

  return (
    <Studio
      title="Your tax bracket"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Find my tax bracket"
      onReset={st.reset}
      dock={{ label: "Your bracket", value: percent(r.marginal) }}
      inputs={
        <>
          <InputGroup title="Your income">
            <RadioGroup label="Filing status" value={v.status} onChange={st.bind("status")} options={STATUSES.map((s) => ({ value: s, label: FILING_LABEL[s] }))} />
            <Segmented
              label="The figure I'm entering is"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "gross", label: "Income before deductions", note: "Wages or AGI: we take off the standard deduction for you." },
                { value: "taxable", label: "Taxable income", note: "Line 15 of Form 1040: after all deductions." },
              ]}
            />
            <MoneyField label={v.mode === "gross" ? "Income for 2026" : "Taxable income for 2026"} symbol="$" value={v.income} onChange={st.bind("income")} slider={{ min: 0, max: 800_000, step: 1_000, ends: ["$0", "$800k"] }} />
          </InputGroup>
          {v.mode === "gross" && (
            <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
              <MoneyField label="Itemized deductions" symbol="$" value={v.itemized} onChange={st.bind("itemized")} optional info="Used only if more than your standard deduction." />
              <StepperField label="People 65 or over" value={v.over65} onChange={(x) => st.set("over65", Math.round(x))} step={1} min={0} max={2} unit="people" dp={0} optional info="Raises the standard deduction and adds the $6,000 senior deduction." />
              <StepperField label="People who are blind" value={v.blind} onChange={(x) => st.set("blind", Math.round(x))} step={1} min={0} max={2} unit="people" dp={0} optional />
            </AdvancedOptions>
          )}
        </>
      }
    >
      <Answer
        eyebrow="Your 2026 federal tax bracket"
        value={percent(r.marginal)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            With <b>{usd(r.taxable)}</b>{" "}of taxable income as {FILING_LABEL[v.status].toLowerCase()}, your top dollars are taxed at <b>{percent(r.marginal)}</b>. Your federal income tax is{" "}
            <b>{usd(r.tax)}</b>, an effective rate of <b>{percent(effective, 1)}</b>{" "}of {v.mode === "gross" ? "your income" : "taxable income"}.
          </>
        }
        badges={[`Effective ${percent(effective, 1)}`, Number.isFinite(room) ? `${usd(room)} to the next bracket` : "Top bracket", `Next $1,000 costs ${usd(nextThousand)}`]}
      />

      <Facts
        items={[
          { label: "Taxable income", value: usd(r.taxable) },
          { label: "Federal income tax", value: usd(r.tax) },
          { label: "Marginal rate", value: percent(r.marginal) },
          { label: "Effective rate", value: percent(effective, 1) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Tax year", value: "2026 brackets (returns filed in 2027)" },
          { label: "Income", value: v.mode === "gross" ? "All ordinary income such as wages, no gains or credits" : "Taxable income after every deduction" },
          { label: "Deduction", value: v.mode === "gross" ? `${r.deductionLabel}: ${usd(r.deduction)} (standard alone: ${usd(standardDeduction(v.status, Math.min(over65, v.status === "mfj" ? 2 : 1), Math.min(blind, v.status === "mfj" ? 2 : 1)))})` : "Already taken off" },
          { label: "Not included", value: "Credits, capital gains rates, Social Security and Medicare, state tax" },
        ]}
      />

      <ResultCard title="How your income is taxed" sub="Each slice is taxed at its own rate.">
        <SplitBar segments={segments} />
      </ResultCard>

      <ResultCard title="Band by band" sub={`${FILING_LABEL[v.status]}, 2026.`}>
        <Statement
          columns={["Income taxed", "Tax"]}
          rows={[
            ...(r.deduction > 0 ? [{ label: `${r.deductionLabel} (0%)`, values: [usd(r.deduction), usd(0)], swatch: "#c3c8ce" }] : []),
            ...used.map((b) => ({ label: `${percent(b.rate)} on ${range(b.from, b.to)}`, values: [usd(b.income), usd(b.tax)], swatch: BAND_COLORS[RATES.indexOf(b.rate)] })),
            { label: "Total", values: [usd(r.taxable + r.deduction), usd(r.tax)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="Same income, other filing statuses" sub="Federal income tax on the same figure.">
        <Compare
          head={["Filing status", "Tax"]}
          rows={compare.map((c) => ({
            label: `${FILING_LABEL[c.s]} (${percent(c.x.marginal)})`,
            value: usd(c.x.tax),
            bar: c.x.tax / maxTax,
            current: c.s === v.status,
          }))}
        />
      </ResultCard>

      <ResultCard title="2026 brackets" sub={FILING_LABEL[v.status]}>
        <DataTable
          summary="Show every 2026 bracket"
          columns={["Rate", "Taxable income", "Tax at the top of the band"]}
          rows={tops.map((to, i) => {
            const from = i === 0 ? 0 : tops[i - 1];
            return [percent(RATES[i]), range(from, to), Number.isFinite(to) ? usd(ordinaryTax(to, v.status).tax) : "—"];
          })}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Brackets in practice.">
        <Callout title="A raise never lowers your take-home">
          {idx > 0 ? `Only your taxable income above ${usd(tops[idx - 1])} is taxed at ${percent(r.marginal)}.` : `All your taxable income is in the ${percent(r.marginal)} band.`} Moving into a higher bracket taxes the extra income at the higher rate, never the rest.
        </Callout>
        {Number.isFinite(room) && room < 5_000 && idx < RATES.length - 1 && (
          <Callout tone="warn" title="Close to the next bracket">
            Another {usd(room)} of taxable income takes you into the {percent(RATES[idx + 1])} bracket. A traditional 401(k) or IRA contribution keeps more of your income in the {percent(r.marginal)} band.
          </Callout>
        )}
        <Callout title="Your bracket is what deductions save">
          Each $1,000 of extra deductions, such as a traditional 401(k) contribution, saves about {usd(1_000 * r.marginal)} of federal tax at your bracket.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        2026 federal brackets. Not tax advice.
      </p>
    </Studio>
  );
}

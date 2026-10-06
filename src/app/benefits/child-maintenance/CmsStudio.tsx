"use client";

import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, MoneyField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { gbp, percent } from "@/components/flagship/format";
import { bool, num, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { CMS_2026, childMaintenance, type CmsRate } from "@/lib/benefits/families";

const RATE_LABEL: Record<CmsRate, string> = {
  nil: "Nil rate",
  flat: "Flat rate",
  reduced: "Reduced rate",
  basic: "Basic rate",
  "basic-plus": "Basic plus rate",
};

const SCHEMA = {
  income: num(30_000, 0, 10_000_000),
  kids: num(1, 1, 10),
  others: num(0, 0, 10),
  nights: num(0, 0, 365),
  benefits: bool(false),
  pension: num(0, 0, 1_000_000),
  collect: bool(false),
};
const ADVANCED = ["pension", "collect"] as const;

/** The CMS turns yearly income into a weekly figure: ÷ 365 × 7. */
const weeklyOf = (yearly: number) => (Math.max(0, yearly) * 7) / 365;

export default function CmsStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const input = { grossWeekly: weeklyOf(v.income), pensionWeekly: weeklyOf(v.pension), children: v.kids, otherChildren: v.others, nights: v.nights, onBenefits: v.benefits, collect: v.collect };
  const r = childMaintenance(input);
  const monthly = (r.weekly * 52) / 12;
  const bands = [0, 52, 104, 156, 175].map((n) => ({ n, w: childMaintenance({ ...input, nights: n, collect: false }).weekly }));
  const maxB = Math.max(1, ...bands.map((b) => b.w));
  const others = Math.min(3, v.others);
  const ki = Math.min(3, v.kids) - 1;
  const otherCut = CMS_2026.otherChildren[others];

  return (
    <Studio
      title="The paying parent and the children"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate child maintenance"
      onReset={st.reset}
      dock={{ label: "A week", value: gbp(r.weekly, true) }}
      inputs={
        <>
          <InputGroup title="The paying parent">
            <MoneyField
              label="Paying parent's yearly income before tax"
              value={v.income}
              onChange={st.bind("income")}
              big
              slider={{ min: 0, max: 200_000, step: 500, ends: ["£0", "£200k"] }}
              hint="Gross pay from work, self-employment profit and pensions. The Child Maintenance Service gets it from HMRC."
            />
            <Switch label="Paying parent gets benefits" checked={v.benefits} onChange={st.bind("benefits")} hint="Such as Universal Credit with no earnings, JSA, ESA, Pension Credit or the State Pension. The flat rate of £7 a week then applies." />
          </InputGroup>
          <InputGroup title="The children">
            <StepperField label="Children this is for" value={v.kids} onChange={(n) => st.set("kids", Math.round(n))} step={1} min={1} max={10} unit="children" dp={0} />
            <StepperField label="Other children the paying parent supports" value={v.others} onChange={(n) => st.set("others", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} hint="Children living with the paying parent, including stepchildren, or children they get Child Benefit for." />
            <StepperField label="Nights a year the children stay with the paying parent" value={v.nights} onChange={(n) => st.set("nights", Math.round(n))} step={1} min={0} max={365} unit="nights" dp={0} hint="Shared care of 52 nights or more (about one night a week) reduces the amount." />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <MoneyField label="Pension contributions a year" value={v.pension} onChange={st.bind("pension")} optional hint="Contributions the paying parent makes are taken off income first." />
            <Switch label="Use Collect and Pay" checked={v.collect} onChange={st.bind("collect")} optional hint="The CMS collects and passes on the money. The paying parent pays 20% on top and the receiving parent loses 4%." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Child maintenance a week"
        value={gbp(r.weekly, true)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          r.weekly <= 0 ? (
            <>On these figures no child maintenance is due through the Child Maintenance Service.</>
          ) : (
            <>
              The paying parent would pay <b>{gbp(r.weekly, true)}</b> a week, about <b>{gbp(monthly, true)}</b> a month or <b>{gbp(r.yearly)}</b> a year, at the <b>{RATE_LABEL[r.rate].toLowerCase()}</b>.
              {v.collect && (
                <>
                  {" "}
                  With Collect and Pay they pay <b>{gbp(r.payingWeekly, true)}</b> a week and the receiving parent gets <b>{gbp(r.receivingWeekly, true)}</b>.
                </>
              )}
            </>
          )
        }
        badges={[RATE_LABEL[r.rate], `${v.kids} ${v.kids === 1 ? "child" : "children"}`, v.nights >= 52 ? `${v.nights} nights shared care` : "No shared care"]}
      />

      <Facts
        items={[
          { label: "A month", value: gbp(monthly, true) },
          { label: "A year", value: gbp(r.yearly) },
          { label: "Per child a week", value: gbp(r.perChild, true) },
          { label: "Income counted a week", value: gbp(r.income, true), note: r.income >= CMS_2026.cap ? "Capped at £3,000" : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Scheme", value: "Child Maintenance Service (2012 scheme), England, Wales and Scotland" },
          { label: "Income", value: "Yearly gross income ÷ 365 × 7, less pension contributions" },
          { label: "Shared care", value: "The same number of nights for every child" },
          { label: "Payment", value: v.collect ? "Collect and Pay, with fees" : "Direct Pay, no fees" },
        ]}
      />

      <ResultCard title="How it is worked out">
        <Statement
          columns={["A week"]}
          rows={[
            { label: "Gross income", values: [gbp(weeklyOf(v.income), true)] },
            ...(v.pension > 0 ? [{ label: "Less pension contributions", values: [`− ${gbp(weeklyOf(v.pension), true)}`], kind: "deduction" as const }] : []),
            ...((r.rate === "basic" || r.rate === "basic-plus") && otherCut > 0
              ? [{ label: `Less ${percent(otherCut)} for other children supported`, values: [`− ${gbp(r.income * otherCut, true)}`], kind: "deduction" as const }]
              : []),
            {
              label:
                r.rate === "basic"
                  ? `${RATE_LABEL[r.rate]}: ${percent(CMS_2026.basic[ki])} of income`
                  : r.rate === "basic-plus"
                    ? `Basic plus: ${percent(CMS_2026.basic[ki])} of the first £800, ${percent(CMS_2026.basicPlus[ki])} above`
                    : r.rate === "reduced"
                      ? `Reduced rate: £7 plus ${percent(CMS_2026.reduced[others][ki], 1)} of income over £100`
                      : RATE_LABEL[r.rate],
              values: [gbp(r.beforeShared, true)],
            },
            ...(r.sharedReduction > 0 ? [{ label: `Shared care (${v.nights} nights)`, values: [`− ${gbp(r.sharedReduction, true)}`], kind: "deduction" as const }] : []),
            { label: "Child maintenance", values: [gbp(r.weekly, true)], kind: "total" as const },
          ]}
        />
      </ResultCard>

      <ResultCard title="With more shared care" sub="Weekly amount by nights a year with the paying parent.">
        <Compare
          head={["Nights a year", "A week"]}
          rows={bands.map((b, i) => ({
            label: i === 0 ? "Fewer than 52" : i === 4 ? "175 or more" : `${b.n} to ${bands[i + 1].n - 1}`,
            value: gbp(b.w, true),
            bar: b.w / maxB,
            current: v.nights >= b.n && (i === 4 || v.nights < bands[i + 1].n),
          }))}
        />
      </ResultCard>

      <ResultCard title="Things to know">
        <Callout title="You can agree it yourselves">
          A family-based arrangement costs nothing and can be any amount you both agree. Many parents use the CMS figure as a starting point.
        </Callout>
        {v.collect && (
          <Callout tone="warn" title={`Collect and Pay costs ${gbp((r.payingWeekly - r.receivingWeekly) * 52)} a year in fees`}>
            Direct Pay has no fees: the CMS works out the amount and the paying parent pays it straight to the receiving parent.
          </Callout>
        )}
        {r.income >= CMS_2026.cap && (
          <Callout title="Income over £3,000 a week">
            Income above £3,000 a week (£156,429 a year) is ignored. The receiving parent can apply to court for more.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Child Maintenance Service rules for 2026/27. Northern Ireland uses the same rates. The CMS may also count other income and make variations.
      </p>
    </Studio>
  );
}

"use client";

import { addPercent, compoundChange, percentChange, percentOf, percentagePoints, reversePercent, subtractPercent, whatPercent } from "@/lib/life/everyday";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import { per } from "@/components/flagship/format";

type Mode = "of" | "what" | "change" | "add" | "subtract" | "reverse" | "points";

const SCHEMA = {
  mode: oneOf<Mode>("of", ["of", "what", "change", "add", "subtract", "reverse", "points"]),
  x: num(20, -1_000_000_000, 1_000_000_000),
  y: num(150, -1_000_000_000, 1_000_000_000),
  then: num(0, -100, 1_000),
  dp: num(2, 0, 6),
};
const ADVANCED = ["then", "dp"] as const;

const LABELS: Record<Mode, { x: string; y: string; title: string }> = {
  of: { x: "Percentage", y: "Of this number", title: "What is X% of Y?" },
  what: { x: "This number", y: "As a percentage of", title: "X is what percent of Y?" },
  change: { x: "From", y: "To", title: "Percentage change from X to Y" },
  add: { x: "Percentage to add", y: "To this number", title: "Add X% to Y" },
  subtract: { x: "Percentage to take off", y: "From this number", title: "Take X% off Y" },
  reverse: { x: "Percentage that was added", y: "Final amount", title: "Find the original before X% was added" },
  points: { x: "Old rate (%)", y: "New rate (%)", title: "Change between two rates" },
};

export default function PercentStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const n = (x: number) => x.toLocaleString("en-GB", { maximumFractionDigits: v.dp, minimumFractionDigits: 0 });
  const L = LABELS[v.mode];

  let value = 0;
  let unit = "";
  let sentence = "";
  const steps: { label: string; value: string }[] = [];
  switch (v.mode) {
    case "of":
      value = percentOf(v.x, v.y);
      sentence = `${n(v.x)}% of ${n(v.y)} is ${n(value)}.`;
      steps.push({ label: `${n(v.x)} ÷ 100`, value: n(v.x / 100) }, { label: `× ${n(v.y)}`, value: n(value) });
      break;
    case "what":
      value = whatPercent(v.x, v.y);
      unit = "%";
      sentence = `${n(v.x)} is ${n(value)}% of ${n(v.y)}.`;
      steps.push({ label: `${n(v.x)} ÷ ${n(v.y)}`, value: n(v.y === 0 ? 0 : v.x / v.y) }, { label: "× 100", value: `${n(value)}%` });
      break;
    case "change":
      value = percentChange(v.x, v.y);
      unit = "%";
      sentence = `From ${n(v.x)} to ${n(v.y)} is ${value >= 0 ? "an increase" : "a decrease"} of ${n(Math.abs(value))}%.`;
      steps.push({ label: `Difference: ${n(v.y)} − ${n(v.x)}`, value: n(v.y - v.x) }, { label: `÷ ${n(Math.abs(v.x))} × 100`, value: `${n(value)}%` });
      break;
    case "add":
      value = addPercent(v.y, v.x);
      sentence = `${n(v.y)} plus ${n(v.x)}% is ${n(value)}.`;
      steps.push({ label: `${n(v.x)}% of ${n(v.y)}`, value: n(percentOf(v.x, v.y)) }, { label: `+ ${n(v.y)}`, value: n(value) });
      break;
    case "subtract":
      value = subtractPercent(v.y, v.x);
      sentence = `${n(v.y)} less ${n(v.x)}% is ${n(value)}.`;
      steps.push({ label: `${n(v.x)}% of ${n(v.y)}`, value: n(percentOf(v.x, v.y)) }, { label: `${n(v.y)} − that`, value: n(value) });
      break;
    case "reverse":
      value = reversePercent(v.y, v.x);
      sentence = `If ${n(v.x)}% was added to give ${n(v.y)}, the original was ${n(value)}. The amount added was ${n(v.y - value)}.`;
      steps.push({ label: `1 + ${n(v.x)} ÷ 100`, value: n(1 + v.x / 100) }, { label: `${n(v.y)} ÷ that`, value: n(value) });
      break;
    case "points":
      value = percentagePoints(v.x, v.y);
      unit = " points";
      sentence = `From ${n(v.x)}% to ${n(v.y)}% is a change of ${n(value)} percentage points, which is a ${n(Math.abs(percentChange(v.x, v.y)))}% ${v.y >= v.x ? "rise" : "fall"} in the rate itself.`;
      steps.push({ label: `${n(v.y)} − ${n(v.x)}`, value: `${n(value)} ${per(n(value), "points")}` }, { label: "Relative change", value: `${n(percentChange(v.x, v.y))}%` });
      break;
  }
  const thenApplies = v.then !== 0 && (v.mode === "add" || v.mode === "subtract");
  const firstChange = v.mode === "add" ? v.x : -v.x;
  const afterThen = thenApplies ? addPercent(value, v.then) : value;
  const overall = thenApplies ? compoundChange([firstChange, v.then]) : 0;

  return (
    <Studio
      title="Your numbers"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the percentage"
      onReset={st.reset}
      dock={{ label: "Answer", value: `${n(value)}${unit}` }}
      inputs={
        <>
          <InputGroup title="What do you want to work out?">
            <SelectField
              label="Calculation"
              value={v.mode}
              onChange={st.bind("mode")}
              options={(Object.keys(LABELS) as Mode[]).map((m) => ({ value: m, label: LABELS[m].title }))}
            />
            <StepperField label={L.x} value={v.x} onChange={st.bind("x")} step={1} min={-1_000_000_000} max={1_000_000_000} unit={v.mode === "of" || v.mode === "add" || v.mode === "subtract" || v.mode === "reverse" || v.mode === "points" ? "%" : ""} dp={4} />
            <StepperField label={L.y} value={v.y} onChange={st.bind("y")} step={1} min={-1_000_000_000} max={1_000_000_000} unit={v.mode === "points" ? "%" : ""} dp={4} />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            {(v.mode === "add" || v.mode === "subtract") && (
              <StepperField label="Then change by" value={v.then} onChange={st.bind("then")} step={1} min={-100} max={1_000} unit="%" dp={2} optional hint="A second change applied to the result, such as a discount after a price rise." />
            )}
            <StepperField label="Decimal places" value={v.dp} onChange={(x) => st.set("dp", Math.round(x))} step={1} min={0} max={6} unit="dp" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={L.title.replace("X", n(v.x)).replace("Y", n(v.y))}
        value={`${n(value)}${unit === "%" ? "%" : ""}`}
        unit={unit === " points" ? "percentage points" : undefined}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {sentence}
            {thenApplies ? (
              <>
                {" "}
                Then changing by <b>{n(v.then)}%</b>{" "}gives <b>{n(afterThen)}</b>, an overall change of <b>{n(overall)}%</b>, not {n(firstChange + v.then)}%.
              </>
            ) : null}
          </>
        }
        badges={[`${n(v.x)} and ${n(v.y)}`, `${v.dp} decimal places`]}
      />

      <Facts
        items={[
          { label: `${n(v.x)}% of ${n(v.y)}`, value: n(percentOf(v.x, v.y)) },
          { label: `${n(v.x)} as % of ${n(v.y)}`, value: `${n(whatPercent(v.x, v.y))}%` },
          { label: `Change ${n(v.x)} → ${n(v.y)}`, value: `${n(percentChange(v.x, v.y))}%` },
          { label: `${n(v.y)} + ${n(v.x)}%`, value: n(addPercent(v.y, v.x)) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Rounding", value: `${v.dp} decimal places, shown only` },
          { label: "Change", value: "Measured against the starting number" },
          { label: "Negative numbers", value: "Allowed" },
          { label: "Points", value: "Difference between two rates" },
        ]}
      />

      <ResultCard title="How it is worked out" sub={L.title}>
        <Statement columns={["Result"]} rows={[...steps.map((x) => ({ label: x.label, values: [x.value] })), { label: "Answer", values: [`${n(value)}${unit}`], kind: "total" as const }]} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Common percentage traps.">
        <Callout title="Up and down are not equal">
          A 50% rise followed by a 50% fall leaves you 25% lower, because the fall is taken from a bigger number. Use &ldquo;Then change by&rdquo; under More options to see this.
        </Callout>
        <Callout title="Percent and percentage points">
          If an interest rate goes from 4% to 5%, it has risen by 1 percentage point but by 25%. Choose &ldquo;Change between two rates&rdquo; to see both.
        </Callout>
        <Callout title="Taking a tax off">
          To find a price before a 20% tax such as VAT, divide by 1.2 rather than taking 20% off. Use &ldquo;Find the original&rdquo;.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Results are rounded for display only.
      </p>
    </Studio>
  );
}

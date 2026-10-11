"use client";

import { useId } from "react";
import { describe, median, parseNumbers, weightedMean } from "@/lib/life/maths";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, Field, InputGroup, RadioGroup, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, BarChart, Callout, Facts, ResultCard, Statement } from "@/components/flagship/results";
import { num, oneOf, text, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  list: text("3, 7, 7, 2, 9, 12, 5, 7, 4, 10", 3000),
  kind: oneOf<"sample" | "population">("sample", ["sample", "population"]),
  weights: text("", 3000),
  dp: num(2, 0, 8),
};
const ADVANCED = ["weights", "dp"] as const;

function ListBox({ label, value, onChange, placeholder, info, optional }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; info: string; optional?: boolean }) {
  const id = useId();
  return (
    <Field label={label} htmlFor={id} info={info} optional={optional}>
      <textarea
        id={id}
        className="gm-input"
        rows={4}
        spellCheck={false}
        autoComplete="off"
        maxLength={3000}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ gridColumn: "1 / -1", resize: "vertical", fontWeight: 600, lineHeight: 1.5, marginTop: 8 }}
      />
    </Field>
  );
}

export default function AverageStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const n = (x: number | null) => (x === null || !Number.isFinite(x) ? "—" : Number(x.toFixed(v.dp)).toLocaleString("en-GB", { maximumFractionDigits: v.dp }));
  const raw = (x: number) => x.toLocaleString("en-GB", { maximumFractionDigits: 10 });

  const parsed = parseNumbers(v.list);
  const s = describe(parsed.values);
  const w = parseNumbers(v.weights);
  const wm = w.values.length ? weightedMean(parsed.values, w.values) : null;
  const sd = v.kind === "sample" ? s.sampleSd : s.populationSd;
  const variance = v.kind === "sample" ? s.sampleVariance : s.populationVariance;
  const empty = s.count === 0;

  const counts = new Map<number, number>();
  for (const x of s.sorted) counts.set(x, (counts.get(x) ?? 0) + 1);
  const freq = [...counts].slice(0, 30);
  const mid = s.count % 2 ? [(s.count + 1) / 2] : [s.count / 2, s.count / 2 + 1];
  const skew = s.count > 2 && sd && sd > 0 ? Math.abs(s.mean - s.median) / sd : 0;
  const shownSorted = s.sorted.slice(0, 200).map(raw).join(", ") + (s.count > 200 ? ", …" : "");

  return (
    <Studio
      title="Your numbers"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the averages"
      onReset={st.reset}
      dock={{ label: "Mean", value: empty ? "—" : n(s.mean) }}
      inputs={
        <>
          <InputGroup title="Your numbers">
            <ListBox
              label="Numbers"
              value={v.list}
              onChange={st.bind("list")}
              placeholder="e.g. 3, 7, 7, 2, 9"
              info="Separate numbers with commas, spaces or new lines, or paste a column from a spreadsheet. Blanks are skipped. Do not use commas inside numbers: type 1200, not 1,200."
            />
            <RadioGroup
              label="Your numbers are"
              value={v.kind}
              onChange={st.bind("kind")}
              options={[
                { value: "sample", label: "A sample" },
                { value: "population", label: "The whole population" },
              ]}
              info="Choose a sample if your numbers are some of a larger group (most surveys and experiments). The standard deviation then divides by n − 1."
            />
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <ListBox
              label="Weights (for a weighted mean)"
              value={v.weights}
              onChange={st.bind("weights")}
              placeholder="e.g. 30, 50, 20"
              optional
              info="One weight per number, in the same order, such as credits or the share each exam counts for. Leave blank for an ordinary mean."
            />
            <StepperField label="Decimal places" value={v.dp} onChange={(x) => st.set("dp", Math.round(x))} step={1} min={0} max={8} unit="dp" dp={0} optional />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={empty ? "No numbers yet" : `Mean of ${s.count} ${s.count === 1 ? "number" : "numbers"}`}
        value={empty ? "—" : n(s.mean)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          empty ? (
            <>Type or paste some numbers, separated by commas, spaces or new lines.</>
          ) : (
            <>
              The mean is <b>{n(s.mean)}</b>, the median <b>{n(s.median)}</b>{" "}and the mode{" "}
              <b>{s.modes.length ? s.modes.map(raw).join(", ") : "none (no number repeats)"}</b>. The numbers range from {raw(s.min)} to {raw(s.max)}, a range of{" "}
              <b>{n(s.range)}</b>.
              {wm && wm.mean !== null ? (
                <>
                  {" "}
                  The weighted mean is <b>{n(wm.mean)}</b>.
                </>
              ) : null}
            </>
          )
        }
        badges={empty ? undefined : [`${s.count} ${s.count === 1 ? "number" : "numbers"}`, v.kind === "sample" ? "Sample" : "Population", `${v.dp} decimal places`]}
      />

      {parsed.rejected.length > 0 && (
        <Callout tone="warn" title={`${parsed.rejected.length} ${parsed.rejected.length === 1 ? "entry was" : "entries were"} skipped`}>
          We could not read {parsed.rejected.slice(0, 8).map((r) => `"${r}"`).join(", ")}
          {parsed.rejected.length > 8 ? " and others" : ""} as numbers, so {parsed.rejected.length === 1 ? "it was" : "they were"} left out.
        </Callout>
      )}

      {!empty && (
        <>
          <Facts
            items={[
              { label: "Median", value: n(s.median) },
              { label: "Mode", value: s.modes.length ? s.modes.slice(0, 3).map(raw).join(", ") + (s.modes.length > 3 ? "…" : "") : "None" },
              { label: "Range", value: n(s.range) },
              { label: `Standard deviation (${v.kind})`, value: n(sd) },
            ]}
          />

          <ResultCard title="All the averages" sub="Different ways to describe the middle of your numbers.">
            <Statement
              columns={["Value"]}
              rows={[
                { label: "Mean (add up, divide by how many)", values: [n(s.mean)] },
                { label: "Median (middle value)", values: [n(s.median)] },
                { label: `Mode (most common${s.modeCount ? `, appears ${s.modeCount} times` : ""})`, values: [s.modes.length ? s.modes.map(raw).join(", ") : "None"] },
                { label: "Weighted mean", values: [wm ? (wm.mean === null ? "Weights add to 0" : n(wm.mean)) : "Add weights under More options"] },
                { label: "Geometric mean", values: [s.geometricMean === null ? "Needs all numbers above 0" : n(s.geometricMean)] },
                { label: "Harmonic mean", values: [s.harmonicMean === null ? "Needs all numbers above 0" : n(s.harmonicMean)] },
                { label: "Midrange (halfway between lowest and highest)", values: [n((s.min + s.max) / 2)] },
              ]}
            />
          </ResultCard>

          <ResultCard title="How spread out they are" sub={v.kind === "sample" ? "Sample: the sum of squares is divided by n − 1." : "Population: the sum of squares is divided by n."}>
            <Statement
              columns={["Value"]}
              rows={[
                { label: "Count (n)", values: [String(s.count)] },
                { label: "Sum", values: [n(s.sum)] },
                { label: "Lowest", values: [raw(s.min)] },
                { label: "Highest", values: [raw(s.max)] },
                { label: "Range", values: [n(s.range)] },
                { label: `Variance (${v.kind})`, values: [variance === null ? "Needs 2 or more numbers" : n(variance)] },
                { label: `Standard deviation (${v.kind})`, values: [sd === null ? "Needs 2 or more numbers" : n(sd)], kind: "total" as const },
                { label: v.kind === "sample" ? "Population standard deviation" : "Sample standard deviation", values: [n(v.kind === "sample" ? s.populationSd : s.sampleSd)] },
              ]}
            />
          </ResultCard>

          <ResultCard title="The working" sub="How the mean and median were found.">
            <ol style={{ margin: 0, paddingLeft: "1.4em", lineHeight: 1.6 }}>
              <li>
                Sorted: {shownSorted}
              </li>
              <li>
                Mean: add them up to get {n(s.sum)}, then divide by {s.count}: {n(s.sum)} ÷ {s.count} = <b>{n(s.mean)}</b>.
              </li>
              <li>
                Median: with {s.count} {s.count === 1 ? "number" : "numbers"}, the middle {mid.length === 1 ? `is number ${mid[0]}` : `two are numbers ${mid[0]} and ${mid[1]}`} in the sorted
                list{mid.length === 2 ? `, so take halfway between ${raw(s.sorted[mid[0] - 1])} and ${raw(s.sorted[mid[1] - 1])}` : ""}: <b>{n(median(s.sorted))}</b>.
              </li>
              <li>
                Range: {raw(s.max)} − {raw(s.min)} = <b>{n(s.range)}</b>.
              </li>
              {sd !== null && (
                <li>
                  Standard deviation: square each number&rsquo;s distance from the mean, add them up, divide by {v.kind === "sample" ? `n − 1 = ${s.count - 1}` : `n = ${s.count}`}{" "}
                  to get the variance ({n(variance)}), then take the square root: <b>{n(sd)}</b>.
                </li>
              )}
            </ol>
          </ResultCard>

          {freq.length > 1 && (
            <ResultCard title="How often each number appears" sub={counts.size > 30 ? "The 30 lowest distinct values." : "Each distinct value in your list."}>
              <BarChart rows={freq.map(([x, c]) => ({ label: raw(x), value: c, display: `${c}×`, current: s.modes.includes(x) }))} />
            </ResultCard>
          )}

          {skew > 0.5 && (
            <Callout title="The mean and median are far apart">
              A few very high or very low numbers are pulling the mean away from the middle. The median ({n(s.median)}) may describe a typical value better
              than the mean ({n(s.mean)}).
            </Callout>
          )}
          {wm && wm.pairs < Math.max(s.count, w.values.length) && (
            <Callout tone="warn" title="Numbers and weights do not match">
              You entered {s.count} {s.count === 1 ? "number" : "numbers"} and {w.values.length} {w.values.length === 1 ? "weight" : "weights"}. The weighted mean uses the first {wm.pairs} of each.
            </Callout>
          )}
        </>
      )}

      <Assumptions
        items={[
          { label: "Separators", value: "Commas, spaces, semicolons, tabs or new lines" },
          { label: "Standard deviation", value: v.kind === "sample" ? "Sample (divides by n − 1)" : "Population (divides by n)" },
          { label: "Mode", value: "Every value that appears most, if more than once" },
          { label: "Rounding", value: `${v.dp} decimal places, for display` },
        ]}
      />
    </Studio>
  );
}

"use client";

import { kgFromLb, kgFromStLb, lbFromKg, lbOzText, stFromKg, stLbText, weightTable } from "@/lib/life/body";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type From = "stlb" | "kg" | "lb";
type Dp = "0" | "1" | "2";

const SCHEMA = {
  from: oneOf<From>("stlb", ["stlb", "kg", "lb"]),
  st: num(11, 0, 100),
  lb: num(4, 0, 13.99),
  kg: num(70, 0, 1000),
  lbs: num(150, 0, 2000),
  dp: oneOf<Dp>("1", ["0", "1", "2"]),
  stone: oneOf<"stlb" | "decimal">("stlb", ["stlb", "decimal"]),
};
const ADVANCED = ["dp", "stone"] as const;

export default function WeightStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const dp = Number(v.dp);
  const kg = v.from === "stlb" ? kgFromStLb(v.st, v.lb) : v.from === "lb" ? kgFromLb(v.lbs) : Math.max(0, v.kg);
  const lb = lbFromKg(kg);
  const stoneText = v.stone === "decimal" ? `${stFromKg(kg).toFixed(Math.max(dp, 1))} st` : stLbText(kg, dp);
  const kgText = `${kg.toFixed(Math.max(dp, 1))} kg`;
  const lbText = `${lb.toFixed(dp)} lb`;
  const main = v.from === "kg" ? stoneText : kgText;
  const input = v.from === "stlb" ? `${v.st} st ${Number(v.lb.toFixed(2))} lb` : v.from === "lb" ? `${Number(v.lbs.toFixed(2))} lb` : `${Number(v.kg.toFixed(2))} kg`;
  const rows = weightTable(7, 25, 0.5);
  const nearest = rows.reduce((a, r) => (Math.abs(r.kg - kg) < Math.abs(a.kg - kg) ? r : a), rows[0]);
  const near = rows.filter((r) => Math.abs(r.st - nearest.st) <= 1.01);

  return (
    <Studio
      title="Weight to convert"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Convert my weight"
      onReset={st.reset}
      dock={{ label: v.from === "kg" ? "In stones" : "In kilograms", value: main }}
      inputs={
        <>
          <InputGroup title="Weight to convert">
            <Segmented
              label="Convert from"
              value={v.from}
              onChange={st.bind("from")}
              options={[
                { value: "stlb", label: "Stones and pounds" },
                { value: "kg", label: "Kilograms" },
                { value: "lb", label: "Pounds" },
              ]}
            />
            {v.from === "stlb" ? (
              <>
                <StepperField label="Stone" value={v.st} onChange={st.bind("st")} step={1} min={0} max={100} unit="st" dp={0} />
                <StepperField label="Pounds" value={v.lb} onChange={st.bind("lb")} step={1} min={0} max={13.99} unit="lb" dp={2} info="0 to 13.99: 14 pounds make a stone." />
              </>
            ) : v.from === "kg" ? (
              <StepperField label="Kilograms" value={v.kg} onChange={st.bind("kg")} step={0.5} min={0} max={1000} unit="kg" dp={2} />
            ) : (
              <StepperField label="Pounds" value={v.lbs} onChange={st.bind("lbs")} step={1} min={0} max={2000} unit="lb" dp={2} />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Segmented
              label="Decimal places"
              value={v.dp}
              onChange={st.bind("dp")}
              optional
              options={[
                { value: "0", label: "0" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
              ]}
            />
            <Segmented
              label="Show stones as"
              value={v.stone}
              onChange={st.bind("stone")}
              optional
              options={[
                { value: "stlb", label: "Stones and pounds" },
                { value: "decimal", label: "Decimal stones" },
              ]}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.from === "kg" ? "In stones and pounds" : "In kilograms"}
        value={main}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            <b>{input}</b>{" "}is <b>{kgText}</b>, <b>{stoneText}</b>{" "}or <b>{lbText}</b>.
          </>
        }
        badges={["1 lb = 0.45359237 kg", "1 st = 14 lb", `${dp} decimal ${dp === 1 ? "place" : "places"}`]}
      />

      <Facts
        items={[
          { label: "Kilograms", value: kgText },
          { label: "Stones and pounds", value: stLbText(kg, dp) },
          { label: "Pounds", value: lbText },
          { label: "Pounds and ounces", value: lbOzText(kg, 0) },
        ]}
      />

      <Assumptions
        items={[
          { label: "1 pound", value: "0.45359237 kg exactly" },
          { label: "1 stone", value: "14 lb (6.35029318 kg)" },
          { label: "1 pound", value: "16 ounces" },
          { label: "Decimal stones", value: `${stFromKg(kg).toFixed(3)} st` },
        ]}
      />

      <ResultCard title="Nearby weights" sub="Half-stone steps around yours.">
        <Compare
          head={["Stones", "Kilograms"]}
          rows={near.map((r) => ({ label: r.label, value: `${r.kg.toFixed(1)} kg (${r.lb.toFixed(0)} lb)`, bar: Math.min(1, r.kg / 170), current: r === nearest }))}
        />
      </ResultCard>

      <ResultCard title="Stone to kg table" sub="7 st to 25 st in half stones.">
        <DataTable summary="Show the full table" columns={["Stones", "Kilograms", "Pounds"]} rows={rows.map((r) => [r.label, r.kg.toFixed(1), r.lb.toFixed(0)])} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="Quick checks.">
        <Callout title="A quick mental check">
          A kilogram is about 2.2 pounds, and a stone is about 6.35 kg. So 10 stone is a little over 63 kg, and 100 kg is just under 16 stone.
        </Callout>
        {kg > 0 && kg < 10 && (
          <Callout tone="info" title="Baby weights">
            Babies are often weighed in pounds and ounces in the UK and US: {kgText} is {lbOzText(kg, 0)}.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Exact conversion: 1 lb = 0.45359237 kg, 1 st = 14 lb, 1 lb = 16 oz.
      </p>
    </Studio>
  );
}

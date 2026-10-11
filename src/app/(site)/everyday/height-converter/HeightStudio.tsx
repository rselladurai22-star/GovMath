"use client";

import { cmFromFtIn, cmFromIn, ftInFromCm, ftInText, heightTable, inFromCm } from "@/lib/life/body";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type From = "ftin" | "cm" | "in";
type Dp = "0" | "1" | "2";

const SCHEMA = {
  from: oneOf<From>("ftin", ["ftin", "cm", "in"]),
  ft: num(5, 0, 9),
  inch: num(7, 0, 11.99),
  cm: num(170, 0, 300),
  inches: num(67, 0, 120),
  dp: oneOf<Dp>("1", ["0", "1", "2"]),
};
const ADVANCED = ["dp"] as const;

export default function HeightStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const dp = Number(v.dp);
  const cm = v.from === "ftin" ? cmFromFtIn(v.ft, v.inch) : v.from === "in" ? cmFromIn(v.inches) : Math.max(0, v.cm);
  const totalIn = inFromCm(cm);
  const fi = ftInFromCm(cm, dp);
  const cmText = `${cm.toFixed(dp)} cm`;
  const mText = `${(cm / 100).toFixed(dp + 2)} m`;
  const ftText = ftInText(cm, dp);
  const inText = `${totalIn.toFixed(dp)} in`;
  const main = v.from === "cm" ? ftText : cmText;
  const input = v.from === "ftin" ? `${v.ft} ft ${Number(v.inch.toFixed(2))} in` : v.from === "in" ? `${Number(v.inches.toFixed(2))} in` : `${Number(v.cm.toFixed(2))} cm`;
  const rows = heightTable(58, 80);
  const nearest = rows.reduce((a, r) => (Math.abs(r.cm - cm) < Math.abs(a.cm - cm) ? r : a), rows[0]);
  const near = rows.filter((r) => Math.abs(r.inches - nearest.inches) <= 2);

  return (
    <Studio
      title="Height to convert"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Convert my height"
      onReset={st.reset}
      dock={{ label: v.from === "cm" ? "In feet and inches" : "In centimetres", value: main }}
      inputs={
        <>
          <InputGroup title="Height to convert">
            <Segmented
              label="Convert from"
              value={v.from}
              onChange={st.bind("from")}
              options={[
                { value: "ftin", label: "Feet and inches" },
                { value: "cm", label: "Centimetres" },
                { value: "in", label: "Inches only" },
              ]}
            />
            {v.from === "ftin" ? (
              <>
                <StepperField label="Feet" value={v.ft} onChange={st.bind("ft")} step={1} min={0} max={9} unit="ft" dp={0} />
                <StepperField label="Inches" value={v.inch} onChange={st.bind("inch")} step={1} min={0} max={11.99} unit="in" dp={2} info="0 to 11.99: 12 inches make a foot." />
              </>
            ) : v.from === "cm" ? (
              <StepperField label="Centimetres" value={v.cm} onChange={st.bind("cm")} step={1} min={0} max={300} unit="cm" dp={2} />
            ) : (
              <StepperField label="Inches" value={v.inches} onChange={st.bind("inches")} step={1} min={0} max={120} unit="in" dp={2} />
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
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={v.from === "cm" ? "In feet and inches" : "In centimetres"}
        value={main}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            <b>{input}</b>{" "}is <b>{cmText}</b>{" "}({mText}), <b>{ftText}</b>{" "}or <b>{inText}</b>{" "}in total.
          </>
        }
        badges={["1 in = 2.54 cm", "1 ft = 12 in", `Written ${fi.ft}′${fi.inches}″`]}
      />

      <Facts
        items={[
          { label: "Centimetres", value: cmText },
          { label: "Metres", value: mText },
          { label: "Feet and inches", value: ftText },
          { label: "Inches only", value: inText },
        ]}
      />

      <Assumptions
        items={[
          { label: "1 inch", value: "2.54 cm exactly" },
          { label: "1 foot", value: "12 in (30.48 cm)" },
          { label: "Decimal feet", value: `${(totalIn / 12).toFixed(3)} ft` },
          { label: "Rounding", value: `${dp} decimal ${dp === 1 ? "place" : "places"}` },
        ]}
      />

      <ResultCard title="Nearby heights" sub="Inch steps around yours.">
        <Compare
          head={["Feet and inches", "Centimetres"]}
          rows={near.map((r) => ({ label: r.label, value: `${r.cm.toFixed(1)} cm (${r.inches} in)`, bar: Math.min(1, r.cm / 210), current: r === nearest && cm >= 140 && cm <= 210 }))}
        />
      </ResultCard>

      <ResultCard title="Feet and inches to cm table" sub="4′10″ to 6′8″.">
        <DataTable summary="Show the full table" columns={["Feet and inches", "Inches", "Centimetres", "Metres"]} rows={rows.map((r) => [r.label, r.inches, r.cm.toFixed(1), r.m.toFixed(2)])} />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="A quick check.">
        <Callout title="A quick mental check">
          30 cm is about a foot, and 2.5 cm is about an inch. So 5 ft is a little over 150 cm, and 180 cm is just under 5 ft 11 in.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Exact conversion: 1 in = 2.54 cm, 1 ft = 12 in.
      </p>
    </Studio>
  );
}

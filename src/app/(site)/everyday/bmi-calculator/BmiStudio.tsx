"use client";

import { bmiAdult, bmiWeightRange, cmFromFtIn, KG_PER_LB, kgFromStLb, stLbFromKg, waistToHeight, type BmiCategory } from "@/lib/life/health";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

const SCHEMA = {
  units: oneOf<"metric" | "us" | "imperial">("metric", ["metric", "us", "imperial"]),
  cm: num(170, 50, 250),
  kg: num(72, 10, 400),
  ft: num(5, 1, 8),
  inch: num(7, 0, 11.9),
  st: num(11, 1, 60),
  lb: num(5, 0, 13.9),
  /** Weight in pounds only (US units). */
  lbs: num(160, 20, 900),
  lower: bool(false),
  waist: num(0, 0, 250),
  age: num(30, 2, 120),
};
const ADVANCED = ["lower", "waist", "age"] as const;

type Units = "metric" | "us" | "imperial";

/**
 * A weight in the visitor's units: kg, pounds (US) or stones and pounds (UK). The healthy limits and the change
 * needed come from the engine already in whole steps of 0.1 kg or a pound, so this only formats them.
 */
const kgText = (kg: number, units: Units) => {
  if (units === "metric") return `${kg.toFixed(1)} kg`;
  if (units === "us") return `${Math.round(kg / KG_PER_LB)} lb`;
  const { st, lb } = stLbFromKg(kg);
  return st > 0 ? `${st} st ${lb} lb` : `${lb} lb`;
};

/** BMI range as the guide writes it: "under 18.5", "18.5 to 24.9", "40 or more". */
const rangeText = (from: number, to: number) => (from === 0 ? `under ${to}` : Number.isFinite(to) ? `${from} to ${(to - 0.1).toFixed(1)}` : `${from} or more`);

export default function BmiStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const units = v.units;
  const feet = units !== "metric";
  const heightCm = feet ? cmFromFtIn(v.ft, v.inch) : v.cm;
  const weightKg = units === "imperial" ? kgFromStLb(v.st, v.lb) : units === "us" ? v.lbs * KG_PER_LB : v.kg;
  // Healthy weights are shown to 0.1 kg, or to the pound in US and UK imperial units.
  const stepKg = units === "metric" ? 0.1 : KG_PER_LB;
  const r = bmiAdult(heightCm, weightKg, v.lower, stepKg);
  const bmiText = r.bmiShown.toFixed(1);
  const w = v.waist > 0 ? waistToHeight(v.waist, heightCm) : null;
  const child = v.age < 18;
  const t = r.thresholds;
  const bands: { label: string; from: number; to: number; categories: BmiCategory[] }[] = [
    { label: "Underweight", from: 0, to: t.under, categories: ["underweight"] },
    { label: "Healthy weight", from: t.under, to: t.over, categories: ["healthy"] },
    { label: "Overweight", from: t.over, to: t.obese, categories: ["overweight"] },
    { label: "Obesity", from: t.obese, to: t.obese3, categories: ["obese1", "obese2"] },
    { label: "Severe obesity", from: t.obese3, to: Infinity, categories: ["obese3"] },
  ];
  const tone = r.category === "healthy" ? "good" : "warn";

  return (
    <Studio
      title="Your height and weight"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my BMI"
      onReset={st.reset}
      dock={{ label: "Your BMI", value: bmiText }}
      inputs={
        <>
          <InputGroup title="Measurements">
            <Segmented
              label="Units"
              value={v.units}
              onChange={st.bind("units")}
              options={[
                { value: "metric", label: "cm and kg" },
                { value: "us", label: "ft and lb", note: "US units: height in feet and inches, weight in pounds." },
                { value: "imperial", label: "ft and st", note: "UK imperial: height in feet and inches, weight in stones and pounds." },
              ]}
            />
            {feet ? (
              <>
                <StepperField label="Height: feet" value={v.ft} onChange={st.bind("ft")} step={1} min={1} max={8} unit="ft" dp={0} />
                <StepperField label="Height: inches" value={v.inch} onChange={st.bind("inch")} step={1} min={0} max={11.9} unit="in" dp={1} />
                {units === "us" ? (
                  <StepperField label="Weight" value={v.lbs} onChange={st.bind("lbs")} step={1} min={20} max={900} unit="lb" dp={1} />
                ) : (
                  <>
                    <StepperField label="Weight: stone" value={v.st} onChange={st.bind("st")} step={1} min={1} max={60} unit="st" dp={0} />
                    <StepperField label="Weight: pounds" value={v.lb} onChange={st.bind("lb")} step={1} min={0} max={13.9} unit="lb" dp={1} />
                  </>
                )}
              </>
            ) : (
              <>
                <StepperField label="Height" value={v.cm} onChange={st.bind("cm")} step={1} min={50} max={250} unit="cm" dp={1} />
                <StepperField label="Weight" value={v.kg} onChange={st.bind("kg")} step={0.5} min={10} max={400} unit="kg" dp={1} />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <Switch
              label="South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean family background"
              checked={v.lower}
              onChange={st.bind("lower")}
              optional
              hint="Health risks start at a lower BMI for these groups, so the UK's NICE guidance (and the WHO for Asian populations) uses lower thresholds."
            />
            <StepperField label="Waist" value={v.waist} onChange={st.bind("waist")} step={1} min={0} max={250} unit="cm" dp={1} optional hint="Measure halfway between your lowest rib and the top of your hips." />
            <StepperField label="Age" value={v.age} onChange={st.bind("age")} step={1} min={2} max={120} unit="years" dp={0} optional hint="Adult BMI applies from 18." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your BMI"
        value={bmiText}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          child ? (
            <>
              For children and teens under 18, BMI is compared with others of the same age and sex using growth charts, so this adult result does not apply. Use
              the NHS healthy weight calculator for children (UK) or the CDC&rsquo;s child and teen BMI calculator (US).
            </>
          ) : (
            <>
              A BMI of <b>{bmiText}</b>{" "}is in the <b>{r.label.toLowerCase()}</b>{" "}range. A healthy weight for your height is <b>{kgText(r.healthyMinKg, units)}</b>{" "}to{" "}
              <b>{kgText(r.healthyMaxKg, units)}</b>.
              {r.category === "underweight" ? (
                <> That is <b>{kgText(r.toHealthyKg, units)}</b>{" "}more than now.</>
              ) : r.category !== "healthy" ? (
                <> That is <b>{kgText(-r.toHealthyKg, units)}</b>{" "}less than now.</>
              ) : null}
            </>
          )
        }
        badges={[r.label, v.lower ? "Lower thresholds" : "Standard thresholds", w ? `Waist ratio ${w.ratio.toFixed(2)}` : "Add waist for more"]}
      />

      <Facts
        items={[
          { label: "BMI", value: bmiText, tone },
          { label: "Healthy from", value: kgText(r.healthyMinKg, units) },
          { label: "Healthy to", value: kgText(r.healthyMaxKg, units) },
          { label: "Waist to height", value: w ? w.ratio.toFixed(2) : "Not entered", tone: w ? (w.band === "healthy" ? "good" : w.band === "low" ? undefined : "warn") : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Height", value: `${heightCm.toFixed(1)} cm` },
          { label: "Weight", value: `${weightKg.toFixed(1)} kg` },
          { label: "Thresholds", value: `Overweight from ${t.over}, obesity from ${t.obese}` },
          { label: "Healthy weights", value: units === "metric" ? "Rounded inwards to 0.1 kg" : "Rounded inwards to the pound" },
          { label: "For", value: "Adults 18 and over" },
        ]}
      />

      <ResultCard title="BMI ranges for your height" sub="The weights in each range, rounded inwards.">
        <Compare
          head={["Range", "Weight"]}
          rows={bands.map((b) => {
            const { minKg, maxKg } = bmiWeightRange(heightCm, b.from, b.to, stepKg);
            return {
              label: `${b.label} (${rangeText(b.from, b.to)})`,
              value: b.from === 0 ? `up to ${kgText(maxKg, units)}` : Number.isFinite(b.to) ? `${kgText(minKg, units)} to ${kgText(maxKg, units)}` : `${kgText(minKg, units)} or more`,
              bar: Math.min(1, (b.from + Math.min(b.to, 60)) / 2 / 45),
              current: b.categories.includes(r.category),
            };
          })}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="BMI is a starting point.">
        {w && (
          <Callout tone={w.band === "healthy" ? "good" : w.band === "low" ? "info" : "warn"} title={`Waist-to-height ratio ${w.ratio.toFixed(2)}`}>
            {w.band === "healthy"
              ? "Your waist is less than half your height, which the UK's NICE guidance recommends for everyone."
              : w.band === "low"
                ? "A ratio under 0.4 can be a sign of being underweight. Talk to your doctor if you are concerned."
                : w.band === "increased"
                  ? "A ratio of 0.5 or more suggests increased health risks from fat around the middle, even with a healthy BMI."
                  : "A ratio of 0.6 or more suggests high health risks. Talk to your doctor or pharmacist."}
          </Callout>
        )}
        <Callout title="BMI does not measure body fat directly">
          Muscular people can have a high BMI without excess fat, and older adults can have a healthy BMI with little muscle. Waist size adds useful information.
        </Callout>
        {(r.category === "obese1" || r.category === "obese2" || r.category === "obese3") && (
          <Callout title="Support is available">
            In the UK, your GP can refer you to a free NHS weight management service. In the US, ask your doctor about programs your health insurance
            covers; Medicare and most plans cover obesity screening and counseling.
          </Callout>
        )}
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        WHO adult ranges, as used by the NHS and the CDC, with NICE&rsquo;s lower thresholds as an option. Not medical advice.
      </p>
    </Studio>
  );
}

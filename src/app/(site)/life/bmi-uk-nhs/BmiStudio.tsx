"use client";

import { bmiAdult, cmFromFtIn, kgFromStLb, stLbFromKg, waistToHeight } from "@/lib/life/health";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard } from "@/components/flagship/results";
import { bool, num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";
import s from "@/components/flagship/Flagship.module.css";

const SCHEMA = {
  units: oneOf<"metric" | "imperial">("metric", ["metric", "imperial"]),
  cm: num(170, 50, 250),
  kg: num(72, 10, 400),
  ft: num(5, 1, 8),
  inch: num(7, 0, 11.9),
  st: num(11, 1, 60),
  lb: num(5, 0, 13.9),
  lower: bool(false),
  waist: num(0, 0, 250),
  age: num(30, 2, 120),
};
const ADVANCED = ["lower", "waist", "age"] as const;

const kgText = (kg: number, imperial: boolean) => {
  if (!imperial) return `${kg.toFixed(1)} kg`;
  const { st, lb } = stLbFromKg(kg);
  return `${st} st ${lb} lb`;
};

export default function BmiStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const imperial = v.units === "imperial";
  const heightCm = imperial ? cmFromFtIn(v.ft, v.inch) : v.cm;
  const weightKg = imperial ? kgFromStLb(v.st, v.lb) : v.kg;
  const r = bmiAdult(heightCm, weightKg, v.lower);
  const w = v.waist > 0 ? waistToHeight(v.waist, heightCm) : null;
  const child = v.age < 18;
  const t = r.thresholds;
  const bands = [
    { label: "Underweight", from: 0, to: t.under },
    { label: "Healthy weight", from: t.under, to: t.over },
    { label: "Overweight", from: t.over, to: t.obese },
    { label: "Obesity", from: t.obese, to: t.obese3 },
    { label: "Severe obesity", from: t.obese3, to: 60 },
  ];
  const m2 = (heightCm / 100) ** 2;
  const tone = r.category === "healthy" ? "good" : "warn";

  return (
    <Studio
      title="Your height and weight"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my BMI"
      onReset={st.reset}
      dock={{ label: "Your BMI", value: r.bmi.toFixed(1) }}
      inputs={
        <>
          <InputGroup title="Measurements">
            <Segmented
              label="Units"
              value={v.units}
              onChange={st.bind("units")}
              options={[
                { value: "metric", label: "cm and kg" },
                { value: "imperial", label: "ft and st" },
              ]}
            />
            {imperial ? (
              <>
                <StepperField label="Height: feet" value={v.ft} onChange={st.bind("ft")} step={1} min={1} max={8} unit="ft" dp={0} />
                <StepperField label="Height: inches" value={v.inch} onChange={st.bind("inch")} step={1} min={0} max={11.9} unit="in" dp={1} />
                <StepperField label="Weight: stone" value={v.st} onChange={st.bind("st")} step={1} min={1} max={60} unit="st" dp={0} />
                <StepperField label="Weight: pounds" value={v.lb} onChange={st.bind("lb")} step={1} min={0} max={13.9} unit="lb" dp={1} />
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
              hint="The NHS uses lower thresholds because health risks start at a lower BMI."
            />
            <StepperField label="Waist" value={v.waist} onChange={st.bind("waist")} step={1} min={0} max={250} unit="cm" dp={1} optional hint="Measure halfway between your lowest rib and the top of your hips." />
            <StepperField label="Age" value={v.age} onChange={st.bind("age")} step={1} min={2} max={120} unit="years" dp={0} optional hint="Adult BMI applies from 18." />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow="Your BMI"
        value={r.bmi.toFixed(1)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          child ? (
            <>
              For children and young people under 18, BMI is compared with others of the same age and sex using centile charts, so this adult result does not apply. Use the NHS healthy weight calculator for
              children.
            </>
          ) : (
            <>
              A BMI of <b>{r.bmi.toFixed(1)}</b> is in the <b>{r.label.toLowerCase()}</b> range. A healthy weight for your height is <b>{kgText(r.healthyMinKg, imperial)}</b> to{" "}
              <b>{kgText(r.healthyMaxKg, imperial)}</b>.
              {r.toHealthyKg < 0 ? <> That is <b>{kgText(-r.toHealthyKg, imperial)}</b> less than now.</> : r.toHealthyKg > 0 ? <> That is <b>{kgText(r.toHealthyKg, imperial)}</b> more than now.</> : null}
            </>
          )
        }
        badges={[r.label, v.lower ? "Lower thresholds" : "Standard thresholds", w ? `Waist ratio ${w.ratio.toFixed(2)}` : "Add waist for more"]}
      />

      <Facts
        items={[
          { label: "BMI", value: r.bmi.toFixed(1), tone },
          { label: "Healthy from", value: kgText(r.healthyMinKg, imperial) },
          { label: "Healthy to", value: kgText(r.healthyMaxKg, imperial) },
          { label: "Waist to height", value: w ? w.ratio.toFixed(2) : "Not entered", tone: w ? (w.band === "healthy" ? "good" : w.band === "low" ? undefined : "warn") : undefined },
        ]}
      />

      <Assumptions
        items={[
          { label: "Height", value: `${heightCm.toFixed(1)} cm` },
          { label: "Weight", value: `${weightKg.toFixed(1)} kg` },
          { label: "Thresholds", value: `Overweight from ${t.over}, obesity from ${t.obese}` },
          { label: "For", value: "Adults 18 and over" },
        ]}
      />

      <ResultCard title="BMI ranges for your height" sub="The weight at each boundary.">
        <Compare
          head={["Range", "Weight"]}
          rows={bands.map((b) => ({
            label: `${b.label} (${b.from === 0 ? "under" : b.from}${b.to < 60 ? `${b.from === 0 ? " " : " to "}${b.to}` : "+"})`,
            value: b.from === 0 ? `under ${kgText(b.to * m2, imperial)}` : b.to >= 60 ? `${kgText(b.from * m2, imperial)}+` : `${kgText(b.from * m2, imperial)} to ${kgText(b.to * m2, imperial)}`,
            bar: Math.min(1, (b.from + b.to) / 2 / 45),
            current: r.bmi >= b.from && r.bmi < b.to,
          }))}
        />
      </ResultCard>

      <ResultCard title="Worth knowing" sub="BMI is a starting point.">
        {w && (
          <Callout tone={w.band === "healthy" ? "good" : w.band === "low" ? "info" : "warn"} title={`Waist-to-height ratio ${w.ratio.toFixed(2)}`}>
            {w.band === "healthy"
              ? "Your waist is less than half your height, which NICE recommends for everyone."
              : w.band === "low"
                ? "A ratio under 0.4 can be a sign of being underweight. Talk to your GP if you are concerned."
                : w.band === "increased"
                  ? "A ratio of 0.5 or more suggests increased health risks from fat around the middle, even with a healthy BMI."
                  : "A ratio of 0.6 or more suggests high health risks. Talk to your GP or pharmacist."}
          </Callout>
        )}
        <Callout title="BMI does not measure body fat directly">
          Muscular people can have a high BMI without excess fat, and older adults can have a healthy BMI with little muscle. Waist size adds useful information.
        </Callout>
        {(r.category === "obese1" || r.category === "obese2" || r.category === "obese3") && (
          <Callout title="Free NHS support">
            Your GP can refer you to a free NHS weight management service, and the NHS Digital Weight Management Programme is available to adults with diabetes or high blood pressure.
          </Callout>
        )}
      </ResultCard>

      <p className={s.hint} style={{ textAlign: "center" }}>
        NHS and NICE adult thresholds. Not medical advice.
      </p>
    </Studio>
  );
}

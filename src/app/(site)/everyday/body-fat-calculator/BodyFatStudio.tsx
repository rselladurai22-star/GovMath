"use client";

import { bmiAdult, waistToHeight } from "@/lib/life/health";
import {
  cmFromFtIn,
  cmFromIn,
  deurenbergBodyFat,
  FAT_BANDS,
  fatAndLean,
  fatBand,
  kgFromLb,
  kgFromStLb,
  navyBodyFat,
  stLbText,
  type Sex,
} from "@/lib/life/body";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, Segmented, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Units = "metric" | "us" | "imperial";

const SCHEMA = {
  units: oneOf<Units>("metric", ["metric", "us", "imperial"]),
  sex: oneOf<Sex>("male", ["female", "male"]),
  cm: num(178, 120, 230),
  ft: num(5, 4, 7),
  inch: num(10, 0, 11.9),
  kg: num(80, 30, 300),
  lbs: num(176, 66, 660),
  st: num(12, 4, 47),
  lb: num(8, 0, 13.9),
  neck: num(38, 20, 70),
  waist: num(90, 40, 200),
  hip: num(100, 50, 200),
  neckIn: num(15, 8, 28),
  waistIn: num(35.5, 16, 80),
  hipIn: num(39.5, 20, 80),
  age: num(40, 18, 100),
  goal: num(0, 0, 50),
};
const ADVANCED = ["age", "goal"] as const;

export default function BodyFatStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const units = v.units;
  const inches = units !== "metric";
  const heightCm = inches ? cmFromFtIn(v.ft, v.inch) : v.cm;
  const weightKg = units === "imperial" ? kgFromStLb(v.st, v.lb) : units === "us" ? kgFromLb(v.lbs) : v.kg;
  const neckCm = inches ? cmFromIn(v.neckIn) : v.neck;
  const waistCm = inches ? cmFromIn(v.waistIn) : v.waist;
  const hipCm = inches ? cmFromIn(v.hipIn) : v.hip;
  const female = v.sex === "female";

  const navy = navyBodyFat({ sex: v.sex, heightCm, neckCm, waistCm, hipCm: female ? hipCm : undefined });
  const bmi = bmiAdult(heightCm, weightKg).bmi;
  const deur = deurenbergBodyFat({ sex: v.sex, bmi, age: v.age });
  const main = navy ?? deur ?? 0;
  const band = fatBand(v.sex, main);
  const { fatKg, leanKg } = fatAndLean(weightKg, main);
  const wht = waistToHeight(waistCm, heightCm);
  const goalKg = v.goal > 0 && v.goal < 100 ? leanKg / (1 - v.goal / 100) : null;
  const w = (kg: number) => (units === "metric" ? `${kg.toFixed(1)} kg` : units === "us" ? `${(kg / 0.45359237).toFixed(1)} lb` : stLbText(kg, 1));
  const len = (cm: number) => (inches ? `${(cm / 2.54).toFixed(1)} in` : `${cm.toFixed(1)} cm`);
  const pct = (n: number | null) => (n === null ? "Not available" : `${n.toFixed(1)}%`);
  const bands = FAT_BANDS[v.sex];
  const tone = band.band === "obese" || band.below ? "warn" : "good";

  return (
    <Studio
      title="Your measurements"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my body fat"
      onReset={st.reset}
      dock={{ label: "Body fat", value: pct(main) }}
      inputs={
        <>
          <InputGroup title="Your measurements">
            <Segmented
              label="Units"
              value={v.units}
              onChange={st.bind("units")}
              options={[
                { value: "metric", label: "cm and kg" },
                { value: "us", label: "in and lb", note: "Height in feet and inches, tape measurements in inches, weight in pounds." },
                { value: "imperial", label: "in and st", note: "Height in feet and inches, tape measurements in inches, weight in stones and pounds." },
              ]}
            />
            <Segmented
              label="Sex"
              value={v.sex}
              onChange={st.bind("sex")}
              options={[
                { value: "female", label: "Female" },
                { value: "male", label: "Male" },
              ]}
            />
            {inches ? (
              <>
                <StepperField label="Height: feet" value={v.ft} onChange={st.bind("ft")} step={1} min={4} max={7} unit="ft" dp={0} />
                <StepperField label="Height: inches" value={v.inch} onChange={st.bind("inch")} step={1} min={0} max={11.9} unit="in" dp={1} />
                {units === "us" ? (
                  <StepperField label="Weight" value={v.lbs} onChange={st.bind("lbs")} step={1} min={66} max={660} unit="lb" dp={1} />
                ) : (
                  <>
                    <StepperField label="Weight: stone" value={v.st} onChange={st.bind("st")} step={1} min={4} max={47} unit="st" dp={0} />
                    <StepperField label="Weight: pounds" value={v.lb} onChange={st.bind("lb")} step={1} min={0} max={13.9} unit="lb" dp={1} />
                  </>
                )}
                <StepperField label="Neck" value={v.neckIn} onChange={st.bind("neckIn")} step={0.5} min={8} max={28} unit="in" dp={1} info="Just below the Adam's apple, tape sloping slightly down at the front." />
                <StepperField
                  label="Waist"
                  value={v.waistIn}
                  onChange={st.bind("waistIn")}
                  step={0.5}
                  min={16}
                  max={80}
                  unit="in"
                  dp={1}
                  info={female ? "At the narrowest point, usually just above the belly button." : "Level with the belly button, after breathing out normally."}
                />
                {female && <StepperField label="Hips" value={v.hipIn} onChange={st.bind("hipIn")} step={0.5} min={20} max={80} unit="in" dp={1} info="Around the widest part of your bottom." />}
              </>
            ) : (
              <>
                <StepperField label="Height" value={v.cm} onChange={st.bind("cm")} step={1} min={120} max={230} unit="cm" dp={1} />
                <StepperField label="Weight" value={v.kg} onChange={st.bind("kg")} step={0.5} min={30} max={300} unit="kg" dp={1} />
                <StepperField label="Neck" value={v.neck} onChange={st.bind("neck")} step={0.5} min={20} max={70} unit="cm" dp={1} info="Just below the Adam's apple, tape sloping slightly down at the front." />
                <StepperField
                  label="Waist"
                  value={v.waist}
                  onChange={st.bind("waist")}
                  step={0.5}
                  min={40}
                  max={200}
                  unit="cm"
                  dp={1}
                  info={female ? "At the narrowest point, usually just above the belly button." : "Level with the belly button, after breathing out normally."}
                />
                {female && <StepperField label="Hips" value={v.hip} onChange={st.bind("hip")} step={0.5} min={50} max={200} unit="cm" dp={1} info="Around the widest part of your bottom." />}
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Age" value={v.age} onChange={st.bind("age")} step={1} min={18} max={100} unit="years" dp={0} optional info="Used by the BMI-based estimate, which allows for body fat rising with age." />
            <StepperField
              label="Target body fat"
              value={v.goal}
              onChange={st.bind("goal")}
              step={1}
              min={0}
              max={50}
              unit="%"
              dp={0}
              optional
              info="Leave at 0 to skip. Shows the weight you would reach at that body fat if you kept all your lean mass."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={navy !== null ? "Body fat (US Navy method)" : "Body fat (BMI-based estimate)"}
        value={pct(main)}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          <>
            {navy === null && (
              <>
                {female ? "Your waist plus hips must be larger than your neck" : "Your waist must be larger than your neck"} for the tape method, so this uses the BMI-based estimate.{" "}
              </>
            )}
            That puts you in the <b>{band.label.toLowerCase()}</b>{" "}range for {female ? "women" : "men"}. About <b>{w(fatKg)}</b>{" "}of your weight is fat and{" "}
            <b>{w(leanKg)}</b>{" "}is lean mass (muscle, bone, organs and water).
          </>
        }
        badges={[band.label, `BMI ${bmi.toFixed(1)}`, `Waist to height ${wht.ratio.toFixed(2)}`]}
      />

      <Facts
        items={[
          { label: "US Navy method", value: pct(navy), tone: navy !== null ? tone : undefined },
          { label: "BMI-based estimate", value: pct(deur) },
          { label: "Fat mass", value: w(fatKg) },
          { label: "Lean mass", value: w(leanKg) },
        ]}
      />

      <Assumptions
        items={[
          { label: "Height", value: `${heightCm.toFixed(1)} cm` },
          { label: "Weight", value: `${weightKg.toFixed(1)} kg` },
          { label: "Neck and waist", value: `${len(neckCm)} and ${len(waistCm)}` },
          ...(female ? [{ label: "Hips", value: len(hipCm) }] : []),
          { label: "Categories", value: "American Council on Exercise" },
        ]}
        note="Tape and BMI methods are estimates, usually within a few percentage points of a scan, and less accurate at the extremes."
      />

      <ResultCard title="Fat and lean mass" sub={`Out of ${w(weightKg)}.`}>
        <SplitBar
          segments={[
            { label: "Fat mass", value: fatKg, display: w(fatKg), color: "#eb6834" },
            { label: "Lean mass", value: leanKg, display: w(leanKg), color: "#2a78d6" },
          ]}
          caption={`Using the ${navy !== null ? "US Navy" : "BMI-based"} figure of ${pct(main)}.`}
        />
      </ResultCard>

      <ResultCard title={`Body fat categories for ${female ? "women" : "men"}`} sub="American Council on Exercise.">
        <Compare
          head={["Category", "Body fat"]}
          rows={bands.map((b, i) => {
            const next = bands[i + 1];
            return {
              label: b.label,
              value: next ? `${b.from}% to ${next.from - 1}%` : `${b.from}% or more`,
              bar: Math.min(1, (b.from + 4) / 45),
              current: b.band === band.band,
            };
          })}
        />
      </ResultCard>

      {goalKg !== null && (
        <ResultCard title={`Weight at ${v.goal}% body fat`} sub="If you kept all your lean mass.">
          <Compare
            head={["", "Weight"]}
            rows={[
              { label: "Now", value: w(weightKg), bar: 1, current: true },
              { label: `At ${v.goal}% body fat`, value: w(goalKg), delta: `${goalKg < weightKg ? "−" : "+"}${w(Math.abs(weightKg - goalKg))}`, deltaTone: goalKg < weightKg ? "down" : "up", bar: Math.min(1, goalKg / Math.max(weightKg, goalKg)) },
            ]}
          />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="Body fat is one measure among several.">
        {band.below && (
          <Callout tone="warn" title="Below essential fat">
            A result under {bands[0].from}% is below the essential fat range, which is unusual and can harm health. Check your measurements, and talk to
            your GP if you are concerned.
          </Callout>
        )}
        <Callout tone={wht.band === "healthy" ? "good" : wht.band === "low" ? "info" : "warn"} title={`Waist-to-height ratio ${wht.ratio.toFixed(2)}`}>
          {wht.band === "healthy"
            ? "Your waist is less than half your height, as NICE guidance recommends."
            : wht.band === "low"
              ? "A ratio under 0.4 can be a sign of being underweight."
              : wht.band === "increased"
                ? "A ratio of 0.5 or more suggests increased health risks from fat around the middle."
                : "A ratio of 0.6 or more suggests high health risks. Consider talking to your GP or pharmacist."}
        </Callout>
        {navy !== null && deur !== null && Math.abs(navy - deur) >= 5 && (
          <Callout title="The two methods disagree">
            The tape method and the BMI-based estimate differ by {Math.abs(navy - deur).toFixed(1)} points. The BMI method cannot tell muscle from fat, so
            the tape method is usually closer for muscular people.
          </Callout>
        )}
        <Callout title="An estimate, not medical advice">
          For an accurate figure, a DEXA scan or other clinical test is needed. If you are worried about your weight or body shape, talk to your GP.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        US Navy circumference method (Hodgdon and Beckett, 1984) and the Deurenberg BMI equation (1991), with American Council on Exercise categories. Not
        medical advice.
      </p>
    </Studio>
  );
}

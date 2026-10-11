"use client";

import {
  ACTIVITY,
  CALORIE_FLOOR,
  calories,
  cmFromFtIn,
  kgFromLb,
  kgFromStLb,
  KCAL_PER_G,
  MACRO_SPLITS,
  macros,
  NHS_REFERENCE,
  stLbText,
  VLCD_KCAL,
  type Activity,
  type BmrFormula,
  type CalorieGoal,
  type MacroSplit,
  type Sex,
} from "@/lib/life/body";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, RadioGroup, Segmented, SelectField, StepperField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Compare, DataTable, Facts, ResultCard, SplitBar } from "@/components/flagship/results";
import { whole } from "@/components/flagship/format";
import { num, oneOf, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Units = "metric" | "us" | "imperial";
type Rate = "0.25" | "0.5" | "0.75" | "1";

const SCHEMA = {
  units: oneOf<Units>("metric", ["metric", "us", "imperial"]),
  sex: oneOf<Sex>("female", ["female", "male"]),
  age: num(35, 18, 100),
  cm: num(165, 120, 230),
  ft: num(5, 4, 7),
  inch: num(5, 0, 11.9),
  kg: num(70, 30, 300),
  lbs: num(154, 66, 660),
  st: num(11, 4, 47),
  lb: num(0, 0, 13.9),
  activity: oneOf<Activity>("moderate", ["sedentary", "light", "moderate", "active", "very"]),
  goal: oneOf<CalorieGoal>("lose", ["lose", "maintain", "gain"]),
  rate: oneOf<Rate>("0.5", ["0.25", "0.5", "0.75", "1"]),
  formula: oneOf<BmrFormula>("mifflin", ["mifflin", "harris", "katch"]),
  fat: num(0, 0, 60),
  /** Goal weight in the visitor's units: kg, lb (US) or stone as a decimal (UK). 0 = not set. */
  target: num(0, 0, 660),
  split: oneOf<MacroSplit>("balanced", ["balanced", "protein", "lowcarb"]),
};
const ADVANCED = ["formula", "fat", "target", "split"] as const;

const RATE_LABEL: Record<Rate, string> = {
  "0.25": "0.25 kg (about ½ lb)",
  "0.5": "0.5 kg (about 1 lb)",
  "0.75": "0.75 kg (about 1½ lb)",
  "1": "1 kg (about 2 lb)",
};

const kcal = (n: number) => `${whole(n)} kcal`;

export default function CalorieStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const units = v.units;
  const feet = units !== "metric";
  const heightCm = feet ? cmFromFtIn(v.ft, v.inch) : v.cm;
  const weightKg = units === "imperial" ? kgFromStLb(v.st, v.lb) : units === "us" ? kgFromLb(v.lbs) : v.kg;
  const goalKg = v.target > 0 ? (units === "metric" ? v.target : units === "us" ? kgFromLb(v.target) : kgFromStLb(v.target, 0)) : undefined;
  const katchMissing = v.formula === "katch" && v.fat <= 0;
  const r = calories({
    formula: v.formula,
    sex: v.sex,
    kg: weightKg,
    cm: heightCm,
    age: v.age,
    bodyFatPct: v.fat > 0 ? v.fat : undefined,
    activity: v.activity,
    goal: v.goal,
    rateKg: Number(v.rate),
    goalKg,
  });
  const m = macros(r.target, v.split);
  const w = (kg: number) => (units === "metric" ? `${kg.toFixed(1)} kg` : units === "us" ? `${(kg / 0.45359237).toFixed(1)} lb` : stLbText(kg, 0));
  const wAbs = (kg: number) => (units === "metric" ? `${Math.abs(kg).toFixed(2)} kg` : `${(Math.abs(kg) / 0.45359237).toFixed(1)} lb`);
  const goalWord = v.goal === "lose" ? "lose" : v.goal === "gain" ? "gain" : "maintain";
  const ref = NHS_REFERENCE[v.sex];
  const weeks = r.weeksToGoal;
  const schedule =
    weeks !== null && weeks > 0 && goalKg !== undefined
      ? Array.from({ length: Math.min(52, Math.ceil(weeks)) }, (_, i) => {
          const wk = i + 1;
          const kg = wk >= weeks ? goalKg : weightKg + r.weeklyKg * wk;
          return [`Week ${wk}`, w(kg), kcal(r.target)];
        })
      : [];

  return (
    <Studio
      title="About you"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate my calories"
      onReset={st.reset}
      dock={{ label: `Calories to ${goalWord}`, value: kcal(r.target) }}
      inputs={
        <>
          <InputGroup title="About you">
            <Segmented
              label="Units"
              value={v.units}
              onChange={st.bind("units")}
              options={[
                { value: "metric", label: "cm and kg" },
                { value: "us", label: "ft and lb", note: "Height in feet and inches, weight in pounds." },
                { value: "imperial", label: "ft and st", note: "Height in feet and inches, weight in stones and pounds." },
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
            <StepperField label="Age" value={v.age} onChange={st.bind("age")} step={1} min={18} max={100} unit="years" dp={0} info="These formulas are for adults aged 18 and over." />
            {feet ? (
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
              </>
            ) : (
              <>
                <StepperField label="Height" value={v.cm} onChange={st.bind("cm")} step={1} min={120} max={230} unit="cm" dp={1} />
                <StepperField label="Weight" value={v.kg} onChange={st.bind("kg")} step={0.5} min={30} max={300} unit="kg" dp={1} />
              </>
            )}
            <SelectField
              label="Activity level"
              value={v.activity}
              onChange={st.bind("activity")}
              options={(Object.keys(ACTIVITY) as Activity[]).map((a) => ({ value: a, label: `${ACTIVITY[a].label}: ${ACTIVITY[a].note.toLowerCase()}` }))}
              info="Count your job and your exercise together. Most people overestimate, so if in doubt pick the lower level."
            />
            <Segmented
              label="Goal"
              value={v.goal}
              onChange={st.bind("goal")}
              options={[
                { value: "lose", label: "Lose" },
                { value: "maintain", label: "Maintain" },
                { value: "gain", label: "Gain" },
              ]}
            />
            {v.goal !== "maintain" && (
              <RadioGroup
                label={`Rate a week`}
                value={v.rate}
                onChange={st.bind("rate")}
                options={(Object.keys(RATE_LABEL) as Rate[]).map((k) => ({ value: k, label: RATE_LABEL[k] }))}
                info="The NHS suggests losing 0.5 to 1 kg (1 to 2 lb) a week. Gaining slowly, about 0.25 kg a week, keeps more of the gain as muscle."
              />
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <SelectField
              label="Formula"
              value={v.formula}
              onChange={st.bind("formula")}
              optional
              options={[
                { value: "mifflin", label: "Mifflin-St Jeor (recommended)" },
                { value: "harris", label: "Harris-Benedict (revised 1984)" },
                { value: "katch", label: "Katch-McArdle (needs body fat %)" },
              ]}
              info="Mifflin-St Jeor is the most accurate for most adults in studies. Katch-McArdle uses your lean mass, so it needs your body fat percentage."
            />
            <StepperField
              label="Body fat"
              value={v.fat}
              onChange={st.bind("fat")}
              step={1}
              min={0}
              max={60}
              unit="%"
              dp={1}
              optional
              info="Only used by Katch-McArdle. Leave at 0 if you do not know it; the body fat calculator can estimate it."
            />
            <StepperField
              label={units === "metric" ? "Goal weight" : units === "us" ? "Goal weight" : "Goal weight (stone)"}
              value={v.target}
              onChange={st.bind("target")}
              step={units === "imperial" ? 0.5 : 1}
              min={0}
              max={units === "metric" ? 300 : units === "us" ? 660 : 47}
              unit={units === "metric" ? "kg" : units === "us" ? "lb" : "st"}
              dp={1}
              optional
              info="Leave at 0 to skip. With a goal weight you see how many weeks it might take."
            />
            <SelectField
              label="Macro split"
              value={v.split}
              onChange={st.bind("split")}
              optional
              options={(Object.keys(MACRO_SPLITS) as MacroSplit[]).map((s) => {
                const p = MACRO_SPLITS[s];
                return { value: s, label: `${p.label}: ${p.protein * 100}% protein, ${p.carbs * 100}% carbs, ${p.fat * 100}% fat` };
              })}
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={`Calories a day to ${goalWord}`}
        value={whole(r.target)}
        unit="kcal"
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          v.goal === "maintain" ? (
            <>
              You use about <b>{kcal(r.tdee)}</b>{" "}a day, so eating about that much should keep your weight steady.
            </>
          ) : (
            <>
              You use about <b>{kcal(r.tdee)}</b>{" "}a day. Eating about <b>{kcal(r.target)}</b>{" "}should {goalWord} about <b>{wAbs(r.weeklyKg)}</b>{" "}a week
              {weeks !== null ? (
                <>
                  , reaching your goal in about <b>{Math.ceil(weeks)} weeks</b>
                </>
              ) : null}
              .
            </>
          )
        }
        badges={[ACTIVITY[v.activity].label, v.formula === "katch" && !katchMissing ? "Katch-McArdle" : v.formula === "harris" ? "Harris-Benedict" : "Mifflin-St Jeor", "Estimate, not medical advice"]}
      />

      <Facts
        items={[
          { label: "At rest (BMR)", value: kcal(r.bmr) },
          { label: "To maintain", value: kcal(r.tdee) },
          { label: `To ${goalWord}`, value: kcal(r.target), tone: r.floored ? "warn" : "good" },
          { label: "Change a week", value: v.goal === "maintain" ? "None" : `${r.weeklyKg < 0 ? "−" : "+"}${wAbs(r.weeklyKg)}` },
        ]}
      />

      <Assumptions
        items={[
          { label: "Height", value: `${heightCm.toFixed(1)} cm` },
          { label: "Weight", value: `${weightKg.toFixed(1)} kg` },
          { label: "Activity multiplier", value: `× ${ACTIVITY[v.activity].factor}` },
          { label: "Energy per kg", value: "About 7,700 kcal" },
          { label: "Lowest target shown", value: kcal(CALORIE_FLOOR[v.sex]) },
        ]}
        note="Formulas give an average for people like you. Your real needs may be 10% higher or lower; adjust after a few weeks."
      />

      <ResultCard title="Your daily calories split into macros" sub={`${MACRO_SPLITS[v.split].label} split of ${kcal(r.target)}.`}>
        <SplitBar
          segments={[
            { label: `Protein ${whole(m.protein)} g`, value: m.protein * KCAL_PER_G.protein, display: kcal(m.protein * KCAL_PER_G.protein), color: "#2a78d6" },
            { label: `Carbohydrate ${whole(m.carbs)} g`, value: m.carbs * KCAL_PER_G.carbs, display: kcal(m.carbs * KCAL_PER_G.carbs), color: "#1baf7a" },
            { label: `Fat ${whole(m.fat)} g`, value: m.fat * KCAL_PER_G.fat, display: kcal(m.fat * KCAL_PER_G.fat), color: "#eb6834" },
          ]}
          caption="Protein and carbohydrate give 4 kcal a gram, fat 9 kcal."
        />
      </ResultCard>

      <ResultCard title="Calories by activity level" sub="To maintain your weight.">
        <Compare
          head={["Activity", "Calories a day"]}
          rows={(Object.keys(ACTIVITY) as Activity[]).map((a) => {
            const t = r.bmr * ACTIVITY[a].factor;
            return { label: ACTIVITY[a].label, value: kcal(t), bar: Math.min(1, t / (r.bmr * 1.9)), current: a === v.activity };
          })}
        />
      </ResultCard>

      {v.goal !== "maintain" && (
        <ResultCard title={`Calories to ${goalWord} at each rate`} sub="Before the lower limit is applied.">
          <Compare
            head={["Rate a week", "Calories a day"]}
            rows={(Object.keys(RATE_LABEL) as Rate[]).map((k) => {
              const c = calories({ formula: v.formula, sex: v.sex, kg: weightKg, cm: heightCm, age: v.age, bodyFatPct: v.fat > 0 ? v.fat : undefined, activity: v.activity, goal: v.goal, rateKg: Number(k) });
              return { label: RATE_LABEL[k], value: kcal(c.target), delta: c.floored ? "at the limit" : undefined, deltaTone: c.floored ? "down" : undefined, bar: Math.min(1, c.target / (r.tdee + 1100)), current: k === v.rate };
            })}
          />
        </ResultCard>
      )}

      {schedule.length > 0 && (
        <ResultCard title="Week by week to your goal" sub="If the rate holds; real progress is less even.">
          <DataTable summary="Show the weekly plan" columns={["Week", "Weight", "Calories a day"]} rows={schedule} />
        </ResultCard>
      )}

      <ResultCard title="Worth knowing" sub="An estimate to start from.">
        {r.floored && (
          <Callout tone="warn" title={`We have not gone below ${kcal(r.floor)} a day`}>
            Your chosen rate would mean about {kcal(Math.max(0, r.rawTarget))} a day. Eating less than {kcal(CALORIE_FLOOR[v.sex])} a day (women) or{" "}
            {kcal(CALORIE_FLOOR.male)} (men) makes it hard to get enough nutrients. Diets of {VLCD_KCAL} kcal or less should only be followed with a
            doctor&rsquo;s supervision. Try a slower rate or more activity.
          </Callout>
        )}
        {v.goal === "lose" && r.fast && !r.floored && (
          <Callout tone="warn" title="Faster than 1 kg a week">
            The NHS suggests losing 0.5 to 1 kg (1 to 2 lb) a week. Losing faster can mean losing muscle and makes the weight more likely to return.
          </Callout>
        )}
        {katchMissing && (
          <Callout tone="info" title="Katch-McArdle needs your body fat">
            Without a body fat percentage we have used Mifflin-St Jeor instead. Add your body fat under More options.
          </Callout>
        )}
        {goalKg !== undefined && weeks === null && v.goal !== "maintain" && (
          <Callout tone="info" title="Your goal weight is the other way">
            Your goal weight is {goalKg > weightKg ? "above" : "below"} your current weight, so choose {goalKg > weightKg ? "Gain" : "Lose"} to see how long it
            would take.
          </Callout>
        )}
        <Callout title="How this compares with the NHS figures">
          The NHS says an average {v.sex === "female" ? "woman" : "man"} needs about {kcal(ref)} a day. Your estimate to maintain is{" "}
          {r.tdee >= ref ? `${kcal(r.tdee - ref)} more` : `${kcal(ref - r.tdee)} less`}, because it uses your own size, age and activity.
        </Callout>
        <Callout title="Not medical advice">
          This is an estimate. If you are pregnant or breastfeeding, under 18, have diabetes, an eating disorder or another health condition, talk to
          your GP, a registered dietitian or your doctor before changing what you eat.
        </Callout>
      </ResultCard>

      <p className="footnote" style={{ textAlign: "center" }}>
        Mifflin-St Jeor, Harris-Benedict or Katch-McArdle with standard activity multipliers and about 7,700 kcal per kg. An estimate, not medical advice.
      </p>
    </Studio>
  );
}

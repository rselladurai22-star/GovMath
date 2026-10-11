"use client";

import { Fragment } from "react";

import {
  cumulativeGpa,
  finalNeeded,
  gpa,
  GRADE_POINTS,
  LETTERS,
  letterFromPercent,
  termGpaNeeded,
  weightedGrade,
  type Course,
  type CourseLevel,
  type Letter,
} from "@/lib/life/maths";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard, SplitBar, Statement } from "@/components/flagship/results";
import { bool, num, oneOf, ShareButton, useStudio, type Query, type Schema } from "@/components/flagship/useStudio";

const IDX = [1, 2, 3, 4, 5, 6, 7, 8] as const;
type I = (typeof IDX)[number];
const CAT = [1, 2, 3, 4, 5] as const;
type C = (typeof CAT)[number];

type Values = { [K in `g${I}`]: Letter } & { [K in `c${I}`]: number } & { [K in `l${I}`]: CourseLevel } & { [K in `w${C}`]: number } & { [K in `s${C}`]: number } & {
  mode: "gpa" | "grade";
  courses: number;
  weighted: boolean;
  honors: number;
  ap: number;
  aplus: "4" | "4.33";
  prevGpa: number;
  prevCredits: number;
  target: number;
  cats: number;
  finalW: number;
  goal: number;
};

const COURSE_DEFAULTS: [Letter, number, CourseLevel][] = [
  ["A", 3, "ap"],
  ["B+", 4, "honors"],
  ["A-", 3, "regular"],
  ["B", 3, "regular"],
  ["C+", 2, "regular"],
  ["A", 3, "regular"],
  ["A", 3, "regular"],
  ["A", 3, "regular"],
];
const CAT_DEFAULTS: [number, number][] = [
  [20, 92],
  [20, 85],
  [25, 78],
  [10, 90],
  [10, 90],
];
const NAMES = ["Homework", "Quizzes", "Midterm", "Projects", "Participation"];

const SCHEMA = {
  mode: oneOf<"gpa" | "grade">("gpa", ["gpa", "grade"]),
  courses: num(5, 1, 8),
  weighted: bool(false),
  honors: num(0.5, 0, 2),
  ap: num(1, 0, 2),
  aplus: oneOf<"4" | "4.33">("4", ["4", "4.33"]),
  prevGpa: num(0, 0, 5),
  prevCredits: num(0, 0, 500),
  target: num(0, 0, 5),
  cats: num(3, 1, 5),
  finalW: num(35, 0, 100),
  goal: num(90, 0, 120),
  ...Object.fromEntries(
    IDX.flatMap((i) => [
      [`g${i}`, oneOf<Letter>(COURSE_DEFAULTS[i - 1][0], LETTERS)],
      [`c${i}`, num(COURSE_DEFAULTS[i - 1][1], 0, 20)],
      [`l${i}`, oneOf<CourseLevel>(COURSE_DEFAULTS[i - 1][2], ["regular", "honors", "ap"])],
    ]),
  ),
  ...Object.fromEntries(CAT.flatMap((i) => [[`w${i}`, num(CAT_DEFAULTS[i - 1][0], 0, 100)], [`s${i}`, num(CAT_DEFAULTS[i - 1][1], 0, 150)]])),
} as Schema<Values>;

const GPA_ADVANCED = ["weighted", "honors", "ap", "aplus", "prevGpa", "prevCredits", "target"] as const;

const f2 = (x: number | null) => (x === null || !Number.isFinite(x) ? "—" : x.toFixed(2));
const f1 = (x: number | null) => (x === null || !Number.isFinite(x) ? "—" : `${Number(x.toFixed(1))}%`);

export default function GpaStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const aPlus = v.aplus === "4.33" ? 4.33 : 4;

  // GPA mode
  const active = IDX.filter((i) => i <= v.courses);
  const courses: Course[] = active.map((i) => ({ grade: v[`g${i}`], credits: v[`c${i}`], level: v.weighted ? v[`l${i}`] : "regular" }));
  const g = gpa(courses, { aPlus, honorsBonus: v.honors, apBonus: v.ap });
  const term = v.weighted ? g.weighted : g.unweighted;
  const hasPrev = v.prevCredits > 0;
  const cum = hasPrev ? cumulativeGpa(v.prevGpa, v.prevCredits, term, g.credits) : term;
  const need = hasPrev && v.target > 0 ? termGpaNeeded(v.prevGpa, v.prevCredits, v.target, g.credits) : null;
  const top = v.weighted ? aPlus + Math.max(v.honors, v.ap) : aPlus;

  // Grade mode
  const cats = CAT.filter((i) => i <= v.cats).map((i) => ({ name: NAMES[i - 1], weight: v[`w${i}`], score: v[`s${i}`] }));
  const wg = weightedGrade(cats);
  const sumW = cats.reduce((a, c) => a + c.weight, 0);
  const current = wg.grade;
  const needed = current !== null ? finalNeeded(current, v.finalW, v.goal) : null;
  const weightsOk = Math.abs(sumW + v.finalW - 100) < 0.01;

  const isGpa = v.mode === "gpa";
  const answerValue = isGpa ? f2(hasPrev ? cum : term) : needed === null ? f1(current) : f1(needed);
  const eyebrow = isGpa ? (hasPrev ? "Cumulative GPA" : v.weighted ? "Weighted GPA this term" : "GPA this term") : needed === null ? "Current grade" : `Score needed on the final for ${v.goal}%`;

  return (
    <Studio
      title="Your grades"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel={isGpa ? "Calculate my GPA" : "Calculate my grade"}
      onReset={st.reset}
      dock={{ label: eyebrow, value: answerValue }}
      inputs={
        <>
          <InputGroup title="What do you want to work out?">
            <SelectField
              label="Calculator"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "gpa", label: "GPA from letter grades" },
                { value: "grade", label: "Course grade and final exam score" },
              ]}
            />
            {isGpa ? (
              <StepperField label="Number of courses" value={v.courses} onChange={(x) => st.set("courses", Math.round(x))} step={1} min={1} max={8} unit="courses" dp={0} />
            ) : (
              <>
                <StepperField label="Number of categories" value={v.cats} onChange={(x) => st.set("cats", Math.round(x))} step={1} min={1} max={5} unit="" dp={0} info="Parts of the course already marked, such as homework, quizzes and a midterm. Up to five." />
                <StepperField label="Final exam weight" value={v.finalW} onChange={st.bind("finalW")} step={1} min={0} max={100} unit="%" dp={1} />
                <StepperField label="Grade you want" value={v.goal} onChange={st.bind("goal")} step={1} min={0} max={120} unit="%" dp={1} info="On the common US scale, 90% is usually an A-, 80% a B-, 70% a C- and 60% a D-. Check your syllabus." />
              </>
            )}
          </InputGroup>
          {isGpa ? (
            <InputGroup title="Your courses">
              {active.map((i) => (
                <Fragment key={i}>
                  <SelectField label={`Course ${i} grade`} value={v[`g${i}`]} onChange={(x) => st.set(`g${i}`, x)} options={LETTERS.map((l) => ({ value: l, label: `${l} (${(l === "A+" ? aPlus : GRADE_POINTS[l]).toFixed(l === "A+" && aPlus === 4.33 ? 2 : 1)})` }))} />
                  <StepperField label={`Course ${i} credits`} value={v[`c${i}`]} onChange={(x) => st.set(`c${i}`, x)} step={0.5} min={0} max={10} unit="credits" dp={1} />
                  {v.weighted && (
                    <SelectField
                      label={`Course ${i} level`}
                      value={v[`l${i}`]}
                      onChange={(x) => st.set(`l${i}`, x)}
                      options={[
                        { value: "regular", label: "Regular" },
                        { value: "honors", label: `Honors (+${v.honors})` },
                        { value: "ap", label: `AP or IB (+${v.ap})` },
                      ]}
                    />
                  )}
                </Fragment>
              ))}
            </InputGroup>
          ) : (
            <InputGroup title="Marks so far">
              {CAT.filter((i) => i <= v.cats).map((i) => (
                <Fragment key={i}>
                  <StepperField label={`${NAMES[i - 1]} weight`} value={v[`w${i}`]} onChange={(x) => st.set(`w${i}`, x)} step={1} min={0} max={100} unit="%" dp={1} />
                  <StepperField label={`${NAMES[i - 1]} score`} value={v[`s${i}`]} onChange={(x) => st.set(`s${i}`, x)} step={1} min={0} max={150} unit="%" dp={1} />
                </Fragment>
              ))}
            </InputGroup>
          )}
          {isGpa && (
            <AdvancedOptions changed={st.changed([...GPA_ADVANCED])} onReset={() => st.resetKeys([...GPA_ADVANCED])}>
              <Switch label="Weighted GPA (honors and AP)" checked={v.weighted} onChange={st.bind("weighted")} optional info="Many high schools add points for harder courses. Turn this on to choose each course's level." />
              {v.weighted && (
                <>
                  <StepperField label="Honors bonus" value={v.honors} onChange={st.bind("honors")} step={0.25} min={0} max={2} unit="points" dp={2} optional />
                  <StepperField label="AP or IB bonus" value={v.ap} onChange={st.bind("ap")} step={0.25} min={0} max={2} unit="points" dp={2} optional />
                </>
              )}
              <SelectField
                label="An A+ counts as"
                value={v.aplus}
                onChange={st.bind("aplus")}
                optional
                options={[
                  { value: "4", label: "4.0 (most schools)" },
                  { value: "4.33", label: "4.33" },
                ]}
              />
              <StepperField label="GPA so far" value={v.prevGpa} onChange={st.bind("prevGpa")} step={0.01} min={0} max={5} unit="" dp={2} optional info="Your cumulative GPA before this term, from your transcript." />
              <StepperField label="Credits so far" value={v.prevCredits} onChange={st.bind("prevCredits")} step={1} min={0} max={500} unit="credits" dp={1} optional />
              <StepperField label="Target cumulative GPA" value={v.target} onChange={st.bind("target")} step={0.05} min={0} max={5} unit="" dp={2} optional info="We show the GPA you need this term to reach it." />
            </AdvancedOptions>
          )}
        </>
      }
    >
      {isGpa ? (
        <>
          <Answer
            eyebrow={eyebrow}
            value={g.credits > 0 ? answerValue : "—"}
            unit={`out of ${top.toFixed(top % 1 ? 2 : 1)}`}
            actions={<ShareButton copied={st.copied} onClick={st.share} />}
            sentence={
              g.credits > 0 ? (
                <>
                  Across {active.length} {active.length === 1 ? "course" : "courses"} and {g.credits} credits, your GPA this term is <b>{f2(g.unweighted)}</b>{" "}
                  unweighted{v.weighted ? <> and <b>{f2(g.weighted)}</b>{" "}weighted</> : null}.
                  {hasPrev ? (
                    <>
                      {" "}
                      With {v.prevCredits} earlier credits at {f2(v.prevGpa)}, your cumulative GPA becomes <b>{f2(cum)}</b>.
                    </>
                  ) : null}
                </>
              ) : (
                <>Give at least one course some credits.</>
              )
            }
            badges={[v.weighted ? "Weighted" : "Unweighted", `A+ = ${aPlus}`, `${g.credits} credits`]}
          />
          <Facts
            items={[
              { label: "Unweighted GPA", value: f2(g.unweighted) },
              { label: "Weighted GPA", value: v.weighted ? f2(g.weighted) : "Off" },
              { label: "Credits", value: String(g.credits) },
              { label: "Quality points", value: (v.weighted ? g.weightedPoints : g.points).toFixed(1) },
            ]}
          />
          <ResultCard title="Course by course" sub="Grade points × credits = quality points. GPA = total quality points ÷ total credits.">
            <Statement
              columns={["Points", "Credits", "Quality points"]}
              rows={[
                ...courses.map((c, k) => {
                  const base = c.grade === "A+" ? aPlus : GRADE_POINTS[c.grade];
                  const bonus = base > 0 && v.weighted ? (c.level === "ap" ? v.ap : c.level === "honors" ? v.honors : 0) : 0;
                  return {
                    label: `Course ${k + 1}: ${c.grade}${bonus ? ` (${c.level === "ap" ? "AP" : "Honors"})` : ""}`,
                    values: [(base + bonus).toFixed(2), String(c.credits), ((base + bonus) * c.credits).toFixed(2)],
                  };
                }),
                { label: "Total", values: ["", String(g.credits), (v.weighted ? g.weightedPoints : g.points).toFixed(2)], kind: "total" as const },
              ]}
            />
          </ResultCard>
          {need !== null && (
            <Callout tone={need > top ? "warn" : need <= 0 ? "good" : "info"} title={`To reach a ${f2(v.target)} cumulative GPA`}>
              {need > top
                ? `You would need ${f2(need)} this term over ${g.credits} credits, which is above the top of the scale. It will take more than one term.`
                : need <= 0
                  ? "You will stay at or above your target whatever grades you get this term."
                  : `You need a GPA of ${f2(need)} this term over ${g.credits} credits.`}
            </Callout>
          )}
          <Callout title="Colleges may recalculate it">
            Schools set their own scales and weights, and many colleges recalculate GPAs their own way. Use your school&rsquo;s figures where they differ.
          </Callout>
        </>
      ) : (
        <>
          <Answer
            eyebrow={eyebrow}
            value={answerValue}
            actions={<ShareButton copied={st.copied} onClick={st.share} />}
            sentence={
              current === null ? (
                <>Give at least one category a weight above 0.</>
              ) : (
                <>
                  Your grade so far is <b>{f1(current)}</b>{" "}({letterFromPercent(current)} on the common US scale).{" "}
                  {needed === null ? (
                    <>Set the final exam weight to see the score you need.</>
                  ) : needed > 100 ? (
                    <>
                      To finish on {v.goal}%, you would need <b>{f1(needed)}</b>{" "}on a final worth {v.finalW}%: not possible without extra credit.
                    </>
                  ) : needed <= 0 ? (
                    <>You will finish on at least {v.goal}% even with 0% on the final.</>
                  ) : (
                    <>
                      To finish on {v.goal}%, you need <b>{f1(needed)}</b>{" "}on a final worth {v.finalW}%.
                    </>
                  )}
                </>
              )
            }
            badges={[`Final ${v.finalW}%`, `Target ${v.goal}%`, `${cats.length} ${cats.length === 1 ? "category" : "categories"}`]}
          />
          {current !== null && (
            <>
              <SplitBar
                segments={[
                  ...cats.map((c, k) => ({ label: c.name, value: c.weight, display: `${c.weight}%`, color: ["#2a78d6", "#1baf7a", "#4a3aa7", "#e87ba4", "#eda100"][k] })),
                  { label: "Final exam", value: v.finalW, display: `${v.finalW}%`, color: "#eb6834" },
                ]}
                caption="How the course grade is weighted"
              />
              <Facts
                items={[
                  { label: "Grade so far", value: f1(current) },
                  { label: "Letter so far", value: letterFromPercent(current) },
                  { label: "Needed on the final", value: needed === null ? "—" : f1(Math.max(0, needed)), tone: needed !== null && needed > 100 ? "bad" : undefined },
                  { label: "Best possible grade", value: f1(current * (1 - v.finalW / 100) + v.finalW) },
                ]}
              />
              <ResultCard title="The score you need for each grade" sub={`With ${f1(current)} so far and a final worth ${v.finalW}%.`}>
                <Statement
                  columns={["Needed on the final"]}
                  rows={[90, 80, 70, 60].map((t) => {
                    const x = finalNeeded(current, v.finalW, t);
                    return { label: `${t}% (${letterFromPercent(t)})`, values: [x === null ? "—" : x > 100 ? `${f1(x)} (out of reach)` : x <= 0 ? "Already safe" : f1(x)] };
                  })}
                />
              </ResultCard>
              {!weightsOk && (
                <Callout tone="warn" title="The weights do not add up to 100%">
                  Your categories ({Number(sumW.toFixed(1))}%) plus the final ({v.finalW}%) make {Number((sumW + v.finalW).toFixed(1))}%. We scaled the categories so they share the{" "}
                  {100 - v.finalW}% not taken by the final. Check your syllabus.
                </Callout>
              )}
            </>
          )}
        </>
      )}

      <Assumptions
        items={
          isGpa
            ? [
                { label: "Scale", value: `US 4.0 scale, A+ = ${aPlus}` },
                { label: "Weighting", value: v.weighted ? `Honors +${v.honors}, AP/IB +${v.ap}, not on an F` : "Unweighted" },
                { label: "Pass/fail courses", value: "Leave out, or set credits to 0" },
                { label: "Cumulative", value: hasPrev ? "Credit-weighted with your GPA so far" : "This term only" },
              ]
            : [
                { label: "Categories", value: "Scaled to the share not taken by the final" },
                { label: "Letters", value: "Common US cut-offs: 93 A, 90 A-, 87 B+…" },
                { label: "Extra credit", value: "Scores above 100% allowed" },
                { label: "Rounding", value: "One decimal place" },
              ]
        }
      />
    </Studio>
  );
}

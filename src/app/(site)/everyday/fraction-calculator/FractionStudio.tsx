"use client";

import { approximateFraction, decimalExpansion, fractionOp, gcd, mixedText, parseFraction, simplify, type Frac, type FracOp } from "@/lib/life/maths";
import Studio from "@/components/flagship/Studio";
import { AdvancedOptions, InputGroup, RadioGroup, SelectField, StepperField, TextField } from "@/components/flagship/inputs";
import { Answer, Assumptions, Callout, Facts, ResultCard } from "@/components/flagship/results";
import { num, oneOf, text, ShareButton, useStudio, type Query } from "@/components/flagship/useStudio";

type Mode = "calc" | "simplify" | "convert";

const SCHEMA = {
  mode: oneOf<Mode>("calc", ["calc", "simplify", "convert"]),
  a: text("1 1/2", 24),
  op: oneOf<FracOp>("add", ["add", "subtract", "multiply", "divide"]),
  b: text("2/3", 24),
  dp: num(4, 0, 12),
  maxDen: num(100, 2, 100_000),
};
const ADVANCED = ["dp", "maxDen"] as const;
const SIGN: Record<FracOp, string> = { add: "+", subtract: "−", multiply: "×", divide: "÷" };

const show = (f: Frac) => (f.d === 1 ? `${f.n}` : `${f.n}/${f.d}`);

export default function FractionStudio({ query }: { query: Query }) {
  const st = useStudio(SCHEMA, query);
  const v = st.values;
  const dec = (x: number) => (Number.isFinite(x) ? Number(x.toFixed(v.dp)).toLocaleString("en-GB", { maximumFractionDigits: v.dp }) : "—");

  const a = parseFraction(v.a);
  const b = parseFraction(v.b);
  const needsB = v.mode === "calc";
  const bad = !a || (needsB && !b);

  let result: Frac | null = null;
  let steps: string[] = [];
  let title = "";
  if (!bad) {
    if (v.mode === "calc") {
      const w = fractionOp(a!, b!, v.op);
      result = w.result;
      steps = [
        ...(/\s/.test(v.a.trim()) || /\s/.test(v.b.trim()) ? [`Write any mixed numbers as improper fractions: ${show(a!)} ${SIGN[v.op]} ${show(b!)}.`] : []),
        ...w.steps,
      ];
      title = `${v.a.trim()} ${SIGN[v.op]} ${v.b.trim()}`;
    } else if (v.mode === "simplify") {
      const raw = (() => {
        const m = v.a.trim().match(/^(-?\d+)\s*\/\s*(-?\d+)$/);
        return m ? { n: Number(m[1]), d: Number(m[2]) } : a!;
      })();
      result = simplify(raw);
      const g = gcd(raw.n, raw.d) || 1;
      steps = g > 1 ? [`The greatest common divisor of ${Math.abs(raw.n)} and ${Math.abs(raw.d)} is ${g}.`, `Divide the top and bottom by ${g}: ${show(result)}.`] : [`${show(result)} is already in its lowest terms.`];
      title = `Simplify ${v.a.trim()}`;
    } else {
      const exact = a!;
      const looksDecimal = /^-?\d*\.\d+$/.test(v.a.trim());
      const approx = looksDecimal && exact.d > v.maxDen ? approximateFraction(exact.n / exact.d, v.maxDen) : null;
      result = approx ?? exact;
      steps = looksDecimal
        ? [
            `Write the decimal over a power of 10, then simplify: ${v.a.trim()} = ${show(exact)}.`,
            ...(approx ? [`With a denominator of ${v.maxDen.toLocaleString("en-GB")} or less, the closest fraction is ${show(approx)}.`] : []),
          ]
        : [`Divide the top by the bottom: ${show(exact)} = ${decimalExpansion(exact).text}.`, `Multiply by 100 for a percentage.`];
      title = `Convert ${v.a.trim()}`;
    }
  }

  const value = result && result.d !== 0 ? result.n / result.d : NaN;
  const expansion = result ? decimalExpansion(result) : null;
  const answer = bad ? "Check the input" : result ? mixedText(result) : "Undefined";

  return (
    <Studio
      title="Your fractions"
      ready={st.ready}
      onCalculate={st.calculate}
      calculateLabel="Calculate the fraction"
      onReset={st.reset}
      dock={{ label: "Answer", value: answer }}
      inputs={
        <>
          <InputGroup title="Your fractions">
            <SelectField
              label="What do you want to do?"
              value={v.mode}
              onChange={st.bind("mode")}
              options={[
                { value: "calc", label: "Add, subtract, multiply or divide" },
                { value: "simplify", label: "Simplify a fraction" },
                { value: "convert", label: "Convert to or from a decimal" },
              ]}
            />
            <TextField label={v.mode === "convert" ? "Fraction or decimal" : v.mode === "simplify" ? "Fraction" : "First fraction"} value={v.a} onChange={st.bind("a")} placeholder="e.g. 3/4 or 1 1/2" maxLength={24} hint="Type 3/4, a mixed number such as 1 1/2 (with a space), a whole number or a decimal." />
            {needsB && (
              <>
                <RadioGroup
                  label="Operation"
                  value={v.op}
                  onChange={st.bind("op")}
                  options={[
                    { value: "add", label: "+" },
                    { value: "subtract", label: "−" },
                    { value: "multiply", label: "×" },
                    { value: "divide", label: "÷" },
                  ]}
                />
                <TextField label="Second fraction" value={v.b} onChange={st.bind("b")} placeholder="e.g. 2/3" maxLength={24} />
              </>
            )}
          </InputGroup>
          <AdvancedOptions changed={st.changed([...ADVANCED])} onReset={() => st.resetKeys([...ADVANCED])}>
            <StepperField label="Decimal places" value={v.dp} onChange={(x) => st.set("dp", Math.round(x))} step={1} min={0} max={12} unit="dp" dp={0} optional />
            <StepperField
              label="Largest denominator"
              value={v.maxDen}
              onChange={(x) => st.set("maxDen", Math.round(x))}
              step={1}
              min={2}
              max={10_000}
              unit=""
              dp={0}
              optional
              info="When you convert a long decimal, such as 0.3333, the answer is rounded to the nearest fraction with a denominator this size or smaller (1/3)."
            />
          </AdvancedOptions>
        </>
      }
    >
      <Answer
        eyebrow={bad ? "We could not read that" : title}
        value={answer}
        actions={<ShareButton copied={st.copied} onClick={st.share} />}
        sentence={
          bad ? (
            <>Write fractions like 3/4, mixed numbers like 1 1/2 (whole number, space, fraction), whole numbers or decimals. A denominator cannot be 0.</>
          ) : result ? (
            <>
              {title} = <b>{mixedText(result)}</b>
              {result.d !== 1 && Math.abs(result.n) > result.d ? <> (or {show(result)} as an improper fraction)</> : null}. As a decimal that is <b>{expansion!.text}</b>
              {expansion!.terminates ? "" : ", where the digits in brackets repeat for ever"}, and as a percentage <b>{dec(value * 100)}%</b>.
            </>
          ) : (
            <>You cannot divide by zero, so there is no answer.</>
          )
        }
        badges={bad || !result ? undefined : [`Fraction ${show(result)}`, `Decimal ${dec(value)}`, `${dec(value * 100)}%`]}
      />

      {!bad && result && (
        <>
          <Facts
            items={[
              { label: "Simplest form", value: show(result) },
              { label: "Mixed number", value: mixedText(result) },
              { label: "Decimal", value: dec(value) },
              { label: "Percentage", value: `${dec(value * 100)}%` },
            ]}
          />
          <ResultCard title="The working" sub="Step by step, as you would write it out.">
            <ol style={{ margin: 0, paddingLeft: "1.4em", lineHeight: 1.6 }}>
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
              <li>
                <b>Answer: {mixedText(result)}</b>
              </li>
            </ol>
          </ResultCard>
          {!expansion!.terminates && (
            <Callout title="A repeating decimal">
              {show(result)} never ends as a decimal: {expansion!.text} means the digits in brackets repeat. The fraction is the exact answer; any decimal is
              rounded.
            </Callout>
          )}
        </>
      )}
      {!bad && !result && (
        <Callout tone="warn" title="Dividing by zero">
          Any number divided by 0 is undefined. Change the second fraction to something other than 0.
        </Callout>
      )}

      <Assumptions
        items={[
          { label: "Mixed numbers", value: "Whole number, a space, then the fraction" },
          { label: "Negative numbers", value: "A minus sign applies to the whole mixed number" },
          { label: "Decimals", value: `Shown to ${v.dp} decimal places` },
          { label: "Repeating digits", value: "Shown in brackets, e.g. 0.(3)" },
        ]}
      />
    </Studio>
  );
}

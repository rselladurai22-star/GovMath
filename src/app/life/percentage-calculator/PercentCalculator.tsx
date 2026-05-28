"use client";

import { useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import {
  addPercent,
  percentChange,
  percentOf,
  subtractPercent,
  whatPercent,
} from "@/lib/percentages";

type Mode = "of" | "what" | "change" | "add" | "subtract";

const NUM = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });
const PCT = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

const MODES: { v: Mode; label: string }[] = [
  { v: "of", label: "X% of Y" },
  { v: "what", label: "X is what % of Y" },
  { v: "change", label: "% change from X to Y" },
  { v: "add", label: "Add X% to Y" },
  { v: "subtract", label: "Subtract X% from Y" },
];

export default function PercentCalculator() {
  const [mode, setMode] = useState<Mode>("of");
  const [a, setA] = useState<number>(20);
  const [b, setB] = useState<number>(250);

  let resultLine = "";
  let extra: string | null = null;

  switch (mode) {
    case "of": {
      const v = percentOf(a, b);
      resultLine = `${PCT.format(a)}% of ${NUM.format(b)} = ${NUM.format(v)}`;
      break;
    }
    case "what": {
      const v = whatPercent(a, b);
      resultLine = `${NUM.format(a)} is ${PCT.format(v)}% of ${NUM.format(b)}`;
      break;
    }
    case "change": {
      const v = percentChange(a, b);
      const dir = v >= 0 ? "increase" : "decrease";
      resultLine = `${NUM.format(a)} → ${NUM.format(b)} is a ${PCT.format(Math.abs(v))}% ${dir}`;
      extra = v >= 0 ? `+${NUM.format(b - a)} added` : `${NUM.format(b - a)} removed`;
      break;
    }
    case "add": {
      const v = addPercent(b, a);
      resultLine = `${NUM.format(b)} + ${PCT.format(a)}% = ${NUM.format(v)}`;
      extra = `That’s +${NUM.format(v - b)} added`;
      break;
    }
    case "subtract": {
      const v = subtractPercent(b, a);
      resultLine = `${NUM.format(b)} − ${PCT.format(a)}% = ${NUM.format(v)}`;
      extra = `That’s −${NUM.format(b - v)} removed`;
      break;
    }
  }

  // Labels for the two inputs differ by mode.
  const [labelA, labelB] = labelsFor(mode);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              What do you want to work out?
            </label>
            <div className="grid gap-2">
              {MODES.map((m) => (
                <label
                  key={m.v}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer text-sm ${
                    mode === m.v
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={m.v}
                    checked={mode === m.v}
                    onChange={() => setMode(m.v)}
                    className="accent-primary"
                  />
                  {m.label}
                </label>
              ))}
            </div>
          </div>

          <NumberInput
            label={labelA}
            value={a}
            onChange={setA}
            step={1}
            prefix=""
          />
          <NumberInput
            label={labelB}
            value={b}
            onChange={setB}
            step={1}
            prefix=""
          />
        </div>

        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
            Result
          </p>
          <p className="text-2xl font-bold text-primary-dark leading-tight">
            {resultLine}
          </p>
          {extra && (
            <p className="text-sm text-text/70">{extra}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function labelsFor(mode: Mode): [string, string] {
  switch (mode) {
    case "of":
      return ["Percent (X)", "Of (Y)"];
    case "what":
      return ["Part (X)", "Whole (Y)"];
    case "change":
      return ["From (X)", "To (Y)"];
    case "add":
      return ["Percent to add (X)", "Starting value (Y)"];
    case "subtract":
      return ["Percent to subtract (X)", "Starting value (Y)"];
  }
}

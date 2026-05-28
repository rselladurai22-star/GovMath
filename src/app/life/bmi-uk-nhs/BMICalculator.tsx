"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import { bmi } from "@/lib/bmi";

const COLOR = {
  underweight: "bg-blue-50 border-blue-500 text-blue-900",
  healthy: "bg-emerald-50 border-emerald-500 text-emerald-900",
  overweight: "bg-amber-50 border-amber-500 text-amber-900",
  obese: "bg-rose-50 border-rose-500 text-rose-900",
} as const;

const LABEL = {
  underweight: "Underweight",
  healthy: "Healthy weight",
  overweight: "Overweight",
  obese: "Obese",
} as const;

export default function BMICalculator() {
  const [h, setH] = useState<number>(175);
  const [w, setW] = useState<number>(75);
  const [higherRisk, setHigherRisk] = useState<boolean>(false);
  const r = useMemo(() => bmi({ heightCm: h, weightKg: w, higherRiskBackground: higherRisk }), [h, w, higherRisk]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Height" value={h} onChange={setH} step={1} min={50} max={250} prefix="" suffix=" cm" />
          <NumberInput label="Weight" value={w} onChange={setW} step={0.5} min={20} max={300} prefix="" suffix=" kg" />
          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={higherRisk} onChange={(e) => setHigherRisk(e.target.checked)} className="mt-0.5 accent-primary" />
            <span>I have an Asian, Black African, Caribbean or Middle Eastern background <span className="block text-xs text-text/60">NHS uses lower thresholds (23/27.5) due to higher type 2 diabetes risk.</span></span>
          </label>
        </div>
        <div className={`rounded-xl border-2 p-6 space-y-4 ${COLOR[r.category]}`}>
          <p className="text-sm font-semibold uppercase tracking-wide opacity-70">Your BMI</p>
          <p className="text-5xl font-bold">{r.bmi.toFixed(1)}</p>
          <p className="text-xl font-semibold">{LABEL[r.category]}</p>
          <div className="border-t border-current/20 pt-3 text-xs space-y-1 opacity-90">
            <div>Underweight: &lt; 18.5</div>
            <div>Healthy: 18.5 – {r.thresholds.overweight}</div>
            <div>Overweight: {r.thresholds.overweight} – {r.thresholds.obese}</div>
            <div>Obese: ≥ {r.thresholds.obese}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

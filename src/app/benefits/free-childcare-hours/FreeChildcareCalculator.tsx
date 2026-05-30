"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { freeChildcare, type ChildAgeBand } from "@/lib/benefits/free-childcare";

const AGE_BANDS: { key: ChildAgeBand; label: string }[] = [
  { key: "under-9-months", label: "Under 9 months" },
  { key: "9-months-to-2", label: "9 months – 2 years" },
  { key: "3-to-4-year", label: "3 – 4 years" },
  { key: "5-plus", label: "5+ (school age)" },
];

export default function FreeChildcareCalculator() {
  const [childAge, setAge] = useState<ChildAgeBand>("3-to-4-year");
  const [parentWorking, setWorking] = useState<boolean>(true);
  const [lowIncomeFamily, setLowIncome] = useState<boolean>(false);
  const [hourlyRate, setRate] = useState<number>(8);
  const [stretchYear, setStretch] = useState<boolean>(false);

  const r = useMemo(
    () => freeChildcare({ childAge, parentWorking, lowIncomeFamily, hourlyRate, stretchYear }),
    [childAge, parentWorking, lowIncomeFamily, hourlyRate, stretchYear]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Child age</label>
            <select value={childAge} onChange={(e) => setAge(e.target.value as ChildAgeBand)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              {AGE_BANDS.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={parentWorking} onChange={(e) => setWorking(e.target.checked)} />
            <span>Both parents working (≥ £166/wk, &lt; £100k/yr)</span>
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={lowIncomeFamily} onChange={(e) => setLowIncome(e.target.checked)} />
            <span>Qualifying low-income benefits (UC, JSA, ESA, etc.)</span>
          </label>
          <NumberInput label="Nursery hourly rate" value={hourlyRate} onChange={setRate} step={0.5} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={stretchYear} onChange={(e) => setStretch(e.target.checked)} />
            <span>Stretch hours across all 51 weeks</span>
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Weekly funded hours</p>
          <p className="text-4xl font-bold text-primary-dark">
            {stretchYear ? r.weeklyStretchedHours.toFixed(1) : r.hoursPerWeek} hrs
          </p>
          <p className="text-xs text-text/60">{r.notes}</p>
          <ResultBreakdown
            title="Annual value"
            rows={[
              { label: "Funded hours / year", value: r.totalAnnualHours },
              { label: `× £${hourlyRate}/hr nursery rate`, value: r.annualValue, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

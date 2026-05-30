"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { benefitCap, type Household, type Location } from "@/lib/benefits/benefit-cap";

const HOUSEHOLDS: { key: Household; label: string }[] = [
  { key: "single-no-children", label: "Single, no children" },
  { key: "family", label: "Couple, or single parent with children" },
];

const LOCATIONS: { key: Location; label: string }[] = [
  { key: "elsewhere", label: "Outside Greater London" },
  { key: "london", label: "Inside Greater London" },
];

export default function BenefitCapCalculator() {
  const [household, setHousehold] = useState<Household>("family");
  const [location, setLocation] = useState<Location>("elsewhere");
  const [weeklyBenefits, setWeekly] = useState<number>(450);

  const r = useMemo(
    () => benefitCap({ household, location, weeklyBenefits }),
    [household, location, weeklyBenefits]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Household</label>
            <select
              value={household}
              onChange={(e) => setHousehold(e.target.value as Household)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {HOUSEHOLDS.map((h) => (
                <option key={h.key} value={h.key}>{h.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value as Location)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {LOCATIONS.map((l) => (
                <option key={l.key} value={l.key}>{l.label}</option>
              ))}
            </select>
          </div>
          <NumberInput label="Total weekly benefits" value={weeklyBenefits} onChange={setWeekly} step={10} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
            {r.capApplies ? "Weekly reduction" : "Below the cap"}
          </p>
          <p className={`text-4xl font-bold ${r.capApplies ? "text-error" : "text-success"}`}>
            {r.capApplies
              ? `−£${r.weeklyReduction.toFixed(2)}`
              : `£${(r.weeklyCap - r.weeklyBenefits).toFixed(2)} headroom`}
          </p>
          <p className="text-xs text-text/60">
            {r.capApplies
              ? `That’s £${r.annualReduction.toFixed(0)} a year less than you’d otherwise get.`
              : "No cap reduction applies."}
          </p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Annual cap", value: r.annualCap },
              { label: "Weekly cap", value: r.weeklyCap },
              { label: "Your weekly benefits", value: r.weeklyBenefits },
              { label: "Weekly reduction", value: r.weeklyReduction, variant: r.capApplies ? "deduction" : "default" },
              { label: "Annual reduction", value: r.annualReduction, variant: r.capApplies ? "total" : "default" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

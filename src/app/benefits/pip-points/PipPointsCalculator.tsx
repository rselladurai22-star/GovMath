"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { pipPoints } from "@/lib/benefits/pip-points";

const LABELS = { none: "No award", standard: "Standard rate", enhanced: "Enhanced rate" } as const;

export default function PipPointsCalculator() {
  const [dl, setDl] = useState<number>(8);
  const [mob, setMob] = useState<number>(8);
  const r = useMemo(() => pipPoints({ dailyLivingPoints: dl, mobilityPoints: mob }), [dl, mob]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Daily living points (0–24)" value={dl} onChange={setDl} step={1} min={0} max={24} prefix="" suffix=" pts" />
          <NumberInput label="Mobility points (0–24)" value={mob} onChange={setMob} step={1} min={0} max={24} prefix="" suffix=" pts" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Estimated weekly award</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.weeklyTotal.toFixed(2)}</p>
          <p className="text-xs text-text/60">≈ £{r.monthlyTotal.toFixed(0)}/month, £{r.annualTotal.toFixed(0)}/year.</p>
          <ResultBreakdown
            title="Components"
            rows={[
              { label: `Daily living: ${LABELS[r.dailyLivingAward]}`, value: r.dailyLivingAward === "none" ? 0 : r.dailyLivingAward === "standard" ? 73.90 : 110.40 },
              { label: `Mobility: ${LABELS[r.mobilityAward]}`, value: r.mobilityAward === "none" ? 0 : r.mobilityAward === "standard" ? 29.20 : 77.05 },
              { label: "Weekly total", value: r.weeklyTotal, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

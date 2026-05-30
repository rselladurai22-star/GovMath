"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { healthyStart } from "@/lib/healthy-start";

export default function HealthyStartCalculator() {
  const [pregnant, setPregnant] = useState<boolean>(true);
  const [u1, setU1] = useState<number>(0);
  const [c14, setC14] = useState<number>(1);
  const r = useMemo(() => healthyStart({ pregnant, childrenUnder1: u1, children1To4: c14 }), [pregnant, u1, c14]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={pregnant} onChange={(e) => setPregnant(e.target.checked)} />
            <span>Currently pregnant (10+ weeks)</span>
          </label>
          <NumberInput label="Children under 1" value={u1} onChange={setU1} step={1} min={0} max={5} prefix="" suffix="" />
          <NumberInput label="Children aged 1–4" value={c14} onChange={setC14} step={1} min={0} max={5} prefix="" suffix="" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Weekly value</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.weekly.toFixed(2)}</p>
          <p className="text-xs text-text/60">≈ £{r.monthly.toFixed(0)}/month, £{r.annual.toFixed(0)}/year.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              ...r.breakdown.map((b) => ({ label: b.label, value: b.amount })),
              { label: "Weekly total", value: r.weekly, variant: "total" as const },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

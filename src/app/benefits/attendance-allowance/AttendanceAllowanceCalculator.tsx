"use client";

import { useMemo, useState } from "react";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { attendanceAllowance } from "@/lib/benefits/attendance-allowance";

type CareNeeded = "none" | "day-only" | "night-only" | "day-and-night";

const CARE_OPTIONS: { key: CareNeeded; label: string }[] = [
  { key: "none", label: "No care or supervision needed" },
  { key: "day-only", label: "Help / supervision during the day only" },
  { key: "night-only", label: "Help / supervision during the night only" },
  { key: "day-and-night", label: "Help / supervision day AND night" },
];

export default function AttendanceAllowanceCalculator() {
  const [careNeeded, setCare] = useState<CareNeeded>("day-only");
  const [terminallyIll, setTerm] = useState<boolean>(false);

  const r = useMemo(() => attendanceAllowance({ careNeeded, terminallyIll }), [careNeeded, terminallyIll]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Care needs</label>
            <select value={careNeeded} onChange={(e) => setCare(e.target.value as CareNeeded)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              {CARE_OPTIONS.map((o) => <option key={o.key} value={o.key}>{o.label}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={terminallyIll} onChange={(e) => setTerm(e.target.checked)} />
            <span>Terminally ill (Special Rules SR1)</span>
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Weekly payment</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.weekly.toFixed(2)}</p>
          <p className="text-xs text-text/60">{r.notes}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Weekly", value: r.weekly },
              { label: "4-weekly (how DWP pays)", value: r.fourWeekly },
              { label: "Annual", value: r.annual, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

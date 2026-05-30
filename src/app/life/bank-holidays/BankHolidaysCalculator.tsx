"use client";

import { useMemo, useState } from "react";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { workingDaysBetween, type Nation } from "@/lib/bank-holidays";

const NATIONS: { key: Nation; label: string }[] = [
  { key: "england-and-wales", label: "England & Wales" },
  { key: "scotland", label: "Scotland" },
  { key: "northern-ireland", label: "Northern Ireland" },
];

export default function BankHolidaysCalculator() {
  const [start, setStart] = useState<string>("2025-04-14");
  const [end, setEnd] = useState<string>("2025-04-25");
  const [nation, setNation] = useState<Nation>("england-and-wales");

  const r = useMemo(
    () => workingDaysBetween({ start, end, nation }),
    [start, end, nation]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Start date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-1">End date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Nation</label>
            <select
              value={nation}
              onChange={(e) => setNation(e.target.value as Nation)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {NATIONS.map((n) => (
                <option key={n.key} value={n.key}>{n.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Working days</p>
          <p className="text-4xl font-bold text-primary-dark">{r.workingDays}</p>
          <p className="text-xs text-text/60">
            Out of {r.totalDays} calendar days in the range.
          </p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Total calendar days", value: r.totalDays },
              { label: "Weekend days", value: r.weekendDays },
              { label: "Bank holidays", value: r.bankHolidaysInRange.length },
              { label: "Working days", value: r.workingDays, variant: "total" },
            ]}
          />
          {r.bankHolidaysInRange.length > 0 && (
            <div className="text-xs text-text/70 pt-2">
              <strong>Bank holidays in range:</strong>
              <ul className="mt-1 space-y-0.5">
                {r.bankHolidaysInRange.map((d) => (
                  <li key={d}>· {d}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

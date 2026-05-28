"use client";

import { useMemo, useState } from "react";
import { daysBetween } from "@/lib/dates";

const NF = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function isoPlus(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export default function DaysBetweenCalculator() {
  const [start, setStart] = useState<string>(todayIso());
  const [end, setEnd] = useState<string>(isoPlus(90));

  const r = useMemo(() => {
    const a = new Date(start + "T00:00:00Z");
    const b = new Date(end + "T00:00:00Z");
    if (Number.isNaN(a.getTime()) || Number.isNaN(b.getTime())) return null;
    return daysBetween(a, b);
  }, [start, end]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Pick your dates</h2>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Start date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">End date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-border bg-white text-text focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <p className="text-xs text-text/60">
            Works in either order. Dates are treated as UTC midnight so DST changes don&rsquo;t affect the count.
          </p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          {r ? (
            <>
              <div>
                <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Days between</p>
                <p className="text-4xl font-bold text-primary-dark mt-1">{NF.format(r.exclusiveDays)} days</p>
                <p className="text-sm text-text/60 mt-1">{NF.format(r.inclusiveDays)} days inclusive of both ends</p>
              </div>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Cell label="Working days (Mon–Fri)" value={`${NF.format(r.workingDays)} days`} />
                <Cell label="Weeks" value={`${NF.format(r.weeks)} weeks`} />
                <Cell
                  label="Calendar breakdown"
                  value={`${r.years}y ${r.months}m ${r.days}d`}
                />
                <Cell label="In months (approx)" value={`${NF.format(r.exclusiveDays / 30.4375)} mo`} />
              </dl>
            </>
          ) : (
            <p className="text-sm text-text/60">Enter two valid dates to see the result.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-surface border border-border p-3">
      <p className="text-xs uppercase tracking-wide text-text/60">{label}</p>
      <p className="text-base font-semibold text-primary-dark mt-1">{value}</p>
    </div>
  );
}

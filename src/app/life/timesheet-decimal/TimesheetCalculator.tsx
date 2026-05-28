"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";

export default function TimesheetCalculator() {
  const [hh, setHh] = useState<number>(7);
  const [mm, setMm] = useState<number>(45);
  const decimal = useMemo(() => hh + mm / 60, [hh, mm]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Hours" value={hh} onChange={setHh} step={1} min={0} max={24} prefix="" suffix=" hrs" />
          <NumberInput label="Minutes" value={mm} onChange={(v) => setMm(Math.max(0, Math.min(59, v)))} step={5} min={0} max={59} prefix="" suffix=" min" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Decimal hours</p>
          <p className="text-5xl font-bold text-primary-dark">{decimal.toFixed(4)}</p>
          <div className="border-t border-border pt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-text/70">Hours</span><span className="font-medium">{hh}</span></div>
            <div className="flex justify-between"><span className="text-text/70">{mm} min ÷ 60</span><span className="font-medium">{(mm / 60).toFixed(4)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2 font-semibold"><span>{hh}h {mm}m =</span><span>{decimal.toFixed(2)} hrs</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

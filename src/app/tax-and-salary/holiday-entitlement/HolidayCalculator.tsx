"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import { holidayEntitlement } from "@/lib/benefits/holiday-entitlement";

export default function HolidayCalculator() {
  const [days, setDays] = useState<number>(5);
  const r = useMemo(() => holidayEntitlement({ daysPerWeek: days }), [days]);
  const raw = days * 5.6;
  const capped = raw > 28;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Days you work per week" value={days} onChange={setDays} step={0.5} min={0} max={7} prefix="" suffix=" days" />
          <p className="text-xs text-text/60">Statutory: 5.6 weeks × days worked (capped at 28 days for 5+ day weeks).</p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Statutory entitlement</p>
          <p className="text-4xl font-bold text-primary-dark">{r.annualDays.toFixed(1)} days/year</p>
          <p className="text-sm text-text/60">≈ {(r.annualDays / Math.max(days, 0.01)).toFixed(2)} weeks — bank holidays may or may not be included depending on your contract.</p>
          <div className="border-t border-border pt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-text/70">{days} days/wk × 5.6 weeks</span><span className="font-medium">{raw.toFixed(2)} days</span></div>
            {capped && <div className="flex justify-between text-text/70"><span>Statutory cap</span><span className="font-medium">28 days</span></div>}
            <div className="flex justify-between border-t border-border pt-2 mt-2 font-semibold"><span>Annual entitlement</span><span>{r.annualDays.toFixed(1)} days</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

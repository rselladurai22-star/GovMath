"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { checkMinimumWage, NMW_2025, type NMWBand } from "@/lib/benefits/minimum-wage";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

const BANDS: Array<{ value: NMWBand; label: string }> = [
  { value: "national-living-wage", label: "21+ (NLW)" },
  { value: "18-20", label: "18–20" },
  { value: "16-17", label: "16–17" },
  { value: "apprentice", label: "Apprentice" },
];

export default function MinWageCalculator() {
  const [band, setBand] = useState<NMWBand>("national-living-wage");
  const [pay, setPay] = useState<number>(11.5);
  const [hours, setHours] = useState<number>(37.5);
  const r = useMemo(() => checkMinimumWage({ band, hourlyPay: pay, hoursPerWeek: hours }), [band, pay, hours]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Age band</label>
            <div className="grid grid-cols-2 gap-2">
              {BANDS.map((b) => (
                <button key={b.value} type="button" onClick={() => setBand(b.value)} className={`rounded-md border px-3 py-2 text-sm ${band === b.value ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>
                  {b.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-text/60">Required: {GBP.format(NMW_2025[band].hourly)}/hr</p>
          </div>
          <NumberInput label="Your hourly pay" value={pay} onChange={setPay} step={0.25} />
          <NumberInput label="Hours per week" value={hours} onChange={setHours} step={0.5} prefix="" suffix=" hrs" />
        </div>
        <div className={`rounded-xl border-2 p-6 space-y-4 ${r.compliant ? "bg-emerald-50 border-emerald-500" : "bg-rose-50 border-rose-500"}`}>
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide opacity-70">{r.compliant ? "Compliant" : "Underpaid"}</p>
            <p className={`text-3xl font-bold mt-1 ${r.compliant ? "text-emerald-900" : "text-rose-900"}`}>
              {r.compliant ? "✓ At or above the minimum" : `Short by ${GBP.format(r.shortfallPerHour)}/hr`}
            </p>
          </div>
          {!r.compliant && (
            <ResultBreakdown
              title="Shortfall"
              rows={[
                { label: "Per hour", value: r.shortfallPerHour },
                { label: "Per week", value: r.weeklyShortfall },
                { label: "Annualised (52 wks)", value: r.annualShortfall, variant: "total" },
              ]}
            />
          )}
          {r.compliant && <p className="text-sm text-emerald-900/80">Effective annual gross pay: {GBP0.format(pay * hours * 52)}.</p>}
        </div>
      </div>
    </div>
  );
}

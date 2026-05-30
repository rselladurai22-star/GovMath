"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import { carersAllowanceCheck } from "@/lib/benefits/childcare-and-carers";

export default function CarersEarningsCalculator() {
  const [weekly, setWeekly] = useState<number>(150);
  const r = useMemo(() => carersAllowanceCheck(weekly), [weekly]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Weekly earnings (after tax, NI, allowable expenses)" value={weekly} onChange={setWeekly} step={5} />
          <p className="text-xs text-text/60">Earnings limit (2025/26): £196/week.</p>
        </div>
        <div className={`rounded-xl border-2 p-6 space-y-3 ${r.eligible ? "bg-emerald-50 border-emerald-500" : "bg-rose-50 border-rose-500"}`}>
          <p className={`text-sm font-semibold uppercase tracking-wide ${r.eligible ? "text-emerald-900" : "text-rose-900"}`}>{r.eligible ? "Eligible for Carer's Allowance" : "Over the earnings limit"}</p>
          <p className={`text-4xl font-bold ${r.eligible ? "text-emerald-900" : "text-rose-900"}`}>{r.eligible ? `£${r.weeklyPay.toFixed(2)}/wk` : `£${r.excess.toFixed(0)} over`}</p>
          <div className={`text-sm space-y-1 ${r.eligible ? "text-emerald-900" : "text-rose-900"}`}>
            <div className="flex justify-between"><span>Weekly earnings</span><span className="font-medium">£{weekly.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Earnings limit</span><span className="font-medium">£{r.earningsLimit.toFixed(2)}</span></div>
            {r.eligible && (
              <>
                <div className="flex justify-between"><span>Annual Carer’s Allowance</span><span className="font-medium">£{r.annualPay.toFixed(0)}</span></div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

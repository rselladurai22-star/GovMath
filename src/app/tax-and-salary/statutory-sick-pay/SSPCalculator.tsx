"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import { statutorySickPay, SSP_WEEKLY_2026 } from "@/lib/benefits/statutory-pay";

export default function SSPCalculator() {
  const [weeks, setWeeks] = useState<number>(4);
  const [awe, setAwe] = useState<number>(500);
  const r = useMemo(() => statutorySickPay(weeks, awe), [weeks, awe]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Average weekly earnings (before tax)" value={awe} onChange={setAwe} step={10} min={0} />
          <NumberInput label="Weeks off sick" value={weeks} onChange={setWeeks} step={1} min={0} max={28} prefix="" suffix=" wks" />
          <p className="text-xs text-text/60">From 6 April 2026 SSP is paid from your first day off sick, for up to 28 weeks. You get 80% of your average weekly earnings or £{SSP_WEEKLY_2026.toFixed(2)}, whichever is lower.</p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total SSP</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalSSP.toFixed(2)}</p>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-text/70">Weekly rate</span><span className="font-medium">£{r.weeklyRate.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-text/70">How it was worked out</span><span className="font-medium">{r.flatRateApplied ? "Flat weekly rate" : "80% of your earnings"}</span></div>
            <div className="flex justify-between"><span className="text-text/70">Weeks paid</span><span className="font-medium">{r.eligibleWeeks}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

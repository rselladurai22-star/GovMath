"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import { statutorySickPay } from "@/lib/benefits/statutory-pay";

export default function SSPCalculator() {
  const [weeks, setWeeks] = useState<number>(4);
  const r = useMemo(() => statutorySickPay(weeks), [weeks]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Weeks off sick (after 3 waiting days)" value={weeks} onChange={setWeeks} step={1} min={0} max={28} prefix="" suffix=" wks" />
          <p className="text-xs text-text/60">SSP is paid for up to 28 weeks. The first 3 days (‘waiting days’) are unpaid.</p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total SSP</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalSSP.toFixed(2)}</p>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-text/70">Weekly rate</span><span className="font-medium">£{r.weeklyRate.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-text/70">Eligible weeks</span><span className="font-medium">{r.eligibleWeeks}</span></div>
            <div className="flex justify-between"><span className="text-text/70">Waiting days</span><span className="font-medium">{r.waitingDays}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

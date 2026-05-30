"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { smallBusinessRates } from "@/lib/business/small-business-rates";

export default function SmallBusinessRatesCalculator() {
  const [rateableValue, setRv] = useState<number>(11000);
  const [onlyProperty, setOnly] = useState<boolean>(true);

  const r = useMemo(() => smallBusinessRates({ rateableValue, onlyProperty }), [rateableValue, onlyProperty]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Rateable value (VOA)" value={rateableValue} onChange={setRv} step={500} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={onlyProperty} onChange={(e) => setOnly(e.target.checked)} />
            <span>This is my only business property in England</span>
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Annual bill after relief</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.payable.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">
            {r.reliefPercent > 0 ? `Includes ${r.reliefPercent.toFixed(0)}% Small Business Rate Relief.` : "No SBRR applies."}
          </p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Multiplier (${(r.multiplier * 100).toFixed(1)}p)`, value: r.multiplier, hint: "Per £1 of rateable value" },
              { label: "Gross rates", value: r.grossRates },
              { label: `SBRR (${r.reliefPercent.toFixed(0)}%)`, value: r.reliefAmount, variant: r.reliefAmount > 0 ? "deduction" : "default" },
              { label: "Payable", value: r.payable, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

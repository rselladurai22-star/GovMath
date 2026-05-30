"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { sornRefund } from "@/lib/vehicles/sorn";

export default function SornCalculator() {
  const [annualVed, setVed] = useState<number>(190);
  const [monthsRemaining, setMonths] = useState<number>(7);
  const r = useMemo(() => sornRefund({ annualVed, monthsRemaining }), [annualVed, monthsRemaining]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual VED" value={annualVed} onChange={setVed} step={10} />
          <NumberInput label="Months left on current VED" value={monthsRemaining} onChange={setMonths} step={1} min={0} max={12} prefix="" suffix=" mo" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Estimated refund</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.refund.toFixed(2)}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Monthly VED rate", value: r.monthlyVed },
              { label: "Full months refunded", value: r.fullMonths },
              { label: "Refund cheque", value: r.refund, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

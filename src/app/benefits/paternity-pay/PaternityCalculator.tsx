"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { statutoryPaternityPay } from "@/lib/benefits/statutory-pay";

export default function PaternityCalculator() {
  const [awe, setAwe] = useState<number>(450);
  const r = useMemo(() => statutoryPaternityPay(awe), [awe]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Average weekly earnings" value={awe} onChange={setAwe} step={10} />
          <p className="text-xs text-text/60">SPP is the lower of £187.18 or 90% of average weekly earnings.</p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total paternity pay (2 weeks)</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalSPP.toLocaleString("en-GB", { maximumFractionDigits: 2 })}</p>
          <p className="text-xs text-text/60">{r.flatRateApplied ? "Capped at SPP flat rate" : "90% of your earnings"}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Weekly SPP", value: r.weeklyPay, hint: `Paid for ${r.weeks} weeks` },
              { label: "Total SPP", value: r.totalSPP, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

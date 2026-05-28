"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { taxFreeChildcare } from "@/lib/benefits/childcare-and-carers";

export default function ChildcareCalculator() {
  const [annualSpend, setAnnualSpend] = useState<number>(6000);
  const [disabled, setDisabled] = useState<boolean>(false);
  const r = useMemo(() => taxFreeChildcare(annualSpend, disabled), [annualSpend, disabled]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual childcare spend" value={annualSpend} onChange={setAnnualSpend} step={250} />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} className="h-4 w-4 rounded border-border" />
            Disabled child (£4,000 cap)
          </label>
        </div>
        <div className="rounded-xl bg-emerald-50 border-2 border-emerald-500 p-6 space-y-3">
          <p className="text-sm font-semibold text-emerald-900 uppercase tracking-wide">Government top-up</p>
          <p className="text-4xl font-bold text-emerald-900">£{r.govTopUp.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          {r.atCap && <p className="text-xs text-emerald-900/80">At the annual cap.</p>}
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "You pay", value: r.parentPays },
              { label: "Government adds (25%)", value: r.govTopUp },
              { label: "Total childcare paid", value: r.parentPays + r.govTopUp, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

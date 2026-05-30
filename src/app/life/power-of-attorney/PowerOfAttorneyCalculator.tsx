"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { lpaFees } from "@/lib/lpa-fees";

type Remission = "none" | "half" | "full";

export default function PowerOfAttorneyCalculator() {
  const [count, setCount] = useState<number>(4);
  const [remission, setRemission] = useState<Remission>("none");
  const r = useMemo(() => lpaFees({ numberOfLpas: count, remission }), [count, remission]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Number of LPAs to register" value={count} onChange={setCount} step={1} min={1} max={8} prefix="" suffix="" />
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Fee status</label>
            <select value={remission} onChange={(e) => setRemission(e.target.value as Remission)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <option value="none">Standard (full fee)</option>
              <option value="half">50% remission (gross income &lt; £12,000)</option>
              <option value="full">100% exemption (UC, IS, JSA, ESA, etc.)</option>
            </select>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total payable to OPG</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.payable.toFixed(2)}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Standard fee (${count} × £82)`, value: r.standardFee },
              { label: "Remission/exemption", value: r.discount, variant: "deduction" },
              { label: "Payable", value: r.payable, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

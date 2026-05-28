"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { scottishIncomeTax, scottishVsRukDifference } from "@/lib/tax/scottish-2025-26";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function ScottishCalculator() {
  const [salary, setSalary] = useState<number>(45_000);
  const r = useMemo(() => scottishIncomeTax(salary), [salary]);
  const diff = useMemo(() => scottishVsRukDifference(salary), [salary]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your income</h2>
          <NumberInput label="Gross annual salary" value={salary} onChange={setSalary} step={500} />
          <p className="text-xs text-text/60">
            Scotland uses a 6-band Income Tax system, distinct from the rest of the UK. Personal Allowance is still £12,570.
          </p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Scottish Income Tax</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.total)}</p>
            <p className="text-sm text-text/60 mt-1">
              {diff === 0
                ? "Same as the rest of the UK at this income"
                : diff > 0
                ? `${GBP0.format(diff)} more than rUK`
                : `${GBP0.format(-diff)} less than rUK`}
            </p>
          </div>
          <ResultBreakdown
            title="Band-by-band breakdown"
            rows={[
              { label: "Personal Allowance (0%)", value: r.personalAllowance },
              { label: "Starter rate 19%", value: r.starter },
              { label: "Basic rate 20%", value: r.basic },
              { label: "Intermediate 21%", value: r.intermediate },
              { label: "Higher 42%", value: r.higher },
              { label: "Advanced 45%", value: r.advanced },
              { label: "Top 48%", value: r.top },
              { label: "Total Income Tax", value: r.total, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { childBenefit } from "@/lib/benefits/child-benefit";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function ChildBenefitCalculator() {
  const [children, setChildren] = useState<number>(2);
  const r = useMemo(() => childBenefit(children), [children]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Number of children" value={children} onChange={setChildren} min={0} max={15} step={1} prefix="" />
          <p className="text-xs text-text/60">
            Children under 16, or under 20 in approved education/training.
          </p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">You receive</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP.format(r.weekly)}<span className="text-base text-text/60">/week</span></p>
            <p className="text-sm text-text/60 mt-1">{GBP0.format(r.annual)} per year (paid every 4 weeks)</p>
          </div>
          <ResultBreakdown
            title="Annual breakdown"
            rows={[
              { label: "Weekly", value: r.weekly },
              { label: "Monthly equivalent", value: r.monthly },
              { label: "Annual total", value: r.annual, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

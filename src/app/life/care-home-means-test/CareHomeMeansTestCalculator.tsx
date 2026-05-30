"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { careHomeMeansTest } from "@/lib/care-home-means";

export default function CareHomeMeansTestCalculator() {
  const [capital, setCapital] = useState<number>(18000);
  const [weeklyIncome, setIncome] = useState<number>(220);
  const [weeklyCareCost, setCost] = useState<number>(900);

  const r = useMemo(() => careHomeMeansTest({ capital, weeklyIncome, weeklyCareCost }), [capital, weeklyIncome, weeklyCareCost]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Capital (savings + investments)" value={capital} onChange={setCapital} step={1000} />
          <NumberInput label="Weekly income" value={weeklyIncome} onChange={setIncome} step={10} />
          <NumberInput label="Weekly care home cost" value={weeklyCareCost} onChange={setCost} step={50} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Your weekly share</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.yourContribution.toFixed(2)}</p>
          <p className="text-xs text-text/60">{r.notes}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Weekly care cost", value: weeklyCareCost },
              { label: "Tariff income (from capital)", value: r.tariffIncome, hint: "£1/wk per £250 above £14,250" },
              { label: "Your contribution", value: r.yourContribution, variant: "total" },
              { label: "Council pays", value: r.councilContribution },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

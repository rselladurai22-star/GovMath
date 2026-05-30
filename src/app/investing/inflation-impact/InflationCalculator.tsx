"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { inflationImpact } from "@/lib/inflation";

export default function InflationCalculator() {
  const [present, setPresent] = useState<number>(10000);
  const [years, setYears] = useState<number>(10);
  const [nominal, setNominal] = useState<number>(5);
  const [inflation, setInflation] = useState<number>(3);

  const r = useMemo(() => inflationImpact(present, years, nominal, inflation), [present, years, nominal, inflation]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Present amount" value={present} onChange={setPresent} step={500} />
          <NumberInput label="Years" value={years} onChange={setYears} step={1} min={1} max={60} prefix="" suffix=" yrs" />
          <NumberInput label="Nominal return rate" value={nominal} onChange={setNominal} step={0.25} prefix="" suffix=" %" />
          <NumberInput label="Inflation rate" value={inflation} onChange={setInflation} step={0.25} prefix="" suffix=" %" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">In today’s money</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.realFuture.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">Purchasing-power loss: {r.purchasingPowerLossPct.toFixed(1)}%</p>
          <ResultBreakdown
            title="Future-value breakdown"
            rows={[
              { label: "Today’s amount", value: present },
              { label: `Nominal future value (${nominal}% × ${years}y)`, value: r.nominalFuture },
              { label: `Real value (after ${inflation}% inflation)`, value: r.realFuture, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

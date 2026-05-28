"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function PensionReliefCalculator() {
  const [grossContribution, setGrossContribution] = useState<number>(6000);
  const [marginalRate, setMarginalRate] = useState<number>(40);
  const r = useMemo(() => {
    const basicReliefPct = 20; // automatic
    const basicRelief = grossContribution * (basicReliefPct / 100);
    const yourPayment = grossContribution - basicRelief;
    const extraHigherRate = marginalRate > 20 ? grossContribution * ((marginalRate - basicReliefPct) / 100) : 0;
    const totalReliefValue = basicRelief + extraHigherRate;
    const netCost = grossContribution - totalReliefValue;
    return { basicRelief, yourPayment, extraHigherRate, totalReliefValue, netCost };
  }, [grossContribution, marginalRate]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Gross pension contribution" value={grossContribution} onChange={setGrossContribution} step={500} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Your marginal Income Tax rate</label>
            <div className="grid grid-cols-3 gap-2">
              {[20, 40, 45].map((rate) => (
                <button key={rate} type="button" onClick={() => setMarginalRate(rate)} className={`rounded-md border px-3 py-2 text-sm ${marginalRate === rate ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{rate}%</button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Net cost to you</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.netCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">For £{grossContribution.toLocaleString()} in your pension.</p>
          <ResultBreakdown
            title="Tax relief breakdown"
            rows={[
              { label: "Gross contribution", value: grossContribution },
              { label: "Basic-rate relief (auto, into pot)", value: r.basicRelief },
              ...(r.extraHigherRate > 0 ? [{ label: "Extra relief via Self Assessment", value: r.extraHigherRate, hint: "Refunded into your bank or via tax code" }] : []),
              { label: "Net cost", value: r.netCost, variant: "total" as const },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

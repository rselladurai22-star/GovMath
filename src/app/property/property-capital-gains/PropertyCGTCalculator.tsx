"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { capitalGainsTax } from "@/lib/tax/cgt";

export default function PropertyCGTCalculator() {
  const [salePrice, setSalePrice] = useState<number>(350_000);
  const [purchasePrice, setPurchasePrice] = useState<number>(220_000);
  const [costs, setCosts] = useState<number>(15_000);
  const [income, setIncome] = useState<number>(40_000);
  const r = useMemo(() => {
    const gain = Math.max(0, salePrice - purchasePrice - costs);
    return { gain, ...capitalGainsTax({ gain, taxableIncome: income, assetType: "property" }) };
  }, [salePrice, purchasePrice, costs, income]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Sale price" value={salePrice} onChange={setSalePrice} step={5000} />
          <NumberInput label="Original purchase price" value={purchasePrice} onChange={setPurchasePrice} step={5000} />
          <NumberInput label="Allowable costs (legal, improvements, agent)" value={costs} onChange={setCosts} step={500} />
          <NumberInput label="Your other taxable income (after PA)" value={income} onChange={setIncome} step={1000} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">CGT due</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">Effective rate {(r.effectiveRate * 100).toFixed(1)}% on the taxable gain.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Gross gain", value: r.gain },
              { label: "Annual exempt amount", value: 3000, variant: "deduction" },
              { label: "Taxable gain", value: r.taxableGain },
              { label: "Basic-rate portion @ 18%", value: r.taxAtBasic },
              { label: "Higher-rate portion @ 24%", value: r.taxAtHigher },
              { label: "Total CGT", value: r.totalTax, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

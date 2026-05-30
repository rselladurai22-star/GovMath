"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { premiumBonds, DEFAULT_PRIZE_RATE } from "@/lib/investing/premium-bonds";

export default function PremiumBondsCalculator() {
  const [holding, setHolding] = useState<number>(25_000);
  const [ratePct, setRatePct] = useState<number>(DEFAULT_PRIZE_RATE * 100);
  const [years, setYears] = useState<number>(5);

  const r = useMemo(
    () => premiumBonds({ holding, prizeFundRate: ratePct / 100, years }),
    [holding, ratePct, years]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Premium Bonds holding" value={holding} onChange={setHolding} step={1000} min={25} max={50000} />
          <NumberInput label="Prize fund rate" value={ratePct} onChange={setRatePct} step={0.05} min={0} max={20} prefix="" suffix=" %" />
          <NumberInput label="Years" value={years} onChange={setYears} step={1} min={1} max={50} prefix="" suffix=" yrs" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Expected annual prizes</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.expectedAnnualPrizes.toFixed(0)}</p>
          <p className="text-xs text-text/60">≈ £{r.expectedMonthlyPrizes.toFixed(0)}/month average — actual wins vary widely.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Holding", value: r.holding },
              { label: "Expected annual prizes", value: r.expectedAnnualPrizes },
              { label: `Total over ${years} year(s)`, value: r.expectedTotal, variant: "total" },
            ]}
          />
          <ResultBreakdown
            title="Equivalent taxable yield"
            rows={[
              { label: "Basic rate (20%) equivalent", value: r.basicRateEquivalent * 100, hint: "% gross interest needed elsewhere" },
              { label: "Higher rate (40%) equivalent", value: r.higherRateEquivalent * 100, hint: "% gross interest needed elsewhere" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

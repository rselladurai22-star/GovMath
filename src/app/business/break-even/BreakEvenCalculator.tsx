"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { breakEven } from "@/lib/business/margins";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function BreakEvenCalculator() {
  const [fixed, setFixed] = useState<number>(30_000);
  const [price, setPrice] = useState<number>(25);
  const [varCost, setVarCost] = useState<number>(10);
  const r = useMemo(() => breakEven({ fixedCosts: fixed, pricePerUnit: price, variableCostPerUnit: varCost }), [fixed, price, varCost]);
  const valid = Number.isFinite(r.units);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Fixed costs / year" value={fixed} onChange={setFixed} step={1000} hint="Rent, salaries, insurance — costs that don&rsquo;t change with units sold." />
          <NumberInput label="Price per unit" value={price} onChange={setPrice} step={1} />
          <NumberInput label="Variable cost per unit" value={varCost} onChange={setVarCost} step={1} hint="Direct materials, packaging, shipping — costs that scale with each sale." />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          {valid ? (
            <>
              <div>
                <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Break-even units</p>
                <p className="text-4xl font-bold text-primary-dark mt-1">{Math.ceil(r.units).toLocaleString()} units/year</p>
                <p className="text-sm text-text/60 mt-1">≈ {Math.ceil(r.units / 12).toLocaleString()}/month at {GBP.format(r.revenue)} annual revenue</p>
              </div>
              <ResultBreakdown
                title="Breakdown"
                rows={[
                  { label: "Contribution per unit", value: r.contributionPerUnit, hint: `Price − variable cost` },
                  { label: "Fixed costs to cover", value: fixed },
                  { label: "Break-even revenue", value: r.revenue, variant: "total" },
                ]}
              />
            </>
          ) : (
            <p className="text-rose-700 bg-rose-50 border border-rose-200 rounded p-4 text-sm">
              Variable cost is ≥ price per unit — you lose money on every sale. Increase price or reduce variable cost.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

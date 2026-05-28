"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { margin } from "@/lib/business/margins";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
const PCT = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export default function MarginCalculator() {
  const [cost, setCost] = useState<number>(40);
  const [price, setPrice] = useState<number>(100);
  const r = useMemo(() => margin(cost, price), [cost, price]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Cost (COGS)" value={cost} onChange={setCost} step={1} />
          <NumberInput label="Selling price (ex-VAT)" value={price} onChange={setPrice} step={1} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Gross margin</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{PCT.format(r.marginPct)}</p>
            <p className="text-sm text-text/60 mt-1">Profit per unit: {GBP.format(r.profit)} · Markup: {PCT.format(r.markupPct)}</p>
          </div>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Selling price", value: price },
              { label: "Cost", value: cost, variant: "deduction" },
              { label: "Gross profit", value: r.profit, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

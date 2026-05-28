"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import { priceFromMargin, priceFromMarkup } from "@/lib/business/margins";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

export default function MarkupCalculator() {
  const [cost, setCost] = useState<number>(25);
  const [target, setTarget] = useState<number>(50);
  const [mode, setMode] = useState<"margin" | "markup">("margin");
  const result = useMemo(() => {
    return mode === "margin" ? priceFromMargin(cost, target / 100) : priceFromMarkup(cost, target / 100);
  }, [cost, target, mode]);
  const profit = result - cost;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Cost (COGS)" value={cost} onChange={setCost} step={1} />
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Target type</label>
            <div className="grid grid-cols-2 gap-2">
              {(["margin", "markup"] as const).map((m) => (
                <button key={m} type="button" onClick={() => setMode(m)} className={`rounded-md border px-3 py-2 text-sm ${mode === m ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>
                  Target {m}
                </button>
              ))}
            </div>
          </div>
          <NumberInput label={`Target ${mode} %`} value={target} onChange={setTarget} step={1} min={0} max={mode === "margin" ? 99 : 1000} prefix="" suffix=" %" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Required selling price</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP.format(result)}</p>
            <p className="text-sm text-text/60 mt-1">Profit per unit: {GBP.format(profit)}</p>
          </div>
          <p className="text-xs text-text/60 bg-blue-50 border border-blue-200 rounded p-3">
            Tip: a 50% margin requires a 100% markup — and a 50% markup is only a 33% margin. Always specify which.
          </p>
        </div>
      </div>
    </div>
  );
}

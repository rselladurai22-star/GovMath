"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { ltt } from "@/lib/tax/regional-stamp-duty";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function LTTCalculator() {
  const [price, setPrice] = useState<number>(280_000);
  const [higher, setHigher] = useState<boolean>(false);
  const r = useMemo(() => ltt(price, higher), [price, higher]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Property price" value={price} onChange={setPrice} step={5000} />
          <label className="flex items-center gap-3 cursor-pointer text-sm">
            <input type="checkbox" checked={higher} onChange={(e) => setHigher(e.target.checked)} className="accent-primary" />
            <span><span className="font-semibold">Additional / second property</span> — adds +5% to every band (Higher Residential Rates).</span>
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">LTT due</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.total)}</p>
            <p className="text-sm text-text/60 mt-1">Effective {(r.effectiveRate * 100).toFixed(2)}%</p>
          </div>
          <ResultBreakdown title="Band by band" rows={r.breakdown.map((b) => ({ label: `${b.band} @ ${(b.rate * 100).toFixed(2)}%`, value: b.tax }))} />
        </div>
      </div>
    </div>
  );
}

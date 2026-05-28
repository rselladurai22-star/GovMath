"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { lbtt, type RegionalBuyer } from "@/lib/tax/regional-stamp-duty";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

const BUYERS: { v: RegionalBuyer; label: string }[] = [
  { v: "standard", label: "Standard buyer" },
  { v: "first-time", label: "First-time buyer (nil rate to £175k)" },
  { v: "additional", label: "Additional / second property (+8% ADS)" },
];

export default function LBTTCalculator() {
  const [price, setPrice] = useState<number>(280_000);
  const [buyer, setBuyer] = useState<RegionalBuyer>("standard");
  const r = useMemo(() => lbtt(price, buyer), [price, buyer]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Property price" value={price} onChange={setPrice} step={5000} />
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Buyer type</label>
            <div className="grid gap-2">
              {BUYERS.map((b) => (
                <label key={b.v} className={`flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer text-sm ${buyer === b.v ? "border-primary bg-primary/5" : "border-border bg-white"}`}>
                  <input type="radio" name="buyer" checked={buyer === b.v} onChange={() => setBuyer(b.v)} className="accent-primary" />
                  {b.label}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">LBTT due</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.total)}</p>
            <p className="text-sm text-text/60 mt-1">Effective {(r.effectiveRate * 100).toFixed(2)}% of price</p>
          </div>
          <ResultBreakdown title="Band by band" rows={r.breakdown.map((b) => ({ label: `${b.band} @ ${(b.rate * 100).toFixed(1)}%`, value: b.tax }))} />
        </div>
      </div>
    </div>
  );
}

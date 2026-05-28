"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { stampDuty } from "@/lib/tax/sdlt-2025";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function FTBCalculator() {
  const [price, setPrice] = useState<number>(350_000);
  const ftb = useMemo(() => stampDuty(price, "first-time"), [price]);
  const std = useMemo(() => stampDuty(price, "standard"), [price]);
  const saving = std.total - ftb.total;
  const reliefAvailable = price <= 500_000;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Property price" value={price} onChange={setPrice} step={5000} hint="Relief is fully lost above £500,000." />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">SDLT as a first-time buyer</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(ftb.total)}</p>
            {reliefAvailable ? (
              <p className="text-sm text-success mt-1">Saving vs standard buyer: {GBP0.format(saving)}</p>
            ) : (
              <p className="text-sm text-error mt-1">Price exceeds £500,000 — no FTB relief, full SDLT applies.</p>
            )}
          </div>
          <ResultBreakdown
            title="First-time buyer breakdown"
            rows={[
              { label: "Price", value: price },
              { label: "FTB SDLT", value: ftb.total },
              { label: "Standard SDLT (for comparison)", value: std.total },
              { label: "Your saving", value: saving, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

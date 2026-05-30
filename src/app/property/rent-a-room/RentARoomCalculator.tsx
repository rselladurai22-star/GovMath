"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { rentARoom } from "@/lib/property/discounts";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function RentARoomCalculator() {
  const [rent, setRent] = useState<number>(9000);
  const r = useMemo(() => rentARoom(rent), [rent]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual rent from lodger" value={rent} onChange={setRent} step={250} hint="Gross rent received in the tax year (incl. bills paid by lodger)." />
        </div>
        <div className={`rounded-xl border-2 p-6 space-y-4 ${r.underAllowance ? "bg-emerald-50 border-emerald-500" : "bg-white border-primary"}`}>
          {r.underAllowance ? (
            <>
              <p className="text-sm font-semibold uppercase tracking-wide opacity-70">Tax-free</p>
              <p className="text-3xl font-bold text-emerald-900">✓ Under the £7,500 allowance</p>
              <p className="text-sm text-emerald-900/80">No tax to pay and you don’t need to declare it (unless you fill in Self Assessment for other reasons).</p>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Taxable income</p>
                <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.taxableAmount)}</p>
                <p className="text-sm text-text/60 mt-1">After deducting the £7,500 Rent-a-Room allowance</p>
              </div>
              <ResultBreakdown
                title="Calculation"
                rows={[
                  { label: "Gross rent", value: rent },
                  { label: "Rent-a-Room allowance", value: 7500, variant: "deduction" },
                  { label: "Taxable", value: r.taxableAmount, variant: "total" },
                ]}
              />
              <p className="text-xs text-text/60">Add to your other income — taxed at your marginal rate. Declare via Self Assessment.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

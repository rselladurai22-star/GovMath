"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { singlePersonDiscount } from "@/lib/property/discounts";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

export default function SPDCalculator() {
  const [bill, setBill] = useState<number>(2200);
  const r = useMemo(() => singlePersonDiscount(bill), [bill]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Full annual Council Tax bill" value={bill} onChange={setBill} step={50} hint="Before any discount. Check your latest bill or your council’s website." />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">You’d pay</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP.format(r.payable)}</p>
            <p className="text-sm text-text/60 mt-1">Save {GBP.format(r.monthlySaving)}/mo (Apr–Jan, 10 instalments)</p>
          </div>
          <ResultBreakdown
            title="25% Single Person Discount"
            rows={[
              { label: "Full bill", value: bill },
              { label: "25% discount", value: r.discount, variant: "deduction" },
              { label: "Annual payable", value: r.payable, variant: "total" },
            ]}
          />
          <p className="text-xs text-text/60 bg-blue-50 border border-blue-200 rounded p-3">Apply via your local council’s website. Discount applies from the date you become the only adult — backdate if you missed it.</p>
        </div>
      </div>
    </div>
  );
}

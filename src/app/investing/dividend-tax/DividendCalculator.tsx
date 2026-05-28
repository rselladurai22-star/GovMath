"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { dividendTax } from "@/lib/tax/dividend";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function DividendCalculator() {
  const [salary, setSalary] = useState<number>(30_000);
  const [dividends, setDividends] = useState<number>(10_000);
  const r = useMemo(() => dividendTax(salary, dividends), [salary, dividends]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your income</h2>
          <NumberInput label="Other taxable income (salary, pension, etc.)" value={salary} onChange={setSalary} step={500} />
          <NumberInput label="Dividends received" value={dividends} onChange={setDividends} step={500} />
          <p className="text-xs text-text/60">
            Dividends sit on top of your other income. The £500 dividend allowance is tax-free; everything above is taxed at the band the dividend falls into.
          </p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total dividend tax</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.total)}</p>
            <p className="text-sm text-text/60 mt-1">
              of {GBP0.format(dividends)} dividends ({dividends > 0 ? ((r.total / dividends) * 100).toFixed(1) : "0"}% effective)
            </p>
          </div>
          <ResultBreakdown
            title="Dividend tax breakdown"
            rows={[
              { label: "Used by Personal Allowance (0%)", value: r.paUsedByDividends },
              { label: "Used by £500 dividend allowance (0%)", value: r.allowanceUsed },
              { label: "Taxed at basic 8.75%", value: r.basic },
              { label: "Taxed at higher 33.75%", value: r.higher },
              { label: "Taxed at additional 39.35%", value: r.additional },
              { label: "Total dividend tax", value: r.total, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

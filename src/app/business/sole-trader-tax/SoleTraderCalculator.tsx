"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { soleTraderTax } from "@/lib/tax/sole-trader";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function SoleTraderCalculator() {
  const [profit, setProfit] = useState<number>(40_000);
  const r = useMemo(() => soleTraderTax(profit), [profit]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your trading profit</h2>
          <NumberInput
            label="Annual profit (after expenses)"
            value={profit}
            onChange={setProfit}
            step={500}
            hint="Income from self-employment minus allowable expenses. Not your turnover."
          />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total tax + NI</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.totalTax)}</p>
            <p className="text-sm text-text/60 mt-1">
              {(r.effectiveRate * 100).toFixed(1)}% effective rate · {GBP0.format(r.netProfit)} take-home
            </p>
          </div>
          <ResultBreakdown
            title="Self-Assessment breakdown"
            rows={[
              { label: "Gross profit", value: r.profit, variant: "total" },
              { label: "Income Tax", value: r.incomeTax, variant: "deduction" },
              { label: "Class 4 NI (6% / 2%)", value: r.class4NI, variant: "deduction" },
              { label: "Net profit (take-home)", value: r.netProfit, variant: "total" },
            ]}
          />
          {r.getsAutomaticNICredit ? (
            <p className="text-xs bg-success/10 border border-success/30 text-text rounded-md p-3">
              ✓ Profits above the £6,725 Small Profits Threshold — you receive a Class 2 NI credit toward State Pension automatically.
            </p>
          ) : (
            <p className="text-xs bg-error/10 border border-error/30 text-error rounded-md p-3">
              ⚠ Profits below £6,725 — no automatic State Pension credit. Consider voluntary Class 2 (£3.45/wk) to protect future entitlement.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

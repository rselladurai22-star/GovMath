"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { corporationTax, CORP_TAX_2025_26 } from "@/lib/tax/salary-dividend";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const PCT = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export default function CorpTaxCalculator() {
  const [profit, setProfit] = useState<number>(80_000);
  const ct = useMemo(() => corporationTax(profit), [profit]);
  const effective = profit > 0 ? ct / profit : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Annual profit</h2>
          <NumberInput label="Taxable profit" value={profit} onChange={setProfit} step={5000} hint="After deductible expenses, salary and pension contributions." />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Corporation Tax</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(ct)}</p>
            <p className="text-sm text-text/60 mt-1">Effective {PCT.format(effective)} on profit</p>
          </div>
          <ResultBreakdown
            title="How the rate is applied"
            rows={[
              { label: "Pre-tax profit", value: profit },
              { label: profit <= CORP_TAX_2025_26.smallProfitsLimit ? "Small profits rate 19%" : profit >= CORP_TAX_2025_26.upperLimit ? "Main rate 25%" : "19% + marginal 26.5%", value: ct, variant: "deduction" },
              { label: "Profit after CT", value: profit - ct, variant: "total" },
            ]}
          />
          <p className="text-xs text-text/60">
            Profits up to £50,000 pay 19%. £50,000–£250,000 sits in the marginal-relief band (effective 26.5%). £250,000+ pays the full 25%.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function BTLYieldCalculator() {
  const [price, setPrice] = useState<number>(250_000);
  const [monthlyRent, setMonthlyRent] = useState<number>(1300);
  const [annualCosts, setAnnualCosts] = useState<number>(2500);
  const r = useMemo(() => {
    const grossAnnualRent = monthlyRent * 12;
    const grossYield = price > 0 ? (grossAnnualRent / price) * 100 : 0;
    const netYield = price > 0 ? ((grossAnnualRent - annualCosts) / price) * 100 : 0;
    return { grossAnnualRent, grossYield, netYield, netAnnualIncome: grossAnnualRent - annualCosts };
  }, [price, monthlyRent, annualCosts]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Property price" value={price} onChange={setPrice} step={5000} />
          <NumberInput label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} step={50} />
          <NumberInput label="Annual costs (insurance, mgmt, maintenance, void)" value={annualCosts} onChange={setAnnualCosts} step={250} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-text/70 uppercase">Gross yield</p>
              <p className="text-3xl font-bold text-primary-dark">{r.grossYield.toFixed(2)}%</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-text/70 uppercase">Net yield</p>
              <p className="text-3xl font-bold text-primary-dark">{r.netYield.toFixed(2)}%</p>
            </div>
          </div>
          <ResultBreakdown
            title="Annual numbers"
            rows={[
              { label: "Gross rent (12 × monthly)", value: r.grossAnnualRent },
              { label: "Running costs", value: annualCosts, variant: "deduction" },
              { label: "Net rental income", value: r.netAnnualIncome, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

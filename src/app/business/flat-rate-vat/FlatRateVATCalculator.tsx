"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function FlatRateVATCalculator() {
  const [grossTurnover, setGrossTurnover] = useState<number>(80_000);
  const [frsRate, setFrsRate] = useState<number>(14.5);
  const [inputVAT, setInputVAT] = useState<number>(3000);
  const r = useMemo(() => {
    const standardVATCollected = (grossTurnover / 1.2) * 0.2;
    const standardNet = standardVATCollected - inputVAT;
    const frsVATDue = grossTurnover * (frsRate / 100);
    const difference = standardNet - frsVATDue;
    return { standardVATCollected, standardNet, frsVATDue, difference };
  }, [grossTurnover, frsRate, inputVAT]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual VAT-inclusive turnover" value={grossTurnover} onChange={setGrossTurnover} step={1000} />
          <NumberInput label="Your industry’s flat rate" value={frsRate} onChange={setFrsRate} step={0.5} prefix="" suffix=" %" />
          <NumberInput label="Annual input VAT (standard scheme)" value={inputVAT} onChange={setInputVAT} step={100} />
        </div>
        <div className={`rounded-xl border-2 p-6 space-y-3 ${r.difference > 0 ? "bg-emerald-50 border-emerald-500" : "bg-amber-50 border-amber-500"}`}>
          <p className="text-sm font-semibold uppercase tracking-wide opacity-70">{r.difference > 0 ? "Flat Rate saves you" : "Standard scheme is better by"}</p>
          <p className="text-4xl font-bold">£{Math.abs(r.difference).toLocaleString("en-GB", { maximumFractionDigits: 0 })}/yr</p>
          <ResultBreakdown
            title="Side-by-side"
            rows={[
              { label: "Standard: VAT collected", value: r.standardVATCollected },
              { label: "Standard: less input VAT", value: r.standardNet, variant: "total" },
              { label: "FRS: % of gross turnover", value: r.frsVATDue, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

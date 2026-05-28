"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { mortgageOverpayment } from "@/lib/property/overpayment";

export default function OverpaymentCalculator() {
  const [balance, setBalance] = useState<number>(200_000);
  const [rate, setRate] = useState<number>(5);
  const [years, setYears] = useState<number>(25);
  const [monthlyOver, setMonthlyOver] = useState<number>(200);
  const [lump, setLump] = useState<number>(0);
  const r = useMemo(() => mortgageOverpayment({ balance, annualRatePct: rate, remainingYears: years, monthlyOverpayment: monthlyOver, lumpSumNow: lump }), [balance, rate, years, monthlyOver, lump]);
  const newYears = Math.floor(r.newPayoffMonths / 12);
  const newMonths = r.newPayoffMonths - newYears * 12;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Current balance" value={balance} onChange={setBalance} step={5000} />
          <NumberInput label="Interest rate" value={rate} onChange={setRate} step={0.1} prefix="" suffix=" %" />
          <NumberInput label="Years remaining" value={years} onChange={setYears} step={1} min={1} max={40} prefix="" suffix=" yrs" />
          <NumberInput label="Monthly overpayment" value={monthlyOver} onChange={setMonthlyOver} step={50} />
          <NumberInput label="Lump sum now (optional)" value={lump} onChange={setLump} step={500} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Interest saved</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.interestSaved.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-sm text-text/60">Paid off {Math.floor(r.monthsSaved / 12)}y {r.monthsSaved - Math.floor(r.monthsSaved / 12) * 12}m earlier — new term {newYears}y {newMonths}m.</p>
          <ResultBreakdown
            title="Comparison"
            rows={[
              { label: "Original monthly payment", value: r.originalMonthlyPayment },
              { label: "Original total interest", value: r.originalTotalInterest },
              { label: "New total interest", value: r.newTotalInterest },
              { label: "Saved", value: r.interestSaved, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

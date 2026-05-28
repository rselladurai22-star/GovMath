"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { fire } from "@/lib/investing/fire";

export default function FIRECalculator() {
  const [annualSpend, setAnnualSpend] = useState<number>(30_000);
  const [invested, setInvested] = useState<number>(50_000);
  const [monthly, setMonthly] = useState<number>(1500);
  const [realReturn, setRealReturn] = useState<number>(4);
  const [swr, setSwr] = useState<number>(4);
  const r = useMemo(() => fire({ annualSpendInRetirement: annualSpend, currentInvested: invested, monthlySavings: monthly, expectedRealReturnPct: realReturn, swrPct: swr }), [annualSpend, invested, monthly, realReturn, swr]);
  const years = isFinite(r.yearsToFI) ? r.yearsToFI : 99;
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual spend in retirement" value={annualSpend} onChange={setAnnualSpend} step={500} />
          <NumberInput label="Currently invested" value={invested} onChange={setInvested} step={1000} />
          <NumberInput label="Monthly savings" value={monthly} onChange={setMonthly} step={50} />
          <NumberInput label="Real return p.a." value={realReturn} onChange={setRealReturn} step={0.25} prefix="" suffix=" %" />
          <NumberInput label="Safe withdrawal rate" value={swr} onChange={setSwr} step={0.25} min={2.5} max={6} prefix="" suffix=" %" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Years to FI</p>
          <p className="text-5xl font-bold text-primary-dark">{isFinite(r.yearsToFI) ? years.toFixed(1) : "—"}</p>
          {r.ageNote && <p className="text-sm text-rose-700">{r.ageNote}</p>}
          <ResultBreakdown
            title="Numbers"
            rows={[
              { label: `Target pot (× ${(100 / swr).toFixed(1)})`, value: r.targetPot, variant: "total" },
              { label: "Monthly draw at SWR", value: r.monthlyDrawFromPot },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

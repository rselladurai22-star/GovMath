"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { pensionCredit } from "@/lib/benefits/pension-credit";

export default function PensionCreditCalculator() {
  const [household, setHousehold] = useState<"single" | "couple">("single");
  const [weeklyIncome, setIncome] = useState<number>(190);
  const [capital, setCapital] = useState<number>(8000);

  const r = useMemo(() => pensionCredit({ household, weeklyIncome, capital }), [household, weeklyIncome, capital]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Household</label>
            <select value={household} onChange={(e) => setHousehold(e.target.value as "single" | "couple")} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <option value="single">Single</option>
              <option value="couple">Couple (both over SPA)</option>
            </select>
          </div>
          <NumberInput label="Weekly income (pensions + earnings)" value={weeklyIncome} onChange={setIncome} step={5} />
          <NumberInput label="Capital (savings, ISAs)" value={capital} onChange={setCapital} step={500} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Weekly Pension Credit</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.weeklyAward.toFixed(2)}</p>
          <p className="text-xs text-text/60">≈ £{r.annualAward.toFixed(0)}/year top-up.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Guarantee threshold", value: r.threshold },
              { label: "Your income", value: weeklyIncome },
              { label: "Tariff income from capital", value: r.tariffIncome, hint: "£1/wk per £500 above £10,000" },
              { label: "Total counted income", value: r.totalIncome },
              { label: "Weekly award", value: r.weeklyAward, variant: "total" },
              { label: "Annual award", value: r.annualAward },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

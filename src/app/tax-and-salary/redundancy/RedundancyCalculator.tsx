"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { statutoryRedundancy } from "@/lib/tax/redundancy";

export default function RedundancyCalculator() {
  const [age, setAge] = useState<number>(45);
  const [years, setYears] = useState<number>(8);
  const [weeklyPay, setWeeklyPay] = useState<number>(750);
  const r = useMemo(() => statutoryRedundancy({ ageAtRedundancy: age, yearsOfService: years, weeklyPay }), [age, years, weeklyPay]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Your age" value={age} onChange={setAge} step={1} min={16} max={75} prefix="" suffix=" yrs" />
          <NumberInput label="Full years of service" value={years} onChange={setYears} step={1} min={0} max={50} prefix="" suffix=" yrs" />
          <NumberInput label="Weekly gross pay" value={weeklyPay} onChange={setWeeklyPay} step={25} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Statutory redundancy</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.statutoryPayment.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">Tax-free up to £30,000.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Weeks owed (${r.yearsCounted} yrs counted)`, value: r.weeksDue },
              { label: "Capped weekly pay", value: r.cappedWeeklyPay },
              { label: "Statutory payment", value: r.statutoryPayment, variant: "total" },
              { label: "Tax-free portion", value: r.taxFree, hint: "Above £30k is taxed" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

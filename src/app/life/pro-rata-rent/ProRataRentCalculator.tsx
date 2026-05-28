"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

export default function ProRataRentCalculator() {
  const [monthly, setMonthly] = useState<number>(1500);
  const [daysInMonth, setDaysInMonth] = useState<number>(31);
  const [daysOccupied, setDaysOccupied] = useState<number>(12);
  const r = useMemo(() => {
    const dailyRate = monthly / daysInMonth;
    const due = dailyRate * daysOccupied;
    return { dailyRate, due };
  }, [monthly, daysInMonth, daysOccupied]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Full monthly rent" value={monthly} onChange={setMonthly} step={25} />
          <NumberInput label="Days in this month" value={daysInMonth} onChange={setDaysInMonth} step={1} min={28} max={31} prefix="" suffix=" days" />
          <NumberInput label="Days you&rsquo;ll occupy" value={daysOccupied} onChange={setDaysOccupied} step={1} min={0} max={31} prefix="" suffix=" days" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Pro-rata rent due</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP.format(r.due)}</p>
            <p className="text-sm text-text/60 mt-1">Daily rate: {GBP.format(r.dailyRate)}</p>
          </div>
          <ResultBreakdown
            title="Calculation"
            rows={[
              { label: `${GBP.format(monthly)} ÷ ${daysInMonth} days`, value: r.dailyRate },
              { label: `× ${daysOccupied} days occupied`, value: r.due, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

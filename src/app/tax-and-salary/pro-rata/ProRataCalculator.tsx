"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { proRataSalary } from "@/lib/salary-conversions";

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});
const GBP2 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

export default function ProRataCalculator() {
  const [fullTimeSalary, setFullTimeSalary] = useState<number>(40_000);
  const [partTimeHours, setPartTimeHours] = useState<number>(30);
  const [fullTimeHours, setFullTimeHours] = useState<number>(37.5);

  const r = useMemo(
    () =>
      proRataSalary({
        fullTimeSalary,
        partTimeHoursPerWeek: partTimeHours,
        fullTimeHoursPerWeek: fullTimeHours,
      }),
    [fullTimeSalary, partTimeHours, fullTimeHours]
  );

  const pct = (r.fraction * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your hours</h2>

          <NumberInput
            label="Full-time advertised salary"
            value={fullTimeSalary}
            onChange={setFullTimeSalary}
            step={500}
          />

          <NumberInput
            label="Your hours per week"
            value={partTimeHours}
            onChange={setPartTimeHours}
            min={0}
            max={80}
            step={0.5}
            prefix=""
            suffix=" hrs"
          />

          <NumberInput
            label="Full-time hours per week"
            value={fullTimeHours}
            onChange={setFullTimeHours}
            min={1}
            max={48}
            step={0.5}
            prefix=""
            suffix=" hrs"
            hint="The UK norm is 37.5 hours (excluding lunch). Some roles use 35 or 40."
          />
        </div>

        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
              Your pro-rata salary
            </p>
            <p className="text-4xl font-bold text-primary-dark mt-1">
              {GBP0.format(r.annual)}
              <span className="text-base font-semibold text-text/60 ml-2">
                ({pct}%)
              </span>
            </p>
          </div>

          <ResultBreakdown
            title="Pro-rata breakdown"
            rows={[
              { label: "Per year (gross)", value: r.annual, variant: "total" },
              { label: "Per month", value: r.monthly },
              { label: "Per week", value: r.weekly },
              { label: "Per working day", value: r.daily, hint: "Assumes a 5-day week." },
            ]}
          />
          <p className="text-xs text-text/60">
            This is your gross (pre-tax) figure. Run it through the{" "}
            <a className="text-primary underline" href="/tax-and-salary/salary-calculator">salary calculator</a>{" "}
            to see take-home pay.
          </p>
        </div>
      </div>
    </div>
  );
}

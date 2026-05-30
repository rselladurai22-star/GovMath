"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { compoundInterest } from "@/lib/compound-interest";

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState<number>(5_000);
  const [monthly, setMonthly] = useState<number>(200);
  const [rate, setRate] = useState<number>(6);
  const [years, setYears] = useState<number>(20);

  const r = useMemo(
    () =>
      compoundInterest({
        principal,
        monthlyContribution: monthly,
        annualRatePct: rate,
        years,
        compoundsPerYear: 12,
      }),
    [principal, monthly, rate, years]
  );

  // Show every 5 years + final.
  const rows = r.schedule.filter(
    (row) => row.year % 5 === 0 || row.year === r.schedule.length
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your plan</h2>

          <NumberInput
            label="Starting balance"
            value={principal}
            onChange={setPrincipal}
            min={0}
            step={500}
          />

          <NumberInput
            label="Monthly contribution"
            value={monthly}
            onChange={setMonthly}
            min={0}
            step={50}
          />

          <div className="grid grid-cols-2 gap-3">
            <NumberInput
              label="Annual return"
              value={rate}
              onChange={setRate}
              min={0}
              step={0.5}
              prefix=""
              suffix="%"
              hint="Long-run UK equities have returned ~5% real."
            />
            <NumberInput
              label="Years"
              value={years}
              onChange={setYears}
              min={1}
              max={60}
              step={1}
              prefix=""
              suffix=" yrs"
            />
          </div>

          <p className="text-xs text-text/60">
            Assumes monthly compounding. All numbers are in today’s pounds
            — inflation will erode real-terms value over time.
          </p>
        </div>

        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
              Future value after {years} years
            </p>
            <p className="text-4xl font-bold text-primary-dark mt-1">
              {GBP0.format(r.futureValue)}
            </p>
          </div>

          <ResultBreakdown
            title="Breakdown"
            rows={[
              {
                label: "Total contributions",
                value: r.totalContributions,
              },
              {
                label: "Interest earned",
                value: r.totalInterest,
                hint: "What compounding adds on top of what you put in.",
              },
              {
                label: "Final balance",
                value: r.futureValue,
                variant: "total",
              },
            ]}
          />
        </div>
      </div>

      <div className="rounded-xl bg-surface border border-border p-6">
        <h3 className="text-base font-bold text-primary-dark mb-3">
          Growth over time
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-text/70 border-b border-border">
              <tr>
                <th className="py-2 pr-3">Year</th>
                <th className="py-2 pr-3">Contributions</th>
                <th className="py-2 pr-3">Interest</th>
                <th className="py-2">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.year} className="border-b border-border/50">
                  <td className="py-2 pr-3 font-semibold">{row.year}</td>
                  <td className="py-2 pr-3">{GBP0.format(row.contributions)}</td>
                  <td className="py-2 pr-3 text-success">
                    {GBP0.format(row.interest)}
                  </td>
                  <td className="py-2 font-bold text-primary-dark">
                    {GBP0.format(row.balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

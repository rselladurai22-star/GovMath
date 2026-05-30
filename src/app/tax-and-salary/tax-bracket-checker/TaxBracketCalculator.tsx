"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { incomeTax, TAX_YEAR_2025_26 } from "@/lib/tax/2025-26";

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function TaxBracketCalculator({
  initialIncome = 35000,
}: {
  initialIncome?: number;
}) {
  const [income, setIncome] = useState<number>(initialIncome);
  const result = useMemo(() => incomeTax(income), [income]);

  const { incomeTax: rates } = TAX_YEAR_2025_26;
  const paLost =
    TAX_YEAR_2025_26.personalAllowance - result.personalAllowance;

  // Pay-rise comparison: what does an extra £1,000 actually deliver?
  const plus1k = useMemo(() => incomeTax(income + 1000), [income]);
  const marginalCost = plus1k.total - result.total;
  const marginalKept = 1000 - marginalCost;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-primary-dark">Your income</h2>

        <NumberInput
          label="Annual taxable income"
          value={income}
          onChange={setIncome}
          step={500}
          hint="Salary, freelance, rental — anything taxable as income."
        />

        <div className="rounded-md bg-bg border border-border px-4 py-3 text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-text/60">Personal Allowance</span>
            <span className="font-mono tabular-nums font-semibold">
              {GBP.format(result.personalAllowance)}
            </span>
          </div>
          {paLost > 0 && (
            <div className="flex justify-between text-error">
              <span>Allowance lost (£100k+ taper)</span>
              <span className="font-mono tabular-nums font-semibold">
                −{GBP.format(paLost)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-text/60">Taxable income</span>
            <span className="font-mono tabular-nums font-semibold">
              {GBP.format(result.taxableIncome)}
            </span>
          </div>
        </div>

        <div className="rounded-md bg-card-hover border border-primary/30 px-4 py-3 text-sm">
          <div className="font-semibold text-primary-dark">
            What a £1,000 pay rise really gives you
          </div>
          <div className="mt-1 flex justify-between">
            <span className="text-text/70">You’d keep</span>
            <span className="font-mono tabular-nums font-bold text-success">
              {GBP.format(marginalKept)}
            </span>
          </div>
          <div className="flex justify-between text-error">
            <span>HMRC takes</span>
            <span className="font-mono tabular-nums font-semibold">
              −{GBP.format(marginalCost)}
            </span>
          </div>
          <div className="text-xs text-text/60 mt-1">
            Marginal Income Tax rate:{" "}
            <strong>{((marginalCost / 1000) * 100).toFixed(0)}%</strong>{" "}
            (excludes NI)
          </div>
        </div>

        <p className="text-xs text-text/60">
          England, Wales & Northern Ireland · 2025/26 tax year. Excludes
          dividend income, which is taxed at separate rates.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl bg-primary-dark text-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Total Income Tax
          </div>
          <div className="text-4xl font-extrabold mt-1 font-mono tabular-nums">
            {GBP.format(result.total)}
          </div>
          <div className="mt-3 text-sm text-white/80">
            Effective rate on income:{" "}
            <span className="font-semibold text-white">
              {income > 0 ? ((result.total / income) * 100).toFixed(1) : "0.0"}%
            </span>
          </div>
        </div>

        <ResultBreakdown
          title="Band by band"
          rows={[
            {
              label: `Basic rate (${(rates.rates.basic * 100).toFixed(0)}%)`,
              value: result.basic,
              variant: "deduction",
              hint: "£12,571 – £50,270",
            },
            {
              label: `Higher rate (${(rates.rates.higher * 100).toFixed(0)}%)`,
              value: result.higher,
              variant: "deduction",
              hint: "£50,271 – £125,140",
            },
            {
              label: `Additional rate (${(rates.rates.additional * 100).toFixed(0)}%)`,
              value: result.additional,
              variant: "deduction",
              hint: "Over £125,140",
            },
            {
              label: "Total Income Tax",
              value: result.total,
              variant: "total",
            },
          ]}
        />
      </div>
    </div>
  );
}

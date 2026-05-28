"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { nationalInsurance, selfEmployedNI } from "@/lib/tax/2025-26";

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const GBP2 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

type Mode = "employee" | "self-employed";

export default function NICalculator({
  initialIncome = 35000,
  initialMode = "employee",
}: {
  initialIncome?: number;
  initialMode?: Mode;
}) {
  const [income, setIncome] = useState<number>(initialIncome);
  const [mode, setMode] = useState<Mode>(initialMode);

  const result = useMemo(
    () => (mode === "employee" ? nationalInsurance(income) : selfEmployedNI(income)),
    [income, mode]
  );

  const mainRatePct = mode === "employee" ? 8 : 6;
  const effectiveRate = income > 0 ? result.total / income : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-primary-dark">Your earnings</h2>

        <fieldset>
          <legend className="block text-sm font-semibold text-text mb-2">
            How are you paid?
          </legend>
          <div role="radiogroup" className="space-y-2">
            <button
              type="button"
              role="radio"
              aria-checked={mode === "employee"}
              onClick={() => setMode("employee")}
              className={`w-full text-left rounded-md border p-3 transition-colors ${
                mode === "employee"
                  ? "border-primary bg-card-hover"
                  : "border-border bg-white hover:border-primary"
              }`}
            >
              <div className="font-semibold text-text">
                Employee (Class 1)
              </div>
              <div className="text-xs text-text/70 mt-0.5">
                Paid via PAYE. 8% main rate, 2% above £50,270.
              </div>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={mode === "self-employed"}
              onClick={() => setMode("self-employed")}
              className={`w-full text-left rounded-md border p-3 transition-colors ${
                mode === "self-employed"
                  ? "border-primary bg-card-hover"
                  : "border-border bg-white hover:border-primary"
              }`}
            >
              <div className="font-semibold text-text">
                Self-employed (Class 4)
              </div>
              <div className="text-xs text-text/70 mt-0.5">
                Trading profit via Self Assessment. 6% main, 2% above £50,270.
              </div>
            </button>
          </div>
        </fieldset>

        <NumberInput
          label={
            mode === "employee"
              ? "Gross annual salary"
              : "Annual trading profit"
          }
          value={income}
          onChange={setIncome}
          min={0}
          step={500}
          hint={
            mode === "employee"
              ? "Before tax, NI and pension."
              : "Profit after allowable business expenses."
          }
        />

        <p className="text-xs text-text/60">
          Figures cover the 2025/26 UK tax year. Class 2 NI was effectively
          abolished from April 2024 for most self-employed people and is not
          included here.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl bg-primary-dark text-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            National Insurance payable
          </div>
          <div className="text-4xl font-extrabold mt-1 font-mono tabular-nums">
            {GBP.format(Math.round(result.total))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
            <div className="rounded-md bg-white/10 p-3">
              <div className="text-white/70 text-xs">Monthly</div>
              <div className="font-bold font-mono tabular-nums">
                {GBP.format(result.total / 12)}
              </div>
            </div>
            <div className="rounded-md bg-white/10 p-3">
              <div className="text-white/70 text-xs">Weekly</div>
              <div className="font-bold font-mono tabular-nums">
                {GBP.format(result.total / 52)}
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/70">
            Effective NI rate:{" "}
            <span className="font-semibold text-white">
              {(effectiveRate * 100).toFixed(2)}%
            </span>
          </div>
        </div>

        <ResultBreakdown
          title="Band-by-band breakdown"
          rows={[
            {
              label: "Below £12,570",
              value: 0,
              hint: "0% — the Primary Threshold / Lower Profits Limit.",
            },
            {
              label: "£12,571 – £50,270",
              value: result.mainBand,
              hint: `${mainRatePct}% on ${GBP2.format(
                Math.max(0, Math.min(income, 50270) - 12570)
              )}`,
              variant: result.mainBand > 0 ? "deduction" : undefined,
            },
            {
              label: "Above £50,270",
              value: result.upperBand,
              hint: `2% on ${GBP2.format(Math.max(0, income - 50270))}`,
              variant: result.upperBand > 0 ? "deduction" : undefined,
            },
            {
              label: "Total National Insurance",
              value: result.total,
              variant: "total",
            },
          ]}
        />
      </div>
    </div>
  );
}

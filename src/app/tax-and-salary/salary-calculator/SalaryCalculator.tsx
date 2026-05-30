"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { takeHomePay } from "@/lib/tax/2025-26";

const GBP = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

type Frequency = "year" | "month" | "week";

export default function SalaryCalculator({
  initialSalary = 35000,
}: {
  initialSalary?: number;
}) {
  const [salary, setSalary] = useState<number>(initialSalary);
  const [frequency, setFrequency] = useState<Frequency>("year");

  const annualGross = useMemo(() => {
    if (frequency === "month") return salary * 12;
    if (frequency === "week") return salary * 52;
    return salary;
  }, [salary, frequency]);

  const result = useMemo(() => takeHomePay(annualGross), [annualGross]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-primary-dark">Your salary</h2>

        <NumberInput
          label="Gross salary"
          value={salary}
          onChange={setSalary}
          min={0}
          step={frequency === "year" ? 500 : 50}
          hint="Before tax, NI and pension contributions."
        />

        <fieldset>
          <legend className="block text-sm font-semibold text-text mb-2">
            Paid
          </legend>
          <div
            role="radiogroup"
            className="grid grid-cols-3 rounded-md border border-border overflow-hidden"
          >
            {(["year", "month", "week"] as Frequency[]).map((f) => {
              const active = frequency === f;
              return (
                <button
                  key={f}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setFrequency(f)}
                  className={`py-2 text-sm font-semibold capitalize transition-colors ${
                    active
                      ? "bg-primary text-white"
                      : "bg-white text-text hover:bg-card-hover"
                  }`}
                >
                  per {f}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="rounded-md bg-bg border border-border px-4 py-3 text-sm">
          <div className="text-text/60">Annual equivalent</div>
          <div className="font-mono tabular-nums font-bold text-primary-dark text-lg">
            {GBP.format(annualGross)}
          </div>
        </div>

        <p className="text-xs text-text/60">
          Based on England, Wales & Northern Ireland for the 2025/26 tax
          year. Assumes the standard 1257L tax code, no student loan and no
          salary-sacrifice pension.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl bg-primary-dark text-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Annual take-home
          </div>
          <div className="text-4xl font-extrabold mt-1 font-mono tabular-nums">
            {GBP.format(Math.max(0, result.takeHome))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
            <div className="rounded-md bg-white/10 p-3">
              <div className="text-white/70 text-xs">Monthly</div>
              <div className="font-bold font-mono tabular-nums">
                {GBP.format(result.perPeriod.monthly)}
              </div>
            </div>
            <div className="rounded-md bg-white/10 p-3">
              <div className="text-white/70 text-xs">Weekly</div>
              <div className="font-bold font-mono tabular-nums">
                {GBP.format(result.perPeriod.weekly)}
              </div>
            </div>
            <div className="rounded-md bg-white/10 p-3">
              <div className="text-white/70 text-xs">Daily</div>
              <div className="font-bold font-mono tabular-nums">
                {GBP.format(result.perPeriod.daily)}
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-white/70">
            Effective tax rate (Income Tax + NI):{" "}
            <span className="font-semibold text-white">
              {(result.effectiveRate * 100).toFixed(1)}%
            </span>
          </div>
        </div>

        <ResultBreakdown
          title="How we got there"
          rows={[
            { label: "Gross salary", value: result.gross },
            {
              label: "Personal Allowance",
              value: result.incomeTax.personalAllowance,
              hint:
                result.gross > 100000
                  ? "Tapered because gross is above £100,000"
                  : "Standard £12,570",
            },
            {
              label: "Income Tax",
              value: result.incomeTax.total,
              variant: "deduction",
              hint: `Basic ${GBP.format(
                result.incomeTax.basic
              )} · Higher ${GBP.format(
                result.incomeTax.higher
              )} · Additional ${GBP.format(result.incomeTax.additional)}`,
            },
            {
              label: "National Insurance",
              value: result.ni.total,
              variant: "deduction",
              hint: `Class 1 employee · 8% main, 2% above £50,270`,
            },
            {
              label: "Annual take-home",
              value: Math.max(0, result.takeHome),
              variant: "total",
            },
          ]}
        />
      </div>
    </div>
  );
}

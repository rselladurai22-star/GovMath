"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { studentLoanRepayment } from "@/lib/students/student-loan";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function Plan2Calculator() {
  const [salary, setSalary] = useState<number>(35_000);
  const r = useMemo(() => studentLoanRepayment("plan-2", salary), [salary]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your salary</h2>
          <NumberInput label="Gross annual salary" value={salary} onChange={setSalary} step={500} />
          <p className="text-xs text-text/60">
            Plan 2 covers English/Welsh undergrads who started 2012–2023. Threshold £28,470 (2025/26), rate 9% on the excess.
          </p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Plan 2 repayment</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.monthlyRepayment)}<span className="text-base text-text/60">/mo</span></p>
            <p className="text-sm text-text/60 mt-1">{GBP0.format(r.annualRepayment)} per year</p>
          </div>
          <ResultBreakdown
            title="Calculation"
            rows={[
              { label: "Annual salary", value: salary },
              { label: "Plan 2 threshold (2025/26)", value: r.threshold, variant: "deduction" },
              { label: "Income above threshold", value: r.excessIncome },
              { label: `Annual repayment (${r.ratePct}%)`, value: r.annualRepayment, variant: "total" },
            ]}
          />
          {salary < r.threshold && (
            <p className="text-xs bg-success/10 border border-success/30 text-text rounded-md p-3">
              ✓ Below the £28,470 threshold — no repayments due this year. Interest still accrues but the loan is written off after 30 years.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

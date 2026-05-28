"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { studentLoanRepayment, STUDENT_LOAN_2025_26, type StudentLoanPlan } from "@/lib/students/student-loan";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function GenericLoanCalculator({ plan }: { plan: StudentLoanPlan }) {
  const [salary, setSalary] = useState<number>(35_000);
  const r = useMemo(() => studentLoanRepayment(plan, salary), [plan, salary]);
  const spec = STUDENT_LOAN_2025_26[plan];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your salary</h2>
          <NumberInput label="Gross annual salary" value={salary} onChange={setSalary} step={500} />
          <p className="text-xs text-text/60">
            {spec.label} threshold: {GBP0.format(spec.threshold)} (2025/26). Rate {spec.ratePct}% on the excess.
          </p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Monthly repayment</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.monthlyRepayment)}</p>
            <p className="text-sm text-text/60 mt-1">{GBP0.format(r.annualRepayment)} per year</p>
          </div>
          <ResultBreakdown
            title="Calculation"
            rows={[
              { label: "Annual salary", value: salary },
              { label: `${spec.label} threshold`, value: r.threshold, variant: "deduction" },
              { label: "Income above threshold", value: r.excessIncome },
              { label: `Annual repayment (${r.ratePct}%)`, value: r.annualRepayment, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

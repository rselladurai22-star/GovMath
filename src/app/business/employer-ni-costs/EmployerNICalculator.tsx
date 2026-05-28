"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { employerNI } from "@/lib/business/employer-ni";

export default function EmployerNICalculator() {
  const [salary, setSalary] = useState<number>(40_000);
  const [allowance, setAllowance] = useState<boolean>(false);
  const r = useMemo(() => employerNI({ annualSalary: salary, employmentAllowance: allowance }), [salary, allowance]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Employee annual salary" value={salary} onChange={setSalary} step={1000} />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={allowance} onChange={(e) => setAllowance(e.target.checked)} className="accent-primary" />
            Apply £10,500 Employment Allowance
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total cost of this hire</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalEmploymentCost.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Salary", value: salary },
              { label: "Employer NI @ 15% over £5k", value: r.grossEmployerNI },
              ...(allowance ? [{ label: "Employment Allowance", value: r.employmentAllowance, variant: "deduction" as const }] : []),
              { label: "Total employment cost", value: r.totalEmploymentCost, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function AffordabilityCalculator() {
  const [income1, setIncome1] = useState<number>(45_000);
  const [income2, setIncome2] = useState<number>(0);
  const [deposit, setDeposit] = useState<number>(40_000);
  const [multiple, setMultiple] = useState<number>(4.5);
  const r = useMemo(() => {
    const household = income1 + income2;
    const maxLoan = household * multiple;
    const maxProperty = maxLoan + deposit;
    const ltv = maxProperty > 0 ? (maxLoan / maxProperty) * 100 : 0;
    return { household, maxLoan, maxProperty, ltv };
  }, [income1, income2, deposit, multiple]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Applicant 1 gross annual income" value={income1} onChange={setIncome1} step={1000} />
          <NumberInput label="Applicant 2 gross income (if joint)" value={income2} onChange={setIncome2} step={1000} />
          <NumberInput label="Deposit" value={deposit} onChange={setDeposit} step={1000} />
          <NumberInput label="Income multiple" value={multiple} onChange={setMultiple} step={0.1} min={3} max={6} prefix="" suffix="×" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Max property price</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.maxProperty.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-sm text-text/60">LTV {r.ltv.toFixed(0)}%</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Household income (× ${multiple})`, value: r.household },
              { label: "Max mortgage", value: r.maxLoan },
              { label: "Deposit", value: deposit },
              { label: "Max property", value: r.maxProperty, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

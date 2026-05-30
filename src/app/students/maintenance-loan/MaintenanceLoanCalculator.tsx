"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { maintenanceLoan, type AccommodationType } from "@/lib/students/maintenance-loan";

const ACCOM: { key: AccommodationType; label: string }[] = [
  { key: "home", label: "Living at home (parental)" },
  { key: "away", label: "Away from home (outside London)" },
  { key: "london", label: "Away from home (in London)" },
  { key: "abroad", label: "Studying abroad (UK course)" },
];

export default function MaintenanceLoanCalculator() {
  const [householdIncome, setIncome] = useState<number>(45000);
  const [accommodation, setAccom] = useState<AccommodationType>("away");

  const r = useMemo(
    () => maintenanceLoan({ householdIncome, accommodation }),
    [householdIncome, accommodation]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Household income" value={householdIncome} onChange={setIncome} step={1000} hint="Combined parental taxable income (or your own if independent)." />
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Term-time accommodation</label>
            <select
              value={accommodation}
              onChange={(e) => setAccom(e.target.value as AccommodationType)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {ACCOM.map((a) => (
                <option key={a.key} value={a.key}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Annual maintenance loan</p>
          <p className="text-4xl font-bold text-primary-dark">
            £{r.loan.toLocaleString("en-GB")}
          </p>
          <p className="text-xs text-text/60">≈ £{r.perTerm.toLocaleString("en-GB")} per term (3 instalments).</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Maximum loan", value: r.maxLoan },
              { label: "Income-based reduction", value: r.reduction, variant: r.reduction > 0 ? "deduction" : "default" },
              { label: "Your loan", value: r.loan, variant: "total" },
              { label: "Minimum (means-tested floor)", value: r.minLoan, hint: "Loan can’t fall below this for your accommodation type." },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

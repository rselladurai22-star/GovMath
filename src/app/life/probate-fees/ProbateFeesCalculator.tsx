"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { probateFees } from "@/lib/probate";

export default function ProbateFeesCalculator() {
  const [estateValue, setEstateValue] = useState<number>(250_000);
  const [extraCopies, setExtraCopies] = useState<number>(3);
  const r = useMemo(
    () => probateFees({ estateValue, extraCopies }),
    [estateValue, extraCopies]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput
            label="Gross estate value"
            value={estateValue}
            onChange={setEstateValue}
            step={5000}
            hint="Total value of property, savings and possessions before debts."
          />
          <NumberInput
            label="Extra sealed copies"
            value={extraCopies}
            onChange={setExtraCopies}
            step={1}
            min={0}
            max={50}
            prefix=""
            suffix=" copies"
          />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total to pay</p>
          <p className="text-4xl font-bold text-primary-dark">
            £{r.totalFee.toLocaleString("en-GB", { maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-text/60">
            {r.feeWaived ? "No application fee — estate below £5,000 threshold." : "Includes the £300 application fee plus copies."}
          </p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Application fee", value: r.applicationFee, hint: r.feeWaived ? "Waived — under £5,000" : "Flat fee above £5,000" },
              { label: "Sealed copies", value: r.copiesFee, hint: "£1.50 each" },
              { label: "Total payable", value: r.totalFee, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

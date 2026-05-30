"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { prescriptionSaver } from "@/lib/nhs-prescription";

const LABELS: Record<string, string> = {
  "pay-as-you-go": "Pay as you go (£9.90/item)",
  "3-month-ppc": "3-month PPC (£33.70)",
  "12-month-ppc": "12-month PPC (£120.90)",
};

export default function NhsPrescriptionCalculator() {
  const [itemsPerMonth, setItems] = useState<number>(2);
  const r = useMemo(() => prescriptionSaver({ itemsPerMonth }), [itemsPerMonth]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Prescription items per month" value={itemsPerMonth} onChange={setItems} step={0.5} min={0} max={20} prefix="" suffix=" /mo" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Cheapest option</p>
          <p className="text-2xl font-bold text-primary-dark">{LABELS[r.bestOption]}</p>
          <p className="text-4xl font-bold text-success mt-2">Save £{r.annualSaving.toFixed(0)}/yr</p>
          <ResultBreakdown
            title="Annual costs compared"
            rows={[
              { label: "Pay as you go", value: r.annualPayAsYouGo },
              { label: "3-month PPC × 4", value: r.ppc3MonthAnnual },
              { label: "12-month PPC", value: r.ppc12MonthAnnual },
              { label: `Cheapest: ${LABELS[r.bestOption]}`, value: r.annualPayAsYouGo - r.annualSaving, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

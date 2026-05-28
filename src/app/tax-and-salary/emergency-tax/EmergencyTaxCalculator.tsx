"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function EmergencyTaxCalculator() {
  const [gross, setGross] = useState<number>(2500);
  const [code, setCode] = useState<"BR" | "0T" | "1257L">("BR");
  const r = useMemo(() => {
    // Monthly pay scenario
    const personalAllowanceMonthly = 1257 * 10 / 12; // £1047.50
    const basicBandMonthly = 37700 / 12;
    // Normal 1257L
    const taxableNormal = Math.max(0, gross - personalAllowanceMonthly);
    const basicNormal = Math.min(taxableNormal, basicBandMonthly);
    const higherNormal = Math.max(0, taxableNormal - basicBandMonthly);
    const taxNormal = basicNormal * 0.20 + higherNormal * 0.40;
    // Emergency code
    let taxEmergency = 0;
    if (code === "BR") {
      taxEmergency = gross * 0.20;
    } else if (code === "0T") {
      const basic = Math.min(gross, basicBandMonthly);
      const higher = Math.max(0, gross - basicBandMonthly);
      taxEmergency = basic * 0.20 + higher * 0.40;
    } else {
      taxEmergency = taxNormal;
    }
    const overpaid = taxEmergency - taxNormal;
    return { taxNormal, taxEmergency, overpaid };
  }, [gross, code]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Gross monthly pay" value={gross} onChange={setGross} step={100} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax code on payslip</label>
            <div className="grid grid-cols-3 gap-2">
              {(["BR", "0T", "1257L"] as const).map((c) => (
                <button key={c} type="button" onClick={() => setCode(c)} className={`rounded-md border px-3 py-2 text-sm ${code === c ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{c}</button>
              ))}
            </div>
            <p className="text-xs text-text/60">{code === "BR" ? "Basic Rate — flat 20%, no allowance" : code === "0T" ? "No allowance, full tax bands" : "Normal full-allowance code"}</p>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Likely refund (per month overpaid)</p>
          <p className="text-4xl font-bold text-primary-dark">£{Math.max(0, r.overpaid).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Tax under emergency code", value: r.taxEmergency },
              { label: "Tax under 1257L (normal)", value: r.taxNormal },
              { label: "Monthly overpayment", value: Math.max(0, r.overpaid), variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

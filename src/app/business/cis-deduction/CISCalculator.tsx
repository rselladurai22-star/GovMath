"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function CISCalculator() {
  const [labour, setLabour] = useState<number>(2000);
  const [materials, setMaterials] = useState<number>(800);
  const [registered, setRegistered] = useState<boolean>(true);
  const r = useMemo(() => {
    const rate = registered ? 0.20 : 0.30;
    const deduction = labour * rate;
    const total = labour + materials;
    const net = total - deduction;
    return { rate, deduction, total, net };
  }, [labour, materials, registered]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Labour portion of invoice" value={labour} onChange={setLabour} step={50} />
          <NumberInput label="Materials (CIS-free)" value={materials} onChange={setMaterials} step={50} />
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input type="checkbox" checked={registered} onChange={(e) => setRegistered(e.target.checked)} className="accent-primary" />
            Registered with HMRC for CIS (20% rate)
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Net paid to you</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.net.toFixed(2)}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Labour", value: labour },
              { label: "Materials", value: materials },
              { label: "Invoice total", value: r.total },
              { label: `CIS @ ${r.rate * 100}% on labour`, value: r.deduction, variant: "deduction" },
              { label: "Net payment", value: r.net, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

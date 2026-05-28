"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { evSalarySacrifice } from "@/lib/vehicles/ev-salary-sacrifice";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

type Band = "basic" | "higher" | "additional";

const BANDS: Record<Band, { label: string; it: number; ni: number }> = {
  basic: { label: "Basic rate (20%)", it: 0.2, ni: 0.08 },
  higher: { label: "Higher rate (40%)", it: 0.4, ni: 0.02 },
  additional: { label: "Additional rate (45%)", it: 0.45, ni: 0.02 },
};

export default function EVSalSacCalculator() {
  const [band, setBand] = useState<Band>("higher");
  const [grossMonthly, setGrossMonthly] = useState<number>(600);
  const [p11d, setP11d] = useState<number>(45_000);
  const [bikRate, setBikRate] = useState<number>(3);

  const r = useMemo(() => {
    const b = BANDS[band];
    return evSalarySacrifice({
      grossMonthlyLease: grossMonthly,
      p11d,
      incomeTaxRate: b.it,
      niRate: b.ni,
      bikRatePct: bikRate,
    });
  }, [band, grossMonthly, p11d, bikRate]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your scheme</h2>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Your tax band</label>
            <div className="grid gap-2">
              {(Object.keys(BANDS) as Band[]).map((b) => (
                <label
                  key={b}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer text-sm ${
                    band === b ? "border-primary bg-primary/5" : "border-border bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="band"
                    value={b}
                    checked={band === b}
                    onChange={() => setBand(b)}
                    className="accent-primary"
                  />
                  {BANDS[b].label}
                </label>
              ))}
            </div>
          </div>
          <NumberInput label="Gross monthly lease (inc. VAT)" value={grossMonthly} onChange={setGrossMonthly} step={25} />
          <NumberInput label="P11D value of car" value={p11d} onChange={setP11d} step={1000} hint="Manufacturer list price including options and VAT." />
          <NumberInput
            label="BIK rate"
            value={bikRate}
            onChange={setBikRate}
            min={1}
            max={20}
            step={1}
            prefix=""
            suffix="%"
            hint="EV BIK: 3% in 2025/26 → 9% by 2029/30."
          />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Net monthly cost</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.netMonthly)}</p>
            <p className="text-sm text-text/60 mt-1">
              vs {GBP0.format(r.privateMonthly)} privately — saves {GBP0.format(r.annualSavingVsPrivate)}/yr
            </p>
          </div>
          <ResultBreakdown
            title="Annual cost breakdown"
            rows={[
              { label: "Gross annual lease", value: r.grossMonthly * 12, variant: "total" },
              { label: `Income Tax + NI saving (${(r.marginalRate * 100).toFixed(0)}%)`, value: r.taxSaving, variant: "deduction" },
              { label: `BIK tax on car (P11D × ${bikRate}% × IT rate)`, value: r.bikAnnual },
              { label: "Net annual cost", value: r.netAnnual, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

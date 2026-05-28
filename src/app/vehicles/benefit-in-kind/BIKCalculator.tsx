"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { companyCarBIK } from "@/lib/vehicles/bik";

export default function BIKCalculator() {
  const [listPrice, setListPrice] = useState<number>(35_000);
  const [fuelType, setFuelType] = useState<"petrol" | "diesel" | "electric">("petrol");
  const [co2, setCo2] = useState<number>(120);
  const [marginalRate, setMarginalRate] = useState<number>(40);
  const r = useMemo(() => companyCarBIK({ listPrice, fuelType, co2gPerKm: co2, marginalRate: marginalRate / 100 }), [listPrice, fuelType, co2, marginalRate]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="List price (P11D value)" value={listPrice} onChange={setListPrice} step={500} />
          <div className="space-y-2">
            <label className="text-sm font-medium">Fuel type</label>
            <div className="grid grid-cols-3 gap-2">
              {(["petrol", "diesel", "electric"] as const).map((f) => (
                <button key={f} type="button" onClick={() => setFuelType(f)} className={`rounded-md border px-3 py-2 text-sm capitalize ${fuelType === f ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{f}</button>
              ))}
            </div>
          </div>
          {fuelType !== "electric" && <NumberInput label="CO₂ emissions" value={co2} onChange={setCo2} step={5} min={0} prefix="" suffix=" g/km" />}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Income Tax rate</label>
            <div className="grid grid-cols-3 gap-2">
              {[20, 40, 45].map((rate) => (
                <button key={rate} type="button" onClick={() => setMarginalRate(rate)} className={`rounded-md border px-3 py-2 text-sm ${marginalRate === rate ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{rate}%</button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Annual tax on benefit</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.annualTax.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">£{r.monthlyTax.toFixed(0)}/month — BIK rate {(r.bikPercent * 100).toFixed(0)}%</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Cash equivalent", value: r.cashEquivalent },
              { label: "Tax due", value: r.annualTax, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

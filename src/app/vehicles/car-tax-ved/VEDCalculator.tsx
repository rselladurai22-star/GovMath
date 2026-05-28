"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { ved, type FuelType } from "@/lib/vehicles/ved";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

const FUELS: { v: FuelType; label: string }[] = [
  { v: "petrol-diesel", label: "Petrol or diesel" },
  { v: "alternative", label: "Alternative fuel (hybrid, LPG, etc.)" },
  { v: "electric", label: "Pure electric" },
];

export default function VEDCalculator() {
  const [co2, setCo2] = useState<number>(120);
  const [fuel, setFuel] = useState<FuelType>("petrol-diesel");
  const [listPrice, setListPrice] = useState<number>(30_000);
  const r = useMemo(() => ved({ co2, fuel, listPrice }), [co2, fuel, listPrice]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your car</h2>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">Fuel type</label>
            <div className="grid gap-2">
              {FUELS.map((f) => (
                <label
                  key={f.v}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer text-sm ${
                    fuel === f.v ? "border-primary bg-primary/5" : "border-border bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="fuel"
                    value={f.v}
                    checked={fuel === f.v}
                    onChange={() => setFuel(f.v)}
                    className="accent-primary"
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>
          {fuel !== "electric" && (
            <NumberInput
              label="CO₂ emissions"
              value={co2}
              onChange={setCo2}
              min={0}
              max={500}
              step={5}
              prefix=""
              suffix=" g/km"
              hint="On your V5C log book. Use 0 for EVs."
            />
          )}
          <NumberInput
            label="List price (when new)"
            value={listPrice}
            onChange={setListPrice}
            step={1000}
            hint="Includes options. >£40k triggers the £425/yr expensive-car supplement for 5 years."
          />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">First-year VED</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.firstYearRate)}</p>
            <p className="text-sm text-text/60 mt-1">
              Then {GBP0.format(r.standardRate)}/yr standard
              {r.expensiveCarSupplement > 0 && ` + ${GBP0.format(r.expensiveCarSupplement)}/yr expensive-car supplement (years 2–6)`}
            </p>
          </div>
          <ResultBreakdown
            title="6-year ownership cost"
            rows={[
              { label: "Year 1 (first-year rate)", value: r.firstYearRate },
              { label: "Years 2–6 standard × 5", value: r.standardRate * 5 },
              { label: "Expensive-car supplement years 2–6", value: r.expensiveCarSupplement * 5 },
              { label: "Total 6-year VED", value: r.totalSixYears, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

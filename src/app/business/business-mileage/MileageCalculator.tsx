"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { mileageAllowance, type Vehicle } from "@/lib/business/mileage";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

const VEHICLES: Array<{ value: Vehicle; label: string; rate: string }> = [
  { value: "car", label: "Car/van", rate: "45p / 25p" },
  { value: "motorcycle", label: "Motorcycle", rate: "24p flat" },
  { value: "bicycle", label: "Bicycle", rate: "20p flat" },
];

export default function MileageCalculator() {
  const [vehicle, setVehicle] = useState<Vehicle>("car");
  const [miles, setMiles] = useState<number>(8000);
  const [passenger, setPassenger] = useState<number>(0);
  const r = useMemo(() => mileageAllowance({ vehicle, businessMiles: miles, passengerMiles: passenger }), [vehicle, miles, passenger]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Vehicle</label>
            <div className="grid grid-cols-3 gap-2">
              {VEHICLES.map((v) => (
                <button key={v.value} type="button" onClick={() => setVehicle(v.value)} className={`rounded-md border px-3 py-2 text-xs ${vehicle === v.value ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>
                  <div className="font-semibold">{v.label}</div>
                  <div className="opacity-80">{v.rate}</div>
                </button>
              ))}
            </div>
          </div>
          <NumberInput label="Business miles this year" value={miles} onChange={setMiles} step={500} prefix="" suffix=" mi" />
          {vehicle === "car" && (
            <NumberInput label="Passenger miles (car only, +5p)" value={passenger} onChange={setPassenger} step={100} prefix="" suffix=" mi" hint="Only when a colleague travels with you for the same business trip." />
          )}
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Tax-free allowance</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP.format(r.total)}</p>
          </div>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              ...(vehicle === "car"
                ? [
                    { label: `First ${r.firstBandMiles.toLocaleString()} miles @ 45p`, value: r.firstBandMiles * 0.45 },
                    ...(r.secondBandMiles > 0 ? [{ label: `Next ${r.secondBandMiles.toLocaleString()} miles @ 25p`, value: r.secondBandMiles * 0.25 }] : []),
                  ]
                : [{ label: `${miles.toLocaleString()} mi at flat rate`, value: r.baseAllowance }]),
              ...(r.passengerAllowance > 0 ? [{ label: `${passenger.toLocaleString()} passenger miles @ 5p`, value: r.passengerAllowance }] : []),
              { label: "Total claimable", value: r.total, variant: "total" as const },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

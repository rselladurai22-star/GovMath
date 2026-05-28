"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";

export default function PetrolVsEVCalculator() {
  const [annualMiles, setAnnualMiles] = useState<number>(8000);
  const [mpg, setMpg] = useState<number>(45);
  const [petrolPrice, setPetrolPrice] = useState<number>(1.45);
  const [milesPerKwh, setMilesPerKwh] = useState<number>(3.5);
  const [pricePerKwh, setPricePerKwh] = useState<number>(0.08); // home overnight tariff
  const r = useMemo(() => {
    // Petrol
    const gallons = annualMiles / mpg;
    const litres = gallons * 4.54609;
    const petrolCost = litres * petrolPrice;
    // EV
    const kwhUsed = annualMiles / milesPerKwh;
    const evCost = kwhUsed * pricePerKwh;
    const saving = petrolCost - evCost;
    const petrolPerMile = petrolCost / annualMiles;
    const evPerMile = evCost / annualMiles;
    return { petrolCost, evCost, saving, petrolPerMile, evPerMile };
  }, [annualMiles, mpg, petrolPrice, milesPerKwh, pricePerKwh]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Annual mileage" value={annualMiles} onChange={setAnnualMiles} step={500} min={1000} prefix="" suffix=" mi" />
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="Petrol MPG" value={mpg} onChange={setMpg} step={1} prefix="" suffix=" mpg" />
            <NumberInput label="Petrol £/L" value={petrolPrice} onChange={setPetrolPrice} step={0.01} prefix="£" suffix="" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="EV mi/kWh" value={milesPerKwh} onChange={setMilesPerKwh} step={0.1} prefix="" suffix=" mi/kWh" />
            <NumberInput label="Electricity £/kWh" value={pricePerKwh} onChange={setPricePerKwh} step={0.01} prefix="£" suffix="" />
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 border-2 border-emerald-500 p-6 space-y-3">
          <p className="text-sm font-semibold text-emerald-900 uppercase tracking-wide">Annual saving — EV vs petrol</p>
          <p className="text-4xl font-bold text-emerald-900">£{r.saving.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <div className="border-t border-emerald-500/30 pt-3 space-y-1 text-sm text-emerald-900">
            <div className="flex justify-between"><span>Petrol annual fuel</span><span className="font-medium">£{r.petrolCost.toFixed(0)} ({(r.petrolPerMile * 100).toFixed(1)}p/mi)</span></div>
            <div className="flex justify-between"><span>EV annual charging</span><span className="font-medium">£{r.evCost.toFixed(0)} ({(r.evPerMile * 100).toFixed(1)}p/mi)</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

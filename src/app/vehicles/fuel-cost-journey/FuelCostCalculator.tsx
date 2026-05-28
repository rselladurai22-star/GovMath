"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";

export default function FuelCostCalculator() {
  const [miles, setMiles] = useState<number>(250);
  const [mpg, setMpg] = useState<number>(45);
  const [pricePerLitre, setPricePerLitre] = useState<number>(1.45);
  const r = useMemo(() => {
    const gallons = miles / mpg;
    const litres = gallons * 4.54609;
    const cost = litres * pricePerLitre;
    const costPerMile = cost / miles;
    return { gallons, litres, cost, costPerMile };
  }, [miles, mpg, pricePerLitre]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Journey distance" value={miles} onChange={setMiles} step={10} min={1} prefix="" suffix=" mi" />
          <NumberInput label="MPG (real-world)" value={mpg} onChange={setMpg} step={1} min={5} max={100} prefix="" suffix=" mpg" />
          <NumberInput label="Fuel price" value={pricePerLitre} onChange={setPricePerLitre} step={0.01} min={0.5} max={3} prefix="£" suffix=" /L" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Fuel cost for journey</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.cost.toFixed(2)}</p>
          <p className="text-xs text-text/60">{r.costPerMile.toFixed(2).replace(".", "p ").replace("p ", "p")} per mile</p>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span>Fuel needed</span><span className="font-medium">{r.litres.toFixed(1)} L ({r.gallons.toFixed(2)} gal)</span></div>
            <div className="flex justify-between"><span>Cost per mile</span><span className="font-medium">{(r.costPerMile * 100).toFixed(1)}p</span></div>
            <div className="flex justify-between"><span>Round trip cost</span><span className="font-medium">£{(r.cost * 2).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

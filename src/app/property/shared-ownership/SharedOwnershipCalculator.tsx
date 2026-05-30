"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";

export default function SharedOwnershipCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(300_000);
  const [sharePct, setSharePct] = useState<number>(40);
  const [mortgageRate, setMortgageRate] = useState<number>(5);
  const [termYears, setTermYears] = useState<number>(25);
  const [rentRatePct, setRentRatePct] = useState<number>(2.75);
  const r = useMemo(() => {
    const shareValue = propertyValue * (sharePct / 100);
    const unownedValue = propertyValue - shareValue;
    const annualRent = unownedValue * (rentRatePct / 100);
    const monthlyRent = annualRent / 12;
    const monthlyRate = mortgageRate / 100 / 12;
    const n = termYears * 12;
    const monthlyMortgage = monthlyRate === 0 ? shareValue / n : (shareValue * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
    return { shareValue, unownedValue, monthlyRent, monthlyMortgage, totalMonthly: monthlyRent + monthlyMortgage };
  }, [propertyValue, sharePct, mortgageRate, termYears, rentRatePct]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Full property value" value={propertyValue} onChange={setPropertyValue} step={5000} />
          <NumberInput label="Share you’re buying" value={sharePct} onChange={setSharePct} step={5} min={10} max={75} prefix="" suffix=" %" />
          <NumberInput label="Mortgage rate" value={mortgageRate} onChange={setMortgageRate} step={0.1} prefix="" suffix=" %" />
          <NumberInput label="Mortgage term" value={termYears} onChange={setTermYears} step={1} min={5} max={40} prefix="" suffix=" yrs" />
          <NumberInput label="Rent rate (% of unowned share/yr)" value={rentRatePct} onChange={setRentRatePct} step={0.25} prefix="" suffix=" %" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total monthly housing cost</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalMonthly.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <div className="border-t border-border pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-text/70">Mortgage on £{Math.round(r.shareValue).toLocaleString()}</span><span className="font-medium">£{r.monthlyMortgage.toFixed(0)}</span></div>
            <div className="flex justify-between"><span className="text-text/70">Rent on £{Math.round(r.unownedValue).toLocaleString()}</span><span className="font-medium">£{r.monthlyRent.toFixed(0)}</span></div>
            <div className="flex justify-between border-t border-border pt-2 mt-2 font-semibold"><span>Total</span><span>£{r.totalMonthly.toFixed(0)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

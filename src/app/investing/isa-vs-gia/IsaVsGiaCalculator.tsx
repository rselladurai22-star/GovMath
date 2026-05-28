"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";

export default function IsaVsGiaCalculator() {
  const [pot, setPot] = useState<number>(50_000);
  const [yieldPct, setYieldPct] = useState<number>(3.5);
  const [growthPct, setGrowthPct] = useState<number>(5);
  const [years, setYears] = useState<number>(10);
  const [marginalRate, setMarginalRate] = useState<number>(40);
  const r = useMemo(() => {
    // Annual dividend
    const dividendAnnual = pot * (yieldPct / 100);
    // GIA dividend allowance £500
    const taxableDiv = Math.max(0, dividendAnnual - 500);
    const dividendRate = marginalRate === 20 ? 0.0875 : marginalRate === 40 ? 0.3375 : 0.3935;
    const dividendTaxAnnual = taxableDiv * dividendRate;
    const dividendTaxOverYears = dividendTaxAnnual * years;
    // Growth → CGT eventually (assume realised at end)
    const finalValue = pot * Math.pow(1 + growthPct / 100, years);
    const capitalGain = finalValue - pot;
    const taxableCG = Math.max(0, capitalGain - 3000);
    const cgtRate = marginalRate === 20 ? 0.18 : 0.24;
    const cgtBill = taxableCG * cgtRate;
    const totalGIA = dividendTaxOverYears + cgtBill;
    return { dividendTaxOverYears, cgtBill, totalGIA, dividendAnnual, finalValue, capitalGain };
  }, [pot, yieldPct, growthPct, years, marginalRate]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Amount invested" value={pot} onChange={setPot} step={1000} />
          <NumberInput label="Dividend yield p.a." value={yieldPct} onChange={setYieldPct} step={0.25} prefix="" suffix=" %" />
          <NumberInput label="Capital growth p.a." value={growthPct} onChange={setGrowthPct} step={0.25} prefix="" suffix=" %" />
          <NumberInput label="Years held" value={years} onChange={setYears} step={1} min={1} max={40} prefix="" suffix=" yrs" />
          <div className="space-y-2">
            <label className="text-sm font-medium">Marginal Income Tax rate</label>
            <div className="grid grid-cols-3 gap-2">
              {[20, 40, 45].map((rate) => (
                <button key={rate} type="button" onClick={() => setMarginalRate(rate)} className={`rounded-md border px-3 py-2 text-sm ${marginalRate === rate ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>{rate}%</button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-emerald-50 border-2 border-emerald-500 p-6 space-y-3">
          <p className="text-sm font-semibold text-emerald-900 uppercase tracking-wide">Tax saved by using an ISA</p>
          <p className="text-4xl font-bold text-emerald-900">£{r.totalGIA.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <div className="border-t border-emerald-500/30 pt-3 space-y-1 text-sm text-emerald-900">
            <div className="flex justify-between"><span>Dividend tax (GIA, {years}y)</span><span className="font-medium">£{r.dividendTaxOverYears.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>CGT on realised gain</span><span className="font-medium">£{r.cgtBill.toFixed(0)}</span></div>
            <div className="flex justify-between border-t border-emerald-500/30 pt-2 mt-2 font-semibold"><span>Total GIA tax</span><span>£{r.totalGIA.toFixed(0)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

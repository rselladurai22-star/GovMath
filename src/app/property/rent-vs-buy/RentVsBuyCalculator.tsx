"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";

export default function RentVsBuyCalculator() {
  const [monthlyRent, setMonthlyRent] = useState<number>(1500);
  const [propertyPrice, setPropertyPrice] = useState<number>(350_000);
  const [deposit, setDeposit] = useState<number>(35_000);
  const [mortgageRate, setMortgageRate] = useState<number>(4.5);
  const [years, setYears] = useState<number>(7);
  const [houseGrowth, setHouseGrowth] = useState<number>(2.5);
  const [investReturn, setInvestReturn] = useState<number>(5);
  const r = useMemo(() => {
    const loan = propertyPrice - deposit;
    const term = 25;
    const r_m = mortgageRate / 100 / 12;
    const n = term * 12;
    const monthlyPayment = (loan * r_m * Math.pow(1 + r_m, n)) / (Math.pow(1 + r_m, n) - 1);
    // Total mortgage paid over period
    let balance = loan;
    let totalInterest = 0;
    let totalPrincipal = 0;
    for (let m = 0; m < years * 12; m++) {
      const interest = balance * r_m;
      const principal = monthlyPayment - interest;
      totalInterest += interest;
      totalPrincipal += principal;
      balance -= principal;
    }
    // Buying side: equity = (paid principal + appreciation)
    const futureHouseValue = propertyPrice * Math.pow(1 + houseGrowth / 100, years);
    const finalEquity = futureHouseValue - balance;
    const ownershipCosts = totalInterest + (propertyPrice * 0.01 * years); // ~1%/yr maintenance & service
    const netBuyingCost = ownershipCosts - (finalEquity - deposit);

    // Renting side: rent cost + opportunity-cost growth of deposit invested
    const rentTotal = monthlyRent * 12 * years;
    const investedDepositFV = deposit * Math.pow(1 + investReturn / 100, years);
    const investGain = investedDepositFV - deposit;
    const netRentingCost = rentTotal - investGain;

    return { monthlyPayment, totalInterest, finalEquity, ownershipCosts, rentTotal, investGain, netBuyingCost, netRentingCost, advantage: netRentingCost - netBuyingCost };
  }, [monthlyRent, propertyPrice, deposit, mortgageRate, years, houseGrowth, investReturn]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Monthly rent" value={monthlyRent} onChange={setMonthlyRent} step={50} />
          <NumberInput label="Property price" value={propertyPrice} onChange={setPropertyPrice} step={5000} />
          <NumberInput label="Deposit" value={deposit} onChange={setDeposit} step={1000} />
          <NumberInput label="Mortgage rate" value={mortgageRate} onChange={setMortgageRate} step={0.1} prefix="" suffix=" %" />
          <NumberInput label="Years to compare" value={years} onChange={setYears} step={1} min={1} max={30} prefix="" suffix=" yrs" />
          <div className="grid grid-cols-2 gap-4">
            <NumberInput label="House growth p.a." value={houseGrowth} onChange={setHouseGrowth} step={0.25} prefix="" suffix=" %" />
            <NumberInput label="Investment return" value={investReturn} onChange={setInvestReturn} step={0.25} prefix="" suffix=" %" />
          </div>
        </div>
        <div className={`rounded-xl border-2 p-6 space-y-3 ${r.advantage >= 0 ? "bg-emerald-50 border-emerald-500" : "bg-amber-50 border-amber-500"}`}>
          <p className={`text-sm font-semibold uppercase tracking-wide ${r.advantage >= 0 ? "text-emerald-900" : "text-amber-900"}`}>{r.advantage >= 0 ? "Buying wins over period" : "Renting + investing wins"}</p>
          <p className={`text-4xl font-bold ${r.advantage >= 0 ? "text-emerald-900" : "text-amber-900"}`}>£{Math.abs(r.advantage).toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <div className={`border-t pt-3 space-y-1 text-sm ${r.advantage >= 0 ? "text-emerald-900 border-emerald-500/30" : "text-amber-900 border-amber-500/30"}`}>
            <div className="flex justify-between"><span>Buy: mortgage payment</span><span className="font-medium">£{r.monthlyPayment.toFixed(0)}/mo</span></div>
            <div className="flex justify-between"><span>Buy: interest paid</span><span className="font-medium">£{r.totalInterest.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>Buy: equity built</span><span className="font-medium">£{r.finalEquity.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>Rent: total paid</span><span className="font-medium">£{r.rentTotal.toFixed(0)}</span></div>
            <div className="flex justify-between"><span>Rent: investment gain on deposit</span><span className="font-medium">£{r.investGain.toFixed(0)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

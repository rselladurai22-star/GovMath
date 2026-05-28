"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function IR35Calculator() {
  const [dayRate, setDayRate] = useState<number>(500);
  const [daysPerYear, setDaysPerYear] = useState<number>(220);
  const r = useMemo(() => {
    const annualBilling = dayRate * daysPerYear;
    // Inside IR35: taxed as employee. Approximate: gross billing → employer NI 15% deducted by fee-payer first, then PAYE + employee NI
    const employerNI = Math.max(0, (annualBilling - 5000)) * 0.15;
    const grossEmployment = annualBilling - employerNI;
    // Income tax on grossEmployment with £12,570 PA
    const pa = 12570;
    const taxable = Math.max(0, grossEmployment - pa);
    const basic = Math.min(taxable, 37700);
    const higher = Math.max(0, Math.min(taxable - 37700, 125140 - 50270));
    const addl = Math.max(0, taxable - (125140 - 12570));
    // Personal allowance taper above 100k
    const paLost = grossEmployment > 100000 ? Math.min(pa, (grossEmployment - 100000) / 2) : 0;
    const incomeTax = basic * 0.20 + higher * 0.40 + addl * 0.45 + paLost * 0.40;
    // Employee NI 8% above £12,570 up to £50,270, 2% above
    const ni8 = Math.max(0, Math.min(grossEmployment, 50270) - 12570) * 0.08;
    const ni2 = Math.max(0, grossEmployment - 50270) * 0.02;
    const insideTake = grossEmployment - incomeTax - ni8 - ni2;

    // Outside IR35 (Ltd Co): small salary £12,570 + dividends, after 19/25% corp tax
    const salary = 12570;
    const profitBeforeTax = annualBilling - salary;
    const corpTax = profitBeforeTax * (profitBeforeTax > 50000 ? 0.25 : 0.19);
    const dividendsAvailable = profitBeforeTax - corpTax;
    // Dividend tax: £500 allowance, then 8.75% basic, 33.75% higher, 39.35% addl
    // Salary uses PA, so dividend uses remaining basic band
    const dividendAllowance = 500;
    const taxableDivs = Math.max(0, dividendsAvailable - dividendAllowance);
    const basicBandRemaining = 37700; // since salary < PA
    const divBasic = Math.min(taxableDivs, basicBandRemaining) * 0.0875;
    const divHigher = Math.max(0, Math.min(taxableDivs - basicBandRemaining, 125140 - 50270)) * 0.3375;
    const divAddl = Math.max(0, taxableDivs - (125140 - 12570)) * 0.3935;
    const divTax = divBasic + divHigher + divAddl;
    const outsideTake = salary + dividendsAvailable - divTax;

    const difference = outsideTake - insideTake;
    return { annualBilling, insideTake, outsideTake, difference };
  }, [dayRate, daysPerYear]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Day rate" value={dayRate} onChange={setDayRate} step={25} />
          <NumberInput label="Billable days/year" value={daysPerYear} onChange={setDaysPerYear} step={5} min={1} max={365} prefix="" suffix=" days" />
          <p className="text-xs text-text/60">Illustrative comparison. Excludes expenses, pension contributions and accountancy fees.</p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Outside-IR35 advantage</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.difference.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">per year on £{r.annualBilling.toLocaleString()} billing</p>
          <ResultBreakdown
            title="Take-home comparison"
            rows={[
              { label: "Inside IR35 (deemed employee)", value: r.insideTake },
              { label: "Outside IR35 (Ltd Co)", value: r.outsideTake },
              { label: "Difference", value: r.difference, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

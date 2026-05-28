"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { childBenefit, highIncomeChildBenefitCharge } from "@/lib/benefits/child-benefit";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const PCT = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export default function HICBCCalculator() {
  const [children, setChildren] = useState<number>(2);
  const [income, setIncome] = useState<number>(70_000);
  const cb = useMemo(() => childBenefit(children), [children]);
  const r = useMemo(() => highIncomeChildBenefitCharge(cb.annual, income), [cb.annual, income]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Number of children" value={children} onChange={setChildren} min={0} max={15} step={1} prefix="" />
          <NumberInput label="Adjusted net income (highest earner)" value={income} onChange={setIncome} step={1000} hint="Gross income less pension contributions and gift aid." />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">HICBC clawback</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.charge)}</p>
            <p className="text-sm text-text/60 mt-1">{PCT.format(r.chargePct)} of your annual benefit clawed back</p>
          </div>
          <ResultBreakdown
            title="Net retained"
            rows={[
              { label: "Annual Child Benefit", value: r.annualBenefit },
              { label: "HICBC charge", value: r.charge, variant: "deduction" },
              { label: "You keep", value: r.netRetained, variant: "total" },
            ]}
          />
          {income >= 80_000 && (
            <p className="text-xs bg-amber-50 border border-amber-300 text-amber-900 rounded-md p-3">
              ⚠ At £80,000+ the full charge applies. Still worth claiming for NI credits — opt out of payment instead.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

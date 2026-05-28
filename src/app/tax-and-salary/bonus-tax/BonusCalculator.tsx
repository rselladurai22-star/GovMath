"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { takeHomePay } from "@/lib/tax/2025-26";

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

export default function BonusCalculator() {
  const [salary, setSalary] = useState<number>(45_000);
  const [bonus, setBonus] = useState<number>(5_000);

  const withoutBonus = useMemo(() => takeHomePay(salary), [salary]);
  const withBonus = useMemo(() => takeHomePay(salary + bonus), [salary, bonus]);

  const bonusTax =
    (withBonus.incomeTax.total - withoutBonus.incomeTax.total) +
    (withBonus.ni.total - withoutBonus.ni.total);
  const bonusNet = bonus - bonusTax;
  const bonusEffectiveRate = bonus > 0 ? bonusTax / bonus : 0;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your pay</h2>
          <NumberInput
            label="Base annual salary"
            value={salary}
            onChange={setSalary}
            step={500}
          />
          <NumberInput
            label="One-off bonus (gross)"
            value={bonus}
            onChange={setBonus}
            step={250}
          />
        </div>

        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
              You keep
            </p>
            <p className="text-4xl font-bold text-primary-dark mt-1">
              {GBP0.format(bonusNet)}
            </p>
            <p className="text-sm text-text/60 mt-1">
              of your {GBP0.format(bonus)} bonus
              {bonus > 0 &&
                ` (${(bonusEffectiveRate * 100).toFixed(1)}% taken in tax & NI)`}
            </p>
          </div>
          <ResultBreakdown
            title="Bonus breakdown"
            rows={[
              { label: "Gross bonus", value: bonus, variant: "total" },
              { label: "Extra Income Tax", value: withBonus.incomeTax.total - withoutBonus.incomeTax.total, variant: "deduction" },
              { label: "Extra National Insurance", value: withBonus.ni.total - withoutBonus.ni.total, variant: "deduction" },
              { label: "Net bonus in your pocket", value: bonusNet, variant: "total" },
            ]}
          />
          {salary < 100_000 && salary + bonus > 100_000 && (
            <p className="text-xs bg-error/10 border border-error/30 text-error rounded-md p-3">
              ⚠ Your bonus pushes you over £100,000 — Personal Allowance starts tapering, creating an effective 60% tax rate on that band.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

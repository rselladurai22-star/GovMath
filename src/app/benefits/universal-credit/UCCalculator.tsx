"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import {
  universalCredit,
  type Household,
} from "@/lib/benefits/universal-credit";

const GBP2 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

const HOUSEHOLDS: { value: Household; label: string }[] = [
  { value: "single-under-25", label: "Single, under 25" },
  { value: "single-25-plus", label: "Single, 25 or over" },
  { value: "couple-both-under-25", label: "Couple, both under 25" },
  { value: "couple-either-25-plus", label: "Couple, one or both 25+" },
];

export default function UCCalculator() {
  const [household, setHousehold] = useState<Household>("single-25-plus");
  const [children, setChildren] = useState<number>(0);
  const [firstChildPre2017, setFirstChildPre2017] = useState<boolean>(false);
  const [monthlyRent, setMonthlyRent] = useState<number>(0);
  const [monthlyEarnings, setMonthlyEarnings] = useState<number>(0);
  const [hasWorkAllowance, setHasWorkAllowance] = useState<boolean>(false);
  const [capital, setCapital] = useState<number>(0);

  const r = useMemo(
    () =>
      universalCredit({
        household,
        children,
        firstChildPre2017,
        monthlyRent,
        monthlyEarnings,
        hasWorkAllowance,
        capital,
      }),
    [household, children, firstChildPre2017, monthlyRent, monthlyEarnings, hasWorkAllowance, capital]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your household</h2>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Who is claiming?
            </label>
            <div className="grid gap-2">
              {HOUSEHOLDS.map((h) => (
                <label
                  key={h.value}
                  className={`flex items-center gap-3 rounded-md border px-3 py-2 cursor-pointer text-sm ${
                    household === h.value
                      ? "border-primary bg-primary/5"
                      : "border-border bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="household"
                    value={h.value}
                    checked={household === h.value}
                    onChange={() => setHousehold(h.value)}
                    className="accent-primary"
                  />
                  {h.label}
                </label>
              ))}
            </div>
          </div>

          <NumberInput
            label="Dependent children"
            value={children}
            onChange={setChildren}
            min={0}
            max={10}
            step={1}
            prefix=""
            hint="Children under 16, or under 20 in approved education. Two-child limit applies — child elements stop at 2 (exceptions exist)."
          />

          {children > 0 && (
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={firstChildPre2017}
                onChange={(e) => setFirstChildPre2017(e.target.checked)}
                className="mt-1 accent-primary"
              />
              <span>
                First child born <strong>before 6 April 2017</strong>{" "}
                (unlocks the higher first-child rate of £339.00/mo).
              </span>
            </label>
          )}

          <NumberInput
            label="Monthly rent (housing cost)"
            value={monthlyRent}
            onChange={setMonthlyRent}
            min={0}
            step={50}
            hint="Capped to your Local Housing Allowance rate or actual rent — whichever is lower. Leave at £0 if you own outright."
          />

          <NumberInput
            label="Combined net monthly earnings"
            value={monthlyEarnings}
            onChange={setMonthlyEarnings}
            min={0}
            step={100}
            hint="Take-home pay after tax, NI and pension."
          />

          <label className="flex items-start gap-3 text-sm">
            <input
              type="checkbox"
              checked={hasWorkAllowance}
              onChange={(e) => setHasWorkAllowance(e.target.checked)}
              className="mt-1 accent-primary"
            />
            <span>
              I have a <strong>work allowance</strong> — either I&apos;m
              responsible for a child, or I have limited capability for work.
            </span>
          </label>

          <NumberInput
            label="Total savings & capital"
            value={capital}
            onChange={setCapital}
            min={0}
            step={500}
            hint="Includes savings, ISAs and most investments. Under £6,000 is ignored; £16,000+ ends the claim."
          />
        </div>

        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
              Estimated monthly award
            </p>
            <p className="text-4xl font-bold text-primary-dark mt-1">
              {GBP2.format(r.estimatedAward)}
            </p>
            <p className="text-sm text-text/60 mt-1">
              {GBP2.format(r.estimatedAward * 12)} per year
            </p>
          </div>

          {r.capitalIneligible && (
            <p className="text-sm bg-error/10 border border-error/30 text-error rounded-md p-3">
              ⚠ Capital is £16,000 or above — you would not currently qualify
              for Universal Credit.
            </p>
          )}

          <ResultBreakdown
            title="Award breakdown"
            rows={[
              { label: "Standard allowance", value: r.standardAllowance },
              { label: "Child element", value: r.childElement },
              { label: "Housing element", value: r.housingElement },
              {
                label: "Maximum award (before deductions)",
                value: r.maximumAward,
                variant: "total",
              },
              {
                label: `Earnings taper (55% above £${r.workAllowance} WA)`,
                value: r.taperedEarnings,
                variant: "deduction",
              },
              {
                label: "Capital tariff (£4.35 per £250 above £6k)",
                value: r.capitalDeduction,
                variant: "deduction",
              },
              {
                label: "Estimated monthly award",
                value: r.estimatedAward,
                variant: "total",
              },
            ]}
          />

          <p className="text-xs text-text/60">
            DWP uses your actual assessment-period earnings reported via PAYE.
            This estimator does not include LCWRA additions, carer&apos;s
            element, transitional protection, or sanctions.
          </p>
        </div>
      </div>
    </div>
  );
}

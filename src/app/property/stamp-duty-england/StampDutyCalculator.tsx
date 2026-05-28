"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { stampDuty, type BuyerType } from "@/lib/tax/sdlt-2025";

const GBP0 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const BUYER_OPTIONS: { value: BuyerType; label: string; hint: string }[] = [
  {
    value: "standard",
    label: "Moving home",
    hint: "Replacing your main residence.",
  },
  {
    value: "first-time",
    label: "First-time buyer",
    hint: "Never owned before. Relief up to £500,000.",
  },
  {
    value: "additional",
    label: "Additional property",
    hint: "Second home or buy-to-let. +5% surcharge.",
  },
];

export default function StampDutyCalculator({
  initialPrice = 295_000,
  initialBuyerType = "standard",
}: {
  initialPrice?: number;
  initialBuyerType?: BuyerType;
}) {
  const [price, setPrice] = useState<number>(initialPrice);
  const [buyerType, setBuyerType] = useState<BuyerType>(initialBuyerType);

  const result = useMemo(() => stampDuty(price, buyerType), [price, buyerType]);

  const reliefLostAt500k =
    buyerType === "first-time" && price > 500_000
      ? "First-time buyer relief only applies on purchases up to £500,000 — standard rates have been used instead."
      : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-primary-dark">
          Your purchase
        </h2>

        <NumberInput
          label="Purchase price"
          value={price}
          onChange={setPrice}
          min={0}
          step={5000}
          hint="The agreed price you’re paying for the property."
        />

        <fieldset>
          <legend className="block text-sm font-semibold text-text mb-2">
            Buyer type
          </legend>
          <div role="radiogroup" className="space-y-2">
            {BUYER_OPTIONS.map((opt) => {
              const active = buyerType === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setBuyerType(opt.value)}
                  className={`w-full text-left rounded-md border p-3 transition-colors ${
                    active
                      ? "border-primary bg-card-hover"
                      : "border-border bg-white hover:border-primary"
                  }`}
                >
                  <div className="font-semibold text-text">{opt.label}</div>
                  <div className="text-xs text-text/70 mt-0.5">{opt.hint}</div>
                </button>
              );
            })}
          </div>
        </fieldset>

        <p className="text-xs text-text/60">
          England &amp; Northern Ireland only. Scotland uses LBTT, Wales uses
          LTT — different rules and rates apply.
        </p>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl bg-primary-dark text-white p-6">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
            Stamp Duty payable
          </div>
          <div className="text-4xl font-extrabold mt-1 font-mono tabular-nums">
            {GBP0.format(Math.round(result.total))}
          </div>
          <div className="mt-3 text-sm text-white/80">
            Effective rate{" "}
            <span className="font-semibold text-white">
              {(result.effectiveRate * 100).toFixed(2)}%
            </span>{" "}
            of the purchase price.
          </div>
          {reliefLostAt500k && (
            <p className="mt-4 text-xs bg-white/10 border border-white/20 rounded-md p-3">
              {reliefLostAt500k}
            </p>
          )}
        </div>

        <ResultBreakdown
          title="Band-by-band breakdown"
          rows={[
            ...result.breakdown.map((row) => ({
              label: row.band,
              value: row.tax,
              hint: `${(row.rate * 100).toFixed(0)}% on ${GBP0.format(
                row.taxableInBand
              )}`,
              variant: row.tax > 0 ? ("deduction" as const) : undefined,
            })),
            {
              label: "Total Stamp Duty",
              value: result.total,
              variant: "total" as const,
            },
          ]}
        />
      </div>
    </div>
  );
}

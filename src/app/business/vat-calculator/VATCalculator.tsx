"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import {
  addVat,
  flatRateComparison,
  removeVat,
  VAT_RATES,
  type VatRateKey,
} from "@/lib/tax/vat";

const GBP2 = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 2,
});

type Direction = "add" | "remove";

const RATE_OPTIONS: { key: VatRateKey; label: string; hint: string }[] = [
  { key: "standard", label: "Standard 20%", hint: "Most goods and services." },
  {
    key: "reduced",
    label: "Reduced 5%",
    hint: "Domestic energy, children’s car seats, some renovations.",
  },
  {
    key: "zero",
    label: "Zero 0%",
    hint: "Most food, books, kids’ clothes, public transport.",
  },
];

export default function VATCalculator({
  initialAmount = 100,
  initialDirection = "add",
  initialRateKey = "standard",
}: {
  initialAmount?: number;
  initialDirection?: Direction;
  initialRateKey?: VatRateKey;
}) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [direction, setDirection] = useState<Direction>(initialDirection);
  const [rateKey, setRateKey] = useState<VatRateKey>(initialRateKey);

  const rate = VAT_RATES[rateKey];

  const result = useMemo(
    () => (direction === "add" ? addVat(amount, rate) : removeVat(amount, rate)),
    [amount, direction, rate]
  );

  // Flat Rate Scheme preview — only meaningful at the standard rate.
  const [flatRatePct, setFlatRatePct] = useState<number>(14.5);
  const frs = useMemo(
    () =>
      flatRateComparison(
        direction === "add" ? amount : result.net,
        VAT_RATES.standard,
        flatRatePct / 100
      ),
    [amount, direction, result.net, flatRatePct]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">Your amount</h2>

          <fieldset>
            <legend className="block text-sm font-semibold text-text mb-2">
              What do you want to do?
            </legend>
            <div
              role="radiogroup"
              className="grid grid-cols-2 rounded-md border border-border overflow-hidden"
            >
              {(["add", "remove"] as Direction[]).map((d) => {
                const active = direction === d;
                return (
                  <button
                    key={d}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setDirection(d)}
                    className={`py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary text-white"
                        : "bg-white text-text hover:bg-card-hover"
                    }`}
                  >
                    {d === "add" ? "Add VAT" : "Remove VAT"}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <NumberInput
            label={direction === "add" ? "Net amount (ex-VAT)" : "Gross amount (inc-VAT)"}
            value={amount}
            onChange={setAmount}
            min={0}
            step={1}
            hint={
              direction === "add"
                ? "The price before VAT is added."
                : "The price the customer paid, including VAT."
            }
          />

          <fieldset>
            <legend className="block text-sm font-semibold text-text mb-2">
              VAT rate
            </legend>
            <div role="radiogroup" className="space-y-2">
              {RATE_OPTIONS.map((opt) => {
                const active = rateKey === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRateKey(opt.key)}
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
        </div>

        <div className="space-y-5">
          <div className="rounded-xl bg-primary-dark text-white p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {direction === "add" ? "Gross (you charge customer)" : "Net (your revenue)"}
            </div>
            <div className="text-4xl font-extrabold mt-1 font-mono tabular-nums">
              {GBP2.format(direction === "add" ? result.gross : result.net)}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center text-sm">
              <div className="rounded-md bg-white/10 p-3">
                <div className="text-white/70 text-xs">VAT</div>
                <div className="font-bold font-mono tabular-nums">
                  {GBP2.format(result.vat)}
                </div>
              </div>
              <div className="rounded-md bg-white/10 p-3">
                <div className="text-white/70 text-xs">
                  {direction === "add" ? "Net" : "Gross"}
                </div>
                <div className="font-bold font-mono tabular-nums">
                  {GBP2.format(direction === "add" ? result.net : result.gross)}
                </div>
              </div>
            </div>
            <div className="mt-4 text-xs text-white/70">
              Rate applied:{" "}
              <span className="font-semibold text-white">
                {(rate * 100).toFixed(0)}%
              </span>
            </div>
          </div>

          <ResultBreakdown
            title="Line-by-line"
            rows={[
              { label: "Net (before VAT)", value: result.net },
              {
                label: `VAT @ ${(rate * 100).toFixed(0)}%`,
                value: result.vat,
                variant: result.vat > 0 ? "deduction" : undefined,
              },
              {
                label: "Gross (after VAT)",
                value: result.gross,
                variant: "total",
              },
            ]}
          />
        </div>
      </div>

      {/* Flat Rate Scheme comparison — only useful when rate is standard */}
      {rateKey === "standard" && (
        <div className="rounded-xl bg-surface border border-border p-6 space-y-4">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-lg font-bold text-primary-dark">
                Should you join the Flat Rate Scheme?
              </h2>
              <p className="text-sm text-text/75 mt-1">
                Compares what you’d pay HMRC under standard VAT accounting
                vs. the Flat Rate Scheme (FRS) for your trade.
              </p>
            </div>
            <label className="text-sm">
              <span className="block font-semibold text-text mb-1">
                Your flat rate
              </span>
              <span className="inline-flex items-center rounded-md border border-border bg-white px-3 py-2">
                <input
                  type="number"
                  value={flatRatePct}
                  onChange={(e) =>
                    setFlatRatePct(Number(e.target.value) || 0)
                  }
                  step={0.5}
                  min={0}
                  max={20}
                  className="w-20 text-right outline-none"
                />
                <span className="ml-1 text-text/70">%</span>
              </span>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="rounded-md border border-border p-4">
              <div className="text-text/60 text-xs uppercase tracking-wider">
                Standard accounting
              </div>
              <div className="font-mono tabular-nums text-2xl font-bold text-primary-dark mt-1">
                {GBP2.format(frs.standardSchemeVat)}
              </div>
              <div className="text-xs text-text/70 mt-1">
                20% of your net sales, paid to HMRC. You can reclaim input
                VAT separately.
              </div>
            </div>
            <div className="rounded-md border border-border p-4">
              <div className="text-text/60 text-xs uppercase tracking-wider">
                Flat Rate Scheme
              </div>
              <div className="font-mono tabular-nums text-2xl font-bold text-primary-dark mt-1">
                {GBP2.format(frs.flatSchemeVat)}
              </div>
              <div className="text-xs text-text/70 mt-1">
                {flatRatePct}% of your VAT-inclusive turnover. You can’t
                reclaim input VAT (with limited exceptions).
              </div>
            </div>
            <div
              className={`rounded-md border p-4 ${
                frs.betterScheme === "flat"
                  ? "border-success bg-success/5"
                  : frs.betterScheme === "standard"
                  ? "border-primary bg-card-hover"
                  : "border-border"
              }`}
            >
              <div className="text-text/60 text-xs uppercase tracking-wider">
                Headline difference
              </div>
              <div className="font-mono tabular-nums text-2xl font-bold mt-1">
                {GBP2.format(Math.abs(frs.difference))}
              </div>
              <div className="text-xs text-text/70 mt-1">
                {frs.betterScheme === "flat" &&
                  "FRS looks cheaper before counting input VAT you could otherwise reclaim."}
                {frs.betterScheme === "standard" &&
                  "Standard accounting wins — and you can still reclaim input VAT on top."}
                {frs.betterScheme === "tie" && "Both schemes cost the same."}
              </div>
            </div>
          </div>

          <p className="text-xs text-text/60">
            This is a headline comparison only. The real answer depends on how
            much VAT you’d reclaim on purchases under standard accounting —
            check with an accountant before switching.
          </p>
        </div>
      )}
    </div>
  );
}

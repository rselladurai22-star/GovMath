"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { inheritanceTax } from "@/lib/iht";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });
const PCT = new Intl.NumberFormat("en-GB", { style: "percent", maximumFractionDigits: 1 });

export default function IHTCalculator() {
  const [estate, setEstate] = useState<number>(750_000);
  const [passingHome, setPassingHome] = useState<boolean>(true);
  const [transferPct, setTransferPct] = useState<number>(0);

  const r = useMemo(
    () =>
      inheritanceTax({
        estateValue: estate,
        passingHomeToDescendants: passingHome,
        spouseTransferPct: transferPct,
      }),
    [estate, passingHome, transferPct]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h2 className="text-lg font-bold text-primary-dark">The estate</h2>
          <NumberInput
            label="Estate value"
            value={estate}
            onChange={setEstate}
            step={10_000}
            hint="Property + investments + cash + chattels, after debts/funeral costs."
          />
          <label className="flex items-start gap-3 cursor-pointer text-sm">
            <input
              type="checkbox"
              checked={passingHome}
              onChange={(e) => setPassingHome(e.target.checked)}
              className="mt-1 accent-primary"
            />
            <span>
              <span className="font-semibold">Main residence passes to direct descendants</span>
              <span className="block text-text/60 text-xs mt-0.5">Unlocks the Residence Nil-Rate Band (up to £175,000).</span>
            </span>
          </label>
          <div>
            <label className="block text-sm font-semibold text-text mb-2">
              Transferred allowance from deceased spouse: {transferPct}%
            </label>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={transferPct}
              onChange={(e) => setTransferPct(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <p className="text-xs text-text/60 mt-1">
              100% if your spouse used none of their allowances. Doubles both NRB and RNRB.
            </p>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Inheritance Tax due</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.ihtDue)}</p>
            <p className="text-sm text-text/60 mt-1">
              Effective rate {PCT.format(r.effectiveRate)} on the whole estate
            </p>
          </div>
          <ResultBreakdown
            title="Allowances"
            rows={[
              { label: "Estate value", value: r.estateValue },
              { label: "Nil-Rate Band (NRB)", value: r.nilRateBand, variant: "deduction" },
              { label: "Residence NRB", value: r.residenceNilRateBand, variant: "deduction" },
              { label: "Taxable estate", value: r.taxableEstate },
              { label: "IHT at 40%", value: r.ihtDue, variant: "total" },
            ]}
          />
          {estate > 2_000_000 && passingHome && (
            <p className="text-xs bg-amber-50 border border-amber-300 text-amber-900 rounded-md p-3">
              ⚠ RNRB tapers £1 for every £2 of estate over £2m — fully gone at £2.35m (or £2.7m with full spousal transfer).
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

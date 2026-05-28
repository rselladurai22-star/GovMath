"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { ucTaper } from "@/lib/benefits/uc-taper";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function UCTaperCalculator() {
  const [maxUC, setMaxUC] = useState<number>(800);
  const [earnings, setEarnings] = useState<number>(1200);
  const [housing, setHousing] = useState<boolean>(true);
  const r = useMemo(() => ucTaper({ monthlyMaxUC: maxUC, netMonthlyEarnings: earnings, receivingHousingElement: housing }), [maxUC, earnings, housing]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Monthly max UC (no earnings)" value={maxUC} onChange={setMaxUC} step={25} hint="Total of standard allowance + child + housing + LCWRA elements." />
          <NumberInput label="Net monthly earnings" value={earnings} onChange={setEarnings} step={50} hint="After tax & NI." />
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input type="checkbox" checked={housing} onChange={(e) => setHousing(e.target.checked)} className="accent-primary" />
            <span>I receive the housing element (work allowance £411/mo)</span>
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">UC after taper</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.finalUC)}<span className="text-base text-text/60">/mo</span></p>
          </div>
          <ResultBreakdown
            title="How the taper works"
            rows={[
              { label: "Max UC", value: maxUC },
              { label: `Work allowance (${housing ? "housing" : "no housing"})`, value: r.workAllowance, variant: "deduction" },
              { label: "Earnings above allowance", value: r.earningsAboveAllowance },
              { label: "Taper reduction (55%)", value: r.taperReduction, variant: "deduction" },
              { label: "UC paid", value: r.finalUC, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

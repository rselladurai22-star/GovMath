"use client";

import { useMemo, useState } from "react";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { councilTax, type CtBand, type CtNation } from "@/lib/property/council-tax-bands";

const BANDS_EW: CtBand[] = ["A","B","C","D","E","F","G","H"];
const BANDS_WALES: CtBand[] = ["A","B","C","D","E","F","G","H","I"];
const BANDS_SCOT: CtBand[] = ["A","B","C","D","E","F","G","H"];

export default function CouncilTaxBandsCalculator() {
  const [nation, setNation] = useState<CtNation>("england");
  const [band, setBand] = useState<CtBand>("D");
  const [singlePerson, setSingle] = useState<boolean>(false);

  const bands = nation === "wales" ? BANDS_WALES : nation === "scotland" ? BANDS_SCOT : BANDS_EW;
  const r = useMemo(() => councilTax({ band, nation, singlePerson }), [band, nation, singlePerson]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Nation</label>
            <select value={nation} onChange={(e) => setNation(e.target.value as CtNation)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              <option value="england">England</option>
              <option value="wales">Wales</option>
              <option value="scotland">Scotland</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Band</label>
            <select value={band} onChange={(e) => setBand(e.target.value as CtBand)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              {bands.map((b) => <option key={b} value={b}>Band {b}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={singlePerson} onChange={(e) => setSingle(e.target.checked)} />
            <span>Apply 25% single-person discount</span>
          </label>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Annual council tax</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.payable.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">≈ £{r.monthlyBill.toFixed(0)}/month over 12 instalments.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Band D national average (${nation})`, value: r.bandDAverage },
              { label: `Band ${band} multiplier × ${r.multiplier.toFixed(2)}`, value: r.annualBill },
              { label: "Single-person discount", value: r.discount, variant: r.discount > 0 ? "deduction" : "default" },
              { label: "Payable", value: r.payable, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

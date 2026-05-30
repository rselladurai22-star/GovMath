"use client";

import { useMemo, useState } from "react";
import { decodeTaxCode } from "@/lib/tax/tax-code";

export default function TaxCodeDecoderCalculator() {
  const [code, setCode] = useState<string>("1257L");
  const r = useMemo(() => decodeTaxCode(code), [code]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Tax code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. 1257L"
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-lg font-mono uppercase tracking-wider"
            />
            <p className="text-xs text-text/60 mt-1">Type the code from your payslip or P45 — letters and numbers, no spaces.</p>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">
            {r.valid ? "Personal allowance" : "Status"}
          </p>
          {r.valid ? (
            <>
              <p className="text-4xl font-bold text-primary-dark">
                £{r.personalAllowance.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-text/60">Annual tax-free amount implied by this code.</p>
              <div className="rounded-lg bg-surface border border-border p-4 mt-3 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-text/70">Region</span><span className="font-semibold uppercase">{r.region === "rUK" ? "Rest of UK" : r.region}</span></div>
                <div className="flex justify-between"><span className="text-text/70">Emergency?</span><span className="font-semibold">{r.emergency ? "Yes (W1/M1/X)" : "No"}</span></div>
                <div className="flex justify-between"><span className="text-text/70">Type</span><span className="font-semibold uppercase">{r.type}</span></div>
              </div>
              <p className="text-sm text-text/85 mt-3">{r.meaning}</p>
            </>
          ) : (
            <>
              <p className="text-2xl font-bold text-error">Unrecognised code</p>
              <p className="text-sm text-text/85 mt-2">{r.meaning}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

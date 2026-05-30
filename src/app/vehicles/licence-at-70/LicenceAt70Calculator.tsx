"use client";

import { useMemo, useState } from "react";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { licenceAt70 } from "@/lib/vehicles/licence-at-70";

export default function LicenceAt70Calculator() {
  const [dob, setDob] = useState<string>("1960-06-15");
  const r = useMemo(() => licenceAt70({ dateOfBirth: dob }), [dob]);

  const renewalDateFormatted = new Date(r.nextRenewalDate).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Date of birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Next renewal</p>
          <p className="text-3xl font-bold text-primary-dark">{renewalDateFormatted}</p>
          <p className="text-sm text-text/70">
            On your {r.nextRenewalAge}th birthday — about {r.yearsUntilNextRenewal.toFixed(1)} years away.
          </p>
          <ResultBreakdown
            title="Details"
            rows={[
              { label: "Current age", value: r.ageYears },
              { label: "Renewal age", value: r.nextRenewalAge, variant: "total" },
            ]}
          />
          {r.must70Renew && (
            <p className="text-sm text-amber-700 font-semibold">You’re past 70 — make sure your current licence is still valid.</p>
          )}
        </div>
      </div>
    </div>
  );
}

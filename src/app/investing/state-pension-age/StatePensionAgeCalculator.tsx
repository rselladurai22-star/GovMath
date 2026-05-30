"use client";

import { useMemo, useState } from "react";
import { statePensionAge } from "@/lib/investing/state-pension-age";

export default function StatePensionAgeCalculator() {
  const [dob, setDob] = useState<string>("1980-06-15");
  const r = useMemo(() => statePensionAge({ dob }), [dob]);

  const displaySpa = r.spaMonths > 0 ? `${r.spaYears} yrs ${r.spaMonths} mo` : `${r.spaYears} years`;
  const formattedSpaDate = new Date(r.spaDate).toLocaleDateString("en-GB", {
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
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Your State Pension Age</p>
          <p className="text-4xl font-bold text-primary-dark">{displaySpa}</p>
          <p className="text-sm text-text/80">
            You reach SPA on <strong>{formattedSpaDate}</strong>.
          </p>
          <p className="text-xs text-text/60 pt-2">{r.notes}</p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { rightToRent } from "@/lib/right-to-rent";

type Nat = "uk" | "irish" | "other-eu" | "non-eu";
const NATIONS: { key: Nat; label: string }[] = [
  { key: "uk", label: "UK citizen" },
  { key: "irish", label: "Irish citizen" },
  { key: "other-eu", label: "Other EU/EEA" },
  { key: "non-eu", label: "Non-EU" },
];

export default function RightToRentChecker() {
  const [nationality, setNationality] = useState<Nat>("non-eu");
  const [ilr, setIlr] = useState<boolean>(false);
  const [visa, setVisa] = useState<string>("2027-06-01");

  const r = useMemo(() => rightToRent({ nationality, ilrOrSettled: ilr, visaExpiry: visa }), [nationality, ilr, visa]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Tenant nationality</label>
            <select value={nationality} onChange={(e) => setNationality(e.target.value as Nat)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              {NATIONS.map((n) => <option key={n.key} value={n.key}>{n.label}</option>)}
            </select>
          </div>
          {nationality !== "uk" && nationality !== "irish" && (
            <>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={ilr} onChange={(e) => setIlr(e.target.checked)} />
                <span>Has Indefinite Leave to Remain / Settled Status</span>
              </label>
              {!ilr && (
                <div>
                  <label className="block text-sm font-semibold text-text mb-1">Visa expiry date</label>
                  <input type="date" value={visa} onChange={(e) => setVisa(e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" />
                </div>
              )}
            </>
          )}
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Check method</p>
          <p className="text-xl font-bold text-primary-dark">
            {r.list === "A" ? "List A (physical documents)" : "Online share code"}
          </p>
          <p className="text-sm text-text/70">{r.guidance}</p>
          {r.recheckRequired && r.recheckDate && (
            <p className="text-sm text-amber-700 font-semibold">Recheck required by: {r.recheckDate}</p>
          )}
        </div>
      </div>
    </div>
  );
}

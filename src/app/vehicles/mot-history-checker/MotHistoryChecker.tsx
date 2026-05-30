"use client";

import { useMemo, useState } from "react";
import { checkRegistration, MOT_STATUSES } from "@/lib/vehicles/mot-history";

export default function MotHistoryChecker() {
  const [reg, setReg] = useState<string>("");
  const r = useMemo(() => checkRegistration({ registration: reg }), [reg]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">UK number plate</label>
            <input
              type="text"
              value={reg}
              onChange={(e) => setReg(e.target.value)}
              placeholder="AB12 CDE"
              className="w-full rounded-lg border-2 border-yellow-400 bg-yellow-100 px-4 py-3 text-xl font-bold uppercase tracking-widest text-center"
            />
            {reg && !r.valid && <p className="mt-2 text-sm text-red-600">That doesn’t look like a valid UK plate.</p>}
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Check on DVSA</p>
          {r.valid ? (
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-primary text-white font-semibold rounded-lg px-4 py-3 hover:bg-primary-dark transition"
            >
              View MOT history for {r.normalised} →
            </a>
          ) : (
            <p className="text-sm text-text/60">Enter a registration to generate the lookup link.</p>
          )}
        </div>
      </div>
      <div className="rounded-xl bg-surface border border-border p-6">
        <h3 className="font-semibold text-text mb-3">What the MOT statuses mean</h3>
        <ul className="space-y-2 text-sm">
          {MOT_STATUSES.map((s) => (
            <li key={s.code}>
              <span className="font-semibold">{s.code}:</span>{" "}
              <span dangerouslySetInnerHTML={{ __html: s.plain }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

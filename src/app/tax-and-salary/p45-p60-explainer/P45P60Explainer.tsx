"use client";

import { useState } from "react";
import { listFields, type DocType } from "@/lib/tax/p45-p60";

export default function P45P60Explainer() {
  const [doc, setDoc] = useState<DocType>("P45");
  const fields = listFields(doc);

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(["P45", "P60"] as DocType[]).map((d) => (
          <button
            key={d}
            onClick={() => setDoc(d)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border transition ${doc === d ? "bg-primary text-white border-primary" : "bg-white text-text border-border hover:border-primary"}`}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {fields.map((f) => (
          <details key={f.field} className="rounded-xl bg-white border border-border p-4">
            <summary className="font-semibold text-text cursor-pointer">{f.field}</summary>
            <div className="mt-3 space-y-2 text-sm">
              <p><span className="font-semibold">What it is:</span> {f.plain}</p>
              <p><span className="font-semibold">Why it matters:</span> {f.why}</p>
              <p className="text-amber-700"><span className="font-semibold">Watch for:</span> {f.watchFor}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}

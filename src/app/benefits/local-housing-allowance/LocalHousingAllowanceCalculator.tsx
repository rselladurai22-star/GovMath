"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { lha, type LhaArea } from "@/lib/benefits/local-housing-allowance";

const AREAS: { key: LhaArea; label: string }[] = [
  { key: "inner-london", label: "Inner London" },
  { key: "outer-london", label: "Outer London" },
  { key: "core-cities", label: "Core cities (Manchester, Birmingham, etc.)" },
  { key: "rest-of-uk", label: "Rest of UK (typical)" },
];

export default function LocalHousingAllowanceCalculator() {
  const [area, setArea] = useState<LhaArea>("rest-of-uk");
  const [adults, setAdults] = useState<number>(2);
  const [under10, setUnder10] = useState<number>(1);
  const [over10, setOver10] = useState<number>(0);
  const [singleUnder35, setSingleUnder35] = useState<boolean>(false);
  const [weeklyRent, setRent] = useState<number>(200);

  const r = useMemo(
    () => lha({ area, household: { adults, childrenUnder10: under10, childrenOver10: over10, singleUnder35 }, weeklyRent }),
    [area, adults, under10, over10, singleUnder35, weeklyRent]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Area</label>
            <select value={area} onChange={(e) => setArea(e.target.value as LhaArea)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              {AREAS.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}
            </select>
          </div>
          <NumberInput label="Adults in household" value={adults} onChange={setAdults} step={1} min={1} max={6} prefix="" suffix="" />
          <NumberInput label="Children under 10" value={under10} onChange={setUnder10} step={1} min={0} max={8} prefix="" suffix="" />
          <NumberInput label="Children 10+" value={over10} onChange={setOver10} step={1} min={0} max={8} prefix="" suffix="" />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={singleUnder35} onChange={(e) => setSingleUnder35(e.target.checked)} />
            <span>I&rsquo;m single and under 35</span>
          </label>
          <NumberInput label="Weekly contractual rent" value={weeklyRent} onChange={setRent} step={10} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Weekly housing help</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.weeklyHelp.toFixed(2)}</p>
          <p className="text-xs text-text/60">≈ £{r.monthlyHelp.toFixed(0)}/month towards rent.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Entitlement: ${r.entitlement}`, value: r.cap, hint: "LHA weekly cap" },
              { label: "Weekly rent", value: weeklyRent },
              { label: "Shortfall (from your own pocket)", value: r.shortfall, variant: r.shortfall > 0 ? "deduction" : "default" },
              { label: "Weekly help", value: r.weeklyHelp, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

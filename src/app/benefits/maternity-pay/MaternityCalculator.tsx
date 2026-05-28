"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { statutoryMaternityPay } from "@/lib/benefits/maternity-pay";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });
const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function MaternityCalculator() {
  const [awe, setAwe] = useState<number>(700);
  const r = useMemo(() => statutoryMaternityPay(awe), [awe]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Average weekly earnings (AWE)" value={awe} onChange={setAwe} step={25} hint="Calculated over the 8 weeks before the qualifying week (15 weeks before EWC)." />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">39-week SMP total</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP0.format(r.total39Weeks)}</p>
            <p className="text-sm text-text/60 mt-1">Across 39 paid weeks (then 13 weeks unpaid)</p>
          </div>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Weeks 1–6 @ ${GBP.format(r.high90Weekly)}/wk (90% AWE)`, value: r.high90Total },
              { label: `Weeks 7–39 @ ${GBP.format(r.flatWeekly)}/wk`, value: r.flatTotal },
              { label: "Total over 39 weeks", value: r.total39Weeks, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

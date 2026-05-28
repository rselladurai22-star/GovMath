"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

export default function PaymentOnAccountCalculator() {
  const [lastBill, setLastBill] = useState<number>(8000);
  const r = useMemo(() => {
    const exempt = lastBill < 1000;
    const eachInstalment = lastBill / 2;
    return { exempt, eachInstalment };
  }, [lastBill]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Last Self Assessment tax bill" value={lastBill} onChange={setLastBill} step={500} />
          <p className="text-xs text-text/60">Payments on Account aren&rsquo;t required if your last bill was under £1,000 or 80%+ of your tax was deducted at source.</p>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          {r.exempt ? (
            <>
              <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Exempt</p>
              <p className="text-2xl font-semibold">No payments on account due — bill below £1,000.</p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Each payment on account</p>
              <p className="text-4xl font-bold text-primary-dark">£{r.eachInstalment.toFixed(2)}</p>
              <ResultBreakdown
                title="Schedule"
                rows={[
                  { label: "Balancing payment 31 Jan", value: lastBill, hint: "Last year's bill" },
                  { label: "+ POA #1 31 Jan", value: r.eachInstalment },
                  { label: "+ POA #2 31 Jul", value: r.eachInstalment },
                  { label: "Cash out by 31 Jan", value: lastBill + r.eachInstalment, variant: "total" },
                ]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

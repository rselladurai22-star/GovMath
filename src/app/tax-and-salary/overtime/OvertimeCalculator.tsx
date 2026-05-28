"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";

const GBP = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 2 });

export default function OvertimeCalculator() {
  const [base, setBase] = useState<number>(15);
  const [regHours, setRegHours] = useState<number>(37.5);
  const [otHours, setOtHours] = useState<number>(8);
  const [mult, setMult] = useState<number>(1.5);

  const r = useMemo(() => {
    const regularPay = base * regHours;
    const otRate = base * mult;
    const otPay = otRate * otHours;
    const weeklyTotal = regularPay + otPay;
    return { regularPay, otRate, otPay, weeklyTotal, annual: weeklyTotal * 52 };
  }, [base, regHours, otHours, mult]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Base hourly rate" value={base} onChange={setBase} step={0.5} />
          <NumberInput label="Regular hours / week" value={regHours} onChange={setRegHours} step={0.5} prefix="" suffix=" hrs" />
          <NumberInput label="Overtime hours / week" value={otHours} onChange={setOtHours} step={0.5} prefix="" suffix=" hrs" />
          <div>
            <label className="block text-sm font-medium text-text/80 mb-2">Overtime multiplier</label>
            <div className="grid grid-cols-3 gap-2">
              {[1.25, 1.5, 2].map((m) => (
                <button key={m} type="button" onClick={() => setMult(m)} className={`rounded-md border px-3 py-2 text-sm ${mult === m ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>
                  ×{m}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-4">
          <div>
            <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Weekly gross</p>
            <p className="text-4xl font-bold text-primary-dark mt-1">{GBP.format(r.weeklyTotal)}</p>
            <p className="text-sm text-text/60 mt-1">{GBP.format(r.annual)} annualised (×52)</p>
          </div>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Regular: ${regHours} hrs × ${GBP.format(base)}`, value: r.regularPay },
              { label: `Overtime: ${otHours} hrs × ${GBP.format(r.otRate)}`, value: r.otPay },
              { label: "Weekly gross", value: r.weeklyTotal, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

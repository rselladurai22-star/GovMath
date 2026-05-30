"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { allowableExpenses, type WfhHoursBand } from "@/lib/business/allowable-expenses";

const WFH_BANDS: { key: WfhHoursBand; label: string }[] = [
  { key: "none", label: "Don't work from home" },
  { key: "low", label: "25–50 hours/month (£10/mo)" },
  { key: "mid", label: "51–100 hours/month (£18/mo)" },
  { key: "high", label: "101+ hours/month (£26/mo)" },
];

export default function AllowableExpensesCalculator() {
  const [officeAndAdmin, setOffice] = useState<number>(1200);
  const [finance, setFinance] = useState<number>(300);
  const [marketing, setMarketing] = useState<number>(600);
  const [training, setTraining] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [other, setOther] = useState<number>(0);
  const [wfhHoursBand, setWfhBand] = useState<WfhHoursBand>("mid");
  const [wfhMonths, setWfhMonths] = useState<number>(12);
  const [businessMiles, setMiles] = useState<number>(3000);

  const r = useMemo(
    () => allowableExpenses({ officeAndAdmin, finance, marketing, training, stock, other, wfhHoursBand, wfhMonths, businessMiles }),
    [officeAndAdmin, finance, marketing, training, stock, other, wfhHoursBand, wfhMonths, businessMiles]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Office & admin (stationery, software, phone)" value={officeAndAdmin} onChange={setOffice} step={100} />
          <NumberInput label="Bank charges, insurance, prof. fees" value={finance} onChange={setFinance} step={50} />
          <NumberInput label="Marketing & advertising" value={marketing} onChange={setMarketing} step={50} />
          <NumberInput label="Training" value={training} onChange={setTraining} step={50} />
          <NumberInput label="Stock / materials" value={stock} onChange={setStock} step={100} />
          <NumberInput label="Other allowable" value={other} onChange={setOther} step={100} />
          <div className="border-t border-border pt-4">
            <label className="block text-sm font-semibold text-text mb-1">Working-from-home hours</label>
            <select value={wfhHoursBand} onChange={(e) => setWfhBand(e.target.value as WfhHoursBand)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
              {WFH_BANDS.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
            </select>
          </div>
          <NumberInput label="WFH months" value={wfhMonths} onChange={setWfhMonths} step={1} min={0} max={12} prefix="" suffix=" mo" />
          <NumberInput label="Business miles in own vehicle" value={businessMiles} onChange={setMiles} step={500} prefix="" suffix=" mi" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total allowable expenses</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.total.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <p className="text-xs text-text/60">≈ £{r.taxSavedApprox.toFixed(0)} saved (basic rate + Class 4 NI).</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Itemised categories", value: r.itemised },
              { label: "WFH simplified rate", value: r.wfhFlat },
              { label: "Mileage at HMRC rates", value: r.mileageFlat },
              { label: "Total deductible", value: r.total, variant: "total" },
              { label: "≈ Tax + NI saved (28%)", value: r.taxSavedApprox, hint: "Higher rate taxpayers save closer to 42%" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

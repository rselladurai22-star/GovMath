"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { workplacePension } from "@/lib/investing/workplace-pension";

export default function WorkplacePensionCalculator() {
  const [salary, setSalary] = useState<number>(35_000);
  const [employeePct, setEmployeePct] = useState<number>(5);
  const [employerPct, setEmployerPct] = useState<number>(3);
  const [basis, setBasis] = useState<"qualifying-earnings" | "total-salary">("qualifying-earnings");
  const r = useMemo(() => workplacePension({ annualSalary: salary, employeePct, employerPct, basis }), [salary, employeePct, employerPct, basis]);
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Gross annual salary" value={salary} onChange={setSalary} step={1000} />
          <NumberInput label="Your contribution" value={employeePct} onChange={setEmployeePct} step={0.5} min={0} max={100} prefix="" suffix=" %" />
          <NumberInput label="Employer contribution" value={employerPct} onChange={setEmployerPct} step={0.5} min={0} max={100} prefix="" suffix=" %" />
          <div className="space-y-2">
            <label className="text-sm font-medium">Contribution basis</label>
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setBasis("qualifying-earnings")} className={`rounded-md border px-3 py-2 text-sm ${basis === "qualifying-earnings" ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>Qualifying earnings</button>
              <button type="button" onClick={() => setBasis("total-salary")} className={`rounded-md border px-3 py-2 text-sm ${basis === "total-salary" ? "border-primary bg-primary text-white" : "border-border bg-white"}`}>Total salary</button>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total annual contribution</p>
          <p className="text-4xl font-bold text-primary-dark">£{r.totalContribution.toLocaleString("en-GB", { maximumFractionDigits: 0 })}</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Pensionable earnings", value: r.pensionableEarnings },
              { label: `You (${employeePct}%)`, value: r.employeeContribution },
              { label: `Employer (${employerPct}%)`, value: r.employerContribution },
              { label: "Total", value: r.totalContribution, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

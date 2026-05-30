"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { studentCouncilTax } from "@/lib/students/student-council-tax";

export default function StudentCouncilTaxCalculator() {
  const [students, setStudents] = useState<number>(3);
  const [others, setOthers] = useState<number>(0);
  const [bill, setBill] = useState<number>(1800);

  const r = useMemo(() => studentCouncilTax({ fullTimeStudents: students, nonStudents: others }), [students, others]);
  const payable = bill * (1 - r.discountPct / 100);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Full-time students in property" value={students} onChange={setStudents} step={1} min={0} max={10} prefix="" suffix="" />
          <NumberInput label="Other adults (non-students)" value={others} onChange={setOthers} step={1} min={0} max={10} prefix="" suffix="" />
          <NumberInput label="Annual council tax (full bill)" value={bill} onChange={setBill} step={50} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Status</p>
          <p className="text-xl font-bold text-primary-dark">{r.exempt ? "Exempt" : `${r.discountPct}% discount`}</p>
          <p className="text-sm text-text/70">{r.status}</p>
          <ResultBreakdown
            title="What you&rsquo;ll pay"
            rows={[
              { label: "Full bill", value: bill },
              { label: `Discount (${r.discountPct}%)`, value: bill * r.discountPct / 100, variant: "deduction" },
              { label: "Payable", value: payable, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

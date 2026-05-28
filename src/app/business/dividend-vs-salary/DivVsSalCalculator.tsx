"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { salaryDividendPlan } from "@/lib/tax/salary-dividend";

const GBP0 = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 });

export default function DividendVsSalaryCalculator() {
  const [profit, setProfit] = useState<number>(80_000);
  const [customSalary, setCustomSalary] = useState<number>(50_270);

  const a = useMemo(() => salaryDividendPlan({ preTaxProfit: profit, salary: 0 }), [profit]);
  const b = useMemo(() => salaryDividendPlan({ preTaxProfit: profit, salary: 12_570 }), [profit]);
  const c = useMemo(() => salaryDividendPlan({ preTaxProfit: profit, salary: customSalary }), [profit, customSalary]);

  const best = [a, b, c].reduce((acc, x) => (x.takeHome > acc.takeHome ? x : acc));

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-primary-dark">Company profit & salary scenarios</h2>
        <NumberInput
          label="Pre-tax company profit"
          value={profit}
          onChange={setProfit}
          step={5_000}
          hint="Profit available BEFORE director salary, employer NI and Corporation Tax."
        />
        <NumberInput
          label="Custom salary (Scenario C)"
          value={customSalary}
          onChange={setCustomSalary}
          step={500}
          hint="Try £50,270 (basic-rate cap) or £5,000 (NI Secondary Threshold)."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Scenario title="A · £0 salary" subtitle="All dividends" data={a} isBest={best === a} />
        <Scenario title="B · £12,570 salary" subtitle="Personal Allowance" data={b} isBest={best === b} />
        <Scenario title={`C · ${GBP0.format(customSalary)} salary`} subtitle="Custom" data={c} isBest={best === c} />
      </div>

      <div className="rounded-xl bg-white border-2 border-primary p-6">
        <ResultBreakdown
          title="Winner: how much extra you keep"
          rows={[
            { label: `A vs B difference`, value: Math.abs(a.takeHome - b.takeHome) },
            { label: `B vs C difference`, value: Math.abs(b.takeHome - c.takeHome) },
            { label: `Best take-home`, value: best.takeHome, variant: "total" },
          ]}
        />
        <p className="text-xs text-text/60 mt-3">
          Note: £0 salary means no NI credit for State Pension that year. £12,570 keeps the Personal Allowance and earns NI credit if you pay yourself above the Lower Earnings Limit (£6,500).
        </p>
      </div>
    </div>
  );
}

function Scenario({
  title,
  subtitle,
  data,
  isBest,
}: {
  title: string;
  subtitle: string;
  data: ReturnType<typeof salaryDividendPlan>;
  isBest: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-5 border-2 ${
        isBest ? "border-success bg-success/5" : "border-border bg-white"
      }`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-primary-dark">{title}</p>
          <p className="text-xs text-text/60">{subtitle}</p>
        </div>
        {isBest && <span className="text-xs font-bold text-success uppercase">Best</span>}
      </div>
      <p className="text-3xl font-bold text-primary-dark mt-3">{GBP0.format(data.takeHome)}</p>
      <p className="text-xs text-text/60">take-home</p>
      <dl className="text-xs space-y-1 mt-3 text-text/80">
        <Row label="Salary" v={data.salary} />
        <Row label="Employer NI" v={data.employerNI} neg />
        <Row label="Corporation Tax" v={data.corporationTax} neg />
        <Row label="Dividends paid" v={data.distributableDividends} />
        <Row label="Income Tax" v={data.incomeTaxOnSalary} neg />
        <Row label="Employee NI" v={data.employeeNI} neg />
        <Row label="Dividend tax" v={data.dividendTax} neg />
      </dl>
    </div>
  );
}

function Row({ label, v, neg }: { label: string; v: number; neg?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={neg ? "text-error" : ""}>
        {neg && v > 0 ? "−" : ""}
        {GBP0.format(v)}
      </span>
    </div>
  );
}

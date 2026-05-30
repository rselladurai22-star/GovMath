"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { movingBudget, type SurveyLevel } from "@/lib/property/moving-budget";

const SURVEYS: { key: SurveyLevel; label: string }[] = [
  { key: "none", label: "No survey" },
  { key: "basic", label: "Level 1 — Basic (~£400)" },
  { key: "homebuyer", label: "Level 2 — Homebuyer (~£600)" },
  { key: "full", label: "Level 3 — Full building (~£1,000)" },
];

export default function MovingBudgetCalculator() {
  const [stampDuty, setStampDuty] = useState<number>(5000);
  const [legalFees, setLegalFees] = useState<number>(1500);
  const [surveyLevel, setSurveyLevel] = useState<SurveyLevel>("homebuyer");
  const [mortgageFee, setMortgageFee] = useState<number>(999);
  const [removals, setRemovals] = useState<number>(800);
  const [epc, setEpc] = useState<number>(0);
  const [agentFee, setAgentFee] = useState<number>(0);
  const [contingencyPercent, setContingency] = useState<number>(10);

  const r = useMemo(
    () =>
      movingBudget({
        stampDuty,
        legalFees,
        surveyLevel,
        mortgageFee,
        removals,
        epc,
        agentFee,
        contingencyPercent,
      }),
    [stampDuty, legalFees, surveyLevel, mortgageFee, removals, epc, agentFee, contingencyPercent]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <NumberInput label="Stamp Duty (SDLT)" value={stampDuty} onChange={setStampDuty} step={500} />
          <NumberInput label="Legal / conveyancing fees" value={legalFees} onChange={setLegalFees} step={100} />
          <div>
            <label className="block text-sm font-semibold text-text mb-1">Survey level</label>
            <select
              value={surveyLevel}
              onChange={(e) => setSurveyLevel(e.target.value as SurveyLevel)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
            >
              {SURVEYS.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>
          </div>
          <NumberInput label="Mortgage arrangement fee" value={mortgageFee} onChange={setMortgageFee} step={100} />
          <NumberInput label="Removals" value={removals} onChange={setRemovals} step={100} />
          <NumberInput label="EPC (if selling, no current one)" value={epc} onChange={setEpc} step={10} />
          <NumberInput label="Estate agent fee (if selling)" value={agentFee} onChange={setAgentFee} step={100} />
          <NumberInput label="Contingency" value={contingencyPercent} onChange={setContingency} step={1} min={0} max={50} prefix="" suffix=" %" />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Total moving budget</p>
          <p className="text-4xl font-bold text-primary-dark">
            £{r.total.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-text/60">Includes {contingencyPercent}% contingency.</p>
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: "Stamp Duty", value: stampDuty },
              { label: "Legal fees", value: legalFees },
              { label: "Survey", value: r.surveyCost },
              { label: "Mortgage fee", value: mortgageFee },
              { label: "Removals", value: removals },
              { label: "EPC", value: epc },
              { label: "Agent fee", value: agentFee },
              { label: `Contingency (${contingencyPercent}%)`, value: r.contingency },
              { label: "Total", value: r.total, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

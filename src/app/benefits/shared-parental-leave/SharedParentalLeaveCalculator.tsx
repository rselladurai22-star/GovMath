"use client";

import { useMemo, useState } from "react";
import NumberInput from "@/components/calculator/NumberInput";
import ResultBreakdown from "@/components/calculator/ResultBreakdown";
import { sharedParentalLeave } from "@/lib/benefits/shared-parental-leave";

export default function SharedParentalLeaveCalculator() {
  const [parent1Weeks, setP1Weeks] = useState<number>(30);
  const [parent2Weeks, setP2Weeks] = useState<number>(12);
  const [parent1WeeklyEarnings, setP1Earn] = useState<number>(600);
  const [parent2WeeklyEarnings, setP2Earn] = useState<number>(550);
  const [parent1PaidWeeks, setP1Pay] = useState<number>(25);
  const [parent2PaidWeeks, setP2Pay] = useState<number>(12);

  const r = useMemo(
    () => sharedParentalLeave({
      parent1Weeks, parent2Weeks,
      parent1WeeklyEarnings, parent2WeeklyEarnings,
      parent1PaidWeeks, parent2PaidWeeks,
    }),
    [parent1Weeks, parent2Weeks, parent1WeeklyEarnings, parent2WeeklyEarnings, parent1PaidWeeks, parent2PaidWeeks]
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-xl bg-surface border border-border p-6 space-y-5">
          <h3 className="font-bold text-primary-dark">Parent 1</h3>
          <NumberInput label="Leave weeks" value={parent1Weeks} onChange={setP1Weeks} step={1} min={0} max={50} prefix="" suffix=" wks" />
          <NumberInput label="Paid weeks claimed" value={parent1PaidWeeks} onChange={setP1Pay} step={1} min={0} max={37} prefix="" suffix=" wks" />
          <NumberInput label="Weekly earnings" value={parent1WeeklyEarnings} onChange={setP1Earn} step={25} />
          <h3 className="font-bold text-primary-dark pt-3 border-t border-border">Parent 2</h3>
          <NumberInput label="Leave weeks" value={parent2Weeks} onChange={setP2Weeks} step={1} min={0} max={50} prefix="" suffix=" wks" />
          <NumberInput label="Paid weeks claimed" value={parent2PaidWeeks} onChange={setP2Pay} step={1} min={0} max={37} prefix="" suffix=" wks" />
          <NumberInput label="Weekly earnings" value={parent2WeeklyEarnings} onChange={setP2Earn} step={25} />
        </div>
        <div className="rounded-xl bg-white border-2 border-primary p-6 space-y-3">
          <p className="text-sm font-semibold text-text/70 uppercase tracking-wide">Combined statutory pay</p>
          <p className="text-4xl font-bold text-primary-dark">
            £{r.combinedPay.toLocaleString("en-GB", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs text-text/60">
            {r.totalLeaveWeeks} weeks leave used · {r.totalPaidWeeks} weeks paid
          </p>
          {r.exceedsLeaveCap && (
            <p className="text-sm text-error font-semibold">⚠ Over the 50-week leave cap.</p>
          )}
          {r.exceedsPayCap && (
            <p className="text-sm text-error font-semibold">⚠ Over the 37-week pay cap.</p>
          )}
          <ResultBreakdown
            title="Breakdown"
            rows={[
              { label: `Parent 1 weekly ShPP`, value: r.parent1WeeklyPay },
              { label: `Parent 1 total`, value: r.parent1TotalPay },
              { label: `Parent 2 weekly ShPP`, value: r.parent2WeeklyPay },
              { label: `Parent 2 total`, value: r.parent2TotalPay },
              { label: "Combined ShPP", value: r.combinedPay, variant: "total" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

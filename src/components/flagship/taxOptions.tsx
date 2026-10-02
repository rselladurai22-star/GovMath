"use client";

import { STUDENT_PLAN_ORDER, STUDENT_PLANS, type StudentPlan, type TaxRegion } from "@/lib/tax/take-home-engine";
import { SelectField, Segmented, StepperField } from "./inputs";
import { gbp } from "./format";
import { num, oneOf } from "./useStudio";

/** URL params shared by every pay calculator's "More options". */
export const taxParams = {
  region: oneOf<TaxRegion>("ruk", ["ruk", "scotland"]),
  plan: oneOf<StudentPlan>("none", STUDENT_PLAN_ORDER),
  pension: num(0, 0, 60),
};
export const TAX_KEYS = ["region", "plan", "pension"] as const;

export const REGION_LABEL: Record<TaxRegion, string> = { ruk: "England, Wales or NI", scotland: "Scotland" };

/** Where you live, student loan and pension: the optional fields most pay calculators share. */
export function TaxSituationFields({
  region,
  plan,
  pension,
  onRegion,
  onPlan,
  onPension,
  pensionAside,
  pensionHint = "Paid by salary sacrifice, so it comes off before tax and National Insurance.",
}: {
  region: TaxRegion;
  plan: StudentPlan;
  pension: number;
  onRegion: (v: TaxRegion) => void;
  onPlan: (v: StudentPlan) => void;
  onPension: (v: number) => void;
  pensionAside?: string;
  pensionHint?: string;
}) {
  return (
    <>
      <Segmented
        label="Where you live"
        value={region}
        onChange={onRegion}
        options={[
          { value: "ruk", label: "England, Wales & NI" },
          { value: "scotland", label: "Scotland", note: "Scotland has six Income Tax bands. National Insurance is the same UK-wide." },
        ]}
      />
      <SelectField
        label="Student loan"
        value={plan}
        onChange={onPlan}
        options={STUDENT_PLAN_ORDER.map((id) => {
          const p = STUDENT_PLANS[id];
          return { value: id, label: id === "none" ? p.label : `${p.label}: ${Math.round(p.rate * 100)}% over ${gbp(p.threshold)}` };
        })}
        hint="Plan 2 for English and Welsh courses started 2012 to 2023, Plan 5 from 2023, Plan 4 in Scotland."
      />
      <StepperField
        label="Pension contribution"
        value={pension}
        onChange={(v) => onPension(Math.round(v))}
        step={1}
        min={0}
        max={60}
        unit="%"
        dp={0}
        aside={pensionAside}
        hint={pensionHint}
      />
    </>
  );
}

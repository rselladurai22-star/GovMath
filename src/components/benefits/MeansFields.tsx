"use client";

import { Mini, Pills } from "@/components/calc/fields";
import { SelectField, Switch } from "@/components/flagship/inputs";
import { bool, num, oneOf } from "@/components/flagship/useStudio";
import { HB_2026, type MeansInput, type NonDepBand } from "@/lib/benefits/housing-support";

/**
 * Household and income questions shared by the Housing Benefit and Council Tax
 * Reduction calculators. Both use the same legacy means test. The age choice
 * (pension age or working age) is asked by each page itself, first, because
 * it decides which rules apply.
 */

/** "working" plus a gross weekly pay figure replaced the six fixed bands; the bands stay so older share links still work. */
const NONDEP_BANDS = ["exempt", "notworking", "working", "b1", "b2", "b3", "b4", "b5", "b6"] as const;
type NonDepKey = (typeof NONDEP_BANDS)[number];

export const MEANS_SCHEMA = {
  age: oneOf<"pension" | "working">("pension", ["pension", "working"]),
  couple: bool(false),
  under25: bool(false),
  older: bool(false),
  kids: num(0, 0, 10),
  passport: bool(false),
  pay: num(0, 0, 100_000),
  other: num(1_000, 0, 100_000),
  savings: num(0, 0, 10_000_000),
  disability: oneOf<"none" | "standard" | "enhanced">("none", ["none", "standard", "enhanced"]),
  severe: bool(false),
  carer: bool(false),
  disabledKids: num(0, 0, 10),
  enhancedKids: num(0, 0, 10),
  childcare: num(0, 0, 2_000),
  fullTime: bool(false),
  nondeps: num(0, 0, 4),
  nondepBand: oneOf<NonDepKey>("notworking", NONDEP_BANDS),
  /** A working non-dependant's gross pay a week. */
  ndPay: num(350, 0, 5_000),
  noNondep: bool(false),
};

export const MEANS_ADVANCED = ["older", "disability", "severe", "carer", "disabledKids", "enhancedKids", "childcare", "fullTime", "nondeps", "nondepBand", "ndPay", "noNondep"] as const;

export type MeansValues = {
  age: "pension" | "working";
  couple: boolean;
  under25: boolean;
  older: boolean;
  kids: number;
  passport: boolean;
  pay: number;
  other: number;
  savings: number;
  disability: "none" | "standard" | "enhanced";
  severe: boolean;
  carer: boolean;
  disabledKids: number;
  enhancedKids: number;
  childcare: number;
  fullTime: boolean;
  nondeps: number;
  nondepBand: NonDepKey;
  ndPay: number;
  noNondep: boolean;
};

/** A gross weekly income inside each of the older fixed bands, for share links made before the pay box. */
const BAND_VALUE: Record<"b1" | "b2" | "b3" | "b4" | "b5" | "b6", number> = { b1: 150, b2: 230, b3: 320, b4: 420, b5: 540, b6: 700 };

/** The non-dependant situation as the deduction tables need it. */
function nonDepBand(v: Pick<MeansValues, "nondepBand" | "ndPay">): NonDepBand {
  if (v.nondepBand === "exempt") return "exempt";
  if (v.nondepBand === "notworking") return "not-working";
  if (v.nondepBand === "working") return Math.max(0, v.ndPay);
  return BAND_VALUE[v.nondepBand];
}

/** Monthly amounts entered in the form become weekly figures for the means test. */
const toWeekly = (monthly: number) => (Math.max(0, monthly) * 12) / 52;

export function meansFrom(v: MeansValues): MeansInput & { nonDependants: NonDepBand[]; noNonDepDeductions: boolean } {
  return {
    age: v.age,
    couple: v.couple,
    under25: v.under25,
    olderPensioner: v.older,
    children: v.kids,
    disabledChildren: v.disabledKids,
    enhancedDisabledChildren: v.enhancedKids,
    disability: v.disability,
    severe: v.severe,
    carer: v.carer,
    passported: v.passport,
    earnings: toWeekly(v.pay),
    otherIncome: toWeekly(v.other),
    childcare: v.childcare,
    fullTime: v.fullTime,
    savings: v.savings,
    nonDependants: Array.from({ length: Math.round(v.nondeps) }, () => nonDepBand(v)),
    noNonDepDeductions: v.noNondep,
  };
}

type Setter = <K extends keyof MeansValues>(key: K, value: MeansValues[K]) => void;
/** The studio's own setter, which covers more keys than these fields use. */
type StudioSetter<T> = <K extends keyof T>(key: K, value: T[K]) => void;

/** Who you are and what you live on: the main questions. */
export function HouseholdFields<T extends MeansValues>({ v, set: setAny, passportLabel }: { v: T; set: StudioSetter<T>; passportLabel?: string }) {
  const set = setAny as unknown as Setter;
  const pension = v.age === "pension";
  return (
    <div className="sa-means">
      <Pills
        label="Claiming as"
        value={v.couple ? "couple" : "single"}
        onChange={(x) => set("couple", x === "couple")}
        options={[
          { value: "single", label: "Single" },
          { value: "couple", label: "A couple" },
        ]}
      />
      <Mini label="Children you look after" value={v.kids} onChange={(n) => set("kids", Math.round(n))} min={0} max={10} stepper />
      {!pension && !v.couple && v.kids === 0 && (
        <div className="sa-means-wide">
          <Switch label="I am under 25" checked={v.under25} onChange={(x) => set("under25", x)} hint="A lower personal allowance for single people under 25 without children." />
        </div>
      )}
      <div className="sa-means-wide">
        <Switch
          label={passportLabel ?? (pension ? "I get Pension Credit Guarantee Credit" : "I get income-based JSA, income-related ESA or Income Support")}
          checked={v.passport}
          onChange={(x) => set("passport", x)}
          hint="If so, your income and savings are not checked and you get the maximum."
        />
      </div>
      {!v.passport && (
        <>
          <Mini label="Take-home pay a month" value={v.pay} onChange={(n) => set("pay", n)} prefix="£" max={100_000} step={25} wide hint="After tax, NI and half of any pension contributions." />
          <Mini
            label="Other income a month"
            value={v.other}
            onChange={(n) => set("other", n)}
            prefix="£"
            max={100_000}
            step={25}
            wide
            hint={pension ? "State Pension, other pensions, Carer's Allowance. Not Attendance Allowance, PIP or DLA." : "Carer's Allowance, New Style JSA or ESA, pensions. Not Child Benefit, maintenance, PIP or DLA."}
          />
          <Mini
            label="Savings and investments"
            value={v.savings}
            onChange={(n) => set("savings", n)}
            prefix="£"
            max={10_000_000}
            step={500}
            wide
            hint={`The first ${gbpWhole(pension ? HB_2026.capital.lowerPension : HB_2026.capital.lowerWorkingAge)} is ignored; over ${gbpWhole(HB_2026.capital.upper)} rules you out.`}
          />
        </>
      )}
    </div>
  );
}

const gbpWhole = (n: number) => `£${n.toLocaleString("en-GB")}`;

const SITUATION = [
  { value: "notworking" as const, label: "Not working, or under 16 hours" },
  { value: "working" as const, label: "Working 16 hours or more" },
  { value: "exempt" as const, label: "No deduction: on Pension Credit, a student, under 18, or under 25 on UC with no earnings" },
];

/** Disability, carers, childcare and other adults: the optional questions. */
export function MeansAdvancedFields<T extends MeansValues>({ v, set: setAny }: { v: T; set: StudioSetter<T> }) {
  const set = setAny as unknown as Setter;
  const pension = v.age === "pension";
  // Older links carry one of the six fixed bands: show them as "working" with that pay.
  const situation = v.nondepBand.startsWith("b") ? "working" : (v.nondepBand as "notworking" | "working" | "exempt");
  const pay = v.nondepBand.startsWith("b") ? (nonDepBand(v) as number) : v.ndPay;
  return (
    <>
      <Mini label="Other adults living with you" value={v.nondeps} onChange={(n) => set("nondeps", Math.round(n))} min={0} max={4} stepper hint="Grown-up children or relatives, not a partner, lodger or joint tenant." />
      {v.nondeps > 0 && (
        <>
          <SelectField label="Their situation" value={situation} onChange={(x) => set("nondepBand", x)} options={SITUATION} hint="We use the same answer for each of them." />
          {situation === "working" && (
            <Mini label="Their gross pay a week, each" value={pay} onChange={(n) => {
                set("nondepBand", "working");
                set("ndPay", n);
              }} prefix="£" max={5_000} step={10} wide hint="Before tax. The deduction rises with it." />
          )}
          <Switch label="I or my partner get Attendance Allowance, PIP daily living or DLA care, or are registered blind" checked={v.noNondep} onChange={(x) => set("noNondep", x)} hint="If so, nothing is taken off for other adults." />
        </>
      )}
      {pension && <Switch label="I reached State Pension age before 1 April 2021" checked={v.older} onChange={(x) => set("older", x)} hint="A higher personal allowance (for a couple, if either of you did)." />}
      {!pension && (
        <SelectField
          label="Disability benefits (you or your partner)"
          value={v.disability}
          onChange={(x) => set("disability", x)}
          options={[
            { value: "none", label: "None" },
            { value: "standard", label: "PIP or DLA: adds the disability premium" },
            { value: "enhanced", label: "PIP enhanced daily living or DLA highest care" },
          ]}
        />
      )}
      <Switch label="I get the severe disability premium" checked={v.severe} onChange={(x) => set("severe", x)} hint="You get PIP daily living, DLA middle or highest care or Attendance Allowance, nobody is paid Carer's Allowance for you, and no other adults live with you." />
      <Switch label="I or my partner get Carer's Allowance" checked={v.carer} onChange={(x) => set("carer", x)} hint="Adds the carer premium. Carer's Allowance itself counts as income." />
      {v.kids > 0 && (
        <>
          <Mini label="Disabled children" value={v.disabledKids} onChange={(n) => set("disabledKids", Math.round(n))} min={0} max={10} stepper hint="Getting DLA or PIP, or certified blind." />
          {v.disabledKids > 0 && <Mini label="Of those, on the highest rate" value={v.enhancedKids} onChange={(n) => set("enhancedKids", Math.round(n))} min={0} max={10} stepper />}
          <Mini label="Registered childcare a week" value={v.childcare} onChange={(n) => set("childcare", n)} prefix="£" max={2_000} step={5} wide hint={`Up to ${gbpWhole(HB_2026.disregard.childcareOne)} for one child or ${gbpWhole(HB_2026.disregard.childcareTwoPlus)} for two or more comes off your earnings.`} />
        </>
      )}
      {v.pay > 0 && <Switch label="I work 30 hours a week or more" checked={v.fullTime} onChange={(x) => set("fullTime", x)} hint={`16 hours if you are a parent or get a disability premium. Adds £${HB_2026.disregard.additional.toFixed(2)} to the earnings ignored.`} />}
    </>
  );
}

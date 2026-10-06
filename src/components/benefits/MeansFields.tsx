"use client";

import { MoneyField, Segmented, SelectField, StepperField, Switch } from "@/components/flagship/inputs";
import { bool, num, oneOf } from "@/components/flagship/useStudio";
import type { MeansInput, NonDepBand } from "@/lib/benefits/housing-support";

/**
 * Household and income questions shared by the Housing Benefit and Council Tax
 * Reduction calculators. Both use the same legacy means test.
 */

export const NONDEP_BANDS = ["exempt", "notworking", "b1", "b2", "b3", "b4", "b5", "b6"] as const;
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
  noNondep: bool(false),
};

export const MEANS_ADVANCED = ["older", "disability", "severe", "carer", "disabledKids", "enhancedKids", "childcare", "fullTime", "nondeps", "nondepBand", "noNondep"] as const;

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
  noNondep: boolean;
};

/** A representative gross weekly income for each band, so the deduction tables pick the right row. */
const BAND_VALUE: Record<NonDepKey, NonDepBand> = { exempt: "exempt", notworking: "not-working", b1: 150, b2: 230, b3: 320, b4: 420, b5: 540, b6: 700 };
const BAND_LABEL: Record<NonDepKey, string> = {
  exempt: "No deduction (on Pension Credit, a student, or under 25 on Universal Credit without earnings)",
  notworking: "Not working, or working under 16 hours",
  b1: "Working, gross under £192 a week",
  b2: "Working, £192 to £278.99 a week",
  b3: "Working, £279 to £364.99 a week",
  b4: "Working, £365 to £484.99 a week",
  b5: "Working, £485 to £604.99 a week",
  b6: "Working, £605 a week or more",
};

/** Monthly amounts entered in the form become weekly figures for the means test. */
export const toWeekly = (monthly: number) => (Math.max(0, monthly) * 12) / 52;

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
    nonDependants: Array.from({ length: Math.round(v.nondeps) }, () => BAND_VALUE[v.nondepBand]),
    noNonDepDeductions: v.noNondep,
  };
}

type Setter = <K extends keyof MeansValues>(key: K, value: MeansValues[K]) => void;
/** The studio's own setter, which covers more keys than these fields use. */
type StudioSetter<T> = <K extends keyof T>(key: K, value: T[K]) => void;

/** Who you are and what you live on: the main questions. */
export function HouseholdFields<T extends MeansValues>({ v, set: setAny }: { v: T; set: StudioSetter<T> }) {
  const set = setAny as unknown as Setter;
  const pension = v.age === "pension";
  return (
    <>
      <Segmented
        label="Age"
        value={v.age}
        onChange={(x) => set("age", x)}
        options={[
          { value: "pension", label: "State Pension age", note: "You, or both of you if a couple, have reached State Pension age (66, rising to 67 from 2026)." },
          { value: "working", label: "Working age", note: "Under State Pension age. Most working-age people now claim Universal Credit instead of Housing Benefit." },
        ]}
      />
      <Segmented
        label="You are"
        value={v.couple ? "couple" : "single"}
        onChange={(x) => set("couple", x === "couple")}
        options={[
          { value: "single", label: "Single" },
          { value: "couple", label: "A couple" },
        ]}
      />
      {!pension && !v.couple && v.kids === 0 && <Switch label="I am under 25" checked={v.under25} onChange={(x) => set("under25", x)} hint="Single people under 25 without children have a lower personal allowance." />}
      <StepperField label="Children you are responsible for" value={v.kids} onChange={(n) => set("kids", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} />
      <Switch
        label={pension ? "I get Pension Credit Guarantee Credit" : "I get income-based JSA, income-related ESA or Income Support"}
        checked={v.passport}
        onChange={(x) => set("passport", x)}
        hint="If so, your income is not checked and you get the maximum."
      />
      {!v.passport && (
        <>
          <MoneyField label="Take-home pay a month" value={v.pay} onChange={(n) => set("pay", n)} hint="After tax, National Insurance and half of any pension contributions. Leave at £0 if not working." />
          <MoneyField
            label="Other income a month"
            value={v.other}
            onChange={(n) => set("other", n)}
            hint={pension ? "State Pension, workplace and private pensions, Carer's Allowance. Not Attendance Allowance, PIP or DLA." : "Carer's Allowance, contribution-based JSA or ESA, pensions. Not Child Benefit, child maintenance, PIP or DLA."}
          />
        </>
      )}
      <MoneyField label="Savings and investments" value={v.savings} onChange={(n) => set("savings", n)} hint={pension ? "The first £10,000 is ignored." : "The first £6,000 is ignored. Over £16,000 usually rules you out."} />
    </>
  );
}

/** Disability, carers, childcare and other adults: the optional questions. */
export function MeansAdvancedFields<T extends MeansValues>({ v, set: setAny }: { v: T; set: StudioSetter<T> }) {
  const set = setAny as unknown as Setter;
  const pension = v.age === "pension";
  return (
    <>
      {pension && <Switch label="I reached State Pension age before 1 April 2021" checked={v.older} onChange={(x) => set("older", x)} optional hint="Gives a higher personal allowance (or for a couple, both of you)." />}
      {!pension && (
        <Segmented
          label="Disability benefits (you or your partner)"
          value={v.disability}
          onChange={(x) => set("disability", x)}
          optional
          options={[
            { value: "none", label: "None" },
            { value: "standard", label: "PIP or DLA", note: "Adds the disability premium." },
            { value: "enhanced", label: "Enhanced rate", note: "PIP enhanced daily living or DLA highest care: adds the enhanced disability premium too." },
          ]}
        />
      )}
      <Switch label="I get the severe disability premium" checked={v.severe} onChange={(x) => set("severe", x)} optional hint="You get PIP daily living, DLA middle or highest care or Attendance Allowance, nobody is paid Carer's Allowance for looking after you, and no other adults live with you." />
      <Switch label="I or my partner get Carer's Allowance" checked={v.carer} onChange={(x) => set("carer", x)} optional hint="Adds the carer premium. Carer's Allowance itself counts as income." />
      {v.kids > 0 && (
        <>
          <StepperField label="Disabled children" value={v.disabledKids} onChange={(n) => set("disabledKids", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional hint="Getting DLA or PIP, or certified blind." />
          {v.disabledKids > 0 && <StepperField label="Of those, on the highest rate" value={v.enhancedKids} onChange={(n) => set("enhancedKids", Math.round(n))} step={1} min={0} max={10} unit="children" dp={0} optional hint="DLA highest care or PIP enhanced daily living." />}
          <MoneyField label="Registered childcare a week" value={v.childcare} onChange={(n) => set("childcare", n)} optional hint="Up to £175 a week for one child or £300 for two or more is taken off your earnings, if you work 16 hours or more." />
        </>
      )}
      {v.pay > 0 && <Switch label="I work 30 hours a week or more" checked={v.fullTime} onChange={(x) => set("fullTime", x)} optional hint="16 hours if you are a parent or get a disability premium. Adds the £17.10 additional earnings disregard." />}
      <StepperField label="Other adults living with you" value={v.nondeps} onChange={(n) => set("nondeps", Math.round(n))} step={1} min={0} max={4} unit="people" dp={0} optional hint="Grown-up children or relatives (non-dependants), not your partner, a lodger or a joint tenant." />
      {v.nondeps > 0 && (
        <>
          <SelectField label="Their situation" value={v.nondepBand} onChange={(x) => set("nondepBand", x)} optional options={NONDEP_BANDS.map((k) => ({ value: k, label: BAND_LABEL[k] }))} hint="Gross income before tax. We use the same answer for each of them." />
          <Switch label="I or my partner get Attendance Allowance, PIP daily living or DLA care, or are registered blind" checked={v.noNondep} onChange={(x) => set("noNondep", x)} optional hint="If so, no deductions are made for other adults." />
        </>
      )}
    </>
  );
}

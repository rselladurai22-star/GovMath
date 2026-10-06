"use client";

import { DateField, MoneyField, Switch } from "@/components/flagship/inputs";
import { Compare } from "@/components/flagship/results";
import { gbp } from "@/components/flagship/format";
import { bool, date, num } from "@/components/flagship/useStudio";
import { contributionTest, relevantYears, taxYearLabel, type ContributionResult } from "@/lib/benefits/new-style";

/**
 * National Insurance record questions shared by the New Style JSA and New
 * Style ESA calculators, and the table of the two contribution conditions.
 */

export const NI_SCHEMA = {
  claim: date("2026-10-06"),
  earn1: num(22_000, 0, 1_000_000),
  earn2: num(22_000, 0, 1_000_000),
  cred1: bool(false),
  cred2: bool(false),
};

export type NiValues = { claim: string; earn1: number; earn2: number; cred1: boolean; cred2: boolean };

export function niTest(v: NiValues): ContributionResult {
  return contributionTest({ claimDate: v.claim, earningsEarlier: v.earn1, earningsLater: v.earn2, creditedEarlier: v.cred1, creditedLater: v.cred2 });
}

export function NiRecordFields({ v, set }: { v: NiValues; set: (k: keyof NiValues, value: string | number | boolean) => void }) {
  const [a, b] = relevantYears(v.claim).map(taxYearLabel);
  const bind = (k: keyof NiValues) => (value: string | number | boolean) => set(k, value);
  return (
    <>
      <DateField label="Date you claim" value={v.claim} onChange={bind("claim")} hint="The tax years that count depend on when you claim." />
      <MoneyField label={`Pay as an employee in ${a}`} value={v.earn1} onChange={bind("earn1")} hint="Your gross pay for the whole tax year, from April to April. Your P60 shows it." />
      <MoneyField label={`Pay as an employee in ${b}`} value={v.earn2} onChange={bind("earn2")} hint="Your gross pay for the whole tax year, from April to April. Your P60 shows it." />
      <Switch label={`National Insurance credits for all of ${a}`} checked={v.cred1} onChange={bind("cred1")} optional hint="For example while on Carer's Allowance, Universal Credit or sick pay, or caring for a child under 12 with Child Benefit." />
      <Switch label={`National Insurance credits for all of ${b}`} checked={v.cred2} onChange={bind("cred2")} optional hint="For example while on Carer's Allowance, Universal Credit or sick pay, or caring for a child under 12 with Child Benefit." />
    </>
  );
}

export function NiConditions({ t }: { t: ContributionResult }) {
  return (
    <Compare
      head={["Condition", "Needed"]}
      rows={[
        { label: `Pay with Class 1 NI paid, in ${t.years[0]} or ${t.years[1]}`, value: gbp(t.paidNeeded), delta: t.conditionA ? "Met" : "Not met", bar: t.conditionA ? 1 : 0.35 },
        { label: `Paid or credited in ${t.years[0]}`, value: gbp(t.eachYearNeeded[0]), delta: t.yearOk[0] ? "Met" : "Not met", bar: t.yearOk[0] ? 1 : 0.35 },
        { label: `Paid or credited in ${t.years[1]}`, value: gbp(t.eachYearNeeded[1]), delta: t.yearOk[1] ? "Met" : "Not met", bar: t.yearOk[1] ? 1 : 0.35 },
      ]}
    />
  );
}

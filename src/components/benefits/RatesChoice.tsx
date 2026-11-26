"use client";

import { RadioGroup } from "@/components/flagship/inputs";
import { oneOf } from "@/components/flagship/useStudio";
import { RATES_YEAR_OPTIONS, RATES_YEARS, type RatesYear } from "@/lib/benefits/rates-year";

/** Schema field for the rates choice; 2026/27 is the default, so share links without it keep today's rates. */
export const ratesParam = () => oneOf<RatesYear>("2026/27", RATES_YEARS);

/** "Rates: 2026/27 (now) | From April 2027 (proposed)". */
export function RatesChoice({ value, onChange, universalCredit }: { value: RatesYear; onChange: (v: RatesYear) => void; universalCredit?: boolean }) {
  return (
    <RadioGroup
      label="Rates"
      value={value}
      onChange={onChange}
      options={RATES_YEAR_OPTIONS}
      info={
        universalCredit
          ? "Proposed rates are DWP's figures for 2027/28. Universal Credit changes from your first assessment period that starts on or after 6 April 2027. They are final once Parliament approves them."
          : "Proposed rates are the government's published figures from 6 April 2027. They are final once Parliament approves them."
      }
    />
  );
}

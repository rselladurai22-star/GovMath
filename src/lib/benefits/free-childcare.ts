/**
 * Free childcare hours — England 2025/26.
 *
 * Source: gov.uk/get-30-hours-free-childcare
 *
 * From September 2025 the rollout completes:
 *  - 9 months to 2 years:  15 hours/week funded for working parents
 *  - 9 months to 2 years:  30 hours/week funded for working parents (from Sept 2025)
 *  - All 3 & 4 year olds:  15 hours/week (universal entitlement)
 *  - Working 3 & 4 yos:    30 hours/week (15 universal + 15 working-parent extension)
 *  - 2 year olds (low income / certain benefits): 15 hours/week
 *
 * "Working parent" criteria: each parent earns ≥ £166/week (~16h NLW) and < £100k/year.
 * Funded hours apply 38 weeks/year (term time) by default; can be "stretched" to ~22h/wk over 51 weeks.
 */

export type ChildAgeBand =
  | "under-9-months"
  | "9-months-to-2"
  | "3-to-4-year"
  | "5-plus";

export type FreeChildcareInput = {
  childAge: ChildAgeBand;
  parentWorking: boolean;
  /** Does the household have qualifying benefits (UC, JSA, ESA, Income Support, working tax credit, max £25,500 income)? */
  lowIncomeFamily: boolean;
  /** Hourly nursery rate used to estimate the value of the funded hours. */
  hourlyRate: number;
  /** Stretch hours across the full year (51 wks) rather than term time (38 wks). */
  stretchYear: boolean;
};

export type FreeChildcareResult = {
  hoursPerWeek: number;
  weeksFunded: number;
  totalAnnualHours: number;
  /** Hourly cost × annual funded hours. */
  annualValue: number;
  /** Effective hours/week once stretched (if stretched). */
  weeklyStretchedHours: number;
  notes: string;
};

export function freeChildcare(input: FreeChildcareInput): FreeChildcareResult {
  let hoursPerWeek = 0;
  let notes = "Not eligible — children must be 9 months or older, with working parents or qualifying benefits.";

  switch (input.childAge) {
    case "under-9-months":
      hoursPerWeek = 0;
      notes = "No funded hours under 9 months.";
      break;
    case "9-months-to-2":
      if (input.parentWorking) { hoursPerWeek = 30; notes = "30 hours/week for working parents (Sept 2025 onward)."; }
      else if (input.lowIncomeFamily) { hoursPerWeek = 15; notes = "15 hours/week for low-income 2-year-olds."; }
      break;
    case "3-to-4-year":
      hoursPerWeek = input.parentWorking ? 30 : 15;
      notes = input.parentWorking
        ? "30 hours/week (15 universal + 15 working-parent extension)."
        : "15 hours/week universal entitlement.";
      break;
    case "5-plus":
      hoursPerWeek = 0;
      notes = "Statutory schooling from age 5 (or 4 with rising-5 cohort). Wraparound funding may apply.";
      break;
  }

  const weeksFunded = input.stretchYear ? 51 : 38;
  const totalAnnualHours = hoursPerWeek * weeksFunded * (input.stretchYear ? 38 / 51 : 1);
  // Funded HOURS are fixed (570 universal, 1140 30h). Stretching averages over 51 wks but total stays the same.
  const annualHours = hoursPerWeek * 38; // term-time equivalent
  const weeklyStretchedHours = input.stretchYear ? annualHours / 51 : hoursPerWeek;
  return {
    hoursPerWeek,
    weeksFunded,
    totalAnnualHours: annualHours,
    annualValue: annualHours * Math.max(0, input.hourlyRate),
    weeklyStretchedHours,
    notes,
  };
}

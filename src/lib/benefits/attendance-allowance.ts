/**
 * Attendance Allowance (UK) — 2025/26 rates.
 *
 * Tax-free benefit for those over State Pension Age who need help with personal care
 * because of a physical or mental disability. Not means-tested.
 *
 *   Lower rate: £73.90/week  (help with care during the day OR night)
 *   Higher rate: £110.40/week (help with care during the day AND night, or terminally ill)
 */

export const AA_LOWER = 73.90;
export const AA_HIGHER = 110.40;

export type AaRate = "none" | "lower" | "higher";

export type AaInput = {
  /** Help with care needed: day, night, both, or no claim. */
  careNeeded: "none" | "day-only" | "night-only" | "day-and-night";
  /** Terminally ill (claimant gets the higher rate automatically via SR1). */
  terminallyIll: boolean;
};

export type AaResult = {
  rate: AaRate;
  weekly: number;
  fourWeekly: number;
  annual: number;
  notes: string;
};

export function attendanceAllowance(input: AaInput): AaResult {
  if (input.terminallyIll) {
    return { rate: "higher", weekly: AA_HIGHER, fourWeekly: AA_HIGHER * 4, annual: AA_HIGHER * 52,
      notes: "Special Rules under SR1 — paid at the higher rate automatically." };
  }
  if (input.careNeeded === "day-and-night") {
    return { rate: "higher", weekly: AA_HIGHER, fourWeekly: AA_HIGHER * 4, annual: AA_HIGHER * 52,
      notes: "Higher rate: help needed day AND night." };
  }
  if (input.careNeeded === "day-only" || input.careNeeded === "night-only") {
    return { rate: "lower", weekly: AA_LOWER, fourWeekly: AA_LOWER * 4, annual: AA_LOWER * 52,
      notes: "Lower rate: help needed during the day OR night." };
  }
  return { rate: "none", weekly: 0, fourWeekly: 0, annual: 0,
    notes: "Not eligible — must need help with personal care or supervision." };
}

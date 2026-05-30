/**
 * PIP (Personal Independence Payment) Points Self-Check.
 *
 * Source: gov.uk/pip
 *
 * Two components scored separately:
 *  - Daily Living: 10 activities scored 0–12
 *  - Mobility:     2 activities scored 0–12
 *
 * Award thresholds (per component):
 *   0–7 points:  no award
 *   8–11 points: standard rate
 *   12+ points:  enhanced rate
 *
 * 2025/26 weekly rates:
 *   Daily Living standard: £73.90  enhanced: £110.40
 *   Mobility     standard: £29.20  enhanced: £77.05
 */

export const RATES_2025_26 = {
  dailyLiving: { standard: 73.90, enhanced: 110.40 },
  mobility:    { standard: 29.20, enhanced: 77.05 },
};

export type Award = "none" | "standard" | "enhanced";

export type PipInput = {
  dailyLivingPoints: number;
  mobilityPoints: number;
};

export type PipResult = {
  dailyLivingAward: Award;
  mobilityAward: Award;
  weeklyTotal: number;
  monthlyTotal: number;
  annualTotal: number;
};

function bandFor(points: number): Award {
  if (points >= 12) return "enhanced";
  if (points >= 8) return "standard";
  return "none";
}

function rateFor(award: Award, kind: "dailyLiving" | "mobility"): number {
  if (award === "none") return 0;
  return RATES_2025_26[kind][award];
}

export function pipPoints(input: PipInput): PipResult {
  const dailyLivingAward = bandFor(Math.max(0, input.dailyLivingPoints));
  const mobilityAward = bandFor(Math.max(0, input.mobilityPoints));
  const weeklyTotal = rateFor(dailyLivingAward, "dailyLiving") + rateFor(mobilityAward, "mobility");
  return {
    dailyLivingAward,
    mobilityAward,
    weeklyTotal,
    monthlyTotal: (weeklyTotal * 52) / 12,
    annualTotal: weeklyTotal * 52,
  };
}

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
 * 2026/27 weekly rates:
 *   Daily Living standard: £76.70  enhanced: £114.60
 *   Mobility     standard: £30.30  enhanced: £80.00
 */

export const RATES_2026_27 = {
  dailyLiving: { standard: 76.70, enhanced: 114.60 },
  mobility:    { standard: 30.30, enhanced: 80.00 },
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
  return RATES_2026_27[kind][award];
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

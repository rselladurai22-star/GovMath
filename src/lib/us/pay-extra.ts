/**
 * Small helpers for the US salary, overtime and debt-to-income pages, built
 * on pay.ts and loans.ts. Pure functions.
 */

import { debtToIncome } from "./loans";

export type DayHours = { regular: number; overtime: number; doubleTime: number };

/**
 * California's daily overtime (Labor Code 510): over 8 hours in a day at 1.5×,
 * over 12 at 2×; on the seventh day worked in a row in the workweek, the
 * first 8 hours at 1.5× and the rest at 2×; then any regular hours over 40 in
 * the week become overtime too.
 */
export function californiaWeek(days: number[]): DayHours {
  let regular = 0;
  let overtime = 0;
  let doubleTime = 0;
  const worked = days.slice(0, 7).map((h) => Math.max(0, Math.min(24, h)));
  const allSeven = worked.length === 7 && worked.every((h) => h > 0);
  worked.forEach((h, i) => {
    if (allSeven && i === 6) {
      overtime += Math.min(h, 8);
      doubleTime += Math.max(0, h - 8);
      return;
    }
    regular += Math.min(h, 8);
    overtime += Math.max(0, Math.min(h, 12) - 8);
    doubleTime += Math.max(0, h - 12);
  });
  const weekly = Math.max(0, regular - 40);
  return { regular: regular - weekly, overtime: overtime + weekly, doubleTime };
}

/** Federal (FLSA) split of a week's hours: everything over 40 is overtime. */
export function federalWeek(days: number[]): DayHours {
  const total = days.reduce((a, h) => a + Math.max(0, h), 0);
  return { regular: Math.min(40, total), overtime: Math.max(0, total - 40), doubleTime: 0 };
}

export type DtiRoom = {
  /** The highest housing payment that keeps both ratios within the limits. */
  maxHousing: number;
  /** The highest total of other debts with today's housing payment. */
  maxOtherDebts: number;
  /** Gross monthly income needed for today's payments to fit both limits. */
  incomeNeeded: number;
  fits: boolean;
};

/** Room under a lender's front-end and back-end limits (front = Infinity when only the back-end counts). */
export function dtiRoom(grossMonthly: number, housing: number, otherDebts: number, front: number, back: number): DtiRoom {
  const g = Math.max(0, grossMonthly);
  const h = Math.max(0, housing);
  const d = Math.max(0, otherDebts);
  const maxHousing = Math.max(0, Math.min(Number.isFinite(front) ? g * front : Infinity, g * back - d));
  const maxOtherDebts = Math.max(0, g * back - h);
  const incomeNeeded = Math.max(Number.isFinite(front) && front > 0 ? h / front : 0, back > 0 ? (h + d) / back : 0);
  const r = debtToIncome(g, h, d);
  const fits = g > 0 && r.back <= back + 1e-9 && (!Number.isFinite(front) || r.front <= front + 1e-9);
  return { maxHousing, maxOtherDebts, incomeNeeded, fits };
}

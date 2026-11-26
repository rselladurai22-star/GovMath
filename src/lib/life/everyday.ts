/**
 * Pro-rata rent: rent for part of a month.
 */

import { parse } from "./calendar";

export type ProRataMethod = "annual" | "month";

const DAY = 86_400_000;
const daysInclusive = (a: string, b: string) => Math.round((parse(b).getTime() - parse(a).getTime()) / DAY) + 1;
const daysInMonth = (iso: string) => {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).getUTCDate();
};

export type ProRataResult = { days: number; dailyRate: number; amount: number; method: ProRataMethod; periodDays: number };

/**
 * Rent for the days from `from` to `to` inclusive.
 * "annual": daily rate = monthly rent × 12 ÷ 365 (366 in a leap year), the usual
 * method in tenancy agreements. "month": daily rate = monthly rent ÷ days in the
 * month of `from`.
 */
export function proRataRent(monthlyRent: number, from: string, to: string, method: ProRataMethod): ProRataResult {
  const days = Math.max(0, daysInclusive(from, to));
  const y = parse(from).getUTCFullYear();
  const yearDays = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0 ? 366 : 365;
  const periodDays = method === "annual" ? yearDays : daysInMonth(from);
  const dailyRate = method === "annual" ? (Math.max(0, monthlyRent) * 12) / yearDays : Math.max(0, monthlyRent) / periodDays;
  return { days, dailyRate, amount: dailyRate * days, method, periodDays };
}

/** Last day of the month containing a date. */
export function monthEnd(iso: string): string {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0)).toISOString().slice(0, 10);
}
export function monthStart(iso: string): string {
  const d = parse(iso);
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1)).toISOString().slice(0, 10);
}

export const weeklyToMonthlyRent = (weekly: number) => (weekly * 52) / 12;
export const monthlyToWeeklyRent = (monthly: number) => (monthly * 12) / 52;

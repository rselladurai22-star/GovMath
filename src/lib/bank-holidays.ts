/**
 * UK bank-holiday-aware working day counter.
 *
 * Working day = Mon–Fri AND not in the bank-holiday list for the chosen nation.
 * Data covers 2025 and 2026 (gov.uk/bank-holidays). Extend BANK_HOLIDAYS to add years.
 */

export type Nation = "england-and-wales" | "scotland" | "northern-ireland";

export const BANK_HOLIDAYS: Record<Nation, string[]> = {
  "england-and-wales": [
    // 2025
    "2025-01-01", "2025-04-18", "2025-04-21", "2025-05-05", "2025-05-26",
    "2025-08-25", "2025-12-25", "2025-12-26",
    // 2026
    "2026-01-01", "2026-04-03", "2026-04-06", "2026-05-04", "2026-05-25",
    "2026-08-31", "2026-12-25", "2026-12-28",
  ],
  "scotland": [
    // 2025
    "2025-01-01", "2025-01-02", "2025-04-18", "2025-05-05", "2025-05-26",
    "2025-08-04", "2025-12-01", "2025-12-25", "2025-12-26",
    // 2026
    "2026-01-01", "2026-01-02", "2026-04-03", "2026-05-04", "2026-05-25",
    "2026-08-03", "2026-11-30", "2026-12-25", "2026-12-28",
  ],
  "northern-ireland": [
    // 2025
    "2025-01-01", "2025-03-17", "2025-04-18", "2025-04-21", "2025-05-05",
    "2025-05-26", "2025-07-14", "2025-08-25", "2025-12-25", "2025-12-26",
    // 2026
    "2026-01-01", "2026-03-17", "2026-04-03", "2026-04-06", "2026-05-04",
    "2026-05-25", "2026-07-13", "2026-08-31", "2026-12-25", "2026-12-28",
  ],
};

export type BankHolidaysInput = {
  /** ISO date (YYYY-MM-DD) inclusive. */
  start: string;
  /** ISO date (YYYY-MM-DD) inclusive. */
  end: string;
  nation: Nation;
};

export type BankHolidaysResult = {
  totalDays: number;
  weekendDays: number;
  bankHolidaysInRange: string[];
  workingDays: number;
};

function parseISO(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function workingDaysBetween(input: BankHolidaysInput): BankHolidaysResult {
  const startDate = parseISO(input.start);
  const endDate = parseISO(input.end);
  if (endDate < startDate) {
    return { totalDays: 0, weekendDays: 0, bankHolidaysInRange: [], workingDays: 0 };
  }
  const holidays = new Set(BANK_HOLIDAYS[input.nation] ?? []);
  let totalDays = 0;
  let weekendDays = 0;
  let workingDays = 0;
  const bhInRange: string[] = [];
  const cursor = new Date(startDate);
  while (cursor <= endDate) {
    totalDays += 1;
    const dow = cursor.getUTCDay(); // 0=Sun, 6=Sat
    const dateStr = iso(cursor);
    const isWeekend = dow === 0 || dow === 6;
    const isHoliday = holidays.has(dateStr);
    if (isWeekend) weekendDays += 1;
    if (isHoliday) bhInRange.push(dateStr);
    if (!isWeekend && !isHoliday) workingDays += 1;
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return { totalDays, weekendDays, bankHolidaysInRange: bhInRange, workingDays };
}

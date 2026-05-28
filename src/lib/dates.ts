/**
 * Date math helpers — days between two dates, exclusive/inclusive,
 * weekdays-only counting.
 */

const MS_PER_DAY = 86_400_000;

export type DateRangeResult = {
  /** Calendar days, inclusive of both ends (>=1 if same day). */
  inclusiveDays: number;
  /** Days difference (exclusive); same date = 0. */
  exclusiveDays: number;
  /** Working days (Mon–Fri) within the range, inclusive of both ends. */
  workingDays: number;
  /** Whole weeks + remainder days. */
  weeks: number;
  /** Years + remaining months + days, calendar-aware. */
  years: number;
  months: number;
  days: number;
};

/** Normalise to midnight UTC to avoid DST drift. */
function utcDay(d: Date): number {
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
}

export function daysBetween(a: Date, b: Date): DateRangeResult {
  // Ensure a <= b for the diff math; remember sign.
  const start = utcDay(a) <= utcDay(b) ? a : b;
  const end = utcDay(a) <= utcDay(b) ? b : a;

  const startMs = utcDay(start);
  const endMs = utcDay(end);
  const exclusive = Math.round((endMs - startMs) / MS_PER_DAY);
  const inclusive = exclusive + 1;

  // Working days: iterate weekday count.
  let working = 0;
  for (let ms = startMs; ms <= endMs; ms += MS_PER_DAY) {
    const dow = new Date(ms).getUTCDay(); // 0=Sun, 6=Sat
    if (dow !== 0 && dow !== 6) working++;
  }

  const weeks = exclusive / 7;

  // Calendar Y/M/D diff
  let years = end.getUTCFullYear() - start.getUTCFullYear();
  let months = end.getUTCMonth() - start.getUTCMonth();
  let days = end.getUTCDate() - start.getUTCDate();
  if (days < 0) {
    months -= 1;
    // Days in the previous month relative to `end`
    const prevMonth = new Date(
      Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), 0)
    );
    days += prevMonth.getUTCDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    inclusiveDays: inclusive,
    exclusiveDays: exclusive,
    workingDays: working,
    weeks,
    years,
    months,
    days,
  };
}

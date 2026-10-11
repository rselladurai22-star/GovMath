"use client";

import { useSyncExternalStore } from "react";

/*
 * "Today" and "now" for calculators, read only in the browser.
 *
 * The server and the first client render both see null, so pages render the
 * same HTML on both sides (no hydration mismatch). Straight after hydration
 * React re-renders with the visitor's own date, so date defaults never go
 * stale. A schema default of "" can then mean "today" (or a date worked out
 * from today), while a date from a shared link still wins.
 */

const noop = () => () => {};

/** The visitor's local date as YYYY-MM-DD. */
export function localToday(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Today's date in the browser; null on the server and during hydration. */
export function useToday(): string | null {
  return useSyncExternalStore(noop, localToday, () => null);
}

const everySecond = (notify: () => void) => {
  const id = window.setInterval(notify, 1_000);
  return () => window.clearInterval(id);
};
const nowSeconds = () => Math.floor(Date.now() / 1_000);

/** The current time in whole seconds (Unix time), ticking each second; null on the server and during hydration. */
export function useNowSeconds(): number | null {
  return useSyncExternalStore(everySecond, nowSeconds, () => null);
}

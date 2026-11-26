/**
 * Dates as ISO strings (YYYY-MM-DD) handled in UTC, and date labels that are
 * the same on the server and in the browser.
 */

export const parse = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, (m || 1) - 1, d || 1));
};

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * Date labels built by hand rather than with Intl, so the server and the
 * browser always produce identical text (avoids hydration mismatches).
 */
export function formatDate(iso: string, style: "long" | "medium" | "short" = "long"): string {
  const d = parse(iso);
  const day = d.getUTCDate();
  const month = MONTHS[d.getUTCMonth()];
  const year = d.getUTCFullYear();
  const wd = WEEKDAYS[d.getUTCDay()];
  if (style === "short") return `${wd.slice(0, 3)} ${day} ${month.slice(0, 3)}`;
  if (style === "medium") return `${day} ${month} ${year}`;
  return `${wd} ${day} ${month} ${year}`;
}

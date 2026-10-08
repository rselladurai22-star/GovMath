import updated from "./updated.json";
import { formatDate } from "../lib/life/calendar";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/**
 * The date a calculator page last changed (from scripts/build-updated.py):
 * "6 October 2026" in UK style, or "October 6, 2026" on US pages.
 */
export function updatedOn(path: string): string | undefined {
  const iso = (updated as Record<string, string>)[path];
  if (!iso) return undefined;
  if (path.startsWith("/us/")) {
    const [y, m, d] = iso.split("-").map(Number);
    return `${MONTHS[m - 1]} ${d}, ${y}`;
  }
  return formatDate(iso, "medium");
}

/**
 * The trust line under a calculator's title: who checks it, when it changed,
 * links to its sources and to how we check our figures, and that SumAtlas
 * is independent (its name is not a sign of a government site).
 * `sourcesId` is the id of the guide's Sources box on that page.
 */
export function trustHtml(path: string, sourcesId: string): string {
  const date = updatedOn(path);
  return (
    `<p class="gm-trust"><span class="gm-trust-mark" aria-hidden="true"></span>` +
    `<span>Checked by the SumAtlas team</span>` +
    (date ? `<span>Updated ${date}</span>` : "") +
    `<span><a href="#${sourcesId}">Sources</a></span>` +
    `<span><a href="/how-we-check">How we check our figures</a></span>` +
    `<span>Independent: not a government website</span></p>`
  );
}

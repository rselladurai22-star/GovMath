import updated from "./updated.json";
import { formatDate } from "../lib/life/calendar";

/** The date a calculator page last changed (from scripts/build-updated.py), e.g. "6 October 2026". */
export function updatedOn(path: string): string | undefined {
  const iso = (updated as Record<string, string>)[path];
  return iso ? formatDate(iso, "medium") : undefined;
}

/**
 * The trust line under a calculator's title: who checks it, when it changed,
 * and links to its sources and to how we check our figures.
 * `sourcesId` is the id of the guide's Sources box on that page.
 */
export function trustHtml(path: string, sourcesId: string): string {
  const date = updatedOn(path);
  return (
    `<p class="gm-trust"><span class="gm-trust-mark" aria-hidden="true"></span>` +
    `<span>Checked by the GovMath team</span>` +
    (date ? `<span>Updated ${date}</span>` : "") +
    `<span><a href="#${sourcesId}">Sources</a></span>` +
    `<span><a href="/how-we-check">How we check our figures</a></span></p>`
  );
}

import { describe, expect, it } from "vitest";
import chrome from "../gm/chrome.json";
import { headerHtml } from "../gm/catalog";
import { US_CATEGORIES } from "./calculators";

const ids = (html: string) => [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const controls = (html: string) => [...html.matchAll(/aria-controls="([^"]+)"/g)].map((m) => m[1]);
const count = (html: string, s: string) => html.split(s).length - 1;

describe("header topic menus", () => {
  const shared = headerHtml(chrome.header.html);
  const uk = headerHtml(chrome.header.html, "uk");
  const us = headerHtml(chrome.header.html, "us");
  const usItems = US_CATEGORIES.length + 1; // the US topics and Everyday

  it("puts both countries' menus in one nav on shared pages", () => {
    // One nav, so axis.js's mobile Menu button (it opens the first .ax-navigation) opens whichever set is showing.
    expect(count(shared, "<nav ")).toBe(1);
    expect(count(shared, 'class="ax-navitem gm-nav-uk"')).toBe(count(uk, 'class="ax-navitem"'));
    expect(count(shared, 'class="ax-navitem gm-nav-us"')).toBe(usItems);
    expect(count(shared, 'class="ax-navitem"')).toBe(0);
    expect(shared).toContain('aria-controls="mega-us-0">Taxes');
  });

  it("fills every menu with its calculators", () => {
    for (const html of [shared, uk, us]) expect(html).not.toContain('<div class="ax-mega-links"></div>');
    expect(shared).toMatch(/id="mega-us-0"[\s\S]*?href="\/us\/taxes\//);
  });

  it("keeps every id unique and every menu button pointing at a menu", () => {
    for (const html of [shared, uk, us]) {
      const all = ids(html);
      expect(new Set(all).size).toBe(all.length);
      for (const c of controls(html)) expect(all).toContain(c);
    }
  });

  it("shows only the section's own menus on /uk and /us pages", () => {
    expect(uk).not.toContain("gm-nav-");
    expect(us).not.toContain("gm-nav-");
    expect(count(us, 'class="ax-navitem"')).toBe(usItems);
    expect(us).toContain('aria-controls="mega-0">Taxes');
    expect(uk).toContain('aria-controls="mega-0">Tax &amp; salary');
  });

  it("sends the logo to the section's home, or to / on shared pages", () => {
    expect(shared).toContain('href="/" aria-label="SumAtlas home"');
    expect(uk).toContain('href="/uk" aria-label="SumAtlas home"');
    expect(us).toContain('href="/us" aria-label="SumAtlas home"');
  });
});

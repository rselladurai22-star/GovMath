import { createElement, type ReactNode } from "react";
import chrome from "./chrome.json";
import GmScripts from "./GmScripts";

/**
 * The approved design's page frame for pages built in React: the design's
 * stylesheets in the same order as its pages, its skip link, header (with
 * mega menus) and footer, and its scripts. `calculator` pages load the same
 * stylesheets as the approved take-home and mortgage pages.
 */
const BASE = ["original-layout.css", "original-home.css", "original-brand.css", "axis-navigation.css", "reference-header.css"];
const CALCULATOR = [
  "original-layout.css",
  "original-home.css",
  "matching-mortgage.css",
  "matching-salary.css",
  "matching-controls.css",
  "original-brand.css",
  "matching-calculators.css",
  "axis-navigation.css",
  "reference-header.css",
];

/**
 * The site theme (claret brand, neutral palette, Axis type scale). The generated
 * colour swaps load before govmath-site.css and the theme loads last, so the
 * theme's own rules win at equal specificity. Pages are wrapped in .gm-claret
 * and their main content in .gm-neutral.
 */
export const THEME_BEFORE = ["govmath-neutral.css", "govmath-claret.css"];
export const THEME_AFTER = ["govmath-theme.css"];

type El = { tag: string; attrs: Record<string, string>; html: string };
const PROP: Record<string, string> = { class: "className", for: "htmlFor", tabindex: "tabIndex" };
const render = (el: El) =>
  createElement(el.tag, {
    ...Object.fromEntries(Object.entries(el.attrs).map(([k, v]) => [PROP[k] ?? k, v])),
    dangerouslySetInnerHTML: { __html: el.html },
  });

export default function GmShell({ kind = "base", children }: { kind?: "base" | "calculator"; children: ReactNode }) {
  // govmath-site.css adds, in the design's own language, the parts the package does not include.
  const css = [...(kind === "calculator" ? CALCULATOR : BASE), ...THEME_BEFORE, "govmath-site.css", ...THEME_AFTER];
  const page = (
    <>
      {render(chrome.skip as El)}
      {render(chrome.header as El)}
      <main id="main" className="gm-neutral">
        {children}
      </main>
      {render(chrome.footer as El)}
    </>
  );
  return (
    <>
      {css.map((href) => (
        <link key={href} rel="stylesheet" href={`/gm/${href}`} precedence="gm" />
      ))}
      <div className="gm-claret">{page}</div>
      <GmScripts scripts={["axis"]} />
    </>
  );
}

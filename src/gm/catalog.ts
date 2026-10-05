import { getCalculatorsByCategory, type CategorySlug } from "@/lib/calculators";
import { shortTitle } from "@/components/category-style";
import cats from "./categories.json";

/**
 * Builds the calculator lists of the approved design (the homepage category
 * cards and the eight topic pages) from the live calculator list, in the
 * design's exact markup. The labels, descriptions and icons come from the
 * design package (categories.json, already HTML-escaped); the tools come from
 * CALCULATORS, so every calculator is listed and every count is right.
 */

type Cat = { slug: CategorySlug; label: string; desc: string; icon: string; heroTitle: string; heroDesc: string; toolIcon: string };
const CATS = cats as Cat[];

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** How many tools the homepage card lists before "View all". */
const HOME_LIST = 10;

/** The homepage "Calculators for every part of life" grid. */
export function categoryGridHtml(): string {
  const cards = CATS.map((c, n) => {
    const tools = getCalculatorsByCategory(c.slug);
    const list = tools
      .slice(0, HOME_LIST)
      .map((t) => `<a href="${t.href}">${esc(shortTitle(t.title))}</a>`)
      .join("");
    return (
      `<section class="categorycard" aria-labelledby="cat-${n}"><div class="categorytitle"><span class="toolicon">${c.icon}</span>` +
      `<div><h3 id="cat-${n}">${c.label}</h3><span>${tools.length} tools</span></div></div><p>${c.desc}</p>` +
      `<div class="toollist">${list}</div><a class="viewall" href="/${c.slug}">View all ${tools.length} ${c.label.toLowerCase()} tools</a></section>`
    );
  }).join("");
  return `<div class="categorygrid">${cards}</div>`;
}

/** The whole <main> content of a topic page. */
export function topicMainHtml(slug: CategorySlug): string {
  const c = CATS.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category ${slug}`);
  const tools = getCalculatorsByCategory(slug);
  const jump = CATS.map((x) => `<a class="${x.slug === slug ? "chosen" : ""}" href="/${x.slug}">${x.label}</a>`).join("");
  const items = tools
    .map(
      (t) =>
        `<a class="categorytool" href="${t.href}"><span class="toolicon">${c.toolIcon}</span><div><h2>${esc(shortTitle(t.title))}</h2>` +
        `<p>${esc(t.blurb)}</p><span class="openlabel">Open calculator</span></div></a>`,
    )
    .join("");
  return (
    `<div class="wrap"><div class="crumb"><a href="/">Home</a><span>›</span><a href="/#categories">Calculators</a><span>›</span>${c.label}</div>` +
    `<section class="categoryhero"><p class="eyebrow">${tools.length} FREE TOOLS</p><h1>${c.heroTitle}</h1><p>${c.heroDesc}</p></section>` +
    `<nav class="categoryjump" aria-label="Calculator categories">${jump}</nav><div class="fullcategory">${items}</div>` +
    `<a class="backlink" href="/#categories">Back to all categories</a></div>`
  );
}

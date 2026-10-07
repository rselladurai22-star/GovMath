import { getCalculatorsByCategory, shortTitle, type CategorySlug } from "../lib/calculators";
import cats from "./categories.json";
import { AMOUNT_PAGES_LIVE } from "../lib/seo/amounts";
import { COUNTRIES, DEFAULT_COUNTRY } from "../lib/countries";

/**
 * Builds the calculator lists of the approved design (the homepage category
 * cards and the eight topic pages) from the live calculator list, in the
 * design's exact markup. The labels, descriptions and icons come from the
 * design package (categories.json, already HTML-escaped); the tools come from
 * CALCULATORS, so every calculator is listed and every count is right.
 */

type Cat = { slug: CategorySlug; label: string; desc: string; icon: string; heroTitle: string; heroDesc: string; toolIcon: string };
const CATS = cats as Cat[];

/** A topic's name as plain text (the JSON holds it HTML-escaped). */
export function categoryLabel(slug: CategorySlug): string {
  return (CATS.find((c) => c.slug === slug)?.label ?? slug).replace(/&amp;/g, "&");
}

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
      `<div class="toollist">${list}</div><a class="viewall" href="/uk/${c.slug}">View all ${tools.length} ${c.label.toLowerCase()} tools</a></section>`
    );
  }).join("");
  return `<div class="categorygrid">${cards}</div>`;
}

/**
 * The header with its mega menus built from the live catalogue: each topic's
 * menu lists every calculator in that topic (so new tools are linked from
 * every page), and the menu headings are styled paragraphs rather than <h3>s,
 * so the page's own <h1> comes first in its heading outline. The topic menus
 * are moved into the logo row.
 */
export function headerHtml(html: string): string {
  return html
    .replace(
      /(<a class="button" href="\/([a-z-]+)">View all calculators<\/a><\/div><div class="ax-mega-links">)[\s\S]*?(<\/div>)/g,
      (_m, open: string, slug: string, close: string) =>
        open +
        getCalculatorsByCategory(slug as CategorySlug)
          .map((t) => `<a href="${t.href}">${esc(shortTitle(t.title))}</a>`)
          .join("") +
        close,
    )
    .replace(/<h3>([\s\S]*?)<\/h3>/g, '<p class="ax-mega-h">$1</p>')
    // One-row header (October 2026, owner's request): no claret strip, no
    // Home/Calculators/Guides/About links (the logo goes home; the footer has
    // the rest), and the topic menus sit between the logo and the search box.
    .replace(/<div class="utility">[\s\S]*?<\/div><\/div>/, "")
    .replace(/<nav aria-label="Main navigation">[\s\S]*?<\/nav>/, "")
    .replace(/(<div class="ax-search gm-headsearch")([\s\S]*?)(<nav id="ax-navigation"[\s\S]*?<\/nav>)/, "$3$1$2")
    // Country menu (BookMyShow-style location picker) after the search box.
    // CountrySwitch.tsx sets the selected country and opens the list.
    .replace(/(<div class="ax-search gm-headsearch"[\s\S]*?<div id="tool-search-results" hidden><\/div><\/div>)/, `$1${countryMenuHtml()}`);
}

const PIN =
  '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9.5" r="2.5" fill="currentColor"/></svg>';

/** The header's country menu. Live countries link to their section; the rest are listed as coming soon. */
function countryMenuHtml(): string {
  const first = COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY) ?? COUNTRIES[0];
  const items = COUNTRIES.map((c) =>
    c.live
      ? `<li><a href="/${c.code}" data-country="${c.code}">${esc(c.name)}</a></li>`
      : `<li><span data-country="${c.code}" aria-disabled="true">${esc(c.name)}<small>Coming soon</small></span></li>`,
  ).join("");
  return (
    `<div class="gm-country"><button type="button" class="gm-country-btn" aria-expanded="false" aria-controls="gm-country-list">` +
    `${PIN}<span class="sr-only">Country: </span><span class="gm-country-name">${esc(first.short)}</span><span class="chevron" aria-hidden="true"></span></button>` +
    `<div class="gm-country-list" id="gm-country-list" hidden><p class="gm-country-note">Choose your country</p><ul>${items}</ul></div></div>`
  );
}

/** Quick links to the fixed-amount pages, shown on their topic page. */
const AMOUNT_LINKS: Partial<Record<CategorySlug, { title: string; all: [string, string]; links: [string, string][] }>> = {
  "tax-and-salary": {
    title: "Salary after tax",
    all: ["/uk/tax-and-salary/salary-after-tax", "Every salary from £15,000 to £250,000"],
    links: [20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100].map((k) => [`/uk/tax-and-salary/salary-after-tax/${k * 1000}`, `£${k},000 after tax`]),
  },
  property: {
    title: "Stamp Duty by price",
    all: ["/uk/property/stamp-duty-on", "Stamp Duty at every price to £2 million"],
    links: [200, 250, 300, 350, 400, 450, 500, 600, 750, 1000].map((k) => [
      `/uk/property/stamp-duty-on/${k * 1000}`,
      `Stamp Duty on ${k === 1000 ? "£1 million" : `£${k},000`}`,
    ]),
  },
};

function amountLinksHtml(slug: CategorySlug): string {
  const a = AMOUNT_LINKS[slug];
  if (!a || !AMOUNT_PAGES_LIVE) return "";
  const links = [...a.links, a.all].map(([href, label]) => `<a href="${href}">${esc(label)}</a>`).join("");
  return `<section class="gm-amountlinks" aria-labelledby="amounts-title"><h2 id="amounts-title">${esc(a.title)}</h2><div class="toollist">${links}</div></section>`;
}

/** The whole <main> content of a topic page. */
export function topicMainHtml(slug: CategorySlug): string {
  const c = CATS.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown category ${slug}`);
  const tools = getCalculatorsByCategory(slug);
  const jump = CATS.map((x) => `<a class="${x.slug === slug ? "chosen" : ""}" href="/uk/${x.slug}">${x.label}</a>`).join("");
  const items = tools
    .map(
      (t) =>
        `<a class="categorytool" href="${t.href}"><span class="toolicon">${c.toolIcon}</span><div><h2>${esc(shortTitle(t.title))}</h2>` +
        `<p>${esc(t.blurb)}</p><span class="openlabel">Open calculator</span></div></a>`,
    )
    .join("");
  return (
    `<div class="wrap"><div class="crumb"><a href="/">Home</a><span>›</span><a href="/uk">UK calculators</a><span>›</span>${c.label}</div>` +
    `<section class="categoryhero"><h1>${c.heroTitle}</h1><p>${c.heroDesc}</p></section>` +
    `<nav class="categoryjump" aria-label="Calculator categories">${jump}</nav><div class="fullcategory">${items}</div>${amountLinksHtml(slug)}` +
    `<a class="backlink" href="/uk#categories">Back to all categories</a></div>`
  );
}

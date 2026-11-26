import { getCalculatorsByCategory, shortTitle, type CategorySlug } from "../lib/calculators";
import cats from "./categories.json";

/**
 * Builds the calculator lists of the approved design (the homepage category
 * cards, the header menus and the three topic pages) from the live calculator
 * list, in the design's exact markup. The labels, descriptions and icons come
 * from categories.json (already HTML-escaped); the tools come from
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
 * The logo's link: the UK home page (/uk) inside the UK section, or the
 * site's home page ("/") elsewhere.
 */
function logoHomeHtml(html: string, country?: "uk"): string {
  return country ? html.replace(/href="\/"(?= aria-label="SumAtlas home")/g, `href="/${country}"`) : html;
}

/** The footer: its logo link, and a closing line that covers banks and lenders too (the JSONs say "the UK government"). */
export function footerHtml(html: string, country?: "uk"): string {
  return logoHomeHtml(html, country).replace(
    "Not affiliated with the UK government or a bank.",
    "Not affiliated with any government, bank or lender.",
  );
}

/** The topic menus' nav in chrome.json and the page JSONs. */
const TOPIC_NAV = /<nav id="ax-navigation"[\s\S]*?<\/nav>/;

/**
 * The topic menus, one per topic in CATEGORIES, in the design's markup. Each
 * menu lists every calculator in its topic, so new tools are linked from
 * every page. The menu headings are styled paragraphs rather than <h3>s, so
 * the page's own <h1> comes first in its heading outline.
 */
function topicNavHtml(): string {
  const items = CATS.map((c, i) => {
    const links = getCalculatorsByCategory(c.slug)
      .map((t) => `<a href="${t.href}">${esc(shortTitle(t.title))}</a>`)
      .join("");
    return (
      `<div class="ax-navitem"><button class="ax-navbutton" aria-expanded="false" aria-controls="mega-${i}">${c.label}<span class="chevron"></span></button>` +
      `<div class="ax-mega" id="mega-${i}" hidden><div class="ax-mega-title"><p class="ax-mega-h">${c.label}</p><p>${c.desc}</p>` +
      `<a class="button" href="/uk/${c.slug}">View all calculators</a></div><div class="ax-mega-links">${links}</div>` +
      `<div class="ax-mega-feature"><span>Plan with confidence</span><p class="ax-mega-h">${c.desc}</p><p>Free tools. Clear answers.</p>` +
      `<a href="/uk/${c.slug}">Explore ${c.label.toLowerCase()}</a></div></div></div>`
    );
  }).join("");
  return `<nav id="ax-navigation" class="ax-navigation" aria-label="Calculator categories">${items}</nav>`;
}

/**
 * The header with its topic menus built from the live catalogue (see
 * topicNavHtml), moved into the logo row. `country` is "uk" on pages inside
 * /uk, whose logo goes to /uk; elsewhere it goes to "/".
 */
export function headerHtml(html: string, country?: "uk"): string {
  return logoHomeHtml(
    html
      .replace(TOPIC_NAV, () => topicNavHtml())
      .replace(/<h3>([\s\S]*?)<\/h3>/g, '<p class="ax-mega-h">$1</p>')
      // One-row header (October 2026, owner's request): no claret strip, no
      // Home/Calculators/Guides/About links (the logo goes home; the footer has
      // the rest), and the topic menus sit between the logo and the search box.
      .replace(/<div class="utility">[\s\S]*?<\/div><\/div>/, "")
      .replace(/<nav aria-label="Main navigation">[\s\S]*?<\/nav>/, "")
      .replace(/(<div class="ax-search gm-headsearch")([\s\S]*?)(<nav id="ax-navigation"[\s\S]*?<\/nav>)/, "$3$1$2"),
    country,
  );
}

/**
 * A short "where to start" note under each topic's calculator list, so the
 * page explains what it covers instead of being a bare list. Figures match the
 * engines in src/lib (2026/27); recheck them with the rates each April.
 */
const TOPIC_ABOUT: Record<CategorySlug, string> = {
  benefits:
    `<p>Not sure what you can claim? Start with the <a href="/uk/benefits/benefits-checker">benefits checker</a>, then use the <a href="/uk/benefits/universal-credit">Universal Credit calculator</a> for an estimate of your award and the <a href="/uk/benefits/universal-credit-taper">taper calculator</a> to see what extra hours or a pay rise are worth. If you are thinking of going part-time, the <a href="/uk/tax-and-salary/pro-rata">pro rata salary calculator</a> turns a full-time salary into your hours. Families can check <a href="/uk/benefits/child-benefit">Child Benefit</a>, <a href="/uk/benefits/free-childcare-hours">free childcare hours</a>, <a href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</a> and <a href="/uk/life/healthy-start">Healthy Start</a>.</p>` +
    `<p>All figures use the DWP&rsquo;s 2026/27 rates. They are estimates to help you decide whether to apply: the DWP, HMRC or your council makes the real decision, and you apply through GOV.UK or your council, never through this site. Savings can affect means-tested help, and the <a href="/uk/investing/premium-bonds">Premium Bonds calculator</a> shows what a household savings pot might earn.</p>`,
  property:
    `<p>Renting? Check whether a <a href="/uk/property/rent-increase">rent increase</a> follows the rules where you live, what a <a href="/uk/property/deposit-return">deposit</a> should come back as after fair deductions, and what you owe for a part month with the <a href="/uk/life/pro-rata-rent">pro-rata rent calculator</a>.</p>` +
    `<p>For council tax, the <a href="/uk/property/council-tax-bands">council tax bands calculator</a> shows the bill for each band, and the <a href="/uk/property/single-person-discount">single person discount calculator</a> applies the 25% discount for living alone. If your income is low, the <a href="/uk/benefits/council-tax-reduction">Council Tax Reduction calculator</a> estimates help from your council.</p>`,
  students:
    `<p>Before university, the <a href="/uk/students/maintenance-loan">maintenance loan estimator</a> shows support in England by household income. Students from Scotland and Wales have their own systems: use the <a href="/uk/students/saas-funding">SAAS</a> and <a href="/uk/students/welsh-student-finance">Welsh student finance</a> calculators.</p>` +
    `<p>After you graduate, the <a href="/uk/students/plan-2-student-loan">Plan 2 student loan calculator</a> shows what you repay: 9% of income above £29,385 in 2026/27, with what is left written off after 30 years. The <a href="/uk/students/student-council-tax">student council tax checker</a> explains who counts as a full-time student for council tax.</p>`,
};

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
    `<div class="wrap"><div class="crumb"><a href="/uk">Home</a><span>›</span>${c.label}</div>` +
    `<section class="categoryhero"><h1>${c.heroTitle}</h1><p>${c.heroDesc}</p></section>` +
    `<nav class="categoryjump" aria-label="Calculator categories">${jump}</nav><div class="fullcategory">${items}</div>` +
    `<section class="gm-topicabout" aria-labelledby="topic-about"><h2 id="topic-about">Where to start</h2>${TOPIC_ABOUT[slug]}</section>` +
    `<a class="backlink" href="/uk#categories">Back to all categories</a></div>`
  );
}

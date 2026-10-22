import { EVERYDAY, US_CATEGORIES, getCalculatorsByCategory, shortTitle, type AnyCategory, type CategorySlug } from "../lib/calculators";
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
export function categoryLabel(slug: AnyCategory): string {
  const us = US_CATEGORIES.find((c) => c.slug === slug);
  if (us) return us.title;
  if (slug === "everyday") return EVERYDAY.title;
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
 * The logo's link: the country's own home page inside its section (/uk, /us),
 * or the site's home page ("/") elsewhere.
 */
function logoHomeHtml(html: string, country?: "uk" | "us"): string {
  return country ? html.replace(/href="\/"(?= aria-label="SumAtlas home")/g, `href="/${country}"`) : html;
}

/** The footer: its logo link, and a closing line that covers both countries (the JSONs say "the UK government"). */
export function footerHtml(html: string, country?: "uk" | "us"): string {
  return logoHomeHtml(html, country).replace(
    "Not affiliated with the UK government or a bank.",
    "Not affiliated with any government, bank or lender.",
  );
}

/** The topic menus' nav in chrome.json and the page JSONs (the UK's). */
const TOPIC_NAV = /<nav id="ax-navigation"[\s\S]*?<\/nav>/;

/**
 * The header with its mega menus built from the live catalogue: each topic's
 * menu lists every calculator in that topic (so new tools are linked from
 * every page), and the menu headings are styled paragraphs rather than <h3>s,
 * so the page's own <h1> comes first in its heading outline. The topic menus
 * are moved into the logo row.
 *
 * `country` is the section the page belongs to: its topic menus show and the
 * logo goes to its home. Shared pages (no country) carry both countries' menus
 * (see sharedNavHtml) and their logo goes to "/".
 */
export function headerHtml(html: string, country?: "uk" | "us"): string {
  const withNav = country === "us" ? html.replace(TOPIC_NAV, usNavHtml()) : country === "uk" ? html : sharedNavHtml(html);
  return logoHomeHtml(withNav
    .replace(
      /(<a class="button" href="(\/[a-z/-]+)">View all calculators<\/a><\/div><div class="ax-mega-links">)[\s\S]*?(<\/div>)/g,
      (_m, open: string, href: string, close: string) => {
        const slug = topicForHref(href);
        if (!slug) return _m;
        return (
          open +
          getCalculatorsByCategory(slug)
            .map((t) => `<a href="${t.href}">${esc(shortTitle(t.title))}</a>`)
            .join("") +
          close
        );
      },
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
    .replace(/(<div class="ax-search gm-headsearch"[\s\S]*?<div id="tool-search-results" hidden><\/div><\/div>)/, `$1${countryMenuHtml()}`), country);
}

/** The topic a "View all calculators" link points at (/uk/benefits, /us/taxes, /everyday). */
function topicForHref(href: string): AnyCategory | undefined {
  if (href === EVERYDAY.href) return "everyday";
  const us = US_CATEGORIES.find((c) => c.href === href);
  if (us) return us.slug;
  const uk = CATS.find((c) => `/uk/${c.slug}` === href);
  return uk?.slug;
}

/**
 * The US topic menus, in the same markup as the UK menus in chrome.json (the
 * calculator lists are filled in by headerHtml). `prefix` starts each mega
 * menu's id and `cls` is added to each item's class.
 */
function usNavItems(prefix: string, cls?: string): string {
  return [...US_CATEGORIES, EVERYDAY]
    .map(
      (c, i) =>
        `<div class="ax-navitem${cls ? ` ${cls}` : ""}"><button class="ax-navbutton" aria-expanded="false" aria-controls="${prefix}${i}">${esc(c.menu)}<span class="chevron"></span></button>` +
        `<div class="ax-mega" id="${prefix}${i}" hidden><div class="ax-mega-title"><h3>${esc(c.title)}</h3><p>${esc(c.description)}</p>` +
        `<a class="button" href="${c.href}">View all calculators</a></div><div class="ax-mega-links"></div>` +
        `<div class="ax-mega-feature"><span>Plan with confidence</span><h3>${esc(c.tagline)}</h3><p>Free tools. Clear answers.</p>` +
        `<a href="${c.href}">Explore ${esc(c.title.toLowerCase())}</a></div></div></div>`,
    )
    .join("");
}

/** The header's topic menus on US pages. */
function usNavHtml(): string {
  return `<nav id="ax-navigation" class="ax-navigation" aria-label="Calculator categories">${usNavItems("mega-")}</nav>`;
}

/**
 * The header's topic menus on shared pages (/, /about, the legal pages, /blog,
 * /calculators, /widgets, /everyday, the 404 page): the UK's menus (class
 * gm-nav-uk) followed by the US's (gm-nav-us, mega menus mega-us-0…) in the
 * one nav. CountrySwitch.tsx sets html[data-country] to the visitor's
 * country, and govmath-theme.css shows the US menus for "us" and the UK menus
 * otherwise, including before the script runs and without JavaScript. One nav
 * rather than two because axis.js opens the first .ax-navigation from the
 * mobile Menu button; it binds every .ax-navbutton by its aria-controls id.
 */
function sharedNavHtml(html: string): string {
  return html.replace(
    /(<nav id="ax-navigation"[^>]*>)([\s\S]*?)(<\/nav>)/,
    (_m, open: string, items: string, close: string) =>
      open + items.replace(/<div class="ax-navitem">/g, '<div class="ax-navitem gm-nav-uk">') + usNavItems("mega-us-", "gm-nav-us") + close,
  );
}

const PIN =
  '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9.5" r="2.5" fill="currentColor"/></svg>';

/**
 * The header's country menu: the live countries, each linking to its
 * section. Countries not yet live stay out of it (since 15 October 2026: a
 * "Coming soon" list reads as an unfinished site); setting `live: true` in
 * countries.ts adds one.
 */
function countryMenuHtml(): string {
  const first = COUNTRIES.find((c) => c.code === DEFAULT_COUNTRY) ?? COUNTRIES[0];
  const items = COUNTRIES.filter((c) => c.live)
    .map((c) => `<li><a href="/${c.code}" data-country="${c.code}">${esc(c.name)}</a></li>`)
    .join("");
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
/**
 * A short "where to start" note under each UK topic's calculator list, so the
 * page explains what it covers instead of being a bare list. Figures match the
 * engines in src/lib (2026/27); recheck them with the rates each April.
 */
const TOPIC_ABOUT: Record<CategorySlug, string> = {
  "tax-and-salary":
    `<p>Most people should start with the <a href="/uk/tax-and-salary/salary-calculator">salary calculator</a>: it shows Income Tax, National Insurance, pension and student loan on any salary for the 2026/27 tax year, with Scotland&rsquo;s own bands. If a payslip looks wrong, the <a href="/uk/tax-and-salary/tax-code-decoder">tax code checker</a> explains codes such as 1257L, BR and K codes, and the <a href="/uk/tax-and-salary/emergency-tax">emergency tax calculator</a> estimates any refund.</p>` +
    `<p>Every calculator here uses the 2026/27 rules: a £12,570 Personal Allowance, 20%, 40% and 45% rates in England, Wales and Northern Ireland, and employee National Insurance of 8% and 2%. Each page lists its sources and what it assumes.</p>`,
  property:
    `<p>Buying a home? Work out the tax first: <a href="/uk/property/stamp-duty-england">Stamp Duty</a> in England and Northern Ireland, <a href="/uk/property/lbtt-scotland">LBTT</a> in Scotland and <a href="/uk/property/ltt-wales">LTT</a> in Wales have different bands and first-time buyer rules. Then check what you could borrow with the <a href="/uk/property/mortgage-affordability">affordability calculator</a> and what it costs each month with the <a href="/uk/property/mortgage-repayment">mortgage repayment calculator</a>.</p>` +
    `<p>Renters can check whether a <a href="/uk/property/rent-increase">rent increase</a> follows the rules and what a <a href="/uk/property/deposit-return">deposit</a> should come back as. The energy calculators use the Ofgem price cap for October to December 2026.</p>`,
  business:
    `<p>Self-employed? The <a href="/uk/business/sole-trader-tax">sole trader tax calculator</a> works out Income Tax and Class 4 National Insurance (6% and 2%) on your profit, and the <a href="/uk/business/payment-on-account">payment on account estimator</a> shows what is due on 31 January and 31 July. The <a href="/uk/business/allowable-expenses">expenses checker</a> shows what you can claim.</p>` +
    `<p>Limited company directors can compare salary and dividends with the <a href="/uk/business/dividend-vs-salary">dividend vs salary optimiser</a>, and estimate Corporation Tax at 19% on profits up to £50,000 and 25% above £250,000, with marginal relief between. The <a href="/uk/business/vat-threshold">VAT threshold checker</a> tracks your rolling turnover against the £90,000 limit.</p>`,
  investing:
    `<p>For retirement, start with the <a href="/uk/investing/workplace-pension">workplace pension calculator</a> and <a href="/uk/investing/pension-tax-relief">pension tax relief calculator</a>, then check when you can claim the State Pension with the <a href="/uk/investing/state-pension-age">State Pension age lookup</a>. The full new State Pension is £241.30 a week in 2026/27.</p>` +
    `<p>For savings and investments, the <a href="/uk/investing/isa-vs-gia">ISA vs GIA comparison</a> shows what the £20,000 ISA allowance saves in tax, and the <a href="/uk/investing/dividend-tax">dividend tax</a> and <a href="/uk/investing/capital-gains-assets">capital gains</a> calculators use the £500 dividend allowance and £3,000 annual exempt amount. Growth figures are projections, not promises.</p>`,
  benefits:
    `<p>Not sure what you can claim? Start with the <a href="/uk/benefits/benefits-checker">benefits checker</a>, then use the <a href="/uk/benefits/universal-credit">Universal Credit calculator</a> for an estimate of your award and the <a href="/uk/benefits/universal-credit-taper">taper calculator</a> to see what extra hours or a pay rise are worth. Families can check <a href="/uk/benefits/child-benefit">Child Benefit</a>, <a href="/uk/benefits/free-childcare-hours">free childcare hours</a> and <a href="/uk/benefits/tax-free-childcare">Tax-Free Childcare</a>.</p>` +
    `<p>All figures use the DWP&rsquo;s 2026/27 rates. They are estimates to help you decide whether to apply: the DWP, HMRC or your council makes the real decision, and you apply through GOV.UK or your council, never through this site.</p>`,
  vehicles:
    `<p>The <a href="/uk/vehicles/car-tax-ved">car tax calculator</a> shows VED for any car, and company car drivers can work out benefit-in-kind tax with the <a href="/uk/vehicles/benefit-in-kind">BIK calculator</a> or compare an <a href="/uk/vehicles/ev-salary-sacrifice">electric car through salary sacrifice</a>. Running costs are covered by the <a href="/uk/vehicles/fuel-cost-journey">fuel cost</a> and <a href="/uk/vehicles/petrol-vs-ev-cost">petrol vs electric</a> calculators.</p>` +
    `<p>The MOT, SORN and licence tools work out dates and amounts only. To book an MOT, declare SORN or renew a licence, use the official DVLA and DVSA services on GOV.UK.</p>`,
  students:
    `<p>The <a href="/uk/students/student-loan-repayment">student loan repayment calculator</a> covers Plans 1, 2, 4 and 5 and the Postgraduate Loan: you repay 9% of income above your plan&rsquo;s threshold (£29,385 for Plan 2 and £25,000 for Plan 5 in 2026/27), and what is left is written off after 25 to 40 years. Before university, the <a href="/uk/students/maintenance-loan">maintenance loan estimator</a> shows support by household income.</p>` +
    `<p>Students from Scotland and Wales have their own systems: use the <a href="/uk/students/saas-funding">SAAS</a> and <a href="/uk/students/welsh-student-finance">Welsh student finance</a> calculators. The <a href="/uk/students/student-budget">student budget calculator</a> checks whether your loan covers rent and living costs.</p>`,
  life:
    `<p>The <a href="/uk/life/inheritance-tax">inheritance tax calculator</a> uses the £325,000 nil-rate band and the £175,000 residence nil-rate band, and the <a href="/uk/life/probate-fees">probate fees calculator</a> shows the court fee. The <a href="/uk/life/care-home-means-test">care home means test</a> covers the rules in all four UK nations.</p>` +
    `<p>For day-to-day sums, the <a href="/uk/life/pro-rata-rent">pro-rata rent calculator</a> splits rent for a part month and the <a href="/uk/life/bank-holidays">bank holidays calculator</a> counts working days in England and Wales, Scotland and Northern Ireland.</p>`,
};

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
    `<nav class="categoryjump" aria-label="Calculator categories">${jump}</nav><div class="fullcategory">${items}</div>${amountLinksHtml(slug)}` +
    `<section class="gm-topicabout" aria-labelledby="topic-about"><h2 id="topic-about">Where to start</h2>${TOPIC_ABOUT[slug]}</section>` +
    `<a class="backlink" href="/uk#categories">Back to all categories</a></div>`
  );
}

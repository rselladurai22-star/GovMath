# GovMath SEO plan (October 2026)

This is the follow-up to the October 2026 SEO audit. The on-site fixes are in the code (see "Done in code"); the rest needs the owner, because it happens off the site or in Google's tools.

## Why traffic is low

1. **No authority yet.** The domain is about five months old and has almost no links from other sites. On money topics Google prefers sources it trusts (GOV.UK, MoneySavingExpert, Which?, established calculator sites).
2. **Few long-tail pages.** Head terms ("salary calculator", "stamp duty calculator") are out of reach for a new site. Specific searches ("£35,000 after tax", "stamp duty on £400,000") are winnable; the site now has pages for them.
3. **Internal linking and snippets** were weak. Fixed in code.

## Done in code (October 2026)

| Audit item | What changed |
|---|---|
| C2 long-tail pages | `/tax-and-salary/salary-after-tax` (+140 salaries) and `/property/stamp-duty-on` (+47 prices), built from the engines (`src/lib/seo/amounts.ts`), linked from the topic pages, the salary and Stamp Duty guides, and the sitemap |
| H1 menu gaps | The mega menus list every calculator, generated from `CALCULATORS` (`headerHtml` in `src/gm/catalog.ts`) |
| H2 in-text links | About 540 links added inside guide text; every guide links to 3 to 6 related calculators |
| H3/H4/M6 snippets | Every title is 60 characters or fewer and ends with "\| GovMath" (title template in the root layout); every description is 160 characters or fewer and starts with the answer |
| H5/M7 schema | Organization and WebSite (root layout), WebApplication with `dateModified` on every calculator, BreadcrumbList and ItemList on topic pages, BreadcrumbList on articles (`src/gm/schema.ts`) |
| H6 trust | Trust line says "Independent: not a government website" on every calculator and amount page |
| M1 sitemap | Real last-changed dates from `src/gm/updated.json`; no fake build-time dates |
| M2 headings | Menu headings are styled paragraphs, so each page's `<h1>` comes first |
| M3 share images | One Open Graph image per calculator, topic and article (`src/app/og/[[...path]]/route.tsx`) |
| M5 content | Two new articles: salary sacrifice, Marriage Allowance |
| M4 page weight | Measured: about 27 KB compressed per page. About 5 KB of that is the 404 page's header and footer, which Next.js embeds in every page's data. The only fix is the experimental `global-not-found`, which would break the blog's own 404 page, so it was left alone |

## For the owner

### 1. Search Console (do first)

- Check that `govmath.co.uk` is verified as a Domain property and that `https://govmath.co.uk/sitemap.xml` is submitted. It now lists 339 URLs.
- After the deploy, use URL Inspection → Request indexing for the home page, `/tax-and-salary/salary-after-tax`, `/property/stamp-duty-on` and the 10 most important calculators.
- Every month, export **Pages** (the reasons pages are not indexed) and **Performance → Queries** (last 3 months) and share them. They show whether the problem is indexing or ranking, and which queries are close to page 1.
- If many amount pages show "Crawled – currently not indexed" after 6 to 8 weeks, do not add more; improve the ones that are indexed first.

### 2. Links from other sites (the biggest lever)

Aim for 10 to 20 relevant links a month. In order of value:

1. **Answers that link to a tool.** Where people ask a question a calculator answers (Reddit r/UKPersonalFinance, MoneySavingExpert forum, Mumsnet money boards), answer it fully and link to the specific calculator. Never post links without a real answer; moderators remove them.
2. **Resource pages.** University money advice pages (student loan, maintenance loan, SAAS and Student Finance Wales calculators), union and charity benefit pages (benefits checker, PIP points, Carer's Allowance), landlord associations (deposit return, rent increase, right to rent). Email the page owner with one sentence on why the tool helps their readers.
3. **Journalist requests.** Sign up to ResponseSource, Qwoted or #journorequest on X and answer money questions with a figure from a calculator.
4. **Data stories.** One a quarter, e.g. "The £100,000 tax trap costs a parent of two £X", "Stamp Duty on the average first home in each region". Send to personal finance journalists with the figures and a link.
5. **Business listings.** A Google Business Profile is not suitable (no premises), but the site can be listed in reputable directories of UK money tools.

Avoid paid links, link exchanges and private blog networks: they can lead to a manual penalty.

### 3. Trust (E-E-A-T)

The site uses a generic "GovMath team" byline at the owner's request. If a qualified person (for example a chartered accountant or a welfare rights adviser) is willing to review pages, add a genuine "Reviewed by" with their real name and credentials. Never invent one.

### 4. Content rhythm

Publish one or two articles a week. Each should answer a question people search for and link to two or three calculators. Compute every figure from the engines with a temporary test, as for the guides. Ideas: "How much tax on a £10,000 bonus", "Stamp Duty for second homes in 2026/27", "Universal Credit and part-time work", "Plan 2 student loan: should you overpay", "State Pension age by birth year", "Inheritance Tax and pensions from April 2027".

### 5. Measure

Each month, compare in Search Console: clicks, impressions, average position for "after tax" and "stamp duty on" queries, and the number of indexed pages. Expect the long-tail pages to show impressions within 4 to 8 weeks and clicks to follow once links come in.

# GovMath 10X growth strategy (October 2026)

Phase 2 of the SEO work. Phase 1 (the audit and its fixes) is live; see `docs/SEO-PLAN.md`. This document sets out how to grow organic traffic tenfold in 12 months, what to build, in what order, and how to tell whether it is working.

## 1. The target

**10X means 10 times the monthly organic clicks in Search Console**, measured on a 28-day window, with **September 2026 as the baseline**. The baseline must come from Search Console (Performance → Search results → last 28 days to 30 September 2026). Until the owner shares it, every target below is a multiple of the baseline, not an absolute number.

| Milestone | Target (× baseline clicks) | What drives it |
|---|---|---|
| Month 3 (January 2027) | 2 to 3× | Phase 1 fixes indexed, the first new page families, January Self Assessment season |
| Month 6 (April 2027) | 4 to 5× | 2027/28 rates published before competitors, more page families, first links |
| Month 9 (July 2027) | 6 to 8× | Links compounding, head pages climbing, student finance season |
| Month 12 (October 2027) | 10× | All levers working together |

**Why 10X is realistic here:** the site is five months old with a small base. Three things multiply together:

**Organic clicks = pages that rank × queries each page wins × click-through rate.**

1. **Pages that rank.** Most of the 341 URLs are newly indexed or not yet indexed. The long-tail families below add about 600 more useful pages (about 950 with council tax).
2. **Queries each page wins.** Authority (links) and freshness (being first with 2027/28 figures) move pages from positions 15 to 30 onto page 1, where almost all clicks are.
3. **CTR.** The new titles and answer-first descriptions are live. Seasonal freshness ("2027/28") lifts CTR further every April.

Doubling each of the three already gives 8×. Seasonality adds the rest.

## 2. Where the traffic is: the opportunity map

UK calculator searches fall into four kinds:

| Kind | Examples | Who wins today | Our play |
|---|---|---|---|
| **Head terms** | salary calculator, stamp duty calculator, mortgage calculator | GOV.UK, MoneySavingExpert, thesalarycalculator, banks | Long game: earn links, make the flagship pages the best answer |
| **Amount long tail** | £35,000 after tax, stamp duty on £400k, £200k mortgage monthly payments, £15 an hour annual salary | Specialist calculator sites with thousands of pages | **Biggest near-term lever**: page families built from our engines |
| **Lookup long tail** | LHA rates Bristol, bank holidays 2027, state pension age if born 1968 | GOV.UK (weak pages), council sites, small blogs | **Second lever**: our data is already in the engines |
| **Moments** | Budget 2026 calculator, 2027/28 tax rates, student loan interest September | News sites, then GOV.UK | **Third lever**: be first with accurate numbers |

**Validate demand before building each family.** Use the free Google Keyword Planner (in a Google Ads account, no spend needed) or Search Console impressions, and record the monthly volume beside each family in the table in section 3. Don't build a family whose head query shows under about 100 searches a month across the family.

## 3. Lever 1: long-tail page families

Each family is a set of static pages generated from a tested engine, like the salary-after-tax and Stamp Duty pages: `AmountPage` frame, figures from `src/lib`, `dynamicParams = false`, an index page, links between neighbouring pages, and inclusion in the sitemap.

### Ranked build list

| # | Family | URL pattern | Pages | Data | Effort | Priority |
|---|---|---|---|---|---|---|
| 1 | Bank holidays by year | `/life/bank-holidays/2027` (2026 to 2030) | 5 | `calendar.ts` (all four nations) | Low | **P1** |
| 2 | LHA rates by area | `/benefits/local-housing-allowance/<area>` | 200 | `lha-*.ts` (weekly and UC monthly, all categories) | Low | **P1** |
| 3 | State Pension age by birth year | `/investing/state-pension-age/born-1968` (1955 to 2000) | 46 | `retirement.ts` | Low | **P1** |
| 4 | Mortgage on £X | `/property/mortgage-on/200000` (£50k to £1m every £25k) | 39 | `mortgage-engine.ts`; a table of rates (3% to 6%) × terms (25, 30, 35 years), repayment and interest-only | Medium | **P1** |
| 5 | Hourly rate after tax | `/tax-and-salary/hourly-after-tax/15` (£12.71 NLW, then £13 to £30 every 50p, £31 to £50 every £1) | about 55 | take-home engine, 37.5 h and 40 h weeks | Low | **P1** |
| 6 | Monthly take-home to salary | `/tax-and-salary/take-home/2500-a-month` (£1,500 to £6,000 every £100) | 46 | `reverse.ts` | Low | P2 |
| 7 | LBTT and LTT by price | `/property/lbtt-on/300000`, `/property/ltt-on/300000` | 94 | `regional-stamp-duty.ts` | Low | P2 |
| 8 | Maintenance loan by household income | `/students/maintenance-loan/income-40000` (£25k to £70k every £2,500) | 19 | `loans.ts` (home, away, London) | Low | P2 |
| 9 | Council tax by council | `/property/council-tax/<council>` | about 350 | **Needs new data**: Band D 2026/27 for every council (MHCLG, Welsh Government and Scottish Government tables), refreshed each April | High | P2, highest ceiling |
| 10 | Clean air zones by city | `/vehicles/clean-air-zones/<city>` | about 15 | `ZONES_2026` | Low | P3 |
| 11 | Inheritance tax on an estate of £X | `/life/inheritance-tax-on/500000` | about 30 | `estate.ts` (single, married, with home) | Medium | P3 |
| 12 | Student loan repayments by salary | `/students/plan-2-student-loan/salary-35000` | about 40 per plan | `loans.ts` | Low | P3 (overlaps the salary pages; only if Search Console shows demand) |

P1 adds about 345 pages, P2 about 160 (plus about 350 councils once that data exists), and P3 about 85 to 125. The total is about 600 new pages over 12 months, or about 950 with council tax.

### Quality rules (non-negotiable)

Google's "scaled content abuse" policy (March 2024) penalises mass-produced pages that add nothing. Every family must pass these rules or not ship:

1. **Each page answers its query with figures unique to it**, computed from a tested engine. No pages that differ only in a number in the title.
2. **Each page offers more than the calculator alone gives:** a comparison table, neighbouring values, the other nations, the effect of common options (pension, student loan, buyer type), and a link to the full calculator pre-filled with the value.
3. **No thin pages:** about 400 words of explanation plus tables at minimum, written once per family and filled with that page's own figures.
4. **Gate each expansion on indexing:** release a family, then wait 4 to 6 weeks. If Search Console indexes less than 60% of it, stop adding families and improve the pages instead (more unique content, more internal links).
5. **Accuracy:** each family's figures are recomputed from the engines at every build, so April rate changes flow through. Add each family to the HANDOFF list of figures to recheck.

## 4. Lever 2: own the seasonal moments

UK money searches spike at fixed times. Being first with correct figures wins those spikes and earns links, because journalists and forums link to whoever has the numbers first.

| When | Moment | What to have live |
|---|---|---|
| Late November 2026 (date TBC) | **Autumn Budget** | A "Budget 2026: what it means for you" page and article, updated the same day. Set every calculator affected by a change to show a "Budget change" callout within 48 hours |
| December 2026 | Bank holidays and the new year | Bank holidays 2027 page (family 1); a "plan your 2027 leave" article |
| January 2027 | **Self Assessment deadline (31 January)** | Sole trader, payments on account and allowable expenses pages refreshed; a "Self Assessment 2027 checklist" article linking them |
| **February 2027** | Run-up to the new tax year | **2027/28 engines built and published as "2027/28" versions alongside 2026/27** (salary, NI, Scottish tax, student loans, Child Benefit, benefits uprating). Competitors usually switch in April; being first ranks for "2027/28" queries |
| April 2027 | **New tax year**: rates change, savings tax rises, £12,000 cash ISA limit, pensions enter IHT | Switch every default to 2027/28, keep 2026/27 one click away; articles on each April 2027 change |
| June to August 2027 | Student finance applications, results | Maintenance loan family (8), SAAS, Wales; "student finance 2027/28" refresh |
| September 2027 | Student loan interest changes | Loan interest pages updated on announcement day |

## 5. Lever 3: make the head pages the best answer

Pick the 12 pages with the highest commercial value and search volume: salary, Stamp Duty, mortgage repayment, mortgage affordability, Universal Credit, maternity pay, student loan (Plan 2, Plan 5), inheritance tax, Capital Gains Tax, VAT, council tax and redundancy. For each:

1. **Answer above the fold on mobile.** The result for typical inputs should be visible without scrolling. Check at 375 px.
2. **A "What changed" box** with dated entries (for example "6 April 2027: thresholds updated"). It shows freshness to readers and to Google.
3. **The 2027/28 preview** from February (section 4).
4. **Unique data that others don't have:** for example a chart of take-home across salaries, the marginal-rate cliffs, or regional comparisons. Data that others want to reference earns links.
5. **Track 3 to 5 target queries per page** in Search Console (Performance filtered by page) every month: position, CTR and impressions.

## 6. Lever 4: authority (links)

This is still the biggest limit (see `docs/SEO-PLAN.md`). Target: **10 new referring domains a month by month 3, 20 by month 6.**

Assets built to earn links (code work):

1. **Embeddable calculators.** A lightweight embed of the salary, Stamp Duty and mortgage calculators (`/embed/<calculator>`) with a "Powered by GovMath" credit link. It targets estate agents, HR blogs, payroll bureaux, university money pages and student unions. Each install is a link. Embeds must be `noindex` and canonical to the main page.
2. **An annual data report:** "The UK's tax cliffs 2027", computed entirely from our engines (the £100,000 trap, the Child Benefit charge, the Universal Credit taper, student loans stacking, the Scottish bands). It is a one-page study with charts, offered to personal finance journalists around the Budget and in April.
3. **"Cite this figure" links** on key result tables: a short permalink and a citation line, so bloggers and forum users can quote the number with a link.

Outreach (owner work, a few hours a week), detailed in `docs/SEO-PLAN.md`:

- Answers on Reddit r/UKPersonalFinance and the MoneySavingExpert forum that link to the specific tool
- University and student union money pages
- Charities and advice services: Citizens Advice local offices, carers' charities, Turn2us-style resource lists
- Journalist requests (ResponseSource, Qwoted, #journorequest)

## 7. Lever 5: beyond Google

1. **Bing and AI search.** Bing's index feeds ChatGPT search and Copilot. Steps:
   - Code: add **IndexNow** (a key file plus a ping of changed URLs on each deploy) so new pages are found within hours.
   - Owner: submit the site in Bing Webmaster Tools, which can import the Search Console setup.
2. **AI answers (Google AI Overviews, ChatGPT, Perplexity).** These cite pages that state a clear answer in one sentence, back it with a table and show a date. The amount pages already work like this; apply the same pattern to the head pages: one sentence with the answer, a table, then "Updated" and "Sources".
3. **Direct and return visits.** Add an optional **"Email me when the rates change"** sign-up, sent around the Budget and in April, to bring people back. Use a UK-based or GDPR-compliant email provider, and add it to the privacy policy. Saved results through shareable URLs already work; make the share link more prominent.

## 8. Lever 6: click-through and engagement

1. **Show figures in titles where possible** (done for the amount pages). Test the same on head pages, for example "Stamp Duty Calculator 2026/27: £0 up to £125k".
2. **Next-step journeys:** after a result, suggest the most likely next calculator (salary → pension tax relief; Stamp Duty → moving costs → mortgage). These are already partly in the related cards; make them part of the result panel.
3. **Watch CTR by page type monthly.** If a page ranks in the top 10 with a CTR under 2%, rewrite its title and description.

## 9. Measurement

**Monthly dashboard** (Search Console plus GA4; an owner export or Search Console API access):

| Metric | Source | Target direction |
|---|---|---|
| Organic clicks (28 days) vs baseline | Search Console | 10× by October 2027 |
| Impressions | Search Console | Leading indicator, rises first |
| Indexed pages / submitted | Search Console → Pages | 70% or more |
| Clicks by page family (salary-after-tax, stamp-duty-on, …) | Search Console, filter by URL | Each family pays its way within 3 months |
| Queries in positions 4 to 15 | Search Console | The "almost there" list to improve first |
| Referring domains | Search Console → Links (or a free Ahrefs Webmaster Tools account) | 10 a month, then 20 |
| Engagement: calculations run, pages per visit | GA4 | Rising |

**Decision rules:**

- A family with under 60% indexing after 6 weeks: improve it, and don't add more.
- A family with almost no impressions after 3 months: fold it into fewer, richer pages, or remove it with redirects.
- A page in positions 4 to 15 with real impressions: improve its content and give it more internal links first. It is the cheapest gain.

## 10. The 12-month roadmap

| Month | Code (Claude) | Owner |
|---|---|---|
| **Oct 2026** | IndexNow; families 1 to 3 (bank holidays by year, LHA by area, State Pension age by birth year) | Share the Search Console baseline; set up Bing Webmaster Tools; validate volumes in Keyword Planner |
| **Nov 2026** | Families 4 and 5 (mortgage on £X, hourly after tax); Budget day page and same-day updates | Outreach: 5 university money pages, Reddit and MSE answers |
| **Dec 2026** | Embeddable salary, Stamp Duty and mortgage calculators; "What changed" boxes on head pages | Pitch the embeds to estate agents and HR/payroll blogs |
| **Jan 2027** | Families 6 and 7 (monthly take-home, LBTT/LTT by price); Self Assessment article | Self Assessment outreach; first monthly review |
| **Feb 2027** | 2027/28 engines and "2027/28" pages for the main calculators; "Tax cliffs 2027" report | Pitch the report to journalists |
| **Mar 2027** | Family 8 (maintenance loan by income); council tax data project begins | Second review: indexing rate per family |
| **Apr 2027** | Switch to 2027/28 everywhere; April-change articles; council tax by council (family 9) | Press on the April changes |
| **May–Jun 2027** | Families 10 and 11; improve positions 4 to 15 | Student union outreach before results day |
| **Jul–Aug 2027** | Student finance 2027/28 refresh; rate-alert email | Results-day outreach |
| **Sep 2027** | Student loan interest update; review every family | Annual review |
| **Oct 2027** | Measure against the 10X target; plan year 2 | — |

## 11. Risks and how we handle them

| Risk | Mitigation |
|---|---|
| Google treats page families as scaled content | Quality rules in section 3; gate each expansion on indexing; unique figures and tables on every page |
| A core update hits finance sites | Real usefulness, accurate figures, trust signals (sources, How we check, real dates); no tricks |
| Wrong figures on hundreds of pages | Figures come only from tested engines; annual recheck list in HANDOFF; a correction updates every page at once |
| The AdSense review | Leave the ad script alone during the review; new pages carry the same layout and policies |
| Links don't come | The embeds and the data report create reasons to link; the owner's outreach time is the deciding factor |

## 12. What is needed from the owner

1. **The Search Console baseline** (clicks, impressions, indexed pages for September 2026) and monthly exports.
2. **Keyword Planner volumes** for the family head queries (a list can be supplied).
3. **About 3 hours a week of outreach** (section 6).
4. **A go-ahead per batch.** Recommended first batch: IndexNow, plus families 1 to 3 (bank holidays by year, LHA by area, State Pension age by birth year). All three use data the site already has and can ship within days.

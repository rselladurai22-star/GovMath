# GovMath project memory

Read this at the start of every session. It records how we work, how the code is built, and what is still to do.
Last updated: 6 October 2026 (Phases 0 to 8 live; Phase 9 under way; the claret and neutral Axis-style design now applies to every page).

## Goal

govmath.co.uk is a UK calculator site. Every calculator page should be a **flagship calculator**:

- It covers all the advanced fields, which are **optional** and sit under "More options".
- It has a clear label hierarchy (label CSS).
- It has a guide of **at least 2,000 words** with visuals, counting the guide and the page FAQ together (since October 2026 each page has one FAQ: the guide has no questions section). Very simple tools get 1,000 to 1,500 words.
- It has a "What we assumed" card, shareable URLs and live results.

We go category by category, one phase at a time.

## Workflow (the owner's rules)

1. Build on the designated `ccr-*` branch, then open or update a PR. The owner reviews it.
2. When the owner says **"Merge it and deploy"**:
   - Rebase-merge the PR.
   - Wait for Vercel to deploy and check the live pages on govmath.co.uk.
   - Reset the branch to `origin/main` and force-push.
3. Start the next phase only when the owner says so (for example "Phase 3").
4. **The font is Lato** (switched from Plus Jakarta Sans in October 2026 at the owner's request for the new design). Don't change it without asking.
5. Never send the owner's email address to any external service.
6. Write in plain UK English. Use 2026/27 tax-year figures (each engine under `src/lib/` holds its own rates, e.g. `src/lib/tax/2026-27.ts`).

## Stack and commands

- **Stack:** Next.js 16 App Router (`searchParams` is a Promise), React 19, Vitest, Playwright. All styling comes from plain stylesheets in `public/gm/` (no CSS Modules, no Tailwind).
- **Build:** `NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt NODE_USE_ENV_PROXY=1 npx next build --webpack`
- **Serve:** `npx next start -p <new port>`. Use a fresh port each time.
- **Never run `pkill -f next`.** It kills the shell.
- **Checks:** `npx tsc --noEmit -p .`, `npx eslint .` (no warnings) and `npx vitest run`.
- **Playwright Chromium:** `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Run scripts from the repo directory and delete them afterwards (the stop hook flags untracked files).
- **Release checks:**
  - Count each guide's words by the `innerText` of `.g-article`. The target is 2,000 or more.
  - Sweep every sitemap page at widths 375, 768, 1280, 1920 and 2560. Check for horizontal overflow, the text NaN, Infinity or undefined, and console errors (ignore "Failed to load resource").

## How a flagship page is built

Use any `src/app/property/*` or `src/app/tax-and-salary/*` page as the template.

- **`page.tsx`:** an async server component.
  - It awaits `searchParams` into `query`.
  - It renders `<FlagshipPage breadcrumbs eyebrow title lead points guide faqs related note>`.
  - It places `<XStudio query={query} />` inside.
  - It sets `alternates.canonical`.
- **`XStudio.tsx`** (client):
  - It defines a module-level `SCHEMA` using `num`, `oneOf`, `bool`, `date` and `text` from `components/flagship/useStudio`.
  - It calls `const st = useStudio(SCHEMA, query)`.
  - It uses `st.bind(key)`, `st.changed(keys)`, `st.resetKeys(keys)` and `<ShareButton>`.
  - It renders a `<Studio title ready onCalculate calculateLabel onReset dock inputs>` containing:
    - `InputGroup` with the main fields
    - `AdvancedOptions` with the optional fields
    - results built from `Answer`, `Facts`, `Assumptions`, `ResultCard`, `SplitBar`, `Compare`, `Statement`, `Callout`, `DataTable` and `AreaChart`
  - Inputs come from `components/flagship/inputs.tsx`.
  - Formatting helpers (`gbp`, `gbpShort`, `percent`, `duration`) come from `components/flagship/format.ts`.
  - The calculate button label should start with Calculate, Work out, Find, Check, Decode, Compare or See, so the sweep can click it.
- **`XGuide.tsx`:** a server component using `components/guide/Guide.tsx`.
  - Frame: `Guide`, `GuideSection`.
  - Blocks: `WorkedExample`, `DataTable`, `CompareCards`, `Timeline`, `KeyStats`, `Callout`.
  - Charts: `BandBar`, `Bars`, `StepChart`.
  - End with sections `questions` then `key-numbers`.
- **Logic** goes in pure, tested libraries under `src/lib/<area>/`. **Compute every figure quoted in a guide from these libraries** using a temporary test, never by hand. Hand arithmetic caused errors several times.
- `git rm` the old `*Calculator.tsx` once it is replaced.
- Adding sections to a guide: a helper that inserted sections before "questions" and renumbered the rest was used. It is easy to recreate. Write `'` as `&rsquo;` in any inserted JSX text, or ESLint fails.
- Vitest does not resolve the `@/` alias, so `src/lib` files must use relative imports.
- Playwright is not a project dependency: install `playwright-core` in a scratch folder and launch with `executablePath`.

## Design (approved package, every page)

The owner supplied a finished static design: `GovMath-Complete-Website-Source.zip`, approved live reference https://govmath-mortgage-axis-design.rselladurai22.chatgpt.site/. Keep its layout: header, mega menus, footer, spacing, cards, calculator controls and charts. Colours and type follow the owner-approved site-wide look below. Do not add a component library.

**Pages taken straight from the package** (rendered from its HTML; the layout is the package's, the colours and type follow the site-wide look below):

- `/` (home) and the 8 topic pages: `/tax-and-salary`, `/property`, `/business`, `/investing`, `/benefits`, `/vehicles`, `/students`, `/life`
- `/tax-and-salary/salary-calculator` and `/property/mortgage-repayment`

How they are built:
- **Page data.** `src/gm/pages/*.json` holds each page's title, description, stylesheet order, script order and top-level body elements, converted from the supplied HTML. Links are site-relative with no trailing slash; images point to `/gm/`.
- **Generated lists.** The homepage category grid (`<!--GM:CATEGORYGRID-->`) and each topic page's main (`<!--GM:TOPIC-->`) are built by `src/gm/catalog.ts` from `CALCULATORS`, in the package's markup, so every calculator is listed and counts are right. Labels, descriptions and icons come from `src/gm/categories.json`.
- **Rendering.** `src/gm/GmDocument.tsx` renders the stylesheets as `<link precedence="gm">` in their original order, then each body element with its original tag, attributes and markup.
- **Scripts.** The supplied scripts sit in `src/gm/scripts/*.js`, kept as delivered, wrapped in an exported `init…()` and excluded from ESLint. `src/gm/GmScripts.tsx` runs them once, in order.
- **Engines.** The salary script's `salaryResult()` and the mortgage script's `stampDuty()` come from `src/gm/engines.ts` (site engines; tested in `engines.test.ts`).
- **Catalogue.** `/gm/catalog.json` is built from `CALCULATORS` for the header code in `axis.js`.
- **Logo.** The supplied 1983 × 793 logo is served as sized copies (`public/gm/govmath-logo-210.png`, `-420`, `-630`) through `srcset` with `sizes="210px"` in every page's header and footer, so each screen loads the right one (13–61 KB instead of 379 KB). Its largest display size is 210 × 84. To change the logo, regenerate all three copies from the new master.

**Every other page** (102 calculators, about, contact, privacy, terms, disclaimer, blog, all calculators, 404) is React, wrapped in `src/gm/GmShell.tsx`:
- `GmShell` renders the package's header and footer (`src/gm/chrome.json`), runs `axis.js` and loads the package's stylesheets in the same order as its pages. `kind="calculator"` uses the mortgage/take-home page order; the default uses the base order. Both continue with the generated `govmath-neutral.css` and `govmath-claret.css`, then **`public/gm/govmath-site.css`**, then **`govmath-theme.css`** last. `GmShell` wraps the page in `.gm-claret` and gives `main` the class `gm-neutral`; `GmDocument` does the same for the 11 package pages and loads the generated files and the theme after the page's own stylesheets.
- **`govmath-site.css`** holds only what the package does not draw (switches, date and period inputs, compare rows, insight boxes, statements, the area chart, extra guide figures, content-page cards) and maps old variable names (`--navy`, `--blue`, `--g-c1`…) to the package palette. Add new component styles there.
- There is one root layout (`src/app/layout.tsx`) and no global site CSS.
- **Calculator markup** follows the package's mortgage page:
  - `FlagshipPage` renders `.crumb`, `.intro` (topic and eyebrow, h1, lead), `nav.sectionnav`, the studio, the guide, `section.fullfaq` (q-faq accordion and `.q-note`) and `.relatedgrid` of `q-relatedCard`s.
  - `Studio` renders `section.calculator#calculator` > `.calcgrid` with the form (`.formheading`, inputs, footnote, `.bank-calculate` button) and the `.result.ax-chartpanel` summary (`.ax-paymentstrip` from the `Answer`, the `.circle` ring from the first `SplitBar`, `.ax-chartlegend`, `.loan-summary`, `.badges`, share link). Below it, `section#results` ("Your results in detail") holds Facts (`.facts`), Assumptions (`details.ax-assumptions`) and cards; consecutive `ResultCard`s share a two-column `.resultgrid`, and cards with a table or chart span both columns.
  - Inputs (`inputs.tsx`) use `.field` > `.labelrow` > label + `.number` box, the package's range slider with `--fill` and `.endpoints`, `.chips`, `.ax-calctabs` for choices, the package's custom `.ax-select` dropdown and `details.moreoptions`. Choices with a few options (`Segmented`, `RadioGroup`) render as radio buttons; longer lists use the dropdown. Hints (`hint` or `info`) show behind an (i) `InfoTip`, not as text. The form has no visible title (the `title` is a screen-reader heading) and `FlagshipPage` shows no eyebrow lines.
  - Chart colours go through `soften()` in `results.tsx`, which maps the studios' colours to the chart palette, kept apart from the brand colour: keep/borrow → blue #2a78d6, tax/interest → orange #eb6834, then aqua #1baf7a, violet #4a3aa7, red #e34948, magenta #e87ba4, yellow #eda100 and greys #9aa1a9/#c3c8ce. Guide charts use the same colours (`--g-c1..5`), and `salary.js`/`mortgage.js` were edited to draw with them (the only change to the supplied scripts).
- **Guides** (`Guide.tsx`) use the package's guide markup: `section.guideintro`, `.guide-layout` with the sticky `aside.guide-nav` ("In this guide") and `article.g-article` of `section.g-section`s with numbered `.g-sectionHead`s.
- **Content pages** use `ContentPage.tsx` (`.crumb`, grey `.categoryhero`, `.gm-prose` column). The blog list uses `.gm-cards`; all calculators reuses the topic pages' `.categoryjump` and `.categorytool` cards.

**Site-wide look (October 2026, owner-approved after a trial on `/property/council-tax-bands`):** claret #8c1d40 replaces wine #510b38 (hover #6e1632, focus #b8325f, header included), pink tints become neutral greys (text #282828, body #6e6e6e, panels #f1f4f7, borders #dfe3e8, input borders #9aa1a9), with the Axis Bank type scale (Lato 500/600 self-hosted in `public/gm/fonts`, 40/44 titles, 18px labels, 16/24 body, claret table headers, numbered guide sections and numbered FAQ cards on a grey band). The colour swaps are generated by `scripts/build-neutral-css.py` into `public/gm/govmath-neutral.css` (scope `.gm-neutral`) and `govmath-claret.css` (scope `.gm-claret`): **re-run it after changing any stylesheet**. Hand-written theme rules (type scale, guide, FAQ, fonts, package chart legends) live in `public/gm/govmath-theme.css`, loaded last. Use only these colours and the chart palette; the 11 package pages are no longer pixel-identical to the supplied package, by design.

**Housekeeping (October 2026 clean-up):** keep the code free of dead files and exports. To check, install `knip` in a scratch folder and run it from the repo (`knip` and `knip --production`); only exported types, and building blocks used inside their own module and tested on their own, should remain. Crawl every sitemap page for internal links and check external links; many sites (MoneyHelper, TfL, IFS, Energy Saving Trust, SAA, Start Up Loans) block automated checkers with 403, so confirm those by search rather than replacing them.

**Checks:** to compare with the package, serve its `dist` folder (`python3 -m http.server <port> --directory dist`), take full-page screenshots of both at 1440, 768 and 375px and pixel-diff them. The 11 package pages should match it in layout; colours and type differ by design (site-wide look above). To change them, edit the JSON (or regenerate from a new package with the same converter).

## Ads (AdSense)

- Publisher ID **ca-pub-3942263076624028** is the default in `src/lib/ads.ts`; `NEXT_PUBLIC_ADSENSE_CLIENT` in Vercel overrides it, and `off` switches ads off. Every page gets the `google-adsense-account` meta tag and the AdSense script (in `src/app/layout.tsx`, which also runs Auto ads), and `/ads.txt` reads `google.com, pub-3942263076624028, DIRECT, f08c47fec0942fa0`. `AdSlot` shows in-page units only once `NEXT_PUBLIC_ADSENSE_SLOT` is set.
- The script was accidentally dropped in the October 2026 redesign and restored later; check it is still in the root layout after any layout change.
- **The owner must:** add `govmath.co.uk` in AdSense, verify and request review; turn on the Google-certified consent message for the UK, EEA and Switzerland under Privacy & messaging (the privacy policy already describes it); after approval, turn on Auto ads.
- The privacy policy (`src/app/privacy/page.tsx`) has the AdSense disclosures (Google cookies, Ads Settings, aboutads.info, youronlinechoices, partner-sites policy), the consent message and the ICO. Update its date when it changes.

## Status

| Phase | Category | Status | Calculators |
|---|---|---|---|
| 0 | Shared kit, guide template, 2026/27 rates | ✅ Live | — |
| 1 | Tax & Salary (16) | ✅ Live | All done |
| 2 | Mortgages & Property (15) | ✅ Live | All done |
| 3 | Business (14) | ✅ Live | All done. Engines: `src/lib/business/self-employed.ts` (sole trader, payments on account, CIS), `company.ts` (Corporation Tax, director salary/dividends, employer costs), `flat-rate-vat.ts`, `margins.ts` (pricing, break-even), `mileage.ts`, `allowable-expenses.ts`, `small-business-rates.ts` |
| 4 | Benefits (15) | ✅ Live | All done. Engines: `src/lib/benefits/family.ts` (Child Benefit, HICBC, funded hours, Tax-Free Childcare, maternity, paternity, shared parental), `uc-engine.ts` (Universal Credit 2026/27 incl. benefit cap), `uc-work.ts` (gross pay to UC, taper), `lha-engine.ts` + `lha-england.ts` + `lha-scotland-wales.ts` + `lha-uc-monthly.ts` + `lha-northern-ireland.ts` (bedroom rules; 200 BRMAs: 152 English, 18 Scottish, 22 Welsh, 8 Northern Irish; weekly Housing Benefit rates and Universal Credit's own published monthly rates, which are not weekly × 52 ÷ 12; April 2024 rates frozen), `benefit-cap.ts` (Housing Benefit route), `later-life.ts` (Pension Credit, Attendance Allowance), `carers.ts` (Carer's Allowance earnings), `pip-assessment.ts` (all 12 PIP activities) |
| 5 | Everyday Life (13) | ✅ Live | All done. Engines: `src/lib/life/estate.ts` (inheritance tax with taper, gift taper relief, BPR/APR £2.5m cap, probate fees, LPA fees, deputyship), `care.ts` (care home means test for all four nations, tariff income, spend-down), `health.ts` (BMI, waist-to-height, Healthy Start, prescription prepayment), `right-to-rent.ts`, `calendar.ts` (rule-based bank holidays for each nation, working days, date differences, `formatDate` without Intl), `everyday.ts` (percentages, pro-rata rent, timesheets) |
| 6 | Investing & Pensions (10) | ✅ Live | All done. Engines: `src/lib/investing/tax.ts` (income tax by source incl. savings and dividends, Scotland, 2027 savings rates; CGT with losses and BADR), `wrappers.ts` (pension tax relief by method, annual allowance taper, ISA vs GIA), `growth.ts` (compound growth, AER, inflation, FIRE with State Pension bridge, Premium Bonds seeded simulation), `retirement.ts` (State Pension age with 6th-to-5th periods and 2044–46 fixed dates, new State Pension, deferral, auto-enrolment projection) |
| 7 | Vehicles (10) | ✅ Live | All done. Engines: `src/lib/vehicles/tax-2026.ts` (VED first-year rates, bands A to M, £440 supplement with the £50,000 line for new electric cars, eVED; HMRC appropriate percentages 2026/27, fuel benefit, EV salary sacrifice from real tax and NI; 2026 clean air zone charges, London congestion charge, Scottish LEZ penalties; SORN refunds), `running.ts` (journey cost, AMAP and advisory fuel rates, petrol vs EV over years, commuting by car/train/bus/bike, Cycle to Work), `rules.ts` (licence renewal at 70, MOT dates, plate check) |
| 8 | Students (7) | ✅ Live | All done. Engine: `src/lib/students/loans.ts` (Plans 1, 2, 4, 5 and Postgraduate 2026/27 thresholds, interest from September 2026 with the 6% cap and Plan 2 sliding scale, lifetime projection with write-off and threshold freeze to 2030; SFE maintenance loan 2026/27 matching the official table; student council tax). Loan pages share `src/components/students/LoanStudio.tsx` |
| 9 | Topic clusters (19 planned) | 🚧 In progress | Batch A (housing): Housing Benefit, Council Tax Reduction (`src/lib/benefits/housing-support.ts`: the shared legacy means test with 2026/27 HB allowances, premiums, disregards, tariff income, HB and CTR non-dependant deductions; form fields shared in `src/components/benefits/MeansFields.tsx`), rent increase checker and deposit return (`src/lib/property/renting.ts`: notice and once-a-year rules for all four nations, deposit caps, wear-and-tear apportionment). Next: Universal Credit and work, families and childcare, students, savings |

The order of phases 4 to 8 is flexible; ask the owner.

**Known loose ends**

- Phase 7 figures to recheck: fuel prices (`PRICES_2026` in `running.ts`: petrol 173.8p, diesel 198.9p for late September 2026; price cap 26.32p for October to December 2026), advisory fuel rates (quarterly), clean air zone charges and the London congestion charge (`ZONES_2026`, `LONDON_CC`), the bus fare cap (£3 to December 2026, then £2), the rail fare freeze (to March 2027), and VED/BIK rates each April. The proposed compulsory eye tests for over-70s (January 2026 road safety strategy) are not yet law; update the licence page if they come in.
- Phase 8 figures to recheck each year: loan thresholds (April) and interest (September; the 6% cap is for 2026/27 only), maintenance loan amounts (August). The maintenance loan minimums for living at home and in London come from published 2026/27 guides; the studying-abroad minimum and its income point are estimates.
- Phase 5 and 6 figures to recheck: probate fee £526 (from 13 July 2026), Healthy Start £4.65/£9.30, prescription charge £9.90 and PPC prices, Premium Bonds prize rate 4.35% and the prize table (`PREMIUM_BONDS` in `growth.ts`), CPI (`CPI_LATEST`, 3.1% for August 2026), Class 3 NI £18.40 a week, LEL £129 a week and small profits threshold £7,105 (quoted in the State Pension age guide).
- Due April 2027: savings tax rates rise to 22/42/47%, cash ISA limit of £12,000 for under-65s, and pensions enter the estate for inheritance tax. Update the investing and IHT guides when these take effect.
- The third State Pension age review is under way. Update `retirement.ts` and the guide if the timetable for 68 changes. The salary sacrifice NI cap (£2,000 from April 2029) is mentioned in the workplace pension guide.
- `src/lib/tax/cgt.ts` and `src/lib/tax/dividend.ts` are still used by other modules; the investing pages use `src/lib/investing/tax.ts`.
- IR35 (`src/lib/tax/ir35.ts`) now uses `corporationTaxFull` from `src/lib/business/company.ts`; the old `salary-dividend.ts` is gone.
- Business guides cite 2026 changes: Corporation Tax late filing penalties doubled (£200/£400), the VOA duty to notify is a pilot until April 2029, and Making Tax Digital penalties use points. Recheck these in April 2027.

- Guides articles (`src/lib/blog.tsx`): the £100,000 tax trap, Plan 2 vs Plan 5 student loans and first-time buyer costs quote 2026/27 figures computed from the engines (take-home, pension relief, loan projections, Stamp Duty, LBTT, LTT, moving budget, mortgage payments). Recompute them each April, and the student loan interest figures each September.

- Phase 9 housing figures to recheck: HB rates and non-dependant deductions each April (DWP rates PDF); CTR pensioner non-dependant deductions (England's prescribed-requirements amendment regulations each year); Scotland's rent control areas (none designated yet; rent officer referral period rises to 30 days from 1 April 2027); whether Welsh Ministers set a deposit cap; NI rent and deposit rules. The working-age CTR default (80% maximum, 20% taper) is an assumption the user can change.

- Benefits rates were checked against the DWP "Benefit and pension rates 2026 to 2027" PDF. Recheck everything in April 2027, including whether LHA rates stay frozen and the benefit cap is still £22,020/£14,753.
- Benefits guides state that the two-child limit ended in April 2026 and that the UC health element is £217.26 for new claims (£429.80 protected). PIP guide says the assessment is under review; update if the rules change.
- LHA covers all four nations. When the freeze ends, update all four weekly tables and the DWP monthly Universal Credit CSVs (England, Scotland, Wales) together; the engine test checks each monthly rate is within £10 of weekly × 52 ÷ 12. Northern Ireland's weekly rates come from the Housing Executive's "Current LHA rent levels" page (it blocks automated access, so ask the owner for a screenshot); its Universal Credit monthly rates are weekly × 365 ÷ 84, which matched the published Belfast monthly rates to the penny.

# GovMath project memory

Read this at the start of every session. It records how we work, how the code is built, and what is still to do.
Last updated: 5 October 2026 (Phases 0 to 8 live; approved design package integrated for home, topic pages, take-home and mortgage).

## Goal

govmath.co.uk is a UK calculator site. Every calculator page should be a **flagship calculator**:

- It covers all the advanced fields, which are **optional** and sit under "More options".
- It has a clear label hierarchy (label CSS).
- It has a guide of **at least 2,000 words** with visuals. Very simple tools get 1,000 to 1,500 words.
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
6. Write in plain UK English. Use 2026/27 tax-year figures (`src/lib/rates/tax-year.ts`).

## Stack and commands

- **Stack:** Next.js 16 App Router (`searchParams` is a Promise), React 19, CSS Modules plus Tailwind v4, Vitest, Playwright.
- **Build:** `NODE_EXTRA_CA_CERTS=/root/.ccr/ca-bundle.crt NODE_USE_ENV_PROXY=1 npx next build --webpack`
- **Serve:** `npx next start -p <new port>`. Use a fresh port each time.
- **Never run `pkill -f next`.** It kills the shell.
- **Checks:** `npx tsc --noEmit -p .`, `npx eslint .` (2 known old warnings) and `npx vitest run`.
- **Playwright Chromium:** `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. Run scripts from the repo directory and delete them afterwards (the stop hook flags untracked files).
- **Release checks:**
  - Count each guide's words by the `innerText` of `[class*='Guide_article']`. The target is 2,000 or more.
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

## Approved design pages (`(gm)` route group)

The owner supplied a finished static design: `GovMath-Complete-Website-Source.zip`, approved live reference https://govmath-mortgage-axis-design.rselladurai22.chatgpt.site/. It must be preserved exactly. These pages use it:

- `/` (home)
- the 8 topic pages: `/tax-and-salary`, `/property`, `/business`, `/investing`, `/benefits`, `/vehicles`, `/students`, `/life`
- `/tax-and-salary/salary-calculator`
- `/property/mortgage-repayment`

**How it is built:**
- **Two root layouts.**
  - `src/app/(gm)/layout.tsx` loads no site CSS.
  - `src/app/(site)/layout.tsx` is the old layout, used by every other page.
  - Moving between them is a full page load, so the two sets of CSS never mix.
  - `src/app/global-not-found.tsx` (with `experimental.globalNotFound`) serves unknown URLs.
- **Page data.** `src/gm/pages/*.json` holds each page's title, description, stylesheet order, script order and top-level body elements, converted from the supplied HTML.
  - Links are made site-relative with no trailing slash.
  - Images point to `/gm/`.
- **Rendering.** `src/gm/GmDocument.tsx` renders the stylesheets as `<link precedence="gm">` in their original order. It then renders each body element with its original tag, attributes and markup.
- **Assets.** The supplied stylesheets and images sit in `public/gm/`, unchanged. Only the files the pages link are copied: the nine CSS files plus `govmath-logo.png` and `hero.png`.
- **Scripts.** The supplied scripts sit in `src/gm/scripts/*.js`, kept as delivered. They are wrapped in an exported `init…()` function and excluded from ESLint. `src/gm/GmScripts.tsx` runs them once, in the original order.
- **Engines.** The salary script's `salaryResult()` and the mortgage script's `stampDuty()` come from `src/gm/engines.ts`, which uses the site engines (`computeTakeHome`, `stampDuty`). It is tested in `engines.test.ts`.
- **Catalogue.** `/gm/catalog.json` is built from `CALCULATORS` for the header search code in `axis.js`. The current header has no search box.

**Checks:**
- After any change, compare against the supplied package by serving its `dist` folder: `python3 -m http.server <port> --directory dist`.
- Take full-page screenshots of both versions at 1440, 768 and 375px and pixel-diff them.
- When this was integrated, every page matched pixel for pixel. The interactive checks (mega menu, mobile menu, Scottish salary, Stamp Duty) also matched.

**To change these pages,** edit the JSON (or regenerate it from a new design package with the same converter). Never restyle them with site CSS.

## Design system (October 2026 redesign)

The owner asked for the look and feel of the Axis Bank calculators site, in GovMath's own colours. We use deep plum, not Axis burgundy, and no Axis logo or wording, so the site never looks affiliated.

- **Tokens** (`src/app/globals.css`):
  - Text and lines: `--ax-text` #282828, `--ax-muted` #6e6e6e, `--ax-line` #e2e2e2
  - Panels: `--ax-soft` #f1f4f7, `--ax-paper` #f9f9f9
  - Plum: `--ax-plum` #5b1e6e, `--ax-plum-deep` #2e0a3a, `--ax-plum-ink`, `--ax-plum-tint`, `--ax-plum-soft`, `--ax-lilac`
  - `--ax-gradient`
- **Patterns:**
  - 1rem card radius and .5rem button radius
  - Badge tabs hang from the top edge of cards (radius `0 0 .5rem .5rem`)
  - Light (`--ax-soft`) and plum-gradient feature cards alternate
  - Uppercase pill tabs
  - Big light-weight headings (400 to 500)
  - Accordions for the FAQ and for the mobile footer columns
- **Header and footer:**
  - `SiteHeader` has a dark utility strip above a plum bar.
  - `SiteFooter` uses `<details>` columns that act as accordions on mobile.
  - Styles are in `SiteChrome.module.css`.
- **Homepage and topic pages:** now come from the approved design package (see above). The old `Home.tsx`, `CategoryLanding` and the old salary and mortgage studios were removed.
- **Every other page** (the `(site)` group) uses the plum design below.
  - The old blue palette (#4353ff, navy #0d1330, lavender tints) was mapped to plum and greys in every CSS and TSX file. The legacy tokens (`--blue`, `--navy`, `--ice-blue`, `--brand-gradient` and so on) now resolve to plum values, so old class names still work.
  - Every topic accent (`ACCENT` in `category-style.tsx`) is plum.
  - Negative letter-spacing and 800/900 weights were removed from CSS; h1 is weight 400.
  - Page heroes use a white-to-`--ax-soft` wash instead of the aurora.
  - The flagship answer card uses `--ax-gradient`.
  - Green stays only for money you keep; amber and red stay for charts and warnings.
- **Calculator page layout** (matches the reference bank calculator pages; exact values in the "v4" block at the end of `Flagship.module.css`):
  - The banner is centred (`FlagshipHero`) on a pastel lilac and pink wash. The title is 2.5rem "medium" (Lato 400 with a 0.4px text stroke, because Lato has no 500). The tick points are hidden.
  - `SectionTabs.tsx` is a sticky dark #282828 rounded bar with outlined pills: Calculator, Guide, FAQs, Other calculators. The pill for the section in view is filled plum. The anchors are `#calculator`, `#guide`, `#faqs` and `#related`.
  - `FlagshipPage` puts a row of tab pills at the top of the grey panel (`.calcTabs`): this calculator (plum) and the first two related calculators (white), as on the reference EMI page.
  - `Studio.tsx` works like the reference EMI calculators:
    - One soft-grey panel holds the inputs on the left and a white card on the right, sticky on desktop.
    - There is no panel title, no group headings (visually hidden) and no Reset link.
    - Labels are 1.25rem "medium", with a compact 44px white value box (1rem text, #e2e2e2 hairline) on the right for amounts and steppers. The −/+ stepper buttons are hidden.
    - The slider is a 4px #828282 track with a #404040 fill and a 16px white handle with a plum ring and dot. Min and max sit underneath at 1rem.
    - Calculator tabs, `Segmented` choices and quick-pick chips all use the same pills: 0.75rem uppercase, #f9f9f9 with an #e2e2e2 border, plum when selected.
    - Every field `hint` (and `Segmented` note, `Switch` hint) shows behind an "i" `InfoTip` on hover, focus or tap, never as text under the field.
    - The inputs end in a white `.totalBar`, "{dock.label} {dock.value}", with a "See full results" button (like "Your EMI … Apply Now"). The phone dock was removed.
    - The right card is a ring chart (max 16rem) built from the first `SplitBar` anywhere in the results, with "Total" in the middle (in pounds) and a legend underneath (1rem dots, 0.875rem labels, 1.125rem values). Without a `SplitBar`, it shows the `Answer` instead.
    - Chart colours are softened to the reference palette by `soften()` in `results.tsx`: plum → lilac, amber → teal, green → periwinkle, deep plum → soft amber, pink → soft pink. The ring chart, split bars and payslip swatches all use it, so a series keeps one colour.
    - Results always show and update live. The button sets `ready` (so the address stays shareable) and jumps to the detailed results. When the ring chart is shown, the `Answer` leads the detailed results as a light card.
    - Everything else (Facts, Assumptions, cards) sits below in `#results` ("Your results in detail"), a two-column grid. Cards holding a table or chart (`table`, `svg[preserveAspectRatio]`, `svg[role=img]`) span both columns.
  - An amount with a slider shows the label left, the value box right and the slider below (`.field:has(> .slider)`).
  - FAQs are a hairline accordion. Other calculators are white cards on `--ax-soft`.
  - These overrides sit at the end of `Flagship.module.css` and `Shell.module.css` under "Bank-calculator layout".
- **Guides** follow long-form bank blog pages (overrides at the end of `Guide.module.css`):
  - The guide opens with a category badge, a 2.5rem medium-weight title, and a light-plum strip of reading facts.
  - "Table of contents" sits in a sticky left rail with hairline rows. `TocSpy.tsx` marks the section being read with a plum left bar.
  - Section numbers and kickers are hidden. Headings are 1.5rem weight 500, body text is grey, and lists use plum dots.
  - Tables and figures are rounded white blocks with a soft shadow; callouts are grey with a plum left bar.
- **New colours:** use the `--ax-*` tokens, never new hex values.

## Ads (waiting on the owner)

- Ads only show when environment variables are set (`src/lib/ads.ts`). `AdSlot` renders nothing without them, and `/ads.txt` returns 404 until a publisher ID is set.
- **The owner must:**
  - set `NEXT_PUBLIC_ADSENSE_CLIENT` (and optionally `NEXT_PUBLIC_ADSENSE_SLOT`) in Vercel
  - set up the consent banner in AdSense under Privacy & messaging

## Status

| Phase | Category | Status | Calculators |
|---|---|---|---|
| 0 | Shared kit, guide template, 2026/27 rates | ✅ Live | — |
| 1 | Tax & Salary (16) | ✅ Live | All done |
| 2 | Mortgages & Property (15) | ✅ Live | All done |
| 3 | Business (14) | ✅ Live | All done. Engines: `src/lib/business/self-employed.ts` (sole trader, payments on account, CIS), `company.ts` (Corporation Tax, director salary/dividends, employer costs), `flat-rate-vat.ts`, `margins.ts` (pricing, break-even), `mileage.ts`, `allowable-expenses.ts`, `small-business-rates.ts` |
| 4 | Benefits (15) | ✅ Live | All done. Engines: `src/lib/benefits/family.ts` (Child Benefit, HICBC, funded hours, Tax-Free Childcare, maternity, paternity, shared parental), `uc-engine.ts` (Universal Credit 2026/27 incl. benefit cap), `uc-work.ts` (gross pay to UC, taper), `lha-engine.ts` + `lha-england.ts` (bedroom rules, 152 English BRMAs, April 2024 rates frozen), `benefit-cap.ts` (Housing Benefit route), `later-life.ts` (Pension Credit, Attendance Allowance), `carers.ts` (Carer's Allowance earnings), `pip-assessment.ts` (all 12 PIP activities) |
| 5 | Everyday Life (13) | ✅ Live | All done. Engines: `src/lib/life/estate.ts` (inheritance tax with taper, gift taper relief, BPR/APR £2.5m cap, probate fees, LPA fees, deputyship), `care.ts` (care home means test for all four nations, tariff income, spend-down), `health.ts` (BMI, waist-to-height, Healthy Start, prescription prepayment), `right-to-rent.ts`, `calendar.ts` (rule-based bank holidays for each nation, working days, date differences, `formatDate` without Intl), `everyday.ts` (percentages, pro-rata rent, timesheets) |
| 6 | Investing & Pensions (10) | ✅ Live | All done. Engines: `src/lib/investing/tax.ts` (income tax by source incl. savings and dividends, Scotland, 2027 savings rates; CGT with losses and BADR), `wrappers.ts` (pension tax relief by method, annual allowance taper, ISA vs GIA), `growth.ts` (compound growth, AER, inflation, FIRE with State Pension bridge, Premium Bonds seeded simulation), `retirement.ts` (State Pension age with 6th-to-5th periods and 2044–46 fixed dates, new State Pension, deferral, auto-enrolment projection) |
| 7 | Vehicles (10) | ✅ Live | All done. Engines: `src/lib/vehicles/tax-2026.ts` (VED first-year rates, bands A to M, £440 supplement with the £50,000 line for new electric cars, eVED; HMRC appropriate percentages 2026/27, fuel benefit, EV salary sacrifice from real tax and NI; 2026 clean air zone charges, London congestion charge, Scottish LEZ penalties; SORN refunds), `running.ts` (journey cost, AMAP and advisory fuel rates, petrol vs EV over years, commuting by car/train/bus/bike, Cycle to Work), `rules.ts` (licence renewal at 70, MOT dates, plate check) |
| 8 | Students (7) | ✅ Live | All done. Engine: `src/lib/students/loans.ts` (Plans 1, 2, 4, 5 and Postgraduate 2026/27 thresholds, interest from September 2026 with the 6% cap and Plan 2 sliding scale, lifetime projection with write-off and threshold freeze to 2030; SFE maintenance loan 2026/27 matching the official table; student council tax). Loan pages share `src/components/students/LoanStudio.tsx` |

The order of phases 4 to 8 is flexible; ask the owner.

**Known loose ends**

- Phase 7 figures to recheck: fuel prices (`PRICES_2026` in `running.ts`: petrol 173.8p, diesel 198.9p for late September 2026; price cap 26.32p for October to December 2026), advisory fuel rates (quarterly), clean air zone charges and the London congestion charge (`ZONES_2026`, `LONDON_CC`), the bus fare cap (£3 to December 2026, then £2), the rail fare freeze (to March 2027), and VED/BIK rates each April. The proposed compulsory eye tests for over-70s (January 2026 road safety strategy) are not yet law; update the licence page if they come in.
- Phase 8 figures to recheck each year: loan thresholds (April) and interest (September; the 6% cap is for 2026/27 only), maintenance loan amounts (August). The maintenance loan minimums for living at home and in London come from published 2026/27 guides; the studying-abroad minimum and its income point are estimates.
- Phase 5 and 6 figures to recheck: probate fee £526 (from 13 July 2026), Healthy Start £4.65/£9.30, prescription charge £9.90 and PPC prices, Premium Bonds prize rate 4.35% and the prize table (`PREMIUM_BONDS` in `growth.ts`), CPI (`CPI_LATEST`, 3.1% for August 2026), Class 3 NI £18.40 a week, LEL £129 a week and small profits threshold £7,105 (quoted in the State Pension age guide).
- Due April 2027: savings tax rates rise to 22/42/47%, cash ISA limit of £12,000 for under-65s, and pensions enter the estate for inheritance tax. Update the investing and IHT guides when these take effect.
- The third State Pension age review is under way. Update `retirement.ts` and the guide if the timetable for 68 changes. The salary sacrifice NI cap (£2,000 from April 2029) is mentioned in the workplace pension guide.
- `src/lib/tax/cgt.ts` and `src/lib/tax/dividend.ts` are still used by other modules; the investing pages use `src/lib/investing/tax.ts`.
- `src/lib/tax/salary-dividend.ts` is superseded by `src/lib/business/company.ts`, but `src/lib/tax/ir35.ts` still uses its simplified `corporationTax`. It gives the same answer for a single company with a 12-month period. Move IR35 over when it is next touched.
- Business guides cite 2026 changes: Corporation Tax late filing penalties doubled (£200/£400), the VOA duty to notify is a pilot until April 2029, and Making Tax Digital penalties use points. Recheck these in April 2027.

- Benefits rates were checked against the DWP "Benefit and pension rates 2026 to 2027" PDF. Recheck everything in April 2027, including whether LHA rates stay frozen and the benefit cap is still £22,020/£14,753.
- Benefits guides state that the two-child limit ended in April 2026 and that the UC health element is £217.26 for new claims (£429.80 protected). PIP guide says the assessment is under review; update if the rules change.
- LHA rates cover England only; Scotland and Wales users enter a weekly rate by hand. Adding their tables would be a nice extra.
- Two old lint warnings: `src/lib/benefits/free-childcare.ts` (`totalAnnualHours`) and `src/lib/calculators.ts` (`cs`).

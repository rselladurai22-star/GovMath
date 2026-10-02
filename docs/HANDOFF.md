# GovMath project memory

Read this at the start of every session. It records how we work, how the code is built, and what is still to do.
Last updated: 2 October 2026 (after Phase 2 went live).

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
4. **Don't change the font** (Plus Jakarta Sans).
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
- Adding sections to a guide: a helper that inserted sections before "questions" and renumbered the rest was used. It is easy to recreate.

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
| 3 | Business (14) | ⏳ Next | allowable-expenses, break-even, business-mileage, cis-deduction, corporation-tax, dividend-vs-salary, employer-ni-costs, flat-rate-vat, gross-profit-margin, payment-on-account, retail-markup, small-business-rates, sole-trader-tax, vat-calculator (VAT already uses the studio but needs a FlagshipPage and a 2,000-word guide) |
| 4 | Benefits (15) | Pending | attendance-allowance, benefit-cap, carers-earnings, child-benefit, free-childcare-hours, high-income-child-benefit, local-housing-allowance, maternity-pay, paternity-pay, pension-credit, pip-points, shared-parental-leave, tax-free-childcare, universal-credit, universal-credit-taper |
| 5 | Everyday Life (13) | Pending | bank-holidays, bmi-uk-nhs, care-home-means-test, days-between-dates, healthy-start, inheritance-tax, nhs-prescription-saver, percentage-calculator, power-of-attorney, pro-rata-rent, probate-fees, right-to-rent, timesheet-decimal |
| 6 | Investing & Pensions (10) | Pending | capital-gains-assets, compound-interest, dividend-tax, fire-calculator, inflation-impact, isa-vs-gia, pension-tax-relief, premium-bonds, state-pension-age, workplace-pension |
| 7 | Vehicles (10) | Pending | benefit-in-kind, car-tax-ved, clean-air-zones, commuter-comparison, ev-salary-sacrifice, fuel-cost-journey, licence-at-70, mot-history-checker, petrol-vs-ev-cost, sorn-declaration |
| 8 | Students (7) | Pending | maintenance-loan, plan-1/2/4/5-student-loan, postgrad-loan, student-council-tax |

The order of phases 4 to 8 is flexible; ask the owner.

**Known loose ends**

- Clean air zone charges are still labelled "2025 charges" (`src/app/vehicles/clean-air-zones/page.tsx`). Verify the 2026 figures in Phase 7.
- Some student maintenance loan minimums are unverified. Check them in Phase 8.
- Two old lint warnings: `src/lib/benefits/free-childcare.ts` (`totalAnnualHours`) and `src/lib/calculators.ts` (`cs`).

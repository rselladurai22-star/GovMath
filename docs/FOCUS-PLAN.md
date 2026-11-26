# Focus plan: 30 calculators (November 2026)

The owner's decision (26 November 2026): stop adding tools and cut the site to
about 30 calculators in one sector, remove the US section and unwanted
Guides articles, and aim for AdSense approval and steady traffic. This file
records the evidence and the proposed list. **Nothing has been removed yet:
the list waits for the owner's sign-off.**

## Evidence (Search Console API, pulled 26 November 2026)

- **Period:** 26 August to 26 November 2026. Both properties were combined,
  with govmath.co.uk paths mapped to their `/uk/…` equivalents.
- **Clicks rose, then fell:**
  - sumatlas.com clicks peaked in the week of 26 October: 94 clicks, average
    position 31.
  - From the week of 9 November they fell to about 17 to 19 a week, and the
    average position dropped to 57 to 63.
  - Every page fell at the same time. For example, Universal Credit went from
    position 9.7 to 39.7, Premium Bonds from 11.5 to 35.5, and Council Tax
    Reduction from 8.3 to 39.6.
  - Nothing changed on the site in that window.
- **Cause:** the timing matches **Google's November 2026 core update** (10 to
  24 November; impact felt from about 13 November). A core update reassesses
  the whole site.
- **Indexing is not the problem.** URL Inspection of all 253 sitemap pages
  found:
  - 209 "Submitted and indexed";
  - 31 "Crawled – currently not indexed";
  - 9 "Discovered";
  - 4 unknown.
- **Clicks by section, three months, both domains:**

  | Section | Clicks |
  |---|---|
  | UK benefits | 222 |
  | UK life (almost all pro-rata rent) | 86 |
  | UK tax and salary | 71 |
  | UK students | 54 |
  | UK investing | 48 |
  | UK property | 42 |
  | UK business | 32 |
  | US (all four sections) | 41 |
  | UK vehicles | 10 |
  | Everyday | 1 |
  | Blog | 0 |

  - UK property had 54,000 impressions on sumatlas.com, but Mortgage
    repayment, Mortgage affordability and Stamp Duty sat at positions 72 to
    84 with 0 clicks.
  - The US section had about 84,000 impressions for its 41 clicks.
- **Who owns the broad benefits checker:** Turn2us, entitledto and Policy in
  Practice, which councils recommend. SumAtlas wins on single-question tools
  (the taper, LHA, New Style ESA and JSA, the UC advance, and pro-rata rent).

## Proposed 30: UK benefits, family, renting and student money

| Group | Calculators (clicks over 3 months, average position) |
|---|---|
| Universal Credit and work (9) | UC taper (69, 7.6) · local housing allowance (53, 10.1) · Universal Credit (11, 12.0) · New Style ESA (15, 12.4) · New Style JSA (3, 8.8) · UC advance (4, 9.4) · benefit cap (3, 15.3) · benefits checker (4) · PIP points (9) |
| Families (6) | Child Benefit (17, 10.7) · free childcare hours (15, 15.4) · Tax-Free Childcare (11.5) · High Income Child Benefit (26.6) · maternity pay · Healthy Start (10.3) |
| Carers and later life (2) | Pension Credit (10.0) · Carer's Allowance earnings (18.6) |
| Renters and council tax (7) | pro-rata rent (73, 8.2) · single person discount (21, 10.2) · Council Tax Reduction (15, 14.7) · council tax bands (7, 9.0) · rent increase (3) · deposit return (2) · Housing Benefit |
| Students (5) | maintenance loan (21) · SAAS funding (17, 11.9) · student council tax (5) · Welsh student finance (5) · Plan 2 student loan (2) |
| Part-time pay (1) | pro-rata salary (27): part-time hours sit next to the UC taper |

**Off-sector pages that do earn clicks (owner's call).** Together they make
up about 13% of three months' clicks, under 1 a day:
- Premium Bonds (33)
- bonus tax (15)
- sole trader tax (9)
- small business rates (9)
- tax bracket checker (8)
- emergency tax (7)

The recommendation is to drop them for a clean focus.

**Guides:**
- Keep "Plan 2 vs Plan 5".
- Rewrite "The £100,000 tax trap" around childcare.
- Publish the held "Working more on Universal Credit" article (commit
  2be80f0).
- Remove the other six.

## How to remove (when signed off)

- **Redirect** a page (one 301 hop) only where a kept page answers the same
  question. For example, the old `/uk/students/student-loan-repayment` goes to
  the Plan 2 page.
- **Everything else returns 410 Gone**, including the US section. Never
  redirect to the home page or an unrelated page.
- **Remove every trace from:**
  - the sitemap and the catalogue (`CALCULATORS`);
  - the mega menus, the all-calculators page and the topic hubs;
  - related sidebars, in-guide links and `RELATED_POSTS`;
  - the embeds and `/widgets`, the share images and hreflang pairs.
- Finally, crawl to check that no internal link points to a removed page.
- **Home, About and titles** describe the site as UK benefits and family
  money calculators. The country switch goes.
- **AdSense:** deploy, wait 3 to 4 weeks for the recrawl, then request
  review.

## Page data (3 months, both domains; pages with a click or 1,500+ impressions)

| Page | Clicks | Impressions | Avg position | Index status (26 Nov) |
|---|---|---|---|---|
| `/uk/life/pro-rata-rent` | 73 | 12836 | 8.2 | Submitted and indexed |
| `/uk/benefits/universal-credit-taper` | 69 | 10876 | 7.6 | Submitted and indexed |
| `/uk/benefits/local-housing-allowance` | 53 | 14043 | 10.1 | Submitted and indexed |
| `/uk/investing/premium-bonds` | 33 | 12653 | 15.6 | Submitted and indexed |
| `/uk/tax-and-salary/pro-rata` | 27 | 7836 | 33.6 | Submitted and indexed |
| `/uk/students/maintenance-loan` | 21 | 4957 | 19.4 | Submitted and indexed |
| `/uk/property/single-person-discount` | 21 | 3894 | 10.2 | Submitted and indexed |
| `/uk/benefits/child-benefit` | 17 | 11787 | 10.7 | Submitted and indexed |
| `/uk/students/saas-funding` | 17 | 1876 | 11.9 | Submitted and indexed |
| `/uk/tax-and-salary/bonus-tax` | 15 | 5479 | 23.6 | Submitted and indexed |
| `/uk/benefits/free-childcare-hours` | 15 | 3688 | 15.4 | Submitted and indexed |
| `/uk/benefits/new-style-esa` | 15 | 3372 | 12.4 | Submitted and indexed |
| `/uk/benefits/council-tax-reduction` | 15 | 917 | 14.7 | Submitted and indexed |
| `/uk/benefits/universal-credit` | 11 | 9396 | 12.0 | Submitted and indexed |
| `/uk/business/sole-trader-tax` | 9 | 3165 | 27.2 | Submitted and indexed |
| `/uk/business/small-business-rates` | 9 | 2693 | 24.8 | Submitted and indexed |
| `/uk/benefits/pip-points` | 9 | 1943 | 27.0 | Submitted and indexed |
| `/uk/tax-and-salary/tax-bracket-checker` | 8 | 6216 | 35.3 | Submitted and indexed |
| `/uk/tax-and-salary/emergency-tax` | 7 | 3108 | 28.7 | Submitted and indexed |
| `/uk/property/council-tax-bands` | 7 | 2535 | 9.0 | Crawled - currently not indexed |
| `/uk/business/allowable-expenses` | 7 | 2063 | 20.1 | Submitted and indexed |
| `/uk` | 6 | 1517 | 66.8 | Submitted and indexed |
| `/` | 6 | 494 | 42.3 | Submitted and indexed |
| `/us/taxes/paycheck-calculator` | 5 | 4586 | 41.6 | Submitted and indexed |
| `/us/taxes/earned-income-credit-calculator` | 5 | 1041 | 16.0 | Submitted and indexed |
| `/uk/students/student-council-tax` | 5 | 691 | 19.9 | Submitted and indexed |
| `/uk/students/welsh-student-finance` | 5 | 502 | 19.9 | Submitted and indexed |
| `/uk/investing/compound-interest` | 4 | 5457 | 34.7 | Submitted and indexed |
| `/uk/investing/savings-interest` | 4 | 4443 | 49.6 | Submitted and indexed |
| `/uk/benefits/benefits-checker` | 4 | 3075 | 34.8 | Submitted and indexed |
| `/uk/life/probate-fees` | 4 | 2834 | 66.3 | Submitted and indexed |
| `/uk/life/nhs-prescription-saver` | 4 | 1743 | 35.3 | Submitted and indexed |
| `/uk/vehicles/fuel-cost-journey` | 4 | 1473 | 36.7 | Submitted and indexed |
| `/uk/benefits/uc-advance` | 4 | 753 | 9.4 | Submitted and indexed |
| `/us/taxes/state-income-tax-calculator` | 4 | 286 | 49.3 | Submitted and indexed |
| `/us/taxes/tax-bracket-calculator` | 3 | 3186 | 49.0 | Submitted and indexed |
| `/uk/property/shared-ownership` | 3 | 3155 | 50.1 | Submitted and indexed |
| `/uk/benefits/new-style-jsa` | 3 | 1887 | 8.8 | Submitted and indexed |
| `/uk/tax-and-salary/minimum-wage` | 3 | 1407 | 27.2 | Submitted and indexed |
| `/us/savings/inflation-calculator` | 3 | 1316 | 21.4 | Submitted and indexed |
| `/uk/property/rent-increase` | 3 | 1180 | 39.2 | Submitted and indexed |
| `/uk/benefits/benefit-cap` | 3 | 1038 | 15.3 | Submitted and indexed |
| `/us/savings/retirement-withdrawal-calculator` | 3 | 776 | 30.3 | Submitted and indexed |
| `/uk/tax-and-salary/notice-period-final-pay` | 3 | 385 | 17.7 | Submitted and indexed |
| `/uk/business/payment-on-account` | 3 | 246 | 10.6 | Submitted and indexed |
| `/us/loans/credit-card-interest-calculator` | 2 | 6699 | 34.4 | Submitted and indexed |
| `/uk/tax-and-salary/tax-code-decoder` | 2 | 5337 | 30.1 | Submitted and indexed |
| `/uk/investing/annuity` | 2 | 4092 | 63.4 | Submitted and indexed |
| `/uk/students/plan-2-student-loan` | 2 | 2325 | 23.0 | Submitted and indexed |
| `/us/housing/rental-property-calculator` | 2 | 1993 | 42.1 | Submitted and indexed |
| `/uk/investing/isa-vs-gia` | 2 | 1275 | 34.2 | Submitted and indexed |
| `/us/taxes/overtime-calculator` | 2 | 1031 | 46.4 | Submitted and indexed |
| `/uk/business/vat-calculator` | 2 | 819 | 61.2 | Submitted and indexed |
| `/uk/tax-and-salary/scottish-tax` | 2 | 574 | 33.3 | Submitted and indexed |
| `/uk/property/rent-vs-buy` | 2 | 446 | 35.1 | Submitted and indexed |
| `/uk/vehicles/sorn-declaration` | 2 | 353 | 16.2 | Submitted and indexed |
| `/uk/property/rent-a-room` | 2 | 298 | 18.0 | Submitted and indexed |
| `/uk/property/deposit-return` | 2 | 284 | 25.8 | Submitted and indexed |
| `/uk/vehicles/commuter-comparison` | 2 | 86 | 7.0 | Crawled - currently not indexed |
| `/uk/life/power-of-attorney` | 1 | 5333 | 60.8 | Submitted and indexed |
| `/us/loans/personal-loan-calculator` | 1 | 4087 | 48.0 | Submitted and indexed |
| `/uk/tax-and-salary/hourly-to-salary` | 1 | 3408 | 52.0 | Submitted and indexed |
| `/uk/tax-and-salary/salary-calculator` | 1 | 2750 | 53.3 | Submitted and indexed |
| `/us/housing/mortgage-payoff-calculator` | 1 | 1939 | 70.8 | Submitted and indexed |
| `/us/loans/auto-loan-calculator` | 1 | 1720 | 21.9 | Submitted and indexed |
| `/uk/students/student-loan-repayment` | 1 | 1624 | 68.7 | Submitted and indexed |
| `/us/taxes/raise-calculator` | 1 | 1573 | 15.4 | Submitted and indexed |
| `/us/loans/debt-consolidation-calculator` | 1 | 1441 | 62.9 | Submitted and indexed |
| `/us/savings/compound-interest-calculator` | 1 | 1373 | 15.2 | Submitted and indexed |
| `/us/savings/roth-ira-calculator` | 1 | 1265 | 34.9 | Submitted and indexed |
| `/uk/investing/state-pension-age` | 1 | 1164 | 41.9 | Submitted and indexed |
| `/us/taxes/self-employment-tax` | 1 | 1067 | 40.0 | Submitted and indexed |
| `/uk/life/care-home-means-test` | 1 | 1056 | 62.9 | Submitted and indexed |
| `/us/loans/car-affordability-calculator` | 1 | 1036 | 45.7 | Submitted and indexed |
| `/us/taxes/federal-income-tax` | 1 | 974 | 43.0 | Submitted and indexed |
| `/us/taxes/tax-refund-calculator` | 1 | 927 | 58.3 | Submitted and indexed |
| `/uk/investing/pension-drawdown` | 1 | 863 | 71.3 | Submitted and indexed |
| `/us/savings/401k-calculator` | 1 | 690 | 42.8 | Submitted and indexed |
| `/uk/investing/capital-gains-assets` | 1 | 682 | 62.8 | Submitted and indexed |
| `/uk/students` | 1 | 622 | 52.8 | Submitted and indexed |
| `/uk/benefits/adoption-pay` | 1 | 601 | 21.0 | Submitted and indexed |
| `/uk/business/business-mileage` | 1 | 563 | 11.2 | Crawled - currently not indexed |
| `/uk/life/healthy-start` | 1 | 485 | 10.3 | Submitted and indexed |
| `/everyday/gpa-calculator` | 1 | 481 | 23.0 |  |
| `/uk/vehicles/petrol-vs-ev-cost` | 1 | 457 | 58.5 | Submitted and indexed |
| `/uk/benefits/carers-earnings` | 1 | 321 | 18.6 | Submitted and indexed |
| `/uk/business/break-even` | 1 | 315 | 24.2 | Submitted and indexed |
| `/uk/property/moving-house-budget` | 1 | 287 | 45.0 | Submitted and indexed |
| `/uk/benefits/paternity-pay` | 1 | 270 | 35.0 | Submitted and indexed |
| `/uk/students/postgrad-loan` | 1 | 190 | 8.9 |  |
| `/uk/tax-and-salary/budget-tax-changes` | 1 | 182 | 9.0 | Submitted and indexed |
| `/uk/life/bmi-uk-nhs` | 1 | 162 | 11.9 |  |
| `/uk/benefits/shared-parental-leave` | 1 | 157 | 27.7 | Submitted and indexed |
| `/uk/vehicles/mot-history-checker` | 1 | 143 | 14.7 | Submitted and indexed |
| `/uk/life` | 1 | 58 | 38.0 | Submitted and indexed |
| `/uk/students/degree-cost` | 1 | 37 | 9.8 | Submitted and indexed |
| `/about` | 1 | 36 | 4.5 | Submitted and indexed |
| `/uk/property/solar-panel-calculator` | 1 | 26 | 8.5 | Submitted and indexed |
| `/uk/tax-and-salary/p45-p60-explainer` | 1 | 1 | 11.0 | Crawled - currently not indexed |
| `/uk/property/mortgage-repayment` | 0 | 22440 | 72.7 | Submitted and indexed |
| `/uk/property/mortgage-affordability` | 0 | 22386 | 72.2 | Submitted and indexed |
| `/uk/vehicles/car-finance` | 0 | 15143 | 70.5 | Submitted and indexed |
| `/uk/property/stamp-duty-england` | 0 | 12270 | 83.5 | Submitted and indexed |
| `/everyday/date-calculator` | 0 | 9209 | 15.0 | Submitted and indexed |
| `/us/housing/home-equity-loan-calculator` | 0 | 8726 | 75.6 | Submitted and indexed |
| `/us/housing/mortgage-affordability` | 0 | 5448 | 72.8 | Submitted and indexed |
| `/uk/property/mortgage-overpayment` | 0 | 4438 | 76.7 | Submitted and indexed |
| `/us/taxes/salary-to-hourly` | 0 | 3587 | 54.0 | Submitted and indexed |
| `/us/taxes/sales-tax-calculator` | 0 | 3476 | 34.1 | Submitted and indexed |
| `/uk/tax-and-salary/national-insurance` | 0 | 2923 | 48.1 | Submitted and indexed |
| `/uk/benefits/maternity-pay` | 0 | 2410 | 54.9 | Submitted and indexed |
| `/uk/students/plan-5-student-loan` | 0 | 2032 | 29.8 | Submitted and indexed |
| `/us/housing/rent-affordability` | 0 | 1953 | 31.8 | Submitted and indexed |
| `/us/savings/savings-goal-calculator` | 0 | 1942 | 19.4 | Submitted and indexed |
| `/calculators` | 0 | 1921 | 56.3 | Submitted and indexed |
| `/uk/life/bank-holidays` | 0 | 1858 | 54.6 | Submitted and indexed |
| `/uk/investing/dividend-tax` | 0 | 1833 | 60.9 | Crawled - currently not indexed |
| `/uk/vehicles/car-tax-ved` | 0 | 1652 | 54.8 | Submitted and indexed |
| `/uk/investing/workplace-pension` | 0 | 1616 | 57.7 | Submitted and indexed |
| `/us/housing/closing-cost-calculator` | 0 | 1580 | 79.4 | Submitted and indexed |
| `/uk/benefits/attendance-allowance` | 0 | 1545 | 52.8 | Submitted and indexed |
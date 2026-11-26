# Calculator plans (December 2026 redesign)

The owner asked for every calculator page to be researched, written and
designed on its own terms: no shared page template, no padding, the answer
first. This file is the brief for each of the 31 pages. Build with
`components/calc/CalcPage.tsx` (the open frame) and `components/calc/kit.tsx`
(parts with no page structure); see "Rules for every page" at the end.

Each plan gives: **who** uses it and **the question** they arrive with; the
**answer** (the one figure the page leads with); the **layout** and the one
**visual** that earns its place; what the written content must cover and
what to **cut**; **edge cases** to test; and the **sources** to verify
against. The old 2,000-word target is dropped: write what the reader needs
and stop.

## Universal Credit and work

### 1. UC taper (`/uk/benefits/universal-credit-taper`)
- **Who / question:** someone on UC offered more hours or a pay rise: "if I
  earn more, how much do I actually keep?"
- **Answer:** "You keep £X of each extra £1" and "£Y a month better off".
- **Layout:** the hours slider is the page. Top: current hours and pay in
  one compact row. Centre: a wide line chart of total monthly income
  (take-home pay + UC) against hours worked, 0 to 48, with the work
  allowance point and the point UC ends marked, and a draggable marker for
  "now" and "new". Right or below: where each extra pound goes (kept, UC
  lost, tax and NI, pension) as one split strip.
- **Content:** the taper in two sentences; who gets a work allowance and
  how much; why the effective rate jumps when tax and NI start; what the
  page leaves out (Council Tax Reduction, free school meals, childcare).
- **Cut:** history of the taper, generic UC explainers, 13 FAQs to about 4.
- **Edge cases:** no work allowance; earnings below the allowance; UC
  reaching zero mid-range; benefit cap grace; April 2027 rates.
- **Sources:** GOV.UK UC "how your wages affect your payments"; DWP rates
  2026/27 and proposed 2027/28.

### 2. Universal Credit estimate (`/uk/benefits/universal-credit`)
- **Who / question:** thinking of claiming, or checking an award: "how much
  UC would we get a month?"
- **Answer:** monthly award, with the build-up visible.
- **Layout:** a statement, not a dashboard. Left: short question groups
  (you, home, children, work, savings) that each collapse to a one-line
  summary once answered. Right, sticky: the award built like a payslip:
  elements added, then deductions (earnings taper, savings, cap), then the
  total. Each line appears only when it applies.
- **Visual:** none beyond the statement; a waterfall would repeat it.
- **Content:** what counts as savings; the housing element in one
  paragraph with a link to the LHA page; the five-week wait; when the
  estimate will be off (non-dependants, managed migration protection).
- **Edge cases:** savings £6,000 to £16,000 and over; under 25; couple with
  one over pension age; cap applies; no housing costs.
- **Sources:** DWP rates; UC Regulations 2013 via GOV.UK guidance.

### 3. Local Housing Allowance (`/uk/benefits/local-housing-allowance`)
- **Who / question:** private renters and people about to move: "how much
  of my rent will UC or Housing Benefit cover here?"
- **Answer:** the LHA rate for their area and bedroom entitlement, and the
  shortfall against their rent.
- **Layout:** two steps side by side. Step 1 "Who lives with you" gives the
  bedroom entitlement, shown as a row of bedroom tiles with who is in each.
  Step 2 area and rent gives a horizontal bar: rent, with the part LHA
  covers filled and the shortfall marked in red.
- **Content:** the bedroom rules as a short list (who shares, the under-35
  shared rate and its exemptions); LHA frozen at April 2024 rates; what to
  do about a shortfall (Discretionary Housing Payment).
- **Edge cases:** under 35 single; overnight carer room; children of
  different sexes over 10; 5+ bedrooms capped at 4; Northern Ireland.
- **Sources:** VOA LHA tables; DWP UC monthly LHA rates; Rent Service
  Scotland; Welsh Government; NI Housing Executive.

### 4. New Style ESA (`/uk/benefits/new-style-esa`)
- **Who / question:** too ill to work, with recent employment: "do I
  qualify, and how much is it a week?"
- **Answer:** eligible or not (with the reason), then the weekly amount.
- **Layout:** an eligibility check first: two tax-year cards (the two years
  that count for a claim made today, named) asking for earnings in each,
  each showing pass or fail against its test. Then the amount as a simple
  timeline: assessment phase (13 weeks) then main phase with the group.
- **Content:** which tax years count and why; pension over £85 a week
  halves the excess; it is not means-tested on savings or a partner's pay;
  claiming alongside UC.
- **Edge cases:** claim date either side of the January benefit-year
  change; credits only; occupational pension; 365-day limit in the
  work-related activity group.
- **Sources:** GOV.UK New Style ESA; DWP rates.

### 5. New Style JSA (`/uk/benefits/new-style-jsa`)
- **Who / question:** just lost a job: "can I get JSA on my NI record, and
  how much?"
- **Answer:** eligible or not, weekly amount, and the total over 26 weeks.
- **Layout:** shares the tax-year check idea with ESA but ends differently:
  a 26-week bar showing weeks paid, with part-time earnings and pension
  deductions reducing the weekly figure in a short statement.
- **Content:** the two contribution conditions in plain words; what
  reduces it; what happens after 182 days; savings and partner's income do
  not count.
- **Edge cases:** under 25 rate; part-time work over the £5 disregard;
  pension over £50; leaving a job voluntarily (sanction risk, stated not
  calculated).
- **Sources:** GOV.UK New Style JSA; DWP rates.

### 6. UC advance (`/uk/benefits/uc-advance`)
- **Who / question:** waiting five weeks for a first payment: "how much
  can I borrow and what will it take off my UC?"
- **Answer:** the monthly repayment and what is left of each payment.
- **Layout:** a slider for the advance amount (up to the first payment)
  and one for months (up to 24). The visual is a repayment calendar: 24
  small month cells filling as the period lengthens, with "your UC during
  repayment" and "after" as two figures. Total deductions cap (15%) shown
  as a guard line.
- **Content:** it is a loan with no interest; the 15% cap; budgeting
  advances are different (short table of limits); asking for a deferral.
- **Edge cases:** repayment above the 15% cap; existing deductions;
  budgeting advance with earnings over £2,600.
- **Sources:** GOV.UK UC advances; DWP deductions policy.

### 7. Benefit cap (`/uk/benefits/benefit-cap`)
- **Who / question:** larger families and high-rent households: "will we
  be capped, and by how much?"
- **Answer:** capped or not; the monthly amount lost.
- **Layout:** exemption check first as three yes/no questions (earning
  £881+ a month, a disability or carer benefit, the nine-month grace
  period): any yes ends the page with "the cap does not apply". Otherwise
  a single bar: benefits counted against the cap line, the excess in red.
- **Content:** the four cap levels in one small table; which benefits
  count; the earnings route out with the exact hours at minimum wage.
- **Edge cases:** London vs outside; single without children; just under
  and over the earnings exemption; Housing Benefit route.
- **Sources:** GOV.UK benefit cap; DWP rates.

### 8. Benefits checker (`/uk/benefits/benefits-checker`)
- **Who / question:** "what could I be missing?" They are not ready for a
  20-minute form.
- **Answer:** a short list of benefits worth claiming, strongest first.
- **Layout:** a conversational, one-question-at-a-time flow (age, home,
  work, health, children, caring), about 8 taps, with a progress line. The
  result is a ranked list of cards, likely / worth checking, each with a
  rough amount where the engines can give one and a link to its
  calculator. No figures-heavy dashboard.
- **Content:** almost none: one paragraph on how the check works and that
  Turn2us or entitledto give a full assessment.
- **Edge cases:** pension age; mixed-age couple; no recourse to public
  funds (flag, do not assess).
- **Sources:** GOV.UK benefits pages for each benefit listed.

### 9. PIP points (`/uk/benefits/pip-points`)
- **Who / question:** filling in the PIP form or preparing for an
  assessment: "how many points would I score?"
- **Answer:** two scores (daily living, mobility) against the 8 and 12
  thresholds, and the weekly award.
- **Layout:** two score meters pinned at the top (sticky on phones) with
  the thresholds marked. Below, the 12 activities as an accordion, each
  with its descriptors as radio choices worded as on the form, points
  shown beside each. The meters move as you choose.
- **Content:** "reliably" (safely, repeatedly, in reasonable time) because
  it changes answers; what evidence helps; the review in progress, stated
  briefly.
- **Cut:** the generic "what is PIP" section.
- **Edge cases:** 7 and 8, 11 and 12 points; mobility only; the highest
  descriptor per activity counts once.
- **Sources:** PIP assessment guide part 2 (descriptors); DWP rates.

## Families

### 10. Child Benefit (`/uk/benefits/child-benefit`)
- **Who / question:** new parents and growing families: "how much is Child
  Benefit for N children?" Many type exactly that into Google.
- **Answer:** the weekly amount, with four-weekly and yearly beside it.
- **Layout:** the smallest page on the site. A big stepper for number of
  children; the answer in three sizes (week, four weeks, year); a
  per-child row list (eldest, then each other child). Below, one optional
  question, "Does anyone in the household earn over £60,000?", which opens
  an income slider and a bar showing how much is kept after the charge.
- **Content:** a rates table for 1 to 6 children (people search each row);
  when it stops (16, or 20 in approved education); claiming for NI credits
  even if you opt out of payment.
- **Edge cases:** 1 child; 8 children; income £60,000, £70,000, £80,000;
  April 2027 rates.
- **Sources:** GOV.UK Child Benefit rates; Budget 2026 Annex A.

### 11. High Income Child Benefit Charge (`/uk/benefits/high-income-child-benefit`)
- **Who / question:** someone at £60,000 to £80,000: "how much will I pay
  back, and can a pension contribution fix it?"
- **Answer:** the charge for the year and the percentage clawed back.
- **Layout:** an income line from £55,000 to £85,000 with the taper zone
  shaded, a marker for their adjusted net income and a second, draggable
  marker for "after pension contributions", showing the charge fall as it
  moves. Beside it: Child Benefit received, charge, kept.
- **Content:** adjusted net income defined in three bullets; pension and
  Gift Aid reduce it; paying through PAYE since 2025; opt out or keep
  claiming.
- **Edge cases:** exactly £60,000, £60,200, £80,000; partner earns more
  (higher earner pays); part-year.
- **Sources:** GOV.UK HICBC; HMRC adjusted net income.

### 12. Free childcare hours (`/uk/benefits/free-childcare-hours`)
- **Who / question:** working parents in England: "do we get 15 or 30
  hours, from when, and what will nursery still cost?"
- **Answer:** the hours they get and the term it starts.
- **Layout:** child's date of birth first, giving an age timeline with the
  three start dates (9 months, 2, 3 to 4) placed on it as terms. Then a
  short eligibility check for each parent (earnings floor and £100,000
  ceiling). Last, optional: nursery hours and rate giving what is still
  paid, since "free" hours cover 38 weeks.
- **Content:** term dates and the apply-by deadlines as a table; stretched
  hours; what nurseries may still charge for; reconfirming every 3 months.
- **Edge cases:** birthday just before or after a term cut-off; one parent
  not working; earnings exactly at the floor; over £100,000.
- **Sources:** GOV.UK free childcare if working; DfE entitlement guidance.

### 13. Tax-Free Childcare (`/uk/benefits/tax-free-childcare`)
- **Who / question:** paying a nursery or childminder: "how much top-up do
  we get, and is UC childcare better?"
- **Answer:** the government top-up a year.
- **Layout:** "you pay / government adds" as two stacked blocks that grow
  with the childcare cost slider, capped at £2,000 a child (£4,000 if
  disabled). Then a two-column verdict: Tax-Free Childcare vs UC's 85%,
  only when they say they could claim UC.
- **Content:** you cannot have both; quarterly cap of £500; who qualifies.
- **Edge cases:** cost above the cap; disabled child; two children; UC
  better.
- **Sources:** GOV.UK Tax-Free Childcare.

### 14. Maternity pay (`/uk/benefits/maternity-pay`)
- **Who / question:** pregnant employees: "how much will I be paid on
  leave, week by week, and when can it start?"
- **Answer:** total maternity pay, and the monthly drop.
- **Layout:** a 52-week leave ribbon: 6 weeks at 90%, 33 at the flat rate,
  13 unpaid, drawn to scale and coloured, with the amount in each block
  and their dates under it. Key dates as a short list beside it
  (qualifying week, earliest start, notice deadline).
- **Content:** who qualifies for SMP vs Maternity Allowance; employer
  enhanced pay is separate; KIT days.
- **Edge cases:** earnings below the threshold (Maternity Allowance);
  90% lower than the flat rate for all 39 weeks; leave across April.
- **Sources:** GOV.UK maternity pay and leave; DWP rates.

### 15. Healthy Start (`/uk/life/healthy-start`)
- **Who / question:** pregnant or with under-4s on a low income: "can we
  get the card, and how much goes on it?"
- **Answer:** eligible or not; the amount every four weeks.
- **Layout:** a three-question check (pregnant or child ages, benefit,
  income limit) leading to a prepaid-card style result showing the
  four-weekly amount per child. Scotland is routed to Best Start Foods.
- **Content:** what it can be spent on; how to apply; the UC income limit.
- **Edge cases:** child turning 1 or 4; under 18 and pregnant (no benefit
  needed); Scotland.
- **Sources:** NHS Healthy Start; NHSBSA.

## Carers and later life

### 16. Pension Credit (`/uk/benefits/pension-credit`)
- **Who / question:** pensioners and their adult children: "are we
  entitled, and what else does it unlock?"
- **Answer:** the weekly top-up; then the linked help, which is often
  worth more.
- **Layout:** income ladder: a vertical bar with their income, the
  guarantee level above it and the gap labelled as the top-up. Below, a
  checklist of what Pension Credit unlocks (free TV licence at 75, Council
  Tax Reduction, Winter Fuel Payment rules, dental), each ticked or not.
- **Content:** savings over £10,000 count as £1 a week per £500; mixed-age
  couples; backdating three months.
- **Edge cases:** income just above the guarantee with Savings Credit;
  severe disability addition; reached pension age after April 2016.
- **Sources:** GOV.UK Pension Credit; DWP rates.

### 17. Carer's Allowance earnings (`/uk/benefits/carers-earnings`)
- **Who / question:** working carers, worried by overpayment stories: "am
  I under the limit this week?"
- **Answer:** under or over, by how much.
- **Layout:** a limit gauge: a horizontal track with the weekly limit as a
  hard line, their net earnings after deductions as the fill, green below
  and red above. Inputs are the deductions people forget (tax, NI, half of
  pension contributions, care costs up to half of the remainder), each
  moving the fill as it is entered. A "hours I can work at my rate"
  figure.
- **Content:** it is a cliff edge, not a taper: £1 over loses all of it;
  averaging for irregular pay; report changes.
- **Edge cases:** exactly at the limit; annual bonus week; self-employed.
- **Sources:** GOV.UK Carer's Allowance; DWP earnings rules.

## Renters and council tax

### 18. Rent calculator (`/uk/life/pro-rata-rent`)
- **Who / question:** tenants and landlords at move-in or move-out: "what
  is the rent for these days?" and "what is my weekly rent monthly?"
- **Answer:** the rent for the part period, with the daily rate.
- **Layout:** date-led. Two date pickers and the rent; a month calendar
  with the charged days shaded makes the count checkable at a glance. Two
  results side by side: the calendar-month method and the annual (365)
  method, with which one a tenancy agreement normally means. A separate
  compact converter (weekly, four-weekly, monthly, yearly) sits below as
  its own small tool.
- **Content:** the two methods and when each applies; whether the end date
  is charged; five-week months and weekly rent.
- **Edge cases:** February; leap year; period across two months; same-day.
- **Sources:** Tenant Fees Act guidance; Shelter; GOV.UK how to rent.

### 19. Single person discount (`/uk/property/single-person-discount`)
- **Who / question:** living alone (or with people who do not count): "do
  I get 25% off and what is that in pounds?"
- **Answer:** the yearly saving and new monthly payment.
- **Layout:** before and after bills side by side, the saving between
  them. A "who lives with you?" checklist of people who are disregarded
  (students, under 18, carers, severe mental impairment) that turns the
  discount on. Part-year dates optional.
- **Content:** how to apply; tell the council when it stops; 50% when
  everyone is disregarded.
- **Edge cases:** all occupants disregarded; mid-year change; Scotland's
  water charges.
- **Sources:** GOV.UK council tax discounts.

### 20. Council Tax Reduction (`/uk/benefits/council-tax-reduction`)
- **Who / question:** low-income households: "how much could come off my
  council tax?" Schemes differ by council.
- **Answer:** an estimated weekly reduction, clearly labelled as depending
  on the council's scheme.
- **Layout:** pension age and working age are different products: a first
  choice splits the page. Pension age follows the national rules
  (statement). Working age shows a range: the bill with a band for "most
  generous" to "least generous" local schemes, and the two dials councils
  vary (maximum % and taper).
- **Content:** why it varies; how to find your council's scheme;
  second adult rebate.
- **Edge cases:** non-dependants; savings over £16,000; on Guarantee
  Credit (full reduction).
- **Sources:** GOV.UK; prescribed requirements regulations.

### 21. Council tax bands (`/uk/property/council-tax-bands`)
- **Who / question:** movers and checkers: "what is the bill for band D
  here?" and "is my band right?"
- **Answer:** the yearly and monthly bill for their band.
- **Layout:** a band ladder A to H (I in Wales): eight rows with the ratio
  to band D and the bill at their council's band D rate, their band
  highlighted. Ten or twelve instalments toggle.
- **Content:** bands are 1991 values (2003 in Wales); how to check and
  challenge a band; premiums on empty and second homes.
- **Edge cases:** Scotland's ratios; Wales band I; band D rate unknown
  (use the national average, labelled).
- **Sources:** VOA; GOV.UK council tax; Scottish Assessors.

### 22. Rent increase (`/uk/property/rent-increase`)
- **Who / question:** a tenant holding a rent increase notice: "is this
  legal, and what can I do?"
- **Answer:** a verdict: valid, or the specific problem.
- **Layout:** a checklist verdict, not a calculator: nation, tenancy type,
  date of last increase, notice date and start date produce three checks
  (form, notice period, once a year), each a pass or fail row, then the
  cost (extra a month, a year, percentage) and the challenge deadline as a
  date.
- **Content:** how to challenge (tribunal, Rent Service Scotland) and the
  risk of doing so; market rent evidence.
- **Edge cases:** England after the Renters' Rights Act commencement;
  Scotland 3 months' notice; Wales 2 months; fixed term.
- **Sources:** GOV.UK; gov.scot; gov.wales; nidirect.

### 23. Deposit return (`/uk/property/deposit-return`)
- **Who / question:** end of tenancy: "how much should I get back, and is
  this deduction fair?"
- **Answer:** the fair deduction and the amount to be returned.
- **Layout:** an itemised claim sheet: add deduction lines (item, cost
  new, age, expected life) and each is depreciated in place, with the
  landlord's claimed figure beside the fair figure. A cap check sits at
  the top (5 or 6 weeks' rent).
- **Content:** wear and tear; betterment; the free dispute service and
  its time limits; unprotected deposit penalties.
- **Edge cases:** item older than its life (nil); deposit over the cap;
  Scotland and NI limits.
- **Sources:** GOV.UK tenancy deposit protection; TDS, DPS guidance.

### 24. Housing Benefit (`/uk/benefits/housing-benefit`)
- **Who / question:** pensioners and people in supported housing (most
  others are on UC): "how much rent help will I get?"
- **Answer:** weekly Housing Benefit.
- **Layout:** a routing question first ("pension age, or supported or
  temporary housing?"); others are sent to the UC estimate. Then a means
  test statement: eligible rent, less non-dependant deductions, less 65%
  of income above the applicable amount.
- **Content:** who can still claim; the applicable amount in one table.
- **Edge cases:** on Guarantee Credit; non-dependant in work; savings.
- **Sources:** DWP rates; HB Regulations guidance.

## Students

### 25. Maintenance loan, England (`/uk/students/maintenance-loan`)
- **Who / question:** applicants and parents: "how much loan will I get on
  our household income, and how much are parents expected to add?"
- **Answer:** the yearly loan and the gap to the maximum.
- **Layout:** a household income slider under a curve of the loan against
  income for their living situation (home, away, London), with their point
  marked; the "expected parental contribution" is the shaded gap between
  their loan and the maximum. Per-term instalments beneath.
- **Content:** what household income means; the gap is assumed parental
  support; extra for long courses and disabilities.
- **Edge cases:** below £25,000; above the upper threshold (minimum
  loan); final year rates; independent students.
- **Sources:** SFE "how much you could get" 2026/27; GOV.UK.

### 26. SAAS funding (`/uk/students/saas-funding`)
- **Who / question:** Scottish students: "what bursary and loan do I get?"
- **Answer:** total support, split into bursary (not repaid) and loan.
- **Layout:** income bands as a stepped ladder (SAAS uses bands, not a
  curve), their band highlighted, bursary and loan stacked in each step.
  Young vs independent toggle changes the ladder.
- **Content:** tuition fees paid by SAAS; monthly payments; care
  experienced bursary.
- **Edge cases:** band edges; independent student; living at home.
- **Sources:** SAAS funding guide 2026/27.

### 27. Welsh student finance (`/uk/students/welsh-student-finance`)
- **Who / question:** Welsh students: "how much is grant and how much is
  loan?"
- **Answer:** total support, with the grant share.
- **Layout:** one fixed-height bar whose total stays the same while the
  grant/loan split slides with household income: the Welsh system's
  defining feature made visible. Partial cancellation note.
- **Content:** everyone gets the same total; the £1,500 partial
  cancellation; where you study changes the total.
- **Edge cases:** income under £18,370; over £59,200; London.
- **Sources:** Student Finance Wales 2026/27.

### 28. Student council tax (`/uk/students/student-council-tax`)
- **Who / question:** student households: "do we pay council tax?"
- **Answer:** exempt, discounted, or full bill, for their household.
- **Layout:** a household builder: add each person as a chip (full-time
  student, part-time, working, partner) and the verdict updates: all
  students exempt; one non-student 25% off; two or more full bill.
- **Content:** proving student status; summer between courses; halls.
- **Edge cases:** part-time student; non-British spouse of a student;
  one working adult.
- **Sources:** GOV.UK council tax discounts for students.

### 29. Plan 2 student loan (`/uk/students/plan-2-student-loan`)
- **Who / question:** graduates from 2012 to 2022 starters: "what do I
  repay a month, and will I ever clear it?"
- **Answer:** monthly repayment now, and "written off with £X unpaid" or
  "cleared in year Y".
- **Layout:** the balance over 30 years as an area chart to the write-off
  date, with the total repaid. A salary slider and a single toggle for
  overpaying, which shows whether overpaying saves anything (for most it
  does not).
- **Content:** it behaves like a graduate tax for most; interest rate
  bands; the frozen threshold.
- **Edge cases:** below threshold; high earner who clears it; write-off
  year.
- **Sources:** GOV.UK repaying your student loan; SLC interest rates.

## Pay and savings

### 30. Pro rata salary (`/uk/tax-and-salary/pro-rata`)
- **Who / question:** part-time job seekers and returners: "what is this
  full-time salary for my hours, and my holiday?"
- **Answer:** the pro rata salary a year and a month.
- **Layout:** two salaries side by side, full-time and theirs, joined by
  the fraction (for example 22.5 of 37.5 hours = 60%). Days-a-week pills
  as a shortcut. Holiday pro rata as a second figure. Take-home is one
  extra line, not a second calculator.
- **Content:** hours vs days methods; term-time only; bank holidays for
  part-timers.
- **Edge cases:** term-time (weeks a year); starting mid-year; 5.6 weeks'
  holiday cap.
- **Sources:** GOV.UK part-time workers' rights; ACAS holiday.

### 31. Premium Bonds (`/uk/investing/premium-bonds`)
- **Who / question:** savers: "what will I realistically win, and is a
  savings account better?"
- **Answer:** the median outcome for their holding in a year, not the
  headline prize rate.
- **Layout:** a luck distribution: a histogram of simulated yearly
  winnings for their holding, with unlucky (10th percentile), typical
  (median) and lucky (90th) marked, and a line for what a savings account
  at a chosen rate would pay after tax. The chance of winning nothing is
  stated in words.
- **Content:** why the median is below the prize rate; tax-free matters
  for higher-rate payers; the £50,000 limit.
- **Edge cases:** £25 holding; £50,000; savings tax bands.
- **Sources:** NS&I prize rate and odds; NS&I prize breakdown.

## Rules for every page

1. **Verify before writing.** Check the engine against the sources above
   (open them) and add a test for each edge case listed. Report any figure
   the engine gets wrong.
2. **Answer first.** The answer is visible without scrolling at 1440px and
   within the first screen and a half at 390px. Results update as inputs
   change; there is no "Calculate" step unless the tool is a check with a
   verdict.
3. **One visual, earning its place.** Use the plan's visual. No donut
   unless parts of a whole is the point. Every chart has a text
   equivalent.
4. **Write like an adviser.** Plain British English, second person, short
   paragraphs. No "In this guide", no "It's important to note", no
   restating the result. Three to five sections that this topic needs, in
   this topic's order. FAQs: only real questions not already answered,
   3 to 6.
5. **Say what kind of answer it is.** One `Caveat` line: estimate or
   exact, the tax year, and the main thing left out.
6. **Keep what must not break.** The URL, the title and description, the
   `SCHEMA` keys (share links), the embed export name, the April 2027
   rates choice where it exists, and the privacy rule: nothing typed goes
   into the address bar.
7. **Accessibility.** Labels on every input, keyboard reachable, visible
   focus, 4.5:1 text, charts with `role="img"` and a described value.
8. **Review each page on its own** at 390 and 1440px against its plan
   before calling it done.

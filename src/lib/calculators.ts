/**
 * Master registry — every calculator on GovMath.
 *
 * Architecture: 8 top-level categories, each with its own route segment.
 * Single source of truth for navigation, category landings, the homepage
 * grid, and the master /calculators index.
 *
 * To launch a calculator:
 *   1. Build src/app/<category>/<slug>/page.tsx
 *   2. Flip `status` from "coming-soon" to "live" below.
 *   3. (Optional) Add a 301 redirect from any prior path in next.config.ts.
 */

export type CalculatorStatus = "live" | "coming-soon";

export type CategorySlug =
  | "tax-and-salary"
  | "property"
  | "business"
  | "investing"
  | "benefits"
  | "vehicles"
  | "students"
  | "life";

export type Calculator = {
  slug: string;
  href: string;
  title: string;
  blurb: string;
  category: CategorySlug;
  status: CalculatorStatus;
  popular?: boolean;
};

export type Category = {
  slug: CategorySlug;
  title: string;
  href: string;
  tagline: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "tax-and-salary",
    title: "Tax & Salary",
    href: "/tax-and-salary",
    tagline: "Income Tax, NI, payslips, statutory pay.",
    description:
      "Work out exactly what HMRC takes — and what stays in your bank. Every UK employment-tax calculator, with the rules explained in plain English.",
  },
  {
    slug: "property",
    title: "Mortgages & Property",
    href: "/property",
    tagline: "Stamp Duty, mortgages, rent, council tax.",
    description:
      "Buying, renting, selling or just budgeting? Run the numbers on everything property-related.",
  },
  {
    slug: "business",
    title: "Freelance & Business",
    href: "/business",
    tagline: "Self-employed tax, VAT, IR35, corporation tax.",
    description:
      "Calculators built for sole traders, contractors and small-business owners — every UK rule decoded.",
  },
  {
    slug: "investing",
    title: "Pensions & Investing",
    href: "/investing",
    tagline: "Pensions, ISAs, compound interest, capital gains.",
    description:
      "Plan for the long term with calculators built around UK pension, ISA and investment rules.",
  },
  {
    slug: "benefits",
    title: "Family & Benefits",
    href: "/benefits",
    tagline: "Universal Credit, Child Benefit, parental pay, PIP.",
    description:
      "Estimate what you can claim from DWP and HMRC. No jargon, just plain answers.",
  },
  {
    slug: "vehicles",
    title: "Vehicles & Transport",
    href: "/vehicles",
    tagline: "Car tax, EV salary sacrifice, fuel, clean-air zones.",
    description:
      "Everything from VED bands to commuting cost comparisons — for the way you actually get around.",
  },
  {
    slug: "students",
    title: "Students",
    href: "/students",
    tagline: "Student loans (Plans 1–5), maintenance, council tax.",
    description:
      "Student loans, maintenance support and the council-tax rules every UK student should know.",
  },
  {
    slug: "life",
    title: "Everyday Life",
    href: "/life",
    tagline: "Percentages, dates, inheritance, NHS, bank holidays.",
    description:
      "The small but important calculators for everyday life events and admin.",
  },
];

const cs = (
  slug: string,
  category: CategorySlug,
  title: string,
  blurb: string,
  popular = false
): Calculator => ({
  slug,
  href: `/${category}/${slug}`,
  title,
  blurb,
  category,
  status: "coming-soon",
  popular,
});

const live = (
  slug: string,
  category: CategorySlug,
  title: string,
  blurb: string,
  popular = false
): Calculator => ({
  slug,
  href: `/${category}/${slug}`,
  title,
  blurb,
  category,
  status: "live",
  popular,
});

export const CALCULATORS: Calculator[] = [
  // ── Tax & Salary ────────────────────────────────────────────────────────
  live("salary-calculator", "tax-and-salary", "Salary & Take-Home Calculator", "See exactly what lands in your bank after Income Tax, NI and pension.", true),
  live("tax-bracket-checker", "tax-and-salary", "Tax Bracket Checker", "See your Income Tax band by band and what a pay rise actually costs.", true),
  live("pro-rata", "tax-and-salary", "Pro Rata Salary Calculator", "Convert a full-time salary to part-time hours."),
  live("hourly-to-salary", "tax-and-salary", "Hourly to Salary Converter", "Turn an hourly rate into an annual gross figure.", true),
  live("emergency-tax", "tax-and-salary", "Emergency Tax Calculator", "Estimate refunds from BR / K / 0T tax codes."),
  live("bonus-tax", "tax-and-salary", "Bonus Tax Calculator", "See what a one-off bonus is really worth after tax.", true),
  live("overtime", "tax-and-salary", "Overtime Calculator", "Work out time-and-a-half and double-shift pay."),
  live("tax-code-decoder", "tax-and-salary", "Tax Code Decoder", "What does 1257L, BR or NT actually mean on your payslip?"),
  live("national-insurance", "tax-and-salary", "National Insurance Calculator", "Class 1, 2 and 4 NI — explained without the jargon.", true),
  live("scottish-tax", "tax-and-salary", "Scottish Income Tax Calculator", "The six-band Scottish system, calculated cleanly."),
  live("p45-p60-explainer", "tax-and-salary", "P45 & P60 Explainer", "Field-by-field breakdown of your payroll documents."),
  live("statutory-sick-pay", "tax-and-salary", "Statutory Sick Pay (SSP)", "Check your minimum SSP entitlement."),
  live("redundancy", "tax-and-salary", "Redundancy Pay Calculator", "Statutory pay based on age and length of service."),
  live("holiday-entitlement", "tax-and-salary", "Holiday Entitlement Calculator", "Statutory holiday days, pro-rated for any working pattern."),
  live("minimum-wage", "tax-and-salary", "Minimum Wage Checker", "Are you being paid at least the current UK minimum?"),

  // ── Property ────────────────────────────────────────────────────────────
  live("stamp-duty-england", "property", "Stamp Duty (England & NI)", "SDLT on your next home, including the additional-property surcharge.", true),
  live("lbtt-scotland", "property", "LBTT (Scotland)", "Scottish Land and Buildings Transaction Tax, by band."),
  live("ltt-wales", "property", "LTT (Wales)", "Welsh Land Transaction Tax for residential purchases."),
  live("first-time-buyer", "property", "First-Time Buyer Calculator", "Stamp Duty relief and zero-tax thresholds.", true),
  live("buy-to-let-yield", "property", "Buy-to-Let Yield Calculator", "Gross and net yields on rental investments."),
  live("mortgage-repayment", "property", "Mortgage Repayment Calculator", "Monthly payments, interest vs capital, over the full term.", true),
  live("mortgage-overpayment", "property", "Mortgage Overpayment Calculator", "How much time and interest can you save?"),
  live("mortgage-affordability", "property", "Mortgage Affordability", "How much could a UK lender offer you?", true),
  live("rent-vs-buy", "property", "Rent vs Buy Calculator", "Compare years of rent against a mortgage and house growth."),
  live("shared-ownership", "property", "Shared Ownership Calculator", "Mortgage + rent on the share you don't own."),
  live("property-capital-gains", "property", "Property Capital Gains Tax", "CGT on a second home or sold investment property."),
  live("council-tax-bands", "property", "Council Tax Bands Lookup", "Find your band and typical bill by postcode."),
  live("single-person-discount", "property", "Single Person Council Tax Discount", "Apply the 25% solo-occupant rebate."),
  live("rent-a-room", "property", "Rent a Room Scheme", "How much can you earn tax-free from a lodger?"),
  live("moving-house-budget", "property", "Moving House Budget", "Surveys, legal fees, removals — the full picture."),

  // ── Business ────────────────────────────────────────────────────────────
  live("sole-trader-tax", "business", "Sole Trader Tax Calculator", "Self-employed Income Tax + Class 2 / 4 NI.", true),
  live("corporation-tax", "business", "Corporation Tax Calculator", "Small and main rate, with marginal relief."),
  live("dividend-vs-salary", "business", "Dividend vs Salary Optimiser", "Find the tax-efficient split for company directors.", true),
  live("vat-calculator", "business", "VAT Calculator", "Add or remove VAT at 20%, 5% or 0% — instantly.", true),
  live("flat-rate-vat", "business", "Flat Rate VAT Calculator", "Compare standard vs flat-rate VAT for your trade."),
  live("cis-deduction", "business", "CIS Deduction Calculator", "Construction Industry Scheme net pay after deductions."),
  live("ir35-take-home", "business", "IR35 Take-Home Calculator", "Inside vs outside IR35 contractor income."),
  live("business-mileage", "business", "Business Mileage Calculator", "HMRC-approved mileage rates for cars and bikes."),
  live("allowable-expenses", "business", "Allowable Expenses Checker", "Quick check on what's actually deductible."),
  live("employer-ni-costs", "business", "Employer NI Calculator", "True cost of hiring including secondary Class 1."),
  live("gross-profit-margin", "business", "Gross Profit Margin", "Margins, markups and break-even from your numbers."),
  live("retail-markup", "business", "Retail Markup Calculator", "Hit a target price or margin from a cost."),
  live("break-even", "business", "Break-Even Calculator", "Find your business break-even volume."),
  live("small-business-rates", "business", "Small Business Rates Relief", "Check business-rates eligibility by rateable value."),
  live("payment-on-account", "business", "Payment on Account Estimator", "Predict your Self-Assessment January and July bills."),

  // ── Investing ──────────────────────────────────────────────────────────
  live("compound-interest", "investing", "Compound Interest Calculator", "Project investment growth over years and decades.", true),
  live("isa-vs-gia", "investing", "ISA vs GIA Comparison", "How much tax does an ISA actually save?"),
  live("capital-gains-assets", "investing", "Capital Gains Tax (Assets)", "CGT on shares and other assets above the allowance."),
  live("dividend-tax", "investing", "Dividend Tax Calculator", "Tax on dividends beyond the allowance."),
  live("workplace-pension", "investing", "Workplace Pension Calculator", "Employer + employee auto-enrolment contributions.", true),
  live("pension-tax-relief", "investing", "Pension Tax Relief Calculator", "How much tax relief you actually get back."),
  live("state-pension-age", "investing", "State Pension Age Lookup", "When can you claim your State Pension?", true),
  live("inflation-impact", "investing", "Inflation Impact Calculator", "What your savings are really worth in 10 years."),
  live("fire-calculator", "investing", "FIRE Calculator", "When could you retire early? Uses the 4% rule."),
  live("premium-bonds", "investing", "Premium Bonds Return", "Expected vs guaranteed savings returns."),

  // ── Benefits ───────────────────────────────────────────────────────────
  live("universal-credit", "benefits", "Universal Credit Estimator", "Estimate your monthly Universal Credit award.", true),
  live("universal-credit-taper", "benefits", "UC Earnings Taper Calculator", "How much UC you lose for every £ you earn."),
  live("child-benefit", "benefits", "Child Benefit Calculator", "Weekly Child Benefit by number of children.", true),
  live("high-income-child-benefit", "benefits", "High Income Child Benefit Charge", "Clawback above £60,000 — explained."),
  live("maternity-pay", "benefits", "Maternity Pay Calculator", "SMP across the 39-week period."),
  live("paternity-pay", "benefits", "Paternity Pay Calculator", "Statutory paternity pay entitlement."),
  live("shared-parental-leave", "benefits", "Shared Parental Leave", "Split leave and pay between two parents."),
  live("tax-free-childcare", "benefits", "Tax-Free Childcare Calculator", "Up to £2,000/year per child top-up — see your match."),
  live("free-childcare-hours", "benefits", "Free Childcare Hours Checker", "15 or 30 free hours — eligibility by age and income."),
  live("pip-points", "benefits", "PIP Points Self-Check", "Daily living + mobility scores against thresholds."),
  live("carers-earnings", "benefits", "Carer's Allowance Earnings Check", "Stay within the weekly limit to keep your claim."),
  live("pension-credit", "benefits", "Pension Credit Estimator", "Top-up for low-income pensioners."),
  live("attendance-allowance", "benefits", "Attendance Allowance", "Help with care costs for over-65s."),
  live("benefit-cap", "benefits", "Benefit Cap Checker", "Is your household above the cumulative cap?"),
  live("local-housing-allowance", "benefits", "Local Housing Allowance", "LHA rates by property size and region."),

  // ── Vehicles ───────────────────────────────────────────────────────────
  live("car-tax-ved", "vehicles", "Car Tax (VED) Calculator", "Annual road tax by emissions and list price.", true),
  live("benefit-in-kind", "vehicles", "Company Car Benefit-in-Kind", "BIK tax on a company vehicle."),
  live("ev-salary-sacrifice", "vehicles", "EV Salary Sacrifice", "Net cost of an electric car through your payroll.", true),
  live("fuel-cost-journey", "vehicles", "Fuel Cost per Journey", "Cost of a trip from distance, MPG and fuel price."),
  live("petrol-vs-ev-cost", "vehicles", "Petrol vs EV Running Cost", "Compare per-mile costs of petrol, diesel and EV."),
  live("commuter-comparison", "vehicles", "Commuter Cost Comparison", "Rail season ticket vs driving the same route."),
  live("clean-air-zones", "vehicles", "Clean Air Zone Charge", "Daily charges in ULEZ, CAZ and similar schemes."),
  live("mot-history-checker", "vehicles", "MOT History Checker", "Look up MOT history via the DVSA service."),
  live("licence-at-70", "vehicles", "Driving Licence at 70", "What to do when your licence needs renewing."),
  live("sorn-declaration", "vehicles", "SORN Declaration", "Take your vehicle off the road, the right way."),

  // ── Students ───────────────────────────────────────────────────────────
  live("plan-1-student-loan", "students", "Plan 1 Student Loan Calculator", "Pre-2012 loan repayments."),
  live("plan-2-student-loan", "students", "Plan 2 Student Loan Calculator", "Post-2012 loan repayments.", true),
  live("plan-4-student-loan", "students", "Plan 4 Student Loan Calculator", "Scottish student loan repayments."),
  live("plan-5-student-loan", "students", "Plan 5 Student Loan Calculator", "Post-2023 loans with the 40-year write-off."),
  live("postgrad-loan", "students", "Postgraduate Loan Calculator", "Repayments on a Master's or Doctoral loan."),
  live("maintenance-loan", "students", "Maintenance Loan Estimator", "Support based on household income.", true),
  live("student-council-tax", "students", "Student Council Tax Exemption", "Who counts as a full-time student — and who doesn't."),

  // ── Life ───────────────────────────────────────────────────────────────
  live("percentage-calculator", "life", "Percentage Calculator", "Add, subtract or compare percentages — fast.", true),
  live("days-between-dates", "life", "Days Between Dates", "Calendar days between any two dates."),
  live("timesheet-decimal", "life", "Timesheet Decimal Converter", "Convert hh:mm worked into decimal hours."),
  live("pro-rata-rent", "life", "Pro-Rata Rent Calculator", "Daily rent for a broken move-in month."),
  live("inheritance-tax", "life", "Inheritance Tax Calculator", "IHT on an estate, with the nil-rate band.", true),
  live("probate-fees", "life", "Probate Fees Calculator", "Application costs based on the estate."),
  live("care-home-means-test", "life", "Care Home Means Test", "Will the state cover any of your care costs?"),
  live("nhs-prescription-saver", "life", "NHS Prescription Saver", "Is a Prepayment Certificate cheaper for you?"),
  live("bmi-uk-nhs", "life", "BMI Calculator (NHS)", "Your BMI against NHS healthy-weight bands."),
  live("healthy-start", "life", "Healthy Start Vouchers", "Eligibility for free vouchers and vitamins."),
  live("bank-holidays", "life", "Bank Holidays Calculator", "Working days excluding bank holidays in your region."),
  live("right-to-rent", "life", "Right to Rent Checker", "Documents landlords must check."),
  live("power-of-attorney", "life", "Power of Attorney Fees", "Application fees and process overview."),
];

export function getCategory(slug: CategorySlug): Category {
  const c = CATEGORIES.find((c) => c.slug === slug);
  if (!c) throw new Error(`Unknown category: ${slug}`);
  return c;
}

export function getCalculatorsByCategory(slug: CategorySlug): Calculator[] {
  return CALCULATORS.filter((c) => c.category === slug);
}

export function getLiveCalculators(): Calculator[] {
  return CALCULATORS.filter((c) => c.status === "live");
}

export function getPopularCalculators(): Calculator[] {
  return CALCULATORS.filter((c) => c.popular);
}

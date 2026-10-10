/**
 * Master registry — every calculator on SumAtlas.
 *
 * Each calculator belongs to a country ("uk", "us") or to everyone
 * ("global", the Everyday calculators). UK calculators live under
 * /uk/<topic>/<slug> in 8 topics; US calculators under /us/<topic>/<slug> in
 * 4 topics; Everyday calculators under /everyday/<slug>, listed in every
 * country's menus. Single source of truth for the header menus and search,
 * the home and topic pages, the /calculators index and the sitemap.
 *
 * To add a calculator, build its page and add an entry below.
 */

export type CategorySlug =
  | "tax-and-salary"
  | "property"
  | "business"
  | "investing"
  | "benefits"
  | "vehicles"
  | "students"
  | "life";

/** US topics. The URL segment is the part after "us-" (/us/taxes…). */
export type UsCategorySlug = "us-taxes" | "us-housing" | "us-loans" | "us-savings";
/** Every topic: UK, US and the shared Everyday topic. */
export type AnyCategory = CategorySlug | UsCategorySlug | "everyday";
export type Country = "uk" | "us" | "global";

export type Calculator = {
  slug: string;
  href: string;
  title: string;
  blurb: string;
  category: AnyCategory;
  country: Country;
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
    href: "/uk/tax-and-salary",
    tagline: "Income Tax, NI, payslips, statutory pay.",
    description:
      "Work out exactly what HMRC takes — and what stays in your bank. Every UK employment-tax calculator, with the rules explained in plain English.",
  },
  {
    slug: "property",
    title: "Mortgages & Property",
    href: "/uk/property",
    tagline: "Stamp Duty, mortgages, rent, council tax.",
    description:
      "Buying, renting, selling or just budgeting? Run the numbers on everything property-related.",
  },
  {
    slug: "business",
    title: "Freelance & Business",
    href: "/uk/business",
    tagline: "Self-employed tax, VAT, IR35, corporation tax.",
    description:
      "Calculators built for sole traders, contractors and small-business owners — every UK rule decoded.",
  },
  {
    slug: "investing",
    title: "Pensions & Investing",
    href: "/uk/investing",
    tagline: "Pensions, ISAs, compound interest, capital gains.",
    description:
      "Plan for the long term with calculators built around UK pension, ISA and investment rules.",
  },
  {
    slug: "benefits",
    title: "Family & Benefits",
    href: "/uk/benefits",
    tagline: "Universal Credit, Child Benefit, parental pay, PIP.",
    description:
      "Estimate what you can claim from DWP and HMRC. No jargon, just plain answers.",
  },
  {
    slug: "vehicles",
    title: "Vehicles & Transport",
    href: "/uk/vehicles",
    tagline: "Car tax, EV salary sacrifice, fuel, clean-air zones.",
    description:
      "Everything from VED bands to commuting cost comparisons — for the way you actually get around.",
  },
  {
    slug: "students",
    title: "Students",
    href: "/uk/students",
    tagline: "Student loans (Plans 1–5), maintenance, council tax.",
    description:
      "Student loans, maintenance support and the council-tax rules every UK student should know.",
  },
  {
    slug: "life",
    title: "Everyday Life",
    href: "/uk/life",
    tagline: "Percentages, dates, inheritance, NHS, bank holidays.",
    description:
      "The small but important calculators for everyday life events and admin.",
  },
];

/** US topics, in menu order. */
export type UsCategory = { slug: UsCategorySlug; title: string; menu: string; href: string; tagline: string; description: string };

export const US_CATEGORIES: UsCategory[] = [
  {
    slug: "us-taxes",
    title: "Taxes & Paycheck",
    menu: "Taxes & pay",
    href: "/us/taxes",
    tagline: "Paycheck, federal income tax, self-employment and capital gains.",
    description: "Work out your take-home pay and what you owe the IRS for 2026, with every rule explained in plain English.",
  },
  {
    slug: "us-housing",
    title: "Mortgages & Housing",
    menu: "Housing",
    href: "/us/housing",
    tagline: "Mortgage payments, affordability, refinancing and rent.",
    description: "Run the numbers on buying, refinancing or renting a home, with taxes, insurance and PMI included.",
  },
  {
    slug: "us-loans",
    title: "Loans & Debt",
    menu: "Loans & debt",
    href: "/us/loans",
    tagline: "Auto loans, personal loans, credit cards and student loans.",
    description: "See what a loan really costs, how fast you can clear a balance and which debt to pay off first.",
  },
  {
    slug: "us-savings",
    title: "Savings & Retirement",
    menu: "Retirement",
    href: "/us/savings",
    tagline: "401(k), Roth IRA, compound interest, CDs and savings goals.",
    description: "Plan for retirement and grow your savings with the 2026 contribution limits built in.",
  },
];

/** The shared Everyday topic, listed for every country. */
export const EVERYDAY = {
  slug: "everyday" as const,
  title: "Everyday Calculators",
  menu: "Everyday",
  href: "/everyday",
  tagline: "Percentages, BMI and timesheet hours.",
  description: "Quick calculators for everyday sums that work the same wherever you live.",
};

const live = (
  slug: string,
  category: CategorySlug,
  title: string,
  blurb: string,
  popular = false
): Calculator => ({
  slug,
  href: `/uk/${category}/${slug}`,
  title,
  blurb,
  category,
  country: "uk",
  popular,
});

const us = (slug: string, category: UsCategorySlug, title: string, blurb: string, popular = false): Calculator => ({
  slug,
  href: `/us/${category.slice(3)}/${slug}`,
  title,
  blurb,
  category,
  country: "us",
  popular,
});

const everyday = (slug: string, title: string, blurb: string, popular = false): Calculator => ({
  slug,
  href: `/everyday/${slug}`,
  title,
  blurb,
  category: "everyday",
  country: "global",
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
  live("ir35-take-home", "tax-and-salary", "IR35 Take-Home Calculator", "Inside vs outside IR35 contractor income."),
  live("reverse-take-home", "tax-and-salary", "Reverse Take-Home Calculator", "The salary you need for the take-home pay you want."),
  live("pay-rise", "tax-and-salary", "Pay Rise Calculator", "What a pay rise adds to your take-home after tax."),
  live("salary-sacrifice", "tax-and-salary", "Salary Sacrifice Calculator", "What a pension, bike or other sacrifice really costs."),
  live("marriage-allowance", "tax-and-salary", "Marriage Allowance Calculator", "Transfer £1,260 of allowance and save up to £252 a year."),

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
  live("rent-increase", "property", "Rent Increase Checker", "Is your rent rise legal, and what will it cost you?"),
  live("deposit-return", "property", "Tenancy Deposit Return Calculator", "The deposit cap, fair deductions and what you should get back."),
  live("remortgage", "property", "Remortgage Calculator", "What a new deal saves after fees and charges."),
  live("early-repayment-charge", "property", "Early Repayment Charge Calculator", "Your mortgage ERC, free overpayments and when to switch."),

  // ── Business ────────────────────────────────────────────────────────────
  live("sole-trader-tax", "business", "Sole Trader Tax Calculator", "Self-employed Income Tax and Class 4 NI.", true),
  live("corporation-tax", "business", "Corporation Tax Calculator", "Small and main rate, with marginal relief."),
  live("dividend-vs-salary", "business", "Dividend vs Salary Optimiser", "Find the tax-efficient split for company directors.", true),
  live("vat-calculator", "business", "VAT Calculator", "Add or remove VAT at 20%, 5% or 0% — instantly.", true),
  live("flat-rate-vat", "business", "Flat Rate VAT Calculator", "Compare standard vs flat-rate VAT for your trade."),
  live("cis-deduction", "business", "CIS Deduction Calculator", "Construction Industry Scheme net pay after deductions."),
  live("business-mileage", "business", "Business Mileage Calculator", "HMRC-approved mileage rates for cars and bikes."),
  live("allowable-expenses", "business", "Allowable Expenses Checker", "Quick check on what's actually deductible."),
  live("employer-ni-costs", "business", "Employer NI Calculator", "True cost of hiring including secondary Class 1."),
  live("gross-profit-margin", "business", "Gross Profit Margin", "Margins, markups and break-even from your numbers."),
  live("retail-markup", "business", "Retail Markup Calculator", "Hit a target price or margin from a cost."),
  live("break-even", "business", "Break-Even Calculator", "Find your business break-even volume."),
  live("small-business-rates", "business", "Small Business Rates Relief", "Check business-rates eligibility by rateable value."),
  live("payment-on-account", "business", "Payment on Account Estimator", "Predict your Self-Assessment January and July bills."),
  live("vat-threshold", "business", "VAT Threshold Checker", "Rolling turnover against the £90,000 threshold."),
  live("day-rate", "business", "Freelancer Day Rate Calculator", "The day rate you need for the take-home you want."),

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
  live("savings-interest", "investing", "Savings Interest Calculator", "Fixed vs easy-access savings, compared after tax."),
  live("personal-savings-allowance", "investing", "Personal Savings Allowance", "How much tax you pay on savings interest."),
  live("junior-isa", "investing", "Junior ISA Calculator", "What saving for a child could grow to by 18."),
  live("pension-drawdown", "investing", "Pension Drawdown Calculator", "How long your pension pot lasts in drawdown."),
  live("annuity", "investing", "Annuity Calculator", "The guaranteed income your pension pot could buy."),
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
  live("housing-benefit", "benefits", "Housing Benefit Calculator", "Weekly help with rent for pensioners and supported housing."),
  live("council-tax-reduction", "benefits", "Council Tax Reduction Calculator", "Means-tested help with your council tax bill."),
  live("benefits-checker", "benefits", "Benefits Eligibility Checker", "See which benefits you are likely to get, in one go."),
  live("new-style-jsa", "benefits", "New Style JSA Calculator", "Jobseeker's Allowance from your National Insurance record."),
  live("new-style-esa", "benefits", "New Style ESA Calculator", "Employment and Support Allowance if illness limits work."),
  live("child-maintenance", "benefits", "Child Maintenance Calculator", "What the Child Maintenance Service formula says is due."),
  live("childcare-costs", "benefits", "Childcare Costs Calculator", "What childcare costs after funded hours and top-ups."),
  live("adoption-pay", "benefits", "Adoption Pay Calculator", "Statutory Adoption Pay week by week."),
  live("sure-start-maternity-grant", "benefits", "Sure Start Maternity Grant", "The £500 grant, or Scotland's Best Start Grant."),
  live("uc-advance", "benefits", "UC Advance Repayment Calculator", "What a Universal Credit advance takes from each payment."),

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
  live("car-finance", "vehicles", "Car Finance Calculator", "PCP and hire purchase payments and total cost."),

  // ── Students ───────────────────────────────────────────────────────────
  live("plan-1-student-loan", "students", "Plan 1 Student Loan Calculator", "Pre-2012 loan repayments."),
  live("plan-2-student-loan", "students", "Plan 2 Student Loan Calculator", "Post-2012 loan repayments.", true),
  live("plan-4-student-loan", "students", "Plan 4 Student Loan Calculator", "Scottish student loan repayments."),
  live("plan-5-student-loan", "students", "Plan 5 Student Loan Calculator", "Post-2023 loans with the 40-year write-off."),
  live("postgrad-loan", "students", "Postgraduate Loan Calculator", "Repayments on a Master's or Doctoral loan."),
  live("maintenance-loan", "students", "Maintenance Loan Estimator", "Support based on household income.", true),
  live("degree-cost", "students", "Cost of a Degree Calculator", "Fees, loans, interest and what you will really repay."),
  live("saas-funding", "students", "SAAS Funding Calculator", "Scottish bursary and student loan by household income."),
  live("welsh-student-finance", "students", "Welsh Student Finance Calculator", "Learning Grant and Maintenance Loan for Welsh students."),
  live("student-budget", "students", "Student Budget Calculator", "Will your loan cover rent and living costs?"),
  live("student-council-tax", "students", "Student Council Tax Exemption", "Who counts as a full-time student — and who doesn't."),

  // ── Life ───────────────────────────────────────────────────────────────
  live("days-between-dates", "life", "Days Between Dates", "Calendar and working days between two dates, with UK bank holidays."),
  live("pro-rata-rent", "life", "Pro-Rata Rent Calculator", "Daily rent for a broken move-in month."),
  live("inheritance-tax", "life", "Inheritance Tax Calculator", "IHT on an estate, with the nil-rate band.", true),
  live("probate-fees", "life", "Probate Fees Calculator", "Application costs based on the estate."),
  live("care-home-means-test", "life", "Care Home Means Test", "Will the state cover any of your care costs?"),
  live("nhs-prescription-saver", "life", "NHS Prescription Saver", "Is a Prepayment Certificate cheaper for you?"),
  live("healthy-start", "life", "Healthy Start Vouchers", "Eligibility for free vouchers and vitamins."),
  live("bank-holidays", "life", "Bank Holidays Calculator", "Working days excluding bank holidays in your region."),
  live("right-to-rent", "life", "Right to Rent Checker", "Documents landlords must check."),
  live("power-of-attorney", "life", "Power of Attorney Fees", "Application fees and process overview."),

  // ── Everyday (every country) ───────────────────────────────────────────
  everyday("percentage-calculator", "Percentage Calculator", "Add, subtract or compare percentages — fast.", true),
  everyday("timesheet-decimal", "Timesheet Decimal Converter", "Convert hh:mm worked into decimal hours."),
  everyday("bmi-calculator", "BMI Calculator", "Your body mass index against the healthy-weight ranges."),

  // ── US: Taxes & Paycheck ───────────────────────────────────────────────
  us("paycheck-calculator", "us-taxes", "Paycheck Calculator", "Take-home pay after federal tax, Social Security, Medicare and state tax.", true),
  us("federal-income-tax", "us-taxes", "Federal Income Tax Calculator", "Your 2026 federal income tax, refund or balance due.", true),
  us("tax-bracket-calculator", "us-taxes", "Tax Bracket Calculator", "Your 2026 bracket, marginal and effective tax rates."),
  us("self-employment-tax", "us-taxes", "Self-Employment Tax Calculator", "Social Security and Medicare on 1099 and freelance income."),
  us("capital-gains-tax", "us-taxes", "Capital Gains Tax Calculator", "Tax on stocks, crypto and property you sell at a gain."),
  us("salary-to-hourly", "us-taxes", "Salary to Hourly Calculator", "Convert between salary, hourly, weekly and monthly pay."),
  us("overtime-calculator", "us-taxes", "Overtime Pay Calculator", "Time-and-a-half pay and the new overtime deduction."),
  us("sales-tax-calculator", "us-taxes", "Sales Tax Calculator", "Add or remove sales tax, with every state's rate."),
  us("tip-calculator", "us-taxes", "Tip Calculator", "The tip and each person's share of the bill."),
  us("tax-refund-calculator", "us-taxes", "Tax Refund Calculator", "Estimate your 2026 refund or the balance you will owe.", true),
  us("w4-withholding-calculator", "us-taxes", "W-4 Withholding Calculator", "Check your withholding and what to put on your W-4."),
  us("bonus-tax-calculator", "us-taxes", "Bonus Tax Calculator", "Take-home from a bonus with the 22% supplemental rate."),
  us("estimated-tax-calculator", "us-taxes", "Quarterly Estimated Tax Calculator", "Your 2026 quarterly payments and the safe harbor."),
  us("state-income-tax-calculator", "us-taxes", "State Income Tax Calculator", "2026 income tax in all 50 states and DC, side by side."),
  us("child-tax-credit-calculator", "us-taxes", "Child Tax Credit Calculator", "The $2,200 credit, the refundable part and the phase-out."),
  us("earned-income-credit-calculator", "us-taxes", "Earned Income Credit Calculator", "Your 2026 EITC by income, filing status and children."),
  us("hourly-paycheck-calculator", "us-taxes", "Hourly Paycheck Calculator", "Take-home pay from your hourly rate and hours."),
  us("raise-calculator", "us-taxes", "Pay Raise Calculator", "A raise in dollars, percent and take-home pay."),
  us("payroll-tax-calculator", "us-taxes", "Employer Payroll Tax Calculator", "What an employee really costs: FICA, FUTA and SUTA."),
  us("estate-tax-calculator", "us-taxes", "Estate Tax Calculator", "Federal estate tax with the $15 million exemption."),
  us("1099-vs-w2-calculator", "us-taxes", "1099 vs W-2 Calculator", "Compare a contractor rate with a salaried job."),

  // ── US: Mortgages & Housing ────────────────────────────────────────────
  us("mortgage-calculator", "us-housing", "Mortgage Calculator", "Monthly payment with property tax, insurance, PMI and HOA.", true),
  us("mortgage-affordability", "us-housing", "Home Affordability Calculator", "How much house you can afford on your income."),
  us("refinance-calculator", "us-housing", "Refinance Calculator", "Monthly savings, closing costs and the break-even point."),
  us("rent-affordability", "us-housing", "Rent Affordability Calculator", "How much rent you can afford on your income."),
  us("amortization-calculator", "us-housing", "Amortization Calculator", "A full payment schedule: interest, principal and balance.", true),
  us("mortgage-payoff-calculator", "us-housing", "Mortgage Payoff Calculator", "Pay off your mortgage early with extra payments."),
  us("heloc-calculator", "us-housing", "HELOC Calculator", "How much you can borrow and the draw and repayment payments."),
  us("home-equity-loan-calculator", "us-housing", "Home Equity Loan Calculator", "Borrowing power and payment on a home equity loan."),
  us("closing-cost-calculator", "us-housing", "Closing Cost Calculator", "Lender fees, title, taxes and prepaids at closing."),
  us("property-tax-calculator", "us-housing", "Property Tax Calculator", "Your property tax by state, with exemptions."),
  us("rent-vs-buy-calculator", "us-housing", "Rent vs Buy Calculator", "Is buying or renting cheaper over the years you stay?"),
  us("down-payment-calculator", "us-housing", "Down Payment Calculator", "How much to put down and how long to save it."),
  us("fha-loan-calculator", "us-housing", "FHA Loan Calculator", "FHA payment with upfront and annual mortgage insurance."),
  us("va-loan-calculator", "us-housing", "VA Loan Calculator", "VA payment with the funding fee and no PMI."),
  us("mortgage-points-calculator", "us-housing", "Mortgage Points Calculator", "Is buying down your rate worth it? Break-even month."),
  us("rental-property-calculator", "us-housing", "Rental Property Calculator", "Cash flow, cap rate and cash-on-cash return."),
  us("home-sale-proceeds-calculator", "us-housing", "Home Sale Proceeds Calculator", "What you walk away with after selling your home."),

  // ── US: Loans & Debt ───────────────────────────────────────────────────
  us("auto-loan-calculator", "us-loans", "Auto Loan Calculator", "Car payment with sales tax, fees, trade-in and down payment.", true),
  us("loan-calculator", "us-loans", "Loan Calculator", "Payment and total interest on a personal or any fixed loan."),
  us("credit-card-payoff", "us-loans", "Credit Card Payoff Calculator", "How long to clear a card and the interest it costs."),
  us("student-loan-calculator", "us-loans", "Student Loan Calculator", "Monthly payment, payoff date and the cost of paying extra."),
  us("debt-to-income-ratio", "us-loans", "Debt-to-Income Ratio Calculator", "Your DTI as lenders see it, front-end and back-end."),
  us("debt-payoff-calculator", "us-loans", "Debt Payoff Calculator", "Snowball vs avalanche: which clears your debts sooner."),
  us("personal-loan-calculator", "us-loans", "Personal Loan Calculator", "Payment, APR and total cost with an origination fee."),
  us("car-lease-calculator", "us-loans", "Car Lease Calculator", "Monthly lease payment from cap cost, residual and money factor."),
  us("car-affordability-calculator", "us-loans", "Car Affordability Calculator", "How much car you can afford on your income."),
  us("debt-consolidation-calculator", "us-loans", "Debt Consolidation Calculator", "Will one loan save you money over your current debts?"),
  us("balance-transfer-calculator", "us-loans", "Balance Transfer Calculator", "Savings from a 0% card after the transfer fee."),
  us("apr-calculator", "us-loans", "APR Calculator", "The true APR of a loan once fees are included."),
  us("simple-interest-calculator", "us-loans", "Simple Interest Calculator", "Interest on a loan or deposit without compounding."),
  us("business-loan-calculator", "us-loans", "Business Loan Calculator", "Payments on term loans and SBA 7(a) loans."),
  us("credit-card-interest-calculator", "us-loans", "Credit Card Interest Calculator", "How much interest your card charges each month."),
  us("loan-comparison-calculator", "us-loans", "Loan Comparison Calculator", "Compare two loan offers side by side."),

  // ── US: Savings & Retirement ───────────────────────────────────────────
  us("401k-calculator", "us-savings", "401(k) Calculator", "Your 401(k) at retirement with the 2026 limits and employer match.", true),
  us("roth-ira-calculator", "us-savings", "Roth IRA Calculator", "Tax-free growth, the 2026 limit and income phase-out."),
  us("retirement-calculator", "us-savings", "Retirement Calculator", "Are you on track, and how much to save each month?"),
  us("compound-interest-calculator", "us-savings", "Compound Interest Calculator", "How savings and investments grow with monthly deposits.", true),
  us("cd-calculator", "us-savings", "CD Calculator", "Interest and maturity value on a certificate of deposit."),
  us("savings-goal-calculator", "us-savings", "Savings Goal Calculator", "How much to save each month to reach your goal."),
  us("social-security-calculator", "us-savings", "Social Security Calculator", "Your benefit at 62, full retirement age and 70.", true),
  us("rmd-calculator", "us-savings", "RMD Calculator", "Your required minimum distribution for 2026."),
  us("ira-calculator", "us-savings", "Traditional IRA Calculator", "Deductible contributions, growth and tax at withdrawal."),
  us("roth-conversion-calculator", "us-savings", "Roth Conversion Calculator", "Tax now on a conversion vs tax-free withdrawals later."),
  us("529-plan-calculator", "us-savings", "529 College Savings Calculator", "How much to save for college each month."),
  us("hsa-calculator", "us-savings", "HSA Calculator", "Tax savings and growth in a health savings account."),
  us("investment-calculator", "us-savings", "Investment Calculator", "Growth of a lump sum and monthly investing after fees."),
  us("inflation-calculator", "us-savings", "Inflation Calculator", "What a dollar from any year is worth today (CPI)."),
  us("annuity-calculator", "us-savings", "Annuity Calculator", "Income from an annuity, or the cost of one."),
  us("retirement-withdrawal-calculator", "us-savings", "Retirement Withdrawal Calculator", "How long your savings last at a given withdrawal."),
  us("fire-calculator", "us-savings", "FIRE Calculator", "When you can retire early on your savings rate."),
  us("emergency-fund-calculator", "us-savings", "Emergency Fund Calculator", "How big your emergency fund should be, and how to build it."),
  us("net-worth-calculator", "us-savings", "Net Worth Calculator", "Assets minus debts, compared with your age group."),
  us("dividend-calculator", "us-savings", "Dividend Calculator", "Dividend income and growth with reinvestment."),
  us("high-yield-savings-calculator", "us-savings", "High-Yield Savings Calculator", "Interest on a high-yield account vs a regular one."),
];

/**
 * A topic's calculators. The UK's Everyday Life topic and the shared Everyday
 * topic also list the Everyday calculators.
 */
export function getCalculatorsByCategory(slug: AnyCategory): Calculator[] {
  const own = CALCULATORS.filter((c) => c.category === slug);
  return slug === "life" ? [...CALCULATORS.filter((c) => c.category === "everyday"), ...own] : own;
}

/** A country's calculators (UK or US), without the shared Everyday ones. */
export function getCalculatorsByCountry(country: Country): Calculator[] {
  return CALCULATORS.filter((c) => c.country === country);
}

/** Drop the redundant trailing "Calculator" from a tool title for display. */
export function shortTitle(title: string): string {
  return title.replace(/\s+Calculator$/i, "");
}

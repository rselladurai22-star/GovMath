/**
 * Master registry: every calculator on SumAtlas.
 *
 * Since 26 November 2026 the site covers one sector, UK benefits, family,
 * renting and student money: 31 calculators in three topics, each listed on
 * its topic page at /uk/<topic>. A calculator's address is /uk/<topic>/<slug>,
 * except a few that moved topic in the focus and kept their old address
 * (`href` is then given explicitly). Single source of truth for the header
 * menus and search, the home and topic pages, the /calculators index and the
 * sitemap.
 *
 * To add a calculator, build its page and add an entry below.
 */

export type CategorySlug = "benefits" | "property" | "students";
export type Country = "uk";

export type Calculator = {
  slug: string;
  href: string;
  title: string;
  blurb: string;
  category: CategorySlug;
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
    slug: "benefits",
    title: "Benefits & family",
    href: "/uk/benefits",
    tagline: "Universal Credit, Child Benefit, childcare, parental pay, PIP.",
    description:
      "Estimate what you can claim from the DWP, HMRC and your council, with the 2026/27 rates. No jargon, just plain answers.",
  },
  {
    slug: "property",
    title: "Renting & council tax",
    href: "/uk/property",
    tagline: "Rent rises, deposits, part-month rent, council tax.",
    description:
      "Check a rent increase, a deposit deduction or a part-month rent, and work out your council tax bill and discounts.",
  },
  {
    slug: "students",
    title: "Students",
    href: "/uk/students",
    tagline: "Maintenance loans, SAAS, Welsh finance, Plan 2, council tax.",
    description:
      "Student finance in England, Scotland and Wales, Plan 2 loan repayments and the council tax rules every UK student should know.",
  },
];

const live = (
  slug: string,
  category: CategorySlug,
  title: string,
  blurb: string,
  popular = false,
  href = `/uk/${category}/${slug}`,
): Calculator => ({
  slug,
  href,
  title,
  blurb,
  category,
  country: "uk",
  popular,
});

export const CALCULATORS: Calculator[] = [
  // ── Benefits & family ───────────────────────────────────────────────────
  live("universal-credit-taper", "benefits", "UC Earnings Taper Calculator", "How much UC you lose for every £ you earn.", true),
  live("universal-credit", "benefits", "Universal Credit Estimator", "Estimate your monthly Universal Credit award."),
  live("local-housing-allowance", "benefits", "Local Housing Allowance", "LHA rates by property size and region.", true),
  live("new-style-esa", "benefits", "New Style ESA Calculator", "Employment and Support Allowance if illness limits work."),
  live("new-style-jsa", "benefits", "New Style JSA Calculator", "Jobseeker's Allowance from your National Insurance record."),
  live("uc-advance", "benefits", "UC Advance Repayment Calculator", "What a Universal Credit advance takes from each payment."),
  live("benefit-cap", "benefits", "Benefit Cap Checker", "Whether the benefit cap cuts your Universal Credit."),
  live("benefits-checker", "benefits", "Benefits Eligibility Checker", "See which benefits you are likely to get, in one go."),
  live("pip-points", "benefits", "PIP Points Self-Check", "Daily living + mobility scores against thresholds."),
  live("child-benefit", "benefits", "Child Benefit Calculator", "Weekly Child Benefit by number of children.", true),
  live("free-childcare-hours", "benefits", "Free Childcare Hours Checker", "15 or 30 free hours — eligibility by age and income.", true),
  live("tax-free-childcare", "benefits", "Tax-Free Childcare Calculator", "Up to £2,000/year per child top-up: see your match."),
  live("high-income-child-benefit", "benefits", "High Income Child Benefit Charge", "Clawback above £60,000 — explained."),
  live("maternity-pay", "benefits", "Maternity Pay Calculator", "SMP across the 39-week period."),
  live("pension-credit", "benefits", "Pension Credit Estimator", "Top-up for low-income pensioners."),
  live("carers-earnings", "benefits", "Carer's Allowance Earnings Check", "Stay within the weekly limit to keep your claim."),
  live("council-tax-reduction", "benefits", "Council Tax Reduction Calculator", "Means-tested help with your council tax bill."),
  live("housing-benefit", "benefits", "Housing Benefit Calculator", "Weekly help with rent for pensioners and supported housing."),
  live("healthy-start", "benefits", "Healthy Start Calculator", "Who qualifies, the weekly card payments and free vitamins.", false, "/uk/life/healthy-start"),
  live("pro-rata", "benefits", "Pro Rata Salary Calculator", "Part-time pay: a full-time salary for your hours or days.", false, "/uk/tax-and-salary/pro-rata"),
  live("premium-bonds", "benefits", "Premium Bonds Return", "Household savings: expected vs guaranteed returns.", false, "/uk/investing/premium-bonds"),
  // ── Renting & council tax ───────────────────────────────────────────────
  live("pro-rata-rent", "property", "Pro-Rata Rent Calculator", "Daily rent for a broken move-in month.", true, "/uk/life/pro-rata-rent"),
  live("single-person-discount", "property", "Single Person Council Tax Discount", "Apply the 25% solo-occupant rebate."),
  live("council-tax-bands", "property", "Council Tax Bands Calculator", "Your bill for each band, and how to find your own band."),
  live("rent-increase", "property", "Rent Increase Checker", "Is your rent rise legal, and what will it cost you?"),
  live("deposit-return", "property", "Tenancy Deposit Return Calculator", "The deposit cap, fair deductions and what you should get back."),
  // ── Students ────────────────────────────────────────────────────────────
  live("maintenance-loan", "students", "Maintenance Loan Estimator", "Support based on household income.", true),
  live("saas-funding", "students", "SAAS Funding Calculator", "Scottish bursary and student loan by household income."),
  live("student-council-tax", "students", "Student Council Tax Exemption", "Who counts as a full-time student — and who doesn't."),
  live("welsh-student-finance", "students", "Welsh Student Finance Calculator", "Learning Grant and Maintenance Loan for Welsh students."),
  live("plan-2-student-loan", "students", "Plan 2 Student Loan Calculator", "Post-2012 loan repayments."),
];

/** A topic's calculators. */
export function getCalculatorsByCategory(slug: CategorySlug): Calculator[] {
  return CALCULATORS.filter((c) => c.category === slug);
}

/** Drop the redundant trailing "Calculator" from a tool title for display. */
export function shortTitle(title: string): string {
  return title.replace(/\s+Calculator$/i, "");
}

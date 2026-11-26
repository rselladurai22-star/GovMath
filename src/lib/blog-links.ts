/**
 * Which Guides articles each calculator points to ("Read next", under the
 * FAQ on the calculator page). Until November 2026 no calculator linked to
 * any article, so most articles were reachable only from /blog, which kept
 * them out of Google's view of what matters on the site.
 *
 * Keep each list short (1 or 2 articles that really answer the next
 * question someone on that calculator has). Slugs must exist in BLOG_POSTS
 * (checked in blog-links.test.ts).
 */
export const RELATED_POSTS: Record<string, string[]> = {
  // Tax and pay
  "/uk/tax-and-salary/tax-bracket-checker": ["100k-tax-trap", "marriage-allowance-explained"],
  "/uk/tax-and-salary/national-insurance": ["uk-take-home-pay-explained"],
  "/uk/tax-and-salary/tax-code-decoder": ["uk-take-home-pay-explained", "marriage-allowance-explained"],
  "/uk/tax-and-salary/emergency-tax": ["uk-take-home-pay-explained"],
  "/uk/tax-and-salary/pay-rise": ["100k-tax-trap", "uk-take-home-pay-explained"],
  "/uk/tax-and-salary/reverse-take-home": ["uk-take-home-pay-explained"],
  "/uk/tax-and-salary/overtime": ["uk-take-home-pay-explained"],
  "/uk/tax-and-salary/salary-sacrifice": ["salary-sacrifice-worth-it", "100k-tax-trap"],
  "/uk/tax-and-salary/marriage-allowance": ["marriage-allowance-explained"],
  "/uk/investing/pension-tax-relief": ["100k-tax-trap", "salary-sacrifice-worth-it"],
  "/uk/investing/workplace-pension": ["salary-sacrifice-worth-it"],
  "/uk/vehicles/ev-salary-sacrifice": ["salary-sacrifice-worth-it"],
  "/uk/benefits/tax-free-childcare": ["100k-tax-trap"],
  "/uk/benefits/high-income-child-benefit": ["100k-tax-trap"],
  "/uk/benefits/child-benefit": ["100k-tax-trap"],
  // Students
  "/uk/students/student-loan-repayment": ["plan-2-vs-plan-5-student-loans"],
  "/uk/students/plan-2-student-loan": ["plan-2-vs-plan-5-student-loans"],
  "/uk/students/plan-5-student-loan": ["plan-2-vs-plan-5-student-loans"],
  "/uk/students/degree-cost": ["plan-2-vs-plan-5-student-loans"],
  "/uk/students/maintenance-loan": ["plan-2-vs-plan-5-student-loans"],
  // Property
  "/uk/property/first-time-buyer": ["first-time-buyer-costs"],
  "/uk/property/stamp-duty-england": ["first-time-buyer-costs"],
  "/uk/property/lbtt-scotland": ["first-time-buyer-costs"],
  "/uk/property/ltt-wales": ["first-time-buyer-costs"],
  "/uk/property/mortgage-affordability": ["first-time-buyer-costs"],
  "/uk/property/moving-house-budget": ["first-time-buyer-costs"],
  // Self-employed
  "/uk/business/allowable-expenses": ["self-employed-expenses-what-you-can-claim"],
  "/uk/business/sole-trader-tax": ["self-employed-expenses-what-you-can-claim"],
  "/uk/business/business-mileage": ["self-employed-expenses-what-you-can-claim"],
  "/uk/business/payment-on-account": ["self-employed-expenses-what-you-can-claim"],
  // United States
  "/us/taxes/overtime-calculator": ["no-tax-on-overtime-and-tips-2026"],
  "/us/taxes/tip-calculator": ["no-tax-on-overtime-and-tips-2026"],
  "/us/taxes/paycheck-calculator": ["no-tax-on-overtime-and-tips-2026"],
  "/us/taxes/hourly-paycheck-calculator": ["no-tax-on-overtime-and-tips-2026"],
  "/us/taxes/federal-income-tax": ["no-tax-on-overtime-and-tips-2026"],
};

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
  // Universal Credit and work
  "/uk/benefits/universal-credit-taper": ["universal-credit-pay-rise-what-you-keep"],
  "/uk/benefits/universal-credit": ["universal-credit-pay-rise-what-you-keep"],
  "/uk/benefits/benefit-cap": ["universal-credit-pay-rise-what-you-keep"],
  "/uk/tax-and-salary/pro-rata": ["universal-credit-pay-rise-what-you-keep", "100k-tax-trap"],
  // Families
  "/uk/benefits/tax-free-childcare": ["100k-tax-trap", "universal-credit-pay-rise-what-you-keep"],
  "/uk/benefits/free-childcare-hours": ["100k-tax-trap"],
  "/uk/benefits/high-income-child-benefit": ["100k-tax-trap"],
  "/uk/benefits/child-benefit": ["100k-tax-trap"],
  // Students
  "/uk/students/plan-2-student-loan": ["plan-2-vs-plan-5-student-loans"],
  "/uk/students/maintenance-loan": ["plan-2-vs-plan-5-student-loans"],
  "/uk/students/welsh-student-finance": ["plan-2-vs-plan-5-student-loans"],
};

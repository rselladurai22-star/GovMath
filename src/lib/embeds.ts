/**
 * Calculators other sites can embed (src/app/(embed)/embed/…). Each embed
 * page shows only the calculator; the code we hand out also carries a plain
 * "Calculator by SumAtlas" link in the host page itself, which is the link
 * search engines see. Add a path here and its studio in
 * src/app/(embed)/embed/studios.tsx to make another calculator embeddable.
 */
export const EMBEDS = [
  "/uk/benefits/universal-credit-taper",
  "/uk/benefits/universal-credit",
  "/uk/benefits/local-housing-allowance",
  "/uk/benefits/benefit-cap",
  "/uk/benefits/child-benefit",
  "/uk/benefits/free-childcare-hours",
  "/uk/students/maintenance-loan",
  "/uk/students/plan-2-student-loan",
  "/uk/students/plan-5-student-loan",
  "/uk/life/pro-rata-rent",
  "/uk/property/single-person-discount",
  "/uk/property/council-tax-bands",
  "/uk/investing/premium-bonds",
  "/uk/tax-and-salary/bonus-tax",
  "/us/taxes/paycheck-calculator",
  "/us/housing/mortgage-calculator",
  "/us/savings/compound-interest-calculator",
] as const;

export const SITE_URL = "https://sumatlas.com";

export const isEmbeddable = (href: string) => (EMBEDS as readonly string[]).includes(href);

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** The HTML a site owner pastes in: the frame, a visible credit link and the auto-height script. */
export function embedCode(href: string, title: string): string {
  return [
    `<iframe src="${SITE_URL}/embed${href}" title="${escape(title)}" data-sumatlas width="100%" height="900" style="border:0;max-width:760px" loading="lazy" allow="clipboard-write"></iframe>`,
    `<p style="font-size:13px">Calculator by <a href="${SITE_URL}${href}">SumAtlas</a></p>`,
    `<script async src="${SITE_URL}/embed.js"></script>`,
  ].join("\n");
}

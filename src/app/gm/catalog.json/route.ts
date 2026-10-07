import { CATEGORIES, EVERYDAY, US_CATEGORIES, getCalculatorsByCategory, type Calculator } from "@/lib/calculators";
import { categoryLabel } from "@/gm/catalog";

export const dynamic = "force-static";

/** US calculators carry "(US)" in search so they stand apart from UK ones with similar names. */
const tool = (t: Calculator) => ({ url: t.href, title: t.country === "us" ? `${t.title} (US)` : t.title, desc: t.blurb });

/**
 * The calculator catalogue used by the header search in the approved design
 * (src/gm/scripts/axis.js), built from the live calculator list so every
 * calculator can be found: UK topics, US topics and the Everyday topic.
 */
export function GET() {
  return Response.json([
    ...CATEGORIES.map((c) => ({
      slug: c.slug,
      title: categoryLabel(c.slug),
      desc: c.tagline,
      tools: getCalculatorsByCategory(c.slug)
        .filter((t) => t.country === "uk")
        .map(tool),
    })),
    ...US_CATEGORIES.map((c) => ({ slug: c.slug, title: `${c.title} (US)`, desc: c.tagline, tools: getCalculatorsByCategory(c.slug).map(tool) })),
    { slug: EVERYDAY.slug, title: EVERYDAY.title, desc: EVERYDAY.tagline, tools: getCalculatorsByCategory("everyday").map(tool) },
  ]);
}

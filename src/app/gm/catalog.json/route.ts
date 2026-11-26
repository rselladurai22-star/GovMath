import { CATEGORIES, getCalculatorsByCategory, type Calculator } from "@/lib/calculators";
import { categoryLabel } from "@/gm/catalog";

export const dynamic = "force-static";

const tool = (t: Calculator) => ({ url: t.href, title: t.title, desc: t.blurb });

/**
 * The calculator catalogue used by the header search in the approved design
 * (src/gm/scripts/axis.js), built from the live calculator list so every
 * calculator can be found.
 */
export function GET() {
  return Response.json(
    CATEGORIES.map((c) => ({ slug: c.slug, title: categoryLabel(c.slug), desc: c.tagline, tools: getCalculatorsByCategory(c.slug).map(tool) })),
  );
}

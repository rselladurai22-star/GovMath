import { CATEGORIES, getCalculatorsByCategory } from "@/lib/calculators";
import { CAT } from "@/components/category-style";

export const dynamic = "force-static";

/**
 * The calculator catalogue used by the header search in the approved design
 * (src/gm/scripts/axis.js), built from the live calculator list so every
 * calculator can be found.
 */
export function GET() {
  return Response.json(
    CATEGORIES.map((c) => ({
      slug: c.slug,
      title: CAT[c.slug].label,
      desc: c.tagline,
      tools: getCalculatorsByCategory(c.slug).map((t) => ({ url: t.href, title: t.title, desc: t.blurb })),
    })),
  );
}

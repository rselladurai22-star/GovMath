import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("property");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function PropertyLandingPage() {
  return (
    <CategoryLanding
      slug="property"
      heroBadge="UK property · 2025/26"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            From offer to keys
          </h2>
          <p>
            Buying a home in the UK comes with a lot of surprise numbers —
            Stamp Duty bands, Council Tax, mortgage stress tests, deposit
            multiples. Use these calculators to size each one up before you
            sign anything.
          </p>
          <p>
            Most of the figures are England-specific. Scotland uses LBTT and
            Wales uses LTT — both have dedicated calculators in this section.
          </p>
        </>
      }
    />
  );
}

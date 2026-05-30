import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("business");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function BusinessLandingPage() {
  return (
    <CategoryLanding
      slug="business"
      heroBadge="Sole traders · Ltd companies · 2025/26"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            Tools for the self-employed
          </h2>
          <p>
            Working for yourself means doing your own maths — Self-Assessment,
            VAT returns, IR35 status, payments on account. These calculators
            give you straight answers without an accountant’s clock
            running.
          </p>
        </>
      }
    />
  );
}

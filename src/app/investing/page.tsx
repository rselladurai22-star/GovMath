import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("investing");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function InvestingLandingPage() {
  return (
    <CategoryLanding
      slug="investing"
      heroBadge="UK pensions & investments · 2025/26"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            Planning for the long term
          </h2>
          <p>
            The State Pension covers the basics; the rest is up to you and
            your employer. ISAs shelter growth from tax, while general
            accounts don’t. These tools help you forecast both — and
            decide how much to put away.
          </p>
          <p>
            We update these calculators each tax year to match HMRC’s
            latest allowances, ISA limits and the State Pension uplift.
          </p>
        </>
      }
    />
  );
}

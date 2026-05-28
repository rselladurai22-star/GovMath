import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("students");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function StudentsLandingPage() {
  return (
    <CategoryLanding
      slug="students"
      heroBadge="UK student loans & support"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            Loans, maintenance and council tax
          </h2>
          <p>
            UK student loans are unlike any other debt — they&apos;re
            effectively a graduate tax with a fixed lifespan. Use these tools
            to plan repayments, estimate maintenance support and check
            council-tax exemptions.
          </p>
        </>
      }
    />
  );
}

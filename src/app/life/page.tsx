import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("life");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function LifeLandingPage() {
  return (
    <CategoryLanding
      slug="life"
      heroBadge="Everyday admin & milestones"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            The small but important calculators
          </h2>
          <p>
            Percentages, dates, inheritance tax, BMI, bank holidays — the kind
            of quick numbers you reach for once in a blue moon, but absolutely
            need when you do.
          </p>
        </>
      }
    />
  );
}

import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("vehicles");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function VehiclesLandingPage() {
  return (
    <CategoryLanding
      slug="vehicles"
      heroBadge="UK driving & motoring"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            The real cost of getting around
          </h2>
          <p>
            From VED bands to ULEZ charges, EV salary-sacrifice schemes to
            commuting comparisons — every meaningful motoring number, in one
            place.
          </p>
        </>
      }
    />
  );
}

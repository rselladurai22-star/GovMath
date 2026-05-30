import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("benefits");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK)`,
  description: category.description,
};

export default function BenefitsLandingPage() {
  return (
    <CategoryLanding
      slug="benefits"
      heroBadge="DWP & HMRC rules · 2025/26"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            Benefits in plain English
          </h2>
          <p>
            The benefits system has dozens of rules, taper rates and earnings
            disregards. Our calculators strip away the jargon and show you
            roughly what you can claim — and what happens when your
            circumstances change.
          </p>
          <p>
            These are estimates. For an official figure, you’ll need to
            apply through{" "}
            <a
              href="https://www.gov.uk"
              className="text-primary underline"
              rel="noopener"
            >
              GOV.UK
            </a>{" "}
            — but use these tools to check whether it’s worth your time
            first.
          </p>
        </>
      }
    />
  );
}

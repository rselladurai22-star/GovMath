import type { Metadata } from "next";
import CategoryLanding from "@/components/CategoryLanding";
import { getCategory } from "@/lib/calculators";

const category = getCategory("tax-and-salary");

export const metadata: Metadata = {
  title: `${category.title} Calculators (UK, 2025/26)`,
  description: category.description,
};

export default function TaxAndSalaryLandingPage() {
  return (
    <CategoryLanding
      slug="tax-and-salary"
      heroBadge="UK 2025/26 tax year"
      longCopy={
        <>
          <h2 className="text-2xl font-bold text-primary-dark">
            How UK employment tax actually works
          </h2>
          <p>
            Most people pay tax automatically through PAYE and never see the
            maths. Our calculators show you what HMRC is doing on your behalf
            — band by band — so you can spot mistakes, plan ahead, and make
            confident financial decisions.
          </p>
          <p>
            Every figure here is for the <strong>2025/26 tax year</strong> in
            England, Wales &amp; Northern Ireland. Scotland-specific
            calculators are in the section below.
          </p>
        </>
      }
    />
  );
}

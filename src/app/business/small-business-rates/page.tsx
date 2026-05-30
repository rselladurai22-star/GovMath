import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SmallBusinessRatesCalculator from "./SmallBusinessRatesCalculator";

export const metadata: Metadata = {
  title: "Small Business Rates Relief Calculator (England 2025/26)",
  description: "Work out your business rates bill and the Small Business Rate Relief you’re entitled to in England.",
};

export default function SmallBusinessRatesPage() {
  return (
    <CalculatorShell
      category="Business"
      updatedLabel="2025/26 multipliers"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/business", label: "Business" },
        { href: "/business/small-business-rates", label: "Small Business Rates" },
      ]}
      title="Small Business Rates Relief Calculator"
      intro="Most shops, offices and workshops pay business rates based on their rateable value. Small Business Rate Relief can wipe the bill entirely if your only property has an RV of £12,000 or less."
      calculator={<SmallBusinessRatesCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Gross rates = rateable value × multiplier (49.9p for small premises, 54.6p for standard).
              If you only occupy one property, we apply SBRR: 100% off below £12,000, sliding to 0% at £15,000.
            </p>
          }
          officialRules={
            <ul>
              <li>Rateable value is set every 5 years by the VOA — current list from 1 April 2023.</li>
              <li>SBRR is only for occupied properties used wholly or mainly for business.</li>
              <li>You can keep SBRR if you take a second property worth less than £2,899 RV (and total RV under £20,000 / £28,000 in London).</li>
              <li>Charities get 80% mandatory relief; rural premises get further reliefs.</li>
            </ul>
          }
          pitfalls={[
            { title: "You have to apply", body: "SBRR is not automatic. Even though it’s the same form every year, councils don’t reapply it without a request." },
            { title: "Empty rates kick in fast", body: "Empty office/shop pays full rates after 3 months (6 for industrial). Plan exits to avoid the cliff." },
            { title: "Working from home", body: "If part of your home is used exclusively for business, the VOA can split it and assign rates — usually a bad outcome." },
          ]}
          faqs={[
            { question: "What if my rateable value changes?", answer: "Bills update next 1 April. You can challenge an RV via the ”Check, Challenge, Appeal” process on gov.uk." },
            { question: "Are pubs and shops on the high street treated differently?", answer: "Yes — Retail, Hospitality & Leisure Relief currently gives a 75% discount on bills (capped at £110k per business) for 2024/25." },
            { question: "Does this work in Scotland/Wales/NI?", answer: "No — each nation has its own scheme. The Small Business Bonus Scheme (Scotland) and Small Business Rate Relief (Wales) work differently." },
          ]}
          disclaimer="England only, 2025/26 multipliers. Always confirm with your local billing authority before relying on a figure."
        />
      }
    />
  );
}

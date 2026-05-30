import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import LocalHousingAllowanceCalculator from "./LocalHousingAllowanceCalculator";

export const metadata: Metadata = {
  title: "Local Housing Allowance Calculator (UK 2025/26)",
  description: "Estimate the LHA cap for your household — what Universal Credit will cover towards private rent in your area.",
};

export default function LocalHousingAllowancePage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="April 2024 freeze"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/local-housing-allowance", label: "Local Housing Allowance" },
      ]}
      title="Local Housing Allowance Calculator"
      intro="LHA is the cap on the housing element of Universal Credit for private renters. It depends on your area and how many bedrooms your household qualifies for."
      calculator={<LocalHousingAllowanceCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We work out your bedroom entitlement under the LHA size criteria, then look up the cap for the broad rental market area band. Your weekly help is the lower of your actual rent and the cap.
            </p>
          }
          officialRules={
            <ul>
              <li>Couple = 1 bedroom. Each other adult gets 1 bedroom.</li>
              <li>Two children under 10 share a bedroom regardless of gender.</li>
              <li>Two same-sex children 10–15 share; mixed-sex 10+ each get their own.</li>
              <li>Anyone 16+ gets their own bedroom.</li>
              <li>Single under-35 generally gets the shared accommodation rate only.</li>
            </ul>
          }
          pitfalls={[
            { title: "BRMA boundaries are weird", body: "Look up your postcode at gov.uk/lha-direct — neighbouring streets can fall into different BRMAs with very different caps." },
            { title: "Frozen rates", body: "LHA rates didn’t rise in April 2025 — they sit at April 2024 levels. Many areas have rents rising faster than the cap." },
            { title: "Shortfall = your problem", body: "Anything above the LHA cap comes from your standard allowance. If you can’t cover it, apply for a Discretionary Housing Payment." },
          ]}
          faqs={[
            { question: "What if my rent is below the cap?", answer: "You get your actual rent paid. The cap only kicks in when rent exceeds it." },
            { question: "Can I get a Discretionary Housing Payment?", answer: "Yes — apply at your local council for short-term top-ups when LHA doesn’t stretch. Pots are limited." },
            { question: "Does this work for social housing?", answer: "No — social tenants are subject to the bedroom tax / size criteria, not LHA. Different rules apply." },
          ]}
          disclaimer="Sample rates by area band. Always confirm the exact LHA rate for your postcode at gov.uk/lha-direct."
        />
      }
    />
  );
}

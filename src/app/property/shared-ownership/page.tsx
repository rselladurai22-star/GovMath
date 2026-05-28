import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SharedOwnershipCalculator from "./SharedOwnershipCalculator";

export const metadata: Metadata = {
  title: "Shared Ownership Calculator (UK)",
  description: "Monthly mortgage plus rent on the share of a Shared Ownership home you don&rsquo;t own yet.",
};

export default function SharedOwnershipPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="Mortgage + rent"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/shared-ownership", label: "Shared Ownership" }]}
      title="Shared Ownership Calculator"
      intro="Shared Ownership lets you buy 10–75% of a home with a mortgage, and pay subsidised rent to a housing association on the rest. Smaller deposit, but two monthly costs."
      calculator={<SharedOwnershipCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Mortgage is calculated on your share using standard amortisation. Rent is typically 2.75% of the unowned share value per year (set by the housing association — check your scheme). Total = mortgage + rent.</p>}
          officialRules={
            <ul>
              <li>Minimum share usually 10–25%; max 75%.</li>
              <li>Rent capped at 3% of unowned share, but most schemes use 2.75%.</li>
              <li>You can &lsquo;staircase&rsquo; — buy more shares over time, reducing rent.</li>
              <li>Stamp Duty: pay on the share you buy, or on the full value (one-off).</li>
            </ul>
          }
          pitfalls={[
            { title: "Service charges on top", body: "Most SO is leasehold flats with ground rent + service charge. Add £100–300/month." },
            { title: "Selling is harder", body: "Housing association has first refusal &amp; nominate buyers — can take months." },
            { title: "100% staircased? Still leasehold", body: "Unless freehold from day one, you&rsquo;ll deal with the lease forever." },
          ]}
          faqs={[
            { question: "What deposit do I need?", answer: "Usually 5–10% of the share, not the full property — making SO accessible at lower deposits." },
            { question: "Rent goes up?", answer: "Yes — usually RPI + 0.5% annually, fixed in your lease." },
          ]}
          disclaimer="Illustrative. Always check the specific scheme&rsquo;s rent formula, service charge and staircasing terms."
        />
      }
    />
  );
}

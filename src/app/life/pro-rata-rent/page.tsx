import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import ProRataRentCalculator from "./ProRataRentCalculator";

export const metadata: Metadata = {
  title: "Pro-Rata Rent Calculator (Broken Month Move-In)",
  description: "Work out the daily rent for a partial month when you move in part-way through.",
};

export default function ProRataRentPage() {
  return (
    <CalculatorShell
      category="Everyday & Life"
      updatedLabel="Utility"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/life", label: "Everyday" }, { href: "/life/pro-rata-rent", label: "Pro-Rata Rent" }]}
      title="Pro-Rata Rent Calculator"
      intro="Moving in mid-month? Most landlords charge pro-rata for the partial month, then full rent on the 1st of each month after. This works out how much that first invoice should be."
      calculator={<ProRataRentCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Daily rate = monthly rent ÷ days in that month. Multiply by number of days you&rsquo;ll be in occupation that month.</p>}
          officialRules={
            <ul>
              <li>Most ASTs use the calendar-day method (rent ÷ days in actual month).</li>
              <li>Some agents use the annual day method (rent × 12 ÷ 365 × days) — slightly different in 30 vs 31-day months.</li>
              <li>Always confirm with your AST agreement which method applies.</li>
            </ul>
          }
          pitfalls={[
            { title: "Move-in date or first-night-paid-for?", body: "Some landlords charge from the day you collect keys; others from the day the previous tenant moved out. Get it in writing." },
            { title: "Annual-day method makes Feb cheaper", body: "Using monthly × 12 ÷ 365 means February days cost the same as July days. Calendar method makes Feb days more expensive (rent ÷ 28). Argue for whichever favours you." },
          ]}
          faqs={[
            { question: "What about leap years?", answer: "If using annual method, divide by 366 in a leap year." },
            { question: "Does deposit get pro-rated?", answer: "No — deposit is a fixed amount regardless of move-in date. Capped at 5 weeks&rsquo; rent under Tenant Fees Act 2019." },
          ]}
          disclaimer="Calendar-day method shown. Check your tenancy for the agreed approach."
        />
      }
    />
  );
}

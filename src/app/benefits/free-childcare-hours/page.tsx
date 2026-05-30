import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FreeChildcareCalculator from "./FreeChildcareCalculator";

export const metadata: Metadata = {
  title: "Free Childcare Hours Calculator (England 2025/26)",
  description: "Check whether your child qualifies for 15 or 30 hours of funded childcare, and what those hours are worth at your nursery rate.",
};

export default function FreeChildcareHoursPage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="September 2025 expansion"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/free-childcare-hours", label: "Free Childcare Hours" },
      ]}
      title="Free Childcare Hours Calculator"
      intro="From September 2025 working parents in England can get 30 hours of funded childcare from when their baby is 9 months old. We map your child&rsquo;s age and your work status to the right entitlement."
      calculator={<FreeChildcareCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We match your child&rsquo;s age and your work status to the four-tier entitlement: 30h for working parents from 9 months, 15h for low-income 2-year-olds, 15h universal for 3–4 year olds, 30h for working 3–4 year olds.
            </p>
          }
          officialRules={
            <ul>
              <li>Working = each parent earns ≥ £166/week (~16h × NLW) and &lt; £100,000/year.</li>
              <li>Funded hours apply 38 weeks/year (term time) by default.</li>
              <li>Can be &quot;stretched&quot; to ~22 hours/week across 51 weeks if your nursery supports it.</li>
              <li>Apply via childcarechoices.gov.uk — get an 11-digit code each quarter.</li>
            </ul>
          }
          pitfalls={[
            { title: "Code re-validation", body: "Working-parent codes must be reconfirmed every 3 months. Miss it and the nursery has a 4-week grace period — then bills you the full rate." },
            { title: "&lsquo;Free&rsquo; isn&rsquo;t always free", body: "Nurseries often add charges for meals, nappies and consumables on top of funded hours. Government rates don&rsquo;t cover their costs." },
            { title: "Income spikes lose entitlement", body: "Cross £100k taxable income (per parent) and the 30h vanishes. Salary sacrifice or pension top-ups can keep you under." },
          ]}
          faqs={[
            { question: "Can grandparents claim?", answer: "Only if they&rsquo;re the legal parents/guardians. They can register as informal childcare under Tax-Free Childcare though." },
            { question: "Does this work in Scotland/Wales/NI?", answer: "No — each nation has its own scheme. Scotland offers 1,140 funded hours for 3–4 year olds (also some 2 year olds)." },
            { question: "What if I&rsquo;m self-employed?", answer: "Self-employed parents qualify on the same earnings basis. First-year start-ups get a 12-month exemption from the minimum earnings test." },
          ]}
          disclaimer="England rules only. Always confirm eligibility on childcarechoices.gov.uk and check your nursery&rsquo;s funding agreement."
        />
      }
    />
  );
}

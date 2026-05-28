import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import AffordabilityCalculator from "./AffordabilityCalculator";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator (UK Lender Multiples)",
  description: "How much UK lenders might offer you, based on income multiples and your deposit.",
};

export default function AffordabilityPage() {
  return (
    <CalculatorShell
      category="Property"
      updatedLabel="Indicative"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Property" }, { href: "/property/mortgage-affordability", label: "Affordability" }]}
      title="Mortgage Affordability Calculator"
      intro="UK lenders cap most mortgages at around 4.5× household income, with some going up to 5.5× under newer FCA stress-test rules. This is a fast first-pass."
      calculator={<AffordabilityCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Max loan = household income × multiplier. Max purchase price = max loan + deposit. We don&rsquo;t deduct outgoings here — real lender affordability scoring includes credit-card balances, school fees, childcare and pension contributions.</p>}
          officialRules={
            <ul>
              <li>FCA limits over-4.5× lending to 15% of any lender&rsquo;s book.</li>
              <li>Stress tests typically check repayment at 7–8% rates.</li>
              <li>First-time buyers may access higher LTI under schemes like Nationwide&rsquo;s Helping Hand.</li>
            </ul>
          }
          pitfalls={[
            { title: "Bonuses count partially", body: "Most lenders take 50–100% of guaranteed bonuses, less for irregular ones." },
            { title: "Self-employed needs 2–3 yrs accounts", body: "And lenders typically use the average net profit, not turnover." },
            { title: "Childcare kills affordability", body: "£1,500/mo of childcare can cut your max loan by £80–100k." },
          ]}
          faqs={[
            { question: "What multiple should I use?", answer: "4.5× is the common cap. Use 5.5× only for sole income over £75k or joint over £100k — and expect a stress test." },
            { question: "Does this include Stamp Duty?", answer: "No — keep an additional 3–5% in cash for SDLT, legal fees and surveys." },
          ]}
          disclaimer="Indicative only. Run a proper Decision in Principle with a broker or lender."
        />
      }
    />
  );
}

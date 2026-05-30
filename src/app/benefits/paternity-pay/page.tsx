import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PaternityCalculator from "./PaternityCalculator";

export const metadata: Metadata = {
  title: "Statutory Paternity Pay Calculator (UK 2025/26)",
  description: "Two weeks of statutory paternity pay at £187.18 or 90% of average earnings, whichever is lower.",
};

export default function PaternityPage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="2025/26"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/benefits", label: "Benefits" }, { href: "/benefits/paternity-pay", label: "Paternity Pay" }]}
      title="Statutory Paternity Pay Calculator"
      intro="SPP is paid for up to 2 weeks at the lower of £187.18 per week or 90% of your average weekly earnings."
      calculator={<PaternityCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>HMRC sets the flat rate (£187.18/week from April 2025). You get 90% of your average weekly earnings (AWE) if that’s lower. From April 2024 you can take the 2 weeks separately within the first year.</p>}
          officialRules={
            <ul>
              <li>Must have 26 weeks’ service by the 15th week before the due date.</li>
              <li>AWE must be at least £125/week (lower earnings limit).</li>
              <li>Tax and NI are deducted from SPP.</li>
              <li>Adoption pay follows similar rules.</li>
            </ul>
          }
          pitfalls={[
            { title: "Notify by the 15th week", body: "You must tell your employer at least 15 weeks before the due date, in writing if asked." },
            { title: "Shared Parental Leave is different", body: "If you both qualify, SPL lets you split the mother’s maternity leave up to 50 weeks." },
            { title: "Self-employed = no SPP", body: "You may qualify for Maternity Allowance instead — but no equivalent for fathers." },
          ]}
          faqs={[
            { question: "Can I take it before the baby is born?", answer: "No — earliest is the day of birth." },
            { question: "Does my employer top it up?", answer: "Some do (occupational paternity pay). Check your contract." },
          ]}
          disclaimer="Educational. See GOV.UK for current rates and eligibility."
        />
      }
    />
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import HealthyStartCalculator from "./HealthyStartCalculator";

export const metadata: Metadata = {
  title: "Healthy Start Vouchers Calculator (UK)",
  description: "Find out how much you could get on the NHS Healthy Start scheme during pregnancy and for children under 4.",
};

export default function HealthyStartPage() {
  return (
    <CalculatorShell
      category="Everyday Life"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/life", label: "Everyday Life" },
        { href: "/life/healthy-start", label: "Healthy Start Vouchers" },
      ]}
      title="Healthy Start Vouchers"
      intro="Healthy Start is an NHS scheme for low-income pregnant women and families with children under 4. You get a prepaid card topped up weekly, plus free vitamins."
      calculator={<HealthyStartCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>£4.25/week during pregnancy, £8.50/week for each child under 1, and £4.25/week for each child aged 1–4. Loaded automatically onto a prepaid card every 4 weeks.</p>
          }
          officialRules={
            <ul>
              <li>Must be pregnant (10+ weeks) or have a child under 4.</li>
              <li>On Universal Credit with earnings under £408/month, or other qualifying benefit.</li>
              <li>Under-18 pregnant women qualify regardless of income.</li>
              <li>Apply at healthystart.nhs.uk.</li>
            </ul>
          }
          pitfalls={[
            { title: "Use it or lose it", body: "Balance not used within 16 weeks is removed from the card. Spend regularly." },
            { title: "What you can buy", body: "Plain fresh, frozen or tinned fruit and veg; plain cow&rsquo;s milk; infant formula; pulses. Not juice, smoothies, or flavoured milk." },
            { title: "Free vitamins", body: "Healthy Start also entitles you to free vitamins from NHS clinics — many parents forget to ask." },
          ]}
          faqs={[
            { question: "Where can I use the card?", answer: "Most major supermarkets, local shops and pharmacies that accept Mastercard prepaid." },
            { question: "Does the card show I&rsquo;m on benefits?", answer: "No — it looks like a normal prepaid card." },
            { question: "What if my UC income changes?", answer: "If it goes over £408/month you stop getting top-ups. Reapply if income drops back." },
          ]}
          disclaimer="Apply via healthystart.nhs.uk — never via third-party sites. The NHS does not charge."
        />
      }
    />
  );
}

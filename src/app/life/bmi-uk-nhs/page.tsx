import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BMICalculator from "./BMICalculator";

export const metadata: Metadata = {
  title: "NHS BMI Calculator (UK Adult, Higher-Risk Bands)",
  description: "Body Mass Index and NHS-recommended healthy-weight categories — with lower thresholds for higher-risk ethnic backgrounds.",
};

export default function BMIPage() {
  return (
    <CalculatorShell
      category="Everyday & Life"
      updatedLabel="NHS thresholds"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/life", label: "Everyday" }, { href: "/life/bmi-uk-nhs", label: "BMI Calculator" }]}
      title="NHS BMI Calculator"
      intro="Body Mass Index is the NHS&rsquo; quick screening for whether you&rsquo;re a healthy weight for your height. It&rsquo;s imperfect — it doesn&rsquo;t distinguish muscle from fat — but it&rsquo;s a useful first signal."
      calculator={<BMICalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>BMI = weight (kg) ÷ height² (m²). NHS thresholds for adults: 18.5 / 25 / 30. For higher-risk backgrounds, the overweight threshold drops to 23 and obese to 27.5.</p>}
          officialRules={
            <ul>
              <li>Standard: under 18.5 underweight; 18.5–24.9 healthy; 25–29.9 overweight; 30+ obese.</li>
              <li>NICE NG7 recommends lower thresholds (23 / 27.5) for South Asian, Chinese, Black African, Caribbean and Middle Eastern adults.</li>
              <li>Children, pregnant women, athletes — BMI isn&rsquo;t valid.</li>
            </ul>
          }
          pitfalls={[
            { title: "Muscular? BMI is misleading", body: "Rugby players, bodybuilders, regular gym-goers can hit &lsquo;obese&rsquo; while being healthy. Combine with waist-to-height ratio for a better picture." },
            { title: "Doesn&rsquo;t track location of fat", body: "Central (belly) fat is metabolically worse than peripheral. Waist circumference matters too — under 94cm (men) / 80cm (women) is the NHS guideline." },
            { title: "Not for under-18s", body: "Children use BMI-for-age percentiles. Talk to your GP." },
          ]}
          faqs={[
            { question: "Why the lower threshold for some backgrounds?", answer: "Research (NICE NG7) shows people of South Asian, Black African and similar heritage develop type 2 diabetes and heart disease at lower BMIs than white Europeans." },
            { question: "What's a healthy waist size?", answer: "Under half your height. Quick test: piece of string folded to your height — should reach around your waist with slack." },
          ]}
          disclaimer="Screening tool, not a diagnosis. Talk to your GP for personal advice."
        />
      }
    />
  );
}

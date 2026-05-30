import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PipPointsCalculator from "./PipPointsCalculator";

export const metadata: Metadata = {
  title: "PIP Points Self-Check (UK 2025/26)",
  description: "Estimate your PIP award by entering your daily living and mobility points against the official thresholds.",
};

export default function PipPointsPage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/pip-points", label: "PIP Points" },
      ]}
      title="PIP Points Self-Check"
      intro="PIP has two components — daily living and mobility — each scored from 12 activity descriptors. 8 points gets the standard rate, 12+ the enhanced rate. This self-check estimates your award."
      calculator={<PipPointsCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We band each component independently: 0–7 = no award, 8–11 = standard, 12+ = enhanced. We then apply the 2025/26 weekly rates: £73.90 / £110.40 for daily living, £29.20 / £77.05 for mobility.
            </p>
          }
          officialRules={
            <ul>
              <li>10 daily living activities: preparing food, eating, managing therapy, washing, dressing, etc.</li>
              <li>2 mobility activities: planning a journey, moving around.</li>
              <li>You must score against descriptors that apply &quot;safely, to an acceptable standard, repeatedly, and in a reasonable time&quot; — on the majority of days.</li>
              <li>Condition must have lasted 3 months and be expected to last 9 more.</li>
            </ul>
          }
          pitfalls={[
            { title: "Underscoring yourself", body: "PIP is about how your condition affects you on a bad day — not your best day. Many people undersell their difficulties." },
            { title: "&quot;Reliably&quot; matters", body: "If you can do something but not safely, not repeatedly, or it takes you twice as long, you score points." },
            { title: "Mandatory reconsideration", body: "Most successful PIP awards involve a mandatory reconsideration or tribunal. Don&rsquo;t give up after the first decision." },
          ]}
          faqs={[
            { question: "Does PIP affect other benefits?", answer: "PIP usually increases other benefits like Universal Credit and Housing Benefit — it&rsquo;s a passport benefit." },
            { question: "Is PIP taxable?", answer: "No — PIP is tax-free and not counted as income for most means-tested benefits." },
            { question: "Can I appeal?", answer: "Yes — ask for mandatory reconsideration within 1 month, then appeal to the tribunal. Around 70% of tribunal appeals succeed." },
          ]}
          disclaimer="Self-check estimate only. Apply at gov.uk/pip and get help from Citizens Advice or a welfare rights advisor before scoring yourself."
        />
      }
    />
  );
}

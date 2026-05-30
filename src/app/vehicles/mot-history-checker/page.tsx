import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import MotHistoryChecker from "./MotHistoryChecker";

export const metadata: Metadata = {
  title: "MOT History Checker (UK)",
  description: "Enter a UK number plate to look up the full MOT history on the official DVSA service.",
};

export default function MotHistoryPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="DVSA live data"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles" },
        { href: "/vehicles/mot-history-checker", label: "MOT History Checker" },
      ]}
      title="MOT History Checker"
      intro="Enter any UK registration and we’ll take you straight to the official DVSA MOT history service — free, instant, and goes back to 2005."
      calculator={<MotHistoryChecker />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>We validate the plate format and link you directly to the DVSA’s free MOT history service. We don’t store or relay your search.</p>
          }
          officialRules={
            <ul>
              <li>MOT is required annually once a car is 3 years old (4 years in NI).</li>
              <li>MOT history is public data published by DVSA.</li>
              <li>Buying a car? Always check MOT history before handing over money.</li>
            </ul>
          }
          pitfalls={[
            { title: "Recurring advisories", body: "If the same advisory appears year after year, the seller has been ignoring a problem. Negotiate or walk." },
            { title: "Mileage gaps", body: "A jump where the car ”forgot” to do 30k miles for two years is a red flag for a clocked odometer." },
            { title: "Recent fail then pass", body: "Check what was fixed. A ”corrosion to chassis” major often comes back." },
          ]}
          faqs={[
            { question: "Is the DVSA service free?", answer: "Completely free. Any third-party site charging for MOT history is just re-selling free public data." },
            { question: "What if no history shows?", answer: "Cars under 3 years old won’t have an MOT yet. Vehicles imported recently may show partial history." },
            { question: "Does it show service history?", answer: "No — MOT history only. Service history must come from the seller or main dealer." },
          ]}
          disclaimer="We link to gov.uk — we don’t store registrations. Always verify directly on the DVSA service."
        />
      }
    />
  );
}

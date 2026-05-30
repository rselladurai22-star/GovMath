import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PetrolVsEVCalculator from "./PetrolVsEVCalculator";

export const metadata: Metadata = {
  title: "Petrol vs EV Running Cost Calculator (UK)",
  description: "Compare annual fuel costs between a petrol car and an EV.",
};

export default function PetrolVsEVPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="Running costs"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/vehicles", label: "Vehicles" }, { href: "/vehicles/petrol-vs-ev-cost", label: "Petrol vs EV" }]}
      title="Petrol vs EV Running Cost Calculator"
      intro="Fuel is the biggest running cost difference between an EV and a petrol car. With a home overnight tariff, EVs are often 4–5× cheaper per mile."
      calculator={<PetrolVsEVCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Petrol cost = (miles/MPG) × 4.546 × £/litre. EV cost = (miles/mi-per-kWh) × £/kWh. We just compare totals. Maintenance and depreciation are excluded.</p>}
          officialRules={
            <ul>
              <li>EV charging at home off-peak: 7–10p/kWh (Octopus Go, Intelligent).</li>
              <li>Public rapid: 60–80p/kWh.</li>
              <li>Petrol UK average: ~145p/litre (mid-2025).</li>
              <li>VED for EVs from April 2025: standard rate applies.</li>
            </ul>
          }
          pitfalls={[
            { title: "Public charging breaks the maths", body: "If you don’t have off-street parking, rapid charging at 75p/kWh costs roughly the same as petrol per mile." },
            { title: "Cold-weather range", body: "EV efficiency drops 20–30% in winter — adjust mi/kWh for realistic figures." },
            { title: "Tyres and servicing", body: "EVs are gentler on brakes but harder on tyres (weight + torque). Service savings ~30%." },
          ]}
          faqs={[
            { question: "What about depreciation?", answer: "EV residuals fell sharply 2023–24. Currently petrol holds value better — factor in for total cost." },
            { question: "Is the salary sacrifice route still good?", answer: "Yes — 3% BIK on EVs makes salary sacrifice extremely tax-efficient for higher-rate earners." },
          ]}
          disclaimer="Educational. Real running costs vary by driving style, weather and tariff."
        />
      }
    />
  );
}

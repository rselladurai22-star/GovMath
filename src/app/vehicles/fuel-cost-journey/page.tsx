import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import FuelCostCalculator from "./FuelCostCalculator";

export const metadata: Metadata = {
  title: "Fuel Cost per Journey Calculator (UK)",
  description: "Cost of fuel for any journey from miles, MPG and pump price.",
};

export default function FuelCostPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="Per journey"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/vehicles", label: "Vehicles" }, { href: "/vehicles/fuel-cost-journey", label: "Fuel Cost" }]}
      title="Fuel Cost per Journey Calculator"
      intro="How much will that drive actually cost in fuel? Plug in miles, MPG and pump price."
      calculator={<FuelCostCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Gallons = miles ÷ MPG. UK MPG is imperial gallons (4.546 L). Cost = litres × pump price. Cost-per-mile lets you compare against HMRC’s 45p/mile mileage allowance.</p>}
          officialRules={
            <ul>
              <li>HMRC AMAP rate: 45p/mile for first 10,000 business miles.</li>
              <li>Advisory Fuel Rates (AFR) published quarterly for company-car drivers.</li>
              <li>UK uses imperial gallons (4.54609 L), not US gallons (3.785 L).</li>
            </ul>
          }
          pitfalls={[
            { title: "Manufacturer MPG is optimistic", body: "Real-world MPG is typically 20–30% lower than WLTP figures. Use historical fill-up data." },
            { title: "Motorway vs town", body: "City driving can halve MPG on a small petrol — adjust if mostly stop-start." },
            { title: "AFR vs AMAP confusion", body: "AMAP is for using your own car for work (45p). AFR is for fuel reimbursement on company cars (much lower)." },
          ]}
          faqs={[
            { question: "What price per litre to use?", answer: "Check Petrol Prices UK or your local supermarket. UK average ~145p petrol / 155p diesel mid-2025." },
            { question: "Why imperial gallons?", answer: "UK historical convention. MPG figures on adverts are always imperial." },
          ]}
          disclaimer="Educational. Estimates only — actual fuel consumption varies."
        />
      }
    />
  );
}

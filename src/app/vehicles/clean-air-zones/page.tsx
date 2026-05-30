import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CleanAirZonesCalculator from "./CleanAirZonesCalculator";

export const metadata: Metadata = {
  title: "Clean Air Zone & ULEZ Cost Calculator (UK)",
  description: "Estimate your weekly and annual cost of driving a non-compliant vehicle in London ULEZ or a UK Clean Air Zone.",
};

export default function CleanAirZonesPage() {
  return (
    <CalculatorShell
      category="Vehicles"
      updatedLabel="2025 charges"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles" },
        { href: "/vehicles/clean-air-zones", label: "Clean Air Zones" },
      ]}
      title="Clean Air Zone & ULEZ Cost Calculator"
      intro="If your car or van doesn’t meet the emission standard, every day inside a Clean Air Zone or London’s ULEZ adds up fast. Estimate the annual cost before you commit to a daily commute."
      calculator={<CleanAirZonesCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              We multiply the daily charge for your vehicle class by the number of days you enter the zone each week, then by the weeks you do that over the year. The charge applies once per calendar day, not per trip.
            </p>
          }
          officialRules={
            <ul>
              <li>Compliant cars (petrol Euro 4+ / diesel Euro 6+) pay nothing.</li>
              <li>Pay or check compliance at gov.uk/clean-air-zones or tfl.gov.uk/ulez.</li>
              <li>Charges run midnight to midnight — a 23:30 → 00:30 trip is two days.</li>
              <li>Missed payment penalties start at £120 (London), £60–£120 elsewhere.</li>
            </ul>
          }
          pitfalls={[
            { title: "Auto-pay still needs registration", body: "TfL Auto Pay charges your card daily but you must register the vehicle first — driving in unregistered means a PCN." },
            { title: "Hire and lease vehicles count", body: "The registered keeper is liable. Hire firms usually pass the charge on plus an admin fee of £20–£40." },
            { title: "Class C zones don’t charge cars", body: "Bath and Sheffield only charge vans, taxis, coaches and HGVs — most private cars drive in free." },
          ]}
          faqs={[
            { question: "How do I check if my car is compliant?", answer: "Use the free checker at gov.uk/clean-air-zones or tfl.gov.uk — enter the number plate and it tells you instantly." },
            { question: "Can I claim it back from my employer?", answer: "Only if driving is wholly for work (not commuting). Daily charges paid for business mileage are an allowable expense." },
            { question: "What about the Congestion Charge?", answer: "London’s £15 Congestion Charge is separate and stacks on top of the ULEZ charge — total £27.50/day for a non-compliant car." },
          ]}
          disclaimer="Charges shown are the published daily rates. Penalty rates and exemptions change — always verify on the operating authority’s website."
        />
      }
    />
  );
}

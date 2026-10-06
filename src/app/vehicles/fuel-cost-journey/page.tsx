import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FuelStudio from "./FuelStudio";
import FuelGuide from "./FuelGuide";

export const metadata: Metadata = {
  title: "Fuel Cost Calculator UK: Journey Cost by MPG",
  description:
    "Work out what a car journey costs in petrol, diesel or electricity, split the cost between passengers, and see what you can claim for business mileage. Autumn 2026 prices.",
  alternates: { canonical: "/vehicles/fuel-cost-journey" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/fuel-cost-journey", label: "Fuel Cost" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out the fuel cost of a journey?", a: "Miles ÷ mpg × 4.546 gives litres. Multiply by the price per litre. 240 miles at 45 mpg and 173.8p costs about £42.14." },
  { q: "How much does an electric car cost per mile?", a: "At 3.5 miles per kWh, about 2.3p a mile on an 8p overnight tariff, 7.5p at the 26.32p price cap, and over 21p on 75p rapid chargers." },
  { q: "What is the business mileage rate?", a: "45p a mile for the first 10,000 business miles a year in your own car, then 25p, tax-free." },
  { q: "Is it legal to share fuel costs?", a: "Yes, as long as you do not make a profit from your passengers." },
  { q: "Why is my real mpg lower than the official figure?", a: "Official figures come from a standard laboratory test. Real driving, with cold starts, traffic, speed and heating, usually uses more fuel." },
  { q: "How do I work out my real mpg?", a: "Fill the tank, reset the trip counter, and at the next fill-up divide the miles driven by the litres added, then multiply by 4.546." },
  { q: "Is diesel cheaper to run?", a: "Diesel cars usually do more miles per gallon, but diesel costs more a litre. In the example, a 55 mpg diesel costs £39.46 against £42.14 for a 45 mpg petrol car." },
];

export default async function FuelPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/petrol-vs-ev-cost", "/vehicles/commuter-comparison", "/business/business-mileage", "/vehicles/clean-air-zones"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Running costs"
      title="Fuel Cost Calculator"
      lead="Work out what a journey costs in petrol, diesel or electricity, and split it between passengers."
      points={["Autumn 2026 prices", "Petrol, diesel and electric", "Cost sharing", "Free and private"]}
      guide={<FuelGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate only. Real economy varies with speed, traffic and weather."
    >
      <FuelStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import FuelEconomyStudio from "./FuelEconomyStudio";
import FuelEconomyGuide from "./FuelEconomyGuide";

export const metadata: Metadata = {
  title: "Fuel Economy Calculator: MPG to L/100km",
  description:
    "Free fuel economy calculator. Convert MPG (UK and US gallons), litres per 100 km and km per litre, work out MPG from a fill-up and the cost per mile and trip.",
  alternates: { canonical: "/everyday/fuel-economy" },
  openGraph: ogFor("/everyday/fuel-economy"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/fuel-economy", label: "Fuel Economy Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I convert MPG to litres per 100 km?", a: "Divide about 282.5 by UK miles per gallon, or about 235.2 by US miles per gallon. 50 mpg (UK) is about 5.65 L/100 km; 30 mpg (US) is about 7.84 L/100 km." },
  { q: "Why are UK and US MPG figures different?", a: "A UK (imperial) gallon is 4.54609 litres and a US gallon is 3.785411784 litres. The same car does about 20% more miles per UK gallon than per US gallon." },
  { q: "How do I work out my real MPG?", a: "Fill the tank, reset the trip meter, drive as normal, then fill up again. Divide the miles driven by the fuel added. 412 miles on 38.5 litres is about 48.6 mpg (UK)." },
  { q: "How do I convert litres to gallons for MPG?", a: "Divide litres by 4.54609 for UK gallons or by 3.785411784 for US gallons. Then divide your miles by the gallons." },
  { q: "What is the cost per mile of my car's fuel?", a: "Divide the price per litre by miles per litre. At 45 mpg (UK) and 173.8p a litre, petrol costs about 17.6p a mile." },
  { q: "Is a lower or higher L/100 km better?", a: "Lower. Litres per 100 km measures fuel used, so a smaller number means a more efficient car. MPG and km per litre measure distance, so higher is better." },
  { q: "Why is my real MPG lower than the official figure?", a: "Official figures come from a standard laboratory test. Short trips, cold weather, motorway speeds, heavy loads, roof boxes and air conditioning all use more fuel." },
  { q: "Does improving MPG save the same amount each time?", a: "No. Going from 30 to 40 mpg saves more fuel than going from 50 to 60, because fuel used falls with 1 ÷ MPG. That is why L/100 km is easier for comparing savings." },
  { q: "How do I split fuel costs with passengers?", a: "Work out the trip cost and divide by the number of people. Set the number of people under More options." },
  { q: "Does this work for electric cars?", a: "No, this calculator is for petrol and diesel. For an electric car, use the petrol vs EV running cost calculator, which uses miles per kWh." },
];

export default async function FuelEconomyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/vehicles/fuel-cost-journey", "/uk/vehicles/petrol-vs-ev-cost", "/uk/vehicles/commuter-comparison", "/us/loans/car-affordability-calculator", "/uk/vehicles/car-tax-ved"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="MPG, L/100 km and cost"
      title="Fuel Economy Calculator"
      lead="Convert between miles per gallon (UK and US), litres per 100 km and km per litre, work out your real MPG from a fill-up, and see what your fuel costs per mile and per trip."
      points={["UK and US gallons", "Fill-up method", "Cost per mile and trip", "Pounds, dollars or euros"]}
      guide={<FuelEconomyGuide />}
      faqs={FAQS}
      related={related}
      note="Fuel costs only. The default price is a UK average; enter your own."
    >
      <FuelEconomyStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import ApplianceStudio from "./ApplianceStudio";
import ApplianceGuide from "./ApplianceGuide";

export const metadata: Metadata = {
  title: "Appliance Running Cost Calculator UK 2026",
  description:
    "Free appliance running cost calculator at the October 2026 price cap. See what a kettle, tumble dryer, heater or any appliance costs an hour, a day and a year.",
  alternates: { canonical: "/uk/property/appliance-running-cost" },
  openGraph: ogFor("/uk/property/appliance-running-cost"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/appliance-running-cost", label: "Appliance Running Cost" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out what an appliance costs to run?", a: "Divide its watts by 1,000 to get kilowatts, multiply by the hours it runs to get kWh, then multiply by your unit rate. A 2,000-watt heater for 3 hours uses 6 kWh, which costs about £1.58 at 26.32p a unit." },
  { q: "What is the electricity unit rate from October 2026?", a: "Under the Ofgem price cap from 1 October to 31 December 2026, the average Direct Debit rate in Great Britain is 26.32p per kWh, with a standing charge of 54.83p a day. Rates vary by region and tariff." },
  { q: "Is there VAT on electricity now?", a: "No. The government removed VAT from household electricity from 1 October 2026 to 31 March 2027. Gas still has 5% VAT." },
  { q: "How much does it cost to boil a kettle?", a: "A 3kW kettle costs about 1.3p a minute at the price cap rate, so a 3-minute boil costs about 4p. Boiling only the water you need is the easiest saving." },
  { q: "Is an air fryer cheaper than an oven?", a: "Usually, for small meals. With typical figures, a 20-minute air fryer meal costs about 13p and a 45-minute oven meal about 28p. A full oven cooking a large meal can be better value than several air fryer batches." },
  { q: "How much does a tumble dryer cost per load?", a: "A 2,500-watt vented or condenser dryer running for 75 minutes costs about 82p a load at 26.32p. A heat pump dryer uses about half the energy, about 42p a load." },
  { q: "Is an electric heater cheaper than central heating?", a: "Per unit of heat, no: electric heat costs about 3 times as much as heat from a 90% efficient gas boiler at the current cap. But heating one room with a heater for a short time can cost less than heating the whole house." },
  { q: "Does the cost include the standing charge?", a: "No. The standing charge is a daily charge you pay whether an appliance is on or not, so it is not part of any one appliance's running cost. See your whole bill with our energy bill calculator." },
  { q: "Where do I find my appliance's wattage?", a: "On the rating plate (on the back, underneath or inside the door) or in the manual. Energy labels show kWh a year for fridges, kWh per 100 cycles for washing machines and dishwashers, and kWh per 1,000 hours for TVs." },
  { q: "How much does an electric shower cost?", a: "A 9.5kW electric shower costs about 4p a minute at 26.32p a unit, so an 8-minute shower costs about 33p." },
  { q: "Does Economy 7 make appliances cheaper to run?", a: "Only when you use them in the cheap night hours. The day rate on Economy 7 is usually higher than a single-rate tariff, so use in the day costs more. Enter your own night rate under More options." },
  { q: "How much does standby cost?", a: "Each watt drawn all year costs about £2.31 at 26.32p a unit. Ten watts of standby across several devices is about £23 a year." },
];

export default async function ApplianceRunningCostPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/energy-bill-calculator", "/uk/vehicles/petrol-vs-ev-cost", "/uk/property/council-tax-bands", "/uk/benefits/benefits-checker", "/uk/property/moving-house-budget"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="October to December 2026 price cap"
      title="Appliance Running Cost Calculator"
      lead="What a kettle, tumble dryer, heater or any appliance costs to run, a use, a day, a month and a year, with side-by-side comparisons."
      points={["26 common appliances", "Price cap or your own rate", "Compare two appliances", "Free and private"]}
      guide={<ApplianceGuide />}
      faqs={FAQS}
      related={related}
      note="Typical wattages and the Great Britain average price cap rate. Your appliance, region and tariff may differ."
    >
      <ApplianceStudio query={query} />
    </FlagshipPage>
  );
}

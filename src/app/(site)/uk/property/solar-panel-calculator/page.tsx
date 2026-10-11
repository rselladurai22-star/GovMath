import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SolarStudio from "./SolarStudio";
import SolarGuide from "./SolarGuide";

export const metadata: Metadata = {
  title: "Solar Panel Calculator UK 2026: Savings & Payback",
  description:
    "Free solar panel calculator for UK homes. See yearly output in your region, bill savings, SEG export income, payback and 25-year return at October 2026 prices.",
  alternates: { canonical: "/uk/property/solar-panel-calculator" },
  openGraph: ogFor("/uk/property/solar-panel-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/solar-panel-calculator", label: "Solar Panel Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much do solar panels save a year in the UK?", a: "A 4 kWp south-facing system in the Midlands makes about 3,872 kWh a year. If 40% is used at home, it saves about £408 on bills and earns about £300 from exports at 12.9p, about £707 in all at October 2026 prices. Results range from about £593 in the Highlands to £845 on the south coast." },
  { q: "How long do solar panels take to pay back?", a: "About 8 to 11 years for a typical 4 kWp system at the 2025/26 median cost of £6,380, depending on region, roof and how much you use yourself. North-facing or shaded roofs take longer; a good export tariff or high self-use shortens it." },
  { q: "How much does a 4kW solar system cost?", a: "The government's figures for April 2025 to March 2026 show a median of £1,595 per kW for systems up to 4 kW, so about £6,380 for 4 kWp. Larger systems (4 to 10 kW) had a median of £1,546 per kW. Quotes vary with scaffolding and extras." },
  { q: "Is there VAT on solar panels?", a: "No, for now. Solar panels and batteries installed in homes in Great Britain are zero-rated for VAT until 31 March 2027. From 1 April 2027 the rate is due to return to 5%." },
  { q: "What is the Smart Export Guarantee rate?", a: "Each supplier sets its own rate; it only has to be above zero. Ofgem's figures show about 12.9p paid on average for each unit exported in 2024/25, and flat tariffs ranged from about 1p to 15p. Compare tariffs: you do not have to use your own supplier." },
  { q: "How much electricity does a solar panel make?", a: "In the UK, each kWp makes about 811 to 1,156 kWh a year facing south, depending on the region (PVGIS). A 430-watt panel is 0.43 kWp, so it makes roughly 350 to 500 kWh a year." },
  { q: "Do solar panels work on east or west roofs?", a: "Yes. An east or west roof makes about 78% of what a south roof does. Output is spread across the morning and evening, which can help you use more of it yourself." },
  { q: "Is a solar battery worth it?", a: "On solar alone, raising the share you use from 40% to 70% adds about £128 a year in the Midlands example, so a battery costing over about £1,280 takes more than 10 years to repay. It can pay better if you also charge it on a cheap overnight tariff." },
  { q: "Do I need planning permission for solar panels?", a: "Usually not for a house: roof panels are normally permitted development if they stick out no more than 0.2 metres and sit below the highest part of the roof. Listed buildings, flats and conservation areas have extra rules, so check with your council." },
  { q: "Do solar panels work in winter or on cloudy days?", a: "Yes, but they make much less. Most output comes from April to September. Yearly figures already include the dull months." },
  { q: "How much carbon do solar panels save?", a: "About 0.144 kg of CO2e for each unit of grid electricity replaced (DESNZ 2026 factors). A 4 kWp system making 3,872 kWh saves about 557 kg a year." },
  { q: "How long do solar panels last?", a: "Panels are usually warranted for 25 years and often work longer, losing about 0.5% of output a year. The inverter usually needs replacing once in that time." },
];

export default async function SolarPanelPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/heat-pump-vs-boiler", "/uk/property/energy-bill-calculator", "/uk/property/appliance-running-cost", "/uk/vehicles/petrol-vs-ev-cost", "/uk/investing/savings-interest"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="October 2026 prices"
      title="Solar Panel Calculator"
      lead="What solar panels would make on your roof, the bill saving and export income, how long they take to pay back and the return over 25 years."
      points={["14 UK regions", "Roof direction and shade", "With or without a battery", "Free and private"]}
      guide={<SolarGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates from regional sunshine data and typical costs. An MCS installer's survey and quote give the figures for your home."
    >
      <SolarStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HeatPumpStudio from "./HeatPumpStudio";
import HeatPumpGuide from "./HeatPumpGuide";

export const metadata: Metadata = {
  title: "Heat Pump vs Gas Boiler Calculator UK 2026",
  description:
    "Free heat pump vs gas boiler calculator at the October 2026 price cap. Compare running costs, the £7,500 grant, payback, 15-year cost and carbon for your home.",
  alternates: { canonical: "/uk/property/heat-pump-vs-boiler" },
  openGraph: ogFor("/uk/property/heat-pump-vs-boiler"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/heat-pump-vs-boiler", label: "Heat Pump vs Gas Boiler" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is a heat pump cheaper to run than a gas boiler?", a: "It depends on its efficiency and your tariff. At the October 2026 price cap, a typical house using 9,500 kWh of gas pays about £865 a year with a boiler and £804 with a heat pump at a SCOP of 2.8, if the gas supply is capped. At SCOP 3.5 the heat pump costs about £643." },
  { q: "What SCOP does a heat pump need to beat gas?", a: "About 2.6 for a typical house at the October 2026 price cap, if you cap the gas and stop paying its standing charge. If you keep gas for cooking, it needs about 3.0. A cheaper electricity tariff lowers the figure." },
  { q: "How much is the Boiler Upgrade Scheme grant?", a: "£7,500 towards an air source or ground source heat pump in England and Wales, and £2,500 towards an air-to-air heat pump. Homes heated by oil or LPG with no mains gas can get an extra £1,500 until March 2027." },
  { q: "How much does an air source heat pump cost?", a: "The median under the Boiler Upgrade Scheme from April to June 2026 was £12,908 before the grant, so about £5,408 after £7,500 off. Half of installs cost between £11,128 and £15,627." },
  { q: "How long does a heat pump take to pay back?", a: "At the median SCOP of 2.8 and price cap rates, the saving is small and payback can take more than 15 years. With a SCOP of 3.5 it is about 11 years for a typical house, and with a heat pump tariff averaging 20p, about 9.5 years." },
  { q: "Do I still pay a gas standing charge with a heat pump?", a: "Only if you keep a gas supply, for example for a hob. If you have the gas capped, you save the 29.68p a day standing charge, about £108 a year at the cap. You pay the electricity standing charge either way." },
  { q: "Is there VAT on heat pumps?", a: "Not until 31 March 2027: installing a heat pump in a home in Great Britain is zero-rated. From 1 April 2027 the rate is due to return to 5%." },
  { q: "How do I work out my home's heat demand?", a: "Multiply your yearly gas use (on your annual statement) by your boiler's efficiency. 9,500 kWh of gas in a 90% boiler gives about 8,550 kWh of heat. An installer's heat loss survey gives the exact figure." },
  { q: "How much carbon does a heat pump save?", a: "For a typical house, a gas boiler produces about 1.7 tonnes of CO2e a year and a heat pump at SCOP 2.8 about 440 kg, using the government's 2026 conversion factors: a cut of about three quarters." },
  { q: "Can I get a heat pump grant in Scotland or Northern Ireland?", a: "The Boiler Upgrade Scheme covers England and Wales only. Scotland has its own Home Energy Scotland grant and loan. Northern Ireland has no equivalent scheme." },
  { q: "Do I need new radiators for a heat pump?", a: "Sometimes. Heat pumps run radiators cooler than a boiler, so some rooms may need larger radiators to stay warm. The installer's heat loss survey decides this, and the cost is usually in the quote." },
  { q: "How long do heat pumps last?", a: "Typically 15 years or more, about the same as a gas boiler. Both should be serviced about once a year." },
];

export default async function HeatPumpVsBoilerPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/solar-panel-calculator", "/uk/property/energy-bill-calculator", "/uk/property/appliance-running-cost", "/uk/property/moving-house-budget", "/uk/property/remortgage"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="October to December 2026 price cap"
      title="Heat Pump vs Gas Boiler Calculator"
      lead="Compare the running cost, upfront cost after the £7,500 grant, payback, 15-year cost and carbon of a heat pump and a gas boiler for your home."
      points={["Price cap rates", "Boiler Upgrade Scheme grant", "Efficiency you can change", "Free and private"]}
      guide={<HeatPumpGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates at Great Britain average prices. An installer's heat loss survey and quote give the figures for your home."
    >
      <HeatPumpStudio query={query} />
    </FlagshipPage>
  );
}

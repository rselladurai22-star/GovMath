import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PetrolEvStudio from "./PetrolEvStudio";
import PetrolEvGuide from "./PetrolEvGuide";

export const metadata: Metadata = {
  title: "Petrol vs Electric Car Cost Calculator UK (2026)",
  description:
    "Compare the full cost of a petrol and an electric car over the years you keep it: fuel versus home and public charging, servicing, tax, insurance, the 2028 mileage charge and resale value.",
  alternates: { canonical: "/vehicles/petrol-vs-ev-cost" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/petrol-vs-ev-cost", label: "Petrol vs Electric" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is an electric car cheaper to run than petrol?", a: "Usually, if you charge at home. 8,000 miles costs about £1,405 in petrol at 45 mpg, against £183 on an 8p overnight tariff, but £1,714 on 75p rapid chargers." },
  { q: "How much does it cost to charge an electric car at home?", a: "At the 26.32p price cap, about 7.5p a mile for a car doing 3.5 miles per kWh. On an overnight EV tariff around 8p, about 2.3p a mile." },
  { q: "Do electric cars pay road tax?", a: "Yes, since April 2025: £10 in the first year then £200 a year, and from April 2028 a 3p a mile charge is planned." },
  { q: "How long does an electric car take to pay back?", a: "It depends on mileage and the price gap. In our example, at 15,000 miles a year a £5,000 dearer electric car pays back in the fourth year." },
];

export default async function PetrolEvPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/fuel-cost-journey", "/vehicles/ev-salary-sacrifice", "/vehicles/car-tax-ved", "/vehicles/benefit-in-kind"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Running costs"
      title="Petrol vs Electric Car Calculator"
      lead="Compare the full cost of owning a petrol and an electric car, year by year."
      points={["Home and public charging", "2028 mileage charge", "Break-even year", "Free and private"]}
      guide={<PetrolEvGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Prices, resale values and running costs vary."
    >
      <PetrolEvStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PetrolEvStudio from "./PetrolEvStudio";
import { ogFor } from "@/gm/og";
import PetrolEvGuide from "./PetrolEvGuide";

export const metadata: Metadata = {
  title: "Petrol vs Electric Car Cost Calculator UK",
  description:
    "Free petrol vs electric car calculator. Compare fuel and charging, servicing, tax, insurance, the 2028 mileage charge and resale value while you own it.",
  alternates: { canonical: "/uk/vehicles/petrol-vs-ev-cost" },
  openGraph: ogFor("/uk/vehicles/petrol-vs-ev-cost"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/vehicles", label: "Vehicles" },
  { href: "/uk/vehicles/petrol-vs-ev-cost", label: "Petrol vs Electric" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is an electric car cheaper to run than petrol?", a: "Usually, if you charge at home. 8,000 miles costs about £1,405 in petrol at 45 mpg, against £183 on an 8p overnight tariff, but £1,714 on 75p rapid chargers." },
  { q: "How much does it cost to charge an electric car at home?", a: "At the 26.32p price cap, about 7.5p a mile for a car doing 3.5 miles per kWh. On an overnight EV tariff around 8p, about 2.3p a mile." },
  { q: "Do electric cars pay road tax?", a: "Yes, since April 2025: £10 in the first year then £200 a year, and from April 2028 a 3p a mile charge is planned." },
  { q: "How long does an electric car take to pay back?", a: "It depends on mileage and the price gap. In our example, at 15,000 miles a year a £5,000 dearer electric car pays back in the fourth year." },
  { q: "Do electric cars pay the ULEZ?", a: "No. They are exempt from ULEZ and clean air zone charges, but pay the London congestion charge at a discount." },
  { q: "Will electricity prices rise?", a: "They may. The calculator assumes today's prices throughout; try a higher price to test it." },
  { q: "What about hybrids?", a: "Enter a hybrid's real mpg in the petrol car. Plug-in hybrids are cheapest if most trips are within their electric range." },
  { q: "Are there grants for electric cars?", a: "The Electric Car Grant has offered discounts of up to £3,750 on some new electric cars under £37,000. Check whether the car you want qualifies, and enter the discounted price." },
  { q: "Do electric cars cost more to insure?", a: "Often a little more, because repairs and parts can be dearer. The gap has narrowed as more insurers and repairers handle electric cars." },
  { q: "How long do electric car batteries last?", a: "Most are designed to outlast the car, losing capacity slowly over many years. Manufacturers usually guarantee the battery for 8 years or around 100,000 miles." },
  { q: "Is an electric car cheaper to service?", a: "Usually. There is no oil, spark plugs, clutch or exhaust, and brakes wear more slowly. Tyres may need replacing sooner because of the extra weight." },
  { q: "What if I mostly drive short trips?", a: "Short trips suit electric cars well, as petrol engines are least efficient when cold. But at low mileage, the savings take longer to cover any higher purchase price." },
  { q: "Does cold weather affect electric cars?", a: "Yes. Range can fall by a fifth or more in winter, as batteries are less efficient and heating uses energy. Pre-heating while plugged in at home helps." },
];

export default async function PetrolEvPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/vehicles/fuel-cost-journey", "/uk/vehicles/ev-salary-sacrifice", "/uk/vehicles/car-tax-ved", "/uk/vehicles/benefit-in-kind"].includes(c.href));
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

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CommuteStudio from "./CommuteStudio";
import CommuteGuide from "./CommuteGuide";

export const metadata: Metadata = {
  title: "Commute Cost Calculator: Car vs Train vs Bus vs Bike (UK)",
  description:
    "Compare the yearly cost of commuting by car, train, bus or bike, including fuel, parking, wear, season tickets, the £3 bus fare cap and hybrid working.",
  alternates: { canonical: "/vehicles/commuter-comparison" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/commuter-comparison", label: "Commute Cost" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is it cheaper to drive or get the train to work?", a: "It depends on distance, parking and how often you travel. In our 12-mile example, driving with £6 parking costs £3,012 a year against a £2,400 season ticket, but with free parking the car costs £1,632." },
  { q: "Is a season ticket worth it if I work from home some days?", a: "Not always. At three days a week, daily returns or a flexi season ticket can be cheaper than an annual season." },
  { q: "How much is the bus fare cap?", a: "£3 for a single fare in England outside London until December 2026, then £2 from January 2027." },
  { q: "Can I claim tax relief on my commute?", a: "No. Travel to your permanent workplace is commuting, not business travel." },
];

export default async function CommutePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/fuel-cost-journey", "/vehicles/clean-air-zones", "/vehicles/petrol-vs-ev-cost", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Running costs"
      title="Commute Cost Calculator"
      lead="Compare what your commute costs by car, train, bus and bike."
      points={["Fuel, parking and wear", "Season tickets", "£3 bus fare cap", "Free and private"]}
      guide={<CommuteGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate only. Check exact fares with your rail and bus operators."
    >
      <CommuteStudio query={query} />
    </FlagshipPage>
  );
}

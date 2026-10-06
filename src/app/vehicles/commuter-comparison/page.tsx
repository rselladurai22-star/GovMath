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
  { q: "Should I include insurance and car tax?", a: "Only if you would get rid of the car without the commute. Otherwise you pay them anyway, so they do not change the comparison." },
  { q: "What wear and tear figure should I use?", a: "Around 10p to 15p a mile covers tyres, servicing and extra wear for a typical car. Electric cars are usually at the lower end." },
  { q: "Is a longer commute cheaper by train?", a: "Often. At 25 miles each way with £6 parking, driving costs £4,779 a year against a £4,500 season ticket in our example." },
  { q: "Does working from home save money?", a: "Every day at home saves the cost of that day's commute, though heating and electricity at home rise a little. At £13.09 a day by car in the example, two days a week at home saves about £1,205 a year." },
  { q: "Should I count the cost of buying a bike?", a: "Yes, spread over the years you expect to use it, plus servicing, lights and a lock. The calculator includes a yearly figure for this." },
  { q: "Is the train always more reliable?", a: "Not always. Check your route's punctuality and how often services are cancelled, and compare with typical traffic delays on your drive." },
  { q: "Can I claim the cost of my commute on tax?", a: "No. Commuting to a permanent workplace is not tax-deductible, whatever transport you use." },
  { q: "What about a company car?", a: "If you have a company car, fuel for commuting paid by your employer counts as private fuel and can trigger the fuel benefit charge." },
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

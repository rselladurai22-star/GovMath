import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MileageStudio from "./MileageStudio";
import MileageGuide from "./MileageGuide";

export const metadata: Metadata = {
  title: "Business Mileage Calculator: HMRC 45p and 25p Rates (2026/27)",
  description:
    "Work out your business mileage claim at HMRC's approved rates, the tax it saves, and Mileage Allowance Relief if your employer pays less than 45p a mile.",
  alternates: { canonical: "/business/business-mileage" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/business-mileage", label: "Business Mileage" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the HMRC mileage rate for 2026/27?", a: "45p a mile for the first 10,000 business miles in a car or van, then 25p. Motorcycles are 24p and bicycles 20p." },
  { q: "Does commuting count as business mileage?", a: "No. Travel between home and a permanent workplace is private. Journeys to clients, suppliers and temporary workplaces usually count." },
  { q: "What if my employer pays less than 45p a mile?", a: "You can claim Mileage Allowance Relief on the difference, online, with form P87 or on your tax return." },
  { q: "Can sole traders claim mileage?", a: "Yes. The approved rates can be claimed as simplified expenses for cars, vans and motorcycles, instead of actual running costs." },
  { q: "Do electric cars get a different rate?", a: "Not if you own the car. The 45p and 25p rates apply to all fuel types. Company cars use separate advisory fuel and electricity rates." },
];

export default async function MileagePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/allowable-expenses", "/business/sole-trader-tax", "/business/cis-deduction", "/vehicles/fuel-cost-journey", "/vehicles/benefit-in-kind", "/business/payment-on-account"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="HMRC rates 2026/27"
      title="Business Mileage Calculator"
      lead="Work out what you can claim for business journeys in your own vehicle, and how much tax it saves."
      points={["45p and 25p rates", "Self-employed or employee", "Mileage Allowance Relief", "Free and private"]}
      guide={<MileageGuide />}
      faqs={FAQS}
      related={related}
      note="HMRC approved mileage rates for 2026/27. Not tax advice."
    >
      <MileageStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MileageStudio from "./MileageStudio";
import { ogFor } from "@/gm/og";
import MileageGuide from "./MileageGuide";

export const metadata: Metadata = {
  title: "Business Mileage Calculator UK (45p/25p)",
  description:
    "Free business mileage calculator for 2026/27. Apply HMRC's 45p and 25p rates, see the tax your claim saves and the relief when your employer pays less.",
  alternates: { canonical: "/business/business-mileage" },
  openGraph: ogFor("/business/business-mileage"),
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
  { q: "Do the rates change each year?", a: "They have been 45p and 25p since April 2011. HMRC reviews them but has not changed them." },
  { q: "Do I count miles from 6 April?", a: "Yes. The 10,000-mile threshold resets at the start of each tax year." },
  { q: "Can I claim mileage and fuel receipts?", a: "No. The mileage rate already covers fuel. Claim one or the other, not both." },
  { q: "What about a car I lease?", a: "You can use the mileage rate for a leased car as a sole trader, or claim the business share of the lease payments and running costs under actual costs." },
  { q: "Can I claim for driving to a job interview?", a: "Not as an employee: you are not yet doing the job. A sole trader visiting a potential client can." },
  { q: "I drive more than 10,000 miles. Is it worth switching method?", a: "It may be, for a new vehicle you have not yet claimed for. For a vehicle already on the mileage rate, you must stay on it." },
  { q: "Can I claim mileage for a car I use only partly for business?", a: "Yes. You only count the business miles, so a car used mostly for private journeys can still give a claim for the miles that were for work." },
  { q: "What if I use two cars in the year?", a: "Add the business miles together. The first 10,000 business miles across all your cars and vans are at 45p, and everything above that at 25p." },
  { q: "Is mileage paid by my employer shown on my payslip?", a: "It may be, but it is not taxed or subject to National Insurance as long as it is at or below the approved rates." },
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

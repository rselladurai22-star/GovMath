import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BikStudio from "./BikStudio";
import { ogFor } from "@/gm/og";
import BikGuide from "./BikGuide";

export const metadata: Metadata = {
  title: "Company Car Tax Calculator 2026/27 (BIK)",
  description:
    "Free company car tax calculator for 2026/27. See benefit in kind by CO2 and list price, the tax at 20%, 40% or 45%, fuel benefit and the electric car rate.",
  alternates: { canonical: "/uk/vehicles/benefit-in-kind" },
  openGraph: ogFor("/uk/vehicles/benefit-in-kind"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/vehicles", label: "Vehicles" },
  { href: "/uk/vehicles/benefit-in-kind", label: "Company Car Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is company car tax worked out?", a: "List price × the appropriate percentage for the car's CO2 and fuel gives the taxable benefit. You pay income tax on that at your marginal rate." },
  { q: "What is the BIK rate for electric cars in 2026/27?", a: "4%, rising to 5% in 2027/28, 7% in 2028/29 and 9% in 2029/30." },
  { q: "How much tax on a £40,000 electric company car?", a: "£320 a year for a basic-rate taxpayer and £640 for a higher-rate taxpayer in 2026/27." },
  { q: "What is the fuel benefit charge?", a: "If your employer pays for private fuel, you are also taxed on the car's percentage × £29,200." },
  { q: "Is a pool car taxed?", a: "No, if it is genuinely shared, not normally kept at anyone's home, and private use is only incidental." },
  { q: "Does the list price include VAT?", a: "Yes. It is the price including VAT and delivery charges, but excluding the first-year car tax and registration fee." },
  { q: "What about vans?", a: "Vans have a flat benefit of £4,170 for 2026/27, plus £798 if fuel is provided. Electric vans have no benefit charge." },
  { q: "Do I pay National Insurance on a company car?", a: "You do not. Your employer pays Class 1A National Insurance at 15% on the taxable benefit." },
  { q: "What if I share the car with a colleague?", a: "Each person who has the car available for private use can be taxed on it, with the benefit shared in a fair way. Ask your employer how it is reported." },
  { q: "Is a home charger taxed?", a: "No. Electricity your employer provides for an electric company car is not taxed, and a workplace charging point for employees is exempt too." },
  { q: "Is a company car worth it for a higher-rate taxpayer?", a: "An electric company car usually is: a £40,000 model costs £640 a year in tax at 40%, far less than owning or leasing a similar car from taxed income. A petrol car at 30% costs £4,800 a year at the same price, so the sums are much closer." },
  { q: "What if I only use the car for work?", a: "If private use is genuinely banned and the ban is enforced, there is no benefit. Driving from home to a permanent workplace counts as private use." },
  { q: "Does a company car affect my student loan?", a: "No. Student loan repayments are based on your pay, not on benefits in kind, so a company car does not increase them." },
  { q: "Can I reduce the tax by choosing a cheaper model?", a: "Yes. The tax is a percentage of the list price, so a lower-priced car or fewer options means less tax." },
];

export default async function BikPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/vehicles/ev-salary-sacrifice", "/uk/vehicles/car-tax-ved", "/uk/vehicles/petrol-vs-ev-cost", "/uk/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Company cars"
      title="Company Car Tax Calculator"
      lead="Work out the tax on your company car for 2026/27, and compare electric, hybrid, petrol and diesel."
      points={["2026/27 BIK rates", "Hybrid range bands", "Fuel benefit", "Free and private"]}
      guide={<BikGuide />}
      faqs={FAQS}
      related={related}
      note="Estimate only. Your employer's P11D or payrolled figure is final."
    >
      <BikStudio query={query} />
    </FlagshipPage>
  );
}

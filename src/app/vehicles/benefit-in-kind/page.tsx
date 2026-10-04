import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BikStudio from "./BikStudio";
import BikGuide from "./BikGuide";

export const metadata: Metadata = {
  title: "Company Car Tax Calculator 2026/27 (BIK Rates)",
  description:
    "Work out company car tax for 2026/27 from the list price, CO2, fuel and your salary. Electric cars at 4%, plug-in hybrid rates by range, fuel benefit and future rates.",
  alternates: { canonical: "/vehicles/benefit-in-kind" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/benefit-in-kind", label: "Company Car Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is company car tax worked out?", a: "List price × the appropriate percentage for the car's CO2 and fuel gives the taxable benefit. You pay income tax on that at your marginal rate." },
  { q: "What is the BIK rate for electric cars in 2026/27?", a: "4%, rising to 5% in 2027/28, 7% in 2028/29 and 9% in 2029/30." },
  { q: "How much tax on a £40,000 electric company car?", a: "£320 a year for a basic-rate taxpayer and £640 for a higher-rate taxpayer in 2026/27." },
  { q: "What is the fuel benefit charge?", a: "If your employer pays for private fuel, you are also taxed on the car's percentage × £29,200." },
];

export default async function BikPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/ev-salary-sacrifice", "/vehicles/car-tax-ved", "/vehicles/petrol-vs-ev-cost", "/tax-and-salary/salary-calculator"].includes(c.href));
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

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import VedStudio from "./VedStudio";
import VedGuide from "./VedGuide";

export const metadata: Metadata = {
  title: "Car Tax Calculator UK 2026/27 (VED Rates)",
  description:
    "Work out your car tax from 1 April 2026: first-year rates by CO2, the £200 standard rate, the £440 expensive car supplement, electric car rules and bands A to M.",
  alternates: { canonical: "/vehicles/car-tax-ved" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/car-tax-ved", label: "Car Tax (VED)" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is car tax in 2026/27?", a: "Most cars registered since April 2017 pay £200 a year from the second year. Cars with a list price over £40,000 pay £640 a year in years 2 to 6." },
  { q: "Do electric cars pay car tax?", a: "Yes. They pay £10 in the first year and £200 a year after that. New electric cars over £50,000 also pay the £440 supplement." },
  { q: "What is the expensive car supplement?", a: "An extra £440 a year for five years, from the second year, for cars with a list price over £40,000 (£50,000 for electric cars registered from April 2025)." },
  { q: "How much is band G car tax?", a: "£275 a year for cars registered between March 2001 and March 2017 with 151 to 165 g/km of CO2." },
];

export default async function VedPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/petrol-vs-ev-cost", "/vehicles/benefit-in-kind", "/vehicles/sorn-declaration", "/vehicles/clean-air-zones", "/vehicles/mot-history-checker"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Vehicle tax"
      title="Car Tax (VED) Calculator"
      lead="Work out your car tax from April 2026, for new, used and electric cars."
      points={["2026/27 rates", "Expensive car supplement", "Electric car rules", "Free and private"]}
      guide={<VedGuide />}
      faqs={FAQS}
      related={related}
      note="Check the exact rate for your car on GOV.UK."
    >
      <VedStudio query={query} />
    </FlagshipPage>
  );
}

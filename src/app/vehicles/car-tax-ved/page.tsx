import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import VedStudio from "./VedStudio";
import { ogFor } from "@/gm/og";
import VedGuide from "./VedGuide";

export const metadata: Metadata = {
  title: "Car Tax Calculator UK 2026/27 (VED)",
  description:
    "Free car tax calculator for 2026/27. See first-year and standard VED rates by CO2 band, the expensive car supplement and electric car tax.",
  alternates: { canonical: "/vehicles/car-tax-ved" },
  openGraph: ogFor("/vehicles/car-tax-ved"),
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
  { q: "Do I pay the supplement on a used car?", a: "Yes, if its list price when new was over the threshold and it is between two and six years old." },
  { q: "Do electric cars pay car tax now?", a: "Yes, since April 2025. Most pay £200 a year from the second year." },
  { q: "Will my tax go up every year?", a: "The rates usually rise each April with inflation, though they are rounded to the nearest £5." },
  { q: "Is car tax the same in Scotland, Wales and Northern Ireland?", a: "Yes. Vehicle Excise Duty is a UK-wide tax with the same rates everywhere." },
  { q: "Can I get a refund if I sell my car?", a: "Yes. The DVLA refunds any full months left once it knows you have sold, scrapped or SORNed the car. The new keeper must tax it themselves." },
  { q: "Do I need to tax a car I never drive?", a: "If it is kept on a public road, yes. If it is kept off the road, for example on a drive or in a garage, you can make a SORN instead and pay nothing." },
  { q: "How do I find my car's tax band?", a: "Enter the registration on the GOV.UK vehicle enquiry service. It shows the CO2 figure, the date of first registration, and when the tax is due." },
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

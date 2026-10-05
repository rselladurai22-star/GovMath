import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CazStudio from "./CazStudio";
import CazGuide from "./CazGuide";

export const metadata: Metadata = {
  title: "Clean Air Zone and ULEZ Charge Calculator (2026)",
  description:
    "Check whether your car or van meets the standard and what London's ULEZ and congestion charge, Birmingham, Bristol and other clean air zones would cost you in 2026.",
  alternates: { canonical: "/vehicles/clean-air-zones" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/clean-air-zones", label: "Clean Air Zones" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is the ULEZ charge?", a: "£12.50 a day for non-compliant cars, vans and motorbikes, every day except Christmas Day." },
  { q: "Which cities charge private cars?", a: "London (ULEZ), Birmingham (£8) and Bristol (£9). Other English zones charge vans, taxis and larger vehicles only." },
  { q: "Is my car compliant?", a: "Usually yes if it is a petrol car registered from 2006 or a diesel from September 2015. Use the official checker with your registration to be sure." },
  { q: "Do electric cars pay the congestion charge?", a: "Yes, since January 2026, with a 25% discount on Auto Pay: £13.50 a day. They remain exempt from the ULEZ." },
];

export default async function CazPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/commuter-comparison", "/vehicles/petrol-vs-ev-cost", "/vehicles/car-tax-ved", "/vehicles/fuel-cost-journey"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Driving charges"
      title="Clean Air Zone Charge Calculator"
      lead="Check what London's ULEZ, the congestion charge and other clean air zones would cost you in 2026."
      points={["2026 charges", "All English zones", "Scottish LEZ penalties", "Free and private"]}
      guide={<CazGuide />}
      faqs={FAQS}
      related={related}
      note="Use the official checker with your registration for a definite answer."
    >
      <CazStudio query={query} />
    </FlagshipPage>
  );
}

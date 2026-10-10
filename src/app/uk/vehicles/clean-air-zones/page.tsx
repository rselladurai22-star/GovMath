import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CazStudio from "./CazStudio";
import { ogFor } from "@/gm/og";
import CazGuide from "./CazGuide";

export const metadata: Metadata = {
  title: "ULEZ and Clean Air Zone Charges 2026: Checker",
  description:
    "Free clean air zone and ULEZ charge checker for 2026. See the daily charge in each UK city, the London congestion charge and what a year costs.",
  alternates: { canonical: "/uk/vehicles/clean-air-zones" },
  openGraph: ogFor("/uk/vehicles/clean-air-zones"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/vehicles", label: "Vehicles" },
  { href: "/uk/vehicles/clean-air-zones", label: "Clean Air Zones" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is the ULEZ charge?", a: "£12.50 a day for non-compliant cars, vans and motorbikes, every day except Christmas Day." },
  { q: "Which cities charge private cars?", a: "London (ULEZ), Birmingham (£8) and Bristol (£9). Other English zones charge vans, taxis and larger vehicles only." },
  { q: "Is my car compliant?", a: "Usually yes if it is a petrol car registered from 2006 or a diesel from September 2015. Use the official checker with your registration to be sure." },
  { q: "Do electric cars pay the congestion charge?", a: "Yes, since January 2026, with a 25% discount on Auto Pay: £13.50 a day. They remain exempt from the ULEZ." },
  { q: "Do I need to pay if I only drive through?", a: "Yes. Any driving inside the zone, even on a through road, counts. Parked vehicles that do not move are not charged." },
  { q: "Does Manchester have a clean air zone charge?", a: "No. Greater Manchester's plan was replaced with investment in cleaner vehicles, without charges." },
  { q: "Are hybrids compliant?", a: "Petrol hybrids almost always are. Diesel hybrids need to meet Euro 6." },
  { q: "Is the charge per journey or per day?", a: "Per day. In London a charging day runs from midnight to midnight, so two trips on the same day cost one charge." },
  { q: "Do I get a reminder if I forget to pay?", a: "No. The first you hear may be a penalty charge notice in the post, so pay within the deadline or set up Auto Pay in London." },
  { q: "Can I appeal a penalty?", a: "Yes, for example if the vehicle was sold, stolen or exempt. The penalty notice explains how to challenge it, and there is an independent tribunal." },
  { q: "Do motorbikes pay clean air zone charges?", a: "Only in London, where motorbikes that do not meet Euro 3, usually those made before July 2007, pay the £12.50 ULEZ charge. English clean air zones do not charge motorbikes." },
  { q: "Do I pay if I live inside a zone?", a: "Usually yes, if your vehicle is not compliant and you drive it. Some zones offered residents a temporary exemption when they opened, which has now ended in most places." },
  { q: "Are vans treated differently from cars?", a: "Yes. Vans are charged in more zones than cars, including Bath, Bradford, Sheffield and Tyneside, where private cars are not charged." },
];

export default async function CazPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/vehicles/commuter-comparison", "/uk/vehicles/petrol-vs-ev-cost", "/uk/vehicles/car-tax-ved", "/uk/vehicles/fuel-cost-journey"].includes(c.href));
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

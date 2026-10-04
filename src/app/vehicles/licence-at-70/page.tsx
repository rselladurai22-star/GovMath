import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import LicenceStudio from "./LicenceStudio";
import LicenceGuide from "./LicenceGuide";

export const metadata: Metadata = {
  title: "Driving Licence at 70: Renewal Date Calculator",
  description:
    "Find when your driving licence runs out at 70 and every three years after, when you can apply, and the health and eyesight rules. Renewal is free.",
  alternates: { canonical: "/vehicles/licence-at-70" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/licence-at-70", label: "Licence at 70" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When do I need to renew my driving licence at 70?", a: "Your licence expires on your 70th birthday. You can renew up to 90 days before, and then every three years." },
  { q: "How much does it cost to renew at 70?", a: "Nothing. Renewal at 70 and over is free online or by post." },
  { q: "Do I need a medical or test at 70?", a: "No. You declare that you meet the eyesight standard and tell the DVLA about any relevant medical conditions." },
  { q: "Are eye tests becoming compulsory for over-70s?", a: "The government proposed compulsory eye tests at renewal in its January 2026 road safety strategy and has consulted on them. They are not yet law." },
];

export default async function LicencePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/mot-history-checker", "/investing/state-pension-age", "/vehicles/car-tax-ved"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Driving licences"
      title="Driving Licence at 70 Calculator"
      lead="Find when your licence runs out at 70 and every three years after, and when you can renew."
      points={["Exact dates", "Free renewal", "Health rules", "Free and private"]}
      guide={<LicenceGuide />}
      faqs={FAQS}
      related={related}
      note="Renew on GOV.UK. Other sites charge for a free service."
    >
      <LicenceStudio query={query} />
    </FlagshipPage>
  );
}

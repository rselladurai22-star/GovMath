import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MotStudio from "./MotStudio";
import MotGuide from "./MotGuide";

export const metadata: Metadata = {
  title: "MOT Due Date Checker and MOT History Link",
  description:
    "Work out when your MOT is due, the earliest date you can test and keep your renewal date, and get a direct link to a vehicle's official MOT history.",
  alternates: { canonical: "/vehicles/mot-history-checker" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/vehicles/mot-history-checker", label: "MOT Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When is my first MOT due?", a: "On the third anniversary of the car's registration in Great Britain, or the fourth in Northern Ireland." },
  { q: "How early can I get an MOT?", a: "Up to a month minus a day before it expires, keeping the same renewal date. An MOT expiring on 15 May can be done from 16 April." },
  { q: "How much is an MOT?", a: "The maximum fee is £54.85 for a car and £29.65 for a motorcycle." },
  { q: "How do I check a car's MOT history?", a: "Enter the registration on the free GOV.UK MOT history service. It shows results, mileage and advisories since 2005." },
];

export default async function MotPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/car-tax-ved", "/vehicles/sorn-declaration", "/vehicles/licence-at-70"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="MOT"
      title="MOT Due Date Checker"
      lead="Find when your MOT is due, the earliest you can test, and a link to the official MOT history."
      points={["Due date", "Early test window", "History link", "Free and private"]}
      guide={<MotGuide />}
      faqs={FAQS}
      related={related}
      note="Check the exact date on GOV.UK."
    >
      <MotStudio query={query} />
    </FlagshipPage>
  );
}

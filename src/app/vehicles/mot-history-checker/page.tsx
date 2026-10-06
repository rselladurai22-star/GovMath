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
  { q: "Do electric cars need an MOT?", a: "Yes, on the same timetable as petrol and diesel cars, though there is no emissions test." },
  { q: "Can I tax a car without an MOT?", a: "No. You need a valid MOT, if the car needs one, before you can tax it." },
  { q: "Will I get a reminder?", a: "You can sign up on GOV.UK for a free text or email reminder a month before your MOT is due." },
  { q: "What is checked in an MOT?", a: "Lights, brakes, steering, suspension, tyres and wheels, seatbelts, the body and structure, the exhaust and emissions, the driver's view, the horn and the registration plates. The engine, clutch and gearbox are not checked." },
  { q: "Does an MOT mean the car is in good condition?", a: "No. It only shows the car met the minimum standard on the day. A service and a proper inspection are still worth doing, especially when buying." },
  { q: "What if I lose my MOT certificate?", a: "You do not need it. The result is recorded online, and you can print a copy from the GOV.UK MOT history service." },
  { q: "Can I drive to the MOT if it has expired?", a: "Yes, but only to a test booked in advance, or to a garage for repairs needed to pass. You still need insurance and tax." },
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

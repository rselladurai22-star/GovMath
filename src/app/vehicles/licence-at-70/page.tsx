import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import LicenceStudio from "./LicenceStudio";
import { ogFor } from "@/gm/og";
import LicenceGuide from "./LicenceGuide";

export const metadata: Metadata = {
  title: "Driving Licence at 70 Renewal Calculator",
  description:
    "Free calculator for renewing your driving licence at 70. Find your renewal date, how to apply free online and the 3-year renewals after 70.",
  alternates: { canonical: "/vehicles/licence-at-70" },
  openGraph: ogFor("/vehicles/licence-at-70"),
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
  { q: "Do I have to take a test at 70?", a: "No. There is no driving test or compulsory medical for a car licence at 70, only a declaration." },
  { q: "Can I keep driving while my renewal is processed?", a: "Usually yes, if you have applied, meet the medical standards and your doctor has not told you not to drive." },
  { q: "Is it different in Northern Ireland?", a: "The rules are similar: renewal at 70 and every three years, through the DVA rather than the DVLA." },
  { q: "What if I have moved house?", a: "Update your address when you renew. You must also tell the DVLA whenever you move, or you could be fined up to £1,000." },
  { q: "Do I need a new photo?", a: "Only if your photo is more than 10 years old or no longer looks like you. Online, the DVLA can often use your passport photo." },
  { q: "Can someone renew for me?", a: "A family member or friend can help you fill in the form, but you must sign the declaration yourself, as it is about your own fitness to drive." },
  { q: "Will I get a reminder before 70?", a: "Yes. The DVLA usually sends a D46P reminder about 90 days before your 70th birthday, and before each three-yearly renewal after that." },
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

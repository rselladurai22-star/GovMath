import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PrescriptionStudio from "./PrescriptionStudio";
import { ogFor } from "@/gm/og";
import PrescriptionGuide from "./PrescriptionGuide";

export const metadata: Metadata = {
  title: "NHS Prescription Cost Calculator 2026/27",
  description:
    "Free NHS prescription calculator for England. See if a 3 or 12-month prepayment certificate saves money at the current prescription charge.",
  alternates: { canonical: "/uk/life/nhs-prescription-saver" },
  openGraph: ogFor("/uk/life/nhs-prescription-saver"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/life", label: "Everyday Life" },
  { href: "/uk/life/nhs-prescription-saver", label: "NHS Prescription Saver" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is a prescription in England in 2026?", a: "£9.90 per item. Prescriptions are free in Scotland, Wales and Northern Ireland." },
  { q: "Is a prepayment certificate worth it?", a: "A 12-month PPC costs £114.50 and is cheaper if you need 12 or more items a year. A 3-month PPC costs £32.05 and pays off from 4 items in 3 months." },
  { q: "How much is the HRT PPC?", a: "£19.80 for 12 months of listed HRT medicines." },
  { q: "Who gets free prescriptions?", a: "People aged 60 or over or under 16, 16 to 18-year-olds in full-time education, pregnant women and new mothers, people with certain medical conditions and people on certain benefits." },
  { q: "Does a PPC cover dental charges?", a: "No. It only covers NHS prescription charges." },
  { q: "Can I pay for a 12-month PPC monthly?", a: "Yes, by 10 monthly Direct Debits of £11.45." },
  { q: "Do I need a PPC if I am 60?", a: "No. Prescriptions are free from your 60th birthday." },
  { q: "What if I start a PPC and then become exempt?", a: "You may be able to get a refund for the unused months. Contact the NHS Business Services Authority." },
  { q: "Can I share a PPC with my partner?", a: "No. A PPC covers one named person. Each person who needs regular prescriptions needs their own certificate." },
  { q: "Does a PPC cover hospital prescriptions?", a: "Yes. It covers NHS prescriptions from hospitals, GPs, dentists, nurses and pharmacists in England." },
  { q: "When does the 12-month PPC start?", a: "On the date you choose when you buy it, or up to a month earlier if you paid for prescriptions in that month and kept an FP57 receipt." },
  { q: "Will prescription charges go up?", a: "They are usually reviewed each April. The charge has been held at £9.90 since 2023. Check the latest charge before buying a long-term certificate." },
  { q: "Do I have to pay for contraception?", a: "No. Prescribed contraceptives are free for everyone in England." },
];

export default async function PrescriptionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/everyday/bmi-calculator", "/uk/life/healthy-start", "/uk/benefits/universal-credit", "/uk/benefits/pension-credit"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 charges"
      title="NHS Prescription Cost Calculator"
      lead="Find the cheapest way to pay for your prescriptions in England, and check whether you should be paying at all."
      points={["PPC break-even", "HRT PPC", "Exemption check", "Free and private"]}
      guide={<PrescriptionGuide />}
      faqs={FAQS}
      related={related}
      note="England prescription charges for 2026/27."
    >
      <PrescriptionStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PrescriptionStudio from "./PrescriptionStudio";
import PrescriptionGuide from "./PrescriptionGuide";

export const metadata: Metadata = {
  title: "NHS Prescription Cost Calculator: Is a PPC Worth It? (2026/27)",
  description:
    "Compare paying £9.90 per item with a 3-month (£32.05) or 12-month (£114.50) prescription prepayment certificate or the £19.80 HRT PPC, and check whether you get free prescriptions.",
  alternates: { canonical: "/life/nhs-prescription-saver" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/nhs-prescription-saver", label: "NHS Prescription Saver" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is a prescription in England in 2026?", a: "£9.90 per item. Prescriptions are free in Scotland, Wales and Northern Ireland." },
  { q: "Is a prepayment certificate worth it?", a: "A 12-month PPC costs £114.50 and is cheaper if you need 12 or more items a year. A 3-month PPC costs £32.05 and pays off from 4 items in 3 months." },
  { q: "How much is the HRT PPC?", a: "£19.80 for 12 months of listed HRT medicines." },
  { q: "Who gets free prescriptions?", a: "People aged 60 or over or under 16, 16 to 18-year-olds in full-time education, pregnant women and new mothers, people with certain medical conditions and people on certain benefits." },
];

export default async function PrescriptionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/life/bmi-uk-nhs", "/life/healthy-start", "/benefits/universal-credit", "/benefits/pension-credit"].includes(c.href));
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

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import AaStudio from "./AaStudio";
import AaGuide from "./AaGuide";

export const metadata: Metadata = {
  title: "Attendance Allowance Calculator (2026/27 Rates)",
  description:
    "Check whether you could get Attendance Allowance at £76.70 or £114.60 a week in 2026/27, and how much extra Pension Credit it could unlock through the severe disability addition.",
  alternates: { canonical: "/benefits/attendance-allowance" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/attendance-allowance", label: "Attendance Allowance" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Attendance Allowance in 2026/27?", a: "£76.70 a week at the lower rate and £114.60 a week at the higher rate." },
  { q: "Is Attendance Allowance means-tested?", a: "No. Your income and savings make no difference, and it is tax-free." },
  { q: "Who can claim Attendance Allowance?", a: "People over State Pension age who have needed help with personal care or supervision for six months because of an illness or disability." },
  { q: "Does Attendance Allowance affect Pension Credit?", a: "It can increase it. If you live alone and nobody gets Carer's Allowance for you, it adds £86.05 a week to the Pension Credit guarantee." },
];

export default async function AaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/pension-credit", "/benefits/carers-earnings", "/benefits/pip-points", "/life/care-home-means-test", "/investing/state-pension-age", "/benefits/benefit-cap"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Attendance Allowance Calculator"
      lead="Check which rate of Attendance Allowance your care needs point to, and how much extra Pension Credit it could bring."
      points={["Day and night needs", "Special rules", "Pension Credit boost", "Free and private"]}
      guide={<AaGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. A self-check, not a decision."
    >
      <AaStudio query={query} />
    </FlagshipPage>
  );
}

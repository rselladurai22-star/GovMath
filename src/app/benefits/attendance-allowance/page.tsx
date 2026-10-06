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
  { q: "Is Attendance Allowance taxable?", a: "No. It is tax-free and does not count as income for Pension Credit, Housing Benefit or Council Tax Reduction." },
  { q: "Can I get it if I live with my family?", a: "Yes. Living with others does not affect Attendance Allowance, though it can affect the Pension Credit severe disability addition." },
  { q: "Can I get it if I work?", a: "Yes. Work and earnings make no difference." },
  { q: "Does it count as income for care home fees?", a: "If the council helps with care home fees, it usually stops after 28 days. For care at home, councils can count it in their financial assessment, but must allow for your disability-related costs." },
  { q: "Can I claim for my mother or father?", a: "You can help them claim, fill in the form with them, or act as their appointee if they cannot manage their own affairs. The claim is in their name and the money is paid to them or their appointee." },
  { q: "What if I already get PIP?", a: "You keep PIP after State Pension age and cannot get Attendance Allowance as well. PIP can be worth more because it has a mobility part." },
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

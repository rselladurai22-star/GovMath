import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import UcStudio from "./UcStudio";
import UcGuide from "./UcGuide";

export const metadata: Metadata = {
  title: "Universal Credit Calculator (2026/27 Rates)",
  description:
    "Estimate your monthly Universal Credit for 2026/27: standard allowance, children, rent with real Local Housing Allowance rates, health, carer and childcare elements, the 55% taper, savings and the benefit cap.",
  alternates: { canonical: "/benefits/universal-credit" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/universal-credit", label: "Universal Credit" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is Universal Credit in 2026/27?", a: "The standard allowance is £424.90 a month for a single person aged 25 or over and £666.97 for a couple. Children, rent, health conditions, caring and childcare add more." },
  { q: "Is there still a two-child limit?", a: "No. From April 2026 every child adds £303.94 a month, or £351.88 for an eldest child born before 6 April 2017." },
  { q: "How much can I earn on Universal Credit?", a: "There is no fixed limit. Above any work allowance of £427 or £710 a month, your award falls by 55p for each £1 of take-home pay until it reaches zero." },
  { q: "Can I get Universal Credit with savings?", a: "Yes, up to £16,000. Savings between £6,000 and £16,000 reduce your award by £4.35 a month for each £250." },
  { q: "Does the benefit cap affect Universal Credit?", a: "Yes, unless your household earns at least £881 a month or someone gets a disability or carer's benefit, the health element or the carer element." },
];

export default async function UniversalCreditPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit-taper", "/benefits/benefit-cap", "/benefits/local-housing-allowance", "/benefits/tax-free-childcare", "/benefits/child-benefit", "/benefits/carers-earnings"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Universal Credit Calculator"
      lead="Estimate your monthly Universal Credit with every element, real Local Housing Allowance rates, the earnings taper, savings and the benefit cap."
      points={["Every element", "Real LHA rates", "Benefit cap check", "Free and private"]}
      guide={<UcGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 Universal Credit rates. An estimate, not a decision on your claim."
    >
      <UcStudio query={query} />
    </FlagshipPage>
  );
}

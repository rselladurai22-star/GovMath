import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import TaperStudio from "./TaperStudio";
import TaperGuide from "./TaperGuide";

export const metadata: Metadata = {
  title: "Universal Credit Taper Calculator: What You Keep From Extra Hours (2026/27)",
  description:
    "See how much better off extra hours or a pay rise make you on Universal Credit. Applies 2026/27 Income Tax, National Insurance, pension and the 55% taper above your work allowance.",
  alternates: { canonical: "/benefits/universal-credit-taper" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/universal-credit-taper", label: "Universal Credit Taper" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Universal Credit taper rate?", a: "55%. Your award falls by 55p for every £1 of take-home pay above your work allowance." },
  { q: "What is the work allowance in 2026/27?", a: "£427 a month if your award includes help with rent, or £710 if it does not. Only households with children or a health condition get one." },
  { q: "How much of a pay rise do I keep on Universal Credit?", a: "Below the tax threshold you keep 45p of each extra pound. As a basic-rate taxpayer you keep about 32p, after 20% tax, 8% National Insurance and the 55% taper." },
  { q: "Do pension contributions increase Universal Credit?", a: "Yes. Universal Credit counts pay after pension contributions, so £100 into a pension costs a basic-rate taxpayer on the taper only about £32.40." },
];

export default async function UcTaperPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/benefit-cap", "/benefits/tax-free-childcare", "/tax-and-salary/salary-calculator", "/benefits/carers-earnings"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Universal Credit Taper Calculator"
      lead="Find out how much better off extra hours or a pay rise really make you, after tax, National Insurance and the 55% Universal Credit taper."
      points={["Real take-home pay", "Hours ladder", "Pension effect", "Free and private"]}
      guide={<TaperGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 rates. Not financial advice."
    >
      <TaperStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import LhaStudio from "./LhaStudio";
import LhaGuide from "./LhaGuide";

export const metadata: Metadata = {
  title: "Local Housing Allowance Calculator (2026/27 LHA Rates)",
  description:
    "Find your Local Housing Allowance for all 152 areas of England. Works out your bedroom entitlement, the shared rate for under-35s and any rent shortfall, using the rates frozen for 2026/27.",
  alternates: { canonical: "/benefits/local-housing-allowance" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/benefits", label: "Family & Benefits" },
  { href: "/benefits/local-housing-allowance", label: "Local Housing Allowance" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is Local Housing Allowance?", a: "The most rent Universal Credit or Housing Benefit will cover for a private tenancy, set for each area and number of bedrooms." },
  { q: "Have LHA rates gone up for 2026/27?", a: "No. The rates set in April 2024 have been frozen, so the same figures apply in 2026/27." },
  { q: "How many bedrooms am I allowed?", a: "One for a couple, one for each other person aged 16 or over, one for two children of the same sex under 16, one for two children under 10, and one for any other child, up to four." },
  { q: "What is the shared accommodation rate?", a: "The rate for a room in a shared house. It applies to single people under 35 without children, unless an exemption applies." },
];

export default async function LhaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/benefit-cap", "/benefits/universal-credit-taper", "/property/rent-vs-buy", "/property/council-tax-bands"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Local Housing Allowance Calculator"
      lead="Check how many bedrooms you are allowed, your Local Housing Allowance in any area of England, and how much of your rent it covers."
      points={["All 152 areas", "Bedroom rules", "Shortfall check", "Free and private"]}
      guide={<LhaGuide />}
      faqs={FAQS}
      related={related}
      note="Valuation Office Agency rates, frozen for 2026/27. Not financial advice."
    >
      <LhaStudio query={query} />
    </FlagshipPage>
  );
}

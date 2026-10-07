import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import LhaStudio from "./LhaStudio";
import { ogFor } from "@/gm/og";
import LhaGuide from "./LhaGuide";

export const metadata: Metadata = {
  title: "Local Housing Allowance Calculator 2026/27",
  description:
    "Free LHA calculator for all 200 areas of England, Scotland, Wales and NI. See your bedroom entitlement, the shared rate for under-35s and any rent shortfall.",
  alternates: { canonical: "/benefits/local-housing-allowance" },
  openGraph: ogFor("/benefits/local-housing-allowance"),
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
  { q: "Is Local Housing Allowance different on Universal Credit?", a: "Universal Credit has its own monthly rates, set from monthly rents. They are often a few pounds a month higher than the weekly Housing Benefit rate converted to a month. In Bristol the one-bedroom rate is £900 a month on Universal Credit and £207.12 a week on Housing Benefit." },
  { q: "Does it work for Scotland, Wales and Northern Ireland?", a: "Yes. Scotland has 18 rental areas, Wales has 22 and Northern Ireland has 8, each with its own rates, and the same bedroom rules apply. In Northern Ireland the Housing Executive sets the rates and your area depends on your postcode." },
  { q: "What is the shared accommodation rate?", a: "The rate for a room in a shared house. It applies to single people under 35 without children, unless an exemption applies." },
  { q: "Will LHA rates go up in April 2027?", a: "That depends on the government's decision in the autumn. Rates have been frozen since April 2024." },
  { q: "Do I get the LHA rate if my rent is lower?", a: "No. You get your actual rent or the LHA rate, whichever is lower." },
  { q: "Does the LHA include bills?", a: "No. Energy, water and food are not covered, even if your rent includes them. Some service charges are covered." },
  { q: "What if I share a house with friends?", a: "Each tenant is assessed separately, on their own share of the rent and their own household." },
  { q: "Does my age matter if I have children?", a: "No. Anyone with a child gets at least the one-bedroom rate, whatever their age." },
];

export default async function LhaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/universal-credit", "/benefits/benefit-cap", "/benefits/universal-credit-taper", "/property/rent-vs-buy", "/benefits/housing-benefit", "/life/pro-rata-rent"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rates"
      title="Local Housing Allowance Calculator"
      lead="Check how many bedrooms you are allowed, your Local Housing Allowance in any area of the UK, and how much of your rent it covers."
      points={["All 200 UK areas", "Bedroom rules", "Shortfall check", "Free and private"]}
      guide={<LhaGuide />}
      faqs={FAQS}
      related={related}
      note="Official rates for England, Scotland, Wales and Northern Ireland, frozen for 2026/27. Not financial advice."
    >
      <LhaStudio query={query} />
    </FlagshipPage>
  );
}

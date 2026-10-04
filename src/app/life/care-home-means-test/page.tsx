import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CareStudio from "./CareStudio";
import CareGuide from "./CareGuide";

export const metadata: Metadata = {
  title: "Care Home Means Test Calculator (2026/27)",
  description:
    "Find out who pays for a care home in 2026/27: the £23,250 and £14,250 capital limits, tariff income, your home, top-ups, NHS-funded nursing care, and how long savings last, for all four UK nations.",
  alternates: { canonical: "/life/care-home-means-test" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/care-home-means-test", label: "Care Home Means Test" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much savings can you have before paying for a care home?", a: "In England, if your capital is over £23,250 you pay in full. Between £14,250 and £23,250 you pay part. Scotland's limits are £36,750 and £22,750, and Wales has a single £50,000 limit." },
  { q: "Is my house counted for care home fees?", a: "After 12 weeks of permanent care, unless a partner or a relative aged 60 or over, or who is disabled, still lives there." },
  { q: "How much do you keep if the council pays?", a: "A personal expenses allowance of £31.80 a week in England in 2026/27." },
  { q: "What is tariff income?", a: "£1 a week of assumed income for each £250 of capital above the lower limit." },
];

export default async function CarePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/benefits/attendance-allowance", "/benefits/pension-credit", "/life/power-of-attorney", "/life/inheritance-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 limits"
      title="Care Home Means Test Calculator"
      lead="Find out who pays for a care home, what you contribute each week, and how long your savings would last."
      points={["All four UK nations", "Your home and top-ups", "Savings projection", "Free and private"]}
      guide={<CareGuide />}
      faqs={FAQS}
      related={related}
      note="2026/27 limits. Not financial advice."
    >
      <CareStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import InflationStudio from "./InflationStudio";
import InflationGuide from "./InflationGuide";

export const metadata: Metadata = {
  title: "Inflation Calculator UK: What Your Money Will Be Worth",
  description:
    "See what your savings will be worth in today's money, or what things will cost in future, using the latest UK CPI inflation. Includes real returns and tax on interest.",
  alternates: { canonical: "/investing/inflation-impact" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/inflation-impact", label: "Inflation Impact" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the UK inflation rate?", a: "CPI inflation was 3.1% in the year to August 2026. The Bank of England's target is 2%." },
  { q: "How much will £10,000 be worth in 10 years?", a: "Kept as cash with 3.1% inflation, it would buy what £7,369 buys today." },
  { q: "What is a real return?", a: "Your return after inflation: (1 + return) ÷ (1 + inflation) − 1. Earning 5% with 2% inflation is a real return of 2.94%." },
  { q: "How do I protect savings from inflation?", a: "Look for a savings rate above inflation, use your ISA allowance so interest is tax-free, and for long-term money consider investing." },
];

export default async function InflationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/compound-interest", "/investing/isa-vs-gia", "/investing/fire-calculator", "/investing/premium-bonds", "/tax-and-salary/salary-calculator"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Savings and prices"
      title="Inflation Impact Calculator"
      lead="See what your money will really be worth, or what things will cost, after inflation."
      points={["Latest UK CPI", "Real returns", "Tax on interest", "Free and private"]}
      guide={<InflationGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Future inflation is uncertain. Not financial advice."
    >
      <InflationStudio query={query} />
    </FlagshipPage>
  );
}

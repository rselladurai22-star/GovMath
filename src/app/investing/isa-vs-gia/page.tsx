import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import IsaStudio from "./IsaStudio";
import IsaGuide from "./IsaGuide";

export const metadata: Metadata = {
  title: "ISA vs GIA Calculator: How Much Tax an ISA Saves (2026/27)",
  description:
    "Compare a stocks and shares ISA with a general investment account over any number of years, with dividend tax, savings tax, Capital Gains Tax and the 2027 changes.",
  alternates: { canonical: "/investing/isa-vs-gia" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/investing", label: "Pensions & Investing" },
  { href: "/investing/isa-vs-gia", label: "ISA vs GIA" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is an ISA better than a general investment account?", a: "Yes, for most people, because dividends, interest and gains in an ISA are tax-free. A GIA pays tax once you pass the small allowances." },
  { q: "What is the ISA allowance for 2026/27?", a: "£20,000 a year across all your ISAs." },
  { q: "What changes to ISAs are coming?", a: "From 6 April 2027, savers under 65 can put at most £12,000 a year into cash ISAs. The overall limit stays at £20,000." },
  { q: "What is bed and ISA?", a: "Selling investments in a general account and buying them back inside an ISA, so future growth is tax-free." },
];

export default async function IsaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/investing/dividend-tax", "/investing/capital-gains-assets", "/investing/compound-interest", "/investing/pension-tax-relief", "/investing/premium-bonds", "/investing/inflation-impact"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 rules"
      title="ISA vs GIA Calculator"
      lead="See how much more you keep by investing through an ISA rather than a general investment account, year by year."
      points={["All three taxes", "Year-by-year chart", "2027 changes", "Free and private"]}
      guide={<IsaGuide />}
      faqs={FAQS}
      related={related}
      note="Illustration only. Not financial advice."
    >
      <IsaStudio query={query} />
    </FlagshipPage>
  );
}

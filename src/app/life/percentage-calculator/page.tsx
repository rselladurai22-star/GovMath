import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PercentStudio from "./PercentStudio";
import { ogFor } from "@/gm/og";
import PercentGuide from "./PercentGuide";

export const metadata: Metadata = {
  title: "Percentage Calculator: Increase, Decrease, Change",
  description:
    "Free percentage calculator. Work out a percentage of a number, percentage increase or decrease, percentage change and reverse percentages in one place.",
  alternates: { canonical: "/life/percentage-calculator" },
  openGraph: ogFor("/life/percentage-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/life", label: "Everyday Life" },
  { href: "/life/percentage-calculator", label: "Percentage Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out a percentage of a number?", a: "Divide the percentage by 100 and multiply by the number. 20% of 150 is 0.2 × 150 = 30." },
  { q: "How do I calculate a percentage increase?", a: "Take the new number from the old one, divide by the old number and multiply by 100. From 80 to 100 is a 25% increase." },
  { q: "How do I remove VAT from a price?", a: "Divide by 1.2 for 20% VAT. £54 including VAT is £45 before VAT." },
  { q: "What is a percentage point?", a: "The difference between two percentages. A rise from 4% to 5% is 1 percentage point, or 25%." },
  { q: "How do I calculate a percentage on a phone calculator?", a: "Multiply by the percentage and divide by 100. For 15% of 240, type 240 × 15 ÷ 100 = 36." },
  { q: "Can a percentage be more than 100?", a: "Yes. A rise from 50 to 150 is a 200% increase. A fall cannot be more than 100%." },
  { q: "What is the difference between margin and markup?", a: "Markup is profit as a percentage of cost; margin is profit as a percentage of the selling price." },
  { q: "How do I work out a percentage of a percentage?", a: "Multiply them as decimals. 50% of 40% is 0.5 × 0.4 = 0.2, or 20%." },
  { q: "How do I find what number a percentage came from?", a: "If 30 is 20% of a number, divide 30 by 0.2 to get 150." },
  { q: "Is a 100% increase the same as doubling?", a: "Yes. A 100% increase doubles a number, and a 200% increase triples it." },
  { q: "Why does a 10% rise then a 10% fall leave me worse off?", a: "Because the fall is 10% of a larger number. 100 rises to 110, then falls by 11 to 99, an overall fall of 1%." },
];

export default async function PercentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/vat-calculator", "/business/gross-profit-margin", "/investing/compound-interest", "/life/days-between-dates", "/life/timesheet-decimal"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With the working shown"
      title="Percentage Calculator"
      lead="Work out any percentage calculation, including reverse percentages and percentage points, with every step shown."
      points={["Seven calculations", "Reverse percentages", "Successive changes", "Free and private"]}
      guide={<PercentGuide />}
      faqs={FAQS}
      related={related}
      note="Results are rounded for display."
    >
      <PercentStudio query={query} />
    </FlagshipPage>
  );
}

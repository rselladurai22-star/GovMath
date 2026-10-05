import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import PercentStudio from "./PercentStudio";
import PercentGuide from "./PercentGuide";

export const metadata: Metadata = {
  title: "Percentage Calculator (Increase, Decrease, Reverse and More)",
  description:
    "Work out a percentage of a number, what percent one number is of another, percentage change, adding or removing a percentage, reverse percentages such as VAT, and percentage points, with the working shown.",
  alternates: { canonical: "/life/percentage-calculator" },
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

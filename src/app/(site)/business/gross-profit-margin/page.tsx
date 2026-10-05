import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MarginStudio from "./MarginStudio";
import MarginGuide from "./MarginGuide";

export const metadata: Metadata = {
  title: "Gross Profit Margin Calculator (Margin, Markup and Discounts)",
  description:
    "Work out gross margin and markup from a price and cost, with VAT taken out, yearly profit after overheads and what a discount does to your profit.",
  alternates: { canonical: "/business/gross-profit-margin" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/gross-profit-margin", label: "Gross Profit Margin" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I calculate gross profit margin?", a: "Take the direct cost away from the selling price to get gross profit, then divide by the selling price. £60 profit on a £100 sale is a 60% margin." },
  { q: "What is the difference between margin and markup?", a: "Margin is profit as a share of the selling price. Markup is profit as a share of the cost. A 50% margin is the same as a 100% markup." },
  { q: "Should margin include VAT?", a: "No. If you are VAT-registered, use the price and costs before VAT, because the VAT is collected for HMRC." },
  { q: "What is a good gross margin?", a: "It depends on your overheads and sales volume. Add your overheads to the profit you want and divide by your expected sales to find the margin you need." },
  { q: "How much extra do I need to sell after a discount?", a: "At a 40% margin, a 10% discount needs a third more sales to make the same gross profit, and a 20% discount needs twice as many." },
];

export default async function MarginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/retail-markup", "/business/break-even", "/business/vat-calculator", "/business/sole-trader-tax", "/business/corporation-tax", "/business/flat-rate-vat"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Pricing tool"
      title="Gross Profit Margin Calculator"
      lead="See your margin and markup on any sale, your profit for the year after overheads, and what a discount would really cost you."
      points={["Margin and markup", "VAT taken out", "Discount check", "Free and private"]}
      guide={<MarginGuide />}
      faqs={FAQS}
      related={related}
      note="Figures before tax. A pricing guide, not financial advice."
    >
      <MarginStudio query={query} />
    </FlagshipPage>
  );
}

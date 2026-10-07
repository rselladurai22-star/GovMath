import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MarginStudio from "./MarginStudio";
import { ogFor } from "@/gm/og";
import MarginGuide from "./MarginGuide";

export const metadata: Metadata = {
  title: "Profit Margin Calculator UK: Margin and Markup",
  description:
    "Free profit margin calculator. Work out gross margin, markup, selling price from a target margin and the effect of discounts, with VAT handled.",
  alternates: { canonical: "/business/gross-profit-margin" },
  openGraph: ogFor("/business/gross-profit-margin"),
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
  { q: "Can a margin be more than 100%?", a: "No. A margin of 100% means the sale cost you nothing. Markup has no upper limit: an item bought for £1 and sold for £10 has a 900% markup but a 90% margin." },
  { q: "Is gross margin the same as gross profit?", a: "No. Gross profit is an amount in pounds. Gross margin is that amount as a percentage of sales." },
  { q: "Should I include my own time in the cost?", a: "A sole trader's own time is not a cost in the accounts, so it is not part of gross margin. But your margin has to be big enough to pay you as well as your overheads. If you employ people to do the work, their wages for that work can be treated as a direct cost." },
  { q: "Do delivery costs count?", a: "Delivery you pay to get goods to a customer is a direct cost of that sale. Delivery to get stock into your premises is usually counted as part of the cost of the stock." },
  { q: "What about card fees and marketplace commission?", a: "They vary with each sale, so treat them as direct costs. A 10% marketplace fee on a sale at a 40% margin takes a quarter of your gross profit." },
  { q: "Why is my margin different in my accounts?", a: "Accounts include stock losses, discounts, returns and stock changes that a per-item calculation leaves out. If your accounts show a much lower margin than your prices suggest, those are the places to look." },
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

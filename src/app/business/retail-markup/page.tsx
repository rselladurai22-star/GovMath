import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import MarkupStudio from "./MarkupStudio";
import MarkupGuide from "./MarkupGuide";

export const metadata: Metadata = {
  title: "Retail Markup Calculator: Selling Price from Cost",
  description:
    "Find the selling price that hits a target markup or margin, with marketplace fees, postage, VAT and price rounding built in.",
  alternates: { canonical: "/business/retail-markup" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/retail-markup", label: "Retail Markup" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out a selling price from a markup?", a: "Multiply the cost by one plus the markup. A £25 item with a 50% markup sells for £37.50 before VAT." },
  { q: "How do I price for a target margin?", a: "Divide the cost by one minus the margin. A £25 item priced for a 50% margin sells for £50 before VAT." },
  { q: "What is keystone pricing?", a: "Doubling the wholesale cost: a 100% markup, which gives a 50% margin." },
  { q: "How do I cover marketplace fees in my price?", a: "Divide the cost by one minus the margin minus the fee percentage, so the fee is paid without reducing your margin." },
  { q: "Do I add VAT before or after markup?", a: "After. Work out your price before VAT, then add VAT on top if you are VAT-registered." },
  { q: "What markup do I need for a 30% margin?", a: "A 42.9% markup. Divide the margin by one minus the margin: 0.3 ÷ 0.7." },
  { q: "Is markup the same as profit?", a: "Markup is a percentage of cost; profit is an amount in pounds. A 50% markup on a £25 item is £12.50 of gross profit, before overheads and tax." },
  { q: "Should I use the price with or without VAT?", a: "Work out markup and margin on the price before VAT if you are VAT-registered. If you are not, use your cost including the VAT you paid, and there is no VAT to add to the price." },
  { q: "How do I price services rather than goods?", a: "The same maths works if you treat your direct costs, such as materials and subcontractors, as the cost. Many service businesses also price by the hour or day; make sure the rate covers your time, overheads and the weeks you cannot bill." },
  { q: "Can I sell below cost?", a: "Yes, as a one-off, for example to clear old stock. Just be clear that each sale loses money and does not count towards covering overheads." },
  { q: "How often should I review my prices?", a: "At least once a year, and whenever a supplier puts its prices up. Rerun the calculation with the new cost and check your margin is still where you need it." },
];

export default async function MarkupPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/gross-profit-margin", "/business/break-even", "/business/vat-calculator", "/business/flat-rate-vat", "/business/sole-trader-tax", "/business/small-business-rates"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Pricing tool"
      title="Retail Markup Calculator"
      lead="Turn a cost into a selling price that hits your target markup or margin, with fees, postage and VAT covered."
      points={["Markup or margin", "Fees priced in", "VAT and rounding", "Free and private"]}
      guide={<MarkupGuide />}
      faqs={FAQS}
      related={related}
      note="A pricing guide, not financial advice."
    >
      <MarkupStudio query={query} />
    </FlagshipPage>
  );
}

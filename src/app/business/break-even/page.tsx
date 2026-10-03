import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BreakEvenStudio from "./BreakEvenStudio";
import BreakEvenGuide from "./BreakEvenGuide";

export const metadata: Metadata = {
  title: "Break-Even Calculator: Sales Needed to Cover Your Costs",
  description:
    "Find how many sales you need to cover your costs, the sales for a profit target, your margin of safety and what a price change does to break-even.",
  alternates: { canonical: "/business/break-even" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/break-even", label: "Break-Even" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I calculate my break-even point?", a: "Divide your fixed costs by the contribution from each sale: the price minus the variable cost of that sale." },
  { q: "What is the difference between fixed and variable costs?", a: "Fixed costs, such as rent and insurance, stay the same however much you sell. Variable costs, such as stock and card fees, come with each sale." },
  { q: "How do I include the profit I want?", a: "Add the profit to your fixed costs before dividing by the contribution per sale." },
  { q: "What is a margin of safety?", a: "How far your expected sales are above break-even, as a share of expected sales. It shows how much sales could fall before you make a loss." },
  { q: "Should I use prices with or without VAT?", a: "Without VAT if you are VAT-registered. If you are not registered, include the VAT you pay in your costs." },
];

export default async function BreakEvenPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/gross-profit-margin", "/business/retail-markup", "/business/sole-trader-tax", "/business/corporation-tax", "/business/allowable-expenses", "/business/small-business-rates"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Planning tool"
      title="Break-Even Calculator"
      lead="Find how many sales you need to cover your costs, what you need for a profit target, and how much room you have."
      points={["Sales and income", "Profit target", "Margin of safety", "Free and private"]}
      guide={<BreakEvenGuide />}
      faqs={FAQS}
      related={related}
      note="Figures before VAT and tax. A planning guide, not financial advice."
    >
      <BreakEvenStudio query={query} />
    </FlagshipPage>
  );
}

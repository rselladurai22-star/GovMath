import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BreakEvenStudio from "./BreakEvenStudio";
import { ogFor } from "@/gm/og";
import BreakEvenGuide from "./BreakEvenGuide";

export const metadata: Metadata = {
  title: "Break-Even Calculator UK: Sales to Cover Costs",
  description:
    "Free break-even calculator. Work out the units and sales you need to cover fixed costs, your margin of safety and the profit at any sales level.",
  alternates: { canonical: "/uk/business/break-even" },
  openGraph: ogFor("/uk/business/break-even"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/business", label: "Business" },
  { href: "/uk/business/break-even", label: "Break-Even" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I calculate my break-even point?", a: "Divide your fixed costs by the contribution from each sale: the price minus the variable cost of that sale." },
  { q: "What is the difference between fixed and variable costs?", a: "Fixed costs, such as rent and insurance, stay the same however much you sell. Variable costs, such as stock and card fees, come with each sale." },
  { q: "How do I include the profit I want?", a: "Add the profit to your fixed costs before dividing by the contribution per sale." },
  { q: "What is a margin of safety?", a: "How far your expected sales are above break-even, as a share of expected sales. It shows how much sales could fall before you make a loss." },
  { q: "Should I use prices with or without VAT?", a: "Without VAT if you are VAT-registered. If you are not registered, include the VAT you pay in your costs." },
  { q: "Is break-even the same as profit?", a: "No. At break-even, profit is exactly zero. Profit starts with the next sale." },
  { q: "Should I include depreciation?", a: "For a planning figure, include the yearly cost of equipment you will need to replace, or the lease payments if you lease it. Leaving it out understates your real costs." },
  { q: "Should loan repayments be a fixed cost?", a: "Interest is a cost. Repaying the loan itself is not a cost in the accounts, but it is cash going out. For a cash break-even, include the full repayment." },
  { q: "How do I lower my break-even point?", a: "Raise prices, cut the cost of each sale, or cut fixed costs. Price usually has the biggest effect." },
  { q: "What about seasonal businesses?", a: "Work out break-even for the year, then check each month against a cash-flow forecast. You may need savings or an overdraft to get through the quiet months." },
  { q: "Do I need to include VAT?", a: "Not if you are VAT-registered: use prices and costs before VAT. If you are not registered, include the VAT you pay in your costs, because you cannot reclaim it." },
];

export default async function BreakEvenPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/business/gross-profit-margin", "/uk/business/retail-markup", "/uk/business/sole-trader-tax", "/uk/business/corporation-tax", "/uk/business/allowable-expenses", "/uk/business/small-business-rates"].includes(c.href));
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

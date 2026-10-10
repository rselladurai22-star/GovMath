import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SalesTaxStudio from "./SalesTaxStudio";
import SalesTaxGuide from "./SalesTaxGuide";

const PATH = "/us/taxes/sales-tax-calculator";

export const metadata: Metadata = {
  title: "Sales Tax Calculator: Every State's Rate 2026",
  description:
    "Free sales tax calculator for 2026. Add sales tax to a price or take it out of a total, with state and average local rates for all 50 states and DC.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Sales Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I add sales tax to a price?",
    a: "Multiply the price by the tax rate as a decimal and add it on. At 8.25%, a $100 item has $8.25 of tax, so you pay $108.25. Or multiply by 1.0825 in one step.",
  },
  {
    q: "How do I take sales tax out of a total?",
    a: "Divide the total by 1 plus the rate. A $108.25 receipt at 8.25% is $108.25 ÷ 1.0825 = $100 before tax. Taking 8.25% off the total would give the wrong answer.",
  },
  {
    q: "Which states have no sales tax?",
    a: "Alaska, Delaware, Montana, New Hampshire and Oregon have no statewide sales tax. Alaska lets local governments charge one, and its average local rate is about 1.82%.",
  },
  {
    q: "Which state has the highest sales tax?",
    a: "California has the highest statewide rate at 7.25%. Counting average local rates too, Louisiana is highest at about 10.13%, followed by Tennessee and Washington.",
  },
  {
    q: "Why is the rate at my store different from the state rate?",
    a: "Cities, counties and special districts add their own sales taxes on top of the state rate. The combined rate depends on the exact address of the sale, so it can differ from one side of a street to the other.",
  },
  {
    q: "What does the average local rate mean?",
    a: "It is the Tax Foundation's population-weighted average of local sales taxes in the state. Your own local rate may be higher or lower; enter it in the rate box for an exact figure.",
  },
  {
    q: "Is food taxed?",
    a: "It depends on the state. Most states exempt groceries or tax them at a lower rate, while restaurant meals are usually taxed in full. Clothing and medicine have their own rules in some states.",
  },
  {
    q: "Do I pay sales tax on online orders?",
    a: "Usually, yes. Since the Supreme Court's 2018 Wayfair decision, every state with a sales tax requires large online sellers to collect it, at the rate where the item is delivered.",
  },
  {
    q: "What is use tax?",
    a: "Use tax is owed to your state when you buy something taxable without paying its sales tax, for example from a seller that did not collect it. It is usually reported on your state income tax return.",
  },
  {
    q: "Can I deduct sales tax on my federal return?",
    a: "If you itemize, you can deduct state and local sales taxes instead of state income taxes, within the overall limit on state and local taxes. It helps most in states with no income tax.",
  },
  {
    q: "Is sales tax charged on a car?",
    a: "Yes, in most states, usually at the state rate plus any local rate where you register the car. Many states tax only the price after a trade-in. The auto loan calculator includes it.",
  },
];

export default async function SalesTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/tip-calculator", "/us/loans/auto-loan-calculator", "/us/taxes/paycheck-calculator", "/us/taxes/federal-income-tax", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Sales tax"
      title="Sales Tax Calculator"
      lead="Add sales tax to a price or take it out of a receipt total. Pick a state to fill in its rate with the average local tax, or type in your exact rate."
      points={["Add or remove tax", "All 50 states and DC", "Average local rates", "Editable rate"]}
      guide={<SalesTaxGuide />}
      faqs={FAQS}
      related={related}
      note="Rates are state rates plus average local rates as of July 1, 2026. Your exact rate depends on the address of the sale."
    >
      <SalesTaxStudio query={query} />
    </FlagshipPage>
  );
}

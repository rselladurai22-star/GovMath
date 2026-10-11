import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DiscountStudio from "./DiscountStudio";
import DiscountGuide from "./DiscountGuide";

export const metadata: Metadata = {
  title: "Discount Calculator: Sale Price and % Off",
  description:
    "Free discount calculator. Work out the sale price after % or money off, stacked discounts, the original price, 3 for 2 deals and the cheaper unit price.",
  alternates: { canonical: "/everyday/discount-calculator" },
  openGraph: ogFor("/everyday/discount-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/discount-calculator", label: "Discount Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out a discount?", a: "Multiply the price by the percentage and divide by 100 to get the saving, then take it off. 25% off 80 is a saving of 20, so you pay 60." },
  { q: "Is 20% off then an extra 10% off the same as 30% off?", a: "No. The extra 10% comes off the already reduced price, so the total is 28% off. On a price of 100 you pay 72, not 70." },
  { q: "How do I find the original price from a sale price?", a: "Divide the sale price by what was left after the discount. A price of 45 after 40% off is 45 ÷ 0.6 = 75." },
  { q: "What does 3 for 2 work out as?", a: "You pay for two items and get three, so each costs two thirds of the normal price. That is the same as 33.33% off, if you use all three." },
  { q: "Is buy one get one free the same as half price?", a: "Per item, yes: 50% off. The difference is that you must buy two. If you only need one, a half-price offer is better." },
  { q: "Which is better, money off or a percentage off?", a: "It depends on the price. 10 off a price of 40 is 25% off, but 10 off a price of 200 is only 5%. Work out both as a percentage of the price you pay." },
  { q: "Does the order of discounts matter?", a: "Between two percentages, no. Between a money-off voucher and a percentage, yes: on 60, 10 off then 20% off gives 40, but 20% off then 10 off gives 38." },
  { q: "What is a unit price?", a: "The price for a set amount, such as per kilogram, per litre or per 100 sheets. It lets you compare packs of different sizes fairly." },
  { q: "Do UK shop prices include VAT?", a: "Yes. Prices shown to consumers in the UK must include VAT, so a discount comes off the price you see. In most US states, sales tax is added at the till." },
  { q: "Why does my total differ by a penny?", a: "Shops round each line or each discount to the penny or cent, sometimes at different stages. Our results are rounded only for display." },
  { q: "Can a discount be more than 100%?", a: "No. A discount of 100% makes an item free, and money off cannot take a price below zero. This calculator stops at zero." },
];

export default async function DiscountPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/percentage-calculator", "/uk/business/vat-calculator", "/us/taxes/sales-tax-calculator", "/us/taxes/tip-calculator", "/uk/business/gross-profit-margin", "/everyday/fraction-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With the working shown"
      title="Discount Calculator"
      lead="Find the sale price after a percentage or money off, see what stacked discounts really save, and check whether a multi-buy deal is worth it."
      points={["Stacked discounts", "Original price", "3 for 2 deals", "Unit prices"]}
      guide={<DiscountGuide />}
      faqs={FAQS}
      related={related}
      note="Results are rounded for display. Check the price at the till."
    >
      <DiscountStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import TipStudio from "./TipStudio";
import TipGuide from "./TipGuide";

const PATH = "/us/taxes/tip-calculator";

export const metadata: Metadata = {
  title: "Tip Calculator: Split the Bill and Tip",
  description:
    "Free tip calculator for 2026. Work out the tip on a bill before or after tax, split it between any number of people and round each share up to the dollar.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Tip Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much should I tip at a restaurant?",
    a: "For table service in the US, 15% to 20% of the bill before tax is the usual guide, with 20% common for good service. Buffets are often around 10%.",
  },
  {
    q: "Should I tip on the total before or after tax?",
    a: "Etiquette guides such as the Emily Post Institute suggest tipping on the bill before tax. Tipping on the total after tax is fine too; it just adds a little more.",
  },
  {
    q: "How do I work out 20% quickly?",
    a: "Move the decimal point one place left to get 10%, then double it. On a $64 bill, 10% is $6.40, so 20% is $12.80. For 15%, add half of the 10% figure.",
  },
  {
    q: "How do I split the bill and tip?",
    a: "Add the tax and tip to the bill, then divide by the number of people. An $80 bill with $6.60 of tax and an 18% tip is $101 in all, or $50.50 each for two people.",
  },
  {
    q: "What does rounding up do to the tip?",
    a: "Rounding each person's share up to the next dollar adds to the tip. On the $80 bill split two ways, rounding $50.50 up to $51 each raises the tip from $14.40 to $15.40.",
  },
  {
    q: "Do I need to tip on takeout?",
    a: "It is not expected for a simple takeout order. Many people leave about 10% for a large or complicated order or curbside service.",
  },
  {
    q: "How much do I tip for delivery?",
    a: "A common guide is 10% to 15% of the bill, with a few dollars more for bad weather or long distances. Check whether a delivery fee already goes to the driver; often it does not.",
  },
  {
    q: "Is a service charge the same as a tip?",
    a: "Not always. A service charge added by the restaurant may be kept by the business or shared out differently. Ask, and don't tip twice unless you want to.",
  },
  {
    q: "Why do US servers depend on tips?",
    a: "Federal law lets employers pay tipped workers a cash wage as low as $2.13 an hour if tips bring them up to the $7.25 minimum wage. Many states require more.",
  },
  {
    q: "Are tips taxed for the worker?",
    a: "Yes, tips are income and subject to Social Security and Medicare. But for 2025 to 2028, workers in tipped jobs can deduct up to $25,000 of qualified tips from their federal taxable income.",
  },
  {
    q: "Should I tip on a discounted meal or with a gift card?",
    a: "Base the tip on what the meal would have cost before the discount, since the server did the same work.",
  },
];

export default async function TipPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/sales-tax-calculator", "/us/taxes/federal-income-tax", "/us/taxes/paycheck-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Tipping"
      title="Tip Calculator"
      lead="Work out the tip on a bill, before or after tax, and split the total between any number of people, with each share rounded up if you like."
      points={["Tip before or after tax", "Split the bill", "Round up", "Tipping guide"]}
      guide={<TipGuide />}
      faqs={FAQS}
      related={related}
      note="Tipping amounts are a guide, not a rule. Results are rounded to the cent."
    >
      <TipStudio query={query} />
    </FlagshipPage>
  );
}

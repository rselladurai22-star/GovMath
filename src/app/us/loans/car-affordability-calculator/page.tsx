import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CarAffordabilityStudio from "./CarAffordabilityStudio";
import CarAffordabilityGuide from "./CarAffordabilityGuide";

const PATH = "/us/loans/car-affordability-calculator";

export const metadata: Metadata = {
  title: "Car Affordability Calculator: 20/4/10 Rule",
  description:
    "Free car affordability calculator for 2026. How much car you can afford on your income, with the 20/4/10 rule, insurance, fuel, sales tax, trade-in and loan term.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Car Affordability Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much car can I afford on a $72,000 salary?",
    a: "Under the 20/4/10 rule, with $140 a month for insurance and $185 for fuel, about $12,154 with $2,431 down and a 48-month loan at 7.5%. Spending 10% of gross pay on all car costs over 60 months with $4,000 down allows about $15,817.",
  },
  {
    q: "What is the 20/4/10 rule for buying a car?",
    a: "Put at least 20% down, borrow for no more than 4 years, and keep the payment plus insurance (and, in stricter versions, fuel) under 10% of your gross monthly income.",
  },
  {
    q: "Is the 20/4/10 rule realistic in 2026?",
    a: "It is strict. With new car prices and insurance where they are, many people cannot buy a new car under it. It still works as a guide: a cheaper or used car, more down or a shorter loan all move you toward it.",
  },
  {
    q: "What percentage of my income should go to a car payment?",
    a: "A common guide is about 10% of gross pay for the payment, or 15% to 20% of take-home pay for all car costs together. The lower your other debts, the more room you have.",
  },
  {
    q: "Should I use gross or take-home pay?",
    a: "The 20/4/10 rule uses gross pay. Take-home pay is a stricter and more practical test, because it is the money you actually spend. The calculator lets you use either.",
  },
  {
    q: "Does a longer loan make a car more affordable?",
    a: "It lowers the payment, but not the cost. With a $275 payment at 7.5%, a 36-month loan buys about an $11,253 car and an 84-month loan about $19,747, with $5,171 of interest instead of $1,059.",
  },
  {
    q: "How much should I put down on a car?",
    a: "20% on a new car is the classic target, so you owe less than the car is worth from the start. At least 10% on a used car. Any trade-in equity counts toward it.",
  },
  {
    q: "What costs should I budget beyond the payment?",
    a: "Insurance, fuel or charging, maintenance, repairs, tires, registration and parking. AAA put the full cost of owning and running a new car at about $12,863 a year in its 2026 study.",
  },
  {
    q: "How does my credit score affect what I can afford?",
    a: "A higher rate means more of each payment goes to interest. With $275 a month over 60 months, the loan you can get falls from about $14,572 at 5% to $11,819 at 14%.",
  },
  {
    q: "Does sales tax count in the price I can afford?",
    a: "Yes. The calculator works out the sticker price after sales tax and fees are added to the loan. In most states a trade-in lowers the taxed amount.",
  },
  {
    q: "What if I owe more on my trade-in than it is worth?",
    a: "The shortfall is added to the new loan, so it eats into the price you can afford. Paying it down first, or keeping the old car longer, is usually cheaper.",
  },
];

export default async function CarAffordabilityPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/auto-loan-calculator", "/us/loans/car-lease-calculator", "/us/taxes/paycheck-calculator", "/us/loans/debt-to-income-ratio", "/us/housing/mortgage-affordability"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Income, the 20/4/10 rule and running costs"
      title="Car Affordability Calculator"
      lead="Find the most you should spend on a car from your income, with insurance and fuel counted, sales tax and fees added, and a check against the 20/4/10 rule."
      points={["Price from your income", "20/4/10 rule check", "Insurance and fuel included", "Terms compared"]}
      guide={<CarAffordabilityGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <CarAffordabilityStudio query={query} />
    </FlagshipPage>
  );
}

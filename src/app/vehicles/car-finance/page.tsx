import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CarFinanceStudio from "./CarFinanceStudio";
import CarFinanceGuide from "./CarFinanceGuide";

export const metadata: Metadata = {
  title: "Car Finance Calculator UK: PCP vs HP Monthly Payments (2026)",
  description:
    "Work out monthly payments on PCP and hire purchase car finance from the price, deposit, APR and balloon, and compare the total cost of each.",
  alternates: { canonical: "/vehicles/car-finance" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/vehicles", label: "Vehicles & Transport" },
  { href: "/vehicles/car-finance", label: "Car Finance Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the difference between PCP and HP?", a: "HP repays the whole car over the term and then it is yours. PCP repays only part, leaving a balloon payment to keep the car or the option to hand it back." },
  { q: "Is PCP or HP cheaper?", a: "HP is usually cheaper if you keep the car, because with PCP you pay interest on the balloon for the whole term. PCP has lower monthly payments." },
  { q: "How much is a £25,000 car on finance?", a: "With £2,500 down over 48 months at 9.9% APR, about £565 a month on HP or £410 a month on PCP with a £9,000 balloon." },
  { q: "Can I hand a finance car back early?", a: "Yes. Once you have paid half the total amount payable, you can end the agreement and return the car with nothing more to pay." },
  { q: "What is a GFV?", a: "The guaranteed future value: what the lender says the car will be worth at the end of a PCP. It sets the balloon payment." },
  { q: "What happens at the end of a PCP?", a: "You can pay the balloon and keep the car, hand it back, or part-exchange it for another car." },
  { q: "What is APR?", a: "The annual percentage rate, including interest and compulsory fees. Use it to compare finance deals." },
  { q: "Am I owed car finance compensation?", a: "If you took out car finance between April 2007 and November 2024, you may be due compensation under the FCA's redress scheme. Your lender should contact you." },
  { q: "Does car finance affect my credit score?", a: "A full application leaves a mark on your credit file, and missed payments damage your record. Soft-search quotes do not." },
  { q: "Is a personal loan better than car finance?", a: "Sometimes. A loan lets you own the car outright and may have a lower rate if you have good credit. Compare the total cost." },
  { q: "Can I sell a car that is on finance?", a: "Only after paying off the finance. Ask your lender for a settlement figure and clear it from the sale proceeds." },
  { q: "Do I need gap insurance?", a: "It covers the difference between the car's value and what you owe if it is written off. Standalone policies are usually cheaper than the dealer's." },
  { q: "Does a PCP count as a debt on my credit file?", a: "Yes. The full amount borrowed shows as a credit agreement, and on-time payments help your credit record." },
];

export default async function CarFinancePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/vehicles/car-tax-ved", "/vehicles/petrol-vs-ev-cost", "/vehicles/ev-salary-sacrifice", "/vehicles/fuel-cost-journey", "/vehicles/benefit-in-kind", "/investing/savings-interest"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026"
      title="Car Finance Calculator"
      lead="Work out the monthly payment on PCP or hire purchase car finance, and compare what each costs in total."
      points={["PCP and HP", "Total cost to own", "Balloon payments", "Free and private"]}
      guide={<CarFinanceGuide />}
      faqs={FAQS}
      related={related}
      note="An illustration from your APR. Your finance agreement shows the exact payments and total amount payable."
    >
      <CarFinanceStudio query={query} />
    </FlagshipPage>
  );
}

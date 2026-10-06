import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import RentVsBuyStudio from "./RentVsBuyStudio";
import RentVsBuyGuide from "./RentVsBuyGuide";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator (UK, 2026)",
  description:
    "Compare renting and buying over time: deposit, Stamp Duty, mortgage, upkeep and selling costs against rent and investing the difference, with your wealth year by year and the break-even point.",
  alternates: { canonical: "/property/rent-vs-buy" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/rent-vs-buy", label: "Rent vs Buy" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Is it better to rent or buy?", a: "It depends on how long you stay, house price growth, the rent compared with the price, mortgage rates and what your savings would earn. Buying usually wins over longer periods." },
  { q: "How long do I need to stay for buying to pay off?", a: "Often three to five years or more, because of the upfront and selling costs." },
  { q: "Is renting dead money?", a: "No more than mortgage interest, upkeep and Stamp Duty. The fair comparison is rent against those costs." },
  { q: "What return should I assume on investments?", a: "Long-term stock market returns have historically been higher than cash, but are not guaranteed. Try a cautious and an optimistic figure." },
  { q: "Does the calculator include Stamp Duty?", a: "Yes, for England and Northern Ireland, including first-time buyer relief." },
];

export default async function RentVsBuyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/property/mortgage-affordability", "/property/first-time-buyer", "/property/mortgage-repayment", "/benefits/local-housing-allowance", "/property/shared-ownership", "/property/moving-house-budget"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026"
      title="Rent vs Buy Calculator"
      lead="Compare your wealth year by year if you buy, or rent and invest the difference."
      points={["Wealth year by year", "Break-even point", "Your own assumptions", "Free and private"]}
      guide={<RentVsBuyGuide />}
      faqs={FAQS}
      related={related}
      note="Illustrative. Results depend heavily on your assumptions for house prices, rents and investment returns. Try several."
    >
      <RentVsBuyStudio query={query} />
    </FlagshipPage>
  );
}

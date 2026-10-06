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
  { q: "How long do I need to stay to make buying worthwhile?", a: "It depends on prices, rates and rents, but often three to five years or more. The calculator shows the break-even year." },
  { q: "What if house prices fall?", a: "Buyers with small deposits are hit hardest, and could owe more than the home is worth. If you can stay until prices recover, the loss is not realised." },
  { q: "Should I buy now or wait?", a: "No one can predict prices reliably. Buy when you can afford it comfortably and expect to stay for several years." },
  { q: "Does the calculator include the cost of moving again?", a: "Selling costs at the end are included. The cost of buying your next home is not, as it would apply to either choice." },
  { q: "What if I cannot afford a deposit yet?", a: "Then the choice is about saving while you rent. A Lifetime ISA or regular investing can build a deposit faster, and shared ownership needs a smaller one." },
  { q: "Should I include service charges?", a: "Yes, for a leasehold flat. Add them to the maintenance figure under More options as a share of the home's value." },
  { q: "Why does the buyer start behind?", a: "On day one the buyer has paid fees and Stamp Duty, and would pay selling costs if they sold, so their wealth starts lower." },
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

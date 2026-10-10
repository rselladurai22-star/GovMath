import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RentVsBuyStudio from "./RentVsBuyStudio";
import RentVsBuyGuide from "./RentVsBuyGuide";

export const metadata: Metadata = {
  title: "Rent vs Buy Calculator: Which Is Cheaper?",
  description:
    "Free rent vs buy calculator for 2026. Compare the full cost of owning and renting year by year, with investing the difference, and find your break-even year.",
  alternates: { canonical: "/us/housing/rent-vs-buy-calculator" },
  openGraph: ogFor("/us/housing/rent-vs-buy-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/rent-vs-buy-calculator", label: "Rent vs Buy Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is it cheaper to rent or buy in 2026?",
    a: "It depends on how long you stay, the rent for a similar home and mortgage rates. On a $400,000 home with 20% down at 7.25%, against $2,200 a month in rent, renting and investing the difference stays ahead for 10 years by about $11,900, but buying pulls ahead in year 13 and is about $22,500 ahead after 15 years.",
  },
  {
    q: "How long do I need to stay for buying to pay off?",
    a: "Usually five years or more, because buying and selling cost about 9% of the price in our default figures (3% closing costs plus 6% to sell). In the default example the break-even is year 13; with rent of $2,600 it falls to year 6, and at a 5.5% mortgage rate to year 5.",
  },
  {
    q: "What is the break-even year?",
    a: "The first year from which buying leaves you with more net worth than renting, and stays ahead to the end of your stay. Net worth counts the home's value after selling costs and the loan, plus any savings, against the renter's invested money after tax on gains.",
  },
  {
    q: "Isn't rent just money thrown away?",
    a: "Rent buys housing, just as mortgage interest, property tax, insurance and maintenance do for an owner. In the default example an owner pays about $369,700 over 10 years in costs that never come back, against about $304,700 of rent and renters insurance.",
  },
  {
    q: "Why does the calculator invest the renter's savings?",
    a: "To compare fairly. The buyer's down payment and closing costs, $92,000 in the example, would otherwise sit in the renter's account earning a return. Each month whoever pays less invests the difference, so both households spend the same.",
  },
  {
    q: "What investment return should I use?",
    a: "Use what you would really earn. A high-yield savings account paid around 4% in September 2026, while a diversified stock portfolio has returned more over long periods with big swings. In the example, each extra percentage point of return favors renting by roughly $15,000 to $20,000 over 10 years.",
  },
  {
    q: "What is the price-to-rent ratio?",
    a: "The home's price divided by a year's rent for a similar home. $400,000 against $2,200 a month is 15.2. The higher the ratio, the more renting tends to win; low ratios favor buying.",
  },
  {
    q: "Does the calculator include the mortgage interest deduction?",
    a: "No. For 2026 the standard deduction is $16,100 for single filers and $32,200 for married couples filing jointly, so many owners get little or no extra benefit from itemizing mortgage interest and property tax. If you itemize, buying would look a little better.",
  },
  {
    q: "Is the gain on my home taxed when I sell?",
    a: "Usually not. If you owned and lived in it for at least two of the last five years, you can exclude up to $250,000 of gain ($500,000 for married couples filing jointly). The calculator assumes your gain is covered.",
  },
  {
    q: "How much should I budget for maintenance?",
    a: "A common rule of thumb is about 1% of the home's value a year, which is the default. Older homes, big yards and harsh climates often need more, and costs come in lumps such as a roof or a furnace.",
  },
  {
    q: "What are selling costs?",
    a: "Agent commissions, transfer taxes, title and escrow fees and any repairs or credits you agree with the buyer. The default is 6% of the sale price; commissions are negotiable, so enter what you expect to pay.",
  },
  {
    q: "Should I wait for mortgage rates to fall before buying?",
    a: "Rates matter a lot: in the example, buying at 5.5% instead of 7.25% turns a $11,900 deficit after 10 years into a $57,300 lead. But nobody knows where rates or prices will go, and you can refinance later if rates fall. Buy when the payment fits your budget and you expect to stay.",
  },
];

export default async function RentVsBuyPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/housing/mortgage-affordability",
      "/us/housing/rent-affordability",
      "/us/housing/down-payment-calculator",
      "/us/savings/compound-interest-calculator",
      "/us/housing/closing-cost-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Owning against renting and investing"
      title="Rent vs Buy Calculator"
      lead="Compare the full cost of buying a home with renting a similar one, year by year, and see when buying starts to leave you better off."
      points={["Year-by-year net worth", "Break-even year", "Costs you never get back", "Investing the difference"]}
      guide={<RentVsBuyGuide />}
      faqs={FAQS}
      related={related}
      note="A model for planning, not financial advice. Prices, rents and returns can differ from these assumptions."
    >
      <RentVsBuyStudio query={query} />
    </FlagshipPage>
  );
}

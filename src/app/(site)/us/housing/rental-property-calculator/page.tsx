import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RentalStudio from "./RentalStudio";
import RentalGuide from "./RentalGuide";

export const metadata: Metadata = {
  title: "Rental Property Calculator: Cash Flow and ROI",
  description:
    "Free rental property calculator for 2026. Cash flow, NOI, cap rate, cash-on-cash return, DSCR, the 1% rule, depreciation and your return over the years you hold it.",
  alternates: { canonical: "/us/housing/rental-property-calculator" },
  openGraph: ogFor("/us/housing/rental-property-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/rental-property-calculator", label: "Rental Property Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I calculate cash flow on a rental property?",
    a: "Start with a year's rent, take off vacancy, then operating costs (management, repairs, a reserve for big replacements, property tax, insurance, HOA and utilities) to get net operating income. Take off the mortgage payments and what is left is cash flow.",
  },
  {
    q: "What is a good cap rate?",
    a: "There is no single answer: it depends on the area, the property and interest rates. The cap rate is the return you would earn paying cash, before tax. In our $300,000 example it is 6.35%. Compare it with your mortgage rate: if the cap rate is below the rate, borrowing lowers your cash return.",
  },
  {
    q: "What is cash-on-cash return?",
    a: "A year's cash flow divided by the cash you put in (down payment, closing costs and repairs). In the example, $171 of cash flow on $84,000 invested is 0.20%. With 40% down it is 3.06%.",
  },
  {
    q: "What is DSCR?",
    a: "The debt service coverage ratio: net operating income divided by the year's mortgage payments. Above 1.00 the rent covers the loan; below it you top up from your own pocket. Lenders that underwrite on rental income commonly look for about 1.2 or more.",
  },
  {
    q: "What is the 1% rule?",
    a: "A quick screen: monthly rent should be at least 1% of the price, so a $300,000 home should rent for $3,000. Few homes meet it where prices are high. Our example rents for 0.83% of the price and only just breaks even with 25% down at 7.5%.",
  },
  {
    q: "How is rental property depreciated?",
    a: "The building (not the land) is depreciated straight line over 27.5 years under IRS rules, starting in the month you place it in service. On a $300,000 purchase with $9,000 of closing costs and 20% land, that is $8,989 a year, a deduction that often wipes out the taxable profit in the early years.",
  },
  {
    q: "What is depreciation recapture?",
    a: "When you sell, the depreciation you took (or could have taken) is taxed at up to 25%, as unrecaptured section 1250 gain, with any further gain taxed at capital gains rates. In the example, 10 years of depreciation totals $89,516, so up to about $22,379 of tax.",
  },
  {
    q: "Can rental losses reduce my other taxes?",
    a: "Sometimes. Rental losses are passive, but if you actively manage the property you can deduct up to $25,000 a year against other income. The allowance phases out between $100,000 and $150,000 of modified AGI. Unused losses carry forward.",
  },
  {
    q: "How much should I budget for vacancy and repairs?",
    a: "The calculator starts at 5% of rent for vacancy, 5% for repairs and 5% for a capital reserve, plus 8% of collected rent for management. Older homes, lower-rent areas and student rentals often need more. Use your own figures if you have them.",
  },
  {
    q: "What return can I expect from a rental property?",
    a: "Most of the return often comes from paying down the loan and the property rising in value, not cash flow. In the example the internal rate of return over 10 years is about 10.3% a year with 3% growth, but only about 3.6% if the value does not grow.",
  },
  {
    q: "Should I pay cash or use a mortgage?",
    a: "Paying cash maximizes cash flow ($19,050 a year in the example) and removes the risk of a payment you can't cover, but ties up much more money. With a mortgage the return on your cash can be higher if the property grows, and lower if it doesn't.",
  },
  {
    q: "How much down payment do I need for a rental property?",
    a: "Conventional loans on an investment property usually need 15% to 25% down, and rates are higher than on a home you live in. FHA and VA loans are only for homes you live in, though both allow up to four units if you live in one.",
  },
];

export default async function RentalPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/taxes/capital-gains-tax",
      "/us/housing/rent-vs-buy-calculator",
      "/us/housing/down-payment-calculator",
      "/us/savings/compound-interest-calculator",
      "/us/housing/amortization-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Cash flow, cap rate and returns"
      title="Rental Property Calculator"
      lead="Work out a rental's cash flow, net operating income, cap rate, cash-on-cash return and DSCR, then see your return over the years you hold it, with depreciation."
      points={["Monthly cash flow and NOI", "Cap rate, cash-on-cash, DSCR", "1% rule and break-even occupancy", "Return with appreciation and depreciation"]}
      guide={<RentalGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate before income tax, not investment or tax advice."
    >
      <RentalStudio query={query} />
    </FlagshipPage>
  );
}

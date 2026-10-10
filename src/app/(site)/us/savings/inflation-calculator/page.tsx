import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import InflationStudio from "./InflationStudio";
import InflationGuide from "./InflationGuide";

const PATH = "/us/savings/inflation-calculator";

export const metadata: Metadata = {
  title: "Inflation Calculator: Dollar Value 1913–2026",
  description:
    "Free inflation calculator for 2026. See what a dollar from any year since 1913 is worth today, using official CPI-U data, plus future prices at any rate.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Inflation Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much is $100 from 2000 worth today?",
    a: "About $194.53 in August 2026 prices. Prices rose 94.5% over that time, an average of 2.59% a year, so a dollar from 2000 buys about 51 cents' worth of goods today.",
  },
  {
    q: "What was the inflation rate in 2025?",
    a: "The CPI-U annual average rose 2.6% from 2024 to 2025. Over the 12 months to August 2026, the latest figure here, prices rose 3.4%.",
  },
  {
    q: "What data does the calculator use?",
    a: "The Consumer Price Index for All Urban Consumers (CPI-U), all items, US city average, published by the Bureau of Labor Statistics. Each year uses its annual average index; 2026 uses the latest monthly index, August 2026.",
  },
  {
    q: "What is the average US inflation rate?",
    a: "From 1913 to 2025, prices rose an average of about 3.16% a year. Decades vary a lot: prices fell in the 1920s and 1930s, rose 7.82% a year in the 1970s and 1.73% a year in the 2010s.",
  },
  {
    q: "What was the highest inflation in US history?",
    a: "Since the CPI began in 1913, the highest annual rate was 18.0% in 1918, near the end of World War I. In the modern era, inflation peaked at 13.5% in 1980. The worst recent year was 2022, at 8.0%.",
  },
  {
    q: "Has the US ever had deflation?",
    a: "Yes. Prices fell 10.5% in 1921 and 9.9% in 1932, during the Great Depression. The most recent full year of falling prices was 2009, when the CPI-U annual average dropped 0.4%.",
  },
  {
    q: "Why doesn't my own inflation match the CPI?",
    a: "The CPI tracks an average basket of goods and services bought by urban households. If you spend more than average on rent, health care, child care or gasoline, your own inflation can be higher or lower than the official rate.",
  },
  {
    q: "How do I calculate inflation between two years?",
    a: "Divide the later year's CPI by the earlier year's and multiply by the amount. For example, $100 × (321.943 ÷ 172.2) shows what $100 of 2000 money was worth in 2025: about $186.96.",
  },
  {
    q: "What will $100 be worth in 20 years?",
    a: "At 3% inflation, something that costs $100 today will cost about $180.61 in 20 years, and $100 then will buy what about $55.37 buys today. At 2%, prices double in about 35 years.",
  },
  {
    q: "What is the difference between CPI-U and CPI-W?",
    a: "CPI-U covers all urban consumers, over 90% of the population. CPI-W covers a smaller group, urban wage earners and clerical workers, and is used to set Social Security's yearly cost-of-living adjustment. They usually move closely together.",
  },
  {
    q: "How can I protect my savings from inflation?",
    a: "Over long periods, stocks have usually outpaced inflation. For safer money, Treasury Inflation-Protected Securities (TIPS) and Series I savings bonds rise with the CPI, and high-yield savings accounts and CDs can at least narrow the gap.",
  },
];

export default async function InflationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/investment-calculator", "/us/savings/compound-interest-calculator", "/us/savings/retirement-calculator", "/us/taxes/raise-calculator", "/us/savings/retirement-withdrawal-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Prices and inflation"
      title="Inflation Calculator"
      lead="See what a dollar from any year since 1913 is worth today, how much prices rose in between, and what things may cost in the years ahead."
      points={["Official CPI-U from 1913", "Latest data: August 2026", "Average and total inflation", "Free and private"]}
      guide={<InflationGuide />}
      faqs={FAQS}
      related={related}
      note="Based on the CPI-U published by the Bureau of Labor Statistics. Your own costs may differ. Not financial advice."
    >
      <InflationStudio query={query} />
    </FlagshipPage>
  );
}

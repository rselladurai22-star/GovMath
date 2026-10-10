import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import NetWorthStudio from "./NetWorthStudio";
import NetWorthGuide from "./NetWorthGuide";

const PATH = "/us/savings/net-worth-calculator";

export const metadata: Metadata = {
  title: "Net Worth Calculator: Compare by Age",
  description:
    "Free net worth calculator for 2026. Add up assets and debts, see your debt-to-asset ratio and compare with the Federal Reserve's median net worth by age.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Net Worth Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I calculate my net worth?",
    a: "Add up everything you own at today's value (cash, retirement accounts, investments, your home, vehicles and other assets), then subtract everything you owe (mortgage, auto and student loans, credit cards and other debts). The result is your net worth.",
  },
  {
    q: "What is the average net worth in the US?",
    a: "In the Federal Reserve's 2022 Survey of Consumer Finances, the median family net worth was $192,900 and the mean was $1,063,700. The median is the better guide to a typical family, because a few very wealthy families pull the mean far up.",
  },
  {
    q: "What is a good net worth for my age?",
    a: "The 2022 medians by age of the family head were $39,000 under 35, $135,600 at 35 to 44, $247,200 at 45 to 54, $364,500 at 55 to 64, $409,900 at 65 to 74 and $335,600 at 75 or older. Being above the median for your age puts you ahead of half of families.",
  },
  {
    q: "Should I include my home in my net worth?",
    a: "Yes, at what it would sell for today, with the mortgage subtracted. But because you can't spend your home without selling or borrowing against it, the calculator also shows your net worth without the home and mortgage.",
  },
  {
    q: "Should I include my car?",
    a: "Yes, at its private-party sale value, with the loan subtracted. Cars lose value every year, so update the figure each time you work out your net worth.",
  },
  {
    q: "Do retirement accounts count toward net worth?",
    a: "Yes. Count 401(k), IRA and HSA balances in full, as the Federal Reserve does. Keep in mind that withdrawals from traditional accounts are taxed, so their spending power is lower than the balance; Roth balances can come out tax-free if the rules are met.",
  },
  {
    q: "Is a negative net worth bad?",
    a: "Not necessarily. Many people in their 20s have a negative net worth because of student loans. What matters is the trend: paying down debt and saving every month moves the number up.",
  },
  {
    q: "What is a good debt-to-asset ratio?",
    a: "Lower is safer. Under 30% is low, 30% to 50% is common mid-career with a mortgage, and above 80% leaves little cushion if asset values fall. Above 100% means your debts exceed your assets.",
  },
  {
    q: "What is liquid net worth?",
    a: "Cash and taxable investments minus non-mortgage debts. It leaves out your home and retirement accounts, so it shows the money you could reach quickly in a crisis.",
  },
  {
    q: "Are the survey figures per person or per household?",
    a: "Per family. A married couple counts as one family with their combined wealth, grouped by the age of the family head. Compare your household's figure, not one partner's.",
  },
  {
    q: "Why are the survey figures from 2022?",
    a: "The Survey of Consumer Finances runs every three years. The 2022 results, published in October 2023, are the latest; results from the 2025 survey are expected in late 2026. The figures are in 2022 dollars, so today's medians are likely somewhat higher.",
  },
  {
    q: "How often should I check my net worth?",
    a: "Once or twice a year is enough. Use the same date and the same way of valuing things each time, so you can see the trend. The calculator keeps your figures in its link, so you can save it and update it next year.",
  },
];

export default async function NetWorthPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/fire-calculator", "/us/savings/retirement-calculator", "/us/loans/debt-to-income-ratio", "/us/loans/debt-payoff-calculator", "/us/savings/emergency-fund-calculator", "/us/savings/401k-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Saving and retirement"
      title="Net Worth Calculator"
      lead="Add up what you own and what you owe to find your net worth, then see how it compares with American families of your age."
      points={["Assets minus debts", "Compared by age", "Debt-to-asset ratio", "Free and private"]}
      guide={<NetWorthGuide />}
      faqs={FAQS}
      related={related}
      note="Survey figures are for families, in 2022 dollars. Not financial advice."
    >
      <NetWorthStudio query={query} />
    </FlagshipPage>
  );
}

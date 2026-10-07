import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DebtPayoffStudio from "./DebtPayoffStudio";
import DebtPayoffGuide from "./DebtPayoffGuide";

const PATH = "/us/loans/debt-payoff-calculator";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator: Snowball vs Avalanche",
  description:
    "Free debt payoff calculator for 2026. Compare the snowball and avalanche methods for up to six debts, with your payoff order, interest and debt-free date.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Debt Payoff Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the debt snowball method?", a: "You pay the minimum on every debt and put all extra money on the smallest balance. When it is gone, its payment rolls on to the next smallest, so the amount you pay grows like a snowball." },
  { q: "What is the debt avalanche method?", a: "You pay the minimum on every debt and put all extra money on the debt with the highest interest rate, then the next highest. It costs the least interest of any order." },
  { q: "Which is better, snowball or avalanche?", a: "The avalanche always costs the same or less interest. The snowball clears individual debts sooner, which helps many people stay motivated. In our example the avalanche saved $346 over 29 months." },
  { q: "How much faster will I be debt-free if I pay extra?", a: "In our example, $20,200 of debt with $630 of minimums takes 43 months with the minimums rolled over. Adding $200 a month cuts that to 29 months and saves about $2,900 of interest." },
  { q: "Should I include my mortgage?", a: "Usually not. Mortgages have low rates and long terms; most plans focus on cards, personal loans, car loans and similar debts." },
  { q: "Should I include student loans?", a: "Private student loans, yes. Federal loans have income-driven plans and forgiveness options, so check those before paying them early." },
  { q: "What if two debts have the same rate?", a: "The calculator's avalanche pays the smaller balance first when rates tie, and the snowball pays the higher rate first when balances tie." },
  { q: "Does consolidating my debts help?", a: "It can, if the new loan or 0% card has a lower rate after fees and you stop borrowing. Enter the consolidation loan as one debt in place of the debts it replaces." },
  { q: "Should I save or pay off debt first?", a: "Keep a small emergency fund, often about $1,000 or one month of expenses, and take any 401(k) match. Then put extra money on high-rate debt." },
  { q: "What happens when a debt is paid off?", a: "Its minimum payment is added to the extra and goes to the next debt in the order, so your total monthly payment stays the same until everything is cleared." },
  { q: "Why does the calculator say I will never be debt-free?", a: "Your total monthly payments do not cover the interest being charged. Increase the extra amount or the minimums, or look at lowering your rates." },
  { q: "Will paying off debt raise my credit score?", a: "Usually, especially paying down credit cards, which cuts your credit utilization. Paying on time every month matters most." },
  { q: "How do I list my debts in the calculator?", a: "Enter each debt's balance, APR and minimum payment from your latest statement. Leave out your mortgage. Use More debts for a fifth and sixth debt, and set unused debts to a zero balance." },
];

export default async function DebtPayoffPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/credit-card-payoff", "/us/loans/loan-calculator", "/us/loans/debt-to-income-ratio", "/us/loans/student-loan-calculator", "/us/savings/savings-goal-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Loans and debt"
      title="Debt Payoff Calculator"
      lead="Compare the snowball and avalanche methods for up to six debts and see your payoff order, the interest you pay and your debt-free date."
      points={["Up to six debts", "Snowball vs avalanche", "Debt-free date", "Balance chart"]}
      guide={<DebtPayoffGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates only. Lenders may charge interest daily and change rates or minimum payments. Not financial advice."
    >
      <DebtPayoffStudio query={query} />
    </FlagshipPage>
  );
}

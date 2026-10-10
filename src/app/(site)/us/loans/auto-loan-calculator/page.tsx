import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AutoLoanStudio from "./AutoLoanStudio";
import AutoLoanGuide from "./AutoLoanGuide";

const PATH = "/us/loans/auto-loan-calculator";

export const metadata: Metadata = {
  title: "Auto Loan Calculator: Car Payment with Tax",
  description:
    "Free auto loan calculator for 2026. Car payment with sales tax by state, fees, trade-in, negative equity and rebates, plus 36 to 84 month terms compared.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Auto Loan Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is a car payment calculated?", a: "The lender takes the amount financed, charges interest each month at the APR ÷ 12, and sets an equal payment that clears the loan over the term. $27,830 at 7.2% over 60 months is $553.70 a month." },
  { q: "Should I include sales tax in my auto loan?", a: "You can finance it, but you then pay interest on it. On a $27,830 loan at 7.2% over 60 months, paying the $2,030 of tax and $800 of fees upfront saves about $548 of interest." },
  { q: "Do I pay sales tax on the full price if I trade in a car?", a: "In most states you pay tax only on the price minus the trade-in. California, Hawaii and Virginia tax the full price, and a few states cap the credit. Check your state's motor vehicle department." },
  { q: "What is a good auto loan rate in 2026?", a: "The Federal Reserve's survey put the average bank rate on a 72-month new car loan at about 7.2% in August 2026. Borrowers with strong credit can get less, and used car loans usually cost more." },
  { q: "Is a 72- or 84-month car loan a bad idea?", a: "It lowers the payment but costs more interest and leaves you owing more than the car is worth for longer. On the example loan, 84 months costs $2,289 more interest than 60 months." },
  { q: "Can I deduct car loan interest on my taxes?", a: "From 2025 to 2028, yes, if the loan was taken out after 2024 to buy a new car for personal use with final assembly in the United States. You can deduct up to $10,000 a year, phased out above $100,000 of modified AGI ($200,000 joint), whether or not you itemize." },
  { q: "Does a used car qualify for the car loan interest deduction?", a: "No. The vehicle must be new (its original use must start with you). Leases do not qualify either." },
  { q: "What is negative equity?", a: "Owing more on your current car than it is worth. If you trade it in, the shortfall is usually added to the new loan, so you pay interest on it and start the new loan upside down." },
  { q: "How much should I put down on a car?", a: "Many guides suggest about 20% on a new car and 10% on a used one. A bigger down payment lowers the payment, the interest and the risk of owing more than the car is worth." },
  { q: "Is a rebate or 0% financing better?", a: "Compare both. Enter the rebate with the rate your bank offers, then the promotional rate without the rebate, and pick the lower total cost." },
  { q: "Can I pay off my car loan early?", a: "Usually, yes. Most auto loans use simple interest and have no prepayment penalty, so extra payments go to principal and cut interest. Check your contract to be sure." },
  { q: "Does shopping for a car loan hurt my credit?", a: "Several auto loan inquiries within a short period, typically 14 to 45 days depending on the scoring model, count as one, so compare lenders within a couple of weeks." },
];

export default async function AutoLoanPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/loan-calculator", "/us/loans/debt-to-income-ratio", "/us/taxes/sales-tax-calculator", "/us/taxes/paycheck-calculator", "/us/loans/debt-payoff-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Loans and debt"
      title="Auto Loan Calculator"
      lead="Work out your car payment with sales tax, fees, your trade-in and any loan still on it, and see what a longer term really costs."
      points={["Sales tax by state", "Trade-in and negative equity", "Terms compared", "Interest deduction"]}
      guide={<AutoLoanGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates only. Your lender's contract and your state's vehicle tax rules decide the final figures. Not financial or tax advice."
    >
      <AutoLoanStudio query={query} />
    </FlagshipPage>
  );
}

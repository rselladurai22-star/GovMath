import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ExpensesStudio from "./ExpensesStudio";
import ExpensesGuide from "./ExpensesGuide";

export const metadata: Metadata = {
  title: "Allowable Expenses Calculator for Sole Traders (2026/27)",
  description:
    "Add up your allowable business expenses, including mileage and working from home, and see exactly how much Income Tax and National Insurance they save.",
  alternates: { canonical: "/business/allowable-expenses" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/allowable-expenses", label: "Allowable Expenses" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What expenses can a sole trader claim?", a: "Costs incurred wholly and exclusively for the business, such as stock, tools, software, business travel, insurance, accountancy, advertising and the business share of phone and home costs." },
  { q: "How much tax do expenses save?", a: "About 26p per £1 for a basic-rate sole trader (20% Income Tax plus 6% Class 4 NI), and about 42p for a higher-rate one." },
  { q: "Can I claim for working from home?", a: "Yes. Either a flat £10, £18 or £26 a month depending on hours, or a share of your actual household bills." },
  { q: "Should I claim expenses or the trading allowance?", a: "The £1,000 trading allowance is better if your real costs are under £1,000. You cannot claim both." },
  { q: "What can't I claim?", a: "Your own drawings, everyday clothes, commuting, client entertainment, fines and the capital part of loan repayments." },
];

export default async function ExpensesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/sole-trader-tax", "/business/business-mileage", "/business/payment-on-account", "/business/cis-deduction", "/business/vat-calculator", "/business/break-even"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Sole traders 2026/27"
      title="Allowable Expenses Calculator"
      lead="Add up what you can claim, including mileage and working from home, and see how much tax your expenses save."
      points={["Every common category", "Mileage and home working", "Exact tax saving", "Free and private"]}
      guide={<ExpensesGuide />}
      faqs={FAQS}
      related={related}
      note="Sole traders, 2026/27 tax rules. Not tax advice."
    >
      <ExpensesStudio query={query} />
    </FlagshipPage>
  );
}

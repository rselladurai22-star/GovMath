import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ExpensesStudio from "./ExpensesStudio";
import { ogFor } from "@/gm/og";
import ExpensesGuide from "./ExpensesGuide";

export const metadata: Metadata = {
  title: "Allowable Expenses Calculator for Sole Traders",
  description:
    "Free allowable expenses calculator for sole traders in 2026/27. Add up costs, mileage and working from home, and see the Income Tax and NI they save.",
  alternates: { canonical: "/business/allowable-expenses" },
  openGraph: ogFor("/business/allowable-expenses"),
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
  { q: "Can I claim my mobile phone?", a: "Yes, the business share. If the contract is in the business's name and used only for work, all of it." },
  { q: "Can I claim gym membership or health costs?", a: "No. They have a personal benefit, even if fitness helps your work." },
  { q: "What about Christmas gifts for clients?", a: "Gifts of food, drink, tobacco or vouchers are not allowable. Other gifts carrying a conspicuous business advert and costing no more than £50 per person a year are." },
  { q: "Can I claim costs from before I started trading?", a: "Yes. Costs in the seven years before you started can be treated as if incurred on the first day of trading, as long as they would have been allowable then." },
  { q: "What if I claim something by mistake?", a: "You can amend your return within 12 months of the 31 January deadline. If HMRC finds an error first, you pay the tax plus interest, and possibly a penalty if you were careless." },
  { q: "Can I claim my accountant's fees?", a: "Yes. Accountancy and bookkeeping for the business are allowable, including software for keeping your records." },
  { q: "Do I need a receipt for every expense?", a: "You need evidence for every claim. A receipt or invoice is best; a bank or card statement can do for small items if it shows what was bought." },
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

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CorpTaxStudio from "./CorpTaxStudio";
import CorpTaxGuide from "./CorpTaxGuide";

export const metadata: Metadata = {
  title: "Corporation Tax Calculator with Marginal Relief (2026/27)",
  description:
    "Work out UK Corporation Tax at 19% to 25% with marginal relief, associated companies, short accounting periods, losses and your payment deadline.",
  alternates: { canonical: "/business/corporation-tax" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/corporation-tax", label: "Corporation Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the Corporation Tax rate for 2026/27?", a: "19% on profits up to £50,000, 25% on profits of £250,000 or more, and 25% less marginal relief in between." },
  { q: "How is marginal relief worked out?", a: "Tax at 25% minus 3/200 of the difference between £250,000 and your profits. It means profits between the limits are taxed at an effective 26.5% on each extra pound." },
  { q: "How do associated companies affect Corporation Tax?", a: "The £50,000 and £250,000 limits are divided by the number of associated companies plus one, so two connected companies get £25,000 and £125,000 each." },
  { q: "When is Corporation Tax due?", a: "Nine months and one day after the end of the accounting period. The company tax return is due 12 months after it." },
  { q: "Do dividends reduce Corporation Tax?", a: "No. Dividends are paid from profit after tax. Salaries, employer NI and employer pension contributions are deductible." },
  { q: "Is Corporation Tax charged on turnover?", a: "No. It is charged on taxable profit, after costs and allowances." },
  { q: "What if my year end is not 31 March?", a: "The rates are the same for financial years 2025 and 2026, so any 12-month period ending in 2026 or 2027 uses the same figures. If rates changed between financial years, profits would be split across them." },
  { q: "Does a dormant company pay Corporation Tax?", a: "No, as long as it has no income. HMRC may not even need a return, but Companies House still needs accounts." },
  { q: "What happens if I make a loss?", a: "There is no Corporation Tax. A trading loss can be carried back against the previous year's profit for a refund, set against other profits in the same year, or carried forward." },
  { q: "Can I pay Corporation Tax early?", a: "Yes. HMRC accepts payment before the due date, and may pay a small amount of interest on early payments. Many companies set money aside each month so the bill is ready." },
];

export default async function CorpTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/dividend-vs-salary", "/business/employer-ni-costs", "/business/sole-trader-tax", "/business/vat-calculator", "/business/gross-profit-margin", "/investing/dividend-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Financial year 2026"
      title="Corporation Tax Calculator"
      lead="Work out your company's Corporation Tax with marginal relief, and see when it has to be paid."
      points={["19% to 25% with marginal relief", "Associated companies", "Payment deadlines", "Free and private"]}
      guide={<CorpTaxGuide />}
      faqs={FAQS}
      related={related}
      note="Corporation Tax rates for financial years 2025 and 2026. Not tax advice."
    >
      <CorpTaxStudio query={query} />
    </FlagshipPage>
  );
}

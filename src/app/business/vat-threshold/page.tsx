import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import VatThresholdStudio from "./VatThresholdStudio";
import VatThresholdGuide from "./VatThresholdGuide";

export const metadata: Metadata = {
  title: "VAT Threshold Checker 2026/27: Do I Need to Register for VAT?",
  description:
    "Check your rolling 12-month turnover against the £90,000 VAT registration threshold, see your deadline and when you would cross it, and what registering would cost.",
  alternates: { canonical: "/business/vat-threshold" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Freelance & Business" },
  { href: "/business/vat-threshold", label: "VAT Threshold Checker" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the VAT threshold for 2026/27?", a: "£90,000 of taxable turnover in any rolling 12 months. The deregistration threshold is £88,000." },
  { q: "Is the VAT threshold based on profit or turnover?", a: "Turnover: your total taxable sales, not profit." },
  { q: "When do I have to register for VAT?", a: "Within 30 days of the end of the month your rolling 12-month turnover went over £90,000." },
  { q: "Is the VAT threshold based on the tax year?", a: "No. It is a rolling 12 months, checked at the end of every month." },
  { q: "What if I win a big contract?", a: "If you expect over £90,000 in the next 30 days alone, you must register by the end of those 30 days." },
  { q: "Do zero-rated sales count?", a: "Yes. Zero-rated sales count towards taxable turnover. Exempt sales do not." },
  { q: "What happens if I register late?", a: "HMRC backdates your registration, so you owe VAT on past sales even if you did not charge it, plus a penalty." },
  { q: "Can I register for VAT voluntarily?", a: "Yes. It can help if most customers are VAT registered or you have large costs with VAT to reclaim." },
  { q: "Can I deregister if my turnover falls?", a: "Yes, if you expect taxable turnover in the next 12 months to be £88,000 or less." },
  { q: "Will registering for VAT cost me money?", a: "If your customers are consumers and you keep prices the same, a sixth of what they pay goes to HMRC, less VAT you reclaim on costs." },
  { q: "Can I reclaim VAT on things I bought before registering?", a: "Yes, on goods you still have bought up to four years before, and on services bought up to six months before, with valid invoices." },
  { q: "Does the VAT threshold apply to each business I run?", a: "For a sole trader, all activities count together. A partnership or company has its own separate threshold." },
];

export default async function VatThresholdPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/vat-calculator", "/business/flat-rate-vat", "/business/sole-trader-tax", "/business/day-rate", "/business/gross-profit-margin", "/business/payment-on-account"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026/27 thresholds"
      title="VAT Threshold Checker"
      lead="Check your rolling turnover against the £90,000 VAT threshold, when you would cross it, and your registration deadline."
      points={["Rolling 12 months", "30-day test", "Deadlines", "Free and private"]}
      guide={<VatThresholdGuide />}
      faqs={FAQS}
      related={related}
      note="General information on the VAT registration rules. HMRC's VAT Notice 700/1 has the full detail."
    >
      <VatThresholdStudio query={query} />
    </FlagshipPage>
  );
}

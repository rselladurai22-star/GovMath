import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import VatStudio from "./VatStudio";
import VatGuide from "./VatGuide";

export const metadata: Metadata = {
  title: "UK VAT Calculator: Add or Remove VAT (20%, 5%, 0%)",
  description:
    "Add or remove UK VAT at 20%, 5% or 0%, with the VAT shown separately, invoice totals for several items, a registration threshold check and a Flat Rate Scheme comparison.",
  alternates: { canonical: "/business/vat-calculator" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/vat-calculator", label: "VAT Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I add VAT to a price?", a: "Multiply the price before VAT by 1.2 for the 20% standard rate, or by 1.05 for the 5% reduced rate." },
  { q: "How do I remove VAT from a price?", a: "Divide the VAT-inclusive price by 1.2 at 20%. Taking 20% off gives the wrong answer: £120 less 20% is £96, but the price before VAT is £100." },
  { q: "How much VAT is in a price that includes VAT?", a: "One-sixth of it at 20%, and one twenty-first at 5%." },
  { q: "When do I have to register for VAT?", a: "When your taxable sales go over £90,000 in any rolling 12 months, or you expect them to go over £90,000 in the next 30 days alone." },
  { q: "What is the difference between zero-rated and exempt?", a: "Zero-rated sales are taxable at 0%, count towards the threshold and let you reclaim VAT on costs. Exempt sales do neither." },
];

export default async function VATPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/flat-rate-vat", "/business/gross-profit-margin", "/business/retail-markup", "/business/sole-trader-tax", "/business/allowable-expenses", "/business/corporation-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Standard rate: 20%"
      title="VAT Calculator"
      lead="Add VAT to a price or take it out, at 20%, 5% or 0%, with the maths shown and checks for registration and the Flat Rate Scheme."
      points={["Add or remove VAT", "20%, 5% and 0% rates", "Invoice totals", "Free and private"]}
      guide={<VatGuide />}
      faqs={FAQS}
      related={related}
      note="UK VAT rates. Check the rate for your goods or services on GOV.UK. Not tax advice."
    >
      <VatStudio query={query} />
    </FlagshipPage>
  );
}

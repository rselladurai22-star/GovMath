import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CisStudio from "./CisStudio";
import CisGuide from "./CisGuide";

export const metadata: Metadata = {
  title: "CIS Deduction Calculator (Construction Industry Scheme)",
  description:
    "Work out the 20% or 30% CIS deduction on a subcontractor invoice, with materials, VAT and the reverse charge, and estimate your refund at the end of the year.",
  alternates: { canonical: "/business/cis-deduction" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/cis-deduction", label: "CIS Deduction" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much is the CIS deduction?", a: "20% of labour for a registered subcontractor, 30% if not registered or not verified, and nothing with gross payment status." },
  { q: "Is CIS deducted from materials?", a: "No. The deduction is on labour only. Materials, plant hire and VAT are taken out first, so show them separately on your invoice." },
  { q: "Can I get CIS deductions back?", a: "Yes. They count towards your Income Tax and National Insurance, and most sole traders get a refund after their tax return because of expenses and the Personal Allowance." },
  { q: "Does the VAT reverse charge apply to CIS work?", a: "For most construction services between VAT-registered businesses, yes. The subcontractor does not charge VAT and the contractor accounts for it instead." },
  { q: "How do I get gross payment status?", a: "A sole trader needs at least £30,000 a year of construction turnover, excluding VAT and materials, a good compliance record and a business run through a bank account." },
];

export default async function CisPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/sole-trader-tax", "/business/allowable-expenses", "/business/business-mileage", "/business/payment-on-account", "/business/vat-calculator", "/business/flat-rate-vat"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Construction Industry Scheme"
      title="CIS Deduction Calculator"
      lead="See what a contractor will deduct and pay on your invoice, and whether you are heading for a refund at the end of the year."
      points={["20%, 30% or gross", "Materials and VAT", "Year-end refund", "Free and private"]}
      guide={<CisGuide />}
      faqs={FAQS}
      related={related}
      note="Construction Industry Scheme, 2026/27. Not tax advice."
    >
      <CisStudio query={query} />
    </FlagshipPage>
  );
}

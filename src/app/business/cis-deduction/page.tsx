import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CisStudio from "./CisStudio";
import { ogFor } from "@/gm/og";
import CisGuide from "./CisGuide";

export const metadata: Metadata = {
  title: "CIS Deduction Calculator UK 2026/27",
  description:
    "Free CIS calculator for subcontractors. Work out the 20% or 30% deduction on labour, your net payment and what you could reclaim at the year end.",
  alternates: { canonical: "/business/cis-deduction" },
  openGraph: ogFor("/business/cis-deduction"),
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
  { q: "Is CIS an extra tax?", a: "No. It is an advance payment of your Income Tax and National Insurance, credited on your tax return." },
  { q: "Do I pay CIS on materials?", a: "No, as long as they are shown separately on the invoice and you bought them for the job." },
  { q: "Can I claim expenses if I am under CIS?", a: "Yes. You claim them on your tax return in the normal way. That is why most subcontractors get a refund: the 20% was taken before expenses." },
  { q: "My contractor deducted 30%. Why?", a: "Either you are not registered, or HMRC could not match your details when the contractor verified you. Register, or check your name, UTR and NI number with the contractor." },
  { q: "Does CIS apply to work for homeowners?", a: "No. Homeowners paying for work on their own home are not contractors and do not deduct anything." },
  { q: "Do I still need to pay National Insurance?", a: "Yes. Class 4 NI is worked out on your tax return, and your CIS deductions count towards it." },
  { q: "Do I have to register for CIS?", a: "Registering is not compulsory for subcontractors, but if you do not, contractors must deduct 30% instead of 20%." },
  { q: "Does the contractor deduct CIS from my VAT?", a: "No. CIS is never taken from VAT. Under the reverse charge there is no VAT on the invoice at all." },
  { q: "Can I get gross payment status in my first year?", a: "Usually not, because HMRC needs a 12-month record of turnover and compliance. Apply once you have a year of trading behind you." },
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

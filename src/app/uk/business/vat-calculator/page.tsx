import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import VatStudio from "./VatStudio";
import { ogFor } from "@/gm/og";
import VatGuide from "./VatGuide";

export const metadata: Metadata = {
  title: "VAT Calculator UK: Add or Remove VAT",
  description:
    "Free UK VAT calculator. Add or remove VAT at 20%, 5% or 0% in one click and see the net, VAT and gross amounts. Works for single items or invoice totals.",
  alternates: { canonical: "/uk/business/vat-calculator" },
  openGraph: ogFor("/uk/business/vat-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/business", label: "Business" },
  { href: "/uk/business/vat-calculator", label: "VAT Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I add VAT to a price?", a: "Multiply the price before VAT by 1.2 for the 20% standard rate, or by 1.05 for the 5% reduced rate." },
  { q: "How do I remove VAT from a price?", a: "Divide the VAT-inclusive price by 1.2 at 20%. Taking 20% off gives the wrong answer: £120 less 20% is £96, but the price before VAT is £100." },
  { q: "How much VAT is in a price that includes VAT?", a: "One-sixth of it at 20%, and one twenty-first at 5%." },
  { q: "When do I have to register for VAT?", a: "When your taxable sales go over £90,000 in any rolling 12 months, or you expect them to go over £90,000 in the next 30 days alone." },
  { q: "What is the difference between zero-rated and exempt?", a: "Zero-rated sales are taxable at 0%, count towards the threshold and let you reclaim VAT on costs. Exempt sales do neither." },
  { q: "How do I work out VAT backwards?", a: "Divide the price including VAT by 1.2 to get the price before VAT. The VAT is the difference, or one-sixth of the gross price." },
  { q: "Do I charge VAT if I am not registered?", a: "No. You must not charge VAT or show it on invoices unless you are VAT-registered." },
  { q: "Is VAT the same in Scotland, Wales and Northern Ireland?", a: "Yes. VAT is a UK-wide tax with the same rates. Northern Ireland follows some EU rules for goods, which mainly matters for businesses trading goods with the EU." },
  { q: "Do I pay VAT on my own wages or drawings?", a: "No. Wages and drawings are outside the scope of VAT." },
  { q: "What is the reverse charge?", a: "For some services, such as most construction work between VAT-registered businesses and services bought from abroad, the customer accounts for the VAT instead of the supplier. The invoice shows no VAT but notes that the reverse charge applies." },
  { q: "Can I add VAT to an invoice for work done before I registered?", a: "No. You can only charge VAT on sales made from your registration date. For work that spans the date, VAT depends on the tax point, usually when the work is finished or invoiced." },
  { q: "Why does my receipt show a different VAT figure?", a: "Shops often work out VAT on each line or each item and round it, so the total can differ from one-sixth of the bill by a penny or two. Both methods are allowed." },
];

export default async function VATPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/business/flat-rate-vat", "/uk/business/gross-profit-margin", "/uk/business/retail-markup", "/uk/business/sole-trader-tax", "/uk/business/allowable-expenses", "/uk/business/corporation-tax"].includes(c.href));
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

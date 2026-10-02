import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import OverpaymentStudio from "./OverpaymentStudio";
import OverpaymentGuide from "./OverpaymentGuide";

export const metadata: Metadata = {
  title: "Mortgage Overpayment Calculator (UK, 2026)",
  description:
    "See how much interest and time you save by overpaying your mortgage: monthly overpayments, lump sums, shorter term or lower payment, the 10% allowance, and whether saving would earn more.",
  alternates: { canonical: "/property/mortgage-overpayment" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/mortgage-overpayment", label: "Mortgage Overpayment" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much do I save by overpaying my mortgage?", a: "On a £200,000 mortgage at 4.5% over 25 years, £200 a month extra saves about £36,000 of interest and clears the mortgage about 6 years early." },
  { q: "How much can I overpay without a penalty?", a: "Most fixed and discounted deals allow 10% of the balance a year. Above that, an early repayment charge usually applies to the excess." },
  { q: "Should I shorten my term or lower my payment?", a: "Shortening the term saves the most interest. Lowering the payment gives you more room in your monthly budget but saves less." },
  { q: "Is it better to overpay or save?", a: "Compare your mortgage rate with your after-tax savings rate. If your mortgage rate is higher, overpaying usually wins, but keep an emergency fund first." },
  { q: "Is a lump sum better than monthly overpayments?", a: "Pound for pound, money paid earlier saves more interest, so a lump sum now beats the same total spread over time." },
];

export default async function OverpaymentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/mortgage-repayment", "/property/mortgage-affordability", "/investing/compound-interest", "/investing/isa-vs-gia", "/investing/pension-tax-relief", "/property/rent-vs-buy"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026"
      title="Mortgage Overpayment Calculator"
      lead="See how much interest and time you save by paying extra, and whether the money would do more in savings."
      points={["Monthly and lump sums", "Shorter term or lower payment", "10% allowance check", "Free and private"]}
      guide={<OverpaymentGuide />}
      faqs={FAQS}
      related={related}
      note="Illustrative. Assumes the rate stays the same for the whole term. Check your mortgage offer for overpayment limits and early repayment charges."
    >
      <OverpaymentStudio query={query} />
    </FlagshipPage>
  );
}

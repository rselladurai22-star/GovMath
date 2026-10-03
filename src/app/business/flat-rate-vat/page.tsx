import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FlatRateStudio from "./FlatRateStudio";
import FlatRateGuide from "./FlatRateGuide";

export const metadata: Metadata = {
  title: "Flat Rate VAT Calculator: Flat Rate Scheme or Standard VAT?",
  description:
    "Compare the VAT Flat Rate Scheme with standard VAT for your trade, with every HMRC flat rate, the 16.5% limited cost trader test and the first-year discount.",
  alternates: { canonical: "/business/flat-rate-vat" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/business", label: "Business" },
  { href: "/business/flat-rate-vat", label: "Flat Rate VAT" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does the Flat Rate Scheme work?", a: "You charge customers 20% VAT as normal, but pay HMRC a fixed percentage of your VAT-inclusive turnover instead of the difference between VAT charged and VAT on costs." },
  { q: "What is a limited cost trader?", a: "A business whose spending on goods is less than 2% of its VAT-inclusive turnover, or less than £1,000 a year. It must use the 16.5% flat rate." },
  { q: "Who can join the Flat Rate Scheme?", a: "VAT-registered businesses that expect taxable sales of £150,000 or less, before VAT, in the next 12 months." },
  { q: "Can I reclaim VAT on the Flat Rate Scheme?", a: "Only on single capital purchases of £2,000 or more including VAT. You cannot reclaim VAT on normal costs." },
  { q: "Is the VAT I keep on the Flat Rate Scheme taxable?", a: "Yes. The difference between the VAT you charge and the flat rate VAT you pay is part of your taxable profit." },
];

export default async function FlatRatePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/business/vat-calculator", "/business/sole-trader-tax", "/business/allowable-expenses", "/business/gross-profit-margin", "/business/dividend-vs-salary", "/business/corporation-tax"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="HMRC flat rates"
      title="Flat Rate VAT Calculator"
      lead="See whether the VAT Flat Rate Scheme or standard VAT costs you less, with the limited cost trader test worked out for you."
      points={["Every trade's rate", "Limited cost test", "First-year discount", "Free and private"]}
      guide={<FlatRateGuide />}
      faqs={FAQS}
      related={related}
      note="HMRC flat rates. Not tax advice; check your trade category with HMRC."
    >
      <FlatRateStudio query={query} />
    </FlagshipPage>
  );
}

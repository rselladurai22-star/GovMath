import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import FlatRateStudio from "./FlatRateStudio";
import { ogFor } from "@/gm/og";
import FlatRateGuide from "./FlatRateGuide";

export const metadata: Metadata = {
  title: "Flat Rate VAT Calculator UK 2026/27",
  description:
    "Free Flat Rate Scheme calculator. Compare flat rate VAT with standard VAT for your trade, with every HMRC rate and the 16.5% limited cost trader test.",
  alternates: { canonical: "/uk/business/flat-rate-vat" },
  openGraph: ogFor("/uk/business/flat-rate-vat"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/business", label: "Business" },
  { href: "/uk/business/flat-rate-vat", label: "Flat Rate VAT" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How does the Flat Rate Scheme work?", a: "You charge customers 20% VAT as normal, but pay HMRC a fixed percentage of your VAT-inclusive turnover instead of the difference between VAT charged and VAT on costs." },
  { q: "What is a limited cost trader?", a: "A business whose spending on goods is less than 2% of its VAT-inclusive turnover, or less than £1,000 a year. It must use the 16.5% flat rate." },
  { q: "Who can join the Flat Rate Scheme?", a: "VAT-registered businesses that expect taxable sales of £150,000 or less, before VAT, in the next 12 months." },
  { q: "Can I reclaim VAT on the Flat Rate Scheme?", a: "Only on single capital purchases of £2,000 or more including VAT. You cannot reclaim VAT on normal costs." },
  { q: "Is the VAT I keep on the Flat Rate Scheme taxable?", a: "Yes. The difference between the VAT you charge and the flat rate VAT you pay is part of your taxable profit." },
  { q: "Do I still charge 20% VAT on the Flat Rate Scheme?", a: "Yes. Your invoices look exactly the same. Only the amount you pay HMRC changes." },
  { q: "Can I reclaim VAT on my phone and software?", a: "No. On the Flat Rate Scheme you cannot reclaim VAT on costs, except on single capital purchases of £2,000 or more." },
  { q: "Which trade do I choose if I do several things?", a: "The one that makes up the largest share of your turnover. Keep a note of why you chose it in case HMRC asks." },
  { q: "Does the scheme work with Making Tax Digital?", a: "Yes. You still keep digital records and file returns through compatible software." },
  { q: "Can I use the scheme with cash accounting?", a: "The Flat Rate Scheme has its own cash-based turnover option, so you can pay flat rate VAT on money received rather than on invoices. You cannot also join the separate Cash Accounting Scheme." },
  { q: "Is the Flat Rate Scheme the same for limited companies?", a: "Yes. The rates, the limited cost test and the turnover limits are the same whether you trade as a sole trader, a partnership or a limited company." },
  { q: "What if my goods spending changes during the year?", a: "Apply the test separately to each VAT return. In a quarter where you buy enough goods, use your trade rate; in a quarter where you do not, use 16.5%." },
  { q: "Can I backdate joining the scheme?", a: "Usually only from the start of your current VAT period, though HMRC can sometimes agree an earlier date. Ask when you apply." },
];

export default async function FlatRatePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/business/vat-calculator", "/uk/business/sole-trader-tax", "/uk/business/allowable-expenses", "/uk/business/gross-profit-margin", "/uk/business/dividend-vs-salary", "/uk/business/corporation-tax"].includes(c.href));
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

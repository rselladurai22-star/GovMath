import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import OverpaymentStudio from "./OverpaymentStudio";
import { ogFor } from "@/gm/og";
import OverpaymentGuide from "./OverpaymentGuide";

export const metadata: Metadata = {
  title: "Mortgage Overpayment Calculator UK",
  description:
    "Free mortgage overpayment calculator. See the interest and years you save with monthly or lump-sum overpayments, the 10% allowance, and saving instead.",
  alternates: { canonical: "/property/mortgage-overpayment" },
  openGraph: ogFor("/property/mortgage-overpayment"),
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
  { q: "Is it better to overpay monthly or in a lump sum?", a: "Pound for pound, the earlier the money is paid, the more it saves. A lump sum today beats the same total spread over the year, but regular overpayments are easier to sustain." },
  { q: "Do overpayments reduce my monthly payment automatically?", a: "Some lenders recalculate your payment; others shorten the term. Ask which yours does, and tell them which you want." },
  { q: "Can I take overpayments back?", a: "Not usually, unless you have a flexible mortgage with a payment holiday or drawdown facility." },
  { q: "Do overpayments count towards my allowance if I am on a variable rate?", a: "Most variable and tracker deals have no overpayment limit, but check your offer." },
  { q: "Should I overpay with interest-only?", a: "Overpaying an interest-only mortgage reduces the capital and the interest charged on it, and the amount you need at the end." },
  { q: "Do overpayments affect my credit score?", a: "No. Overpaying is not new borrowing, and a lower balance is generally seen positively by lenders." },
  { q: "Should I overpay if I plan to move soon?", a: "Overpaying still saves interest and increases your equity, which adds to your next deposit. But keep enough cash for the costs of moving, and check any early repayment charge if you might redeem the mortgage during a fixed deal." },
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

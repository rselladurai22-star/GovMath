import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import ErcStudio from "./ErcStudio";
import { ogFor } from "@/gm/og";
import ErcGuide from "./ErcGuide";

export const metadata: Metadata = {
  title: "Early Repayment Charge Calculator UK",
  description:
    "Free mortgage early repayment charge calculator. See your ERC, how much you can overpay free, and whether switching now beats waiting for your deal to end.",
  alternates: { canonical: "/uk/property/early-repayment-charge" },
  openGraph: ogFor("/uk/property/early-repayment-charge"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/early-repayment-charge", label: "Early Repayment Charge Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is an early repayment charge calculated?", a: "It is the percentage for the current year of your deal multiplied by the amount you repay above your allowance. Repaying in full, many lenders charge on the whole balance." },
  { q: "How much is a typical early repayment charge?", a: "Usually 1% to 5% of the amount repaid. On a £200,000 balance, a 3% charge is £6,000." },
  { q: "How much can I overpay without a charge?", a: "Most lenders allow 10% of the balance each year. On £200,000 that is £20,000. Some deals allow less, so check your offer." },
  { q: "Do I pay an early repayment charge when my deal ends?", a: "No. Once the initial deal ends there is normally no charge, and you can switch, overpay or repay in full." },
  { q: "Is it worth paying an early repayment charge to get a lower rate?", a: "Only if the interest you save before your deal would have ended is more than the charge. The calculator shows the break-even rate for your mortgage." },
  { q: "Do I pay an early repayment charge if I move house?", a: "Not if you port the mortgage to your new home. If you sell and repay it, the charge applies, though some lenders refund it if you take a new mortgage with them within a few months." },
  { q: "Can I avoid an early repayment charge when remortgaging?", a: "Yes. Book a new deal up to six months before your current one ends, so it starts the day after, with no charge." },
  { q: "Does the charge fall each year?", a: "Often. Five-year fixes commonly charge 5%, 4%, 3%, 2% and 1%. Switching just after a step-down can save thousands." },
  { q: "Where do I find my early repayment charge?", a: "In your mortgage offer and the ESIS document you received before applying. Ask your lender for a redemption statement for the exact figure." },
  { q: "Is the early repayment charge the same as an exit fee?", a: "No. An exit or deeds release fee, usually under £200, is a separate admin charge for closing the mortgage." },
  { q: "Can I overpay 10% every year?", a: "Usually yes. The allowance resets each year of the deal, but unused allowance does not normally carry over." },
  { q: "Does my lender have to waive the charge if I am struggling?", a: "No, but lenders must treat customers in difficulty fairly, and some reduce or waive the charge. Speak to your lender early." },
  { q: "Should I overpay my mortgage or save?", a: "Overpaying saves interest at your mortgage rate. Keep an emergency fund first, and compare with what your savings earn after tax." },
];

export default async function EarlyRepaymentChargePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/uk/property/remortgage", "/uk/property/mortgage-overpayment", "/uk/property/mortgage-repayment", "/uk/property/mortgage-affordability", "/uk/property/moving-house-budget", "/uk/investing/savings-interest"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026"
      title="Early Repayment Charge Calculator"
      lead="Work out what it costs to leave your mortgage deal early or overpay, and whether switching now beats waiting."
      points={["Charge now and later", "10% allowance", "Break-even rate", "Free and private"]}
      guide={<ErcGuide />}
      faqs={FAQS}
      related={related}
      note="An illustration. Your mortgage offer sets out how your charge is worked out, and a redemption statement from your lender gives the exact figure."
    >
      <ErcStudio query={query} />
    </FlagshipPage>
  );
}

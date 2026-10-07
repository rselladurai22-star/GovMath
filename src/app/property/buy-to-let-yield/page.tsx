import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BTLStudio from "./BTLStudio";
import { ogFor } from "@/gm/og";
import BTLGuide from "./BTLGuide";

export const metadata: Metadata = {
  title: "Buy-to-Let Calculator UK: Yield and Profit",
  description:
    "Free buy-to-let calculator for 2026/27. See gross and net yield, cash flow, tax under Section 24, rental cover and the 5% Stamp Duty surcharge.",
  alternates: { canonical: "/property/buy-to-let-yield" },
  openGraph: ogFor("/property/buy-to-let-yield"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/property", label: "Mortgages & Property" },
  { href: "/property/buy-to-let-yield", label: "Buy-to-Let Yield" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out rental yield?", a: "Gross yield is a year's rent divided by the price. Net yield takes off running costs and empty periods first, so it shows what the property earns before mortgage interest and tax." },
  { q: "How is rental income taxed?", a: "Individual landlords pay Income Tax on rental profit before mortgage interest, then get a tax credit of 20% of the interest (Section 24)." },
  { q: "What is a good rental yield?", a: "It depends on the area. As a check, the net yield should be above your mortgage rate, or the property will not pay for its borrowing without rent or price rises." },
  { q: "How much deposit do I need for buy-to-let?", a: "Usually at least 25%. Lenders also need the rent to cover 125% to 145% of the interest at a stress rate." },
  { q: "How much Stamp Duty is there on a buy-to-let?", a: "In England and Northern Ireland, standard rates plus a 5% surcharge on the whole price. Scotland adds an 8% supplement and Wales has higher rates." },
  { q: "Is mortgage interest tax-deductible for landlords?", a: "Not for individuals. You get a 20% tax credit instead. Companies can deduct it in full." },
  { q: "Can I deduct my mortgage capital repayments?", a: "No. Capital repayments are not a cost; they reduce your debt." },
  { q: "Are furnishings deductible?", a: "Replacing furniture, appliances and furnishings in a furnished let can be deducted. The first purchase cannot." },
  { q: "Do I pay National Insurance on rent?", a: "Not normally. Rental income is not usually treated as trading income." },
  { q: "What if my property makes a loss?", a: "Rental losses are carried forward and set against future rental profits, not against your salary." },
  { q: "Can I claim the cost of buying the property against rental income?", a: "No. Stamp Duty, legal fees on the purchase and the price itself are capital costs. They are deducted from the gain when you sell, for Capital Gains Tax." },
  { q: "Do I need to tell my mortgage lender if I let my home?", a: "Yes. A residential mortgage does not usually allow letting. You need your lender's consent to let, or a buy-to-let mortgage." },
];

export default async function BTLPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/property/stamp-duty-england", "/property/property-capital-gains", "/property/rent-a-room", "/property/mortgage-repayment", "/business/allowable-expenses", "/tax-and-salary/tax-bracket-checker"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Buy-to-Let Yield and Profit Calculator"
      lead="Your gross and net yield, what you keep after mortgage interest and tax, and the return on the cash you put in."
      points={["Gross and net yield", "Section 24 tax", "Return on cash", "Free and private"]}
      guide={<BTLGuide />}
      faqs={FAQS}
      related={related}
      note="Individual landlord, first year, 2026/27 tax rules. Excludes capital growth. Not tax advice: an accountant can check your figures."
    >
      <BTLStudio query={query} />
    </FlagshipPage>
  );
}

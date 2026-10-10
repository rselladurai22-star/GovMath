import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import SaleStudio from "./SaleStudio";
import SaleGuide from "./SaleGuide";

const PATH = "/us/housing/home-sale-proceeds-calculator";

export const metadata: Metadata = {
  title: "Home Sale Proceeds Calculator: Seller Net Sheet",
  description:
    "Free home sale proceeds calculator for 2026. See what you keep after commissions, closing costs, transfer tax, the mortgage payoff and capital gains tax.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: PATH, label: "Home Sale Proceeds Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much will I walk away with when I sell my house?",
    a: "The price less commissions, closing costs, transfer tax, concessions, the mortgage payoff and any tax on the gain. A $450,000 sale with 6% selling costs and a $250,000 payoff leaves $173,000.",
  },
  {
    q: "How much does it cost to sell a house?",
    a: "Commission plus other closing costs, often 6% to 10% of the price in all. In our example, 5% total commission and 1% other costs come to $27,000 on a $450,000 sale.",
  },
  {
    q: "Do I have to pay the buyer's agent?",
    a: "No. Since August 17, 2024, offers of buyer's agent pay can't appear on the MLS, and buyers sign their own agreements with their agents. You can still offer to pay, or agree to it in the contract.",
  },
  {
    q: "Do I pay capital gains tax when I sell my house?",
    a: "Usually not on a main home. Up to $250,000 of gain ($500,000 married filing jointly) is excluded if you owned it and lived in it for 2 of the last 5 years.",
  },
  {
    q: "How is the gain on a home sale worked out?",
    a: "Sale price less selling costs, minus your basis: what you paid plus buying costs and improvements. Repairs and maintenance don't add to the basis.",
  },
  {
    q: "What if my gain is more than $250,000?",
    a: "The excess is taxed as a long-term capital gain at 0%, 15% or 20%, and may owe the 3.8% net investment income tax. A single seller with a $708,000 gain and $120,000 of wages owes about $83,884 of federal tax.",
  },
  {
    q: "Is a second home or rental taxed when I sell?",
    a: "Yes, on the whole gain, with no exclusion. Depreciation on a rental is also recaptured at up to 25%.",
  },
  {
    q: "What is a mortgage payoff amount?",
    a: "What it takes to close the loan on a given date: the balance plus interest since your last payment and any fees. Ask your servicer for a quote dated near closing.",
  },
  {
    q: "What are seller concessions?",
    a: "Credits you give the buyer at closing, often toward their closing costs or instead of repairs. They come straight off your proceeds.",
  },
  {
    q: "What happens if I owe more than the house sells for?",
    a: "You bring the difference to closing. If you can't, ask your lender about a short sale, where it accepts less than it is owed.",
  },
  {
    q: "When do I get the money from selling my house?",
    a: "At closing, usually by wire the same or the next business day, once the deed is recorded and the payoff is sent. Confirm wiring instructions by phone.",
  },
];

export default async function HomeSalePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/capital-gains-tax", "/us/housing/mortgage-calculator", "/us/housing/mortgage-affordability", "/us/housing/closing-cost-calculator", "/us/housing/property-tax-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Seller net proceeds"
      title="Home Sale Proceeds Calculator"
      lead="See what you walk away with when you sell your home, after agent commissions, closing costs, transfer tax, concessions, the mortgage payoff and any capital gains tax, with the $250,000 and $500,000 home sale exclusion."
      points={["Commission after the 2024 settlement", "Mortgage payoff", "Home sale exclusion", "Federal and state tax on the gain"]}
      guide={<SaleGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate, not a net sheet or tax advice."
    >
      <SaleStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DownPaymentStudio from "./DownPaymentStudio";
import DownPaymentGuide from "./DownPaymentGuide";

export const metadata: Metadata = {
  title: "Down Payment Calculator: 3% to 20% Down",
  description:
    "Free down payment calculator for 2026. Compare 3%, 3.5% FHA, 5%, 10% and 20% down: cash to close, PMI, monthly payment and how long it takes to save.",
  alternates: { canonical: "/us/housing/down-payment-calculator" },
  openGraph: ogFor("/us/housing/down-payment-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: "/us/housing/down-payment-calculator", label: "Down Payment Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much down payment do I need for a house?",
    a: "Less than many people think. Conventional loans can go as low as 3% down, FHA loans 3.5% with a credit score of 580 or more, and VA and USDA loans can need nothing. On a $400,000 home, 3% is $12,000 and 20% is $80,000.",
  },
  {
    q: "Do I need 20% down?",
    a: "No. 20% is the point at which a conventional loan needs no PMI. Below it you pay PMI until the balance falls to 78% of the price, which in our $400,000 example takes about 9 years 10 months with 10% down.",
  },
  {
    q: "How much cash do I need to close?",
    a: "The down payment plus closing costs, which Freddie Mac puts at about 2% to 5% of the purchase price. With 3% closing costs on a $400,000 home, 10% down needs $52,000 in total and 3% down needs $24,000.",
  },
  {
    q: "How much does PMI cost?",
    a: "Freddie Mac puts it at roughly 0.35% to 0.85% of the loan a year, higher with a smaller down payment or a lower credit score. At 0.5% on a $360,000 loan it is $150 a month.",
  },
  {
    q: "Is FHA's 3.5% down better than a 3% conventional loan?",
    a: "Not always. In our $400,000 example at the same rate, the FHA loan costs about $47 a month more, because of its 1.75% upfront premium and 0.55% annual premium that lasts for the life of the loan. FHA helps most when your credit score is too low for a good conventional PMI price.",
  },
  {
    q: "How long will it take to save a down payment?",
    a: "Divide what you still need by what you save each month, then allow a little for interest. Saving $1,000 a month at 4% APY with $15,000 already saved reaches $52,000 (10% down plus closing costs on $400,000) in 34 months.",
  },
  {
    q: "Where should I keep my down payment savings?",
    a: "Somewhere safe and easy to reach: a high-yield savings account, money market account or short CDs at an FDIC-insured bank or NCUA-insured credit union. Stocks can fall just when you need the money.",
  },
  {
    q: "Can my down payment be a gift?",
    a: "Yes. Conventional, FHA and VA loans all allow gifts from family for the down payment, usually with a signed gift letter and a record of the money moving. Ask your lender which documents it needs before the money is transferred.",
  },
  {
    q: "Should I put down more than 20%?",
    a: "Only if you still keep an emergency fund and have no high-interest debt. Above 20% there is no PMI left to remove, so extra cash only saves interest at your mortgage rate, and money in a house is hard to get back out.",
  },
  {
    q: "What are down payment assistance programs?",
    a: "Grants or low-cost second loans from state housing finance agencies, cities and some employers, often for first-time buyers under an income limit. Your state housing finance agency lists its programs; HUD-approved housing counselors can help you find others.",
  },
  {
    q: "Does a bigger down payment get a lower rate?",
    a: "Often a little, because lenders price conventional loans by credit score and loan-to-value. The bigger savings usually come from a smaller loan and less or no PMI. Ask lenders to quote you at two or three down payment levels.",
  },
  {
    q: "What if the home I want is over the conforming loan limit?",
    a: "For 2026 the baseline conforming limit for a one-unit home is $832,750 (up to $1,249,125 in high-cost areas). A bigger loan is a jumbo loan, which often needs 10% to 20% down and stronger credit.",
  },
];

export default async function DownPaymentPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/us/housing/mortgage-calculator",
      "/us/housing/mortgage-affordability",
      "/us/housing/fha-loan-calculator",
      "/us/housing/closing-cost-calculator",
      "/us/savings/savings-goal-calculator",
      "/us/housing/rent-vs-buy-calculator",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="From 3% down to 20%"
      title="Down Payment Calculator"
      lead="Compare every common down payment side by side, see the cash you need at closing, and work out how long it will take to save it."
      points={["3%, 3.5% FHA, 5%, 10% and 20%", "Cash to close", "PMI and monthly payment", "Time to save"]}
      guide={<DownPaymentGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a loan offer or financial advice."
    >
      <DownPaymentStudio query={query} />
    </FlagshipPage>
  );
}

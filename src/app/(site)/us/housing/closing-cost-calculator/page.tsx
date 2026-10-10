import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import ClosingStudio from "./ClosingStudio";
import ClosingGuide from "./ClosingGuide";

const PATH = "/us/housing/closing-cost-calculator";

export const metadata: Metadata = {
  title: "Closing Cost Calculator for Buyers: Cash to Close",
  description:
    "Free closing cost calculator for 2026. Estimate lender fees, points, title, transfer taxes, prepaid interest and escrow deposits, and the cash you need to close.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: PATH, label: "Closing Cost Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much are closing costs for a buyer?",
    a: "They are commonly quoted at 2% to 5% of the price. In our example of a $400,000 home with 10% down they come to $11,112.60, or 2.78%, including prepaid interest, insurance and escrow deposits.",
  },
  {
    q: "How much cash do I need to close on a $400,000 house?",
    a: "With 10% down and the calculator's example fees, about $51,113: the $40,000 down payment plus $11,113 of closing costs. With 3.5% down it is about $25,320.",
  },
  {
    q: "What is included in closing costs?",
    a: "Lender fees and points, the appraisal, title insurance, settlement or attorney fees, recording fees, transfer taxes, prepaid interest and insurance, and the first deposits into escrow.",
  },
  {
    q: "Who pays transfer tax, the buyer or the seller?",
    a: "It depends on the state, the county and the contract. Many states have no transfer tax; in others custom puts it on the seller, the buyer or both. Your title company knows the local practice.",
  },
  {
    q: "What are prepaids?",
    a: "Costs you pay early: interest from closing to the end of the month and the first year of homeowners insurance. They are not fees; you would owe them anyway.",
  },
  {
    q: "Why do I pay into escrow at closing?",
    a: "To start the account your servicer uses to pay property tax and insurance. The deposit makes sure there is enough when the first bills are due. A cushion of up to two months is allowed.",
  },
  {
    q: "Can the seller pay my closing costs?",
    a: "Yes, as a seller credit, up to the loan program's limit. Fannie Mae allows 3% to 9% of the price on a conventional loan, depending on the down payment.",
  },
  {
    q: "Can I roll closing costs into my mortgage?",
    a: "Usually not on a purchase, because the loan is based on the price. You can take a lender credit for a higher rate, or ask the seller for a credit. On a refinance, costs can often be added to the loan.",
  },
  {
    q: "Is it better to close at the end of the month?",
    a: "It lowers the cash you need, because you prepay fewer days of interest: about $72 a day on a $360,000 loan at 7.25%. It doesn't lower the total you pay over the loan.",
  },
  {
    q: "When do I find out my exact closing costs?",
    a: "The Loan Estimate, within three business days of applying, gives the first full list. The Closing Disclosure, at least three business days before closing, gives the final figures.",
  },
  {
    q: "Are closing costs tax-deductible?",
    a: "Mostly not. If you itemize, points on a purchase loan and the property tax and interest you prepay can be deducted. Other costs are added to your home's basis.",
  },
  {
    q: "How can I lower closing costs?",
    a: "Get Loan Estimates from several lenders on the same day, shop for title and settlement services, negotiate lender fees, and ask the seller for a credit.",
  },
];

export default async function ClosingCostPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/housing/mortgage-calculator", "/us/housing/mortgage-affordability", "/us/housing/property-tax-calculator", "/us/housing/down-payment-calculator", "/us/housing/refinance-calculator", "/us/savings/savings-goal-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Buyer closing costs and cash to close"
      title="Closing Cost Calculator"
      lead="Estimate what you pay at closing when you buy a home: lender fees and points, title insurance, recording and transfer taxes, prepaid interest and escrow deposits, and the total cash you need."
      points={["Itemized like a Loan Estimate", "Transfer taxes and points", "Prepaids and escrow", "Cash to close"]}
      guide={<ClosingGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate, not a Loan Estimate or financial advice."
    >
      <ClosingStudio query={query} />
    </FlagshipPage>
  );
}

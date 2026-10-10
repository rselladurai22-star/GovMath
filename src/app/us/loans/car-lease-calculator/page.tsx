import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CarLeaseStudio from "./CarLeaseStudio";
import CarLeaseGuide from "./CarLeaseGuide";

const PATH = "/us/loans/car-lease-calculator";

export const metadata: Metadata = {
  title: "Car Lease Calculator: Payment and Money Factor",
  description:
    "Free car lease calculator for 2026. Monthly payment from cap cost, residual and money factor, with sales tax by state, fees, due at signing and lease vs buy.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/loans", label: "Loans and debt" },
  { href: PATH, label: "Car Lease Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is a lease payment calculated?",
    a: "Two parts. Depreciation: the adjusted capitalized cost minus the residual value, divided by the months. Rent charge: the adjusted cap cost plus the residual, times the money factor. Most states then add sales tax to the payment.",
  },
  {
    q: "What is the payment on a $40,000 car lease?",
    a: "With a $38,000 negotiated price, $2,000 down, a 58% residual, a 0.0025 money factor, a $995 acquisition fee rolled in and 7% tax, it is about $571.04 a month for 36 months, with $3,211 due at signing.",
  },
  {
    q: "What is a money factor?",
    a: "The lease's interest rate written as a small decimal. Multiply it by 2,400 to get the rough APR: 0.0025 is about 6%, and 0.0015 about 3.6%. Dealers can mark it up, so ask for the lender's base rate.",
  },
  {
    q: "What is a good residual value?",
    a: "A higher residual means a lower payment, because you pay for less of the car's value. Three-year residuals are often in the 50% to 60% range. The lender sets it for each model, term and mileage allowance.",
  },
  {
    q: "Can I negotiate a lease?",
    a: "Yes. The price (cap cost) is negotiable, and so is the money factor if the dealer has marked it up. On the example lease, paying full MSRP instead of $38,000 adds about $2,333 to the cost.",
  },
  {
    q: "How is sales tax charged on a lease?",
    a: "Most states tax each monthly payment. New York collects tax on the total of the payments at signing, and Texas, Maryland and Virginia tax the car's price. Alaska, Delaware, Montana, New Hampshire and Oregon have no state sales tax.",
  },
  {
    q: "Should I put money down on a lease?",
    a: "Usually as little as you can. Cash down lowers the payment but saves very little overall, and if the car is totaled early, the down payment is usually lost.",
  },
  {
    q: "What fees come with a lease?",
    a: "An acquisition fee at the start, often about $600 to $1,100, and a disposition fee at the end, often about $300 to $600, plus title, registration and dealer documentation fees.",
  },
  {
    q: "Is leasing cheaper than buying?",
    a: "Over the lease term it can be close, because you pay tax and interest on less of the car. Over the long run buying usually wins, because once the loan is paid off you drive without a payment.",
  },
  {
    q: "What happens if I go over the mileage?",
    a: "You pay a charge for each extra mile at the end, often 15 to 30 cents. If you expect to drive more, a higher allowance at the start is usually cheaper than the penalty.",
  },
  {
    q: "Can I end a lease early?",
    a: "Usually only at a cost: early termination often means paying most of the remaining payments. Some people transfer the lease to someone else or sell the car to a dealer for its payoff amount.",
  },
  {
    q: "Can I buy the car at the end of the lease?",
    a: "Most leases include a purchase option at the residual value plus a fee. If the car is worth more than the residual, buying it, or selling it to a dealer, can make sense.",
  },
];

export default async function CarLeasePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/loans/auto-loan-calculator", "/us/loans/car-affordability-calculator", "/us/taxes/sales-tax-calculator", "/us/loans/loan-calculator", "/us/loans/debt-to-income-ratio"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Cap cost, residual and money factor"
      title="Car Lease Calculator"
      lead="Work out a lease payment the way leasing companies do, from the negotiated price, residual value and money factor, with your state's sales tax and fees, then compare it with buying the same car."
      points={["Depreciation and rent charge", "Sales tax by state", "Due at signing", "Lease vs buy"]}
      guide={<CarLeaseGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate for planning, not a lease offer or financial advice."
    >
      <CarLeaseStudio query={query} />
    </FlagshipPage>
  );
}

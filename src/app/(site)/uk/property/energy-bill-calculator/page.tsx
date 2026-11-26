import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import EnergyBillStudio from "./EnergyBillStudio";
import EnergyBillGuide from "./EnergyBillGuide";

export const metadata: Metadata = {
  title: "Energy Bill Calculator: January 2027 Price Cap",
  description:
    "Free energy bill calculator for the January to March 2027 price cap. Your gas and electricity bill a month and a year, with standing charges and VAT.",
  alternates: { canonical: "/uk/property/energy-bill-calculator" },
  openGraph: ogFor("/uk/property/energy-bill-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/energy-bill-calculator", label: "Energy Bill Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the energy price cap from January 2027?", a: "From 1 January to 31 March 2027, a typical home paying by Direct Debit pays £2,166 a year, up 26% from £1,723. The average rates are 32.69p per kWh and 54.77p a day for electricity, and 10.96p per kWh and 29.65p a day for gas." },
  { q: "Does the price cap limit my total bill?", a: "No. It limits the unit rate and standing charge. The more energy you use, the more you pay." },
  { q: "Is there VAT on energy bills?", a: "Gas has 5% VAT. Electricity has no VAT from 1 October 2026 to 30 June 2027: the Budget on 28 October 2026 extended the cut, which was due to end on 31 March 2027." },
  { q: "What is typical energy use?", a: "From July 2026, Ofgem uses 2,500 kWh of electricity and 9,500 kWh of gas a year for a medium-use home. Low use is 1,600 and 6,000 kWh; high use is 3,800 and 14,000 kWh." },
  { q: "How much is the standing charge a year?", a: "At the January to March 2027 averages, about £199.91 for electricity and £108.22 for gas: £308.13 together." },
  { q: "Why is my bill different from the calculator?", a: "Rates vary by region and tariff, and your use may differ from the figure you entered. Enter your own rates from your bill under More options for an exact figure." },
  { q: "When is the next price cap announced?", a: "Ofgem is due to announce the cap for 1 April to 30 June 2027 in late February 2027." },
  { q: "Is prepayment cheaper than Direct Debit?", a: "Yes, slightly. From October to December 2026, Ofgem's typical prepayment bill was £1,678 a year, against £1,723 for Direct Debit, and paying on receipt of a bill was the most expensive, at £1,861. Scaled the same way, the January 2027 figures are about £2,110 for prepayment and £2,340 for paying on receipt of a bill, against £2,166 for Direct Debit." },
  { q: "Does the price cap apply to fixed tariffs?", a: "No. A fixed tariff has its own rates until the deal ends. The VAT cut on electricity does apply to fixed tariffs." },
  { q: "Does the price cap cover Northern Ireland?", a: "No. Ofgem's price cap covers England, Scotland and Wales. Northern Ireland has its own energy market and regulator." },
  { q: "How do I find my yearly use?", a: "Your bill or annual statement shows your estimated annual consumption in kWh for each fuel. Your supplier's app may show it too." },
  { q: "How much do I save by using 1,000 kWh less?", a: "At the January 2027 cap, about £326.90 for 1,000 kWh of electricity and £109.60 for 1,000 kWh of gas." },
  { q: "What makes up the price cap?", a: "From October to December 2026, wholesale energy is about 47% of a typical Direct Debit bill, networks 24%, operating, debt and industry costs 17%, government policy costs 6%, and supplier earnings about 2.7%. The January 2027 rise came mainly from higher wholesale gas prices." },
  { q: "What is the £100 Household Energy Payment?", a: "Announced in the Budget on 28 October 2026, it gives £100 from January 2027 to households in council tax bands A to D in England, paid through the council tax system. The devolved governments get funding through the Barnett formula." },
];

export default async function EnergyBillPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/appliance-running-cost", "/uk/property/council-tax-bands", "/uk/benefits/benefits-checker", "/uk/benefits/universal-credit", "/uk/property/moving-house-budget", "/uk/benefits/pension-credit"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="January to March 2027 price cap"
      title="Energy Bill Calculator"
      lead="Your gas and electricity bill at the current Ofgem price cap, a month and a year, with standing charges, VAT and the change since the last cap."
      points={["January 2027 price cap", "Gas and electricity", "Change since October", "Free and private"]}
      guide={<EnergyBillGuide />}
      faqs={FAQS}
      related={related}
      note="Great Britain average price cap rates for Direct Debit. Rates in your region and on your tariff may differ."
    >
      <EnergyBillStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import EnergyBillStudio from "./EnergyBillStudio";
import EnergyBillGuide from "./EnergyBillGuide";

export const metadata: Metadata = {
  title: "Energy Bill Calculator: October 2026 Price Cap",
  description:
    "Free energy bill calculator for the October to December 2026 price cap. Your gas and electricity bill a month and a year, with standing charges and VAT.",
  alternates: { canonical: "/uk/property/energy-bill-calculator" },
  openGraph: ogFor("/uk/property/energy-bill-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/property", label: "Mortgages & Property" },
  { href: "/uk/property/energy-bill-calculator", label: "Energy Bill Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is the energy price cap from October 2026?", a: "From 1 October to 31 December 2026, a typical home paying by Direct Debit pays £1,723 a year, up 4% from £1,663. The average rates are 26.32p per kWh and 54.83p a day for electricity, and 7.97p per kWh and 29.68p a day for gas." },
  { q: "Does the price cap limit my total bill?", a: "No. It limits the unit rate and standing charge. The more energy you use, the more you pay." },
  { q: "Is there VAT on energy bills?", a: "Gas has 5% VAT. Electricity has no VAT from 1 October 2026 to 31 March 2027, after the government removed it for that period." },
  { q: "What is typical energy use?", a: "From July 2026, Ofgem uses 2,500 kWh of electricity and 9,500 kWh of gas a year for a medium-use home. Low use is 1,600 and 6,000 kWh; high use is 3,800 and 14,000 kWh." },
  { q: "How much is the standing charge a year?", a: "At the October to December 2026 averages, about £200.13 for electricity and £108.33 for gas: £308.46 together." },
  { q: "Why is my bill different from the calculator?", a: "Rates vary by region and tariff, and your use may differ from the figure you entered. Enter your own rates from your bill under More options for an exact figure." },
  { q: "When is the next price cap announced?", a: "Ofgem is due to announce the cap for 1 January to 31 March 2027 on 25 November 2026." },
  { q: "Is prepayment cheaper than Direct Debit?", a: "Yes, slightly. Ofgem's typical prepayment bill is £1,678 a year from October 2026, against £1,723 for Direct Debit. Paying on receipt of a bill is the most expensive, at £1,861." },
  { q: "Does the price cap apply to fixed tariffs?", a: "No. A fixed tariff has its own rates until the deal ends. The VAT cut on electricity does apply to fixed tariffs." },
  { q: "Does the price cap cover Northern Ireland?", a: "No. Ofgem's price cap covers England, Scotland and Wales. Northern Ireland has its own energy market and regulator." },
  { q: "How do I find my yearly use?", a: "Your bill or annual statement shows your estimated annual consumption in kWh for each fuel. Your supplier's app may show it too." },
  { q: "How much do I save by using 1,000 kWh less?", a: "At the October 2026 cap, about £263.20 for 1,000 kWh of electricity and £79.70 for 1,000 kWh of gas." },
  { q: "What makes up the price cap?", a: "From October 2026, wholesale energy is about 47% of a typical Direct Debit bill, networks 24%, operating, debt and industry costs 17%, government policy costs 6%, and supplier earnings about 2.7%." },
];

export default async function EnergyBillPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/uk/property/appliance-running-cost", "/uk/property/council-tax-bands", "/uk/benefits/benefits-checker", "/uk/benefits/universal-credit", "/uk/property/moving-house-budget", "/uk/benefits/pension-credit"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="October to December 2026 price cap"
      title="Energy Bill Calculator"
      lead="Your gas and electricity bill at the current Ofgem price cap, a month and a year, with standing charges, VAT and the change since the last cap."
      points={["October 2026 price cap", "Gas and electricity", "Change since July", "Free and private"]}
      guide={<EnergyBillGuide />}
      faqs={FAQS}
      related={related}
      note="Great Britain average price cap rates for Direct Debit. Rates in your region and on your tariff may differ."
    >
      <EnergyBillStudio query={query} />
    </FlagshipPage>
  );
}

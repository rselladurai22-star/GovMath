import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PayrollTaxStudio from "./PayrollTaxStudio";
import PayrollTaxGuide from "./PayrollTaxGuide";

const PATH = "/us/taxes/payroll-tax-calculator";

export const metadata: Metadata = {
  title: "Employer Payroll Tax Calculator 2026",
  description:
    "Free employer payroll tax calculator for 2026. See what an employee really costs: Social Security, Medicare, FUTA, state unemployment and benefits, per year and hour.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Employer Payroll Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much does an employer pay in payroll taxes?", a: "In 2026, 7.65% of wages for Social Security and Medicare (6.2% stops at $184,500), plus federal unemployment tax of usually $42 per employee and state unemployment tax. On a $50,000 salary in Texas that is about $4,110 a year, or 8.2% of wages." },
  { q: "What is FUTA and how much is it?", a: "The Federal Unemployment Tax Act tax is 6.0% of the first $7,000 of each employee's wages. Employers who pay their state unemployment tax on time get a credit of up to 5.4%, so the usual rate is 0.6%: $42 per employee per year." },
  { q: "Which states have a FUTA credit reduction?", a: "For 2025, California (1.2%) and the U.S. Virgin Islands (4.5%). For 2026 the Department of Labor lists California as at risk of a 1.5% reduction, to be confirmed after November 10, 2026. A 1.5% reduction raises FUTA in California to $147 per employee." },
  { q: "What is SUTA?", a: "State unemployment tax. Each state sets a taxable wage base (from $7,000 to $78,200 in 2026) and a rate for each employer based on its history of layoffs. New employers get a set rate, often around 1% to 3.4%." },
  { q: "How much does an employee cost on top of salary?", a: "Payroll taxes alone add about 8% to 10% of wages for most jobs. With health insurance, a 401(k) match and workers' compensation, the total often reaches 25% to 35%. A $50,000 employee with average single health cover, a 4% match and 1% workers' comp costs about $64,495." },
  { q: "Do employers pay the additional Medicare tax?", a: "No. The extra 0.9% on wages over $200,000 is withheld from the employee only. The employer pays 1.45% on all wages." },
  { q: "Is health insurance subject to payroll tax?", a: "Employer-paid health premiums are not wages, so no Social Security, Medicare or unemployment tax is due on them. Employee premiums paid through a cafeteria plan are also free of those taxes." },
  { q: "Does the 401(k) match have payroll tax?", a: "No. The employer match is not subject to Social Security, Medicare or FUTA. The employee's own 401(k) contributions are still subject to Social Security and Medicare." },
  { q: "When are payroll taxes paid?", a: "Social Security, Medicare and withheld income tax are deposited monthly or semiweekly depending on your size, and reported quarterly on Form 941. FUTA is deposited quarterly once it passes $500 and reported yearly on Form 940, due January 31." },
  { q: "Who has to pay FUTA?", a: "Most employers who paid $1,500 or more in wages in any calendar quarter, or had an employee for some part of a day in 20 or more weeks, in this year or last. Household employers pay it once they pay $1,000 in a quarter. 501(c)(3) charities are exempt." },
  { q: "What does an employee cost per hour?", a: "Divide the total yearly cost by paid hours. A $20-an-hour worker in Texas costs about $21.67 per paid hour in wages and payroll taxes, before benefits. Per hour actually worked, after vacation and holidays, it is more." },
  { q: "Do I pay payroll taxes for contractors?", a: "No. For a 1099 contractor you pay no Social Security, Medicare or unemployment tax; they pay self-employment tax themselves. But the IRS and states decide who is an employee, and misclassifying one can bring back taxes and penalties." },
];

export default async function PayrollTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/self-employment-tax", "/us/taxes/1099-vs-w2-calculator", "/us/taxes/salary-to-hourly", "/us/taxes/hourly-paycheck-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 employer costs"
      title="Employer Payroll Tax Calculator"
      lead="Work out what an employee really costs in 2026: wages plus the employer's Social Security and Medicare, federal and state unemployment tax, benefits and insurance, per year and per hour."
      points={["Employer FICA 7.65%", "FUTA with credit reductions", "2026 SUTA for every state", "Cost per hour worked"]}
      guide={<PayrollTaxGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026 from IRS and Department of Labor figures. Your state rate notice and insurer set your own rates. Not tax or legal advice."
    >
      <PayrollTaxStudio query={query} />
    </FlagshipPage>
  );
}

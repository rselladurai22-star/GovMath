import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import StateTaxStudio from "./StateTaxStudio";
import StateTaxGuide from "./StateTaxGuide";

const PATH = "/us/taxes/state-income-tax-calculator";

export const metadata: Metadata = {
  title: "State Income Tax Calculator 2026: All 50 States",
  description: "Free state income tax calculator for 2026. See your state tax on wages in all 50 states and DC, your marginal rate, and how your state compares with any other.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "State Income Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Which states have no income tax in 2026?", a: "Nine states don't tax wages: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington and Wyoming. Washington does tax large long-term capital gains." },
  { q: "Which state has the highest income tax?", a: "California has the highest top rate, 13.3% on income over $1 million. For middle earners Oregon takes the most: $5,733 on $75,000 of wages for a single filer in 2026." },
  { q: "Which states have a flat income tax?", a: "Fourteen in 2026: Arizona (2.5%), Ohio (2.75%), Indiana (2.95%), Louisiana (3%), Pennsylvania (3.07%), Kentucky (3.5%), Iowa (3.8%), North Carolina (3.99%), Mississippi (4%), Michigan (4.25%), Colorado (4.4%), Utah (4.45%), Illinois (4.95%) and Georgia (4.99%)." },
  { q: "How much state tax will I pay on $75,000?", a: "For a single filer with no dependents, from $0 in the nine no-tax states to $5,733 in Oregon. The median state with an income tax takes $2,830; California takes $2,775 and New York $3,453." },
  { q: "How much state tax will I pay on $100,000?", a: "As a single filer, $0 in Texas or Florida, $2,291 in Arizona, $4,805 in Illinois, $4,860 in New York and $5,055 in California (plus $1,300 of California SDI)." },
  { q: "Is state tax worked out on gross pay?", a: "Usually on wages after pre-tax 401(k) and health insurance deductions, less the state's standard deduction and exemptions. Pennsylvania is the main exception: it taxes 401(k) contributions." },
  { q: "What is California SDI?", a: "State Disability Insurance, 1.3% of all wages in 2026 with no ceiling. It is not income tax, but it comes out of every California paycheck, so the calculator shows it separately." },
  { q: "Do I pay state tax where I live or where I work?", a: "The state where you work can tax wages earned there, and your home state taxes all your income but credits tax paid to the other state. Neighbors with reciprocity agreements tax only your home state." },
  { q: "Do cities charge income tax too?", a: "Some do: New York City, Yonkers, Philadelphia, Detroit, most Ohio cities, Maryland and Indiana counties, and many Kentucky and Pennsylvania localities. Add the rate in the local tax field." },
  { q: "Can I deduct state income tax on my federal return?", a: "Only if you itemize. The 2026 SALT cap is $40,400 for state and local income (or sales) tax plus property tax, reduced for incomes over about $505,000 but never below $10,000." },
  { q: "Does the number of children change my state tax?", a: "In most states, yes, through a deduction, exemption or credit. A head of household in California on $75,000 with two children pays $1,825, against $2,775 for a single filer with none." },
  { q: "Is my bonus taxed differently by my state?", a: "Your state taxes a bonus as ordinary wages when you file, but many states withhold from bonuses at a flat supplemental rate, so withholding can differ from the final tax." },
  { q: "Does the calculator include retirement income or capital gains?", a: "No, it covers wages. Many states exempt Social Security and part of pensions, and some tax long-term gains at lower rates, so check your state's rules for those." },
];

export default async function StateTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/federal-income-tax", "/us/taxes/bonus-tax-calculator", "/us/taxes/sales-tax-calculator", "/us/housing/property-tax-calculator", "/us/taxes/w4-withholding-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="State taxes"
      title="State Income Tax Calculator"
      lead="See your 2026 state income tax on wages in any of the 50 states or DC, with your marginal and effective rates, and compare it with another state or every state at once."
      points={["All 50 states and DC", "Deductions, exemptions and credits", "Compare two states", "Local tax and California SDI"]}
      guide={<StateTaxGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates of 2026 state income tax on wages from published rates and brackets. Some credits and phase-outs are simplified. Not tax advice."
    >
      <StateTaxStudio query={query} />
    </FlagshipPage>
  );
}

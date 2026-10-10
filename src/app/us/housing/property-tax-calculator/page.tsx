import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import PropertyTaxStudio from "./PropertyTaxStudio";
import PropertyTaxGuide from "./PropertyTaxGuide";

const PATH = "/us/housing/property-tax-calculator";

export const metadata: Metadata = {
  title: "Property Tax Calculator by State with Exemptions",
  description:
    "Free property tax calculator for 2026. Work out your bill from home value, state rate or mill rate, assessment ratio and homestead exemptions; compare all states.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/housing", label: "Housing" },
  { href: PATH, label: "Property Tax Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is property tax calculated?",
    a: "Assessed value, less exemptions, times the local tax rate. The assessed value is the market value times your state's assessment ratio, and the rate is the total of the county, city, school and other levies.",
  },
  {
    q: "How much is property tax on a $400,000 house?",
    a: "About $3,560 a year at the US typical rate of 0.89%. At typical state rates it ranges from about $1,080 in Hawaii to $7,680 in Illinois.",
  },
  {
    q: "What is a mill rate?",
    a: "Dollars of tax for every $1,000 of taxable value. 20 mills is 2%. Multiply a percentage by 10 to get mills.",
  },
  {
    q: "Which state has the highest property tax?",
    a: "By effective rate, Illinois (about 1.92% of value) and New Jersey (about 1.89%), then Connecticut (about 1.66%), using Census Bureau figures for 2024.",
  },
  {
    q: "Which state has the lowest property tax?",
    a: "Hawaii, at about 0.27% of value, then Alabama at about 0.38% and Arizona and Idaho at about 0.43%.",
  },
  {
    q: "What is a homestead exemption?",
    a: "An amount taken off the taxable value of the home you live in. You usually apply once through the county. Texas takes $140,000 off for school taxes and Florida up to $50,000.",
  },
  {
    q: "Do seniors pay less property tax?",
    a: "Often. Many states add a senior exemption, freeze the value or the tax from age 65, or give a credit when the tax is high compared with income. Ask your county assessor.",
  },
  {
    q: "Why did my property tax go up after I bought my house?",
    a: "The home was probably reassessed at your purchase price, and the seller's exemptions or capped value ended with the sale. Budget from the price times the local rate.",
  },
  {
    q: "How do I lower my property tax?",
    a: "Apply for every exemption you qualify for, check the assessment notice for errors, and appeal the value with recent sales of similar homes if it looks too high.",
  },
  {
    q: "Is property tax paid monthly?",
    a: "Most homeowners with a mortgage pay it monthly through escrow; the servicer pays the bill when it is due. Without escrow, you pay the county directly, once or in installments.",
  },
  {
    q: "Is property tax deductible?",
    a: "Only if you itemize, and it shares the capped state and local tax (SALT) deduction with state income or sales tax. Most homeowners take the standard deduction instead.",
  },
];

export default async function PropertyTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/housing/mortgage-calculator", "/us/housing/mortgage-affordability", "/us/housing/closing-cost-calculator", "/us/housing/rent-affordability", "/us/taxes/federal-income-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="By state, with exemptions"
      title="Property Tax Calculator"
      lead="Work out your property tax from your home's value with your state's typical rate or your local mill rate, the assessment ratio and homestead, senior and other exemptions, and compare the same home in every state."
      points={["State rates or mill rates", "Homestead and senior exemptions", "Monthly escrow", "All 50 states compared"]}
      guide={<PropertyTaxGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate, not a tax bill. Check your county assessor's figures."
    >
      <PropertyTaxStudio query={query} />
    </FlagshipPage>
  );
}

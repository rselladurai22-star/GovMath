import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import BmiStudio from "./BmiStudio";
import { ogFor } from "@/gm/og";
import BmiGuide from "./BmiGuide";

export const metadata: Metadata = {
  title: "BMI Calculator: Healthy Weight Ranges",
  description:
    "Free BMI calculator for adults. Enter cm and kg, feet and pounds, or stones; see your BMI against WHO ranges (used by the NHS and CDC) and your healthy weight.",
  alternates: { canonical: "/everyday/bmi-calculator" },
  openGraph: ogFor("/everyday/bmi-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/bmi-calculator", label: "BMI Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "What is a healthy BMI?", a: "18.5 to 24.9 for most adults. For people of South Asian, Chinese, other Asian, Middle Eastern, Black African or African-Caribbean background, overweight starts at 23." },
  { q: "How do I calculate BMI?", a: "Divide your weight in kilograms by your height in metres, then divide by your height in metres again." },
  { q: "What waist size is healthy?", a: "Keep your waist to less than half your height, a waist-to-height ratio below 0.5." },
  { q: "Can children use this BMI calculator?", a: "No. Children's BMI is compared with centile charts for their age and sex." },
  { q: "Is BMI different for men and women?", a: "No. Adult BMI uses the same formula and ranges for both." },
  { q: "What is a healthy BMI for my age?", a: "For adults of all ages the healthy range is 18.5 to 24.9, though doctors take age into account." },
  { q: "Why are there lower thresholds for some groups?", a: "Because the risk of type 2 diabetes and heart disease starts at a lower BMI in those groups." },
  { q: "How often should I check my BMI?", a: "Every few months is enough. Daily weight changes are mostly water." },
  { q: "Is the NHS or CDC BMI calculator different from this one?", a: "They use the same formula and the same adult ranges. This calculator also shows the lower thresholds, your healthy weight range in pounds or stones and your waist-to-height ratio." },
  { q: "Does BMI work if I have had an amputation?", a: "Not directly, as body weight is lower. Your healthcare team can adjust the calculation." },
];

export default async function BmiPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/everyday/percentage-calculator", "/everyday/timesheet-decimal", "/uk/life/nhs-prescription-saver", "/uk/life/healthy-start"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="WHO adult ranges"
      title="BMI Calculator"
      lead="Work out your body mass index, your healthy weight range and your waist-to-height ratio, using the adult ranges the WHO, NHS and CDC use."
      points={["Metric, US or UK units", "Lower thresholds option", "Waist-to-height ratio", "Free and private"]}
      guide={<BmiGuide />}
      faqs={FAQS}
      related={related}
      note="Adult ranges from the WHO, as used by the NHS and CDC, with NICE's lower thresholds as an option. Not medical advice."
    >
      <BmiStudio query={query} />
    </FlagshipPage>
  );
}

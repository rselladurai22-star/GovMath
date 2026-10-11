import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import WeightStudio from "./WeightStudio";
import WeightGuide from "./WeightGuide";

const PATH = "/everyday/weight-converter";

export const metadata: Metadata = {
  title: "Stone to Kg Converter: Stones, Pounds and Kg",
  description:
    "Free weight converter calculator. Convert stones and pounds to kg, kg to stones, and pounds to kg, with a 7 to 25 stone table and pounds and ounces.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: PATH, label: "Stone to Kg Converter" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How many kg is a stone?", a: "One stone is 14 pounds, which is exactly 6.35029318 kg. For everyday use, 6.35 kg is close enough." },
  { q: "How do I convert stones to kg?", a: "Multiply the stones by 14, add the extra pounds, then multiply by 0.45359237. For example, 11 st 4 lb is 158 lb, which is 71.67 kg." },
  { q: "How do I convert kg to stones and pounds?", a: "Divide the kilograms by 0.45359237 to get pounds, then divide by 14. The whole number is stones and the remainder, times 14, is pounds. For example, 70 kg is 154.3 lb, which is 11 st 0.3 lb." },
  { q: "How many pounds are in a kilogram?", a: "About 2.2046 pounds. The exact definition runs the other way: one pound is 0.45359237 kg." },
  { q: "What is 10 stone in kg?", a: "63.50 kg. 12 stone is 76.2 kg, 14 stone is 88.9 kg and 16 stone is 101.6 kg." },
  { q: "What is 100 kg in stones?", a: "15 st 10.5 lb, or 220.5 lb. 80 kg is 12 st 8.4 lb and 90 kg is 14 st 2.4 lb." },
  { q: "What is the difference between 11.5 stone and 11 st 5 lb?", a: "11.5 stone is 11 stone 7 lb, because half a stone is 7 pounds. 11 st 5 lb is 11.36 stone. Choose decimal stones under More options if you need them." },
  { q: "How do I convert a baby's weight to pounds and ounces?", a: "Divide the kilograms by 0.45359237 to get pounds, then multiply the part after the decimal point by 16 for ounces. A baby of 3.4 kg weighs 7 lb 8 oz." },
  { q: "Why does the UK use stones?", a: "The stone is an old English unit that survived in everyday use for body weight. UK hospitals, food labels and most official records use kilograms, but many people still think of their own weight in stones and pounds." },
  { q: "Is a US pound the same as a UK pound?", a: "Yes. Since 1959 the US, UK and other countries have used the same international pound of 0.45359237 kg. The US does not use stones, so Americans give body weight in pounds only." },
];

export default async function WeightConverterPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/height-converter", "/everyday/bmi-calculator", "/everyday/calorie-calculator", "/everyday/body-fat-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Stones, pounds and kilograms"
      title="Stone to Kg Converter"
      lead="Convert stones and pounds to kilograms, kilograms to stones, and pounds to kilograms, with a stone table and pounds and ounces for baby weights."
      points={["Converts both ways", "7 to 25 stone table", "Decimal or stones and pounds", "Exact definitions"]}
      guide={<WeightGuide />}
      faqs={FAQS}
      related={related}
      note="Exact conversions using 1 lb = 0.45359237 kg and 1 st = 14 lb. Figures are rounded for display."
    >
      <WeightStudio query={query} />
    </FlagshipPage>
  );
}

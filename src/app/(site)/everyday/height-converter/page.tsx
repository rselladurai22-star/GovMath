import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import HeightStudio from "./HeightStudio";
import HeightGuide from "./HeightGuide";

const PATH = "/everyday/height-converter";

export const metadata: Metadata = {
  title: "Feet to Cm Converter: Height in Feet and Cm",
  description:
    "Free height converter calculator. Convert feet and inches to cm and metres, cm to feet and inches, or inches only, with a 4'10\" to 6'8\" height table.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: PATH, label: "Feet to Cm Converter" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How many cm is a foot?", a: "Exactly 30.48 cm, because a foot is 12 inches and an inch is exactly 2.54 cm." },
  { q: "How do I convert feet and inches to cm?", a: "Multiply the feet by 12, add the inches, then multiply by 2.54. For example, 5 ft 7 in is 67 inches, which is 170.18 cm." },
  { q: "How do I convert cm to feet and inches?", a: "Divide the centimetres by 2.54 to get inches, then divide by 12. The whole number is feet and the remainder is inches. For example, 170 cm is 66.9 inches, which is 5 ft 6.9 in." },
  { q: "What is 6 foot in cm?", a: "182.88 cm, or 1.83 m. 5 ft is 152.4 cm and 5 ft 10 in is 177.8 cm." },
  { q: "What is 160 cm in feet and inches?", a: "5 ft 3 in (5 ft 2.99 in to two decimal places). 165 cm is 5 ft 5 in and 175 cm is 5 ft 8.9 in." },
  { q: "What do the ′ and ″ symbols mean?", a: "The single prime (′) means feet and the double prime (″) means inches, so 5′7″ is 5 feet 7 inches. People often type an apostrophe and a quotation mark instead." },
  { q: "Why convert to inches only?", a: "Some forms, sizing charts and medical formulas ask for height in inches alone. 5 ft 7 in is 67 inches. Choose Inches only to convert from a total in inches, and the result always shows the total too." },
  { q: "Is 5 ft 6.9 in the same as 5.69 feet?", a: "No. Inches are not tenths of a foot. 5 ft 6.9 in is 5.58 feet as a decimal, because 6.9 inches is only about 0.58 of a foot. The calculator shows decimal feet under What we assumed." },
  { q: "Which units does the NHS use for height?", a: "NHS hospitals and GP surgeries measure height in centimetres or metres, and BMI is worked out in metric. Many people still know their height in feet and inches, so it is worth checking both." },
  { q: "Is the US inch the same as the UK inch?", a: "Yes. Since 1959 the US, UK and other countries have used the same international inch of exactly 2.54 cm." },
];

export default async function HeightConverterPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/weight-converter", "/everyday/bmi-calculator", "/everyday/calorie-calculator", "/everyday/body-fat-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Feet, inches, cm and metres"
      title="Feet to Cm Converter"
      lead="Convert a height in feet and inches to centimetres and metres, centimetres back to feet and inches, or a total in inches, with a full height table."
      points={["Converts both ways", "4′10″ to 6′8″ table", "Inches only option", "Exact definitions"]}
      guide={<HeightGuide />}
      faqs={FAQS}
      related={related}
      note="Exact conversions using 1 inch = 2.54 cm and 1 foot = 12 inches. Figures are rounded for display."
    >
      <HeightStudio query={query} />
    </FlagshipPage>
  );
}

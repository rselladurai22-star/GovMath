import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import BodyFatStudio from "./BodyFatStudio";
import BodyFatGuide from "./BodyFatGuide";

const PATH = "/everyday/body-fat-calculator";

export const metadata: Metadata = {
  title: "Body Fat Calculator: US Navy Tape Method",
  description:
    "Free body fat calculator. Estimate your body fat % with a tape measure (US Navy method) or from BMI, see fat and lean mass, in cm or inches.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: PATH, label: "Body Fat Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How accurate is the US Navy body fat method?",
    a: "For most adults it lands within a few percentage points of a laboratory measurement, which makes it one of the better home methods. It is less accurate for people who are very lean, very muscular or carrying a lot of weight, and small measuring errors matter: 1 cm on the waist can move the result by around 0.7 points for a man.",
  },
  {
    q: "What is a healthy body fat percentage?",
    a: "There is no single official healthy range. The American Council on Exercise puts the average range at 25% to 31% for women and 18% to 24% for men, with 32% or more (women) and 25% or more (men) classed as obese. Essential fat, the minimum the body needs, is about 10% to 13% for women and 2% to 5% for men.",
  },
  {
    q: "Why do women have more body fat than men?",
    a: "Women need more essential fat for hormones and reproduction, so healthy ranges for women sit about 7 to 8 points higher than for men. That is why the calculator uses different formulas and different categories for women and men.",
  },
  {
    q: "Why does the women's formula need a hip measurement?",
    a: "Women tend to carry more fat around the hips and thighs, so the US Navy formula for women uses waist plus hips minus neck. The men's formula uses waist minus neck, because men tend to store more fat around the middle.",
  },
  {
    q: "How do I measure my neck, waist and hips?",
    a: "Use a soft tape, snug but not pressing into the skin, and measure on bare skin. Neck: just below the Adam's apple, with the tape sloping slightly down at the front. Waist: level with the belly button for men, at the narrowest point for women, after breathing out normally. Hips: around the widest part of the bottom. Measure twice and use the average.",
  },
  {
    q: "What is the BMI-based estimate?",
    a: "It is the Deurenberg equation from 1991: 1.2 times your BMI, plus 0.23 times your age, minus 10.8 for men, minus 5.4. It needs only height, weight and age, but it cannot tell muscle from fat, so it overestimates body fat in muscular people. It is shown as a second opinion.",
  },
  {
    q: "Is body fat percentage better than BMI?",
    a: "It tells you something BMI cannot: how much of your weight is fat. But BMI and waist size are what the NHS and most doctors use, because they are simple and linked to health risks in large studies. Using BMI, waist-to-height ratio and body fat together gives the fullest picture.",
  },
  {
    q: "What is lean mass?",
    a: "Lean mass is everything that is not fat: muscle, bone, organs, skin and water. The calculator works it out as your weight minus your fat mass. Keeping lean mass while losing fat is the aim of most weight loss plans, which is why strength exercise and enough protein matter.",
  },
  {
    q: "Are smart scales accurate for body fat?",
    a: "Smart scales use bioelectrical impedance, sending a small current through the body. Readings can shift by several points with hydration, meals and exercise, so they are best used at the same time each day to watch the trend rather than for a single figure.",
  },
  {
    q: "How often should I measure my body fat?",
    a: "Every four to six weeks is enough. Body fat changes slowly, and the tape method can move by a point or more from measuring error alone. Use the same tape, the same time of day and the same spots each time.",
  },
  {
    q: "Can I use this calculator if I am pregnant or under 18?",
    a: "No. The formulas were developed in adults who were not pregnant. Children's and teenagers' body fat changes as they grow, and pregnancy changes body shape and water. Talk to your midwife, GP or health visitor instead.",
  },
];

export default async function BodyFatPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/bmi-calculator", "/everyday/calorie-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="US Navy tape method"
      title="Body Fat Calculator"
      lead="Estimate your body fat percentage from a few tape measurements, with a BMI-based estimate as a second opinion, and see your fat mass and lean mass."
      points={["US Navy and BMI methods", "cm or inches, kg, lb or stones", "Fat and lean mass", "Free and private"]}
      guide={<BodyFatGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates from the US Navy circumference method and the Deurenberg BMI equation, with American Council on Exercise categories. Not medical advice."
    >
      <BodyFatStudio query={query} />
    </FlagshipPage>
  );
}

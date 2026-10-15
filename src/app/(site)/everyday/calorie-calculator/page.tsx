import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CalorieStudio from "./CalorieStudio";
import CalorieGuide from "./CalorieGuide";

const PATH = "/everyday/calorie-calculator";

export const metadata: Metadata = {
  title: "Calorie Calculator: BMR, TDEE and Weight Loss",
  description:
    "Free calorie calculator. Find your BMR and daily calories to maintain, lose or gain weight, with a safe minimum, macros, and kg, lb or stone units.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: PATH, label: "Calorie Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How many calories should I eat a day?",
    a: "The NHS says an average man needs about 2,500 kcal a day and an average woman about 2,000 kcal to keep a steady weight. Your own figure depends on your size, age, sex and how active you are, which is what this calculator works out. A 35-year-old woman who is 165 cm tall, weighs 70 kg and exercises 3 to 5 days a week uses about 2,163 kcal a day.",
  },
  {
    q: "What is the difference between BMR and TDEE?",
    a: "BMR (basal metabolic rate) is the energy your body uses at complete rest to keep you alive: breathing, circulation, keeping warm. TDEE (total daily energy expenditure) adds everything you do on top, from walking to the bus to a gym session. TDEE is the number to eat to maintain your weight; BMR is usually more than half of it: with the activity multipliers used here, it is between about 53% and 83% of TDEE.",
  },
  {
    q: "How many calories should I cut to lose weight?",
    a: "The NHS suggests cutting about 600 kcal a day from what you need, which gives a loss of roughly 0.5 kg (about 1 lb) a week. The calculator lets you pick 0.25 to 1 kg a week. It works from the rule of thumb that about 7,700 kcal equals 1 kg of body weight, so 0.5 kg a week means about 550 kcal a day less.",
  },
  {
    q: "What is the lowest number of calories I should eat?",
    a: "Harvard Health advises not going below about 1,200 kcal a day for women or 1,500 kcal for men without a health professional's supervision, because it becomes hard to get enough nutrients. The NHS says very low calorie diets, of 800 kcal a day or less, should only be followed under medical supervision. The calculator never shows a target below 1,200 or 1,500 kcal.",
  },
  {
    q: "Which formula is the most accurate?",
    a: "For most adults, Mifflin-St Jeor (1990) comes closest to measured resting energy in studies, which is why it is the default. Harris-Benedict, first published in 1919 and revised in 1984, tends to give slightly higher figures. Katch-McArdle uses lean body mass, so it can suit very muscular people, but only if you know your body fat percentage.",
  },
  {
    q: "Which activity level should I choose?",
    a: "Count both your job and your exercise. Most office workers who exercise two or three times a week are lightly active. Choose moderately active only if you train three to five days a week, and very active for hard training most days. People often overestimate, so if your weight does not change as expected, try the level below.",
  },
  {
    q: "Why am I not losing weight on my calorie target?",
    a: "The figure is an estimate for an average person like you, and real needs can be 10% higher or lower. Food is also easy to under-count: drinks, cooking oil, sauces and snacks add up. Water weight can hide fat loss for a week or two. Track for three to four weeks, then lower your target by 100 to 200 kcal if nothing has changed.",
  },
  {
    q: "How many calories do I need to gain weight?",
    a: "Eat a little more than your maintenance figure. Gaining about 0.25 kg a week needs roughly 275 kcal a day extra, and pairing it with strength training helps more of the gain be muscle. If you are underweight, the NHS advises gaining weight gradually with healthy foods rather than sugary or fatty snacks, and seeing your GP.",
  },
  {
    q: "What are macros and do I need to count them?",
    a: "Macros are the three nutrients that supply energy: protein and carbohydrate (4 kcal a gram) and fat (9 kcal a gram). You do not need to count them to lose weight, as total calories matter most. A higher share of protein can help you feel full and protect muscle while losing weight. The calculator shows grams for three common splits.",
  },
  {
    q: "Does this work for pregnancy or breastfeeding?",
    a: "No. Energy needs change in pregnancy and while breastfeeding, and dieting is not advised in pregnancy. The NHS says most women do not need extra calories in the first two trimesters and about 200 kcal extra in the last three months. Ask your midwife or GP for advice.",
  },
  {
    q: "Can children or teenagers use this calculator?",
    a: "No. The formulas are for adults aged 18 and over. Children and teenagers need energy to grow, and their healthy weight is judged on growth charts. If you are worried about a child's weight, talk to your GP, health visitor or school nurse.",
  },
  {
    q: "Do I need to recalculate as I lose weight?",
    a: "Yes. A smaller body uses less energy, so your maintenance figure falls as you lose weight. Recalculate after every 3 to 5 kg (half a stone to three-quarters of a stone) to keep your target accurate.",
  },
];

export default async function CaloriePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/bmi-calculator", "/everyday/body-fat-calculator", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="BMR and TDEE"
      title="Calorie Calculator"
      lead="Work out how many calories you use each day and how many to eat to maintain, lose or gain weight at a steady rate, with a macro split and a safe lower limit."
      points={["Mifflin-St Jeor and two other formulas", "kg, pounds or stones", "Safe minimum built in", "Free and private"]}
      guide={<CalorieGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates from published formulas, with NHS reference values. Not medical advice: talk to your GP or a dietitian about your own needs."
    >
      <CalorieStudio query={query} />
    </FlagshipPage>
  );
}

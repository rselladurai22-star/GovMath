import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import FractionStudio from "./FractionStudio";
import FractionGuide from "./FractionGuide";

export const metadata: Metadata = {
  title: "Fraction Calculator with Working Shown",
  description:
    "Free fraction calculator. Add, subtract, multiply and divide fractions and mixed numbers, simplify, and convert to decimals and percentages, step by step.",
  alternates: { canonical: "/everyday/fraction-calculator" },
  openGraph: ogFor("/everyday/fraction-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/fraction-calculator", label: "Fraction Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I add fractions with different denominators?", a: "Find the lowest common denominator, rewrite both fractions over it, then add the numerators. 1/4 + 1/6 = 3/12 + 2/12 = 5/12." },
  { q: "How do I multiply fractions?", a: "Multiply the numerators together and the denominators together, then simplify. 2/3 × 3/4 = 6/12 = 1/2." },
  { q: "How do I divide fractions?", a: "Turn the second fraction upside down and multiply. 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2, or 1 1/2." },
  { q: "How do I simplify a fraction?", a: "Divide the top and bottom by their greatest common divisor. For 84/126 the greatest common divisor is 42, so it simplifies to 2/3." },
  { q: "How do I type a mixed number?", a: "Type the whole number, a space, then the fraction: 2 3/4. For a negative mixed number, put the minus sign in front: -2 3/4." },
  { q: "How do I turn a fraction into a decimal?", a: "Divide the numerator by the denominator. 3/8 = 3 ÷ 8 = 0.375. Some fractions, like 1/3, give a decimal that repeats for ever." },
  { q: "How do I turn a decimal into a fraction?", a: "Write it over 10, 100 or 1,000 depending on the number of decimal places, then simplify. 0.375 = 375/1000 = 3/8." },
  { q: "What do the brackets in 0.(3) mean?", a: "The digits in brackets repeat for ever. 0.(3) is 0.333…, which is exactly 1/3. 0.1(6) is 0.1666…, which is 1/6." },
  { q: "What is an improper fraction?", a: "A fraction whose numerator is bigger than its denominator, such as 7/4. As a mixed number it is 1 3/4." },
  { q: "Can I divide by zero?", a: "No. Division by zero has no answer, so the calculator tells you instead of showing a result. A fraction with 0 on the bottom is not allowed either." },
  { q: "Why do I need the lowest common denominator?", a: "Any common denominator works, but the lowest one keeps the numbers small, so there is less to simplify at the end." },
];

export default async function FractionPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/percentage-calculator", "/everyday/average-calculator", "/everyday/discount-calculator", "/everyday/gpa-calculator", "/everyday/time-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With the working shown"
      title="Fraction Calculator"
      lead="Add, subtract, multiply and divide fractions and mixed numbers, simplify the answer and see it as a decimal and a percentage, with every step written out."
      points={["Mixed numbers", "Step-by-step working", "Repeating decimals", "Decimal to fraction"]}
      guide={<FractionGuide />}
      faqs={FAQS}
      related={related}
      note="Fractions are exact; decimals and percentages are rounded for display."
    >
      <FractionStudio query={query} />
    </FlagshipPage>
  );
}

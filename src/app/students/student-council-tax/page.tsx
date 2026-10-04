import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import CouncilTaxStudio from "./CouncilTaxStudio";
import CouncilTaxGuide from "./CouncilTaxGuide";

export const metadata: Metadata = {
  title: "Student Council Tax Calculator: Exemptions and Discounts",
  description:
    "Check whether your student household pays council tax: exempt if everyone is a full-time student, 25% off with one non-student, and what to do when your course ends.",
  alternates: { canonical: "/students/student-council-tax" },
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/students", label: "Students & Graduates" },
  { href: "/students/student-council-tax", label: "Student Council Tax" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "Do students pay council tax?", a: "Not if everyone in the home is a full-time student: the property is exempt." },
  { q: "What if I live with someone who is not a student?", a: "With one non-student, they get a 25% single person discount. With two or more, the full bill is due." },
  { q: "Who counts as a full-time student?", a: "Someone on a course of at least a year, studying at least 24 weeks a year and 21 hours a week." },
  { q: "When does the exemption end?", a: "The day after your course finishes. It continues over summer holidays between years." },
];

export default async function CouncilTaxPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) => ["/students/maintenance-loan", "/students/plan-5-student-loan", "/property/council-tax-bands"].includes(c.href));
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Student housing"
      title="Student Council Tax Calculator"
      lead="Check whether your household pays council tax, and how much you save."
      points={["Exemptions", "25% discount", "Part-year bills", "Free and private"]}
      guide={<CouncilTaxGuide />}
      faqs={FAQS}
      related={related}
      note="Check with your council: local rules and support can apply."
    >
      <CouncilTaxStudio query={query} />
    </FlagshipPage>
  );
}

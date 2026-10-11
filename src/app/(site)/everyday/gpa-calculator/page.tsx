import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import GpaStudio from "./GpaStudio";
import GpaGuide from "./GpaGuide";

export const metadata: Metadata = {
  title: "GPA Calculator and Final Grade Calculator",
  description:
    "Free GPA calculator. Work out your 4.0 GPA, weighted for honors and AP, your cumulative GPA, your course grade and the score you need on the final exam.",
  alternates: { canonical: "/everyday/gpa-calculator" },
  openGraph: ogFor("/everyday/gpa-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/gpa-calculator", label: "GPA and Grade Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I calculate my GPA?", a: "Turn each letter grade into grade points (A = 4.0, B = 3.0 and so on), multiply by the course credits, add up these quality points and divide by the total credits." },
  { q: "What is the difference between weighted and unweighted GPA?", a: "Unweighted GPA uses the 4.0 scale for every course. Weighted GPA adds extra points for harder courses, commonly 0.5 for honors and 1.0 for AP or IB, so it can go above 4.0." },
  { q: "Is an A+ worth 4.0 or 4.33?", a: "Most US schools count an A+ as 4.0, the top of the scale. Some count it as 4.33. Choose under More options to match your school." },
  { q: "How do I work out my cumulative GPA?", a: "Multiply your GPA so far by your credits so far, add this term's quality points, and divide by all your credits. A 3.2 over 60 credits plus a 3.8 over 15 credits gives 3.32." },
  { q: "How much can one term raise my GPA?", a: "Less as your credits grow. A perfect 4.0 over 15 credits lifts a 3.2 to 3.6 after 15 earlier credits, but only to about 3.31 after 90." },
  { q: "How do I work out what I need on my final exam?", a: "Needed score = (target − current grade × (1 − final weight)) ÷ final weight. With 84.46% so far and a final worth 35%, you need 86% on it to finish on 85%." },
  { q: "What if the score I need is over 100%?", a: "Then the target cannot be reached on the final alone, unless your course offers extra credit. Aim for the next grade down, or ask your teacher about other options." },
  { q: "What if my category weights do not add up to 100%?", a: "The calculator scales your categories to the share not taken by the final and warns you. Check the weights in your syllabus, as it may have dropped lowest scores or other rules." },
  { q: "Do pass/fail courses count towards GPA?", a: "Usually not. Leave them out or give them 0 credits. Check your school's policy for withdrawals, incompletes and repeated courses too." },
  { q: "What GPA do colleges look for?", a: "It depends on the college. Many recalculate applicants' GPAs on their own scale, and they also look at how hard your courses were. Check each college's published admissions profile." },
  { q: "How does a GPA compare with UK degree classes?", a: "There is no official conversion. UK honours degrees are usually classed as a First (70% and above), 2:1 (60–69%), 2:2 (50–59%) or Third (40–49%), but each university sets its own rules." },
  { q: "Does this work for college as well as high school?", a: "Yes. Colleges use credit hours as the weights, and most do not add honors or AP bonuses, so leave weighted GPA off." },
];

export default async function GpaPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/average-calculator", "/everyday/percentage-calculator", "/us/loans/student-loan-calculator", "/us/savings/529-plan-calculator", "/uk/students/student-budget", "/everyday/fraction-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="GPA and final grade"
      title="GPA and Grade Calculator"
      lead="Work out your GPA on the 4.0 scale, weighted or unweighted, see your cumulative GPA, and find the score you need on the final exam to get the grade you want."
      points={["Weighted and unweighted", "Cumulative GPA", "Final exam score needed", "Course grade"]}
      guide={<GpaGuide />}
      faqs={FAQS}
      related={related}
      note="Schools set their own scales and rules. Check your school's figures."
    >
      <GpaStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import StudentCouncilTaxCalculator from "./StudentCouncilTaxCalculator";

export const metadata: Metadata = {
  title: "Student Council Tax Exemption Checker (UK)",
  description: "See if your student household qualifies for a council tax exemption or discount.",
};

export default function StudentCouncilTaxPage() {
  return (
    <CalculatorShell
      category="Students"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/students", label: "Students" },
        { href: "/students/student-council-tax", label: "Council Tax Exemption" },
      ]}
      title="Student Council Tax Exemption"
      intro="Full-time students are disregarded for council tax. Whether your household pays anything depends on who else lives there."
      calculator={<StudentCouncilTaxCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>We count full-time students vs other adults in the property. All-student households are exempt. One non-student gets the 25% single-person discount. Two or more non-students = full bill.</p>
          }
          officialRules={
            <ul>
              <li>Full-time = 21+ study hours per week, course at least 24 weeks long.</li>
              <li>Apply directly to your local council with a Council Tax Exemption Certificate from your university.</li>
              <li>Student nurses, apprentices and youth trainees may also be disregarded.</li>
              <li>16–17-year-olds in full-time non-advanced education count as students.</li>
            </ul>
          }
          pitfalls={[
            { title: "Summer break", body: "You stay enrolled — and exempt — over summer. Drop out and the exemption ends from that day." },
            { title: "PhD writing-up year", body: "You may be classed as part-time after your funded period — check with your uni&rsquo;s registry." },
            { title: "Mid-tenancy changes", body: "If a non-student moves in or out, tell the council within 21 days or risk a penalty." },
          ]}
          faqs={[
            { question: "What if my partner isn&rsquo;t a student?", answer: "They&rsquo;ll get the 25% single-person discount. If you take a year out, they lose it." },
            { question: "Do international students qualify?", answer: "Yes — student status is based on the course, not nationality." },
            { question: "Halls of residence?", answer: "Usually exempt as Class N — the bill never even reaches you." },
          ]}
          disclaimer="Council tax rules vary slightly between England, Wales, Scotland and Northern Ireland. Always confirm with your local council."
        />
      }
    />
  );
}

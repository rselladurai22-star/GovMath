import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import P45P60Explainer from "./P45P60Explainer";

export const metadata: Metadata = {
  title: "P45 & P60 Explainer (UK)",
  description: "Decode every field on your P45 and P60 — what it means, why it matters, and what to watch for.",
};

export default function P45P60Page() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        { href: "/tax-and-salary/p45-p60-explainer", label: "P45 & P60 Explainer" },
      ]}
      title="P45 & P60 Explainer"
      intro="Your P45 lands when you leave a job; your P60 arrives by 31 May after the tax year ends. Here&rsquo;s what every box actually means."
      calculator={<P45P60Explainer />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>This is a reference, not a calculator. Pick a document and we list each field with a plain-English explanation, why it matters, and the most common mix-ups.</p>
          }
          officialRules={
            <ul>
              <li>P45: issued when you leave a job. Parts 1A, 2 and 3 — give parts 2 and 3 to your new employer.</li>
              <li>P60: issued annually by 31 May, summarising the whole tax year with that employer.</li>
              <li>Keep both for at least 22 months after tax year-end (longer if self-assessment).</li>
            </ul>
          }
          pitfalls={[
            { title: "Lost P45 panic", body: "You can&rsquo;t get a replacement. Your new employer fills in a starter checklist instead — same outcome." },
            { title: "Two P60s, one missing", body: "If you had two jobs and only one P60 arrived, chase the missing employer. HMRC won&rsquo;t issue them." },
            { title: "Tax code drift", body: "The code on your P45 is the leaving code. HMRC usually updates the new employer within a few weeks — check your first payslip carefully." },
          ]}
          faqs={[
            { question: "What if my P60 is wrong?", answer: "Ask your employer to issue a corrected one. If they refuse, contact HMRC with payslip evidence." },
            { question: "Do I need a P45 to start a new job?", answer: "No — your new employer can use the HMRC starter checklist instead." },
            { question: "What about a P11D?", answer: "That&rsquo;s a separate document listing benefits in kind (company car, medical insurance). Not the same as a P60." },
          ]}
          disclaimer="General explanation only. For specific tax questions, contact HMRC or a qualified accountant."
        />
      }
    />
  );
}

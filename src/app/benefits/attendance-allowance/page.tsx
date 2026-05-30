import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import AttendanceAllowanceCalculator from "./AttendanceAllowanceCalculator";

export const metadata: Metadata = {
  title: "Attendance Allowance Calculator (UK 2025/26)",
  description: "See whether your care needs qualify for the lower (£73.90/wk) or higher (£110.40/wk) rate of Attendance Allowance.",
};

export default function AttendanceAllowancePage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/attendance-allowance", label: "Attendance Allowance" },
      ]}
      title="Attendance Allowance Calculator"
      intro="Attendance Allowance helps people over State Pension Age with the extra costs of disability. It’s not means-tested — savings and income don’t matter."
      calculator={<AttendanceAllowanceCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Two rates. Lower rate £73.90/week if you need help (or supervision) during the day OR night. Higher rate £110.40/week if you need help both day AND night, or are terminally ill.
            </p>
          }
          officialRules={
            <ul>
              <li>Must be over State Pension Age and have needed help for at least 6 months.</li>
              <li>6-month qualifying period waived for terminally ill claimants (under Special Rules SR1).</li>
              <li>Tax-free; doesn’t count for the Benefit Cap.</li>
              <li>Receiving AA can unlock Council Tax Reduction, Pension Credit and a Carer’s Allowance for whoever helps you.</li>
            </ul>
          }
          pitfalls={[
            { title: "‘Help’ includes supervision", body: "You don’t need physical assistance — needing someone to prompt or supervise you to stay safe also counts." },
            { title: "Don’t under-claim", body: "Many people understate their needs. Use a Citizens Advice or Age UK adviser before submitting the AA1 form." },
            { title: "It doesn’t cover hospital stays", body: "AA stops after 28 days in NHS hospital. Resumes on discharge — let DWP know straight away." },
          ]}
          faqs={[
            { question: "Will AA reduce my Pension Credit?", answer: "No — AA is disregarded for Pension Credit, Housing Benefit and Council Tax Reduction. It can actually INCREASE those awards." },
            { question: "Do I have to spend it on care?", answer: "No — it’s your money to spend as you choose. Most claimants use it for cleaning, transport, gardening or extra heating." },
            { question: "Can I get PIP instead?", answer: "If you’re under State Pension Age, claim PIP. AA is the pensioner equivalent — but PIP has both daily living and mobility components." },
          ]}
          disclaimer="Estimate of statutory rates only. The DWP assessment of care needs is the deciding factor — get help from Age UK or Citizens Advice."
        />
      }
    />
  );
}

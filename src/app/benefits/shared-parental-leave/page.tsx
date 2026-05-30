import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SharedParentalLeaveCalculator from "./SharedParentalLeaveCalculator";

export const metadata: Metadata = {
  title: "Shared Parental Leave & Pay Calculator (UK 2025/26)",
  description: "Plan how to split up to 50 weeks of Shared Parental Leave and 37 weeks of ShPP between you and your partner.",
};

export default function SharedParentalLeavePage() {
  return (
    <CalculatorShell
      category="Benefits"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/benefits", label: "Benefits" },
        { href: "/benefits/shared-parental-leave", label: "Shared Parental Leave" },
      ]}
      title="Shared Parental Leave Calculator"
      intro="Shared Parental Leave lets parents split up to 50 weeks of leave and 37 weeks of statutory pay. Both parents can be off together, or take it back-to-back."
      calculator={<SharedParentalLeaveCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Statutory Shared Parental Pay (ShPP) is the lower of £187.18/week or 90% of average weekly earnings. We apply that rate to the paid weeks each parent claims, then total the two.
            </p>
          }
          officialRules={
            <ul>
              <li>Maximum 50 weeks of leave to share (52 − 2 compulsory maternity weeks).</li>
              <li>Maximum 37 weeks of statutory pay to share (39 SMP weeks − 2 mandatory weeks at SMP).</li>
              <li>Both parents need 26 weeks’ continuous service by the 15th week before the due date.</li>
              <li>Mother must curtail SMP or maternity leave for SPL to start.</li>
            </ul>
          }
          pitfalls={[
            { title: "Notice is fiddly", body: "Each block of leave needs 8 weeks’ written notice (a SPLIT form). Max 3 separate blocks per parent unless employer agrees more." },
            { title: "‘Discontinuous’ leave can be refused", body: "Employers must accept continuous blocks but can refuse split-up leave within 2 weeks of the request." },
            { title: "Enhanced maternity pay doesn’t always transfer", body: "Some employers pay above statutory for maternity but only statutory for ShPP — check both contracts before deciding." },
          ]}
          faqs={[
            { question: "Can we both be off at the same time?", answer: "Yes — overlapping leave is allowed. The 50-week pool just covers total time off the two of you take." },
            { question: "What if I’m self-employed?", answer: "Self-employed parents can’t take SPL but may qualify for Maternity Allowance instead — up to £187.18/week for 39 weeks." },
            { question: "Does this affect my pension?", answer: "Pension contributions during ShPP are usually based on actual ShPP earnings, not full pay. Check your scheme rules." },
          ]}
          disclaimer="Estimate of statutory pay only. Many employers offer enhanced ShPP — always check your contract."
        />
      }
    />
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import BonusCalculator from "./BonusCalculator";

export const metadata: Metadata = {
  title: "Bonus Tax Calculator (UK 2025/26)",
  description:
    "Find out exactly what a one-off bonus is worth after Income Tax and National Insurance. Watch out for the 60% trap near £100k.",
};

export default function BonusPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        { href: "/tax-and-salary/bonus-tax", label: "Bonus Tax Calculator" },
      ]}
      title="Bonus Tax Calculator"
      intro="Annual bonus on the way? Type your salary and your bonus to see how much actually lands in your bank after HMRC takes its share."
      calculator={<BonusCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                A bonus is taxed as normal earnings — it sits on top of your
                salary and is taxed at whatever band the marginal £ falls in.
                We calculate it by:
              </p>
              <ol>
                <li>Running your salary through the 2025/26 PAYE tax engine.</li>
                <li>Running salary + bonus through the same engine.</li>
                <li>The difference is the tax on the bonus itself.</li>
              </ol>
              <p>
                A common confusion: in the month the bonus is paid, PAYE
                usually over-deducts because it assumes the higher monthly
                figure repeats all year. You typically get refunded in
                subsequent months as the cumulative calculation rebalances.
                Annually, the figure on this page is what you actually end up with.
              </p>
            </>
          }
          officialRules={
            <>
              <p>The rates we apply (England, Wales, NI for 2025/26):</p>
              <ul>
                <li><strong>0%</strong> below £12,570 (Personal Allowance)</li>
                <li><strong>20%</strong> Income Tax £12,570–£50,270</li>
                <li><strong>40%</strong> Income Tax £50,270–£125,140</li>
                <li><strong>45%</strong> Income Tax above £125,140</li>
                <li><strong>8%</strong> National Insurance £12,570–£50,270</li>
                <li><strong>2%</strong> National Insurance above £50,270</li>
                <li><strong>+60% effective rate</strong> £100k–£125,140 (PA tapering)</li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The 60% tax trap around £100k",
              body: "Between £100k and £125,140, your Personal Allowance is withdrawn at £1 per £2 of extra income. Combined with 40% tax + 2% NI, the marginal rate is effectively 60%. A £10k bonus in that band only nets you ~£4k.",
            },
            {
              title: "Bonuses can push you into a higher tax band mid-year",
              body: "If your salary is £48k and you get a £10k bonus, £2,270 of that bonus stays in the basic-rate band (taxed 28%), and £7,730 is in the higher band (taxed 42%). The marginal rate matters, not the average.",
            },
            {
              title: "Salary sacrifice into a pension can save the bonus",
              body: "Many employers allow you to sacrifice your bonus into your workplace pension. You then avoid all Income Tax and both employee + employer NI on it. For a higher-rate taxpayer this can save 42%+ of the bonus.",
            },
            {
              title: "Student loan can take an extra 9% chunk",
              body: "If you're on a Plan 2/4/5 student loan, that's another 9% taken from anything above the threshold (Plan 5: £25k). Postgrad adds 6% above £21k. Worth checking on the student loan calculator.",
            },
          ]}
          faqs={[
            {
              question: "Why was so much tax taken in the bonus month?",
              answer:
                "PAYE assumes the higher monthly figure will recur. The system rebalances over the rest of the tax year, refunding the over-deducted tax. Annually, you end up at exactly the figure shown here.",
            },
            {
              question: "Should I take a bonus or a pay rise instead?",
              answer:
                "Tax-wise they're identical at the same gross level. The differences are: pay rises compound future raises and pension contributions; bonuses are discretionary so easier to cut. For pure cash this year, they're the same.",
            },
          ]}
          disclaimer="Doesn't include student loan repayments. For salary-sacrifice modelling, see the salary calculator."
        />
      }
    />
  );
}

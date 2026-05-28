import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SoleTraderCalculator from "./SoleTraderCalculator";

export const metadata: Metadata = {
  title: "Sole Trader Tax Calculator (UK 2025/26)",
  description:
    "Self-employed Income Tax + Class 4 NI on your annual trading profit. Includes Small Profits Threshold guidance for State Pension credits.",
};

export default function SoleTraderPage() {
  return (
    <CalculatorShell
      category="Freelance & Business"
      updatedLabel="2025/26 rates"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/business", label: "Freelance & Business" },
        { href: "/business/sole-trader-tax", label: "Sole Trader Tax Calculator" },
      ]}
      title="Sole Trader Tax Calculator"
      intro="Type your annual profit (after allowable expenses) to see your Self Assessment bill — Income Tax plus Class 4 National Insurance."
      calculator={<SoleTraderCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>Sole traders pay two things on their trading profit:</p>
              <ul>
                <li>
                  <strong>Income Tax</strong> at the standard 0% / 20% / 40% /
                  45% bands, with a Personal Allowance of £12,570 (tapered
                  above £100k).
                </li>
                <li>
                  <strong>Class 4 National Insurance</strong> at 6% between
                  £12,570 and £50,270, and 2% above. (Lower than the 8%/2%
                  paid by employees on Class 1.)
                </li>
              </ul>
              <p>
                Both are settled through Self Assessment by 31 January each
                year, plus a Payment on Account in July for the next year&apos;s
                expected liability.
              </p>
            </>
          }
          officialRules={
            <>
              <p>The key thresholds for 2025/26:</p>
              <ul>
                <li>
                  <strong>Trading allowance</strong>: first £1,000 of gross
                  trading income is tax-free with no need to register or file.
                  Above £1,000 you must register for Self Assessment.
                </li>
                <li>
                  <strong>Small Profits Threshold</strong> (£6,725): below this
                  you get no automatic NI credit toward State Pension.
                  Voluntary Class 2 (£3.45/week) can fill the gap.
                </li>
                <li>
                  <strong>Class 4 NI</strong>: 6% main band, 2% upper band —
                  same thresholds as Class 1 employee NI.
                </li>
                <li>
                  <strong>Class 2 NI is no longer compulsory</strong> from
                  April 2024 — voluntary only.
                </li>
                <li>
                  <strong>Payment on Account</strong>: if your bill is over
                  £1,000, HMRC asks for 50% of the next year&apos;s estimated
                  liability in January, and another 50% in July.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The first January is a triple bill",
              body: "In your first Self Assessment, you pay last year&rsquo;s tax in full PLUS 50% Payment on Account for the new year — effectively 150% of last year. Set aside cash for it from day one.",
            },
            {
              title: "Allowable expenses are narrower than you think",
              body: "Mileage, home office, professional subscriptions, marketing, tools — yes. Entertainment, fines, your own salary (you can&rsquo;t pay yourself), and most clothing — no. HMRC&rsquo;s &ldquo;wholly and exclusively&rdquo; test is strict.",
            },
            {
              title: "Class 4 NI plus Class 1 can double-charge",
              body: "If you have a day job AND self-employment, you pay Class 1 NI on the day job and Class 4 NI on the side income — but HMRC will refund any overpayment above the annual NI maxima after Self Assessment.",
            },
            {
              title: "VAT registration at £90k turnover",
              body: "Once your 12-month rolling turnover hits £90k you must register for VAT — within 30 days. Many sole traders cross this threshold mid-year and only realise at tax time. Use the VAT calculator and Flat Rate Scheme tool to plan.",
            },
          ]}
          faqs={[
            {
              question: "Should I incorporate?",
              answer:
                "Tax-wise, the break-even is usually around £40–50k profit, depending on what you can extract as dividends. Below that, sole trader is usually simpler and cheaper. Above, a limited company often saves a few thousand a year — but adds compliance cost (Corporation Tax return, annual accounts, more paperwork).",
            },
            {
              question: "What expenses can I claim?",
              answer:
                "Anything wholly and exclusively for the business: software subscriptions, office supplies, business travel (not commute), professional indemnity, accountancy, training that maintains existing skills (not new ones), and a proportion of home running costs if you work from home.",
            },
            {
              question: "When do I need to register for Self Assessment?",
              answer:
                "By 5 October following the end of the tax year in which your trading income first exceeded £1,000. So if you started in June 2025, you have until 5 October 2026 to register. Tax is due 31 January 2027.",
            },
          ]}
          disclaimer="Doesn't include VAT, pension contributions, student loan, Class 2 voluntary, or interaction with employment income. For full Self Assessment guidance, see HMRC&rsquo;s helpsheets."
        />
      }
    />
  );
}

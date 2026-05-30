import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import HourlyCalculator from "./HourlyCalculator";

export const metadata: Metadata = {
  title: "Hourly to Salary Converter (UK)",
  description:
    "Convert an hourly rate into an annual salary, or work the other way to see your effective hourly rate. Includes UK National Living Wage benchmark.",
};

export default function HourlyPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="National Living Wage 2025"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        { href: "/tax-and-salary/hourly-to-salary", label: "Hourly to Salary Converter" },
      ]}
      title="Hourly to Salary Converter"
      intro="Convert an hourly rate into a yearly salary — or work backwards from your salary to your true hourly rate. Quick check whether a job offer beats your current pay."
      calculator={<HourlyCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>The conversion is straightforward arithmetic:</p>
              <p>
                <code>Annual = Hourly rate × Hours per week × Weeks per year</code>
              </p>
              <p>
                We default to <strong>52 weeks/year</strong> because salaried
                workers are paid for their holiday — your annual figure
                already includes it. Use a smaller number (e.g. 47–48) only
                if you’re self-employed or genuinely don’t get paid
                holiday and want to model your effective take-home.
              </p>
              <p>
                The standard UK office full-time week is{" "}
                <strong>37.5 hours</strong> (8.30am–5pm with 1h unpaid lunch).
                Finance and law often use 40. Junior healthcare contracts use
                37.5 plus on-call/banding additions.
              </p>
            </>
          }
          officialRules={
            <>
              <p>The two UK floors you can’t legally fall under:</p>
              <ul>
                <li>
                  <strong>National Living Wage (21+):</strong> £12.21/hr from
                  April 2025.
                </li>
                <li>
                  <strong>National Minimum Wage:</strong> £10.00/hr for ages
                  18–20; £7.55/hr for under-18s and apprentices in year 1.
                </li>
                <li>
                  <strong>Working Time Regulations 1998</strong>: most workers
                  can’t be required to work more than 48 hours/week on
                  average, unless they’ve voluntarily opted out in
                  writing.
                </li>
                <li>
                  <strong>Statutory holiday:</strong> 5.6 weeks/year for a
                  full-time worker (28 days, can include bank holidays).
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "Unpaid breaks make hourly look better than it is",
              body: "If your “8 hour day” includes an unpaid hour for lunch, you’re only paid for 7 hours. A £15/hr role at 7 paid hours/day × 5 days = £27,300/year, not £31,200.",
            },
            {
              title: "Self-employed should target a much higher hourly",
              body: "An employee on £30/hr might be a freelancer on £45–60/hr equivalent, because freelancers fund their own holiday, sick pay, pension, training, equipment, and the gaps between contracts. Don’t compare like-for-like.",
            },
            {
              title: "Salaried jobs hide unpaid overtime",
              body: "If you’re paid £35,000 but routinely work 50 hours/week, your effective rate is closer to £13.50/hr, not the £18/hr it would be at 37.5h. Always check your real working hours before celebrating a pay rise.",
            },
            {
              title: "Annualised hours can flatten high seasons",
              body: "Some contracts (especially term-time) annualise a higher weekly figure into 12 equal monthly payments. The monthly figure understates what you’re really being paid per hour worked.",
            },
          ]}
          faqs={[
            {
              question: "Should I use 52 weeks or 47?",
              answer:
                "For salaried roles use 52 — paid holiday means you receive 52 weekly “chunks” of pay. For a freelancer or zero-hours worker who only invoices when working, 46–48 is more realistic (4–5 weeks unpaid holiday + bank holidays + a buffer for sickness).",
            },
            {
              question: "What about overtime rates?",
              answer:
                "There’s no UK law requiring time-and-a-half for overtime — it’s contractual. Many manual/shift roles pay 1.25× after 37 hours and 1.5× on weekends; salaried office roles often pay nothing extra at all.",
            },
            {
              question: "Is the National Living Wage age-based?",
              answer:
                "Yes — it applies from age 21 from April 2024 onwards (previously 23+). Younger workers fall under the lower National Minimum Wage bands.",
            },
          ]}
          disclaimer="Gross figures only. Take-home after tax and NI is roughly 70–80% of gross at typical UK salaries — use the salary calculator for an exact figure."
        />
      }
    />
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import EVSalSacCalculator from "./EVSalSacCalculator";

export const metadata: Metadata = {
  title: "EV Salary Sacrifice Calculator (UK 2025/26)",
  description:
    "See your true net monthly cost of an electric car through salary sacrifice — Income Tax + NI saving minus the BIK tax.",
};

export default function EVSalSacPage() {
  return (
    <CalculatorShell
      category="Vehicles & Transport"
      updatedLabel="BIK 3% (2025/26)"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/vehicles", label: "Vehicles & Transport" },
        { href: "/vehicles/ev-salary-sacrifice", label: "EV Salary Sacrifice" },
      ]}
      title="EV Salary Sacrifice Calculator"
      intro="Electric cars through salary sacrifice can cost half what you&rsquo;d pay leasing privately — because you swap gross pay (taxed) for a lease (untaxed bar a small BIK)."
      calculator={<EVSalSacCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Salary sacrifice EV schemes work by reducing your gross
                salary by the monthly lease amount. The mechanics:
              </p>
              <ol>
                <li>
                  You save Income Tax + employee NI on the sacrificed amount
                  (~28% for basic rate, ~42% for higher rate).
                </li>
                <li>
                  You pay <strong>Benefit-in-Kind</strong> tax on the car —
                  P11D × BIK rate × your Income Tax rate. For 2025/26 the BIK
                  rate for EVs is just 3%.
                </li>
                <li>Net cost = gross lease − tax saving + BIK tax.</li>
              </ol>
              <p>
                Most schemes (Octopus, Tusker, LoveElectric etc.) bundle in
                insurance, servicing, breakdown and tyres — so the true
                like-for-like comparison vs renting a car privately is
                normally even more favourable than this number suggests.
              </p>
            </>
          }
          officialRules={
            <>
              <p>HMRC&apos;s rules for EV salary sacrifice:</p>
              <ul>
                <li>
                  <strong>BIK rate for pure EVs</strong>: 2% (2024/25), 3%
                  (2025/26), 4% (2026/27), 5% (2027/28), 7% (2028/29), 9%
                  (2029/30).
                </li>
                <li>
                  <strong>OpRA (Optional Remuneration Arrangements)</strong>:
                  most company-car benefits lost their tax break in 2017, but
                  ULEVs (≤75g/km CO2) were specifically exempted — which is
                  why EV sal sac still works.
                </li>
                <li>
                  <strong>Minimum Wage check</strong>: your post-sacrifice
                  salary can&apos;t take you below National Minimum Wage.
                </li>
                <li>
                  <strong>Lease length</strong>: typically 36–48 months,
                  with mileage allowance built in.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "Sacrificing salary affects pension and mortgage",
              body: "Your gross salary drops on paper, which can reduce auto-enrolment pension contributions and what mortgage lenders will offer. Many schemes use &lsquo;notional&rsquo; salary for benefits — check the employer&rsquo;s policy.",
            },
            {
              title: "Early termination charges can sting",
              body: "Leaving the job or being made redundant usually triggers an early-termination fee — often the remaining months of lease, or a fixed sum. Some schemes offer protection insurance, often worth taking.",
            },
            {
              title: "BIK is rising every year",
              body: "The 2% rate that hooked everyone in 2024/25 is gone. By 2029/30 it&rsquo;s 9% — still much better than a petrol car&rsquo;s 30%+ BIK, but the gap narrows. Lock in 3-year leases now to fix the rate.",
            },
            {
              title: "Not all employers offer schemes",
              body: "EV sal sac requires the employer to set up an arrangement with a provider. Many SMEs don&rsquo;t bother. If yours doesn&rsquo;t, you can ask — but it can take months to roll out.",
            },
          ]}
          faqs={[
            {
              question: "Can I sacrifice down to National Minimum Wage?",
              answer:
                "No. The post-sacrifice gross salary must remain at or above NMW for your hours. Higher earners aren&rsquo;t affected; this mainly blocks part-timers and lower-paid full-timers from the most expensive cars.",
            },
            {
              question: "What about hybrids?",
              answer:
                "Plug-in hybrids (PHEVs) have BIK rates based on electric range — 8–14% for cars with 30–69 mile range. Much less attractive than pure EVs. Mild hybrids (no plug) are treated as petrols.",
            },
            {
              question: "Can I keep the car at end of lease?",
              answer:
                "Usually not directly — but most schemes let you buy at fair market value at the end. Some employers run novated leases that work differently. Check the small print.",
            },
          ]}
          disclaimer="Estimate only. Real schemes vary in what they bundle (insurance, tyres, charging credits). Always ask for a full quote in writing."
        />
      }
    />
  );
}

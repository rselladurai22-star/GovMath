import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import ProRataCalculator from "./ProRataCalculator";

export const metadata: Metadata = {
  title: "Pro Rata Salary Calculator (UK)",
  description:
    "Convert a full-time advertised salary into the pro-rata equivalent for your hours, per year, month, week and day.",
};

export default function ProRataPage() {
  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="UK 37.5h default"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        { href: "/tax-and-salary/pro-rata", label: "Pro Rata Salary Calculator" },
      ]}
      title="Pro Rata Salary Calculator"
      intro="A job is advertised at a full-time rate but you&rsquo;re working fewer hours. This tells you the actual gross salary in your contract — and what it works out to per month, week and day."
      calculator={<ProRataCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                Pro-rata means &ldquo;in proportion.&rdquo; The calculation
                is simple:
              </p>
              <p>
                <code>
                  Pro-rata salary = Full-time salary × (Your hours ÷ Full-time
                  hours)
                </code>
              </p>
              <p>
                We then divide the annual figure by 12 for monthly, 52 for
                weekly, and 260 (52 × 5) for a daily working-day rate.
              </p>
              <p>
                For example: a £40,000 full-time role at 37.5 hours/week, done
                at 30 hours/week, is 30 ÷ 37.5 = 0.8 = 80%, giving £32,000.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                There&apos;s no single statutory definition of full-time in
                the UK, but the common-law and ACAS expectation is:
              </p>
              <ul>
                <li>
                  <strong>Full-time</strong> is usually 35–40 hours/week.
                  Civil service and many offices use 37 or 37.5; healthcare
                  often uses 37.5; finance and law commonly use 40.
                </li>
                <li>
                  <strong>Part-time workers</strong> have the legal right not
                  to be treated less favourably than comparable full-timers
                  on a pro-rata basis (Part-time Workers Regulations 2000).
                </li>
                <li>
                  <strong>Holiday entitlement</strong> is also pro-rated.
                  The statutory minimum is 5.6 weeks (28 days for a 5-day
                  full-time week), reduced proportionally for fewer days.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "Lunch breaks aren't usually paid",
              body: "A &ldquo;9-to-5&rdquo; job with a 1-hour unpaid lunch is 35 paid hours/week, not 40. Check whether the advertised hours include or exclude breaks before you calculate.",
            },
            {
              title: "Compressed hours ≠ part time",
              body: "Working a full-time job&rsquo;s hours over four longer days (e.g. 4×9.25h = 37 hours) is still full time — you&rsquo;re entitled to the full salary, not 80% of it.",
            },
            {
              title: "Tax thresholds don't pro-rate",
              body: "Your Personal Allowance (£12,570) and NI thresholds are annual figures. If your pro-rata salary lands you below them, you pay no tax at all on that income.",
            },
            {
              title: "Holiday and bank holidays should also be pro-rated",
              body: "Don&rsquo;t accept the same paid leave as full-time colleagues by default — but equally, employers shouldn&rsquo;t under-count it. The fair calculation is 5.6 weeks × the fraction of full-time hours you work.",
            },
          ]}
          faqs={[
            {
              question: "Is pro-rata always based on hours, or can it be days?",
              answer:
                "Either is valid. Many employers calculate pro-rata by days (e.g. 4 days out of 5 = 80%), which usually matches hours-based when daily hours are equal. Always confirm in the offer letter.",
            },
            {
              question: "Does my pension contribution rate change?",
              answer:
                "No — auto-enrolment uses the percentage of your actual qualifying earnings, which are already lower because you earn less. The 8% combined minimum applies the same way.",
            },
            {
              question: "What about overtime above my contracted hours?",
              answer:
                "Overtime is paid on top of your pro-rata salary, usually at your normal hourly rate up to full-time hours and at an enhanced rate (1.25× or 1.5×) beyond that. Check your contract for the specifics.",
            },
          ]}
          disclaimer="Gross figures only. Use the salary calculator for take-home pay after Income Tax, NI and pension."
        />
      }
    />
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import NICalculator from "./NICalculator";

export const metadata: Metadata = {
  title: "National Insurance Calculator (UK, 2025/26)",
  description:
    "Work out your UK National Insurance contributions for 2025/26. Class 1 (employee) and Class 4 (self-employed) — explained in plain English.",
};

type SearchParams = Promise<{ income?: string; mode?: string }>;

function parseIncome(raw: string | undefined): number {
  if (!raw) return 35000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 35000;
  return Math.min(n, 10_000_000);
}

function parseMode(raw: string | undefined): "employee" | "self-employed" {
  return raw === "self-employed" ? "self-employed" : "employee";
}

export default async function NIPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { income, mode } = await searchParams;

  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        {
          href: "/tax-and-salary/national-insurance",
          label: "National Insurance",
        },
      ]}
      title="UK National Insurance Calculator"
      intro="Work out exactly how much National Insurance you owe — whether you’re on PAYE (Class 1) or self-employed (Class 4) — for the 2025/26 tax year."
      calculator={
        <NICalculator
          initialIncome={parseIncome(income)}
          initialMode={parseMode(mode)}
        />
      }
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                National Insurance is a <strong>slab tax</strong> like Income
                Tax — different slices of your earnings are taxed at different
                rates. We:
              </p>
              <ol>
                <li>
                  Apply <strong>0%</strong> to everything up to the Primary
                  Threshold of £12,570.
                </li>
                <li>
                  Apply the <strong>main rate</strong> (8% for employees, 6%
                  for self-employed) to the slice between £12,570 and £50,270.
                </li>
                <li>
                  Apply <strong>2%</strong> to everything above £50,270 — the
                  Upper Earnings Limit.
                </li>
              </ol>
              <p>
                The total at the top is what HMRC takes over the tax year — via
                PAYE if you&rsquo;re an employee, or via Self Assessment if
                you&rsquo;re self-employed.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                Rates for the <strong>2025/26 tax year</strong> (6 April 2025
                to 5 April 2026):
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Earnings slice</th>
                    <th>Class 1 (employee)</th>
                    <th>Class 4 (self-employed)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Up to £12,570</td>
                    <td>0%</td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>£12,571 – £50,270</td>
                    <td>8%</td>
                    <td>6%</td>
                  </tr>
                  <tr>
                    <td>Above £50,270</td>
                    <td>2%</td>
                    <td>2%</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Class 2 NI (the flat £3.50/week rate for self-employed
                workers) was effectively abolished from 6 April 2024. You only
                need it now if you&rsquo;re below the small-profits threshold
                and want to <em>voluntarily</em> protect your State Pension
                record.
              </p>
              <p>
                Employers also pay <strong>Class 1 secondary NI</strong> on
                your salary — but that comes out of the employer&rsquo;s budget,
                not yours, so it&rsquo;s not shown here.
              </p>
            </>
          }
          pitfalls={[
            {
              title: "NI doesn’t taper above £100k",
              body: "Unlike Income Tax (where the Personal Allowance disappears between £100k and £125,140), NI just stays at the flat 2% rate above £50,270. There’s no extra cliff to worry about.",
            },
            {
              title: "Self-employed people often forget the 2% upper rate",
              body: "Class 4 is famous for the 6% headline rate, but every pound of profit above £50,270 still attracts 2%. A £100,000 profit doesn’t mean £5,250 of NI — it means about £3,256.",
            },
            {
              title: "Bonuses are taxed in the month they’re paid",
              body: "Class 1 NI is calculated per pay period, not per year. A one-off bonus can push you into the 8% band for that month — even if your average salary would only ever hit 2%. The annual figure here is an estimate; your payslip total will match by year-end.",
            },
            {
              title: "Directors get a different rule",
              body: "Company directors use an annual earnings period for NI rather than monthly. If you’re a director, the totals here are still the right ballpark, but your pay timing won’t affect the result the way it does for a regular employee.",
            },
          ]}
          faqs={[
            {
              question:
                "I’m both employed and self-employed. Do I pay both Class 1 and Class 4?",
              answer:
                "Yes — but HMRC won’t make you pay twice on the same money. Class 1 is calculated on your salary, Class 4 is calculated on your trading profit. If your combined liability exceeds an annual cap, HMRC adjusts it through Self Assessment.",
            },
            {
              question:
                "Does paying more NI mean a bigger State Pension?",
              answer:
                "Not directly. What matters is the number of qualifying years on your NI record. You need 35 qualifying years for the full new State Pension — paying more NI in a single year doesn’t add credit, it just contributes to general government revenue.",
            },
            {
              question: "I’m above State Pension age. Do I still pay NI?",
              answer:
                "No — once you reach State Pension age, you stop paying Class 1 and Class 4 NI, even if you’re still working. Your employer keeps paying their secondary contribution though.",
            },
          ]}
          disclaimer="Estimates based on UK 2025/26 rates and thresholds. Doesn’t account for salary sacrifice, multiple employments in the same period, or director-specific calculation methods."
        />
      }
    />
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import SalaryCalculator from "./SalaryCalculator";

export const metadata: Metadata = {
  title: "Salary & Take-Home Pay Calculator (UK, 2025/26)",
  description:
    "Work out your UK take-home pay after Income Tax and National Insurance. Updated for the 2025/26 tax year. Plain-English breakdown, no sign-up.",
};

type SearchParams = Promise<{ salary?: string }>;

function parseSalary(raw: string | undefined): number {
  if (!raw) return 35000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 35000;
  return Math.min(n, 10_000_000);
}

export default async function SalaryCalculatorPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { salary } = await searchParams;

  return (
    <CalculatorShell
      category="Tax & Salary"
      updatedLabel="2025/26"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/tax-and-salary", label: "Tax & Salary" },
        {
          href: "/tax-and-salary/salary-calculator",
          label: "Salary Calculator",
        },
      ]}
      title="UK Salary & Take-Home Pay Calculator"
      intro="Enter your salary and see exactly what lands in your bank — after Income Tax and National Insurance — for the 2025/26 tax year."
      calculator={<SalaryCalculator initialSalary={parseSalary(salary)} />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <>
              <p>
                We take your gross salary and subtract two things HMRC takes:
                <strong> Income Tax</strong> and <strong>National Insurance</strong>.
                Whatever’s left is your take-home.
              </p>
              <p>The maths in plain English:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>
                  Your first <strong>£12,570</strong> is tax-free — your
                  “Personal Allowance”.
                </li>
                <li>
                  The next slice up to <strong>£50,270</strong> is taxed at{" "}
                  <strong>20%</strong>.
                </li>
                <li>
                  From £50,270 to <strong>£125,140</strong> is taxed at{" "}
                  <strong>40%</strong>.
                </li>
                <li>
                  Anything above £125,140 is taxed at <strong>45%</strong>.
                </li>
                <li>
                  National Insurance is then layered on at <strong>8%</strong>{" "}
                  between £12,570 and £50,270, and <strong>2%</strong> above
                  that.
                </li>
              </ol>
              <p>
                We add those two totals together, take the result off your
                gross, and divide the answer by 12, 52 or 260 to show
                monthly, weekly and daily figures.
              </p>
            </>
          }
          officialRules={
            <>
              <p>
                <strong>HMRC</strong> (His Majesty’s Revenue and Customs —
                the government tax office) sets the bands once a year. For the{" "}
                <strong>2025/26 tax year</strong> in England, Wales and
                Northern Ireland:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  Personal Allowance: <strong>£12,570</strong> (tax-free).
                </li>
                <li>
                  Basic rate (20%): £12,571 – £50,270.
                </li>
                <li>
                  Higher rate (40%): £50,271 – £125,140.
                </li>
                <li>
                  Additional rate (45%): above £125,140.
                </li>
                <li>
                  National Insurance main rate (8%): £12,570 – £50,270.
                </li>
                <li>
                  National Insurance upper rate (2%): above £50,270.
                </li>
                <li>
                  Personal Allowance starts shrinking at <strong>£100,000</strong>{" "}
                  — you lose £1 of allowance for every £2 you earn over the
                  threshold.
                </li>
              </ul>
            </>
          }
          pitfalls={[
            {
              title: "The £100,000 trap — the hidden 60% rate",
              body: (
                <p>
                  Between £100,000 and £125,140 every extra £1 effectively
                  costs you 60p — because the disappearing Personal Allowance
                  is taxed at 40% on top of the 40% you already pay on the
                  £1. A pay rise into this band is often worth less than you
                  think.
                </p>
              ),
            },
            {
              title: "Tax codes that aren't 1257L",
              body: (
                <p>
                  This calculator assumes the standard <code>1257L</code>{" "}
                  code. If you’re on <code>BR</code>, <code>0T</code>,
                  <code> K</code> or have an emergency code, your real
                  take-home will look very different — sometimes by hundreds
                  of pounds a month.
                </p>
              ),
            },
            {
              title: "Pensions and student loans aren't included",
              body: (
                <p>
                  Workplace pensions (especially salary sacrifice) and
                  student-loan plans 1–5 take more money before you see it.
                  Add them in your head, or wait for the dedicated calculators
                  in this section.
                </p>
              ),
            },
            {
              title: "Scotland has different bands entirely",
              body: (
                <p>
                  Scottish taxpayers use six bands (Starter, Basic,
                  Intermediate, Higher, Advanced and Top). Use the Scottish
                  Income Tax calculator instead — same NI rules, very
                  different Income Tax.
                </p>
              ),
            },
          ]}
          faqs={[
            {
              question: "Does this include my pension contributions?",
              answer: (
                <p>
                  No — this is a headline take-home for a standard PAYE
                  employee. If you contribute to a workplace pension via
                  salary sacrifice, your take-home will be lower but your
                  taxable income will also be lower.
                </p>
              ),
            },
            {
              question: "Is this the same as my payslip?",
              answer: (
                <p>
                  Close, but not identical. Real payslips reflect tax-code
                  quirks, student loans, salary-sacrifice and month-to-month
                  PAYE adjustments. Use this for planning, not as a
                  substitute for HMRC’s figures.
                </p>
              ),
            },
          ]}
          disclaimer="Figures are estimates for the 2025/26 tax year (England, Wales & Northern Ireland). GovMath is not affiliated with HMRC. Always check your tax code and personal circumstances before making financial decisions."
        />
      }
    />
  );
}

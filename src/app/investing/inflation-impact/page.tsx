import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import InflationCalculator from "./InflationCalculator";

export const metadata: Metadata = {
  title: "Inflation Impact Calculator (Real Future Value, UK)",
  description: "See what your savings or investment will really be worth in tomorrow&rsquo;s money, after UK inflation.",
};

export default function InflationPage() {
  return (
    <CalculatorShell
      category="Investing & Savings"
      updatedLabel="Fisher equation"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/investing", label: "Investing" }, { href: "/investing/inflation-impact", label: "Inflation Impact" }]}
      title="Inflation Impact Calculator"
      intro="£10,000 today won&rsquo;t buy £10,000 worth of stuff in ten years — inflation chips away at every pound. This shows the real purchasing power of your future money, not just the headline number."
      calculator={<InflationCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Nominal future value = present × (1 + nominal)^years. Real future value uses the Fisher equation: (1 + real) = (1 + nominal) ÷ (1 + inflation). The result is in today&rsquo;s purchasing power.</p>}
          officialRules={
            <ul>
              <li>Bank of England targets 2% CPI inflation.</li>
              <li>UK uses CPI for ONS headline, CPIH (includes housing), and RPI (mortgages, rail fares — usually ~1pp higher).</li>
              <li>Inflation-linked Gilts and NS&amp;I Index-Linked Savings Certificates protect real value.</li>
            </ul>
          }
          pitfalls={[
            { title: "Don&rsquo;t just subtract", body: "Real rate ≈ nominal − inflation only works for small numbers. Fisher equation is exact: at 10% nominal / 6% inflation, real rate is 3.77%, not 4%." },
            { title: "Cash drag is real", body: "If your easy-access savings pay 3% and CPI is 4%, you&rsquo;re losing 1% of purchasing power per year — even though the balance goes up." },
            { title: "Past inflation ≠ future inflation", body: "UK averaged ~2.5% over 2000–2020, then spiked to 11% in 2022. Run multiple scenarios." },
          ]}
          faqs={[
            { question: "CPI or RPI?", answer: "CPI for general planning (matches BoE target). RPI for things contractually linked to it — rail fares, some pensions, student loans (Plan 1)." },
            { question: "What rate should I assume?", answer: "2–3% is the long-run BoE target. Stress-test with 4–5% to be safe." },
          ]}
          disclaimer="Educational. Investment returns aren&rsquo;t guaranteed."
        />
      }
    />
  );
}

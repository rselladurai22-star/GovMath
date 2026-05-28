import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import LBTTCalculator from "./LBTTCalculator";

export const metadata: Metadata = {
  title: "LBTT Calculator (Scotland 2025/26)",
  description: "Scottish Land & Buildings Transaction Tax — by band, including first-time buyer relief and the 8% Additional Dwelling Supplement.",
};

export default function LBTTPage() {
  return (
    <CalculatorShell
      category="Mortgages & Property"
      updatedLabel="2025/26 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/property", label: "Mortgages & Property" }, { href: "/property/lbtt-scotland", label: "LBTT (Scotland)" }]}
      title="LBTT (Scotland) Calculator"
      intro="Land & Buildings Transaction Tax replaced UK Stamp Duty in Scotland in 2015. The bands differ — but the principle is the same: progressive percentage rates on residential property purchases."
      calculator={<LBTTCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>LBTT is calculated band by band, like Income Tax. Each slice of the price falls into one rate. First-time buyers get the nil-rate band extended to £175,000. Additional-property buyers pay an extra 8% Additional Dwelling Supplement (ADS) on the full price.</p>
          }
          officialRules={
            <ul>
              <li>Nil rate: up to £145,000 (£175,000 for first-time buyers).</li>
              <li>2% £145,001–£250,000; 5% to £325,000; 10% to £750,000; 12% above.</li>
              <li>ADS: 8% on full price for any second home/buy-to-let purchase ≥ £40,000 (raised from 6% in Dec 2024).</li>
              <li>Filed and paid via Revenue Scotland within 30 days of completion.</li>
            </ul>
          }
          pitfalls={[
            { title: "ADS jumped to 8%", body: "From December 2024 the surcharge rose from 6% to 8% — a major hit for landlords and holiday-home buyers." },
            { title: "FTB relief only if under £175k nil rate is genuinely applicable", body: "If you&rsquo;ve ever owned property anywhere (including overseas) you lose FTB status." },
            { title: "ADS refund window if replacing main home", body: "Buy first, sell within 36 months → reclaim ADS. Miss the window and it&rsquo;s gone." },
          ]}
          faqs={[
            { question: "Does LBTT apply to commercial property?", answer: "Yes, but with different bands. This calculator covers residential only." },
            { question: "What about non-UK residents?", answer: "Scotland has no equivalent of England&rsquo;s 2% non-resident SDLT surcharge." },
          ]}
          disclaimer="Residential freehold purchases only. Excludes leasehold premium + rent NPV."
        />
      }
    />
  );
}

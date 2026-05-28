import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import CGTAssetsCalculator from "./CGTAssetsCalculator";

export const metadata: Metadata = {
  title: "Capital Gains Tax on Shares & Assets (UK 2025/26)",
  description: "CGT on gains from shares, funds, crypto and other non-property assets.",
};

export default function CGTAssetsPage() {
  return (
    <CalculatorShell
      category="Investing"
      updatedLabel="Oct 2024 rates"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/investing", label: "Investing" }, { href: "/investing/capital-gains-assets", label: "CGT (Assets)" }]}
      title="Capital Gains Tax (Shares & Other Assets)"
      intro="Selling shares, funds, crypto or other investments outside an ISA/SIPP? CGT applies on gains above the £3,000 Annual Exempt Amount."
      calculator={<CGTAssetsCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Gain = proceeds − base cost − allowable expenses. Subtract the £3,000 AEA. Remainder taxed at 18% (basic) or 24% (higher/additional). Your other taxable income fills the basic-rate band first.</p>}
          officialRules={
            <ul>
              <li>Annual Exempt Amount: £3,000 (2025/26).</li>
              <li>Rates from 30 Oct 2024: 18% basic / 24% higher.</li>
              <li>ISAs and pensions are CGT-free entirely.</li>
              <li>Crypto is treated as a capital asset by HMRC.</li>
            </ul>
          }
          pitfalls={[
            { title: "Bed &amp; ISA every year", body: "Sell up to £3k of gains, repurchase inside ISA — washes future gains tax-free." },
            { title: "Section 104 holding rules", body: "Same-class shares are pooled for cost — not FIFO. Sell some Apple? Average cost across all your shares." },
            { title: "Crypto wash sales", body: "Same-day and 30-day rules apply — selling and buying back the same coin within 30 days uses the new cost, defeating the loss claim." },
          ]}
          faqs={[
            { question: "Are bonds CGT-free?", answer: "UK Gilts yes. Most corporate bonds no — gain on disposal is CGT-able." },
            { question: "What about investment trusts?", answer: "Treated like shares — CGT on disposal." },
          ]}
          disclaimer="Educational. Pooled cost rules can be complex — seek advice for substantial portfolios."
        />
      }
    />
  );
}

import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import IsaVsGiaCalculator from "./IsaVsGiaCalculator";

export const metadata: Metadata = {
  title: "ISA vs GIA Tax Calculator (UK)",
  description: "How much UK tax you save by holding investments inside a Stocks &amp; Shares ISA instead of a general investment account.",
};

export default function IsaVsGiaPage() {
  return (
    <CalculatorShell
      category="Investing"
      updatedLabel="£20k ISA limit"
      breadcrumbs={[{ href: "/", label: "Home" }, { href: "/investing", label: "Investing" }, { href: "/investing/isa-vs-gia", label: "ISA vs GIA" }]}
      title="ISA vs GIA Tax Calculator"
      intro="ISAs shelter dividends and capital gains entirely. Outside an ISA (in a General Investment Account), dividends and gains above tiny allowances are taxed. Compare the bill."
      calculator={<IsaVsGiaCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={<p>Dividend allowance is £500. Above that, dividends taxed at 8.75% (basic), 33.75% (higher), 39.35% (additional). Capital gains: £3,000 AEA, then 18% / 24%. ISA pays zero on both.</p>}
          officialRules={
            <ul>
              <li>ISA subscription limit £20,000 (2025/26).</li>
              <li>Dividend allowance £500 in a GIA.</li>
              <li>CGT AEA £3,000.</li>
              <li>No annual reporting needed for ISAs.</li>
            </ul>
          }
          pitfalls={[
            { title: "Fill ISA first, every year", body: "You can&rsquo;t backdate. Unused allowance disappears every 5 April." },
            { title: "Bed &amp; ISA for existing GIA holdings", body: "Sell GIA → buy back inside ISA. Crystallises gain (within AEA) but shelters future growth." },
            { title: "Flexible vs non-flexible ISA", body: "A flexible ISA lets you withdraw and replace in the same year. Non-flexible doesn&rsquo;t — withdrawal eats your annual allowance." },
          ]}
          faqs={[
            { question: "What about Lifetime ISA?", answer: "Separate £4k allowance with 25% gov bonus — for first home or age 60+." },
            { question: "Can I have multiple ISAs?", answer: "Yes — from April 2024 you can subscribe to multiple ISAs of the same type in one year." },
          ]}
          disclaimer="Educational. ISA rules change frequently — confirm current limits before subscribing."
        />
      }
    />
  );
}

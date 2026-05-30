import type { Metadata } from "next";
import BlueprintExplainer from "@/components/calculator/BlueprintExplainer";
import CalculatorShell from "@/components/calculator/CalculatorShell";
import PremiumBondsCalculator from "./PremiumBondsCalculator";

export const metadata: Metadata = {
  title: "Premium Bonds Expected Prize Calculator (NS&I)",
  description: "Estimate average monthly and annual prizes from your Premium Bond holding at the current NS&I prize fund rate.",
};

export default function PremiumBondsPage() {
  return (
    <CalculatorShell
      category="Investing & Pensions"
      updatedLabel="Prize rate 3.80%"
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/investing", label: "Investing & Pensions" },
        { href: "/investing/premium-bonds", label: "Premium Bonds" },
      ]}
      title="Premium Bonds Expected Prize Calculator"
      intro="NS&I Premium Bonds pay no interest — instead each £1 bond enters a monthly draw. We show your expected average return at the current prize fund rate, plus the taxable-account equivalent."
      calculator={<PremiumBondsCalculator />}
      explainer={
        <BlueprintExplainer
          howWeCalculated={
            <p>
              Expected annual prizes = holding × prize fund rate. Prizes are tax-free, so we also show what gross interest you’d need in a standard taxable account to match the rate at basic and higher tax rates.
            </p>
          }
          officialRules={
            <ul>
              <li>£25 minimum, £50,000 maximum holding.</li>
              <li>Each £1 bond is a separate entry — every month, every bond.</li>
              <li>Prizes from £25 to £1,000,000, drawn monthly by ERNIE.</li>
              <li>Held in trust by NS&I — fully government-backed.</li>
            </ul>
          }
          pitfalls={[
            { title: "Median return is lower than ‘expected’", body: "The rate is an average pulled up by huge jackpots. The typical (median) holder wins less than the headline rate — small holdings often win nothing for months." },
            { title: "Tax-free but capped", body: "Most savers already shelter interest in their £1,000 Personal Savings Allowance. Above that, the tax-free element matters more." },
            { title: "Not inflation-proof", body: "Premium Bonds aren’t index-linked. In a 5% inflation year, the ”expected” 3.80% prize rate is a real loss." },
          ]}
          faqs={[
            { question: "How are winnings paid?", answer: "Free bank transfer (default) or auto-reinvested as more bonds. Old paper cheques have been phased out." },
            { question: "Do older bonds win less?", answer: "No — every bond has equal odds. The conspiracy theory is myth: NS&I publishes the draw seed every month." },
            { question: "Can I include them in my ISA?", answer: "No — Premium Bonds sit outside the ISA wrapper. They have their own tax-free wrapper baked in." },
          ]}
          disclaimer="Expected values only. Actual returns vary widely. Current rate from nsandi.com — adjust if it changes."
        />
      }
    />
  );
}

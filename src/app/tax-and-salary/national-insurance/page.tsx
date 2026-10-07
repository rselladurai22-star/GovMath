import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import NIStudio from "./NIStudio";
import NIGuide from "./NIGuide";
import { ogFor } from "@/gm/og";
import { CALCULATORS } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "National Insurance Calculator UK 2026/27",
  description:
    "Free National Insurance calculator for 2026/27. See Class 1 employee NI at 8% and 2%, or Class 4 for the self-employed, band by band, by week, month or year.",
  alternates: { canonical: "/tax-and-salary/national-insurance" },
  openGraph: ogFor("/tax-and-salary/national-insurance"),
};

type SearchParams = Promise<{ income?: string; mode?: string }>;
function parseIncome(raw: string | undefined): number {
  if (!raw) return 35000;
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) return 35000;
  return Math.min(n, 10_000_000);
}

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/tax-and-salary", label: "Tax & Salary" },
  { href: "/tax-and-salary/national-insurance", label: "National Insurance" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How much National Insurance will I pay?", a: "As an employee in 2026/27 you pay Class 1 NI at 8% on earnings between £12,570 and £50,270, then 2% on anything above £50,270. Nothing is due below £12,570. Enter your salary above for your exact figure, monthly and annually." },
  { q: "Why does the NI rate fall for high earners?", a: "The main 8% rate only applies up to the Upper Earnings Limit (£50,270). Above that, the rate drops to 2%. So while high earners pay more NI in total, their marginal rate on the next pound is lower than a middle earner's." },
  { q: "Is self-employed NI different?", a: "Yes. The self-employed pay Class 4 NI on their trading profits at 6% between £12,570 and £50,270, and 2% above — lower than employees. Compulsory Class 2 NI ended in April 2024, though you can still pay it voluntarily if your profits are low. Choose 'Self-employed' above to see your figures." },
  { q: "Does National Insurance build my State Pension?", a: "Your NI record does. You generally need 35 qualifying years for the full new State Pension, and at least 10 years to receive anything. Contributions also fund the NHS and certain benefits — it isn't a personal savings pot." },
  { q: "Is NI the same across the UK?", a: "Yes. Unlike Income Tax (which differs in Scotland), National Insurance rates and thresholds are the same across England, Wales, Scotland and Northern Ireland." },
];

export default async function NationalInsurancePage({ searchParams }: { searchParams: SearchParams }) {
  const { income, mode } = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/tax-and-salary/salary-calculator", "/tax-and-salary/tax-bracket-checker", "/tax-and-salary/bonus-tax", "/business/sole-trader-tax", "/tax-and-salary/scottish-tax", "/investing/state-pension-age"].includes(c.href)
  );

  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="National Insurance Calculator"
      lead="See exactly what you pay in National Insurance, employed or self-employed, band by band for 2026/27."
      points={["2026/27 HMRC rates", "Employed and self-employed", "Employer's NI shown", "Free and private"]}
      guide={<NIGuide />}
      faqs={FAQS}
      related={related}
      note="Figures are estimates for the 2026/27 tax year. National Insurance is UK-wide. GovMath is not affiliated with HMRC — always check your payslip and personal circumstances."
    >
      <NIStudio
        initialIncome={parseIncome(income)}
        initialMode={mode === "self-employed" ? "self-employed" : "employee"}
        showResults={Boolean(income || mode)}
      />
    </FlagshipPage>
  );
}

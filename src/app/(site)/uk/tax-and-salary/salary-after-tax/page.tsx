import type { Metadata } from "next";
import AmountPage from "@/components/AmountPage";
import { DataTable, Guide, GuideSection, type Source, type TocItem } from "@/components/guide/Guide";
import { gbp } from "@/components/flagship/format";
import { AMOUNT_PAGES_LIVE, SALARY_AMOUNTS, salaryFacts } from "@/lib/seo/amounts";
import { ogFor } from "@/gm/og";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Salary After Tax UK 2026/27: £15k to £250k",
  description:
    "Take-home pay after tax for every salary from £15,000 to £250,000 in 2026/27: yearly and monthly figures for England, Wales, NI and Scotland, with a full breakdown.",
  alternates: { canonical: "/uk/tax-and-salary/salary-after-tax" },
  openGraph: ogFor("/uk/tax-and-salary/salary-calculator"),
};

const SOURCES: Source[] = [
  { label: "GOV.UK: Income Tax rates and Personal Allowances", href: "https://www.gov.uk/income-tax-rates" },
  { label: "GOV.UK: National Insurance rates and categories", href: "https://www.gov.uk/national-insurance-rates-letters" },
  { label: "GOV.UK: Scottish Income Tax rates", href: "https://www.gov.uk/scottish-income-tax" },
];

const BANDS: [string, number, number][] = [
  ["£15,000 to £30,000", 15_000, 30_000],
  ["£31,000 to £50,000", 31_000, 50_000],
  ["£51,000 to £75,000", 51_000, 75_000],
  ["£76,000 to £100,000", 76_000, 100_000],
  ["£101,000 to £250,000", 101_000, 250_000],
];

const TOC: TocItem[] = BANDS.map(([label, lo]) => ({ id: `from-${lo}`, title: label }));

export default function SalaryAfterTaxIndex() {
  if (!AMOUNT_PAGES_LIVE) notFound();
  return (
    <AmountPage
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/uk/tax-and-salary", label: "Tax & salary" },
        { href: "/uk/tax-and-salary/salary-after-tax", label: "Salary after tax" },
      ]}
      title="Salary after tax in 2026/27"
      lead="Take-home pay for every salary from £15,000 to £150,000 in £1,000 steps, plus £160,000 to £250,000. Pick a salary for the full breakdown: Income Tax band by band, National Insurance, Scotland, pensions and student loans."
      cta={{ href: "/uk/tax-and-salary/salary-calculator", label: "Work out any salary in the calculator" }}
    >
      <Guide
        kicker="All salaries"
        title="Take-home pay by salary"
        intro="Yearly and monthly take-home pay for an employee on the standard 1257L tax code with no pension or student loan, using the 2026/27 rates."
        toc={TOC}
        sources={SOURCES}
      >
        {BANDS.map(([label, lo, hi], i) => (
          <GuideSection key={lo} id={`from-${lo}`} n={i + 1} kicker="Salaries" title={label}>
            <DataTable
              head={["Salary", "Take-home a year", "A month", "In Scotland, a month"]}
              numeric={[1, 2, 3]}
              rows={SALARY_AMOUNTS.filter((n) => n >= lo && n <= hi).map((n) => {
                const f = salaryFacts(n);
                return [
                  <a key={n} href={`/uk/tax-and-salary/salary-after-tax/${n}`}>
                    {gbp(n)} after tax
                  </a>,
                  gbp(f.takeHome),
                  gbp(f.monthly),
                  gbp(f.scotland.takeHome / 12),
                ];
              })}
            />
          </GuideSection>
        ))}
      </Guide>
    </AmountPage>
  );
}

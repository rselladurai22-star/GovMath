import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RmdStudio from "./RmdStudio";
import RmdGuide from "./RmdGuide";

const PATH = "/us/savings/rmd-calculator";

export const metadata: Metadata = {
  title: "RMD Calculator 2026: Your Required Distribution",
  description:
    "Free RMD calculator for 2026. Work out your required minimum distribution from the IRS Uniform Lifetime or Joint Life table and project future RMDs.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "RMD Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is my RMD calculated?",
    a: "Divide your account balance on December 31 of last year by the factor for your age in the IRS Uniform Lifetime Table. At 75 the factor is 24.6, so a $500,000 IRA has an RMD of about $20,325. If your spouse is your sole beneficiary and more than 10 years younger, you use the Joint Life table instead, which gives a smaller RMD.",
  },
  {
    q: "At what age do RMDs start?",
    a: "At 73 if you were born from 1951 to 1959, and at 75 if you were born in 1960 or later, under the SECURE 2.0 Act. People born in 1950 or earlier have already started (at 72, or 70½ for those born before July 1, 1949).",
  },
  {
    q: "When is the deadline for my RMD?",
    a: "December 31 each year. Your very first RMD can wait until April 1 of the following year, but then you must take two RMDs in that year, the delayed one and the current one.",
  },
  {
    q: "What happens if I miss an RMD?",
    a: "The IRS charges an excise tax of 25% of the amount you should have taken. It drops to 10% if you take the missed amount and file Form 5329 within the correction window, usually by the end of the second year. The IRS can waive it for a reasonable error that you fix.",
  },
  {
    q: "Which accounts have RMDs?",
    a: "Traditional, SEP and SIMPLE IRAs, and 401(k), 403(b) and 457(b) plans, including Roth 401(k)s before 2024. Since 2024, Roth 401(k)s have no RMDs while you are alive, and Roth IRAs have never had them for the original owner.",
  },
  {
    q: "Do I take a separate RMD from each account?",
    a: "Work out the RMD for each IRA separately, then you can take the total from any one or more of your IRAs. The same applies to 403(b)s. Each 401(k) RMD must come from that 401(k).",
  },
  {
    q: "Can I delay RMDs if I am still working?",
    a: "From your current employer's 401(k), usually yes, until April 1 after the year you retire, unless you own 5% or more of the company. RMDs from IRAs and old employers' plans still apply.",
  },
  {
    q: "How are RMDs taxed?",
    a: "As ordinary income, at your federal and state income tax rate, except for any after-tax money (basis) in the account. You can ask your provider to withhold tax from the distribution, which counts as tax paid during the year.",
  },
  {
    q: "Can I give my RMD to charity?",
    a: "Yes. From age 70½ you can send up to $111,000 in 2026 directly from an IRA to a charity as a qualified charitable distribution. It counts toward your RMD and is not included in your income.",
  },
  {
    q: "Can I reinvest my RMD?",
    a: "Yes, but not back into a tax-deferred account. You can put it in a taxable brokerage account, a savings account, or a Roth IRA if you have earned income for the year and are under the income limits.",
  },
  {
    q: "What are the rules for an inherited IRA?",
    a: "They differ. Most non-spouse beneficiaries must empty the account within 10 years, and must also take yearly RMDs in that period if the original owner had already started them. A spouse can usually treat the IRA as their own. This calculator covers your own accounts only.",
  },
  {
    q: "How can I lower future RMDs?",
    a: "Convert part of a traditional IRA to a Roth before RMDs start, spend from traditional accounts first in your 60s, or give through qualified charitable distributions. A qualifying longevity annuity (QLAC) can also be left out of the balance until it starts paying.",
  },
];

export default async function RmdPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/roth-conversion-calculator", "/us/savings/ira-calculator", "/us/savings/social-security-calculator", "/us/savings/retirement-calculator", "/us/taxes/federal-income-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 IRS tables"
      title="RMD Calculator"
      lead="Work out the required minimum distribution you must take from your IRA or 401(k) in 2026, and see how your RMDs could change year by year."
      points={["IRS Uniform Lifetime table", "Joint Life for a younger spouse", "Year-by-year projection", "Penalty and QCD rules"]}
      guide={<RmdGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate using the IRS Publication 590-B tables. Your account provider calculates the official RMD. Not tax advice."
    >
      <RmdStudio query={query} />
    </FlagshipPage>
  );
}

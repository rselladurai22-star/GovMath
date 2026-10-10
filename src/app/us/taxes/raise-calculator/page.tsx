import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RaiseStudio from "./RaiseStudio";
import RaiseGuide from "./RaiseGuide";

const PATH = "/us/taxes/raise-calculator";

export const metadata: Metadata = {
  title: "Pay Raise Calculator 2026: After Tax",
  description:
    "Free pay raise calculator for 2026. Turn a raise in percent or dollars into your new salary, extra take-home per paycheck and real raise after inflation.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/taxes", label: "Taxes and pay" },
  { href: PATH, label: "Pay Raise Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out a percentage raise?", a: "Multiply your current pay by the raise percentage. A 4% raise on $60,000 is $2,400, making a new salary of $62,400. To find the percentage from a dollar raise, divide the raise by your old pay: $3,000 on $60,000 is 5%." },
  { q: "How much of my raise will I take home?", a: "Usually 60% to 80%. On a $60,000 salary in Texas, 80% of a raise is kept: 12% goes to federal income tax and 7.65% to Social Security and Medicare. State income tax takes a little more elsewhere." },
  { q: "Can a raise put me in a higher tax bracket and lower my pay?", a: "No. Only the dollars above a bracket line are taxed at the higher rate, so a raise always increases take-home pay. Some credits and benefits do shrink as income rises, which can take a larger bite." },
  { q: "How much is a $1-an-hour raise a year?", a: "$2,080 for a full-time worker on 40 hours a week for 52 weeks. After tax, at around $20 an hour in Texas, that is about $1,671 a year or $64 more every two weeks." },
  { q: "What is a good raise in 2026?", a: "Anything above inflation is a real raise. Prices rose 3.4% in the 12 months to August 2026, so a raise below that leaves you worse off in buying power." },
  { q: "What is a real raise?", a: "Your raise after inflation: (1 + raise) ÷ (1 + inflation) − 1. A 4% raise with 3.4% inflation is a real raise of about 0.58%." },
  { q: "What is the difference between a cost-of-living raise and a merit raise?", a: "A cost-of-living adjustment (COLA) is given to everyone to keep pay in line with prices. A merit raise rewards your performance. Many employers combine them into one yearly figure." },
  { q: "How long does it take for pay to double with raises?", a: "At 3% a year, about 23.4 years; at 4%, about 17.7; at 5%, about 14.2. The rule of 72 gives a quick estimate: 72 divided by the raise percentage." },
  { q: "Does a raise change my 401(k)?", a: "If you contribute a percentage of pay, yes: your contribution and any match rise with your pay. A percentage contribution also lowers the tax on the raise, because it comes out first." },
  { q: "When does a raise show up in my paycheck?", a: "From the first full pay period after the effective date. If the raise is backdated, the missed amount is usually paid as a lump sum, which may be withheld at the 22% flat rate for supplemental pay." },
  { q: "Should I ask for a raise in dollars or percent?", a: "Ask for a specific yearly figure in dollars, based on what the market pays for your role. A dollar figure is clearer and easier to compare with take-home pay." },
  { q: "Can a raise reduce benefits like the EITC?", a: "Yes. The earned income credit falls by up to 21 cents for each extra dollar in its phase-out, and some state benefits have income limits. The extra pay is usually still worth more than what you lose." },
];

export default async function RaisePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/taxes/paycheck-calculator", "/us/taxes/hourly-paycheck-calculator", "/us/taxes/tax-bracket-calculator", "/us/taxes/salary-to-hourly", "/everyday/percentage-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 pay raise after tax"
      title="Pay Raise Calculator"
      lead="Turn a raise in percent or dollars into your new salary or hourly rate, see how much more lands in each paycheck after tax, and check whether it beats inflation."
      points={["Percent or dollars", "Salary or hourly", "Take-home after tax", "Real raise after inflation"]}
      guide={<RaiseGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates for 2026 based on IRS and state rates and the latest CPI. Not tax or financial advice."
    >
      <RaiseStudio query={query} />
    </FlagshipPage>
  );
}

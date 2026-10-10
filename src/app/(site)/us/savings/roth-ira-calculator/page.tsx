import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import RothStudio from "./RothStudio";
import RothGuide from "./RothGuide";

const PATH = "/us/savings/roth-ira-calculator";

export const metadata: Metadata = {
  title: "Roth IRA Calculator 2026: Limit and Growth",
  description:
    "Free Roth IRA calculator for 2026. Check your contribution limit with the income phase-out, project tax-free growth and compare it with a taxable account.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/us", label: "United States" },
  { href: "/us/savings", label: "Saving and retirement" },
  { href: PATH, label: "Roth IRA Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How much can I put in a Roth IRA in 2026?",
    a: "$7,500, or $8,600 if you are 50 or older by the end of the year. The limit is shared with traditional IRAs, and you can't contribute more than your earned income for the year.",
  },
  {
    q: "What are the 2026 Roth IRA income limits?",
    a: "Single and head of household filers can contribute the full amount with modified AGI below $153,000; the amount phases out between $153,000 and $168,000. For married couples filing jointly the range is $242,000 to $252,000. Married filing separately (if you lived together) phases out from $0 to $10,000.",
  },
  {
    q: "How is a reduced contribution worked out?",
    a: "The IRS reduces the limit in proportion to how far your income is into the phase-out range, rounds up to the next $10 and allows at least $200 while you are inside the range. A single filer aged 35 with modified AGI of $160,000 can contribute $4,000.",
  },
  {
    q: "When can I take money out of a Roth IRA tax-free?",
    a: "Your own contributions can come out at any time, tax- and penalty-free. Earnings come out tax-free once you are 59½ and at least five tax years have passed since your first Roth IRA contribution. Other exceptions include disability, death and up to $10,000 for a first home.",
  },
  {
    q: "What is the Roth IRA five-year rule?",
    a: "For earnings to be tax-free, five tax years must have passed since January 1 of the year of your first contribution to any Roth IRA. A contribution made on April 15, 2027 for tax year 2026 starts the clock on January 1, 2026. Separate five-year clocks apply to each conversion for the 10% penalty if you are under 59½.",
  },
  {
    q: "What is a backdoor Roth IRA?",
    a: "If your income is too high to contribute to a Roth directly, you can contribute to a traditional IRA without a deduction and then convert it to a Roth. It is legal, but if you have other pre-tax IRA money, the pro-rata rule makes part of the conversion taxable.",
  },
  {
    q: "What is the deadline for 2026 contributions?",
    a: "The tax filing deadline, April 15, 2027. You can contribute for 2026 at any time from January 1, 2026 until then. Tell your IRA provider which year a contribution is for.",
  },
  {
    q: "Can I have a Roth IRA and a 401(k)?",
    a: "Yes. Having a workplace plan doesn't affect your Roth IRA limit, only your income does. Many people contribute enough to a 401(k) to get the match, then fund a Roth IRA.",
  },
  {
    q: "Is a Roth IRA better than a traditional IRA?",
    a: "It depends on your tax rate now and in retirement. A Roth gives no deduction today but tax-free withdrawals later; a traditional IRA may give a deduction now, with withdrawals taxed later. If you expect your rate to be the same or higher in retirement, the Roth usually wins.",
  },
  {
    q: "What happens if I contribute too much?",
    a: "Excess contributions are charged a 6% excise tax for every year they stay in the account. Withdraw the excess and its earnings before your tax filing deadline, or recharacterize it as a traditional IRA contribution, to avoid the tax.",
  },
  {
    q: "Can a non-working spouse have a Roth IRA?",
    a: "Yes. With a spousal IRA, a married couple filing jointly can each contribute up to the limit as long as their joint earned income covers both contributions and they are under the income limits.",
  },
  {
    q: "Do Roth IRAs have required minimum distributions?",
    a: "Not for the original owner. You can leave the money growing for as long as you live. Most people who inherit a Roth IRA must empty it within ten years, but the withdrawals are usually tax-free.",
  },
];

export default async function RothPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/us/savings/401k-calculator", "/us/savings/retirement-calculator", "/us/savings/compound-interest-calculator", "/us/taxes/federal-income-tax", "/us/taxes/capital-gains-tax"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="2026 limits"
      title="Roth IRA Calculator"
      lead="Check how much you can put in a Roth IRA in 2026 and see how it could grow tax-free, compared with the same saving in a taxable account."
      points={["2026 limit and phase-out", "Tax-free growth", "Roth vs taxable", "Free and private"]}
      guide={<RothGuide />}
      faqs={FAQS}
      related={related}
      note="An estimate based on 2026 IRS limits and steady returns. Not tax or financial advice."
    >
      <RothStudio query={query} />
    </FlagshipPage>
  );
}

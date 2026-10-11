import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import NoticeStudio from "./NoticeStudio";
import NoticeGuide from "./NoticeGuide";

const PATH = "/uk/tax-and-salary/notice-period-final-pay";

export const metadata: Metadata = {
  title: "Notice Period and Final Pay Calculator UK",
  description:
    "Free notice period calculator for UK workers. Find your statutory or contract notice, last working day and final pay with untaken holiday and pay in lieu.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: PATH, label: "Notice Period and Final Pay" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "What is the statutory minimum notice period?",
    a: "If your employer dismisses you, it must give at least 1 week’s notice once you have worked there for a month, then 1 week for each full year of service from 2 years, up to 12 weeks. If you resign, you must give at least 1 week once you have worked there for a month. Your contract can require more, but not less.",
  },
  {
    q: "Does my contract or the law decide my notice?",
    a: "Whichever is longer. If your contract says one month and you have 6 years of service, your employer must give the statutory 6 weeks. If your contract says three months, that applies because it is longer than the legal minimum.",
  },
  {
    q: "When does a notice period start?",
    a: "The day after notice is given. A week’s notice given on a Friday ends on the following Friday. A month’s notice given on 30 October ends on 30 November. If notice is given by letter, it starts once you have received it.",
  },
  {
    q: "Is my last working day the same as my leaving date?",
    a: "Usually, but not always. If your notice ends on a weekend or bank holiday, your last working day is the working day before. On garden leave you stop working straight away but stay employed until the notice ends. With pay in lieu of notice your employment ends on the day.",
  },
  {
    q: "What is in my final pay?",
    a: "Pay for the days you worked in your last pay period, pay for any holiday built up but not taken, pay in lieu of notice if your employer ends your job early, and any other money owed such as overtime or commission. Allowed deductions, like a season ticket loan, may be taken off.",
  },
  {
    q: "How is part of a month’s salary worked out?",
    a: "Employers use different methods: working days paid as a share of the working days in that month, calendar days as a share of the days in the month, or salary divided by 260 or 365 for each day. Your contract or staff handbook should say which. The calculator lets you compare the first two.",
  },
  {
    q: "Will I be paid for holiday I have not taken?",
    a: "Yes. When you leave you must be paid for statutory holiday built up in the current holiday year and not taken. If you have taken more than you have built up, your employer can only take back the difference if your contract or a written agreement says so.",
  },
  {
    q: "What is garden leave?",
    a: "Your employer tells you to stay away from work for some or all of your notice period. You are still employed and paid as normal, you keep building up holiday, and you cannot start work for anyone else until your notice ends. Your contract needs a garden leave clause, or you must agree.",
  },
  {
    q: "What is pay in lieu of notice?",
    a: "Your employer ends your employment straight away and pays you for the notice period instead. It is taxed as normal pay, with National Insurance. If your contract has no PILON clause, your employer is technically in breach of contract, but the payment usually settles that.",
  },
  {
    q: "Can I leave before my notice period ends?",
    a: "Only if your employer agrees. Many employers will agree to a shorter notice if you ask. If you just leave, you could lose pay for the notice not worked and, in rare cases, your employer could claim for any losses it suffers.",
  },
  {
    q: "When will I get my final pay?",
    a: "Usually on your normal payday after you leave. Your employer must also give you a P45 showing your pay and tax for the year so far. Anything paid after the P45 is issued is taxed on code 0T.",
  },
  {
    q: "Can my employer withhold my final pay?",
    a: "No, apart from deductions allowed by law, your contract or your written agreement. An unlawful deduction can be challenged through Acas early conciliation and an employment tribunal, usually within three months less one day.",
  },
];

export default async function NoticePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/uk/tax-and-salary/redundancy",
      "/uk/tax-and-salary/holiday-entitlement",
      "/uk/tax-and-salary/holiday-pay-irregular-hours",
      "/uk/tax-and-salary/p45-p60-explainer",
      "/uk/tax-and-salary/salary-calculator",
      "/uk/life/days-between-dates",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Updated for 2026/27"
      title="Notice Period and Final Pay Calculator"
      lead="Find how much notice you must give or get, your last working day and what your final payslip should include."
      points={["Statutory and contract notice", "UK bank holidays", "Holiday pay and PILON", "Free and private"]}
      guide={<NoticeGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates of gross pay under the law in Great Britain and Northern Ireland. SumAtlas is not affiliated with GOV.UK or Acas. Your contract may give you more; check it and get advice if unsure."
    >
      <NoticeStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import IrregularHolidayStudio from "./IrregularHolidayStudio";
import IrregularHolidayGuide from "./IrregularHolidayGuide";

const PATH = "/uk/tax-and-salary/holiday-pay-irregular-hours";

export const metadata: Metadata = {
  title: "Holiday Pay for Irregular Hours: 12.07%",
  description:
    "Free holiday pay calculator for irregular-hours and part-year workers. See the 12.07% holiday hours you build up, rolled-up holiday pay and your 52-week rate.",
  alternates: { canonical: PATH },
  openGraph: ogFor(PATH),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/uk/tax-and-salary", label: "Tax & Salary" },
  { href: PATH, label: "Holiday Pay for Irregular Hours" },
];

const FAQS: { q: string; a: string }[] = [
  {
    q: "How is holiday worked out for irregular hours?",
    a: "If you are an irregular-hours or part-year worker in Great Britain, you build up holiday at 12.07% of the hours you actually work in each pay period, for leave years starting on or after 1 April 2024. Work 30 hours in a week and you build up about 3.6 hours of paid holiday.",
  },
  {
    q: "Why 12.07%?",
    a: "Everyone is entitled to 5.6 weeks of holiday a year. A full year is 52 weeks, so someone who takes all their holiday works 46.4 weeks. 5.6 divided by 46.4 is 12.07%. Someone who works all year builds up exactly 5.6 weeks.",
  },
  {
    q: "Who counts as an irregular-hours worker?",
    a: "Someone whose paid hours in each pay period are wholly or mostly variable under their contract, such as many zero-hours, casual and bank workers. Someone on a fixed rota that repeats, even if the hours change from week to week, is not.",
  },
  {
    q: "Who counts as a part-year worker?",
    a: "Someone who is employed all year but is only required to work, and paid for, part of it, with unpaid periods of at least a week. Term-time-only staff paid only in term and seasonal workers on all-year contracts are common examples.",
  },
  {
    q: "What is rolled-up holiday pay?",
    a: "Instead of paying you when you take holiday, your employer adds 12.07% of your total pay to each payslip. It must be shown as a separate line and paid at the same time as the pay for the work. You then take holiday unpaid. It is only allowed for irregular-hours and part-year workers.",
  },
  {
    q: "Is rolled-up holiday pay legal now?",
    a: "Yes, for irregular-hours and part-year workers, for leave years starting on or after 1 April 2024. It was previously not allowed. Your employer should tell you it is using rolled-up pay and may need to change your contract to do so.",
  },
  {
    q: "How much should I be paid for an hour of holiday?",
    a: "Your average pay over the last 52 weeks in which you were paid, looking back up to 104 weeks. Weeks with no pay are skipped, and so are weeks off sick or on family leave. For 4 of the 5.6 weeks, regular overtime and commission must be included.",
  },
  {
    q: "Are holiday hours rounded?",
    a: "GOV.UK and Acas round the holiday built up in each pay period to the nearest hour: under 30 minutes rounds down, 30 minutes or more rounds up. So 68 hours worked in a month gives 8.2 hours, rounded to 8. Your employer can be more generous.",
  },
  {
    q: "What happens to my holiday when I leave?",
    a: "You must be paid for holiday built up and not taken. If you are paid rolled-up holiday pay, you have already been paid for it, so there is nothing extra to pay when you leave.",
  },
  {
    q: "Can I carry holiday over to next year?",
    a: "Usually up to 8 days with your employer’s agreement. If you could not take holiday because of sickness or family leave, irregular-hours and part-year workers can carry over up to 28 days, which must be used within 18 months for sickness.",
  },
  {
    q: "Does this apply in Northern Ireland?",
    a: "No. The 12.07% accrual and rolled-up holiday pay rules come from regulations for Great Britain. Northern Ireland keeps its own Working Time Regulations, with 5.6 weeks of holiday capped at 28 days. Check nidirect for the rules there.",
  },
  {
    q: "What if I am on a regular part-time pattern?",
    a: "Then you are not an irregular-hours worker. You get 5.6 times your normal working week, for example 16.8 days for three days a week. Use the holiday entitlement calculator for fixed patterns.",
  },
];

export default async function IrregularHolidayPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    [
      "/uk/tax-and-salary/holiday-entitlement",
      "/uk/tax-and-salary/notice-period-final-pay",
      "/uk/tax-and-salary/minimum-wage",
      "/uk/tax-and-salary/hourly-to-salary",
      "/everyday/timesheet-decimal",
      "/uk/tax-and-salary/overtime",
    ].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Rules from 1 April 2024"
      title="Holiday Pay for Irregular Hours Calculator"
      lead="Work out the holiday you build up at 12.07% of your hours, your rolled-up holiday pay and how much an hour of holiday should pay."
      points={["12.07% accrual", "Rolled-up holiday pay", "52-week average pay", "Free and private"]}
      guide={<IrregularHolidayGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates under the Working Time Regulations in Great Britain for leave years starting on or after 1 April 2024. SumAtlas is not affiliated with GOV.UK or Acas. Your contract may give more."
    >
      <IrregularHolidayStudio query={query} />
    </FlagshipPage>
  );
}

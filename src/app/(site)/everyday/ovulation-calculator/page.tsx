import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import OvulationStudio from "./OvulationStudio";
import OvulationGuide from "./OvulationGuide";

export const metadata: Metadata = {
  title: "Ovulation Calculator: Fertile Window and Periods",
  description:
    "Free ovulation calculator. Enter your last period and cycle length to see your fertile window, likely ovulation day and next periods for up to 12 cycles.",
  alternates: { canonical: "/everyday/ovulation-calculator" },
  openGraph: ogFor("/everyday/ovulation-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/ovulation-calculator", label: "Ovulation Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "When do I ovulate?", a: "Usually about 14 days before your next period; the NHS gives 10 to 16 days. For a 28-day cycle that is around day 15, counting the first day of your period as day 1." },
  { q: "What is the fertile window?", a: "The days when sex can lead to pregnancy: the 5 days before ovulation and ovulation day itself, because sperm can survive for up to 7 days." },
  { q: "How do I work out my cycle length?", a: "Count from the first day of one period to the day before the next. Track a few months and use the average." },
  { q: "Can I use this with irregular periods?", a: "Yes, but turn on the irregular option and enter your shortest and longest recent cycles. You will get a wider window. Ovulation tests are more useful with irregular cycles." },
  { q: "What is the luteal phase?", a: "The days from ovulation to your next period, usually about 14. If you know yours from ovulation tests or temperature charts, enter it under More options." },
  { q: "Can I get pregnant outside the fertile window?", a: "It is less likely but possible, because ovulation can come early or late. That is why this calculator is not a form of contraception." },
  { q: "Can I use this to avoid pregnancy?", a: "No. A calendar alone is not reliable contraception. The NHS says natural family planning, even with temperature and mucus tracking, is only 76% effective with typical use." },
  { q: "How often should we have sex when trying for a baby?", a: "The NHS suggests every 2 or 3 days through the cycle, rather than trying to time it exactly." },
  { q: "How long does it take to get pregnant?", a: "More than 8 in 10 couples, where the woman is under 40, conceive within a year of regular unprotected sex, according to the NHS." },
  { q: "When should I take a pregnancy test?", a: "From the first day of a missed period. The calculator shows when your next period is due." },
  { q: "If I conceive this cycle, when is my due date?", a: "About 280 days from the first day of the period that started the cycle, adjusted for cycle length. The results link to the pregnancy due date calculator with your dates filled in." },
  { q: "When should I see a GP?", a: "If you have not conceived after a year of trying, or sooner if you are 36 or over or know of a possible fertility problem. Also if your periods are very irregular or stop." },
];

export default async function OvulationPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/pregnancy-due-date", "/uk/benefits/baby-cost-calculator", "/everyday/bmi-calculator", "/uk/benefits/maternity-pay", "/uk/life/days-between-dates"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="NHS-based estimates"
      title="Ovulation Calculator"
      lead="See your likely ovulation day, your fertile window and your next periods for the coming months, from the date of your last period and your cycle length."
      points={["Fertile window", "Up to 12 cycles", "Irregular cycles option", "Free and private"]}
      guide={<OvulationGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates from your cycle length, based on NHS information. Not medical advice and not a form of contraception."
    >
      <OvulationStudio query={query} />
    </FlagshipPage>
  );
}

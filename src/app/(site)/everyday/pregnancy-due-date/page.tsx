import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import DueDateStudio from "./DueDateStudio";
import DueDateGuide from "./DueDateGuide";

export const metadata: Metadata = {
  title: "Pregnancy Due Date Calculator: Weeks Pregnant",
  description:
    "Free pregnancy due date calculator. Use your last period, conception, IVF transfer or scan to see your due date, how many weeks pregnant you are and key dates.",
  alternates: { canonical: "/everyday/pregnancy-due-date" },
  openGraph: ogFor("/everyday/pregnancy-due-date"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/pregnancy-due-date", label: "Pregnancy Due Date Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How is my due date calculated?", a: "By adding 280 days (40 weeks) to the first day of your last period, adjusted if your cycle is longer or shorter than 28 days. This is Naegele's rule, the method midwives use before a scan." },
  { q: "How many weeks pregnant am I?", a: "Count the days from the first day of your last period to today and divide by 7. The calculator shows it as weeks and days, for example 12 weeks 3 days (written 12+3)." },
  { q: "Why does pregnancy count from my last period and not conception?", a: "Because the start of a period is a date most people know, while the day of conception usually is not. So the first two weeks of the 40 come before you conceive." },
  { q: "How do I work out my due date from conception?", a: "Add 266 days (38 weeks) to the conception date." },
  { q: "How is an IVF due date calculated?", a: "Add 261 days to the date of a 5-day (blastocyst) transfer, or 263 days to a 3-day transfer. Your clinic's date takes priority if it differs." },
  { q: "Can my due date change after the scan?", a: "Yes. The dating scan at 11 to 14 weeks measures the baby and is usually more accurate than a period date, so your midwife may change your due date to the scan date." },
  { q: "How many babies are born on their due date?", a: "Only a small share. Pregnancy normally lasts 37 to 42 weeks, so most babies arrive in the weeks either side of the date." },
  { q: "When does each trimester start?", a: "The NHS counts the second trimester as weeks 13 to 27 and the third from week 28. The first trimester runs to the end of week 12." },
  { q: "What happens if I go past my due date?", a: "In the NHS, you will usually be offered a membrane sweep and then induction if labour has not started by 41 weeks. If you decline induction after 42 weeks, you should be offered extra monitoring." },
  { q: "My periods are irregular. Can I still use this?", a: "Yes, for a rough idea. Enter your average cycle length. With very irregular cycles the dating scan gives a more reliable date." },
  { q: "When should I tell my employer I am pregnant?", a: "In the UK, by the end of the 15th week before your due date (around 25 weeks), unless that is not reasonably possible. Many people tell their employer earlier, often after the 12-week scan." },
  { q: "Is this calculator medical advice?", a: "No. It gives estimates from standard rules. Your midwife or doctor confirms your dates. Contact them, your maternity unit or NHS 111 if you have any worries." },
];

export default async function DueDatePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/ovulation-calculator", "/uk/benefits/baby-cost-calculator", "/uk/benefits/maternity-pay", "/uk/benefits/sure-start-maternity-grant", "/uk/life/healthy-start", "/uk/life/days-between-dates"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="NHS-based dates"
      title="Pregnancy Due Date Calculator"
      lead="Work out your due date from your last period, conception, an IVF transfer or a dating scan, and see how many weeks pregnant you are and your key dates."
      points={["Last period, IVF or scan", "Weeks and days today", "Scan and term dates", "Free and private"]}
      guide={<DueDateGuide />}
      faqs={FAQS}
      related={related}
      note="Estimates from a standard 40-week pregnancy, as used by the NHS. Not medical advice: your midwife or doctor confirms your dates."
    >
      <DueDateStudio query={query} />
    </FlagshipPage>
  );
}

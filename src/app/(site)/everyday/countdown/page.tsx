import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import CountdownStudio from "./CountdownStudio";
import CountdownGuide from "./CountdownGuide";

export const metadata: Metadata = {
  title: "Countdown Calculator: Days Until Christmas",
  description:
    "Free countdown calculator. See the days, weeks, weekends, working days and hours until Christmas, New Year, Easter, the next bank holiday or any date.",
  alternates: { canonical: "/everyday/countdown" },
  openGraph: ogFor("/everyday/countdown"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/countdown", label: "Countdown Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How many days until Christmas?", a: "Open the calculator: it counts from today's date on your device. For example, on 11 October 2026 there were 75 days until Christmas Day, a Friday." },
  { q: "How is the number of days counted?", a: "From midnight today to midnight at the start of the date. So on Christmas Eve there is 1 day until Christmas, and on Christmas Day the countdown says today." },
  { q: "How many sleeps until Christmas?", a: "The same as the number of days: one sleep for each night between now and the morning of the date." },
  { q: "What does the live countdown show?", a: "Days, hours, minutes and seconds until midnight at the start of the date, in your device's time zone. It ticks every second while the page is open." },
  { q: "How are weekends counted?", a: "As the number of Saturdays after today, up to and including the date. A weekend that has already started today is not counted." },
  { q: "Which working days are counted?", a: "Weekdays strictly between today and the date, less bank holidays for the UK nation you choose. Choose weekends only if you are outside the UK." },
  { q: "When is Easter?", a: "Easter Sunday moves each year. It falls on 28 March in 2027, 16 April in 2028, 1 April in 2029 and 21 April in 2030." },
  { q: "When is the next bank holiday?", a: "It depends on where you live. On 11 October 2026 the next one was Christmas Day in England, Wales and Northern Ireland, and St Andrew's Day (30 November) in Scotland." },
  { q: "Can I count down to my own date?", a: "Yes. Choose \"A date I choose\", pick the date and give it a name if you like. Copy the link to share the countdown or come back to it." },
  { q: "What if the date has already passed?", a: "The calculator counts the days since the date instead, so you can see how long ago something happened." },
  { q: "Why is my countdown different on another device?", a: "The countdown uses each device's own date and time zone, so two devices in different time zones can be a day apart around midnight." },
];

export default async function CountdownPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/date-calculator", "/everyday/age-calculator", "/uk/life/days-between-dates", "/uk/life/bank-holidays", "/everyday/time-calculator"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="Live, to the second"
      title="Countdown Calculator"
      lead="See how many days, weeks, weekends and working days are left until Christmas, New Year, Easter, the next bank holiday or a date of your own."
      points={["Christmas, Easter, New Year", "Weekends and working days", "Live seconds", "Free and private"]}
      guide={<CountdownGuide />}
      faqs={FAQS}
      related={related}
      note="Counts use the date and time zone on your device. UK bank holidays are worked out from the official rules."
    >
      <CountdownStudio query={query} />
    </FlagshipPage>
  );
}

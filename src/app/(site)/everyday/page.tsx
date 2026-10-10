import type { Metadata } from "next";
import TopicHub, { TOPIC_ICON, ToolGrid } from "@/components/TopicHub";
import { ogFor } from "@/gm/og";
import { EVERYDAY, getCalculatorsByCategory } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Everyday Calculators: Percentages, BMI, Hours",
  description: "Free everyday calculators that work wherever you live: percentages and percentage change, BMI and healthy weight, and timesheet hours and pay.",
  alternates: { canonical: EVERYDAY.href },
  openGraph: ogFor(EVERYDAY.href),
};

/** The shared Everyday topic, listed in every country's menus. */
export default function EverydayHub() {
  return (
    <TopicHub
      country="uk"
      crumbs={[
        { href: "/", label: "Home" },
        { href: EVERYDAY.href, label: "Everyday" },
      ]}
      title={EVERYDAY.title}
      intro={EVERYDAY.description}
    >
      <ToolGrid tools={getCalculatorsByCategory("everyday")} icon={TOPIC_ICON.everyday} />
    </TopicHub>
  );
}

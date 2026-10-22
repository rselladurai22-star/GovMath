import type { Metadata } from "next";
import TopicHub, { TOPIC_ICON, ToolGrid } from "@/components/TopicHub";
import { ogFor } from "@/gm/og";
import { EVERYDAY, getCalculatorsByCategory } from "@/lib/calculators";

export const metadata: Metadata = {
  title: "Everyday Calculators: Dates, Health and Money",
  description:
    "Free everyday calculators: age and dates, due date and ovulation, BMI, body fat and calories, percentages, discounts, fuel economy and timesheet hours.",
  alternates: { canonical: EVERYDAY.href },
  openGraph: ogFor(EVERYDAY.href),
};

/**
 * The shared Everyday topic, listed in every country's menus. It belongs to no
 * country, so like the other shared pages its header follows the visitor's
 * country and its logo goes to "/".
 */
export default function EverydayHub() {
  return (
    <TopicHub
      crumbs={[
        { href: "/", label: "Home" },
        { href: EVERYDAY.href, label: "Everyday" },
      ]}
      title={EVERYDAY.title}
      intro={EVERYDAY.description}
    >
      <p className="gm-hubintro">
        These calculators answer questions that don&rsquo;t depend on a country&rsquo;s tax rules: your exact age, the date a number of
        days or working days away, a pregnancy due date or fertile window, a percentage or discount, your BMI, body fat or daily calories, and
        your car&rsquo;s fuel economy. They work the same wherever you live, so they sit outside the UK and US sections and appear in both. Where your country matters, you choose: metric,
        US or UK imperial units, and on the timesheet, pounds, dollars or euros, with UK or US minimum wage notes. Health results are
        estimates, not medical advice. The BMI calculator uses the WHO adult ranges that the NHS and CDC share, and points to NHS or CDC
        guidance for children.
      </p>
      <ToolGrid tools={getCalculatorsByCategory("everyday")} icon={TOPIC_ICON.everyday} />
    </TopicHub>
  );
}

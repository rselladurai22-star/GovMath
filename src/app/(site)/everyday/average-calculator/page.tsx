import type { Metadata } from "next";
import FlagshipPage from "@/components/flagship/FlagshipPage";
import { CALCULATORS } from "@/lib/calculators";
import { ogFor } from "@/gm/og";
import AverageStudio from "./AverageStudio";
import AverageGuide from "./AverageGuide";

export const metadata: Metadata = {
  title: "Average Calculator: Mean, Median, Mode",
  description:
    "Free average calculator. Paste a list of numbers to get the mean, median, mode, range, weighted and geometric mean and standard deviation, with the working.",
  alternates: { canonical: "/everyday/average-calculator" },
  openGraph: ogFor("/everyday/average-calculator"),
};

const BREADCRUMBS = [
  { href: "/", label: "Home" },
  { href: "/everyday", label: "Everyday" },
  { href: "/everyday/average-calculator", label: "Average Calculator" },
];

const FAQS: { q: string; a: string }[] = [
  { q: "How do I work out the mean?", a: "Add up all the numbers and divide by how many there are. For 3, 7, 7, 2, 9, 12, 5, 7, 4 and 10 the total is 66, and 66 ÷ 10 = 6.6." },
  { q: "How do I find the median?", a: "Put the numbers in order and take the middle one. With an even count, take halfway between the two middle numbers. For the list above, the 5th and 6th numbers are both 7, so the median is 7." },
  { q: "What is the mode?", a: "The number that appears most often. A list can have more than one mode, or none if no number repeats." },
  { q: "Which average should I use?", a: "The mean uses every number but is pulled by extreme values. The median is better for skewed data such as pay or house prices. The mode suits categories, such as the most common shoe size." },
  { q: "What is a weighted mean?", a: "An average where some numbers count more than others. Marks of 65, 72 and 58 weighted 30%, 50% and 20% average 67.1, not 65." },
  { q: "What is the geometric mean for?", a: "Averaging growth rates and ratios. Growth of +10%, −5% and +8% has a geometric mean factor of about 1.0412, about 4.1% a year, slightly less than the simple average of 4.33%." },
  { q: "What is the difference between sample and population standard deviation?", a: "Population divides by n; sample divides by n − 1, which corrects for estimating the spread of a larger group from part of it. Use sample unless your list is the whole group." },
  { q: "What does standard deviation tell me?", a: "How far numbers typically sit from the mean. 48 to 52 and 30 to 70 both have a mean of 50, but standard deviations of about 1.4 and 14.1 (population)." },
  { q: "How should I enter my numbers?", a: "Separate them with commas, spaces or new lines, or paste a spreadsheet column. Do not put commas inside numbers: type 1200, not 1,200." },
  { q: "What happens to text or blanks in my list?", a: "Blanks are skipped. Anything that is not a number is left out and listed in a warning, so you can check it." },
  { q: "Can I average percentages?", a: "Only if each percentage is out of the same total. Otherwise use a weighted mean, with each group's size as its weight." },
];

export default async function AveragePage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const related = CALCULATORS.filter((c) =>
    ["/everyday/percentage-calculator", "/everyday/fraction-calculator", "/everyday/gpa-calculator", "/everyday/discount-calculator", "/uk/investing/compound-interest"].includes(c.href),
  );
  return (
    <FlagshipPage
      breadcrumbs={BREADCRUMBS}
      eyebrow="With the working shown"
      title="Average Calculator"
      lead="Paste a list of numbers to see the mean, median, mode and range, plus the weighted and geometric mean and the standard deviation, with every step shown."
      points={["Mean, median, mode", "Standard deviation", "Weighted mean", "Paste from a spreadsheet"]}
      guide={<AverageGuide />}
      faqs={FAQS}
      related={related}
      note="Results are rounded for display."
    >
      <AverageStudio query={query} />
    </FlagshipPage>
  );
}

import type { Metadata } from "next";
import TopicHub, { TOPIC_ICON, ToolGrid } from "@/components/TopicHub";
import { ogFor } from "@/gm/og";
import { US_CATEGORIES, getCalculatorsByCategory, type UsCategorySlug } from "@/lib/calculators";

/** Each US topic's card icon (shared with the matching UK topic). */
export const US_ICON: Record<UsCategorySlug, string> = {
  "us-taxes": TOPIC_ICON.tax,
  "us-housing": TOPIC_ICON.home,
  "us-loans": TOPIC_ICON.loan,
  "us-savings": TOPIC_ICON.savings,
};

const cat = (slug: UsCategorySlug) => US_CATEGORIES.find((c) => c.slug === slug)!;

export function usTopicMetadata(slug: UsCategorySlug): Metadata {
  const c = cat(slug);
  return {
    title: `US ${c.title} Calculators 2026`,
    description: `Free US ${c.title.toLowerCase()} calculators for 2026. ${c.description}`.slice(0, 160),
    alternates: { canonical: c.href },
    openGraph: ogFor(c.href),
  };
}

/** A US topic page: every calculator in the topic, with links to the other US topics. */
export function UsTopicPage({ slug }: { slug: UsCategorySlug }) {
  const c = cat(slug);
  return (
    <TopicHub
      country="us"
      crumbs={[
        { href: "/", label: "Home" },
        { href: "/us", label: "US calculators" },
        { href: c.href, label: c.title },
      ]}
      title={`${c.title} calculators`}
      intro={c.description}
      jump={US_CATEGORIES.map((x) => ({ href: x.href, label: x.title, chosen: x.slug === slug }))}
    >
      <ToolGrid tools={getCalculatorsByCategory(slug)} icon={US_ICON[slug]} />
    </TopicHub>
  );
}

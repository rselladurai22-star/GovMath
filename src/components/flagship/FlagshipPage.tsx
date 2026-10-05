import type { ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
import EngineOutro from "@/components/calculator/EngineOutro";
import { HomeMotion } from "@/components/home/Motion";
import type { Calculator } from "@/lib/calculators";
import FlagshipHero, { type Crumb } from "./FlagshipHero";
import SectionTabs, { type SectionTab } from "./SectionTabs";
import s from "./Flagship.module.css";

/**
 * Page frame for flagship calculators: compact hero, the interactive studio,
 * a guide, FAQs and related tools — plus breadcrumb and FAQ structured data.
 */
export default function FlagshipPage({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  points,
  children,
  guide,
  faqs,
  related,
  note,
}: {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  points: string[];
  children: ReactNode;
  guide?: ReactNode;
  faqs: { q: string; a: string }[];
  related: Calculator[];
  note: string;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: `https://govmath.co.uk${c.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  const tabs: SectionTab[] = [
    { id: "calculator", label: "Calculator" },
    ...(guide ? [{ id: "guide", label: "Guide" }] : []),
    { id: "faqs", label: "FAQs" },
    ...(related.length > 0 ? [{ id: "related", label: "Other calculators" }] : []),
  ];

  return (
    <div id="gm-flagship" className={s.page}>
      <HomeMotion rootId="gm-flagship" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <FlagshipHero breadcrumbs={breadcrumbs} eyebrow={eyebrow} title={title} lead={lead} points={points} />
      <SectionTabs items={tabs} />

      <div id="calculator" className={s.studioWrap}>
        {children}
      </div>

      <div className={`gm-wrap ${s.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>

      {guide && (
        <section id="guide" className={`gm-wrap ${s.guide}`}>
          {guide}
        </section>
      )}

      <EngineOutro faqs={faqs} related={related} note={note} />
    </div>
  );
}

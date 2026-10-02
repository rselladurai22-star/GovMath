import Link from "next/link";
import type { ReactNode } from "react";
import AdSlot from "@/components/AdSlot";
import EngineOutro from "@/components/calculator/EngineOutro";
import { HomeMotion } from "@/components/home/Motion";
import type { Calculator } from "@/lib/calculators";
import s from "./Flagship.module.css";

type Crumb = { href: string; label: string };

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

  return (
    <div id="gm-flagship" className={s.page}>
      <HomeMotion rootId="gm-flagship" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className={s.hero}>
        <div className="gm-wrap">
          <nav aria-label="Breadcrumb" className={s.crumbs}>
            <ol>
              {breadcrumbs.map((c, i) => (
                <li key={c.href}>
                  {i === breadcrumbs.length - 1 ? <span aria-current="page">{c.label}</span> : <Link href={c.href}>{c.label}</Link>}
                </li>
              ))}
            </ol>
          </nav>
          <span className={s.heroEyebrow}>
            <i aria-hidden="true" />
            {eyebrow}
          </span>
          <h1 className={s.heroTitle}>{title}</h1>
          <p className={s.heroLead}>{lead}</p>
          <ul className={s.heroPoints}>
            {points.map((p) => (
              <li key={p}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div id="calculator" className={s.studioWrap}>
        {children}
      </div>

      <div className={`gm-wrap ${s.adRow}`}>
        <AdSlot size="leaderboard" />
      </div>

      {guide && <section className={`gm-wrap ${s.guide}`}>{guide}</section>}

      <EngineOutro faqs={faqs} related={related} note={note} />
    </div>
  );
}

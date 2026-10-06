import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { shortTitle, type Calculator } from "@/lib/calculators";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";

export type Crumb = { href: string; label: string };

/** Topic names as the approved design writes them (e.g. "Mortgages & property"). */
const TOPIC: Record<string, string> = Object.fromEntries(
  (cats as { slug: string; label: string }[]).map((c) => [`/${c.slug}`, c.label.replace(/&amp;/g, "&")]),
);

/**
 * Page frame for every calculator, in the approved design's markup (as on
 * its mortgage and take-home pages): breadcrumb, intro, section links, the
 * calculator (Studio), the guide, FAQs and related calculators, inside the
 * design's header and footer. Adds breadcrumb and FAQ structured data.
 */
export default function FlagshipPage({
  breadcrumbs,
  eyebrow,
  title,
  lead,
  children,
  guide,
  faqs,
  related,
  note,
  plainIntro,
  neutral,
}: {
  breadcrumbs: Crumb[];
  eyebrow: string;
  title: string;
  lead: string;
  /** Short selling points (not shown in the approved design). */
  points: string[];
  children: ReactNode;
  guide?: ReactNode;
  faqs: { q: string; a: string }[];
  related: Calculator[];
  note: string;
  /** Hide the topic and eyebrow lines above the title (being trialled on the council tax page). */
  plainIntro?: boolean;
  /** Neutral reading palette instead of the pink-tinted greys (being trialled on the council tax page). */
  neutral?: boolean;
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
  const topic = TOPIC[breadcrumbs[1]?.href ?? ""] ?? breadcrumbs[1]?.label ?? "";
  const crumbs = breadcrumbs.map((c, i) => (i === 1 ? { ...c, label: topic || c.label } : c));

  return (
    <GmShell kind="calculator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={neutral ? "wrap gm-neutral" : "wrap"}>
        <div className="crumb">
          {crumbs.map((c, i) =>
            i === crumbs.length - 1 ? (
              <Fragment key={c.href}>{c.label}</Fragment>
            ) : (
              <Fragment key={c.href}>
                <Link href={c.href}>{c.label}</Link>
                <span>›</span>
              </Fragment>
            ),
          )}
        </div>
        <div className="intro">
          {!plainIntro && topic && <p className="eyebrow">{topic.toUpperCase()}</p>}
          {!plainIntro && <p className="eyebrow">{eyebrow.toUpperCase()}</p>}
          <h1>{title}</h1>
          <p>{lead}</p>
        </div>
        <nav className="sectionnav" aria-label="On this page">
          <a className="active" href="#calculator">
            Calculator
          </a>
          <a href="#results">Your results</a>
          {guide && <a href="#guide">Guide</a>}
          <a href="#faqs">FAQs</a>
        </nav>

        {children}

        {guide}

        <section className="fullfaq section" id="faqs">
          <div>
            <span className="q-kicker">Questions</span>
            <h2 className="q-explainerTitle">Frequently asked</h2>
          </div>
          <div className="q-faqs">
            {faqs.map((f) => (
              <details key={f.q} className="q-faq">
                <summary>
                  <span>{f.q}</span>
                  <span aria-hidden="true" className="q-faqPlus" />
                </summary>
                <div className="q-faqBody">
                  <p>{f.a}</p>
                </div>
              </details>
            ))}
          </div>
          <div className="q-note">
            <strong>Good to know</strong>
            <p>{note}</p>
          </div>
        </section>

        {related.length > 0 && (
          <section className="section" id="related">
            <p className="eyebrow">KEEP EXPLORING</p>
            <h2>Related calculators</h2>
            <div className="relatedgrid">
              {related.map((c) => (
                <Link key={c.href} className="q-relatedCard" href={c.href}>
                  <span className="q-relatedIcon" />
                  <strong>{shortTitle(c.title)}</strong>
                  <p>{c.blurb}</p>
                  <span className="q-relatedGo">Open calculator</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </GmShell>
  );
}

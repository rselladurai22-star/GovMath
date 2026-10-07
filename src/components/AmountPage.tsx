import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import GmShell from "@/gm/GmShell";
import { SITE } from "@/gm/schema";

type Crumb = { href: string; label: string };

/**
 * Page frame for the fixed-amount pages ("£30,000 after tax", "Stamp Duty on
 * £350,000") and their index pages: breadcrumb, title and answer, a link to
 * the full calculator, the guide, FAQs and onward links, in the same markup as
 * FlagshipPage. Adds breadcrumb and FAQ structured data.
 */
export default function AmountPage({
  breadcrumbs,
  title,
  lead,
  summary,
  cta,
  children,
  faqs = [],
}: {
  breadcrumbs: Crumb[];
  title: string;
  lead: ReactNode;
  /** The answer at a glance, shown under the title. */
  summary?: ReactNode;
  cta: { href: string; label: string };
  children: ReactNode;
  faqs?: { q: string; a: string }[];
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${SITE}${c.href}` })),
    },
    ...(faqs.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]
      : []),
  ];
  return (
    <GmShell kind="calculator">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <div className="crumb">
          {breadcrumbs.map((c, i) =>
            i === breadcrumbs.length - 1 ? (
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
          <h1>{title}</h1>
          <p>{lead}</p>
          <p className="gm-trust">
            <span className="gm-trust-mark" aria-hidden="true" />
            <span>Checked by the SumAtlas team</span>
            <span>2026/27 rates</span>
            <span>
              <a href="#guide-sources">Sources</a>
            </span>
            <span>
              <Link href="/how-we-check">How we check our figures</Link>
            </span>
            <span>Independent: not a government website</span>
          </p>
        </div>
        {summary && <section className="section gm-amount-summary">{summary}</section>}
        <p className="gm-actions">
          <Link className="button" href={cta.href}>
            {cta.label}
          </Link>
        </p>

        {children}

        {faqs.length > 0 && (
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
          </section>
        )}
      </div>
    </GmShell>
  );
}

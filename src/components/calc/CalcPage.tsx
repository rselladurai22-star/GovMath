import type { ReactNode } from "react";
import Link from "next/link";
import { shortTitle, type Calculator } from "@/lib/calculators";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { trustHtml } from "@/gm/trust";
import { SITE, calculatorJsonLd } from "@/gm/schema";
import { embedCode, isEmbeddable } from "@/lib/embeds";
import EmbedCode from "@/components/EmbedCode";
import { Crumbs } from "@/components/ContentPage";
import { homeCrumbs, type Crumb } from "@/lib/seo/home-links";
import { RELATED_POSTS } from "@/lib/blog-links";
import { getPost } from "@/lib/blog";

const TOPIC: Record<string, string> = Object.fromEntries(
  (cats as { slug: string; label: string }[]).map((c) => [`/uk/${c.slug}`, c.label.replace(/&amp;/g, "&")]),
);

export type CalcSource = { label: string; href: string };

/**
 * Open page frame for a calculator (December 2026 redesign). It fixes only
 * what every page shares: header and footer, breadcrumb, title, one-line
 * lead, trust line, sources, a short FAQ, related calculators and structured
 * data. Everything between is the page's own: `children` is the tool, laid
 * out however that calculator needs, and `notes` is its written content, in
 * whatever sections that topic needs (no fixed guide template, no word
 * target). Parts to build with are in components/calc/kit.tsx and the
 * "Calculator kit" block of public/gm/sumatlas-ds.css.
 *
 * FlagshipPage + Studio (the fixed two-column frame) remain for pages not
 * yet redesigned.
 */
export default function CalcPage({
  breadcrumbs,
  title,
  lead,
  children,
  notes,
  faqs,
  sources,
  related,
}: {
  breadcrumbs: Crumb[];
  title: string;
  /** One sentence: what the page works out, in the reader's words. */
  lead: string;
  /** The tool. */
  children: ReactNode;
  /** The page's own written content (h2 sections, tables, lists). */
  notes?: ReactNode;
  /** Only questions people really ask that the page has not already answered. Aim for 3 to 6. */
  faqs: { q: string; a: string }[];
  /** The official pages the figures come from. */
  sources: CalcSource[];
  related: Calculator[];
}) {
  const path = breadcrumbs[breadcrumbs.length - 1].href;
  const readNext = (RELATED_POSTS[path] ?? []).map(getPost).filter((p) => p !== undefined);
  const topic = TOPIC[breadcrumbs[1]?.href ?? ""] ?? breadcrumbs[1]?.label ?? "";
  const crumbs = homeCrumbs(breadcrumbs.map((c, i) => (i === 1 ? { ...c, label: topic || c.label } : c)));
  const jsonLd: object[] = [
    calculatorJsonLd(path, title, lead),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: `${SITE}${c.href}` })),
    },
  ];
  if (faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    });
  }

  return (
    <GmShell kind="calculator" country="uk">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap sa-page">
        <Crumbs items={crumbs} />
        <header className="sa-head">
          <h1>{title}</h1>
          <p className="sa-lead">{lead}</p>
          <div dangerouslySetInnerHTML={{ __html: trustHtml(path, "sources") }} />
        </header>

        {children}

        {notes && <div className="sa-notes">{notes}</div>}

        {faqs.length > 0 && (
          <section className="sa-faq" id="faqs" aria-labelledby="faqs-title">
            <h2 id="faqs-title">Questions people ask</h2>
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

        <section className="sa-sources" id="sources" aria-labelledby="sources-title">
          <h2 id="sources-title">Sources</h2>
          <ul>
            {sources.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        {(related.length > 0 || readNext.length > 0) && (
          <nav className="sa-next" aria-labelledby="next-title">
            <h2 id="next-title">Next</h2>
            <ul>
              {related.map((c) => (
                <li key={c.href}>
                  <Link href={c.href}>{shortTitle(c.title)}</Link>
                  <span>{c.blurb}</span>
                </li>
              ))}
              {readNext.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  <span>Guide · {p.readingTime}</span>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {isEmbeddable(path) && (
          <section className="section gm-embedsection" id="embed">
            <h2>Add this calculator to your website</h2>
            <p>
              Free for any website, blog or advice service: paste this code where you want the calculator. <Link href="/widgets">More calculators to embed</Link>
            </p>
            <EmbedCode code={embedCode(path, title)} label={`Embed code for the ${title}`} />
          </section>
        )}
      </div>
    </GmShell>
  );
}

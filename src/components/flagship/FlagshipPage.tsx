import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import { shortTitle, type Calculator } from "@/lib/calculators";
import GmShell from "@/gm/GmShell";
import cats from "@/gm/categories.json";
import { trustHtml } from "@/gm/trust";
import { calculatorJsonLd } from "@/gm/schema";
import { embedCode, isEmbeddable } from "@/lib/embeds";
import EmbedCode from "@/components/EmbedCode";
import { LookProvider } from "./look";

export type Crumb = { href: string; label: string };

/** Topic names as the approved design writes them (e.g. "Mortgages & property"). */
const TOPIC: Record<string, string> = Object.fromEntries(
  (cats as { slug: string; label: string }[]).map((c) => [`/uk/${c.slug}`, c.label.replace(/&amp;/g, "&")]),
);

/**
 * Page frame for every calculator, in the approved design's markup (as on
 * its mortgage and take-home pages): breadcrumb, intro, section links, the
 * calculator (Studio), the guide, FAQs and related calculators, inside the
 * design's header and footer. Adds breadcrumb and FAQ structured data.
 */
export default function FlagshipPage({
  breadcrumbs,
  title,
  lead,
  children,
  guide,
  faqs,
  related,
  note,
  look,
}: {
  breadcrumbs: Crumb[];
  /** Short label for the page (not shown since the October 2026 redesign; kept for every page's API). */
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
  /** Optional design variant for the calculator (see components/flagship/look.tsx). */
  look?: "indus";
}) {
  const path = breadcrumbs[breadcrumbs.length - 1].href;
  const jsonLd = [
    calculatorJsonLd(path, title, lead),
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: `https://sumatlas.com${c.href}`,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];
  const topic = TOPIC[breadcrumbs[1]?.href ?? ""] ?? breadcrumbs[1]?.label ?? "";
  const crumbs = breadcrumbs.map((c, i) => (i === 1 ? { ...c, label: topic || c.label } : c));

  return (
    <GmShell kind="calculator" country={path.startsWith("/us/") ? "us" : path.startsWith("/uk/") ? "uk" : undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={look ? `wrap gm-${look}-page` : "wrap"}>
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
          {/* With a look, the title and lead sit inside the calculator card (Studio). */}
          {!look && (
            <>
              <h1>{title}</h1>
              <p>{lead}</p>
            </>
          )}
          {guide && (
            <div
              dangerouslySetInnerHTML={{
                __html: trustHtml(breadcrumbs[breadcrumbs.length - 1].href, "guide-sources"),
              }}
            />
          )}
        </div>
        <nav className="sectionnav" aria-label="On this page">
          <a className="active" href="#calculator">
            Calculator
          </a>
          <a href="#results">Your results</a>
          {guide && <a href="#guide">Guide</a>}
          <a href="#faqs">FAQs</a>
        </nav>

        <div className={look ? "pg-layout pg-layout--single" : "pg-layout"}>
          <section className="pg-tool" aria-label="Calculator and your results">
            <LookProvider value={look ? { look, title, lead } : null}>{children}</LookProvider>
          </section>
          {related.length > 0 && (
            <aside className="pg-related" aria-labelledby="pg-related-title">
              <h2 id="pg-related-title">Related calculators</h2>
              <nav aria-label="Related calculators">
                {related.map((c) => (
                  <Link key={c.href} className="pg-relcard" href={c.href}>
                    <strong>{shortTitle(c.title)}</strong>
                    <span>{c.blurb}</span>
                  </Link>
                ))}
              </nav>
            </aside>
          )}
        </div>

        <section className="pg-guide" aria-label="Guide and questions">
          <div className="pg-guidehead">
            <p className="pg-kicker">Guide</p>
            <p className="pg-guidelead">
              {guide
                ? "How the calculation works, with fixed examples, then answers to common questions."
                : "Answers to common questions."}
            </p>
          </div>

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

          {isEmbeddable(path) && (
            <section className="section gm-embedsection" id="embed">
              <h2>Add this calculator to your website</h2>
              <p>
                Free for any website, blog or advice service: paste this code where you want the calculator. It stays up to date
                with the latest rates. <Link href="/widgets">More calculators to embed</Link>
              </p>
              <EmbedCode code={embedCode(path, title)} label={`Embed code for the ${title}`} />
            </section>
          )}
        </section>
      </div>
    </GmShell>
  );
}

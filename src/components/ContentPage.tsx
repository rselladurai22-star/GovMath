import { Fragment, type ReactNode } from "react";
import Link from "next/link";
import GmShell from "@/gm/GmShell";

export type Crumb = { href: string; label: string };

type ContentPageProps = {
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  updated?: string;
  /** Short context line above the title. */
  eyebrow?: string;
  /** Extra lines under the intro (e.g. date and reading time). */
  meta?: ReactNode;
  /** Shown after the prose, full width (e.g. more articles). */
  after?: ReactNode;
  children: ReactNode;
};

/** The design's flat breadcrumb: links separated by ›, the last item as text. */
export function Crumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="crumb">
      {items.map((c, i) =>
        i === items.length - 1 ? (
          <Fragment key={c.href + i}>{c.label}</Fragment>
        ) : (
          <Fragment key={c.href + i}>
            <Link href={c.href}>{c.label}</Link>
            <span>›</span>
          </Fragment>
        ),
      )}
    </div>
  );
}

/**
 * Shared frame for prose pages (About, legal, contact, blog articles) in the
 * approved design: its header and footer, a flat breadcrumb, the grey
 * category hero and a readable column of prose.
 */
export default function ContentPage({
  title,
  intro,
  breadcrumbs = [{ href: "/", label: "Home" }],
  updated,
  eyebrow = "GovMath",
  meta,
  after,
  children,
}: ContentPageProps) {
  return (
    <GmShell>
      <div className="wrap">
        <Crumbs items={[...breadcrumbs, { href: "#", label: title }]} />
        <section className="categoryhero">
          <p className="eyebrow">{eyebrow.toUpperCase()}</p>
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
          {(updated || meta) && (
            <div className="gm-meta">
              {updated && <span>Last updated: {updated}</span>}
              {meta}
            </div>
          )}
        </section>
        <article className="gm-prose section">{children}</article>
        {after}
      </div>
    </GmShell>
  );
}
